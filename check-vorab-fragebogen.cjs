const assert=require('node:assert/strict');
const fs=require('node:fs');
const questionnaire=require('./decision-studio-questionnaire.js');

const complete={
  case:'Demo/fiktiv: Die Übergabe im Serviceteam dauert zu lange.',
  goal:'Übergaben ohne zusätzliche Nacharbeit verbessern.',
  metrics:[
    {name:'Nacharbeit pro Woche',baseline:'',threshold:''},
    {name:'Fehlerhafte Übergaben',baseline:'',threshold:''},
    {name:'',baseline:'',threshold:''}
  ],
  responsible:{name:'Mira Beispiel',role:'Bereichsleitung'},
  pilotArea:'Ein Serviceteam'
};

assert.deepEqual(questionnaire.validate(complete),{ok:true,errors:[]});
assert.equal(questionnaire.validate({...complete,case:'  '}).ok,false);
assert.equal(questionnaire.validate({...complete,metrics:[complete.metrics[0],{name:'  '},complete.metrics[2]]}).ok,false);
assert.equal(questionnaire.validate({...complete,responsible:{name:'Mira Beispiel',role:'  '}}).ok,false);
assert.equal(questionnaire.validate({...complete,metrics:[complete.metrics[0],complete.metrics[1],null]}).ok,false);
const json=questionnaire.toJson(complete);
const parsed=JSON.parse(json);
assert.equal(parsed.kind,'skill-based-lab/vorab-fragebogen');
assert.equal(parsed.version,1);
assert.equal(parsed.case,complete.case);
assert.equal(parsed.metrics[0].baseline,'');
assert.equal(parsed.metrics[2].name,'');
const text=questionnaire.toText(complete);
for(const value of [complete.case,complete.goal,complete.metrics[0].name,complete.metrics[1].name,complete.responsible.name,complete.responsible.role,complete.pilotArea])assert.ok(text.includes(value));
assert.match(text,/Ausgangswert: \[offen\]/);
assert.throws(()=>questionnaire.toJson({...complete,goal:''}),/Ziel/);
assert.throws(()=>questionnaire.toJson({...complete,case:'x'.repeat(1000000)}),/zu groß/);
const imported=questionnaire.fromJson(json);
assert.deepEqual(imported,parsed);
assert.throws(()=>questionnaire.fromJson('{ungültig'),/JSON/);
assert.throws(()=>questionnaire.fromJson(JSON.stringify({...parsed,kind:'anderes-formular'})),/Vorab-Fragebogen/);
assert.throws(()=>questionnaire.fromJson(JSON.stringify({...parsed,version:2})),/Version/);
assert.throws(()=>questionnaire.fromJson(JSON.stringify({...parsed,metrics:[{name:'Nur eine'}]})),/Messgrößen/);
assert.throws(()=>questionnaire.fromJson(JSON.stringify({...parsed,responsible:{name:{text:'falsch'},role:'Leitung'}})),/Datei/);
const html=fs.readFileSync('index.html','utf8');
const fall=html.match(/<div class="view" data-view="fall"[\s\S]*?(?=<div class="view" data-view="mitnehmen")/)?.[0]||'';
for(const id of ['prework-form','prework-case','prework-goal','prework-metric-1-name','prework-metric-2-name','prework-metric-3-name','prework-responsible-name','prework-responsible-role','prework-pilot-area','prework-json','prework-text','prework-import-button','prework-import-file','prework-confirm','prework-replace','prework-cancel','prework-status'])assert.ok(fall.includes('id="'+id+'"'),'Formularfeld fehlt: '+id);
assert.match(fall,/Nur in diesem Browserfenster/);
assert.match(html,/src="\.\/decision-studio-questionnaire\.js"/);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(ids.length,new Set(ids).size,'keine doppelten IDs');
console.log('Vorab-Fragebogen: Pflichtangaben geprüft.');
