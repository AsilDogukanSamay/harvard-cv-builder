with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== Searching for setupInputListeners calls in app.js ===")
for i, line in enumerate(lines, 1):
    if "setupInputListeners" in line:
        print(f"app.js Line {i}: {line.strip()[:100]}")
