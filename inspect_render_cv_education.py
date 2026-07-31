import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== renderCVEducation in app.js ===")
for i, line in enumerate(lines, 1):
    if "function renderCVEducation" in line:
        for j in range(i-1, min(i+45, len(lines))):
            print(f"app.js Line {j+1}: {lines[j]}")
        break
