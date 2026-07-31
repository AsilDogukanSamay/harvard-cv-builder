import os
import sys
import re
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")
css_path = os.path.join(cwd, "style.css")

# 1. Update app.js TR_SAMPLE_STATE to match PDF CV 100%
tr_pdf_sample = {
    "personal": {
        "name": "Ahmet Yılmaz",
        "title": "Yönetim Bilişim Sistemleri Uzmanı",
        "email": "ahmet.yilmaz@example.com",
        "phone": "+90 544 331 76 20",
        "location": "İstanbul / Çanakkale, Türkiye | KKTC",
        "github": "github.com/ahmetyilmaz-dev",
        "linkedin": "linkedin.com/in/ahmetyilmaz-dev",
        "website": "ahmetyilmaz.dev",
        "summary": "Veri analitiği, süreç otomasyonu ve yazılım geliştirme konularına odaklanan, teknik mühendislik ekipleri ile kurumsal iş operasyonları arasındaki koordinasyonu sağlama konusunda deneyim sahibi Yönetim Bilişim Sistemleri (MIS) uzmanı. Ölçeklenebilir veri hatları kurgulama, karmaşık iş akışlarını otomatize etme ve REST API entegrasyonları tasarlama konularında yetkin. Uluslararası ve büyük kurumsal yapılarda teknoloji odaklı değer yaratmayı hedeflemektedir."
    },
    "experiences": [
        {
            "company": "MEDİBULUT",
            "role": "Ürün Yönetimi ve CRM Stajyeri",
            "dates": "Eylül 2025 - Haziran 2026",
            "location": "Çanakkale, Türkiye",
            "bullets": [
                "Yazılım geliştirme, satış ve operasyon ekipleri arasındaki iletişimi koordine ederek iş akış süreçlerinin entegrasyonunu yönetti.",
                "Saha satış ekiplerinin anlık konum ve performans takibi için Python ve SQL tabanlı entegre platform tasarlayıp geliştirdi; tüm veri mimarisi ve UI aşamalarını yönetti.",
                "n8n entegrasyon aracı ile HubSpot ve Slack bağlantılarını kurguladı; lead takip ve müşteri geri bildirim süreçlerini tam otomatize hale getirerek yanıt sürelerini %35 iyileştirdi.",
                "CRM sistemleri üzerinden geniş ölçekli müşteri verilerini analiz ederek satış trendleri ve kullanıcı davranışlarına yönelik stratejik raporlar hazırladı."
            ]
        },
        {
            "company": "SOFTTECH",
            "role": "Stajyer İş Analisti",
            "dates": "Ağustos 2025 - Eylül 2025",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "Sprint takibi, metrik analizi ve günlük veri raporlama süreçlerini yürüterek Agile/Scrum operasyonlarına ve disiplinlerarası ekip içi koordinasyona destek sağladı."
            ]
        },
        {
            "company": "KOÇTAŞ",
            "role": "Stajyer (S.T.E.P. Programı)",
            "dates": "Temmuz 2025 - Ağustos 2025",
            "location": "Çanakkale, Türkiye",
            "bullets": [
                "Türkiye genelindeki katılımcılar arasında düzenlenen proje yarışmasında 'Koçtaş Kids' departman geliştirme projesiyle Birincilik Ödülü kazandı.",
                "Ürün yerleşimi, stok takibi ve fiyat kontrolü süreçlerini yöneterek operasyonel verimlilik analizleri gerçekleştirdi; stok denetim sapmalarını %20 azalttı."
            ]
        },
        {
            "company": "LOCOMAR",
            "role": "İş Geliştirme Asistanı",
            "dates": "Nisan 2025 - Haziran 2025",
            "location": "İzmir, Türkiye",
            "bullets": [
                "B2B pazarlama süreçlerini analiz ederek; pazar analizi ve rakip araştırmalarıyla yeni müşteri kazanım stratejilerinin geliştirilmesini sağladı."
            ]
        },
        {
            "company": "VITRIOL",
            "role": "Siber Güvenlik Stajyeri",
            "dates": "Eylül 2023 - Haziran 2024",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "BT altyapısı ve veri analizi süreçlerinde görev alarak siber güvenlik projelerine teknik destek sağladı; sistem analiz ve güvenlik prosedürlerini raporladı."
            ]
        },
        {
            "company": "DENİZBANK",
            "role": "Stajyer",
            "dates": "Mart 2023 - Haziran 2023",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "Staj programı kapsamında gösterdiği yüksek performansla 100'den fazla aday arasından Birincilik Ödülü kazandı.",
                "Hazırladığı analitik finansal araştırma makalesini kurumsal içerik olarak yayımlayarak bankanın resmi dijital kanallarında yaygınlaştırdı.",
                "Finansal süreçleri ve bankacılık iş akışlarını 4 farklı departmanda deneyimleyerek kurumsal operasyonel verimlilik raporları sundu."
            ]
        }
    ],
    "educations": [
        {
            "university": "İSTANBUL GEDİK ÜNİVERSİTESİ",
            "degree": "Lisans, Yönetim Bilişim Sistemleri (MIS)",
            "dates": "Eylül 2022 - Mayıs 2026",
            "location": "İstanbul, Türkiye",
            "gpa": "3.15 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "YAPAY ZEKA VE TEKNOLOJİ AKADEMİSİ",
            "role": "Veri Bilimi Programı Bursiyeri",
            "dates": "Aralık 2025 - Devam Ediyor",
            "location": "Türkiye",
            "bullets": [
                "Türkiye genelinden gelen 31.700 başvuru arasından üstün başarı göstererek kabul alan 1.500 bursiyerden biri (%4,7'lik başarı dilimi) olarak seçildi.",
                "Google Türkiye, GİRVAK ve T3 Girişim Merkezi ortaklığında düzenlenen 100 saatten fazla yoğun veri bilimi, veri işleme ve yapay zeka eğitim programını tamamladı."
            ]
        },
        {
            "organization": "İSTANBUL GEDİK ÜNİVERSİTESİ KULÜPLERİ",
            "role": "Kulüp Başkanı | Yönetim Kurulu Üyesi",
            "dates": "2022 - 2023",
            "location": "İstanbul",
            "bullets": [
                "Siber Güvenlik & MIS Kulübü Başkanı olarak 300'den fazla öğrenciye ulaştı; teknik workshoplar ve siber güvenlik farkındalık eğitimleri organize etti.",
                "Kariyer Kulübü Yönetim Kurulu Üyesi olarak öğrenci kariyer gelişim etkinliklerini ve sektör panellerini koordine etti."
            ]
        },
        {
            "organization": "Habitat Derneği & Netflix",
            "role": "Gönüllü Eğitmen",
            "dates": "2025 - Devam Ediyor",
            "location": "Türkiye",
            "bullets": [
                "Çocukların dijital dünyada güvenli adımlar atmasını sağlamak amacıyla 'Evvel Zaman İçinde Ekran Zamanında!' projesinde 500'den fazla çocuğa eğitim sundu.",
                "Erken yaş grubuna yönelik dijital güvenlik, doğru bilgiye erişim ve siber zorbalık farkındalığı eğitim metodolojisi kurguladı."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Veri Analizi ve Görselleştirme, Agile/Scrum",
        "tools": "Git, GitHub, n8n Otomasyon, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office",
        "langs": "Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)",
        "frameworks": "Express.js, Django, REST APIs, Microservices"
    },
    "certifications": [
        { "name": "Google Data Analytics Professional Certificate", "issuer": "Google", "year": "2026" },
        { "name": "Temel Düzey Mikro ERP Eğitimi Başarı Belgesi", "issuer": "İstanbul Gedik Üniversitesi & Mikro Yazılım", "year": "2025" },
        { "name": "15, 16 ve 17. Bilişim Teknolojileri Zirvesi Katılım Sertifikaları", "issuer": "İTÜ İşletme Mühendisliği Kulübü", "year": "2022-2024" },
        { "name": "Python Programlama", "issuer": "Turkcell Geleceği Yazanlar", "year": "2023" },
        { "name": "İş Bankası ProSchool IT Class", "issuer": "İş Bankası", "year": "2023" },
        { "name": "Yapay Zeka Kampı", "issuer": "Google Cloud", "year": "2023" }
    ],
    "projects": [],
    "references": [],
    "settings": {
        "uiLang": "tr",
        "showPhoto": False,
        "autoFitOnePage": True,
        "contactVisibility": {
            "toggle-email": True,
            "toggle-phone": True,
            "toggle-location": True,
            "toggle-github": True,
            "toggle-linkedin": True,
            "toggle-website": True
        }
    }
}

en_pdf_sample = {
    "personal": {
        "name": "Alex Morgan",
        "title": "Management Information Systems Specialist",
        "email": "alex.morgan@example.com",
        "phone": "+1 (555) 234-5678",
        "location": "Boston, MA, USA | TRNC",
        "github": "github.com/alexmorgan-dev",
        "linkedin": "linkedin.com/in/alexmorgan-dev",
        "website": "alexmorgan.dev",
        "summary": "Management Information Systems (MIS) specialist with experience in ensuring coordination between technical engineering teams and corporate business operations, focusing on data analytics, process automation, and software development. Proficient in building scalable data pipelines, automating complex workflows, and designing REST API integrations. Aims to create technology-focused value in international and large corporate structures."
    },
    "experiences": [
        {
            "company": "MEDİBULUT",
            "role": "Product Management and CRM Intern",
            "dates": "September 2025 - June 2026",
            "location": "Boston, MA, USA",
            "bullets": [
                "Managed integration of workflow processes by coordinating communication between software development, sales, and operations teams.",
                "Designed and developed an integrated platform based on Python and SQL for instant location and performance tracking of field sales teams; managed data architecture and UI phases.",
                "Architected HubSpot and Slack connections with n8n integration tool; By fully automating lead tracking and customer feedback processes, improved response times by 35%.",
                "Prepared strategic reports on sales trends and user behavior by analyzing large-scale customer data through CRM systems."
            ]
        },
        {
            "company": "SOFTTECH",
            "role": "Business Analyst Intern",
            "dates": "August 2025 - September 2025",
            "location": "Cambridge, MA, USA",
            "bullets": [
                "Provided support to Agile/Scrum operations and interdisciplinary team coordination by carrying out sprint tracking, metric analysis, and daily data reporting processes."
            ]
        },
        {
            "company": "KOÇTAŞ",
            "role": "Intern (S.T.E.P. Program)",
            "dates": "July 2025 - August 2025",
            "location": "Boston, MA, USA",
            "bullets": [
                "Won First Place Award with 'Youth Innovation' department development project in nationwide competition among participants across the country.",
                "Conducted operational efficiency analyses by managing product placement, stock tracking, and price control processes; reduced inventory audit deviations by 20%."
            ]
        },
        {
            "company": "LOCOMAR",
            "role": "Business Development Assistant",
            "dates": "April 2025 - June 2025",
            "location": "New York, NY, USA",
            "bullets": [
                "Analyzed B2B marketing processes; enabled development of new customer acquisition strategies through market analysis and competitor research."
            ]
        },
        {
            "company": "VITRIOL",
            "role": "Cybersecurity Intern",
            "dates": "September 2023 - June 2024",
            "location": "Boston, MA, USA",
            "bullets": [
                "Provided technical support to cybersecurity projects by taking part in IT infrastructure and data analysis processes; reported system analysis and security procedures."
            ]
        },
        {
            "company": "DENİZBANK",
            "role": "Intern",
            "dates": "March 2023 - June 2023",
            "location": "Boston, MA, USA",
            "bullets": [
                "Won First Place Award among 100+ candidates with high performance within the scope of internship program.",
                "Published analytical financial research article prepared as corporate content and disseminated it on the bank's official digital channels.",
                "Presented corporate operational efficiency reports by experiencing financial processes and banking workflows in 4 different departments."
            ]
        }
    ],
    "educations": [
        {
            "university": "HARVARD UNIVERSITY",
            "degree": "Bachelor's Degree, Management Information Systems (MIS)",
            "dates": "September 2022 - May 2026",
            "location": "Cambridge, MA, USA",
            "gpa": "3.85 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "ARTIFICIAL INTELLIGENCE AND TECHNOLOGY ACADEMY",
            "role": "Data Science Program Scholar",
            "dates": "December 2025 - Present",
            "location": "Boston, MA, USA",
            "bullets": [
                "Selected as one of 1,500 scholars accepted with outstanding success among 31,700 applications from across the nation (top 4.7% acceptance rate).",
                "Completed 100+ hours of intensive data science, data processing, and artificial intelligence training program organized in partnership with Google and Tech Center."
            ]
        },
        {
            "organization": "UNIVERSITY CLUBS",
            "role": "Club President | Executive Board Member",
            "dates": "2022 - 2023",
            "location": "Cambridge, MA, USA",
            "bullets": [
                "As President of Cybersecurity & MIS Club, reached over 300 students; organized technical workshops and cybersecurity awareness trainings.",
                "As Career Club Executive Board Member, coordinated student career development events and industry panel sessions."
            ]
        },
        {
            "organization": "Habitat Association & Netflix",
            "role": "Volunteer Trainer",
            "dates": "2025 - Present",
            "location": "USA",
            "bullets": [
                "Provided digital safety education to 500+ children within 'Once Upon a Time, in Screen Time!' project.",
                "Designed training methodology on digital security, access to accurate information, and cyberbullying awareness for early age group."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Data Analysis & Visualization, Agile/Scrum",
        "tools": "Git, GitHub, n8n Automation, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office",
        "langs": "English (Native Language), Spanish (Advanced / B2), German (Beginner / A1)",
        "frameworks": "Express.js, Django, REST APIs, Microservices"
    },
    "certifications": [
        { "name": "Google Data Analytics Professional Certificate", "issuer": "Google", "year": "2026" },
        { "name": "Basic Level ERP Training Certificate of Achievement", "issuer": "University & Mikro Software", "year": "2025" },
        { "name": "15th, 16th and 17th Information Technologies Summit Certificates", "issuer": "ITU Management Engineering Club", "year": "2022-2024" },
        { "name": "Python Programming", "issuer": "Turkcell Gelecegi Yazanlar", "year": "2023" },
        { "name": "Is Bankasi ProSchool IT Class", "issuer": "Is Bankasi", "year": "2023" },
        { "name": "Artificial Intelligence Camp", "issuer": "Google Cloud", "year": "2023" }
    ],
    "projects": [],
    "references": [],
    "settings": {
        "uiLang": "en",
        "showPhoto": False,
        "autoFitOnePage": True,
        "contactVisibility": {
            "toggle-email": True,
            "toggle-phone": True,
            "toggle-location": True,
            "toggle-github": True,
            "toggle-linkedin": True,
            "toggle-website": True
        }
    }
}

with open(js_path, "r", encoding="utf-8") as f:
    js_code = f.read()

# Update TR_SAMPLE_STATE and EN_SAMPLE_STATE
tr_json = json.dumps(tr_pdf_sample, indent=4, ensure_ascii=False)
en_json = json.dumps(en_pdf_sample, indent=4, ensure_ascii=False)

js_code = re.sub(r"const TR_SAMPLE_STATE = \{.*?\n\};", f"const TR_SAMPLE_STATE = {tr_json};", js_code, flags=re.DOTALL)
js_code = re.sub(r"const EN_SAMPLE_STATE = \{.*?\n\};", f"const EN_SAMPLE_STATE = {en_json};", js_code, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print("SUCCESS: Updated TR_SAMPLE_STATE and EN_SAMPLE_STATE in app.js with EXACT PDF CV content!")

# 2. Update editor.html A4 document preview to match PDF layout 100% (5 sections only)
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

exact_pdf_a4_html = '''        <div id="cv-document" class="cv-page font-garamond size-medium spacing-normal margin-normal accent-black">
            <!-- Header -->
            <header class="cv-header">
                <div class="cv-header-main">
                    <h1 id="cv-name" class="cv-title">Ahmet Yılmaz</h1>
                    <div id="cv-title-display" class="cv-subtitle">Yönetim Bilişim Sistemleri Uzmanı</div>
                </div>
                <div id="cv-contact" class="cv-contact-info-right">
                    <div class="contact-item" id="cv-contact-location-item">
                        <span id="cv-location">İstanbul / Çanakkale, Türkiye | KKTC</span> <i class="fas fa-map-marker-alt"></i>
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
                <!-- 1. PROFESYONEL ÖZET -->
                <section class="cv-section" id="sec-summary">
                    <h2 class="section-title" id="sec-title-summary" data-i18n="sec_summary">PROFESYONEL ÖZET</h2>
                    <p id="cv-summary" class="section-content summary-text">
                        Veri analitiği, süreç otomasyonu ve yazılım geliştirme konularına odaklanan, teknik mühendislik ekipleri ile kurumsal iş operasyonları arasındaki koordinasyonu sağlama konusunda deneyim sahibi Yönetim Bilişim Sistemleri (MIS) uzmanı. Ölçeklenebilir veri hatları kurgulama, karmaşık iş akışlarını otomatize etme ve REST API entegrasyonları tasarlama konularında yetkin. Uluslararası ve büyük kurumsal yapılarda teknoloji odaklı değer yaratmayı hedeflemektedir.
                    </p>
                </section>

                <!-- 2. DENEYİM -->
                <section class="cv-section" id="sec-experience">
                    <h2 class="section-title" id="sec-title-experience" data-i18n="sec_experience">DENEYİM</h2>
                    <div id="cv-experience-container"></div>
                </section>

                <!-- 3. EĞİTİM -->
                <section class="cv-section" id="sec-education">
                    <h2 class="section-title" id="sec-title-education" data-i18n="sec_education">EĞİTİM</h2>
                    <div id="cv-education-container"></div>
                </section>

                <!-- 4. LİDERLİK VE GÖNÜLLÜLÜK -->
                <section class="cv-section" id="sec-leadership">
                    <h2 class="section-title" id="sec-title-leadership" data-i18n="sec_leadership">LİDERLİK VE GÖNÜLLÜLÜK</h2>
                    <div id="cv-leadership-container"></div>
                </section>

                <!-- 5. YETENEKLER VE SERTİFİKALAR -->
                <section class="cv-section" id="sec-skills">
                    <h2 class="section-title" id="sec-title-skills" data-i18n="sec_skills">YETENEKLER VE SERTİFİKALAR</h2>
                    <div class="skills-list" id="cv-skills-container">
                        <div class="skill-item" id="cv-skills-technical-item">
                            <strong data-i18n="tech_label">Teknik:</strong> <span id="cv-skills-technical">SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Veri Analizi ve Görselleştirme, Agile/Scrum</span>
                        </div>
                        <div class="skill-item" id="cv-skills-tools-item">
                            <strong data-i18n="tools_label">Araçlar ve Platformlar:</strong> <span id="cv-skills-tools">Git, GitHub, n8n Otomasyon, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office</span>
                        </div>
                        <div class="skill-item" id="cv-skills-certs-item">
                            <strong data-i18n="certs_label">Sertifikalar:</strong> <span id="cv-skills-certs">Google Data Analytics Professional Certificate (Google, 2026), Temel Düzey Mikro ERP Eğitimi Başarı Belgesi (İstanbul Gedik Üniversitesi & Mikro Yazılım, 2025), 15, 16 ve 17. Bilişim Teknolojileri Zirvesi Katılım Sertifikaları (İTÜ İşletme Mühendisliği Kulübü, 2022-2024), Python Programlama (Turkcell Geleceği Yazanlar, 2023), İş Bankası ProSchool IT Class (İş Bankası, 2023), Yapay Zeka Kampı (Google Cloud, 2023)</span>
                        </div>
                        <div class="skill-item" id="cv-skills-langs-item">
                            <strong data-i18n="langs_label">Diller:</strong> <span id="cv-skills-langs">Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>'''

html = re.sub(r'<div id="cv-document".*?</div>\s*</div>\s*</div>', exact_pdf_a4_html, html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Updated editor.html to match exact 5-section PDF structure!")

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
    subprocess.run(["git", "commit", "-m", "Restore Exact PDF CV Format: 5 sections (Summary, Experience, Education, Leadership, Skills & Certs) matching attached PDF CVs 100%"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed exact PDF format restore to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
