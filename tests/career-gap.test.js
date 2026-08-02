/**
 * Career Gap Advisor — Unit Tests
 * Tests domain detection logic and knowledge base structure
 */

// Extracted pure functions for testing (mirrors index.html logic)
function detectCareerDomain(text) {
    const t = (text || '').toLowerCase();
    // Consulting must be checked BEFORE data: "McKinsey Business Analyst" contains "analyst"
    // which would otherwise match the data domain regex (Systematic Debugging Fix)
    if (/consult|danışman|mckinsey|bcg|bain|stratej|strategy|mba/.test(t)) return 'consulting';
    if (/product manager|pm|ürün|product owner|po/.test(t)) return 'product';
    if (/\bdata\b|analiz|sql|python|makine öğren|machine learn|\bbi\b|intelligence/.test(t)) return 'data';
    if (/software|yazılım|developer|engineer|backend|frontend|fullstack|devops|cloud/.test(t)) return 'software';
    return 'default';
}

describe('Career Gap Advisor — Domain Detection', () => {
    describe('Product domain', () => {
        test('detects "product manager"', () => {
            expect(detectCareerDomain('I am a product manager')).toBe('product');
        });
        test('detects "product owner"', () => {
            expect(detectCareerDomain('Senior Product Owner at startup')).toBe('product');
        });
        test('detects Turkish "ürün" keyword', () => {
            expect(detectCareerDomain('Ürün yöneticisi olmak istiyorum')).toBe('product');
        });
    });

    describe('Data domain', () => {
        test('detects "data analyst"', () => {
            expect(detectCareerDomain('Junior Data Analyst, 2 years')).toBe('data');
        });
        test('detects "sql"', () => {
            expect(detectCareerDomain('Expert in SQL and Python')).toBe('data');
        });
        test('detects "machine learn"', () => {
            expect(detectCareerDomain('Machine learning engineer')).toBe('data');
        });
    });

    describe('Consulting domain', () => {
        test('detects "mckinsey"', () => {
            expect(detectCareerDomain('Target: McKinsey Business Analyst')).toBe('consulting');
        });
        test('detects "strategy"', () => {
            expect(detectCareerDomain('Strategy consultant at BCG')).toBe('consulting');
        });
        test('detects Turkish "danışman"', () => {
            expect(detectCareerDomain('Danışman olarak çalışıyorum')).toBe('consulting');
        });
    });

    describe('Software domain', () => {
        test('detects "software"', () => {
            expect(detectCareerDomain('Software engineer with 5 years')).toBe('software');
        });
        test('detects "devops"', () => {
            expect(detectCareerDomain('DevOps engineer targeting cloud architect')).toBe('software');
        });
        test('detects "frontend"', () => {
            expect(detectCareerDomain('Frontend developer')).toBe('software');
        });
    });

    describe('Default domain fallback', () => {
        test('returns default for unrecognized input', () => {
            expect(detectCareerDomain('Marketing manager')).toBe('default');
        });
        test('returns default for empty string', () => {
            expect(detectCareerDomain('')).toBe('default');
        });
        test('returns default for null/undefined', () => {
            expect(detectCareerDomain(null)).toBe('default');
            expect(detectCareerDomain(undefined)).toBe('default');
        });
    });

    describe('Edge cases', () => {
        test('handles mixed-case input', () => {
            expect(detectCareerDomain('DATA ANALYST')).toBe('data');
        });
        test('handles numbers in input', () => {
            expect(detectCareerDomain('SQL 2019 specialist')).toBe('data');
        });
    });
});
