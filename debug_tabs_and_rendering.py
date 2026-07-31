import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

print("=== Searching for Tab Switching in app.js & editor.html ===")
for i, line in enumerate(html.split("\n"), 1):
    if "Kişisel" in line or "Deneyim" in line or "Eğitim" in line or "tab" in line.lower():
        if "class=" in line or "onclick=" in line:
            print(f"editor.html Line {i}: {line.strip()[:100]}")

print("\n=== Searching for Tab Functions in app.js ===")
for i, line in enumerate(js.split("\n"), 1):
    if "switch" in line.lower() or "tab" in line.lower():
        if "function" in line:
            print(f"app.js Line {i}: {line.strip()[:100]}")
