import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

print("=== Checking for any leftover personal data ===")
for term in ["Asil", "Doğukan", "Samay", "dogukan__sam_ay"]:
    if term in js:
        print(f"Found '{term}' in app.js!")
    if term in html:
        print(f"Found '{term}' in editor.html!")
