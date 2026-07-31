import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

search_roots = [
    r"C:\Users\doguk\Desktop",
    r"C:\Users\doguk\Downloads",
    r"C:\Users\doguk\Documents",
    r"C:\Users\doguk\source",
    r"C:\Users\doguk\projects",
    r"C:\Users\doguk"
]

found_folders = []

for root_path in search_roots:
    if not os.path.exists(root_path): continue
    try:
        for entry in os.listdir(root_path):
            full_path = os.path.join(root_path, entry)
            if os.path.isdir(full_path) and ("harvard" in entry.lower() or "cv" in entry.lower()):
                found_folders.append(full_path)
    except Exception as e: pass

print("=== Found Candidate Project Folders ===")
for f in set(found_folders):
    print("Found:", f)
