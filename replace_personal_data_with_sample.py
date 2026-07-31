import os
import sys
import re
import json

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# Define Generic Sample States
tr_sample = {
    "personal": {
        "name": "Ahmet Yılmaz",
        "title": "Yazılım Mimarı & Veri Analisti",
        "email": "ahmet.yilmaz@example.com",
        "phone": "+90 532 123 45 67",
        "location": "İstanbul, Türkiye",
        "github": "github.com/ornek-kullanici",
        "linkedin": "linkedin.com/in/ornek-kullanici",
        "website": "ahmetyilmaz.dev",
        "summary": "Veri analitiği, dağıtık sistemler ve süreç otomasyonu konularında 6+ yıl deneyimli Kıdemli Yazılım Mimarı. Yüksek performanslı mikroservis mimarileri geliştirme ve operasyonel verimliliği %35 artıran veri sistemleri tasarımında uzmanlaşmıştır."
    },
    "experiences": [
        {
            "company": "GLOBAL TEKNOLOJİ A.Ş.",
            "role": "Kıdemli Yazılım Mimarı",
            "dates": "2022 - Günümüz",
            "location": "İstanbul",
            "bullets": [
                "3M+ günlük aktif kullanıcıya hizmet veren mikroservis mimarisini tasarlayarak API yanıt sürelerini %40 iyileştirdi.",
                "12 kişilik mühendislik ekibine liderlik ederek CI/CD süreçlerini otomatize etti; canlıya alma süresini 4 günden 15 dakikaya düşürdü.",
                "Bulut altyapı kaynaklarını optimize ederek yıllık operasyonel sunucu maliyetlerini 120.000$ azalttı."
            ]
        },
        {
            "company": "VERİ ANALİTİĞİ ÇÖZÜMLERİ LTD.",
            "role": "Veri Analisti & Yazılım Geliştirici",
            "dates": "2019 - 2022",
            "location": "Ankara",
            "bullets": [
                "Python ve SQL tabanlı veri işleme boru hatları kurarak günlük 500GB veri akışını sıfır veri kaybı ile işledi.",
                "Şirket içi müşteri davranış analizi panellerini geliştirerek satış ekibinin dönüşüm oranını %25 artırdı."
            ]
        }
    ],
    "educations": [
        {
            "university": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
            "degree": "Lisans, Bilgisayar Mühendisliği",
            "dates": "2015 - 2019",
            "location": "İstanbul",
            "gpa": "3.82 / 4.00"
        }
    ],
    "skills": {
        "technical": "Python, JavaScript, Node.js, React, Docker, Kubernetes, PostgreSQL, AWS, Git, CI/CD",
        "languages": "Türkçe (Ana Dil), İngilizce (İleri Düzey - C1)",
        "frameworks": "Express.js, Django, REST APIs, GraphQL, Microservices"
    },
    "certifications": [
        "AWS Certified Solutions Architect (2023)",
        "Certified Scrum Master (CSM) (2022)"
    ],
    "projects": [
        {
            "title": "Açık Kaynak Veri İşleme Motoru",
            "details": "Geliştiricilerin büyük veri kümelerini hızlıca analiz etmesini sağlayan 1.500+ GitHub yıldızlı açık kaynak proje."
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

en_sample = {
    "personal": {
        "name": "Alex Morgan",
        "title": "Senior Software Architect & Data Specialist",
        "email": "alex.morgan@example.com",
        "phone": "+1 (555) 234-5678",
        "location": "Boston, MA, USA",
        "github": "github.com/alexmorgan-dev",
        "linkedin": "linkedin.com/in/alexmorgan-dev",
        "website": "alexmorgan.dev",
        "summary": "Results-driven Senior Software Architect with 6+ years of experience specializing in high-throughput distributed systems, cloud infrastructure, and data analytics. Proven track record of scaling microservice applications serving over 3M active users while optimizing infrastructure cost by 35%."
    },
    "experiences": [
        {
            "company": "TECH INNOVATIONS CORP",
            "role": "Senior Software Architect",
            "dates": "2022 - Present",
            "location": "Boston, MA",
            "bullets": [
                "Architected distributed microservices handling 3M+ active daily users, reducing average API response latency by 40%.",
                "Spearheaded automated CI/CD deployment pipelines for an engineering team of 12, accelerating release velocity from 4 days to 15 minutes.",
                "Optimized cloud infrastructure resources, cutting annual operational hosting expenditure by $120,000."
            ]
        },
        {
            "company": "GLOBAL DATA SOLUTIONS INC.",
            "role": "Software & Data Engineer",
            "dates": "2019 - 2022",
            "location": "Cambridge, MA",
            "bullets": [
                "Engineered Python and SQL data processing pipelines to stream and analyze 500GB daily telemetry data with zero data loss.",
                "Developed executive analytics dashboards that increased sales conversion rate by 25% across 4 business units."
            ]
        }
    ],
    "educations": [
        {
            "university": "HARVARD UNIVERSITY",
            "degree": "Bachelor of Science in Computer Science",
            "dates": "2015 - 2019",
            "location": "Cambridge, MA",
            "gpa": "3.88 / 4.00"
        }
    ],
    "skills": {
        "technical": "Python, JavaScript, Node.js, React, Docker, Kubernetes, PostgreSQL, AWS, Git, CI/CD",
        "languages": "English (Native), Spanish (Fluent)",
        "frameworks": "Express.js, Django, REST APIs, GraphQL, Microservices"
    },
    "certifications": [
        "AWS Certified Solutions Architect (2023)",
        "Certified Scrum Master (CSM) (2022)"
    ],
    "projects": [
        {
            "title": "Open-Source High-Speed Data Parser",
            "details": "Created an open-source data analytics library with over 1,500 GitHub stars, utilized by 200+ developer teams worldwide."
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

# 1. Update app.js
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Replace EN_SAMPLE_STATE
en_sample_json = json.dumps(en_sample, indent=4, ensure_ascii=False)
js = re.sub(r"const EN_SAMPLE_STATE = \{.*?\n\};", f"const EN_SAMPLE_STATE = {en_sample_json};", js, flags=re.DOTALL)

# Replace TR_SAMPLE_STATE
tr_sample_json = json.dumps(tr_sample, indent=4, ensure_ascii=False)
js = re.sub(r"const TR_SAMPLE_STATE = \{.*?\n\};", f"const TR_SAMPLE_STATE = {tr_sample_json};", js, flags=re.DOTALL)

# Replace cvState default initialization
js = re.sub(r"let cvState = \{.*?\n\};", f"let cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));", js, flags=re.DOTALL)

# Clean up legacy migration code in app.js
legacy_migration_pattern = r"// Check if we need to migrate to Dogukan's default state once.*?\/\/ Force migrate to Dogukan's CV as default.*?\n\}"
js = re.sub(legacy_migration_pattern, "", js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated app.js with clean generic TR and EN sample states!")

# 2. Update editor.html
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

html = html.replace('placeholder="www.asildogukansamay.com"', 'placeholder="www.example.com"')
html = html.replace('asildogukansamay.com', 'example.com')

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Updated editor.html placeholders!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Privacy & Samples: Replace personal CV data with high-quality generic Harvard sample templates (TR & EN)"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed clean sample templates to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
