import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

print("=== Searching for updatePersonalField & loadStateIntoUI ===")
for i, line in enumerate(lines, 1):
    if any(k in line for k in ["updatePersonalField", "loadStateIntoUI", "addExperience", "renderAll"]):
        print(f"app.js Line {i}: {line.strip()[:100]}")
