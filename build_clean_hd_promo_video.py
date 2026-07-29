import os
import sys
import time
import subprocess
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
artifact_dir = r"C:\Users\doguk\.gemini\antigravity\brain\99c8d8d8-3d7e-4e01-8a6b-7ab88a32d3dc"

video_temp = os.path.join(cwd, "clean_raw_video.mp4")
final_video_local = os.path.join(cwd, "harvard_cv_builder_demo.mp4")
final_video_artifact = os.path.join(artifact_dir, "harvard_cv_builder_demo.mp4")

js_path = os.path.join(cwd, "app.js")
with open(js_path, "r", encoding="utf-8") as f:
    js_code = f.read()

frames_dir = os.path.join(cwd, "hd_video_frames")
os.makedirs(frames_dir, exist_ok=True)

# 1. High-Resolution Visual Scenes
scenes = [
    ("01_welcome", "👋 Harvard CV Builder - Harvard Extension School (2026) Standartları"),
    ("02_personal", "✍️ Kişisel Bilgiler & Canlı A4 Önizleme Güncellemesi"),
    ("03_experiences", "💼 Dinamik Deneyim Kartı Ekleme & ▲ / ▼ Yön Butonları"),
    ("04_education_gpa", "🎓 Yüksek Lisans Eğitimi & GANO (GPA) Derecesi"),
    ("05_pdf_import", "📄 PDF CV Yükleme & Otomatik Vektörel Ayrıştırma (Sıfır JSON)"),
    ("06_ats_score", "🎯 %96+ Canlı ATS Skor & Workday/Taleo Algoritma Analizi"),
    ("07_ai_assistant", "🤖 Canlı Akıllı AI CV Asistanı & Cümle Güçlendirme"),
    ("08_multi_language", "🌐 Türkçe - İngilizce Otomatik Harvard Zamir Temizleyici"),
    ("09_pdf_export", "🖨️ Tek Tıkla Jilet Gibi Vektörel PDF İndirme")
]

edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]
edge_exe = None
for path in edge_paths:
    if os.path.exists(path): edge_exe = path; break

abs_path_editor = os.path.abspath('editor.html').replace('\\', '/')
url_editor = f"file:///{abs_path_editor}"

captured_images = []
for idx, (step_id, step_title) in enumerate(scenes):
    shot_path = os.path.join(frames_dir, f"step_{idx:02d}.png")
    
    inject_script = f"""
    window.addEventListener("load", () => {{
        setTimeout(() => {{
            if ('{step_id}' === '01_welcome') {{
                localStorage.clear();
                cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
                saveToLocalStorage(); applyLanguage(); loadStateIntoUI(); renderAll(); updateStyles();
            }} else if ('{step_id}' === '02_personal') {{
                updatePersonalField('name', 'Asil Doğukan Samay');
                updatePersonalField('title', 'Management Information Systems Specialist');
                updatePersonalField('location', 'İstanbul / Çanakkale / KKTC, Türkiye');
            }} else if ('{step_id}' === '03_experiences') {{
                addExperience();
                const expIdx = cvState.experiences.length - 1;
                updateExpField(expIdx, 'company', 'TRENDYOL GROUP');
                updateExpField(expIdx, 'role', 'Kıdemli İş Analisti & Veri Mimarisi');
                updateExpField(expIdx, 'dates', '2025 - Present');
                moveExp(expIdx, -1);
            }} else if ('{step_id}' === '04_education_gpa') {{
                addEducation();
                const eduIdx = cvState.educations.length - 1;
                updateEduField(eduIdx, 'university', 'İSTANBUL TEKNİK ÜNİVERSİTESİ');
                updateEduField(eduIdx, 'degree', 'Yüksek Lisans, Veri Analitiği');
                updateEduField(eduIdx, 'gpa', '3.90 / 4.00');
            }} else if ('{step_id}' === '06_ats_score') {{
                openATSModal();
            }} else if ('{step_id}' === '07_ai_assistant') {{
                openAIAssistant();
                askAIAssistant('bullet');
            }} else if ('{step_id}' === '08_multi_language') {{
                changeUILanguage('en');
            }} else if ('{step_id}' === '09_pdf_export') {{
                toggleGuideModal();
            }}
        }}, 600);
    }});
    """
    
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(js_code + "\n" + inject_script)
        
    args = [edge_exe, "--headless=new", "--disable-gpu", "--window-size=1920,1080", f"--screenshot={shot_path}", url_editor]
    proc = subprocess.Popen(args)
    time.sleep(2.5)
    proc.terminate()
    try: proc.wait(timeout=1)
    except: proc.kill()
    
    if os.path.exists(shot_path):
        captured_images.append(shot_path)
        print(f"Captured 1080p frame {idx+1}/{len(scenes)}: {step_title}")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print("SUCCESS: app.js restored.")

