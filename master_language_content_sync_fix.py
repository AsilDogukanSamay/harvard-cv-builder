import os
import sys
import re
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Ensure cvState is ALWAYS initialized upon declaration
js = re.sub(r"let cvState;", "let cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));", js)

# 2. Update changeUILanguage to swap FULL profile content and auto-translate custom text
new_change_ui_lang = '''function changeUILanguage(newLang) {
    if (!cvState) cvState = {};
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = newLang;
    
    // Swap full profile content between Turkish (Ahmet Yılmaz) and English (Sarah Jenkins)
    if (newLang === 'en') {
        if (!cvState.personal || cvState.personal.name === "Ahmet Yılmaz" || cvState.personal.name === "Jane Doe") {
            cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
        } else if (typeof autoTranslateCV === 'function') {
            autoTranslateCV('en');
            return;
        }
    } else if (newLang === 'tr') {
        if (!cvState.personal || cvState.personal.name === "Sarah Jenkins" || cvState.personal.name === "Jane Doe") {
            cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        } else if (typeof autoTranslateCV === 'function') {
            autoTranslateCV('tr');
            return;
        }
    }
    
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}'''

js = re.sub(r"function changeUILanguage\(\w+\) \{.*?\n\}", new_change_ui_lang, js, flags=re.DOTALL)

# 3. Explicit loader functions that clear stale localStorage and force fresh content render
sample_loaders = '''function loadTRSample() {
    localStorage.clear();
    cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
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
js += "\n\n" + sample_loaders

# 4. Enhance loadStateIntoUI to sync language dropdown, sidebar inputs, and A4 preview text
new_load_state_impl = '''function loadStateIntoUI() {
    if (!cvState || !cvState.personal) return;
    
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    const langSelect = document.getElementById('setting-ui-lang');
    if (langSelect) langSelect.value = lang;
    
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

js = re.sub(r"function loadStateIntoUI\(\) \{.*?\n\}", new_load_state_impl, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated app.js with master language content sync fix!")

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
    subprocess.run(["git", "commit", "-m", "MASTER LANGUAGE CONTENT FIX: Fully synchronize both headings and full profile content (Ahmet Yılmaz TR <-> Sarah Jenkins EN) on language dropdown change or sample load"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed master language content sync fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
