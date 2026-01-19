export interface Env {
    AI: any;
    TASKS: KVNamespace;
}

interface Task {
    id: string;
    text: string;
    completed: boolean;
    priority: string;
    createdAt: string;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        // Handle CORS
        if (request.method === "OPTIONS") {
            return new Response(null, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
            });
        }

        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
        };

        // API Route: Chat with AI
        if (url.pathname === "/api/chat" && request.method === "POST") {
            const { message } = await request.json();

            // Get existing tasks for context
            const tasksData = await env.TASKS.get("user-tasks");
            const tasks: Task[] = tasksData ? JSON.parse(tasksData) : [];

            // Build prompt with task context
            const systemPrompt = `You are Anita's productivity assistant. You help manage tasks and provide motivation.

Current tasks:
${tasks.length > 0 ? tasks.map(t => `- [${t.completed ? 'x' : ' '}] ${t.text} (${t.priority} priority)`).join('\n') : 'No tasks yet.'}

You can help the user:
- Add tasks (respond with ACTION:ADD:task text:priority)
- Complete tasks (respond with ACTION:COMPLETE:task id)
- Delete tasks (respond with ACTION:DELETE:task id)
- List tasks (just list them naturally)
- Prioritize what to work on
- Provide encouragement

For normal conversation, just respond naturally. Only use ACTION: format when the user wants to modify tasks.
Priorities are: high, medium, low`;

            const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: message }
                ],
                max_tokens: 500,
            });

            let aiResponse = response.response;

            // Process any actions in the response
            if (aiResponse.includes("ACTION:ADD:")) {
                const match = aiResponse.match(/ACTION:ADD:(.+):(\w+)/);
                if (match) {
                    const newTask: Task = {
                        id: Date.now().toString(),
                        text: match[1].trim(),
                        completed: false,
                        priority: match[2] || "medium",
                        createdAt: new Date().toISOString(),
                    };
                    tasks.push(newTask);
                    await env.TASKS.put("user-tasks", JSON.stringify(tasks));
                    aiResponse = aiResponse.replace(/ACTION:ADD:.+:\w+/, `✅ Added task: "${newTask.text}"`);
                }
            }

            if (aiResponse.includes("ACTION:COMPLETE:")) {
                const match = aiResponse.match(/ACTION:COMPLETE:(\d+)/);
                if (match) {
                    const task = tasks.find(t => t.id === match[1]);
                    if (task) {
                        task.completed = true;
                        await env.TASKS.put("user-tasks", JSON.stringify(tasks));
                        aiResponse = aiResponse.replace(/ACTION:COMPLETE:\d+/, `✅ Completed: "${task.text}"`);
                    }
                }
            }

            return new Response(JSON.stringify({ response: aiResponse }), { headers: corsHeaders });
        }

        // API Route: Get all tasks
        if (url.pathname === "/api/tasks" && request.method === "GET") {
            const tasksData = await env.TASKS.get("user-tasks");
            const tasks = tasksData ? JSON.parse(tasksData) : [];
            return new Response(JSON.stringify({ tasks }), { headers: corsHeaders });
        }

        // API Route: Add task directly
        if (url.pathname === "/api/tasks" && request.method === "POST") {
            const { text, priority } = await request.json();
            const tasksData = await env.TASKS.get("user-tasks");
            const tasks: Task[] = tasksData ? JSON.parse(tasksData) : [];

            const newTask: Task = {
                id: Date.now().toString(),
                text,
                completed: false,
                priority: priority || "medium",
                createdAt: new Date().toISOString(),
            };

            tasks.push(newTask);
            await env.TASKS.put("user-tasks", JSON.stringify(tasks));

            return new Response(JSON.stringify({ task: newTask }), { headers: corsHeaders });
        }

        // API Route: Delete task
        if (url.pathname.startsWith("/api/tasks/") && request.method === "DELETE") {
            const id = url.pathname.split("/").pop();
            const tasksData = await env.TASKS.get("user-tasks");
            let tasks: Task[] = tasksData ? JSON.parse(tasksData) : [];

            tasks = tasks.filter(t => t.id !== id);
            await env.TASKS.put("user-tasks", JSON.stringify(tasks));

            return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
        }

        // API Route: Toggle task complete
        if (url.pathname.startsWith("/api/tasks/") && url.pathname.endsWith("/toggle") && request.method === "POST") {
            const id = url.pathname.split("/")[3];
            const tasksData = await env.TASKS.get("user-tasks");
            const tasks: Task[] = tasksData ? JSON.parse(tasksData) : [];

            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                await env.TASKS.put("user-tasks", JSON.stringify(tasks));
            }

            return new Response(JSON.stringify({ task }), { headers: corsHeaders });
        }

        // Serve static files
        
        return new Response(JSON.stringify({ error: "Not found" }), {
            status: 404,
            headers: corsHeaders,
        });
    },
};