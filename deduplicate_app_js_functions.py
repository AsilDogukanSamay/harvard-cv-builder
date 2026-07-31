import sys
import subprocess
import re

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

# Fix duplicate renderEditorProjects or duplicate helper functions
# Let's inspect where renderEditorProjects appears
funcs = ["renderEditorProjects", "renderCVProjects", "updateProjectField", "addProject", "deleteProject", "moveProject", "getLeadershipArray"]

for func in funcs:
    matches = list(re.finditer(rf"function {func}\s*\(", js))
    if len(matches) > 1:
        print(f"Duplicate function found: {func} ({len(matches)} times)")
        # Keep only the last definition
        for m in matches[:-1]:
            # find end of function
            s_idx = m.start()
            e_idx = js.find("\nfunction ", s_idx + 10)
            if e_idx == -1: e_idx = len(js)
            js = js[:s_idx] + js[e_idx:]

with open("app.js", "w", encoding="utf-8") as f:
    f.write(js)

nres = subprocess.run(["node", "--check", "app.js"], capture_output=True, text=True)
if nres.returncode == 0:
    print("SUCCESS: Node syntax check passed for app.js!")
else:
    print("Node syntax error:", nres.stderr)
