import { generateLaSo } from "../src";
import { writeFileSync } from "fs";

console.log("=".repeat(70));
console.log("Vietnamese Ziwei Doushu (Tử Vi) Chart Generator");
console.log("=".repeat(70));

// Example: Generate chart from Gregorian date
const laso = generateLaSo({
  name: "Dương Thành Đạt",
  gender: "male",
  birth: {
    isLunar: false,
    year: 1990,
    month: 2,
    day: 26,
    hour: 0,
    minute: 15, // 00:15 will round to hour 0 (Tý)
  },
});

console.log("\n📊 Chart Info:");
console.log(`  Name: ${laso.Info.Nam}`);
console.log(`  Life Palace (Mệnh): Position ${laso.Info.VTMenh}`);
console.log(`  Bureau (Cục): ${laso.Info.Cuc}`);
console.log(`  Life Lord (Chủ Mệnh): ${laso.Info.ChuMenh}`);
console.log(`  Body Lord (Chủ Thân): ${laso.Info.ChuThan}`);
console.log(`  Body Location: ${laso.Info.ThanCu}`);

console.log("\n" + "=".repeat(70));
console.log("TEXT FORMAT (Human Readable)");
console.log("=".repeat(70));
console.log(laso.toDisplayString());

console.log("\n" + "=".repeat(70));
console.log("JSON FORMAT");
console.log("=".repeat(70));
console.log(laso.toJSONString());

// Save to file
writeFileSync("output.json", laso.toJSONString());
console.log("\n✅ JSON output saved to output.json");
