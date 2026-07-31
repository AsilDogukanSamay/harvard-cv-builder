import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

print("=== Inspecting loadENSample and loadTRSample in app.js ===")
for i, line in enumerate(lines, 1):
    if "function loadENSample" in line or "function loadTRSample" in line:
        for j in range(i-1, min(len(lines), i+35)):
            print(f"app.js Line {j+1}: {lines[j]}")
        break
