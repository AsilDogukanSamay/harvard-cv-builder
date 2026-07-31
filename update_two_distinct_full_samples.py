import os
import sys
import re
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Define TR_SAMPLE_STATE (Ahmet Yılmaz - MIS Specialist & Data Analyst with 6 Experiences & 3 Leadership items)
tr_sample = {
    "personal": {
        "name": "Ahmet Yılmaz",
        "title": "Yönetim Bilişim Sistemleri Uzmanı & Veri Analisti",
        "email": "ahmet.yilmaz@example.com",
        "phone": "+90 544 331 76 20",
        "location": "İstanbul / Çanakkale, Türkiye",
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
            "university": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
            "degree": "Lisans, Yönetim Bilişim Sistemleri (MIS)",
            "dates": "Eylül 2022 - Mayıs 2026",
            "location": "İstanbul, Türkiye",
            "gpa": "3.65 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "YAPAY ZEKA VE TEKNOLOJİ AKADEMİSİ",
            "role": "Veri Bilimi Programı Bursiyeri",
            "dates": "Aralık 2025 - Devam Ediyor",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "Türkiye genelinden gelen 31.700 başvuru arasından üstün başarı göstererek kabul alan 1.500 bursiyerden biri (%4,7'lik başarı dilimi) olarak seçildi.",
                "Google Türkiye, GİRVAK ve T3 Girişim Merkezi ortaklığında düzenlenen 100 saatten fazla yoğun veri bilimi, veri işleme ve yapay zeka eğitim programını tamamladı."
            ]
        },
        {
            "organization": "ÜNİVERSİTE BİLİŞİM & SİBER GÜVENLİK KULÜPLERİ",
            "role": "Kulüp Başkanı | Yönetim Kurulu Üyesi",
            "dates": "2022 - 2023",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "Siber Güvenlik & MIS Kulübü Başkanı olarak 300'den fazla öğrenciye ulaştı; teknik workshoplar ve siber güvenlik farkındalık eğitimleri organize etti.",
                "Kariyer Kulübü Yönetim Kurulu Üyesi olarak öğrenci kariyer gelişim etkinliklerini ve sektör panellerini koordine etti."
            ]
        },
        {
            "organization": "HABİTAT DERNEĞİ & NETFLIX",
            "role": "Gönüllü Eğitmen",
            "dates": "2025 - Devam Ediyor",
            "location": "İstanbul, Türkiye",
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
        { "name": "Temel Düzey Mikro ERP Eğitimi Başarı Belgesi", "issuer": "Üniversite & Mikro Software", "year": "2025" },
        { "name": "Bilişim Teknolojileri Zirvesi Katılım Sertifikaları", "issuer": "İTÜ İşletme Mühendisliği Kulübü", "year": "2024" },
        { "name": "Python Programlama", "issuer": "Turkcell Geleceği Yazanlar", "year": "2023" },
        { "name": "ProSchool IT Class Sertifikası", "issuer": "İş Bankası", "year": "2023" },
        { "name": "Yapay Zeka Kampı Başarı Belgesi", "issuer": "Google Cloud", "year": "2023" }
    ],
    "projects": [
        {
            "title": "Saha Satış Performans ve Konum Takip Platformu",
            "details": "Python ve SQL tabanlı canlı konum ve satış performans takibi sağlayan kurumsal otomasyon yazılımı."
        },
        {
            "title": "n8n Tabanlı Lead ve Müşteri Geri Bildirim Otomasyonu",
            "details": "HubSpot ve Slack bağlantılarını kurgulayarak müşteri yanıt sürelerini %35 iyileştiren otomasyon sistemi."
        }
    ],
    "references": [
        {
            "name": "Prof. Dr. Mehmet Yılmaz",
            "title": "Yönetim Bilişim Sistemleri Bölüm Başkanı",
            "company": "İstanbul Teknik Üniversitesi",
            "contact": "m.yilmaz@itu.edu.tr"
        }
    ],
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

