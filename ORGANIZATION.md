# Project Organization

This document describes the organization of the Vietnamese Ziwei Doushu library.

## Directory Structure

```
tuvi-neo/
├── README.md                  # Main documentation
├── CLAUDE.md                  # Bun development guidelines
├── index.ts                   # Main entry point (exports from src/)
├── package.json              # Project dependencies
├── tsconfig.json             # TypeScript configuration
│
├── src/                      # Source code
│   ├── generate-laso.ts      # Main API entry point
│   ├── laso-result.ts        # Result class with methods
│   ├── laso.ts               # Internal chart generation
│   ├── an-sao.ts             # Star positioning engine (753 lines)
│   ├── sao-database.ts       # 111 star definitions
│   ├── json-formatter.ts     # JSON output formatter
│   ├── calendar-converter.ts # Gregorian ↔ Lunar conversion
│   ├── types.ts              # TypeScript type definitions
│   ├── index.ts              # Public API exports
│   └── lunar-javascript.d.ts # Type declarations for lunar library
│
├── docs/                     # Documentation
│   ├── README.md             # Documentation index
│   ├── API-SUMMARY.md        # Quick reference guide
│   ├── JSON_FORMAT.md        # JSON structure reference
│   ├── EXAMPLES.md           # Detailed usage examples
│   └── VERIFICATION.md       # API refactoring details
│
└── examples/                 # Code examples
    ├── README.md             # Examples index
    ├── example-basic.ts      # Basic usage
    └── example-new-api.ts    # Comprehensive examples
```

## File Categories

### Core Library (`src/`)
- **Main API**: `generate-laso.ts`, `laso-result.ts`
- **Calculation Engine**: `an-sao.ts`, `laso.ts`
- **Data**: `sao-database.ts`, `calendar-converter.ts`
- **Types**: `types.ts`, `lunar-javascript.d.ts`
- **Formatting**: `json-formatter.ts`

### Documentation (`docs/`)
All documentation except the main README and development guidelines.

### Examples (`examples/`)
Runnable code examples demonstrating the API.

## Navigation

### Starting Points

**For Users:**
1. [README.md](README.md) - Start here
2. [examples/](examples/) - See it in action
3. [docs/API-SUMMARY.md](docs/API-SUMMARY.md) - Quick reference

**For Developers:**
1. [CLAUDE.md](CLAUDE.md) - Development setup
2. [src/](src/) - Source code
3. [docs/VERIFICATION.md](docs/VERIFICATION.md) - Architecture decisions

## Document Interlinking

All documentation files are interlinked:

- **README.md** links to all docs/ files
- **docs/README.md** provides navigation within docs/
- **docs/*.md** have "Related Documentation" sections at top
- **examples/README.md** links back to docs/

## Running Examples

```bash
# Basic example
bun run examples/example-basic.ts

# Comprehensive examples
bun run examples/example-new-api.ts
```

## Building/Testing

```bash
# Type check
bun run --bun tsc --noEmit

# Run examples
bun run examples/example-basic.ts
```

## Key Features by Location

### Main API (`src/generate-laso.ts`)
- Single `generateLaSo()` function
- Supports both Gregorian and Lunar calendars
- Minute-precision with automatic rounding

### Result Object (`src/laso-result.ts`)
- Direct property access (`laso.Info`, `laso.Cac_cung`)
- Built-in methods: `toJSONString()`, `toDisplayString()`
- Full TypeScript type definitions

### Documentation Flow
1. **README.md** - Overview and quick start
2. **docs/API-SUMMARY.md** - API reference
3. **docs/JSON_FORMAT.md** - Output structure
4. **docs/EXAMPLES.md** - Usage patterns
5. **docs/VERIFICATION.md** - Migration guide

## Best Practices

1. **Read README.md first** for project overview
2. **Run examples/** to see code in action
3. **Use docs/** for detailed reference
4. **Check CLAUDE.md** for Bun-specific development notes

## Changes from Previous Structure

**Before:**
- All MD files in root directory
- Examples mixed with source code
- No clear navigation between documents

**After:**
- Documentation in `docs/` folder
- Examples in `examples/` folder
- Clear interlinking with navigation headers
- Organized READMEs for each section

## Maintenance

When adding new documentation:
1. Place in appropriate folder (`docs/` or `examples/`)
2. Add navigation links at top of document
3. Update relevant README files
4. Interlink with related documents

When adding new examples:
1. Place in `examples/` folder
2. Update `examples/README.md`
3. Reference from main `README.md`
