import os
import sys
import time
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
assets_dir = os.path.join(cwd, "outputs", "cvsom_video_assets")
os.makedirs(assets_dir, exist_ok=True)

js_path = os.path.join(cwd, "app.js")
with open(js_path, "r", encoding="utf-8") as f:
    original_js = f.read()

edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]
edge_exe = None
for path in edge_paths:
    if os.path.exists(path): edge_exe = path; break

abs_path_editor = os.path.abspath(os.path.join(cwd, 'editor.html')).replace('\\', '/')
url_editor = f"file:///{abs_path_editor}"

shots = [
    ("screen_01_live_a4.png", "personal"),
    ("screen_02_autofit.png", "experiences"),
    ("screen_03_ats_score.png", "ats"),
    ("screen_04_ai_assistant.png", "ai"),
    ("screen_05_pdf_import.png", "pdf_import"),
    ("screen_06_pdf_export.png", "pdf_export")
]

for filename, action in shots:
    shot_path = os.path.join(assets_dir, filename)
    
    inject = f"""
    window.addEventListener("load", () => {{
        setTimeout(() => {{
            localStorage.clear();
            cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
            saveToLocalStorage(); applyLanguage(); loadStateIntoUI(); renderAll(); updateStyles();
            
            if ('{action}' === 'personal') {{
                updatePersonalField('name', 'Asil Doğukan Samay');
                updatePersonalField('title', 'Management Information Systems Specialist');
                updatePersonalField('location', 'İstanbul / Çanakkale / KKTC, Türkiye');
            }} else if ('{action}' === 'experiences') {{
                addExperience();
                const expIdx = cvState.experiences.length - 1;
                updateExpField(expIdx, 'company', 'TRENDYOL GROUP');
                updateExpField(expIdx, 'role', 'Kıdemli İş Analisti & Veri Mimarisi');
                updateExpField(expIdx, 'dates', '2025 - Present');
            }} else if ('{action}' === 'ats') {{
                openATSModal();
            }} else if ('{action}' === 'ai') {{
                openAIAssistant();
                askAIAssistant('bullet');
            }} else if ('{action}' === 'pdf_import') {{
                toggleImportModal();
            }} else if ('{action}' === 'pdf_export') {{
                toggleGuideModal();
            }}
        }}, 700);
    }});
    """
    
    with open(js_path, "w", encoding="utf-8") as f:
        f.write(original_js + "\n" + inject)
        
    args = [edge_exe, "--headless=new", "--disable-gpu", "--window-size=1920,1080", f"--screenshot={shot_path}", url_editor]
    proc = subprocess.Popen(args)
    time.sleep(2.5)
    proc.terminate()
    try: proc.wait(timeout=1)
    except: proc.kill()
    print(f"Captured real product screen: {filename}")

# Restore app.js
with open(js_path, "w", encoding="utf-8") as f:
    f.write(original_js)

print("Restored original app.js cleanly.")