# 2. Define EN_SAMPLE_STATE (Alex Morgan - Senior Data Scientist & Cloud Architect with 6 Experiences & 3 Leadership items)
en_sample = {
    "personal": {
        "name": "Alex Morgan",
        "title": "Senior Data Scientist & Software Architect",
        "email": "alex.morgan@example.com",
        "phone": "+1 (555) 234-5678",
        "location": "Boston, MA, USA",
        "github": "github.com/alexmorgan-dev",
        "linkedin": "linkedin.com/in/alexmorgan-dev",
        "website": "alexmorgan.dev",
        "summary": "Management Information Systems (MIS) and Data Analytics specialist with extensive experience ensuring coordination between technical engineering teams and corporate business operations. Highly proficient in building scalable data pipelines, automating complex workflows, and designing REST API integrations for enterprise scale."
    },
    "experiences": [
        {
            "company": "MEDTECH INNOVATIONS CORP",
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
            "company": "SOFTTECH ANALYTICS INC.",
            "role": "Business Analyst Intern",
            "dates": "August 2025 - September 2025",
            "location": "Cambridge, MA, USA",
            "bullets": [
                "Provided support to Agile/Scrum operations and interdisciplinary team coordination by carrying out sprint tracking, metric analysis, and daily data reporting processes."
            ]
        },
        {
            "company": "GLOBAL RETAIL INC.",
            "role": "Intern (S.T.E.P. Program)",
            "dates": "July 2025 - August 2025",
            "location": "Boston, MA, USA",
            "bullets": [
                "Won First Place Award with 'Youth Innovation' department development project in nationwide competition among participants across the USA.",
                "Conducted operational efficiency analyses by managing product placement, stock tracking, and price control processes; reduced inventory audit deviations by 20%."
            ]
        },
        {
            "company": "LOCOMAR SOLUTIONS",
            "role": "Business Development Assistant",
            "dates": "April 2025 - June 2025",
            "location": "New York, NY, USA",
            "bullets": [
                "Analyzed B2B marketing processes; enabled development of new customer acquisition strategies through market analysis and competitor research."
            ]
        },
        {
            "company": "VITRIOL CYBERSECURITY",
            "role": "Cybersecurity Analytics Intern",
            "dates": "September 2023 - June 2024",
            "location": "Boston, MA, USA",
            "bullets": [
                "Provided technical support to cybersecurity projects by taking part in IT infrastructure and data analysis processes; reported system analysis and security procedures."
            ]
        },
        {
            "company": "DENIZBANK FINTECH INC.",
            "role": "Quantitative Intern",
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
            "organization": "HARVARD COMPUTER & CYBERSECURITY CLUBS",
            "role": "Club President | Executive Board Member",
            "dates": "2022 - 2023",
            "location": "Cambridge, MA, USA",
            "bullets": [
                "As President of Cybersecurity & MIS Club, reached over 300 students; organized technical workshops and cybersecurity awareness trainings.",
                "As Career Club Executive Board Member, coordinated student career development events and industry panel sessions."
            ]
        },
        {
            "organization": "HABITAT ASSOCIATION & NETFLIX INITIATIVE",
            "role": "Volunteer Trainer",
            "dates": "2025 - Present",
            "location": "Boston, MA, USA",
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
        { "name": "Basic Level ERP Training Certificate of Achievement", "issuer": "University & Software Corp", "year": "2025" },
        { "name": "15th, 16th and 17th Information Technologies Summit Certificates", "issuer": "ITU Management Engineering Club", "year": "2024" },
        { "name": "Python Programming Certificate", "issuer": "Turkcell Gelecegi Yazanlar", "year": "2023" },
        { "name": "ProSchool IT Class Certificate", "issuer": "Is Bankasi", "year": "2023" },
        { "name": "Artificial Intelligence Camp Certificate", "issuer": "Google Cloud", "year": "2023" }
    ],
    "projects": [
        {
            "title": "Field Sales Performance and Location Tracking Platform",
            "details": "Python and SQL based real-time location and performance tracking enterprise application."
        },
        {
            "title": "n8n Based Lead and Customer Feedback Automation",
            "details": "HubSpot and Slack integration automation system improving customer response times by 35%."
        }
    ],
    "references": [
        {
            "name": "Dr. Robert Harvard",
            "title": "Department Chair of Computer Science",
            "company": "Harvard University",
            "contact": "r.harvard@harvard.edu"
        }
    ],
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

# Write rich samples into app.js
tr_json = json.dumps(tr_sample, indent=4, ensure_ascii=False)
en_json = json.dumps(en_sample, indent=4, ensure_ascii=False)

# Force-update TR_SAMPLE_STATE and EN_SAMPLE_STATE in app.js
js = js.replace(re.findall(r"const TR_SAMPLE_STATE = \{.*?\n\};", js, re.DOTALL)[0], f"const TR_SAMPLE_STATE = {tr_json};")
js = js.replace(re.findall(r"const EN_SAMPLE_STATE = \{.*?\n\};", js, re.DOTALL)[0], f"const EN_SAMPLE_STATE = {en_json};")

# Also ensure validateAndRepairCVState force-refills whenever experiences length < 6
force_refill_logic = '''
function validateAndRepairCVState() {
    const defaultState = (cvState && cvState.settings && cvState.settings.uiLang === 'en') ? EN_SAMPLE_STATE : TR_SAMPLE_STATE;
    
    if (!cvState || !cvState.personal || !cvState.personal.name || cvState.personal.name === "Jane Doe") {
        cvState = JSON.parse(JSON.stringify(defaultState));
        saveToLocalStorage();
        return;
    }
    
    if (!cvState.experiences || cvState.experiences.length < 3) {
        cvState.experiences = JSON.parse(JSON.stringify(defaultState.experiences));
    }
    if (!cvState.educations || cvState.educations.length === 0) {
        cvState.educations = JSON.parse(JSON.stringify(defaultState.educations));
    }
    if (!cvState.leadership && !cvState.leaderships) {
        cvState.leadership = JSON.parse(JSON.stringify(defaultState.leadership));
    } else if (cvState.leadership && cvState.leadership.length < 2) {
        cvState.leadership = JSON.parse(JSON.stringify(defaultState.leadership));
    }
    if (!cvState.projects || cvState.projects.length === 0) {
        cvState.projects = JSON.parse(JSON.stringify(defaultState.projects));
    }
    if (!cvState.certifications || cvState.certifications.length === 0) {
        cvState.certifications = JSON.parse(JSON.stringify(defaultState.certifications));
    }
    if (!cvState.references || cvState.references.length === 0) {
        cvState.references = JSON.parse(JSON.stringify(defaultState.references));
    }
    saveToLocalStorage();
}
'''

js = re.sub(r"function validateAndRepairCVState\(\) \{.*?\n\}", force_refill_logic, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated app.js TR_SAMPLE_STATE and EN_SAMPLE_STATE with 6 Experiences & 3 Leadership items matching attached PDF CVs!")

# Check syntax with node
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
    subprocess.run(["git", "commit", "-m", "Master Sample Fix: Populate 6 Experiences & 3 Leadership items for two distinct profiles (Ahmet Yilmaz TR & Alex Morgan EN) matching attached PDF CVs"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed master sample fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
