# 🎯 Current Task Plan: MFE Architecture Transition

## � Project Context

**Itty Bitty Context** is a forkable boilerplate repository designed to be maximally effective for AI-assisted development. This Nx workspace demonstrates production-ready patterns with conventions that help AI agents understand, navigate, and modify code efficiently.

**Current Tech Stack:**
- **Nx Workspace** - Monorepo tooling with pnpm
- **Backend**: NestJS + TypeScript + Swagger/OpenAPI (port 3000)
- **Frontend**: React + Vite + TypeScript (port 4200) 
- **Shared**: Contracts library for type-safe API communication
- **Current Status**: Complete Items CRUD API with working frontend

**Key Principle**: Every decision asks "Will this be clear and actionable for an AI assistant?"

## �📋 Task Overview

**Objective**: Transform the current monolithic web-shell into a 2-item Micro Frontend (MFE) architecture that demonstrates scalable patterns for AI-assisted development.

**Current State**: Single React app (`web-shell`) that manages Items with a complete CRUD interface connected to the NestJS API.

**Target State**: Host application with 2 independent micro frontends:
1. **Shell App** - Navigation, routing, shared layouts, and MFE orchestration
2. **Items MFE** - Complete Items management functionality (extracted from current web-shell)

## 🎯 Why This Architecture?

### Benefits for AI-Assisted Development
- **Isolated Concerns**: Each MFE can be developed, tested, and reasoned about independently
- **Clear Boundaries**: Well-defined interfaces between components make AI context more manageable
- **Incremental Development**: Add new features as separate MFEs without touching existing code
- **Technology Flexibility**: Different MFEs can use different frameworks/versions
- **Team Scalability**: Multiple AI agents could work on different MFEs simultaneously

### Technical Benefits
- **Independent Deployments**: Each MFE can be deployed separately
- **Runtime Composition**: Dynamic loading and unloading of features
- **Fault Isolation**: One MFE failure doesn't bring down the entire application
- **Code Reusability**: MFEs can be shared across different shell applications

## 🏗️ Architecture Design

### High-Level Structure
```
apps/
├── shell-host/           # Main shell application (new)
│   ├── Module Federation host
│   ├── Navigation & routing
│   ├── Shared layout components
│   └── MFE orchestration
├── items-mfe/           # Items micro frontend (new)
│   ├── Complete Items CRUD functionality
│   ├── Module Federation remote
│   └── Extracted from current web-shell
└── web-shell/           # Current app (will be deprecated)
    └── Keep temporarily for reference
```

### Hybrid Build Strategy (Vite + Webpack)
- **Development**: Continue using Vite for fast development and HMR
- **Production/MFE**: Use Webpack Module Federation for runtime composition
- **Shell Host**: Webpack Module Federation host that loads remote MFEs  
- **Items MFE**: Webpack Module Federation remote that exposes Items functionality
- **Shared Dependencies**: React, React-DOM shared between shell and MFEs
- **Best of Both Worlds**: Fast development (Vite) + Runtime composition (Webpack)

### Shared Libraries
```
libs/
├── contracts/           # API contracts (existing)
├── shared-ui/          # Common UI components (new)
│   ├── Layout components
│   ├── Form components
│   └── Design system basics
└── mfe-utils/          # MFE utilities (new)
    ├── Module Federation helpers
    ├── Routing utilities
    └── Error boundaries
```

## 📝 Detailed Implementation Plan

### Phase 0: Hybrid Build Verification (Session 0) 🧪
**Goal**: Verify that we can successfully use both Vite and Webpack in the same Nx workspace for different purposes


#### 0.1 Current Setup Validation
- [x] Verify existing Vite setup works for web-shell development
- [x] Verify existing Webpack setup works for api-core builds
- [x] Document current working configurations as baseline

---
### 📋 Baseline Working Configurations (Phase 0.1)

