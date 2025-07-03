#!/usr/bin/env node

/**
 * Generate contextual documentation for each project in the monorepo
 * This helps AI agents understand they're in a subfolder of an Nx workspace
 * and why they can't/shouldn't do certain things
 */

const fs = require('fs');
const path = require('path');

// Root workspace info
const workspaceInfo = {
  name: "Itty Bitty Context",
  description: "A forkable boilerplate repository designed for AI-assisted development",
  purpose: "This is a monorepo template optimized for AI agents to understand and modify efficiently",
  constraints: {
    packageManager: "pnpm (workspace-managed, don't install packages directly)",
    buildTool: "Nx (handles dependencies, don't run individual builds)",
    sharedCode: "Contracts library (@/contracts) - don't duplicate types",
    coordination: "Changes here may affect other projects - check the dependency graph"
  },
  techStack: [
    "Nx Workspace - Monorepo tooling with smart caching",
    "NestJS - Backend API with OpenAPI/Swagger docs", 
    "React + Vite - Frontend with TypeScript",
    "Shared Contracts - Type-safe API communication",
    "pnpm - Workspace-aware package manager",
    "Jest - Testing framework"
  ],
  rootCommands: {
    "npm run dev": "Start both API and web concurrently",
    "npm run dev:api": "Start just the NestJS API server", 
    "npm run dev:web": "Start just the React frontend",
    "npm run build": "Build all apps and libs",
    "npm run test": "Run all tests"
  }
};

// Project-specific configurations
const projects = {
  'apps/api-core': {
    type: 'NestJS API Application',
    description: 'Backend API server with OpenAPI/Swagger documentation',
    role: 'This is the main backend service that provides REST APIs for the frontend',
    whyHere: 'You might be working here to add new endpoints, modify business logic, or fix API issues',
    constraints: {
      dependencies: "Don't install packages directly - use 'pnpm add <package> --filter api-core' from root",
      types: "Import shared types from @/contracts - don't duplicate type definitions",
      testing: "Tests must pass before commits - they're checked in CI",
      swagger: "All endpoints must be documented with @nestjs/swagger decorators"
    },
    features: [
      'Complete Items CRUD API with validation',
      'Auto-generated Swagger/OpenAPI docs at /api/docs',
      'TypeScript with strict validation pipes',
      'Jest unit tests with coverage',
      'Shared contracts via @/contracts import'
    ],
    cannotDo: [
      "Cannot modify shared types (they're in libs/contracts)",
      "Cannot install packages without workspace coordination",
      "Cannot run standalone - depends on contracts library",
      "Cannot change API contract without updating frontend"
    ]
  },

  'apps/web-shell': {
    type: 'React + Vite Frontend Application',
    description: 'Frontend application that consumes the API',
    role: 'This is the main user interface that communicates with the API backend',
    whyHere: 'You might be working here to build UI components, add pages, or integrate with API endpoints',
    constraints: {
      dependencies: "Don't install packages directly - use 'pnpm add <package> --filter web-shell' from root",
      types: "Import shared types from @/contracts - don't duplicate API types",
      api: "Don't hardcode API endpoints - use the contracts for type safety",
      building: "Use 'nx build web-shell' from root for proper dependency resolution"
    },
    features: [
      'React 18 with TypeScript and strict mode',
      'Vite for fast development and builds',
      'Shared contracts via @/contracts import',
      'Modern development tooling and HMR'
    ],
    cannotDo: [
      "Cannot modify API types (they're in libs/contracts)",
      "Cannot install packages without workspace coordination", 
      "Cannot run without building contracts library first",
      "Cannot change shared types without coordinating with API"
    ]
  },

  'libs/contracts': {
    type: 'Shared TypeScript Library',
    description: 'Shared DTOs, types, and contracts for type-safe API communication',
    role: 'This is the single source of truth for data structures shared between frontend and backend',
    whyHere: 'You might be working here to add new types, modify existing interfaces, or update API contracts',
    constraints: {
      dependencies: "Don't install packages directly - use 'pnpm add <package> --filter contracts' from root",
      breaking: "Changes here affect BOTH frontend and backend - be careful",
      exports: "All types must be exported from index.ts for proper imports",
      testing: "All types should have corresponding tests"
    },
    features: [
      'TypeScript interfaces and types',
      'Data Transfer Objects (DTOs) for API',
      'Validation schemas and utilities',
      'Jest unit tests for type safety'
    ],
    cannotDo: [
      "Cannot make breaking changes without updating both apps",
      "Cannot install packages without workspace coordination",
      "Cannot run standalone - this is a library",
      "Cannot change exports without checking all usages"
    ]
  }
};

