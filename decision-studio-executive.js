(function(root,factory){
  const library=typeof module==="object"&&module.exports?require("./decision-studio-library.js"):root.DecisionStudioLibrary;
  const api=factory(root,library);
  if(typeof module==="object"&&module.exports)module.exports=api;
  root.DecisionStudioExecutive=api;
  if(root.document)api.init();
})(typeof globalThis!=="undefined"?globalThis:this,function(root,library){
  "use strict";
  const money=value=>new Intl.NumberFormat("de-AT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(value);
  const byId=id=>root.document.getElementById(id);
  const element=(tag,className,text)=>{const node=root.document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;};
  const themes=[
    {test:/\b(ki|künstlich\w*|ai|automatisier\w*|algorithm\w*|prompt\w*)\b/i,caseId:"ai-approval",name:"KI-Einsatz",assumption:"Der Einsatz könnte Arbeit verbessern. Fehler, Nacharbeit und nutzbare Zeit sind im eigenen Betrieb noch nicht gemessen.",value:"Kundenrichtigkeit und klare menschliche Verantwortung gelten auch bei höherem Tempo.",questions:["Welche Aufgabe wird unterstützt, und wer gibt das Ergebnis frei?","Welche Qualität erreicht ein vergleichbares Team ohne KI?","Bei welchem Fehler oder Aufwand stoppen wir den Pilot?"]},
    {test:/\b(stelle\w*|besetz\w*|skill\w*|rolle\w*|talent\w*|fachkräft\w*|rekrut\w*)\b/i,caseId:"hidden-skill",name:"Skills und Besetzung",assumption:"Vorhandene Fähigkeiten könnten einen Teil der offenen Arbeit abdecken. Eine Arbeitsprobe fehlt noch.",value:"Interne Chancen und Auswahl müssen nachvollziehbar und fair sein.",questions:["Welche konkreten Aufgaben sind kritisch?","Welcher Beleg zeigt die Fähigkeit unter realen Bedingungen?","Was kosten externe Suche, Lernzeit und mögliche Ausfälle?"]},
    {test:/\b(hybrid|remote|mobil|büro|präsenz|homeoffice)\b/i,caseId:"remote-career",name:"hybride Arbeit",assumption:"Eine andere Ortsregel könnte Abstimmung verbessern. Die Wirkung auf Qualität und Chancen ist offen.",value:"Leistung und Entwicklungschancen dürfen nicht von bloßer Sichtbarkeit abhängen.",questions:["Welche Aufgaben brauchen wirklich einen gemeinsamen Ort?","Wer erhält Informationen und Feedback später als andere?","Welche Qualitäts- und Belastungsmaße prüfen wir nach 30 Tagen?"]},
    {test:/\b(pay|lohn|gehalt|vergütung|prämie|entgelt)\b/i,caseId:"pay-gap",name:"Vergütung",assumption:"Neue Kriterien könnten Bindung oder Fairness verbessern. Ein kausaler Effekt ist noch nicht belegt.",value:"Gleichwertige Arbeit braucht nachvollziehbare und rechtlich geprüfte Kriterien.",questions:["Welche notwendige Arbeit bleibt im Vorschlag unsichtbar?","Welche Gruppen sind direkt und indirekt betroffen?","Wer prüft Vergleichbarkeit, Kosten und Rechtsrahmen?"]}
  ];
  function analyzeQuestion(input){
    const question=String(input||"").trim().replace(/\s+/g," ");
    if(question.length<20||question.split(" ").length<4)return{ok:false,clarification:"Nenne bitte eine konkrete Entscheidung: Was soll sich ändern, für wen und in welchem Arbeitsbereich?"};
    const theme=themes.find(item=>item.test.test(question))||{caseId:null,name:"Arbeitsgestaltung",assumption:"Die Maßnahme könnte nützen. Lokale Wirkung und Nebenfolgen sind noch offen.",value:"Qualität, Fairness und Verantwortung müssen sichtbar bleiben.",questions:["Was ist heute beobachtet, was nur angenommen?","Welche Alternative prüfen wir im selben Zeitraum?","Welcher Befund würde den Beschluss ändern?"]};
    const decisionCase=library.cases.find(item=>item.id===theme.caseId);
    return{ok:true,question,caseId:theme.caseId,fact:"Deine Frage betrifft "+theme.name+". Eine lokale Baseline und ein gemessener Effekt liegen in dieser Demo nicht vor.",assumption:theme.assumption,value:theme.value,counterargument:decisionCase?decisionCase.counterargument:"Die Änderung könnte Aufwand oder Belastung verlagern. Ohne Vergleich ist unklar, ob der Nutzen die Nebenfolgen übersteigt.",questions:theme.questions};
  }
  function calculateEuro(input){
    const baseline=Math.max(0,Number(input.baseline)||0);
    const effect=Math.min(100,Math.max(0,Number(input.effect)||0));
    const cost=Math.max(0,Number(input.cost)||0);
    const specs=[{name:"Vorsichtig",effectFactor:.5,costFactor:1.2,reason:"Halbe Wirkung und 20 % höhere Pilotkosten."},{name:"Mittel",effectFactor:1,costFactor:1,reason:"Erwartete Wirkung und geplante Kosten."},{name:"Günstig",effectFactor:1.3,costFactor:.85,reason:"30 % mehr Wirkung und 15 % geringere Pilotkosten."}];
    return{baseline,effect,cost,formula:"heutiger Aufwand × angenommene Wirkung − Pilotkosten",scenarios:specs.map(spec=>{const rate=Math.min(100,effect*spec.effectFactor);const pilotCost=cost*spec.costFactor;return{name:spec.name,rate,pilotCost,net:Math.round(baseline*rate/100-pilotCost),reason:spec.reason};})};
  }
  const rounds=[
    {question:"Die KI soll morgen in allen Serviceteams starten. Was beschließt du?",choices:[
      {label:"Sofort ausrollen",delta:{cost:-8,quality:-12,trust:-10,risk:14},argument:"Der Finanzvorstand fragt: Wer bezahlt systematische Fehler und Nacharbeit?"},
      {label:"Einen begrenzten Pilot mit Freigabe starten",delta:{cost:10,quality:12,trust:8,risk:-12},argument:"Die Geschäftsführung fragt: Wie verhindern wir, dass der Pilot endlos läuft?"}
    ]},
    {question:"Im Pilot fällt eine falsche Antwort auf. Wie reagierst du?",choices:[
      {label:"Nur die einzelne Antwort korrigieren",delta:{cost:-5,quality:-9,trust:-10,risk:13},argument:"Die Kundschaft fragt: Woher wissen wir, dass es kein Muster ist?"},
      {label:"Muster prüfen und Freigabegrenze schärfen",delta:{cost:9,quality:13,trust:9,risk:-10},argument:"Finance fragt: Ab wann ist der zusätzliche Prüfaufwand zu teuer?"}
    ]},
    {question:"Nach 90 Tagen ist die Zeitwirkung positiv, die Belastung aber höher. Was folgt?",choices:[
      {label:"Trotzdem skalieren",delta:{cost:-7,quality:-8,trust:-14,risk:15},argument:"Die Mitarbeitenden fragen: Wer trägt die zusätzliche Arbeit?"},
      {label:"Arbeitslast ändern und erneut messen",delta:{cost:11,quality:9,trust:13,risk:-9},argument:"Der Vorstand fragt: Welcher konkrete Messpunkt erlaubt später ein Go?"}
    ]}
  ];
  function initialBoard(){return{round:0,metrics:{cost:50,quality:50,trust:50,risk:50},history:[]};}
  function advanceBoard(state,choiceIndex){
    const choice=rounds[state.round]?.choices[choiceIndex];
    if(!choice)return state;
    const metrics={};
    for(const key of Object.keys(state.metrics))metrics[key]=Math.max(0,Math.min(100,state.metrics[key]+choice.delta[key]));
    return{round:state.round+1,metrics,history:[...state.history,{label:choice.label,argument:choice.argument}]};
  }
  function boardConclusion(state){
    const m=state.metrics;
    const pressure=m.risk>50?"Risiko und Fehlerfolgen brauchen eine klare Stop-Regel.":m.trust<50?"Vertrauen braucht Beteiligung und sichtbare Rückmeldung.":m.cost>65?"Der Pilotaufwand braucht eine belastbare Kostengrenze.":"Eine gute Richtung ersetzt noch keinen Vergleich mit der Baseline.";
    return"Was du übersehen hast: "+pressure+" Prüfe auch die Gruppe, die den Preis deiner Entscheidung trägt.";
  }
  function init(){
    const form=byId("hero-decision-form");
    if(!form)return;
    const input=byId("hero-decision-input"),help=byId("hero-decision-help"),result=byId("hero-decision-result"),boardArt=byId("welcome-board");
    const rehomeResult=()=>{const mobile=root.matchMedia("(max-width: 700px)").matches;if(mobile)form.insertAdjacentElement("afterend",result);else boardArt.insertAdjacentElement("afterend",result);form.hidden=mobile&&!result.hidden;};
    rehomeResult();root.addEventListener("resize",rehomeResult);
    const sliders=["baseline","effect","cost"].map(name=>byId("hero-"+name));
    let current=null;
    const reduceMotion=root.matchMedia("(prefers-reduced-motion: reduce)");
    const displayNumber=(output,value,formatter)=>{
      const start=Number(output.dataset.number||0);
      output.dataset.number=String(value);
      if(reduceMotion.matches||!root.requestAnimationFrame){output.textContent=formatter(value);return;}
      const token=String(Date.now()+Math.random());output.dataset.animation=token;
      const began=performance.now();
      const frame=now=>{if(output.dataset.animation!==token)return;const progress=Math.min(1,(now-began)/180);output.textContent=formatter(Math.round(start+(value-start)*progress));if(progress<1)root.requestAnimationFrame(frame);};
      root.requestAnimationFrame(frame);
    };
    const renderEuro=()=>{
      const values=calculateEuro({baseline:sliders[0].value,effect:sliders[1].value,cost:sliders[2].value});
      displayNumber(byId("hero-baseline-value"),values.baseline,money);
      displayNumber(byId("hero-effect-value"),values.effect,value=>value+" %");
      displayNumber(byId("hero-cost-value"),values.cost,money);
      byId("hero-euro-formula").textContent="Formel: "+values.formula+" · Mittel: "+money(values.baseline)+" × "+values.effect+" % − "+money(values.cost)+" = "+money(values.scenarios[1].net);
      const box=byId("hero-euro-scenarios");box.replaceChildren();
      values.scenarios.forEach(s=>{const card=element("div","hero-euro-card");card.append(element("span","",s.name),element("strong","",money(s.net)),element("small","",money(values.baseline)+" × "+s.rate.toFixed(1).replace(".",",")+" % − "+money(s.pilotCost)),element("p","",s.reason));box.append(card);});
      return values;
    };
    const renderAnalysis=analysis=>{
      current=analysis;
      byId("hero-result-question").textContent=analysis.question;
      const four=byId("hero-four");four.replaceChildren();
      [["Fakt / Datenlücke",analysis.fact],["Annahme",analysis.assumption],["Wert",analysis.value],["Stärkstes Gegenargument",analysis.counterargument]].forEach(([label,copy])=>{const card=element("div","hero-four-card");card.append(element("h3","",label),element("p","",copy));four.append(card);});
      const list=byId("hero-check-questions");list.replaceChildren();analysis.questions.forEach(question=>list.append(element("li","",question)));
      boardArt.hidden=true;result.hidden=false;rehomeResult();help.textContent="Dein Check ist geöffnet. Alle Angaben bleiben in diesem Browserfenster.";
      renderEuro();
    };
    const submit=()=>{const analysis=analyzeQuestion(input.value);if(!analysis.ok){help.textContent=analysis.clarification;input.focus();return;}renderAnalysis(analysis);};
    form.addEventListener("submit",event=>{event.preventDefault();submit();});
    root.document.querySelectorAll("[data-example-question]").forEach(chip=>chip.addEventListener("click",()=>{input.value=chip.dataset.exampleQuestion;submit();}));
    byId("hero-result-reset").addEventListener("click",()=>{result.hidden=true;boardArt.hidden=false;form.hidden=false;byId("hero-example-path").hidden=true;input.focus();});
    sliders.forEach(slider=>slider.addEventListener("input",renderEuro));
    byId("example-case").addEventListener("click",()=>{input.value="Sollen wir KI-Entwürfe im Kundenservice einführen?";submit();byId("hero-example-path").hidden=false;});
    byId("decision-print").addEventListener("click",()=>{
      if(!current)return;
      const decisionCase=library.cases.find(item=>item.id===current.caseId);
      const euro=renderEuro();
      const sheet=element("section","decision-print-sheet");
      sheet.append(element("p","print-kicker","Skill-Based Lab · Entscheidungsvorlage · Demo/fiktiv"),element("h1","",current.question),element("p","","Euro-Check, kein ROI. Eingaben aus diesem Browserfenster; weitere Werte sind Demo/fiktiv."));
      const block=(title,lines)=>{const wrap=element("div","decision-print-block");wrap.append(element("h2","",title));lines.forEach(line=>wrap.append(element("p","",line)));sheet.append(wrap);};
      block("Zwei Optionen",decisionCase?decisionCase.options.map(option=>option.title+": "+option.effect+" Risiko: "+option.risk):["A: Begrenzten Pilot mit vorher festgelegten Prüfgrößen starten.","B: Bestehende Praxis beibehalten und dieselben Prüfgrößen messen."]);
      block("Annahmenregister",["Fakt / Datenlücke: "+current.fact,"Annahme: "+current.assumption,"Wert: "+current.value]);
      block("Euro-Szenarien",["Formel: "+euro.formula,...euro.scenarios.map(s=>s.name+": "+money(euro.baseline)+" × "+s.rate.toFixed(1).replace(".",",")+" % − "+money(s.pilotCost)+" = "+money(s.net))]);
      block("Gegenfaktum",[decisionCase?decisionCase.euro.counterfactual:"Was geschieht im gleichen Zeitraum ohne Änderung? Vergleiche Aufwand, Qualität und Belastung."]);
      block("Stärkstes Gegenargument",[current.counterargument]);
      block("Betroffene Gruppen",[decisionCase?decisionCase.groups.join(" · "):"Betroffene Mitarbeitende · Führung · HR · Finance; vor Ort ergänzen."]);
      block("Stop / Go",decisionCase?["Tag 30 · GO: "+decisionCase.gates.day30.go,"Tag 30 · STOP: "+decisionCase.gates.day30.stop,"Tag 90 · GO: "+decisionCase.gates.day90.go,"Tag 90 · STOP: "+decisionCase.gates.day90.stop]:["Tag 30 · GO: Messung und Beteiligung sind eingerichtet; vor Ort definieren.","Tag 30 · STOP: Nebenfolgen oder Datenlücken erfordern eine Pause; vor Ort definieren.","Tag 90 · GO: Vergleich zeigt tragbaren Nutzen; vor Ort definieren.","Tag 90 · STOP: Wirkung bleibt unklar oder Belastung steigt; vor Ort definieren."]);
      block("Quelle und Grenze",decisionCase?[library.sources[decisionCase.source].label,library.sources[decisionCase.source].url,"Die Quelle ist ein fachlicher Prüfrahmen; sie belegt nicht die Demo-Zahlen."]:["Keine passende Fachquelle zugeordnet. Eine Primärquelle für diese konkrete Frage prüfen.","Die Euro-Werte sind Demo/fiktiv; sie belegen keine Wirkung."]);
      root.document.body.append(sheet);root.document.body.classList.add("printing-decision");
      root.addEventListener("afterprint",()=>{sheet.remove();root.document.body.classList.remove("printing-decision");},{once:true});
      root.print();
    });
    let state=initialBoard();
    const renderBoard=()=>{
      const round=byId("board-round");round.replaceChildren();
      const metrics=byId("board-metrics");metrics.replaceChildren();
      [["Kosten","cost"],["Qualität","quality"],["Vertrauen","trust"],["Risiko","risk"]].forEach(([label,key])=>{const cell=element("div","board-metric");cell.append(element("span","",label),element("strong","",String(state.metrics[key])));metrics.append(cell);});
      byId("board-response").textContent="";byId("board-next").hidden=true;byId("board-conclusion").hidden=true;byId("board-restart").hidden=true;
      if(state.round>=rounds.length){byId("board-conclusion").textContent=boardConclusion(state);byId("board-conclusion").hidden=false;byId("board-restart").hidden=false;return;}
      const item=rounds[state.round];round.append(element("span","board-round-label","RUNDE "+(state.round+1)+" / 3"),element("h3","",item.question));
      item.choices.forEach((choice,index)=>{const button=element("button","board-choice",choice.label+" ↗");button.type="button";button.addEventListener("click",()=>{state=advanceBoard(state,index);round.querySelectorAll("button").forEach(node=>node.disabled=true);byId("board-response").textContent=state.history.at(-1).argument;renderMetricsOnly();byId("board-next").hidden=state.round>=rounds.length; if(state.round>=rounds.length){byId("board-conclusion").textContent=boardConclusion(state);byId("board-conclusion").hidden=false;byId("board-restart").hidden=false;}});round.append(button);});
    };
    const renderMetricsOnly=()=>{const metrics=byId("board-metrics");["cost","quality","trust","risk"].forEach((key,index)=>metrics.children[index].querySelector("strong").textContent=String(state.metrics[key]));};
    byId("board-next").addEventListener("click",renderBoard);
    byId("board-restart").addEventListener("click",()=>{state=initialBoard();renderBoard();});
    renderBoard();
    const AIDA_TEXT="[TEXT AIDA]",VIDEO_LINK="[VIDEO-LINK]";
    if(AIDA_TEXT!=="[TEXT AIDA]")byId("founder-text").textContent=AIDA_TEXT;
    if(VIDEO_LINK!=="[VIDEO-LINK]"&&/^https:\/\//.test(VIDEO_LINK)){
      const slot=byId("founder-video-slot");slot.replaceChildren();const link=element("a","founder-video-link","Persönliches Video ansehen ↗");link.href=VIDEO_LINK;link.target="_blank";link.rel="noopener noreferrer";slot.append(link);
    }
  }
  return{analyzeQuestion,calculateEuro,initialBoard,advanceBoard,boardConclusion,init};
});
