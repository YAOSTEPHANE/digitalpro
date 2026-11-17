"""Génère Guide-Commercial-Digitalpro.pdf à partir de guide.html (lancer prepare_assets.py avant)."""

import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "guide.html"
OUTPUT = HERE / "Guide-Commercial-Digitalpro.pdf"
PREVIEW_DIR = HERE / "preview"

A4_WIDTH_PX = 794
A4_HEIGHT_PX = 1123


def main() -> None:
    with_preview = "--preview" in sys.argv
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")
        page = browser.new_page(viewport={"width": A4_WIDTH_PX, "height": A4_HEIGHT_PX}, device_scale_factor=1.5)
        page.goto(SOURCE.as_uri(), wait_until="networkidle", timeout=60000)
        page.evaluate("document.fonts.ready")

        overflowing = page.evaluate(
            """() => [...document.querySelectorAll('section.page')].map((section, i) => {
                const footer = section.querySelector('.footer');
                const limit = footer ? footer.getBoundingClientRect().top : section.getBoundingClientRect().bottom;
                const inner = section.querySelector('.inner, .content');
                const bottoms = [...inner.querySelectorAll('*')].map(el => el.getBoundingClientRect().bottom);
                return { page: i + 1, over: Math.round(Math.max(0, ...bottoms) - limit) };
            }).filter(r => r.over > 0)"""
        )
        for item in overflowing:
            print(f"ATTENTION page {item['page']} : contenu qui dépasse de {item['over']} px")

        if with_preview:
            PREVIEW_DIR.mkdir(exist_ok=True)
            for index, section in enumerate(page.query_selector_all("section.page"), start=1):
                section.screenshot(path=str(PREVIEW_DIR / f"page-{index:02d}.png"))

        page.emulate_media(media="print")
        page.pdf(path=str(OUTPUT), format="A4", print_background=True, prefer_css_page_size=True,
                 margin={"top": "0", "right": "0", "bottom": "0", "left": "0"})
        browser.close()
    print(f"PDF généré : {OUTPUT}")


if __name__ == "__main__":
    main()
