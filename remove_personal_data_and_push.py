import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

# 1. Remove lale_cv_backup.json and mail_config.json
files_to_remove = ["lale_cv_backup.json", "mail_config.json"]
for fname in files_to_remove:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try:
            os.remove(fpath)
            print(f"SUCCESS: Removed sensitive file {fname}")
        except Exception as ex:
            print(f"Error removing {fname}: {ex}")

# 2. Update .gitignore to exclude any json backups
gitignore_path = os.path.join(cwd, ".gitignore")
with open(gitignore_path, "r", encoding="utf-8") as f:
    gi_content = f.read()

if "*.json" not in gi_content:
    gi_content += "\n# Sensitive Backup Files\n*.json\n"
    with open(gitignore_path, "w", encoding="utf-8") as f:
        f.write(gi_content)
    print("SUCCESS: Added *.json to .gitignore!")

# 3. Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Security & Privacy: Remove personal JSON backups and update .gitignore"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed security update to GitHub!")
except Exception as ex:
    print(f"Git push error: {ex}")
