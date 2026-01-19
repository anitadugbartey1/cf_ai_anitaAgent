# PROMPTS.md - AI Prompts Used in Development

This document contains the AI prompts used during the development of Anita's Productivity Agent. All prompts were submitted to Claude (Anthropic) for assistance with planning, coding, and debugging.

---

## 🎯 Project Planning & Validation

### Prompt 1: Initial Concept Validation
**Purpose:** Validate project idea against assignment requirements
```
My idea for this assignment was to build a privacy policy agent. Is that within guidelines of the project.
```

**Outcome:** Received confirmation that the concept fits requirements, plus architecture suggestions.

---

### Prompt 2: Pivoting to Productivity Agent
**Purpose:** Explore alternative project idea
```
How could I pivot to build an agent that helps me with productivity and tasks?
```

**Outcome:** Confirmed viability and received feature ideas for a task management agent.

---

### Prompt 3: Architecture Understanding
**Purpose:** Understand how frontend and backend connect
```
Explain how Cloudflare will work with my front and backend
```

**Outcome:** Received full architecture diagram showing:
- Frontend (Cloudflare Pages)
- Backend (Cloudflare Workers)
- AI (Workers AI - Llama 3.3)
- Storage (KV)

---

## 🛠️ Setup & Configuration

### Prompt 4: Development Environment
**Purpose:** Get installation instructions for macOS
```
can you give me the installation terminal prompts for the system pre-reqs
```

**Outcome:** Received Homebrew commands for Node.js, Git, and Wrangler CLI.

---

### Prompt 5: Dependency Installation
**Purpose:** Understand required npm packages
```
what dependencies do I need to install
```

**Outcome:** List of dependencies:
- wrangler (dev)
- @cloudflare/ai
- hono
- @cloudflare/workers-types

---

### Prompt 6: Wrangler Configuration
**Purpose:** Fix ES module format error
```
Binding 'AI' of type 'ai' requires a Worker written in ES module format. [code: 100329]
```

**Outcome:** Updated wrangler.toml with correct configuration and compatibility flags.

---

## 💻 Code Generation

### Prompt 7: Backend Code
**Purpose:** Generate the Worker API code
```
I wrote some sample task CRUD endpoints in Python, convert these endpoints to ones written in Typescript to help me learn the language. Explain how I would build the rest of my backend to connect my application to Cloudflare Workers
```

**Outcome:** Complete generation of `src/index.ts` with:
- CORS handling
- Chat endpoint with AI integration
- Python to TypeScript converted Task CRUD endpoints
- KV storage integration

---

### Prompt 8: Frontend Code
**Purpose:** Generate HTML and JavaScript
```
Can you help me create these files for the productivity/task agent?
```

**Outcome:** Received complete files:
- `public/index.html` - Chat UI structure
- `public/script.js` - API integration and DOM manipulation

---

### Prompt 9: Custom Styling
**Purpose:** Update CSS to match personal brand colors
```
ok I want update up the CSS so its more Anita-esque like this color palette: [orange-yellow gradient image]
```

**Outcome:** Complete CSS overhaul with:
- Orange (#FF6B00) to Gold (#FFD700) gradient theme
- Updated buttons, borders, and accents
- Custom scrollbar styling

---

## 🐛 Debugging

### Prompt 10: TypeScript Error
**Purpose:** Fix KVNamespace type error
```
Help me Debug this error: Cannot find name 'KVNamespace'.
```

**Outcome:** 
- Install @cloudflare/workers-types
- Create tsconfig.json with proper type configuration

---

### Prompt 11: Code Review
**Purpose:** Fix syntax errors in index.ts
```
Help me fix this syntax error: [pasted code]
```

**Outcome:** Identified and fixed:
- Missing `priority` field in Task interface
- Incorrect regex patterns
- Missing commas in `.replace()` calls
- Misplaced code block (GET tasks inside chat route)

---

### Prompt 12: 500 Server Error
**Purpose:** Fix internal server error on deployment
```
Error: internal error; reference = ehj9v0jdkrg45n68a52m45fv
```

**Outcome:** Updated wrangler.toml to use `assets` instead of `[site]` for static file serving.

---

## 📝 Documentation

### Prompt 13: Usage Instructions
**Purpose:** Improve user-facing directions
```
is this a strong explanation of directions: <p>Directions: Speak to the task agent about the task you want to add...
```

**Outcome:** Received clearer, more engaging copy with example commands.

---

### Prompt 14: README Generation
**Purpose:** Create comprehensive project documentation
```
ok I want to build a strong cleanly organized readme that allows me to describe how to use this project
```

**Outcome:** Complete README.md with:
- Project overview
- Tech stack table
- Installation instructions
- Usage guide
- API documentation
- Project structure

---

## 📊 Summary

| Category | Prompts Used |
|----------|--------------|
| Planning | 3 |
| Setup | 3 |
| Code Generation | 3 |
| Debugging | 3 |
| Documentation | 2 |
| **Total** | **14** |

---

## 🤖 AI Tool Used

- **Model:** Claude (Anthropic)
- **Interface:** Claude.ai web interface
- **Date:** January 2026