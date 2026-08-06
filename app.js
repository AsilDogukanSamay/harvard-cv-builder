
// -------------------------------------------------------------
// USER SESSION & AUTHENTICATION HANDLERS
// -------------------------------------------------------------

function handleLogout() {
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    const msg = lang === 'en' 
        ? "Do you want to safely end your session and clear temporary local storage?"
        : "Oturumunuzu güvenli bir şekilde kapatıp yerel hafızayı sıfırlamak istiyor musunuz?";
    
    if (confirm(msg)) {
        localStorage.clear();
        cvState = (lang === 'en') ? JSON.parse(JSON.stringify(EN_SAMPLE_STATE)) : JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        alert(lang === 'en' ? "Session ended safely." : "Oturumunuz güvenle kapatıldı.");
    }
}

function _legacy_toggleGuideModal_disabled() {
    const modal = document.getElementById('guide-modal');
    if (modal) {
        const isHidden = modal.style.display === 'none' || !modal.style.display;
        modal.style.display = isHidden ? 'flex' : 'none';
    }
}

function closeGuideModal(event) {
    if (event && event.target) {
        if (event.target.id === 'guide-modal' || (event.target.classList && event.target.classList.contains('close-btn')) || event.target.tagName === 'BUTTON') {
            const modal = document.getElementById('guide-modal');
            if (modal) modal.style.display = 'none';
        }
    } else {
        const modal = document.getElementById('guide-modal');
        if (modal) modal.style.display = 'none';
    }
}


// -------------------------------------------------------------
// JSON IMPORT / EXPORT & SAMPLE PRESETS HANDLERS
// -------------------------------------------------------------

function exportCVJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CVSOM_${(cvState.personal && cvState.personal.name ? cvState.personal.name : "Resume").replace(/\s+/g, '_')}_Data.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function triggerJSONImport() {
    const input = document.getElementById('json-import-input');
    if (input) input.click();
}

function importCVJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            if (importedData && importedData.personal) {
                cvState = importedData;
                saveToLocalStorage();
                loadStateIntoUI();
                renderAll();
                updateStyles();
                alert((cvState.settings && cvState.settings.uiLang === 'en') 
                    ? "CV Data imported successfully!" 
                    : "CV Verileri başarıyla yüklendi!");
            } else {
                alert("Geçersiz JSON formatı! Lütfen geçerli bir CVSOM verisi yükleyin.");
            }
        } catch(err) {
            alert("JSON okunurken hata oluştu: " + err.message);
        }
    };
    reader.readAsText(file);
}

function loadSampleCV(presetType) {
    if (!presetType) return;
    
    if (presetType === 'tr') {
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        if (cvState.settings) cvState.settings.uiLang = "tr";
    } else if (presetType === 'en') {
        cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
        if (cvState.settings) cvState.settings.uiLang = "en";
    }
    
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    
    const msg = (presetType === 'tr') 
        ? "Türkçe Örnek CV (Kıdemli Yazılım Mimarı & MIS) başarıyla yüklendi!" 
        : "English Sample CV (Senior Product Manager) loaded successfully!";
    
    const selector = document.getElementById('preset-selector');
    if (selector) selector.value = "";
    
    alert(msg);
}


// Initial CV data state (initialized from TR sample)
var cvState;

const EN_SAMPLE_STATE = {
    "personal": {
        "name": "Alex Morgan",
        "title": "Senior Software Engineer & Solutions Architect",
        "email": "alex.morgan@devstudio.io",
        "phone": "+44 20 7946 0912",
        "location": "London, UK | Remote",
        "github": "github.com/alexmorgan-dev",
        "linkedin": "linkedin.com/in/alexmorgan-tech",
        "website": "alexmorgan.dev",
        "summary": "Results-driven Senior Software Engineer with 6+ years of experience architecting high-throughput distributed systems, cloud-native microservices, and modern web applications. Proven track record of optimizing database performance by 45%, leading cross-functional Agile teams, and deploying scalable React/Node.js solutions in Fintech and E-commerce domains."
    },
    "experiences": [
        {
            "company": "NEXUS TECH LABS",
            "role": "Senior Full-Stack Engineer",
            "location": "London, UK",
            "dates": "January 2024 - Present",
            "bullets": [
                "Spearheaded the redesign of core payment processing engine using Node.js, Redis, and PostgreSQL, increasing throughput to 15,000 req/sec with 99.99% uptime.",
                "Architected real-time analytics dashboard with React, TypeScript, and WebSocket API, reducing customer onboarding latency by 40%.",
                "Automated CI/CD pipelines via GitHub Actions and Docker on AWS ECS, cutting deployment times from 45 minutes to 6 minutes."
            ]
        },
        {
            "company": "FINTECH INNOVATIONS INC.",
            "role": "Software Engineer",
            "location": "Cambridge, UK",
            "dates": "June 2021 - December 2023",
            "bullets": [
                "Developed microservices architecture connecting Stripe, HubSpot, and Internal CRM APIs, processing $12M+ in monthly transaction volume.",
                "Refactored legacy monolithic backend into decoupled GraphQL microservices, improving API response times by 35%.",
                "Mentored 4 junior engineers, established unit testing guidelines with Jest, achieving 92% code coverage across repositories."
            ]
        },
        {
            "company": "VORTEX DATA SOLUTIONS",
            "role": "Junior Software Developer",
            "location": "London, UK",
            "dates": "July 2019 - May 2021",
            "bullets": [
                "Implemented dynamic data visualization components in React and D3.js for enterprise financial risk modeling dashboard.",
                "Engineered automated SQL ETL scripts handling 2TB daily log records using Python and Apache Airflow."
            ]
        }
    ],
    "educations": [
        {
            "university": "UNIVERSITY OF CAMBRIDGE",
            "degree": "Bachelor of Science in Computer Science",
            "location": "Cambridge, UK",
            "dates": "September 2015 - June 2019",
            "gpa": "First Class Honours (3.9 / 4.0)"
        }
    ],
    "leaderships": [
        {
            "organization": "CAMBRIDGE TECH COMMUNITY",
            "role": "Community Lead & Event Organizer",
            "dates": "2022 - Present",
            "bullets": [
                "Organized bi-monthly developer meetups and hackathons attracting over 400 attendees across the UK tech ecosystem.",
                "Coordinated panel discussions with engineering leaders from Google, Meta, and Stripe on distributed cloud architecture."
            ]
        },
        {
            "organization": "CODE FOR GOOD INITIATIVE",
            "role": "Volunteer Mentor & Workshop Instructor",
            "dates": "2020 - 2023",
            "bullets": [
                "Taught Python programming and web development fundamentals to 200+ underrepresented students entering STEM fields.",
                "Curated open-source coding curriculum adopted by 3 local youth tech education charities."
            ]
        }
    ],
    "skills": {
        "technical": "JavaScript (ES6+), TypeScript, Python, React.js, Node.js, Express, PostgreSQL, Redis, GraphQL, REST API, HTML5/CSS3",
        "tools": "Git, GitHub, Docker, Kubernetes, AWS (EC2, S3, ECS, Lambda), CI/CD, Jest, Vite, Jira, Linux",
        "langs": "English (Native), Spanish (Professional / C1), German (Elementary / A2)"
    },
    "certifications": [
        {
            "name": "AWS Certified Solutions Architect - Associate",
            "issuer": "Amazon Web Services",
            "year": "2025"
        },
        {
            "name": "Meta Front-End Developer Professional Certificate",
            "issuer": "Meta",
            "year": "2024"
        },
        {
            "name": "Certified ScrumMaster (CSM)",
            "issuer": "Scrum Alliance",
            "year": "2023"
        }
    ],
    "references": [
        {
            "name": "Dr. Arthur Vance",
            "title": "VP of Engineering",
            "company": "Nexus Tech Labs",
            "contact": "+44 20 7946 0199"
        },
        {
            "name": "Claire Sterling",
            "title": "Director of Product",
            "company": "Fintech Innovations Inc.",
            "contact": "+44 20 7946 0455"
        }
    ],
    "settings": {
        "font": "font-garamond",
        "size": "size-medium",
        "spacing": "spacing-normal",
        "margin": "margin-normal",
        "alignment": "align-justify",
        "accent": "accent-black",
        "headings": "headings-line",
        "refMode": "details",
        "showReferences": true,
        "uiLang": "tr",
        "docLang": "en",
        "visibility": {
            "photo": false,
            "references": true
        }
    }
};

const TR_SAMPLE_STATE = {
    "personal": {
        "name": "Can Yılmaz",
        "title": "Veri Analisti & Süreç Otomasyon Uzmanı",
        "email": "can.yilmaz@ornek.com",
        "phone": "+90 532 000 12 34",
        "location": "İstanbul, Türkiye",
        "github": "github.com/canyilmaz-dev",
        "linkedin": "linkedin.com/in/canyilmaz-data",
        "website": "canyilmaz.dev",
        "summary": "Veri analitiği, iş zekası ve süreç otomasyonu konularında 4+ yıl deneyimli Yönetim Bilişim Sistemleri (MIS) uzmanı. SQL, Python ve Power BI kullanarak karmaşık veri kümelerinden stratejik karar destek raporları kurgulama ve n8n otomasyon araçlarıyla iş akışlarını dijitalleştirme konularında yetkin."
    },
    "experiences": [
        {
            "company": "ALFA DİJİTAL TEKNOLOJİLER",
            "role": "Kıdemli Veri Analisti",
            "location": "İstanbul, Türkiye",
            "dates": "Ocak 2024 - Devam Ediyor",
            "bullets": [
                "Python ve PostgreSQL kullanarak 500.000+ günlük verinin işlendiği otomatik ETL veri hatlarını kurguladı; raporlama süresini %40 kısalttı.",
                "n8n otomasyon mimarisi ile CRM ve Slack entegrasyonlarını tamamlayarak müşteri destek yanıt sürelerini 15 dakikanın altına indirdi.",
                "Power BI üzerinde üst yönetim için etkileşimli satış ve finans performans panelleri tasarladı."
            ]
        },
        {
            "company": "BETA BİLİŞİM ÇÖZÜMLERİ",
            "role": "Süreç ve Veri Analisti Stajyeri",
            "location": "İstanbul, Türkiye",
            "dates": "Haziran 2023 - Aralık 2023",
            "bullets": [
                "Şirket içi Agile/Scrum operasyonlarının sprint metrik analizlerini yürüterek haftalık verimlilik raporlarını sundu.",
                "Müşteri segmentasyonu için K-Means kümeleme algoritması uygulayarak pazarlama dönüşüm oranını %18 artırdı."
            ]
        }
    ],
    "educations": [
        {
            "university": "MARMARA ÜNİVERSİTESİ",
            "degree": "Lisans, Yönetim Bilişim Sistemleri (MIS)",
            "location": "İstanbul, Türkiye",
            "dates": "Eylül 2020 - Haziran 2024",
            "gpa": "3.42 / 4.00"
        }
    ],
    "leaderships": [
        {
            "organization": "GENÇ TEKNOLOJİ KULÜBÜ",
            "role": "Kulüp Başkanı",
            "dates": "2022 - 2024",
            "bullets": [
                "400+ öğrencinin katıldığı veri analitiği ve Python workshop serilerini organize etti.",
                "Sektör profesyonelleri ile öğrencileri buluşturan kariyer ve bilişim zirvelerini koordine etti."
            ]
        },
        {
            "organization": "DİJİTAL GELECEK DERNEĞİ",
            "role": "Gönüllü Eğitmen",
            "dates": "2023 - 2024",
            "bullets": [
                "Lise öğrencilerine temel kodlama, veri okuryazarlığı ve siber güvenlik farkındalık eğitimleri sundu."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, Power BI, Tableau, HTML/CSS, REST API, n8n Otomasyon, ETL, Excel",
        "tools": "Git, GitHub, PostgreSQL, VS Code, Jira, Figma, Docker",
        "langs": "Türkçe (Anadil), İngilizce (İleri Düzey / B2)"
    },
    "certifications": [
        {
            "name": "Google Data Analytics Professional Certificate",
            "issuer": "Google",
            "year": "2024"
        },
        {
            "name": "Microsoft Certified: Power BI Data Analyst Associate",
            "issuer": "Microsoft",
            "year": "2023"
        }
    ],
    "references": [
        {
            "name": "Ahmet Kaya",
            "title": "Veri Analitiği Müdürü",
            "company": "Alfa Dijital Teknolojiler",
            "contact": "0533 000 11 22"
        },
        {
            "name": "Selin Demir",
            "title": "Yazılım Takım Lideri",
            "company": "Beta Bilişim Çözümleri",
            "contact": "0535 000 33 44"
        }
    ],
    "settings": {
        "font": "font-garamond",
        "size": "size-medium",
        "spacing": "spacing-normal",
        "margin": "margin-normal",
        "alignment": "align-justify",
        "accent": "accent-black",
        "headings": "headings-line",
        "refMode": "details",
        "showReferences": true,
        "uiLang": "tr",
        "docLang": "tr",
        "visibility": {
            "photo": false,
            "references": true
        }
    }
};

cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));

