import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
print("=== Searching for tab-settings in editor.html ===")
for i, line in enumerate(lines, 1):
    if 'id="tab-settings"' in line:
        for j in range(i-1, min(len(lines), i+35)):
            print(f"editor.html Line {j+1}: {lines[j].strip()[:100]}")
        break
