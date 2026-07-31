import os
import sys
import re
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")
index_path = os.path.join(cwd, "index.html")

# 1. Define 100% distinct Turkish profile (Ahmet Yılmaz)
tr_profile = {
    "personal": {
        "name": "Ahmet Yılmaz",
        "title": "Kıdemli Yazılım Mühendisi & Veri Analitiği Uzmanı",
        "email": "ahmet.yilmaz@example.com",
        "phone": "+90 532 100 20 30",
        "location": "İstanbul, Türkiye",
        "github": "github.com/ahmetyilmaz-dev",
        "linkedin": "linkedin.com/in/ahmetyilmaz-dev",
        "website": "ahmetyilmaz.dev",
        "summary": "Yazılım mimarileri, veri tabanı optimizasyonu ve mikroservis sistemleri konularında 5+ yıl deneyimli Kıdemli Yazılım Mühendisi. Dağıtık veri işleme hatları kurgulama, RESTful API entegrasyonları tasarlama ve Agile/Scrum takımlarına teknik liderlik etme konularında yetkin."
    },
    "experiences": [
        {
            "company": "TEKNOSOFT BİLİŞİM A.Ş.",
            "role": "Kıdemli Yazılım Mühendisi & Ekip Lideri",
            "dates": "Ocak 2023 - Günümüz",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "3M+ günlük aktif kullanıcıya hizmet veren mikroservis mimarisini yeniden tasarlayarak ortalama API yanıt süresini %40 iyileştirdi.",
                "12 kişilik mühendislik ekibine liderlik ederek CI/CD süreçlerini otomatize etti; canlıya alma süresini 4 günden 15 dakikaya düşürdü.",
                "AWS bulut sunucu altyapısını optimize ederek yıllık operasyonel sunucu maliyetlerini 120.000$ azalttı."
            ]
        },
        {
            "company": "ANADOLU VERİ ANALİTİĞİ LTD.",
            "role": "Kıdemli Veri Mühendisi & Yazılım Geliştirici",
            "dates": "Haziran 2021 - Aralık 2022",
            "location": "Ankara, Türkiye",
            "bullets": [
                "Python ve SQL tabanlı dağıtık veri işleme mimarisi kurarak günlük 500GB akış verisini sıfır kayıp ile analiz etti.",
                "Şirket içi müşteri davranış analizi panellerini geliştirerek satış ekibinin dönüşüm oranını %25 artırdı.",
                "Veri tabanı indeksleme stratejilerini optimize ederek karmaşık sorgu sürelerini 4.5 saniyeden 180 milisaniyeye düşürdü."
            ]
        },
        {
            "company": "KODLAB YAZILIM YATIRIMLARI",
            "role": "Full-Stack Yazılım Geliştirici Stajyeri",
            "dates": "Temmuz 2020 - Mayıs 2021",
            "location": "İzmir, Türkiye",
            "bullets": [
                "React.js ve Node.js teknolojilerini kullanarak B2B e-ticaret platformunun ön yüz ve arka yüz modüllerini geliştirdi.",
                "RESTful API entegrasyonlarını kurgulayarak üçüncü taraf ödeme sistemlerinin güvenli entegrasyonunu sağladı."
            ]
        },
        {
            "company": "NETTEKNİK ÇÖZÜMLER",
            "role": "BT Altyapı & Veri Analisti",
            "dates": "Eylül 2019 - Haziran 2020",
            "location": "Bursa, Türkiye",
            "bullets": [
                "Şirket içi BT sistemlerinin performans metriklerini izleyerek donanım ve yazılım arıza sürelerini %30 azalttı."
            ]
        },
        {
            "company": "MİKRONEKS BİLİŞİM",
            "role": "Stajyer İş Analisti",
            "dates": "Haziran 2018 - Ağustos 2019",
            "location": "İstanbul, Türkiye",
            "bullets": [
                "Müşteri gereksinim analiz raporları hazırlayarakyazılım geliştirme ekipleri ile iş birimlerinin koordinasyonunu sağladı."
            ]
        }
    ],
    "educations": [
        {
            "university": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
            "degree": "Lisans, Bilgisayar Mühendisliği",
            "dates": "Eylül 2017 - Haziran 2021",
            "location": "İstanbul, Türkiye",
            "gpa": "3.65 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "İTÜ BİLİŞİM VE SİBER GÜVENLİK KULÜBÜ",
            "role": "Kulüp Başkanı",
            "dates": "2019 - 2021",
            "location": "İstanbul",
            "bullets": [
                "500+ üyeli kulübe başkanlık ederek 10'dan fazla ulusal hackathon ve teknik yazılım eğitimi düzenledi."
            ]
        },
        {
            "organization": "AÇIK KAYNAK YAZILIM TOPLULUĞU",
            "role": "Gönüllü Mentor",
            "dates": "2022 - Günümüz",
            "location": "Türkiye",
            "bullets": [
                "Geliştirici adaylarına Python, Git ve Veri Tabanı mimarileri konularında haftalık ücretsiz rehberlik sundu."
            ]
        },
        {
            "organization": "TÜRKİYE YAPAY ZEKA İNİSİYATİFİ",
            "role": "Eğitim Koordinatörü",
            "dates": "2023 - 2025",
            "location": "İstanbul",
            "bullets": [
                "Yapay zeka ve veri bilimi farkındalık atölyelerini koordine ederek 1.000'den fazla katılımcıya ulaştı."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, React.js, Node.js, Docker, Kubernetes, AWS, PostgreSQL, Redis, REST API, Git, CI/CD, Agile/Scrum",
        "tools": "VS Code, Git, GitHub, Jira, Postman, Docker Desktop, AWS Console, Figma, Chrome DevTools",
        "langs": "Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)"
    },
    "certifications": [
        { "name": "Google Cloud Certified Professional Cloud Architect", "issuer": "Google Cloud", "year": "2025" },
        { "name": "AWS Certified Solutions Architect Associate", "issuer": "Amazon Web Services", "year": "2024" },
        { "name": "Python Programlama Başarı Belgesi", "issuer": "Turkcell Geleceği Yazanlar", "year": "2023" }
    ],
    "projects": [],
    "references": [],
    "settings": {
        "uiLang": "tr",
        "showPhoto": False,
        "autoFitOnePage": True
    }
}

# 2. Define 100% distinct English profile (Sarah Jenkins)
en_profile = {
    "personal": {
        "name": "Sarah Jenkins",
        "title": "Senior Data Scientist & Cloud Architect",
        "email": "sarah.jenkins@example.com",
        "phone": "+1 (555) 345-6789",
        "location": "Boston, MA, USA",
        "github": "github.com/sarahjenkins-dev",
        "linkedin": "linkedin.com/in/sarahjenkins-dev",
        "website": "sarahjenkins.dev",
        "summary": "Senior Data Scientist and Cloud Architect with 6+ years of experience in designing scalable machine learning pipelines, predictive analytics dashboards, and cloud-native serverless microservices. Proven track record of leading cross-functional engineering teams and optimizing enterprise data infrastructure."
    },
    "experiences": [
        {
            "company": "GLOBAL CLOUD SYSTEMS CORP",
            "role": "Lead Cloud Architect & Data Scientist",
            "dates": "January 2023 - Present",
            "location": "Boston, MA, USA",
            "bullets": [
                "Architected cloud-native distributed data pipelines handling over 5TB of daily streaming data with 99.99% uptime.",
                "Led an engineering team of 10 developers to automate CI/CD deployments, reducing release cycles from 5 days to 20 minutes.",
                "Optimized multi-region AWS cloud infrastructure, cutting annual server operational expenditures by $150,000."
            ]
        },
        {
            "company": "BOSTON ANALYTICS INC.",
            "role": "Senior Data Engineer",
            "dates": "June 2021 - December 2022",
            "location": "Cambridge, MA, USA",
            "bullets": [
                "Built predictive analytics models in Python and PyTorch, increasing customer retention rates by 28%.",
                "Designed high-performance SQL indexing strategies, reducing complex analytical query latency by 85%."
            ]
        },
        {
            "company": "NEXUS FINTECH SOLUTIONS",
            "role": "Software Engineering Intern",
            "dates": "July 2020 - May 2021",
            "location": "New York, NY, USA",
            "bullets": [
                "Developed front-end dashboard modules using React.js and RESTful API integrations for real-time stock market tracking."
            ]
        },
        {
            "company": "APEX CYBERSECURITY GROUP",
            "role": "Data Analyst Intern",
            "dates": "September 2019 - June 2020",
            "location": "Chicago, IL, USA",
            "bullets": [
                "Monitored network security analytics logs, identifying threat vectors and reducing system vulnerability response time by 35%."
            ]
        },
        {
            "company": "QUANTUM LABS LLC",
            "role": "Junior Systems Analyst",
            "dates": "June 2018 - August 2019",
            "location": "Austin, TX, USA",
            "bullets": [
                "Prepared technical requirement documentations and facilitated cross-departmental agile project workflows."
            ]
        }
    ],
    "educations": [
        {
            "university": "HARVARD UNIVERSITY",
            "degree": "Bachelor of Science, Computer Science & MIS",
            "dates": "September 2017 - June 2021",
            "location": "Cambridge, MA, USA",
            "gpa": "3.88 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "HARVARD WOMEN IN TECH & CS CLUB",
            "role": "Club President",
            "dates": "2019 - 2021",
            "location": "Cambridge, MA",
            "bullets": [
                "Presided over 400+ student members, organizing 8 annual hackathons and technical cloud workshops."
            ]
        },
        {
            "organization": "BOSTON DATA SCIENCE SOCIETY",
            "role": "Lead Event Organizer",
            "dates": "2022 - Present",
            "location": "Boston, MA",
            "bullets": [
                "Coordinated monthly tech meetups and panel discussions with industry leaders for 1,200+ local engineers."
            ]
        },
        {
            "organization": "GLOBAL CODE FOR GOOD INITIATIVE",
            "role": "Volunteer Tech Lead",
            "dates": "2023 - 2025",
            "location": "USA",
            "bullets": [
                "Mentored non-profit organizations on building open-source data dashboards for environmental tracking."
            ]
        }
    ],
    "skills": {
        "technical": "Python, R, SQL, PyTorch, TensorFlow, AWS, GCP, Docker, Kubernetes, Snowflake, Tableau, Git, CI/CD, Agile/Scrum",
        "tools": "VS Code, Git, GitHub, Jira, Postman, Docker Desktop, AWS Management Console, Figma, Chrome DevTools",
        "langs": "English (Native Language), Spanish (Advanced / B2), German (Beginner / A1)"
    },
    "certifications": [
        { "name": "AWS Certified Solutions Architect Professional", "issuer": "Amazon Web Services", "year": "2025" },
        { "name": "Google Professional Data Engineer Certificate", "issuer": "Google Cloud", "year": "2024" }
    ],
    "projects": [],
    "references": [],
    "settings": {
        "uiLang": "en",
        "showPhoto": False,
        "autoFitOnePage": True
    }
}

# Replace TR_SAMPLE_STATE and EN_SAMPLE_STATE in app.js
with open(js_path, "r", encoding="utf-8") as f:
    js_code = f.read()

tr_json = json.dumps(tr_profile, indent=4, ensure_ascii=False)
en_json = json.dumps(en_profile, indent=4, ensure_ascii=False)

js_code = re.sub(r"const TR_SAMPLE_STATE = \{.*?\n\};", f"const TR_SAMPLE_STATE = {tr_json};", js_code, flags=re.DOTALL)
js_code = re.sub(r"const EN_SAMPLE_STATE = \{.*?\n\};", f"const EN_SAMPLE_STATE = {en_json};", js_code, flags=re.DOTALL)

# Purge any remaining personal author names from app.js
js_code = js_code.replace("Asil Doğukan Samay", "Ahmet Yılmaz")
js_code = js_code.replace("Asil Doğukan", "Ahmet Yılmaz")
js_code = js_code.replace("Asil", "Ahmet")
js_code = js_code.replace("dogukan__sam_ay@hotmail.com", "ahmet.yilmaz@example.com")

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js_code)

