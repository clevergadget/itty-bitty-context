#!/usr/bin/env node

/**
 * Generate contextual README files for each project in the monorepo
 * This helps AI agents understand they're in a subfolder of an Nx workspace
 */

const fs = require('fs');
const path = require('path');

// Root workspace info
const workspaceInfo = {
  name: "Itty Bitty Context",
  description: "A forkable boilerplate repository designed for AI-assisted development",
  techStack: [
    "Nx Workspace - Monorepo tooling",
    "NestJS - Backend API with TypeScript", 
    "React + Vite - Frontend with TypeScript",
    "Shared Contracts - Type-safe API communication",
    "pnpm - Package manager",
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
    features: [
      'Complete Items CRUD API',
      'Swagger/OpenAPI docs at /api/docs',
      'TypeScript with validation pipes',
      'Jest unit tests',
      'Shared contracts via @/contracts'
    ],
    commands: {
      'nx serve api-core': 'Start development server',
      'nx build api-core': 'Build for production',
      'nx test api-core': 'Run unit tests',
      'npm run start:dev': 'Start dev server (from this folder)',
      'npm run test:e2e': 'Run e2e tests'
    },
    urls: {
      'http://localhost:3000': 'API server',
      'http://localhost:3000/api/docs': 'Swagger UI documentation',
      'http://localhost:3000/api/docs-json': 'OpenAPI JSON spec'
    },
    relatedProjects: {
      '../../libs/contracts': 'Shared DTOs and types',
      '../web-shell': 'Frontend React app that consumes this API',
      '../api-core-e2e': 'End-to-end tests for this API'
    }
  },

  'apps/web-shell': {
    type: 'React + Vite Frontend Application',
    description: 'Frontend application built with React, TypeScript, and Vite',
    features: [
      'React 18 with TypeScript',
      'Vite for fast development and builds',
      'Shared contracts via @/contracts',
      'Modern development tooling'
    ],
    commands: {
      'nx serve web-shell': 'Start development server',
      'nx build web-shell': 'Build for production', 
      'nx test web-shell': 'Run unit tests',
      'npm run dev': 'Start dev server (from this folder)',
      'npm run build': 'Production build',
      'npm run preview': 'Preview production build'
    },
    urls: {
      'http://localhost:4200': 'React development server'
    },
    relatedProjects: {
      '../../libs/contracts': 'Shared DTOs and types',
      '../api-core': 'Backend API that this app consumes'
    }
  },

  'apps/api-core-e2e': {
    type: 'End-to-End Test Suite',
    description: 'E2E tests for the api-core application',
    features: [
      'Jest-based e2e testing',
      'API integration tests',
      'Test data setup and teardown'
    ],
    commands: {
      'nx test api-core-e2e': 'Run e2e tests',
      'npm run test:e2e': 'Run e2e tests (from this folder)'
    },
    relatedProjects: {
      '../api-core': 'API application under test',
      '../../libs/contracts': 'Shared DTOs and types'
    }
  },

  'libs/contracts': {
    type: 'Shared Library',
    description: 'Shared DTOs, types, and contracts for type-safe API communication',
    features: [
      'TypeScript interfaces and types',
      'Data Transfer Objects (DTOs)',
      'Shared between frontend and backend',
      'Jest unit tests'
    ],
    commands: {
      'nx build contracts': 'Build the library',
      'nx test contracts': 'Run unit tests',
      'npm run build': 'Build library (from this folder)',
      'npm run test': 'Run tests (from this folder)'
    },
    usage: {
      'Import in API': "import { CreateItemDto } from '@/contracts'",
      'Import in Web': "import { Item } from '@/contracts'"
    },
    relatedProjects: {
      '../../apps/api-core': 'Backend API that uses these contracts',
      '../../apps/web-shell': 'Frontend app that uses these contracts'
    }
  }
};

function generateProjectReadme(projectPath, config) {
  const projectName = path.basename(projectPath);
  const isApp = projectPath.startsWith('apps/');
  
  const content = `# 📍 ${config.type}: \`${projectName}\`

**🏠 You are in a subfolder of the Itty Bitty Context monorepo**

${config.description}

---

## 🎯 About This ${isApp ? 'App' : 'Library'}

${config.features.map(feature => `- ✅ ${feature}`).join('\n')}

## 🚀 Commands (From This Folder)

\`\`\`bash
${Object.entries(config.commands).map(([cmd, desc]) => `${cmd.padEnd(25)} # ${desc}`).join('\n')}
\`\`\`

${config.urls ? `## 🔗 URLs When Running

\`\`\`bash
${Object.entries(config.urls).map(([url, desc]) => `${url.padEnd(35)} # ${desc}`).join('\n')}
\`\`\`

` : ''}${config.usage ? `## 💻 Usage Examples

\`\`\`bash
${Object.entries(config.usage).map(([context, example]) => `# ${context}\n${example}`).join('\n\n')}
\`\`\`

` : ''}## 🔗 Related Projects

${Object.entries(config.relatedProjects).map(([path, desc]) => `- [\`${path}\`](${path}) - ${desc}`).join('\n')}

## 📦 Monorepo Context

**Workspace**: ${workspaceInfo.name}  
**Root Path**: \`../../\` (or \`../../../\` for e2e apps)  
**Package Manager**: pnpm  
**Build Tool**: Nx

### Root Workspace Commands

\`\`\`bash
${Object.entries(workspaceInfo.rootCommands).map(([cmd, desc]) => `${cmd.padEnd(25)} # ${desc}`).join('\n')}
\`\`\`

### Tech Stack
${workspaceInfo.techStack.map(tech => `- ${tech}`).join('\n')}

---

💡 **Working in a subfolder?** You're in the right place! This README was auto-generated to give you context about where you are in the monorepo.

**For more info**: See the root [\`README.md\`](../../README.md), [\`HUMAN_DEV_REMINDERS.md\`](../../HUMAN_DEV_REMINDERS.md), or [\`AGENT_DEVELOPMENT_RULES.md\`](../../AGENT_DEVELOPMENT_RULES.md)
`;

  return content;
}

// Generate README files for each project
function generateAllProjectReadmes() {
  const rootPath = path.join(__dirname, '..');
  
  Object.entries(projects).forEach(([projectPath, config]) => {
    const fullPath = path.join(rootPath, projectPath);
    const readmePath = path.join(fullPath, 'PROJECT_CONTEXT.md');
    
    if (fs.existsSync(fullPath)) {
      const content = generateProjectReadme(projectPath, config);
      fs.writeFileSync(readmePath, content);
      console.log(`✅ Generated PROJECT_CONTEXT.md for ${projectPath}`);
    } else {
      console.log(`⚠️  Project path not found: ${projectPath}`);
    }
  });
  
  console.log('\n🎉 All project context files generated!');
  console.log('\n💡 These files help AI agents understand the monorepo structure when working in subfolders.');
}

// Run the script
if (require.main === module) {
  generateAllProjectReadmes();
}

module.exports = { generateAllProjectReadmes };
