import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

print("=== Tab CSS Rules in style.css ===")
for line in css.split("\n"):
    if "tab-pane" in line or "tab-btn" in line or "editor-tabs" in line:
        print(line[:120])

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

print("\n=== Hardcoded Jane Doe in editor.html ===")
for i, line in enumerate(html.split("\n"), 1):
    if "Jane Doe" in line or "jane.doe" in line or "Boston" in line:
        print(f"editor.html Line {i}: {line.strip()[:120]}")
