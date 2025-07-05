# 🚀 Itty Bitty Context

**A forkable boilerplate repository designed to be maximally effective for AI-assisted development.**

This template provides a production-ready foundation with conventions that help AI agents understand, navigate, and modify code efficiently.

## 🛠️ Tech Stack

- **Nx Workspace** - Monorepo tooling for scalable development
- **Backend**: NestJS with TypeScript, Swagger/OpenAPI docs
- **Frontend**: React + Vite with TypeScript
- **Shared**: Contracts library for type-safe API communication
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

### Immediate - MFE Architecture Implementation 🏗️
1. **Phase 0**: Verify hybrid Vite + Webpack approach works in Nx workspace
2. **Phase 1**: Create Shell Host and Items MFE with dual build configurations
3. **Phase 2**: Complete Items functionality migration using validated hybrid approach
4. **Phase 3**: Production readiness and comprehensive documentation

### Current Focus: Hybrid Build Strategy
- **Development**: Use Vite for fast development and hot module replacement
- **Production/MFE**: Use Webpack Module Federation for runtime composition
- **Best of Both**: Combine speed of Vite development with power of Module Federation

### Soon
1. Add second MFE for demonstration (Settings, Dashboard, etc.)
2. Create shared UI component library across MFEs  
3. Add comprehensive testing strategies for MFE applications
4. Document advanced MFE patterns and deployment strategies

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

This template is optimized for AI-assisted development:

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

1. **Backend First**: Define your API endpoints and DTOs in `apps/api-core`
2. **Contracts**: Export shared types from `libs/contracts`
3. **Frontend**: Consume the API using generated or manual client code
4. **Test**: Write tests for both API endpoints and business logic

## 📚 AI Agent Documentation

**For Humans**: This repo includes comprehensive documentation designed for AI agents, but useful for human developers too:

- **`AGENT_DEVELOPMENT_RULES.md`** - Coding conventions and best practices optimized for AI assistance
- **`AGENT_DEVELOPMENT_PLAN.md`** - Current project status, roadmap, and what's working vs. what's missing  
- **Project Context Files** - Generated `PROJECT_CONTEXT.md` files in each subfolder explain the monorepo structure
- **MCP Instructions** - `.github/instructions/nx.instructions.md` provides AI agents with Nx-specific guidelines (auto-generated)

These files help ensure consistent, predictable development patterns whether you're working with AI assistants or onboarding new team members.

---

**Fork this repo to bootstrap your next AI-assisted project!**
