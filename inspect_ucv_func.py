import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i in range(1745, min(1785, len(lines))):
    print(f"Line {i+1}: {lines[i].strip()[:100]}")
