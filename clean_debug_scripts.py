import os
import subprocess

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

to_del = [
    "debug_editor_inputs.py",
    "inspect_editor_inputs_html.py",
    "inspect_load_state.py",
    "inspect_render_all.py",
    "update_editor_inputs_and_full_samples.py"
]

for fname in to_del:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try: os.remove(fpath)
        except Exception as e: print(e)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove temporary debug scripts and finalize clean input fixes"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean final state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
