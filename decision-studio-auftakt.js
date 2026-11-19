(function(root,factory){
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root.document)api.init();
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';
  function calculateCapacity(input){
    const people=Math.max(0,Number(input.people)||0);
    const hours=Math.max(0,Number(input.hours)||0);
    const rate=Math.max(0,Number(input.rate)||0);
    const weeks=Math.max(0,Number(input.weeks)||0);
    return{people,hours,rate,weeks,amount:people*hours*rate*weeks};
  }
  const storyCases={
    ai:{title:'KI einführen',hook:'Die KI spart Minuten. Wer prüft die Fehler?',observation:'Im fiktiven Serviceteam dauern Antworten unterschiedlich lange. Qualität und Nacharbeit sind noch nicht verglichen.',assumption:'KI-Entwürfe könnten Bearbeitungszeit verkürzen.',counterargument:'Mehr Entwürfe können Fehler und Prüfaufwand erhöhen.',question:'Sollen wir KI-Entwürfe in einem begrenzten Serviceteam-Pilot testen?'},
    skills:{title:'Stelle offen',hook:'Ihr sucht extern. Die Antwort sitzt vielleicht im Team.',observation:'Im fiktiven Team bleibt eine Aufgabe liegen. Die vorhandenen Fähigkeiten wurden noch nicht mit einer Arbeitsprobe geprüft.',assumption:'Eine externe Besetzung sei schneller als ein interner Lern- und Probeeinsatz.',counterargument:'Welche interne Person erhält überhaupt eine faire Chance?',question:'Welche offene Aufgabe können wir mit internen Skills und einer Arbeitsprobe besetzen?'},
    hybrid:{title:'Hybrid führen',hook:'Präsenz ist sichtbar. Leistung nicht immer.',observation:'Im fiktiven Team arbeiten Menschen an verschiedenen Orten. Feedback und Entwicklungschancen wurden nicht verglichen.',assumption:'Eine einheitliche Präsenzregel verbessere Zusammenarbeit für alle.',counterargument:'Wer verliert Chancen, weil Führung Nähe mit Leistung verwechselt?',question:'Welche Hybrid-Regel verbessert Zusammenarbeit, ohne Entwicklungschancen zu verzerren?'},
    pay:{title:'New Pay',hook:'Ihr belohnt Einzelzahlen. Das Team trägt die Arbeit.',observation:'Im fiktiven Bereich sollen Vergütungskriterien überarbeitet werden. Die Folgen für unterschiedliche Gruppen sind noch offen.',assumption:'Ein neues Vergütungsmodell verbessere Bindung und Fairness.',counterargument:'Welche notwendige Arbeit verschwindet aus der Bewertung?',question:'Welche Vergütungskriterien fördern faire Leistung, Zusammenarbeit und notwendige Skills?'}
  };
  function init(){
    const doc=root.document;
    const ids=['people','hours','rate'];
    const inputs=ids.map(id=>doc.getElementById('capacity-'+id));
    if(inputs.some(input=>!input))return;
    const euro=value=>new Intl.NumberFormat('de-AT',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(value);
    const number=value=>new Intl.NumberFormat('de-AT',{maximumFractionDigits:1}).format(value);
    const total=doc.getElementById('capacity-total');
    const formula=doc.getElementById('capacity-formula');
    const reduced=root.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    function render(){
      const values=calculateCapacity({people:inputs[0].value,hours:inputs[1].value,rate:inputs[2].value,weeks:46});
      ids.forEach((id,index)=>doc.getElementById('capacity-'+id+'-value').textContent=id==='rate'?euro(values.rate):number(values[id]));
      formula.textContent=number(values.people)+' Personen × '+number(values.hours)+' Stunden × '+euro(values.rate)+' × 46 Arbeitswochen = '+euro(values.amount);
      if(frame&&root.cancelAnimationFrame)root.cancelAnimationFrame(frame);
      const from=Number(total.dataset.amount||0),to=values.amount;
      total.dataset.amount=String(to);
      if(reduced.matches||!root.requestAnimationFrame){total.textContent=euro(to);return;}
      const start=performance.now();
      function tick(now){const progress=Math.min(1,(now-start)/220);total.textContent=euro(Math.round(from+(to-from)*progress));if(progress<1)frame=root.requestAnimationFrame(tick);}
      frame=root.requestAnimationFrame(tick);
    }
    inputs.forEach(input=>input.addEventListener('input',render));
    render();
    const choices=Array.from(doc.querySelectorAll('[data-story-case]'));
    const enter=doc.getElementById('enter-lab');
    const handoff=doc.getElementById('story-handoff');
    function choose(id){
      const item=storyCases[id];if(!item)return;
      choices.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.storyCase===id)));
      doc.getElementById('velocity-hook').textContent=item.hook;
      doc.getElementById('velocity-counter').textContent='Die Gegenfrage: '+item.counterargument;
      doc.getElementById('velocity-reveal').hidden=false;
      enter.dataset.chosenCase=id;
      handoff.textContent='Dein fiktiver Startfall: '+item.title+'. Die Beispielfrage steht im Feld. Du kannst sie ersetzen.';
      handoff.hidden=false;
      doc.getElementById('hero-decision-input').value=item.question;
    }
    choices.forEach(button=>button.addEventListener('click',()=>choose(button.dataset.storyCase)));
    const dialog=doc.getElementById('capacity-dialog');
    const open=doc.getElementById('capacity-open');
    open.addEventListener('click',()=>dialog.showModal());
    dialog.addEventListener('close',()=>open.focus());
  }
  return{calculateCapacity,storyCases,init};
});
