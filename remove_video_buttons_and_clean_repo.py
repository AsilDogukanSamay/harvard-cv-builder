import os
import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
html_path = os.path.join(cwd, "editor.html")

# 1. Remove video files if present
extra_files = ["linear_style_video.html", "showcase_video.html", "inspect_header_buttons.py"]
for fname in extra_files:
    fpath = os.path.join(cwd, fname)
    if os.path.exists(fpath):
        try:
            os.remove(fpath)
            print(f"SUCCESS: Removed {fname}")
        except Exception as e:
            print(f"Error removing {fname}: {e}")

# 2. Update editor.html
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Remove lines 111 to 116 (btn-video, btn-youtube, btn-linear, btn-showcase, btn-screen-studio, btn-tour)
buttons_to_remove = [
    '<button class="btn-guide btn-video"',
    '<button class="btn-guide btn-youtube"',
    '<a href="linear_style_video.html"',
    '<a href="showcase_video.html"',
    '<button class="btn-guide btn-screen-studio"',
    '<button class="btn-guide btn-tour"'
]

lines = html.split("\n")
new_lines = []
skip = False

for line in lines:
    if any(b in line for b in buttons_to_remove):
        continue
    new_lines.append(line)

html_cleaned = "\n".join(new_lines)

# Remove Modals (video-player-modal, youtube-showcase-modal, interactive-tour-modal)
modals_to_remove = ["id=\"video-player-modal\"", "id=\"youtube-showcase-modal\"", "id=\"interactive-tour-modal\""]

for modal_id in modals_to_remove:
    if modal_id in html_cleaned:
        s = html_cleaned.find(modal_id)
        # Find start of modal div
        s_div = html_cleaned.rfind('<div', 0, s)
        # Find closing div of modal
        e_div = html_cleaned.find('</div>\n    </div>', s)
        if e_div != -1:
            e_div += len('</div>\n    </div>')
        else:
            e_div = html_cleaned.find('</div>', s) + 6
        if s_div != -1 and e_div != -1:
            html_cleaned = html_cleaned[:s_div] + html_cleaned[e_div:]

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_cleaned)

print("SUCCESS: Cleaned video buttons and modals from editor.html!")

# 3. Commit and Push to GitHub
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Clean: Remove all video buttons and modals from editor toolbar for pristine minimalist UI"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean UI update to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
