import os
import subprocess

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

to_del = [
    "fix_duplicate_container_in_app.py",
    "fix_duplicate_consts.py",
    "fix_exact_line_duplicate.py",
    "fix_exact_projects_span_duplicate.py",
    "print_last_60_lines.py",
    "print_repr_lines.py"
]

for fname in to_del:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try: os.remove(fpath)
        except Exception as e: print(e)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Developer & Product Fix: Fix duplicate const declarations in app.js and verify 100% clean Node syntax"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed verified clean state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
