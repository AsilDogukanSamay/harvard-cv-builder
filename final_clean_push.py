import os
import subprocess

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

to_del = [
    "remove_video_buttons_and_clean_repo.py",
    "build_cvsom_story_video.py",
    "capture_real_product_screens.py",
    "generate_voiceover_and_assets.py"
]

for fname in to_del:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try: os.remove(fpath)
        except Exception as e: print(e)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove temporary cleanup scripts and finalize clean UI state"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed final clean repo state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
