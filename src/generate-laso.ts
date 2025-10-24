// Main API entry point
import { LaSoResult } from './laso-result';
import { generateLaSo as generateLaSoInternal, generateLaSoFromGregorian } from './laso';

export type Gender = "male" | "female";

export interface BirthInfo {
  isLunar: boolean;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute?: number;
}

export interface GenerateLaSoInput {
  name: string;
  gender: Gender;
  birth: BirthInfo;
}

/**
 * Generate a complete Tử Vi Lá Số (Vietnamese Ziwei Doushu natal chart)
 * 
 * @param input - Birth information and personal details
 * @returns LaSoResult object with Info, Cac_cung, and formatting methods
 * 
 * @example
 * ```typescript
 * const laso = generateLaSo({
 *   name: "Nguyễn Văn A",
 *   gender: "male",
 *   birth: {
 *     isLunar: false,
 *     year: 1990,
 *     month: 5,
 *     day: 15,
 *     hour: 8,
 *     minute: 30
 *   }
 * });
 * 
 * // Access properties directly
 * console.log(laso.Info.ChuMenh);
 * console.log(laso.Cac_cung[0].Name);
 * 
 * // Format as JSON string
 * console.log(laso.toJSONString());
 * 
 * // Format as human-readable text
 * console.log(laso.toDisplayString());
 * ```
 */
export function generateLaSo(input: GenerateLaSoInput): LaSoResult {
  const { name, gender, birth } = input;
  
  // Địa Chi hours are based on 2-hour periods starting at 23:00
  // 23:00-00:59 = Tí (1), 01:00-02:59 = Sửu (2), etc.
  // No rounding needed - just use the actual hour
  const hour = birth.hour;
  
  let internalLaso;
  
  if (birth.isLunar) {
    // Lunar calendar input - need to convert to internal format
    // For lunar, we need tcNam and dcNam indices
    // We can derive from year using the same formula as calendar-converter
    const tcNam = ((birth.year - 4) % 10) + 1;
    const dcNam = ((birth.year - 4) % 12) + 1;
    
    // Convert hour to Địa Chi (1-12)
    // 23:00-00:59 = Tí (1), 01:00-02:59 = Sửu (2), etc.
    const gio = (hour === 23 || hour === 0) ? 1 : Math.floor((hour + 1) / 2) + 1;
    
    internalLaso = generateLaSoInternal({
      ten: name,
      male: gender === "male",
      gio: gio,
      ngay: birth.day,
      thang: birth.month,
      tcNam: tcNam,
      dcNam: dcNam,
    });
  } else {
    // Gregorian calendar input
    internalLaso = generateLaSoFromGregorian({
      ten: name,
      male: gender === "male",
      year: birth.year,
      month: birth.month,
      day: birth.day,
      hour: hour,
    });
  }
  
  return new LaSoResult(internalLaso);
}
