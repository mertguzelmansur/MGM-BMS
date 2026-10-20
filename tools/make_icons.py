"""Uygulama simgesi ve açılış ekranını çizer (Pillow)."""
import os
from PIL import Image, ImageDraw, ImageFilter
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(ROOT, "android", "app", "src", "main", "res")
BG1, BG2 = (14, 22, 36), (5, 8, 13)
A1, A2 = (95, 245, 207), (34, 195, 238)

def grad(size, c1, c2, diag=True):
    w, h = size; im = Image.new("RGB", size)
    px = im.load()
    for y in range(h):
        for x in range(w):
            t = ((x + y) / (w + h)) if diag else y / h
            px[x, y] = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
    return im

def mark(S):
    """S×S RGBA: batarya + şimşek (turkuaz renk geçişi, ışıltı)"""
    k = 4; N = S * k
    mask = Image.new("L", (N, N), 0); d = ImageDraw.Draw(mask)
    bw, bh = N * 0.36, N * 0.56; x0 = (N - bw) / 2; y0 = (N - bh) / 2 + N * 0.04
    st = N * 0.045
    d.rounded_rectangle([x0, y0, x0 + bw, y0 + bh], radius=N * 0.07, outline=255, width=int(st))
    tw = bw * 0.38; d.rounded_rectangle([(N - tw) / 2, y0 - N * 0.06, (N + tw) / 2, y0 + st * 0.6], radius=N * 0.02, fill=255)
    cx, cy = N / 2, y0 + bh / 2; s = bh * 0.36
    bolt = [(cx + s * .18, cy - s), (cx - s * .42, cy + s * .12), (cx - s * .02, cy + s * .12), (cx - s * .2, cy + s), (cx + s * .44, cy - s * .16), (cx + s * .04, cy - s * .16)]
    d.polygon(bolt, fill=255)
    mask = mask.resize((S, S), Image.LANCZOS)
    col = grad((S, S), A1, A2).convert("RGBA"); col.putalpha(mask)
    glow = Image.new("RGBA", (S, S), A1 + (0,)); glow.putalpha(mask.filter(ImageFilter.GaussianBlur(S * 0.04)).point(lambda v: int(v * .55)))
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0)); out.alpha_composite(glow); out.alpha_composite(col)
    return out

def legacy(S, round_=False):
    k = 4; N = S * k
    m = Image.new("L", (N, N), 0); d = ImageDraw.Draw(m)
    if round_: d.ellipse([0, 0, N - 1, N - 1], fill=255)
    else: d.rounded_rectangle([0, 0, N - 1, N - 1], radius=N * 0.22, fill=255)
    m = m.resize((S, S), Image.LANCZOS)
    bg = grad((S, S), BG1, BG2).convert("RGBA"); bg.putalpha(m)
    mk = mark(int(S * 0.92)); off = (S - mk.width) // 2
    bg.alpha_composite(mk, (off, off)); return bg

dens = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}
for name, f in dens.items():
    dd = os.path.join(RES, f"mipmap-{name}")
    legacy(int(48 * f)).save(os.path.join(dd, "ic_launcher.png"))
    legacy(int(48 * f), True).save(os.path.join(dd, "ic_launcher_round.png"))
    fg = Image.new("RGBA", (int(108 * f),) * 2, (0, 0, 0, 0)); mk = mark(int(72 * f)); o = (fg.width - mk.width) // 2
    fg.alpha_composite(mk, (o, o)); fg.save(os.path.join(dd, "ic_launcher_foreground.png"))
open(os.path.join(RES, "values", "ic_launcher_background.xml"), "w").write(
    '<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#0B111C</color>\n</resources>\n')

# açılış ekranı: tüm splash.png dosyalarını aynı orana göre yeniden çiz
from PIL import ImageFont
def splash(w, h):
    im = grad((w, h), (10, 16, 26), BG2, diag=False).convert("RGBA")
    S = int(min(w, h) * 0.32); mk = mark(S)
    im.alpha_composite(mk, ((w - S) // 2, int(h * 0.5 - S * 0.62)))
    try:
        fnt = ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-Bold.otf", int(S * 0.2))
        fs = ImageFont.truetype("/usr/share/fonts/opentype/inter/Inter-Medium.otf", int(S * 0.085))
    except Exception:
        fnt = fs = ImageFont.load_default()
    d = ImageDraw.Draw(im)
    t = "MGM BMS"; tw = d.textlength(t, font=fnt); d.text(((w - tw) / 2, h * 0.5 + S * 0.48), t, font=fnt, fill=(238, 242, 248))
    t2 = "JK BMS Monitör"; tw2 = d.textlength(t2, font=fs); d.text(((w - tw2) / 2, h * 0.5 + S * 0.78), t2, font=fs, fill=(139, 151, 172))
    return im.convert("RGB")
n = 0
for root, _, files in os.walk(RES):
    for fn in files:
        if fn == "splash.png":
            p = os.path.join(root, fn); w, h = Image.open(p).size
            splash(w, h).save(p); n += 1
print("simgeler +", n, "açılış ekranı yazıldı")
