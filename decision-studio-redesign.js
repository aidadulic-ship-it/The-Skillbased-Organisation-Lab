(function(){
  const lib=window.DecisionStudioLibrary;
  const model=window.DecisionStudioModel;
  if(!lib||!model)return;
  const byId=id=>document.getElementById(id);
  const create=(tag,className,value)=>{
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(value!==undefined)node.textContent=value;
    return node;
  };
  const source=(key,label)=>{
    const link=create("a","",label||lib.sources[key].label+" ↗");
    link.href=lib.sources[key].url;
    link.target="_blank";
    link.rel="noopener noreferrer";
    return link;
  };
  const downloadText=(filename,value)=>{
    const url=URL.createObjectURL(new Blob([value],{type:"text/plain;charset=utf-8"}));
    const link=create("a");
    link.href=url;
    link.download=filename;
    link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  };

  const picker=byId("route-picker");
  const stage=byId("route-stage");
  let active=lib.journeys[0].id;
  function renderRoute(){
    picker.replaceChildren();
    lib.journeys.forEach(journey=>{
      const button=create("button","",journey.label);
      button.type="button";
      button.setAttribute("aria-pressed",String(active===journey.id));
      button.addEventListener("click",()=>{active=journey.id;renderRoute();});
      picker.append(button);
    });
    const journey=lib.journeys.find(item=>item.id===active);
    const course=lib.courses.find(item=>item.id===journey.course);
    const caseItem=lib.cases.find(item=>item.id===journey.case);
    const template=lib.templates.find(item=>item.id===journey.template);
    stage.replaceChildren();
    stage.append(create("h2","",journey.question));
    const steps=create("div","route-steps");
    const lesson=create("article","route-step");
    lesson.append(create("small","","01 / Verstehen"),create("strong","",course.title),create("p","",course.patterns[0]),source(course.source,"Originalquelle ↗"));
    const challenge=create("article","route-step");
    challenge.append(create("small","","02 / Entscheiden"),create("strong","",caseItem.title),create("p","",caseItem.situation),source(caseItem.source,"Prüfrahmen ↗"));
    const lenses=create("article","route-step");
    lenses.append(create("small","","03 / Hinterfragen"),create("strong","","Drei Perspektiven"));
    journey.perspectives.forEach(id=>{
      const expert=lib.perspectives.find(item=>item.id===id);
      const row=create("p","",expert.title+" · "+expert.question);
      lenses.append(row,source(expert.source,"Quelle ↗"));
    });
    const output=create("article","route-step");
    output.append(create("small","","04 / Anwenden"),create("strong","",template.title),create("p","",journey.output),source(template.source,"Fachlicher Anker ↗"));
    steps.append(lesson,challenge,lenses,output);
    const actions=create("div","route-actions");
    const start=create("button","button ink","Diesen Fall im Decision Mirror testen ↗");
    start.type="button";
    start.addEventListener("click",()=>{
      document.querySelector('[data-case="'+journey.mirrorCase+'"]').click();
      document.querySelector('.icon-rail [data-view-target="grill"]').click();
    });
    const tool=create("button","button paper","Passende Vorlage öffnen ↗");
    tool.type="button";
    tool.addEventListener("click",()=>{
      document.querySelector('.icon-rail [data-view-target="downloads"]').click();
      const card=byId("template-"+template.id);
      if(card){card.open=true;card.scrollIntoView({block:"start",behavior:"instant"});}
    });
    actions.append(start,tool,create("p","","Die vollständige Bibliothek bleibt darunter frei zugänglich."));
    stage.append(steps,actions);
  }
  renderRoute();

  byId("download-sample-pack").addEventListener("click",()=>{
    downloadText("Skill-Based-Lab_Muster-Decision-Pack.txt",[
      "SKILL-BASED LAB · MUSTER DECISION PACK",
      "Fiktiver Fall Auronix Components · alle Euro-Werte sind Spielannahmen",
      "",
      "GESCHÄFTSFRAGE",
      "Wie sichern wir kritische Fehlerdiagnosen vor dem Verlust von Erfahrungswissen?",
      "",
      "OPTION A · INTERNE QUALIFIZIERUNG",
      "Fiktive Investitionsannahme: 40.000 €.",
      "Voraussetzung: Fachkräfte erhalten Zeit für Anleitung und Arbeitsproben.",
      "",
      "OPTION B · EXTERNE BESETZUNG",
      "Fiktive Investitionsannahme: 65.000 €.",
      "Offen: Suchdauer, Verfügbarkeit und Einarbeitung.",
      "",
      "EURO-CHECK",
      "25.000 € Unterschied in den angenommenen Investitionskosten. Das ist kein ROI.",
      "Qualität, Ausfallkosten, Lernzeit und tatsächlich nutzbare Kapazität fehlen in dieser Musterrechnung.",
      "",
      "VORLÄUFIGER BESCHLUSS",
      "Begrenzten Pilot der internen Qualifizierung starten. Externe Suche als Alternative offen halten.",
      "Tag 30: Arbeitsbelastung und erste überwachte Diagnose prüfen.",
      "Tag 90: zwei datierte Arbeitsproben, Diagnosequalität und reale Gesamtkosten vergleichen.",
      "Stop: Qualitätsgrenze wird verletzt oder Lernzeit ist nicht verfügbar.",
      "",
      "FACHLICHER ANKER",
      lib.sources.oecdSkills.url,
      "Die Quelle stützt die Skills-first-Perspektive, nicht die fiktiven Fallwerte."
    ].join("\n"));
  });

  const inquiry=byId("pilot-inquiry-form");
  const inquiryStatus=byId("inquiry-status");
  inquiry.addEventListener("submit",event=>{
    event.preventDefault();
    if(!inquiry.reportValidity())return;
    const name=byId("inquiry-name").value.trim();
    const company=byId("inquiry-company").value.trim();
    const email=byId("inquiry-email").value.trim();
    const question=byId("inquiry-question").value.trim();
    const subject="Anfrage Skill-Based Lab Pilot-Workshop · "+company;
    const body=[
      "Hallo Aida,","",
      "ich möchte einen Pilot-Workshop für unser Unternehmen anfragen.",
      "Name: "+name,
      "Unternehmen: "+company,
      "Antwortadresse: "+email,"",
      "Unsere Arbeitsentscheidung:",
      question,"",
      "Bitte melde dich für ein Vorgespräch.",
      "Viele Grüße",
      name
    ].join("\n");
    const url="mailto:aida.dulic@hotmail.com?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);
    inquiryStatus.textContent="Der E-Mail-Entwurf wird geöffnet. Falls kein E-Mail-Programm startet, nutze den direkten Link links und kopiere deine Angaben aus dem Formular.";
    window.location.href=url;
  });
})();
