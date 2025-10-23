// Vietnamese Ziwei Doushu star calculation engine
import { Sao, SaoType, DiaStatus } from './types';
import { CS_DATA } from './sao-database';

export class AnSao {
  private boSao: Sao[] = [];
  private curPos = 0;

  public ten: string;
  public ngay: number;
  public thang: number;
  public tcNam: number;
  public dcNam: number;
  public gio: number;
  public phai: boolean;
  public menh: number = 0;
  public cuc: number = 0;
  public dnan: boolean;

  constructor(gio: number, ngay: number, thang: number, tcNam: number, dcNam: number, phai: boolean) {
    this.gio = gio;
    this.ngay = ngay;
    this.thang = thang;
    this.tcNam = tcNam;
    this.dcNam = dcNam;
    this.phai = phai;
    this.ten = '';
    
    // Determine DNAN (順行/逆行)
    if ((phai && tcNam % 2 > 0) || (!phai && tcNam % 2 === 0)) {
      this.dnan = true;
    } else {
      this.dnan = false;
    }

    this.anAll();
  }

  private xetSo(so: number, heso: number = 12): number {
    let ret = so % heso;
    if (ret <= 0) {
      ret += heso;
    }
    return ret;
  }

  private anAll(): void {
    this.lucThan();
    this.dinhCuc();
    this.tuVi();
    this.thaiTue();
    this.locTon();
    this.trangSinh();
    this.lucSat();
    this.xuongKhucKhoiViet();
    this.taHuuLongPhuong();
    this.khocHuThienNguyetDuc();
    this.hinhRieuYAnPhu();
    this.daoHongHi();
    this.thienDiaGiaiPhuCao();
    this.taiThoThuongSuLaVong();
    this.tuHoa();
    this.coQuaMaPha();
    this.quanPhucHaTru();
    this.kiepSatHoaCai();
    this.lnVanTinh();
    this.dauQuanThienKhong();
    this.tuanTriet();
    this.daiVan();
    this.tieuVan();
  }

  private lucThan(): void {
    const pos = this.menh = this.xetSo(2 + this.thang - this.gio + 1);
    
    // 12 palaces
    for (let i = 0; i < 12; i++) {
      this.boSao[this.curPos] = this.createBasicSao(i + 1, this.xetSo(pos + i), 'L');
      this.curPos++;
    }
    
    // Body palace
    const thanPos = this.xetSo(2 + this.thang + this.gio - 1);
    this.boSao[this.curPos] = this.createBasicSao(1, thanPos, 'H');
    this.curPos++;
  }

  private dinhCuc(): void {
    const cucArrays: { [key: number]: number[] } = {
      1: [2, 2, 6, 6, 3, 3, 5, 5, 4, 4, 6, 6], // Giáp, Kỷ
      2: [6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 5, 5], // Ất, Canh
      3: [5, 5, 3, 3, 2, 2, 4, 4, 6, 6, 3, 3], // Bính, Tân
      4: [3, 3, 4, 4, 6, 6, 2, 2, 5, 5, 4, 4], // Đinh, Nhâm
      5: [4, 4, 2, 2, 5, 5, 6, 6, 3, 3, 2, 2], // Mậu, Quí
    };

    let key: number;
    if (this.tcNam === 1 || this.tcNam === 6) key = 1;
    else if (this.tcNam === 2 || this.tcNam === 7) key = 2;
    else if (this.tcNam === 3 || this.tcNam === 8) key = 3;
    else if (this.tcNam === 4 || this.tcNam === 9) key = 4;
    else key = 5; // 5 or 10

    this.cuc = cucArrays[key]![this.menh - 1]!;
  }

  private tuVi(): void {
    const cucTables: { [key: number]: number[] } = {
      2: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 1, 1, 2, 2, 3, 3, 4, 4, 5],
      3: [5, 2, 3, 6, 3, 4, 7, 4, 5, 8, 5, 6, 9, 6, 7, 10, 7, 8, 11, 8, 9, 12, 9, 10, 1, 10, 11, 2, 11, 12],
      4: [12, 5, 2, 3, 1, 6, 3, 4, 2, 7, 4, 5, 3, 8, 5, 6, 4, 9, 6, 7, 5, 10, 7, 8, 6, 11, 8, 9, 7, 12],
      5: [7, 12, 5, 2, 3, 8, 1, 6, 3, 4, 9, 2, 7, 4, 5, 10, 3, 8, 5, 6, 11, 4, 9, 6, 7, 12, 5, 10, 7, 8],
      6: [10, 7, 12, 5, 2, 3, 11, 8, 1, 6, 3, 4, 12, 9, 2, 7, 4, 5, 1, 10, 3, 8, 5, 6, 2, 11, 4, 9, 6, 7],
    };

