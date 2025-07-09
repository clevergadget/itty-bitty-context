# FUTURE_TASK: Gemini CLI Rule Compliance Testing

## Overview

Create automated tests to verify that Gemini CLI follows rules and instructions provided in context files (GEMINI.md) by analyzing its debug output.

## Problem Statement

We need to ensure that when we provide specific instructions to Gemini CLI through context files, it actually follows them. For example:
- When we tell it to ignore certain directories
- When we specify coding conventions
- When we set file filtering rules
- When we provide project-specific constraints

Currently, we have no automated way to verify compliance with these rules.

## Proposed Solution

### Test Framework Structure

Create a test suite that:

1. **Sets up controlled test scenarios** with specific GEMINI.md context files
2. **Runs Gemini CLI with debug mode** to capture its internal reasoning
3. **Analyzes debug output** to verify rule compliance
4. **Reports violations** and compliance status

### Test Categories

#### 1. Directory/File Filtering Tests
- **Rule**: "Do not examine files in the `node_modules/` directory"
- **Test**: Verify debug output doesn't show scanning of `node_modules/`
- **Verification**: Parse `[BfsFileSearch] Scanning` debug lines

#### 2. Coding Convention Tests
- **Rule**: "Use 2 spaces for indentation, prefer const over let"
- **Test**: Check generated code follows conventions
- **Verification**: Analyze code suggestions in output

#### 3. Project Scope Tests
- **Rule**: "Only work with TypeScript files, ignore Python scripts"
- **Test**: Verify file discovery and suggestions stay within scope
- **Verification**: Check file types mentioned in debug output

#### 4. Custom Instruction Tests
- **Rule**: "Always include error handling in API functions"
- **Test**: Verify suggested code includes error handling
- **Verification**: Parse generated code for try/catch or error checks

### Implementation Plan

#### Phase 1: Debug Output Parser
```javascript
// scripts/test-gemini-compliance.js
class GeminiDebugParser {
  parseFileScanning(debugOutput) {
    // Extract [BfsFileSearch] scanning paths
  }
  
  parseMemoryLoading(debugOutput) {
    // Extract [MemoryDiscovery] context loading
  }
  
  parseModelReasoning(debugOutput) {
    // Extract AI reasoning about rules
  }
}
```

#### Phase 2: Test Scenarios
```javascript
// tests/gemini-compliance/
├── directory-filtering.test.js
├── coding-conventions.test.js
├── project-scope.test.js
├── custom-instructions.test.js
└── test-contexts/
    ├── ignore-node-modules.md
    ├── typescript-only.md
    └── error-handling-required.md
```

#### Phase 3: Automated Test Runner
```json
// package.json
{
  "scripts": {
    "test:gemini-compliance": "node scripts/test-gemini-compliance.js",
    "test:gemini-rules": "jest tests/gemini-compliance/"
  }
}
```

### Test Implementation Example

```javascript
describe('Gemini CLI Rule Compliance', () => {
  it('should respect directory ignore rules', async () => {
    // Setup: Create temporary GEMINI.md with ignore rules
    const contextFile = `
# Project Rules
- Do not examine files in node_modules/
- Ignore .git directory
- Skip dist/ and build/ folders
`;
    
    // Execute: Run Gemini with debug mode
    const result = await runGeminiWithDebug(
      "List all TypeScript files in this project",
      { contextFile }
    );
    
    // Verify: Check debug output doesn't show ignored directories
    const scannedPaths = parseFileScanning(result.debugOutput);
    expect(scannedPaths).not.toContain('node_modules');
    expect(scannedPaths).not.toContain('.git');
    expect(scannedPaths).not.toContain('dist');
  });
  
  it('should follow coding conventions', async () => {
    // Setup: Context with specific coding rules
    const contextFile = `
# Coding Standards
- Use 2-space indentation
- Prefer const over let
- Always include JSDoc comments
`;
    
    // Execute: Ask for code generation
    const result = await runGeminiWithDebug(
      "Create a simple TypeScript function",
      { contextFile }
    );
    
    // Verify: Check generated code follows conventions
    const generatedCode = extractCodeFromOutput(result.output);
    expect(generatedCode).toMatch(/^  /m); // 2-space indentation
    expect(generatedCode).toContain('const ');
    expect(generatedCode).toContain('/**');
  });
});
```

### Debug Output Analysis Patterns

#### File Scanning Compliance
```javascript
// Look for these patterns in debug output:
// [DEBUG] [BfsFileSearch] Scanning [X/Y]: /path/to/directory
// Should NOT include ignored directories

const ignoredPatterns = [
  /node_modules/,
  /\.git/,
  /dist/,
  /build/,
  /coverage/
];
```

#### Memory Loading Verification
```javascript
// Verify context files are loaded:
// [DEBUG] [MemoryDiscovery] Loading server hierarchical memory
// [DEBUG] [MemoryDiscovery] Final ordered GEMINI.md paths to read: [...]

const expectedContexts = [
  './GEMINI.md',
  './.gemini/settings.json'
];
```

#### Rule Following Detection
```javascript
// Analyze AI reasoning in debug output for rule mentions
const ruleCompliancePatterns = [
  /following.*project.*rules/i,
  /according.*to.*guidelines/i,
  /respecting.*constraints/i
];
```

### Integration with Existing Scripts

#### Enhanced run-gemini.js
```javascript
// Add compliance testing mode
if (process.env.GEMINI_COMPLIANCE_TEST) {
  // Force debug mode
  args.push('--debug');
  
  // Save debug output for analysis
  saveDebugOutput(result.stderr, testId);
}
```

#### New NPM Scripts
```json
{
  "scripts": {
    "test:gemini-compliance": "GEMINI_COMPLIANCE_TEST=1 node scripts/test-gemini-compliance.js",
    "test:gemini-rules:watch": "nodemon scripts/test-gemini-compliance.js",
    "verify:gemini-context": "npm run test:gemini-compliance -- --context-only"
  }
}
```

### Advanced Testing Features

#### 1. Rule Violation Detection
- Parse debug output for signs of rule violations
- Generate reports with specific violation examples
- Track compliance scores over time

#### 2. Context File Validation
- Verify GEMINI.md files are being loaded correctly
- Test hierarchical context loading (global → project → local)
- Validate settings.json configurations

#### 3. Regression Testing
- Ensure new Gemini CLI versions maintain rule compliance
- Test with different models and configurations
- Validate sandbox mode doesn't break rule following

### Success Metrics

1. **Coverage**: Test all major rule categories
2. **Reliability**: Consistent rule compliance across test runs
3. **Performance**: Tests complete within reasonable time
4. **Maintenance**: Easy to add new rule types and scenarios

### Future Enhancements

1. **Visual Compliance Dashboard**: Web UI showing rule compliance status
2. **CI/CD Integration**: Automated compliance checks on commits
3. **Rule Complexity Testing**: Test nested and conditional rules
4. **Multi-Model Comparison**: Compare rule following across different AI models

## Dependencies

- Existing `run-gemini.js` script
- Jest or similar testing framework
- File system utilities for test setup/teardown
- Debug output parsing utilities

## Estimated Effort

- **Phase 1** (Parser): 1-2 days
- **Phase 2** (Test Scenarios): 2-3 days  
- **Phase 3** (Automation): 1-2 days
- **Total**: 4-7 days

## Priority

**Medium-High** - This is valuable for ensuring AI assistance follows project guidelines and doesn't violate specified constraints.

## Related Tasks

- Enhance `run-gemini.js` with compliance testing mode
- Create comprehensive GEMINI.md templates with common rules
- Document best practices for writing testable context rules
