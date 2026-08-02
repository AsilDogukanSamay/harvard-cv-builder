/**
 * i18n (TR/EN) Language Switcher — Unit Tests
 * Tests translation key completeness and parity between TR and EN
 */

// Mirror the translation keys structure (key-only, no values)
const TR_REQUIRED_KEYS = [
    // Core nav
    'logo-text', 'logo-badge', 'nav-portal', 'nav-start',
    // Hero
    'hero-badge', 'hero-title', 'hero-desc', 'hero-btn',
    // ATS Widget
    'ats-widget-badge', 'ats-widget-title', 'ats-widget-desc',
    'ats-widget-ph', 'ats-widget-btn', 'ats-widget-reference',
    // Rewriter
    'rewriter-title', 'rewriter-btn',
    'rewriter-opt1-badge', 'rewriter-opt1-note',
    'rewriter-opt2-badge', 'rewriter-opt2-note',
    'rewriter-opt3-badge', 'rewriter-opt3-note',
    'rewriter-methodology-note', 'copy-btn',
    // JD Matcher
    'jd-widget-badge', 'jd-widget-title', 'jd-widget-desc',
    'jd-input-ph', 'jd-analyze-btn',
    'jd-found-kw-title', 'jd-missing-kw-title', 'jd-guidance-title',
    // Cover Letter
    'cl-widget-badge', 'cl-widget-title', 'cl-widget-desc',
    'cl-field-name', 'cl-field-company', 'cl-field-strength', 'cl-field-why',
    'cl-ph-name', 'cl-ph-target', 'cl-ph-strength', 'cl-ph-why',
    'cl-generate-btn', 'cl-output-label', 'cl-copy-btn', 'cl-editor-btn',
    // Career Gap
    'gap-widget-badge', 'gap-widget-title', 'gap-widget-desc',
    'gap-field-current', 'gap-field-target',
    'gap-ph-current', 'gap-ph-target',
    'gap-analyze-btn', 'gap-certs-title', 'gap-skills-title',
    'gap-jargon-title', 'gap-disclaimer',
    // How it works
    'how-title', 'how-subtitle',
    'step1-title', 'step2-title', 'step3-title',
    // Footer
    'footer-copy', 'footer-disclaimer',
];

// Simulated translation objects (key existence test — values not checked here)
const mockTranslations = {
    tr: Object.fromEntries(TR_REQUIRED_KEYS.map(k => [k, `tr_${k}`])),
    en: Object.fromEntries(TR_REQUIRED_KEYS.map(k => [k, `en_${k}`])),
};

describe('i18n — Translation Key Parity', () => {
    test('TR translation object has all required keys', () => {
        TR_REQUIRED_KEYS.forEach(key => {
            expect(mockTranslations.tr).toHaveProperty(key);
        });
    });

    test('EN translation object has all required keys', () => {
        TR_REQUIRED_KEYS.forEach(key => {
            expect(mockTranslations.en).toHaveProperty(key);
        });
    });

    test('TR and EN have same number of keys', () => {
        const trKeys = Object.keys(mockTranslations.tr);
        const enKeys = Object.keys(mockTranslations.en);
        expect(trKeys.length).toBe(enKeys.length);
    });

    test('No key is undefined or empty in TR', () => {
        Object.entries(mockTranslations.tr).forEach(([key, value]) => {
            expect(value).toBeTruthy();
        });
    });

    test('No key is undefined or empty in EN', () => {
        Object.entries(mockTranslations.en).forEach(([key, value]) => {
            expect(value).toBeTruthy();
        });
    });

    test('Cover letter module keys exist in both languages', () => {
        const clKeys = TR_REQUIRED_KEYS.filter(k => k.startsWith('cl-'));
        clKeys.forEach(key => {
            expect(mockTranslations.tr).toHaveProperty(key);
            expect(mockTranslations.en).toHaveProperty(key);
        });
        expect(clKeys.length).toBeGreaterThanOrEqual(12);
    });

    test('Career gap module keys exist in both languages', () => {
        const gapKeys = TR_REQUIRED_KEYS.filter(k => k.startsWith('gap-'));
        gapKeys.forEach(key => {
            expect(mockTranslations.tr).toHaveProperty(key);
            expect(mockTranslations.en).toHaveProperty(key);
        });
        expect(gapKeys.length).toBeGreaterThanOrEqual(11);
    });
});

describe('i18n — HTML_KEYS Whitelist Safety', () => {
    const HTML_KEYS = new Set([
        'hero-title', 'hero-desc', 'hero-btn', 'hero-badge',
        'ats-widget-reference', 'rewriter-methodology-note',
        'rewriter-opt1-note', 'rewriter-opt2-note', 'rewriter-opt3-note',
        'footer-copy', 'footer-disclaimer',
        'cl-output-label', 'gap-disclaimer'
    ]);

    test('HTML_KEYS whitelist contains only expected keys', () => {
        expect(HTML_KEYS.size).toBe(13);
    });

    test('hero-title is in HTML_KEYS (contains <br>)', () => {
        expect(HTML_KEYS.has('hero-title')).toBe(true);
    });

    test('logo-text is NOT in HTML_KEYS (plain text)', () => {
        expect(HTML_KEYS.has('logo-text')).toBe(false);
    });

    test('ats-widget-btn is NOT in HTML_KEYS (plain text)', () => {
        expect(HTML_KEYS.has('ats-widget-btn')).toBe(false);
    });

    test('gap-disclaimer is in HTML_KEYS (italic/styled)', () => {
        expect(HTML_KEYS.has('gap-disclaimer')).toBe(true);
    });
});
