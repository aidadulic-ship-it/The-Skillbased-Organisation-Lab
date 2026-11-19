const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('decision-studio.css','utf8');
const welcome=html.match(/<div class="view" data-view="welcome"[\s\S]*?(?=<div class="view" data-view="start")/)?.[0]||'';
assert.match(welcome,/Du hast einen Ferrari[\s\S]*Tempo 30/i);
assert.match(welcome,/<picture[^>]*class="velocity-visual"[\s\S]*ferrari-tempo30-mobile\.png[\s\S]*ferrari-tempo30-desktop\.png/);
assert.match(welcome,/30-Sekunden-Check/);
for(const id of ['ai','skills','hybrid','pay'])assert.match(welcome,new RegExp(`data-story-case="${id}"`));
assert.match(welcome,/id="velocity-reveal"[^>]*hidden/);
assert.match(welcome,/id="capacity-dialog"/);
assert.match(welcome,/id="capacity-open"/);
assert.match(welcome,/id="enter-lab"/);
assert.doesNotMatch(welcome,/tempo-evidence|tempo-pit|storyline-branch/,'the first page should be focused');
assert.match(css,/\.velocity-visual[\s\S]*@media\(max-width:700px\)/);
assert.match(css,/prefers-reduced-motion:reduce[\s\S]*\.velocity-/);
const api=require('./decision-studio-auftakt.js');
for(const id of ['ai','skills','hybrid','pay']){
  const item=api.storyCases[id];
  assert.ok(item&&item.hook&&item.question&&item.counterargument);
  assert.ok(item.hook.length<100,'short hook for '+id);
}
console.log('Provokanter Hero: Bild, Kurzcheck und Übergang vorhanden.');
