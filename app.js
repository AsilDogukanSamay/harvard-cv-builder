
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


// Initial CV data state
let cvState = {
    "personal": {
        "name": "Asil Doğukan Samay",
        "title": "Yönetim Bilişim Sistemleri Uzmanı",
        "email": "dogukan__sam_ay@hotmail.com",
        "phone": "+90 544 331 76 20",
        "location": "Çanakkale, Türkiye",
        "github": "github.com/AsilDogukan-Samay",
        "linkedin": "linkedin.com/in/asil-dogukan-samay",
        "website": "asildogukansamay.github.io",
        "summary": "Veri analitiği, süreç otomasyonu ve yazılım geliştirme konularına odaklanan, teknik mühendislik ekipleri ile kurumsal iş operasyonları arasındaki koordinasyonu sağlama konusunda deneyim sahibi Yönetim Bilişim Sistemleri (MIS) uzmanı. Ölçeklenebilir veri hatları kurgulama, karmaşık iş akışlarını otomatize etme ve REST API entegrasyonları tasarlama konularında yetkin. Uluslararası ve büyük kurumsal yapılarda teknoloji odaklı değer yaratmayı hedeflemektedir."
    },
    "experiences": [
        {
            "company": "MEDİBULUT",
            "role": "Ürün Yönetimi ve CRM Stajyeri",
            "location": "Çanakkale, Türkiye",
            "dates": "Eylül 2025 - Haziran 2026",
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
            "location": "İstanbul, Türkiye",
            "dates": "Ağustos 2025 - Eylül 2025",
            "bullets": [
                "Sprint takibi, metrik analizi ve günlük veri raporlama süreçlerini yürüterek Agile/Scrum operasyonlarına ve disiplinlerarası ekip içi koordinasyona destek sağladı."
            ]
        },
        {
            "company": "KOÇTAŞ",
            "role": "Stajyer (S.T.E.P. Programı)",
            "location": "Çanakkale, Türkiye",
            "dates": "Temmuz 2025 - Ağustos 2025",
            "bullets": [
                "Türkiye genelindeki katılımcılar arasında düzenlenen proje yarışmasında 'Koçtaş Kids' departman geliştirme projesiyle Birincilik Ödülü kazandı.",
                "Ürün yerleşimi, stok takibi ve fiyat kontrolü süreçlerini yöneterek operasyonel verimlilik analizleri gerçekleştirdi; stok denetim sapmalarını %20 azalttı."
            ]
        },
        {
            "company": "LOCOMAR",
            "role": "İş Geliştirme Asistanı",
            "location": "İzmir, Türkiye",
            "dates": "Nisan 2025 - Haziran 2025",
            "bullets": [
                "B2B pazarlama süreçlerini analiz ederek; pazar analizi ve rakip araştırmalarıyla yeni müşteri kazanım stratejilerinin geliştirilmesini sağladı."
            ]
        },
        {
            "company": "VITRIOL",
            "role": "Siber Güvenlik Stajyeri",
            "location": "İstanbul, Türkiye",
            "dates": "Eylül 2023 - Haziran 2024",
            "bullets": [
                "BT altyapısı ve veri analizi süreçlerinde görev alarak siber güvenlik projelerine teknik destek sağladı; sistem analiz ve güvenlik prosedürlerini raporladı."
            ]
        },
        {
            "company": "DENİZBANK",
            "role": "Stajyer",
            "location": "İstanbul, Türkiye",
            "dates": "Mart 2023 - Haziran 2023",
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
            "location": "İstanbul, Türkiye",
            "dates": "Eylül 2022 - Mayıs 2026",
            "gpa": "3.15 / 4.00",
            "details": ""
        }
    ],
    "leaderships": [
        {
            "organization": "YAPAY ZEKA VE TEKNOLOJİ AKADEMİSİ",
            "role": "Veri Bilimi Programı Bursiyeri",
            "dates": "Aralık 2025 - Devam Ediyor",
            "bullets": [
                "Türkiye genelinden gelen 31.700 başvuru arasından üstün başarı göstererek kabul alan 1.500 bursiyerden biri (%4,7'lik başarı dilimi) olarak seçildi.",
                "Google Türkiye, GİRVAK ve T3 Girişim Merkezi ortaklığında düzenlenen 100 saatten fazla yoğun veri bilimi, veri işleme ve yapay zeka eğitim programını tamamladı."
            ]
        },
        {
            "organization": "İSTANBUL GEDİK ÜNİVERSİTESİ KULÜPLERİ",
            "role": "Kulüp Başkanı | Yönetim Kurulu Üyesi",
            "dates": "2022 - 2023",
            "bullets": [
                "Siber Güvenlik & MIS Kulübü Başkanı olarak 300'den fazla öğrenciye ulaştı; teknik workshoplar ve siber güvenlik farkındalık eğitimleri organize etti.",
                "Kariyer Kulübü Yönetim Kurulu Üyesi olarak öğrenci kariyer gelişim etkinliklerini ve sektör panellerini koordine etti."
            ]
        },
        {
            "organization": "Habitat Derneği & Netflix",
            "role": "Gönüllü Eğitmen",
            "dates": "2022 - 2023",
            "bullets": [
                "Çocukların dijital dünyada güvenli adımlar atmasını sağlamak amacıyla 'Evvel Zaman İçinde Ekran Zamanında!' projesinde 500'den fazla çocuğa eğitim sundu.",
                "Erken yaş grubuna yönelik dijital güvenlik, doğru bilgiye erişim ve siber zorbalık farkındalığı eğitim metodolojisi kurguladı."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Veri Analizi ve Görselleştirme, Agile/Scrum",
        "tools": "Git, GitHub, n8n Otomasyon, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office",
        "langs": "Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)"
    },
    "certifications": [
        {
            "name": "Google Data Analytics Professional Certificate",
            "issuer": "Google",
            "year": "2026"
        },
        {
            "name": "YGA Zirvesi Katılım Sertifikası",
            "issuer": "YGA",
            "year": "2022"
        },
        {
            "name": "Temel Düzey Mikro ERP Eğitimi Başarı Belgesi",
            "issuer": "İstanbul Gedik Üniversitesi & Mikro Yazılım",
            "year": "2025"
        },
        {
            "name": "24. Yönetim Bilimleri Kongresi",
            "issuer": "İTÜ İşletme Mühendisliği Kulübü",
            "year": "2023"
        },
        {
            "name": "15, 16 ve 17. Bilişim Teknolojileri Zirvesi Katılım Sertifikaları",
            "issuer": "İTÜ İşletme Mühendisliği Kulübü",
            "year": "2022-2024"
        }
    ],
    "references": [],
    "settings": {
        "font": "font-garamond",
        "size": "size-medium",
        "spacing": "spacing-normal",
        "margin": "margin-normal",
        "alignment": "align-justify",
        "accent": "accent-black",
        "headings": "headings-line",
        "refMode": "request",
        "uiLang": "tr"
    }
};

const EN_SAMPLE_STATE = {
    "personal": {
        "name": "Asil Doğukan Samay",
        "title": "Management Information Systems Specialist",
        "email": "dogukan__sam_ay@hotmail.com",
        "phone": "+90 544 331 76 20",
        "location": "Istanbul / Canakkale / Cyprus, Turkey",
        "github": "github.com/AsilDogukan-Samay",
        "linkedin": "linkedin.com/in/asil-dogukan-samay",
        "website": "asildogukansamay.github.io",
        "summary": "Management Information Systems (MIS) specialist with experience in ensuring coordination between technical engineering teams and corporate business operations, focusing on data analytics, process automation, and software development. Proficient in building scalable data pipelines, automating complex workflows, and designing REST API integrations. Aims to create technology-focused value in international and large corporate structures."
    },
    "experiences": [
        {
            "company": "MEDİBULUT",
            "role": "Product Management and CRM Intern",
            "location": "Canakkale, Turkey",
            "dates": "September 2025 - June 2026",
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
            "location": "Istanbul, Turkey",
            "dates": "August 2025 - September 2025",
            "bullets": [
                "Provided support to Agile/Scrum operations and interdisciplinary team coordination by carrying out sprint tracking, metric analysis, and daily data reporting processes."
            ]
        },
        {
            "company": "KOÇTAŞ",
            "role": "Intern (S.T.E.P. Program)",
            "location": "Canakkale, Turkey",
            "dates": "July 2025 - August 2025",
            "bullets": [
                "Won First Place Award with 'Koçtaş Kids' department development project in nationwide competition among participants across Turkey.",
                "Conducted operational efficiency analyses by managing product placement, stock tracking, and price control processes; reduced inventory audit deviations by 20%."
            ]
        },
        {
            "company": "LOCOMAR",
            "role": "Business Development Assistant",
            "location": "Izmir, Turkey",
            "dates": "April 2025 - June 2025",
            "bullets": [
                "Analyzed B2B marketing processes; enabled development of new customer acquisition strategies through market analysis and competitor research."
            ]
        },
        {
            "company": "VITRIOL",
            "role": "Cybersecurity Intern",
            "location": "Istanbul, Turkey",
            "dates": "September 2023 - June 2024",
            "bullets": [
                "Provided technical support to cybersecurity projects by taking part in IT infrastructure and data analysis processes; reported system analysis and security procedures."
            ]
        },
        {
            "company": "DENİZBANK",
            "role": "Intern",
            "location": "Istanbul, Turkey",
            "dates": "March 2023 - June 2023",
            "bullets": [
                "Won First Place Award among 100+ candidates with high performance within the scope of internship program.",
                "Published analytical financial research article prepared as corporate content and disseminated it on the bank's official digital channels.",
                "Presented corporate operational efficiency reports by experiencing financial processes and banking workflows in 4 different departments."
            ]
        }
    ],
    "educations": [
        {
            "university": "ISTANBUL GEDIK UNIVERSITY",
            "degree": "Bachelor's Degree, Management Information Systems (MIS)",
            "location": "Istanbul, Turkey",
            "dates": "September 2022 - May 2026",
            "gpa": "3.15 / 4.00",
            "details": ""
        }
    ],
    "leaderships": [
        {
            "organization": "ARTIFICIAL INTELLIGENCE AND TECHNOLOGY ACADEMY",
            "role": "Data Science Program Scholar",
            "dates": "December 2025 - Present",
            "bullets": [
                "Selected as one of 1,500 scholars accepted with outstanding success among 31,700 applications from across Turkey (top 4.7% acceptance rate).",
                "Completed 100+ hours of intensive data science, data processing, and artificial intelligence training program organized in partnership with Google Turkey, GİRVAK, and T3 Enterprise Center."
            ]
        },
        {
            "organization": "ISTANBUL GEDIK UNIVERSITY CLUBS",
            "role": "Club President | Executive Board Member",
            "dates": "2022 - 2023",
            "bullets": [
                "As President of Cybersecurity & MIS Club, reached over 300 students; organized technical workshops and cybersecurity awareness trainings.",
                "As Career Club Executive Board Member, coordinated student career development events and industry panel sessions."
            ]
        },
        {
            "organization": "Habitat Association & Netflix",
            "role": "Volunteer Trainer",
            "dates": "2025 - ",
            "bullets": [
                "Provided digital safety education to 500+ children within 'Once Upon a Time, in Screen Time!' project.",
                "Designed training methodology on digital security, access to accurate information, and cyberbullying awareness for early age group."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Data Analysis & Visualization, Agile/Scrum",
        "tools": "Git, GitHub, n8n Automation, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office",
        "langs": "Turkish (Native Language), English (Advanced / B2), German (Beginner / A1)"
    },
    "certifications": [
        {
            "name": "Google Data Analytics Professional Certificate",
            "issuer": "Google",
            "year": "2026"
        },
        {
            "name": "Basic Level Mikro ERP Training Certificate of Achievement",
            "issuer": "Istanbul Gedik University & Mikro Software",
            "year": "2025"
        },
        {
            "name": "15th, 16th and 17th Information Technologies Summit Participation Certificates",
            "issuer": "ITU Management Engineering Club",
            "year": "2022-2024"
        },
        {
            "name": "Python Programming",
            "issuer": "Turkcell Gelecegi Yazanlar",
            "year": "2023"
        },
        {
            "name": "İş Bankası ProSchool IT Class",
            "issuer": "İş Bankası",
            "year": "2023"
        },
        {
            "name": "Artificial Intelligence Camp",
            "issuer": "Google Cloud",
            "year": "2023"
        }
    ],
    "references": [],
    "settings": {
        "font": "font-garamond",
        "size": "size-medium",
        "spacing": "spacing-normal",
        "margin": "margin-normal",
        "alignment": "align-justify",
        "accent": "accent-black",
        "headings": "headings-line",
        "refMode": "request",
        "uiLang": "en"
    }
};

const TR_SAMPLE_STATE = {
    "personal": {
        "name": "Asil Doğukan Samay",
        "title": "Yönetim Bilişim Sistemleri Uzmanı",
        "email": "dogukan__sam_ay@hotmail.com",
        "phone": "+90 544 331 76 20",
        "location": "Çanakkale, Türkiye",
        "github": "github.com/AsilDogukan-Samay",
        "linkedin": "linkedin.com/in/asil-dogukan-samay",
        "website": "asildogukansamay.github.io",
        "summary": "Veri analitiği, süreç otomasyonu ve yazılım geliştirme konularına odaklanan, teknik mühendislik ekipleri ile kurumsal iş operasyonları arasındaki koordinasyonu sağlama konusunda deneyim sahibi Yönetim Bilişim Sistemleri (MIS) uzmanı. Ölçeklenebilir veri hatları kurgulama, karmaşık iş akışlarını otomatize etme ve REST API entegrasyonları tasarlama konularında yetkin. Uluslararası ve büyük kurumsal yapılarda teknoloji odaklı değer yaratmayı hedeflemektedir."
    },
    "experiences": [
        {
            "company": "MEDİBULUT",
            "role": "Ürün Yönetimi ve CRM Stajyeri",
            "location": "Çanakkale, Türkiye",
            "dates": "Eylül 2025 - Haziran 2026",
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
            "location": "İstanbul, Türkiye",
            "dates": "Ağustos 2025 - Eylül 2025",
            "bullets": [
                "Sprint takibi, metrik analizi ve günlük veri raporlama süreçlerini yürüterek Agile/Scrum operasyonlarına ve disiplinlerarası ekip içi koordinasyona destek sağladı."
            ]
        },
        {
            "company": "KOÇTAŞ",
            "role": "Stajyer (S.T.E.P. Programı)",
            "location": "Çanakkale, Türkiye",
            "dates": "Temmuz 2025 - Ağustos 2025",
            "bullets": [
                "Türkiye genelindeki katılımcılar arasında düzenlenen proje yarışmasında 'Koçtaş Kids' departman geliştirme projesiyle Birincilik Ödülü kazandı.",
                "Ürün yerleşimi, stok takibi ve fiyat kontrolü süreçlerini yöneterek operasyonel verimlilik analizleri gerçekleştirdi; stok denetim sapmalarını %20 azalttı."
            ]
        },
        {
            "company": "LOCOMAR",
            "role": "İş Geliştirme Asistanı",
            "location": "İzmir, Türkiye",
            "dates": "Nisan 2025 - Haziran 2025",
            "bullets": [
                "B2B pazarlama süreçlerini analiz ederek; pazar analizi ve rakip araştırmalarıyla yeni müşteri kazanım stratejilerinin geliştirilmesini sağladı."
            ]
        },
        {
            "company": "VITRIOL",
            "role": "Siber Güvenlik Stajyeri",
            "location": "İstanbul, Türkiye",
            "dates": "Eylül 2023 - Haziran 2024",
            "bullets": [
                "BT altyapısı ve veri analizi süreçlerinde görev alarak siber güvenlik projelerine teknik destek sağladı; sistem analiz ve güvenlik prosedürlerini raporladı."
            ]
        },
        {
            "company": "DENİZBANK",
            "role": "Stajyer",
            "location": "İstanbul, Türkiye",
            "dates": "Mart 2023 - Haziran 2023",
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
            "location": "İstanbul, Türkiye",
            "dates": "Eylül 2022 - Mayıs 2026",
            "gpa": "3.15 / 4.00",
            "details": ""
        }
    ],
    "leaderships": [
        {
            "organization": "YAPAY ZEKA VE TEKNOLOJİ AKADEMİSİ",
            "role": "Veri Bilimi Programı Bursiyeri",
            "dates": "Aralık 2025 - Devam Ediyor",
            "bullets": [
                "Türkiye genelinden gelen 31.700 başvuru arasından üstün başarı göstererek kabul alan 1.500 bursiyerden biri (%4,7'lik başarı dilimi) olarak seçildi.",
                "Google Türkiye, GİRVAK ve T3 Girişim Merkezi ortaklığında düzenlenen 100 saatten fazla yoğun veri bilimi, veri işleme ve yapay zeka eğitim programını tamamladı."
            ]
        },
        {
            "organization": "İSTANBUL GEDİK ÜNİVERSİTESİ KULÜPLERİ",
            "role": "Kulüp Başkanı | Yönetim Kurulu Üyesi",
            "dates": "2022 - 2023",
            "bullets": [
                "Siber Güvenlik & MIS Kulübü Başkanı olarak 300'den fazla öğrenciye ulaştı; teknik workshoplar ve siber güvenlik farkındalık eğitimleri organize etti.",
                "Kariyer Kulübü Yönetim Kurulu Üyesi olarak öğrenci kariyer gelişim etkinliklerini ve sektör panellerini koordine etti."
            ]
        },
        {
            "organization": "Habitat Derneği & Netflix",
            "role": "Gönüllü Eğitmen",
            "dates": "2022 - 2023",
            "bullets": [
                "Çocukların dijital dünyada güvenli adımlar atmasını sağlamak amacıyla 'Evvel Zaman İçinde Ekran Zamanında!' projesinde 500'den fazla çocuğa eğitim sundu.",
                "Erken yaş grubuna yönelik dijital güvenlik, doğru bilgiye erişim ve siber zorbalık farkındalığı eğitim metodolojisi kurguladı."
            ]
        }
    ],
    "skills": {
        "technical": "SQL, Python, JavaScript, React.js, Node.js, HTML/CSS, REST API, Streamlit, Tableau, Power BI, Excel, Veri Analizi ve Görselleştirme, Agile/Scrum",
        "tools": "Git, GitHub, n8n Otomasyon, Jira, VS Code, Chrome DevTools, MSSQL Server, Active Directory, Figma, Vite, MS Office",
        "langs": "Türkçe (Anadil), İngilizce (İleri Düzey / B2), Almanca (Başlangıç / A1)"
    },
    "certifications": [
        {
            "name": "Google Data Analytics Professional Certificate",
            "issuer": "Google",
            "year": "2026"
        },
        {
            "name": "YGA Zirvesi Katılım Sertifikası",
            "issuer": "YGA",
            "year": "2022"
        },
        {
            "name": "Temel Düzey Mikro ERP Eğitimi Başarı Belgesi",
            "issuer": "İstanbul Gedik Üniversitesi & Mikro Yazılım",
            "year": "2025"
        },
        {
            "name": "24. Yönetim Bilimleri Kongresi",
            "issuer": "İTÜ İşletme Mühendisliği Kulübü",
            "year": "2023"
        },
        {
            "name": "15, 16 ve 17. Bilişim Teknolojileri Zirvesi Katılım Sertifikaları",
            "issuer": "İTÜ İşletme Mühendisliği Kulübü",
            "year": "2022-2024"
        }
    ],
    "references": [],
    "settings": {
        "font": "font-garamond",
        "size": "size-medium",
        "spacing": "spacing-normal",
        "margin": "margin-normal",
        "alignment": "align-justify",
        "accent": "accent-black",
        "headings": "headings-line",
        "refMode": "request",
        "uiLang": "tr"
    }
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
        preset_tr: "Türkçe Örnek (MIS Öğrencisi)",
        preset_en: "English Example (Software Engineering)",
        
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
        btn_trans_en: "Tüm CV'yi İngilizceye Çevir (TR ➔ EN)",
        btn_trans_tr: "Tüm CV'yi Türkçeye Çevir (EN ➔ TR)",
        trans_starting: "Çeviri başlatılıyor...",
        trans_success: "CV içeriği başarıyla çevrildi!",
        trans_error: "Çeviri sırasında bir hata oluştu.",
        undo_success: "Çeviri geri alındı ve önceki bilgiler yüklendi."
    },
    en: {
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
        preset_tr: "Turkish Sample (MIS Student)",
        preset_en: "English Sample (Software Engineering)",
        
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

async function fetchGoogleTranslate(text, sl, tl) {
    if (!text || !text.trim()) return text;
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data && data[0]) {
            return data[0].map(s => s[0] || '').join('');
        }
    } catch (err) {
        console.warn("Google translate fetch warning, trying MyMemory fallback...", err);
        try {
            const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sl}|${tl}`;
            const res2 = await fetch(url2);
            const data2 = await res2.json();
            if (data2 && data2.responseData && data2.responseData.translatedText) {
                return data2.responseData.translatedText;
            }
        } catch (err2) {
            console.error("Fallback translate error:", err2);
        }
    }
    return text;
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
        cvState.settings.uiLang = targetLang;
        
        if (progressBar) progressBar.style.width = '100%';
        
        // Persist, reload UI and re-render
        saveToLocalStorage();
        applyLanguage();
        loadStateIntoUI();
        renderAll();
        
        setTimeout(() => {
            if (progressBox) progressBox.style.display = 'none';
            closeTranslateModal();
            const msg = UI_TRANSLATIONS[targetLang].trans_success || "CV içeriği başarıyla çevrildi!";
            alert(msg);
        }, 400);
        
    } catch (err) {
        console.error("Auto translate error:", err);
        const progressBox = document.getElementById('translate-progress-box');
        if (progressBox) progressBox.style.display = 'none';
        alert("Çeviri sırasında bir hata oluştu. Lütfen tekrar deneyin.");
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
        cvState.settings.visibility.references = false; // Hide by default to protect Ivy League text-only space
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
    saveToLocalStorage();
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
    let score = 0;
    const maxScore = 100;
    const feedback = [];
    
    const personal = cvState.personal || {};
    const experiences = cvState.experiences || [];
    const educations = cvState.educations || [];
    const skills = cvState.skills || {};
    const certifications = cvState.certifications || [];
    
    // 1. Personal & Contact Info (20 pts)
    if (personal.name && personal.name.trim()) score += 5;
    if (personal.email && personal.email.trim()) score += 5;
    if (personal.phone && personal.phone.trim()) score += 5;
    if (personal.linkedin || personal.github || personal.location) score += 5;
    
    // 2. Summary & Overview (15 pts)
    if (personal.summary && personal.summary.length > 50) {
        score += 15;
    } else {
        feedback.push("Özgeçmiş özeti en az 50 karakter olmalı.");
    }
    
    // 3. Experience & Bullet Point Quality (30 pts)
    if (experiences.length > 0) {
        score += 10;
        let hasMetrics = false;
        let actionVerbCount = 0;
        
        experiences.forEach(exp => {
            (exp.bullets || []).forEach(b => {
                if (/[0-9]+%|[0-9]+\+|(kazandı|yönetti|geliştirdi|tasarladı|artırdı|azalttı|won|managed|designed|developed|increased|reduced)/i.test(b)) {
                    hasMetrics = true;
                    actionVerbCount++;
                }
            });
        });
        
        if (hasMetrics) score += 10;
        if (actionVerbCount >= 3) score += 10;
    } else {
        feedback.push("En az 1 deneyim eklemelisiniz.");
    }
    
    // 4. Education & GPA (15 pts)
    if (educations.length > 0) {
        score += 10;
        if (educations[0].gpa && educations[0].gpa.trim()) score += 5;
    } else {
        feedback.push("Eğitim bilgisi eklemelisiniz.");
    }
    
    // 5. Skills & Certifications (20 pts)
    if (skills.technical && skills.technical.trim()) score += 10;
    if (certifications.length > 0 || (skills.certs && skills.certs.trim())) score += 10;
    
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
    
    return { score, feedback };
}

function openATSModal() {
    const modal = document.getElementById('ats-modal');
    if (modal) {
        const { score, feedback } = calculateATSScore();
        const scoreEl = document.getElementById('ats-modal-score-val');
        if (scoreEl) scoreEl.textContent = `%${score}`;
        modal.style.display = 'flex';
    }
}

function closeATSModal() {
    const modal = document.getElementById('ats-modal');
    if (modal) modal.style.display = 'none';
}

function openAIAssistant() {
    const drawer = document.getElementById('ai-assistant-drawer');
    if (drawer) drawer.style.display = 'flex';
}

function closeAIAssistant() {
    const drawer = document.getElementById('ai-assistant-drawer');
    if (drawer) drawer.style.display = 'none';
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


function renderAll() {
    renderCVExperiences();
    renderCVEducation();
    renderCVLeadership();
    renderCVCertifications();
    renderCVReferences();
    
    renderEditorExperiences();
    renderEditorEducation();
    renderEditorLeadership();
    renderEditorCertifications();
    renderEditorReferences();
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
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
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
                const defaultVal = (UI_TRANSLATIONS[lang] && UI_TRANSLATIONS[lang][cfg.defaultKey]) ? UI_TRANSLATIONS[lang][cfg.defaultKey] : "";
                titleEl.textContent = customVal || defaultVal || titleEl.textContent;
            }
        }
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
    cvState.settings.refMode = mode;
    renderCVReferences();
    saveToLocalStorage();
}

function toggleReferencesVisibility(checked) {
    if (!cvState.settings) cvState.settings = {};
    cvState.settings.showReferences = checked;
    const sec = document.getElementById('cv-section-references');
    if (sec) sec.style.display = checked ? 'block' : 'none';
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
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    if (val === 'tr_standard' || val === 'tr_ats') {
        cvState = JSON.parse(JSON.stringify(TR_SAMPLE_STATE));
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.uiLang = 'tr';
    } else if (val === 'en_standard' || val === 'en_ats') {
        cvState = JSON.parse(JSON.stringify(EN_SAMPLE_STATE));
        if (!cvState.settings) cvState.settings = {};
        cvState.settings.uiLang = 'en';
    }
    saveToLocalStorage();
    applyLanguage();
    loadStateIntoUI();
    renderAll();
    updateStyles();
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
    
    const mode = (cvState.settings && cvState.settings.refMode) ? cvState.settings.refMode : 'request';
    const showRef = (cvState.settings && cvState.settings.showReferences !== undefined) ? cvState.settings.showReferences : false;
    
    if (sec) sec.style.display = showRef ? 'block' : 'none';
    if (!showRef) return;
    
    const lang = (cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    
    if (mode === 'request') {
        container.innerHTML = `<div style="grid-column: 1 / -1; font-style: italic; font-size: 13px; color: var(--text-dark-secondary, #555);">
            ${lang === 'en' ? 'References available upon request.' : 'Referanslar talep halinde sunulacaktır.'}
        </div>`;
        return;
    }
    
    const refs = cvState.references || [];
    refs.forEach(r => {
        const div = document.createElement('div');
        div.className = 'reference-item';
        let text = `<strong>${r.name || ''}</strong>`;
        if (r.title) text += `<br><span>${r.title}</span>`;
        if (r.company) text += `<br><span>${r.company}</span>`;
        if (r.contact) text += `<br><span style="font-size: 11px; color: #666;">${r.contact}</span>`;
        div.innerHTML = text;
        container.appendChild(div);
    });
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


function renderCVReferences() {
    const container = document.getElementById('cv-references-container');
    if (!container) return;
    container.innerHTML = '';
    
    const refs = cvState.references || [];
    if (refs.length === 0) {
        const sec = document.getElementById('cv-section-references');
        if (sec) sec.style.display = 'none';
        return;
    }
    const sec = document.getElementById('cv-section-references');
    if (sec) sec.style.display = 'block';
    
    refs.forEach(r => {
        const div = document.createElement('div');
        div.className = 'entry-block';
        let text = r.name || '';
        if (r.title) text += `, ${r.title}`;
        if (r.company) text += ` — ${r.company}`;
        if (r.contact) text += ` (${r.contact})`;
        div.innerHTML = `<div class="entry-subheader"><span class="entry-title">${text}</span></div>`;
        container.appendChild(div);
    });
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
                <div class="input-group">
                    <label>${UI_TRANSLATIONS[lang].details}</label>
                    <input type="text" value="${edu.details || ''}" placeholder="Örn: Kulüp faaliyetleri, burslar vb." oninput="updateEduField(${idx}, 'details', this.value)">
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
}

function updateExpBullet(idx, bulletIdx, value) {
    cvState.experiences[idx].bullets[bulletIdx] = value;
    renderCVExperiences();
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
}

function updateLeadBullet(idx, bulletIdx, value) {
    cvState.leaderships[idx].bullets[bulletIdx] = value;
    renderCVLeadership();
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

function saveToLocalStorage() {
    localStorage.setItem('harvard_cv_state', JSON.stringify(cvState));
}

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

function cleanPDFText(rawText) {
    if (!rawText) return "";
    let text = rawText;
    
    // Explicit repairs for common PDF heading/title glyph split artifacts
    const REPAIRS = {
        "DENEY İ M": "DENEYİM", "E Ğ İ T İ M": "EĞİTİM", "L İ DERL İ K": "LİDERLİK",
        "İ Ş DENEY İ M İ": "İŞ DENEYİMİ", "SERT İ F İ KALAR": "SERTİFİKALAR",
        "AKADEM İ S İ": "AKADEMİSİ", "TEKN İ K": "TEKNİK", "İ LG İ": "İLGİ",
        "Ü N İ VER S İ TES İ": "ÜNİVERSİTESİ", "ÜN İ VERSİ TESİ": "ÜNİVERSİTESİ",
        "İ STANBUL": "İSTANBUL", "GEDİ K": "GEDİK", "DENİ ZBANK": "DENİZBANK",
        "MEDİ BULUT": "MEDİBULUT", "Derneğ i": "Derneği", "Do ğ ukan": "Doğukan",
        "Geliş tirme": "Geliştirme", "Biliş im": "Bilişim", "Görselleş tirme": "Görselleştirme",
        "Ba ş kanı": "Başkanı", "İ ş": "İş", "ş tirmesini": "ştirmesini", "İ zmir": "İzmir"
    };
    
    for (const [bad, good] of Object.entries(REPAIRS)) {
        text = text.replaceAll(bad, good);
    }
    
    // Fix isolated single diacritic letters surrounded by spaces (e.g. Derneğ i -> Derneği)
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
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
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
        let pageLines = [];
        let currentLine = "";
        
        textContent.items.forEach(item => {
            if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                if (currentLine.trim()) pageLines.push(currentLine.trim());
                currentLine = "";
            }
            currentLine += (currentLine ? " " : "") + item.str;
            lastY = item.transform[5];
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

    let nameCandidate = lines[0];
    if (nameCandidate.toLowerCase().includes("curriculum") || nameCandidate.toLowerCase().includes("resume") || nameCandidate.toLowerCase().includes("cv")) {
        if (lines[1]) nameCandidate = lines[1];
    }
    newState.personal.name = nameCandidate;

    const SECTION_KEYS_NORM = {
        SUMMARY: ["PROFESYONELOZET", "HAKKIMDA", "OZET", "SUMMARY", "ABOUTME", "OBJECTIVE", "PROFILE"],
        EXPERIENCE: ["ISDENEYIMI", "ISDENEYIMLERI", "DENEYIM", "DENEYIMLER", "EXPERIENCE", "WORKEXPERIENCE", "EMPLOYMENT", "CAREER"],
        EDUCATION: ["EGITIM", "EGITIMBILGILERI", "EDUCATION", "ACADEMIC", "QUALIFICATIONS"],
        LEADERSHIP: ["LIDERLIK", "LIDERLIKVEGONULLULUK", "GONULLULUK", "LEADERSHIP", "VOLUNTEERING", "ACTIVITIES"],
        SKILLS: ["TEKNIKBECERILER", "BECERILER", "YETENEKLER", "YETENEKLERVESSERTIFIKALAR", "YETENEKLERSERTIFIKALAR", "SKILLS", "TECHNICALSKILLS", "DILLER", "LANGUAGES", "YETENEKLERSERTIFIKALARVEILGIALANLARI"],
        CERTS: ["SERTIFIKALAR", "SERTIFIKAVEEGITIMLER", "CERTIFICATIONS", "CERTIFICATES"],
        REFS: ["REFERANSLAR", "REFERENCES"]
    };

    let currentSec = null;
    const sections = { SUMMARY: [], EXPERIENCE: [], EDUCATION: [], LEADERSHIP: [], SKILLS: [], CERTS: [], REFS: [] };

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const normLine = normalizeHeaderKey(line);
        let matchedSec = null;

        for (const [secCode, keywords] of Object.entries(SECTION_KEYS_NORM)) {
            if (keywords.some(kw => normLine === kw || normLine.startsWith(kw))) {
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
            } else if (!newState.personal.title && !line.includes('@') && !line.includes('http')) {
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

    // 1. Perfect 6-Experience Parsing (2-line header combination)
    if (sections.EXPERIENCE.length > 0) {
        const expLines = sections.EXPERIENCE;
        let i = 0;
        while (i < expLines.length) {
            let line = expLines[i].trim();
            if (!line) { i++; continue; }

            let hasDate = dateRegex.test(line);
            let nextLine = (i + 1 < expLines.length) ? expLines[i + 1].trim() : "";
            let nextHasDate = dateRegex.test(nextLine);

            let company = "";
            let role = "";
            let location = "İstanbul, Türkiye";
            let dates = "";

            if (!hasDate && nextHasDate) {
                let compLine = line;
                let roleLine = nextLine;
                i += 2;

                for (const city of cities) {
                    if (compLine.includes(city)) {
                        location = compLine.includes("Türkiye") ? compLine.substring(compLine.indexOf(city)).trim() : `${city}, Türkiye`;
                        compLine = compLine.replace(location, "").replace(city, "").replace(",", "").trim();
                        break;
                    }
                }
                company = compLine;

                const match = roleLine.match(dateRegex);
                if (match) {
                    dates = match[0].trim();
                    role = roleLine.replace(dates, "").trim();
                } else {
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
                        location = line.includes("Türkiye") ? line.substring(line.indexOf(city)).trim() : `${city}, Türkiye`;
                        line = line.replace(location, "").replace(city, "").replace(",", "").trim();
                        break;
                    }
                }
                company = line;
                role = line;
                i += 1;
            } else {
                i += 1;
                continue;
            }

            const exp = {
                company: company || "Kurum / Şirket",
                role: role || "Pozisyon / Unvan",
                location: location,
                dates: dates || "Tarih",
                bullets: []
            };

            while (i < expLines.length) {
                let bline = expLines[i].trim();
                if (!bline) { i++; continue; }
                let bHasDate = dateRegex.test(bline);
                let bNextHasDate = (i + 1 < expLines.length) && dateRegex.test(expLines[i + 1].trim());

                if (bHasDate || bNextHasDate) break;

                exp.bullets.push(bline.replace(/^[•\-\*]\s*/, ''));
                i++;
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
            const isEduHeader = eduKeywords.some(k => line.toLowerCase().includes(k)) || (hasDate && !currentEdu);

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
                    university: schoolLine || "Üniversite",
                    degree: "Lisans / Bölüm",
                    location: locationStr,
                    dates: datesStr || "Tarih",
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
                if (degreeLine && (!currentEdu.degree || currentEdu.degree === "Lisans / Bölüm")) {
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
        while (i < leadLines.length) {
            let line = leadLines[i].trim();
            if (!line) { i++; continue; }

            let datesStr = "";
            let orgLine = line;

            const match = line.match(dateRegex) || line.match(/\b(20\d{2}\s*[-–—]?\s*\d{0,4})\b/);
            if (match) {
                datesStr = match[0].trim();
                orgLine = line.replace(datesStr, '').replace(/[-–—]\s*$/, '').trim();
            }

            let roleLine = "";
            if (i + 1 < leadLines.length && !dateRegex.test(leadLines[i+1]) && !leadLines[i+1].startsWith('•') && !leadLines[i+1].startsWith('-')) {
                roleLine = leadLines[i+1].trim();
                i++;
            }

            const lead = {
                organization: orgLine || "Organizasyon",
                role: roleLine || "Gönüllü / Üye",
                dates: datesStr || "Tarih",
                bullets: []
            };

            i++;
            while (i < leadLines.length) {
                let bline = leadLines[i].trim();
                let bHasDate = dateRegex.test(bline);
                if (bHasDate) break;

                if (bline.startsWith('•') || bline.startsWith('-') || bline.startsWith('*')) {
                    lead.bullets.push(bline.replace(/^[•\-\*]\s*/, ''));
                } else if (lead.bullets.length > 0) {
                    lead.bullets[lead.bullets.length - 1] += ' ' + bline;
                } else {
                    lead.bullets.push(bline);
                }
                i++;
            }
            newState.leaderships.push(lead);
        }
    }

    // 4. Skills & Tools Parsing
    if (sections.SKILLS.length > 0) {
        let techList = [];
        let toolsList = [];
        let langList = [];
        let certList = [];

        sections.SKILLS.forEach(line => {
            const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
            if (cleanLine.toLowerCase().startsWith("araçlar ve platformlar:") || cleanLine.toLowerCase().startsWith("tools & platforms:")) {
                toolsList.push(cleanLine.replace(/^(araçlar ve platformlar|tools & platforms):\s*/i, ''));
            } else if (cleanLine.toLowerCase().startsWith("diller:") || cleanLine.toLowerCase().startsWith("languages:")) {
                langList.push(cleanLine.replace(/^(diller|languages):\s*/i, ''));
            } else if (cleanLine.toLowerCase().startsWith("sertifikalar:") || cleanLine.toLowerCase().startsWith("certifications:")) {
                certList.push(cleanLine.replace(/^(sertifikalar|certifications):\s*/i, ''));
            } else {
                techList.push(cleanLine.replace(/^(teknik|programlama dilleri|technical|programming languages):\s*/i, ''));
            }
        });

        newState.skills.technical = techList.join(", ");
        newState.skills.tools = toolsList.join(", ");
        newState.skills.langs = langList.join(", ");

        if (certList.length > 0) {
            certList.forEach(c => {
                const subCerts = c.split(/,(?![^(]*\))/);
                subCerts.forEach(sc => {
                    if (sc.trim()) {
                        newState.certifications.push({ name: sc.trim(), issuer: "", year: "" });
                    }
                });
            });
        }
    }

    // 5. Certifications Parsing
    if (sections.CERTS.length > 0) {
        sections.CERTS.forEach(line => {
            const cleanLine = line.replace(/^[•\-\*]\s*/, '').trim();
            if (cleanLine.length > 3) {
                const parts = cleanLine.split(/[-–:]/);
                if (parts.length >= 2) {
                    newState.certifications.push({
                        name: parts[0].trim(),
                        issuer: parts[1].trim(),
                        year: parts[2] ? parts[2].trim() : ""
                    });
                } else {
                    newState.certifications.push({ name: cleanLine, issuer: "", year: "" });
                }
            }
        });
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
        if (progressBox) progressBox.style.display = 'none';
        
        if (!extractedText || extractedText.trim().length < 30) {
            alert("Hata: PDF dosyasından metin okunamadı. (Resim/görsel formatındaki taranmış PDF'ler desteklenmez).");
            return;
        }
        
        const parsedState = parseCVTextToState(extractedText);
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
