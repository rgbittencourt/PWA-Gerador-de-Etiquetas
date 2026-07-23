from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
REFERENCE = Image.open(Path(__file__).with_name("inovalab-icon-reference.png")).convert("RGB")


def make_icon(size=512):
    image = Image.new("RGB", (512, 512), "#201f1c")
    draw = ImageDraw.Draw(image)
    draw.rounded_rectangle((0, 0, 511, 511), radius=96, fill="#201f1c")
    white = "#f4f1eb"

    # Etiqueta em contorno branco, com furo e QR Code.
    draw.rounded_rectangle((180, 102, 420, 390), radius=34, outline=white, width=14)
    draw.ellipse((210, 132, 242, 164), outline=white, width=10)
    for box in [(286, 154, 326, 194), (346, 154, 386, 194), (286, 214, 326, 254),
                (346, 214, 386, 254), (286, 274, 326, 314), (346, 274, 386, 314)]:
        draw.rectangle(box, outline=white, width=9)
    draw.rounded_rectangle((218, 328, 376, 342), radius=7, fill=white)

    hexagons = [
        [(114, 211), (171, 211), (198, 257), (171, 303), (114, 303), (88, 257)],
        [(114, 312), (171, 312), (197, 358), (170, 405), (115, 405), (88, 358)],
        [(205, 261), (260, 261), (287, 307), (260, 354), (205, 354), (178, 307)],
    ]
    for polygon in hexagons:
        mask = Image.new("L", REFERENCE.size, 0)
        ImageDraw.Draw(mask).polygon(polygon, fill=255)
        image.paste(REFERENCE, (0, 0), mask)
    return image if size == 512 else image.resize((size, size), Image.Resampling.LANCZOS)


PUBLIC.mkdir(exist_ok=True)
icon = make_icon()
icon.save(PUBLIC / "etiquetas-icon-512.png", optimize=True)
icon.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "etiquetas-icon-192.png", optimize=True)
icon.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)
icon.resize((64, 64), Image.Resampling.LANCZOS).save(PUBLIC / "favicon.png", optimize=True)
icon.save(PUBLIC / "etiquetas-compartilhamento.png", optimize=True)