#### Vite config for `web-shell` (`apps/web-shell/vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/contracts': path.resolve(__dirname, '../../libs/contracts/src/index.ts'),
    },
  },
})
```

#### Webpack config for `api-core` (`apps/api-core/webpack.config.js`)
```javascript
const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, 'dist'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
};
```

#### 0.2 Webpack for Frontend Experiment
- [ ] Create a simple test React app using Webpack in the workspace
- [ ] Verify it can coexist with Vite-based web-shell
- [ ] Test that both can run simultaneously during development
- [ ] Validate build outputs and deployment scenarios

#### 0.3 Module Federation Proof of Concept
- [ ] Create minimal Module Federation host using Webpack
- [ ] Create minimal Module Federation remote using Webpack  
- [ ] Test runtime composition works correctly
- [ ] Document any conflicts or configuration challenges

#### 0.4 Hybrid Development Workflow
- [ ] Establish workflow for developing with Vite during iteration
- [ ] Establish process for building with Webpack for MFE production
- [ ] Test that TypeScript, ESLint, and other tools work with both
- [ ] Document the hybrid approach for future developers

### Phase 1: Foundation Setup (Session 1)
**Goal**: Create the basic MFE infrastructure using validated hybrid approach

#### 1.1 Create Shell Host Application
- [ ] Generate new Nx app: `shell-host` 
- [ ] Set up dual configuration: Vite for development, Webpack for MFE production
- [ ] Configure Webpack Module Federation as host
- [ ] Set up basic routing with React Router
- [ ] Create minimal layout with navigation placeholder
- [ ] Test development mode (Vite) and MFE mode (Webpack) work independently

#### 1.2 Create Items MFE Application  
- [ ] Generate new Nx app: `items-mfe`
- [ ] Set up dual configuration: Vite for development, Webpack for MFE production
- [ ] Configure Webpack Module Federation as remote
- [ ] Copy Items functionality from web-shell for initial testing
- [ ] Expose Items module through Module Federation
- [ ] Test standalone development and MFE remote modes

#### 1.3 Integration & Validation
- [ ] Test that Items MFE loads correctly in Shell Host (Webpack mode)
- [ ] Verify development workflow: develop in Vite, compose with Webpack
- [ ] Test hot reloading works in development mode
- [ ] Validate build outputs and runtime behavior

### Phase 2: Feature Migration (Session 2)
**Goal**: Complete the Items functionality migration using the validated hybrid approach

#### 2.1 Complete Items MFE Implementation
- [ ] Migrate all Items-related components from web-shell to items-mfe
- [ ] Set up proper development mode using Vite for fast iteration
- [ ] Copy and adapt API service layer with proper typing
- [ ] Implement Items routing within the MFE
- [ ] Add error boundaries specific to Items functionality
- [ ] Test Items CRUD operations in both Vite dev mode and Webpack MFE mode

#### 2.2 Shell Host Integration
- [ ] Implement navigation to Items section using Shell's Vite dev mode
- [ ] Set up routing to load Items MFE (Webpack production mode)
- [ ] Add loading states for MFE initialization
- [ ] Implement error handling for MFE failures
- [ ] Test full integration flow: Shell (Vite) + Items MFE (Webpack)
- [ ] Verify development workflow is smooth and performant

#### 2.3 Shared Libraries Creation
- [ ] Extract common UI components to `shared-ui`
- [ ] Create MFE utilities in `mfe-utils`
- [ ] Ensure shared libraries work with both Vite and Webpack builds
- [ ] Update both apps to use shared libraries
- [ ] Verify builds and runtime functionality in all configurations

### Phase 3: Production Readiness & Documentation (Session 3)
**Goal**: Polish the hybrid Vite + Webpack MFE setup for production use

#### 3.1 Build & Development Optimization
- [ ] Optimize Nx build targets for all apps (both Vite and Webpack modes)
- [ ] Fine-tune development workflow: Vite for iteration, Webpack for testing MFE integration
- [ ] Optimize shared dependencies and bundle sizes
- [ ] Add build validation and testing for both build systems
- [ ] Create efficient CI/CD pipeline supporting dual build approach

#### 3.2 Documentation & Developer Experience
- [ ] Update README with hybrid Vite + Webpack MFE architecture explanation
- [ ] Create comprehensive MFE development guidelines
- [ ] Document when to use Vite vs Webpack during development
- [ ] Add troubleshooting documentation for dual build system
- [ ] Update agent development rules for hybrid MFE patterns

#### 3.3 Testing & Validation
- [ ] Add integration tests for MFE loading (Webpack mode)
- [ ] Add unit tests that work in both Vite and Webpack environments
- [ ] Test Items functionality in all modes: Vite dev, Webpack dev, Webpack MFE
- [ ] Validate error scenarios and fallbacks
- [ ] Performance testing comparing Vite dev vs Webpack dev vs MFE runtime


### Phase 4: Workspace Cleanup & Legacy Removal (Session 4)
**Goal**: Remove deprecated files, obsolete configs, and ensure a clean, maintainable workspace after MFE migration.

#### 4.1 Remove Deprecated Applications & Files
- [ ] Remove `web-shell` app and all related files
- [ ] Remove any temporary/test React apps created for hybrid/webpack experiments
- [ ] Remove obsolete configs (e.g., old Vite/Webpack configs not used by shell-host/items-mfe)
- [ ] Remove any temporary scripts or assets used for migration

#### 4.2 Update Documentation & References
- [ ] Update all docs to remove references to deprecated apps/configs
- [ ] Ensure README and onboarding docs reflect the new MFE structure
- [ ] Add a migration note for future reference

#### 4.3 Final Workspace Validation
- [ ] Validate Nx project graph is clean (no orphaned projects)
- [ ] Validate all build/test/lint targets work as expected
- [ ] Confirm only new MFE apps and shared libs remain

**Files to clean up after migration:**
- `apps/web-shell/` (entire directory)
- Any test React app(s) created in Phase 0.2 (e.g., `apps/test-react-webpack/`)
- Old configs: `apps/web-shell/vite.config.ts`, `apps/api-core/webpack.config.js` (if replaced)
- Temporary scripts/assets used for migration


### Success Criteria
1. **Shell Host** runs on port 4200 with navigation
2. **Items MFE** loads dynamically at runtime
3. **Full Items CRUD** functionality works identically to current web-shell
4. **Independent Development** - Items MFE can be developed/built separately
5. **Clean Separation** - No shared state between shell and MFE beyond contracts
6. **Documentation** - Clear instructions for adding new MFEs

### File Structure After Completion
```
apps/
├── shell-host/
│   ├── src/
│   │   ├── main.tsx              # Shell entry point
│   │   ├── App.tsx               # Shell layout & routing
│   │   ├── navigation/           # Navigation components
│   │   └── mfe-loader/           # MFE loading utilities
│   ├── vite.config.ts            # Vite for development
│   ├── webpack.config.js         # Module Federation host config
│   └── package.json
├── items-mfe/
│   ├── src/
│   │   ├── main.tsx              # MFE entry point
│   │   ├── App.tsx               # Items app
│   │   ├── components/           # Items components
│   │   └── services/             # API services
│   ├── vite.config.ts            # Vite for development
│   ├── webpack.config.js         # Module Federation remote config
│   └── package.json
└── web-shell/ (deprecated)       # Keep for reference during transition
```

### Hybrid Development Workflow
```bash
# Fast development mode (Vite) - Individual MFE development
npm run dev:shell       # Shell development with Vite HMR
npm run dev:items       # Items development with Vite HMR

