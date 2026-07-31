import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== updatePersonalField in app.js ===")
for i, line in enumerate(lines, 1):
    if "updatePersonalField" in line:
        print(f"app.js Line {i}: {line.strip()}")
