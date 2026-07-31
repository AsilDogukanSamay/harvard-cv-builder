import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

lines = js.split("\n")

# Remove orphan tour code around line 3430 to 3480
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "function showTourStep" in line or "tourSteps = [" in line:
        if start_idx == -1:
            start_idx = i - 5
    if "function renderEditorProjects" in line:
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    print(f"Removing orphan lines {start_idx+1} to {end_idx}")
    new_lines = lines[:start_idx] + lines[end_idx:]
    js_cleaned = "\n".join(new_lines)
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(js_cleaned)
    print("SUCCESS: Removed orphan tour code!")

# Run node --check
nres = subprocess.run(["node", "--check", "app.js"], capture_output=True, text=True)
if nres.returncode == 0:
    print("SUCCESS: Node syntax check passed for app.js!")
else:
    print("Node syntax error:", nres.stderr)
