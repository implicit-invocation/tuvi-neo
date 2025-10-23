# JSON Output Format

The `LaSoResult` object contains structured data matching standard Vietnamese Ziwei Doushu APIs.

📚 **Related Documentation:**
- [← Back to README](../README.md)
- [API Summary](API-SUMMARY.md)
- [Usage Examples](EXAMPLES.md)

## Structure Overview

```json
{
  "Info": { ... },      // General chart information
  "Cac_cung": [ ... ]   // Array of 12 palaces
}
```

## Info Section

Contains general information about the natal chart:

```json
{
  "AmDuong": "Dương Nam",        // Yin/Yang + Gender
  "VTMenh": 7,                   // Life Palace position (1-12)
  "CanNam": 0,                   // Year Heavenly Stem (0-9, shifted index)
  "ChiNam": 10,                  // Year Earthly Branch (0-11, shifted index)
  "SoCuc": 35,                   // Bureau calculation code
  "Gio": "Tí",                   // Birth hour name
  "Ngay": 2,                     // Lunar day
  "Thang": 2,                    // Lunar month
  "Nam": "Canh Ngọ",            // Year in Stem-Branch
  "Cuc": "Thổ ngũ cục",         // Bureau name
  "CucNH": 5,                    // Bureau number (2-6)
  "ChuMenh": "Phá quân",        // Life Lord star (determined by year branch)
  "ChuThan": "Hỏa tinh",        // Body Lord star (determined by year branch)
  "ThanCu": "Thân cư Mệnh"      // Body Palace location (e.g., "Body resides in Life Palace")
}
```

**Note on CanNam and ChiNam:**
These use a shifted indexing system: `(arrayIndex + 4) % modulo`
- For Canh (array index 6): CanNam = (6 + 4) % 10 = 0
- For Ngọ (array index 6): ChiNam = (6 + 4) % 12 = 10

**ChuMenh (Life Lord) by Year Branch:**
- Tý → Tham lang
- Sửu → Cự môn
- Dần → Lộc tồn
- Mão → Văn xương
- Thìn → Liêm trinh
- Tị → Vũ khúc
- **Ngọ → Phá quân** ⭐
- Mùi → Vũ khúc
- Thân → Liêm trinh
- Dậu → Văn xương
- Tuất → Lộc tồn
- Hợi → Cự môn

**ChuThan (Body Lord) by Year Branch:**
- Tý → Hỏa tinh
- Sửu → Thiên tướng
- Dần → Thiên lương
- Mão → Thiên đồng
- Thìn → Văn xương
- Tị → Thiên cơ
- **Ngọ → Hỏa tinh** ⭐
- Mùi → Thiên tướng
- Thân → Thiên lương
- Dậu → Thiên đồng
- Tuất → Văn xương
- Hợi → Thiên cơ

**ThanCu (Body Palace Location):**
This field shows which palace the Body (Thân) is located in. Format: "Thân cư [Palace Name]"

Examples:
- "Thân cư Mệnh" - Body resides in Life Palace
- "Thân cư Tài bạch" - Body resides in Wealth Palace
- "Thân cư Phúc đức" - Body resides in Blessing Palace

The Body Palace location is calculated based on birth month and hour, and varies for each chart.

## Cac_cung Array

Contains 12 palace objects, one for each palace (Tý → Hợi):

```json
{
  "Name": "Mệnh",               // Palace name (Lục Thân)
  "Than": 1,                    // Body Palace indicator (0 or 1)
  "SoCuc": 35,                  // Palace-specific bureau code
  "Tuan": 0,                    // Tuần flag (0 or 1)
  "Triet": 0,                   // Triệt flag (0 or 1)
  "LuuTuan": 0,                 // Flow Tuần (0 or 1)
  "LuuTriet": 0,                // Flow Triệt (0 or 1)
  
  "nChinhTinh": 2,              // Count of main stars
  "ChinhTinh": [                // Main stars array
    {
      "Name": "Liêm trinh",
      "Status": "H",            // Brightness: H/M/Đ/V/B
      "NguHanh": 6              // Element (1-6)
    }
  ],
  
  "nSaoTot": 5,                 // Count of auspicious stars
  "Saotot": [                   // Auspicious stars
    {
      "Name": "Phúc đức",
      "NguHanh": 5,
      "Type": 3,
      "Highline": 0,            // Important star flag (0 or 1)
      "Status": ""              // Brightness if applicable
    }
  ],
  
  "nSaoXau": 1,                 // Count of inauspicious stars
  "Saoxau": [                   // Inauspicious stars
    {
      "Name": "Linh tinh",
      "NguHanh": 6,
      "Type": 3,
      "Highline": 1,
      "Status": "Đ"
    }
  ],
  
  "TrangSinh": "Tử",           // Life stage name
  "TrangSinhNH": 2,            // Life stage number (1-12)
  "ThangHan": 12,              // Month indicator
  "LuuDaiHan": 1,              // Major cycle indicator
  "LuuDaiHanTen": "",          // Major cycle name (if calculated)
  "LuuTieuHanTen": "",         // Minor cycle name (if calculated)
  
  "LocNhap": null,             // Hóa Lộc star name (if present)
  "KyNhap": null,              // Hóa Kỵ star name (if present)
  "QuyenNhap": null,           // Hóa Quyền star name (if present)
  "KhoaNhap": null,            // Hóa Khoa star name (if present)
  
  "TieuHan": "Tị",             // Palace branch name
  "CanCung": 9,                // Palace stem (0-9)
  "ChiCung": 7,                // Palace branch (0-11)
  "NguHanhCung": 5             // Palace element (1-6)
}
```

## Element Codes (NguHanh)

1. Kim (Metal)
2. Thủy (Water)
3. Mộc (Wood)
4. Hỏa (Fire)
5. Thổ (Earth)
6. Kim (Metal - variant)

## Brightness Status Codes

- `H`: Hãm (Weak)
- `M`: Miếu (Temple - Strong)
- `Đ`: Đắc địa (In position)
- `V`: Vượng (Prosperous)
- `B`: Bình hòa (Balanced)
- `N`: No status (empty string in output)

## Palace Order (0-11)

The `Cac_cung` array contains palaces in this order:

0. Tý (Rat)
1. Sửu (Ox)
2. Dần (Tiger)
3. Mão (Rabbit)
4. Thìn (Dragon)
5. Tị (Snake)
6. Ngọ (Horse)
7. Mùi (Goat)
8. Thân (Monkey)
9. Dậu (Rooster)
10. Tuất (Dog)
11. Hợi (Pig)

## Usage Example

```typescript
import { generateLaSo } from 'tuvi-neo';
import { writeFileSync } from 'fs';

const laso = generateLaSoFromGregorian({
  ten: 'Nguyễn Văn A',
  male: true,
  year: 1990,
  month: 5,
  day: 15,
  hour: 8,
});

const json = formatLaSoJson(laso);

// Save to file
writeFileSync('output.json', JSON.stringify(json, null, 2));

// Or send as API response
// res.json(json);
```

## Notes

- All indices are 0-based for compatibility with most programming languages
- The Life Palace (`VTMenh`) uses 1-based indexing (1-12)
- Empty cycles (`LuuDaiHanTen`, `LuuTieuHanTen`) would require additional calculations not included in the core engine
- Tứ Hóa stars are included in the main star arrays but also referenced in `LocNhap`, `KyNhap`, `QuyenNhap`, `KhoaNhap` fields
