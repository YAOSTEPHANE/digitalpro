"""Prépare les images du guide commercial : logo nettoyé, QR codes, photos, captures des réalisations."""

import shutil
import sys
import urllib.request
from pathlib import Path

import qrcode
from PIL import Image, ImageDraw
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
ASSETS = Path(__file__).resolve().parent / "assets"
SITE_URL = "https://digitalpro-solutions.com"

SERVICE_PHOTOS = {
    "svc-web.jpg": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop",
    "svc-mobile.jpg": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=900&h=600&fit=crop",
    "svc-seo.jpg": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop",
    "svc-uiux.jpg": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&h=600&fit=crop",
    "svc-ecommerce.jpg": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=600&fit=crop",
    "svc-maintenance.jpg": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&h=600&fit=crop",
    "cover-team.jpg": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=1000&fit=crop",
    "meeting.jpg": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop",
}

LOCAL_IMAGES = ["business.jpeg", "custom-2.jpeg", "shop-2.jpeg", "combo.png", "sleek.png", "image2.png"]

SCREENSHOTS = {
    "shot-digitalpro.png": SITE_URL,
    "shot-nyimmobilier.png": "https://www.nyimmobilier.com",
    "shot-infinitecore.png": "https://enregistreur-caisse.vercel.app",
}


def clean_logo() -> None:
    logo = Image.open(ROOT / "public" / "logo" / "logo.png").convert("RGB")
    w, h = logo.size

    def scaled(box: tuple[float, float, float, float]) -> tuple[int, int, int, int]:
        return (int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h))

    background = logo.getpixel((int(0.3 * w), int(0.04 * h)))
    ImageDraw.Draw(logo).rectangle(scaled((0, 0, 0.22, 0.095)), fill=background)
    logo = logo.crop(scaled((0.04, 0.08, 0.96, 0.99)))
    logo.thumbnail((900, 900))
    logo.save(ASSETS / "logo.png", optimize=True)


def make_qr(name: str, url: str) -> None:
    qr = qrcode.QRCode(border=1, box_size=12, error_correction=qrcode.constants.ERROR_CORRECT_M)
    qr.add_data(url)
    qr.make(fit=True)
    qr.make_image(fill_color="#0c0e14", back_color="white").save(ASSETS / name)


def download_photos() -> None:
    for name, url in SERVICE_PHOTOS.items():
        target = ASSETS / name
        if target.exists():
            continue
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(request, timeout=60) as response:
            target.write_bytes(response.read())
    for name in LOCAL_IMAGES:
        shutil.copy2(ROOT / "public" / "images" / name, ASSETS / name)


def capture_sites() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")
        page = browser.new_page(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        for name, url in SCREENSHOTS.items():
            if (ASSETS / name).exists():
                continue
            try:
                page.goto(url, wait_until="networkidle", timeout=30000)
            except Exception as error:  # le site peut garder des connexions ouvertes
                print(f"networkidle non atteint pour {url}: {error}", file=sys.stderr)
            page.wait_for_timeout(4000)
            page.screenshot(path=str(ASSETS / name))
            print(f"capture OK : {name}")
        browser.close()


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    clean_logo()
    make_qr("qr-site.png", SITE_URL)
    make_qr("qr-devis.png", f"{SITE_URL}/devis")
    download_photos()
    capture_sites()


if __name__ == "__main__":
    main()