    const ccuc = cucTables[this.cuc]!;
    let pos = ccuc[this.ngay - 1]!;
    const tvpos = pos;

    // Tu Vi
    this.boSao[this.curPos] = this.createBasicSao(1, pos, 'C');
    this.curPos++;

    // Liem Trinh
    pos = this.xetSo(pos + 4);
    this.boSao[this.curPos] = this.createBasicSao(2, pos, 'C');
    this.curPos++;

    // Thien Dong
    pos = this.xetSo(pos + 3);
    this.boSao[this.curPos] = this.createBasicSao(3, pos, 'C');
    this.curPos++;

    // Vu Khuc
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(4, pos, 'C');
    this.curPos++;

    // Thai Duong
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(5, pos, 'C');
    this.curPos++;

    // Thien Co
    pos = this.xetSo(pos + 2);
    this.boSao[this.curPos] = this.createBasicSao(6, pos, 'C');
    this.curPos++;

    // Opposite side from Tu Vi
    pos = this.xetSo(3 - (tvpos - 3));

    // Thien Phu
    this.boSao[this.curPos] = this.createBasicSao(7, pos, 'C');
    this.curPos++;

    // Thai Am
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(8, pos, 'C');
    this.curPos++;

    // Tham Lang
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(9, pos, 'C');
    this.curPos++;

    // Cu Mon
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(10, pos, 'C');
    this.curPos++;

    // Thien Tuong
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(11, pos, 'C');
    this.curPos++;

    // Thien Luong
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(12, pos, 'C');
    this.curPos++;

    // That Sat
    pos = this.xetSo(pos + 1);
    this.boSao[this.curPos] = this.createBasicSao(13, pos, 'C');
    this.curPos++;

