// New API Examples
import { generateLaSo } from "../src";
import type { LaSoResult } from "../src";

console.log("=".repeat(70));
console.log("NEW API EXAMPLES");
console.log("=".repeat(70));

// Example 1: Gregorian (Solar) Calendar
console.log("\n📅 Example 1: Gregorian Calendar (Most Common)");
console.log("-".repeat(70));

const laso1 = generateLaSo({
  name: "Nguyễn Văn A",
  gender: "male",
  birth: {
    isLunar: false,
    year: 1990,
    month: 5,
    day: 15,
    hour: 8,
    minute: 30, // 8:30 AM
  },
});

console.log("Birth: 1990-05-15 08:30");
console.log("Info:", {
  Nam: laso1.Info.Nam,
  ChuMenh: laso1.Info.ChuMenh,
  ChuThan: laso1.Info.ChuThan,
  ThanCu: laso1.Info.ThanCu,
});

// Example 2: Lunar Calendar
console.log("\n🌙 Example 2: Lunar Calendar");
console.log("-".repeat(70));

const laso2 = generateLaSo({
  name: "Trần Thị B",
  gender: "female",
  birth: {
    isLunar: true,
    year: 1985,
    month: 3,
    day: 20,
    hour: 14,
    minute: 0,
  },
});

console.log("Birth: Lunar 1985-03-20 14:00");
console.log("Info:", {
  Nam: laso2.Info.Nam,
  ChuMenh: laso2.Info.ChuMenh,
  ChuThan: laso2.Info.ChuThan,
});

// Example 3: Accessing properties directly
console.log("\n📊 Example 3: Direct Property Access");
console.log("-".repeat(70));

console.log(`Life Palace: ${laso1.Cac_cung[laso1.Info.VTMenh - 1]?.Name}`);
console.log(
  `Main Stars in Life Palace: ${
    laso1.Cac_cung[laso1.Info.VTMenh - 1]?.ChinhTinh.map((s) => s.Name).join(
      ", ",
    ) || "None"
  }`,
);

// Example 4: Formatting methods
console.log("\n📝 Example 4: Formatting Methods");
console.log("-".repeat(70));

console.log("\n1. toJSONString() - Compact:");
console.log(laso1.toJSONString(false).substring(0, 100) + "...");

console.log("\n2. toJSONString() - Pretty (first 500 chars):");
console.log(laso1.toJSONString(true).substring(0, 500) + "...");

console.log("\n3. toDisplayString() - Human readable (first 300 chars):");
console.log(laso1.toDisplayString().substring(0, 300) + "...");

// Example 5: Type-safe access
console.log("\n✅ Example 5: TypeScript Type Safety");
console.log("-".repeat(70));

function analyzeLaSo(laso: LaSoResult): void {
  // TypeScript knows all properties and their types
  const { Info, Cac_cung } = laso;

  console.log(`Analysis for: ${Info.Nam}`);
  console.log(`  Gender: ${Info.AmDuong}`);
  console.log(`  Bureau: ${Info.Cuc} (${Info.CucNH})`);
  console.log(`  Total Palaces: ${Cac_cung.length}`);

  // Count stars
  const totalMainStars = Cac_cung.reduce((sum, c) => sum + c.nChinhTinh, 0);
  const totalGoodStars = Cac_cung.reduce((sum, c) => sum + c.nSaoTot, 0);
  const totalBadStars = Cac_cung.reduce((sum, c) => sum + c.nSaoXau, 0);

  console.log(`  Main Stars: ${totalMainStars}`);
  console.log(`  Auspicious Stars: ${totalGoodStars}`);
  console.log(`  Inauspicious Stars: ${totalBadStars}`);
}

analyzeLaSo(laso1);

console.log("\n" + "=".repeat(70));
console.log("✅ All examples completed successfully!");
console.log("=".repeat(70));
