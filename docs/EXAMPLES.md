# Usage Examples

📚 **Related Documentation:**
- [← Back to README](../README.md)
- [API Summary](API-SUMMARY.md)
- [JSON Format Reference](JSON_FORMAT.md)

💻 **Code Examples:**
- [examples/example-basic.ts](../examples/example-basic.ts) - Basic usage
- [examples/example-new-api.ts](../examples/example-new-api.ts) - Comprehensive examples

---

## Example 1: JSON Output Format

Get structured JSON output matching the standard API format:

```typescript
import { generateLaSo } from 'tuvi-neo';

const person = {
  ten: 'Nguyễn Văn A',
  male: true,
  year: 1990,
  month: 5,
  day: 15,
  hour: 8,
};

const laso = generateLaSoFromGregorian(person);
const jsonOutput = formatLaSoJson(laso);

console.log(JSON.stringify(jsonOutput, null, 2));

// Save to file
import { writeFileSync } from 'fs';
writeFileSync('output.json', JSON.stringify(jsonOutput, null, 2));
```

**JSON Structure:**
```json
{
  "Info": {
    "AmDuong": "Dương Nam",
    "VTMenh": 7,
    "CanNam": 6,
    "ChiNam": 6,
    "Cuc": "Thổ ngũ cục",
    "ChuMenh": "Liêm trinh",
    ...
  },
  "Cac_cung": [
    {
      "Name": "Tử tức",
      "ChinhTinh": [...],
      "Saotot": [...],
      "Saoxau": [...],
      "TrangSinh": "Đế vượng",
      ...
    },
    ...
  ]
}
```

## Example 2: Gregorian Calendar (Most Common)

Use this when you have a regular birth date from a calendar or birth certificate:

```typescript
import { generateLaSoFromGregorian, formatLaSo } from './src/laso';

// Born on May 15, 1990 at 8:00 AM
const person = {
  ten: 'Nguyễn Văn A',
  male: true,
  year: 1990,
  month: 5,
  day: 15,
  hour: 8,  // 8:00 AM in 24-hour format
};

const laso = generateLaSoFromGregorian(person);
console.log(formatLaSo(laso));
```

## Example 3: Lunar Calendar (Traditional)

Use this when you already know the lunar calendar date:

```typescript
import { generateLaSo } from 'tuvi-neo';

// Born on 15th day of 8th lunar month, Giáp Tý year, at Thìn hour
const person = {
  ten: 'Nguyễn Văn A',
  male: true,
  ngay: 15,      // Lunar day
  thang: 8,      // Lunar month
  tcNam: 1,      // Giáp (1st Heavenly Stem)
  dcNam: 1,      // Tý (1st Earthly Branch)
  gio: 5,        // Thìn hour (7-9 AM)
};

const laso = generateLaSo(person);
console.log(formatLaSo(laso));
```

## Hour Conversion Tables

### Gregorian Hour (0-23) to Địa Chi Hour (1-12)

Automatically converted by `generateLaSoFromGregorian`:

| Gregorian Hours | Time Range | Địa Chi | Index |
|-----------------|------------|---------|-------|
| 23, 0 | 23:00-00:59 | Tý | 1 |
| 1, 2 | 01:00-02:59 | Sửu | 2 |
| 3, 4 | 03:00-04:59 | Dần | 3 |
| 5, 6 | 05:00-06:59 | Mão | 4 |
| 7, 8 | 07:00-08:59 | Thìn | 5 |
| 9, 10 | 09:00-10:59 | Tị | 6 |
| 11, 12 | 11:00-12:59 | Ngọ | 7 |
| 13, 14 | 13:00-14:59 | Mùi | 8 |
| 15, 16 | 15:00-16:59 | Thân | 9 |
| 17, 18 | 17:00-18:59 | Dậu | 10 |
| 19, 20 | 19:00-20:59 | Tuất | 11 |
| 21, 22 | 21:00-22:59 | Hợi | 12 |

**Note:** Hour 0 (midnight) and hour 23 (11 PM) both map to Tý (1), as the Tý period spans from 23:00 to 00:59.

### Heavenly Stems (Thiên Can) - 1-10

| Index | Vietnamese | Pinyin |
|-------|-----------|--------|
| 1 | Giáp | Jiǎ |
| 2 | Ất | Yǐ |
| 3 | Bính | Bǐng |
| 4 | Đinh | Dīng |
| 5 | Mậu | Wù |
| 6 | Kỷ | Jǐ |
| 7 | Canh | Gēng |
| 8 | Tân | Xīn |
| 9 | Nhâm | Rén |
| 10 | Quý | Guǐ |

### Earthly Branches (Địa Chi) - 1-12

| Index | Vietnamese | Pinyin | Zodiac |
|-------|-----------|--------|--------|
| 1 | Tý | Zǐ | Rat |
| 2 | Sửu | Chǒu | Ox |
| 3 | Dần | Yín | Tiger |
| 4 | Mão | Mǎo | Rabbit |
| 5 | Thìn | Chén | Dragon |
| 6 | Tị | Sì | Snake |
| 7 | Ngọ | Wǔ | Horse |
| 8 | Mùi | Wèi | Goat |
| 9 | Thân | Shēn | Monkey |
| 10 | Dậu | Yǒu | Rooster |
| 11 | Tuất | Xū | Dog |
| 12 | Hợi | Hài | Pig |

## Advanced: Getting Raw Data

```typescript
import { generateLaSoFromGregorian } from './src/laso';

const laso = generateLaSoFromGregorian({
  ten: 'Test Person',
  male: true,
  year: 1990,
  month: 5,
  day: 15,
  hour: 8,
});

// Access raw calculation data
console.log('Life Palace:', laso.menh);        // 1-12
console.log('Bureau:', laso.cuc);              // 2-6
console.log('Direction:', laso.dnan);          // true/false

// Access all stars
console.log('Total stars:', laso.boSao.length);

// Access stars by palace
laso.cungSaos.forEach((stars, index) => {
  console.log(`Palace ${index + 1} has ${stars.length} stars`);
});
```

## Programmatic Access

```typescript
import { generateLaSoFromGregorian } from './src/laso';
import { D_CHI } from './src/sao-database';

const laso = generateLaSoFromGregorian({
  ten: 'Analysis Subject',
  male: true,
  year: 1990,
  month: 5,
  day: 15,
  hour: 8,
});

// Find main stars in life palace
const lifePalaceStars = laso.cungSaos[laso.menh - 1];
const mainStars = lifePalaceStars.filter(s => s.type === 'C');

console.log('Main stars in Life Palace:');
mainStars.forEach(star => {
  console.log(`- ${star.ten} (${star.dia}) - Element: ${star.hanh}`);
});

// Find all auspicious stars
const allAuspiciousStars = laso.boSao.filter(s => s.catTinh && s.isRealSao);
console.log(`\nTotal auspicious stars: ${allAuspiciousStars.length}`);
```
