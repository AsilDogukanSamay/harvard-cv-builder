with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")
for i, line in enumerate(lines, 1):
    if any(k in line for k in ["TR_SAMPLE_STATE", "EN_SAMPLE_STATE", "loadStateIntoUI", "saveToLocalStorage", "cvState ="]):
        print(f"app.js Line {i}: {line.strip()[:120]}")
