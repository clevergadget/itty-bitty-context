#!/usr/bin/env node

/**
 * Gemini CLI Non-Interactive Runner
 * 
 * This script reads configuration from environment variables and runs
 * the Gemini CLI in non-interactive mode with the specified parameters.
 * 
 * Environment Variables:
 * - GEMINI_API_KEY (required)
 * - GEMINI_MODEL (optional)
 * - GEMINI_SANDBOX (optional)
 * - DEBUG or DEBUG_MODE (optional)
 * - NO_COLOR (optional)
 * 
 * Usage:
 *   node scripts/run-gemini.js "Your prompt here"
 *   node scripts/run-gemini.js "@path/to/file.md"
 *   node scripts/run-gemini.js --help
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ Error: ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function warn(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function showHelp() {
  console.log(`
${colors.cyan}Gemini CLI Non-Interactive Runner${colors.reset}

${colors.yellow}Description:${colors.reset}
  Runs Gemini CLI in non-interactive mode using environment variables for configuration.

${colors.yellow}Environment Variables:${colors.reset}
  GEMINI_API_KEY      ${colors.gray}(required)${colors.reset} Your Gemini API key
  GEMINI_MODEL        ${colors.gray}(optional)${colors.reset} Model to use (e.g., gemini-2.5-pro, gemini-2.0-flash-exp)
  GEMINI_SANDBOX      ${colors.gray}(optional)${colors.reset} Enable sandbox mode (true, false, docker, podman)
  DEBUG or DEBUG_MODE ${colors.gray}(optional)${colors.reset} Enable verbose debug logging (true or 1)
  NO_COLOR            ${colors.gray}(optional)${colors.reset} Disable color output (any value)

${colors.yellow}Usage:${colors.reset}
  node scripts/run-gemini.js "Your prompt here"
  node scripts/run-gemini.js "@path/to/file.md"
  node scripts/run-gemini.js --help

${colors.yellow}Examples:${colors.reset}
  # Simple prompt
  node scripts/run-gemini.js "Explain TypeScript generics"
  
  # Include file content
  node scripts/run-gemini.js "@README.md Summarize this file"
  
  # With custom environment variables
  GEMINI_MODEL=gemini-2.5-pro node scripts/run-gemini.js "Your prompt"
  
  # Enable sandbox mode
  GEMINI_SANDBOX=docker node scripts/run-gemini.js "Your prompt"
  
  # Enable debug mode
  DEBUG=1 node scripts/run-gemini.js "Your prompt"

${colors.yellow}Setup:${colors.reset}
  1. Set your API key: source scripts/set-gemini-key.sh YOUR_API_KEY
  2. Or create a .env file with: GEMINI_API_KEY=your_key_here
  3. Optionally set other GEMINI_* environment variables
`);
}

function validateEnvironment() {
  // Check for API key
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    error('GEMINI_API_KEY environment variable is not set or is using placeholder value');
    info('Run: source scripts/set-gemini-key.sh YOUR_API_KEY');
    info('Or create a .env file with: GEMINI_API_KEY=your_key_here');
    return false;
  }

  // Validate sandbox setting if provided
  const sandbox = process.env.GEMINI_SANDBOX;
  if (sandbox !== undefined) {
    const validSandboxValues = ['true', 'false', 'docker', 'podman'];
    if (!validSandboxValues.includes(sandbox.toLowerCase()) && sandbox !== '1' && sandbox !== '0') {
      warn(`GEMINI_SANDBOX should be one of: ${validSandboxValues.join(', ')}, got: ${sandbox}`);
    }
  }

  return true;
}

function buildGeminiCommand(prompt) {
  const cmd = 'gemini';
  const args = [];

  // Add model if specified
  const model = process.env.GEMINI_MODEL;
  if (model) {
    args.push('--model', model);
  }

  // Add sandbox if specified
  const sandbox = process.env.GEMINI_SANDBOX;
  if (sandbox && ['true', '1', 'docker', 'podman'].includes(sandbox.toLowerCase())) {
    if (sandbox.toLowerCase() === 'true' || sandbox === '1') {
      args.push('--sandbox');
    } else {
      args.push('--sandbox');
      // Docker/podman specific handling would be done by gemini CLI itself
    }
  }

  // Add debug if specified
  const debug = process.env.DEBUG || process.env.DEBUG_MODE;
  if (debug && (debug.toLowerCase() === 'true' || debug === '1')) {
    args.push('--debug');
  }

  return { cmd, args, prompt };
}

function runGemini(prompt) {
  return new Promise((resolve, reject) => {
    const { cmd, args } = buildGeminiCommand(prompt);
    
    info(`Running: ${cmd} ${args.join(' ')}`);
    info(`Model: ${process.env.GEMINI_MODEL || 'default'}`);
    if (process.env.GEMINI_SANDBOX) {
      info(`Sandbox: ${process.env.GEMINI_SANDBOX}`);
    }
    
    const startTime = Date.now();
    
    // Build environment, respecting NO_COLOR if set
    const env = {
      ...process.env,
      // Ensure API key is passed to the child process
      GEMINI_API_KEY: process.env.GEMINI_API_KEY
    };
    
    // Handle NO_COLOR environment variable
    if (process.env.NO_COLOR) {
      env.NO_COLOR = process.env.NO_COLOR;
    }
    
    const child = spawn(cmd, args, {
      stdio: ['pipe', 'pipe', 'pipe'], // Enable stdin piping
      env: env
    });

    // Write the prompt to stdin and close it
    child.stdin.write(prompt + '\n');
    child.stdin.end();

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      const duration = Date.now() - startTime;
      
      if (code === 0) {
        success(`Gemini CLI completed successfully in ${duration}ms`);
        resolve({
          success: true,
          output: stdout,
          stderr: stderr,
          duration: duration,
          exitCode: code
        });
      } else {
        error(`Gemini CLI failed with exit code ${code}`);
        if (stderr) {
          log('Error output:', 'red');
          log(stderr, 'gray');
        }
        reject({
          success: false,
          output: stdout,
          stderr: stderr,
          duration: duration,
          exitCode: code
        });
      }
    });

    child.on('error', (err) => {
      const duration = Date.now() - startTime;
      
      if (err.code === 'ENOENT') {
        error('Gemini CLI not found. Please install it first:');
        info('npm install -g @google/gemini-cli');
      } else {
        error(`Failed to start Gemini CLI: ${err.message}`);
      }
      
      reject({
        success: false,
        error: err.message,
        duration: duration
      });
    });
  });
}

// Load .env file if it exists (mimicking the Gemini CLI behavior)
function loadEnvFile() {
  const envPaths = [
    '.env', // Current directory
    path.join(process.cwd(), '.env'),
    path.join(require('os').homedir(), '.env') // Home directory
  ];

  for (const envPath of envPaths) {
    try {
      const fullPath = path.resolve(envPath);
      if (fs.existsSync(fullPath)) {
        const envContent = fs.readFileSync(fullPath, 'utf8');
        
        // Parse .env file manually (simple implementation)
        envContent.split('\n').forEach(line => {
          line = line.trim();
          if (line && !line.startsWith('#')) {
            const [key, ...valueParts] = line.split('=');
            if (key && valueParts.length > 0) {
              const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
              if (!process.env[key]) { // Don't override existing env vars
                process.env[key] = value;
              }
            }
          }
        });
        
        // Stop at first found .env file
        break;
      }
    } catch {
      // Silently ignore errors - .env loading is optional
    }
  }
}

// Load .env file early
loadEnvFile();

async function main() {
  const args = process.argv.slice(2);
  
  // Show help if requested or no arguments provided
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  // Validate environment
  if (!validateEnvironment()) {
    process.exit(1);
  }

  // Get the prompt (join all arguments in case of spaces)
  const prompt = args.join(' ');
  
  if (!prompt.trim()) {
    error('No prompt provided');
    showHelp();
    process.exit(1);
  }

  try {
    info('Starting Gemini CLI...');
    const result = await runGemini(prompt);
    
    // Output the result
    if (result.output) {
      log('\n' + '='.repeat(50), 'cyan');
      log('GEMINI RESPONSE:', 'cyan');
      log('='.repeat(50), 'cyan');
      console.log(result.output);
      log('='.repeat(50), 'cyan');
    }
    
    success(`Completed in ${result.duration}ms`);
    process.exit(0);
    
  } catch (error) {
    if (error.stderr) {
      log('\nError details:', 'red');
      log(error.stderr, 'gray');
    }
    process.exit(error.exitCode || 1);
  }
}

// Handle SIGINT (Ctrl+C) gracefully
process.on('SIGINT', () => {
  warn('\nReceived SIGINT, exiting...');
  process.exit(130);
});

// Run the main function
if (require.main === module) {
  main().catch((err) => {
    error(`Unexpected error: ${err.message}`);
    process.exit(1);
  });
}

module.exports = { runGemini, buildGeminiCommand, validateEnvironment };