# MFE integration mode (Webpack) - Testing MFE composition
npm run dev:shell:mfe   # Shell as MFE host
npm run dev:items:mfe   # Items as MFE remote

# Full integration testing
npm run dev:mfe         # Start all MFEs in integration mode
```

### Dual Build Configuration Benefits
- **Fast Development**: Vite's instant HMR for rapid iteration
- **MFE Testing**: Webpack Module Federation for integration testing
- **Production Ready**: Optimized Webpack builds for deployment
- **Best of Both**: Combine speed of Vite with power of Module Federation

## 🚧 Risk Mitigation

### Technical Risks
- **Module Federation Complexity**: Start simple, add complexity incrementally
- **Build Configuration**: Use Nx generators for consistent setup
- **Runtime Errors**: Implement robust error boundaries and fallbacks
- **Performance**: Monitor bundle sizes and loading times

### Development Risks
- **Feature Regression**: Keep original web-shell until MFE is fully validated
- **Context Switching**: Complete one MFE fully before starting another
- **Documentation Debt**: Document decisions and patterns as we implement

## 🔄 Validation Points

### After Phase 1
- [ ] Shell Host loads successfully
- [ ] Items MFE can be accessed independently
- [ ] Basic integration works (can see Items UI in Shell)

### After Phase 2  
- [ ] All Items CRUD operations work in MFE
- [ ] Navigation between shell and Items is seamless
- [ ] Error handling works correctly

### After Phase 3
- [ ] Build process is documented and reliable
- [ ] New developers can add MFEs following patterns
- [ ] Performance is acceptable for development use

---

**Next Action**: Begin Phase 1.1 - Create Shell Host Application with Nx generator and basic Module Federation setup.
