with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
print("=== renderAll function ===")
for i in range(1406, 1490):
    if i < len(lines):
        print(f"Line {i+1}: {lines[i]}")
