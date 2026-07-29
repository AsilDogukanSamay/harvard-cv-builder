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

# YouTube Style Modal HTML
yt_modal_html = '''
    <!-- YouTube Style Interactive Video & Showcase Modal -->
    <div id="youtube-showcase-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 15, 20, 0.95); z-index: 999999; justify-content: center; align-items: center; font-family: 'Inter', sans-serif; color: #fff; overflow-y: auto;">
        <div style="background: #0f0f0f; width: 95%; max-width: 1100px; max-height: 90vh; border-radius: 16px; padding: 24px; box-shadow: 0 30px 90px rgba(0,0,0,0.9); border: 1px solid #272727; overflow-y: auto;">
            
            <!-- YouTube Header Bar -->
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #272727; padding-bottom: 16px; margin-bottom: 20px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="background: #ff0000; color: #fff; width: 36px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800;"><i class="fas fa-play"></i></div>
                    <span style="font-size: 18px; font-weight: 700; letter-spacing: -0.5px;">YouTube Tanıtım & İnceleme Videosu</span>
                </div>
                <button onclick="closeYouTubeShowcase()" style="background: none; border: none; color: #aaa; font-size: 28px; cursor: pointer;">&times;</button>
            </div>

            <!-- Main YouTube Grid Layout -->
            <div style="display: grid; grid-template-columns: 1fr 320px; gap: 20px;">
                
                <!-- Left: Video Screen & Player -->
                <div>
                    <div style="position: relative; width: 100%; border-radius: 12px; overflow: hidden; background: #000; border: 1px solid #272727; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                        <video id="yt-video-player" src="harvard_cv_builder_demo.mp4" controls autoplay loop style="width: 100%; max-height: 480px; display: block; outline: none;"></video>
                    </div>

                    <!-- Video Title & Meta -->
                    <h2 style="font-size: 18px; font-weight: 700; margin: 16px 0 8px 0; color: #f1f1f1;">🔥 Harvard CV Builder 2026 - %96+ ATS Skorlu Özgeçmiş Nasıl Yapılır? (Tam Rehber)</h2>
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #272727; padding-bottom: 14px; margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 42px; height: 42px; border-radius: 50%; background: linear-gradient(135deg, #1a73e8, #8e24aa); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; font-size: 16px;">AD</div>
                            <div>
                                <div style="font-weight: 700; font-size: 14px; color: #f1f1f1;">Asil Doğukan Samay</div>
                                <div style="font-size: 12px; color: #aaa;">12.4 B Abone</div>
                            </div>
                            <button style="background: #f1f1f1; color: #0f0f0f; border: none; font-weight: 700; padding: 8px 16px; border-radius: 18px; font-size: 12px; margin-left: 12px; cursor: pointer;">Abone Ol</button>
                        </div>
                        
                        <div style="display: flex; gap: 8px;">
                            <button style="background: #272727; color: #fff; border: none; padding: 8px 14px; border-radius: 18px; font-size: 12px; font-weight: 600; cursor: pointer;"><i class="fas fa-thumbs-up"></i> 1.8 B</button>
                            <button style="background: #272727; color: #fff; border: none; padding: 8px 14px; border-radius: 18px; font-size: 12px; font-weight: 600; cursor: pointer;"><i class="fas fa-share"></i> Paylaş</button>
                        </div>
                    </div>

                    <!-- Video Description Box -->
                    <div style="background: #272727; border-radius: 12px; padding: 14px; font-size: 13px; line-height: 1.6; color: #d1d1d1;">
                        <div style="font-weight: 700; margin-bottom: 6px; color: #fff;">45.219 görüntülenme • 29 Tem 2026</div>
                        <p style="margin: 0 0 10px 0;">
                            🚀 Bu videoda Harvard Extension School (2026) standartlarında, Taleo ve Workday işe alım robotlarından %96+ puan alan profesyonel özgeçmiş oluşturmanın tüm detaylarını anlatıyorum!
                        </p>
                        <div style="font-weight: 700; color: #3ea6ff; margin-bottom: 4px;">📌 Bölüm Zaman Damgaları:</div>
                        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 12px;">
                            <span onclick="seekYTVideo(0)" style="color: #3ea6ff; cursor: pointer;">⏱️ 00:00 - Giriş ve ATS Problemi</span>
                            <span onclick="seekYTVideo(10)" style="color: #3ea6ff; cursor: pointer;">⏱️ 00:10 - Canlı A4 Önizleme & Editör Kullanımı</span>
                            <span onclick="seekYTVideo(20)" style="color: #3ea6ff; cursor: pointer;">⏱️ 00:20 - Dinamik Kartlar & ▲/▼ Sıralama</span>
                            <span onclick="seekYTVideo(35)" style="color: #3ea6ff; cursor: pointer;">⏱️ 00:35 - Tek Tıkla PDF CV Yükleme</span>
                            <span onclick="seekYTVideo(50)" style="color: #3ea6ff; cursor: pointer;">⏱️ 00:50 - %96+ ATS Skor Analizi</span>
                            <span onclick="seekYTVideo(65)" style="color: #3ea6ff; cursor: pointer;">⏱️ 01:05 - Canlı Akıllı AI CV Asistanı</span>
                        </div>
                    </div>
                </div>

                <!-- Right: YouTube Comments & Related Showcase -->
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="background: #181818; border-radius: 12px; padding: 16px; border: 1px solid #272727;">
                        <div style="font-size: 14px; font-weight: 700; margin-bottom: 14px; border-bottom: 1px solid #272727; padding-bottom: 8px;">💬 Öne Çıkan Yorumlar (142)</div>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px; font-size: 12px;">
                            <div>
                                <div style="font-weight: 700; color: #3ea6ff;">@MertYilmaz • 2 saat önce</div>
                                <div style="color: #e1e1e1; margin-top: 2px;">Kanka harika bir proje olmuş! PDF yükleme saniyeler sürdü, ATS skoru bende %96 çıktı 🚀</div>
                            </div>
                            <div>
                                <div style="font-weight: 700; color: #3ea6ff;">@Selin_HR • 5 saat önce</div>
                                <div style="color: #e1e1e1; margin-top: 2px;">Bir İK uzmanı olarak söylüyorum, Harvard tek kolonlu format tam bizim aradığımız standart!</div>
                            </div>
                            <div>
                                <div style="font-weight: 700; color: #3ea6ff;">@BurakYazilim • 1 gün önce</div>
                                <div style="color: #e1e1e1; margin-top: 2px;">AI asistanının etken fiil önerileri mükemmel. YouTube inceleme videosu için tebrikler! 🔥</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
'''

