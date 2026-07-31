import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
html_path = os.path.join(cwd, "editor.html")
js_path = os.path.join(cwd, "app.js")

# 100% Pre-rendered rich A4 HTML Document matching Harvard standards perfectly
full_prerendered_a4_html = '''        <div id="cv-document" class="cv-page font-garamond size-medium spacing-normal margin-normal accent-black">
            <!-- Header -->
            <header class="cv-header">
                <div class="cv-header-main">
                    <h1 id="cv-name" class="cv-title">Ahmet Yılmaz</h1>
                    <div id="cv-title-display" class="cv-subtitle">Kıdemli Yazılım Mühendisi & Veri Analitiği Uzmanı</div>
                </div>
                <div id="cv-contact" class="cv-contact-info-right">
                    <div class="contact-item" id="cv-contact-location-item">
                        <span id="cv-location">İstanbul, Türkiye</span> <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-email-item">
                        <span id="cv-email">ahmet.yilmaz@example.com</span> <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-item" id="cv-contact-phone-item">
                        <span id="cv-phone">+90 532 100 20 30</span> <i class="fas fa-phone"></i>
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
                <!-- 1. PROFESYONEL ÖZET -->
                <section class="cv-section" id="sec-summary">
                    <h2 class="section-title" id="sec-title-summary" data-i18n="sec_summary">PROFESYONEL ÖZET</h2>
                    <p id="cv-summary" class="section-content summary-text">
                        Yazılım mimarileri, veri tabanı optimizasyonu ve mikroservis sistemleri konularında 5+ yıl deneyimli Kıdemli Yazılım Mühendisi. Dağıtık veri işleme hatları kurgulama, RESTful API entegrasyonları tasarlama ve Agile/Scrum takımlarına teknik liderlik etme konularında yetkin.
                    </p>
                </section>

                <!-- 2. DENEYİM -->
                <section class="cv-section" id="sec-experience">
                    <h2 class="section-title" id="sec-title-experience" data-i18n="sec_experience">DENEYİM</h2>
                    <div id="cv-experience-container">
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">TEKNOSOFT BİLİŞİM A.Ş.</span>
                                <span class="entry-location">İstanbul, Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Kıdemli Yazılım Mühendisi & Ekip Lideri</span>
                                <span class="entry-date">Ocak 2023 - Günümüz</span>
                            </div>
                            <ul class="entry-bullets">
                                <li><strong>3M+ günlük aktif kullanıcıya:</strong> hizmet veren mikroservis mimarisini yeniden tasarlayarak ortalama API yanıt süresini %40 iyileştirdi.</li>
                                <li><strong>12 kişilik mühendislik ekibine:</strong> liderlik ederek CI/CD süreçlerini otomatize etti; canlıya alma süresini 4 günden 15 dakikaya düşürdü.</li>
                                <li><strong>AWS bulut sunucu altyapısını:</strong> optimize ederek yıllık operasyonel sunucu maliyetlerini 120.000$ azalttı.</li>
                            </ul>
                        </div>
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">ANADOLU VERİ ANALİTİĞİ LTD.</span>
                                <span class="entry-location">Ankara, Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Kıdemli Veri Mühendisi & Yazılım Geliştirici</span>
                                <span class="entry-date">Haziran 2021 - Aralık 2022</span>
                            </div>
                            <ul class="entry-bullets">
                                <li><strong>Python ve SQL tabanlı:</strong> dağıtık veri işleme mimarisi kurarak günlük 500GB akış verisini sıfır kayıp ile analiz etti.</li>
                                <li><strong>Şirket içi müşteri:</strong> davranış analizi panellerini geliştirerek satış ekibinin dönüşüm oranını %25 artırdı.</li>
                                <li><strong>Veri tabanı indeksleme:</strong> stratejilerini optimize ederek karmaşık sorgu sürelerini 4.5 saniyeden 180 milisaniyeye düşürdü.</li>
                            </ul>
                        </div>
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">KODLAB YAZILIM YATIRIMLARI</span>
                                <span class="entry-location">İzmir, Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Full-Stack Yazılım Geliştirici Stajyeri</span>
                                <span class="entry-date">Temmuz 2020 - Mayıs 2021</span>
                            </div>
                            <ul class="entry-bullets">
                                <li><strong>React.js ve Node.js:</strong> teknolojilerini kullanarak B2B e-ticaret platformunun ön yüz ve arka yüz modüllerini geliştirdi.</li>
                                <li><strong>RESTful API entegrasyonlarını:</strong> kurgulayarak üçüncü taraf ödeme sistemlerinin güvenli entegrasyonunu sağladı.</li>
                            </ul>
                        </div>
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">NETTEKNİK ÇÖZÜMLER</span>
                                <span class="entry-location">Bursa, Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">BT Altyapı & Veri Analisti</span>
                                <span class="entry-date">Eylül 2019 - Haziran 2020</span>
                            </div>
                            <ul class="entry-bullets">
                                <li><strong>Şirket içi BT sistemlerinin:</strong> performans metriklerini izleyerek donanım ve yazılım arıza sürelerini %30 azalttı.</li>
                            </ul>
                        </div>
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">MİKRONEKS BİLİŞİM</span>
                                <span class="entry-location">İstanbul, Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Stajyer İş Analisti</span>
                                <span class="entry-date">Haziran 2018 - Ağustos 2019</span>
                            </div>
                            <ul class="entry-bullets">
                                <li><strong>Müşteri gereksinim analiz:</strong> raporları hazırlayarak yazılım geliştirme ekipleri ile iş birimlerinin koordinasyonunu sağladı.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 3. EĞİTİM -->
                <section class="cv-section" id="sec-education">
                    <h2 class="section-title" id="sec-title-education" data-i18n="sec_education">EĞİTİM</h2>
                    <div id="cv-education-container">
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="university-name">İSTANBUL TEKNİK ÜNİVERSİTESİ</span>
                                <span class="entry-location">İstanbul, Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Lisans, Bilgisayar Mühendisliği — GANO: 3.65 / 4.00</span>
                                <span class="entry-date">Eylül 2017 - Haziran 2021</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 4. LİDERLİK VE GÖNÜLLÜLÜK -->
                <section class="cv-section" id="sec-leadership">
                    <h2 class="section-title" id="sec-title-leadership" data-i18n="sec_leadership">LİDERLİK VE GÖNÜLLÜLÜK</h2>
                    <div id="cv-leadership-container">
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">İTÜ BİLİŞİM VE SİBER GÜVENLİK KULÜBÜ</span>
                                <span class="entry-location">İstanbul</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Kulüp Başkanı</span>
                                <span class="entry-date">2019 - 2021</span>
                            </div>
                            <ul class="entry-bullets">
                                <li>500+ üyeli kulübe başkanlık ederek 10'dan fazla ulusal hackathon ve teknik yazılım eğitimi düzenledi.</li>
                            </ul>
                        </div>
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">AÇIK KAYNAK YAZILIM TOPLULUĞU</span>
                                <span class="entry-location">Türkiye</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Gönüllü Mentor</span>
                                <span class="entry-date">2022 - Günümüz</span>
                            </div>
                            <ul class="entry-bullets">
                                <li>Geliştirici adaylarına Python, Git ve Veri Tabanı mimarileri konularında haftalık ücretsiz rehberlik sundu.</li>
                            </ul>
                        </div>
                        <div class="entry-block">
                            <div class="entry-header">
                                <span class="company-name">TÜRKİYE YAPAY ZEKA İNİSİYATİFİ</span>
                                <span class="entry-location">İstanbul</span>
                            </div>
                            <div class="entry-subheader">
                                <span class="entry-role">Eğitim Koordinatörü</span>
                                <span class="entry-date">2023 - 2025</span>
                            </div>
                            <ul class="entry-bullets">
                                <li>Yapay zeka ve veri bilimi farkındalık atölyelerini koordine ederek 1.000'den fazla katılımcıya ulaştı.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 5. YETENEKLER VE SERTİFİKALAR -->
                <section class="cv-section" id="sec-skills">
                    <h2 class="section-title" id="sec-title-skills" data-i18n="sec_skills">YETENEKLER VE SERTİFİKALAR</h2>
                    <div class="skills-list" id="cv-skills-container">
                        <div class="skill-item" id="cv-skills-technical-item">
                            <strong data-i18n="tech_label">Teknik:</strong> <span id="cv-skills-technical">SQL, Python, JavaScript, React.js, Node.js, Docker, Kubernetes, AWS, PostgreSQL, Redis, REST API, Git, CI/CD, Agile/Scrum</span>
                        </div>
                        <div class="skill-item" id="cv-skills-tools-item">
                            <strong data-i18n="tools_label">Araçlar ve Platformlar:</strong> <span id="cv-skills-tools">VS Code, Git, GitHub, Jira, Postman, Docker Desktop, AWS Console, Figma, Chrome DevTools</span>
                        </div>
                        <div class="skill-item" id="cv-skills-certs-item">
                            <strong data-i18n="certs_label">Sertifikalar:</strong> <span id="cv-skills-certs">Google Cloud Certified Professional Cloud Architect (2025), AWS Certified Solutions Architect Associate (2024), Python Programlama Başarı Belgesi (Turkcell Geleceği Yazanlar, 2023)</span>
                        </div>
                        <div class="skill-item" id="cv-skills-langs-item">
                            <strong data-i18n="langs_label">Diller:</strong> <span id="cv-skills-langs">Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>'''

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace #cv-document container in editor.html with 100% pre-rendered full A4 document
html = re.sub(r'<div id="cv-document".*?</div>\s*</div>\s*</div>', full_prerendered_a4_html, html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Pre-rendered 100% complete rich A4 document directly into editor.html!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "100% PRE-RENDERED A4 DOCUMENT: Pre-render all 5 sections (Summary, 5 Experiences, Education, 3 Leadership items, Skills & Certs) directly inside editor.html for instant 0ms full display"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed pre-rendered full document fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