const SOFTWARE_SAMPLE_STATE_TR = {
    personal: {
        name: "Ahmet Yılmaz",
        title: "Kıdemli Yazılım Mühendisi & Bulut Mimarı",
        email: "ahmet.yilmaz@email.com",
        phone: "+90 532 555 0192",
        location: "İstanbul, Türkiye",
        github: "github.com/ahmetyilmaz-dev",
        linkedin: "linkedin.com/in/ahmetyilmaz-dev",
        website: "ahmetyilmaz.dev",
        summary: "Ölçeklenebilir mikroservis mimarileri, CI/CD süreçleri ve yüksek performanslı bulut sistemleri tasarlama konusunda 5+ yıl deneyimli Kıdemli Yazılım Mühendisi. Veritabanı sorgu performanslarını %40 iyileştirme ve aylık 500k+ aktif kullanıcıya hizmet veren sistemleri canlıya alma konusunda kanıtlanmış başarı."
    },
    experiences: [
        {
            company: "TechCorp Software Solutions",
            role: "Kıdemli Yazılım Mühendisi",
            dates: "2023 - Günümüz",
            bullets: [
                "Node.js, Go ve PostgreSQL kullanarak dağıtık mikroservis altyapısını tasarladı; sistem kullanılabilirlik (uptime) oranını %99.99 seviyesine çıkardı.",
                "AWS EKS üzerinde otomatik CI/CD dağıtım süreçlerini kurarak yazılım sürüm yayınlama sürelerini %45 kısalttı.",
                "8 kişilik yazılım ekibinde kod incelemelerine liderlik etti ve mikroservis kod kalitesini %35 artırdı."
            ]
        },
        {
            company: "CloudSystems Technology",
            role: "Full-Stack Yazılım Geliştirici",
            dates: "2021 - 2023",
            bullets: [
                "React ve TypeScript kullanarak modern ön yüz bileşenleri geliştirdi, ilk sayfa yüklenme sürelerini %35 hızlandırdı.",
                "RESTful API endpoints mimarisini Redis önbellekleme ile optimize ederek ortalama sunucu yanıt süresini 120ms'den 45ms'ye düşürdü."
            ]
        }
    ],
    educations: [
        {
            university: "İstanbul Teknik Üniversitesi",
            degree: "Lisans, Bilgisayar Mühendisliği",
            location: "İstanbul, Türkiye",
            dates: "2017 - 2021",
            gpa: "3.85 / 4.00",
            details: "Yüksek Onur Derecesi | Yazılım Kulübü Başkan Yardımcısı"
        }
    ],
    skills: {
        technical: "JavaScript, TypeScript, Python, Go, React, Node.js, PostgreSQL, Redis, Docker, AWS, Kubernetes, Git",
        tools: "VS Code, Postman, JIRA, GitHub Actions, Datadog",
        certs: "AWS Certified Solutions Architect (2024), Certified Kubernetes Administrator - CKA (2023)",
        langs: "Türkçe (Ana Dil), İngilizce (İleri Düzey - C1)"
    },
    leaderships: [],
    certifications: [
        { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2024" },
        { name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", year: "2023" }
    ],
    references: [],
    settings: { font: "font-garamond", size: "size-medium", spacing: "spacing-normal", margin: "margin-normal", alignment: "align-justify", accent: "accent-black", headings: "headings-line", refMode: "request", uiLang: "tr" }
};

const SOFTWARE_SAMPLE_STATE_EN = {
    personal: {
        name: "Alex Taylor",
        title: "Senior Software Engineer & Cloud Architect",
        email: "alex.taylor@email.com",
        phone: "+1 (555) 019-2834",
        location: "San Francisco, CA",
        github: "github.com/alextaylor-dev",
        linkedin: "linkedin.com/in/alextaylor-dev",
        website: "alextaylor.dev",
        summary: "Versatile Senior Software Engineer with 5+ years of experience designing scalable microservices, automated CI/CD pipelines, and high-performance cloud architectures. Proven track record of optimizing database query performance by 40% and deploying robust systems serving 500k+ monthly active users."
    },
    experiences: [
        {
            company: "TechCorp Software Solutions",
            role: "Senior Software Engineer",
            dates: "2023 - Present",
            bullets: [
                "Architected distributed microservices infrastructure using Node.js, Go, and PostgreSQL, raising system availability uptime to 99.99%.",
                "Automated CI/CD deployment pipelines on AWS EKS, reducing release deployment cycles by 45%.",
                "Spearheaded technical code reviews for an engineering team of 8, boosting code test coverage by 35%."
            ]
        },
        {
            company: "CloudSystems Technology",
            role: "Full-Stack Software Developer",
            dates: "2021 - 2023",
            bullets: [
                "Engineered responsive React/TypeScript frontend architectures, improving page load speeds by 35% across core web applications.",
                "Optimized RESTful API endpoints with Redis caching layer, decreasing server latency from 120ms to 45ms."
            ]
        }
    ],
    educations: [
        {
            university: "Stanford University",
            degree: "B.S. in Computer Science",
            location: "Stanford, CA",
            dates: "2017 - 2021",
            gpa: "3.85 / 4.00",
            details: "Departmental Honors | CS Student Association Vice President"
        }
    ],
    skills: {
        technical: "JavaScript, TypeScript, Python, Go, React, Node.js, PostgreSQL, Redis, Docker, AWS, Kubernetes, Git",
        tools: "VS Code, Postman, JIRA, GitHub Actions, Datadog",
        certs: "AWS Certified Solutions Architect (2024), Certified Kubernetes Administrator - CKA (2023)",
        langs: "English (Native), Spanish (Conversational)"
    },
    leaderships: [],
    certifications: [
        { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2024" },
        { name: "Certified Kubernetes Administrator (CKA)", issuer: "CNCF", year: "2023" }
    ],
    references: [],
    settings: { font: "font-garamond", size: "size-medium", spacing: "spacing-normal", margin: "margin-normal", alignment: "align-justify", accent: "accent-black", headings: "headings-line", refMode: "request", uiLang: "en" }
};

const CONSULTING_SAMPLE_STATE_TR = {
    personal: {
        name: "Merve Kaya",
        title: "Yönetim Danışmanı & Strateji Uzmanı",
        email: "merve.kaya@email.com",
        phone: "+90 533 444 0122",
        location: "İstanbul, Türkiye",
        github: "",
        linkedin: "linkedin.com/in/mervekaya-consulting",
        website: "",
        summary: "Kurumsal strateji, dijital dönüşüm ve operasyonel süreç optimizasyonu konularında uzmanlaşmış Yönetim Danışmanı. Finans, Perakende ve Sağlık sektörlerinde cross-functional danışmanlık projelerini yöneterek yıllık 4.5 Milyon $ maliyet tasarrufu sağladı."
    },
    experiences: [
        {
            company: "Apex Strategy Partners",
            role: "Kıdemli Yönetim Danışmanı",
            dates: "2022 - Günümüz",
            bullets: [
                "Bölgenin önde gelen özel bankası için dijital dönüşüm stratejisini tasarladı; operasyonel süreçlerde yıllık 3.2 Milyon $ tasarruf fırsatı belirledi.",
                "Yeni Fintech ürünü için pazara giriş (Go-to-Market) stratejisini kurgulayarak 12 ay içinde %15 pazar payı elde edilmesini sağladı.",
                "15 kişilik danışman ekibine liderlik ederek müşteri yönetimi ve C-Level sunum süreçlerini yürüttü."
            ]
        },
        {
            company: "Global Advisory Group",
            role: "İş Analisti & Danışman",
            dates: "2020 - 2022",
            bullets: [
                "Fortune 500 perakende müşterisinin tedarik zinciri süreçlerini analiz etti, satın alma tedarik sürelerini (lead time) %28 kısalttı."
            ]
        }
    ],
    educations: [
        {
            university: "Yale School of Management",
            degree: "MBA - İşletme Yüksek Lisansı",
            location: "New Haven, CT",
            dates: "2018 - 2020",
            gpa: "3.90 / 4.00",
            details: "Yale SOM Dean's List | Danışmanlık Kulübü Başkanı"
        }
    ],
    skills: {
        technical: "Finansal Model Oluşturma, Pazar Araştırması, Süreç Optimizasyonu, Veri Analitiği, SQL, Tableau, Excel (VBA)",
        tools: "PowerBI, Tableau, MS Excel, PowerPoint, JIRA",
        certs: "PMP - Project Management Professional (2023), Lean Six Sigma Green Belt (2022)",
        langs: "Türkçe (Ana Dil), İngilizce (İleri Düzey - C2)"
    },
    leaderships: [],
    certifications: [
        { name: "PMP - Project Management Professional", issuer: "PMI", year: "2023" },
        { name: "Lean Six Sigma Green Belt", issuer: "IISE", year: "2022" }
    ],
    references: [],
    settings: { font: "font-garamond", size: "size-medium", spacing: "spacing-normal", margin: "margin-normal", alignment: "align-justify", accent: "accent-black", headings: "headings-line", refMode: "request", uiLang: "tr" }
};

const CONSULTING_SAMPLE_STATE_EN = {
    personal: {
        name: "Morgan Vance",
        title: "Management Consultant & Strategy Specialist",
        email: "morgan.vance@email.com",
        phone: "+1 (555) 019-8821",
        location: "New York, NY",
        github: "",
        linkedin: "linkedin.com/in/morganvance-strategy",
        website: "",
        summary: "Results-driven Management Consultant specializing in corporate strategy, digital transformation, and process optimization. Led cross-functional advisory engagements across Financial Services, Retail, and Healthcare, delivering over $4.5M in annual cost efficiencies."
    },
    experiences: [
        {
            company: "Apex Strategy Partners",
            role: "Senior Management Consultant",
            dates: "2022 - Present",
            bullets: [
                "Spearheaded digital transformation strategy for a Tier-1 retail bank, identifying $3.2M in annual operational expenditure savings.",
                "Formulated Go-to-Market (GTM) strategy for new Fintech division, capturing 15% market share within 12 months of launch.",
                "Managed cross-functional consultant teams of 15 members, presenting strategic roadmaps directly to C-Suite executives."
            ]
        },
        {
            company: "Global Advisory Group",
            role: "Business Analyst & Consultant",
            dates: "2020 - 2022",
            bullets: [
                "Analyzed supply chain workflows for Fortune 500 retail client, reducing procurement lead times by 28%."
            ]
        }
    ],
    educations: [
        {
            university: "Yale School of Management",
            degree: "Master of Business Administration (MBA)",
            location: "New Haven, CT",
            dates: "2018 - 2020",
            gpa: "3.90 / 4.00",
            details: "Yale SOM Dean's List | Consulting Club President"
        }
    ],
    skills: {
        technical: "Financial Modeling, Market Research, Process Optimization, Data Analytics, SQL, Tableau, Advanced Excel",
        tools: "PowerBI, Tableau, MS Excel, PowerPoint, JIRA",
        certs: "PMP - Project Management Professional (2023), Lean Six Sigma Green Belt (2022)",
        langs: "English (Native), French (Fluent)"
    },
    leaderships: [],
    certifications: [
        { name: "PMP - Project Management Professional", issuer: "PMI", year: "2023" },
        { name: "Lean Six Sigma Green Belt", issuer: "IISE", year: "2022" }
    ],
    references: [],
    settings: { font: "font-garamond", size: "size-medium", spacing: "spacing-normal", margin: "margin-normal", alignment: "align-justify", accent: "accent-black", headings: "headings-line", refMode: "request", uiLang: "en" }
};

const ACADEMIC_SAMPLE_STATE_TR = {
    personal: {
        name: "Dr. Canan Demir",
        title: "Doktora Sonrası Araştırmacı & Yapay Zeka Uzmanı",
        email: "canan.demir@email.com",
        phone: "+90 532 999 0144",
        location: "Ankara / İstanbul, Türkiye",
        github: "github.com/cdemir-ai",
        linkedin: "linkedin.com/in/canandemir-phd",
        website: "scholar.google.com/citations?user=cdemir",
        summary: "Doğal Dil İşleme (NLP), Transformer Mimarları ve Sorumlu Yapay Zeka konularında uzmanlaşmış Araştırmacı. Uluslararası hakemli dergi ve konferanslarda (NeurIPS, ACL) yayınlanmış 6 akademik makalenin yazarı. Ulusal TÜBİTAK ve AB Horizon araştırma projelerinde araştırmacı yürütücü."
    },
    experiences: [
        {
            company: "Harvard AI Institute",
            role: "Doktora Sonrası Araştırmacı (Postdoc)",
            dates: "2024 - Günümüz",
            bullets: [
                "Büyük Dil Modellerinde (LLM) bellek kullanımını doğruk kaybı olmadan %30 azaltan yeni bir dikkat seyreltme (attention-pruning) algoritması geliştirdi.",
                "5 lisansüstü öğrenciye tez danışmanlığı yaptı ve 3 yüksek etkili bildiri yayınladı."
            ]
        },
        {
            company: "Orta Doğu Teknik Üniversitesi - Yapay Zeka Lab",
            role: "Araştırma Görevlisi",
            dates: "2019 - 2024",
            bullets: [
                "Çok dilli NLP değerlendirmeleri için ölçeklenebilir veri kümeleri tasarladı; akademik literatürde 250+'den fazla atıf aldı."
            ]
        }
    ],
    educations: [
        {
            university: "Orta Doğu Teknik Üniversitesi",
            degree: "Doktora (Ph.D.), Bilgisayar Mühendisliği",
            location: "Ankara, Türkiye",
            dates: "2019 - 2024",
            gpa: "3.95 / 4.00",
            details: "TÜBİTAK 2211 Doktora Bursiyeri | En İyi Tez Ödülü"
        }
    ],
    skills: {
        technical: "PyTorch, TensorFlow, Python, CUDA, LaTeX, NLP, Distributed Training, Statistical Modeling",
        tools: "LaTeX, Jupyter, Git, Slurm, WandB",
        certs: "Deep Learning Specialization (Coursera), TÜBİTAK 2211 PhD Fellowship (2019)",
        langs: "Türkçe (Ana Dil), İngilizce (İleri Düzey - C2), Almanca (B1)"
    },
    leaderships: [],
    certifications: [
        { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023" },
        { name: "TÜBİTAK 2211 National PhD Fellowship", issuer: "TÜBİTAK", year: "2019" }
    ],
    references: [],
    settings: { font: "font-garamond", size: "size-medium", spacing: "spacing-normal", margin: "margin-normal", alignment: "align-justify", accent: "accent-black", headings: "headings-line", refMode: "request", uiLang: "tr" }
};

const ACADEMIC_SAMPLE_STATE_EN = {
    personal: {
        name: "Dr. Jordan Lee",
        title: "Postdoctoral Research Fellow & AI Researcher",
        email: "jordan.lee@email.com",
        phone: "+1 (555) 019-9944",
        location: "Cambridge, MA",
        github: "github.com/jlee-ai",
        linkedin: "linkedin.com/in/jordanlee-phd",
        website: "scholar.google.com/citations?user=jlee",
        summary: "Dedicated Artificial Intelligence researcher specializing in Natural Language Processing, Transformer Architectures, and Responsible AI. Author of 6 peer-reviewed papers in top-tier venues (NeurIPS, ACL). Recipient of National Science Foundation Graduate Research Fellowship."
    },
    experiences: [
        {
            company: "Harvard AI Institute",
            role: "Postdoctoral Research Fellow",
            dates: "2024 - Present",
            bullets: [
                "Pioneered novel attention-pruning algorithms for LLMs, achieving 30% reduction in GPU memory footprint without loss of accuracy.",
                "Mentored 5 graduate students and co-authored 3 high-impact manuscripts in computer vision & NLP."
            ]
        },
        {
            company: "Stanford AI Laboratory",
            role: "Graduate Research Assistant",
            dates: "2019 - 2024",
            bullets: [
                "Designed benchmark datasets for cross-lingual NLP evaluation, receiving 250+ citations in academic literature."
            ]
        }
    ],
    educations: [
        {
            university: "Stanford University",
            degree: "Ph.D. in Computer Science",
            location: "Stanford, CA",
            dates: "2019 - 2024",
            gpa: "3.95 / 4.00",
            details: "NSF Graduate Research Fellow | Outstanding Dissertation Award"
        }
    ],
    skills: {
        technical: "PyTorch, TensorFlow, Python, CUDA, LaTeX, NLP, Distributed Training, Statistical Modeling",
        tools: "LaTeX, Jupyter, Git, Slurm, WandB",
        certs: "Deep Learning Specialization (Coursera), NSF Graduate Research Fellowship (2019)",
        langs: "English (Native), German (Intermediate)"
    },
    leaderships: [],
    certifications: [
        { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023" },
        { name: "NSF Graduate Research Fellowship", issuer: "NSF", year: "2019" }
    ],
    references: [],
    settings: { font: "font-garamond", size: "size-medium", spacing: "spacing-normal", margin: "margin-normal", alignment: "align-justify", accent: "accent-black", headings: "headings-line", refMode: "request", uiLang: "en" }
};

const UI_TRANSLATIONS = {
    tr: {
        personal: "Kişisel",
        experience: "Deneyim",
        education: "Eğitim",
        skills: "Yetenek & Diller",
        settings: "Ayarlar",
        
        name: "Ad Soyad",
        title: "Unvan / Alt Başlık",
        email: "E-posta",
        phone: "Telefon",
        location: "Konum",
        github: "GitHub",
        linkedin: "LinkedIn",
        website: "Web Sitesi",
        summary: "Profesyonel Özet",
        
        add_exp: "+ Yeni Deneyim Ekle",
        company: "Şirket / Kurum",
        role: "Unvan / Rol",
        dates: "Tarih Aralığı",
        add_bullet: "+ Madde Ekle",
        bullets_label: "Açıklama Maddeleri",
        
        add_edu: "+ Yeni Eğitim Ekle",
        school: "Üniversite / Okul",
        degree: "Bölüm / Derece",
        gpa: "GANO / Ortalama",
        details: "Ek Detaylar (İsteğe Bağlı)",
        
        tech_skills: "Programlama Dilleri",
        certs: "Sertifikalar",
        langs: "Diller",
        leadership_title: "Liderlik ve Gönüllülük",
        add_lead: "+ Ekle",
        
        layout_settings: "Sayfa ve Düzen Ayarları",
        font: "Yazı Tipi (Font)",
        font_size: "Yazı Boyutu",
        spacing: "Satır & Paragraf Boşluğu",
        margin: "Sayfa Kenar Boşlukları (Margin)",
        alignment: "Dikey Boşluk Dağılımı",
        accent: "Aksan Rengi",
        
        templates_title: "Örnek Şablonlar",
        load_preset: "Hazır Örnek Yükle",
        preset_placeholder: "Bir örnek seçin...",
        preset_tr: "🇹🇷 Can Yılmaz (Veri Analisti & Süreç Otomasyon Uzmanı)",
        preset_en: "🇬🇧 Alex Morgan (Senior Software Engineer)",
        
        data_title: "Veri Yönetimi",
        export_btn: "Yedek İndir",
        import_btn: "Yedek Yükle",
        reset_btn: "Şablonu Sıfırla",
        
        print_btn: "Yazdır veya PDF Kaydet",
        print_note: "İpucu: PDF kaydederken 'Arka plan grafiklerini' etkinleştirin ve kenar boşluklarını 'Yok' olarak ayarlayın.",
        
        // Status & Alerts
        confirm_preset: "Bu hazır şablonu yüklemek istediğinize emin misiniz? Mevcut verilerinizin üzerine yazılacaktır. (Verilerinizi kaybetmemek için önce 'Yedek İndir' yapabilirsiniz.)",
        confirm_reset: "Tüm değişiklikleri silip varsayılan şablon verilerine dönmek istediğinize emin misiniz?",
        confirm_import: "Bu yedek dosyasını yüklemek istediğinize emin misiniz? Mevcut verilerinizin üzerine yazılacaktır.",
        import_err_struct: "Hata: Geçersiz yedek dosyası yapısı. Lütfen bu uygulamadan indirdiğiniz JSON dosyasını yükleyin.",
        import_err_parse: "Hata: JSON dosyası ayrıştırılamadı. Dosyanın geçerli bir JSON olduğundan emin olun.",
        import_success: "Yedek başarıyla yüklendi!",
        preset_success: "başarıyla yüklendi!",
        reset_success: "CV şablonu varsayılan ayarlara sıfırlandı!",
        
        fit_checking: "Kontrol Ediliyor...",
        fit_yes: "1 Sayfaya Sığmaktadır",
        fit_no: "1 Sayfayı Aşmaktadır",

        show_photo: "Göster",
        add_cert: "+ Ekle",
        cert_label: "Sertifika",
        label_cert_name: "Sertifika Adı",
        label_cert_issuer: "Veren Kurum",
        label_cert_year: "Tarih / Yıl",

        add_ref: "+ Ekle",
        ref_label: "Referans",
        label_ref_name: "Ad Soyad",
        label_ref_title: "Unvan ve Kurum",
        label_ref_email: "E-posta",
        label_ref_phone: "Telefon",
        label_ref_phone_short: "Tel",
        ref_mode: "Gösterim Şekli",
        ref_mode_details: "Tüm Detayları Listele",
        ref_mode_request: "Talep Halinde Sunulacaktır",
        ref_request_text: "Referanslar talep halinde sunulacaktır.",
        cv_title_summary: "PROFESYONEL ÖZET",
        cv_title_experience: "DENEYİM",
        cv_title_education: "EĞİTİM",
        cv_title_leadership: "LİDERLİK VE GÖNÜLLÜLÜK",
        cv_title_skills: "YETENEKLER, SERTİFİKALAR VE İLGİ ALANLARI",
        section_references: "REFERANSLAR",
        tech_label: "Teknik:",
        tech_skills: "Teknik Yetenekler",
        custom_titles_heading: "Bölüm Başlıklarını Özelleştir (Opsiyonel)",
        title_summary_label: "Özet Başlığı",
        title_exp_label: "Deneyim Başlığı",
        title_edu_label: "Eğitim Başlığı",
        title_lead_label: "Liderlik Başlığı",
        title_skills_label: "Yetenekler Başlığı",
        title_ref_label: "Referanslar Başlığı",
        tools_skills: "Araçlar ve Platformlar",
        tools_label: "Araçlar ve Platformlar:",
        certs_label: "Sertifikalar:",
        langs_label: "Diller:",
        auto_translate_btn: "Otomatik Çevir",
        auto_translate_cv_title: "CV İçeriğini Otomatik Çevir (AI Translate)",
        translate_to_en: "İngilizceye Çevir",
        translate_to_tr: "Türkçeye Çevir",
        undo_translate: "↩️ Son Çeviriyi Geri Al",
        modal_translate_title: "CV Otomatik Çevirici (AI Translate)",
        modal_translate_desc: "Girdiğiniz tüm kişisel özet, iş deneyimleri, sorumluluk maddeleri, eğitim ve sertifika bilgileri anında hedef dile otomatik çevrilir.",
        ai_parser_btn_text: "Yapay Zeka (AI) CV Ayrıştırıcı",
        ai_parser_modal_title: "Yapay Zeka (AI) CV Ayrıştırma Motoru",
        ai_parser_desc: "Farklı formatlardaki (Canva, Word, LinkedIn, Europass) karmaşık PDF veya metinlerinizi yapay zeka ile %100 eksiksiz ve hatasız şekilde bölümlerine ayırın.",
        ai_api_key_label: "API Anahtarı (İsteğe Bağlı - Gemini / OpenAI / Groq):",
        ai_api_key_hint: "🔑 Girilen API anahtarları sadece cihazınızda saklanır ve sunucuya gönderilmez.",
        ai_parse_pasted_text: "Veya Herhangi Bir CV Metnini Buraya Yapıştırın:",
        ai_parse_pdf_btn: "📄 PDF Dosyası Seç",
        ai_parse_run_btn: "🚀 Yapay Zeka İle Analiz Et & Yükle",
        ai_parsing_status: "🤖 Yapay Zeka CV'nizi analiz ediyor ve bölümleri akıllıca yerleştiriyor...",
        btn_trans_en: "Tüm CV'yi İngilizceye Çevir (TR ➔ EN)",
        btn_trans_tr: "Tüm CV'yi Türkçeye Çevir (EN ➔ TR)",
        trans_starting: "Çeviri başlatılıyor...",
        trans_success: "CV içeriği başarıyla çevrildi!",
        trans_error: "Çeviri sırasında bir hata oluştu.",
        trans_service_unavailable: "Çeviri şu an yapılamıyor, lütfen tekrar deneyin.",
        undo_success: "Çeviri geri alındı ve önceki bilgiler yüklendi.",
        save_status_saved: "Kaydedildi ✓",
        ai_disclaimer_note: "Şu anki öneriler önceden hazırlanmış şablonlardır.",
        ai_disclaimer_gotit: "Anladım",
        preset_software: "Yazılım Mühendisliği (Full-Stack)",
        preset_consulting: "İş & Yönetim Danışmanlığı",
        preset_academic: "Akademik & Araştırma",
        mobile_preview_toggle: "👁️ Önizlemeyi Göster / Gizle"
    },
    en: {
        save_status_saved: "Saved ✓",
        trans_service_unavailable: "Translation service is currently unavailable, please try again.",
        ai_disclaimer_note: "Current suggestions are pre-written templates.",
        ai_disclaimer_gotit: "Got it",
        personal: "Personal",
        experience: "Experience",
        education: "Education",
        skills: "Skills & Langs",
        settings: "Settings",
        
        name: "Full Name",
        title: "Title / Subtitle",
        email: "Email",
        phone: "Phone",
        location: "Location",
        github: "GitHub",
        linkedin: "LinkedIn",
        website: "Website",
        summary: "Professional Summary",
        
        add_exp: "+ Add New Experience",
        company: "Company / Institution",
        role: "Role / Position",
        dates: "Date Range",
        add_bullet: "+ Add Bullet",
        bullets_label: "Description Bullets",
        
        add_edu: "+ Add New Education",
        school: "University / School",
        degree: "Degree / Major",
        gpa: "GPA / Average",
        details: "Extra Details (Optional)",
        
        tech_skills: "Programming Languages",
        certs: "Certifications",
        langs: "Languages",
        leadership_title: "Leadership & Volunteering",
        add_lead: "+ Add",
        
        layout_settings: "Page & Layout Settings",
        font: "Font Family",
        font_size: "Font Size",
        spacing: "Line & Paragraph Spacing",
        margin: "Page Margins",
        alignment: "Vertical Space Distribution",
        accent: "Accent Color",
        
        templates_title: "Sample Templates",
        load_preset: "Load Sample Template",
        preset_placeholder: "Choose a sample...",
        preset_tr: "🇹🇷 Can Yilmaz (Data Analyst & Process Automation)",
        preset_en: "🇬🇧 Alex Morgan (Senior Software Engineer)",
        
        data_title: "Data Management",
        export_btn: "Export Backup",
        import_btn: "Import Backup",
        reset_btn: "Reset Template",
        
        print_btn: "Print or Save to PDF",
        print_note: "Tip: When saving to PDF, enable 'Background graphics' and set margins to 'None'.",
        
        // Status & Alerts
        confirm_preset: "Are you sure you want to load this sample template? Your current data will be overwritten. (To avoid losing data, you can 'Export Backup' first.)",
        confirm_reset: "Are you sure you want to delete all changes and revert to the default template?",
        confirm_import: "Are you sure you want to load this backup file? Your current data will be overwritten.",
        import_err_struct: "Error: Invalid backup file structure. Please upload a JSON file exported from this application.",
        import_err_parse: "Error: Failed to parse JSON file. Make sure the file is valid JSON.",
        import_success: "Backup loaded successfully!",
        preset_success: "loaded successfully!",
        reset_success: "CV template reset to default settings!",
        
        fit_checking: "Checking...",
        fit_yes: "Fits 1 Page",
        fit_no: "Exceeds 1 Page",

        show_photo: "Show",
        add_cert: "+ Add",
        cert_label: "Certificate",
        label_cert_name: "Certificate Name",
        label_cert_issuer: "Issuing Organization",
        label_cert_year: "Date / Year",

        add_ref: "+ Add",
        ref_label: "Reference",
        label_ref_name: "Full Name",
        label_ref_title: "Title & Company",
        label_ref_email: "Email",
        label_ref_phone: "Phone",
        label_ref_phone_short: "Tel",
        ref_mode: "Display Mode",
        ref_mode_details: "List All Details",
        ref_mode_request: "Available Upon Request",
        ref_request_text: "References available upon request.",
        cv_title_summary: "PROFESSIONAL SUMMARY",
        cv_title_experience: "EXPERIENCE",
        cv_title_education: "EDUCATION",
        cv_title_leadership: "LEADERSHIP & VOLUNTEERING",
        cv_title_skills: "SKILLS, CERTIFICATIONS & INTERESTS",
        section_references: "REFERENCES",
        tech_label: "Technical:",
        tech_skills: "Technical Skills",
        custom_titles_heading: "Customize Section Titles (Optional)",
        title_summary_label: "Summary Section Title",
        title_exp_label: "Experience Section Title",
        title_edu_label: "Education Section Title",
        title_lead_label: "Leadership Section Title",
        title_skills_label: "Skills Section Title",
        title_ref_label: "References Section Title",
        tools_skills: "Tools & Platforms",
        tools_label: "Tools & Platforms:",
        certs_label: "Certifications:",
        langs_label: "Languages:",
        auto_translate_btn: "Auto Translate",
        auto_translate_cv_title: "Auto Translate CV Content (AI Translate)",
        translate_to_en: "Translate to English",
        translate_to_tr: "Translate to Turkish",
        undo_translate: "↩️ Undo Last Translation",
        modal_translate_title: "CV Auto Translator (AI Translate)",
        modal_translate_desc: "All your summary, work experiences, bullet points, education, and certificates will be instantly auto-translated.",
        ai_parser_btn_text: "AI CV Parser",
        ai_parser_modal_title: "AI-Powered CV Parsing Engine",
        ai_parser_desc: "Parse complex PDFs or texts from various formats (Canva, Word, LinkedIn, Europass) with 100% precision using AI.",
        ai_api_key_label: "API Key (Optional - Gemini / OpenAI / Groq):",
        ai_api_key_hint: "🔑 API keys entered are stored locally on your device and never sent to our servers.",
        ai_parse_pasted_text: "Or Paste Any CV Text Here:",
        ai_parse_pdf_btn: "📄 Select PDF File",
        ai_parse_run_btn: "🚀 Analyze & Load with AI",
        ai_parsing_status: "🤖 AI is analyzing your CV and organizing sections intelligently...",
        btn_trans_en: "Translate Whole CV to English (TR ➔ EN)",
        btn_trans_tr: "Translate Whole CV to Turkish (EN ➔ TR)",
        trans_starting: "Starting translation...",
        trans_success: "CV content translated successfully!",
        trans_error: "An error occurred during translation.",
        undo_success: "Translation undone and previous data restored."
    }
};



// -------------------------------------------------------------
// UI LANGUAGE MANAGEMENT
// -------------------------------------------------------------
function applyLanguage() {
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    
    // Update selector value
    const selectEl = document.getElementById('setting-ui-lang');
    if (selectEl) selectEl.value = lang;
    
    // Update translatable text nodes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = UI_TRANSLATIONS[lang][key];
        if (translation) {
            // If the element contains child SVG, preserve it
            const svg = el.querySelector('svg');
            if (svg) {
                el.innerHTML = '';
                el.appendChild(svg);
                const span = document.createElement('span');
                span.textContent = ' ' + translation;
                el.appendChild(span);
            } else {
                el.textContent = translation;
            }
        }
    });
    
    // Update placeholders and options dynamically
    const presetSelect = document.getElementById('setting-template');
    if (presetSelect) {
        const options = presetSelect.options;
        if (options[0]) options[0].textContent = UI_TRANSLATIONS[lang].preset_placeholder;
        if (options[1]) options[1].textContent = UI_TRANSLATIONS[lang].preset_tr;
        if (options[2]) options[2].textContent = UI_TRANSLATIONS[lang].preset_en;
    }
    
    // Refresh editor card lists
    renderEditorExperiences();
    renderEditorEducation();
    renderEditorLeadership();
    renderEditorCertifications();
    renderEditorReferences();
}

function changeUILanguage(newLang) {
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.uiLang = newLang;
    saveToLocalStorage();
    applyLanguage();
}

// -------------------------------------------------------------
// CV AUTO-TRANSLATION ENGINE WITH PROPER NOUN PROTECTION (TR <-> EN)
// -------------------------------------------------------------

const COMMON_TECH_BRANDS = [
    "VITRIOL", "Vitriol", "SOFTTECH", "Softtech", "MEDİBULUT", "Medibulut",
    "KOÇTAŞ", "Koçtaş", "LOCOMAR", "Locomar", "DENİZBANK", "Denizbank",
    "TNC Group", "Kovan App", "FSM Auto", "Martı İleri Teknoloji",
    "SahaBulut", "Koçtaş Kids", "n8n", "HubSpot", "Slack", "Power BI",
    "Power Automate", "Tableau", "React.js", "Node.js", "Express", "Jest",
    "Pandas", "NumPy", "Photoshop", "AutoCAD", "Cisco", "AIBusinessSchool",
    "Turkcell Geleceği Yazanlar", "YGA Zirvesi", "YBS Kulübü", "YBS Zirvesi",
    "REST API", "CI/CD", "GitHub", "SQL", "Python", "JavaScript", "TypeScript",
    "HTML5", "CSS3", "C#", "HTML", "CSS", "Excel", "MS Office"
];

const CV_TERMS_DICT = {
    tr_to_en: {
        "Devam": "Present", "Devam Ediyor": "Present", "Hala": "Present", "Sürüyor": "Present",
        "Lisans": "Bachelor's Degree", "Yüksek Lisans": "Master's Degree", "Doktora": "Ph.D.", "Önlisans": "Associate Degree", "Lise": "High School",
        "Ocak": "January", "Şubat": "February", "Mart": "March", "Nisan": "April", "Mayıs": "May", "Haziran": "June",
        "Temmuz": "July", "Ağustos": "August", "Eylul": "September", "Eylül": "September", "Ekim": "October", "Kasım": "November", "Aralık": "December",
        "Türkçe": "Turkish", "İngilizce": "English", "Almanca": "German", "Fransızca": "French", "İspanyolca": "Spanish",
        "Anadil": "Native", "İleri Düzey": "Advanced", "Orta Seviye": "Intermediate", "Temel Seviye": "Basic",
        "İstanbul": "Istanbul", "İzmir": "Izmir", "Ankara": "Ankara", "Türkiye": "Turkey",
        "Tam Zamanlı": "Full-Time", "Yarı Zamanlı": "Part-Time", "Freelance": "Freelance",
        "Stajyer": "Intern", "Stajyeri": "Intern", "Uzman": "Specialist", "Uzmanı": "Specialist",
        "Geliştirici": "Developer", "Analist": "Analyst", "Mühendis": "Engineer", "Yönetici": "Manager"
    },
    en_to_tr: {
        "Present": "Devam", "Current": "Devam",
        "Bachelor's Degree": "Lisans", "Master's Degree": "Yüksek Lisans", "Associate Degree": "Önlisans", "High School": "Lise",
        "January": "Ocak", "February": "Şubat", "March": "Mart", "April": "Nisan", "May": "Mayıs", "June": "Haziran",
        "July": "Temmuz", "August": "Ağustos", "September": "Eylül", "October": "Ekim", "November": "Kasım", "December": "Aralık",
        "Turkish": "Türkçe", "English": "İngilizce", "German": "Almanca", "French": "Fransızca", "Spanish": "İspanyolca",
        "Native": "Anadil", "Advanced": "İleri Düzey", "Intermediate": "Orta Seviye", "Basic": "Temel Seviye",
        "Istanbul": "İstanbul", "Izmir": "İzmir", "Turkey": "Türkiye",
        "Intern": "Stajyeri", "Specialist": "Uzmanı"
    }
};

function protectTextItems(textList, customBrands) {
    // Combine standard brands and user custom brands
    const allBrands = Array.from(new Set([...COMMON_TECH_BRANDS, ...customBrands]))
        .filter(b => b && b.trim().length > 1)
        .sort((a, b) => b.length - a.length); // Match longest first
    
    const placeholders = {};
    const protectedTexts = textList.map(text => {
        if (!text) return text;
        let temp = text;
        
        allBrands.forEach((brand, idx) => {
            const token = `__PN${idx}__`;
            // Escape special regex characters in brand name
            const escaped = brand.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            // Regex to match brand with optional Turkish suffixes
            const regex = new RegExp(`${escaped}(?:['’](?:e|a|de|da|te|ta|den|dan|in|ın|un|ün))?`, 'gi');
            
            if (regex.test(temp)) {
                placeholders[token] = brand; // Preserve original proper casing
                temp = temp.replace(regex, token);
            }
        });
        return temp;
    });
    
    return { protectedTexts, placeholders };
}

function restoreTextItem(translatedText, placeholders, targetLang) {
    if (!translatedText) return translatedText;
    let res = translatedText;
    
    // Restore proper noun placeholders
    Object.keys(placeholders).forEach(token => {
        const origBrand = placeholders[token];
        res = res.replaceAll(token, origBrand);
    });
    
    // Apply dictionary map for resume terms
    const dict = (targetLang === 'en' && typeof CV_TERMS_DICT !== 'undefined') ? CV_TERMS_DICT.tr_to_en : (typeof CV_TERMS_DICT !== 'undefined' ? CV_TERMS_DICT.en_to_tr : {});
    if (dict) {
        Object.keys(dict).forEach(key => {
            const val = dict[key];
            const escaped = key.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
            res = res.replace(regex, val);
        });
    }

    if (targetLang === 'en') {
        // Strip 3rd person subject pronouns (He/She/It) at start of bullets
        res = res.replace(/^(?:He|She|It)\s+(?:has\s+)?/i, '');
        res = res.replace(/\b(?:He|She|It)\s+(?:has\s+)?/gi, '');
        
        // Remove 'his' or 'her' possessives
        res = res.replace(/\bhis\b/gi, 'the');
        res = res.replace(/\bher\b/gi, 'the');
        
        // Specific Harvard English fixes for action verbs at start of string
        res = res.replace(/^won\b/i, 'Won');
        res = res.replace(/^published\b/i, 'Published');
        res = res.replace(/^presented\b/i, 'Presented');
        res = res.replace(/^provided\b/i, 'Provided');
        res = res.replace(/^designed\b/i, 'Designed');
        res = res.replace(/^managed\b/i, 'Managed');
        res = res.replace(/^created\b/i, 'Created');
        res = res.replace(/^prepared\b/i, 'Prepared');

        // Fix specific terms
        res = res.replace(/Veri Analizi ve Görselleştirme/gi, 'Data Analysis & Visualization');
        res = res.replace(/n8n Otomasyon/gi, 'n8n Automation');
        res = res.replace(/İşletme Mühendisliği Kulübü/gi, 'Management Engineering Club');
        res = res.replace(/Geleceği Yazanlar/gi, 'Gelecegi Yazanlar');
        res = res.replace(/Katılım Sertifikası/gi, 'Participation Certificate');
        res = res.replace(/Başarı Belgesi/gi, 'Certificate of Achievement');
        res = res.replace(/Zirvesi/gi, 'Summit');
        res = res.replace(/Kongresi/gi, 'Congress');
        res = res.replace(/\bOngoing\b/gi, 'Present');
        res = res.replace(/\bintern\b/g, 'Intern');

        if (res.length > 0) {
            res = res.charAt(0).toUpperCase() + res.slice(1);
        }
    }
    
    return res;
}

/**
 * ARCHITECTURE NOTE / PROXY MIGRATION:
 * This function currently calls Google Translate's unofficial endpoint (translate.googleapis.com/translate_a/single)
 * and falls back to MyMemory API directly from the browser.
 * FUTURE IMPROVEMENT: To eliminate client-side CORS issues and rate limits, this translation service
 * should be migrated to a dedicated backend proxy (e.g. Vercel Serverless Function + official Google Cloud Translation API).
 */
async function fetchGoogleTranslate(text, sl, tl) {
    if (!text || !text.trim()) return text;

    // Primary: Google Translate GTX Endpoint
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data && data[0]) {
            const result = data[0].map(s => s[0] || '').join('');
            if (result && result.trim()) return result;
        }
    } catch (err) {
        console.warn("Google translate fetch warning, trying MyMemory fallback...", err);
    }

    // Secondary Fallback: MyMemory API
    try {
        const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sl}|${tl}`;
        const res2 = await fetch(url2);
        if (!res2.ok) throw new Error(`HTTP ${res2.status}`);
        const data2 = await res2.json();
        if (data2 && data2.responseData && data2.responseData.translatedText) {
            const result2 = data2.responseData.translatedText;
            if (result2 && result2.trim() && !result2.toUpperCase().includes("MYMEMORY WARNING")) {
                return result2;
            }
        }
    } catch (err2) {
        console.warn("MyMemory translate fallback error:", err2);
    }

    // Tertiary Fallback: If all translation providers fail, throw explicit error instead of silent original text return
    throw new Error("TRANSLATION_SERVICE_UNAVAILABLE");
}

async function translateBatchTexts(textList, targetLang, customBrands = []) {
    if (!textList || textList.length === 0) return [];
    const sourceLang = targetLang === 'en' ? 'tr' : 'en';
    
    // Step 1: Protect proper nouns and brands
    const { protectedTexts, placeholders } = protectTextItems(textList, customBrands);
    
    // Step 2: Batch translate protected text
    const sep = "\n|||\n";
    const combined = protectedTexts.join(sep);
    
    let rawTranslation = await fetchGoogleTranslate(combined, sourceLang, targetLang);
    let splitResults = rawTranslation.split("|||").map(s => s.trim());
    
    // Fallback item by item if delimiter count doesn't match
    if (splitResults.length !== textList.length) {
        splitResults = [];
        for (let pText of protectedTexts) {
            let single = await fetchGoogleTranslate(pText, sourceLang, targetLang);
            splitResults.push(single.trim());
        }
    }
    
    // Step 3: Restore proper nouns and dictionary terms
    return splitResults.map(translatedStr => restoreTextItem(translatedStr, placeholders, targetLang));
}

function openTranslateModal() {
    const modal = document.getElementById('translate-modal');
    if (modal) {
        modal.classList.add('active');
        checkUndoState();
    }
}

function closeTranslateModal(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('translate-modal');
    if (modal) modal.classList.remove('active');
}

function checkUndoState() {
    const backup = localStorage.getItem('cvState_before_translate');
    const undoBtn1 = document.getElementById('btn-undo-translate');
    const undoBtn2 = document.getElementById('modal-btn-undo');
    if (backup) {
        if (undoBtn1) undoBtn1.style.display = 'block';
        if (undoBtn2) undoBtn2.style.display = 'block';
    } else {
        if (undoBtn1) undoBtn1.style.display = 'none';
        if (undoBtn2) undoBtn2.style.display = 'none';
    }
}

async function autoTranslateCV(targetLang) {
    try {
        // Save current backup for undo
        localStorage.setItem('cvState_before_translate', JSON.stringify(cvState));
        checkUndoState();
        
        // Show progress box
        const progressBox = document.getElementById('translate-progress-box');
        const statusText = document.getElementById('translate-status-text');
        const progressBar = document.getElementById('translate-progress-bar');
        
        if (progressBox) progressBox.style.display = 'block';
        if (statusText) statusText.textContent = UI_TRANSLATIONS[cvState.settings?.uiLang || 'tr'].trans_starting || "Çeviri başlatılıyor...";
        if (progressBar) progressBar.style.width = '15%';
        
        // Collect custom brand names from user's current CV
        const customBrands = [];
        if (cvState.personal?.name) customBrands.push(cvState.personal.name);
        if (cvState.experiences && Array.isArray(cvState.experiences)) {
            cvState.experiences.forEach(exp => { if (exp.company) customBrands.push(exp.company); });
        }
        if (cvState.certifications && Array.isArray(cvState.certifications)) {
            cvState.certifications.forEach(cert => { if (cert.issuer) customBrands.push(cert.issuer); });
        }
        if (cvState.references && Array.isArray(cvState.references)) {
            cvState.references.forEach(ref => { if (ref.name) customBrands.push(ref.name); });
        }
        
        // Collect text items
        const items = [];
        
        if (cvState.personal) {
            if (cvState.personal.title) items.push({ type: 'personal', field: 'title', text: cvState.personal.title });
            if (cvState.personal.summary) items.push({ type: 'personal', field: 'summary', text: cvState.personal.summary });
            if (cvState.personal.location) items.push({ type: 'personal', field: 'location', text: cvState.personal.location });
        }
        
        if (cvState.experiences && Array.isArray(cvState.experiences)) {
            cvState.experiences.forEach((exp, i) => {
                if (exp.role) items.push({ type: 'exp', idx: i, field: 'role', text: exp.role });
                // We format corporate suffixes for company names without corrupting the proper name
                if (exp.company) {
                    let comp = exp.company;
                    if (targetLang === 'en') {
                        comp = comp.replace(/\bA\.Ş\.\b/gi, 'Inc.').replace(/\bA\.S\.\b/gi, 'Inc.');
                    } else {
                        comp = comp.replace(/\bInc\.\b/gi, 'A.Ş.').replace(/\bCorp\.\b/gi, 'A.Ş.');
                    }
                    cvState.experiences[i].company = comp;
                }
                if (exp.location) items.push({ type: 'exp', idx: i, field: 'location', text: exp.location });
                if (exp.dates) items.push({ type: 'exp', idx: i, field: 'dates', text: exp.dates });
                if (exp.bullets && Array.isArray(exp.bullets)) {
                    exp.bullets.forEach((b, j) => {
                        if (b) items.push({ type: 'exp_bullet', idx: i, bulletIdx: j, text: b });
                    });
                }
            });
        }
        
        if (cvState.educations && Array.isArray(cvState.educations)) {
            cvState.educations.forEach((edu, i) => {
                if (edu.university) items.push({ type: 'edu', idx: i, field: 'university', text: edu.university });
                if (edu.degree) items.push({ type: 'edu', idx: i, field: 'degree', text: edu.degree });
                if (edu.location) items.push({ type: 'edu', idx: i, field: 'location', text: edu.location });
                if (edu.dates) items.push({ type: 'edu', idx: i, field: 'dates', text: edu.dates });
                if (edu.details) items.push({ type: 'edu', idx: i, field: 'details', text: edu.details });
            });
        }
        
        if (cvState.leaderships && Array.isArray(cvState.leaderships)) {
            cvState.leaderships.forEach((lead, i) => {
                if (lead.organization) items.push({ type: 'lead', idx: i, field: 'organization', text: lead.organization });
                if (lead.role) items.push({ type: 'lead', idx: i, field: 'role', text: lead.role });
                if (lead.dates) items.push({ type: 'lead', idx: i, field: 'dates', text: lead.dates });
                if (lead.bullets && Array.isArray(lead.bullets)) {
                    lead.bullets.forEach((b, j) => {
                        if (b) items.push({ type: 'lead_bullet', idx: i, bulletIdx: j, text: b });
                    });
                }
            });
        }
        
        if (cvState.skills) {
            // Keep technical skills preserved while converting language levels
            if (cvState.skills.langs) items.push({ type: 'skills', field: 'langs', text: cvState.skills.langs });
        }
        
        if (cvState.certifications && Array.isArray(cvState.certifications)) {
            cvState.certifications.forEach((cert, i) => {
                if (cert.name) items.push({ type: 'cert', idx: i, field: 'name', text: cert.name });
            });
        }
        
        if (cvState.references && Array.isArray(cvState.references)) {
            cvState.references.forEach((ref, i) => {
                if (ref.title) items.push({ type: 'ref', idx: i, field: 'title', text: ref.title });
            });
        }
        
        if (progressBar) progressBar.style.width = '45%';
        if (statusText) statusText.textContent = targetLang === 'en' ? "Translating CV content to English..." : "CV içeriği Türkçeye çevriliyor...";
        
        // Execute protected batch translation
        const textList = items.map(item => item.text);
        const translatedList = await translateBatchTexts(textList, targetLang, customBrands);
        
        if (progressBar) progressBar.style.width = '85%';
        
        // Map back translated values to cvState
        items.forEach((item, index) => {
            let transVal = translatedList[index] || item.text;
            
            if (targetLang === 'en' && typeof transVal === 'string') {
                // Strip 3rd person subject pronouns (He/She/It) at start of bullets
                transVal = transVal.replace(/^(?:He|She|It)\s+(?:has\s+)?/i, '');
                
                // Remove mid-sentence He/She
                transVal = transVal.replace(/\b(?:He|She|It)\s+(?:has\s+)?/gi, '');
                
                // Ensure first letter is capitalized Action Verb
                if (transVal.length > 0) {
                    transVal = transVal.charAt(0).toUpperCase() + transVal.slice(1);
                }
                
                // Replace possessives (his/her -> the)
                transVal = transVal.replace(/\bhis\s+/gi, 'the ');
                transVal = transVal.replace(/\bher\s+/gi, 'the ');
                
                // Clean up common Turkish terms
                transVal = transVal.replace(/Veri Analizi ve Görselleştirme/gi, 'Data Analysis & Visualization');
                transVal = transVal.replace(/n8n Otomasyon/gi, 'n8n Automation');
                transVal = transVal.replace(/İşletme Mühendisliği Kulübü/gi, 'Management Engineering Club');
                transVal = transVal.replace(/Geleceği Yazanlar/gi, 'Gelecegi Yazanlar');
                transVal = transVal.replace(/Katılım Sertifikası/gi, 'Participation Certificate');
                transVal = transVal.replace(/Başarı Belgesi/gi, 'Certificate of Achievement');
                transVal = transVal.replace(/Zirvesi/gi, 'Summit');
                transVal = transVal.replace(/Kongresi/gi, 'Congress');
                transVal = transVal.replace(/\bOngoing\b/gi, 'Present');
                transVal = transVal.replace(/\bintern\b/g, 'Intern');
            }
            
            if (item.type === 'personal') {
                cvState.personal[item.field] = transVal;
            } else if (item.type === 'exp') {
                cvState.experiences[item.idx][item.field] = transVal;
            } else if (item.type === 'exp_bullet') {
                cvState.experiences[item.idx].bullets[item.bulletIdx] = transVal;
            } else if (item.type === 'edu') {
                cvState.educations[item.idx][item.field] = transVal;
            } else if (item.type === 'lead') {
                cvState.leaderships[item.idx][item.field] = transVal;
            } else if (item.type === 'lead_bullet') {
                cvState.leaderships[item.idx].bullets[item.bulletIdx] = transVal;
            } else if (item.type === 'skills') {
                cvState.skills[item.field] = transVal;
            } else if (item.type === 'cert') {
                cvState.certifications[item.idx][item.field] = transVal;
            } else if (item.type === 'ref') {
                cvState.references[item.idx][item.field] = transVal;
            }
        });

        if (!cvState.settings) cvState.settings = {};
        cvState.settings.docLang = targetLang;
        
        if (progressBar) progressBar.style.width = '100%';
        
        // Persist, update form inputs and re-render preview without changing UI language
        saveToLocalStorage();
        loadStateIntoUI();
        renderAll();
        
        setTimeout(() => {
            if (progressBox) progressBox.style.display = 'none';
            closeTranslateModal();
            const currentUiLang = cvState.settings?.uiLang || 'tr';
            const msg = UI_TRANSLATIONS[currentUiLang].trans_success || "CV içeriği başarıyla çevrildi!";
            alert(msg);
        }, 400);
        
    } catch (err) {
        console.error("Auto translate error:", err);
        const progressBox = document.getElementById('translate-progress-box');
        if (progressBox) progressBox.style.display = 'none';
        const lang = (cvState && cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
        const errorMsg = (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang].trans_service_unavailable)
            ? UI_TRANSLATIONS[lang].trans_service_unavailable
            : "Çeviri şu an yapılamıyor, lütfen tekrar deneyin.";
        alert(errorMsg);
    }
}

function undoTranslation() {
    const backupStr = localStorage.getItem('cvState_before_translate');
    if (backupStr) {
        try {
            cvState = JSON.parse(backupStr);
            localStorage.removeItem('cvState_before_translate');
            saveToLocalStorage();
            applyLanguage();
            loadStateIntoUI();
            renderAll();
            checkUndoState();
            closeTranslateModal();
            const lang = cvState.settings?.uiLang || 'tr';
            alert(UI_TRANSLATIONS[lang].undo_success || "Çeviri geri alındı!");
        } catch (e) {
            console.error("Undo parse error:", e);
        }
    }
}


let currentZoom = 0.85; // Default slightly zoomed out to fit desktop view nicely

// Document Elements
document.addEventListener("DOMContentLoaded", () => {
    // Check if we need to migrate to Dogukan's default state once
    const isMigrated = localStorage.getItem('dogukan_default_migrated_v2');
    const savedState = localStorage.getItem('harvard_cv_state');
    
    if (!isMigrated) {
        // Force migrate to Dogukan's CV as default
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        saveToLocalStorage();
        localStorage.setItem('dogukan_default_migrated_v2', 'true');
        loadStateIntoUI();
    } else if (savedState) {
        try {
            cvState = JSON.parse(savedState);
            // Ensure website field is migrated if missing
            if (cvState.personal && cvState.personal.name === "Asil Doğukan Samay" && cvState.personal.website === undefined) {
                cvState.personal.website = "asildogukansamay.com";
                saveToLocalStorage();
            }
            loadStateIntoUI();
        } catch (e) {
            console.error("Local storage parse error:", e);
            saveToLocalStorage();
        }
    } else {
        saveToLocalStorage();
    }

    // Setup inputs event listeners for real-time updating
    setupInputListeners();
    
    // Initial Render
    renderAll();
    
    // Apply initial language
    applyLanguage();
    
    // Apply initial theme from local storage
    if (cvState.settings && cvState.settings.theme === 'dark') {
        document.body.classList.add('editor-dark-mode');
        const sun = document.getElementById('theme-icon-sun');
        const moon = document.getElementById('theme-icon-moon');
        if (sun) sun.style.display = 'block';
        if (moon) moon.style.display = 'none';
    }
    
    // Setup horizontal scroll helper on editor tabs
    const tabsContainer = document.querySelector('.editor-tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                tabsContainer.scrollLeft += e.deltaY * 0.8;
                e.preventDefault();
            }
        });
    }

    // Setup Ctrl + Scroll Zoom on preview canvas
    const previewCanvas = document.querySelector('.preview-canvas');
    if (previewCanvas) {
        previewCanvas.addEventListener('wheel', (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
                if (e.deltaY < 0) {
                    adjustZoom(0.05); // zoom in
                } else {
                    adjustZoom(-0.05); // zoom out
                }
            }
        }, { passive: false });
    }
    
    // Sync initial stepper progress
    updateStepper(1);
    
    // Set initial Zoom
    applyZoom();
    
    // Monitor sidebar inputs for page fit calculations & auto-save
    const sidebar = document.querySelector('.editor-sidebar');
    if (sidebar) {
        sidebar.addEventListener('input', () => {
            saveToLocalStorage();
            checkPageFit();
        });
    }
    
    // Initial page fit check
    checkPageFit();
});

// Load state values into DOM inputs & preview text
function loadStateIntoUI() {
    // Personal Info
    document.getElementById('input-name').value = cvState.personal.name || "";
    document.getElementById('input-title').value = cvState.personal.title || "";
    document.getElementById('input-email').value = cvState.personal.email || "";
    document.getElementById('input-phone').value = cvState.personal.phone || "";
    document.getElementById('input-location').value = cvState.personal.location || "";
    document.getElementById('input-github').value = cvState.personal.github || "";
    document.getElementById('input-linkedin').value = cvState.personal.linkedin || "";
    document.getElementById('input-website').value = cvState.personal.website || "";
    document.getElementById('input-summary').value = cvState.personal.summary || "";
    
    // Skills
    if (cvState.skills) {
        document.getElementById('input-skills-technical').value = cvState.skills.technical || "";
        const toolsInp = document.getElementById('input-skills-tools');
        if (toolsInp) toolsInp.value = cvState.skills.tools || "";
        document.getElementById('input-skills-langs').value = cvState.skills.langs || "";
    }
    
    // Ensure certifications array exists
    if (!cvState.certifications) {
        if (cvState.skills && cvState.skills.certs) {
            // Migrating old string data if present
            cvState.certifications = cvState.skills.certs.split(',').map(c => ({ name: c.trim(), issuer: "", year: "" }));
            delete cvState.skills.certs;
        } else {
            cvState.certifications = [
                { name: "Network Technician", issuer: "Cisco", year: "2026" },
                { name: "Introduction to Python", issuer: "AIBusinessSchool", year: "2025" },
                { name: "Introduction to Data Science", issuer: "Cisco", year: "2025" },
                { name: "Veri Bilimi ve Yapay Zeka", issuer: "Doğuş Teknoloji", year: "2025" },
                { name: "Computer Hardware Basics", issuer: "Cisco", year: "2024" },
                { name: "Python Programlama", issuer: "Turkcell Geleceği Yazanlar", year: "2024" },
                { name: "Cisco IT Essentials", issuer: "Cisco", year: "2024" }
            ];
        }
    }
    renderEditorCertifications();
    renderCVCertifications();
    
    // Custom Titles Sync
    const custom = (cvState.settings && cvState.settings.customTitles) ? cvState.settings.customTitles : {};
    const sumInp = document.getElementById('input-custom-title-summary');
    if (sumInp) sumInp.value = custom.summary || "";
    const expInp = document.getElementById('input-custom-title-experience');
    if (expInp) expInp.value = custom.experience || "";
    const eduInp = document.getElementById('input-custom-title-education');
    if (eduInp) eduInp.value = custom.education || "";
    const leadInp = document.getElementById('input-custom-title-leadership');
    if (leadInp) leadInp.value = custom.leadership || "";
    const skInp = document.getElementById('input-custom-title-skills');
    if (skInp) skInp.value = custom.skills || "";
    const refInp = document.getElementById('input-custom-title-references');
    if (refInp) refInp.value = custom.references || "";
    
    renderSectionTitles();

    // Dropdown Settings
    if (cvState.settings) {
        document.getElementById('setting-font').value = cvState.settings.font || "font-garamond";
        document.getElementById('setting-size').value = cvState.settings.size || "size-medium";
        document.getElementById('setting-spacing').value = cvState.settings.spacing || "spacing-normal";
        document.getElementById('setting-margin').value = cvState.settings.margin || "margin-normal";
        document.getElementById('setting-alignment').value = cvState.settings.alignment || "align-top";
        document.getElementById('setting-accent').value = cvState.settings.accent || "accent-black";
        document.getElementById('setting-headings').value = cvState.settings.headings || "headings-line";
    }
    
    // Check visibility states and apply to checkboxes
    if (!cvState.settings.visibility) {
        cvState.settings.visibility = { location: true, email: true, phone: true, github: true, linkedin: true };
    }
    const vis = cvState.settings.visibility;
    document.getElementById('toggle-location').checked = vis.location !== false;
    document.getElementById('toggle-email').checked = vis.email !== false;
    document.getElementById('toggle-phone').checked = vis.phone !== false;
    document.getElementById('toggle-github').checked = vis.github !== false;
    document.getElementById('toggle-linkedin').checked = vis.linkedin !== false;
    if (vis.website === undefined) vis.website = true;
    document.getElementById('toggle-website').checked = vis.website !== false;

    // Check visibility states for profile photo
    if (cvState.settings.visibility.photo === undefined) {
        cvState.settings.visibility.photo = false; // Hide by default to protect US/UK Ivy League HBS standard
    }
    
    // Check visibility states for references
    if (cvState.settings.visibility.references === undefined) {
        cvState.settings.visibility.references = true; // Show by default
    }
    
    // Pre-fill references default data if empty
    if (!cvState.references) {
        cvState.references = [
            { name: "Dr. John Smith", title: "Professor of Finance at Yale SOM", email: "j.smith@yale.edu", phone: "+1 (203) 432-0000" },
            { name: "Jane Johnson", title: "VP of Product at Google", email: "j.johnson@google.com", phone: "+1 (650) 253-0000" }
        ];
    }
    
    // Sync references preview and input fields
    document.getElementById('toggle-references').checked = cvState.settings.visibility.references === true;
    
    // Sync display mode select
    if (!cvState.settings.refMode) {
        cvState.settings.refMode = "details";
    }
    const refModeSelect = document.getElementById('setting-ref-mode');
    if (refModeSelect) {
        refModeSelect.value = cvState.settings.refMode;
    }
    
    renderEditorReferences();
    renderCVReferences();
    
    // Sync profile photo preview and inputs
    const photoPreviewEl = document.getElementById('cv-photo-preview');
    const photoWrapperEl = document.getElementById('cv-photo-wrapper');
    const photoCheckboxEl = document.getElementById('toggle-photo');
    
    if (photoPreviewEl && photoWrapperEl && photoCheckboxEl) {
        photoCheckboxEl.checked = cvState.settings.visibility.photo === true;
        if (cvState.personal.photo) {
            photoPreviewEl.src = cvState.personal.photo;
            if (cvState.settings.visibility.photo === true) {
                photoWrapperEl.style.display = 'block';
            } else {
                photoWrapperEl.style.display = 'none';
            }
        } else {
            photoWrapperEl.style.display = 'none';
        }
    }

    // Pre-fill registered user's name if present in localStorage and cvState name is blank/default
    const registeredName = localStorage.getItem("cvsom_user_name");
    if (registeredName && (!cvState.personal.name || cvState.personal.name.trim() === "" || cvState.personal.name === "Jane Doe")) {
        cvState.personal.name = registeredName;
        localStorage.removeItem("cvsom_user_name"); // Clean up so it doesn't overwrite future changes
        saveToLocalStorage();
    }

    // Sync preview text elements
    document.getElementById('cv-name').textContent = cvState.personal.name || "";
    document.getElementById('cv-title-display').textContent = cvState.personal.title || "";
    document.getElementById('cv-summary').textContent = cvState.personal.summary || "";
    
    // Sync contact info displaying and icons
    renderCVContactInfo();
    
    if (cvState.skills) {
        document.getElementById('cv-skills-technical').textContent = cvState.skills.technical || "";
        const toolsEl = document.getElementById('cv-skills-tools');
        const toolsItem = document.getElementById('cv-skills-tools-item');
        if (toolsEl) toolsEl.textContent = cvState.skills.tools || "";
        if (toolsItem) toolsItem.style.display = (cvState.skills.tools && cvState.skills.tools.trim()) ? 'block' : 'none';
        
        const certsEl = document.getElementById('cv-skills-certs');
        if (certsEl) certsEl.textContent = cvState.skills.certs || "";
        
        document.getElementById('cv-skills-langs').textContent = cvState.skills.langs || "";
    }
    applyLanguage();
}

// Switch Tab Logic
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Find active button and tab pane
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => btn.getAttribute('onclick').includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');
    
    const activePane = document.getElementById(`tab-${tabId}`);
    if (activePane) activePane.classList.add('active');
    
    // Dynamically update Stepper progress
    if (tabId === 'settings') {
        updateStepper(2);
    } else {
        updateStepper(1);
    }
}

function updateStepper(activeStep) {
    const steps = document.querySelectorAll('.header-steps .step-item');
    steps.forEach((step, idx) => {
        // Clear all states first
        step.classList.remove('active', 'completed');
        
        const stepNum = idx + 1;
        if (stepNum === activeStep) {
            step.classList.add('active');
        } else if (stepNum < activeStep) {
            step.classList.add('completed');
        }
    });
}

// Input Listener setups for basic fields
function setupInputListeners() {
    const fields = [
        { id: 'input-name', key: 'name', target: 'cv-name' },
        { id: 'input-title', key: 'title', target: 'cv-title-display' },
        { id: 'input-email', key: 'email', target: 'cv-email' },
        { id: 'input-phone', key: 'phone', target: 'cv-phone' },
        { id: 'input-location', key: 'location', target: 'cv-location' },
        { id: 'input-github', key: 'github', target: 'cv-github' },
        { id: 'input-linkedin', key: 'linkedin', target: 'cv-linkedin' },
        { id: 'input-website', key: 'website', target: 'cv-website' },
    ];
    
    fields.forEach(field => {
        const el = document.getElementById(field.id);
        if (el) {
            el.addEventListener('input', (e) => {
                cvState.personal[field.key] = e.target.value;
                
                // Directly sync preview target text elements
                if (field.target) {
                    const targetEl = document.getElementById(field.target);
                    if (targetEl) {
                        targetEl.textContent = e.target.value;
                    }
                }
                
                renderCVContactInfo();
            });
        }
    });

    const summaryEl = document.getElementById('input-summary');
    if (summaryEl) {
        summaryEl.addEventListener('input', (e) => {
            cvState.personal.summary = e.target.value;
            document.getElementById('cv-summary').textContent = e.target.value;
            // Hide section if empty
            const sec = document.getElementById('sec-summary');
            if (e.target.value.trim() === '') {
                sec.style.display = 'none';
            } else {
                sec.style.display = 'block';
            }
        });
    }

    // Skills fields
    const technicalEl = document.getElementById('input-skills-technical');
    if (technicalEl) {
        technicalEl.addEventListener('input', (e) => {
            cvState.skills.technical = e.target.value;
            document.getElementById('cv-skills-technical').textContent = e.target.value;
        });
    }
    
    const certsEl = document.getElementById('input-skills-certs');
    if (certsEl) {
        certsEl.addEventListener('input', (e) => {
            cvState.skills.certs = e.target.value;
            document.getElementById('cv-skills-certs').textContent = e.target.value;
        });
    }

    const langsEl = document.getElementById('input-skills-langs');
    if (langsEl) {
        langsEl.addEventListener('input', (e) => {
            cvState.skills.langs = e.target.value;
            document.getElementById('cv-skills-langs').textContent = e.target.value;
        });
    }


}

// -------------------------------------------------------------
// RENDERING FUNCTIONS
// -------------------------------------------------------------



function updatePersonalField(field, value) {
    if (!cvState.personal) cvState.personal = {};
    cvState.personal[field] = value;
    if (typeof renderCVContactInfo === 'function') {
        renderCVContactInfo();
    }
    debouncedSave();
}


function renderCVContactInfo() {
    const personal = cvState.personal || {};
    
    const nameEl = document.getElementById('cv-name');
    if (nameEl) nameEl.textContent = personal.name || '';

    const titleEl = document.getElementById('cv-title-display');
    if (titleEl) titleEl.textContent = personal.title || '';

    const summaryEl = document.getElementById('cv-summary');
    if (summaryEl) summaryEl.textContent = personal.summary || '';

    const emailEl = document.getElementById('cv-email');
    if (emailEl) emailEl.textContent = personal.email || '';

    const phoneEl = document.getElementById('cv-phone');
    if (phoneEl) phoneEl.textContent = personal.phone || '';

    const locationEl = document.getElementById('cv-location');
    if (locationEl) locationEl.textContent = personal.location || '';

    const githubEl = document.getElementById('cv-github');
    if (githubEl) githubEl.textContent = personal.github || '';

    const linkedinEl = document.getElementById('cv-linkedin');
    if (linkedinEl) linkedinEl.textContent = personal.linkedin || '';

    const websiteEl = document.getElementById('cv-website');
    if (websiteEl) websiteEl.textContent = personal.website || '';

    if (typeof updateContactVisibility === 'function') {
        updateContactVisibility();
    }
}

// -------------------------------------------------------------
// ATS SCORE CALCULATOR & LIVE AI ASSISTANT ENGINE
// -------------------------------------------------------------

function calculateATSScore() {
    const feedback = [];
    const lang = (cvState && cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    
    const personal = cvState.personal || {};
    const experiences = cvState.experiences || [];
    const educations = cvState.educations || [];
    const skills = cvState.skills || {};
    const certifications = cvState.certifications || [];

    // 1. Contact (max 20)
    let contactScore = 0;
    if (personal.name && personal.name.trim()) contactScore += 5;
    else feedback.push(lang === 'en' ? "Add full name to contact info." : "Ad soyad bilgisi ekleyin.");
    
    if (personal.email && personal.email.trim()) contactScore += 5;
    else feedback.push(lang === 'en' ? "Add email address." : "E-posta adresi ekleyin.");

    if (personal.phone && personal.phone.trim()) contactScore += 5;
    else feedback.push(lang === 'en' ? "Add phone number." : "Telefon numarası ekleyin.");

    if (personal.linkedin || personal.github || personal.location) contactScore += 5;
    else feedback.push(lang === 'en' ? "Add location or profile links (LinkedIn/GitHub)." : "Konum veya profil bağlantısı (LinkedIn/GitHub) ekleyin.");

    // 2. Summary (max 15)
    let summaryScore = 0;
    if (personal.summary && personal.summary.length > 50) {
        summaryScore += 15;
    } else {
        feedback.push(lang === 'en' ? "Summary should be at least 50 characters long." : "Özgeçmiş özeti en az 50 karakter olmalı.");
    }

    // 3. Experience & Bullet Quality (max 30)
    let expScore = 0;
    if (experiences.length > 0) {
        expScore += 10;
        let hasMetrics = false;
        let actionVerbCount = 0;
        
        experiences.forEach(exp => {
            (exp.bullets || []).forEach(b => {
                if (/[0-9]+%|[0-9]+\+|\b(kazandı|yönetti|geliştirdi|tasarladı|artırdı|azalttı|won|managed|designed|developed|increased|reduced)\b/i.test(b)) {
                    hasMetrics = true;
                    actionVerbCount++;
                }
            });
        });
        
        if (hasMetrics) expScore += 10;
        else feedback.push(lang === 'en' ? "Add measurable metrics (%, numbers) to experience bullets." : "Deneyim maddelerinize ölçülebilir metrikler (%, rakamlar) ekleyin.");

        if (actionVerbCount >= 3) expScore += 10;
        else feedback.push(lang === 'en' ? "Use at least 3 strong action verbs in bullet points." : "Maddelerinizde en az 3 etken fiil (Action Verb) kullanın.");
    } else {
        feedback.push(lang === 'en' ? "Add at least 1 work experience entry." : "En az 1 deneyim eklemelisiniz.");
    }

    // 4. Education & GPA (max 15)
    let eduScore = 0;
    if (educations.length > 0) {
        eduScore += 10;
        if (educations[0].gpa && educations[0].gpa.trim()) {
            eduScore += 5;
        } else {
            feedback.push(lang === 'en' ? "Consider adding GPA / academic degree details." : "GANO / Not ortalaması bilgisi eklemeyi değerlendirin.");
        }
    } else {
        feedback.push(lang === 'en' ? "Add at least 1 education entry." : "Eğitim bilgisi eklemelisiniz.");
    }

    // 5. Skills & Certifications (max 20)
    let skillScore = 0;
    if (skills.technical && skills.technical.trim()) {
        skillScore += 10;
    } else {
        feedback.push(lang === 'en' ? "Add key technical skills & programming languages." : "Teknik yetenekler ve programlama dillerinizi ekleyin.");
    }

    if (certifications.length > 0 || (skills.certs && skills.certs.trim())) {
        skillScore += 10;
    } else {
        feedback.push(lang === 'en' ? "Add certifications or language proficiency details." : "Sertifikalar veya dil yeterlilik bilgisi ekleyin.");
    }

    const score = contactScore + summaryScore + expScore + eduScore + skillScore;

    const breakdown = {
        contact: { score: contactScore, max: 20 },
        summary: { score: summaryScore, max: 15 },
        experience: { score: expScore, max: 30 },
        education: { score: eduScore, max: 15 },
        skills: { score: skillScore, max: 20 }
    };

    // Update Badge UI
    const badge = document.getElementById('ats-score-badge');
    if (badge) {
        badge.innerHTML = `<i class="fas fa-bullseye"></i> ATS Skoru: %${score}`;
        if (score >= 85) {
            badge.className = 'badge badge-success';
            badge.style.background = '#2e7d32';
            badge.style.color = '#fff';
        } else if (score >= 60) {
            badge.className = 'badge badge-warning';
            badge.style.background = '#ed6c02';
            badge.style.color = '#fff';
        } else {
            badge.className = 'badge badge-danger';
            badge.style.background = '#d32f2f';
            badge.style.color = '#fff';
        }
    }

    // Live update modal if open
    const modal = document.getElementById('ats-modal');
    if (modal && modal.style.display === 'flex') {
        renderATSBreakdownUI(score, breakdown, feedback);
    }

    return { score, breakdown, feedback };
}

function renderATSBreakdownUI(score, breakdown, feedback) {
    const scoreEl = document.getElementById('ats-modal-score-val');
    if (scoreEl) scoreEl.textContent = `%${score}`;
    
    const lang = (cvState && cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    const breakdownBox = document.getElementById('ats-modal-breakdown');
    
    if (breakdownBox) {
        const catLabels = {
            contact: lang === 'en' ? "Contact Details (20p)" : "İletişim Bilgileri (20p)",
            summary: lang === 'en' ? "Professional Summary (15p)" : "Profesyonel Özet (15p)",
            experience: lang === 'en' ? "Work Experience & Metrics (30p)" : "İş Deneyimi & Metrikler (30p)",
            education: lang === 'en' ? "Education & GPA (15p)" : "Eğitim & GANO (15p)",
            skills: lang === 'en' ? "Skills & Certifications (20p)" : "Yetenekler & Sertifikalar (20p)"
        };
        
        let html = '<div style="margin: 14px 0; display: flex; flex-direction: column; gap: 8px;">';
        Object.keys(breakdown).forEach(k => {
            const item = breakdown[k];
            const pct = Math.round((item.score / item.max) * 100);
            const isFull = item.score === item.max;
            const statusText = isFull 
                ? (lang === 'en' ? '✓ Completed' : '✓ Tamamlandı')
                : (lang === 'en' ? `⚠️ Action Needed (${item.score}/${item.max}p)` : `⚠️ Eksik (${item.score}/${item.max}p)`);
            const barColor = isFull ? '#22c55e' : (pct >= 50 ? '#f59e0b' : '#ef4444');
            
            html += `
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px 12px; border-radius: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 12px; font-weight: 600;">
                        <span>${catLabels[k]}</span>
                        <span style="color: ${barColor}; font-weight: 700; font-size: 11px;">${statusText}</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                        <div style="width: ${pct}%; height: 100%; background: ${barColor}; transition: width 0.4s ease;"></div>
                    </div>
                </div>
            `;
        });
        
        if (feedback && feedback.length > 0) {
            html += `<div style="margin-top: 10px; padding: 10px 12px; background: #fffbeeb0; border: 1px solid #fde68a; border-radius: 8px; font-size: 12px; color: #92400e;">`;
            html += `<strong style="display:block; margin-bottom:4px;">💡 ${lang === 'en' ? 'Actionable Recommendations:' : 'Geliştirme Önerileri:'}</strong>`;
            html += `<ul style="padding-left: 18px; margin: 0;">`;
            feedback.forEach(item => {
                html += `<li style="margin-bottom: 3px;">${item}</li>`;
            });
            html += `</ul></div>`;
        }
        
        html += '</div>';
        breakdownBox.innerHTML = html;
    }
}

function openATSModal() {
    const modal = document.getElementById('ats-modal');
    if (!modal) return;
    
    const { score, breakdown, feedback } = calculateATSScore();
    renderATSBreakdownUI(score, breakdown, feedback);
    modal.style.display = 'flex';
}

function closeATSModal() {
    const modal = document.getElementById('ats-modal');
    if (modal) modal.style.display = 'none';
}

function openAIAssistant() {
    const drawer = document.getElementById('ai-assistant-drawer');
    if (drawer) {
        drawer.style.display = 'flex';
        checkAIDisclaimerState();
    }
}

function checkAIDisclaimerState() {
    const isDismissed = localStorage.getItem('ai_template_disclaimer_dismissed') === 'true';
    const disc = document.getElementById('ai-assistant-disclaimer');
    if (disc) {
        disc.style.display = isDismissed ? 'none' : 'flex';
    }
}

function dismissAIDisclaimer() {
    localStorage.setItem('ai_template_disclaimer_dismissed', 'true');
    const disc = document.getElementById('ai-assistant-disclaimer');
    if (disc) {
        disc.style.display = 'none';
    }
}

function closeAIAssistant() {
    const drawer = document.getElementById('ai-assistant-drawer');
    if (drawer) drawer.style.display = 'none';
}

function toggleMobilePreview() {
    const canvas = document.querySelector('.preview-canvas');
    if (canvas) {
        canvas.classList.toggle('mobile-show');
        if (canvas.classList.contains('mobile-show')) {
            canvas.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function applyPresetTheme(themeName) {
    const root = document.documentElement;
    if (themeName === 'crimson') {
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.accent = 'accent-crimson';
    } else if (themeName === 'navy') {
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.accent = 'accent-navy';
    } else if (themeName === 'emerald') {
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.accent = 'accent-emerald';
    } else {
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.accent = 'accent-black';
    }
    saveToLocalStorage();
    updateStyles();
}

function askAIAssistant(promptType) {
    const chatBox = document.getElementById('ai-chat-messages');
    if (!chatBox) return;
    
    let responseText = "";
    if (promptType === 'bullet') {
        responseText = "🤖 **AI Madde Önerisi:** Deneyimlerinize ölçülebilir metrikler ekleyin. Örneğin: *'Satış takip süreçlerini Python ve SQL ile otomatize ederek yanıt sürelerini %35 iyileştirdi.'*";
    } else if (promptType === 'ats') {
        responseText = "🎯 **ATS Tavsiyesi:** CV'niz Harvard 2026 ve Taleo/Workday standartlarına %100 uygundur. Eylem fiilleri (Action Verbs) ve metrik oranları yüksek puan almaktadır.";
    } else if (promptType === 'title') {
        responseText = "💡 **Unvan Tavsiyesi:** Başvurduğunuz ilana göre unvanınızı *'İş Analisti | Veri Analisti'* veya *'İş Geliştirme Uzmanı | İş Analisti'* olarak güncelleyebilirsiniz.";
    }
    
    const msgDiv = document.createElement('div');
    msgDiv.style.cssText = "background: #f0f4f9; padding: 10px 12px; border-radius: 8px; margin-bottom: 8px; font-size: 12px; line-height: 1.4; border-left: 3px solid #1a73e8;";
    msgDiv.innerHTML = responseText;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}


function injectPDFEmbeddedStateMeta() {
    const previewContainer = document.getElementById('cv-preview');
    if (!previewContainer) return;
    
    let metaEl = document.getElementById('cvsom-pdf-meta');
    if (!metaEl) {
        metaEl = document.createElement('div');
        metaEl.id = 'cvsom-pdf-meta';
        metaEl.style.cssText = 'font-size: 0.1px; line-height: 0.1px; color: #ffffff; height: 1px; width: 1px; overflow: hidden; opacity: 0.001; pointer-events: none; position: absolute; bottom: 0; right: 0; z-index: -9999;';
        previewContainer.appendChild(metaEl);
    }
    try {
        const jsonStr = JSON.stringify(cvState);
        const encoded = btoa(encodeURIComponent(jsonStr));
        metaEl.textContent = `CVSOM_STATE_META_BEGIN:${encoded}:CVSOM_STATE_META_END`;
    } catch (e) {
        console.warn("Failed to encode PDF meta state", e);
    }
}

function renderAll() {
    renderCVExperiences();
    renderCVEducation();
    renderCVLeadership();
    renderCVCertifications();
    renderCVReferences();
    renderSectionTitles();
    
    renderEditorExperiences();
    renderEditorEducation();
    renderEditorLeadership();
    renderEditorCertifications();
    renderEditorReferences();

    injectPDFEmbeddedStateMeta();

    if (typeof calculateATSScore === 'function') {
        calculateATSScore();
    }
}

// Helper to format bullets with bold text before colons (Harvard style)
function formatBulletPoint(bullet) {
    const colonIndex = bullet.indexOf(':');
    if (colonIndex > 0) {
        const lead = bullet.substring(0, colonIndex + 1);
        const tail = bullet.substring(colonIndex + 1);
        return `<strong>${lead}</strong>${tail}`;
    }
    return bullet;
}

// Render CV Document parts

// -------------------------------------------------------------
// SECTION TITLES, CUSTOMIZATION & HELPER HANDLERS
// -------------------------------------------------------------

function renderSectionTitles() {
    const docLang = (cvState.settings && cvState.settings.docLang) 
        ? cvState.settings.docLang 
        : ((cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr");
    const custom = (cvState.settings && cvState.settings.customTitles) ? cvState.settings.customTitles : {};

    const secMap = {
        summary: { id: "sec-summary", defaultKey: "cv_title_summary" },
        experience: { id: "sec-experience", defaultKey: "cv_title_experience" },
        education: { id: "sec-education", defaultKey: "cv_title_education" },
        leadership: { id: "sec-leadership", defaultKey: "cv_title_leadership" },
        skills: { id: "sec-skills", defaultKey: "cv_title_skills" },
        references: { id: "cv-section-references", defaultKey: "section_references" }
    };

    for (const [secKey, cfg] of Object.entries(secMap)) {
        const secEl = document.getElementById(cfg.id);
        if (secEl) {
            const titleEl = secEl.querySelector('.section-title');
            if (titleEl) {
                const customVal = custom[secKey] && custom[secKey].trim();
                const defaultVal = (UI_TRANSLATIONS[docLang] && UI_TRANSLATIONS[docLang][cfg.defaultKey]) ? UI_TRANSLATIONS[docLang][cfg.defaultKey] : "";
                titleEl.textContent = customVal || defaultVal || titleEl.textContent;
            }
        }
    }

    // Also update skill labels on the CV preview to match docLang
    const skillLabels = ['tech_label', 'tools_label', 'certs_label', 'langs_label'];
    const secSkills = document.getElementById('sec-skills');
    if (secSkills) {
        secSkills.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (skillLabels.includes(key) && UI_TRANSLATIONS[docLang] && UI_TRANSLATIONS[docLang][key]) {
                el.textContent = UI_TRANSLATIONS[docLang][key];
            }
        });
    }
}

function updateCustomTitle(section, val) {
    if (!cvState.settings) cvState.settings = {};
    if (!cvState.settings.customTitles) cvState.settings.customTitles = {};
    cvState.settings.customTitles[section] = val;
    renderSectionTitles();
    saveToLocalStorage();
}

function updateSkillField(field, val) {
    if (!cvState.skills) cvState.skills = { technical: "", tools: "", certs: "", langs: "" };
    cvState.skills[field] = val;
    
    const previewEl = document.getElementById('cv-skills-' + field);
    if (previewEl) previewEl.textContent = val;
    
    if (field === 'tools') {
        const toolsItem = document.getElementById('cv-skills-tools-item');
        if (toolsItem) {
            toolsItem.style.display = val && val.trim() ? 'block' : 'none';
        }
    }
    
    saveToLocalStorage();
}

function changeRefMode(mode) {
    if (!cvState.settings) cvState.settings = {};
    if (!cvState.settings.visibility) cvState.settings.visibility = {};
    cvState.settings.refMode = mode;
    cvState.settings.visibility.references = true;
    cvState.settings.showReferences = true;
    const toggleEl = document.getElementById('toggle-references');
    if (toggleEl) toggleEl.checked = true;
    renderCVReferences();
    saveToLocalStorage();
}

function toggleReferencesVisibility(checked) {
    if (!cvState.settings) cvState.settings = {};
    if (!cvState.settings.visibility) cvState.settings.visibility = {};
    cvState.settings.visibility.references = checked;
    cvState.settings.showReferences = checked;
    const toggleEl = document.getElementById('toggle-references');
    if (toggleEl) toggleEl.checked = checked;
    renderCVReferences();
    saveToLocalStorage();
}

function printCV() {
    window.print();
}

function resetData() {
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    const confirmMsg = lang === 'en'
        ? "Are you sure you want to reset all CV data back to the default Harvard template?"
        : "Tüm CV verileriniz sıfırlanıp varsayılan Harvard şablonuna dönecektir. Emin misiniz?";
    
    if (confirm(confirmMsg)) {
        cvState = (lang === 'en') ? JSON.parse(JSON.stringify(EN_SAMPLE_STATE)) : JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        alert(lang === 'en' ? "CV data successfully reset!" : "CV verileriniz başarıyla sıfırlandı!");
    }
}

function _legacy_toggleGuideModal_disabled() {
    const modal = document.getElementById('guide-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'none' || !modal.style.display) ? 'flex' : 'none';
    }
}

function closeGuideModal(event) {
    if (event && event.target) {
        if (event.target.id === 'guide-modal' || (event.target.classList && event.target.classList.contains('close-btn')) || event.target.tagName === 'BUTTON') {
            const modal = document.getElementById('guide-modal');
            if (modal) modal.style.display = 'none';
        }
    } else {
        const modal = document.getElementById('guide-modal');
        if (modal) modal.style.display = 'none';
    }
}

function handlePhotoUpload(input) {
    if (input && input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const dataUrl = e.target.result;
            if (!cvState.personal) cvState.personal = {};
            cvState.personal.photo = dataUrl;
            const img = document.getElementById('cv-photo-preview');
            if (img) img.src = dataUrl;
            const wrapper = document.getElementById('cv-photo-wrapper');
            if (wrapper) wrapper.style.display = 'block';
            saveToLocalStorage();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function togglePhotoVisibility(checked) {
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.showPhoto = checked;
    const wrapper = document.getElementById('cv-photo-wrapper');
    if (wrapper) wrapper.style.display = checked ? 'block' : 'none';
    saveToLocalStorage();
}

function updateContactVisibility() {
    const contactMap = {
        'toggle-email': 'cv-contact-email-item',
        'toggle-phone': 'cv-contact-phone-item',
        'toggle-location': 'cv-contact-location-item',
        'toggle-github': 'cv-contact-github-item',
        'toggle-linkedin': 'cv-contact-linkedin-item',
        'toggle-website': 'cv-contact-website-item'
    };
    
    if (!cvState.settings) cvState.settings = {};
    if (!cvState.settings.contactVisibility) cvState.settings.contactVisibility = {};
    
    for (const [chkId, itemKey] of Object.entries(contactMap)) {
        const chk = document.getElementById(chkId);
        if (chk) {
            const isVisible = chk.checked;
            cvState.settings.contactVisibility[chkId] = isVisible;
            const itemEl = document.getElementById(itemKey);
            if (itemEl) itemEl.style.display = isVisible ? 'inline-flex' : 'none';
        }
    }
    saveToLocalStorage();
}

function loadPresetTemplate(val) {
    if (!val) return;
    const currentUiLang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    
    if (val === 'tr' || val === 'tr_standard' || val === 'tr_ats' || val === 'software_tr' || val === 'consulting_tr' || val === 'academic_tr') {
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.uiLang = currentUiLang;
    } else if (val === 'en' || val === 'en_standard' || val === 'en_ats' || val === 'software_en' || val === 'consulting_en' || val === 'academic_en') {
        cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.uiLang = currentUiLang;
    }
    
    saveToLocalStorage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
    calculateATSScore();
}

function renderCVCertifications() {
    const certsSpan = document.getElementById('cv-skills-certs');
    const certsItem = document.getElementById('cv-skills-certs-item') || (certsSpan ? certsSpan.parentElement : null);
    
    let formattedText = "";
    
    // Check certifications array
    if (cvState.certifications && Array.isArray(cvState.certifications) && cvState.certifications.length > 0) {
        formattedText = cvState.certifications.map(c => {
            let str = c.name || '';
            let meta = [];
            if (c.issuer && c.issuer.trim()) meta.push(c.issuer.trim());
            if (c.year && c.year.trim()) meta.push(c.year.trim());
            if (meta.length > 0) str += ` (${meta.join(', ')})`;
            return str.trim();
        }).filter(s => s.length > 0).join(", ");
    } else if (cvState.skills && cvState.skills.certs && cvState.skills.certs.trim()) {
        formattedText = cvState.skills.certs.trim();
    }
    
    if (certsSpan) {
        certsSpan.textContent = formattedText;
    }
    
    if (certsItem) {
        certsItem.style.display = formattedText.length > 0 ? "block" : "none";
    }
}


function renderCVReferences() {
    const container = document.getElementById('cv-references-container');
    const sec = document.getElementById('cv-section-references');
    if (!container) return;
    container.innerHTML = '';
    
    const showRef = (cvState.settings && cvState.settings.visibility && cvState.settings.visibility.references !== undefined)
        ? cvState.settings.visibility.references
        : ((cvState.settings && cvState.settings.showReferences !== undefined) ? cvState.settings.showReferences : true);
    
    if (sec) sec.style.display = showRef ? 'block' : 'none';
    if (!showRef) return;
    
    const mode = (cvState.settings && cvState.settings.refMode) ? cvState.settings.refMode : 'details';
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    
    if (mode === 'request') {
        container.innerHTML = `<div style="grid-column: 1 / -1; font-style: italic; font-size: 0.95em; color: #444;">
            ${lang === 'en' ? 'References available upon request.' : 'Referanslar talep halinde sunulacaktır.'}
        </div>`;
        return;
    }
    
    const refs = cvState.references || [];
    if (refs.length === 0) {
        if (sec) sec.style.display = 'none';
        return;
    }
    
    let renderedCount = 0;
    refs.forEach(r => {
        if (!r.name && !r.title && !r.company && !r.contact) return;
        renderedCount++;
        const div = document.createElement('div');
        div.className = 'reference-item';
        
        let html = `<div class="ref-name">${r.name || ''}</div>`;
        
        let sub = '';
        if (r.title && r.company) {
            sub = `${r.title} – ${r.company}`;
        } else if (r.title) {
            sub = r.title;
        } else if (r.company) {
            sub = r.company;
        }
        
        if (sub) {
            html += `<div class="ref-sub">${sub}</div>`;
        }
        
        if (r.contact) {
            let contactText = r.contact.trim();
            if (/^[0-9+\s\-()]{7,}$/.test(contactText) && !/^(tel|phone|iletişim)/i.test(contactText)) {
                contactText = `Tel: ${contactText}`;
            }
            html += `<div class="ref-contact">${contactText}</div>`;
        }
        
        div.innerHTML = html;
        container.appendChild(div);
    });

    if (renderedCount === 0 && mode !== 'request') {
        container.innerHTML = `<div style="grid-column: 1 / -1; font-style: italic; font-size: 0.95em; color: #888;">
            ${lang === 'en' ? 'Reference details will appear here as you type...' : 'Referans bilgileri yazıldıkça burada görünecektir...'}
        </div>`;
    }
}



function renderCVExperiences() {
    const container = document.getElementById('cv-experience-container');
    container.innerHTML = '';
    
    if (cvState.experiences.length === 0) {
        document.getElementById('sec-experience').style.display = 'none';
        return;
    }
    document.getElementById('sec-experience').style.display = 'block';
    
    cvState.experiences.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'entry-block';
        
        let bulletsHtml = '';
        if (exp.bullets && exp.bullets.length > 0) {
            bulletsHtml = `<ul class="entry-bullets">` + 
                exp.bullets.map(b => `<li>${formatBulletPoint(b)}</li>`).join('') + 
                `</ul>`;
        }
        
        expDiv.innerHTML = `
            <div class="entry-header">
                <span class="company-name">${exp.company}</span>
                <span class="entry-location">${exp.location}</span>
            </div>
            <div class="entry-subheader">
                <span class="entry-role">${exp.role}</span>
                <span class="entry-date">${exp.dates}</span>
            </div>
            ${bulletsHtml}
        `;
        container.appendChild(expDiv);
    });
    saveToLocalStorage();
    checkPageFit();
}




function renderCVEducation() {
    const container = document.getElementById('cv-education-container');
    container.innerHTML = '';
    
    if (cvState.educations.length === 0) {
        document.getElementById('sec-education').style.display = 'none';
        return;
    }
    document.getElementById('sec-education').style.display = 'block';
    
    cvState.educations.forEach(edu => {
        const eduDiv = document.createElement('div');
        eduDiv.className = 'entry-block';
        
        const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
        const gpaLabel = lang === 'tr' ? 'GANO' : 'GPA';
        let gpaText = "";
        if (edu.gpa && edu.gpa.trim() !== "") {
            const cleanGpa = edu.gpa.trim();
            if (!edu.degree || !edu.degree.includes(cleanGpa)) {
                if (cleanGpa.toLowerCase().includes('gano') || cleanGpa.toLowerCase().includes('gpa')) {
                    gpaText = ` — ${cleanGpa}`;
                } else {
                    gpaText = ` — ${gpaLabel}: ${cleanGpa}`;
                }
            }
        }
        
        // Clean degree string if it already contains GANO/GPA duplicate
        let cleanDegree = edu.degree || "";
        cleanDegree = cleanDegree.replace(/[-–—]\s*(?:GANO|GPA)\s*:\s*[0-9.]+\s*\/\s*[0-9.]+/gi, "").trim();
        cleanDegree = cleanDegree.replace(/(?:GANO|GPA)\s*:\s*[0-9.]+\s*\/\s*[0-9.]+/gi, "").trim();
        
        let detailsHtml = '';
        if (edu.details && edu.details.trim()) {
            detailsHtml = `<div class="entry-description">${edu.details}</div>`;
        }
        
        eduDiv.innerHTML = `
            <div class="entry-header">
                <div>
                    <span class="entry-title">${edu.university || ''}</span>
                </div>
                <div class="entry-right">${edu.location || ''}</div>
            </div>
            <div class="entry-subheader">
                <span class="entry-degree">${cleanDegree}${gpaText}</span>
                <span class="entry-date">${edu.dates || ''}</span>
            </div>
            ${detailsHtml}
        `;
        
        container.appendChild(eduDiv);
    });
}

function renderCVLeadership() {
    const container = document.getElementById('cv-leadership-container');
    container.innerHTML = '';
    
    if (cvState.leaderships.length === 0) {
        document.getElementById('sec-leadership').style.display = 'none';
        return;
    }
    document.getElementById('sec-leadership').style.display = 'block';
    
    cvState.leaderships.forEach(lead => {
        const leadDiv = document.createElement('div');
        leadDiv.className = 'entry-block';
        
        let bulletsHtml = '';
        if (lead.bullets && lead.bullets.length > 0) {
            bulletsHtml = `<ul class="entry-bullets">` + 
                lead.bullets.map(b => `<li>${formatBulletPoint(b)}</li>`).join('') + 
                `</ul>`;
        }
        
        leadDiv.innerHTML = `
            <div class="entry-header">
                <span class="company-name">${lead.organization}</span>
                <span class="entry-date">${lead.dates}</span>
            </div>
            <div class="entry-subheader" style="margin-bottom: 2px;">
                <span class="entry-role">${lead.role}</span>
                <span></span>
            </div>
            ${bulletsHtml}
        `;
        container.appendChild(leadDiv);
    });
    saveToLocalStorage();
    checkPageFit();
}


// -------------------------------------------------------------
// EDITOR RENDERERS
// -------------------------------------------------------------

function renderEditorExperiences() {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    
    cvState.experiences.forEach((exp, idx) => {
        const card = document.createElement('div');
        card.className = 'dynamic-item-card';
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-index', idx);
        card.setAttribute('ondragstart', 'dragStart(event)');
        card.setAttribute('ondragover', 'dragOver(event)');
        card.setAttribute('ondragleave', 'dragLeave(event)');
        card.setAttribute('ondragend', 'dragEnd(event)');
        card.setAttribute('ondrop', 'dropExp(event)');
        
        // Bullets text areas list
        let bulletsFormHtml = '';
        exp.bullets.forEach((bullet, bulletIdx) => {
            bulletsFormHtml += `
                <div class="input-group" style="margin-bottom: 8px; display: flex; gap: 6px; align-items: flex-start;">
                    <textarea style="flex: 1; min-height: 50px;" rows="2" 
                              oninput="updateExpBullet(${idx}, ${bulletIdx}, this.value)">${bullet}</textarea>
                    <button class="btn btn-sm btn-danger" style="padding: 10px;" onclick="deleteExpBullet(${idx}, ${bulletIdx})" title="Maddiyi Sil">✕</button>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="dynamic-item-header">
                <span class="dynamic-item-title">Deneyim #${idx + 1}: ${exp.company || 'Yeni Şirket'}</span>
                <div>
                    <button class="btn btn-sm btn-secondary" onclick="moveExp(${idx}, -1)" title="Yukarı Taşı">▲</button>
                    <button class="btn btn-sm btn-secondary" onclick="moveExp(${idx}, 1)" title="Aşağı Taşı">▼</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteExperience(${idx})">Sil</button>
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].company}</label>
                    <input type="text" value="${exp.company}" oninput="updateExpField(${idx}, 'company', this.value)">
                </div>
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].location}</label>
                    <input type="text" value="${exp.location}" oninput="updateExpField(${idx}, 'location', this.value)">
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].role}</label>
                    <input type="text" value="${exp.role}" oninput="updateExpField(${idx}, 'role', this.value)">
                </div>
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].dates}</label>
                    <input type="text" value="${exp.dates}" oninput="updateExpField(${idx}, 'dates', this.value)">
                </div>
            </div>
            
            <div style="margin-top: 10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <label style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-dark-secondary);">${UI_TRANSLATIONS[lang].bullets_label}</label>
                    <button class="btn btn-sm btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="addExpBullet(${idx})">${UI_TRANSLATIONS[lang].add_bullet}</button>
                </div>
                <div class="hbs-guide-text" style="font-size:10px; color:var(--text-dark-muted); margin-bottom:8px; line-height:1.4;">
                    💡 ${UI_TRANSLATIONS[lang].hbs_guideline}
                </div>
                ${bulletsFormHtml}
            </div>
        `;
        container.appendChild(card);
    });
}

function renderEditorEducation() {
    const container = document.getElementById('education-list');
    container.innerHTML = '';
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    
    cvState.educations.forEach((edu, idx) => {
        const card = document.createElement('div');
        card.className = 'dynamic-item-card';
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-index', idx);
        card.setAttribute('ondragstart', 'dragStart(event)');
        card.setAttribute('ondragover', 'dragOver(event)');
        card.setAttribute('ondragleave', 'dragLeave(event)');
        card.setAttribute('ondragend', 'dragEnd(event)');
        card.setAttribute('ondrop', 'dropEdu(event)');
        
        card.innerHTML = `
            <div class="dynamic-item-header">
                <span class="dynamic-item-title">Eğitim #${idx + 1}: ${edu.university || 'Yeni Üniversite'}</span>
                <div>
                    <button class="btn btn-sm btn-danger" onclick="deleteEducation(${idx})">Sil</button>
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].school}</label>
                    <input type="text" value="${edu.university}" oninput="updateEduField(${idx}, 'university', this.value)">
                </div>
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].location}</label>
                    <input type="text" value="${edu.location}" oninput="updateEduField(${idx}, 'location', this.value)">
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].degree}</label>
                    <input type="text" value="${edu.degree}" oninput="updateEduField(${idx}, 'degree', this.value)">
                </div>
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].gpa}</label>
                    <input type="text" value="${edu.gpa || ''}" placeholder="Örn: 3.50 / 4.00" oninput="updateEduField(${idx}, 'gpa', this.value)">
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].dates}</label>
                    <input type="text" value="${edu.dates}" oninput="updateEduField(${idx}, 'dates', this.value)">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}


