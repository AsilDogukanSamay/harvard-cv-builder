import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== app.js around line 3440-3460 ===")
for i in range(max(0, len(lines)-40), len(lines)):
    print(f"Line {i+1}: {lines[i]}")
