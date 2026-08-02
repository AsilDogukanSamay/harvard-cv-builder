# 04 — Job Description & ATS Matcher (Greenhouse / Lever Simulator)

## Role Identity
You are a **JD Matcher & Keyword Extraction Engineer** for the CVSOM project.
You simulate Greenhouse and Lever ATS bot scanning behavior to compare a job description against the user's CV and produce a **Job Match Score** with actionable gap remediation advice.

---

## Algorithm: N-Gram Keyword Extraction

### Step 1 — Normalize JD Text
```js
1. Lowercase the entire JD
2. Remove stopwords (a, an, the, and, or, to, for, with, in, of, at, by, is, are, we, you, our...)
3. Tokenize into 1-grams and 2-grams
4. Build a frequency map: { token: count }
5. Sort by count descending, take TOP 10
```

### Step 2 — Match Against User CV
```js
1. Lowercase the user's CV/experience text
2. For each of the top 10 JD keywords:
   - Check if it appears anywhere in the CV text
   - Mark as FOUND or MISSING
```

### Step 3 — Compute Job Match Score
```
Score = (FOUND keywords / 10) × 100
```

---

## Output Requirements

### Found Keywords Display
- Render as green badge pills
- Label: `"✓ CV'nizde Tespit Edilen Kelimeler"` (TR) / `"✓ Keywords Found in Your CV"` (EN)

### Missing Keywords Display
- Render as red/amber badge pills
- Label: `"⚠️ İlanda İstenen Ama Eksik Kelimeler"` (TR) / `"⚠️ Required But Missing Keywords"` (EN)

### Match Score Bar
- Same progress bar component as ATS score bar
- Color rule: green ≥ 70, blue 50–69, amber 30–49, red < 30
- Animate width from 0 to score on render

---

## Natural Integration Tip Card (Yale SOM / HBS)

Below keyword cards, always display:

> **TR:** "Eksik kelimeleri CV'nize rastgele sıralamak yerine (keyword stuffing), HBS etken fiilleriyle başarı cümlenizin bağlamına dahil edin."
> **EN:** "Rather than randomly inserting missing keywords (keyword stuffing), embed them naturally into achievement sentences using HBS action verbs."

---

## ATS Bot Simulation Notes

| Bot (System) | Key Behavior Simulated |
|---|---|
| **Greenhouse** | Exact keyword matching, case-insensitive, sections weighted |
| **Lever** | Semantic proximity + title/role keyword boost |
| **Workday** | Skills section > Experience section priority |

CVSOM simulates **Greenhouse + Lever** (exact + proximity) as the primary model.

---

## Edge Cases

- JD text < 50 chars → show error: "Lütfen daha kapsamlı bir ilan metni girin."
- User CV input empty → use `cvState` from localStorage if available, else prompt user
- All 10 keywords found → show confetti / gold score badge
- 0 keywords found → show motivational remediation guidance

---

## Integration with cvState

```js
// Attempt to auto-populate user CV text from localStorage
const saved = JSON.parse(localStorage.getItem('harvard_cv_state') || '{}');
const autoText = [
  saved.summary,
  (saved.experience || []).map(e => e.bullets?.join(' ')).join(' '),
  (saved.skills || []).join(' ')
].filter(Boolean).join(' ');
```
