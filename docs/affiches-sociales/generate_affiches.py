"""Génère les affiches publicitaires réseaux sociaux (4:5, 1:1, 9:16) à partir de captures live."""

import shutil
import sys
from pathlib import Path

import qrcode
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ASSETS = HERE / "assets"
OUTPUT_DIR = HERE / "exports"
HTML_SOURCE = HERE / "affiches.html"

SITE_URL = "https://www.digitalpro-solutions.com"
DEVIS_URL = "https://www.digitalpro-solutions.com/devis"

POSTERS = [
    ("poster-portrait", "affiche-feed-portrait-1080x1350.png"),
    ("poster-square", "affiche-carree-offres-1080x1080.png"),
    ("poster-story", "affiche-story-statut-1080x1920.png"),
]


def prepare_qr(filename: str, url: str) -> None:
    qr = qrcode.QRCode(
        border=1,
        box_size=14,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
    )
    qr.add_data(url)
    qr.make(fit=True)
    img = qr.make_image(fill_color="#0f172a", back_color="#ffffff")
    img.save(ASSETS / filename)


def prepare_assets() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    guide_logo = ROOT / "docs" / "guide-commercial" / "assets" / "logo.png"
    if guide_logo.exists():
        shutil.copy2(guide_logo, ASSETS / "logo.png")
    else:
        raise FileNotFoundError(f"Logo introuvable: {guide_logo}")

    prepare_qr("qr-site.png", SITE_URL)
    prepare_qr("qr-devis.png", DEVIS_URL)


def capture_live_site() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")

        # 1. Capture Desktop Hero (1280x800)
        desktop_ctx = browser.new_context(
            viewport={"width": 1280, "height": 800},
            device_scale_factor=1.5,
        )
        page = desktop_ctx.new_page()
        page.goto(SITE_URL, wait_until="load", timeout=45000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(2500)
        page.screenshot(path=str(ASSETS / "site-desktop-hero.png"))

        # 2. Capture Desktop Simulateur propre (sans barre nav fixe flottante + iframe chargé)
        sim_grid = page.locator("#simulateur .grid.xl\\:grid-cols-12, #simulateur").first
        if sim_grid.count() > 0:
            sim_el = page.locator("#simulateur")
            sim_el.scroll_into_view_if_needed()
            page.evaluate(
                """() => {
                    const nav = document.querySelector('nav');
                    if (nav) nav.style.display = 'none';
                    const chat = document.querySelector('[aria-label="Ouvrir le chatbot"]');
                    if (chat) chat.style.display = 'none';
                }"""
            )
            try:
                page.wait_for_function(
                    "() => !document.body.innerText.includes('Chargement de la démo live')",
                    timeout=10000,
                )
            except Exception as err:
                print(f"Note chargement iframe démo: {err}", file=sys.stderr)
            page.wait_for_timeout(1500)
            sim_grid.screenshot(path=str(ASSETS / "site-simulator.png"))
        else:
            page.screenshot(path=str(ASSETS / "site-simulator.png"))
        desktop_ctx.close()

        # 3. Capture Mobile Hero (390x844)
        mobile_ctx = browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=2,
            is_mobile=True,
        )
        m_page = mobile_ctx.new_page()
        m_page.goto(SITE_URL, wait_until="load", timeout=45000)
        m_page.evaluate("document.fonts.ready")
        m_page.wait_for_timeout(2500)
        m_page.screenshot(path=str(ASSETS / "site-mobile-hero.png"))
        mobile_ctx.close()

        browser.close()


def render_posters() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")
        page = browser.new_page(
            viewport={"width": 1400, "height": 2200},
            device_scale_factor=1,
        )
        page.goto(HTML_SOURCE.as_uri(), wait_until="load", timeout=45000)
        page.evaluate("document.fonts.ready")
        page.wait_for_timeout(1200)

        for element_id, out_name in POSTERS:
            locator = page.locator(f"#{element_id}")
            out_path = OUTPUT_DIR / out_name
            locator.screenshot(path=str(out_path))
            print(f"Affiche exportée : {out_path}")

        browser.close()


def main() -> None:
    prepare_assets()
    capture_live_site()
    render_posters()


if __name__ == "__main__":
    main()
