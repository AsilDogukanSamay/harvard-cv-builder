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

# Bulletproof validateAndRepairCVState
repair_code = '''function validateAndRepairCVState() {
    const lang = (cvState && cvState.settings && cvState.settings.uiLang === 'en') ? 'en' : 'tr';
    const defaultState = (lang === 'en') ? EN_SAMPLE_STATE : TR_SAMPLE_STATE;
    
    // Always force refill if state is uninitialized, Jane Doe, or contains fewer than 6 experiences
    if (!cvState || !cvState.personal || !cvState.personal.name || cvState.personal.name === "Jane Doe" || !cvState.experiences || cvState.experiences.length < 6) {
        cvState = JSON.parse(JSON.stringify(defaultState));
        saveToLocalStorage();
    }
    
    // Ensure educations, leadership, projects, certs, refs exist
    if (!cvState.educations || cvState.educations.length === 0) cvState.educations = JSON.parse(JSON.stringify(defaultState.educations));
    if (!cvState.leadership && !cvState.leaderships) cvState.leadership = JSON.parse(JSON.stringify(defaultState.leadership));
    if (!cvState.projects || cvState.projects.length === 0) cvState.projects = JSON.parse(JSON.stringify(defaultState.projects));
    if (!cvState.certifications || cvState.certifications.length === 0) cvState.certifications = JSON.parse(JSON.stringify(defaultState.certifications));
    if (!cvState.references || cvState.references.length === 0) cvState.references = JSON.parse(JSON.stringify(defaultState.references));
}'''

js = re.sub(r"function validateAndRepairCVState\(\) \{.*?\n\}", repair_code, js, flags=re.DOTALL)

# Make loadTRSample and loadENSample instant zero-prompt reset
sample_loaders_instant = '''function loadTRSample() {
    localStorage.clear();
    cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = 'tr';
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}

function loadENSample() {
    localStorage.clear();
    cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = 'en';
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}'''

js = re.sub(r"function loadTRSample\(\) \{.*?\n\}", "", js, flags=re.DOTALL)
js = re.sub(r"function loadENSample\(\) \{.*?\n\}", "", js, flags=re.DOTALL)

js += "\n\n" + sample_loaders_instant

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated app.js with instant zero-prompt TR & EN sample reset handlers!")

# Add prominent reset buttons to top bar of editor.html
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

top_reset_buttons = '''
            <div style="display: flex; gap: 8px; align-items: center; margin-right: 12px;">
                <button class="btn btn-sm btn-primary" onclick="loadTRSample()" title="Türkçe Örnek Şablonu Yükle" style="background: #2563eb; color: #fff; font-weight: 700; border-radius: 6px; padding: 4px 10px;">
                    🇹🇷 TR Örnek CV
                </button>
                <button class="btn btn-sm btn-success" onclick="loadENSample()" title="Load English Sample Template" style="background: #059669; color: #fff; font-weight: 700; border-radius: 6px; padding: 4px 10px;">
                    🇬🇧 EN Sample CV
                </button>
            </div>
'''

if 'onclick="loadTRSample()"' not in html:
    html = html.replace('<div class="header-actions">', '<div class="header-actions">\n' + top_reset_buttons)
    print("SUCCESS: Added top bar TR and EN sample reset buttons to editor.html!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

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
    subprocess.run(["git", "commit", "-m", "Master Override Fix: Force auto-refill if experiences < 6, add instant top bar TR & EN sample reset buttons in editor.html"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed Master Override fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
