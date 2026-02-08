import { generateLaSo } from "../src";
import { writeFileSync } from "fs";

console.log("=".repeat(70));
console.log("Vietnamese Ziwei Doushu (Tử Vi) Chart Generator");
console.log("=".repeat(70));

const laso = generateLaSo({
  name: "TTHN",
  gender: "female",
  birth: {
    isLunar: false,
    year: 1993,
    month: 12,
    day: 25,
    hour: 23,
    minute: 15,
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
