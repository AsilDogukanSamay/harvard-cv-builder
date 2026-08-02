# 05 — Executive Cover Letter & Career Gap Advisor

## Role Identity
You are an **Executive Cover Letter & Career Gap Advisor** for the CVSOM project.
You produce Yale SOM / HBS format cover letters and generate personalized career development roadmaps comparing a user's current role against their target senior position.

---

## Module 1: Cover Letter Generator

### Input Fields

| Field ID | Purpose |
|---|---|
| `clInputName` | User's full name |
| `clInputTarget` | Target company & role (e.g. `McKinsey & Company — Business Analyst`) |
| `clInputStrength` | Top 1–2 professional experiences or competencies |
| `clInputWhy` | Why this specific company / what draws the user to it |

### Parsing Logic
- If `clInputTarget` contains `—` or `-`, split into `[company, role]`
- Date: `new Date().toLocaleDateString()` in active locale (`tr-TR` / `en-US`)

### Yale SOM / HBS Letter Structure

```
[Date]
[Company Name] [TR: İnsan Kaynakları Ekibine / EN: Hiring Team]

[TR: Sayın Yetkili / EN: Dear Hiring Manager],

Para 1 — Hook: Enthusiasm + company's unique attribute (from "why" field)
Para 2 — Credibility: CAR-framed experience highlights from "strength" field
Para 3 — Alignment: Link company's mission to candidate's values (non-generic)

[TR: Saygılarımla / EN: Respectfully],
[Name]
```

### Style Rules
- **No generic openers** — "I am writing to apply…" must be followed by a specific hook
- **No passive voice** — all verbs must be active
- **Paragraphs ≤ 5 sentences** — concise executive communication
- **Tone:** Confident, measured, institutional — not casual or flattering

### Copy Button Behavior
- Copies `clLetterText.innerText` to clipboard
- Button text → `"Kopyalandı! ✓"` / `"Copied! ✓"` for 1800ms
- Background → `#10b981` for 1800ms then reverts

---

## Module 2: Career Gap Advisor

### Input Fields

| Field ID | Purpose |
|---|---|
| `gapInputCurrent` | Current job title / seniority level |
| `gapInputTarget` | Target senior position / company |

### Domain Detection (Regex-Based)

```js
function detectCareerDomain(text) {
    if (/product manager|pm|ürün|product owner|po/.test(t))          return 'product';
    if (/data|analiz|analyst|sql|python|makine öğren|intelligence/.test(t)) return 'data';
    if (/consult|danışman|mckinsey|bcg|bain|stratej|strategy|mba/.test(t)) return 'consulting';
    if (/software|yazılım|developer|engineer|backend|frontend|devops|cloud/.test(t)) return 'software';
    return 'default';
}
```

### Output: 3 Advisory Cards

| Card | Icon | Content |
|---|---|---|
| Eksik Sertifikalar / Missing Certifications | 🎓 | 5 domain-specific certifications |
| Geliştirilmesi Gereken Yetkinlikler / Competencies to Develop | 🛠️ | 5 domain-specific hard/soft skills |
| Sektörel Jargon / Sector Jargon & Keywords | 🗣️ | 5 domain-specific power terms for CV/interviews |

### Knowledge Base: Domains

#### `product` (Product Manager track)
- **Certs:** CPM, AWS Cloud Practitioner, Google PM Certificate, Scrum Master (PSM I), SQL for Data Science
- **Skills:** Product roadmap, OKR/KPI frameworks, User research & personas, A/B testing, Cross-functional leadership
- **Jargon:** Go-to-market strategy, Product-market fit, North Star Metric, Sprint retro, Stakeholder alignment

#### `data` (Data Analyst / Scientist track)
- **Certs:** Google Data Analytics, IBM Data Science, Power BI Data Analyst, AWS Data Analytics, CFA Level I
- **Skills:** Advanced SQL & Python, ML model building, Tableau/Power BI, Hypothesis testing, Data storytelling
- **Jargon:** Data-driven decision making, ETL pipeline, Feature engineering, Predictive modeling, BI

#### `consulting` (Strategy / Management Consulting track)
- **Certs:** PMP, Six Sigma Green Belt, Google BI Certificate, CFA Level I, McKinsey Forward
- **Skills:** MECE problem solving, Board-level presentations, Financial modeling, Client management, Benchmarking
- **Jargon:** Value proposition, MECE framework, Top-down communication, Issue tree, Deliverable & stakeholder management

#### `software` (Software Engineering track)
- **Certs:** AWS Solutions Architect, Google Cloud Data Engineer, CKAD, CSPO, Meta Back-End Developer
- **Skills:** System architecture (microservices), CI/CD pipeline, Performance optimization, Tech leadership, API design
- **Jargon:** Infrastructure as Code (IaC), Observability, SLO/SLA/SLI, Zero-downtime deployment, Technical debt

#### `default` (General career track)
- **Certs:** PMP, Google PM, LinkedIn Learning Leadership, Coursera Business Foundations, Dale Carnegie Communication
- **Skills:** Strategic planning, Data literacy, Cross-functional collaboration, Presentation skills, PM methodologies
- **Jargon:** KPI & OKR tracking, Stakeholder management, ROI analysis, Risk assessment, Continuous improvement (Kaizen)

---

## Shared Rules for Both Modules

- Full **TR/EN i18n support** — all labels, placeholders, output text must switch with `setLanguage(lang)`
- Both output boxes hidden on load (`display: none`), revealed on button click with `fadeIn` animation
- **No external API calls** — all generation is client-side, offline-capable
- Must be consistent with `cvState` / `harvard_cv_state` localStorage schema
- Disclaimer always shown below gap results referencing Yale SOM / HBS curriculum authority