function generateProjectOverview(projectPath, config) {
  const projectName = path.basename(projectPath);
  const isApp = projectPath.startsWith('apps/');
  
  return `# 🏠 You're in: \`${projectName}\`

**${config.type}** - Part of the ${workspaceInfo.name} monorepo

## 🎯 What This ${isApp ? 'App' : 'Library'} Does

${config.description}

**Your Role Here**: ${config.role}

**Why You Might Be Here**: ${config.whyHere}

## ✅ What This Project Provides

${config.features.map(feature => `- ${feature}`).join('\n')}

## � What You Cannot Do (And Why)

${config.cannotDo.map(constraint => `- ${constraint}`).join('\n')}

## ⚠️ Important Constraints

${Object.entries(config.constraints).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

---

**💡 Need more context?** Check the other files in this directory:
- \`MONOREPO_CONTEXT.md\` - How this fits in the bigger picture
- \`COMMANDS.md\` - What you can actually run here
- \`DEPENDENCIES.md\` - What this project connects to
`;
}

function generateMonorepoContext(projectPath, config) {
  const projectName = path.basename(projectPath);
  const isApp = projectPath.startsWith('apps/');
  const rootPath = isApp ? '../../' : '../../../';
  
  return `# 🏗️ Monorepo Context

You are working in a **subfolder** of the ${workspaceInfo.name} monorepo.

## 🎯 Overall Project Purpose

${workspaceInfo.description}

**Key Insight**: ${workspaceInfo.purpose}

## 🧱 Tech Stack & Architecture

${workspaceInfo.techStack.map(tech => `- ${tech}`).join('\n')}

## 🔗 How Your Project Fits In

\`\`\`
${workspaceInfo.name}/
├── apps/
│   ├── api-core/          # NestJS backend with OpenAPI
│   ├── web-shell/         # React frontend
│   └── api-core-e2e/      # E2E tests
├── libs/
│   └── contracts/         # Shared types (YOU ARE HERE: ${projectPath})
└── scripts/               # Tooling and utilities
\`\`\`

## 🚨 Why You Can't Just Install Things

This is an **Nx workspace** with specific constraints:

${Object.entries(workspaceInfo.constraints).map(([key, value]) => `- **${key}**: ${value}`).join('\n')}

## 🏠 Root Commands (Run from ${rootPath})

\`\`\`bash
${Object.entries(workspaceInfo.rootCommands).map(([cmd, desc]) => `${cmd.padEnd(25)} # ${desc}`).join('\n')}
\`\`\`

## 📁 Quick Navigation

- Root README: [\`${rootPath}README.md\`](${rootPath}README.md)
- Development Rules: [\`${rootPath}AGENT_DEVELOPMENT_RULES.md\`](${rootPath}AGENT_DEVELOPMENT_RULES.md)
- Human Reminders: [\`${rootPath}HUMAN_DEV_REMINDERS.md\`](${rootPath}HUMAN_DEV_REMINDERS.md)
`;
}

function generateCommands(projectPath, config) {
  const projectName = path.basename(projectPath);
  const isApp = projectPath.startsWith('apps/');
  const rootPath = isApp ? '../../' : '../../../';
  
  // Generate commands based on project type
  const commands = {};
  
  if (isApp) {
    commands['nx serve ' + projectName] = 'Start development server';
    commands['nx build ' + projectName] = 'Build for production';
    commands['nx test ' + projectName] = 'Run unit tests';
    commands['nx lint ' + projectName] = 'Run linting';
    
    if (projectPath.includes('api-core')) {
      commands['nx test api-core-e2e'] = 'Run e2e tests';
    }
  } else {
    commands['nx build ' + projectName] = 'Build the library';
    commands['nx test ' + projectName] = 'Run unit tests';
    commands['nx lint ' + projectName] = 'Run linting';
  }
  
  return `# � Commands You Can Run

## From This Directory

\`\`\`bash
# Local development (these work from here)
npm run dev              # Start development server
npm run build            # Build this project
npm run test             # Run tests
npm run lint             # Run linting
\`\`\`

## From Root Directory (${rootPath})

\`\`\`bash
# Nx commands (preferred - understands dependencies)
${Object.entries(commands).map(([cmd, desc]) => `${cmd.padEnd(30)} # ${desc}`).join('\n')}

# Workspace commands
nx affected:build         # Build only affected projects
nx affected:test          # Test only affected projects
nx graph                  # See dependency graph
nx dep-graph              # Visual dependency graph
\`\`\`

## 🔍 Debugging Commands

\`\`\`bash
# Check what's running
lsof -i :3000            # API server port
lsof -i :4200            # Web app port

# Nx troubleshooting
nx reset                 # Clear Nx cache
nx report                # Environment info
nx show project ${projectName}   # Show project details
\`\`\`

${projectPath.includes('api-core') ? `## 🌐 URLs When Running

\`\`\`bash
http://localhost:3000              # API server
http://localhost:3000/api/docs     # Swagger UI
http://localhost:3000/api/docs-json # OpenAPI spec
\`\`\`
` : ''}${projectPath.includes('web-shell') ? `## 🌐 URLs When Running

\`\`\`bash
http://localhost:4200              # React development server
\`\`\`
` : ''}

## 💡 Pro Tips

- Use Nx commands from root when possible - they understand dependencies
- Check \`nx graph\` to see how your changes affect other projects
- Use \`nx affected:*\` commands to only run what's necessary
`;
}

