import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
css_path = os.path.join(cwd, "style.css")
js_path = os.path.join(cwd, "app.js")

with open(css_path, "r", encoding="utf-8") as f:
    css = f.read()

# Add CSS rules for smooth preview scrolling and compact Harvard single-page fitting
css_additions = '''

/* -------------------------------------------------------------
 * MASTER PREVIEW SCROLLING & HARVARD COMPACT SINGLE-PAGE FIT
 * ------------------------------------------------------------- */

.preview-panel, .preview-wrapper, .document-container {
    overflow-y: auto !important;
    max-height: calc(100vh - 60px) !important;
    padding-bottom: 60px !important;
}

.cv-page {
    height: auto !important;
    min-height: 297mm !important;
    overflow: visible !important;
}

.cv-page-inner {
    height: auto !important;
    overflow: visible !important;
}

.cv-section {
    margin-bottom: 8px !important;
}

.section-title {
    margin-bottom: 4px !important;
    font-size: 11pt !important;
}

.cv-item {
    margin-bottom: 6px !important;
}

.cv-bullets {
    margin-top: 2px !important;
    margin-bottom: 2px !important;
    padding-left: 14px !important;
}

.cv-bullets li {
    margin-bottom: 1.5px !important;
    font-size: 9pt !important;
    line-height: 1.18 !important;
}

@media print {
    .cv-page {
        height: 297mm !important;
        overflow: hidden !important;
    }
    .cv-page-inner {
        height: 100% !important;
        overflow: hidden !important;
    }
}
'''

if "MASTER PREVIEW SCROLLING" not in css:
    css += "\n\n" + css_additions

with open(css_path, "w", encoding="utf-8") as f:
    f.write(css)

print("SUCCESS: Added smooth preview scrolling and compact Harvard fitting CSS to style.css!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Master Preview Fix: Allow smooth vertical scrolling on preview panel and apply compact Harvard single-page layout CSS so all 7 sections fit and display 100%"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed Master Preview fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
