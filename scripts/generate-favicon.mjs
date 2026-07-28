import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Keep in sync with --accent in src/index.css and ACCENT in generate-og.mjs.
const ACCENT = "#635BFF"; // stripe blurple
const INK = "#FAFAF7"; // warm off-white, matches --bg

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

// Monogram drawn as vector paths, not text, so rendering does not depend on
// Lora being installed on whatever machine runs this. Square caps and a miter
// apex match the design system's --radius: 0.
const svg = `<svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" fill="${ACCENT}"/>
  <path d="M 13 51 L 32 15 L 51 51" fill="none" stroke="${INK}" stroke-width="8.5" stroke-linejoin="miter" stroke-miterlimit="6"/>
  <path d="M 21 40 L 43 40" stroke="${INK}" stroke-width="8"/>
</svg>`;

writeFileSync(join(publicDir, "favicon.svg"), svg);

const png = (size) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// Apple touch icon: full-bleed, iOS applies its own mask and ignores alpha.
await sharp(Buffer.from(svg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(join(publicDir, "apple-touch-icon.png"));

// Pack a PNG-embedded .ico by hand - sharp has no ICO encoder.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(images.length, 4);

let offset = 6 + images.length * 16;
const entries = images.map((data, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 0); // width
  e.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], 1); // height
  e.writeUInt8(0, 2); // palette size
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(data.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += data.length;
  return e;
});

writeFileSync(
  join(publicDir, "favicon.ico"),
  Buffer.concat([header, ...entries, ...images])
);

console.log(
  `Wrote favicon.svg, favicon.ico (${sizes.join("/")}), apple-touch-icon.png (accent ${ACCENT})`
);
