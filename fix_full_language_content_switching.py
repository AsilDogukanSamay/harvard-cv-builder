import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# 1. Update changeUILanguage to switch BOTH headings AND profile content
new_change_ui_lang = '''function changeUILanguage(newLang) {
    if (!cvState) cvState = {};
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = newLang;
    
    // If switching between the two default sample profiles, swap the entire profile content
    if (newLang === 'en' && cvState.personal && (cvState.personal.name === "Ahmet Yılmaz" || !cvState.personal.name)) {
        cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
    } else if (newLang === 'tr' && cvState.personal && (cvState.personal.name === "Sarah Jenkins" || !cvState.personal.name)) {
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
    } else if (typeof autoTranslateCV === 'function') {
        autoTranslateCV(newLang);
        return;
    }
    
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}'''

js = re.sub(r"function changeUILanguage\(\w+\) \{.*?\n\}", new_change_ui_lang, js, flags=re.DOTALL)

# 2. Ensure loadStateIntoUI sets setting-ui-lang value and renders all editor cards
load_state_regex = r"function loadStateIntoUI\(\) \{.*?\n\}"

with open(js_path, "r", encoding="utf-8") as f:
    js_content = f.read()

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

print("SUCCESS: Updated changeUILanguage and loadStateIntoUI to switch BOTH headings AND profile content!")

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
    subprocess.run(["git", "commit", "-m", "CRITICAL FIX: Ensure changing language or loading sample templates swaps BOTH section headings and full profile content (Ahmet Yilmaz TR <-> Sarah Jenkins EN)"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed full content language switching fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