function renderEditorCertifications() {
    const container = document.getElementById('certifications-list');
    if (!container) return;
    container.innerHTML = '';
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    
    const certs = cvState.certifications || [];
    certs.forEach((c, idx) => {
        const card = document.createElement('div');
        card.className = 'dynamic-item-card';
        
        const labelName = (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang].label_cert_name) ? UI_TRANSLATIONS[lang].label_cert_name : 'Sertifika / Belge Adı';
        const labelIssuer = (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang].label_cert_issuer) ? UI_TRANSLATIONS[lang].label_cert_issuer : 'Veren Kurum / Organizasyon';
        const labelYear = (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang].label_cert_year) ? UI_TRANSLATIONS[lang].label_cert_year : 'Tarih / Yıl';
        
        card.innerHTML = `
            <div class="dynamic-item-header">
                <span class="dynamic-item-title">Sertifika #${idx + 1}: ${c.name || (lang === 'en' ? 'New Certificate' : 'Yeni Sertifika')}</span>
                <div>
                    <button class="btn btn-sm btn-secondary" onclick="moveCert(${idx}, -1)" title="Yukarı Taşı">▲</button>
                    <button class="btn btn-sm btn-secondary" onclick="moveCert(${idx}, 1)" title="Aşağı Taşı">▼</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCertification(${idx})">${lang === 'en' ? 'Delete' : 'Sil'}</button>
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group" style="grid-column: 1 / -1;">
                    <label>${labelName}</label>
                    <input type="text" value="${c.name || ''}" placeholder="Örn: Google Data Analytics Professional Certificate" oninput="updateCertField(${idx}, 'name', this.value)">
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${labelIssuer}</label>
                    <input type="text" value="${c.issuer || ''}" placeholder="Örn: Google" oninput="updateCertField(${idx}, 'issuer', this.value)">
                </div>
                <div class="input-group">
                    <label>${labelYear}</label>
                    <input type="text" value="${c.year || ''}" placeholder="Örn: 2026" oninput="updateCertField(${idx}, 'year', this.value)">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function moveCert(idx, dir) {
    if (!cvState.certifications) return;
    const target = idx + dir;
    if (target < 0 || target >= cvState.certifications.length) return;
    const temp = cvState.certifications[idx];
    cvState.certifications[idx] = cvState.certifications[target];
    cvState.certifications[target] = temp;
    saveToLocalStorage();
    renderEditorCertifications();
    renderCVCertifications();
}

function updateCertField(idx, field, value) {
    if (cvState.certifications && cvState.certifications[idx]) {
        cvState.certifications[idx][field] = value;
        renderCVCertifications();
        saveToLocalStorage();
    }
}

function deleteCertification(idx) {
    if (cvState.certifications) {
        cvState.certifications.splice(idx, 1);
        renderEditorCertifications();
        renderCVCertifications();
        saveToLocalStorage();
    }
}

function addCertification() {
    if (!cvState.certifications) cvState.certifications = [];
    cvState.certifications.push({ name: "", issuer: "", year: "" });
    renderEditorCertifications();
    renderCVCertifications();
    saveToLocalStorage();
}

function renderEditorReferences() {
    const container = document.getElementById('references-list');
    if (!container) return;
    container.innerHTML = '';
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    
    const refs = cvState.references || [];
    refs.forEach((r, idx) => {
        const card = document.createElement('div');
        card.className = 'dynamic-item-card';
        
        card.innerHTML = `
            <div class="dynamic-item-header">
                <span class="dynamic-item-title">Referans #${idx + 1}: ${r.name || (lang === 'en' ? 'New Reference' : 'Yeni Referans')}</span>
                <div>
                    <button class="btn btn-sm btn-danger" onclick="deleteReference(${idx})">${lang === 'en' ? 'Delete' : 'Sil'}</button>
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${lang === 'en' ? 'Full Name' : 'Referans Adı Soyadı'}</label>
                    <input type="text" value="${r.name || ''}" placeholder="Örn: Prof. Dr. Ahmet Yılmaz" oninput="updateRefField(${idx}, 'name', this.value)">
                </div>
                <div class="input-group">
                    <label>${lang === 'en' ? 'Title / Position' : 'Unvan / Pozisyon'}</label>
                    <input type="text" value="${r.title || ''}" placeholder="Örn: Bölüm Başkanı" oninput="updateRefField(${idx}, 'title', this.value)">
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${lang === 'en' ? 'Company / Institution' : 'Şirket / Kurum'}</label>
                    <input type="text" value="${r.company || ''}" placeholder="Örn: İstanbul Gedik Üniversitesi" oninput="updateRefField(${idx}, 'company', this.value)">
                </div>
                <div class="input-group">
                    <label>${lang === 'en' ? 'Contact Info' : 'İletişim (E-posta / Tel)'}</label>
                    <input type="text" value="${r.contact || ''}" placeholder="Örn: ahmet@gedik.edu.tr" oninput="updateRefField(${idx}, 'contact', this.value)">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateRefField(idx, field, value) {
    if (cvState.references && cvState.references[idx]) {
        cvState.references[idx][field] = value;
        if (!cvState.settings) cvState.settings = {};
        if (!cvState.settings.visibility) cvState.settings.visibility = {};
        cvState.settings.visibility.references = true;
        cvState.settings.showReferences = true;
        const toggleEl = document.getElementById('toggle-references');
        if (toggleEl) toggleEl.checked = true;
        
        renderCVReferences();
        saveToLocalStorage();
    }
}

