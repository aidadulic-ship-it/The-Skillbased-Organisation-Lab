(function(root,factory){
  const api=factory(root);
  if(typeof module==='object'&&module.exports)module.exports=api;
  root.DecisionStudioQuestionnaire=api;
  if(root.document)api.init();
})(typeof globalThis!=='undefined'?globalThis:this,function(root){
  'use strict';
  const filled=value=>typeof value==='string'&&value.trim().length>0;
  function validate(data){
    const errors=[];
    if(!filled(data?.case))errors.push('Fall');
    if(!filled(data?.goal))errors.push('Ziel');
    if(!Array.isArray(data?.metrics)||data.metrics.length<2||data.metrics.length>3){
      errors.push('Zwei bis drei Messgrößen');
    }else{
      if(!filled(data.metrics[0]?.name))errors.push('Erste Messgröße');
      if(!filled(data.metrics[1]?.name))errors.push('Zweite Messgröße');
      const third=data.metrics[2];
      if(data.metrics.length===3&&(!third||typeof third!=='object'||Array.isArray(third)))errors.push('Dritte Messgröße');
      else if(third&&!filled(third.name)&&(filled(third.baseline)||filled(third.threshold)))errors.push('Name der dritten Messgröße');
    }
    if(!filled(data?.responsible?.name))errors.push('Name der verantwortlichen Person');
    if(!filled(data?.responsible?.role))errors.push('Funktion der verantwortlichen Person');
    if(!filled(data?.pilotArea))errors.push('Pilotbereich');
    return{ok:errors.length===0,errors};
  }
  const clean=value=>typeof value==='string'?value.trim():'';
  function checked(data){
    const result=validate(data);
    if(!result.ok)throw new Error('Bitte ergänzen: '+result.errors.join(', '));
    return{
      kind:'skill-based-lab/vorab-fragebogen',version:1,
      case:clean(data.case),goal:clean(data.goal),
      metrics:data.metrics.map(metric=>({name:clean(metric.name),baseline:clean(metric.baseline),threshold:clean(metric.threshold)})),
      responsible:{name:clean(data.responsible.name),role:clean(data.responsible.role)},
      pilotArea:clean(data.pilotArea)
    };
  }
  function toJson(data){
    const json=JSON.stringify(checked(data),null,2);
    if(new TextEncoder().encode(json).byteLength>1000000)throw new Error('Datei ist zu groß.');
    return json;
  }
  function toText(data){
    const value=checked(data);
    const open=text=>text||'[offen]';
    const lines=['SKILL-BASED LAB · VORAB-FRAGEBOGEN','Eigener Firmenfall · Angaben vor dem Workshop prüfen','',
      'FALL',value.case,'','ZIEL',value.goal,'','MESSGRÖSSEN'];
    value.metrics.forEach((metric,index)=>{
      if(index===2&&!metric.name)return;
      lines.push((index+1)+'. '+metric.name,'Ausgangswert: '+open(metric.baseline),'Prüfschwelle: '+open(metric.threshold));
    });
    lines.push('','VERANTWORTLICHE PERSON',value.responsible.name+' · '+value.responsible.role,'','PILOTBEREICH',value.pilotArea,
      '','Nur lokal im Browser bearbeitet. Diese Datei selbst wird von der Seite nicht versendet.');
    return lines.join('\n');
  }
  function fromJson(text){
    if(typeof text!=='string'||new TextEncoder().encode(text).byteLength>1000000)throw new Error('Datei ist zu groß oder ungültig.');
    let data;
    try{data=JSON.parse(text);}catch{throw new Error('Ungültiges JSON.');}
    if(data?.kind!=='skill-based-lab/vorab-fragebogen')throw new Error('Kein Skill-Based Lab Vorab-Fragebogen.');
    if(data.version!==1)throw new Error('Unbekannte Version.');
    if(!Array.isArray(data.metrics)||data.metrics.length<2||data.metrics.length>3)throw new Error('Zwei bis drei Messgrößen erforderlich.');
    const strings=[data.case,data.goal,data.pilotArea,data.responsible?.name,data.responsible?.role,
      ...data.metrics.flatMap(metric=>[metric?.name,metric?.baseline,metric?.threshold])];
    if(strings.some(value=>typeof value!=='string'))throw new Error('Datei enthält ungültige Feldwerte.');
    return checked(data);
  }
  function init(){
    const form=root.document.getElementById('prework-form');
    if(!form)return;
    const byId=id=>root.document.getElementById(id);
    const status=byId('prework-status');
    const confirm=byId('prework-confirm');
    const file=byId('prework-import-file');
    const fieldIds=['case','goal','responsible-name','responsible-role','pilot-area'];
    const metricIds=index=>['name','baseline','threshold'].map(key=>'prework-metric-'+index+'-'+key);
    const input=id=>byId('prework-'+id);
    const readForm=()=>({
      case:input('case').value,goal:input('goal').value,
      metrics:[1,2,3].map(index=>{
        const [name,baseline,threshold]=metricIds(index).map(byId);
        return{name:name.value,baseline:baseline.value,threshold:threshold.value};
      }),
      responsible:{name:input('responsible-name').value,role:input('responsible-role').value},
      pilotArea:input('pilot-area').value
    });
    const writeForm=data=>{
      const entries={'case':data.case,'goal':data.goal,'responsible-name':data.responsible.name,
        'responsible-role':data.responsible.role,'pilot-area':data.pilotArea};
      for(const [id,value] of Object.entries(entries))input(id).value=value;
      [1,2,3].forEach(index=>{
        const metric=data.metrics[index-1]||{name:'',baseline:'',threshold:''};
        ['name','baseline','threshold'].forEach(key=>byId('prework-metric-'+index+'-'+key).value=metric[key]||'');
      });
      form.querySelectorAll('[aria-invalid]').forEach(field=>field.removeAttribute('aria-invalid'));
    };
    const errorField={
      'Fall':'prework-case','Ziel':'prework-goal',
      'Erste Messgröße':'prework-metric-1-name','Zweite Messgröße':'prework-metric-2-name',
      'Name der dritten Messgröße':'prework-metric-3-name',
      'Name der verantwortlichen Person':'prework-responsible-name',
      'Funktion der verantwortlichen Person':'prework-responsible-role',
      'Pilotbereich':'prework-pilot-area'
    };
    const showError=error=>{
      status.textContent=error.message;
      if(!error.message.startsWith('Bitte ergänzen:'))return;
      const missing=validate(readForm()).errors.map(label=>byId(errorField[label])).filter(Boolean);
      missing.forEach(field=>field.setAttribute('aria-invalid','true'));
      missing[0]?.focus();
    };
    form.addEventListener('input',event=>event.target.removeAttribute('aria-invalid'));
    const save=(type)=>{
      try{
        const data=readForm();
        const content=type==='json'?toJson(data):toText(data);
        const filename='Skill-Based-Lab_Vorab-Fragebogen.'+(type==='json'?'json':'txt');
        const mime=type==='json'?'application/json;charset=utf-8':'text/plain;charset=utf-8';
        root.DecisionStudioDownloads.saveFile(filename,content,mime);
        status.textContent=type==='json'?'JSON-Datei heruntergeladen. Bitte vor dem Versenden prüfen.':'Textfassung heruntergeladen. Bitte vor dem Versenden prüfen.';
      }catch(error){showError(error);}
    };
    byId('prework-json').addEventListener('click',()=>save('json'));
    byId('prework-text').addEventListener('click',()=>save('text'));
    byId('prework-import-button').addEventListener('click',()=>file.click());
    form.addEventListener('submit',event=>event.preventDefault());
    const hasInput=()=>[...fieldIds.map(id=>input(id).value),...[1,2,3].flatMap(index=>metricIds(index).map(id=>byId(id).value))].some(filled);
    let pending=null;
    const closeConfirm=()=>{pending=null;confirm.hidden=true;};
    file.addEventListener('change',async()=>{
      const selected=file.files?.[0];
      if(!selected)return;
      try{
        if(selected.size>1000000)throw new Error('Datei ist zu groß.');
        const loaded=fromJson(await selected.text());
        if(hasInput()){
          pending=loaded;confirm.hidden=false;status.textContent='Datei geprüft. Vorhandene Angaben bleiben bis zur Bestätigung erhalten.';
          byId('prework-replace').focus();
        }else{
          writeForm(loaded);status.textContent='Datei geladen. Bitte Angaben vor dem Workshop prüfen.';
        }
      }catch(error){closeConfirm();showError(error);}
      file.value='';
    });
    byId('prework-replace').addEventListener('click',()=>{
      if(!pending)return;
      writeForm(pending);closeConfirm();status.textContent='Vorhandene Angaben ersetzt. Bitte den importierten Fall prüfen.';
      input('case').focus();
    });
    byId('prework-cancel').addEventListener('click',()=>{
      closeConfirm();status.textContent='Import abgebrochen. Deine Angaben sind erhalten.';
      byId('prework-import-button').focus();
    });
  }
  return{validate,toJson,toText,fromJson,init};
});
