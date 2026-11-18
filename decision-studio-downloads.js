(function(){
  const lib=window.DecisionStudioLibrary;
  if(!lib)return;
  const byId=id=>document.getElementById(id);
  const el=(tag,className,value)=>{
    const node=document.createElement(tag);
    if(className)node.className=className;
    if(value!==undefined)node.textContent=value;
    return node;
  };
  const Speech=window.SpeechRecognition||window.webkitSpeechRecognition;
  byId("voice-support").textContent=Speech
    ?"Mikrofon möglich: Der Browser fragt beim ersten Diktat nach Erlaubnis."
    :"Dieser Browser bietet hier keine Spracheingabe. Du kannst tippen oder unter Windows im Textfeld Windows-Taste + H für Online-Diktat nutzen.";
  let recognition=null;
  let voiceConsent=false;
  function requestVoiceConsent(){
    if(voiceConsent)return Promise.resolve(true);
    const dialog=byId("voice-consent-dialog");
    if(typeof dialog.showModal!=="function")return Promise.resolve(false);
    return new Promise(resolve=>{
      const accept=byId("voice-consent-accept");
      const cancel=byId("voice-consent-cancel");
      const finish=allowed=>{
        accept.removeEventListener("click",onAccept);
        cancel.removeEventListener("click",onCancel);
        dialog.removeEventListener("cancel",onEscape);
        dialog.close();
        if(allowed)voiceConsent=true;
        resolve(allowed);
      };
      const onAccept=()=>finish(true);
      const onCancel=()=>finish(false);
      const onEscape=event=>{event.preventDefault();finish(false);};
      accept.addEventListener("click",onAccept);
      cancel.addEventListener("click",onCancel);
      dialog.addEventListener("cancel",onEscape);
      dialog.showModal();
    });
  }
  function addVoice(input,status){
    const button=el("button","voice-button",Speech?"🎙 Diktieren":"Mikrofon nicht verfügbar");
    button.type="button";
    button.disabled=!Speech;
    button.setAttribute("aria-label",input.name+" diktieren");
    button.addEventListener("click",async()=>{
      if(recognition){recognition.stop();return;}
      if(!await requestVoiceConsent()){status.textContent="Spracheingabe nicht gestartet. Du kannst das Feld tippen.";return;}
      recognition=new Speech();
      const current=recognition;
      recognition.lang="de-DE";
      recognition.continuous=false;
      recognition.interimResults=false;
      button.textContent="■ Aufnahme stoppen";
      status.textContent="Sprich jetzt. Der Browser verarbeitet das Diktat.";
      recognition.onresult=event=>{
        const words=Array.from(event.results).map(result=>result[0]?.transcript||"").join(" ").trim();
        if(words)input.value=[input.value.trim(),words].filter(Boolean).join(" ");
        status.textContent=words?"Text eingefügt. Bitte prüfen und korrigieren.":"Keine Wörter erkannt.";
      };
      recognition.onerror=event=>{
        status.textContent=event.error==="not-allowed"
          ?"Mikrofon nicht freigegeben. Du kannst das Feld tippen."
          :"Spracheingabe fehlgeschlagen ("+event.error+"). Du kannst das Feld tippen.";
      };
      recognition.onend=()=>{
        button.textContent="🎙 Diktieren";
        if(recognition===current)recognition=null;
      };
      try{recognition.start();}
      catch(error){button.textContent="🎙 Diktieren";recognition=null;status.textContent="Mikrofon konnte nicht starten. Prüfe die Browserberechtigung.";}
    });
    input.insertAdjacentElement("afterend",button);
  }
  function addChecklistVoice(checklist,checks,status){
    const button=el("button","voice-button",Speech?"🎙 Checkliste sprechen":"Mikrofon nicht verfügbar");
    button.type="button";button.disabled=!Speech;
    button.setAttribute("aria-label","Checkliste per Sprache abhaken; sprich Punkt eins, zwei oder drei");
    button.addEventListener("click",async()=>{
      if(recognition){recognition.stop();return;}
      if(!await requestVoiceConsent()){status.textContent="Spracheingabe nicht gestartet. Du kannst die Checkliste anklicken.";return;}
      recognition=new Speech();
      const current=recognition;
      recognition.lang="de-DE";
      recognition.continuous=false;
      recognition.interimResults=false;
      button.textContent="■ Aufnahme stoppen";
      status.textContent="Sprich zum Beispiel: Punkt eins und drei abhaken.";
      recognition.onresult=event=>{
        const words=Array.from(event.results).map(result=>result[0]?.transcript||"").join(" ").toLowerCase();
        const patterns=[/\b(eins|erste|ersten|1)\b/,/\b(zwei|zweite|zweiten|2)\b/,/\b(drei|dritte|dritten|3)\b/];
        let count=0;
        patterns.forEach((pattern,index)=>{if(pattern.test(words)){checks[index].checked=!/\b(streichen|zurück|entfernen)\b/.test(words);count++;}});
        status.textContent=count?count+" Prüfpunkte per Sprache geändert. Bitte den Stand prüfen.":"Keine Punktnummer erkannt. Sprich zum Beispiel: Punkt zwei abhaken.";
      };
      recognition.onerror=event=>{status.textContent=event.error==="not-allowed"?"Mikrofon nicht freigegeben.":"Spracheingabe fehlgeschlagen ("+event.error+").";};
      recognition.onend=()=>{button.textContent="🎙 Checkliste sprechen";if(recognition===current)recognition=null;};
      try{recognition.start();}catch(error){button.textContent="🎙 Checkliste sprechen";recognition=null;status.textContent="Mikrofon konnte nicht starten.";}
    });
    checklist.insertAdjacentElement("afterend",button);
  }
  function saveFile(name,value,type){
    const url=URL.createObjectURL(new Blob([value],{type}));
    const link=el("a");link.href=url;link.download=name;link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const printSheet=el("section","print-sheet");
  printSheet.id="download-print-sheet";
  printSheet.setAttribute("aria-hidden","true");
  document.body.append(printSheet);
  function printForm(item,fields,checks){
    printSheet.replaceChildren();
    printSheet.append(el("small","","SKILL-BASED LAB · ARBEITSBLATT"),el("h1","",item.title));
    fields.forEach(input=>{
      const row=el("section","print-field");
      row.append(el("h2","",input.name),el("p","",input.value.trim()||"________________________________________________________________"));
      printSheet.append(row);
    });
    const review=el("section","print-field");
    review.append(el("h2","","Qualitätscheck"));
    checks.forEach(input=>review.append(el("p","",(input.checked?"☑ ":"☐ ")+input.value)));
    printSheet.append(review,el("p","","Fachlicher Anker: "+lib.sources[item.source].url));
    document.body.classList.add("printing-download");
    window.addEventListener("afterprint",()=>{document.body.classList.remove("printing-download");printSheet.replaceChildren();},{once:true});
    window.print();
  }
  const picker=byId("download-topic-filter");
  let activeTopic="all";
  function applyTopic(){
    document.querySelectorAll(".download-card").forEach(card=>{card.hidden=activeTopic!=="all"&&card.dataset.topic!==activeTopic;});
    ["template-library","leadership-pack"].forEach(id=>{
      const section=byId(id);
      section.hidden=!Array.from(section.querySelectorAll(".download-card")).some(card=>!card.hidden);
    });
  }
  function showTopics(){
    picker.replaceChildren();
    [{id:"all",name:"Alle 20"},...lib.domains].forEach(topic=>{
      const button=el("button","library-filter",topic.name);
      button.type="button";
      button.setAttribute("aria-pressed",String(activeTopic===topic.id));
      button.addEventListener("click",()=>{
        activeTopic=topic.id;
        showTopics();
        applyTopic();
      });
      picker.append(button);
    });
  }
  showTopics();
  const privateNotes=new Map();
  function openTemplate(id){
    if(byId("view-downloads").hidden)document.querySelector('.icon-rail [data-view-target="downloads"]').click();
    activeTopic="all";showTopics();applyTopic();
    const card=byId("template-"+id);
    if(!card)return;
    card.open=true;
    card.scrollIntoView({block:"start",behavior:"instant"});
    card.querySelector("summary").focus({preventScroll:true});
  }
  function renderPrivateNotes(){
    const target=byId("profile-form-evidence");
    target.replaceChildren();
    if(privateNotes.size===0){
      const empty=el("div","profile-note-empty");
      empty.append(el("p","","Noch keine Arbeitsnotiz vorgemerkt. Beginne mit einer echten Frage im Decision Kit."));
      const open=el("button","button paper small","Formular wählen ↗");open.type="button";
      open.addEventListener("click",()=>document.querySelector('.icon-rail [data-view-target="downloads"]').click());
      empty.append(open);target.append(empty);return;
    }
    privateNotes.forEach(note=>{
      const card=el("article","profile-note");
      card.append(el("span","profile-note-state","ENTWURF · SELBSTANGABE"),el("h4","",note.title),el("p","","Bearbeitete Fragen: "+note.fields.join(" · ")),
        el("small","","Vorgemerkt am "+note.date+" · nur in diesem Browserfenster"));
      const actions=el("div","profile-note-actions");
      const continueButton=el("button","button paper small","Weiterbearbeiten ↗");continueButton.type="button";
      continueButton.addEventListener("click",()=>openTemplate(note.id));
      const remove=el("button","profile-note-remove","Notiz entfernen");remove.type="button";
      remove.addEventListener("click",()=>{privateNotes.delete(note.id);renderPrivateNotes();});
      actions.append(continueButton,remove);card.append(actions);target.append(card);
    });
  }
  renderPrivateNotes();
  lib.templates.forEach(item=>{
    const card=byId("template-"+item.id);
    if(!card)return;
    card.classList.add("download-card");
    card.dataset.topic=item.topic;
    const summary=card.querySelector("summary");
    summary.querySelector(".atlas-open").textContent="Ausfüllen ↗";
    const form=card.querySelector("form");
    form.insertAdjacentElement("beforebegin",el("p","download-source-note","Fachlicher Anker: "+lib.sources[item.source].label+" · "+lib.sources[item.source].kind+". Die Quelle belegt keine Wirkung oder Euro-Zahl für dein Unternehmen."));
    const loop=el("div","download-learning-loop");
    [
      ["01 / COMPRESS","Kläre zuerst: "+item.fields[0]+"."],
      ["02 / COMPILE","Bearbeite eine echte Arbeitsfrage und kennzeichne jede Annahme."],
      ["03 / CONSOLIDATE","Prüfe danach: "+item.checks[0]+". Benenne einen Gegenbefund."]
    ].forEach(([label,copy])=>{const step=el("div","");step.append(el("strong","",label),el("p","",copy));loop.append(step);});
    form.insertAdjacentElement("beforebegin",loop);
    const fields=Array.from(form.querySelectorAll("textarea"));
    const status=el("p","download-status","");status.setAttribute("role","status");
    fields.forEach(input=>addVoice(input,status));
    const checklist=el("fieldset","download-checklist");
    checklist.append(el("legend","","Qualitätscheck · vor der Entscheidung"));
    const checks=item.checks.map(labelText=>{
      const input=el("input");input.type="checkbox";input.value=labelText;
      const label=el("label","");label.append(input,el("span","",labelText));
      checklist.append(label);
      return input;
    });
    const counter=el("textarea","library-thought");
    counter.id="counter-"+item.id;
    counter.name="Welche Beobachtung würde den Plan ändern?";
    counter.rows=2;
    counter.placeholder="Der stärkste Gegenbefund oder ein klarer Stop-Auslöser …";
    const counterLabel=el("label","",counter.name);
    counterLabel.htmlFor=counter.id;
    form.insertBefore(checklist,form.lastElementChild);
    addChecklistVoice(checklist,checks,status);
    form.insertBefore(counterLabel,form.lastElementChild);
    form.insertBefore(counter,form.lastElementChild);
    addVoice(counter,status);
    const allFields=[...fields,counter];
    const data=()=>({version:1,templateId:item.id,title:item.title,fields:allFields.map(input=>({name:input.name,value:input.value})),checks:checks.map(input=>({label:input.value,checked:input.checked})),source:lib.sources[item.source].url});
    form.addEventListener("submit",event=>{
      event.preventDefault();event.stopImmediatePropagation();
      const lines=["SKILL-BASED LAB · "+item.title,"Eigene Arbeitsunterlage · keine geprüfte Unternehmensentscheidung","",
        ...allFields.flatMap(input=>[input.name.toUpperCase(),input.value.trim()||"[offen]",""]),
        "QUALITÄTSCHECK",...checks.map(input=>(input.checked?"[x] ":"[ ] ")+input.value),"",
        "Fachlicher Anker: "+lib.sources[item.source].url,"Alle Unternehmensangaben vor Verwendung prüfen."];
      saveFile("Skill-Based-Lab_"+item.id+".txt",lines.join("\n"),"text/plain;charset=utf-8");
    },true);
    const actions=el("div","download-actions");
    const save=form.lastElementChild;
    save.textContent="Text herunterladen";
    actions.append(save);
    const editable=el("button","button paper small","Bearbeitbar sichern");editable.type="button";
    editable.addEventListener("click",()=>saveFile("Skill-Based-Lab_"+item.id+".json",JSON.stringify(data(),null,2),"application/json;charset=utf-8"));
    const file=el("input");file.type="file";file.accept=".json,application/json";file.hidden=true;
    const open=el("button","button paper small","Datei öffnen");open.type="button";open.addEventListener("click",()=>file.click());
    file.addEventListener("change",async()=>{
      const selected=file.files?.[0];if(!selected)return;
      try{
        if(selected.size>1000000)throw new Error("Datei zu groß");
        const loaded=JSON.parse(await selected.text());
        if(loaded.version!==1||loaded.templateId!==item.id||!Array.isArray(loaded.fields)||!Array.isArray(loaded.checks)||loaded.fields.length!==allFields.length)throw new Error("Falsche Vorlage");
        allFields.forEach((input,index)=>{input.value=String(loaded.fields[index]?.value||"");});
        checks.forEach((input,index)=>{input.checked=Boolean(loaded.checks[index]?.checked);});
        status.textContent="Datei geladen. Bitte Angaben und Quellen prüfen.";
      }catch(error){status.textContent="Diese Datei passt nicht zur Vorlage oder ist beschädigt.";}
      file.value="";
    });
    const print=el("button","button paper small","Drucken / PDF");print.type="button";
    print.addEventListener("click",()=>printForm(item,allFields,checks));
    const remember=el("button","button paper small","Als private Arbeitsnotiz vormerken");remember.type="button";
    remember.addEventListener("click",()=>{
      const filled=allFields.filter(input=>input.value.trim());
      if(filled.length===0){status.textContent="Trage zuerst mindestens eine eigene Antwort ein.";return;}
      privateNotes.set(item.id,{id:item.id,title:item.title,fields:filled.map(input=>input.name),date:new Date().toLocaleDateString("de-AT")});
      renderPrivateNotes();
      status.textContent="Als Entwurf im privaten Demo-Profil vorgemerkt. Dies ist kein geprüfter Skill-Nachweis.";
    });
    actions.append(editable,open,print,remember,file);
    form.append(actions,status);
  });
  applyTopic();
  document.querySelectorAll("[data-open-template]").forEach(button=>{
    button.addEventListener("click",()=>openTemplate(button.dataset.openTemplate));
  });
})();
