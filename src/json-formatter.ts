// JSON formatter matching the example output structure
import { LaSo } from "./types";
import { D_CHI, T_CAN, LUC_THAN } from "./sao-database";

interface JsonOutput {
  Info: InfoSection;
  Cac_cung: CungSection[];
}

interface InfoSection {
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
  ThanCu: string; // Body Palace location, e.g., "Thân cư Mệnh"
  // Add other fields as needed
}

interface CungSection {
  Name: string;
  Than: number;
  SoCuc: number;
  Tuan: number;
  Triet: number;
  LuuTuan: number;
  LuuTriet: number;
  nChinhTinh: number;
  ChinhTinh: Star[];
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

interface Star {
  Name: string;
  Status: string;
  NguHanh: number;
}

interface DetailedStar {
  Name: string;
  NguHanh: number;
  Type: number;
  Highline: number;
  Status: string;
}

const CUC_NAMES = [
  "",
  "",
  "Thủy nhị cục",
  "Mộc tam cục",
  "Kim tứ cục",
  "Thổ ngũ cục",
  "Hỏa lục cục",
];
const TRANG_SINH_NAMES = [
  "",
  "Trường sinh",
  "Mộc dục",
  "Quan đới",
  "Lâm quan",
  "Đế vượng",
  "Suy",
  "Bệnh",
  "Tử",
  "Mộ",
  "Tuyệt",
  "Thai",
  "Dưỡng",
];

export function formatLaSoJson(laso: LaSo): JsonOutput {
  const cungSections: CungSection[] = [];

  // Build Info section
  const chuMenh = getChuMenh(laso);
  const chuThan = getChuThan(laso);
  
  // Find Body Palace location
  let bodyPalaceName = "";
  for (let i = 0; i < 12; i++) {
    const stars = laso.cungSaos[i]!;
    const hasThan = stars.some(s => s.type === 'H');
    if (hasThan) {
      const lucThan = stars.find(s => s.type === 'L');
      if (lucThan) {
        bodyPalaceName = LUC_THAN[lucThan.id - 1]!;
      }
      break;
    }
  }

  const info: InfoSection = {
    AmDuong: (laso.dnan ? "Dương" : "Âm") + (laso.male ? " Nam" : " Nữ"),
    VTMenh: laso.menh,
    CanNam: (laso.tcNam - 1 + 4) % 10, // Shifted index for year stem
    ChiNam: (laso.dcNam - 1 + 4) % 12, // Shifted index for year branch
    SoCuc: (laso.menh - 1) * 10 + laso.cuc,
    Gio: D_CHI[laso.gio - 1]!,
    Ngay: laso.ngay,
    Thang: laso.thang,
    Nam: `${T_CAN[laso.tcNam - 1]} ${D_CHI[laso.dcNam - 1]}`,
    Cuc: CUC_NAMES[laso.cuc]!,
    CucNH: laso.cuc,
    ChuMenh: chuMenh,
    ChuThan: chuThan,
    ThanCu: `Thân cư ${bodyPalaceName}`,
  };

  // Build palace sections (Cac_cung)
  for (let i = 0; i < 12; i++) {
    const palacePos = i + 1;
    const stars = laso.cungSaos[i]!;

    // Find if this is body palace
    const isThan = stars.some((s) => s.type === "H");

    // Separate stars by type
    const mainStars = stars.filter((s) => s.type === "C");
    const goodStars = stars.filter(
      (s) => s.type === "B" && s.catTinh && !s.isPhiTinh,
    );
    const badStars = stars.filter(
      (s) => s.type === "B" && !s.catTinh && !s.isPhiTinh,
    );
    const lifeStage = stars.find((s) => s.type === "S");

    // Find palace name from Lục Thân
    const lucThan = stars.find((s) => s.type === "L");
    const palaceName = lucThan ? LUC_THAN[lucThan.id - 1]! : "";

    // Check for Tuần and Triệt
    const hasTuan = stars.some((s) => s.id === 110 && s.type === "K");
    const hasTriet = stars.some((s) => s.id === 111 && s.type === "K");

    // Find Tứ Hóa stars in this palace
    const locStar = stars.find((s) => s.id === 94);
    const kyStar = stars.find((s) => s.id === 95);
    const quyenStar = stars.find((s) => s.id === 93);
    const khoaStar = stars.find((s) => s.id === 92);

    // Calculate palace Stem and Branch (simple approach)
    const canCung = (laso.tcNam + i) % 10;
    const chiCung = i;

    // Determine palace element based on Chi
    const nguHanhCung = getPalaceElement(chiCung);

    const cungSection: CungSection = {
      Name: palaceName,
      Than: isThan ? 1 : 0,
      SoCuc: (palacePos - 1) * 10 + laso.cuc,
      Tuan: hasTuan ? 1 : 0,
      Triet: hasTriet ? 1 : 0,
      LuuTuan: 0,
      LuuTriet: 0,
      nChinhTinh: mainStars.length,
      ChinhTinh: mainStars.map((s) => ({
        Name: s.ten,
        Status: s.dia,
        NguHanh: s.hanh,
      })),
      nSaoTot: goodStars.length,
      Saotot: goodStars.map((s) => ({
        Name: s.ten,
        NguHanh: s.hanh,
        Type: 3,
        Highline: isHighlineStar(s.id) ? 1 : 0,
        Status: s.dia !== "N" ? s.dia : "",
      })),
      nSaoXau: badStars.length,
      Saoxau: badStars.map((s) => ({
        Name: s.ten,
        NguHanh: s.hanh,
        Type: 3,
        Highline: isHighlineStar(s.id) ? 1 : 0,
        Status: s.dia !== "N" ? s.dia : "",
      })),
      TrangSinh: lifeStage ? lifeStage.ten : "",
      TrangSinhNH: lifeStage ? lifeStage.id - 38 : 0,
      ThangHan: palacePos,
      LuuDaiHan: 1,
      LuuDaiHanTen: "", // Would need additional calculation
      LuuTieuHanTen: "", // Would need additional calculation
      LocNhap: locStar ? locStar.ten : null,
      KyNhap: kyStar ? kyStar.ten : null,
      QuyenNhap: quyenStar ? quyenStar.ten : null,
      KhoaNhap: khoaStar ? khoaStar.ten : null,
      TieuHan: D_CHI[chiCung]!,
      CanCung: canCung,
      ChiCung: chiCung,
      NguHanhCung: nguHanhCung,
    };

    cungSections.push(cungSection);
  }

  return {
    Info: info,
    Cac_cung: cungSections,
  };
}

// Chủ Mệnh (Life Lord): Determined by birth year's Earthly Branch
function getChuMenh(laso: LaSo): string {
  const chuMenhMap = [
    "Tham lang", // 1: Tý
    "Cự môn", // 2: Sửu
    "Lộc tồn", // 3: Dần
    "Văn xương", // 4: Mão
    "Liêm trinh", // 5: Thìn
    "Vũ khúc", // 6: Tị
    "Phá quân", // 7: Ngọ
    "Vũ khúc", // 8: Mùi
    "Liêm trinh", // 9: Thân
    "Văn xương", // 10: Dậu
    "Lộc tồn", // 11: Tuất
    "Cự môn", // 12: Hợi
  ];

  return chuMenhMap[laso.dcNam - 1]!;
}

// Chủ Thân (Body Lord): Determined by birth year's Earthly Branch
function getChuThan(laso: LaSo): string {
  const chuThanMap = [
    "Hỏa tinh", // 1: Tý
    "Thiên tướng", // 2: Sửu
    "Thiên lương", // 3: Dần
    "Thiên đồng", // 4: Mão
    "Văn xương", // 5: Thìn
    "Thiên cơ", // 6: Tị
    "Hỏa tinh", // 7: Ngọ
    "Thiên tướng", // 8: Mùi
    "Thiên lương", // 9: Thân
    "Thiên đồng", // 10: Dậu
    "Văn xương", // 11: Tuất
    "Thiên cơ", // 12: Hợi
  ];

  return chuThanMap[laso.dcNam - 1]!;
}

function getPalaceElement(chi: number): number {
  // Map Địa Chi to element
  // Tý(0)=Thủy(2), Sửu(1)=Thổ(5), Dần(2)=Mộc(3), Mão(3)=Mộc(3)
  // Thìn(4)=Thổ(5), Tị(5)=Hỏa(6), Ngọ(6)=Hỏa(6), Mùi(7)=Thổ(5)
  // Thân(8)=Kim(4), Dậu(9)=Kim(4), Tuất(10)=Thổ(5), Hợi(11)=Thủy(2)
  const elementMap = [2, 5, 3, 3, 5, 6, 6, 5, 4, 4, 5, 2];
  return elementMap[chi]!;
}

function isHighlineStar(id: number): boolean {
  // Important stars that should be highlighted
  const highlightStars = [
    27, // Lộc tồn
    51,
    52, // Đà la, Kình dương
    55,
    56, // Linh tinh, Hỏa tinh
    53,
    54, // Địa không, Địa kiếp
    57,
    58, // Văn xương, Văn khúc
    59,
    60, // Thiên khôi, Thiên việt
    61,
    62, // Tả phù, Hữu bật
    73, // Thiên hình
    78,
    79, // Đào hoa, Hồng loan
    92,
    93,
    94,
    95, // Tứ Hóa
    98, // Thiên mã
  ];
  return highlightStars.includes(id);
}
