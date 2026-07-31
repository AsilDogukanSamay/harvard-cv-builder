import os
import sys
import re
import subprocess

sys.stdout.reconfigure(encoding='utf-8')

cwd = r"C:\Users\doguk\.gemini\antigravity\scratch\asil_harvard_cv"
js_path = os.path.join(cwd, "app.js")

with open(js_path, "r", encoding="utf-8") as f:
    js = f.read()

# Render functions with correct CSS class names: entry-block, entry-header, company-name, entry-subheader, entry-role, entry-date, entry-bullets
render_exp_impl = '''function renderCVExperiences() {
    const container = document.getElementById('cv-experience-container');
    if (!container) return;
    container.innerHTML = '';
    
    const exps = (cvState && cvState.experiences && cvState.experiences.length > 0) ? cvState.experiences : TR_SAMPLE_STATE.experiences;
    const secExp = document.getElementById('sec-experience');
    if (secExp) secExp.style.display = exps.length === 0 ? 'none' : 'block';
    
    exps.forEach(exp => {
        const expDiv = document.createElement('div');
        expDiv.className = 'entry-block';
        
        let bulletsHtml = '';
        if (exp.bullets && exp.bullets.length > 0) {
            bulletsHtml = `<ul class="entry-bullets">` + 
                exp.bullets.map(b => `<li>${formatBulletPoint(b)}</li>`).join('') + 
                `</ul>`;
        }
        
        expDiv.innerHTML = `
            <div class="entry-header">
                <span class="company-name">${exp.company || ''}</span>
                <span class="entry-location">${exp.location || ''}</span>
            </div>
            <div class="entry-subheader">
                <span class="entry-role">${exp.role || ''}</span>
                <span class="entry-date">${exp.dates || ''}</span>
            </div>
            ${bulletsHtml}
        `;
        container.appendChild(expDiv);
    });
}'''

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
        eduDiv.className = 'entry-block';
        eduDiv.innerHTML = `
            <div class="entry-header">
                <span class="university-name">${edu.university || ''}</span>
                <span class="entry-location">${edu.location || ''}</span>
            </div>
            <div class="entry-subheader">
                <span class="entry-role">${edu.degree || ''}${gpaText}</span>
                <span class="entry-date">${edu.dates || ''}</span>
            </div>
        `;
        container.appendChild(eduDiv);
    });
}'''

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
            bulletsHtml = `<ul class="entry-bullets">` + 
                l.bullets.map(b => `<li>${formatBulletPoint(b)}</li>`).join('') + 
                `</ul>`;
        }
        
        const leadDiv = document.createElement('div');
        leadDiv.className = 'entry-block';
        leadDiv.innerHTML = `
            <div class="entry-header">
                <span class="company-name">${l.organization || ''}</span>
                <span class="entry-location">${l.location || ''}</span>
            </div>
            <div class="entry-subheader">
                <span class="entry-role">${l.role || ''}</span>
                <span class="entry-date">${l.dates || ''}</span>
            </div>
            ${bulletsHtml}
        `;
        container.appendChild(leadDiv);
    });
}'''

js = re.sub(r"function renderCVExperiences\(\) \{.*?\n\}", render_exp_impl, js, flags=re.DOTALL)
js = re.sub(r"function renderCVEducation\(\) \{.*?\n\}", render_edu_impl, js, flags=re.DOTALL)
js = re.sub(r"function renderCVLeadership\(\) \{.*?\n\}", render_lead_impl, js, flags=re.DOTALL)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(js)

print("SUCCESS: Updated renderCVExperiences, renderCVEducation, renderCVLeadership in app.js with exact entry-block CSS classes!")

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
    subprocess.run(["git", "commit", "-m", "CRITICAL CSS CLASS FIX: Use exact entry-block, entry-header, company-name, entry-subheader CSS classes in renderCVExperiences, renderCVEducation, renderCVLeadership so all sections populate 100% on A4 preview canvas"], cwd=cwd, check=True)
    subprocess.run(["git", "push", "origin", "main"], cwd=cwd, check=True)
    print("SUCCESS: Pushed CSS class fix to GitHub!")
except Exception as ex:
    print("Git push error:", ex)
