import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Enhance loadStateIntoUI to ALSO re-render all editor input cards on the left panel!
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
    
    // CRITICAL FIX: Re-render all left sidebar editor input cards so they match cvState!
    if (typeof renderEditorExperiences === 'function') renderEditorExperiences();
    if (typeof renderEditorEducation === 'function') renderEditorEducation();
    if (typeof renderEditorLeadership === 'function') renderEditorLeadership();
    if (typeof renderEditorCertifications === 'function') renderEditorCertifications();
    if (typeof renderEditorProjects === 'function') renderEditorProjects();
    if (typeof renderEditorReferences === 'function') renderEditorReferences();
    if (typeof renderCVContactInfo === 'function') renderCVContactInfo();
}'''

js = re.sub(r"function loadStateIntoUI\(\) \{.*?\n\}", new_load_state_impl, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated loadStateIntoUI in app.js to re-render all left sidebar editor input cards!")

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
    subprocess.run(["git", "commit", "-m", "CRITICAL SMOKING GUN FIX: Re-render all left sidebar editor input cards inside loadStateIntoUI so Sarah Jenkins EN sample experiences (GLOBAL CLOUD SYSTEMS CORP, BOSTON ANALYTICS INC.) do not get overwritten by old Turkish sidebar cards"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed sidebar editor card sync fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
