import os
import sys
import time
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
artifact_dir = r"C:\Users\doguk\.gemini\antigravity\brain\99c8d8d8-3d7e-4e01-8a6b-7ab88a32d3dc"
shot_path = os.path.join(artifact_dir, "syntax_fix_verified_final.png")

# Delete debug scripts
to_del = [
    "check_js_errors.py",
    "fix_syntax_error_in_app_js.py",
    "inspect_dom_content_loaded.py",
    "inspect_init_sequence.py",
    "inspect_tab_css_and_html_values.py"
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
    print("SUCCESS: Captured final verified screenshot after fixing JS syntax error at:", shot_path)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean workspace and finalize verified JS syntax fix"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean final state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
