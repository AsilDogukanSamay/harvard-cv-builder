import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
print("=== Searching for cv-name in editor.html ===")
for i, line in enumerate(lines, 1):
    if "cv-name" in line or "cv-title" in line or "cv-header" in line or "cv-document" in line:
        print(f"editor.html Line {i}: {line.strip()[:100]}")
