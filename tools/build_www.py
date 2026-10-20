"""www/ klasörünü hazırlar:
   1) www/jk_protocol.js  ← src/jk_protocol.tpl.js + www/jk_tables.json (tablolar Python sürümünden)
   2) www/index.html      ← ui/index.html (masaüstüyle ortak arayüz) + Android köprü betikleri
Kullanım: python tools/build_www.py [masaüstü_ui_index.html]"""
import os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = os.path.join(ROOT, "www")
tables = open(os.path.join(W, "jk_tables.json"), encoding="utf8").read()
tpl = open(os.path.join(ROOT, "src", "jk_protocol.tpl.js"), encoding="utf8").read()
open(os.path.join(W, "jk_protocol.js"), "w", encoding="utf8").write(tpl.replace("/*TABLES*/null", tables))

src = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "src", "ui_index.html")
html = open(src, encoding="utf8").read()
tag = '<script>\n"use strict";'
assert html.count(tag) == 1, "ui index.html beklenen biçimde değil"
inject = ('<script src="vendor/cap.js"></script>\n<script src="jk_protocol.js"></script>\n'
          '<script src="bridge.js"></script>\n')
html = html.replace(tag, inject + tag)
html = html.replace("<title>MGM BMS</title>", "<title>MGM BMS</title>")
open(os.path.join(W, "index.html"), "w", encoding="utf8").write(html)
print("www hazır:", sorted(os.listdir(W)))
