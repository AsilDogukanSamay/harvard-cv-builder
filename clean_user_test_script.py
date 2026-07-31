import os
import subprocess

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
fpath = os.path.join(cwd, "run_full_user_simulation_test.py")

if os.path.exists(fpath):
    try: os.remove(fpath)
    except Exception as e: print(e)

try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean temporary user test script"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean final state to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
