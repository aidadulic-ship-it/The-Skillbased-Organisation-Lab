// Schritt 1 (Phase 2, TDD): Die Seite zeigt einen Weg, keine Bibliothek.
// Zielbild aus Phase 1: sechs Stufen, jede mit genau einem primären nächsten Schritt,
// Bibliotheksinhalte stehen nicht mehr in der Hauptnavigation, bleiben aber erreichbar.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const html=fs.readFileSync('index.html','utf8');
const read=name=>fs.readFileSync(name,'utf8');

const rail=html.match(/<aside class="icon-rail"[\s\S]*?<\/aside>/)?.[0]||'';
const buttons=[...rail.matchAll(/<button[^>]*data-view-target="([^"]+)"[^>]*>/g)].map(match=>match[1]);

const WEG=['start','fall','grill','game','mitnehmen','workshop'];
const LIBRARY=['sbo','profile','learn','tools','downloads','local','sources'];
const NEXT={start:'fall',fall:'grill',grill:'game',game:'mitnehmen',mitnehmen:'workshop'};
const view=name=>html.match(new RegExp(`<div class="view[^"]*" data-view="${name}"[\\s\\S]*?(?=<div class="view[^"]*" data-view=|</main>)`))?.[0]||'';

// 1. Die Hauptnavigation hat höchstens sechs Einträge und folgt dem Weg.
assert.ok(buttons.length<=6,`Navigation hat ${buttons.length} Einträge, erlaubt sind höchstens 6`);
assert.deepEqual(buttons,WEG,'Die Navigation zeigt genau die sechs Weg-Stufen in dieser Reihenfolge');

// 2. Bibliotheksbereiche stehen nicht mehr in der Hauptnavigation.
for(const name of LIBRARY)assert.ok(!buttons.includes(name),`"${name}" gehört nicht in die Hauptnavigation`);

// 3. Jede Stufe hat einen Ziel-View, der wirklich existiert und einen Namen für die Ansage trägt.
for(const name of WEG){
  assert.ok(view(name),`Für die Stufe "${name}" fehlt der View`);
  assert.match(html,new RegExp(`const viewNames=\\{[^}]*\\b${name}:"`),`viewNames kennt die Stufe "${name}" nicht`);
}

// 4. Jede Stufe hat genau einen primären nächsten Schritt mit dem richtigen Ziel.
for(const [from,to] of Object.entries(NEXT)){
  const primary=[...view(from).matchAll(/<button[^>]*data-next="primary"[^>]*>/g)].map(match=>match[0]);
  assert.equal(primary.length,1,`Stufe "${from}" braucht genau einen primären nächsten Schritt, gefunden: ${primary.length}`);
  assert.match(primary[0],new RegExp(`data-view-target="${to}"`),`Der nächste Schritt von "${from}" führt zu "${to}"`);
}
const finalStep=[...view('workshop').matchAll(/<button[^>]*data-next="final"[^>]*>/g)];
assert.equal(finalStep.length,1,'Die letzte Stufe hat genau einen Abschluss-Schritt (Anfrage)');

// 5. "Fall wählen" bietet die vier Fälle an.
for(const id of ['ai','skills','hybrid','pay'])assert.match(view('fall'),new RegExp(`data-case="${id}"`),`Fall "${id}" fehlt in der Stufe "Fall wählen"`);

// 6. "Mitnehmen" bietet die Entscheidungsvorlage und führt zu jedem Bibliotheksbereich.
assert.match(view('mitnehmen'),/data-open-template="decision-brief"/,'Mitnehmen öffnet die Entscheidungsvorlage');
assert.match(view('mitnehmen'),/id="nach-dem-workshop"/,'Der Bereich "Nach dem Workshop" existiert');
for(const name of LIBRARY)assert.match(view('mitnehmen'),new RegExp(`data-view-target="${name}"`),`"${name}" ist nicht mehr erreichbar`);

// 7. Absicherung: Kein Skript klickt per Code auf einen Navigationsknopf, den es nicht mehr gibt.
for(const file of fs.readdirSync('.').filter(name=>name.endsWith('.js'))){
  for(const match of read(file).matchAll(/\.icon-rail \[data-view-target="([^"]+)"\]/g)){
    assert.ok(buttons.includes(match[1]),`${file} klickt auf den entfernten Navigationsknopf "${match[1]}"`);
  }
}

console.log('Weg-Navigation ist vollständig.');
