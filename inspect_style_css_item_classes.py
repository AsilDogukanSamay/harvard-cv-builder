import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("style.css", "r", encoding="utf-8") as f:
    css = f.read()

lines = css.split("\n")
print("=== Searching for entry- and cv-item in style.css ===")
for i, line in enumerate(lines, 1):
    if any(k in line for k in [".entry-block", ".entry-header", ".company-name", ".entry-role", ".cv-item"]):
        print(f"style.css Line {i}: {line.strip()[:100]}")
