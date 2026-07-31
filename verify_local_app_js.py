with open("app.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

print("=== app.js Lines 1-30 ===")
for i in range(min(30, len(lines))):
    print(f"Line {i+1}: {lines[i].strip()}")

print("\n=== app.js TR_SAMPLE_STATE search ===")
for i, line in enumerate(lines, 1):
    if "TR_SAMPLE_STATE" in line or "Ahmet Yılmaz" in line or "forceFreshCacheMigration" in line:
        print(f"Line {i}: {line.strip()[:100]}")