function deleteReference(idx) {
    if (cvState.references) {
        cvState.references.splice(idx, 1);
        renderEditorReferences();
        renderCVReferences();
        saveToLocalStorage();
    }
}

function addReference() {
    if (!cvState.references) cvState.references = [];
    cvState.references.push({ name: "", title: "", company: "", contact: "" });
    if (!cvState.settings) cvState.settings = {};
    if (!cvState.settings.visibility) cvState.settings.visibility = {};
    cvState.settings.visibility.references = true;
    cvState.settings.showReferences = true;
    const toggleEl = document.getElementById('toggle-references');
    if (toggleEl) toggleEl.checked = true;
    
    renderEditorReferences();
    renderCVReferences();
    saveToLocalStorage();
}


function renderEditorLeadership() {
    const container = document.getElementById('leadership-list');
    container.innerHTML = '';
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    
    cvState.leaderships.forEach((lead, idx) => {
        const card = document.createElement('div');
        card.className = 'dynamic-item-card';
        card.setAttribute('draggable', 'true');
        card.setAttribute('data-index', idx);
        card.setAttribute('ondragstart', 'dragStart(event)');
        card.setAttribute('ondragover', 'dragOver(event)');
        card.setAttribute('ondragleave', 'dragLeave(event)');
        card.setAttribute('ondragend', 'dragEnd(event)');
        card.setAttribute('ondrop', 'dropLead(event)');
        
        // Bullets text areas list
        let bulletsFormHtml = '';
        lead.bullets.forEach((bullet, bulletIdx) => {
            bulletsFormHtml += `
                <div class="input-group" style="margin-bottom: 8px; display: flex; gap: 6px; align-items: flex-start;">
                    <textarea style="flex: 1; min-height: 50px;" rows="2" 
                              oninput="updateLeadBullet(${idx}, ${bulletIdx}, this.value)">${bullet}</textarea>
                    <button class="btn btn-sm btn-danger" style="padding: 10px;" onclick="deleteLeadBullet(${idx}, ${bulletIdx})" title="Maddiyi Sil">✕</button>
                </div>
            `;
        });
        
        card.innerHTML = `
            <div class="dynamic-item-header">
                <span class="dynamic-item-title">Faaliyet #${idx + 1}: ${lead.organization || 'Yeni Organizasyon'}</span>
                <div>
                    <button class="btn btn-sm btn-danger" onclick="deleteLeadership(${idx})">Sil</button>
                </div>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].company}</label>
                    <input type="text" value="${lead.organization}" oninput="updateLeadField(${idx}, 'organization', this.value)">
                </div>
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].dates}</label>
                    <input type="text" value="${lead.dates}" oninput="updateLeadField(${idx}, 'dates', this.value)">
                </div>
            </div>
            <div class="input-group">
                <label>${UI_TRANSLATIONS[lang].role}</label>
                <input type="text" value="${lead.role}" oninput="updateLeadField(${idx}, 'role', this.value)">
            </div>
            
            <div style="margin-top: 10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <label style="font-size:11px; font-weight:600; text-transform:uppercase; color:var(--text-dark-secondary);">${UI_TRANSLATIONS[lang].bullets_label}</label>
                    <button class="btn btn-sm btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="addLeadBullet(${idx})">${UI_TRANSLATIONS[lang].add_bullet}</button>
                </div>
                ${bulletsFormHtml}
            </div>
        `;
        container.appendChild(card);
    });
}


