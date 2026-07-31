import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

lines_js = js.split("\n")

print("=== Audit app.js update functions ===")
up_funcs = ["updatePersonalField", "updateExpField", "updateEduField", "updateSkillField", "updateCertField", "updateProjectField", "updateRefField", "updateLeadershipField"]
for func in up_funcs:
    found = any(f"function {func}" in line for line in lines_js)
    print(f"Function {func}: {'FOUND' if found else 'MISSING!'}")

print("\n=== Checking Editor Input Handlers in editor.html ===")
import re

for input_tag in re.findall(r'<input[^>]+>', html):
    if 'id=' in input_tag:
        print(input_tag[:110])

for textarea_tag in re.findall(r'<textarea[^>]+>', html):
    print(textarea_tag[:110])
