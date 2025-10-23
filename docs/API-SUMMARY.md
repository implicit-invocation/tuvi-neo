# API Summary - Vietnamese Ziwei Doushu

📚 **Related Documentation:**
- [← Back to README](../README.md)
- [JSON Format Reference](JSON_FORMAT.md)
- [Usage Examples](EXAMPLES.md)
- [Migration Guide](VERIFICATION.md)

## Quick Reference

### Function Signature
```typescript
function generateLaSo(input: GenerateLaSoInput): LaSoResult
```

### Input Type
```typescript
interface GenerateLaSoInput {
  name: string;
  gender: 'male' | 'female';
  birth: {
    isLunar: boolean;
    year: number;
    month: number;
    day: number;
    hour: number;      // 0-23
    minute?: number;   // 0-59 (optional)
  };
}
```

### Return Type
```typescript
class LaSoResult {
  // Properties (read-only)
  Info: LaSoInfo;
  Cac_cung: LaSoCung[];  // 12 palaces
  
  // Methods
  toJSONString(pretty?: boolean): string;
  toDisplayString(): string;
  getRawData(): LaSo;
}
```

## Common Usage Patterns

### Pattern 1: Generate and Display
```typescript
const laso = generateLaSo({
  name: 'Nguyễn Văn A',
  gender: 'male',
  birth: { isLunar: false, year: 1990, month: 5, day: 15, hour: 8 }
});

console.log(laso.toDisplayString());
```

### Pattern 2: Generate and Save JSON
```typescript
const laso = generateLaSo({...});
writeFileSync('chart.json', laso.toJSONString());
```

### Pattern 3: Access Specific Data
```typescript
const laso = generateLaSo({...});

// Basic info
console.log(laso.Info.ChuMenh);        // Life Lord
console.log(laso.Info.ThanCu);         // Body location

// Life Palace
const lifePalace = laso.Cac_cung[laso.Info.VTMenh - 1];
console.log(lifePalace.ChinhTinh);     // Main stars
```

### Pattern 4: Analyze Chart
```typescript
function analyzeChart(laso: LaSoResult) {
  // Count stars
  const totalStars = laso.Cac_cung.reduce(
    (sum, palace) => sum + palace.nChinhTinh + palace.nSaoTot + palace.nSaoXau,
    0
  );
  
  // Find palaces with most stars
  const richestPalace = laso.Cac_cung.reduce((max, palace) =>
    (palace.nChinhTinh + palace.nSaoTot) > (max.nChinhTinh + max.nSaoTot)
      ? palace : max
  );
  
  return { totalStars, richestPalace: richestPalace.Name };
}
```

## Key Properties Reference

### Info Section (14 fields)
| Property | Type | Description |
|----------|------|-------------|
| `AmDuong` | string | Yin/Yang + Gender |
| `VTMenh` | number | Life Palace position (1-12) |
| `CanNam` | number | Year Heavenly Stem (0-9) |
| `ChiNam` | number | Year Earthly Branch (0-11) |
| `Nam` | string | Year in Stem-Branch format |
| `Gio` | string | Birth hour name |
| `Ngay` | number | Lunar day |
| `Thang` | number | Lunar month |
| `Cuc` | string | Bureau name |
| `CucNH` | number | Bureau number (2-6) |
| `ChuMenh` | string | Life Lord star |
| `ChuThan` | string | Body Lord star |
| `ThanCu` | string | Body Palace location |
| `SoCuc` | number | Bureau calculation code |

### Palace Section (28 fields per palace)
| Property | Type | Description |
|----------|------|-------------|
| `Name` | string | Palace name (Lục Thân) |
| `Than` | number | Body Palace indicator (0/1) |
| `ChinhTinh` | CungStar[] | Main stars |
| `Saotot` | DetailedStar[] | Auspicious stars |
| `Saoxau` | DetailedStar[] | Inauspicious stars |
| `TrangSinh` | string | Life stage name |
| `LocNhap` | string? | Hóa Lộc star |
| `KyNhap` | string? | Hóa Kỵ star |
| `QuyenNhap` | string? | Hóa Quyền star |
| `KhoaNhap` | string? | Hóa Khoa star |
| ... | ... | 18 more fields |

## Star Types

### Main Stars (ChinhTinh)
```typescript
interface CungStar {
  Name: string;      // Star name
  Status: string;    // Brightness: H/M/Đ/V/B
  NguHanh: number;   // Element (1-6)
}
```

### Auxiliary Stars (Saotot/Saoxau)
```typescript
interface DetailedStar {
  Name: string;      // Star name
  NguHanh: number;   // Element (1-6)
  Type: number;      // Star type
  Highline: number;  // Important flag (0/1)
  Status: string;    // Brightness if applicable
}
```

## Time Conversion

| Hour (0-23) | Rounds to | Địa Chi |
|-------------|-----------|---------|
| 0 (00:00-00:29) | 0 | Tý |
| 0 (00:30-01:29) | 1 | Sửu |
| 8 (08:00-08:29) | 8 | Thìn |
| 8 (08:30-09:29) | 9 | Tị |
| 23 (23:00-23:59) | 23 | Tý |

Minutes are rounded to nearest hour using `Math.round()`.

## Error Handling

The library does not throw errors for invalid dates - it will calculate based on the input provided. Validation should be done before calling:

```typescript
function validateBirth(birth: BirthInfo): boolean {
  if (birth.month < 1 || birth.month > 12) return false;
  if (birth.day < 1 || birth.day > 31) return false;
  if (birth.hour < 0 || birth.hour > 23) return false;
  if (birth.minute && (birth.minute < 0 || birth.minute > 59)) return false;
  return true;
}
```

## TypeScript Tips

```typescript
// Import types for function parameters
import type { GenerateLaSoInput, LaSoResult } from './src';

// Import types for property access
import type { LaSoInfo, LaSoCung, CungStar } from './src';

// Type-safe palace iteration
function findPalaceByName(laso: LaSoResult, name: string): LaSoCung | undefined {
  return laso.Cac_cung.find(palace => palace.Name === name);
}

// Type-safe star filtering
function getMainStars(palace: LaSoCung): string[] {
  return palace.ChinhTinh.map(star => star.Name);
}
```

## See Also

- [README.md](../README.md) - Full documentation
- [JSON Format Reference](JSON_FORMAT.md) - JSON structure reference
- [Usage Examples](EXAMPLES.md) - More examples
- [Migration Guide](VERIFICATION.md) - Refactoring details
