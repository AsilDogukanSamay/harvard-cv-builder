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

# 1. Add video player function to app.js
video_fn = '''
function openVideoPlayerModal() {
    const modal = document.getElementById('video-player-modal');
    if (modal) {
        modal.style.display = 'flex';
        const video = document.getElementById('demo-video-element');
        if (video) video.play();
    }
}

function closeVideoPlayerModal() {
    const modal = document.getElementById('video-player-modal');
    if (modal) {
        modal.style.display = 'none';
        const video = document.getElementById('demo-video-element');
        if (video) video.pause();
    }
}
'''

if "function openVideoPlayerModal()" not in js:
    js += "\n\n" + video_fn
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js)

# 2. Add video player button & modal to editor.html
if "video-player-modal" not in html:
    # Add video watch button in header
    btn_target = '<button class="btn-guide btn-tour" onclick="startInteractiveTour()"'
    video_btn = '<button class="btn-guide btn-video" onclick="openVideoPlayerModal()" style="background: linear-gradient(135deg, #e53935, #c62828); color: #fff; margin-right: 6px; font-weight: 600;" title="Kullanım Videosunu İzle"><i class="fas fa-video"></i> 🎬 Tanıtım Videosunu İzle</button>\n                    ' + btn_target
    
    html = html.replace(btn_target, video_btn, 1)

    # Video Player Modal
    video_modal_html = '''
    <!-- HTML5 Video Player Modal -->
    <div id="video-player-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 999999; justify-content: center; align-items: center; font-family: sans-serif;">
        <div style="background: #111; width: 92%; max-width: 900px; border-radius: 16px; padding: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); position: relative; border: 1px solid #333;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 16px;">
                <h3 style="margin: 0; font-size: 18px; color: #fff;"><i class="fas fa-film"></i> Harvard CV Builder - Canlı Kullanım Videosu</h3>
                <button onclick="closeVideoPlayerModal()" style="border: none; background: none; color: #fff; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <div style="width: 100%; border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center;">
                <video id="demo-video-element" src="harvard_cv_builder_demo.mp4" controls style="width: 100%; max-height: 520px; outline: none;" autoplay loop></video>
            </div>
            <div style="text-align: right; margin-top: 14px;">
                <button onclick="closeVideoPlayerModal()" class="btn btn-secondary" style="padding: 8px 18px; border-radius: 6px; font-size: 13px;">Kapat</button>
            </div>
        </div>
    </div>
    '''

    html = html.replace('</body>', video_modal_html + '\n</body>', 1)

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Added HTML5 Video Player Modal to editor.html!")

# Commit & Push to GitHub
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Feature: Add HTML5 Video Player Modal for harvard_cv_builder_demo.mp4"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed Video Player Modal to GitHub!")
except Exception as ex:
    print(f"Git push error: {ex}")
