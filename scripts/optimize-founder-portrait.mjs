import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = process.argv[2] ?? "RITIKA_FAMILY-36.tif";
const OUT = "public/images/tbg-founder-portrait.webp";
const WIDTH = 1600; // 2× max rendered ~800px desktop column

await mkdir("public/images", { recursive: true });
await sharp(SRC)
  .rotate() // respect EXIF orientation if present
  .resize(WIDTH, Math.round(WIDTH * 4 / 3), { fit: "cover", position: "centre" })
  .webp({ quality: 85 })
  .toFile(OUT);
