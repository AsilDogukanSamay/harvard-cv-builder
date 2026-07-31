import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
print("=== July 30th editor.html Header (Lines 80-140) ===")
for i in range(80, min(140, len(lines))):
    print(f"Line {i+1}: {lines[i].strip()[:100]}")

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

print(f"\nTotal lines in July 30th app.js: {len(js.splitlines())}")
