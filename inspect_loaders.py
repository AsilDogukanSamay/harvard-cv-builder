import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

print("=== Searching for loadTRSample and loadENSample in app.js ===")
for i, line in enumerate(lines, 1):
    if "function loadTRSample" in line or "function loadENSample" in line:
        for j in range(i-1, min(len(lines), i+25)):
            print(f"app.js Line {j+1}: {lines[j]}")
        break

print("\n=== Searching for loadStateIntoUI in app.js ===")
for i, line in enumerate(lines, 1):
    if "function loadStateIntoUI" in line:
        for j in range(i-1, min(len(lines), i+35)):
            print(f"app.js Line {j+1}: {lines[j]}")
        break
