import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("=== cvState initialization in app.js ===")
for i, line in enumerate(lines, 1):
    if "cvState =" in line or "let cvState" in line:
        print(f"app.js Line {i}: {line.strip()[:100]}")