    // Pha Quan
    pos = this.xetSo(pos + 4);
    this.boSao[this.curPos] = this.createBasicSao(14, pos, 'C');
    this.curPos++;
  }

  private thaiTue(): void {
    let pos = this.dcNam;
    for (let i = 0; i < 12; i++) {
      this.boSao[this.curPos] = this.createBasicSao(15 + i, pos, 'B');
      pos = this.xetSo(pos + 1);
      this.curPos++;
    }
  }

  private locTon(): void {
    const lt = [3, 4, 6, 7, 6, 7, 9, 10, 12, 1];
    let pos = lt[this.tcNam - 1]!;
    const posbs = pos;

    for (let i = 0; i < 12; i++) {
      this.boSao[this.curPos] = this.createBasicSao(27 + i, pos, 'B');
      pos = this.dnan ? this.xetSo(pos + 1) : this.xetSo(pos - 1);
      this.curPos++;
    }

    // Bac Si
    this.boSao[this.curPos] = this.createBasicSao(109, posbs, 'B');
    this.curPos++;
  }

  private trangSinh(): void {
    let pos: number;
    switch (this.cuc) {
      case 4: pos = 6; break;
      case 3: pos = 12; break;
      case 6: pos = 3; break;
      default: pos = 9; break; // 2 or 5
    }

    for (let i = 0; i < 12; i++) {
      this.boSao[this.curPos] = this.createBasicSao(39 + i, pos, 'S');
      pos = this.dnan ? this.xetSo(pos + 1) : this.xetSo(pos - 1);
      this.curPos++;
    }
  }

  private lucSat(): void {
    const locTonPos = this.findID(27);
    
    // Da La
    let pos = this.xetSo(this.boSao[locTonPos]!.pos - 1);
    this.boSao[this.curPos] = this.createBasicSao(51, pos, 'B');
    this.curPos++;

    // Kinh Duong
    pos = this.xetSo(pos + 2);
    this.boSao[this.curPos] = this.createBasicSao(52, pos, 'B');
    this.curPos++;

    // Dia Kiep
    pos = this.xetSo(12 + this.gio - 1);
    this.boSao[this.curPos] = this.createBasicSao(54, pos, 'B');
    this.curPos++;

    // Dia Khong
    pos = this.xetSo(12 - this.gio + 1);
    this.boSao[this.curPos] = this.createBasicSao(53, pos, 'B');
    this.curPos++;

    // Hoa Tinh and Linh Tinh
    let posh: number, posl: number;
    switch (this.dcNam) {
      case 3: case 7: case 11:
        posh = 2; posl = 4; break;
      case 1: case 5: case 9:
        posh = 3; posl = 11; break;
      case 2: case 6: case 10:
        posh = 4; posl = 11; break;
      default:
        posh = 10; posl = 11; break;
    }

    if (this.dnan) {
      pos = this.xetSo(posh + this.gio - 1);
      this.boSao[this.curPos] = this.createBasicSao(56, pos, 'B');
      this.curPos++;
      pos = this.xetSo(posl - this.gio + 1);
      this.boSao[this.curPos] = this.createBasicSao(55, pos, 'B');
      this.curPos++;
    } else {
      pos = this.xetSo(posh - this.gio + 1);
      this.boSao[this.curPos] = this.createBasicSao(56, pos, 'B');
      this.curPos++;
      pos = this.xetSo(posl + this.gio - 1);
      this.boSao[this.curPos] = this.createBasicSao(55, pos, 'B');
      this.curPos++;
    }
  }

  private xuongKhucKhoiViet(): void {
    // Van Xuong
    let pos = this.xetSo(11 - this.gio + 1);
    this.boSao[this.curPos] = this.createBasicSao(57, pos, 'B');
    this.curPos++;

    // An Quang
    pos = this.xetSo(pos + this.ngay - 1 - 1);
    this.boSao[this.curPos] = this.createBasicSao(67, pos, 'B');
    this.curPos++;

    // Van Khuc
    pos = this.xetSo(5 + this.gio - 1);
    this.boSao[this.curPos] = this.createBasicSao(58, pos, 'B');
    this.curPos++;

    // Thien Quy
    pos = this.xetSo(pos - this.ngay + 1 + 1);
    this.boSao[this.curPos] = this.createBasicSao(68, pos, 'B');
    this.curPos++;

    // Thien Khoi and Thien Viet
    let posk = 0, posv = 0;
    switch (this.tcNam) {
      case 1: case 5:
        posk = 2; posv = 8; break;
      case 2: case 6:
        posk = 1; posv = 9; break;
      case 7: case 8:
        posk = 7; posv = 3; break;
      case 3: case 4:
        posk = 12; posv = 10; break;
      case 9: case 10:
        posk = 4; posv = 6; break;
    }

    this.boSao[this.curPos] = this.createBasicSao(59, posk, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(60, posv, 'B');
    this.curPos++;
  }

  private taHuuLongPhuong(): void {
    // Ta Phu
    let pos = this.xetSo(5 + this.thang - 1);
    this.boSao[this.curPos] = this.createBasicSao(61, pos, 'B');
    this.curPos++;

    // Tam Thai
    pos = this.xetSo(pos + this.ngay - 1);
    this.boSao[this.curPos] = this.createBasicSao(65, pos, 'B');
    this.curPos++;

    // Huu Bat
    pos = this.xetSo(11 - this.thang + 1);
    this.boSao[this.curPos] = this.createBasicSao(62, pos, 'B');
    this.curPos++;

    // Bat Toa
    pos = this.xetSo(pos - this.ngay + 1);
    this.boSao[this.curPos] = this.createBasicSao(66, pos, 'B');
    this.curPos++;

    // Long Tri
    pos = this.xetSo(5 + this.dcNam - 1);
    this.boSao[this.curPos] = this.createBasicSao(63, pos, 'B');
    this.curPos++;

    // Phuong Cac
    pos = this.xetSo(11 - this.dcNam + 1);
    this.boSao[this.curPos] = this.createBasicSao(64, pos, 'B');
    this.curPos++;
  }

  private khocHuThienNguyetDuc(): void {
    // Thien Khoc
    let pos = this.xetSo(7 - this.dcNam + 1);
    this.boSao[this.curPos] = this.createBasicSao(69, pos, 'B');
    this.curPos++;

    // Thien Hu
    pos = this.xetSo(7 + this.dcNam - 1);
    this.boSao[this.curPos] = this.createBasicSao(70, pos, 'B');
    this.curPos++;

    // Thien Duc
    pos = this.xetSo(10 + this.dcNam - 1);
    this.boSao[this.curPos] = this.createBasicSao(71, pos, 'B');
    this.curPos++;

    // Nguyet Duc
    pos = this.xetSo(6 + this.dcNam - 1);
    this.boSao[this.curPos] = this.createBasicSao(72, pos, 'B');
    this.curPos++;
  }

  private hinhRieuYAnPhu(): void {
    // Thien Hinh
    let pos = this.xetSo(10 + this.thang - 1);
    this.boSao[this.curPos] = this.createBasicSao(73, pos, 'B');
    this.curPos++;

    // Thien Rieu & Thien Y
    pos = this.xetSo(2 + this.thang - 1);
    this.boSao[this.curPos] = this.createBasicSao(74, pos, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(75, pos, 'B');
    this.curPos++;

    // Quoc An
    const locTonPos = this.findID(27);
    pos = this.xetSo(this.boSao[locTonPos]!.pos + 8);
    this.boSao[this.curPos] = this.createBasicSao(76, pos, 'B');
    this.curPos++;

    // Duong Phu
    pos = this.xetSo(this.boSao[locTonPos]!.pos - 7);
    this.boSao[this.curPos] = this.createBasicSao(77, pos, 'B');
    this.curPos++;
  }

  private daoHongHi(): void {
    // Dao Hoa
    const lf = this.dcNam % 4;
    let pos = 0;
    if (lf === 2) pos = 7;
    else if (lf === 0) pos = 1;
    else if (lf === 1) pos = 10;
    else if (lf === 3) pos = 4;
    
    this.boSao[this.curPos] = this.createBasicSao(78, pos, 'B');
    this.curPos++;

    // Hong Loan
    pos = this.xetSo(4 - this.dcNam + 1);
    this.boSao[this.curPos] = this.createBasicSao(79, pos, 'B');
    this.curPos++;

    // Thien Hi
    pos = this.xetSo(pos + 6);
    this.boSao[this.curPos] = this.createBasicSao(80, pos, 'B');
    this.curPos++;
  }

  private thienDiaGiaiPhuCao(): void {
    // Thien Giai
    let pos = this.xetSo(9 + this.thang - 1);
    this.boSao[this.curPos] = this.createBasicSao(81, pos, 'B');
    this.curPos++;

    // Dia Giai
    pos = this.xetSo(8 + this.thang - 1);
    this.boSao[this.curPos] = this.createBasicSao(82, pos, 'B');
    this.curPos++;

    // Giai Than
    const phuongCacPos = this.findID(64);
    pos = this.boSao[phuongCacPos]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(83, pos, 'B');
    this.curPos++;

    // Thai Phu
    const vanKhucPos = this.findID(58);
    pos = this.xetSo(this.boSao[vanKhucPos]!.pos + 2);
    this.boSao[this.curPos] = this.createBasicSao(84, pos, 'B');
    this.curPos++;

    // Phong Cao
    pos = this.xetSo(this.boSao[vanKhucPos]!.pos - 2);
    this.boSao[this.curPos] = this.createBasicSao(85, pos, 'B');
    this.curPos++;
  }

  private taiThoThuongSuLaVong(): void {
    // Thien Tai
    const menhPos = this.boSao[0]!.pos;
    let pos = this.xetSo(menhPos + this.dcNam - 1);
    this.boSao[this.curPos] = this.createBasicSao(86, pos, 'B');
    this.curPos++;

    // Thien Tho
    const phaQuanPos = this.boSao[12]!.pos;
    pos = this.xetSo(phaQuanPos + this.dcNam - 1);
    this.boSao[this.curPos] = this.createBasicSao(87, pos, 'B');
    this.curPos++;

    // Thien Thuong
    const thaiDuongPos = this.boSao[5]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(88, thaiDuongPos, 'B');
    this.curPos++;

    // Thien Su
    const thienPhuPos = this.boSao[7]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(89, thienPhuPos, 'B');
    this.curPos++;

    // Thien La & Dia Vong
    this.boSao[this.curPos] = this.createBasicSao(90, 5, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(91, 11, 'B');
    this.curPos++;
  }

  private tuHoa(): void {
    const loc = [2, 6, 3, 8, 9, 4, 5, 10, 12, 14];
    const quyen = [14, 12, 6, 3, 8, 9, 4, 5, 1, 10];
    const khoa = [4, 1, 57, 6, 62, 12, 8, 58, 61, 8];
    const ky = [5, 8, 2, 10, 6, 58, 3, 57, 4, 9];

    // Hoa Khoa
    const khoaPos = this.findID(khoa[this.tcNam - 1]!);
    let pos = this.boSao[khoaPos]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(92, pos, 'B');
    this.curPos++;

    // Hoa Quyen
    const quyenPos = this.findID(quyen[this.tcNam - 1]!);
    pos = this.boSao[quyenPos]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(93, pos, 'B');
    this.curPos++;

    // Hoa Loc
    const locPos = this.findID(loc[this.tcNam - 1]!);
    pos = this.boSao[locPos]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(94, pos, 'B');
    this.curPos++;

    // Hoa Ky
    const kyPos = this.findID(ky[this.tcNam - 1]!);
    pos = this.boSao[kyPos]!.pos;
    this.boSao[this.curPos] = this.createBasicSao(95, pos, 'B');
    this.curPos++;
  }

  private coQuaMaPha(): void {
    let posc: number, posq: number;
    
    // Co Than & Qua Tu
    if (this.dcNam === 1 || this.dcNam === 2 || this.dcNam === 12) {
      posc = 3; posq = 11;
    } else if (this.dcNam >= 3 && this.dcNam <= 5) {
      posc = 6; posq = 2;
    } else if (this.dcNam >= 6 && this.dcNam <= 8) {
      posc = 9; posq = 5;
    } else {
      posc = 12; posq = 8;
    }

    this.boSao[this.curPos] = this.createBasicSao(96, posc, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(97, posq, 'B');
    this.curPos++;

    // Thien Ma
    let pos = 0;
    if (this.dcNam % 4 === 2) pos = 12;
    else if (this.dcNam % 4 === 0) pos = 6;
    else if (this.dcNam % 4 === 1) pos = 3;
    else if (this.dcNam % 4 === 3) pos = 9;
    
    this.boSao[this.curPos] = this.createBasicSao(98, pos, 'B');
    this.curPos++;

    // Pha Toai
    if (this.dcNam % 3 === 1) pos = 6;
    else if (this.dcNam % 3 === 0) pos = 10;
    else if (this.dcNam % 3 === 2) pos = 2;
    
    this.boSao[this.curPos] = this.createBasicSao(99, pos, 'B');
    this.curPos++;
  }

  private quanPhucHaTru(): void {
    const quan = [8, 5, 6, 3, 4, 10, 12, 10, 11, 7];
    const phuc = [10, 9, 1, 12, 4, 3, 7, 6, 7, 6];
    const ha = [10, 11, 8, 5, 6, 7, 9, 4, 12, 3];
    const tru = [6, 7, 1, 6, 7, 9, 3, 7, 10, 11];

    this.boSao[this.curPos] = this.createBasicSao(100, quan[this.tcNam - 1]!, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(101, phuc[this.tcNam - 1]!, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(102, ha[this.tcNam - 1]!, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(103, tru[this.tcNam - 1]!, 'B');
    this.curPos++;
  }

  private kiepSatHoaCai(): void {
    let posk = 0, posh = 0;

    if (this.dcNam % 4 === 2) {
      posk = 3; posh = 2;
    } else if (this.dcNam % 4 === 0) {
      posk = 9; posh = 8;
    } else if (this.dcNam % 4 === 3) {
      posk = 12; posh = 11;
    } else if (this.dcNam % 4 === 1) {
      posk = 6; posh = 5;
    }

    this.boSao[this.curPos] = this.createBasicSao(104, posk, 'B');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(105, posh, 'B');
    this.curPos++;
  }

  private lnVanTinh(): void {
    const pos = [6, 7, 9, 10, 9, 10, 12, 1, 10, 4];
    this.boSao[this.curPos] = this.createBasicSao(106, pos[this.tcNam - 1]!, 'B');
    this.curPos++;
  }

  private dauQuanThienKhong(): void {
    const thaiTuePos = this.findID(15);
    const postt = this.boSao[thaiTuePos]!.pos;
    
    // Dau Quan
    let pos = this.xetSo(postt - this.thang + 1 + this.gio - 1);
    this.boSao[this.curPos] = this.createBasicSao(107, pos, 'B');
    this.curPos++;

    // Thien Khong
    pos = this.xetSo(postt + 1);
    this.boSao[this.curPos] = this.createBasicSao(108, pos, 'B');
    this.curPos++;
  }

  private tuanTriet(): void {
    let dc = this.dcNam;
    let tc = this.tcNam;

    // Find Tuan
    for (let i = 0; i < 14; i++) {
      dc = this.xetSo(dc + 1);
      tc = this.xetSo(tc + 1, 10);
      if (tc === 1) break;
    }

    this.boSao[this.curPos] = this.createBasicSao(110, dc, 'K');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(110, this.xetSo(dc + 1), 'K');
    this.curPos++;

    // Find Triet
    switch (this.tcNam) {
      case 1: case 6: dc = 9; break;
      case 2: case 7: dc = 7; break;
      case 3: case 8: dc = 5; break;
      case 4: case 9: dc = 3; break;
      case 5: case 10: dc = 1; break;
    }

    this.boSao[this.curPos] = this.createBasicSao(111, dc, 'K');
    this.curPos++;
    this.boSao[this.curPos] = this.createBasicSao(111, this.xetSo(dc + 1), 'K');
    this.curPos++;
  }

  private daiVan(): void {
    const ivan: number[] = [];
    for (let i = 0; i < 10; i++) {
      ivan[i] = this.cuc + 10 * i;
    }

    const pos = this.boSao[0]!.pos;
    for (let i = 0; i < 10; i++) {
      const vanPos = this.dnan ? this.xetSo(pos + i) : this.xetSo(pos - i);
      this.boSao[this.curPos] = this.createBasicSao(ivan[i]!, vanPos, 'D');
      this.curPos++;
    }
  }

  private tieuVan(): void {
    let pos = 0;
    if (this.dcNam % 4 === 3) pos = 5;
    else if (this.dcNam % 4 === 1) pos = 11;
    else if (this.dcNam % 4 === 2) pos = 8;
    else if (this.dcNam % 4 === 0) pos = 2;

    for (let i = 0; i < 12; i++) {
      const year = this.xetSo(this.dcNam + i);
      const vanPos = this.phai ? this.xetSo(pos + i) : this.xetSo(pos - i);
      this.boSao[this.curPos] = this.createBasicSao(year, vanPos, 'V');
      this.curPos++;
    }
  }

  private createBasicSao(id: number, pos: number, type: SaoType): Sao {
    if (type === 'C' || type === 'B' || type === 'S' || type === 'K') {
      const data = CS_DATA[id - 1]!;
      return {
        id,
        ten: data.ten,
        type,
        pos,
        dia: this.dacHamDia(pos, data),
        hanh: data.hanh,
        bacDauTinh: data.bacDT,
        catTinh: data.catTinh,
        isRealSao: true,
        isPhiTinh: false,
      };
    }

    return {
      id,
      ten: '',
      type,
      pos,
      dia: 'N',
      hanh: 0,
      bacDauTinh: false,
      catTinh: false,
      isRealSao: false,
      isPhiTinh: false,
    };
  }

  private dacHamDia(pos: number, csao: NonNullable<typeof CS_DATA[0]>): DiaStatus {
    const dh = pos === 10 ? 'a' : pos === 11 ? 'b' : pos === 12 ? 'c' : pos.toString();

    let temp = csao.dac;
    if (temp.indexOf(dh) > -1) return 'Đ';

    if (csao.ham.length === 0 && temp.length > 0) return 'H';

    temp = csao.ham;
    if (temp.indexOf(dh) > -1) return 'H';

    temp = csao.mieu;
    if (temp.indexOf(dh) > -1) return 'M';

    temp = csao.vuong;
    if (temp.indexOf(dh) > -1) return 'V';

    temp = csao.binh;
    if (temp.indexOf(dh) > -1) return 'B';

    return 'N';
  }

  private findID(id: number): number {
    for (let i = 0; i < this.boSao.length; i++) {
      if (this.boSao[i] && this.boSao[i]!.id === id && this.boSao[i]!.isRealSao) {
        return i;
      }
    }
    return -1;
  }

  public phanCung(): Sao[][] {
    const boCung: Sao[][] = Array.from({ length: 12 }, () => []);
    
    for (const sao of this.boSao) {
      if (sao && sao.pos > 0) {
        boCung[sao.pos - 1]!.push(sao);
      }
    }

    return boCung;
  }

  public getBoSao(): Sao[] {
    return this.boSao.filter(s => s !== undefined);
  }
}
