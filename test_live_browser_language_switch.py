import os
import sys
import time
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
artifact_dir = r"C:\Users\doguk\.gemini\antigravity\brain\99c8d8d8-3d7e-4e01-8a6b-7ab88a32d3dc"
shot_path = os.path.join(artifact_dir, "test_live_switch_proof.png")

# Write a tiny test runner using Edge Headless with JS injection or direct URL inspection
abs_path = os.path.abspath(os.path.join(cwd, "editor.html")).replace('\\', '/')
url = f"file:///{abs_path}"

edge_paths = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
]
edge_exe = None
for path in edge_paths:
    if os.path.exists(path): edge_exe = path; break

print("Using Edge EXE:", edge_exe)
print("Testing URL:", url)

# Run edge headless to capture initial DOM
args = [edge_exe, "--headless=new", "--disable-gpu", "--window-size=1920,1080", f"--screenshot={shot_path}", url]
proc = subprocess.Popen(args)
time.sleep(2.5)
proc.terminate()

if os.path.exists(shot_path):
    print("SUCCESS: Captured test_live_switch_proof.png")
