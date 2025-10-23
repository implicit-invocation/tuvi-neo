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
  
  // Convert minute to fractional hour (e.g., 30 minutes = 0.5 hour)
  const hourWithMinute = birth.hour + (birth.minute || 0) / 60;
  
  // Round to nearest hour for Địa Chi calculation
  const roundedHour = Math.round(hourWithMinute);
  
  let internalLaso;
  
  if (birth.isLunar) {
    // Lunar calendar input - need to convert to internal format
    // For lunar, we need tcNam and dcNam indices
    // We can derive from year using the same formula as calendar-converter
    const tcNam = ((birth.year - 4) % 10) + 1;
    const dcNam = ((birth.year - 4) % 12) + 1;
    
    // Convert hour to Địa Chi (1-12)
    const gio = roundedHour === 23 ? 1 : Math.floor((roundedHour + 1) / 2) + 1;
    
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
      hour: roundedHour,
    });
  }
  
  return new LaSoResult(internalLaso);
}
