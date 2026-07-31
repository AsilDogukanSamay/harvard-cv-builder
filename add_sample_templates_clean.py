import os
import sys
import re
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Update editor.html under tab-settings to add the Sample Templates buttons
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

sample_buttons_html = '''<div id="tab-settings" class="tab-pane">
        <!-- Sample Template Loader Section -->
        <div class="input-group" style="background: rgba(37, 99, 235, 0.05); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: 8px; padding: 12px; margin-bottom: 16px;">
            <label style="font-weight: 700; color: #1e293b; font-size: 13px; display: block; margin-bottom: 4px;">
                Hazır Örnek Şablonlar / Sample Templates
            </label>
            <p style="font-size: 11px; color: #64748b; margin-bottom: 10px;">
                Tek bir tıkla tüm alanları dolu 1. Sınıf Harvard CV şablonlarını yükleyebilirsiniz.
            </p>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-sm" onclick="loadTRSample()" style="flex: 1; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-weight: 700; padding: 8px; border-radius: 6px;">
                    🇹🇷 Türkçe Örnek Şablon Yükle
                </button>
                <button class="btn btn-sm" onclick="loadENSample()" style="flex: 1; background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-weight: 700; padding: 8px; border-radius: 6px;">
                    🇬🇧 Load English Sample Template
                </button>
            </div>
        </div>'''

html = re.sub(r'<div id="tab-settings" class="tab-pane">', sample_buttons_html, html, count=1)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Added Sample Templates loader section to editor.html under tab-settings!")

# 2. Update app.js with loadTRSample and loadENSample functions and loadStateIntoUI preview sync
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Enhanced loadStateIntoUI to update BOTH sidebar inputs AND preview text
new_load_state = '''function loadStateIntoUI() {
    if (!cvState || !cvState.personal) return;
    
    // Personal Info Sidebar Inputs
    const setVal = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.value = val || "";
    };
    
    setVal('input-name', cvState.personal.name);
    setVal('input-title', cvState.personal.title);
    setVal('input-email', cvState.personal.email);
    setVal('input-phone', cvState.personal.phone);
    setVal('input-location', cvState.personal.location);
    setVal('input-github', cvState.personal.github);
    setVal('input-linkedin', cvState.personal.linkedin);
    setVal('input-website', cvState.personal.website);
    setVal('input-summary', cvState.personal.summary);
    
    // Skills Sidebar Inputs
    if (cvState.skills) {
        setVal('input-skills-technical', cvState.skills.technical);
        setVal('input-skills-tools', cvState.skills.tools);
        setVal('input-skills-langs', cvState.skills.langs);
    }
    
    // Direct A4 Paper Preview Updates
    const setText = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val || "";
    };
    
    setText('cv-name', cvState.personal.name);
    setText('cv-title-display', cvState.personal.title);
    setText('cv-summary', cvState.personal.summary);
    setText('cv-email', cvState.personal.email);
    setText('cv-phone', cvState.personal.phone);
    setText('cv-location', cvState.personal.location);
    setText('cv-github', cvState.personal.github);
    setText('cv-linkedin', cvState.personal.linkedin);
    setText('cv-website', cvState.personal.website);
    
    if (typeof renderCVContactInfo === 'function') renderCVContactInfo();
}'''

js = re.sub(r"function loadStateIntoUI\(\) \{.*?\n\}", new_load_state, js, flags=re.DOTALL)

# Explicit loader functions
sample_loaders = '''
function loadTRSample() {
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
    cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = 'en';
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}
'''

if "function loadTRSample()" not in js:
    js += "\n\n" + sample_loaders

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Added loadTRSample and loadENSample functions and loadStateIntoUI preview sync to app.js!")

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
    subprocess.run(["git", "commit", "-m", "Feature: Add explicit TR & EN sample template loader buttons under Ayarlar tab for 2 distinct realistic profiles (Ahmet Yilmaz TR & Alex Morgan EN)"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed Sample Templates feature to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
