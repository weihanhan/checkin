# AGENTS.md — Agentic Coding Guidelines

This file provides context for AI agents working in this repository.

## Project Overview

- **Type**: Simple Node.js ESM project
- **Purpose**: GitHub Actions automated check-in for GLaDOS service
- **Runtime**: Node.js 20+ (via GitHub Actions)
- **Dependencies**: None (uses native `fetch`)

---

## Build & Run Commands

### Running Locally
```bash
npm run main        # Run check-in script (requires GLADOS env var)
```

### GitHub Actions
The workflow (`.github/workflows/run.yml`) runs on:
- Manual trigger (`workflow_dispatch`)
- Every push
- Schedule: UTC 00:13 and 12:13 daily

```bash
# Required environment variables
GLADOS=<cookie>     # GLaDOS cookie (required for check-in)
NOTIFY=<token>      # PushPlus token (optional, for notifications)
```

### Testing
**No test framework is configured.** Manual verification:
```bash
GLADOS=<your_cookie> npm run main
```

---

## Code Style Guidelines

### General
- **Language**: Modern JavaScript (ESM with `async`/`await`)
- **Node version**: 20+ (as specified in workflow)
- **No external dependencies** — use native APIs only

### Formatting (per `.editorconfig`)
- **Indent**: 2 spaces
- **Line endings**: LF
- **Charset**: UTF-8
- **Trailing whitespace**: Trimmed
- **Final newline**: Inserted

### Naming Conventions
- Functions: `camelCase` (e.g., `glados`, `notify`, `main`)
- Variables: `camelCase`
- Constants: Not applicable (no const declarations)

### Async Patterns
- Use `async`/`await` over Promise chains
- Wrap async calls in `try`/`catch`
- Return error messages as arrays for notification formatting

### Error Handling
- Always wrap external API calls in `try`/`catch`
- Log errors to console with meaningful messages
- Fail gracefully (don't throw in production)

### Code Example

```javascript
const glados = async () => {
  const cookie = process.env.GLADOS
  if (!cookie) return  // Early exit for missing config
  
  try {
    const headers = {
      'cookie': cookie,
      'referer': 'https://glados.rocks/console/checkin',
      'user-agent': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)',
    }
    // Use native fetch with async/await
    const response = await fetch(url, { method: 'POST', ... })
    return await response.json()
  } catch (error) {
    // Handle errors gracefully
    return { error: error.message }
  }
}
```

### Imports
- No import statements needed (single-file project)
- Use environment variables via `process.env`

### Output Format
- Check-in results returned as arrays for PushPlus notification
- Format: `['Title', 'Message', 'Link']`

---

## File Structure

```
.
├── main.js              # Main entry point
├── package.json         # Project config (ESM)
├── .editorconfig        # Editor config
├── .github/
│   └── workflows/
│       └── run.yml      # GitHub Actions workflow
├── docs/
│   └── Action配置.md    # Documentation (Chinese)
└── README.md
```

---

## Adding Features

### Adding New Dependencies
1. Update `package.json` with `npm install <package>`
2. Test locally before committing
3. Ensure compatibility with Node.js 20+

### Adding New GitHub Actions Steps
Edit `.github/workflows/run.yml` following existing patterns:
- Use official `actions/checkout@v3` and `actions/setup-node@v3`
- Add environment variables via `secrets`

---

## Notes for AI Agents

- **Keep it simple**: This is a minimal automation script, not an enterprise app
- **No linting/formatting tools**: Manually follow `.editorconfig`
- **No tests**: Verify changes manually or via GitHub Actions
- **Chinese comments acceptable**: Project uses Chinese in user-facing output
- **Single file for logic**: Prefer adding to `main.js` over creating new files