# Replace or add modal in editor.html
if "youtube-showcase-modal" not in html:
    html = html.replace('</body>', yt_modal_html + '\n</body>', 1)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Added YouTube Showcase Modal to editor.html!")

# Update app.js functions
yt_js_code = '''
function openYouTubeShowcase() {
    const modal = document.getElementById('youtube-showcase-modal');
    if (modal) {
        modal.style.display = 'flex';
        const video = document.getElementById('yt-video-player');
        if (video) video.play();
    }
}

function closeYouTubeShowcase() {
    const modal = document.getElementById('youtube-showcase-modal');
    if (modal) {
        modal.style.display = 'none';
        const video = document.getElementById('yt-video-player');
        if (video) video.pause();
    }
}

function seekYTVideo(seconds) {
    const video = document.getElementById('yt-video-player');
    if (video) {
        video.currentTime = seconds;
        video.play();
    }
}
'''

if "function openYouTubeShowcase()" not in js:
    js += "\n\n" + yt_js_code
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)
    print("SUCCESS: Added YouTube functions to app.js!")

# Update header button in editor.html to launch YouTube Showcase
target_header_btn = '<button class="btn-guide btn-tour" onclick="startInteractiveTour()"'
yt_header_btn = '<button class="btn-guide btn-youtube" onclick="openYouTubeShowcase()" style="background: #ff0000; color: #fff; margin-right: 6px; font-weight: 700;" title="YouTube İnceleme Videosunu İzle"><i class="fab fa-youtube"></i> 📺 YouTube İnceleme Videosu</button>\n                    <button class="btn-guide btn-tour" onclick="startInteractiveTour()"'

if "btn-youtube" not in html:
    html = html.replace(target_header_btn, yt_header_btn, 1)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Added YouTube Header Button to editor.html!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "YouTube Showcase: Add interactive YouTube-style Video Review Player & Comments Showcase"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed YouTube Showcase update to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
