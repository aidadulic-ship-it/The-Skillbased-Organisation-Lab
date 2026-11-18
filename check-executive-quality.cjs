const assert=require('node:assert/strict');
const fs=require('node:fs');
const lib=require('./decision-studio-library.js');
const model=require('./decision-studio-model.js');
const lessons=require('./decision-studio-lessons.js');
const html=fs.readFileSync('index.html','utf8');
const read=name=>fs.readFileSync(name,'utf8');
const filled=value=>typeof value==='string'&&value.trim().length>0;

assert.equal(lib.cases.length,4,'exactly four flagship cases');
assert.deepEqual(new Set(lib.cases.map(item=>item.id)),new Set(['ai-approval','hidden-skill','remote-career','pay-gap']));
for(const item of lib.cases){
  assert.equal(item.level,'flagship',item.id+' must be a flagship');
  for(const key of ['title','situation','counterargument','source'])assert.ok(filled(item[key]),item.id+' missing '+key);
  assert.equal(item.options.length,2,item.id+' needs two options');
  assert.deepEqual(new Set(item.assumptionRegister.map(row=>row.type)),new Set(['Beobachtung','Annahme','Wert']));
  assert.equal(item.euro.scenarios.length,3);
  assert.deepEqual(item.euro.scenarios.map(s=>s.name),['Vorsichtig','Mittel','Günstig']);
  assert.ok(filled(item.euro.formula));
  for(const s of item.euro.scenarios){
    for(const key of ['units','unitValue','cost','riskCost'])assert.ok(Number.isFinite(s[key]),item.id+' invalid '+key);
    assert.ok(filled(s.rationale),item.id+' missing scenario reasoning');
  }
  for(const key of ['units','unitValue','cost','riskCost'])assert.equal(new Set(item.euro.scenarios.map(s=>s[key])).size,3,item.id+' '+key+' must vary');
  assert.ok(filled(item.euro.counterfactual),item.id+' needs a counterfactual');
  assert.ok(item.groups.length>=3,item.id+' needs affected groups');
  for(const day of ['day30','day90'])for(const key of ['go','stop'])assert.ok(filled(item.gates[day][key]));
  assert.ok(lib.sources[item.source]?.url.startsWith('https://'));
}
assert.equal(model.cases.length,4,'Decision Mirror must offer four cases');
assert.ok(model.getCase('pay'));
for(const lesson of lessons.lessons){
  assert.ok(lib.sources[lesson.sourceKey],lesson.id+' source not in library');
  assert.equal(lesson.sourceUrl,lib.sources[lesson.sourceKey].url,lesson.id+' source URL differs');
}
for(const item of model.cases){
  assert.ok(lib.sources[item.sourceKey],item.id+' source not in library');
  assert.equal(item.sourceUrl,lib.sources[item.sourceKey].url,item.id+' source URL differs');
}
assert.equal(lib.courses.length,12,'twelve curated courses');
assert.equal(new Set(lib.courses.map(x=>x.challenge)).size,12,'every course needs a unique active task');
for(const domain of lib.domains)assert.equal(lib.courses.filter(x=>x.domain===domain.id).length,2,domain.id+' needs two courses');
assert.equal(lib.skills.length,12);
for(const skill of lib.skills){
  for(const key of ['qualityBoundary','exampleStructure','stopRule'])assert.ok(filled(skill[key]),skill.id+' missing '+key);
  for(const label of ['QUALITÄTSGRENZE:','BEISPIELANTWORT-STRUKTUR:','STOP-REGEL:'])assert.ok(skill.body.includes(label),skill.id+' missing prompt section');
}
for(const key of ['qualityBoundary','exampleStructure','stopRule'])assert.equal(new Set(lib.skills.map(x=>x[key])).size,12,key+' must be specific');
const forbidden=/Jeff Bezos|Bill Gates|Mark Zuckerberg|Sam Altman|Elon Musk|Tesla/i;
assert.ok(lib.perspectives.every(x=>!forbidden.test(x.title)),'provider visions must not appear as expert perspectives');
assert.ok(lib.councils.every(x=>x.lenses.every(l=>!forbidden.test(l.name))),'councils must not cite provider visionaries');
for(const journey of lib.journeys){
  assert.ok(lib.courses.some(x=>x.id===journey.course),'missing journey course '+journey.id);
  assert.ok(lib.cases.some(x=>x.id===journey.case),'missing journey case '+journey.id);
  assert.ok(journey.perspectives.every(id=>lib.perspectives.some(x=>x.id===id)),'missing journey perspective '+journey.id);
  assert.ok(model.getCase(journey.mirrorCase),'missing Decision Mirror case '+journey.id);
}
assert.equal(lib.journeys.length,4,'all flagship cases need a guided journey');
assert.equal((html.match(/rel="stylesheet"/g)||[]).length,1,'one external stylesheet');
assert.match(html,/href="\.\/decision-studio\.css"/,'the consolidated stylesheet must be loaded');
const css=read('decision-studio.css');
assert.equal((css.match(/^#main\{/gm)||[]).length,1,'one desktop main rule');
assert.equal((css.match(/^\.icon-rail\{/gm)||[]).length,1,'one desktop rail rule');
assert.match(css,/\.case-option:focus-visible\{outline:3px solid #ffff00/,'case options need visible focus');
assert.match(css,/\.sbo-explainer a:focus-visible\{outline:3px solid #ffff00/,'explainer links need visible focus');
const luminance=hex=>{
  const rgb=hex.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
};
const contrast=(a,b)=>{const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
for(const [foreground,background] of [['#f7f9ff','#070e22'],['#d4e0e9','#070e22'],['#00d2d7','#070e22'],['#ffff00','#070e22'],['#e3edf4','#111b36']])assert.ok(contrast(foreground,background)>=4.5,foreground+' on '+background+' must meet WCAG AA');
assert.ok(!html.includes('The Skill-Based Organisation Lab'),'no second product name');
assert.ok(!read('README.md').includes('The Skill-Based Organisation Lab'),'README has one product name');
assert.ok(!html.includes('aida.dulic@hotmail.com')&&!read('decision-studio-redesign.js').includes('aida.dulic@hotmail.com'),'contact is not hardcoded');
assert.equal((read('decision-studio-redesign.js').match(/\[KONTAKT-E-MAIL\]/g)||[]).length,1,'one contact placeholder constant');
assert.match(html,/Workshop-Anfrage/,'contact action is a workshop inquiry');
assert.match(html,/id="enter-lab"/,'welcome gate stays available');
assert.match(html,/id="voice-consent-dialog"/,'voice consent stays available');
assert.match(html,/id="voice-consent-accept"/,'voice consent action stays available');
assert.match(html,/id="template-library"/,'download kit stays available');

const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(new Set(ids).size,ids.length,'no duplicate HTML IDs');
const idSet=new Set(ids);
const views=new Set([...html.matchAll(/data-view="([^"]+)"/g)].map(x=>x[1]));
for(const match of html.matchAll(/href="#([^"]*)"/g))assert.ok(idSet.has(match[1])||views.has(match[1]),'dead internal link #'+match[1]);
for(const match of html.matchAll(/data-view-target="([^"]+)"/g))assert.ok(views.has(match[1]),'dead view target '+match[1]);
assert.ok(!/href="(?:#|)"/.test(html),'empty internal link');
for(const group of [lib.courses,lib.cases,lib.perspectives,lib.skills,lib.templates,lib.councils]){
  for(const card of group)assert.ok(filled(card.title),'empty card title');
}
const executive=require('./decision-studio-executive.js');
const short=executive.analyzeQuestion('KI?');
assert.equal(short.ok,false,'short question needs clarification');
assert.ok(filled(short.clarification));
const analysis=executive.analyzeQuestion('Sollen wir KI-Entwürfe im Kundenservice einführen?');
assert.equal(analysis.ok,true);
for(const key of ['fact','assumption','value','counterargument'])assert.ok(filled(analysis[key]),'hero missing '+key);
assert.equal(analysis.questions.length,3);
const openQuestion=executive.analyzeQuestion('Sollen wir die Schichtplanung im Werk ändern?');
assert.equal(openQuestion.caseId,null,'an unrelated question must not inherit the AI case');
assert.ok(!/KI|Kundenservice/i.test(openQuestion.counterargument),'generic counterargument must be neutral');
const euroCheck=executive.calculateEuro({baseline:20000,effect:20,cost:3000});
assert.equal(euroCheck.scenarios[1].net,1000,'middle Euro formula must be baseline × effect − cost');
assert.ok(euroCheck.scenarios[0].net<euroCheck.scenarios[1].net&&euroCheck.scenarios[1].net<euroCheck.scenarios[2].net);
const board=executive.advanceBoard(executive.initialBoard(),0);
assert.equal(board.round,1);
assert.ok(board.metrics.cost!==50&&board.metrics.quality!==50&&board.metrics.trust!==50&&board.metrics.risk!==50,'all four board dimensions change');
for(const id of ['hero-decision-form','hero-decision-result','hero-euro-check','decision-print','board-scene','example-case','founder-stance'])assert.ok(idSet.has(id),'missing interactive area '+id);
assert.match(css,/@media print\{body\.printing-decision/,'A4 decision print stylesheet missing');
assert.match(css,/@media\s*\(prefers-reduced-motion:\s*reduce\)/,'reduced motion support missing');
console.log('Executive content, links, names, CSS and contact contract passed.');
