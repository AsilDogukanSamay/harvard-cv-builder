import os
import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")
index_path = os.path.join(cwd, "index.html")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

with open(index_path, "r", encoding="utf-8") as f:
    idx_html = f.read()

# 1. Update Video Modal in editor.html with Chapter Navigation
video_modal_chapters = '''
    <!-- HTML5 Video Player & Chapter Showcase Modal -->
    <div id="video-player-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 999999; justify-content: center; align-items: center; font-family: sans-serif;">
        <div style="background: #12121a; width: 94%; max-width: 1000px; border-radius: 18px; padding: 24px; box-shadow: 0 30px 80px rgba(0,0,0,0.8); position: relative; border: 1px solid #2a2a3c; color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2a3c; padding-bottom: 14px; margin-bottom: 18px;">
                <div>
                    <h3 style="margin: 0; font-size: 19px; color: #fff; font-weight: 700;"><i class="fas fa-play-circle" style="color: #e53935;"></i> Harvard CV Builder - Profesyonel Ürün Tanıtımı</h3>
                    <span style="font-size: 12px; color: #94a3b8;">Harvard Extension School 2026 & ATS 90+ Standartları Kılavuzu</span>
                </div>
                <button onclick="closeVideoPlayerModal()" style="border: none; background: none; color: #94a3b8; font-size: 26px; cursor: pointer;">&times;</button>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 280px; gap: 16px;">
                <div style="border-radius: 12px; overflow: hidden; background: #000; display: flex; justify-content: center; align-items: center; border: 1px solid #2a2a3c;">
                    <video id="demo-video-element" src="harvard_cv_builder_demo.mp4" controls style="width: 100%; max-height: 480px; outline: none;" autoplay loop></video>
                </div>
                
                <!-- Chapter Timestamps Sidebar -->
                <div style="background: #1a1a28; border-radius: 12px; padding: 14px; border: 1px solid #2a2a3c; display: flex; flex-direction: column; gap: 8px;">
                    <div style="font-size: 13px; font-weight: 700; color: #cbd5e1; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">📍 Video Bölümleri</div>
                    
                    <button onclick="seekVideo(0)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 00:00 | Giriş & Harvard Standartları</button>
                    <button onclick="seekVideo(10)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 00:10 | Kişisel Bilgiler & Canlı Önizleme</button>
                    <button onclick="seekVideo(20)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 00:20 | Dinamik Kartlar & ▲/▼ Sıralama</button>
                    <button onclick="seekVideo(35)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 00:35 | Tek Tıkla PDF CV Yükleme</button>
                    <button onclick="seekVideo(50)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 00:50 | %96+ ATS Skor & Algoritma</button>
                    <button onclick="seekVideo(65)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 01:05 | 🤖 Canlı AI CV Asistanı</button>
                    <button onclick="seekVideo(75)" style="text-align: left; background: #252538; border: 1px solid #3b3b54; color: #fff; padding: 8px 10px; border-radius: 6px; font-size: 11px; cursor: pointer;">⏱️ 01:15 | Türkçe - İngilizce Harvard Çeviri</button>
                </div>
            </div>

            <div style="text-align: right; margin-top: 16px;">
                <button onclick="closeVideoPlayerModal()" class="btn btn-secondary" style="padding: 8px 20px; border-radius: 6px; font-size: 13px; background: #2a2a3c; color: #fff; border: none; cursor: pointer;">Kapat</button>
            </div>
        </div>
    </div>
'''

# Replace old modal in editor.html
s_modal = html.find('<div id="video-player-modal"')
if s_modal != -1:
    e_modal = html.find('</div>\n    </div>', s_modal) + 11
    html = html[:s_modal] + video_modal_chapters + html[e_modal:]
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Updated Video Player Modal with Chapters in editor.html!")

# 2. Add seekVideo to app.js
seek_fn = '''
function seekVideo(seconds) {
    const video = document.getElementById('demo-video-element');
    if (video) {
        video.currentTime = seconds;
        video.play();
    }
}
'''
if "function seekVideo" not in js:
    js += "\n\n" + seek_fn
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("SUCCESS: Added seekVideo to app.js!")

# Commit & Push to GitHub
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Promotional Upgrade: Add SaaS-style video chapter navigator & storyboard showcase"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed SaaS Video Showcase upgrade to GitHub!")
except Exception as ex:
    print(f"Git push error: {ex}")