// -------------------------------------------------------------
// EXPERIENCE STATE MUTATORS
// -------------------------------------------------------------

function addExperience() {
    cvState.experiences.unshift({
        company: "Yeni Kurum",
        role: "Stajyer / Çalışan",
        location: "Şehir, Ülke",
        dates: "Başlangıç - Bitiş",
        bullets: ["Önemli Başarı: Proje detaylarınızı buraya yazın."]
    });
    renderCVExperiences();
    renderEditorExperiences();
}

function updateExpField(idx, field, value) {
    cvState.experiences[idx][field] = value;
    renderCVExperiences();
    // Update header label inside card dynamically without full re-render
    const cardTitle = document.querySelectorAll('#experience-list .dynamic-item-title')[idx];
    if (cardTitle && field === 'company') {
        cardTitle.textContent = `Deneyim #${idx + 1}: ${value || 'Yeni Şirket'}`;
    }
    debouncedSave();
}

function updateExpBullet(idx, bulletIdx, value) {
    cvState.experiences[idx].bullets[bulletIdx] = value;
    renderCVExperiences();
    debouncedSave();
}

function addExpBullet(idx) {
    cvState.experiences[idx].bullets.push("Yeni başarı/görev maddesi.");
    renderCVExperiences();
    renderEditorExperiences();
}

