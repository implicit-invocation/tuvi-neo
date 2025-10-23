// Main function to generate LaSo from birth data
import { AnSao } from './an-sao';
import { InputData, InputDataGregorian, LaSo } from './types';
import { D_CHI, T_CAN } from './sao-database';
import { gregorianToLunar } from './calendar-converter';

/**
 * Generate a complete LaSo from Gregorian (solar) date
 * 
 * @param input - Birth information with Gregorian date:
 *   - ten: Name
 *   - male: Gender (true = male, false = female)
 *   - year: Gregorian year (e.g., 1990)
 *   - month: Gregorian month (1-12)
 *   - day: Gregorian day (1-31)
 *   - hour: Hour (0-23)
 * @returns Complete LaSo chart with all stars positioned
 */
export function generateLaSoFromGregorian(input: InputDataGregorian): LaSo {
  // Convert Gregorian to Lunar
  const lunar = gregorianToLunar({
    year: input.year,
    month: input.month,
    day: input.day,
    hour: input.hour,
  });

  // Generate using lunar date
  return generateLaSo({
    ten: input.ten,
    male: input.male,
    gio: lunar.hour,
    ngay: lunar.day,
    thang: lunar.month,
    tcNam: lunar.tcNam,
    dcNam: lunar.dcNam,
  });
}

/**
 * Generate a complete LaSo (Vietnamese Ziwei Doushu chart) from birth information
 * 
 * @param input - Birth information including:
 *   - ten: Name
 *   - male: Gender (true = male, false = female)
 *   - gio: Hour in Địa Chi (1-12) 
 *   - ngay: Lunar day (1-30)
 *   - thang: Lunar month (1-12)
 *   - tcNam: Heavenly Stem year (1-10)
 *   - dcNam: Earthly Branch year (1-12)
 * @returns Complete LaSo chart with all stars positioned
 */
export function generateLaSo(input: InputData): LaSo {
  const anSao = new AnSao(
    input.gio,
    input.ngay,
    input.thang,
    input.tcNam,
    input.dcNam,
    input.male
  );

  return {
    ten: input.ten,
    male: input.male,
    gio: input.gio,
    ngay: input.ngay,
    thang: input.thang,
    tcNam: input.tcNam,
    dcNam: input.dcNam,
    menh: anSao.menh,
    cuc: anSao.cuc,
    dnan: anSao.dnan,
    boSao: anSao.getBoSao(),
    cungSaos: anSao.phanCung(),
  };
}

/**
 * Format LaSo data for display
 */
export function formatLaSo(laso: LaSo): string {
  const lines: string[] = [];
  
  lines.push(`=== LÁ SỐ TỬ VI ===`);
  lines.push(`Tên: ${laso.ten}`);
  lines.push(`Giới tính: ${laso.male ? 'Nam' : 'Nữ'}`);
  lines.push(`Sinh: Giờ ${D_CHI[laso.gio - 1]}, ngày ${laso.ngay}, tháng ${laso.thang}, năm ${T_CAN[laso.tcNam - 1]} ${D_CHI[laso.dcNam - 1]}`);
  lines.push(`Cung Mệnh: ${D_CHI[laso.menh - 1]}`);
  lines.push(`Cục: ${['', '', 'Thủy nhị', 'Mộc tam', 'Kim tứ', 'Thổ ngũ', 'Hỏa lục'][laso.cuc]}`);
  lines.push(`Đại Nạp: ${laso.dnan ? 'Thuận' : 'Nghịch'}`);
  lines.push('');

  // Display stars by palace
  const cungNames = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tị', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
  
  for (let i = 0; i < 12; i++) {
    const stars = laso.cungSaos[i]!;
    lines.push(`--- Cung ${cungNames[i]!} ---`);
    
    // Find palace name (Lục Thân)
    const lucThan = stars.find(s => s.type === 'L');
    if (lucThan) {
      const ltNames = ['Mệnh', 'Phụ mẫu', 'Phúc đức', 'Điền trạch', 'Quan lộc', 'Nô bộc', 'Di', 'Tật ách', 'Tài bạch', 'Tử tức', 'Phu thê', 'Huynh đệ'];
      lines.push(`[${ltNames[lucThan.id - 1]!}]`);
    }
    
    // Show main stars
    const mainStars = stars.filter(s => s.type === 'C');
    if (mainStars.length > 0) {
      lines.push('Chính tinh: ' + mainStars.map(s => `${s.ten}(${s.dia})`).join(', '));
    }
    
    // Show supplementary lucky stars
    const luckyStars = stars.filter(s => s.type === 'B' && s.catTinh);
    if (luckyStars.length > 0) {
      lines.push('Cát tinh: ' + luckyStars.map(s => s.ten + (s.dia !== 'N' ? `(${s.dia})` : '')).join(', '));
    }
    
    // Show supplementary unlucky stars
    const unluckyStars = stars.filter(s => s.type === 'B' && !s.catTinh);
    if (unluckyStars.length > 0) {
      lines.push('Hung tinh: ' + unluckyStars.map(s => s.ten).join(', '));
    }
    
    lines.push('');
  }

  return lines.join('\n');
}
