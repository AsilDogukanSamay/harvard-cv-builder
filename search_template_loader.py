with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

import re

print("=== Template Search in editor.html ===")
for match in re.finditer(r".{0,50}(?:Şablon|sablon|Sample|Template|TR_SAMPLE|EN_SAMPLE).{0,50}", html, re.IGNORECASE):
    print(match.group(0).strip())

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

print("\n=== Template Search in app.js ===")
for line_no, line in enumerate(js.split("\n"), 1):
    if any(k in line for k in ["TR_SAMPLE_STATE", "EN_SAMPLE_STATE", "loadSample", "resetData", "loadTemplate"]):
        print(f"Line {line_no}: {line.strip()[:120]}")
