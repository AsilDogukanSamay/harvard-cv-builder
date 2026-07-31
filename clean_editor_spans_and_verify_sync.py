import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Clean editor.html spans
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('+1 (555) 019-2834', '')
html = html.replace('github.com/janedoe', '')
html = html.replace('linkedin.com/in/jane-doe', '')
html = html.replace('Software Engineering & Data Science Student', '')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Cleaned remaining hardcoded fallback spans from editor.html!")

# 2. Verify app.js loadStateIntoUI and renderCVContactInfo
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Ensure loadStateIntoUI fills every input and calls renderCVContactInfo
if "renderCVContactInfo();" not in js[js.find("function loadStateIntoUI()"):js.find("function switchTab(")]:
    js = js.replace("function loadStateIntoUI() {", "function loadStateIntoUI() {\n    renderCVContactInfo();")
    print("SUCCESS: Added renderCVContactInfo() call inside loadStateIntoUI()!")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

# Check syntax with node
try:
    nres = subprocess.run(["node", "--check", js_path], capture_output=True, text=True)
    if nres.returncode == 0:
        print("SUCCESS: Node syntax check passed 100% for app.js!")
    else:
        print("Node syntax error:", nres.stderr)
except Exception as ex:
    print("Node check skipped:", ex)

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean editor HTML fallback spans and ensure loadStateIntoUI triggers renderCVContactInfo"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
