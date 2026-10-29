# Junta plantilla + estilos + productos + lógica en un solo index.html

import pathlib, re
d = pathlib.Path(__file__).parent
html = (d / "plantilla.html").read_text()
html = html.replace("/*CSS*/", (d / "estilos.css").read_text())
html = html.replace("/*PRODUCTOS*/", (d / "productos.js").read_text())
html = html.replace("/*JS*/", (d / "app.js").read_text())
(d.parent / "index.html").write_text(html)

print("index.html listo,", len(html), "bytes")