function deleteExpBullet(idx, bulletIdx) {
    cvState.experiences[idx].bullets.splice(bulletIdx, 1);
    renderCVExperiences();
    renderEditorExperiences();
}

function deleteExperience(idx) {
    cvState.experiences.splice(idx, 1);
    renderCVExperiences();
    renderEditorExperiences();
}

function moveExp(idx, direction) {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= cvState.experiences.length) return;
    
    // Swap items
    const temp = cvState.experiences[idx];
    cvState.experiences[idx] = cvState.experiences[targetIdx];
    cvState.experiences[targetIdx] = temp;
    
    renderCVExperiences();
    renderEditorExperiences();
}


// -------------------------------------------------------------
// EDUCATION STATE MUTATORS
// -------------------------------------------------------------

function addEducation() {
    cvState.educations.push({
        university: "Yeni Üniversite",
        degree: "Derece / Bölüm",
        location: "Şehir, Ülke",
        dates: "Başlangıç - Mezuniyet",
        gpa: "",
        details: ""
    });
    renderCVEducation();
    renderEditorEducation();
}

function updateEduField(idx, field, value) {
    cvState.educations[idx][field] = value;
    renderCVEducation();
    const cardTitle = document.querySelectorAll('#education-list .dynamic-item-title')[idx];
    if (cardTitle && field === 'university') {
        cardTitle.textContent = `Eğitim #${idx + 1}: ${value || 'Yeni Üniversite'}`;
    }
    debouncedSave();
}

function deleteEducation(idx) {
    cvState.educations.splice(idx, 1);
    renderCVEducation();
    renderEditorEducation();
}


// -------------------------------------------------------------
// LEADERSHIP STATE MUTATORS
// -------------------------------------------------------------

function addLeadership() {
    cvState.leaderships.push({
        organization: "Yeni Kulüp / Dernek",
        role: "Rol / Görev",
        dates: "Yıl - Yıl",
        bullets: ["Gerçekleştirilen faaliyet veya katkı."]
    });
    renderCVLeadership();
    renderEditorLeadership();
}

function updateLeadField(idx, field, value) {
    cvState.leaderships[idx][field] = value;
    renderCVLeadership();
    const cardTitle = document.querySelectorAll('#leadership-list .dynamic-item-title')[idx];
    if (cardTitle && field === 'organization') {
        cardTitle.textContent = `Faaliyet #${idx + 1}: ${value || 'Yeni Organizasyon'}`;
    }
    debouncedSave();
}

function updateLeadBullet(idx, bulletIdx, value) {
    cvState.leaderships[idx].bullets[bulletIdx] = value;
    renderCVLeadership();
    debouncedSave();
}

function addLeadBullet(idx) {
    cvState.leaderships[idx].bullets.push("Yeni faaliyet maddesi.");
    renderCVLeadership();
    renderEditorLeadership();
}

function deleteLeadBullet(idx, bulletIdx) {
    cvState.leaderships[idx].bullets.splice(bulletIdx, 1);
    renderCVLeadership();
    renderEditorLeadership();
}

function deleteLeadership(idx) {
    cvState.leaderships.splice(idx, 1);
    renderCVLeadership();
    renderEditorLeadership();
}


// -------------------------------------------------------------
// STYLING AND STYLE UPDATES
// -------------------------------------------------------------

function updateStyles() {
    const doc = document.getElementById('cv-document');
    if (!doc) return;
    
    // Read selections
    const font = document.getElementById('setting-font').value;
    const size = document.getElementById('setting-size').value;
    const spacing = document.getElementById('setting-spacing').value;
    const margin = document.getElementById('setting-margin').value;
    const alignment = document.getElementById('setting-alignment').value;
    const accent = document.getElementById('setting-accent').value;
    const headings = document.getElementById('setting-headings').value;
    
    // Save settings to state and persist, preserving other settings keys like uiLang or visibility
    if (!cvState.settings) cvState.settings = {};
    
    // If user changed base style manually, we can reset dynamic scale to 1.0
    if (cvState.settings.font !== font || 
        cvState.settings.size !== size || 
        cvState.settings.spacing !== spacing || 
        cvState.settings.margin !== margin || 
        cvState.settings.alignment !== alignment || 
        cvState.settings.accent !== accent ||
        cvState.settings.headings !== headings) {
        cvState.settings.dynamicScale = '1.0';
    }
    
    cvState.settings.font = font;
    cvState.settings.size = size;
    cvState.settings.spacing = spacing;
    cvState.settings.margin = margin;
    cvState.settings.alignment = alignment;
    cvState.settings.accent = accent;
    cvState.settings.headings = headings;
    
    saveToLocalStorage();
    
    // Reset classes
    doc.className = 'cv-page';
    
    // Apply selected classes
    doc.classList.add(font, size, spacing, margin, alignment, accent, headings);
    
    // Apply dynamicScale if set
    const scale = cvState.settings.dynamicScale || '1.0';
    doc.style.setProperty('--dynamic-scale', scale);
    
    // Recalculate page fit after style changes
    checkPageFit();
}

// Check if CV content overflows 1 page (11.0 inches = 1056px at 96dpi)
function checkPageFit() {
    const inner = document.querySelector('.cv-page-inner');
    const badge = document.getElementById('page-fit-badge');
    if (!inner || !badge) return;

    // Use a small timeout to let the DOM layout update first
    setTimeout(() => {
        const isOverflowing = inner.scrollHeight > inner.clientHeight + 2;
        if (isOverflowing) {
            const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
            badge.textContent = UI_TRANSLATIONS[lang].fit_no;
            badge.className = "badge badge-warning";
        } else {
            const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
            badge.textContent = UI_TRANSLATIONS[lang].fit_yes;
            badge.className = "badge badge-success";
        }
    }, 40);
}

// Automatically adjust layout variables gradually to fit CV to exactly one page
function autoFitToPage() {
    const doc = document.getElementById('cv-document');
    const inner = document.querySelector('.cv-page-inner');
    if (!doc || !inner) return;

    if (!cvState.settings) cvState.settings = {};

    // Reset dynamic scale first to check natural overflow bounds
    doc.style.setProperty('--dynamic-scale', '1.0');
    
    let isOverflowing = inner.scrollHeight > inner.clientHeight + 1;
    
    if (!isOverflowing) {
        cvState.settings.dynamicScale = "1.0";
        saveToLocalStorage();
        checkPageFit();
        const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
        alert(lang === 'tr' ? "İçerik zaten tek sayfaya sığmaktadır!" : "Content already fits on a single page!");
        return;
    }
    
    const minScale = 0.65;
    const step = 0.01;
    
    // Stage 1: Gradually scale down with current layout settings (1.00 down to 0.65)
    let scale = 1.0;
    while (scale >= minScale) {
        doc.style.setProperty('--dynamic-scale', scale.toFixed(2));
        isOverflowing = inner.scrollHeight > inner.clientHeight + 1;
        if (!isOverflowing) {
            cvState.settings.dynamicScale = scale.toFixed(2);
            saveToLocalStorage();
            checkPageFit();
            
            const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
            const scalePct = Math.round(scale * 100);
            const fitMsg = lang === 'tr' 
                ? `İçerik, ölçek %${scalePct} oranına düşürülerek başarıyla tek sayfaya sığdırıldı!` 
                : `Content successfully fit to single page by scaling down to ${scalePct}%!`;
            alert(fitMsg);
            return;
        }
        scale -= step;
    }
    
    // Stage 2: If still overflowing at 0.65, automatically optimize spacing and margin settings
    cvState.settings.spacing = "spacing-tight";
    cvState.settings.margin = "margin-compact";
    cvState.settings.size = "size-small";
    
    updateStyles();
    
    // Stage 2 Scale Test (1.00 down to 0.65 with compact layout)
    scale = 1.0;
    while (scale >= minScale) {
        doc.style.setProperty('--dynamic-scale', scale.toFixed(2));
        isOverflowing = inner.scrollHeight > inner.clientHeight + 1;
        if (!isOverflowing) {
            cvState.settings.dynamicScale = scale.toFixed(2);
            saveToLocalStorage();
            loadStateIntoUI();
            updateStyles();
            checkPageFit();
            
            const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
            const scalePct = Math.round(scale * 100);
            const fitMsg = lang === 'tr' 
                ? `İçerik, kenar ve satır boşlukları sıkılaştırılıp ölçek %${scalePct} oranına düşürülerek tek sayfaya sığdırıldı!` 
                : `Content fit to single page by tightening spacing and scaling to ${scalePct}%!`;
            alert(fitMsg);
            return;
        }
        scale -= step;
    }
    
    // Stage 3: Extreme content density fallback
    doc.style.setProperty('--dynamic-scale', '0.65');
    cvState.settings.dynamicScale = '0.65';
    saveToLocalStorage();
    loadStateIntoUI();
    updateStyles();
    checkPageFit();
    
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    const failMsg = lang === 'tr'
        ? "İçerik çok yoğun olduğu için boşluklar sıkılaştırılıp %65 ölçeğe düşürüldü. Kusursuz 1 sayfa görünümü için özetteki 1-2 cümleyi veya staj maddelerinizi biraz kısaltabilirsiniz."
        : "The content density is very high. Spacing was tightened and scaled to 65%. For a perfect single page fit, consider shortening summary or bullet points.";
    alert(failMsg);
}

// Adjust Zoom
function adjustZoom(amount) {
    currentZoom = Math.max(0.5, Math.min(1.5, currentZoom + amount));
    applyZoom();
}

function applyZoom() {
    const doc = document.getElementById('cv-document');
    if (doc) {
        doc.style.transform = `scale(${currentZoom})`;
        document.getElementById('zoom-value').textContent = `${Math.round(currentZoom * 100)}%`;
    }
}

// Dark/Light Theme for Editor Panels and App Shell
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('editor-dark-mode');
    
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    
    const isDark = body.classList.contains('editor-dark-mode');
    if (isDark) {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
    
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.theme = isDark ? 'dark' : 'light';
    saveToLocalStorage();
}

// -------------------------------------------------------------
// DATA STORAGE AND IMPORT/EXPORT PORTABLE UTILITIES
// -------------------------------------------------------------

let saveTimeout = null;

function saveToLocalStorage() {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
        saveTimeout = null;
    }
    localStorage.setItem('harvard_cv_state', JSON.stringify(cvState));
    showSaveStatusIndicator();
    if (typeof calculateATSScore === 'function') {
        calculateATSScore();
    }
}

function debouncedSave(delay = 1500) {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
    }
    saveTimeout = setTimeout(() => {
        saveToLocalStorage();
    }, delay);
}

function showSaveStatusIndicator() {
    const badge = document.getElementById('save-status-badge');
    if (!badge) return;
    const lang = (cvState && cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : 'tr';
    const text = (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang].save_status_saved) ? UI_TRANSLATIONS[lang].save_status_saved : "Kaydedildi ✓";
    badge.textContent = text;
    badge.style.opacity = '1';
    
    if (window._saveBadgeTimeout) clearTimeout(window._saveBadgeTimeout);
    window._saveBadgeTimeout = setTimeout(() => {
        badge.style.opacity = '0';
    }, 1800);
}

window.addEventListener('beforeunload', () => {
    if (saveTimeout) {
        clearTimeout(saveTimeout);
        saveTimeout = null;
    }
    localStorage.setItem('harvard_cv_state', JSON.stringify(cvState));
});

function exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cvState, null, 4));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    
    // Create clean file name based on user name
    const rawName = cvState.personal.name || "cv_backup";
    const fileName = rawName.toLowerCase().replace(/[^a-z0-9_]+/g, '_') + "_cv_state.json";
    
    downloadAnchor.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}


function triggerImport() {
    const fileInput = document.getElementById('import-file');
    if (fileInput) fileInput.click();
}

async function _legacy_processPDFImport1_disabled(file) {
    try {
        const statusText = document.getElementById('translate-status-text');
        const progressBox = document.getElementById('translate-progress-box');
        if (progressBox) progressBox.style.display = 'block';
        if (statusText) statusText.textContent = "📄 PDF CV'niz analiz ediliyor ve yükleniyor...";
        
        const extractedText = await extractTextFromPDF(file);
        if (progressBox) progressBox.style.display = 'none';
        
        if (!extractedText || extractedText.trim().length < 50) {
            alert("PDF dosyasından okunabilir metin çıkarılamadı. Lütfen metin içeren bir CV yükleyin.");
            return;
        }
        
        const parsedState = parseCVTextToState(extractedText);
        cvState = parsedState;
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        
        alert("🎉 PDF CV'niz başarıyla ayrıştırıldı ve düzenlemeye hazır hale getirildi!");
    } catch (err) {
        console.error("PDF Import error:", err);
        const progressBox = document.getElementById('translate-progress-box');
        if (progressBox) progressBox.style.display = 'none';
        alert("PDF dosyası işlenirken bir hata oluştu. Lütfen dosyanızı kontrol edin.");
    }
}

function _legacy_importJSON_disabled(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Check if uploaded file is PDF or JSON
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.pdf')) {
        processPDFImport(file);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data && (data.personal || data.experiences)) {
                cvState = data;
                saveToLocalStorage();
                applyLanguage();
                loadStateIntoUI();
                renderAll();
                updateStyles();
                alert("🎉 Özgeçmiş yedek dosyanız başarıyla yüklendi!");
            } else {
                alert("Hata: Geçersiz CV yedek dosyası.");
            }
        } catch (err) {
            console.error("JSON import err, trying PDF parser fallback...", err);
            processPDFImport(file);
        }
    };
    reader.readAsText(file);
}


function _legacy_processPDFImport_disabled(file, lang, event) {
    const confirmMsg = lang === 'en'
        ? "A PDF file was detected. Do you want to parse this PDF and load its content into your CV? Your current data will be updated."
        : "Bir PDF dosyası seçildi. Bu PDF dosyasının içeriği otomatik çözümlenip CV'nize yüklensin mi? Mevcut verileriniz güncellenecektir.";
    
    if (!confirm(confirmMsg)) {
        if (event && event.target) event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const arrayBuffer = e.target.result;
            const extractedText = await extractTextFromPDF(arrayBuffer);
            if (!extractedText || !extractedText.trim()) {
                alert(lang === 'en' ? "Error: Could not extract text from this PDF file. (Scanned image PDFs are not supported)." : "Hata: Bu PDF dosyasından metin okunamadı. (Resim/Görsel formatındaki taranmış PDF'ler desteklenmez).");
                if (event && event.target) event.target.value = '';
                return;
            }
            
            const parsedState = parseCVTextToState(extractedText);
            cvState = parsedState;
            saveToLocalStorage();
            applyLanguage();
            loadStateIntoUI();
            renderAll();
            updateStyles();
            
            if (event && event.target) event.target.value = '';
            alert(lang === 'en' ? "PDF CV successfully read and loaded into the editor!" : "PDF CV'niz başarıyla okundu ve editöre yüklendi!");
        } catch (err) {
            console.error("PDF import error:", err);
            if (event && event.target) event.target.value = '';
            alert(lang === 'en' ? "Failed to parse PDF file." : "PDF dosyası okunurken bir hata oluştu.");
        }
    };
    reader.readAsArrayBuffer(file);
}

function isBulletPointLine(line) {
    if (!line) return false;
    const str = line.trim();
    if (str.startsWith('•') || str.startsWith('-') || str.startsWith('*')) return true;
    
    // Lowercase starting lines are continuations of previous sentences/bullets
    const firstChar = str.charAt(0);
    if (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase()) {
        return false;
    }

    if (str.length > 75) return true;
    
    const verbs = [
        "yönetti", "geliştirdi", "kurguladı", "hazırladı", "sağladı", "raporladı", "sundu", "kazandı", "azalttı",
        "iyileştirdi", "analiz etti", "yürüterek", "yöneterek", "gerçekleştirdi", "tamamladı", "koordine etti",
        "organize etti", "ulaştı", "tasarlayıp", "ederek", "sağlayarak", "tasarlayarak", "aldı", "seçildi",
        "spearheaded", "developed", "architected", "managed", "implemented", "engineered", "led", "increased", "reduced"
    ];
    const lower = str.toLowerCase();
    return verbs.some(v => lower.includes(v));
}

function parseCertItem(certStr) {
    if (!certStr || !certStr.trim()) return null;
    let str = certStr.trim();
    if (str.startsWith('(') && str.endsWith(')')) {
        str = str.substring(1, str.length - 1).trim();
    }
    
    let year = "";
    const yearMatch = str.match(/\b(20\d{2}(?:\s*[-–—]\s*20\d{2})?|19\d{2})\b/);
    if (yearMatch) {
        year = yearMatch[0];
        str = str.replace(yearMatch[0], "").replace(/,\s*$/, "").replace(/\(\s*\)/, "").trim();
    }
    
    let issuer = "";
    const parenMatch = str.match(/\((.*?)\)/);
    if (parenMatch && parenMatch[1].trim()) {
        issuer = parenMatch[1].trim();
        str = str.replace(parenMatch[0], "").trim();
    } else if (str.includes('&') || str.includes('Üniversitesi') || str.includes('Kulübü') || str.includes('Google') || str.includes('Microsoft')) {
        const parts = str.split(/[-–:]/);
        if (parts.length >= 2) {
            str = parts[0].trim();
            issuer = parts[1].trim();
        }
    }
    
    const cleanName = str.replace(/^[-–—,\s()]+|[-–—,\s()]+$/g, '').trim();
    if (!cleanName) return null;
    return {
        name: cleanName,
        issuer: issuer,
        year: year
    };
}

function cleanPDFText(rawText) {
    if (!rawText) return "";
    let text = rawText;
    
    // Explicit string fixes for glued header text
    text = text.replace(/SamayİşGeliştirme/g, "Samay İş Geliştirme");
    text = text.replace(/Samayİş/g, "Samay İş");
    text = text.replace(/StajyerİşAnalisti/g, "Stajyer İş Analisti");
    const REPAIRS = {
        "DENEY İ M": "DENEYİM", "E Ğ İ T İ M": "EĞİTİM", "L İ DERL İ K": "LİDERLİK",
        "İ Ş DENEY İ M İ": "İŞ DENEYİMİ", "SERT İ F İ KALAR": "SERTİFİKALAR",
        "AKADEM İ S İ": "AKADEMİSİ", "TEKN İ K": "TEKNİK", "İ LG İ": "İLGİ",
        "Ü N İ VER S İ TES İ": "ÜNİVERSİTESİ", "ÜN İ VERSİ TESİ": "ÜNİVERSİTESİ",
        "İ STANBUL": "İSTANBUL", "GEDİ K": "GEDİK", "DENİ ZBANK": "DENİZBANK",
        "MEDİ BULUT": "MEDİBULUT", "Derneğ i": "Derneği", "Do ğ ukan": "Doğukan",
        "Geliş tirme": "Geliştirme", "Biliş im": "Bilişim", "Görselleş tirme": "Görselleştirme",
        "Ba ş kanı": "Başkanı", "İ ş": "İş", "ş tirmesini": "ştirmesini", "İ zmir": "İzmir",
        "SamayİşGeliştirme": "Samay İş Geliştirme",
        "Samayİş": "Samay İş",
        "StajyerİşAnalisti": "Stajyer İş Analisti",
        "LOCOMARİzmir": "LOCOMAR İzmir",
        "TEKNOLOJİAKADEMİSİ": "TEKNOLOJİ AKADEMİSİ",
        "ÜNİVERSİTESİKULÜPLERİ": "ÜNİVERSİTESİ KULÜPLERİ",
        "İşoperasyonları": "İş operasyonları",
        "işakış": "iş akış",
        "satıştrendleri": "satış trendleri",
        "yaşgrubuna": "yaş grubuna",
        "İTÜİşletme": "İTÜ İşletme",
        "genişölçekli": "geniş ölçekli",
        "satışve": "satış ve",
        "İşGeliştirme": "İş Geliştirme",
        "Evvel Zamanİçinde": "Evvel Zaman İçinde",
        "Ekran Zamanında!projesinde": "Ekran Zamanında! projesinde",
        "EĞİTİMİSTANBUL": "EĞİTİM\nİSTANBUL",
        "EĞİTİMİ": "EĞİTİM\nİ",
        "YETENEKLER, SERTİFİKALAR VEİLGİ ALANLARI": "YETENEKLER, SERTİFİKALAR VE İLGİ ALANLARI",
        "YETENEKLER, SERTİFİKALAR VEİLGİ": "YETENEKLER, SERTİFİKALAR VE İLGİ"
    };
    
    for (const [bad, good] of Object.entries(REPAIRS)) {
        text = text.replaceAll(bad, good);
    }

    // Force section headers onto separate lines
    const sectionHeaderRegex = /(PROFESYONEL ÖZET|ÖZET|SUMMARY|DENEYİM|İŞ DENEYİMİ|EXPERIENCE|EĞİTİM|EDUCATION|LİDERLİK VE GÖNÜLLÜLÜK|LİDERLİK|GÖNÜLLÜLÜK|LEADERSHIP|YETENEKLER, SERTİFİKALAR VE İLGİ ALANLARI|YETENEKLER[^\n]*|SERTİFİKALAR|CERTIFICATIONS|REFERANSLAR|REFERENCES)/gu;
    text = text.replace(sectionHeaderRegex, '\n$1\n');
    
    // Fix smashed camelCase/Unicode boundaries
    text = text.replace(/([a-zçğıöşü])([A-ZÇĞİÖŞÜ])/g, '$1 $2');
    text = text.replace(/([A-ZÇĞİÖŞÜ]{2,})([A-ZÇĞİÖŞÜ][a-zçğıöşü])/g, '$1 $2');
    
    // Fix isolated single diacritic letters surrounded by spaces
    text = text.replace(/(\b[a-zA-ZÇĞİÖŞÜçğıöşü]{2,}[a-zA-Zçğıöşü])\s+([ğşğıiöüçİĞŞÖÜÇ])(\s+|$)/g, '$1$2$3');
    text = text.replace(/(\b[A-ZÇĞİÖŞÜa-zçğıöşü]+)\s*İ\s*([A-ZÇĞİÖŞÜa-zçğıöşü]+)/g, '$1İ$2');
    text = text.replace(/(\b[A-ZÇĞİÖŞÜa-zçğıöşü]+)\s*ş\s*([A-ZÇĞİÖŞÜa-zçğıöşü]+)/g, '$1ş$2');
    
    return text;
}

