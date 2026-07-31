import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Update editor.html script tag version to v=9999 to bust HTTP cache completely
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

html = re.sub(r'src="app\.js(?:\?v=[^"]*)?"', 'src="app.js?v=9999"', html)
html = re.sub(r'href="style\.css(?:\?v=[^"]*)?"', 'href="style.css?v=9999"', html)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Updated editor.html script & style tags with ?v=9999 cache buster!")

# 2. Update app.js to force cache clear on version 100
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

cache_clear_top = '''// FORCE AUTO CACHE CLEAR FOR VERSION 100
(function() {
    if (typeof localStorage !== 'undefined' && !localStorage.getItem('harvard_v100_cleared')) {
        try {
            localStorage.clear();
            localStorage.setItem('harvard_v100_cleared', 'true');
        } catch(e){}
    }
})();
'''

if "harvard_v100_cleared" not in js:
    js = cache_clear_top + "\n" + js

# 3. Direct DOM force-loaders for loadTRSample and loadENSample
direct_sample_loaders = '''
function loadTRSample() {
    try { localStorage.clear(); localStorage.setItem('harvard_v100_cleared', 'true'); } catch(e){}
    cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = 'tr';
    saveToLocalStorage();
    
    // Direct DOM Input Force Updates
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ""; };
    setVal('input-name', cvState.personal.name);
    setVal('input-title', cvState.personal.title);
    setVal('input-email', cvState.personal.email);
    setVal('input-phone', cvState.personal.phone);
    setVal('input-location', cvState.personal.location);
    setVal('input-github', cvState.personal.github);
    setVal('input-linkedin', cvState.personal.linkedin);
    setVal('input-website', cvState.personal.website);
    setVal('input-summary', cvState.personal.summary);
    if (cvState.skills) {
        setVal('input-skills-technical', cvState.skills.technical);
        setVal('input-skills-tools', cvState.skills.tools);
        setVal('input-skills-langs', cvState.skills.langs);
    }
    
    // Direct DOM Preview Force Updates
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ""; };
    setText('cv-name', cvState.personal.name);
    setText('cv-title-display', cvState.personal.title);
    setText('cv-summary', cvState.personal.summary);
    setText('cv-email', cvState.personal.email);
    setText('cv-phone', cvState.personal.phone);
    setText('cv-location', cvState.personal.location);
    setText('cv-github', cvState.personal.github);
    setText('cv-linkedin', cvState.personal.linkedin);
    setText('cv-website', cvState.personal.website);
    
    const langSelect = document.getElementById('setting-ui-lang');
    if (langSelect) langSelect.value = 'tr';
    
    applyLanguage();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}

function loadENSample() {
    try { localStorage.clear(); localStorage.setItem('harvard_v100_cleared', 'true'); } catch(e){}
    cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = 'en';
    saveToLocalStorage();
    
    // Direct DOM Input Force Updates
    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val || ""; };
    setVal('input-name', cvState.personal.name);
    setVal('input-title', cvState.personal.title);
    setVal('input-email', cvState.personal.email);
    setVal('input-phone', cvState.personal.phone);
    setVal('input-location', cvState.personal.location);
    setVal('input-github', cvState.personal.github);
    setVal('input-linkedin', cvState.personal.linkedin);
    setVal('input-website', cvState.personal.website);
    setVal('input-summary', cvState.personal.summary);
    if (cvState.skills) {
        setVal('input-skills-technical', cvState.skills.technical);
        setVal('input-skills-tools', cvState.skills.tools);
        setVal('input-skills-langs', cvState.skills.langs);
    }
    
    // Direct DOM Preview Force Updates
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ""; };
    setText('cv-name', cvState.personal.name);
    setText('cv-title-display', cvState.personal.title);
    setText('cv-summary', cvState.personal.summary);
    setText('cv-email', cvState.personal.email);
    setText('cv-phone', cvState.personal.phone);
    setText('cv-location', cvState.personal.location);
    setText('cv-github', cvState.personal.github);
    setText('cv-linkedin', cvState.personal.linkedin);
    setText('cv-website', cvState.personal.website);
    
    const langSelect = document.getElementById('setting-ui-lang');
    if (langSelect) langSelect.value = 'en';
    
    applyLanguage();
    renderAll();
    updateStyles();
    if (typeof calculateATSScore === 'function') calculateATSScore();
}
'''

js = re.sub(r"function loadTRSample\(\) \{.*?\n\}", "", js, flags=re.DOTALL)
js = re.sub(r"function loadENSample\(\) \{.*?\n\}", "", js, flags=re.DOTALL)
js += "\n\n" + direct_sample_loaders

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Implemented direct DOM force-loaders for TR & EN samples in app.js!")

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
    subprocess.run(["git", "commit", "-m", "CACHE BUST & DIRECT DOM LOAD: Add v9999 query params to script tags, auto-clear stale localStorage, and force direct DOM updates on loadTRSample and loadENSample"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed cache bust and direct DOM loader fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
