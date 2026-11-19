const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('decision-studio.css','utf8');
const welcome=html.match(/<div class="view" data-view="welcome"[\s\S]*?(?=<div class="view" data-view="start")/)?.[0]||'';
const start=html.match(/<div class="view" data-view="start"[\s\S]*?(?=<div class="view" data-view="game")/)?.[0]||'';
assert.match(welcome,/id="velocity-check"/,'the story must offer a decision point immediately');
for(const id of ['ai','skills','hybrid','pay'])assert.match(welcome,new RegExp(`data-story-case="${id}"`),`missing story choice ${id}`);
for(const id of ['velocity-hook','velocity-counter'])assert.match(welcome,new RegExp(`id="${id}"`),`missing immediate outcome ${id}`);
assert.match(welcome,/id="enter-lab"/,'the story has a working next step');
assert.match(start,/id="story-handoff"/,'the selected demo question follows into Start');
assert.match(html,/enterLab\.dataset\.chosenCase[\s\S]*selectCase/,'the existing case demo follows the story choice');
assert.match(css,/\.velocity-choices[\s\S]*prefers-reduced-motion:reduce/,'interactive scene is styled with reduced-motion support');
const api=require('./decision-studio-auftakt.js');
for(const id of ['ai','skills','hybrid','pay']){
  const item=api.storyCases[id];
  assert.ok(item&&item.hook&&item.question&&item.counterargument,`complete, specific outcome for ${id}`);
  assert.match(item.question,/\?/);
}
assert.equal(api.storyCases.ai.question===api.storyCases.pay.question,false,'different choices lead to different questions');
console.log('Storyline: four complete paths and handoff contract present.');