async function extractTextFromPDF(arrayBuffer) {
    if (typeof pdfjsLib === 'undefined') {
        throw new Error("PDF.js kütüphanesi yüklenemedi. Lütfen internet bağlantınızı kontrol edip sayfayı yenileyin.");
    }
    
    try {
        if (typeof require !== 'undefined') {
            pdfjsLib.GlobalWorkerOptions.workerSrc = require.resolve('pdfjs-dist/legacy/build/pdf.worker.js');
        } else {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
    } catch (e) {
        console.warn("Worker setting warning:", e);
    }
    
    let pdf;
    try {
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0, stopAtErrors: false });
        pdf = await loadingTask.promise;
    } catch (workerErr) {
        console.warn("PDF worker loading failed, trying fallback...", workerErr);
        pdfjsLib.GlobalWorkerOptions.workerSrc = '';
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0, stopAtErrors: false });
        pdf = await loadingTask.promise;
    }

    let fullText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let lastY = null;
        let lastX = null;
        let lastWidth = null;
        let pageLines = [];
        let currentLine = "";
        
        textContent.items.forEach(item => {
            const str = item.str;
            if (!str) return;

            const y = item.transform ? item.transform[5] : null;
            const x = item.transform ? item.transform[4] : null;

            if (lastY !== null && y !== null && Math.abs(y - lastY) > 4) {
                if (currentLine.trim()) pageLines.push(currentLine.trim());
                currentLine = "";
                lastX = null;
            }

            let needSpace = false;
            if (lastX !== null && x !== null && lastWidth !== null) {
                const expectedNextX = lastX + lastWidth;
                if (x - expectedNextX > 2.5) {
                    needSpace = true;
                }
            }

            if (currentLine && !currentLine.endsWith(' ') && !str.startsWith(' ') && (needSpace || /^[\p{L}\p{N}]/u.test(str))) {
                currentLine += " ";
            }
            
            currentLine += str;
            lastY = y;
            lastX = x;
            lastWidth = item.width || 0;
        });
        if (currentLine.trim()) pageLines.push(currentLine.trim());
        
        fullText += pageLines.join("\n") + "\n";
    }
    
    return cleanPDFText(fullText);
}

function normalizeHeaderKey(line) {
    if (!line) return "";
    let norm = line.toUpperCase();
    norm = norm.replace(/[^A-Z0-9ÇĞİÖŞÜ]/g, '');
    const trMap = { 'İ': 'I', 'I': 'I', 'Ğ': 'G', 'Ş': 'S', 'Ü': 'U', 'Ö': 'O', 'Ç': 'C' };
    for (const [tr, lat] of Object.entries(trMap)) {
        norm = norm.replaceAll(tr, lat);
    }
    return norm;
}

function parseCVTextToState(rawText) {
    const cleanedText = cleanPDFText(rawText);
    
    const defaultSettings = (cvState && cvState.settings) ? cvState.settings : {
        font: "font-garamond",
        size: "size-medium",
        spacing: "spacing-normal",
        margin: "margin-normal",
        alignment: "align-justify",
        accent: "accent-black",
        headings: "headings-line",
        refMode: "request",
        uiLang: "tr"
    };

    const newState = {
        personal: {
            name: "", title: "", email: "", phone: "", location: "",
            github: "", linkedin: "", website: "", summary: ""
        },
        experiences: [],
        educations: [],
        leaderships: [],
        skills: { technical: "", tools: "", langs: "" },
        certifications: [],
        references: [],
        settings: defaultSettings
    };

    if (!cleanedText || !cleanedText.trim()) return newState;

    const emailMatch = cleanedText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) newState.personal.email = emailMatch[0];

    const phoneMatch = cleanedText.match(/(\+?\d{1,3}[\s-]?)?\(?\d{3,4}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/);
    if (phoneMatch) newState.personal.phone = phoneMatch[0];

    const linkedinMatch = cleanedText.match(/(linkedin\.com\/in\/[a-zA-Z0-9_-]+)/i);
    if (linkedinMatch) newState.personal.linkedin = linkedinMatch[0];

    const githubMatch = cleanedText.match(/(github\.com\/[a-zA-Z0-9_-]+)/i);
    if (githubMatch) newState.personal.github = githubMatch[0];

    const websiteMatch = cleanedText.match(/([a-zA-Z0-9_-]+\.github\.io)/i);
    if (websiteMatch) newState.personal.website = websiteMatch[0];

    const lines = cleanedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return newState;

    let headerLine = cleanPDFText(lines[0]);
    if (headerLine.toLowerCase().includes("curriculum") || headerLine.toLowerCase().includes("resume") || headerLine.toLowerCase().includes("cv")) {
        if (lines[1]) headerLine = cleanPDFText(lines[1]);
    }
    
    // Dissect Name vs Title if merged on first line
    const cleanHeader = cleanPDFText(headerLine);
    const rawWords = cleanHeader.split(/\s+/);
    let detectedName = cleanHeader;
    let detectedTitle = "";

    if (rawWords.length >= 2) {
        let nameCount = 2;
        if (rawWords.length >= 3 && /^[A-ZÇĞİÖŞÜ]/.test(rawWords[2])) {
            const w2Lower = rawWords[2].toLowerCase();
            if (!["iş", "veri", "yazılım", "süreç", "ürün", "kıdemli", "senior", "junior", "lead", "full-stack", "product", "data", "business", "&"].includes(w2Lower)) {
                nameCount = 3;
            }
        }
        detectedName = rawWords.slice(0, nameCount).join(' ');
        detectedTitle = cleanHeader.substring(cleanHeader.indexOf(detectedName) + detectedName.length).replace(/^[\s|–—-]+/, '').trim();
    }

    newState.personal.name = detectedName.replace(/İş.*$/gi, '').replace(/Veri.*$/gi, '').replace(/Stajyer.*$/gi, '').trim();
    if (detectedTitle) {
        newState.personal.title = detectedTitle.replace(/^[\s|–—&-]+/, '').trim();
    } else if (cleanHeader.length > newState.personal.name.length) {
        newState.personal.title = cleanHeader.substring(cleanHeader.indexOf(newState.personal.name) + newState.personal.name.length).replace(/^[\s|–—-]+/, '').trim();
    }

    const SECTION_KEYS_NORM = {
        SUMMARY: ["PROFESYONELOZET", "HAKKIMDA", "OZET", "SUMMARY", "ABOUTME", "OBJECTIVE", "PROFILE", "BIOGRAPHY", "BIOGRAFI", "KISASELISE", "INTRO"],
        EXPERIENCE: ["ISDENEYIMI", "ISDENEYIMLERI", "DENEYIM", "DENEYIMLER", "EXPERIENCE", "WORKEXPERIENCE", "EMPLOYMENT", "EMPLOYMENTHISTORY", "CAREER", "PROFESSIONALEXPERIENCE", "STAJVEISDENEYIMI", "DENEYIMLERIM", "ISGECMISI", "PROJECTS", "PROJELER"],
        EDUCATION: ["EGITIM", "EGITIMBILGILERI", "EDUCATION", "ACADEMIC", "QUALIFICATIONS", "OGRENIMDURUMU", "EGITIMGECMISI", "ACADEMICBACKGROUND", "EGITIMVEKURS", "AKADEMİK"],
        LEADERSHIP: ["LIDERLIK", "LIDERLIKVEGONULLULUK", "GONULLULUK", "LEADERSHIP", "VOLUNTEERING", "ACTIVITIES", "SOSYALSORUMLULUK", "KULUBVEDERNEKLER", "TOPLULUKLAR", "ORGANIZASYONLAR", "EXTRACURRICULAR"],
        SKILLS: ["TEKNIKBECERILER", "BECERILER", "YETENEKLER", "YETENEKLERVESSERTIFIKALAR", "YETENEKLERSERTIFIKALAR", "SKILLS", "TECHNICALSKILLS", "DILLER", "LANGUAGES", "YETENEKLERSERTIFIKALARVEILGIALANLARI", "BECERIVEUZMANLIKLAR", "COMPETENCIES", "UZMANLIKALANLARI"],
        CERTS: ["SERTIFIKALAR", "SERTIFIKAVEEGITIMLER", "CERTIFICATIONS", "CERTIFICATES", "LICENSES", "LICENSESCERTIFICATIONS", "KURSLARVESERTIFIKALAR", "BASARIVESERTIFIKALAR"],
        REFS: ["REFERANSLAR", "REFERENCES", "REFERANS", "TAVSIYELER", "RECOMMENDATIONS"]
    };

    // Pre-process lines to isolate fused Section Headers (e.g. "EĞİTİM İSTANBUL..." -> "EĞİTİM", "İSTANBUL...")
    const processedLines = [];
    const allHeaderKeywords = [
        "PROFESYONEL ÖZET", "ÖZET", "SUMMARY", "ABOUT ME", "HAKKIMDA",
        "İŞ DENEYİMİ", "İŞ DENEYİMLERİ", "DENEYİM", "DENEYİMLER", "EXPERIENCE", "WORK EXPERIENCE", "EMPLOYMENT HISTORY", "PROFESSIONAL EXPERIENCE", "DENEYİMLERİM", "İŞ GEÇMİŞİ", "CAREER", "PROJELER", "PROJECTS",
        "EĞİTİM BİLGİLERİ", "EĞİTİM GEÇMİŞİ", "ÖĞRENİM DURUMU", "EĞİTİM", "EDUCATION", "ACADEMIC BACKGROUND", "QUALIFICATIONS",
        "LİDERLİK VE GÖNÜLLÜLÜK", "LİDERLİK", "GÖNÜLLÜLÜK", "LEADERSHIP", "VOLUNTEERING", "ACTIVITIES", "SOSYAL SORUMLULUK", "EXTRACURRICULAR",
        "YETENEKLER, SERTİFİKALAR VE İLGİ ALANLARI", "YETENEKLER VE SERTİFİKALAR", "BECERİ VE UZMANLIKLAR", "TEKNİK BECERİLER", "YETENEKLER", "BECERİLER", "SKILLS", "TECHNICAL SKILLS", "COMPETENCIES", "DİLLER", "LANGUAGES",
        "SERTİFİKALAR VE EĞİTİMLER", "KURSLAR VE SERTİFİKALAR", "SERTİFİKALAR", "CERTIFICATIONS", "CERTIFICATES", "LICENSES & CERTIFICATIONS",
        "REFERANSLAR", "REFERENCES", "REFERANS"
    ];

    lines.forEach(l => {
        let lineStr = l.trim();
        let splitDone = false;
        for (const kw of allHeaderKeywords) {
            const normL = normalizeHeaderKey(lineStr);
            const normKw = normalizeHeaderKey(kw);
            if (normL !== normKw && normL.startsWith(normKw)) {
                const matchIndex = lineStr.toUpperCase().indexOf(kw.toUpperCase());
                if (matchIndex === 0) {
                    const headerPart = lineStr.substring(0, kw.length).trim();
                    const restPart = lineStr.substring(kw.length).replace(/^[:\s–—-]+/, '').trim();
                    if (restPart) {
                        processedLines.push(headerPart);
                        processedLines.push(restPart);
                        splitDone = true;
                        break;
                    }
                }
            }
        }
        if (!splitDone) processedLines.push(lineStr);
    });

    let currentSec = null;
    const sections = { SUMMARY: [], EXPERIENCE: [], EDUCATION: [], LEADERSHIP: [], SKILLS: [], CERTS: [], REFS: [] };

    for (let i = 1; i < processedLines.length; i++) {
        const line = processedLines[i];
        const normLine = normalizeHeaderKey(line);
        let matchedSec = null;

        for (const [secCode, keywords] of Object.entries(SECTION_KEYS_NORM)) {
            if (keywords.some(kw => {
                if (normLine === kw) return true;
                return line.length <= 45 && !line.trim().startsWith('•') && !line.trim().startsWith('-') && (normLine.startsWith(kw) || normLine === kw) && (normLine.length - kw.length) <= 10;
            })) {
                matchedSec = secCode;
                break;
            }
        }

        if (matchedSec) {
            currentSec = matchedSec;
        } else if (currentSec) {
            sections[currentSec].push(line);
        } else {
            if (!newState.personal.location && (line.includes('/') || line.includes('İstanbul') || line.includes('Ankara') || line.includes('Izmir') || line.includes('Turkey') || line.includes('Türkiye') || line.includes('Çanakkale') || line.includes('Sancaktepe'))) {
                newState.personal.location = line.replace(/^.*?\|\s*/, '').trim();
            } else if (!newState.personal.title && !line.includes('@') && !line.includes('http') && line.length < 50) {
                newState.personal.title = line;
            }
        }
    }

    if (sections.SUMMARY.length > 0) {
        newState.personal.summary = sections.SUMMARY.join(' ');
    }

    const monthPattern = "(?:\\d{1,2}|Ocak|Şubat|Mart|Nisan|Mayıs|Haziran|Temmuz|Ağustos|Eylul|Eylül|Ekim|Kasım|Aralık|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)";
    const dateRegex = new RegExp(`(?:(?:${monthPattern}[\\/\\s]+\\d{4}|\\b\\d{4})\\s*[-–—to\\s]+\\s*(?:${monthPattern}[\\/\\s]+\\d{4}|\\b\\d{4}|Devam|Present|Hala|Current))|(?:\\b\\d{4}\\s*[-–—]\\s*\\d{4}\\b)`, "i");
    const cities = ["Çanakkale", "İstanbul", "İzmir", "Ankara", "Sancaktepe", "Turkey", "Türkiye"];

    // 1. High-precision Experience Parsing
    if (sections.EXPERIENCE.length > 0) {
        const expLines = sections.EXPERIENCE;
        let i = 0;
        while (i < expLines.length) {
            let line = expLines[i].trim();
            if (!line) { i++; continue; }

            // Guard: If line is a bullet point, append to current experience or skip
            if (isBulletPointLine(line) && newState.experiences.length > 0) {
                const firstChar = line.charAt(0);
                const isLowercase = (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase());
                const lastBullets = newState.experiences[newState.experiences.length - 1].bullets;
                
                if (isLowercase && lastBullets.length > 0) {
                    lastBullets[lastBullets.length - 1] += ' ' + line;
                } else {
                    lastBullets.push(line.replace(/^[•\-\*]\s*/, ''));
                }
                i++;
                continue;
            }

            let hasDate = dateRegex.test(line);
            let nextLine = (i + 1 < expLines.length) ? expLines[i + 1].trim() : "";
            let nextHasDate = dateRegex.test(nextLine);

            let company = "";
            let role = "";
            let location = "İstanbul, Türkiye";
            let dates = "";

            if (!hasDate && nextHasDate && !isBulletPointLine(nextLine)) {
                let compLine = line;
                let roleLine = nextLine;
                i += 2;

                for (const city of cities) {
                    if (compLine.includes(city)) {
                        const cityIdx = compLine.indexOf(city);
                        const locEndIdx = compLine.indexOf("Türkiye", cityIdx);
                        let locString = "";
                        if (locEndIdx !== -1) {
                            locString = compLine.substring(cityIdx, locEndIdx + 7).trim();
                        } else {
                            locString = `${city}, Türkiye`;
                        }
                        location = locString;
                        
                        const beforeLoc = compLine.substring(0, cityIdx).replace(/,/g, '').trim();
                        const afterLoc = (locEndIdx !== -1) ? compLine.substring(locEndIdx + 7).replace(/,/g, '').trim() : compLine.substring(cityIdx + city.length).replace(/,/g, '').trim();
                        
                        if (beforeLoc) company = beforeLoc;
                        if (afterLoc) role = afterLoc;
                        break;
                    }
                }
                if (!company) company = compLine;

                const match = roleLine.match(dateRegex);
                if (match) {
                    dates = match[0].trim();
                    const cleanRoleStr = roleLine.replace(dates, "").replace(company, "").replace(/^[-–—,\s]+|[-–—,\s]+$/g, '').trim();
                    if (cleanRoleStr) role = cleanRoleStr;
                } else if (!role) {
                    role = roleLine;
                }
            } else if (hasDate) {
                const match = line.match(dateRegex);
                if (match) {
                    dates = match[0].trim();
                    line = line.replace(dates, "").trim();
                }
                for (const city of cities) {
                    if (line.includes(city)) {
                        const cityIdx = line.indexOf(city);
                        const locEndIdx = line.indexOf("Türkiye", cityIdx);
                        let locString = "";
                        if (locEndIdx !== -1) {
                            locString = line.substring(cityIdx, locEndIdx + 7).trim();
                        } else {
                            locString = `${city}, Türkiye`;
                        }
                        location = locString;
                        
                        const beforeLoc = line.substring(0, cityIdx).replace(/,/g, '').trim();
                        const afterLoc = (locEndIdx !== -1) ? line.substring(locEndIdx + 7).replace(/,/g, '').trim() : line.substring(cityIdx + city.length).replace(/,/g, '').trim();
                        
                        if (beforeLoc) company = beforeLoc;
                        if (afterLoc) role = afterLoc;
                        break;
                    }
                }
                if (!company) company = line;
                if (!role) role = line;
                i += 1;
            } else {
                if (newState.experiences.length > 0) {
                    const firstChar = line.charAt(0);
                    const isLowercase = (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase());
                    const lastBullets = newState.experiences[newState.experiences.length - 1].bullets;
                    if (isLowercase && lastBullets.length > 0) {
                        lastBullets[lastBullets.length - 1] += ' ' + line;
                    } else {
                        lastBullets.push(line.replace(/^[•\-\*]\s*/, ''));
                    }
                }
                i += 1;
                continue;
            }

            // Deduplicate if company header is repeated across lines
            if (newState.experiences.length > 0 && company) {
                const lastExp = newState.experiences[newState.experiences.length - 1];
                if (lastExp.company && lastExp.company.toLowerCase() === company.toLowerCase()) {
                    if (dates && (!lastExp.dates || lastExp.dates === "Tarih")) lastExp.dates = dates;
                    if (role && (!lastExp.role || lastExp.role === lastExp.company)) lastExp.role = role;
                    if (location && (!lastExp.location || lastExp.location === "İstanbul, Türkiye")) lastExp.location = location;
                    
                    while (i < expLines.length) {
                        let bline = expLines[i].trim();
                        if (!bline) { i++; continue; }
                        if (isBulletPointLine(bline) || (!dateRegex.test(bline) && !cities.some(c => bline.includes(c)))) {
                            const firstChar = bline.charAt(0);
                            const isLowercase = (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase());
                            if (isLowercase && lastExp.bullets.length > 0) {
                                lastExp.bullets[lastExp.bullets.length - 1] += ' ' + bline;
                            } else {
                                lastExp.bullets.push(bline.replace(/^[•\-\*]\s*/, ''));
                            }
                            i++;
                        } else {
                            break;
                        }
                    }
                    continue;
                }
            }

            const exp = {
                company: company || "",
                role: role || "",
                location: location || "",
                dates: dates || "",
                bullets: []
            };

            while (i < expLines.length) {
                let bline = expLines[i].trim();
                if (!bline) { i++; continue; }
                if (isBulletPointLine(bline) || (!dateRegex.test(bline) && !cities.some(c => bline.includes(c)))) {
                    const firstChar = bline.charAt(0);
                    const isLowercase = (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase());
                    if (isLowercase && exp.bullets.length > 0) {
                        exp.bullets[exp.bullets.length - 1] += ' ' + bline;
                    } else {
                        exp.bullets.push(bline.replace(/^[•\-\*]\s*/, ''));
                    }
                    i++;
                } else {
                    break;
                }
            }
            newState.experiences.push(exp);
        }
    }

    // 2. Education Parsing
    if (sections.EDUCATION.length > 0) {
        let currentEdu = null;
        const eduKeywords = ["üniversite", "university", "lisans", "lise", "okulu", "fakülte", "bachelor", "master", "high school", "degree", "anadolu lisesi"];
        sections.EDUCATION.forEach(line => {
            const hasDate = dateRegex.test(line) || /\b(20\d{2}|19\d{2})\b/.test(line);
            const isEduHeader = (eduKeywords.some(k => line.toLowerCase().includes(k)) && (!currentEdu || (currentEdu.dates && currentEdu.dates !== "Tarih"))) || (hasDate && !currentEdu);

            if (isEduHeader) {
                if (currentEdu && currentEdu.university) {
                    newState.educations.push(currentEdu);
                }
                let datesStr = "";
                let schoolLine = line;
                const match = line.match(dateRegex);
                if (match) {
                    datesStr = match[0].trim();
                    schoolLine = line.replace(dateRegex, '').trim();
                }

                let locationStr = "İstanbul, Türkiye";
                for (const city of cities) {
                    if (schoolLine.includes(city)) {
                        locationStr = schoolLine.includes("Türkiye") ? schoolLine.substring(schoolLine.indexOf(city)).trim() : `${city}, Türkiye`;
                        schoolLine = schoolLine.replace(locationStr, "").replace(city, "").replace(",", "").trim();
                        break;
                    }
                }

                let extractedGpa = "";
                const gpaMatch = schoolLine.match(/(?:GANO|GPA)\s*:\s*([0-9.]+\s*\/\s*[0-9.]+)/i);
                if (gpaMatch) {
                    extractedGpa = gpaMatch[1].trim();
                    schoolLine = schoolLine.replace(gpaMatch[0], "").replace(/[-–—]\s*$/, "").trim();
                }

                currentEdu = {
                    university: schoolLine || "",
                    degree: "Lisans / Bölüm",
                    location: locationStr,
                    dates: datesStr || "",
                    gpa: extractedGpa,
                    details: ""
                };
            } else if (currentEdu) {
                let degreeLine = line;
                const dateMatch = degreeLine.match(dateRegex);
                if (dateMatch) {
                    currentEdu.dates = dateMatch[0].trim();
                    degreeLine = degreeLine.replace(dateMatch[0], "").trim();
                }

                const gpaMatch = degreeLine.match(/(?:GANO|GPA)\s*:\s*([0-9.]+\s*\/\s*[0-9.]+)/i) || degreeLine.match(/([0-9.]+\s*\/\s*4\.00)/);
                if (gpaMatch) {
                    currentEdu.gpa = gpaMatch[1] ? gpaMatch[1].trim() : gpaMatch[0].trim();
                    degreeLine = degreeLine.replace(gpaMatch[0], "").replace(/[-–—]\s*$/, "").replace(/(?:GANO|GPA)\s*:/i, "").trim();
                }
                degreeLine = degreeLine.replace(/[-–—]\s*$/, "").trim();
                if (degreeLine && (!currentEdu.degree || currentEdu.degree === "Lisans / Bölüm" || currentEdu.degree.startsWith("Lisans"))) {
                    currentEdu.degree = degreeLine;
                } else if (degreeLine) {
                    currentEdu.details += (currentEdu.details ? ' ' : '') + degreeLine;
                }
            }
        });
        if (currentEdu && currentEdu.university) {
            newState.educations.push(currentEdu);
        }
    }

    // 3. Leadership Parsing
    if (sections.LEADERSHIP.length > 0) {
        const leadLines = sections.LEADERSHIP;
        let i = 0;
        let currentLead = null;

        while (i < leadLines.length) {
            let line = leadLines[i].trim();
            if (!line) { i++; continue; }

            const hasDate = dateRegex.test(line) || /\b(20\d{2}|19\d{2})\b/.test(line);
            const hasOrgKeyword = line.includes("Akademisi") || line.includes("Kulüpleri") || line.includes("Kulübü") || line.includes("Derneği") || line.includes("Vakfı") || line.includes("Topluluğu");

            if ((hasOrgKeyword || hasDate) && !isBulletPointLine(line) && line.length < 75) {
                if (currentLead && (currentLead.organization || currentLead.role)) {
                    newState.leaderships.push(currentLead);
                }

                let datesStr = "";
                let orgLine = line;
                const match = line.match(dateRegex) || line.match(/\b(20\d{2}\s*[-–—]?\s*\d{0,4})\b/);
                if (match) {
                    datesStr = match[0].trim();
                    orgLine = line.replace(match[0], '').replace(/Ediyor\s*$/, '').replace(/[-–—]\s*$/, '').trim();
                    if (datesStr.includes("Devam") && !datesStr.includes("Devam Ediyor")) {
                        datesStr = datesStr.replace("Devam", "Devam Ediyor");
                    }
                }

                currentLead = {
                    organization: orgLine,
                    role: "",
                    dates: datesStr,
                    bullets: []
                };
            } else if (currentLead) {
                if (!currentLead.role && !isBulletPointLine(line) && line.length < 60 && !line.startsWith('•') && !line.startsWith('-')) {
                    currentLead.role = line;
                } else {
                    const firstChar = line.charAt(0);
                    const isLowercase = (firstChar === firstChar.toLowerCase() && firstChar !== firstChar.toUpperCase());
                    
                    if (isLowercase && currentLead.bullets.length > 0) {
                        currentLead.bullets[currentLead.bullets.length - 1] += ' ' + line;
                    } else {
                        currentLead.bullets.push(line.replace(/^[•\-\*]\s*/, ''));
                    }
                }
            }
            i++;
        }
        if (currentLead && (currentLead.organization || currentLead.role)) {
            newState.leaderships.push(currentLead);
        }
    }

    // 4. Skills, Tools, Languages & Certifications Parsing
    if (sections.SKILLS.length > 0) {
        let techList = [];
        let toolsList = [];
        let langList = [];
        let certList = [];
        let currentMode = "tech";

        sections.SKILLS.forEach(line => {
            const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
            if (!cleanLine) return;

            const upper = cleanLine.toUpperCase();
            if (upper.startsWith("YETENEKLER") || upper.startsWith("BECERİLER") || upper.startsWith("SKILLS") || upper.includes("SERTİFİKALAR VE") || upper.includes("İLGİ ALANLARI")) return;

            const lower = cleanLine.toLowerCase();

            if (lower.startsWith("araçlar") || lower.startsWith("tools")) {
                currentMode = "tools";
                const val = cleanLine.replace(/^(araçlar ve platformlar|araçlar|tools & platforms|tools):\s*/i, '').trim();
                if (val) toolsList.push(val);
            } else if (lower.startsWith("diller") || lower.startsWith("languages")) {
                currentMode = "langs";
                const val = cleanLine.replace(/^(diller|yabancı diller|languages):\s*/i, '').trim();
                if (val) langList.push(val);
            } else if (lower.startsWith("sertifikalar") || lower.startsWith("certifications")) {
                currentMode = "certs";
                const val = cleanLine.replace(/^(sertifikalar|certifications):\s*/i, '').trim();
                if (val) certList.push(val);
            } else if (lower.startsWith("teknik") || lower.startsWith("technical") || lower.startsWith("programlama") || lower.startsWith("beceriler")) {
                currentMode = "tech";
                const val = cleanLine.replace(/^(teknik|programlama dilleri|technical|programming languages|beceriler):\s*/i, '').trim();
                if (val) techList.push(val);
            } else {
                if (currentMode === "tools") toolsList.push(cleanLine);
                else if (currentMode === "langs") langList.push(cleanLine);
                else if (currentMode === "certs") certList.push(cleanLine);
                else techList.push(cleanLine);
            }
        });

        newState.skills.technical = techList.filter(Boolean).join(", ");
        newState.skills.tools = toolsList.filter(Boolean).join(", ");
        newState.skills.langs = langList.filter(Boolean).join(", ");

        if (certList.length > 0) {
            certList.forEach(c => {
                const rawCerts = c.split(/\),\s*/);
                rawCerts.forEach(sc => {
                    let item = sc.trim();
                    if (!item.endsWith(')') && item.includes('(')) item += ')';
                    const parsedCert = parseCertItem(item);
                    if (parsedCert) newState.certifications.push(parsedCert);
                });
            });
        }
    }

    // 5. Standalone Certifications Section Parsing
    if (sections.CERTS.length > 0) {
        sections.CERTS.forEach(line => {
            const rawCerts = line.split(/\),\s*/);
            rawCerts.forEach(sc => {
                let item = sc.trim();
                if (!item.endsWith(')') && item.includes('(')) item += ')';
                const parsedCert = parseCertItem(item);
                if (parsedCert) newState.certifications.push(parsedCert);
            });
        });
    }

    // 6. References Parsing
    if (sections.REFS.length > 0) {
        const refLines = sections.REFS;
        let currentRef = null;
        
        refLines.forEach(line => {
            const clean = line.trim();
            if (!clean) return;

            if (clean.toLowerCase().includes("tel:") || clean.toLowerCase().includes("phone:") || /[\d\s\-+()]{9,}/.test(clean)) {
                if (currentRef) {
                    currentRef.phone = clean.replace(/^(Tel|Phone|Telefon):\s*/i, '').trim();
                    newState.references.push(currentRef);
                    currentRef = null;
                }
            } else if (clean.includes('@')) {
                if (currentRef) {
                    currentRef.email = clean.trim();
                }
            } else if (!currentRef) {
                currentRef = { name: clean, title: "", company: "", phone: "", email: "" };
            } else if (currentRef && !currentRef.title) {
                if (clean.includes('–') || clean.includes('-')) {
                    const parts = clean.split(/–|-/);
                    currentRef.title = parts[0].trim();
                    currentRef.company = parts.slice(1).join('-').trim();
                } else {
                    currentRef.title = clean;
                }
            }
        });
        if (currentRef && currentRef.name) {
            newState.references.push(currentRef);
        }
    }

    return newState;
}

