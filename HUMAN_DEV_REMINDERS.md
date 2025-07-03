# 🧠 Human Dev Reminders

**For humans who forget commands (which is all of us).**

This file collects all the common commands and workflows for the Itty Bitty Context boilerplate. Because remembering every CLI flag is impossible.

---

## 🚀 Quick Start Commands

```bash
# Start everything for development
npm run dev                 # Both API and web concurrently
npm run dev:api            # Just the NestJS API server
npm run dev:web            # Just the React + Vite frontend

# Build everything
npm run build              # Build all apps and libs
npm run build:api          # Just the API
npm run build:web          # Just the web app

# Run tests
npm run test               # All tests
npm run test:api           # Just API tests
npm run test:contracts     # Just contracts lib tests

# Generate project context files
npm run generate:context   # Create PROJECT_CONTEXT.md in each project folder
```

---

## 📦 pnpm Commands

```bash
# Install dependencies
pnpm install               # Install all workspace deps
pnpm add <package>         # Add to root workspace
pnpm add <package> --filter api-core    # Add to specific app
pnpm add <package> --filter contracts   # Add to specific lib

# Remove packages
pnpm remove <package>      # Remove from root
pnpm remove <package> --filter api-core

# Update dependencies
pnpm update               # Update all packages
pnpm outdated             # Check what's outdated

# Workspace info
pnpm list --depth=0       # See top-level packages
pnpm why <package>        # Why is this package installed?
```

---

## 🛠️ Nx Commands

```bash
# Serve/develop
nx serve api-core         # Start API server
nx serve web-shell        # Start React app

# Build
nx build api-core         # Build API
nx build web-shell        # Build React app
nx build contracts        # Build contracts lib

# Test
nx test api-core          # Run API tests
nx test contracts         # Run contracts tests
nx test api-core --watch  # Run tests in watch mode

# Lint
nx lint api-core          # Lint API code
nx lint web-shell         # Lint React code

# Graph and dependencies
nx graph                  # See project dependency graph
nx affected:build         # Build only affected projects
nx affected:test          # Test only affected projects

# Generate new apps/libs
nx g @nx/nest:app my-new-api
nx g @nx/react:app my-new-web
nx g @nx/js:lib my-new-lib
```

---

## 🌐 NestJS Commands

```bash
# Start development server
npm run start:dev         # (from apps/api-core)
npm run start:debug       # With debugging enabled

# Generate NestJS resources
npx nest g controller items    # New controller
npx nest g service items       # New service
npx nest g module items        # New module
npx nest g resource items      # Full CRUD resource

# Build and production
npm run build             # Build for production
npm run start:prod        # Start production server

# Testing
npm run test              # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Coverage report
```

---

## ⚡ Vite Commands

```bash
# Development (from apps/web-shell)
npm run dev               # Start dev server
npm run dev -- --host     # Expose on network
npm run dev -- --port 4000  # Custom port

# Build
npm run build             # Production build
npm run preview           # Preview production build

# Dependencies
npm run build -- --analyze  # Bundle analyzer (if configured)
```

---

## 📋 OpenAPI/Swagger

```bash
# Access Swagger UI
# http://localhost:3000/api/docs

# Get OpenAPI JSON spec
# http://localhost:3000/api/docs-json

# Generate client (future - not implemented yet)
npm run generate:client   # Will generate TypeScript client
```

---

## 🧪 Testing Commands

```bash
# Jest commands (from any app/lib)
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:cov          # Coverage report
npm run test -- --detectOpenHandles  # Debug hanging tests

# E2E testing (from api-core-e2e)
npm run test:e2e          # Run e2e tests
npm run test:e2e:watch    # E2E in watch mode
```

---

## 🔧 TypeScript Commands

```bash
# Type checking
npx tsc --noEmit          # Check types without building
npx tsc --noEmit --watch  # Watch mode type checking

# Build
npx tsc                   # Compile TypeScript
npx tsc --build           # Build project references
```

---

## 🐛 Debugging & Troubleshooting

```bash
# Clear caches
nx reset                  # Clear Nx cache
rm -rf node_modules       # Nuclear option
pnpm install             # Reinstall everything

# Check what's running on ports
lsof -i :3000            # Check port 3000 (API)
lsof -i :4200            # Check port 4200 (web)

# Nx troubleshooting
nx report                # Environment info
nx list                  # List available plugins
nx show project api-core # Show project details
```

---

## 📂 File Structure Navigation

```bash
# Key directories
apps/api-core/src/       # NestJS API source
apps/web-shell/src/      # React app source
libs/contracts/src/      # Shared types and DTOs

# Important files
apps/api-core/src/main.ts           # API entry point
apps/web-shell/src/main.tsx         # React entry point
libs/contracts/src/index.ts         # Shared types barrel
```

---

## 🔗 URLs When Running

```bash
# Development URLs
http://localhost:3000           # NestJS API
http://localhost:3000/api/docs  # Swagger UI
http://localhost:4200           # React app (default Vite port)

# API endpoints
GET    /api/items              # List all items
POST   /api/items              # Create item
GET    /api/items/:id          # Get specific item
PUT    /api/items/:id          # Update item
DELETE /api/items/:id          # Delete item
```

---

## 💡 Pro Tips

- **Use the root package.json scripts** - they're set up for convenience
- **Check `nx.json` and `package.json`** if commands aren't working
- **Swagger docs are your friend** - always up-to-date API reference
- **Path mapping is configured** - use `@/contracts` imports
- **Tests should pass before commits** - CI will catch you if they don't

## 📁 Working in Subfolders

When opening just a project subfolder in VS Code (to keep context itty bitty!):

- **Look for the 4 context files** - auto-generated context about the monorepo:
  - `PROJECT_OVERVIEW.md` - What this project is and why you're here
  - `MONOREPO_CONTEXT.md` - How this fits in the bigger picture  
  - `COMMANDS.md` - What you can run and how
  - `DEPENDENCIES.md` - What this connects to
- **Run `npm run generate:context`** from root to update these files
- **Links back to root docs** are included in each project context
- **Files are auto-generated** but committed to help AI agents

**Pro tip**: AI agents especially benefit from these context files when working in subfolders - they explain the constraints and "why you can't just install things"!

---

**Remember**: When in doubt, check the tool's `--help` flag or the official docs!
