with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

print("=== loadStateIntoUI ===")
for i in range(926, 980):
    if i < len(lines):
        print(f"Line {i+1}: {lines[i]}")

print("\n=== updatePersonalField ===")
for i in range(1210, 1250):
    if i < len(lines):
        print(f"Line {i+1}: {lines[i]}")
