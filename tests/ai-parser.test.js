const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsContent = fs.readFileSync(appJsPath, 'utf8');

function createSandbox() {
    const sandbox = {
        console: console,
        document: {
            getElementById: () => ({ style: {}, value: '' }),
            querySelector: () => null,
            querySelectorAll: () => [],
            addEventListener: () => {}
        },
        window: {
            getComputedStyle: () => ({ display: 'none' }),
            addEventListener: () => {}
        },
        localStorage: {
            _data: {},
            getItem(k) { return this._data[k] || null; },
            setItem(k, v) { this._data[k] = String(v); },
            removeItem(k) { delete this._data[k]; }
        },
        fetch: jest.fn()
    };
    vm.createContext(sandbox);
    vm.runInContext(appJsContent, sandbox);
    return sandbox;
}

describe('AI CV Parser Engine', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = createSandbox();
    });

    test('normalizeParsedState creates a valid cvState structure from partial JSON', () => {
        const partialData = {
            personal: { name: 'John Doe', title: 'Software Engineer' },
            experiences: [{ company: 'Acme Corp', role: 'Dev', bullets: ['Built API'] }]
        };

        const normalized = sandbox.normalizeParsedState(partialData);
        expect(normalized.personal.name).toBe('John Doe');
        expect(normalized.personal.title).toBe('Software Engineer');
        expect(normalized.experiences).toHaveLength(1);
        expect(normalized.experiences[0].company).toBe('Acme Corp');
        expect(Array.isArray(normalized.educations)).toBe(true);
        expect(Array.isArray(normalized.certifications)).toBe(true);
        expect(normalized.skills.technical).toBe('');
    });

    test('parseCVTextWithAI uses local deep semantic parser by default when no API key', async () => {
        const rawText = "ASİL DOĞUKAN SAMAY\nİş Geliştirme Uzmanı\nDENEYİM\nMEDİBULUT - Stajyer\nEylül 2025 - Haziran 2026\n• Proje geliştirme yaptı.";
        const state = await sandbox.parseCVTextWithAI(rawText);
        expect(state.personal.name.toUpperCase()).toContain('ASİL');
    });

    test('parseWithGeminiAPI sends structured JSON prompt to Gemini API', async () => {
        const mockGeminiResponse = {
            candidates: [{
                content: {
                    parts: [{
                        text: '```json\n{"personal":{"name":"Gemini User","title":"AI Architect"},"experiences":[],"educations":[],"leaderships":[],"skills":{"technical":"Python","tools":"","langs":""},"certifications":[],"references":[]}\n```'
                    }]
                }
            }]
        };

        sandbox.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockGeminiResponse
        });

        const state = await sandbox.parseWithGeminiAPI("Raw Text", "AIzaTestKey123");
        expect(state.personal.name).toBe('Gemini User');
        expect(state.personal.title).toBe('AI Architect');
        expect(state.skills.technical).toBe('Python');
    });

    test('parseWithOpenAIAPI sends structured JSON prompt to OpenAI API', async () => {
        const mockOpenAIResponse = {
            choices: [{
                message: {
                    content: '{"personal":{"name":"OpenAI Candidate","title":"Data Scientist"},"experiences":[],"educations":[],"leaderships":[],"skills":{},"certifications":[],"references":[]}'
                }
            }]
        };

        sandbox.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockOpenAIResponse
        });

        const state = await sandbox.parseWithOpenAIAPI("Raw Text", "sk-TestKey123");
        expect(state.personal.name).toBe('OpenAI Candidate');
        expect(state.personal.title).toBe('Data Scientist');
    });
});
