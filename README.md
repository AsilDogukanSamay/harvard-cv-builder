# 🏆 Harvard Resume & CV Builder (ATS 90+ Optimized)

> **Harvard Extension School (2026) Standartlarına Uyumlu, Vektörel PDF Çıktısı Veren, Canlı AI Asistanı ve PDF.js Ayrıştırıcısına Sahip Web Özgeçmiş Oluşturucu.**

![Project Banner](cvsom_logo.png)

---

## 📚 Referanslar ve Akademik / Kurumsal Standartlar (References & Standards)

Bu proje rastgele bir şablon tasarımı olmayıp, aşağıdaki uluslararası resmi kurum ve yazılım standartları referans alınarak geliştirilmiştir:

1. 🎓 **Harvard Extension School Resume & Cover Letter Guide (2026 Edition):**
   - *Harvard University Division of Continuing Education & Extension Career Services* tarafından yayınlanan resmi özgeçmiş kılavuzu.
   - Tek kolonlu (single-column) vektörel düzen, etken fiil (action verb) kullanımı ve ölçülebilir başarı metrikleri (% / rakamlar) standart alınmıştır.

2. 🤖 **ATS (Applicant Tracking Systems) İşe Alım Algoritma Standartları:**
   - **Taleo (Oracle), Workday, Greenhouse & Jobscan** işe alım robotlarının metin ayıklama algoritmaları.
   - Okumayı bozan karmaşık karma tablolar ve sütunlar yerine, robotların %100 doğrulukla okuyabildiği düz metin (plain text extractable) hiyerarşisi uygulanmıştır.

3. 📄 **Mozilla PDF.js Vektörel Ayrıştırma Motoru:**
   - *Mozilla Foundation* açık kaynak vektörel PDF metin okuma kütüphanesi.
   - Kullanıcı verilerinin hiçbir sunucuya gönderilmeden, doğrudan tarayıcı içinde %100 gizlilikle (Client-Side Privacy) çözümlenmesi sağlanmıştır.

4. ♿ **W3C & WCAG 2.1 Erişilebilirlik Standartları:**
   - Yüksek kontrastlı metin renkleri, karanlık mod (Dark Mode) koruma zırhı ve duyarlı (responsive) UI kontrolleri.

---

## ✨ Özellikler (Features)

- 🎯 **%96+ ATS Skor Motoru:** Harvard Extension School ve kurumsal ATS tarama kriterlerine göre canlı skorlama.
- 🤖 **Canlı Akıllı AI Asistanı:** Deneyim maddelerini etken fiillerle (Action Verbs) güçlendiren entegre AI paneli.
- 📄 **Sıfır JSON Çilesi - Doğrudan PDF Yükleme:** Mevcut `.pdf` CV dosyalarınızı PDF.js ile tarayıcı içinde yerel olarak ayrıştırır ve editör kartlarına otomatik dizer.
- 🌐 **İki Yönlü Dil & Otomatik Temizleyici:** Türkçe ve İngilizce diller arası anında dönüşüm. "He/She" zamirlerini otomatik temizleyen Harvard İngilizcesi filtresi.
- 📐 **Canlı Sayfa Sığdırma Motoru (AutoFit Scaling):** İçerik ne kadar uzun olursa olsun A4 formatında 1 sayfaya taşmasız sığdıran akıllı ölçekleme.
- 🎨 **Karanlık Mod Koruması (Dark Mode Safeguard):** Kullanıcı Chrome'u Karanlık Modda çalıştırsa dahi CV kağıdı daima jilet gibi beyaz ve yüksek kontrastlı siyah kalır.
- 📥 **JSON Yedekleme & Dışa/İçe Aktarma:** Tüm CV durumunu tek tıkla `.json` olarak indirme ve geri yükleme.

---

## 🛠️ Teknolojiler (Tech Stack)

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Parser Engine:** Mozilla PDF.js Vector PDF Text Extractor
- **Design System:** Custom Responsive CSS Variables, Flexbox/Grid Architecture
- **Storage:** LocalStorage API & Portable JSON Backup Engine

---

## 🚀 Hızlı Başlangıç (Quick Start)

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/AsilDogukanSamay/harvard-cv-builder.git
cd harvard-cv-builder
```

### 2. Yerel Sunucuda Çalıştırın
Herhangi bir HTTP sunucusu ile açabilirsiniz:
```bash
python -m http.server 8000
```
Ardından tarayıcınızda `http://localhost:8000/editor.html` adresine gidin.

---

## 👨‍💻 Geliştirici (Author)

**Asil Doğukan Samay**  
- 💼 *Management Information Systems (MIS) Specialist | Business & Data Analyst*
- 🔗 LinkedIn: [linkedin.com/in/asil-dogukan-samay](https://linkedin.com/in/asil-dogukan-samay)
- 🐙 GitHub: [github.com/AsilDogukanSamay](https://github.com/AsilDogukanSamay)

---

## 📜 Lisans (License)
MIT License © 2026 Asil Doğukan Samay
