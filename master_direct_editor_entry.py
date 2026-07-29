import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"

# 1. Update index.html to point all buttons directly to editor.html
index_path = "index.html"
with open(index_path, "r", encoding="utf-8") as f:
    idx_html = f.read()

idx_html = idx_html.replace('href="login.html"', 'href="editor.html"')
idx_html = idx_html.replace('Giriş Yap / Editör', 'CV Editörünü Aç')
idx_html = idx_html.replace('data-i18n="nav-portal">Giriş Yap / Editör', 'data-i18n="nav-portal">CV Editörünü Aç')

with open(index_path, "w", encoding="utf-8") as f:
    f.write(idx_html)

print("SUCCESS: Updated index.html for direct editor entry!")

# 2. Update editor.html header buttons
editor_path = "editor.html"
with open(editor_path, "r", encoding="utf-8") as f:
    edt_html = f.read()

edt_html = edt_html.replace('btn-logout', 'btn-reset-data')
edt_html = edt_html.replace('onclick="handleLogout()"', 'onclick="resetData()"')
edt_html = edt_html.replace('title="Güvenli Çıkış Yap (KVKK)"', 'title="Varsayılan Şablona Sıfırla"')

with open(editor_path, "w", encoding="utf-8") as f:
    f.write(edt_html)

print("SUCCESS: Updated editor.html header buttons for instant access!")

# 3. Commit and Push to GitHub
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "UX Upgrade: Eliminate mandatory login friction, direct entry to editor.html across all navigation CTAs"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed direct editor access upgrade to GitHub!")
except Exception as ex:
    print(f"Git push error: {ex}")
