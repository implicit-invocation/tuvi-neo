// LaSo Result class with JSON structure and formatting methods
import { LaSo } from './types';
import { formatLaSoJson } from './json-formatter';
import { formatLaSo as formatLasoText } from './laso';

// JSON output types
export interface LaSoInfo {
  AmDuong: string;
  VTMenh: number;
  CanNam: number;
  ChiNam: number;
  SoCuc: number;
  Gio: string;
  Ngay: number;
  Thang: number;
  Nam: string;
  Cuc: string;
  CucNH: number;
  ChuMenh: string;
  ChuThan: string;
  ThanCu: string;
}

export interface CungStar {
  Name: string;
  Status: string;
  NguHanh: number;
}

export interface DetailedStar {
  Name: string;
  NguHanh: number;
  Type: number;
  Highline: number;
  Status: string;
}

export interface LaSoCung {
  Name: string;
  Than: number;
  SoCuc: number;
  Tuan: number;
  Triet: number;
  LuuTuan: number;
  LuuTriet: number;
  nChinhTinh: number;
  ChinhTinh: CungStar[];
  nSaoTot: number;
  Saotot: DetailedStar[];
  nSaoXau: number;
  Saoxau: DetailedStar[];
  TrangSinh: string;
  TrangSinhNH: number;
  ThangHan: number;
  LuuDaiHan: number;
  LuuDaiHanTen: string;
  LuuTieuHanTen: string;
  LocNhap: string | null;
  KyNhap: string | null;
  QuyenNhap: string | null;
  KhoaNhap: string | null;
  TieuHan: string;
  CanCung: number;
  ChiCung: number;
  NguHanhCung: number;
}

export class LaSoResult {
  public readonly Info: LaSoInfo;
  public readonly Cac_cung: LaSoCung[];
  
  private readonly rawLaso: LaSo;

  constructor(laso: LaSo) {
    this.rawLaso = laso;
    const formatted = formatLaSoJson(laso);
    this.Info = formatted.Info;
    this.Cac_cung = formatted.Cac_cung;
  }

  /**
   * Convert to JSON string
   */
  toJSONString(pretty: boolean = true): string {
    const obj = {
      Info: this.Info,
      Cac_cung: this.Cac_cung,
    };
    return pretty ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
  }

  /**
   * Convert to human-readable display string
   */
  toDisplayString(): string {
    return formatLasoText(this.rawLaso);
  }

  /**
   * Get raw LaSo data (for advanced usage)
   */
  getRawData(): LaSo {
    return this.rawLaso;
  }
}