function generateDependencies(projectPath, config) {
  const projectName = path.basename(projectPath);
  const isApp = projectPath.startsWith('apps/');
  
  // Build dependency info based on project type
  const dependencies = {};
  const dependents = {};
  
  if (projectPath.includes('api-core')) {
    dependencies['../../libs/contracts'] = 'Shared DTOs and types';
    dependents['../web-shell'] = 'Frontend consumes this API';
    dependents['../api-core-e2e'] = 'E2E tests for this API';
  } else if (projectPath.includes('web-shell')) {
    dependencies['../../libs/contracts'] = 'Shared DTOs and types';
    dependencies['../api-core'] = 'Backend API endpoints';
  } else if (projectPath.includes('contracts')) {
    dependents['../../apps/api-core'] = 'Backend uses these types';
    dependents['../../apps/web-shell'] = 'Frontend uses these types';
  }
  
  return `# 🔗 Project Dependencies

## 📥 What This Project Depends On

${Object.keys(dependencies).length > 0 ? 
  Object.entries(dependencies).map(([path, desc]) => `- [\`${path}\`](${path}) - ${desc}`).join('\n') :
  '- This project has no direct dependencies on other workspace projects'
}

## 📤 What Depends On This Project

${Object.keys(dependents).length > 0 ?
  Object.entries(dependents).map(([path, desc]) => `- [\`${path}\`](${path}) - ${desc}`).join('\n') :
  '- No other workspace projects depend on this one'
}

## � Understanding Dependencies

\`\`\`bash
# See the full dependency graph
nx graph

# Check what's affected by changes here
nx affected:graph

# Show this project's details
nx show project ${projectName}
\`\`\`

## ⚠️ Impact of Changes

${Object.keys(dependents).length > 0 ? 
  `**Changes here affect other projects!** 

When you modify this project, you may need to:
- Update dependent projects
- Run tests in affected projects
- Rebuild affected projects

Use \`nx affected:*\` commands to handle this automatically.` :
  `**This project is a leaf node** - changes here don't affect other projects.`
}

## 📦 Package Dependencies

\`\`\`bash
# Add dependencies (from root directory)
pnpm add <package> --filter ${projectName}

# Add dev dependencies
pnpm add <package> --filter ${projectName} --save-dev

# Why is this package here?
pnpm why <package>
\`\`\`

## 🎯 Import Patterns

${projectPath.includes('api-core') ? `\`\`\`typescript
// Correct - shared types
import { CreateItemDto, Item } from '@/contracts';

// Incorrect - don't duplicate types
interface Item { ... } // ❌
\`\`\`` : ''}${projectPath.includes('web-shell') ? `\`\`\`typescript
// Correct - shared types
import { Item, CreateItemDto } from '@/contracts';

// Correct - API service
import { apiClient } from './services/api';

// Incorrect - don't duplicate types
interface Item { ... } // ❌
\`\`\`` : ''}${projectPath.includes('contracts') ? `\`\`\`typescript
// Exports from this library
export interface Item { ... }
export class CreateItemDto { ... }

// These are imported elsewhere as:
// import { Item, CreateItemDto } from '@/contracts';
\`\`\`` : ''}
`;
}

// Generate multiple context files for each project
function generateAllProjectContext() {
  const rootPath = path.join(__dirname, '..');
  
  Object.entries(projects).forEach(([projectPath, config]) => {
    const fullPath = path.join(rootPath, projectPath);
    
    if (fs.existsSync(fullPath)) {
      // Generate overview file
      const overviewPath = path.join(fullPath, 'PROJECT_OVERVIEW.md');
      const overviewContent = generateProjectOverview(projectPath, config);
      fs.writeFileSync(overviewPath, overviewContent);
      
      // Generate monorepo context file
      const contextPath = path.join(fullPath, 'MONOREPO_CONTEXT.md');
      const contextContent = generateMonorepoContext(projectPath, config);
      fs.writeFileSync(contextPath, contextContent);
      
      // Generate commands file
      const commandsPath = path.join(fullPath, 'COMMANDS.md');
      const commandsContent = generateCommands(projectPath, config);
      fs.writeFileSync(commandsPath, commandsContent);
      
      // Generate dependencies file
      const depsPath = path.join(fullPath, 'DEPENDENCIES.md');
      const depsContent = generateDependencies(projectPath, config);
      fs.writeFileSync(depsPath, depsContent);
      
      console.log(`✅ Generated context files for ${projectPath}`);
    } else {
      console.log(`⚠️  Project path not found: ${projectPath}`);
    }
  });
  
  console.log('\n🎉 All project context files generated!');
  console.log('\nℹ️  Each project now has 4 focused context files:');
  console.log('   - PROJECT_OVERVIEW.md - What this project is and why you\'re here');
  console.log('   - MONOREPO_CONTEXT.md - How this fits in the bigger picture');
  console.log('   - COMMANDS.md - What you can run and how');
  console.log('   - DEPENDENCIES.md - What this connects to');
  console.log('\n💡 These files help AI agents understand constraints when working in subfolders.');
}

// Run the script
if (require.main === module) {
  generateAllProjectContext();
}

module.exports = { generateAllProjectContext };
