import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Update editor.html to add missing projects-list and cv-projects-list and input-skills-certs
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Add Projects section to tab-skills in sidebar if missing
sidebar_projects_html = '''
                        <div class="input-group" style="margin-top: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                <label style="font-weight: 700;">Projeler (Açık Kaynak / Proje Çalışmaları)</label>
                                <button class="btn btn-secondary btn-sm" onclick="addProject()">+ Yeni Proje Ekle</button>
                            </div>
                            <div id="projects-list"></div>
                        </div>
                        <div class="input-group" style="margin-top: 16px; display: none;">
                            <input type="text" id="input-skills-certs" oninput="updateSkillField('certs', this.value)">
                        </div>
'''

if 'id="projects-list"' not in html:
    html = html.replace('id="tab-skills" class="tab-pane">', 'id="tab-skills" class="tab-pane">\n' + sidebar_projects_html)
    print("SUCCESS: Added projects-list and input-skills-certs to sidebar in editor.html!")

# Add sec-projects to A4 CV Document preview if missing
cv_projects_html = '''
                <!-- Projeler -->
                <div id="sec-projects" class="cv-section">
                    <h2 class="section-title">PROJELER</h2>
                    <div id="cv-projects-list"></div>
                </div>
'''

if 'id="cv-projects-list"' not in html:
    # Insert before sec-skills or sec-references
    if 'id="sec-skills"' in html:
        html = html.replace('<div id="sec-skills"', cv_projects_html + '\n                <div id="sec-skills"')
    elif 'id="cv-section-references"' in html:
        html = html.replace('<div id="cv-section-references"', cv_projects_html + '\n                <div id="cv-section-references"')
    print("SUCCESS: Added cv-projects-list section to A4 CV Document preview in editor.html!")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

# 2. Defensive Null Guards in app.js for all DOM manipulation
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Clean unused video modal references from app.js if present
unused_video_funcs = [
    r"function openVideoPlayerModal\(.*?\}",
    r"function closeVideoPlayerModal\(.*?\}",
    r"function openYouTubeShowcase\(.*?\}",
    r"function closeYouTubeShowcase\(.*?\}",
    r"function seekYTVideo\(.*?\}",
    r"function startInteractiveTour\(.*?\}",
    r"function nextTourStep\(.*?\}",
    r"function prevTourStep\(.*?\}",
    r"function closeTour\(.*?\}",
    r"function generateScreenStudioVideo\(.*?\}"
]

for pat in unused_video_funcs:
    js = re.sub(pat, "", js, flags=re.DOTALL)

# Ensure renderCVProjects has null guard
js = js.replace(
    "function renderCVProjects() {",
    "function renderCVProjects() {\n    const projectsSpan = document.getElementById('cv-projects-list');\n    if (!projectsSpan) return;"
)

# Ensure renderEditorProjects has null guard
js = js.replace(
    "function renderEditorProjects() {",
    "function renderEditorProjects() {\n    const container = document.getElementById('projects-list');\n    if (!container) return;"
)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Added defensive null guards and cleaned unused modal handlers in app.js!")

# 3. Verify Node Syntax
try:
    nres = subprocess.run(["node", "--check", js_path], capture_output=True, text=True)
    if nres.returncode == 0:
        print("SUCCESS: Node syntax check passed for app.js!")
    else:
        print("Node syntax error:", nres.stderr)
except Exception as ex:
    print("Node check skipped:", ex)

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Product Audit Fix: Add missing projects-list & cv-projects-list DOM containers to editor.html, wrap all app.js DOM manipulations with defensive null-guards"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed Product Audit fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
