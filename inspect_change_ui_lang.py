import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== Searching for changeUILanguage in app.js ===")
for i, line in enumerate(lines, 1):
    if "function changeUILanguage" in line:
        for j in range(i-1, min(len(lines), i+30)):
            print(f"app.js Line {j+1}: {lines[j]}")
        break
