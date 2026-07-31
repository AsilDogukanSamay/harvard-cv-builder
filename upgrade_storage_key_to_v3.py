import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Replace all occurrences of harvard_cv_state_v1 with harvard_cv_state_v3_fresh
js = js.replace("'harvard_cv_state_v1'", "'harvard_cv_state_v3_fresh'")
js = js.replace('"harvard_cv_state_v1"', '"harvard_cv_state_v3_fresh"')

# Force fresh cache migration at the very top of app.js execution
top_migration_code = '''
// FORCE FRESH CACHE MIGRATION (V3)
(function forceFreshCacheMigration() {
    const FRESH_KEY = 'harvard_cv_state_v3_fresh';
    const isAlreadyMigrated = localStorage.getItem('v3_fresh_loaded');
    if (!isAlreadyMigrated) {
        localStorage.clear();
        localStorage.setItem('v3_fresh_loaded', 'true');
    }
})();
'''

if "forceFreshCacheMigration()" not in js:
    js = top_migration_code + "\n" + js

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Upgraded storage key to harvard_cv_state_v3_fresh and added forced fresh cache migration!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Cache Fix: Upgrade storage key to v3_fresh & force auto-clear stale browser caches for instant update"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed storage key v3 upgrade to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
