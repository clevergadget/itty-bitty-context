# 🚀 Itty Bitty Context

**A forkable boilerplate repository designed to be maximally effective for AI-assisted development.**

This template provides a production-ready foundation with conventions that help AI agents understand, navigate, and modify code efficiently. Built with automated AI agent task processing and instruction generation capabilities.

## 🛠️ Tech Stack

- **Nx Workspace** - Monorepo tooling for scalable development
- **Backend**: NestJS with TypeScript, Swagger/OpenAPI docs
- **Frontend**: React + Vite with TypeScript
- **Shared**: Contracts library for type-safe API communication
- **AI Integration**: Gemini CLI for automated agent task processing
- **Package Manager**: pnpm
- **Testing**: Jest
- **Linting**: ESLint with TypeScript support

## ✅ What's Working

- ✅ **Nx Workspace** - Properly configured with auto-sync
- ✅ **API Core** - NestJS backend with Swagger setup and validation pipes
- ✅ **OpenAPI Documentation** - Live docs available at `/api/docs`
- ✅ **Contracts Library** - Shared types and DTOs for Items API
- ✅ **Items API** - Complete CRUD with proper Swagger documentation and error handling
- ✅ **TypeScript Configuration** - Path mapping for `@/contracts` configured
- ✅ **Testing Setup** - Jest tests passing for both API and contracts
- ✅ **Build System** - Both API and web apps build successfully

## 🎯 Next Steps

### Immediate - AI Agent Automation 🤖
1. **Gemini CLI Integration** - Install and configure Gemini CLI for automated task processing
2. **Agent Task Discovery** - Build scripts to find and process `AGENT_IMPLEMENTATION_TASK.md` files
3. **Instruction Generation** - Automated pipeline for agent workflow optimization
4. **Non-Interactive Processing** - Command-line automation for batch AI agent tasks

### Soon - Frontend Development 📱
1. **Connect Frontend to API** - Build Items management UI with CRUD operations
2. **Add API Client Generation** - Generate TypeScript clients from OpenAPI spec
3. **Enhanced UX** - Add form validation, loading states, and error handling
4. **Testing** - Add comprehensive frontend and integration tests

### Later
1. Add database integration example (SQLite for simplicity)
2. Create example business logic beyond basic CRUD
3. Add authentication and authorization patterns
4. Document deployment strategies and production setup

## 🚀 Quick Start

### Development
```bash
# Start API server (runs in background, Swagger docs at http://localhost:3000/api/docs)
npm run dev:api

# Start frontend (runs in background, React + Vite at http://localhost:4200)
npm run dev:web

# Start both concurrently (interactive mode)
npm run dev

# Stop all running servers
npm run stop
```
npm run dev
```

### Building
```bash
# Build everything
npm run build

# Build individually
npm run build:api
npm run build:web
```

### Testing
```bash
# Run all tests
npm run test

# Test individually
npm run test:api
npm run test:contracts
```

## 📁 Project Structure

```
itty-bitty-context/
├── apps/
│   ├── api-core/           # NestJS API with OpenAPI/Swagger
│   └── web-shell/          # React + Vite frontend
├── libs/
│   └── contracts/          # Shared DTOs and type definitions
├── AGENT_DEVELOPMENT_PLAN.md   # Current development status
├── AGENT_DEVELOPMENT_RULES.md  # AI-friendly coding conventions
└── package.json            # Root scripts and dependencies
```

## 🤖 AI-Friendly Features

This template is optimized for AI-assisted development with automated agent task processing:

- **Gemini CLI Integration** - Automated discovery and processing of agent implementation tasks
- **Agent Task Files** - Standardized `AGENT_IMPLEMENTATION_TASK.md` format for AI workflow automation
- **Instruction Generation Pipeline** - Automated creation of context-aware development instructions
- **Clear, consistent naming conventions** across all layers
- **OpenAPI-first API design** with live documentation
- **Shared type contracts** between frontend and backend
- **Predictable file structure** and import paths
- **Comprehensive inline documentation** and TODO comments
- **Agent development rules** for consistent code quality
- **Project context files** - Each subfolder has a `PROJECT_CONTEXT.md` explaining the monorepo structure

### 📁 Subfolder Development

Work in individual project folders while maintaining monorepo context:

```bash
# Generate context files for each project
npm run generate:context

# Then open any project folder in VS Code
# Each will have a PROJECT_CONTEXT.md with monorepo info
```

## 🔗 API Documentation

When running the API server, visit:
- **Swagger UI**: http://localhost:3000/api/docs
- **OpenAPI JSON**: http://localhost:3000/api/docs-json

## 📝 Development Workflow

1. **AI Agent Tasks**: Define automation tasks in `AGENT_IMPLEMENTATION_TASK.md` files
2. **Automated Processing**: Use Gemini CLI integration to process tasks automatically
3. **Backend First**: Define your API endpoints and DTOs in `apps/api-core`
4. **Contracts**: Export shared types from `libs/contracts`
5. **Frontend**: Consume the API using generated or manual client code
6. **Test**: Write tests for both API endpoints and business logic

## 🔧 AI Agent Commands

```bash
# Discover agent implementation tasks
npm run find-agent-tasks

# Process all agent tasks with Gemini CLI
npm run process-agent-tasks

# Generate development instructions
npm run generate:instructions
```

## 📚 AI Agent Documentation

**For Humans**: This repo includes comprehensive documentation designed for AI agents, but useful for human developers too:

- **`AGENT_DEVELOPMENT_RULES.md`** - Coding conventions and best practices optimized for AI assistance
- **`AGENT_DEVELOPMENT_PLAN.md`** - Current project status, roadmap, and what's working vs. what's missing  
- **Project Context Files** - Generated `PROJECT_CONTEXT.md` files in each subfolder explain the monorepo structure
- **MCP Instructions** - `.github/instructions/nx.instructions.md` provides AI agents with Nx-specific guidelines (auto-generated)

These files help ensure consistent, predictable development patterns whether you're working with AI assistants or onboarding new team members.

---

**Fork this repo to bootstrap your next AI-assisted project!**
