import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    js = f.read()

with open("editor.html", "r", encoding="utf-8") as f:
    html = f.read()

# Extract all document.getElementById('XYZ') from app.js
get_element_ids = set(re.findall(r"document\.getElementById\(['\"]([^'\"]+)['\"]\)", js))

# Extract all id="XYZ" from editor.html
html_ids = set(re.findall(r'id=["\']([^"\']+)["\']', html))

missing_ids = get_element_ids - html_ids

print("=== DOM ID MATCH AUDIT ===")
print(f"Total IDs checked in app.js: {len(get_element_ids)}")
print(f"Total IDs present in editor.html: {len(html_ids)}")

if missing_ids:
    print(f"\nCRITICAL WARNING: Found {len(missing_ids)} missing DOM IDs referenced in app.js but missing in editor.html:")
    for mid in sorted(missing_ids):
        print(f"  ❌ Missing ID: {mid}")
else:
    print("\nSUCCESS: All DOM IDs referenced in app.js exist in editor.html!")
