import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

print("=== Inspecting EN_SAMPLE_STATE experiences in app.js ===")
for i, line in enumerate(lines, 1):
    if "const EN_SAMPLE_STATE =" in line:
        for j in range(i-1, min(len(lines), i+40)):
            print(f"app.js Line {j+1}: {lines[j]}")
        break

print("\n=== Inspecting renderCVExperiences in app.js ===")
for i, line in enumerate(lines, 1):
    if "function renderCVExperiences" in line:
        for j in range(i-1, min(len(lines), i+35)):
            print(f"app.js Line {j+1}: {lines[j]}")
        break
