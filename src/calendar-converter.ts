// Lunar calendar conversion utilities
import { Solar, Lunar } from 'lunar-javascript';

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
  const solar = Solar.fromYmdHms(
    gregorian.year,
    gregorian.month,
    gregorian.day,
    gregorian.hour,
    0,
    0
  );
  
  const lunar = solar.getLunar();
  
  // Get year stems and branches
  const yearGanZhi = lunar.getYearInGanZhi();
  const tcNam = getThienCanIndex(yearGanZhi.substring(0, 1));
  const dcNam = getDiaChiIndex(yearGanZhi.substring(1, 2));
  
  // Convert hour (0-23) to Địa Chi hour (1-12)
  // 23:00-00:59 = Tý (1), 01:00-02:59 = Sửu (2), etc.
  const gio = (gregorian.hour === 23 || gregorian.hour === 0) ? 1 : Math.floor((gregorian.hour + 1) / 2) + 1;
  
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    hour: gio,
    tcNam,
    dcNam,
  };
}

/**
 * Get Thiên Can index from Chinese character
 */
function getThienCanIndex(char: string): number {
  const tcMap: { [key: string]: number } = {
    '甲': 1, // Giáp
    '乙': 2, // Ất
    '丙': 3, // Bính
    '丁': 4, // Đinh
    '戊': 5, // Mậu
    '己': 6, // Kỷ
    '庚': 7, // Canh
    '辛': 8, // Tân
    '壬': 9, // Nhâm
    '癸': 10, // Quý
  };
  return tcMap[char] || 1;
}

/**
 * Get Địa Chi index from Chinese character
 */
function getDiaChiIndex(char: string): number {
  const dcMap: { [key: string]: number } = {
    '子': 1,  // Tý
    '丑': 2,  // Sửu
    '寅': 3,  // Dần
    '卯': 4,  // Mão
    '辰': 5,  // Thìn
    '巳': 6,  // Tị
    '午': 7,  // Ngọ
    '未': 8,  // Mùi
    '申': 9,  // Thân
    '酉': 10, // Dậu
    '戌': 11, // Tuất
    '亥': 12, // Hợi
  };
  return dcMap[char] || 1;
}
