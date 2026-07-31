import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines = html.split("\n")
print("=== Template buttons in editor.html ===")
for i, line in enumerate(lines, 1):
    if "şablon" in line.lower() or "template" in line.lower() or "tr_sample" in line.lower() or "en_sample" in line.lower() or "preset" in line.lower():
        print(f"editor.html Line {i}: {line.strip()[:100]}")

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines_js = js.split("\n")
print("\n=== Template functions in app.js ===")
for i, line in enumerate(lines_js, 1):
    if "loadPresetTemplate" in line or "loadTRSample" in line or "loadENSample" in line or "TR_SAMPLE_STATE" in line:
        print(f"app.js Line {i}: {line.strip()[:100]}")
