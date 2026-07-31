import os
import sys
import subprocess
import time

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]
edge_exe = None
for path in edge_paths:
    if os.path.exists(path): edge_exe = path; break

abs_path = os.path.abspath(os.path.join(cwd, "editor.html")).replace('\\', '/')
url = f"file:///{abs_path}"

# Run Edge headless and capture console logs
cmd = [edge_exe, "--headless=new", "--disable-gpu", "--enable-logging", "--v=1", url]
proc = subprocess.Popen(cmd, stderr=subprocess.PIPE, stdout=subprocess.PIPE, text=True)
time.sleep(3)
proc.terminate()
try: out, err = proc.communicate(timeout=2)
except: proc.kill(); out, err = "", ""

print("=== Edge Console Output / Errors ===")
for line in (out + "\n" + err).split("\n"):
    if "error" in line.lower() or "exception" in line.lower() or "uncaught" in line.lower() or "js" in line.lower():
        print(line[:140])
