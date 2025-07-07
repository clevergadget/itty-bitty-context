# Integrate Google Gemini CLI for `AGENT_IMPLEMENTATION_TASK.md` Processing

## Phase 1: Research & Setup

### 1.1 Gemini CLI Overview & Installation DONE

* **Identify the correct package**: Use `@google/gemini-cli` (not `@google-ai/generativelanguage`).
* **Verify system requirements**: Ensure Node.js v20+ is installed.
* **Install the CLI**:

  * Locally: `npm install @google/gemini-cli`
  * Globally: `npm install -g @google/gemini-cli`
* **Test the CLI**:

  * Run `gemini --help`
  * Run a sample prompt: `gemini "Hello, world?"`

### 1.2 Authentication & Configuration NEXT

* **Obtain API credentials**:

  * Generate a Gemini API key from Google AI Studio.
* **Set up environment variables**:

  ```bash
  GEMINI_API_KEY=your_api_key_here
  ```
* **Interactive login (optional)**:

  * If no API key is set, CLI prompts for sign-in.
* **Model configuration**:

  * Default: Gemini 2.5 Pro.
  * Use `--model <model_name>` to override.
* **Optional parameters**:

  * Customize with `--temperature`, etc.
  * Can read from env vars like `GEMINI_TEMPERATURE`, `GEMINI_MAX_TOKENS`.

## Phase 2: Core Implementation

### 2.1 Integrating Gemini CLI into the Project

* **Add to dependencies**:

  * `@google/gemini-cli`, `glob`, `chalk`, `yargs`
* **Update `.gitignore`**:

  * Ignore `.env`, `results/`, etc.

### 2.2 File Discovery Script

* **Create `scripts/find-agent-tasks.js`**:

  * Use `glob("**/AGENT_IMPLEMENTATION_TASK.md")`
  * Handle errors gracefully
  * Support dry-run mode for verification

### 2.3 Gemini CLI Processing Wrapper

* **Create `scripts/gemini-processor.js`**:

  * Use `@<file_path>` syntax in prompt: `gemini -p "@path/to/file.md"`
  * Execute via `child_process.spawn` or `exec`
  * Capture stdout and stderr
  * Return structured result object:

    ```json
    {
      "file": "src/path/to/file.md",
      "success": true,
      "output": "...",
      "durationMs": 1234
    }
    ```
  * Handle retries and transient failures

### 2.4 Main Orchestration Script

* **Create `scripts/process-agent-tasks.js`**:

  * Import file list
  * Default sequential processing
  * Optional `--parallel` flag
  * Log progress using `chalk`
  * Save outputs in `results/`
  * Aggregate errors and output summary
  * Support `--dry-run`

## Phase 3: NPM Scripts & CLI Usage

### 3.1 Add Scripts to `package.json`

```json
{
  "scripts": {
    "gemini:auth": "gemini",
    "find-agent-tasks": "node scripts/find-agent-tasks.js",
    "process-agent-tasks": "node scripts/process-agent-tasks.js",
    "process-agent-tasks:parallel": "node scripts/process-agent-tasks.js --parallel",
    "process-agent-tasks:watch": "nodemon scripts/process-agent-tasks.js"
  }
}
```

### 3.2 Script Options and Flags

* `--dry-run`
* `--parallel[=n]`
* `--output-dir <path>`
* `--model <name>`
* `--temperature <value>`
* `--no-save`

## Phase 4: Output & Reporting

### 4.1 Output Directory Structure

```
results/
└─ agent-tasks/
   └─ 2025-07-07-13-30-00/
      ├─ summary.json
      ├─ processed/
      ├─ errors.json
```

### 4.2 Reporting and Integration

* Console summary: successes, failures, path
* Optional integration into generate\:context
* Add cleanup script: `npm run clean-agent-task-results`

## Phase 5: Error Handling & Validation

### 5.1 Robust Error Handling

* Handle:

  * Network/API failures (e.g., 429, timeouts)
  * File read/write issues
  * CLI install or auth errors
  * SIGINT for graceful shutdown

### 5.2 Input Validation

* Ensure files match pattern
* Validate Node.js version and API key
* Confirm output directory is writable
* Sanity-check flag combinations (e.g., `--dry-run` + `--parallel`)
* Throttle parallelism to avoid exceeding rate limits

## Phase 6: Documentation & Testing

### 6.1 Documentation

* **README.md**:

  * Setup instructions
  * Example usage
* **.env.example**:

  ```bash
  GEMINI_API_KEY=your_key
  GEMINI_MODEL=gemini-2.5-pro
  GEMINI_TEMPERATURE=0.7
  ```
* **docs/gemini-integration.md**:

  * In-depth usage and troubleshooting

### 6.2 Testing Strategy

* Unit test file discovery
* Stub/mock CLI execution for tests
* Manual integration test with sample files
* Test edge cases and CI dry-run

## Phase 7: Future Enhancements

### 7.1 Configuration & Flexibility

* Use `config/gemini/config.json`
* Add support for custom prompt templates
* Allow per-file model selection
* Consider structured (JSON) output prompts

### 7.2 Workflow Integration

* Git hooks (pre-commit or pre-push)
* CI/CD integration (e.g., PR comments with results)
* Watch mode with `chokidar`
* Enable MCP support if advanced capabilities are needed

## Technical Considerations

### Dependencies

```json
{
  "devDependencies": {
    "@google/gemini-cli": "^0.1.9",
    "glob": "^10.x.x",
    "chalk": "^5.x.x",
    "yargs": "^17.x.x"
  }
}
```

### Environment Variables

* `GEMINI_API_KEY` (required)
* `GEMINI_MODEL` (optional)
* `GEMINI_TEMPERATURE` (optional)
* `GEMINI_MAX_TOKENS` (optional)

### Logging & Metrics

* Include `--verbose` flag
* Log token usage (if supported)
* Add to summary.json

## File Structure (Post-Implementation)

```
project-root/
├─ scripts/
│   ├─ find-agent-tasks.js
│   ├─ gemini-processor.js
│   └─ process-agent-tasks.js
├─ results/
│   └─ agent-tasks/
│       ├─ 2025-07-07-13-30-00/
│       │    ├─ summary.json
│       │    ├─ processed/
│       │    └─ errors.json
├─ docs/
│   ├─ gemini-integration.md
├─ .env.example
└─ package.json
```

## Success Criteria

* ✅ Automated discovery of all task files
* ✅ Successful AI processing using Gemini CLI
* ✅ Runs in CI/non-interactive mode with API key
* ✅ Output artifacts stored and traceable
* ✅ Summary and console output is clear
* ✅ Documentation supports onboarding
* ✅ Existing workflows not broken
* ✅ Agent tasks meaningfully accelerated by AI

## Estimated Timeline

| Phase | Description                           | Duration   |
| ----- | ------------------------------------- | ---------- |
| 1-2   | Research, Setup, Basic Implementation | \~2 days   |
| 3-4   | Scripts & Output Handling             | \~1 day    |
| 5     | Error Handling                        | \~0.5 day  |
| 6     | Docs & Testing                        | \~1.5 days |
| 7     | Advanced Features (optional/future)   | N/A        |

> **Total Estimate**: \~4–5 days for core integration
