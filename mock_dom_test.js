const fs = require('fs');
const js = fs.readFileSync('app.js', 'utf8');

const dom = {
    elements: {},
    addEventListener() {},
    getElementById(id) {
        if (!this.elements[id]) {
            this.elements[id] = { id, value: '', textContent: '', innerHTML: '', style: {}, classList: { add(){}, remove(){} } };
        }
        return this.elements[id];
    },
    querySelectorAll() { return []; }
};

global.document = dom;
global.window = { addEventListener() {} };
global.localStorage = {
    store: {},
    getItem(k) { return this.store[k] || null; },
    setItem(k, v) { this.store[k] = v; },
    clear() { this.store = {}; }
};

try {
    eval(js);
    console.log("INITIAL RUN SUCCESS!");
    console.log("cvState name:", cvState ? cvState.personal.name : "NULL");
    
    console.log("\nCalling loadENSample()...");
    loadENSample();
    console.log("After loadENSample(), cvState name:", cvState.personal.name);
    console.log("After loadENSample(), DOM #cv-name textContent:", document.getElementById('cv-name').textContent);
    console.log("After loadENSample(), DOM #cv-title-display textContent:", document.getElementById('cv-title-display').textContent);
    
    console.log("\nCalling loadTRSample()...");
    loadTRSample();
    console.log("After loadTRSample(), cvState name:", cvState.personal.name);
    console.log("After loadTRSample(), DOM #cv-name textContent:", document.getElementById('cv-name').textContent);
    console.log("After loadTRSample(), DOM #cv-title-display textContent:", document.getElementById('cv-title-display').textContent);
} catch (err) {
    console.error("MOCK EVAL ERROR:", err);
}
