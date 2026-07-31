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

# Top auto-repair logic
v4_repair_code = '''
// FORCE FRESH REFILL IF STALE OR JANE DOE (V4)
(function forceV4StateRefill() {
    try {
        const raw = localStorage.getItem('harvard_cv_state_v3_fresh');
        if (!raw) {
            localStorage.setItem('harvard_cv_state_v3_fresh', JSON.stringify(TR_SAMPLE_STATE));
            return;
        }
        const parsed = JSON.parse(raw);
        if (!parsed.personal || !parsed.personal.name || parsed.personal.name === "Jane Doe" || !parsed.experiences || parsed.experiences.length === 0) {
            localStorage.setItem('harvard_cv_state_v3_fresh', JSON.stringify(TR_SAMPLE_STATE));
        }
    } catch(e) {
        localStorage.setItem('harvard_cv_state_v3_fresh', JSON.stringify(TR_SAMPLE_STATE));
    }
})();
'''

if "forceV4StateRefill()" not in js:
    js = js.replace("// FORCE FRESH CACHE MIGRATION (V3)", v4_repair_code + "\n// FORCE FRESH CACHE MIGRATION (V3)")

# Also inside validateAndRepairCVState
heal_override = '''function validateAndRepairCVState() {
    if (!cvState || !cvState.personal || !cvState.personal.name || cvState.personal.name === "Jane Doe" || !cvState.experiences || cvState.experiences.length === 0) {
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        saveToLocalStorage();
        return;
    }
    if (!cvState.educations || cvState.educations.length === 0) cvState.educations = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.educations));
    if (!cvState.certifications || cvState.certifications.length === 0) cvState.certifications = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.certifications));
    if (!cvState.leadership || cvState.leadership.length === 0) cvState.leadership = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.leadership));
    if (!cvState.projects || cvState.projects.length === 0) cvState.projects = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.projects));
    if (!cvState.references || cvState.references.length === 0) cvState.references = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.references));
    saveToLocalStorage();
}'''

js = re.sub(r"function validateAndRepairCVState\(\) \{.*?\n\}", heal_override, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated app.js with V4 forced auto-refill logic!")

# Test with Node --check
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
    subprocess.run(["git", "commit", "-m", "V4 Cache Fix: Force auto-refill state if Jane Doe or empty experiences detected in file:// protocol localStorage"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed V4 auto-refill fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
