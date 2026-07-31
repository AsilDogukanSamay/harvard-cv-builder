import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
print("=== Searching for sections in editor.html lines 530 to 620 ===")
for i in range(530, min(620, len(lines))):
    if any(k in lines[i] for k in ["sec-", "cv-", "id="]):
        print(f"editor.html Line {i+1}: {lines[i].strip()[:100]}")
