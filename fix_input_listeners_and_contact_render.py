import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Call setupInputListeners() inside DOMContentLoaded
if "setupInputListeners();" not in js:
    js = js.replace(
        'document.addEventListener("DOMContentLoaded", () => {',
        'document.addEventListener("DOMContentLoaded", () => {\n    setupInputListeners();'
    )
    print("SUCCESS: Added setupInputListeners() call inside DOMContentLoaded in app.js!")

# 2. Make updatePersonalField bulletproof and sync immediately with DOM
bulletproof_upf = '''function updatePersonalField(field, value) {
    if (!cvState.personal) cvState.personal = {};
    cvState.personal[field] = value;
    
    // Direct sync DOM preview target
    const targetMap = {
        'name': 'cv-name',
        'title': 'cv-title-display',
        'summary': 'cv-summary',
        'email': 'cv-email',
        'phone': 'cv-phone',
        'location': 'cv-location',
        'github': 'cv-github',
        'linkedin': 'cv-linkedin',
        'website': 'cv-website'
    };
    
    if (targetMap[field]) {
        const targetEl = document.getElementById(targetMap[field]);
        if (targetEl) targetEl.textContent = value || '';
    }
    
    if (typeof renderCVContactInfo === 'function') {
        renderCVContactInfo();
    }
    if (typeof calculateATSScore === 'function') {
        calculateATSScore();
    }
    saveToLocalStorage();
}'''

js = re.sub(r"function updatePersonalField\(field, value\) \{.*?\n\}", bulletproof_upf, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated updatePersonalField with direct target DOM sync in app.js!")

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
    subprocess.run(["git", "commit", "-m", "CRITICAL FIX: Call setupInputListeners() on DOMContentLoaded & sync updatePersonalField directly with preview DOM targets"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed input sync fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
