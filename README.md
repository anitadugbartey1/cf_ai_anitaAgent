# 🚀 Anita's Productivity Agent

An AI-powered task management assistant built entirely on Cloudflare's platform.

**Live Demo:** [cf-ai-anita-agent.anitaflare.workers.dev](https://cf-ai-anita-agent.anitaflare.workers.dev)

---

## 📖 Overview

Anita's Productivity Agent is a conversational AI assistant that helps you manage tasks and stay productive. Chat naturally with the agent to add tasks, set priorities, get advice on what to focus on, and track your progress.

### Features

- **Natural Language Task Management** – Add, complete, and delete tasks through conversation
- **Priority Levels** – Organize tasks by high, medium, or low priority
- **AI-Powered Advice** – Get suggestions on what to tackle next
- **Persistent Storage** – Tasks are saved and persist across sessions
- **Real-time Chat Interface** – Conversational UI for easy interaction

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **LLM** | Llama 3.3 70B (Cloudflare Workers AI) |
| **Backend** | Cloudflare Workers |
| **Frontend** | HTML, CSS, JavaScript (Cloudflare Pages/Assets) |
| **Database** | Cloudflare KV (Key-Value Storage) |
| **Deployment** | Cloudflare Workers |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Cloudflare Account](https://cloudflare.com) (free)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/anitadugbartey1/cf_ai_anitaAgent.git
   cd cf_ai_anitaAgent
```

2. **Install dependencies**
```bash
   npm install
```

3. **Login to Cloudflare**
```bash
   wrangler login
```

4. **Create KV namespace**
```bash
   npx wrangler kv namespace create TASKS
```
   Copy the output ID and update `wrangler.toml`:
```toml
   [[kv_namespaces]]
   binding = "TASKS"
   id = "your-kv-id-here"
```

5. **Run locally**
```bash
   npm run dev
```
   Open [http://localhost:8787](http://localhost:8787)

6. **Deploy to Cloudflare**
```bash
   npm run deploy
```

---

## 💬 Usage

### Chat Commands (Natural Language)

| What to Say | What Happens |
|-------------|--------------|
| "Add buy groceries with low priority" | Adds a new task |
| "What's on my list?" | Shows your tasks |
| "What should I work on?" | AI suggests next task |
| "I finished the report" | AI helps mark task complete |

### Manual Task Management

- **Add Task:** Use the input field and priority dropdown
- **Complete Task:** Click the checkbox
- **Delete Task:** Click the × button

---

## 📁 Project Structure
```
cf_ai_anitaAgent/
├── src/
│   └── index.ts          # Backend Worker (API routes + AI)
├── public/
│   ├── index.html        # Frontend UI
│   ├── style.css         # Styling
│   └── script.js         # Frontend logic
├── wrangler.toml         # Cloudflare configuration
├── package.json
├── tsconfig.json
├── README.md
└── PROMPTS.md            # AI prompts used in development
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send message to AI agent |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Add a new task |
| DELETE | `/api/tasks/:id` | Delete a task |
| POST | `/api/tasks/:id/toggle` | Toggle task completion |

---

## 📝 License

MIT License

---

## 👩🏾‍💻 Author

**Anita Dugbartey**

Built for Cloudflare AI Assignment