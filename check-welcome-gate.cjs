const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const html=fs.readFileSync('index.html','utf8');
const css=fs.readFileSync('decision-studio-library.css','utf8');
const welcome=html.match(/<div class="view" data-view="welcome"[\s\S]*?(?=<div class="view" data-view="start")/)?.[0]||'';
const journey=html.match(/<div class="view" data-view="start"[\s\S]*?(?=<div class="view" data-view="game")/)?.[0]||'';

assert.match(welcome,/id="sbo-explainer"/,'the welcome view must contain the explanation');
assert.match(welcome,/Was ändert sich konkret\?/,'the welcome view must lead with the requested explanation');
assert.match(welcome,/Was es ist[\s\S]*Was es nicht ist/,'both definition cards belong on the welcome view');
assert.match(welcome,/Ein Beispiel:/,'the concrete example belongs on the welcome view');
assert.match(welcome,/<button[^>]*id="enter-lab"[^>]*>Starten/,'the welcome view needs a start button');
assert.doesNotMatch(welcome,/decision-canvas|class="signal dark"|id="ansatz"/,'the welcome view must contain no later content');
assert.match(journey,/class="hero-art decision-canvas"/,'the full experience keeps its decision demo');
assert.match(journey,/class="signal dark"[\s\S]*id="ansatz"/,'the rest of the content follows in the full experience');
assert.match(html,/<div class="view" data-view="start" id="view-start" hidden>/,'the full experience starts hidden');
assert.match(html,/<button[^>]*id="rail-toggle"[^>]*hidden/,'navigation is hidden on the welcome view');
assert.match(html,/main:"welcome"/,'the brand link returns to welcome');
assert.match(html,/"sbo-explainer":"welcome"/,'the explainer anchor routes to the welcome view');
assert.match(html,/enterLab\.addEventListener\("click"[\s\S]*?activateView\("start"/,'the start button opens the full experience');
assert.match(html,/enterLab\.addEventListener\("click"[\s\S]*?activateView\("start",true,true\);\s*setRailOpen\(true\)/,'the start button must also reveal the sidebar');
assert.match(html,/function setRailOpen\(open\)[\s\S]*?classList\.toggle\("rail-open",open\)/,'the page must track visible navigation for layout');
assert.match(css,/body\.rail-open #main\{margin-left:178px\}/,'desktop content must make room for the original narrow sidebar');
assert.match(css,/\.icon-rail\{width:178px;top:76px;bottom:0;box-shadow:none/,'the original narrow sidebar must be restored');
assert.doesNotMatch(html,/viewButtons\.forEach\(function\(button\)\{button\.addEventListener\("click"[\s\S]*?activateView\(name,true,name!=="learn"\);\s*setRailOpen\(false\)/,'choosing a section must keep the sidebar available');
assert.match(html,/railToggle\.hidden=name==="welcome"/,'navigation stays out of the welcome view');
for(const selector of ['.sbo-explainer-head h2','.sbo-definition-card h3']){
  const block=css.match(new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\{([^}]*)\\}'))?.[1]||'';
  assert.match(block,/color:#070e22\b/,`${selector} must be dark on the light surface`);
}
for(const script of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
  if(script[1].trim())new vm.Script(script[1]);
}
for(const asset of html.matchAll(/(?:src|href)="\.\/([^"]+)"/g)){
  assert.ok(fs.existsSync(asset[1]),`local asset missing: ${asset[1]}`);
}
console.log('Welcome gate and full learning journey are structurally complete.');
