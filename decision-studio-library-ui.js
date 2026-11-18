(function(){
  const lib=window.DecisionStudioLibrary;
  if(!lib)return;
  const byId=id=>document.getElementById(id);
  const el=(tag,className,text)=>{
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(text!==undefined)node.textContent=text;
    return node;
  };
  const sourceLink=(key,text)=>{
    const source=lib.sources[key];
    const link=el("a","library-source",text||source.label+" ↗");
    link.href=source.url;
    link.target="_blank";
    link.rel="noopener noreferrer";
    return link;
  };
  const addLabel=(parent,label,value)=>{
    const wrap=el("div","library-pair");
    wrap.append(el("span","library-kicker",label),el("p","",value));
    parent.append(wrap);
  };
  async function copyText(value){
    try{
      if(navigator.clipboard&&navigator.clipboard.writeText){
        await navigator.clipboard.writeText(value);
        return true;
      }
    }catch(error){}
    const helper=el("textarea");
    helper.value=value;
    helper.style.position="fixed";
    helper.style.opacity="0";
    document.body.append(helper);
    helper.select();
    let copied=false;
    try{copied=document.execCommand("copy");}catch(error){}
    helper.remove();
    return copied;
  }

  const domains=byId("atlas-domains");
  const intro=byId("atlas-intro");
  const courseList=byId("atlas-courses");
  const courseNotes=new Map();
  let activeDomain=lib.domains[0].id;
  function renderCourses(){
    domains.replaceChildren();
    lib.domains.forEach(domain=>{
      const button=el("button","library-filter",domain.name);
      button.type="button";
      button.setAttribute("aria-pressed",String(activeDomain===domain.id));
      button.addEventListener("click",()=>{
        activeDomain=domain.id;
        renderCourses();
      });
      domains.append(button);
    });
    const domain=lib.domains.find(item=>item.id===activeDomain);
    intro.textContent=domain.line+" · 2 vertiefte 3C-Lektionen";
    courseList.replaceChildren();
    lib.courses.filter(course=>course.domain===activeDomain).forEach(course=>{
      const card=el("details","atlas-card");
      const summary=el("summary","");
      summary.append(el("span","atlas-number",String(course.number).padStart(2,"0")),el("strong","",course.title),el("span","atlas-open","Öffnen ↗"));
      const content=el("div","atlas-body");
      addLabel(content,"Die Lage",course.situation);
      const patternBlock=el("div","atlas-patterns");
      patternBlock.append(el("span","library-kicker","01 / COMPRESS · drei Kernmuster"));
      const list=el("ol","");
      course.patterns.forEach(pattern=>list.append(el("li","",pattern)));
      patternBlock.append(list);
      content.append(patternBlock);
      addLabel(content,"02 / COMPILE · deine Entscheidung",course.question);
      const thought=el("textarea","library-thought");
      thought.rows=3;
      thought.setAttribute("aria-label","Eigene Antwort zu "+course.title);
      thought.placeholder="Meine erste Antwort und ihre wichtigste Annahme …";
      thought.value=courseNotes.get(course.id)||"";
      thought.addEventListener("input",()=>courseNotes.set(course.id,thought.value));
      content.append(thought);
      addLabel(content,"03 / CONSOLIDATE · aktive Verarbeitung",course.challenge);
      addLabel(content,"Arbeitsprobe",course.transfer);
      content.append(sourceLink(course.source));
      card.append(summary,content);
      courseList.append(card);
    });
  }
  renderCourses();

  const caseList=byId("case-list");
  const caseFilters=byId("case-filters");
  const caseNotes=new Map();
  let activeCase="all";
  const caseChoices=[{id:"all",label:"Alle vier"},{id:"ai-approval",label:"KI-Einführung"},{id:"hidden-skill",label:"Skills statt Stellen"},{id:"remote-career",label:"Hybrid fair führen"},{id:"pay-gap",label:"New Pay"}];
  const euro=value=>new Intl.NumberFormat("de-AT",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(value);
  function renderCases(){
    caseFilters.replaceChildren();
    caseChoices.forEach(choice=>{
      const button=el("button","library-filter",choice.label);
      button.type="button";
      button.setAttribute("aria-pressed",String(choice.id===activeCase));
      button.addEventListener("click",()=>{activeCase=choice.id;renderCases();});
      caseFilters.append(button);
    });
    caseList.replaceChildren();
    lib.cases.filter(item=>activeCase==="all"||item.id===activeCase).forEach(item=>{
      const card=el("details","atlas-card case-card");
      const summary=el("summary","");
      summary.append(el("span","atlas-number",String(lib.cases.indexOf(item)+1).padStart(2,"0")),el("strong","",item.title),el("span","atlas-open","Fall öffnen ↗"));
      const body=el("div","atlas-body");
      body.append(el("p","case-demo-label","DEMO/FIKTIV · 90 TAGE · KEINE PROGNOSE"));
      addLabel(body,"Ausgangslage",item.situation);
      const options=el("div","case-option-grid");
      item.options.forEach(option=>{
        const box=el("button","case-option");
        box.type="button";
        box.setAttribute("aria-pressed","false");
        box.append(el("strong","",option.title),el("span","",option.effect),el("span","case-risk","Risiko: "+option.risk));
        box.addEventListener("click",()=>{
          options.querySelectorAll("button").forEach(button=>button.setAttribute("aria-pressed",String(button===box)));
          answer.value="Ich wähle "+option.title+". Begründung: "+option.effect+" Wichtigstes Risiko: "+option.risk;
          caseNotes.set(item.id,answer.value);
          answer.focus();
        });
        options.append(box);
      });
      body.append(el("h4","case-block-title","Zwei Optionen"),options);
      const register=el("div","case-register");
      item.assumptionRegister.forEach(row=>{
        const entry=el("div","case-register-row");
        entry.append(el("strong","",row.type),el("p","",row.text));
        register.append(entry);
      });
      body.append(el("h4","case-block-title","Annahmenregister · alle Angaben Demo/fiktiv"),register);
      const scenarios=el("div","case-scenarios");
      item.euro.scenarios.forEach(s=>{
        const net=s.units*s.unitValue-s.cost-s.riskCost;
        const row=el("div","case-scenario");
        row.append(el("span","",s.name),el("strong","",euro(net)),el("p","",`${s.units} ${item.euro.unitLabel} × ${euro(s.unitValue)} − ${euro(s.cost)} − ${euro(s.riskCost)} = ${euro(net)}`));
        scenarios.append(row);
      });
      body.append(el("h4","case-block-title","Euro-Szenarien · "+item.euro.period),el("p","library-small","Formel: "+item.euro.formula),scenarios,el("p","library-small",item.euro.limit));
      addLabel(body,"Stärkstes Gegenargument",item.counterargument);
      const groups=el("p","case-groups",item.groups.join(" · "));
      body.append(el("h4","case-block-title","Betroffene Gruppen"),groups);
      const gates=el("div","case-gates");
      [["Tag 30",item.gates.day30],["Tag 90",item.gates.day90]].forEach(([day,gate])=>{
        const row=el("div","case-gate");
        row.append(el("h5","",day),el("p","","GO: "+gate.go),el("p","","STOP: "+gate.stop));
        gates.append(row);
      });
      body.append(el("h4","case-block-title","Stop / Go"),gates);
      const label=el("label","library-kicker","Dein Beschluss vor der Gegenfrage");
      const answer=el("textarea","library-thought");
      answer.rows=3;
      answer.placeholder="Ich würde …; diese Annahme muss ich prüfen …";
      answer.value=caseNotes.get(item.id)||"";
      answer.addEventListener("input",()=>caseNotes.set(item.id,answer.value));
      label.append(answer);
      const mirror=el("details","case-mirror");
      mirror.append(el("summary","","Gegenperspektive aufdecken"));
      addLabel(mirror,"Decision Mirror",item.counterargument);
      const next=el("p","library-small","Revision: Welcher Befund würde deinen ersten Beschluss verändern? Ergänze ihn oben, bevor du den Fall abschließt.");
      body.append(label,mirror,next,sourceLink(item.source,"Fachlicher Prüfrahmen: "+lib.sources[item.source].label+" ↗"));
      card.append(summary,body);
      caseList.append(card);
    });
  }
  renderCases();

  const perspectiveList=byId("perspective-list");
  const perspectiveFilters=byId("perspective-filters");
  let activePerspectiveGroup="research";
  const perspectiveGroups=[
    {id:"research",name:"Forschung & Leitlinien"},
    {id:"practice",name:"Praxis & Methoden"}
  ];
  const perspectiveGroup=item=>{
    if(["Forschung","Forschungsprofil","Experiment","Leitlinie","Forschungsbericht","Amtliche Statistik","Arbeitgeberbefragung"].includes(lib.sources[item.source].kind))return "research";
    return "practice";
  };
  function renderPerspectives(){
    perspectiveFilters.replaceChildren();
    perspectiveGroups.forEach(group=>{
      const button=el("button","library-filter",group.name);
      button.type="button";
      button.setAttribute("aria-pressed",String(group.id===activePerspectiveGroup));
      button.addEventListener("click",()=>{activePerspectiveGroup=group.id;renderPerspectives();});
      perspectiveFilters.append(button);
    });
    perspectiveList.replaceChildren();
    lib.perspectives.filter(item=>perspectiveGroup(item)===activePerspectiveGroup).forEach(item=>{
      const card=el("article","perspective-card");
      card.append(el("span","library-kicker",item.field),el("h3","",item.title));
      addLabel(card,"Position aus Originalquelle",item.position);
      addLabel(card,"Frage an dich",item.question);
      addLabel(card,"Grenze",item.limit);
      card.append(sourceLink(item.source,"Originalquelle · "+lib.sources[item.source].kind+" ↗"));
      perspectiveList.append(card);
    });
  }
  renderPerspectives();

  const skillList=byId("skill-list");
  lib.skills.forEach((item,index)=>{
    const card=el("details","tool-card");
    const summary=el("summary","");
    summary.append(el("span","atlas-number",String(index+1).padStart(2,"0")),el("strong","",item.title),el("span","atlas-open","Skill öffnen ↗"));
    const body=el("div","tool-card-body");
    body.append(el("p","library-small","Für: "+item.audience));
    const pre=el("pre","skill-prompt",item.body);
    const button=el("button","button paper small","Prompt kopieren");
    button.type="button";
    const status=el("span","library-small","");
    status.setAttribute("role","status");
    button.addEventListener("click",async()=>{
      status.textContent=await copyText(item.body)?"Kopiert.":"Kopieren nicht verfügbar. Markiere den Text im Feld.";
    });
    body.append(pre,button,status,sourceLink(item.source,"Methodischer oder fachlicher Anker ↗"));
    card.append(summary,body);
    skillList.append(card);
  });

  const templateList=byId("template-list");
  const leadershipList=byId("leadership-list");
  lib.templates.forEach((item,index)=>{
    const card=el("details","tool-card");
    card.id="template-"+item.id;
    const summary=el("summary","");
    summary.append(el("span","atlas-number",String(index+1).padStart(2,"0")),el("strong","",item.title),el("span","atlas-open","Vorlage öffnen ↗"));
    const body=el("div","tool-card-body");
    body.append(el("p","library-small",item.body));
    const form=el("form","template-form");
    item.fields.forEach((field,fieldIndex)=>{
      const id="template-"+item.id+"-"+fieldIndex;
      const label=el("label","",field);
      label.htmlFor=id;
      const input=el("textarea","library-thought");
      input.id=id;
      input.rows=2;
      input.name=field;
      input.placeholder="Eigene Beobachtung, Annahme oder Quelle eintragen";
      form.append(label,input);
    });
    form.addEventListener("submit",event=>{
      event.preventDefault();
      const text=[
        "SKILL-BASED LAB · "+item.title,
        "Eigene Arbeitsunterlage · keine geprüfte Unternehmensentscheidung",
        "",
        ...Array.from(form.querySelectorAll("textarea")).flatMap(input=>[input.name.toUpperCase(),input.value.trim()||"[offen]",""]),
        "Fachlicher Anker: "+lib.sources[item.source].url,
        "Alle Unternehmensangaben und Annahmen vor Verwendung prüfen."
      ].join("\n");
      const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
      const link=el("a");
      link.href=url;
      link.download="Skill-Based-Lab_"+item.id+".txt";
      link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    const save=el("button","button ink small","Vorlage herunterladen");
    save.type="submit";
    form.append(save);
    body.append(form,sourceLink(item.source,"Fachlicher Anker ↗"));
    card.append(summary,body);
    (item.leadership?leadershipList:templateList).append(card);
  });

  const councilPicker=byId("council-picker");
  const councilStage=byId("council-stage");
  const councilNotes=new Map();
  let activeCouncil=lib.councils[0].id;
  function renderCouncil(){
    councilPicker.replaceChildren();
    lib.councils.forEach(item=>{
      const button=el("button","library-filter",item.title);
      button.type="button";
      button.setAttribute("aria-pressed",String(item.id===activeCouncil));
      button.addEventListener("click",()=>{activeCouncil=item.id;renderCouncil();});
      councilPicker.append(button);
    });
    const item=lib.councils.find(council=>council.id===activeCouncil);
    councilStage.replaceChildren();
    councilStage.append(el("span","library-kicker","Die strategische Frage"),el("h3","",item.question),el("p","council-tension",item.tension));
    const lenses=el("div","council-lenses");
    item.lenses.forEach(lens=>{
      const card=el("article","council-lens");
      card.append(el("span","library-kicker",lens.name),el("p","",lens.view),sourceLink(lens.source,"Originalquelle ↗"));
      lenses.append(card);
    });
    const challenge=el("div","council-challenge");
    challenge.append(el("span","library-kicker","Dein revidierbarer Beschluss"),el("p","",item.decision));
    const answer=el("textarea","library-thought");
    answer.rows=4;
    answer.setAttribute("aria-label","Eigener Beschluss zu "+item.title);
    answer.placeholder="Ich entscheide …; zuerst prüfe ich …; bei diesem Befund revidiere ich …";
    answer.value=councilNotes.get(item.id)||"";
    answer.addEventListener("input",()=>councilNotes.set(item.id,answer.value));
    const save=el("button","button ink small","Decision Note herunterladen");
    save.type="button";
    save.addEventListener("click",()=>{
      const note=["SKILL-BASED LAB · PERSPECTIVE COUNCIL",item.title,item.question,"",
        "SPANNUNG",item.tension,"","BLICKWINKEL",
        ...item.lenses.flatMap(lens=>[lens.name+": "+lens.view,lib.sources[lens.source].url,""]),
        "ENTSCHEIDUNGSFRAGE",item.decision,"","MEIN BESCHLUSS",answer.value.trim()||"[offen]",
        "Redaktionelle Gegenüberstellung; kein Gespräch der genannten Personen."
      ].join("\n");
      const url=URL.createObjectURL(new Blob([note],{type:"text/plain;charset=utf-8"}));
      const link=el("a");
      link.href=url;
      link.download="Skill-Based-Lab_"+item.id+".txt";
      link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    challenge.append(answer,save);
    councilStage.append(lenses,challenge);
  }
  renderCouncil();

  const sboList=byId("sbo-stages");
  lib.sboStages.forEach(stage=>{
    const card=el("details","atlas-card sbo-stage-card");
    card.id="sbo-stage-"+stage.id;
    const summary=el("summary","");
    summary.append(el("span","atlas-number",stage.title.slice(0,2)),el("strong","",stage.title.slice(5)),el("span","atlas-open","Schritt öffnen ↗"));
    const body=el("div","atlas-body");
    addLabel(body,"Die Leitfrage",stage.question);
    addLabel(body,"Was sich im Unternehmen ändert",stage.explanation);
    addLabel(body,"Executive-Entscheidung",stage.decision);
    const checks=el("div","atlas-patterns");
    checks.append(el("span","library-kicker","Drei Prüfungen"));
    const list=el("ol","");
    stage.checks.forEach(check=>list.append(el("li","",check)));
    checks.append(list);
    body.append(checks);
    addLabel(body,"Ergebnis für den Workshop",stage.deliverable);
    body.append(sourceLink(stage.source,"Fachlicher Anker: "+lib.sources[stage.source].label+" ↗"));
    const toolLink=el("a","sbo-tool-link","Passenden Skill im Werkzeugbereich öffnen ↗");
    toolLink.href="#tools";
    body.append(toolLink);
    card.append(summary,body);
    sboList.append(card);
  });
  document.querySelectorAll("[data-sbo-stage]").forEach(button=>{
    button.addEventListener("click",()=>{
      const card=byId("sbo-stage-"+button.dataset.sboStage);
      if(!card)return;
      card.open=true;
      card.scrollIntoView({block:"start",behavior:"instant"});
      card.querySelector("summary").focus({preventScroll:true});
    });
  });

  const diagnostic=byId("sbo-diagnostic-questions");
  const diagnosticResult=byId("sbo-diagnostic-result");
  lib.sboStages.forEach((stage,index)=>{
    const fieldset=el("fieldset","sbo-diagnostic-item");
    fieldset.append(el("legend","",stage.title+" · "+stage.question));
    [["0","Noch nicht"],["1","Im Pilot"],["2","Im Alltag geprüft"]].forEach(([value,labelText])=>{
      const label=el("label","sbo-option");
      const radio=el("input");
      radio.type="radio";
      radio.name="sbo-"+stage.id;
      radio.value=value;
      label.append(radio,el("span","",labelText));
      fieldset.append(label);
    });
    diagnostic.append(fieldset);
  });
  const evaluate=el("button","button ink","Nächste Schritte zeigen");
  evaluate.type="button";
  diagnostic.append(evaluate);
  function readSboAnswers(){
    return lib.sboStages.map(stage=>{
      const choice=diagnostic.querySelector('input[name="sbo-'+stage.id+'"]:checked');
      return choice?Number(choice.value):null;
    });
  }
  evaluate.addEventListener("click",()=>{
    const answers=readSboAnswers();
    diagnosticResult.replaceChildren();
    const missing=answers.filter(value=>value===null).length;
    if(missing){
      diagnosticResult.append(el("p","","Beantworte noch "+missing+" von sechs Fragen. Es wird kein Ergebnis aus fehlenden Angaben geschätzt."));
      return;
    }
    const priorities=lib.sboStages.map((stage,index)=>({stage,value:answers[index]}))
      .filter(item=>item.value<2)
      .sort((a,b)=>a.value-b.value)
      .slice(0,2);
    diagnosticResult.append(el("span","library-kicker","Dein nächster Organisationsschritt"));
    if(priorities.length===0){
      diagnosticResult.append(el("h3","","Alle sechs Bereiche als geprüft markiert."));
      diagnosticResult.append(el("p","","Prüfe, ob aktuelle Arbeitsproben, faire Zugänge und Wirkungsdaten diese Selbsteinschätzung tragen. Wähle anschließend einen neuen Geschäftsbereich für den nächsten Pilot."));
    }else{
      diagnosticResult.append(el("h3","","Diese Entscheidungen zuerst prüfen."));
      priorities.forEach(item=>{
        const block=el("div","sbo-priority");
        block.append(el("strong","",item.stage.title),el("p","",item.stage.decision),el("p","library-small","Arbeitsdokument: "+item.stage.deliverable),sourceLink(item.stage.source,"Originalquelle ↗"));
        diagnosticResult.append(block);
      });
    }
    const download=el("button","button paper small","Private Notiz herunterladen");
    download.type="button";
    download.addEventListener("click",()=>{
      const note=["SKILL-BASED LAB · ORGANIZATION READINESS","Selbsteinschätzung, kein Audit oder Reifegrad-Score","",
        ...lib.sboStages.flatMap((stage,index)=>[
          stage.title+": "+["Noch nicht","Im Pilot","Im Alltag geprüft"][answers[index]],
          "Nächste Entscheidungsfrage: "+stage.decision,
          "Quelle: "+lib.sources[stage.source].url,""
        ]),
        "Prioritäten im Workshop mit Arbeit, Menschen, Daten und Kosten prüfen."
      ].join("\n");
      const url=URL.createObjectURL(new Blob([note],{type:"text/plain;charset=utf-8"}));
      const link=el("a");
      link.href=url;
      link.download="Skill-Based-Lab_Organization-Readiness.txt";
      link.click();
      setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
    diagnosticResult.append(download);
  });
})();
