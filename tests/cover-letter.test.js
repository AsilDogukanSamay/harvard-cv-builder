/**
 * Cover Letter Generator — Unit Tests
 * Tests template generation logic and input parsing
 */

// Mirror of the company/role parsing logic from index.html
function parseTarget(target) {
    if (!target) return { company: '', role: '' };
    if (target.includes('—')) {
        const [company, role] = target.split('—').map(s => s.trim());
        return { company, role };
    }
    if (target.includes(' - ')) {
        const [company, role] = target.split(' - ').map(s => s.trim());
        return { company, role };
    }
    return { company: target.trim(), role: '' };
}

// Mirror of basic letter validation
function validateCoverLetterInputs({ name, target, strength, why }) {
    const errors = [];
    if (!name || name.trim().length < 2) errors.push('name_required');
    if (!target || target.trim().length < 3) errors.push('target_required');
    if (!strength || strength.trim().length < 5) errors.push('strength_required');
    if (!why || why.trim().length < 3) errors.push('why_required');
    return errors;
}

describe('Cover Letter Generator — Input Parsing', () => {
    describe('parseTarget()', () => {
        test('splits em-dash separated company and role', () => {
            const result = parseTarget('McKinsey & Company — Business Analyst');
            expect(result.company).toBe('McKinsey & Company');
            expect(result.role).toBe('Business Analyst');
        });

        test('splits hyphen-dash separated company and role', () => {
            const result = parseTarget('Google - Software Engineer');
            expect(result.company).toBe('Google');
            expect(result.role).toBe('Software Engineer');
        });

        test('returns full string as company when no separator', () => {
            const result = parseTarget('Amazon');
            expect(result.company).toBe('Amazon');
            expect(result.role).toBe('');
        });

        test('handles empty string', () => {
            const result = parseTarget('');
            expect(result.company).toBe('');
            expect(result.role).toBe('');
        });

        test('handles null', () => {
            const result = parseTarget(null);
            expect(result.company).toBe('');
            expect(result.role).toBe('');
        });

        test('trims whitespace from company and role', () => {
            const result = parseTarget('  BCG  —  Senior Consultant  ');
            expect(result.company).toBe('BCG');
            expect(result.role).toBe('Senior Consultant');
        });
    });

    describe('validateCoverLetterInputs()', () => {
        test('returns empty array for valid inputs', () => {
            const errors = validateCoverLetterInputs({
                name: 'Asil Doğukan Samay',
                target: 'McKinsey & Company — Business Analyst',
                strength: '3 years project management experience',
                why: 'sustainability focus'
            });
            expect(errors).toHaveLength(0);
        });

        test('returns error for missing name', () => {
            const errors = validateCoverLetterInputs({
                name: '',
                target: 'McKinsey',
                strength: 'strong experience',
                why: 'good culture'
            });
            expect(errors).toContain('name_required');
        });

        test('returns error for too-short name', () => {
            const errors = validateCoverLetterInputs({
                name: 'A',
                target: 'McKinsey',
                strength: 'strong experience',
                why: 'good culture'
            });
            expect(errors).toContain('name_required');
        });

        test('returns multiple errors for multiple missing fields', () => {
            const errors = validateCoverLetterInputs({
                name: '', target: '', strength: '', why: ''
            });
            expect(errors.length).toBe(4);
        });

        test('returns error for too-short strength (< 5 chars)', () => {
            const errors = validateCoverLetterInputs({
                name: 'Alex',
                target: 'Google',
                strength: 'ok',
                why: 'innovation'
            });
            expect(errors).toContain('strength_required');
        });
    });
});
