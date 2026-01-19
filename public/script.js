const API_URL = '';  // Empty for same-origin, or your worker URL

// DOM Elements
const tasksList = document.getElementById('tasks-list');
const newTaskInput = document.getElementById('new-task-input');
const prioritySelect = document.getElementById('priority-select');
const addTaskBtn = document.getElementById('add-task-btn');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listeners
addTaskBtn.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Load all tasks
async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    const data = await response.json();
    renderTasks(data.tasks);
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Render tasks
function renderTasks(tasks) {
  tasksList.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
      <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.id}')">
      <span class="task-text">${task.text}</span>
      <span class="task-priority priority-${task.priority}">${task.priority}</span>
      <button class="task-delete" onclick="deleteTask('${task.id}')">×</button>
    </div>
  `).join('');
}

// Add new task
async function addTask() {
  const text = newTaskInput.value.trim();
  if (!text) return;

  try {
    const response = await fetch(`${API_URL}/api/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, priority: prioritySelect.value }),
    });
    
    newTaskInput.value = '';
    loadTasks();
  } catch (error) {
    console.error('Error adding task:', error);
  }
}

// Toggle task completion
async function toggleTask(id) {
  try {
    await fetch(`${API_URL}/api/tasks/${id}/toggle`, { method: 'POST' });
    loadTasks();
  } catch (error) {
    console.error('Error toggling task:', error);
  }
}

// Delete task
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/api/tasks/${id}`, { method: 'DELETE' });
    loadTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

// Send chat message
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message to chat
  addMessageToChat(message, 'user');
  chatInput.value = '';

  // Show loading
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'message assistant';
  loadingDiv.innerHTML = '<span class="loading"></span>';
  chatMessages.appendChild(loadingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    
    const data = await response.json();
    
    // Remove loading
    loadingDiv.remove();
    
    // Add AI response
    addMessageToChat(data.response, 'assistant');
    
    // Refresh tasks in case any were added/modified
    loadTasks();
  } catch (error) {
    loadingDiv.remove();
    addMessageToChat('Sorry, something went wrong. Please try again.', 'assistant');
    console.error('Error:', error);
  }
}

// Add message to chat
function addMessageToChat(text, role) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${role}`;
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}