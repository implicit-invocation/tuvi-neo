// Core types for Vietnamese Ziwei Doushu (Tử Vi Đẩu Số)

export type SaoType = 'L' | 'H' | 'C' | 'B' | 'S' | 'D' | 'V' | 'K';
export type DiaStatus = 'Đ' | 'H' | 'M' | 'V' | 'B' | 'N';

export interface Sao {
  id: number;
  ten: string;
  type: SaoType;
  pos: number;
  dia: DiaStatus;
  hanh: number; // 1=Kim, 2=Thuy, 3=Moc, 4=Hoa, 5=Tho
  bacDauTinh: boolean;
  catTinh: boolean;
  isRealSao: boolean;
  isPhiTinh: boolean;
}

export interface SaoData {
  id: number;
  ten: string;
  hanh: number;
  bacDT: boolean;
  catTinh: boolean;
  vuong: string;
  mieu: string;
  dac: string;
  binh: string;
  ham: string;
}

export interface InputData {
  ten: string;
  male: boolean;
  gio: number; // Địa chi giờ (1-12)
  ngay: number; // Ngày âm lịch (1-30)
  thang: number; // Tháng âm lịch (1-12)
  tcNam: number; // Thiên can năm (1-10)
  dcNam: number; // Địa chi năm (1-12)
}

export interface InputDataGregorian {
  ten: string;
  male: boolean;
  year: number;  // Gregorian year (e.g., 1990)
  month: number; // Gregorian month (1-12)
  day: number;   // Gregorian day (1-31)
  hour: number;  // Hour (0-23)
}

export interface LaSo {
  ten: string;
  male: boolean;
  gio: number;
  ngay: number;
  thang: number;
  tcNam: number;
  dcNam: number;
  menh: number;
  cuc: number;
  dnan: boolean;
  boSao: Sao[];
  cungSaos: Sao[][]; // 12 cung, each with array of Sao
}