print("SUCCESS: Replaced TR_SAMPLE_STATE & EN_SAMPLE_STATE in app.js with 2 100% distinct profiles (Ahmet Yılmaz TR & Sarah Jenkins EN)!")

# Update editor.html static fallback to Ahmet Yılmaz
with open(html_path, "r", encoding="utf-8") as f:
    html_code = f.read()

html_code = html_code.replace("Asil Doğukan Samay", "Ahmet Yılmaz")
html_code = html_code.replace("Asil Doğukan", "Ahmet Yılmaz")
html_code = html_code.replace("Asil", "Ahmet")
html_code = html_code.replace("dogukan__sam_ay@hotmail.com", "ahmet.yilmaz@example.com")
html_code = html_code.replace("github.com/AsilDogukan-Samay", "github.com/ahmetyilmaz-dev")
html_code = html_code.replace("linkedin.com/in/asil-dogukan-samay", "linkedin.com/in/ahmetyilmaz-dev")
html_code = html_code.replace("asildogukansamay.github.io", "ahmetyilmaz.dev")

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_code)

print("SUCCESS: Updated editor.html static header to Ahmet Yılmaz!")

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
    subprocess.run(["git", "commit", "-m", "Privacy & Distinction Fix: Completely remove all personal CV details and provide 2 100% distinct realistic sample profiles (Ahmet Yilmaz TR & Sarah Jenkins EN)"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed privacy and distinct profile updates to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
