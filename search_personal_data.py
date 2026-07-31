import os
import re

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

terms = ["asil", "dogukan", "samay", "dogukan__sam_ay", "544 331"]

for root, dirs, files in os.walk(cwd):
    if ".git" in root or "node_modules" in root: continue
    for file in files:
        if file.endswith((".html", ".js", ".css", ".json", ".md")):
            fpath = os.path.join(root, file)
            with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
            
            for line_no, line in enumerate(content.split("\n"), 1):
                for term in terms:
                    if term in line.lower():
                        rel_path = os.path.relpath(fpath, cwd)
                        print(f"[{rel_path}:{line_no}] Match for '{term}': {line.strip()[:100]}")
