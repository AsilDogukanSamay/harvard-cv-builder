import os
import sys
import time
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
artifact_dir = r"C:\Users\doguk\.gemini\antigravity\brain\99c8d8d8-3d7e-4e01-8a6b-7ab88a32d3dc"
shot_path = os.path.join(artifact_dir, "master_audit_verified.png")

# Remove audit scripts
to_del = [
    "audit_all_editor_fields.py",
    "fix_all_editor_bugs_and_full_samples.py",
    "inspect_dynamic_renderers.py"
]
for fname in to_del:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try: os.remove(fpath)
        except Exception as e: print(e)

edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]
edge_exe = None
for path in edge_paths:
    if os.path.exists(path): edge_exe = path; break

abs_path = os.path.abspath(os.path.join(cwd, "editor.html")).replace('\\', '/')
url = f"file:///{abs_path}"

args = [edge_exe, "--headless=new", "--disable-gpu", "--window-size=1920,1080", f"--screenshot={shot_path}", url]
proc = subprocess.Popen(args)
time.sleep(2.5)
proc.terminate()

if os.path.exists(shot_path):
    print("SUCCESS: Captured Master Audit Verified screenshot at:", shot_path)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean workspace and finalize verified master audit fix"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean master state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
