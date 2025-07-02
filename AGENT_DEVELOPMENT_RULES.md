# 📐 Rules for Agent-Friendly Development

## 🎯 What This Repo Is

**Itty Bitty Context** is a forkable boilerplate repository designed to be maximally effective for AI-assisted development. This template provides a production-ready foundation with conventions that help AI agents understand, navigate, and modify code efficiently.

### Tech Stack
- **Nx Workspace** - Monorepo tooling for scalable development
- **Backend**: NestJS with TypeScript, Swagger/OpenAPI docs
- **Frontend**: React + Vite with TypeScript
- **Shared**: Contracts library for type-safe API communication
- **Package Manager**: pnpm
- **Testing**: Jest
- **Linting**: ESLint with TypeScript support

### Use Case
Fork this repo to quickly bootstrap new projects with AI agent-friendly conventions already in place. Every decision in this template asks: "Will this be clear and actionable for an AI assistant?"

---

This document outlines the conventions and practices for this template repository, designed to be maximally effective for AI-assisted development.

## 🧱 Structure & Conventions

### Directory Layout
- `apps/` for entrypoints (api, web)
- `libs/contracts/` for shared DTOs and contracts (renamed from api-interfaces for clarity)
- Each concept has **one home** - no duplicated types, routes, or logic across layers

### Naming Conventions
- **Uniform and explicit naming**: `createItemDto`, `ItemService`, `items.controller.ts`
- **Consistent file naming**: kebab-case for files, PascalCase for classes, camelCase for functions
- **Predictable imports**: `@/contracts` for shared types, clear barrel exports

### Documentation
- **All endpoints must be self-documented** using NestJS decorators + `@nestjs/swagger`
- **OpenAPI spec is the source of truth** - always available at `/api/docs`

## 🛠️ Coding Practices

### Function Design
- **Keep functions short and focused** - one responsibility per function
- **One export per file when practical** for clarity
- **Avoid implicit behavior** - favor declarative patterns and return values over side effects

### Error Handling
- **Use structured error responses** - never throw raw errors
- **Consistent error format**: `{ error: string, code?: string, details?: any }`

### Code Quality
- **Inline TODO comments** where work is unfinished
- **Be directive and specific**: `// TODO: call backend endpoint` not just `// TODO: fix this`

## 📊 Tooling & API Contracts

### OpenAPI Integration
- **Always expose live OpenAPI spec** at `/api/docs`
- **Generate client types automatically** when possible using tools like `openapi-typescript` or `orval`
- **Document codegen workflow** with clear instructions (e.g., `npm run generate:client`)

### Development Workflow
- **Consistent package manager**: Use pnpm throughout
- **Nx workspace structure** for scalability and tooling
- **Clear build/dev scripts** in each package.json

## 🤖 Agent Workflow Optimizations

### Task Scope
- **Limit each task to one file or operation** - chain steps across multiple runs
- **Comment scope boundaries clearly** - use markers like `// START FEATURE: items` if needed
- **Clean up after yourself** - remove unused imports, dead code, and outdated references when making changes

### Code Clarity
- **Keep logs clean and labeled** - avoid noisy or multi-line console output unless necessary
- **Prefer stable patterns over clever code** - simple, repetitive structures are easier for agents to extend
- **Explicit over implicit** - verbose is better than mysterious

### Template Maintenance
- **This repo will be cloned forever** - keep breaking changes minimal
- **Update this document** as patterns evolve
- **Version template changes** in git tags for easy rollback

## 🏗️ Current Template Structure

```
itty-bitty-context/
├── apps/
│   ├── api-core/           # NestJS API with Swagger
│   └── web-shell/          # Vite React app (planned)
├── libs/
│   └── contracts/          # Shared DTOs, Zod schemas
├── AGENT_DEVELOPMENT_RULES.md  # This file
└── nx.json                 # Nx workspace config
```

## 📝 Quick Commands

```bash
# Start development
nx serve api-core           # Start API server
nx serve web-shell          # Start frontend (once created)

# Build everything
nx build api-core
nx build contracts

# Generate types (future)
npm run generate:client     # Generate frontend API client

# Test
nx test api-core
nx test contracts
```

---

**Remember**: This template is optimized for AI agents. Every decision should ask: "Will this be clear and actionable for an AI assistant?"
