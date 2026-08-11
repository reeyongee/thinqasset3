#!/usr/bin/env python3
"""Regenerate favicon + OG assets from letterhead/word-assets/header-mark.png.

Target: ~80% mark fill on charcoal (#1a1a1a) background.
"""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "letterhead/word-assets/header-mark.png"
PUBLIC = ROOT / "public/thinqasset-assets"
APP_ICO = ROOT / "app/favicon.ico"
BG = (26, 26, 26, 255)
FILL = 0.80


def build_square_mark() -> Image.Image:
    src = Image.open(SRC).convert("RGBA")
    arr = np.array(src)
    mask = (arr[:, :, 3] > 20) & (arr[:, :, :3].mean(axis=2) > 40)
    ys, xs = np.where(mask)
    cropped = src.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))
    cw, ch = cropped.size
    side = int(max(cw, ch) / FILL)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(cropped, ((side - cw) // 2, (side - ch) // 2), cropped)
    return canvas


def make_size(canvas: Image.Image, size: int) -> Image.Image:
    scaled = canvas.resize((size, size), Image.Resampling.LANCZOS)
    out = Image.new("RGBA", (size, size), BG)
    out.paste(scaled, (0, 0), scaled)
    return out.convert("RGB")


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)
    canvas = build_square_mark()

    for name, size in {
        "favicon-32.png": 32,
        "favicon-192.png": 192,
        "apple-touch-icon-180.png": 180,
        "ms-tile-270.png": 270,
        "favicon.png": 512,
    }.items():
        make_size(canvas, size).save(PUBLIC / name, "PNG", optimize=True)
        print("wrote", PUBLIC / name)

    # OG 1200×630 — mark centered
    og_w, og_h = 1200, 630
    mark_h = int(og_h * 0.68)
    mark = canvas.resize((mark_h, mark_h), Image.Resampling.LANCZOS)
    og = Image.new("RGBA", (og_w, og_h), BG)
    og.paste(mark, ((og_w - mark_h) // 2, (og_h - mark_h) // 2), mark)
    og.convert("RGB").save(PUBLIC / "og-image.png", "PNG", optimize=True)
    print("wrote", PUBLIC / "og-image.png")

    ico_images = [make_size(canvas, s).convert("RGBA") for s in (16, 32)]
    ico_images[0].save(
        APP_ICO,
        format="ICO",
        sizes=[(16, 16), (32, 32)],
        append_images=ico_images[1:],
    )
    print("wrote", APP_ICO)


if __name__ == "__main__":
    main()
