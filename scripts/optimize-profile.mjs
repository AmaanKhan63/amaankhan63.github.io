import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { rm, stat } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));
const input = join(__dirname, "..", "src", "assets", "profile.png");
const output = join(__dirname, "..", "src", "assets", "profile.jpg");

const before = (await stat(input)).size;

await sharp(input)
  .resize(560, 560, { fit: "cover", position: "center" })
  .jpeg({ quality: 85 })
  .toFile(output);

const after = (await stat(output)).size;
await rm(input);

const pct = ((1 - after / before) * 100).toFixed(1);
console.log(`profile.png (${(before / 1024).toFixed(0)} KB) → profile.jpg (${(after / 1024).toFixed(0)} KB) — ${pct}% smaller`);
