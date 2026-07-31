import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

lines_css = css.split("\n")
print("=== CSS Overflow & Height Rules ===")
for i, line in enumerate(lines_css, 1):
    if any(k in line for k in ["#cv-document", ".cv-page", ".preview-panel", ".preview-wrapper", "overflow", "height:"]):
        print(f"style.css Line {i}: {line.strip()[:100]}")

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines_js = js.split("\n")
print("\n=== renderAll definition in app.js ===")
for i, line in enumerate(lines_js, 1):
    if "function renderAll()" in line:
        for j in range(i-1, min(i+25, len(lines_js))):
            print(f"app.js Line {j+1}: {lines_js[j].strip()[:100]}")
        break
