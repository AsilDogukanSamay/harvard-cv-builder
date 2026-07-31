import os
import subprocess

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

to_del = [
    "debug_tabs_and_rendering.py",
    "inspect_switch_tab.py",
    "fix_tabs_and_full_cv_state.py"
]

for fname in to_del:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try: os.remove(fpath)
        except Exception as e: print(e)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove temporary tab debug scripts and finalize clean state"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed final clean repo state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
