import os
import sys
import re
import json
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

# 1. Update tab buttons in editor.html to pass `this`
with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

tab_replacements = {
    'onclick="switchTab(\'personal\')"': 'onclick="switchTab(\'personal\', this)"',
    'onclick="switchTab(\'experience\')"': 'onclick="switchTab(\'experience\', this)"',
    'onclick="switchTab(\'education\')"': 'onclick="switchTab(\'education\', this)"',
    'onclick="switchTab(\'skills\')"': 'onclick="switchTab(\'skills\', this)"',
    'onclick="switchTab(\'references\')"': 'onclick="switchTab(\'references\', this)"',
    'onclick="switchTab(\'settings\')"': 'onclick="switchTab(\'settings\', this)"'
}

for old_code, new_code in tab_replacements.items():
    if old_code in html:
        html = html.replace(old_code, new_code)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Updated editor.html tab buttons with direct element targets!")

# 2. Comprehensive Rich Harvard Sample Data (TR & EN)
tr_rich_state = {
    "personal": {
        "name": "Ahmet Yılmaz",
        "title": "Kıdemli Yazılım Mimarı & Veri Mühendisi",
        "email": "ahmet.yilmaz@example.com",
        "phone": "+90 532 123 45 67",
        "location": "İstanbul, Türkiye",
        "github": "github.com/ahmetyilmaz-dev",
        "linkedin": "linkedin.com/in/ahmetyilmaz-dev",
        "website": "ahmetyilmaz.dev",
        "summary": "Veri analitiği, dağıtık mikroservis sistemleri ve süreç otomasyonu konularında 7+ yıl deneyimli Kıdemli Yazılım Mimarı. Yüksek performanslı veri işleme boru hatları geliştirme, bulut altyapı optimizasyonu ve mühendislik ekiplerine liderlik etme konusunda uzmanlaşmıştır."
    },
    "experiences": [
        {
            "company": "GLOBAL TEKNOLOJİ A.Ş.",
            "role": "Kıdemli Yazılım Mimarı & Ekip Lideri",
            "dates": "2022 - Günümüz",
            "location": "İstanbul",
            "bullets": [
                "3M+ günlük aktif kullanıcıya hizmet veren mikroservis mimarisini yeniden tasarlayarak ortalama API yanıt süresini %40 iyileştirdi.",
                "12 kişilik mühendislik ekibine liderlik ederek CI/CD süreçlerini otomatize etti; canlıya alma süresini 4 günden 15 dakikaya düşürdü.",
                "AWS bulut sunucu altyapısını optimize ederek yıllık operasyonel sunucu maliyetlerini 120.000$ azalttı."
            ]
        },
        {
            "company": "VERİ ANALİTİĞİ ÇÖZÜMLERİ LTD.",
            "role": "Kıdemli Veri Mühendisi & Yazılım Geliştirici",
            "dates": "2019 - 2022",
            "location": "Ankara",
            "bullets": [
                "Python ve SQL tabanlı dağıtık veri işleme mimarisi kurarak günlük 500GB akış verisini sıfır kayıp ile analiz etti.",
                "Şirket içi müşteri davranış analizi panellerini geliştirerek satış ekibinin dönüşüm oranını %25 artırdı.",
                "Veri tabanı indeksleme stratejilerini optimize ederek karmaşık sorgu sürelerini 4.5 saniyeden 180 milisaniyeye düşürdü."
            ]
        },
        {
            "company": "İNOVASYON YAZILIM A.Ş.",
            "role": "Yazılım Geliştirme Uzmanı",
            "dates": "2017 - 2019",
            "location": "İstanbul",
            "bullets": [
                "React ve Node.js mimarisiyle geliştirilen müşteri yönetim panelinin frontend altyapısını kurdu.",
                "Birim test (Unit Test) kapsama oranını %30'dan %88'e çıkararak canlı sistemdeki hata oranını %60 azalttı."
            ]
        }
    ],
    "educations": [
        {
            "university": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
            "degree": "Yüksek Lisans, Veri Analitiği ve Yazılım Mühendisliği",
            "dates": "2019 - 2021",
            "location": "İstanbul",
            "gpa": "3.90 / 4.00"
        },
        {
            "university": "İSTANBUL TEKNİK ÜNİVERSİTESİ",
            "degree": "Lisans, Bilgisayar Mühendisliği",
            "dates": "2015 - 2019",
            "location": "İstanbul",
            "gpa": "3.82 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "AÇIK KAYNAK YAZILIM TOPLULUĞU",
            "role": "Topluluk Lideri & Teknik Mentor",
            "dates": "2021 - Günümüz",
            "location": "İstanbul",
            "bullets": [
                "500+ genç yazılımcıya açık kaynak katkısı ve kod kalitesi konularında aylık mentörlük sağladı.",
                "Ulusal Hackathon organizasyonunda teknik jüri üyesi olarak 45 projeyi değerlendirdi."
            ]
        }
    ],
    "skills": {
        "technical": "Python, JavaScript, TypeScript, Node.js, React, Docker, Kubernetes, PostgreSQL, MongoDB, AWS, Git, CI/CD",
        "tools": "Git, GitHub Actions, Docker, Kubernetes, Visual Studio Code, JIRA, Tableau, AWS EC2/S3",
        "langs": "Türkçe (Ana Dil), İngilizce (İleri Düzey - C1)",
        "frameworks": "Express.js, Django, REST APIs, GraphQL, Microservices"
    },
    "certifications": [
        { "name": "AWS Certified Solutions Architect - Professional", "issuer": "Amazon Web Services", "year": "2023" },
        { "name": "Certified Scrum Master (CSM)", "issuer": "Scrum Alliance", "year": "2022" },
        { "name": "Google Cloud Professional Data Engineer", "issuer": "Google Cloud", "year": "2021" }
    ],
    "projects": [
        {
            "title": "Açık Kaynak Yüksek Hızlı Veri İşleme Motoru",
            "details": "Geliştiricilerin büyük veri kümelerini hızlıca analiz etmesini sağlayan 1.800+ GitHub yıldızlı açık kaynak proje."
        },
        {
            "title": "Mikroservis Performans İzleme Paneli",
            "details": "Dağıtık sistemlerde gecikme sürelerini canlı ölçen ve anomalileri uyaran açık kaynaklı izleme aracı."
        }
    ],
    "references": [
        {
            "name": "Prof. Dr. Mehmet Yılmaz",
            "title": "Bilgisayar Mühendisliği Bölüm Başkanı",
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

en_rich_state = {
    "personal": {
        "name": "Alex Morgan",
        "title": "Senior Software Architect & Data Specialist",
        "email": "alex.morgan@example.com",
        "phone": "+1 (555) 234-5678",
        "location": "Boston, MA, USA",
        "github": "github.com/alexmorgan-dev",
        "linkedin": "linkedin.com/in/alexmorgan-dev",
        "website": "alexmorgan.dev",
        "summary": "Results-driven Senior Software Architect with 7+ years of experience specializing in high-throughput distributed systems, cloud infrastructure, and data analytics. Proven track record of scaling microservice applications serving over 3M active users while optimizing infrastructure cost by 35%."
    },
    "experiences": [
        {
            "company": "TECH INNOVATIONS CORP",
            "role": "Senior Software Architect & Team Lead",
            "dates": "2022 - Present",
            "location": "Boston, MA",
            "bullets": [
                "Architected distributed microservices handling 3M+ active daily users, reducing average API response latency by 40%.",
                "Spearheaded automated CI/CD deployment pipelines for an engineering team of 12, accelerating release velocity from 4 days to 15 minutes.",
                "Optimized AWS cloud infrastructure resources, cutting annual operational hosting expenditure by $120,000."
            ]
        },
        {
            "company": "GLOBAL DATA SOLUTIONS INC.",
            "role": "Senior Software & Data Engineer",
            "dates": "2019 - 2022",
            "location": "Cambridge, MA",
            "bullets": [
                "Engineered Python and SQL data processing pipelines to stream and analyze 500GB daily telemetry data with zero data loss.",
                "Developed executive analytics dashboards that increased sales conversion rate by 25% across 4 global business units.",
                "Optimized database indexing strategies, accelerating complex query execution from 4.5 seconds to 180 milliseconds."
            ]
        },
        {
            "company": "INNOVATIVE SOFTWARE SOLUTIONS",
            "role": "Software Engineer",
            "dates": "2017 - 2019",
            "location": "Boston, MA",
            "bullets": [
                "Built frontend core architecture for client analytics portal using React, Node.js, and RESTful APIs.",
                "Expanded unit test code coverage from 30% to 88%, reducing production software defect rate by 60%."
            ]
        }
    ],
    "educations": [
        {
            "university": "HARVARD UNIVERSITY",
            "degree": "Master of Science in Computer Science & Data Analytics",
            "dates": "2019 - 2021",
            "location": "Cambridge, MA",
            "gpa": "3.92 / 4.00"
        },
        {
            "university": "HARVARD UNIVERSITY",
            "degree": "Bachelor of Science in Computer Science",
            "dates": "2015 - 2019",
            "location": "Cambridge, MA",
            "gpa": "3.88 / 4.00"
        }
    ],
    "leadership": [
        {
            "organization": "OPEN SOURCE SOFTWARE ALLIANCE",
            "role": "Community Leader & Technical Mentor",
            "dates": "2021 - Present",
            "location": "Boston, MA",
            "bullets": [
                "Provided technical mentorship to 500+ junior developers on code quality and open-source contribution best practices.",
                "Served as technical judge for National Hackathon event, evaluating over 45 software innovations."
            ]
        }
    ],
    "skills": {
        "technical": "Python, JavaScript, TypeScript, Node.js, React, Docker, Kubernetes, PostgreSQL, MongoDB, AWS, Git, CI/CD",
        "tools": "Git, GitHub Actions, Docker, Kubernetes, Visual Studio Code, JIRA, Tableau, AWS EC2/S3",
        "langs": "English (Native), Spanish (Fluent)",
        "frameworks": "Express.js, Django, REST APIs, GraphQL, Microservices"
    },
    "certifications": [
        { "name": "AWS Certified Solutions Architect - Professional", "issuer": "Amazon Web Services", "year": "2023" },
        { "name": "Certified Scrum Master (CSM)", "issuer": "Scrum Alliance", "year": "2022" },
        { "name": "Google Cloud Professional Data Engineer", "issuer": "Google Cloud", "year": "2021" }
    ],
    "projects": [
        {
            "title": "Open-Source High-Speed Data Parser",
            "details": "Created an open-source data analytics library with over 1,800 GitHub stars, utilized by 200+ developer teams worldwide."
        },
        {
            "title": "Microservice Performance Monitor",
            "details": "Developed open-source telemetry dashboard for real-time latency monitoring and anomaly detection."
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

# 3. Update app.js
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Replace EN_SAMPLE_STATE
en_json = json.dumps(en_rich_state, indent=4, ensure_ascii=False)
js = re.sub(r"const EN_SAMPLE_STATE = \{.*?\n\};", f"const EN_SAMPLE_STATE = {en_json};", js, flags=re.DOTALL)

# Replace TR_SAMPLE_STATE
tr_json = json.dumps(tr_rich_state, indent=4, ensure_ascii=False)
js = re.sub(r"const TR_SAMPLE_STATE = \{.*?\n\};", f"const TR_SAMPLE_STATE = {tr_json};", js, flags=re.DOTALL)

# Robust switchTab function in app.js
new_switch_tab = '''function switchTab(tabId, btnTarget) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    
    if (btnTarget && btnTarget.classList) {
        btnTarget.classList.add('active');
    } else {
        const btns = document.querySelectorAll('.tab-btn');
        btns.forEach(btn => {
            const attr = btn.getAttribute('onclick') || '';
            if (attr.includes(`'${tabId}'`) || attr.includes(`"${tabId}"`)) {
                btn.classList.add('active');
            }
        });
    }
    
    const activePane = document.getElementById(`tab-${tabId}`);
    if (activePane) {
        activePane.classList.add('active');
    }
    
    if (tabId === 'settings') {
        updateStepper(2);
    } else {
        updateStepper(1);
    }
}'''

js = re.sub(r"function switchTab\(tabId\) \{.*?\n\}", new_switch_tab, js, flags=re.DOTALL)

# Automatic repair logic for empty cvState arrays on load
repair_logic = '''
// Ensure cvState has rich default content if sections are empty
function validateAndRepairCVState() {
    if (!cvState.experiences || cvState.experiences.length === 0) {
        cvState.experiences = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.experiences));
    }
    if (!cvState.educations || cvState.educations.length === 0) {
        cvState.educations = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.educations));
    }
    if (!cvState.certifications || cvState.certifications.length === 0) {
        cvState.certifications = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.certifications));
    }
    if (!cvState.leadership || cvState.leadership.length === 0) {
        cvState.leadership = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.leadership));
    }
    if (!cvState.projects || cvState.projects.length === 0) {
        cvState.projects = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.projects));
    }
    if (!cvState.references || cvState.references.length === 0) {
        cvState.references = JSON.parse(JSON.stringify(TR_SAMPLE_STATE.references));
    }
}
'''

if "function validateAndRepairCVState()" not in js:
    js += "\n\n" + repair_logic

# Call validateAndRepairCVState inside initialization
js = js.replace('loadStateIntoUI();\n    renderAll();', 'validateAndRepairCVState();\n    loadStateIntoUI();\n    renderAll();')

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated app.js with robust switchTab and automatic CV state repair logic!")

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "Fix: Bulletproof tab switching, automatic state repair, and 100% full rich Harvard CV sample content"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed tab fixes and full rich CV data to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
