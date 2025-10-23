# Examples

This folder contains usage examples for the Vietnamese Ziwei Doushu library.

📚 **[← Back to Main README](../README.md)**

## Running Examples

```bash
# Basic usage example
bun run examples/example-basic.ts

# Comprehensive API examples
bun run examples/example-new-api.ts
```

## Examples Overview

### 1. `example-basic.ts`
Basic usage showing:
- Chart generation
- Accessing Info properties
- Accessing palace data
- Text and JSON output

### 2. `example-new-api.ts`
Comprehensive examples including:
- Gregorian calendar input
- Lunar calendar input
- Direct property access
- Formatting methods
- Type-safe analysis functions

## Quick Example

```typescript
import { generateLaSo } from '../src';

const laso = generateLaSo({
  name: 'Nguyễn Văn A',
  gender: 'male',
  birth: {
    isLunar: false,
    year: 1990,
    month: 5,
    day: 15,
    hour: 8,
    minute: 30,
  },
});

// Access properties
console.log(laso.Info.ChuMenh);

// Format output
console.log(laso.toJSONString());
console.log(laso.toDisplayString());
```

## See Also

- **[API Summary](../docs/API-SUMMARY.md)** - Quick reference
- **[JSON Format](../docs/JSON_FORMAT.md)** - Output structure
- **[Usage Examples](../docs/EXAMPLES.md)** - More examples in docs
