/**
 * CVSOM Unit Test Runner (Zero-Dependency Node.js Test Suite)
 * Tests core ATS scoring logic, category breakdown calculation, and translation utilities.
 */

const fs = require('fs');
const path = require('path');

// 1. Mock Browser Environment for Node.js execution
const mockLocalStorage = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, val) => { store[key] = String(val); },
        removeItem: (key) => { delete store[key]; },
        clear: () => { store = {}; }
    };
})();

const mockDocument = {
    documentElement: { style: {} },
    getElementById: (id) => ({
        style: {},
        classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
        textContent: '',
        innerHTML: '',
        setAttribute: () => {},
        addEventListener: () => {}
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
};

global.window = {
    addEventListener: () => {},
    localStorage: mockLocalStorage
};
global.document = mockDocument;
global.localStorage = mockLocalStorage;
global.fetch = async (url) => {
    if (url.includes('translate.googleapis.com')) {
        return {
            ok: true,
            json: async () => [[['Hello World', 'Merhaba Dünya']]]
        };
    }
    return { ok: false, status: 500 };
};

// 2. Load app.js into context
const appJsPath = path.join(__dirname, '..', 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

// Evaluate app.js in global scope
try {
    eval(appJsCode);
} catch (e) {
    console.error("❌ Failed to load app.js in test environment:", e.message);
    process.exit(1);
}

// Helper to mutate cvState in place
function setTestCVState(newState) {
    Object.keys(cvState).forEach(k => delete cvState[k]);
    Object.assign(cvState, newState);
}

// 3. Test Suites Definition
let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
    if (condition) {
        console.log(`  ✓ ${message}`);
        testsPassed++;
    } else {
        console.error(`  ❌ FAIL: ${message}`);
        testsFailed++;
    }
}

console.log("\n=========================================");
console.log("🧪 RUNNING CVSOM CORE UNIT TESTS");
console.log("=========================================\n");

// --- TEST SUITE 1: calculateATSScore ---
console.log("Suite 1: ATS Scoring Engine & Breakdown");

try {
    // Set up sample full CV state
    setTestCVState({
        personal: {
            name: "Test User",
            email: "test@example.com",
            phone: "+90 555 123 4567",
            location: "Istanbul",
            linkedin: "linkedin.com/in/test",
            summary: "This is a full professional summary that is definitely longer than 50 characters to achieve max points."
        },
        experiences: [
            {
                company: "TechCorp",
                role: "Software Engineer",
                dates: "2022 - 2024",
                bullets: [
                    "Developed web applications and managed microservices for 100000 active users.",
                    "Increased response time by 45% using Redis caching and won employee award.",
                    "Designed automated CI/CD deployment pipelines, reducing deployment times by 30%."
                ]
            }
        ],
        educations: [
            {
                university: "ITU",
                degree: "BS Computer Science",
                dates: "2018 - 2022",
                gpa: "3.80 / 4.00"
            }
        ],
        skills: {
            technical: "JavaScript, Node.js, React, SQL",
            certs: "AWS Certified Architect"
        },
        certifications: [
            { name: "AWS Certified Architect", issuer: "Amazon", year: "2023" }
        ],
        settings: { uiLang: 'tr' }
    });

    const result = calculateATSScore();

    assert(typeof result.score === 'number', "calculateATSScore returns numeric score");
    assert(result.score === 100, `Score is 100% for full CV (Got: ${result.score})`);
    assert(result.breakdown !== undefined, "Breakdown object exists in result");
    assert(result.breakdown.contact.score === 20, "Contact score is 20/20");
    assert(result.breakdown.summary.score === 15, "Summary score is 15/15");
    assert(result.breakdown.experience.score === 30, "Experience score is 30/30");
    assert(result.breakdown.education.score === 15, "Education score is 15/15");
    assert(result.breakdown.skills.score === 20, "Skills score is 20/20");
} catch (err) {
    assert(false, `ATS scoring test threw unexpected error: ${err.message}`);
}

// --- TEST SUITE 2: Empty CV State Handling ---
console.log("\nSuite 2: Empty CV State Edge Case");

try {
    setTestCVState({
        personal: {},
        experiences: [],
        educations: [],
        skills: {},
        certifications: [],
        settings: { uiLang: 'tr' }
    });

    const emptyResult = calculateATSScore();
    assert(emptyResult.score === 0, `Empty CV scores 0 (Got: ${emptyResult.score})`);
    assert(emptyResult.feedback.length > 0, "Actionable feedback list is populated for empty CV");
} catch (err) {
    assert(false, `Empty CV test threw unexpected error: ${err.message}`);
}

// --- TEST SUITE 3: fetchGoogleTranslate ---
console.log("\nSuite 3: Translation API Utility");

(async () => {
    try {
        const translated = await fetchGoogleTranslate("Hello World", "en", "tr");
        assert(translated === "Hello World", `fetchGoogleTranslate returns expected text (Got: '${translated}')`);
    } catch (err) {
        assert(false, `Translation utility test threw error: ${err.message}`);
    }

    console.log("\n=========================================");
    console.log(`📊 TEST RESULTS: ${testsPassed} Passed, ${testsFailed} Failed`);
    console.log("=========================================\n");

    if (testsFailed > 0) {
        process.exit(1);
    } else {
        process.exit(0);
    }
})();
