import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

# Remove all generated mp4 files
for fname in os.listdir(cwd):
    if fname.endswith(".mp4") or fname.endswith(".avi") or fname.endswith(".mov"):
        fpath = os.path.join(cwd, fname)
        try:
            os.remove(fpath)
            print(f"SUCCESS: Removed generated video file {fname}")
        except Exception as e:
            print("Error removing video:", e)

artifact_mp4 = r"C:\Users\doguk\.gemini\antigravity\brain\99c8d8d8-3d7e-4e01-8a6b-7ab88a32d3dc\harvard_cv_builder_demo.mp4"
if os.path.exists(artifact_mp4):
    try:
        os.remove(artifact_mp4)
        print("SUCCESS: Removed artifact mp4!")
    except Exception as e:
        print("Error removing artifact mp4:", e)

# Git commit & push clean repo
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove programmatic video files and maintain 100% pristine open-source codebase"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean repository state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
