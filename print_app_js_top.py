import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("=== app.js Lines 1 to 50 ===")
for i in range(min(50, len(lines))):
    print(f"Line {i+1}: {lines[i].strip()}")
