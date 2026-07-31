import sys
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines_html = html.split("\n")
print("=== Preview Container IDs in editor.html ===")
for i, line in enumerate(lines_html, 1):
    if "cv-experience" in line or "cv-education" in line or "cv-leadership" in line or "cv-project" in line or "cv-cert" in line or "cv-ref" in line or "cv-skills" in line:
        print(f"editor.html Line {i}: {line.strip()[:100]}")

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines_js = js.split("\n")
print("\n=== Container IDs referenced in app.js ===")
for i, line in enumerate(lines_js, 1):
    if any(k in line for k in ["cv-experience", "cv-education", "cv-leadership", "cv-projects", "cv-cert", "cv-references"]):
        if "getElementById" in line:
            print(f"app.js Line {i}: {line.strip()[:100]}")
