import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== DOMContentLoaded block in app.js ===")
for i in range(1040, 1080):
    if i < len(lines):
        print(f"Line {i+1}: {lines[i]}")
