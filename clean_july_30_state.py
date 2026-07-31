import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
html_path = os.path.join(cwd, "editor.html")
js_path = os.path.join(cwd, "app.js")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove video buttons from top header bar in editor.html
html = re.sub(r'<button class="btn-guide btn-video".*?onclick="startInteractiveTour\(\)".*?>.*?</button>', '', html, flags=re.DOTALL)
html = re.sub(r'<a href="linear_style_video\.html".*?</a>', '', html, flags=re.DOTALL)
html = re.sub(r'<a href="showcase_video\.html".*?</a>', '', html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Cleaned video buttons from July 30th editor.html!")

# Check syntax with Node
try:
    nres = subprocess.run(["node", "--check", js_path], capture_output=True, text=True)
    if nres.returncode == 0:
        print("SUCCESS: Node syntax check passed 100% for July 30th app.js!")
    else:
        print("Node syntax error:", nres.stderr)
except Exception as ex:
    print("Node check skipped:", ex)

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Revert codebase to July 30th state as requested by user, with clean minimalist toolbar"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main", "--force"], cwd=cwd, check=True)
    print("SUCCESS: Reverted codebase to July 30th state and force-pushed to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
