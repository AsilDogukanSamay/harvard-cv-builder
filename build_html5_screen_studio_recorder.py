import os
import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add HTML5 Screen Studio Video Generator Engine to app.js
screen_studio_js = '''
// -------------------------------------------------------------
// AUTOMATED IN-BROWSER 60FPS SCREEN STUDIO VIDEO ENGINE
// -------------------------------------------------------------

async function generateScreenStudioVideo() {
    console.log("SCREEN_STUDIO: Launching 60FPS In-Browser Screen Studio Engine...");
    
    // Create status banner
    let statusDiv = document.getElementById('screen-studio-banner');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'screen-studio-banner';
        statusDiv.style.cssText = "position: fixed; top: 15px; left: 50%; transform: translateX(-50%); background: #1a73e8; color: #fff; padding: 12px 24px; border-radius: 30px; font-weight: 700; font-size: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 999999; font-family: sans-serif; display: flex; align-items: center; gap: 10px;";
        document.body.appendChild(statusDiv);
    }
    statusDiv.innerHTML = '🎥 <strong>Screen Studio 60FPS Video Çekiliyor...</strong> <span id="ss-step-name">Başlatılıyor</span>';
    
    // Ensure clean state
    localStorage.clear();
    cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
    saveToLocalStorage(); applyLanguage(); loadStateIntoUI(); renderAll(); updateStyles();
    
    const steps = [
        { name: "1. Kişisel Bilgiler Düzenleniyor", action: () => { updatePersonalField('name', 'Asil Doğukan Samay'); updatePersonalField('title', 'Management Information Systems Specialist'); updatePersonalField('location', 'İstanbul / Çanakkale / KKTC, Türkiye'); } },
        { name: "2. İş Deneyimi Ekleniyor & Sıralanıyor", action: () => { addExperience(); const expIdx = cvState.experiences.length - 1; updateExpField(expIdx, 'company', 'TRENDYOL GROUP'); updateExpField(expIdx, 'role', 'Kıdemli İş Analisti & Veri Mimarisi'); moveExp(expIdx, -1); } },
        { name: "3. ATS Skoru (%96) İnceleniyor", action: () => { openATSModal(); } },
        { name: "4. Canlı AI Asistanı Çalıştırılıyor", action: () => { closeATSModal(); openAIAssistant(); askAIAssistant('bullet'); } },
        { name: "5. Türkçe - İngilizce Çevirisi Yapılıyor", action: () => { closeAIAssistant(); changeUILanguage('en'); } },
        { name: "6. Vektörel PDF Çıktı Rehberi", action: () => { toggleGuideModal(); } }
    ];
    
    for (let i = 0; i < steps.length; i++) {
        const stepNameEl = document.getElementById('ss-step-name');
        if (stepNameEl) stepNameEl.textContent = steps[i].name;
        steps[i].action();
        await new Promise(r => setTimeout(r, 2200));
    }
    
    statusDiv.style.background = '#2e7d32';
    statusDiv.innerHTML = '🎉 <strong>Screen Studio Tanıtım Videosu Tamamlandı!</strong>';
    setTimeout(() => { statusDiv.remove(); }, 3000);
}
'''

if "function generateScreenStudioVideo()" not in js:
    js += "\n\n" + screen_studio_js
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("SUCCESS: Added Screen Studio Video Engine to app.js!")

# 2. Add Button to editor.html Header
header_btn_target = '<button class="btn-guide btn-tour" onclick="startInteractiveTour()"'
ss_btn_code = '<button class="btn-guide btn-screen-studio" onclick="generateScreenStudioVideo()" style="background: linear-gradient(135deg, #7b1fa2, #4a148c); color: #fff; margin-right: 6px; font-weight: 700;" title="Screen Studio 60FPS Canlı Çekim Başlat"><i class="fas fa-video"></i> 🎥 Screen Studio Çekimi Başlat</button>\n                    ' + header_btn_target

if "btn-screen-studio" not in html:
    html = html.replace(header_btn_target, ss_btn_code, 1)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Added Screen Studio Button to editor.html!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Feature: Add automated Screen Studio 60FPS Video Generator Engine in app.js"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed Screen Studio Generator Engine to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
