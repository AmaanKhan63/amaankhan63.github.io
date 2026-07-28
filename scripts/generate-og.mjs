import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// ─── Match the active accent in src/index.css if you swap it ───
// const ACCENT = "#B4540A"; // amber (default)
// const ACCENT = "#1F4D3F"; // forest
// const ACCENT = "#8B3A2E"; // terracotta
const ACCENT = "#635BFF"; // stripe blurple
// const ACCENT = "#0070F3"; // vercel blue
// const ACCENT = "#1A4FE0"; // cobalt
// const ACCENT = "#FF5722"; // sentry orange
// const ACCENT = "#E11D48"; // crimson
// const ACCENT = "#0891B2"; // cyan
// const ACCENT = "#6B1D1D"; // deep crimson
// const ACCENT = "#5E2750"; // plum
// const ACCENT = "#C2410C"; // burnt orange

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = join(__dirname, "..", "public", "og.png");

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#FAFAF7"/>

  <text x="80" y="320" font-family="Georgia, 'Times New Roman', serif" font-size="116" font-weight="400" fill="#1A1A1A">Amaan Khan</text>
  <rect x="80" y="350" width="280" height="4" fill="${ACCENT}"/>

  <text x="80" y="425" font-family="Helvetica, Arial, sans-serif" font-size="32" font-weight="400" fill="#1A1A1A">Software engineer. I ship AI-native products end-to-end</text>
  <text x="80" y="468" font-family="Helvetica, Arial, sans-serif" font-size="32" font-weight="400" fill="#1A1A1A">for enterprise customers - design through deployment, solo.</text>

  <text x="80" y="555" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#6B6B6B">amaankhan63.github.io</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(output);
console.log(`Wrote ${output} (accent ${ACCENT})`);
