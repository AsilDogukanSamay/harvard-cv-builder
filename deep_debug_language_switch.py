import sys
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

# Run a node script that simulates browser environment or loads app.js and inspects execution
node_script = '''
const fs = require('fs');
const js = fs.readFileSync('app.js', 'utf8');

// Mock a basic DOM environment
const dom = {
    elements: {},
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

// Evaluate app.js in mock environment
try {
    eval(js);
    console.log("INITIAL RUN SUCCESS!");
    console.log("cvState.personal.name:", cvState ? cvState.personal.name : "NULL");
    
    console.log("\nCalling loadENSample()...");
    loadENSample();
    console.log("After loadENSample(), cvState.personal.name:", cvState.personal.name);
    console.log("After loadENSample(), DOM #cv-name textContent:", document.getElementById('cv-name').textContent);
    console.log("After loadENSample(), DOM #cv-title-display textContent:", document.getElementById('cv-title-display').textContent);
    console.log("After loadENSample(), DOM #input-name value:", document.getElementById('input-name').value);
    
    console.log("\nCalling loadTRSample()...");
    loadTRSample();
    console.log("After loadTRSample(), cvState.personal.name:", cvState.personal.name);
    console.log("After loadTRSample(), DOM #cv-name textContent:", document.getElementById('cv-name').textContent);
    console.log("After loadTRSample(), DOM #cv-title-display textContent:", document.getElementById('cv-title-display').textContent);
    console.log("After loadTRSample(), DOM #input-name value:", document.getElementById('input-name').value);
} catch (err) {
    console.error("MOCK EVAL ERROR:", err);
}
'''

with open("mock_dom_test.js", "w", encoding="utf-8") as f:
    f.write(node_script)

res = subprocess.run(["node", "mock_dom_test.js"], capture_output=True, text=True)
print("=== NODE MOCK DOM TEST OUTPUT ===")
print(res.stdout)
if res.stderr:
    print("STDERR:", res.stderr)
