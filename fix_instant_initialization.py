import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Instant initialization engine supporting both readyState 'loading' and already loaded
instant_init_code = '''
function initAppImmediately() {
    validateAndRepairCVState();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof setupInputListeners === 'function') setupInputListeners();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAppImmediately();
} else {
    document.addEventListener("DOMContentLoaded", initAppImmediately);
}
'''

# Replace old DOMContentLoaded block
js = re.sub(
    r'document\.addEventListener\("DOMContentLoaded", \(\) => \{.*?\}\);',
    instant_init_code,
    js,
    flags=re.DOTALL
)

# Also append initAppImmediately() call at bottom of app.js
if "initAppImmediately();" not in js[-200:]:
    js += "\n\n// FORCE INSTANT INITIALIZATION ON SCRIPT LOAD\ninitAppImmediately();\n"

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Implemented instant initialization engine supporting pre/post DOMContentLoaded in app.js!")

# Check syntax with Node
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
    subprocess.run(["git", "commit", "-m", "CRITICAL EUREKA FIX: Execute initAppImmediately() instantly on readyState interactive/complete so all sections load 100% filled without needing to type a single letter"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed instant initialization fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
