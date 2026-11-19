const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('decision-studio.css','utf8');
const welcome=html.match(/<div class="view" data-view="welcome"[\s\S]*?(?=<div class="view" data-view="start")/)?.[0]||'';
const journey=html.match(/<div class="view" data-view="start"[\s\S]*?(?=<div class="view" data-view="game")/)?.[0]||'';
assert.match(html,/<a class="brand"[^>]*>[\s\S]*?Skill-Based Lab[\s\S]*?<\/a>/,'the header must carry the product name');

assert.match(welcome,/<h1[^>]*>Du hast einen Ferrari[\s\S]*Tempo 30/i,'the Ferrari is the explicit opening (changed 2026-11-19, line 10: new visual and copy requirement)');
assert.match(welcome,/The Skill-Based Organization/,'the offer must be named immediately');
assert.match(welcome,/id="velocity-check"[\s\S]*30-Sekunden-Check/,'the opening now invites an immediate interactive check (changed 2026-11-19, line 12: concise-first requirement)');
assert.match(welcome,/Schaffe Wirkung\. Werde zukunftsfähig\./,'the brand promise stays visible');
assert.match(welcome,/<button[^>]*id="enter-lab"[^>]*>Starten/,'the welcome view needs a start button');
assert.doesNotMatch(welcome,/sbo-definition-card|decision-canvas|class="signal dark"|id="ansatz"/,'the welcome view must remain a focused invitation');
assert.match(journey,/id="sbo-explainer"[\s\S]*Was es ist[\s\S]*Was es nicht ist/,'the full experience must retain the detailed explanation');
assert.match(journey,/class="hero-art decision-canvas"/,'the full experience keeps its decision demo');
assert.match(journey,/class="signal dark"[\s\S]*id="ansatz"/,'the rest of the content follows in the full experience');
assert.match(html,/<div class="view" data-view="start" id="view-start" hidden>/,'the full experience starts hidden');
assert.match(html,/<button[^>]*id="rail-toggle"[^>]*hidden/,'navigation is hidden on the welcome view');
const rail=html.match(/<aside class="icon-rail"[\s\S]*?<\/aside>/)?.[0]||'';
const railOrder=[...rail.matchAll(/<button[^>]*data-view-target="([^"]+)"/g)].map(match=>match[1]);
assert.deepEqual(railOrder,['start','fall','grill','game','mitnehmen','workshop'],'the rail follows the six-step path (changed 2026-11-19: path instead of library)');
assert.doesNotMatch(rail,/rail-divider/,'the path rail has no library divider (library lives under "Nach dem Workshop")');
assert.match(html,/main:"welcome"/,'the brand link returns to welcome');
assert.match(html,/"sbo-explainer":"start"/,'the detailed explanation routes to the full experience');
assert.match(html,/enterLab\.addEventListener\("click"[\s\S]*?activateView\("start"/,'the start button opens the full experience');
assert.match(html,/enterLab\.addEventListener\("click"[\s\S]*?activateView\("start",true,true\);\s*setRailOpen\(true\)/,'the start button must also reveal the sidebar');
assert.match(html,/function setRailOpen\(open\)[\s\S]*?classList\.toggle\("rail-open",open\)/,'the page must track visible navigation for layout');
assert.match(css,/body\.rail-open #main\{margin-left:178px\}/,'desktop content must make room for the original narrow sidebar');
assert.match(css,/\.icon-rail\{position:fixed;left:0;top:76px;bottom:0;width:178px/,'the original narrow sidebar must be restored');
assert.doesNotMatch(html,/viewButtons\.forEach\(function\(button\)\{button\.addEventListener\("click"[\s\S]*?activateView\(name,true,name!=="learn"\);\s*setRailOpen\(false\)/,'choosing a section must keep the sidebar available');
assert.match(html,/railToggle\.hidden=name==="welcome"/,'navigation stays out of the welcome view');
assert.match(css,/\/\* Executive entry after Start:[\s\S]*?\.sbo-explainer\{background:#070e22;color:#f7f9ff/,'the explainer must use the executive dark palette');
assert.match(css,/\.sbo-definition-card h3\{color:#f7f9ff/,'card headings must remain readable');
for(const script of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
  if(script[1].trim())new vm.Script(script[1]);
}
for(const asset of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)){
  assert.ok(fs.existsSync(asset[1]),`local asset missing: ${asset[1]}`);
}
console.log('Welcome gate and full learning journey are structurally complete.');
