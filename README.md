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

### Immediate
1. Add OpenAPI client generation for the frontend
2. Create a proper frontend UI that consumes the Items API
3. Replace default Vite app with actual items management interface

### Soon
1. Add database integration example (SQLite for simplicity)
2. Create example e2e tests showing API usage
3. Add development environment setup documentation

## 🚀 Quick Start

### Development
```bash
# Start API server (with Swagger docs at http://localhost:3000/api/docs)
npm run dev:api

# Start frontend (React + Vite)
npm run dev:web

# Start both concurrently
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

---

**Fork this repo to bootstrap your next AI-assisted project!**
