// Lunar calendar conversion utilities
import { LunarCalendar } from '@dqcai/vn-lunar';

export interface GregorianDate {
  year: number;
  month: number;
  day: number;
  hour: number; // 0-23
}

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  hour: number; // 1-12 (Địa Chi)
  tcNam: number; // 1-10 (Thiên Can)
  dcNam: number; // 1-12 (Địa Chi)
}

/**
 * Convert Gregorian date to Lunar date with Stems and Branches
 */
export function gregorianToLunar(gregorian: GregorianDate): LunarDate {
  // Tí hour (23:00-00:59) belongs to the next day in Vietnamese/Chinese astrology
  let { year, month, day } = gregorian;
  if (gregorian.hour === 23) {
    const d = new Date(year, month - 1, day + 1);
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
  }

  // Use @dqcai/vn-lunar which correctly handles Vietnam timezone (UTC+7)
  const calendar = LunarCalendar.fromSolar(
    day,
    month,
    year
  );
  
  const lunar = calendar.lunarDate;
  
  // Get year stems and branches from "Can Chi" string (e.g., "Kỷ Tỵ")
  const yearCanChi = calendar.yearCanChi; // "Can Chi"
  const parts = yearCanChi.split(' ');
  const canStr = parts[0] || '';
  const chiStr = parts[1] || '';
  
  const tcNam = getThienCanIndex(canStr);
  const dcNam = getDiaChiIndex(chiStr);
  
  // Convert hour (0-23) to Địa Chi hour (1-12)
  // 23:00-00:59 = Tý (1), 01:00-02:59 = Sửu (2), etc.
  const gio = (gregorian.hour === 23 || gregorian.hour === 0) ? 1 : Math.floor((gregorian.hour + 1) / 2) + 1;
  
  return {
    year: lunar.year,
    month: lunar.month,
    day: lunar.day,
    hour: gio,
    tcNam,
    dcNam,
  };
}

/**
 * Get Thiên Can index from Vietnamese string or Chinese character
 */
function getThienCanIndex(char: string): number {
  const tcMap: { [key: string]: number } = {
    'Giáp': 1, '甲': 1,
    'Ất': 2, '乙': 2,
    'Bính': 3, '丙': 3,
    'Đinh': 4, '丁': 4,
    'Mậu': 5, '戊': 5,
    'Kỷ': 6, '己': 6,
    'Canh': 7, '庚': 7,
    'Tân': 8, '辛': 8,
    'Nhâm': 9, '壬': 9,
    'Quý': 10, '癸': 10,
  };
  return tcMap[char] || 1;
}

/**
 * Get Địa Chi index from Vietnamese string or Chinese character
 */
function getDiaChiIndex(char: string): number {
  const dcMap: { [key: string]: number } = {
    'Tý': 1, '子': 1,
    'Sửu': 2, '丑': 2,
    'Dần': 3, '寅': 3,
    'Mão': 4, '卯': 4,
    'Thìn': 5, '辰': 5,
    'Tị': 6, '巳': 6, 'Tỵ': 6, // Handle Tị/Tỵ variation
    'Ngọ': 7, '午': 7,
    'Mùi': 8, '未': 8,
    'Thân': 9, '申': 9,
    'Dậu': 10, '酉': 10,
    'Tuất': 11, '戌': 11,
    'Hợi': 12, '亥': 12,
  };
  return dcMap[char] || 1;
}
