// Emits per-route HTML files into dist/work/<slug>/index.html so that social
// crawlers (which don't execute JS) see route-specific og:image / og:title /
// og:description tags. The React SPA still takes over normally on real user
// loads — these files are byte-for-byte the built index.html with only the
// head meta tags swapped.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "..", "dist");
const SITE = "https://amaankhan63.github.io";

const pages = [
  {
    slug: "cost-estimation",
    title: "Cost Estimation — Amaan Khan",
    description:
      "Solo-built the AI Cost Estimation product as Founding Engineer. Its codebase became the foundation for FDE forks at MillerKnoll, Schneider Electric, and NAC.",
    image: "og-cost-estimation.png",
  },
  {
    slug: "multi-provider-ai",
    title: "Multi-provider AI orchestration — Amaan Khan",
    description:
      "10 providers, 50+ models powering enterprise generation workflows for Adidas, MillerKnoll, and others.",
    image: "og-multi-provider-ai.png",
  },
  {
    slug: "wopi-adidas",
    title: "WOPI for Adidas — Amaan Khan",
    description:
      "In-platform Microsoft Office editing for Adidas enterprise teams — Word and Excel documents edited without leaving Naya's Workflow platform.",
    image: "og-wopi-adidas.png",
  },
  {
    slug: "realtime-collab",
    title: "Real-time collaboration — Amaan Khan",
    description:
      "Simultaneous multi-user editing across Naya's Workflow platform — WebSockets + MongoDB Change Streams + YJS.",
    image: "og-realtime-collab.png",
  },
];

function escapeAttr(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function setMeta(html, attrName, attrValue, newContent) {
  const id = `${attrName}="${escapeRegex(attrValue)}"`;
  const esc = escapeAttr(newContent);

  // identifier attribute before content="..."
  let re = new RegExp(`(<meta[^>]*?${id}[^>]*?content=")[^"]*(")`, "s");
  if (re.test(html)) return html.replace(re, `$1${esc}$2`);

  // content="..." before identifier attribute
  re = new RegExp(`(<meta[^>]*?content=")[^"]*("[^>]*?${id}[^>]*?>)`, "s");
  if (re.test(html)) return html.replace(re, `$1${esc}$2`);

  throw new Error(`Meta tag with ${attrName}="${attrValue}" not found`);
}

function setTitle(html, newTitle) {
  return html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeAttr(newTitle)}</title>`,
  );
}

const templatePath = path.join(distDir, "index.html");
if (!fs.existsSync(templatePath)) {
  throw new Error(`Missing ${templatePath} — run \`vite build\` first.`);
}
const template = fs.readFileSync(templatePath, "utf8");

for (const p of pages) {
  let html = template;
  const url = `${SITE}/work/${p.slug}`;
  const img = `${SITE}/${p.image}`;

  html = setTitle(html, p.title);
  html = setMeta(html, "name", "description", p.description);
  html = setMeta(html, "property", "og:title", p.title);
  html = setMeta(html, "property", "og:description", p.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", img);
  html = setMeta(html, "name", "twitter:title", p.title);
  html = setMeta(html, "name", "twitter:description", p.description);
  html = setMeta(html, "name", "twitter:image", img);

  const outDir = path.join(distDir, "work", p.slug);
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "index.html");
  fs.writeFileSync(outFile, html);
  console.log(`og-pages: ${path.relative(distDir, outFile)} → ${img}`);
}
