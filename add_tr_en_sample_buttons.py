import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Add loadTRSample and loadENSample functions to app.js
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

sample_loaders = '''
// -------------------------------------------------------------
// EXPLICIT SAMPLE TEMPLATE LOADERS (TR & EN)
// -------------------------------------------------------------

function loadTRSample() {
    const msg = "Türkçe örnek Harvard CV şablonu yüklenecektir. Mevcut verilerinizin üzerine yazılmasını onaylıyor musunuz?";
    if (confirm(msg)) {
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.uiLang = 'tr';
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        if (typeof calculateATSScore === 'function') calculateATSScore();
        alert("🇹🇷 Türkçe Harvard Örnek Şablonu Başarıyla Yüklendi!");
    }
}

function loadENSample() {
    const msg = "English sample Harvard CV template will be loaded. Do you confirm overwriting your current data?";
    if (confirm(msg)) {
        cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.uiLang = 'en';
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        if (typeof calculateATSScore === 'function') calculateATSScore();
        alert("🇬🇧 English Harvard Sample Template Loaded Successfully!");
    }
}
'''

if "function loadTRSample()" not in js:
    js += "\n\n" + sample_loaders

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Added loadTRSample() and loadENSample() to app.js!")

# 2. Add prominent buttons to editor.html under Ayarlar tab
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

template_buttons_html = '''
                    <!-- Örnek Hazır Şablonlar -->
                    <div class="section-card" style="margin-bottom: 20px;">
                        <div class="section-header">
                            <h3><i class="fas fa-magic"></i> Hazır Örnek Şablonlar / Sample Templates</h3>
                        </div>
                        <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">
                            Tek bir tıkla tüm alanları dolu 1. Sınıf Harvard CV şablonlarını yükleyebilirsiniz.
                        </p>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                            <button class="btn btn-secondary" onclick="loadTRSample()" style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; padding: 10px; border: 1.5px solid #2563eb; color: #1e40af; background: #eff6ff;">
                                🇹🇷 Türkçe Örnek Şablon Yükle
                            </button>
                            <button class="btn btn-secondary" onclick="loadENSample()" style="display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; padding: 10px; border: 1.5px solid #059669; color: #065f46; background: #ecfdf5;">
                                🇬🇧 Load English Sample Template
                            </button>
                        </div>
                    </div>
'''

if 'onclick="loadTRSample()"' not in html:
    # Insert at the beginning of tab-settings
    html = html.replace('<div id="tab-settings" class="tab-pane">', '<div id="tab-settings" class="tab-pane">\n' + template_buttons_html)
    print("SUCCESS: Added Türkçe and English template load buttons to editor.html!")

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
    subprocess.run(["git", "commit", "-m", "Add explicit TR & EN sample template loader buttons to editor.html and app.js"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed template buttons feature to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
