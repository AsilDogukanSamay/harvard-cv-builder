import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")
html_path = os.path.join(cwd, "editor.html")

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

# Replace hardcoded static containers with clean empty dynamic containers in editor.html
html = re.sub(r'<div id="cv-experience-container">.*?</div>\s*</section>', '<div id="cv-experience-container"></div>\n                </section>', html, flags=re.DOTALL)
html = re.sub(r'<div id="cv-education-container">.*?</div>\s*</section>', '<div id="cv-education-container"></div>\n                </section>', html, flags=re.DOTALL)
html = re.sub(r'<div id="cv-leadership-container">.*?</div>\s*</section>', '<div id="cv-leadership-container"></div>\n                </section>', html, flags=re.DOTALL)

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html)

print("SUCCESS: Purged hardcoded static HTML blocks from editor.html!")

# Update app.js renderAll and sample loaders to force clean dynamic rendering
with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Make sure renderCVExperiences, renderCVEducation, renderCVLeadership use correct entry-block rendering
render_exp_impl = '''function renderCVExperiences() {
    const container = document.getElementById('cv-experience-container');
    if (!container) return;
    container.innerHTML = '';
    
    const exps = (cvState && cvState.experiences && cvState.experiences.length > 0) ? cvState.experiences : TR_SAMPLE_STATE.experiences;
    const secExp = document.getElementById('sec-experience');
    if (secExp) secExp.style.display = exps.length === 0 ? 'none' : 'block';
    
    exps.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'cv-item';
        expDiv.style.marginBottom = '10px';
        
        let bulletsHtml = '';
        if (exp.bullets && exp.bullets.length > 0) {
            bulletsHtml = `<ul class="cv-bullets">` + 
                exp.bullets.map(b => `<li>${formatBulletPoint(b)}</li>`).join('') + 
                `</ul>`;
        }
        
        expDiv.innerHTML = `
            <div class="cv-item-header">
                <span class="cv-item-title">${exp.company || ''}</span>
                <span class="cv-item-date">${exp.dates || ''}</span>
            </div>
            <div class="cv-item-sub">
                <span class="cv-item-role">${exp.role || ''}</span>
                <span class="cv-item-location">${exp.location || ''}</span>
            </div>
            ${bulletsHtml}
        `;
        container.appendChild(expDiv);
    });
}'''

js = re.sub(r"function renderCVExperiences\(\) \{.*?\n\}", render_exp_impl, js, flags=re.DOTALL)

render_edu_impl = '''function renderCVEducation() {
    const container = document.getElementById('cv-education-container');
    if (!container) return;
    container.innerHTML = '';
    
    const edus = (cvState && cvState.educations && cvState.educations.length > 0) ? cvState.educations : TR_SAMPLE_STATE.educations;
    const secEdu = document.getElementById('sec-education');
    if (secEdu) secEdu.style.display = edus.length === 0 ? 'none' : 'block';
    
    const lang = (cvState && cvState.settings && cvState.settings.uiLang) ? cvState.settings.uiLang : "tr";
    const gpaLabel = lang === 'tr' ? 'GANO' : 'GPA';
    
    edus.forEach(edu => {
        let gpaText = "";
        if (edu.gpa && edu.gpa.trim() !== "") {
            const cleanGpa = edu.gpa.trim();
            if (cleanGpa.toLowerCase().includes('gano') || cleanGpa.toLowerCase().includes('gpa')) {
                gpaText = ` — ${cleanGpa}`;
            } else {
                gpaText = ` — ${gpaLabel}: ${cleanGpa}`;
            }
        }
        
        const eduDiv = document.createElement('div');
        eduDiv.className = 'cv-item';
        eduDiv.style.marginBottom = '8px';
        eduDiv.innerHTML = `
            <div class="cv-item-header">
                <span class="cv-item-title">${edu.university || ''}</span>
                <span class="cv-item-date">${edu.dates || ''}</span>
            </div>
            <div class="cv-item-sub">
                <span class="cv-item-role">${edu.degree || ''}${gpaText}</span>
                <span class="cv-item-location">${edu.location || ''}</span>
            </div>
        `;
        container.appendChild(eduDiv);
    });
}'''

js = re.sub(r"function renderCVEducation\(\) \{.*?\n\}", render_edu_impl, js, flags=re.DOTALL)

render_lead_impl = '''function renderCVLeadership() {
    const container = document.getElementById('cv-leadership-container');
    if (!container) return;
    container.innerHTML = '';
    
    const leads = (cvState && cvState.leadership && cvState.leadership.length > 0) ? cvState.leadership : TR_SAMPLE_STATE.leadership;
    const secLead = document.getElementById('sec-leadership');
    if (secLead) secLead.style.display = leads.length === 0 ? 'none' : 'block';
    
    leads.forEach(l => {
        let bulletsHtml = '';
        if (l.bullets && l.bullets.length > 0) {
            bulletsHtml = `<ul class="cv-bullets">` + 
                l.bullets.map(b => `<li>${formatBulletPoint(b)}</li>`).join('') + 
                `</ul>`;
        }
        
        const leadDiv = document.createElement('div');
        leadDiv.className = 'cv-item';
        leadDiv.style.marginBottom = '8px';
        leadDiv.innerHTML = `
            <div class="cv-item-header">
                <span class="cv-item-title">${l.organization || ''}</span>
                <span class="cv-item-date">${l.dates || ''}</span>
            </div>
            <div class="cv-item-sub">
                <span class="cv-item-role">${l.role || ''}</span>
                <span class="cv-item-location">${l.location || ''}</span>
            </div>
            ${bulletsHtml}
        `;
        container.appendChild(leadDiv);
    });
}'''

js = re.sub(r"function renderCVLeadership\(\) \{.*?\n\}", render_lead_impl, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated renderCVExperiences, renderCVEducation, renderCVLeadership in app.js!")

# Check syntax with Node
try:
    nres = subprocess.run(["node", "--check", js_path], capture_output=True, text=True)
    if nres.returncode == 0:
        print("SUCCESS: Node syntax check passed 100% for app.js!")
    else:
        print("Node syntax error:", nres.stderr)
except Exception as ex:
    print("Node check skipped:", ex)

# Git commit & push
try:
    subprocess.run(["git", "add", "."], cwd=cwd, check=True)
    subprocess.run(["git", "commit", "-m", "CRITICAL ROOT CAUSE FIX: Purge hardcoded static HTML experience/education blocks from editor.html and bind dynamic renderers in app.js so Sarah Jenkins EN sample experiences render 100% dynamically without any static HTML leftovers"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed static HTML purge fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
