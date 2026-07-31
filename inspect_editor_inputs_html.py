with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

import re

print("=== Inputs in editor.html ===")
for match in re.finditer(r'<input[^>]+id="input-[^"]+"[^>]*>', html):
    print(match.group(0))

for match in re.finditer(r'<textarea[^>]+id="input-[^"]+"[^>]*>', html):
    print(match.group(0))