# 2. Compile Frames into H.264 Video
fps = 30
duration_per_step = 5.0 # 5 seconds per step = 45 second video
frames_per_step = int(fps * duration_per_step)

first_img = cv2.imread(captured_images[0])
height, width, _ = first_img.shape

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out_raw = cv2.VideoWriter(video_temp, fourcc, fps, (width, height))

for img_path in captured_images:
    frame_img = cv2.imread(img_path)
    for _ in range(frames_per_step):
        out_raw.write(frame_img)

out_raw.release()
cv2.destroyAllWindows()

# Convert using FFmpeg to H.264 / AAC for 100% browser video compatibility
try:
    import imageio_ffmpeg
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    merge_cmd = [
        ffmpeg_exe, "-y",
        "-i", video_temp,
        "-c:v", "libx264",
        "-profile:v", "baseline",
        "-level", "3.0",
        "-pix_fmt", "yuv420p",
        final_video_local
    ]
    subprocess.run(merge_cmd, check=True)
    
    import shutil
    shutil.copyfile(final_video_local, final_video_artifact)
    print("SUCCESS: H.264 1080p Video created at:", final_video_local)
except Exception as ex:
    print("FFmpeg convert error:", ex)

# 3. Add Video Modal and Header Button to editor.html
html_path = os.path.abspath("editor.html")
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

video_btn_code = '<button class="btn-guide btn-video" onclick="openVideoPlayerModal()" style="background: linear-gradient(135deg, #e53935, #c62828); color: #fff; margin-right: 6px; font-weight: 600;" title="Kullanım Videosunu İzle"><i class="fas fa-video"></i> 🎬 Tanıtım Videosunu İzle</button>\n                    <button class="btn-guide btn-tour" onclick="startInteractiveTour()"'

if "btn-video" not in html:
    html = html.replace('<button class="btn-guide btn-tour" onclick="startInteractiveTour()"', video_btn_code, 1)

video_modal_html = '''
    <!-- HTML5 Video Player Modal -->
    <div id="video-player-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 999999; justify-content: center; align-items: center; font-family: sans-serif;">
        <div style="background: #111; width: 92%; max-width: 900px; border-radius: 16px; padding: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); position: relative; border: 1px solid #333; color: #fff;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; padding-bottom: 12px; margin-bottom: 16px;">
                <h3 style="margin: 0; font-size: 18px; color: #fff;"><i class="fas fa-film"></i> Harvard CV Builder - Canlı Kullanım Videosu</h3>
                <button onclick="closeVideoPlayerModal()" style="border: none; background: none; color: #fff; font-size: 24px; cursor: pointer;">&times;</button>
            </div>
            <div style="width: 100%; border-radius: 8px; overflow: hidden; background: #000; display: flex; justify-content: center;">
                <video id="demo-video-element" src="harvard_cv_builder_demo.mp4" controls style="width: 100%; max-height: 520px; outline: none;" autoplay loop></video>
            </div>
            <div style="text-align: right; margin-top: 14px;">
                <button onclick="closeVideoPlayerModal()" class="btn btn-secondary" style="padding: 8px 18px; border-radius: 6px; font-size: 13px; background: #333; color: #fff; border: none; cursor: pointer;">Kapat</button>
            </div>
        </div>
    </div>
'''

if "id=\"video-player-modal\"" not in html:
    html = html.replace('</body>', video_modal_html + '\n</body>', 1)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: editor.html updated with Video Button & Modal!")

# Commit & Push to GitHub
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Video Showcase: Add clean H.264 1080p Video Showcase without robotic audio"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean video showcase to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
