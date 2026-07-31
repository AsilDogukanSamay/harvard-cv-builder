with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
for i in range(1920, 2040):
    if i < len(lines):
        print(f"Line {i+1}: {lines[i]}")
