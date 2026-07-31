import os
import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
html_editor = os.path.join(cwd, "editor.html")
html_index = os.path.join(cwd, "index.html")

# 1. Update editor.html
with open(html_editor, "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('src="app.js"', 'src="app.js?v=3.0.0"')
html = html.replace('href="style.css"', 'href="style.css?v=3.0.0"')

with open(html_editor, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Added cache buster ?v=3.0.0 to editor.html!")

# 2. Update index.html
if os.path.exists(html_index):
    with open(html_index, "r", encoding="utf-8") as f:
        h = f.read()
    h = h.replace('src="app.js"', 'src="app.js?v=3.0.0"')
    h = h.replace('href="style.css"', 'href="style.css?v=3.0.0"')
    with open(html_index, "w", encoding="utf-8") as f:
        f.write(h)
    print("SUCCESS: Added cache buster ?v=3.0.0 to index.html!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Cache Buster: Add ?v=3.0.0 version query params to app.js and style.css for instant browser reload"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed cache buster update to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
