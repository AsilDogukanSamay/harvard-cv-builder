import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Fix broken DOMContentLoaded syntax error around line 1046
broken_pattern = r'document\.addEventListener\("DOMContentLoaded", \(\) => \{\s*\);\s*'

valid_dom_loaded = '''document.addEventListener("DOMContentLoaded", () => {
    applyLanguage();
    validateAndRepairCVState();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
});
'''

if re.search(broken_pattern, js):
    js = re.sub(broken_pattern, valid_dom_loaded, js)
    print("SUCCESS: Fixed broken DOMContentLoaded syntax error in app.js!")

# Also clean hardcoded Jane Doe values from editor.html
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('value="Jane Doe"', 'value=""')
html = html.replace('value="Software Engineering & Data Science Student"', 'value=""')
html = html.replace('value="jane.doe@email.com"', 'value=""')
html = html.replace('value="Boston, MA, USA"', 'value=""')
html = html.replace('value="github.com/janedoe"', 'value=""')
html = html.replace('value="linkedin.com/in/jane-doe"', 'value=""')
html = html.replace('>Jane Doe<', '><')
html = html.replace('>Boston, MA, USA<', '><')
html = html.replace('>jane.doe@email.com<', '><')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Cleaned hardcoded Jane Doe fallback values from editor.html!")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

# Test JS Syntax via Node or Edge Headless
try:
    node_res = subprocess.run(["node", "--check", js_path], capture_output=True, text=True)
    if node_res.returncode == 0:
        print("SUCCESS: Node syntax check passed for app.js!")
    else:
        print("Node syntax check error:", node_res.stderr)
except Exception as ex:
    print("Node check skipped:", ex)

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "CRITICAL FIX: Fix DOMContentLoaded syntax error in app.js and remove hardcoded Jane Doe HTML fallbacks"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed syntax fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