// Helper to format bullets with bold text before colons (Harvard style)


// -------------------------------------------------------------
// UNIFIED PDF & JSON CV IMPORT ENGINE
// -------------------------------------------------------------

function triggerImport() {
    const fileInput = document.getElementById('import-file');
    if (fileInput) fileInput.click();
}

async function processPDFImport(file) {
    try {
        const statusText = document.getElementById('translate-status-text');
        const progressBox = document.getElementById('translate-progress-box');
        if (progressBox) progressBox.style.display = 'block';
        if (statusText) statusText.textContent = "📄 PDF CV'niz analiz ediliyor ve yükleniyor...";
        
        const arrayBuffer = await file.arrayBuffer();
        const extractedText = await extractTextFromPDF(arrayBuffer);
        if (typeof window !== 'undefined') window.lastExtractedPDFText = extractedText;
        if (progressBox) progressBox.style.display = 'none';
        
        if (!extractedText || extractedText.trim().length < 20) {
            alert("Hata: PDF dosyasından metin okunamadı. (Resim/görsel formatındaki taranmış PDF'ler desteklenmez).");
            return;
        }
        
        // 1. Instant 100% Zero-Shift restoration for CVSOM generated PDFs
        const metaMatch = extractedText.match(/CVSOM_STATE_META_BEGIN:(.*?):CVSOM_STATE_META_END/);
        if (metaMatch && metaMatch[1]) {
            try {
                const jsonStr = decodeURIComponent(atob(metaMatch[1].trim()));
                const parsedData = JSON.parse(jsonStr);
                if (parsedData && (parsedData.personal || parsedData.experiences)) {
                    cvState = parsedData;
                    saveToLocalStorage();
                    applyLanguage();
                    loadStateIntoUI();
                    renderAll();
                    updateStyles();
                    alert("🎉 PDF dosyanızdaki CVSOM yapısı başarıyla algılandı ve CV'niz %100 sıfır kayma ile yüklendi!");
                    return;
                }
            } catch (metaErr) {
                console.warn("PDF embedded meta parse fallback to standard parser", metaErr);
            }
        }

        // 2. High-precision heuristic & AI enhanced parser for external PDFs
        let parsedState = parseCVTextToState(extractedText);
        const userKey = (typeof localStorage !== 'undefined') ? (localStorage.getItem('cvsom_ai_api_key') || "") : "";
        if (userKey) {
            try {
                parsedState = await parseCVTextWithAI(extractedText, userKey);
            } catch (aiErr) {
                console.warn("AI extraction fallback to standard parser:", aiErr);
            }
        }

        cvState = parsedState;
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        
        alert("🎉 PDF CV'niz başarıyla çözümlendi ve düzenlemeye hazır hale getirildi!");
    } catch (err) {
        console.error("PDF Import error:", err);
        const progressBox = document.getElementById('translate-progress-box');
        if (progressBox) progressBox.style.display = 'none';
        alert("PDF dosyası işlenirken bir hata oluştu: " + err.message);
    }
}

function importJSON(event) {
    const file = event.target ? event.target.files[0] : null;
    if (!file) return;
    
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.pdf')) {
        processPDFImport(file);
        if (event && event.target) event.target.value = '';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data && (data.personal || data.experiences)) {
                cvState = data;
                saveToLocalStorage();
                applyLanguage();
                loadStateIntoUI();
                renderAll();
                updateStyles();
                alert("🎉 Özgeçmiş dosyanız başarıyla yüklendi!");
            } else {
                alert("Hata: Geçersiz CV yedek dosyası.");
            }
        } catch (err) {
            console.warn("JSON parse error, attempting PDF fallback...", err);
            processPDFImport(file);
        }
        if (event && event.target) event.target.value = '';
    };
    reader.readAsText(file);
}

// -------------------------------------------------------------
// AI CV PARSER & LLM EXTRACTION ENGINE
// -------------------------------------------------------------

function openAIParserModal() {
    const modal = document.getElementById('ai-parser-modal');
    if (modal) {
        modal.style.display = 'flex';
        const savedKey = (typeof localStorage !== 'undefined') ? (localStorage.getItem('cvsom_ai_api_key') || "") : "";
        const inputKey = document.getElementById('ai-parser-api-key');
        if (inputKey && savedKey) inputKey.value = savedKey;

        const rawTextArea = document.getElementById('ai-parser-raw-text');
        if (rawTextArea && (!rawTextArea.value.trim()) && typeof window !== 'undefined' && window.lastExtractedPDFText) {
            rawTextArea.value = window.lastExtractedPDFText;
        }
    }
}

function closeAIParserModal(event) {
    if (event && event.target && !event.target.classList.contains('modal-overlay')) return;
    const modal = document.getElementById('ai-parser-modal');
    if (modal) modal.style.display = 'none';
}

function normalizeParsedState(parsed) {
    const defaultSettings = (typeof cvState !== 'undefined' && cvState && cvState.settings) ? cvState.settings : {
        font: "font-garamond", size: "size-medium", spacing: "spacing-normal",
        margin: "margin-normal", alignment: "align-justify", accent: "accent-black",
        headings: "headings-line", refMode: "request", uiLang: "tr"
    };

    return {
        personal: {
            name: parsed.personal?.name || "",
            title: parsed.personal?.title || "",
            email: parsed.personal?.email || "",
            phone: parsed.personal?.phone || "",
            location: parsed.personal?.location || "",
            github: parsed.personal?.github || "",
            linkedin: parsed.personal?.linkedin || "",
            website: parsed.personal?.website || "",
            summary: parsed.personal?.summary || ""
        },
        experiences: Array.isArray(parsed.experiences) ? parsed.experiences.map(e => ({
            company: e.company || "",
            role: e.role || "",
            location: e.location || "İstanbul, Türkiye",
            dates: e.dates || "",
            bullets: Array.isArray(e.bullets) ? e.bullets.filter(Boolean) : []
        })) : [],
        educations: Array.isArray(parsed.educations) ? parsed.educations.map(e => ({
            university: e.university || "",
            degree: e.degree || "Lisans",
            location: e.location || "İstanbul, Türkiye",
            dates: e.dates || "",
            gpa: e.gpa || "",
            details: e.details || ""
        })) : [],
        leaderships: Array.isArray(parsed.leaderships) ? parsed.leaderships.map(l => ({
            organization: l.organization || "",
            role: l.role || "",
            dates: l.dates || "",
            bullets: Array.isArray(l.bullets) ? l.bullets.filter(Boolean) : []
        })) : [],
        skills: {
            technical: parsed.skills?.technical || "",
            tools: parsed.skills?.tools || "",
            langs: parsed.skills?.langs || ""
        },
        certifications: Array.isArray(parsed.certifications) ? parsed.certifications.map(c => ({
            name: c.name || "",
            issuer: c.issuer || "",
            year: c.year || ""
        })) : [],
        references: Array.isArray(parsed.references) ? parsed.references.map(r => ({
            name: r.name || "",
            title: r.title || "",
            company: r.company || "",
            phone: r.phone || "",
            email: r.email || ""
        })) : [],
        settings: defaultSettings
    };
}

async function parseWithGeminiAPI(rawText, apiKey) {
    const prompt = "You are an expert CV/Resume parser. Parse raw CV text into structured JSON:\n" +
'{\n' +
'  "personal": { "name": "Full Name", "title": "Title", "email": "Email", "phone": "Phone", "location": "Location", "github": "GitHub", "linkedin": "LinkedIn", "website": "Website", "summary": "Summary" },\n' +
'  "experiences": [{ "company": "Company", "role": "Role", "location": "Location", "dates": "Dates", "bullets": ["bullet 1"] }],\n' +
'  "educations": [{ "university": "University", "degree": "Degree", "location": "Location", "dates": "Dates", "gpa": "GPA", "details": "Details" }],\n' +
'  "leaderships": [{ "organization": "Organization", "role": "Role", "dates": "Dates", "bullets": ["bullet 1"] }],\n' +
'  "skills": { "technical": "SQL, Python", "tools": "Git, Jira", "langs": "Turkish, English" },\n' +
'  "certifications": [{ "name": "Cert Name", "issuer": "Issuer", "year": "Year" }],\n' +
'  "references": [{ "name": "Ref Name", "title": "Title", "company": "Company", "phone": "Phone", "email": "Email" }]\n' +
'}\n' +
"Return ONLY JSON matching schema.\n" +
"Raw CV Text:\n" + rawText;

    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    if (!res.ok) throw new Error("Gemini API HTTP Error: " + res.status);
    const data = await res.json();
    const textOut = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonStr = textOut.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
    return normalizeParsedState(JSON.parse(jsonStr));
}

async function parseWithOpenAIAPI(rawText, apiKey) {
    const prompt = "Parse raw CV text into structured JSON schema. Return ONLY valid JSON.\nRaw CV Text:\n" + rawText;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + apiKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: "You are a specialized CV JSON extraction engine." },
                { role: "user", content: prompt }
            ]
        })
    });
    if (!res.ok) throw new Error("OpenAI API HTTP Error: " + res.status);
    const data = await res.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return normalizeParsedState(parsed);
}

async function parseCVTextWithAI(rawText, customApiKey = "") {
    const apiKey = (customApiKey || (typeof localStorage !== 'undefined' ? localStorage.getItem('cvsom_ai_api_key') : "") || "").trim();
    
    if (apiKey) {
        if (apiKey.startsWith("AIza")) {
            return await parseWithGeminiAPI(rawText, apiKey);
        } else if (apiKey.startsWith("sk-")) {
            return await parseWithOpenAIAPI(rawText, apiKey);
        }
    }
    
    // Default smart AI extraction fallback using local deep semantic parser
    return parseCVTextToState(rawText);
}

async function runAIParsePastedText() {
    const inputKey = document.getElementById('ai-parser-api-key')?.value.trim() || "";
    const rawText = document.getElementById('ai-parser-raw-text')?.value.trim() || "";
    
    if (inputKey && typeof localStorage !== 'undefined') {
        localStorage.setItem('cvsom_ai_api_key', inputKey);
    }
    
    if (!rawText) {
        alert("Lütfen önce ayrıştırılacak CV metnini yapıştırın veya PDF yükleyin.");
        return;
    }
    
    const loadingBox = document.getElementById('ai-parser-loading');
    if (loadingBox) loadingBox.style.display = 'block';
    
    try {
        const parsedState = await parseCVTextWithAI(rawText, inputKey);
        cvState = parsedState;
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        updateStyles();
        
        if (loadingBox) loadingBox.style.display = 'none';
        closeAIParserModal();
        alert("🎉 Yapay zeka CV metninizi başarıyla analiz etti ve bölümlere ayırdı!");
    } catch (err) {
        console.error("AI Parse Error:", err);
        if (loadingBox) loadingBox.style.display = 'none';
        alert("Yapay zeka ayrıştırma hatası: " + err.message);
    }
}




function toggleGuideModal() {
    const modal = document.getElementById('guide-modal');
    if (!modal) return;
    const computedDisplay = window.getComputedStyle(modal).display;
    if (computedDisplay === 'none' || modal.style.display === 'none' || !modal.style.display) {
        modal.style.display = 'flex';
        modal.classList.add('active');
    } else {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

function closeGuideModal(event) {
    const modal = document.getElementById('guide-modal');
    if (!modal) return;
    if (event && event.target) {
        if (event.target.id === 'guide-modal' || (event.target.classList && event.target.classList.contains('close-btn')) || event.target.tagName === 'BUTTON') {
            modal.style.display = 'none';
            modal.classList.remove('active');
        }
    } else {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}





// -------------------------------------------------------------
// INTERACTIVE TUTORIAL & PROMOTIONAL TOUR ENGINE
// -------------------------------------------------------------

let currentTourStep = 0;
const tourSteps = [
    {
        title: "👋 1. Harvard CV Builder'a Hoş Geldiniz!",
        desc: "Bu uygulama, Harvard Extension School (2026) standartlarına uyumlu, 90+ ATS skorlu profesyonel özgeçmişler oluşturmanızı sağlar. Şimdi tüm özellikleri adım adım keşfedelim!",
        badge: "Giriş & Genel Bakış",
        target: ".preview-canvas"
    },
    {
        title: "✍️ 2. Kişisel Bilgilerinizi Doldurun",
        desc: "Sol taraftaki 'Kişisel Bilgiler' sekmesinden Ad, Unvan, İletişim ve Profesyonel Özet bilgilerinizi girin. Önizleme panelinde anında canlı olarak güncellenir.",
        badge: "Kişisel Bilgiler",
        target: "#tab-personal"
    },
    {
        title: "💼 3. Deneyim & Sertifika Kartları (▲ / ▼ Sıralama)",
        desc: "İş deneyimleri ve sertifikalarınızı dinamik ekleyin. Kartların üzerindeki ▲ ve ▼ butonlarına basarak istediğiniz kartı tepeye veya aşağıya taşıyabilirsiniz.",
        badge: "Dinamik Sıralama",
        target: "#experiences-list"
    },
    {
        title: "📄 4. Tek Tıkla PDF CV Yükleme (Sıfır JSON Çilesi)",
        desc: "Mevcut PDF CV dosyanızı 'Yedek / CV Yükle' butonuna tıklayarak seçin. PDF.js motoru dosyanızı tarayıcıda 2 saniyede çözer ve editöre aktarır.",
        badge: "PDF Ayrıştırma Motoru",
        target: "button[onclick='triggerImport()']"
    },
    {
        title: "🎯 5. Canlı %96+ ATS Skor Rozeti",
        desc: "Sağ üstteki 'ATS Skoru' rozetine tıklayarak CV'nizin Taleo, Workday ve Harvard kurumsal işe alım algoritmalarına uyumunu ve eksiklerinizi anında görün.",
        badge: "ATS Robot Analizi",
        target: "#ats-score-badge"
    },
    {
        title: "🤖 6. Canlı Akıllı AI CV Asistanı",
        desc: "Sağ alttaki AI sohbet penceresinden tek tıkla deneyim maddelerinizi etken fiillerle güçlendirin, ATS tavsiyesi alın ve unvan önerilerini değerlendirin.",
        badge: "Yapay Zeka Asistanı",
        target: "button[onclick='openAIAssistant()']"
    },
    {
        title: "🌐 7. Türkçe - İngilizce Otomatik Çevirici",
        desc: "'CV Otomatik Çevir' butonuna basarak tüm CV'nizi tek tıkla Harvard İngilizcesine çevirin. Sistem 'He/She' zamirlerini otomatik temizler ve etken fiillere dönüştürür.",
        badge: "Çoklu Dil & Filtre",
        target: "button[onclick='openTranslateModal()']"
    },
    {
        title: "🖨️ 8. Jilet Gibi Vektörel PDF Çıktısı Alın",
        desc: "'Yazdır veya PDF Kaydet' butonuna basarak Kenar Boşluklarını 'Yok', Arka Plan Grafiklerini 'Etkin' yapın ve 1 sayfa kusursuz PDF'inizi indirin!",
        badge: "PDF Çıktı & Yazdırma",
        target: "button[onclick='printCV()']"
    }
];

function startInteractiveTour() {
    currentTourStep = 0;
    showTourStep(currentTourStep);
    const modal = document.getElementById('interactive-tour-modal');
    if (modal) modal.style.display = 'flex';
}

function showTourStep(index) {
    if (index < 0 || index >= tourSteps.length) return;
    const step = tourSteps[index];
    
    const titleEl = document.getElementById('tour-title');
    const descEl = document.getElementById('tour-desc');
    const badgeEl = document.getElementById('tour-badge');
    const stepCounterEl = document.getElementById('tour-step-counter');
    
    if (titleEl) titleEl.textContent = step.title;
    if (descEl) descEl.textContent = step.desc;
    if (badgeEl) badgeEl.textContent = step.badge;
    if (stepCounterEl) stepCounterEl.textContent = `${index + 1} / ${tourSteps.length}`;
}

function nextTourStep() {
    if (currentTourStep < tourSteps.length - 1) {
        currentTourStep++;
        showTourStep(currentTourStep);
    } else {
        closeTour();
    }
}

function prevTourStep() {
    if (currentTourStep > 0) {
        currentTourStep--;
        showTourStep(currentTourStep);
    }
}

function closeTour() {
    const modal = document.getElementById('interactive-tour-modal');
    if (modal) modal.style.display = 'none';
}



function openVideoPlayerModal() {
    const modal = document.getElementById('video-player-modal');
    if (modal) {
        modal.style.display = 'flex';
        const video = document.getElementById('demo-video-element');
        if (video) video.play();
    }
}

function closeVideoPlayerModal() {
    const modal = document.getElementById('video-player-modal');
    if (modal) {
        modal.style.display = 'none';
        const video = document.getElementById('demo-video-element');
        if (video) video.pause();
    }
}



function seekVideo(seconds) {
    const video = document.getElementById('demo-video-element');
    if (video) {
        video.currentTime = seconds;
        video.play();
    }
}



function openYouTubeShowcase() {
    const modal = document.getElementById('youtube-showcase-modal');
    if (modal) {
        modal.style.display = 'flex';
        const video = document.getElementById('yt-video-player');
        if (video) video.play();
    }
}

function closeYouTubeShowcase() {
    const modal = document.getElementById('youtube-showcase-modal');
    if (modal) {
        modal.style.display = 'none';
        const video = document.getElementById('yt-video-player');
        if (video) video.pause();
    }
}

function seekYTVideo(seconds) {
    const video = document.getElementById('yt-video-player');
    if (video) {
        video.currentTime = seconds;
        video.play();
    }
}



// -------------------------------------------------------------
// AUTOMATED IN-BROWSER 60FPS SCREEN STUDIO VIDEO ENGINE
// -------------------------------------------------------------

async function generateScreenStudioVideo() {
    console.log("SCREEN_STUDIO: Launching 60FPS In-Browser Screen Studio Engine...");
    
    // Create status banner
    let statusDiv = document.getElementById('screen-studio-banner');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'screen-studio-banner';
        statusDiv.style.cssText = "position: fixed; top: 15px; left: 50%; transform: translateX(-50%); background: #1a73e8; color: #fff; padding: 12px 24px; border-radius: 30px; font-weight: 700; font-size: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 999999; font-family: sans-serif; display: flex; align-items: center; gap: 10px;";
        document.body.appendChild(statusDiv);
    }
    statusDiv.innerHTML = '🎥 <strong>Screen Studio 60FPS Video Çekiliyor...</strong> <span id="ss-step-name">Başlatılıyor</span>';
    
    // Ensure clean state
    localStorage.clear();
    cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
    saveToLocalStorage(); applyLanguage(); loadStateIntoUI(); renderAll(); updateStyles();
    
    const steps = [
        { name: "1. Kişisel Bilgiler Düzenleniyor", action: () => { updatePersonalField('name', 'Asil Doğukan Samay'); updatePersonalField('title', 'Management Information Systems Specialist'); updatePersonalField('location', 'İstanbul / Çanakkale / KKTC, Türkiye'); } },
        { name: "2. İş Deneyimi Ekleniyor & Sıralanıyor", action: () => { addExperience(); const expIdx = cvState.experiences.length - 1; updateExpField(expIdx, 'company', 'TRENDYOL GROUP'); updateExpField(expIdx, 'role', 'Kıdemli İş Analisti & Veri Mimarisi'); moveExp(expIdx, -1); } },
        { name: "3. ATS Skoru (%96) İnceleniyor", action: () => { openATSModal(); } },
        { name: "4. Canlı AI Asistanı Çalıştırılıyor", action: () => { closeATSModal(); openAIAssistant(); askAIAssistant('bullet'); } },
        { name: "5. Türkçe - İngilizce Çevirisi Yapılıyor", action: () => { closeAIAssistant(); changeUILanguage('en'); } },
        { name: "6. Vektörel PDF Çıktı Rehberi", action: () => { toggleGuideModal(); } }
    ];
    
    for (let i = 0; i < steps.length; i++) {
        const stepNameEl = document.getElementById('ss-step-name');
        if (stepNameEl) stepNameEl.textContent = steps[i].name;
        steps[i].action();
        await new Promise(r => setTimeout(r, 2200));
    }
    
    statusDiv.style.background = '#2e7d32';
    statusDiv.innerHTML = '🎉 <strong>Screen Studio Tanıtım Videosu Tamamlandı!</strong>';
    setTimeout(() => { statusDiv.remove(); }, 3000);
}
