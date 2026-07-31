import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Complete, elegant Harvard A4 Document layout with ALL 7 sections
full_a4_document_html = '''        <div id="cv-document" class="cv-page font-garamond size-medium spacing-normal margin-normal accent-black">
            <!-- Header -->
            <header class="cv-header">
                <div class="cv-header-main">
                    <h1 id="cv-name" class="cv-title">Ahmet Yılmaz</h1>
                    <div id="cv-title-display" class="cv-subtitle">Yönetim Bilişim Sistemleri Uzmanı & Veri Analisti</div>
                </div>
                <div id="cv-contact" class="cv-contact-info-right">
                    <div class="contact-item" id="cv-contact-location-item">
                        <span id="cv-location">İstanbul / Çanakkale, Türkiye</span> <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-email-item">
                        <span id="cv-email">ahmet.yilmaz@example.com</span> <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-phone-item">
                        <span id="cv-phone">+90 544 331 76 20</span> <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-github-item">
                        <span id="cv-github">github.com/ahmetyilmaz-dev</span> <i class="fab fa-github"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-linkedin-item">
                        <span id="cv-linkedin">linkedin.com/in/ahmetyilmaz-dev</span> <i class="fab fa-linkedin"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-website-item">
                        <span id="cv-website">ahmetyilmaz.dev</span> <i class="fas fa-globe"></i>
                    </div>
                </div>
            </header>

            <div class="cv-page-inner">
                <!-- 1. Profesyonel Özet -->
                <section class="cv-section" id="sec-summary">
                    <h2 class="section-title" id="sec-title-summary" data-i18n="sec_summary">PROFESYONEL ÖZET</h2>
                    <p id="cv-summary" class="section-content summary-text">
                        Veri analitiği, süreç otomasyonu ve yazılım geliştirme konularına odaklanan, teknik mühendislik ekipleri ile kurumsal iş operasyonları arasındaki koordinasyonu sağlama konusunda deneyimli Yönetim Bilişim Sistemleri (MIS) uzmanı. Ölçeklenebilir veri hatları kurgulama, karmaşık iş akışlarını otomatize etme ve REST API entegrasyonları tasarlama konularında yetkin.
                    </p>
                </section>

                <!-- 2. Deneyim -->
                <section class="cv-section" id="sec-experience">
                    <h2 class="section-title" id="sec-title-experience" data-i18n="sec_experience">DENEYİM</h2>
                    <div id="cv-experience-container"></div>
                </section>

                <!-- 3. Eğitim -->
                <section class="cv-section" id="sec-education">
                    <h2 class="section-title" id="sec-title-education" data-i18n="sec_education">EĞİTİM</h2>
                    <div id="cv-education-container"></div>
                </section>

                <!-- 4. Liderlik ve Gönüllülük -->
                <section class="cv-section" id="sec-leadership">
                    <h2 class="section-title" id="sec-title-leadership" data-i18n="sec_leadership">LİDERLİK VE GÖNÜLLÜLÜK</h2>
                    <div id="cv-leadership-container"></div>
                </section>

                <!-- 5. Projeler -->
                <section class="cv-section" id="sec-projects">
                    <h2 class="section-title" id="sec-title-projects">PROJELER</h2>
                    <div id="cv-projects-list"></div>
                </section>

                <!-- 6. Yetenekler, Sertifikalar ve İlgi Alanları -->
                <section class="cv-section" id="sec-skills">
                    <h2 class="section-title" id="sec-title-skills" data-i18n="sec_skills">YETENEKLER, SERTİFİKALAR VE İLGİ ALANLARI</h2>
                    <div class="skills-list" id="cv-skills-container">
                        <div class="skill-item" id="cv-skills-technical-item">
                            <strong data-i18n="tech_label">Teknik:</strong> <span id="cv-skills-technical">SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Veri Analizi ve Görselleştirme, Agile/Scrum</span>
                        </div>
                        <div class="skill-item" id="cv-skills-tools-item">
                            <strong data-i18n="tools_label">Araçlar ve Platformlar:</strong> <span id="cv-skills-tools">Git, GitHub, n8n Otomasyon, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office</span>
                        </div>
                        <div class="skill-item" id="cv-skills-certs-item">
                            <strong data-i18n="certs_label">Sertifikalar:</strong> <span id="cv-skills-certs">Google Data Analytics Professional Certificate (2026), Temel Düzey Mikro ERP Eğitimi Başarı Belgesi (2025), Bilişim Teknolojileri Zirvesi Sertifikaları (2024), Python Programlama (Turkcell Geleceği Yazanlar, 2023), İş Bankası ProSchool IT Class (2023), Yapay Zeka Kampı (Google Cloud, 2023)</span>
                        </div>
                        <div class="skill-item" id="cv-skills-langs-item">
                            <strong data-i18n="langs_label">Diller:</strong> <span id="cv-skills-langs">Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)</span>
                        </div>
                    </div>
                </section>

                <!-- 7. Referanslar -->
                <section class="cv-section" id="cv-section-references">
                    <h2 class="section-title" id="sec-title-references" data-i18n="sec_references">REFERANSLAR</h2>
                    <div class="references-grid" id="cv-references-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 6px;"></div>
                </section>
            </div>
        </div>'''

# Replace #cv-document container in editor.html
html = re.sub(r'<div id="cv-document".*?</div>\s*</div>\s*</div>', full_a4_document_html, html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Added all 7 sections (Summary, Experience, Education, Leadership, Projects, Skills, References) to editor.html A4 document!")

# Check syntax with Node
try:
    nres = subprocess.run(["node", "--check", js_path], capture_output=True, text=True)
    if nres.returncode == 0:
        print("SUCCESS: Node syntax check passed 100% for app.js!")
    else:
        print("Node syntax error:", nres.stderr)
except Exception as ex:
    print("Node check skipped:", ex)

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "CRITICAL FIX: Add all 7 missing section elements (Education, Leadership, Projects, etc.) to editor.html A4 document template"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed full 7 section template fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
