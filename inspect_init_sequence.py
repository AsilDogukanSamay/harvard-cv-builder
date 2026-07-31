with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== Searching for Init in app.js ===")
for i, line in enumerate(lines, 1):
    if any(k in line for k in ["DOMContentLoaded", "onload", "init", "loadStateIntoUI", "renderAll"]) and ("function" in line or "addEventListener" in line or "window" in line):
        print(f"app.js Line {i}: {line.strip()[:120]}")

print("\n=== End of app.js (Lines -50) ===")
for i in range(max(0, len(lines)-50), len(lines)):
    print(f"Line {i+1}: {lines[i]}")
