import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

# Remove robotic mp4 file
mp4_file = os.path.join(cwd, "harvard_cv_builder_demo.mp4")
if os.path.exists(mp4_file):
    try:
        os.remove(mp4_file)
        print("SUCCESS: Removed robotic mp4 file!")
    except Exception as e:
        print("Error removing mp4:", e)

# Also remove from artifact directory if present
artifact_mp4 = r"C:\Users\doguk\.gemini\antigravity\brain\99c8d8d8-3d7e-4e01-8a6b-7ab88a32d3dc\harvard_cv_builder_demo.mp4"
if os.path.exists(artifact_mp4):
    try:
        os.remove(artifact_mp4)
        print("SUCCESS: Removed robotic artifact mp4 file!")
    except Exception as e:
        print("Error removing artifact mp4:", e)

# Update editor.html header to remove robotic video button and keep pristine Interactive Tour
editor_path = os.path.join(cwd, "editor.html")
with open(editor_path, "r", encoding="utf-8") as f:
    html = f.read()

target_btn = '<button class="btn-guide btn-video" onclick="openVideoPlayerModal()"'
if target_btn in html:
    s = html.find(target_btn)
    e = html.find('</button>', s) + 9
    html = html[:s] + html[e:]
    # Remove extra whitespace
    html = html.replace('                    \n', '')
    with open(editor_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("SUCCESS: Removed robotic video button from editor.html!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove robotic audio video files and focus on interactive live tour"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean repository state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
