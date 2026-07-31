import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
print("=== Contact IDs in editor.html ===")
for i, line in enumerate(lines, 1):
    if "cv-contact" in line or "cv-email" in line or "cv-phone" in line or "cv-location" in line or "cv-github" in line or "cv-linkedin" in line or "cv-website" in line:
        print(f"editor.html Line {i}: {line.strip()[:100]}")
