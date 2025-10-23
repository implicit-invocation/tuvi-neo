# Recent Changes

## File Organization (Latest)

### What Changed
Reorganized project structure for better maintainability and navigation.

### Changes Made

#### 1. Created `docs/` folder
Moved all documentation (except README.md and CLAUDE.md) to `docs/`:
- ✅ API-SUMMARY.md
- ✅ JSON_FORMAT.md
- ✅ EXAMPLES.md
- ✅ VERIFICATION.md
- ✅ Added docs/README.md for navigation

#### 2. Created `examples/` folder
Moved all example files to `examples/`:
- ✅ example-basic.ts (previously index.ts)
- ✅ example-new-api.ts
- ✅ Added examples/README.md for navigation

#### 3. Updated Documentation
- ✅ Added "Related Documentation" headers to all docs
- ✅ Interlinked all documentation files
- ✅ Updated all file references and links
- ✅ Created ORGANIZATION.md guide

#### 4. Updated Main README
- ✅ Reorganized documentation section
- ✅ Added links to docs/ and examples/ folders
- ✅ Grouped by category (Documentation, Examples, Development)

### Project Structure

```
tuvi-neo/
├── README.md              # Main documentation
├── CLAUDE.md              # Development guidelines
├── ORGANIZATION.md        # Project structure guide
├── CHANGES.md             # This file
├── index.ts               # Main entry point (exports only)
│
├── docs/                  # 📁 Documentation folder
│   ├── README.md          # Documentation index
│   ├── API-SUMMARY.md     # Quick reference
│   ├── JSON_FORMAT.md     # Output structure
│   ├── EXAMPLES.md        # Usage examples
│   └── VERIFICATION.md    # Migration guide
│
├── examples/              # 💻 Examples folder
│   ├── README.md          # Examples index
│   ├── example-basic.ts   # Basic usage
│   └── example-new-api.ts # Comprehensive examples
│
└── src/                   # ⚙️ Source code
    ├── generate-laso.ts   # Main API
    ├── laso-result.ts     # Result class
    └── ... (other files)
```

### Benefits

1. **Better Organization**: Clear separation of docs, examples, and source code
2. **Easy Navigation**: Each folder has its own README with links
3. **Interlinked Docs**: All documentation cross-references each other
4. **Clean Root**: Less clutter in root directory

### Running Examples

```bash
# Basic example
bun run examples/example-basic.ts

# Comprehensive examples
bun run examples/example-new-api.ts
```

### Breaking Changes

**None!** All functionality remains the same. Only file locations changed.

### Migration for Users

If you have local scripts that reference files:

**Old paths:**
```typescript
// Previously at root
import something from './index.ts';
```

**New paths:**
```typescript
// Now organized
import { generateLaSo } from './src';  // or from root index.ts
```

**Example references:**
- Old: `index.ts` → New: `examples/example-basic.ts`
- Old: `example-new-api.ts` → New: `examples/example-new-api.ts`

**Documentation references:**
- Old: `./JSON_FORMAT.md` → New: `docs/JSON_FORMAT.md`
- Old: `./EXAMPLES.md` → New: `docs/EXAMPLES.md`

## API Refactoring (Previous)

See [docs/VERIFICATION.md](docs/VERIFICATION.md) for details on the API refactoring from verbose to clean API.

### Key Changes
- Single `generateLaSo()` function
- Type-safe gender enum
- Minute support in birth time
- Result object with methods
- Full TypeScript types

## All Features

### Current Features
- ✅ Clean single-function API
- ✅ Type-safe with full TypeScript support
- ✅ Dual calendar support (Gregorian/Lunar)
- ✅ Minute precision with auto-rounding
- ✅ Direct property access
- ✅ Built-in formatting methods
- ✅ 140+ stars calculation
- ✅ 12 palaces system
- ✅ Complete Tứ Hóa support
- ✅ JSON and text output
- ✅ Well-organized documentation
- ✅ Runnable code examples

### Verification

All tests passing:
```
✅ TypeScript compilation
✅ example-basic.ts
✅ example-new-api.ts
✅ 5 documentation files
✅ 2 example files
✅ All interlinks working
```

## Next Steps

For new users:
1. Read [README.md](README.md)
2. Run examples in [examples/](examples/)
3. Check [docs/](docs/) for detailed info

For developers:
1. Read [CLAUDE.md](CLAUDE.md)
2. Check [ORGANIZATION.md](ORGANIZATION.md)
3. Review [src/](src/) source code
