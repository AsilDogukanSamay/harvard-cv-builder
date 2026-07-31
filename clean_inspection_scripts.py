import os
import subprocess

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

to_del = [
    "check_sample_states.py",
    "inspect_app_state.py",
    "inspect_preset_loader.py",
    "push_clean_samples.py",
    "replace_personal_data_with_sample.py",
    "search_personal_data.py",
    "search_template_loader.py"
]

for fname in to_del:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try: os.remove(fpath)
        except Exception as e: print(e)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove temporary sample inspection scripts"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean final state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
