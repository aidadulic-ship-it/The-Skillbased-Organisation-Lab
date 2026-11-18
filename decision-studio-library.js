(function(root,factory){
  const library=factory();
  if(typeof module==="object"&&module.exports)module.exports=library;
  root.DecisionStudioLibrary=library;
})(typeof globalThis!=="undefined"?globalThis:this,function(){
  const sources={
    oecdSkills:{label:"OECD · A Skills-First Labour Market (2026)",url:"https://www.oecd.org/en/publications/a-skills-first-labour-market_2e1b85f0-en.html",kind:"Forschung"},
    oecdLearning:{label:"OECD · Putting Skills at the Centre of Learning (2026)",url:"https://www.oecd.org/en/publications/a-skills-first-labour-market_2e1b85f0-en/full-report/putting-skills-at-the-centre-of-learning_3bcd5bf2.html",kind:"Forschung"},
    oecdForesight:{label:"OECD · Foresight Toolkit for Resilient Public Policy",url:"https://www.oecd.org/en/publications/foresight-toolkit-for-resilient-public-policy_bcdd9304-en.html",kind:"Methode"},
    oecdAI:{label:"OECD · What should students learn in a future of powerful AI? (2025)",url:"https://www.oecd.org/en/publications/what-should-teachers-teach-and-students-learn-in-a-future-of-powerful-ai_ca56c7d6-en.html",kind:"Forschung"},
    wef:{label:"WEF · Future of Jobs 2025, Skills Outlook",url:"https://www.weforum.org/publications/the-future-of-jobs-report-2025/3-skills-outlook",kind:"Arbeitgeberbefragung"},
    who:{label:"WHO · Guidelines on Mental Health at Work (2022)",url:"https://www.who.int/publications/i/item/9789240053052",kind:"Leitlinie"},
    edmondson:{label:"Amy Edmondson · Managing the Risk of Learning in Work Teams",url:"https://www.hbs.edu/ris/Publication%20Files/02-062_0b5726a8-443d-4629-9e75-736679b870fc.pdf",kind:"Forschung"},
    seligman:{label:"Martin Seligman · PERMA and the Building Blocks of Well-Being",url:"https://ppc.sas.upenn.edu/sites/default/files/permawellbeing.pdf",kind:"Forschung"},
    maslach:{label:"Christina Maslach · Berkeley Faculty Profile and Research",url:"https://psychology.berkeley.edu/node/247",kind:"Forschungsprofil"},
    bloom:{label:"Bloom, Han & Liang · Hybrid Working Randomized Trial (Nature, 2024)",url:"https://www.nature.com/articles/s41586-024-07500-2",kind:"Experiment"},
    iloTime:{label:"ILO · Working Time and Work-Life Balance (2023)",url:"https://www.ilo.org/publications/working-time-and-work-life-balance-around-world",kind:"Forschungsbericht"},
    iloAI:{label:"ILO · Generative AI and Jobs, 2025 Update",url:"https://www.ilo.org/publications/generative-ai-and-jobs-2025-update",kind:"Forschung"},
    iea:{label:"IEA · Global Critical Minerals Outlook 2026",url:"https://www.iea.org/reports/global-critical-minerals-outlook-2026/executive-summary",kind:"Analyse"},
    chips:{label:"Europäische Kommission · European Chips Act",url:"https://digital-strategy.ec.europa.eu/en/policies/european-chips-act",kind:"Primärquelle"},
    aiAct:{label:"EU AI Act · Artikel 4 KI-Kompetenz",url:"https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-4",kind:"Primärquelle"},
    payDirective:{label:"EUR-Lex · Richtlinie (EU) 2023/970",url:"https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023L0970",kind:"Primärquelle"},
    statAT:{label:"Statistik Austria · Bevölkerungsprognose 2025",url:"https://www.statistik.at/statistiken/bevoelkerung-und-soziales/bevoelkerung/demographische-prognosen/bevoelkerungsprognosen-fuer-oesterreich-und-die-bundeslaender",kind:"Amtliche Statistik"},
    mercer:{label:"Ravin Jesuthasan & John Boudreau · Work Without Jobs (Mercer)",url:"https://www.mercer.com/en-us/insights/people-strategy/future-of-work/work-without-jobs/",kind:"Expertenposition"},
    esco:{label:"Europäische Kommission · ESCO Skills Classification",url:"https://esco.ec.europa.eu/en/about-esco/what-esco",kind:"Primärquelle"},
    wefTaxonomy:{label:"WEF · Global Skills Taxonomy Adoption Toolkit (2025)",url:"https://www.weforum.org/publications/global-skills-taxonomy-adoption-toolkit-defining-a-common-skills-language-for-a-future-ready-workforce",kind:"Methodenbericht"},
    cathy:{label:"Cathy Moore · Action Mapping FAQ",url:"https://blog.cathy-moore.com/action-mapping/action-mapping-faqs/",kind:"Expertenmethode"},
    mayer:{label:"Richard Mayer · Mayer Lab, UC Santa Barbara",url:"https://mayerlab.psych.ucsb.edu/people/richard-mayer",kind:"Forschungsprofil"},
    newPay:{label:"New Pay Collective · Was ist New Pay?",url:"https://www.new-pay.org/was-ist-new-pay",kind:"Expertenposition"},
    webb:{label:"Future Today Strategy Group · Convergence / Amy Webb",url:"https://ftsg.com/convergence/",kind:"Expertenmethode"},
    matt:{label:"Matt Pocock · teach Skill: Quellen vor Lektionen",url:"https://github.com/mattpocock/skills/blob/main/docs/productivity/teach.md",kind:"Methodenreferenz"},
    stanfordAI:{label:"Stanford HAI · AI Index Report 2025",url:"https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf",kind:"Forschungsbericht"}
  };
  const domains=[
    {id:"judgement",name:"Urteilskraft & Selbst",line:"Erkennen, was wir wissen, glauben und übersehen."},
    {id:"health",name:"Gesunde Arbeit",line:"Belastung, psychologische Sicherheit und positive Ressourcen."},
    {id:"leadership",name:"Führung & Teams",line:"Entscheidungsrechte, Lernen, hybride Zusammenarbeit."},
    {id:"learning",name:"Lernen & Transfer",line:"Wie Menschen Fähigkeiten üben, anwenden und belegen."},
    {id:"systems",name:"Arbeitssysteme & New Pay",line:"Zeit, Ort, Rolle, Leistung und Vergütung neu gestalten."},
    {id:"futures",name:"Zukunft & Resilienz",line:"KI, Demografie, Chips, Energie, Europa und Österreich."}
  ];
  // Jede Zeile: ID, Titel, Lage, drei Kernmuster, aktive Gegenfrage, Arbeitsprobe, Quelle.
  const rows={
    judgement:[
      ["assumptions","Annahmen sichtbar machen","Ein Business Case wirkt präzise, obwohl Eingaben geschätzt sind.","Beobachtung markieren","Annahmen getrennt ausweisen","Werte und Interessen offenlegen","Welche Zahl beruht nur auf Wunschdenken?","Ein Annahmenregister mit Evidenzgrad und Prüfdatum","oecdForesight"],
      ["critical-ai","KI-Ergebnisse kritisch prüfen","Ein KI-Text klingt sicher, enthält aber ungeprüfte Tatsachen.","Behauptungen rückverfolgen","Quellen unabhängig öffnen","Unsicherheit sichtbar lassen","Welche drei Aussagen brauchen Primärbelege?","Ein Quellenprotokoll mit Befund und offener Frage","stanfordAI"]
    ],
    health:[
      ["workload","Arbeitslast gestalten","Ein Team meldet Erschöpfung trotz Wellness-Angebot.","Arbeitsmenge messen","Prioritäten reduzieren","Veränderung mit Beschäftigten prüfen","Was im System erzeugt den Druck?","Ein Belastungs-Aktionsblatt mit 30-Tage-Messpunkt","who"],
      ["safety","Psychologische Sicherheit","Fehler werden erst gemeldet, wenn Kunden betroffen sind.","Sprechen ohne Bestrafung ermöglichen","Fehler sachlich prüfen","Rückmeldung verpflichtend machen","Wann war Widerspruch zuletzt folgenlos möglich?","Ein Teamritual für Einwand, Prüfung und Rückmeldung","edmondson"],
    ],
    leadership:[
      ["decision-rights","Entscheidungsrechte klären","Ein hybrides Team wartet auf Freigaben für Routinefälle.","Aufgabe und Risiko unterscheiden","Mandate explizit machen","Eskalation zeitlich festlegen","Welche Entscheidung blockiert nur wegen unklarer Zuständigkeit?","Eine Entscheidungslandkarte für ein Team","edmondson"],
      ["hybrid","Hybrid fair führen","Informelle Bürogespräche bestimmen Karrieren.","Entscheidungen schriftlich zugänglich machen","Entwicklungschancen prüfen","Leistung an Ergebnissen messen","Wer bekommt Informationen später als andere?","Ein Team Agreement mit Fairnessprüfung","bloom"],
    ],
    learning:[
      ["action-map","Vom Geschäftsziel zur Übung","Ein neuer Kurs soll ein Qualitätsproblem lösen.","Zielverhalten zuerst definieren","Hindernisse im Arbeitsfluss prüfen","Nur notwendiges Wissen lehren","Welche Handlung muss morgen anders aussehen?","Eine Action Map mit Ziel, Handlung und Übung","cathy"],
      ["evidence","Skills belegen","Ein Zertifikat sagt wenig über Anwendung aus.","Skill als Handlung beschreiben","Kontext und Qualitätsmaß nennen","Datierte Arbeitsprobe sammeln","Welcher Beleg zeigt Können besser als Teilnahme?","Eine Skill-Karte mit prüfbarer Arbeitsprobe","oecdSkills"],
    ],
    systems:[
      ["tasks","Jobs in Aufgaben zerlegen","Ein Stellenprofil beschreibt Titel statt Wertschöpfung.","Arbeit in Aufgaben zerlegen","Skill und Nachweis zuordnen","Automatisierung je Aufgabe prüfen","Welche Aufgabe bleibt wichtig, wenn der Titel verschwindet?","Eine Task- und Skill-Map mit Qualitätsmaß","mercer"],
      ["pay","New Pay und Fairness","Neue Skills werden bezahlt, bestehende Beiträge übersehen.","Kriterien nachvollziehbar machen","Betroffene beteiligen","Wirkung und Fairness prüfen","Welche Arbeit wird unsichtbar vergütet?","Eine Vergütungs-Kriterienkarte mit Fairnessprüfung","newPay"],
    ],
    futures:[
      ["chips","Chips und Abhängigkeiten","Ein kritisches Bauteil verzögert sich.","Lieferkette bis zu Engpässen verfolgen","Alternative Spezifikationen prüfen","Skillbedarf für Umstellung planen","Welche Fähigkeit macht uns bei Lieferausfall handlungsfähig?","Ein Lieferketten-Szenario mit zwei Alternativen","iea"],
      ["foresight","Robuste Strategie statt Zukunftswette","Geopolitik und Nachfrage können gegensätzlich wirken.","Mindestens zwei Zukünfte testen","Frühe Signale beobachten","Reversible Schritte bevorzugen","Was tun wir, wenn unsere Lieblingsprognose falsch ist?","Eine Szenarioentscheidung mit Stop-/Go-Punkt","oecdForesight"]
    ]
  };
  const selectedCourseIds=new Set(["assumptions","critical-ai","workload","safety","decision-rights","hybrid","action-map","evidence","tasks","pay","chips","foresight"]);
  const courseChallenges={
    assumptions:"Nimm eine Zahl aus einem eigenen Business Case. Markiere ihre Herkunft, eine offene Annahme und den Befund, der die Zahl widerlegen würde.",
    "critical-ai":"Wähle drei prüfbare Aussagen aus einer KI-Antwort. Öffne je eine Originalquelle und notiere, was ungeklärt bleibt.",
    workload:"Zeichne eine überlastete Arbeitswoche nach. Streiche oder verschiebe eine Aufgabe und lege ein Belastungs- und Qualitätsmaß für Tag 30 fest.",
    safety:"Schreibe die ersten drei Sätze einer Führungskraft nach einer Fehlermeldung. Benenne die Prüfung und den Zeitpunkt der Rückmeldung.",
    "decision-rights":"Ordne fünf wiederkehrende Teamentscheidungen einer verantwortlichen Rolle zu. Definiere für einen Grenzfall einen Eskalationsweg.",
    hybrid:"Vergleiche zwei Aufgaben mit unterschiedlicher Ortsbindung. Formuliere eine faire Regel für Information, Feedback und Entwicklungschancen.",
    "action-map":"Starte mit einem Qualitätsproblem. Beschreibe die beobachtbare Handlung und prüfe, ob Training oder eine Prozessänderung nötig ist.",
    evidence:"Beschreibe einen Skill als Handlung im Kontext. Entwirf eine datierte Arbeitsprobe mit zwei klaren Qualitätskriterien.",
    tasks:"Zerlege eine reale Stelle in fünf Aufgaben. Markiere bei jeder Aufgabe Skill, Ergebnis, Verantwortliche und möglichen KI-Beitrag.",
    pay:"Lege drei Vergütungskriterien offen. Prüfe, welche notwendige Arbeit dadurch unsichtbar bliebe und wer an der Revision beteiligt sein muss.",
    chips:"Simuliere einen 90-Tage-Lieferstopp für ein kritisches Bauteil. Notiere zwei Ersatzwege und die Skills, die jeder Weg benötigt.",
    foresight:"Schreibe zwei gegensätzliche Zukunftslagen für dieselbe Investition. Bestimme einen Frühindikator und eine in beiden Lagen sinnvolle Maßnahme."
  };
  const courses=Object.entries(rows).flatMap(([domain,items])=>items.filter(r=>selectedCourseIds.has(r[0])).map((r,index)=>({
    id:r[0],domain,number:index+1,title:r[1],situation:r[2],patterns:r.slice(3,6),
    question:r[6],challenge:courseChallenges[r[0]],
    transfer:r[7],source:r[8]
  })));
  // Perspektiven paraphrasieren die verlinkte Originalquelle. Folgerungen sind Lab-Fragen, keine Zitate.
  const perspectiveRows=[
    ["Amy Webb","Zukunftsforschung","Einzelne Trends sind erst zusammen mit Szenarien für Entscheidungen brauchbar.","Welche Kombination aus KI, Demografie und Energie würde unsere Strategie kippen?","Eine plausible Zukunft ist noch keine Vorhersage.","webb"],
    ["Ravin Jesuthasan","HR & Organisationsdesign","Arbeit kann in Aufgaben zerlegt und über Fähigkeiten neu verteilt werden.","Welche Aufgabe sollte aus einer starren Stellenbeschreibung herausgelöst werden?","Aufgabenzerlegung allein schafft noch keine faire Chancenverteilung.","mercer"],
    ["Cathy Moore","Learning Experience","Lernen beginnt bei messbaren Geschäftszielen und beobachtbaren Handlungen.","Welche konkrete Handlung muss nach dem Kurs anders sein?","Manche Leistungsprobleme brauchen Prozessänderungen statt Training.","cathy"],
    ["Richard Mayer","Lernforschung","Multimediale Lernumgebungen sollten an kognitiven Lernprozessen ausgerichtet werden.","Welche Information braucht die Person für genau diese Entscheidung?","Ein attraktives Video ist kein Beleg für Transfer.","mayer"],
    ["Amy Edmondson","Teamlernen","Psychologische Sicherheit senkt das zwischenmenschliche Risiko, Fragen oder Fehler anzusprechen.","Welcher Einwand wird heute aus Angst zurückgehalten?","Sicherheit verlangt weiterhin Qualitätsmaßstäbe und Verantwortung.","edmondson"],
    ["Martin Seligman","Positive Psychologie","PERMA beschreibt positive Emotion, Engagement, Beziehungen, Sinn und Erfolg als Elemente des Wohlbefindens.","Welche Ressource stärken wir, ohne Arbeitslast zu verdecken?","Ein Wohlbefindensmodell ersetzt keine Gefährdungsbeurteilung.","seligman"],
    ["Christina Maslach","Arbeitspsychologie","Ihre Forschung richtet den Blick auf Burnout und Bedingungen der Arbeit.","Welche Arbeitsregel erzeugt chronische Belastung?","Individuelle Selbstfürsorge behebt keine strukturelle Überlastung.","maslach"],
    ["Nicholas Bloom","Hybride Arbeit","Im randomisierten Trip.com-Versuch sanken Kündigungen bei zwei Homeoffice-Tagen ohne messbaren Leistungsnachteil.","Welche Aufgaben und Gruppen sind mit diesem Versuch vergleichbar?","Der Versuch in einem Unternehmen ist keine universelle Hybridformel.","bloom"],
    ["Nadine Nobile, Sven Franke & Stefanie Hornung","New Pay","Das New Pay Collective betont Fairness, Partizipation, Transparenz und laufende Anpassung.","Welche Vergütungsregel bildet unsere Werte nicht mehr ab?","Eine Methode ist keine fertige Gehaltstabelle für jedes Unternehmen.","newPay"],
    ["OECD Skills-First Team","Skills & Arbeitsmarkt","Skills-first reicht über Recruiting hinaus in Lernen, Anerkennung und Arbeitsmarkt-Mobilität.","Welche internen Fähigkeiten bleiben wegen Titeln unsichtbar?","Ein Skill-Register ist noch keine neue Arbeitsorganisation.","oecdSkills"],
    ["WHO Expertengruppe","Mental Health","Die Leitlinie empfiehlt Maßnahmen an Arbeitsbedingungen sowie Training für Führungskräfte.","Welche Belastungsquelle können wir organisatorisch ändern?","Eine Leitlinie braucht Anpassung an Tätigkeiten und lokalen Rechtsrahmen.","who"],
    ["ILO Forschungsteam","KI und Beschäftigung","GenAI-Exposition betrifft etwa ein Viertel der Beschäftigung weltweit; meist geht es um Veränderung von Aufgaben.","Welche Aufgaben im eigenen Prozess sind wirklich betroffen?","Exposition ist keine Prognose für Stellenabbau.","iloAI"],
    ["Matt Pocock","KI-Lernen & Skills","Sein teach-Ansatz sammelt vertrauenswürdige Quellen vor der Lektion und prüft Lernen über aktive Aufgaben.","Welcher Nachweis zeigt, dass ein KI-Skill in echter Arbeit hilft?","Seine Skills sind eine Methodenreferenz, keine Wirksamkeitsstudie für HR.","matt"]
  ];
  const perspectives=perspectiveRows.map((r,i)=>({id:"perspective-"+(i+1),title:r[0],field:r[1],position:r[2],question:r[3],limit:r[4],source:r[5]}));
  // Vier fiktive Flaggschiff-Fälle; die Quellen begründen nur den fachlichen Prüfrahmen.
  const caseRows={
    judgement:[
    ],
    health:[
    ],
    leadership:[
      ["remote-career","Karriere im Büro","Beförderungen folgen informellen Kontakten an Präsenztagen.","Wie machst du Leistung und Chancen sichtbar?","Welche Gruppe wird durch diese Regel benachteiligt?","bloom"],
      ["ai-approval","Die KI entscheidet vor","Ein Tool schlägt Absagen an Kunden ohne Freigabe vor.","Wo liegt die menschliche Freigabe?","Wer erkennt systematische Fehler?","iloAI"],
    ],
    learning:[
      ["hidden-skill","Interne Expertin übersehen","Ein Projekt sucht extern, intern kann jemand die Aufgabe bereits.","Wie öffnest du einen fairen Probeeinsatz?","Welche formale Hürde ist notwendig?","oecdSkills"],
    ],
    systems:[
      ["pay-gap","Skill-Prämie mit Schieflage","Nur sichtbare KI-Projekte erhalten Zuschläge.","Welche Kriterien sind fair und nachvollziehbar?","Welche notwendige Arbeit bleibt unsichtbar?","newPay"],
    ],
    futures:[
    ]
  };
  const flagshipDetails={
    "ai-approval":{
      title:"KI-Einführung: Tempo ohne Blindflug",
      situation:"Demo/fiktiv: Ein Serviceteam soll Antwortentwürfe mit KI erstellen. Qualität, Nacharbeit und nutzbare Zeit sind im eigenen Betrieb noch nicht gemessen.",
      options:[
        {title:"A · Breiter Rollout",effect:"Schneller Einsatz in allen Teams.",risk:"Fehler, Lernzeit und Datenschutzfolgen sind vorab ungeklärt."},
        {title:"B · Begrenzter Pilot",effect:"Ein Aufgabentyp, Vergleichsgruppe und menschliche Freigabe.",risk:"Der Nutzen kommt später und braucht Messaufwand."}
      ],
      assumptionRegister:[
        {type:"Beobachtung",text:"Im fiktiven Team werden Antwortentwürfe heute manuell geprüft; eine lokale Qualitätsbaseline fehlt."},
        {type:"Annahme",text:"KI könnte nutzbare Bearbeitungszeit freisetzen. Fehler und Nacharbeit können den Vorteil aufheben."},
        {type:"Wert",text:"Kundenrichtigkeit und menschliche Verantwortung haben Vorrang vor bloßer Ticketzahl."}
      ],
      euro:{period:"90 Tage · ausschließlich Demo/fiktiv",unitLabel:"nutzbare Stunden",formula:"nutzbare Stunden × Stundenwert – Pilotkosten – Fehler-/Nacharbeitskosten",scenarios:[
        {name:"Vorsichtig",units:140,unitValue:35,cost:9000,riskCost:3000},
        {name:"Mittel",units:240,unitValue:35,cost:9000,riskCost:1500},
        {name:"Günstig",units:340,unitValue:35,cost:9000,riskCost:500}
      ],limit:"Der Stundenwert ist eine fiktive interne Kapazitätsbewertung, kein automatisch realisierter Umsatz."},
      counterargument:"Ein schneller Rollout kann den Pilot überholen, wenn Wettbewerber früher lernen. Doch Geschwindigkeit ohne Fehlergrenze verschiebt Kosten auf Kundschaft und Beschäftigte.",
      groups:["Kundschaft","Serviceteam","Qualitätssicherung","IT und Datenschutz","Finance"],
      gates:{day30:{go:"Nur weiter, wenn Antwortqualität mindestens die eigene Baseline erreicht, Freigaben funktionieren und Nacharbeit dokumentiert wird.",stop:"Sofort stoppen bei kritischer Falschauskunft, Datenschutzvorfall oder ungeklärter Verantwortlichkeit."},day90:{go:"Nur skalieren, wenn nutzbare Stunden und Gesamtkosten anhand realer Daten belegt sind und Qualität sowie Arbeitslast nicht schlechter werden.",stop:"Nicht skalieren, wenn der mittlere Nettoeffekt negativ bleibt oder Qualität/Belastung schlechter werden."}}
    },
    "hidden-skill":{
      title:"Skills statt Stellen: kritische Arbeit sichern",
      situation:"Demo/fiktiv: In einem Zulieferbetrieb hängt eine Fehlerdiagnose an zwei Personen. Eine verlässt das Unternehmen in neun Monaten; die identische Stelle ist schwer zu besetzen.",
      options:[
        {title:"A · Extern nachbesetzen",effect:"Spezialisierte Erfahrung gezielt suchen.",risk:"Suchdauer und erneute Einzelabhängigkeit bleiben offen."},
        {title:"B · Arbeit zerlegen und intern qualifizieren",effect:"Diagnoseaufgaben, Lernzeit und Arbeitsproben für zwei weitere Personen planen.",risk:"Anleitung entzieht der Produktion zunächst Kapazität."}
      ],
      assumptionRegister:[
        {type:"Beobachtung",text:"Im fiktiven Betrieb können zwei Personen die kritische Diagnose; eine Übergabe steht an."},
        {type:"Annahme",text:"Eine interne Qualifizierung könnte Ausfallstunden vermeiden, wenn Lernzeit tatsächlich geschützt ist."},
        {type:"Wert",text:"Zugang zur Erprobung und Auswahl nach Arbeitsprobe müssen fair sein."}
      ],
      euro:{period:"90 Tage · ausschließlich Demo/fiktiv",unitLabel:"vermiedene Ausfallstunden",formula:"vermiedene Ausfallstunden × Ausfallwert – Lern-/Pilotkosten – Qualitätsrisiko",scenarios:[
        {name:"Vorsichtig",units:20,unitValue:500,cost:16000,riskCost:5000},
        {name:"Mittel",units:40,unitValue:500,cost:16000,riskCost:3000},
        {name:"Günstig",units:60,unitValue:500,cost:16000,riskCost:1000}
      ],limit:"Vermiedene Ausfälle sind eine fiktive Annahme. Ein echter Wert braucht Auftrags-, Qualitäts- und Ausfalldaten."},
      counterargument:"Interne Qualifizierung kann die einzige Expertin zusätzlich belasten. Eine externe Besetzung kann schneller sein, wenn passende Erfahrung tatsächlich verfügbar ist.",
      groups:["Erfahrene Fachkräfte","Interessierte Mitarbeitende","Produktion","Kundschaft","HR und Finance"],
      gates:{day30:{go:"Nur weiter, wenn Lernzeit im Plan steht, zwei Personen faire Probeeinsätze erhalten und erste überwachte Diagnosen dokumentiert sind.",stop:"Stoppen, wenn Anleitung ohne Entlastung erfolgt oder die Diagnosequalität sinkt."},day90:{go:"Ausweiten, wenn zwei datierte Arbeitsproben je Person die Qualitätsgrenze erfüllen und die Gesamtkosten gegen externe Suche verglichen sind.",stop:"Nicht als Vertretung freigeben, wenn Arbeitsproben fehlen oder Sicherheits- und Qualitätsgrenzen verletzt werden."}}
    },
    "remote-career":{
      title:"Hybrid fair führen: Sichtbarkeit ohne Präsenzbias",
      situation:"Demo/fiktiv: Ein Team arbeitet teils mobil, teils ortsgebunden. Informelle Bürogespräche beeinflussen Aufgabenverteilung und Entwicklungschancen; Übergaben kosten Zeit.",
      options:[
        {title:"A · Einheitliche Präsenztage",effect:"Gemeinsame Zeit wird leicht planbar.",risk:"Ortsgebundene Arbeit und individuelle Aufgaben bleiben ungleich berücksichtigt."},
        {title:"B · Aufgabenbasierte Teamregeln",effect:"Präsenzanlässe, Dokumentation, Feedback und Lernkontakte werden je Aufgabe vereinbart.",risk:"Koordination und Führung müssen konsequent umgesetzt werden."}
      ],
      assumptionRegister:[
        {type:"Beobachtung",text:"Im fiktiven Team sind Entscheidungen aus Bürogesprächen für mobile Personen nicht immer sichtbar."},
        {type:"Annahme",text:"Klare Übergaben könnten Reibungsstunden senken und Entwicklungschancen fairer verteilen."},
        {type:"Wert",text:"Leistung zählt nach Ergebnis und Qualität, nicht nach Sichtbarkeit im Büro."}
      ],
      euro:{period:"90 Tage · ausschließlich Demo/fiktiv",unitLabel:"vermiedene Reibungsstunden",formula:"vermiedene Reibungsstunden × Stundenwert – Umstellungskosten – zusätzlicher Koordinationsaufwand",scenarios:[
        {name:"Vorsichtig",units:100,unitValue:40,cost:6000,riskCost:3000},
        {name:"Mittel",units:180,unitValue:40,cost:6000,riskCost:2000},
        {name:"Günstig",units:260,unitValue:40,cost:6000,riskCost:1000}
      ],limit:"Stundenwerte sind fiktive Kapazitätswerte. Fairness und Gesundheit werden zusätzlich geprüft, nicht in Euro aufgelöst."},
      counterargument:"Feste gemeinsame Tage können Onboarding und spontane Abstimmung erleichtern. Eine flexible Regel muss diese Kontakte bewusst sichern.",
      groups:["Mobile Mitarbeitende","Ortsgebundene Mitarbeitende","Neue Kolleginnen und Kollegen","Führungskräfte","Kundschaft"],
      gates:{day30:{go:"Weiter, wenn Übergaben dokumentiert sind, Feedback alle Gruppen erreicht und Qualitäts- sowie Belastungsdaten erhoben werden.",stop:"Stoppen oder ändern, wenn sicherheitskritische Übergaben ausfallen oder eine Gruppe systematisch Informationen verpasst."},day90:{go:"Ausweiten, wenn Übergabequalität mindestens die Baseline erreicht und Zugang zu Projekten sowie Feedback nach Ortsgruppen geprüft ist.",stop:"Nicht verstetigen bei sinkender Qualität, steigender Belastung oder nachgewiesen ungleichen Entwicklungschancen."}}
    },
    "pay-gap":{
      title:"New Pay: neue Skills, faire Regeln",
      situation:"Demo/fiktiv: Für sichtbare KI-Projekte sind Zuschläge geplant. Notwendige Service-, Pflege- und Koordinationsarbeit bleibt im bisherigen Kriterienkatalog unsichtbar.",
      options:[
        {title:"A · Sofortige Skill-Prämie",effect:"Knappheitssignal für gesuchte Fähigkeiten.",risk:"Vergleichbare Beiträge und mögliche Benachteiligung bleiben ungeprüft."},
        {title:"B · Kriterien und Wirkung gemeinsam prüfen",effect:"Aufgaben, Verantwortung, Markt und Fairness werden transparent bewertet.",risk:"Die Entscheidung dauert länger und verlangt Beteiligung sowie Rechtsprüfung."}
      ],
      assumptionRegister:[
        {type:"Beobachtung",text:"Im fiktiven Betrieb erhalten nur sichtbare KI-Projekte einen Entwurf für Zuschläge."},
        {type:"Annahme",text:"Ein transparenterer Kriterienrahmen könnte Abgänge vermeiden. Ein kausaler Effekt ist nicht belegt."},
        {type:"Wert",text:"Gleiche oder gleichwertige Arbeit braucht nachvollziehbare, geschlechtsneutrale Kriterien."}
      ],
      euro:{period:"90 Tage · ausschließlich Demo/fiktiv",unitLabel:"hypothetisch vermiedene Abgänge",formula:"hypothetisch vermiedene Abgänge × Ersatzkosten – Design-/Prüfkosten – zusätzliche Vergütung",scenarios:[
        {name:"Vorsichtig",units:0,unitValue:12000,cost:8000,riskCost:7000},
        {name:"Mittel",units:1,unitValue:12000,cost:8000,riskCost:6000},
        {name:"Günstig",units:2,unitValue:12000,cost:8000,riskCost:5000}
      ],limit:"Vermiedene Abgänge sind fiktiv und nicht kausal dem Vergütungsmodell zuzurechnen. Recht und Fairness gelten unabhängig vom Euro-Ergebnis."},
      counterargument:"Eine offene Kriterienprüfung kann dringend gesuchte Talente zu spät erreichen. Eine befristete Maßnahme braucht trotzdem klare Vergleichs- und Revisionsregeln.",
      groups:["Beschäftigte mit neuen Skills","Beschäftigte mit weniger sichtbarer Arbeit","HR","Führungskräfte","Mitarbeitendenvertretung","Finance"],
      gates:{day30:{go:"Nur weiter, wenn Kriterien, Vergleichsgruppen und Beteiligung dokumentiert sind und lokale Rechtsfragen fachlich geprüft werden.",stop:"Keine Auszahlung nach neuen Regeln bei ungeklärter Benachteiligung oder fehlender Rechtsprüfung."},day90:{go:"Nur verstetigen, wenn Kriterien konsistent angewandt, Abweichungen erklärt und Kosten sowie Bindungssignale getrennt bewertet sind.",stop:"Regel revidieren, wenn gleichwertige Arbeit ohne nachvollziehbaren Grund ungleich behandelt wird."}}
    }
  };
  const originalCases=Object.entries(caseRows).flatMap(([domain,items])=>items.map(r=>({
    id:r[0],domain,title:r[1],situation:r[2],decision:r[3],mirror:r[4],source:r[5]
  })));
  const cases=["ai-approval","hidden-skill","remote-career","pay-gap"].map(id=>({
    ...originalCases.find(item=>item.id===id),...flagshipDetails[id],level:"flagship"
  }));
  // Eigene Skill-Entwürfe nach dem Muster: Auftrag, Kontext, Prüfschritte, Output, Stop-Regel.
  // Keine Übernahme oder offizielle Zugehörigkeit zu Matt Pococks Skill-Sammlung.
  const skillRows=[
    ["red-team","Decision Red Team","Vorstand","oecdForesight","eine konkrete Investitionsentscheidung mit Baseline, Alternativen und Quellen","Trenne Fakten, Annahmen und Werte. Formuliere die stärkste Gegenposition. Suche eine betroffene Gruppe, deren Kosten fehlen. Nenne drei Befunde, die den Beschluss ändern würden.","Ein einseitiges Gegenmemo mit Revisionsschwelle","Stoppe, wenn eine entscheidende Zahl ohne Herkunft bleibt."],
    ["skill-map","Task-to-Skill Architect","HR und Fachbereich","mercer","eine Rolle, drei bis fünf echte Aufgaben und Qualitätsmaßstäbe","Zerlege die Arbeit in Aufgaben. Weise beobachtbare Fähigkeiten zu. Trenne gesetzlich nötige Qualifikationen von Gewohnheitsanforderungen. Entwirf eine faire Arbeitsprobe und einen internen Lernweg.","Eine Task-, Skill- und Nachweismatrix","Keine persönliche Eignungsbewertung aus einer bloßen Selbstauskunft ableiten."],
    ["ai-task","AI Task Audit","Fachbereich und IT","iloAI","Prozessschritte, Datenarten, heutige Fehler und Bearbeitungszeit","Prüfe jeden Schritt auf KI-Unterstützung, Fehlerkosten, Datenschutz, menschliche Freigabe und Nacharbeit. Plane einen kontrollierten Vergleich mit einer Baseline und einer Stop-Regel.","Ein vierwöchiger KI-Pilotplan mit Qualitätsgrenzen","Keine ungeprüften Unternehmens- oder Personendaten in externe Tools geben."],
    ["ai-literacy","AI Literacy Sprint","Führung und Mitarbeitende","aiAct","konkretes KI-System, Nutzergruppen und Einsatzkontext","Leite benötigte Kenntnisse aus dem tatsächlichen Einsatz ab. Lass Beteiligte typische Fehler erkennen, Quellen prüfen und Freigabewege anwenden. Dokumentiere, was verstanden und in der Arbeit gezeigt wurde.","Ein rollenbezogener Lern- und Nachweisplan","Keine allgemeine Kursbescheinigung als Beweis für sichere Nutzung ausgeben."],
    ["health-design","Healthy Work Diagnostic","Führung und Beschäftigte","who","Aufgaben, Arbeitsmenge, Zeitdruck, Kontrolle und Unterstützungswege","Suche organisatorische Belastungsquellen. Frage nach unklaren Prioritäten, Planbarkeit, Fairness und Erholung. Entwirf eine begrenzte Änderung am Arbeitsablauf und prüfe Belastung und Qualität nach 30 Tagen.","Ein Arbeitsgestaltungsplan mit Verantwortlichen","Keine Diagnose, kein Persönlichkeits- oder Mental-Health-Score."],
    ["psych-safety","Speak-up Protocol","Führungsteam","edmondson","ein konkreter Fall von Einwand, Fehler oder Unsicherheit","Formuliere eine Antwort, die den Hinweis würdigt, Fakten prüft und die nächste Rückmeldung festlegt. Trenne Lernfehler von Regelverstößen. Prüfe, ob Mitarbeitende tatsächlich ohne negative Folgen sprechen konnten.","Ein Gesprächs- und Rückmeldeprotokoll","Sicherheit nicht mit fehlender Rechenschaft verwechseln."],
    ["hybrid","Hybrid Team Agreement","Teamleitung","bloom","Aufgaben, Ortsbindung, Kommunikationskanäle und Entwicklungswege","Ordne Aufgaben nach Fokus, Zusammenarbeit, Material und Vertraulichkeit. Vereinbare Dokumentation, Reaktionszeiten, Präsenzanlässe und faire Karrierechancen. Teste 30 Tage und höre ortsgebundene Mitarbeitende an.","Eine überprüfbare Teamvereinbarung","Kein pauschales Modell aus einer einzelnen Studie ableiten."],
    ["learning","Learning Action Map","L&D und Fachbereich","cathy","Geschäftsziel, beobachtbares Verhalten und Hindernisse","Beginne mit dem Leistungsproblem. Prüfe, ob Wissen, Werkzeug, Anreiz oder Prozess fehlt. Baue nur für echte Lernlücken eine Übung mit Feedback und späterer Arbeitsprobe.","Ein Transferplan statt einer Kursliste","Keinen Kurs als Lösung verkaufen, wenn die Ursache im Prozess liegt."],
    ["new-pay","Pay Fairness Review","HR und Geschäftsführung","newPay","bestehende Kriterien, Rollen, Beiträge und Rechtsrahmen","Lege Kriterien offen. Prüfe Vergleichbarkeit, verdeckte Arbeit, Partizipation und mögliche Schieflagen. Trenne Wertschätzung von Stellenwert. Markiere Rechtsfragen für lokale Fachprüfung.","Eine Kriterienkarte mit offenen Fairnessfragen","Keine individuelle Gehaltsempfehlung ohne Daten und Rechtsprüfung."],
    ["business-case","90-Day Investment Case","Geschäftsführung und Finance","oecdSkills","Baseline, Alternative, Kosten, Zeithorizont, Qualitätsmaß und Kapazität","Berechne vorsichtige, mittlere und günstige Szenarien nur aus eingegebenen Zahlen. Zeige Formeln, Doppelzählungen, nicht monetarisierte Folgen und Kontrollgruppe. Definiere Stop-/Go-Punkte nach 30 und 90 Tagen.","Ein prüfbarer Euro-Entscheidungsbrief","Keine Fantasie-ROI-Zahl oder automatische Umwandlung gesparter Minuten in Umsatz."],
    ["scenario","Supply Shock Simulator","Operations und Einkauf","iea","kritische Komponenten, Lieferanten, Ersatzwege und interne Fähigkeiten","Spiele eine Lieferverzögerung und einen Nachfragesprung getrennt durch. Bestimme Engpässe, Alternativmaterial, Qualifizierung und Kundenfolgen. Suche eine Maßnahme, die in beiden Szenarien nützt.","Eine Szenariokarte mit Auslösern und Optionen","Szenariozahlen stets als Annahmen markieren."],
    ["executive-coach","Critical Thinking Coach","Einzelperson","wef","eigene These, Quelle und Entscheidungskontext","Stelle zuerst drei präzise Rückfragen. Bitte um die stärkste Gegenhypothese und einen beobachtbaren Test. Unterscheide Korrelation, Kausalität und Anbieterbehauptung. Lass die Person am Ende ihre Position in eigenen Worten revidieren.","Ein persönliches Lernmemo mit offener Unsicherheit","Bei fehlenden Belegen keine sichere Antwort vortäuschen."]
  ];
  const promptStandards={
    "red-team":{qualityBoundary:"Jeder Einwand nennt betroffene Gruppe, belegte Kostenbasis und einen prüfbaren Revisionspunkt.",exampleStructure:"These | Beobachtung mit Quelle | Annahme | stärkste Gegenhypothese | Test | Revisionsschwelle.",stopRule:"Stoppe die Empfehlung, sobald eine entscheidende Zahl ohne Herkunft oder Zeitraum steht."},
    "skill-map":{qualityBoundary:"Jeder Skill ist als beobachtbare Handlung mit Aufgabe, Kontext und Qualitätsmaß beschrieben.",exampleStructure:"Aufgabe | Ergebnis | Skill-Handlung | notwendige Qualifikation | Arbeitsprobe | fairer Lernweg.",stopRule:"Stoppe jede Eignungsaussage, wenn nur Titel, Selbstauskunft oder Kursbesuch vorliegen."},
    "ai-task":{qualityBoundary:"Für jeden KI-Schritt stehen Baseline, Fehlertyp, menschliche Freigabe und Datenklasse im Ergebnis.",exampleStructure:"Prozessschritt | heutiger Wert | KI-Beitrag | Fehlerkosten | Freigabe | Pilotmessung | Stop-Signal.",stopRule:"Stoppe den Einsatz bei ungeklärter Datenfreigabe oder kritischem Fehler ohne verantwortliche Person."},
    "ai-literacy":{qualityBoundary:"Kompetenz wird an einem echten Nutzungsschritt und einer dokumentierten Fehlerprüfung gezeigt.",exampleStructure:"System und Rolle | typischer Fehler | Übung | Arbeitsprobe | Feedback | offene Kompetenzlücke.",stopRule:"Stoppe die Freigabe, wenn eine Teilnahmebestätigung als alleiniger Nachweis dienen soll."},
    "health-design":{qualityBoundary:"Die Maßnahme verändert mindestens eine Arbeitsbedingung und prüft Belastung sowie Qualität getrennt.",exampleStructure:"Belastungsquelle | betroffene Aufgabe | organisatorische Änderung | Verantwortliche | 30-Tage-Maß.",stopRule:"Stoppe individuelle Zuschreibungen oder Diagnosen aus Teamdaten; verweise bei akuter Gefahr an menschliche Hilfe."},
    "psych-safety":{qualityBoundary:"Die Antwort würdigt den Hinweis, prüft Fakten und nennt einen verbindlichen Rückmeldetermin.",exampleStructure:"Hinweis | erste Antwort | Sachprüfung | Verantwortung | Rückmeldung | Lernschritt.",stopRule:"Stoppe, wenn eine Person vor der Sachprüfung öffentlich verantwortlich gemacht wird."},
    "hybrid":{qualityBoundary:"Jede Ortsregel ist an Aufgabe, Zugänglichkeit, Datenschutz und gleiche Entwicklungschancen gebunden.",exampleStructure:"Aufgabe | Ortsbedarf | Kommunikationsregel | Lernkontakt | Fairnesscheck | Reviewdatum.",stopRule:"Stoppe eine pauschale Präsenzpflicht, solange Ortsbindung und betroffene Gruppen ungeprüft sind."},
    "learning":{qualityBoundary:"Der Lernplan nennt ein Geschäftsproblem, beobachtbares Verhalten und eine spätere Arbeitsprobe.",exampleStructure:"Ziel | Leistungsproblem | Ursache | Übung oder Prozessänderung | Feedback | Transferbeleg.",stopRule:"Stoppe den Kursentwurf, wenn die Ursache im Werkzeug, Anreiz oder Prozess liegt."},
    "new-pay":{qualityBoundary:"Kriterien sind für vergleichbare Arbeit transparent, geschlechtsneutral und lokal rechtlich prüfbar.",exampleStructure:"Vergütungsziel | Kriterien | Vergleichsgruppen | unsichtbare Arbeit | Beteiligung | Rechtsfrage.",stopRule:"Stoppe jede individuelle Gehaltsempfehlung ohne belastbare Daten und lokale Rechtsprüfung."},
    "business-case":{qualityBoundary:"Jede Euro-Zeile zeigt Formel, Einheit, Zeitraum, Quelle und Unsicherheitsbandbreite.",exampleStructure:"Baseline | Option A/B | drei Szenarien | Formel | nicht monetarisierte Folgen | Tag 30/90.",stopRule:"Stoppe den ROI, wenn gesparte Minuten ohne nachweisbare Nutzung als Umsatz gerechnet werden."},
    "scenario":{qualityBoundary:"Mindestens zwei gegensätzliche Lieferlagen haben je Auslöser, betroffene Aufgabe und robuste Maßnahme.",exampleStructure:"Signal | Lage A/B | Engpass | Skillbedarf | Frühindikator | Entscheidung | Stop-Punkt.",stopRule:"Stoppe eine Ein-Zahl-Prognose, sobald Lieferzeit oder Nachfrage unbestätigt sind."},
    "executive-coach":{qualityBoundary:"Die Antwort trennt Beobachtung, Schlussfolgerung und Gegenhypothese und endet mit einem Test.",exampleStructure:"Meine These | drei Rückfragen | stärkster Einwand | überprüfbarer Test | revidierte Position.",stopRule:"Stoppe eine sichere Empfehlung, wenn die Primärquelle fehlt oder Kausalität nur behauptet wird."}
  };
  const skills=skillRows.map(r=>{
    const standard=promptStandards[r[0]];
    return {
      id:r[0],title:r[1],audience:r[2],source:r[3],...standard,
      body:`AUFTRAG: Du unterstützt ${r[2]} beim Thema „${r[1]}“. Arbeite als kritischer Sparringspartner, nicht als automatische Entscheidungsinstanz.\n\nBENÖTIGTER KONTEXT: Frage zuerst nach ${r[4]}. Wenn Angaben fehlen, benenne die Lücke und frage nach; erfinde keine Werte.\n\nARBEITSABLAUF: ${r[5]}\n\nERGEBNIS: Erstelle ${r[6]}. Trenne belegte Fakten, Annahmen, eigene Empfehlung und offenen Prüfbedarf. Nenne Originalquellen direkt bei den jeweiligen Aussagen.\n\nQUALITÄTSGRENZE: ${standard.qualityBoundary}\n\nBEISPIELANTWORT-STRUKTUR: ${standard.exampleStructure}\n\nSTOP-REGEL: ${standard.stopRule}`
    };
  });
  const templateRows=[
    ["decision-brief","Executive Decision Brief","Entscheidungen nachvollziehbar statt nur überzeugend machen.",["Geschäftsfrage","Option A und B","Baseline und Quelle","Annahmen und Unsicherheiten","Euro-Bandbreite mit Formel","Menschen, Qualität und Fairness","Gegenargument","Stop-/Go-Regel nach 30 und 90 Tagen"],"oecdForesight"],
    ["skill-card","Skill-Nachweis-Karte","Fähigkeiten als überprüfbare Arbeit beschreiben.",["Aufgabe und Arbeitskontext","Beobachtbare Handlung","Qualitätskriterium","Übungsweg","Datierte Arbeitsprobe","Feedback","Nächste Anwendung"],"oecdSkills"],
    ["task-map","Task- und Skill-Map","Rollen in Arbeit, Können und passende Unterstützung übersetzen.",["Rolle oder Geschäftsfeld","Kritische Aufgabe","Kunden- oder Betriebsnutzen","Benötigte Skills","KI-Beitrag und menschliche Freigabe","Nachweis","Interne Lernoption"],"mercer"],
    ["hybrid-agreement","Hybrid Team Agreement","Arbeitsort und Zusammenarbeit aus den Aufgaben ableiten.",["Team und Aufgaben","Fokusarbeit und Präsenzanlässe","Dokumentierte Entscheidungen","Erreichbarkeit und Ruhezeiten","Onboarding und informelles Lernen","Faire Entwicklungschancen","Prüfung nach 30 Tagen"],"bloom"],
    ["health-plan","Healthy Work Action Plan","Psychosoziale Risiken als Arbeitsbedingungen bearbeiten.",["Arbeitsbelastung und Hinweis","Organisatorische Ursache","Beteiligte Beschäftigte","Änderung an Priorität oder Prozess","Verantwortliche Person","Belastungs- und Qualitätsmaß","Reviewdatum"],"who"],
    ["pay-criteria","New-Pay-Kriterienblatt","Vergütungsentscheidungen auf Nachvollziehbarkeit und Fairness prüfen.",["Ziel und Werte","Vergütungskriterien","Vergleichbare Arbeit","Beteiligung","Mögliche Benachteiligung","Transparenzgrad","Rechtsprüfung und nächste Entscheidung"],"newPay"],
    ["ai-audit","KI-Task-Audit","KI-Einsatz an realen Aufgaben und Fehlerkosten prüfen.",["Prozessschritt","Aktuelle Baseline","Möglicher KI-Beitrag","Daten und Risiken","Menschliche Freigabe","Vergleichstest","Stop-Regel"],"iloAI"],
    ["scenario-card","Zukunfts-Szenariokarte","Bei unsicherer Zukunft robuste statt scheinpräzise Beschlüsse finden.",["Externe Signale mit Quelle","Szenario 1","Szenario 2","Betroffene Aufgabe und Lieferkette","Benötigte Fähigkeit","Frühindikator","Robuster nächster Schritt"],"oecdForesight"],
    ["review-note","Evidence-Based Performance Review","Leistung, Zusammenarbeit und Lernen mit Belegen besprechen.",["Vereinbarte Aufgabe","Ergebnis und Qualitätsbeleg","Beobachtbares Verhalten","Kontext und Hindernisse","Rückmeldung der Person","Entwicklungsprobe","Nächster Reviewtermin"],"oecdSkills"],
    ["leader-ritual","Leadership Operating Card","Für hybride Teams klare, faire und sichere Führungsroutinen festlegen.",["Entscheidungsrechte","Eskalationsweg","Wöchentliches Prioritäten-Update","Speak-up-Frage","Asynchrones Entscheidungsprotokoll","Belastungs-Check ohne Diagnose","Monatliche Lernprobe"],"edmondson"],
    ["decision-rights","Decision Rights Canvas","Klären, was Team, Führungskraft und Geschäftsführung selbst entscheiden dürfen.",["Wiederkehrende Entscheidung","Risikoklasse","Entscheidungsbefugnis","Benötigte Information","Eskalationsauslöser","Reaktionszeit","Dokumentation und Review"],"edmondson"],
    ["one-on-one","1:1 Coaching Card","Ein Gespräch führen, das Arbeit, Lernen und Hindernisse konkret macht.",["Aktuelle Aufgabe und Ziel","Was gelang mit welchem Beleg?","Hindernis im System","Eigene Lernfrage","Eine konkrete Unterstützung","Nächste Arbeitsprobe","Termin für Rückmeldung"],"cathy"],
    ["speakup-ritual","Speak-up Meeting Sheet","Widerspruch und Fehlermeldungen in einen verlässlichen Lernprozess übersetzen.",["Fachliche Unsicherheit","Stärkstes Gegenargument","Wer ist betroffen?","Fakten und Annahmen","Nächster Prüfschritt","Verantwortliche Person","Rückmeldung bis Datum"],"edmondson"],
    ["crisis-brief","Crisis Communication Brief","Bei Krieg, Lieferstopp oder Unternehmenskrise ruhig und wahrheitsgemäß informieren.",["Gesicherte Lage","Was noch unbekannt ist","Folgen für Aufgaben und Menschen","Sofortige Unterstützung","Entscheidungsrechte","Nächstes Update","Ansprechperson und vertraulicher Kanal"],"who"],
    ["ai-governance","Human–AI Decision Protocol","Menschliche Kontrolle und KI-Kompetenz in einem Arbeitsprozess festlegen.",["KI-Anwendungsfall","Nutzer und Betroffene","Datenarten","Fehler- und Schadensszenario","Menschliche Freigabe","Kompetenznachweis","Monitoring und Stop-Regel"],"aiAct"],
    ["leadership-90","90-Tage-Führungsplan","Eine Veränderung in beobachtbare Führungsroutinen und Ergebnisse übersetzen.",["Geschäftsproblem","Team und betroffene Gruppen","30-Tage-Experiment","Lern- und Skill-Lücke","Qualitäts- und Belastungsmaß","Widerspruchsforum","Stop-/Go-Entscheidung am Tag 90"],"oecdSkills"],
    ["learning-sprint","Lerntransfer-Sprint","Lernen als beobachtbare Anwendung in echter Arbeit planen.",["Geschäftsaufgabe","Heute beobachtbare Handlung","Neue Handlung nach dem Lernen","Übung an einer echten Aufgabe","Feedbackperson und Lernzeit","Arbeitsprobe nach 14 Tagen","Qualitätsmaß und nächste Anwendung"],"cathy"],
    ["local-impact","Global–EU–Österreich-Folgencheck","Ein globales Signal in überprüfbare lokale Entscheidungen übersetzen.",["Globales Signal mit Originalquelle und Datum","EU-Regel oder Marktwirkung","Österreichischer Standortbezug","Betroffene Aufgabe und Beschäftigte","Lokale Datenlücke","Alternative Entwicklung","Frühindikator und nächste Entscheidung"],"oecdForesight"],
    ["supply-stress","Ressourcen- und Chip-Stresstest","Liefer- und Ressourcenrisiken mit Skillbedarf und Kundenwirkung verbinden.",["Kritische Ressource oder Komponente","Lieferanten- und Länderabhängigkeit","Auslöser für Engpassszenario","Betroffene Kundenleistung","Alternative und deren Kosten","Erforderlicher Skill und Entscheidungsspielraum","Frühindikator und Stop-Regel"],"iea"],
    ["working-time","Arbeitszeit-Experiment","Arbeitszeit nach Leistung, Erholung und Fairness gestalten.",["Kritische Arbeit und Servicezeit","Heutige Arbeitszeit und Belastung","Neue Zeitregel als begrenzter Versuch","Fokus- und Übergabezeiten","Erreichbarkeit und Ruhezeit","Qualität, Belastung und Fairness","Reviewdatum und Rückfallregel"],"iloTime"]
  ];
  const templateTopics={
    "decision-brief":"judgement","skill-card":"learning","task-map":"systems","hybrid-agreement":"leadership",
    "health-plan":"health","pay-criteria":"systems","ai-audit":"futures","scenario-card":"futures",
    "review-note":"learning","leader-ritual":"leadership","decision-rights":"leadership","one-on-one":"leadership",
    "speakup-ritual":"health","crisis-brief":"futures","ai-governance":"futures","leadership-90":"leadership",
    "learning-sprint":"learning","local-impact":"futures","supply-stress":"futures","working-time":"systems"
  };
  const templateChecks={
    "decision-brief":["Baseline und Herkunft jeder Euro-Zahl geprüft","Gegenargument und zweite Option ernsthaft geprüft","Stop-/Go-Punkt mit Verantwortlichen festgelegt"],
    "skill-card":["Handlung ist im Kontext beobachtbar","Arbeitsprobe ist freiwillig und datiert","Zugriff auf persönliche Belege geklärt"],
    "task-map":["Aufgaben statt Titel beschrieben","Qualitätsgrenze je Aufgabe benannt","Menschliche Freigabe bei KI geklärt"],
    "hybrid-agreement":["Präsenzanlass aus Aufgaben abgeleitet","Ruhezeiten und asynchrone Regeln vereinbart","Karrierechancen für alle Arbeitsorte geprüft"],
    "health-plan":["Organisatorische Ursache statt Diagnose erfasst","Betroffene an der Änderung beteiligt","Belastung und Qualität gemeinsam überprüft"],
    "pay-criteria":["Kriterien sind objektiv und erklärbar","Vergleichbare Arbeit und Benachteiligung geprüft","Lokale Rechtsprüfung vor Einführung vorgesehen"],
    "ai-audit":["Eigene Baseline statt Anbieterwert verwendet","Fehler und Nacharbeit mitgemessen","Menschliche Kontrolle und Stop-Regel festgelegt"],
    "scenario-card":["Zwei plausible Zukünfte unterschieden","Originalquellen und Datum notiert","Frühindikator für Kurswechsel definiert"],
    "review-note":["Ergebnis und Verhalten getrennt","Kontext und Gelegenheit zur Leistung berücksichtigt","Person kann ihre Sicht ergänzen"],
    "leader-ritual":["Entscheidungsrechte sichtbar","Widerspruch ohne Sanktion möglich","Belastung als Arbeitsfrage besprochen"],
    "decision-rights":["Befugnis und Grenze dokumentiert","Eskalationsauslöser bekannt","Entscheidung wird überprüft"],
    "one-on-one":["Konkrete Arbeitsprobe besprochen","Hindernis im System erkannt","Unterstützung und Termin vereinbart"],
    "speakup-ritual":["Gegenargument dokumentiert","Rückmeldung an Hinweisgebende geplant","Kein persönliches Risiko aus der Frage erzeugt"],
    "crisis-brief":["Gesicherte Fakten von Unbekanntem getrennt","Nächstes Update und Kontaktweg festgelegt","Unterstützung ohne Gesundheitsdiagnose angeboten"],
    "ai-governance":["Daten und Betroffene erfasst","Menschliche Freigabe sinnvoll gestaltet","Monitoring und Stop-Regel dokumentiert"],
    "leadership-90":["Führungsroutine beobachtbar","Qualität und Belastung mitgemessen","Stop-/Go nach 90 Tagen klar"],
    "learning-sprint":["Lernzeit in der Arbeit verfügbar","Arbeitsprobe zeigt Anwendung statt Teilnahme","Feedback nach 14 Tagen terminiert"],
    "local-impact":["Globales Signal lokal überprüft","EU- und Österreich-Bezug getrennt","Offene Datenlücke und Frühindikator notiert"],
    "supply-stress":["Abhängigkeit mit Quelle belegt","Alternative auf Kosten und Qualität geprüft","Skillbedarf für Engpassentscheidung benannt"],
    "working-time":["Service und Fokuszeiten gesichert","Ruhezeit und Belastung geprüft","Rückfallregel für den Versuch vereinbart"]
  };
  const templates=templateRows.map(r=>({
    id:r[0],title:r[1],source:r[4],fields:r[3],topic:templateTopics[r[0]],checks:templateChecks[r[0]],
    leadership:["hybrid-agreement","leader-ritual","decision-rights","one-on-one","speakup-ritual","crisis-brief","ai-governance","leadership-90"].includes(r[0]),
    body:`${r[2]} Nutze diese Vorlage für einen realen Fall. Trage nur überprüfte Unternehmensdaten ein. Markiere Annahmen ausdrücklich und ergänze für jede entscheidende Zahl Herkunft, Datum und Geltungsbereich. Besprich den Entwurf mit den betroffenen Personen, bevor er als Beschluss gilt. Offene Rechts-, Gesundheits- oder Datenschutzfragen gehören in eine zuständige Fachprüfung.`
  }));
  const sboStages=[
    {
      id:"work",title:"01 · Arbeit sichtbar machen",
      question:"Wissen wir, welche Aufgaben morgen Wert schaffen und welche heute Zeit binden?",
      explanation:"Ausgangspunkt ist ein konkreter Geschäftsprozess: Kundenleistung, heutige Qualität, Kosten und Engpass. Eine Skill-Liste ohne diese Nachfrage zeigt nicht, welche Fähigkeiten tatsächlich gebraucht werden.",
      decision:"Welchen Geschäftsbereich und welche messbare Leistung nehmen wir als ersten Pilot?",
      checks:["Kunden- oder Betriebsnutzen benennen","Baseline für Qualität, Zeit und Kosten festhalten","Betroffene Mitarbeitende und Schnittstellen beteiligen"],
      deliverable:"Ein priorisierter Arbeitsprozess mit Baseline und Pilotgrenze.",source:"mercer",tool:"business-case"
    },
    {
      id:"tasks",title:"02 · Jobs in Aufgaben zerlegen",
      question:"Welche Aufgaben stecken hinter den Titeln, und wie verändern KI oder Engpässe sie?",
      explanation:"Rollen bleiben für Verantwortung wichtig. Für Veränderung werden ihre Aufgaben, Qualitätsanforderungen, Entscheidungen und Schnittstellen betrachtet. Erst dann ist sichtbar, wo Technologie unterstützt und wo menschliches Urteil nötig bleibt.",
      decision:"Welche drei Aufgaben verdienen zuerst eine neue Verteilung oder Qualifizierung?",
      checks:["Tätigkeit statt Berufsbezeichnung beschreiben","Ergebnis und Qualitätsgrenze je Aufgabe definieren","Automatisierung, Unterstützung und menschliche Freigabe getrennt prüfen"],
      deliverable:"Eine Task-Map mit Output, Verantwortung und verändertem Skillbedarf.",source:"mercer",tool:"skill-map"
    },
    {
      id:"language",title:"03 · Gemeinsame Skill-Sprache",
      question:"Verstehen HR, Fachbereich und Mitarbeitende unter einem Skill dasselbe?",
      explanation:"Ein Skill braucht eine klare Bezeichnung, beobachtbare Handlung und Kontext. ESCO kann als europäische Referenzsprache helfen; betriebsspezifische Anforderungen müssen ergänzt und mit den Menschen vor Ort geprüft werden.",
      decision:"Welche 15 bis 25 kritischen Skills beschreiben den Pilotbereich, ohne eine endlose Taxonomie zu bauen?",
      checks:["Skill, Wissen und formale Qualifikation unterscheiden","Doppelte oder unklare Begriffe bereinigen","ESCO-Begriffe mit realen Aufgaben abgleichen"],
      deliverable:"Ein kleines, versioniertes Skill-Glossar mit Aufgabenbezug.",source:"esco",tool:"skill-map"
    },
    {
      id:"evidence",title:"04 · Können fair nachweisen",
      question:"Woran erkennen wir Können außer am Titel, Zertifikat oder Selbsturteil?",
      explanation:"Nachweise können aus realen, datierten Arbeitsproben mit Qualitätskriterien bestehen. Selbstauskunft bleibt als Selbstauskunft sichtbar. Individuelle Profile gehören der lernenden Person; ein Unternehmen braucht für Personalentscheidungen eigene faire und rechtlich geprüfte Verfahren.",
      decision:"Welche freiwillige Arbeitsprobe zeigt einen kritischen Skill ohne unnötige Personendaten?",
      checks:["Handlung, Kontext und Qualitätsmaß festhalten","Selbstangabe von beobachtetem Nachweis trennen","Datenschutz, Zugriffsrecht und mögliche Verzerrung prüfen"],
      deliverable:"Eine Skill-Karte mit Belegregel und Datenschutzgrenze.",source:"oecdSkills",tool:"skill-map"
    },
    {
      id:"mobility",title:"05 · Arbeit und Chancen verbinden",
      question:"Kann eine Person ihre Skills in Projekten, Entwicklung und interner Mobilität einsetzen?",
      explanation:"Skills-first wirkt erst, wenn Fähigkeiten bei Aufgabenverteilung, Lernen und Laufbahnen berücksichtigt werden. Faire Zugänge zu Probeeinsätzen und Lernzeit sind wichtiger als eine bloße Datenbank voller Profile.",
      decision:"Welches Projekt öffnen wir für interne Interessierte mit passender Arbeitsprobe?",
      checks:["Anforderungen und Auswahlweg offenlegen","Lernlücken mit kurzer Praxisphase schließen","Zugang für mobile und ortsgebundene Beschäftigte prüfen"],
      deliverable:"Ein internes Aufgabenangebot mit transparenter Auswahl und Lernweg.",source:"oecdSkills",tool:"learning"
    },
    {
      id:"governance",title:"06 · Führung, Pay und Wirkung steuern",
      question:"Welche Regeln müssen sich ändern, damit Skill-Arbeit nicht bei einem Pilot stehen bleibt?",
      explanation:"Entscheidungsrechte, Führung, Performance Reviews und Vergütung müssen zur neuen Aufgaben- und Skill-Logik passen. Neue Daten dürfen keine intransparenten Ratings erzeugen. Wirkung wird gegen Baseline und Gegenfaktum geprüft.",
      decision:"Welche zwei Regeln ändern wir im Pilot, und wer prüft Fairness und Euro-Wirkung?",
      checks:["Entscheidungsrecht und Verantwortliche festlegen","Vergütung und Beurteilung auf Fairness prüfen","Qualität, Mobilität, Belastung und Kosten nach 30 und 90 Tagen prüfen"],
      deliverable:"Ein 90-Tage-Governance- und Wirkungsplan mit Stop-/Go-Regel.",source:"wefTaxonomy",tool:"business-case"
    }
  ];
  // Redaktionelle Gegenüberstellung, kein fiktives Gespräch zwischen diesen Personen.
  const councils=[
    {id:"council-ai",title:"KI einführen: Tempo oder Kontrolle?",question:"Soll ein KI-System für den Kundenservice sofort breit eingeführt werden?",tension:"Schneller Nutzen steht gegen Fehlerkosten, Lernbedarf und Verantwortung.",lenses:[
      {name:"OECD KI-Forschung",source:"oecdAI",view:"KI verändert Lern- und Aufgabenanforderungen. Der konkrete Nutzen im Betrieb muss lokal geprüft werden."},
      {name:"ILO Forschung",source:"iloAI",view:"KI-Exposition verändert Aufgaben; daraus folgt keine konkrete Ersparnis oder Entlassungsquote."},
      {name:"EU AI Act",source:"aiAct",view:"KI-Kompetenz muss zum System, Einsatzkontext und zu betroffenen Personen passen."}
    ],decision:"Welcher begrenzte Pilot zeigt Qualität, Kosten und Folgen, bevor du skalierst?"},
    {id:"council-hybrid",title:"Hybrid: Freiheit oder Fragmentierung?",question:"Soll ein Team feste Präsenztage erhalten oder Aufgaben frei planen?",tension:"Flexibilität kann Bindung stärken; Wissensaustausch und faire Chancen brauchen Gestaltung.",lenses:[
      {name:"Nicholas Bloom",source:"bloom",view:"Ein randomisierter Versuch fand bei zwei Homeoffice-Tagen weniger Kündigungen ohne messbaren Leistungseinbruch."},
      {name:"Amy Edmondson",source:"edmondson",view:"Teamlernen braucht Bedingungen, in denen Fragen und Einwände ohne zwischenmenschliches Risiko möglich sind."},
      {name:"ILO Arbeitszeit",source:"iloTime",view:"Arbeitszeitgestaltung und Flexibilität beeinflussen die Vereinbarkeit von Arbeit und Leben."}
    ],decision:"Welche Teamregel schützt Fokus, Zusammenarbeit und gleiche Entwicklungschancen?"},
    {id:"council-pay",title:"New Pay: Skill-Prämie oder Fairness?",question:"Soll ein Unternehmen neue KI-Fähigkeiten sofort mit Zuschlägen honorieren?",tension:"Knappheitssignale können notwendige, aber weniger sichtbare Arbeit entwerten.",lenses:[
      {name:"New Pay Collective",source:"newPay",view:"Vergütung soll Fairness, Partizipation, Transparenz und Organisationswerte widerspiegeln."},
      {name:"OECD Skills-First",source:"oecdSkills",view:"Fähigkeiten sollen entwickelt, anerkannt und in Arbeit wirksam werden, nicht nur beim Recruiting zählen."},
      {name:"EU Entgelttransparenz",source:"payDirective",view:"Objektive, geschlechtsneutrale Kriterien und Transparenz sind Teil des europäischen Rechtsrahmens."}
    ],decision:"Welche Kriterien würdest du offenlegen, und wer prüft unbeabsichtigte Benachteiligung?"},
    {id:"council-skills",title:"Weiterbildung: Kurs oder Arbeitsprobe?",question:"Soll das Budget in Videokurse oder in Lernzeit mit echten Aufgaben fließen?",tension:"Skalierbare Inhalte sind leicht zu zählen; Können zeigt sich erst in Handlungen.",lenses:[
      {name:"Cathy Moore",source:"cathy",view:"Lerndesign beginnt mit Geschäftsziel und beobachtbarem Verhalten."},
      {name:"Richard Mayer",source:"mayer",view:"Multimedia sollte nach Befunden zu kognitiven Lernprozessen gestaltet werden."},
      {name:"Ravin Jesuthasan",source:"mercer",view:"Arbeit lässt sich in Aufgaben zerlegen und mit Fähigkeiten verknüpfen."}
    ],decision:"Welche Arbeitsprobe würde nach 30 Tagen den Unterschied belegen?"},
    {id:"council-resilience",title:"Zukunftsschock: Bestand oder Anpassung?",question:"Ein Chipengpass trifft Produktion und Marge. Wo investierst du zuerst?",tension:"Zusätzlicher Bestand bindet Kapital; Alternativen erfordern Technik- und Skill-Aufbau.",lenses:[
      {name:"IEA",source:"iea",view:"Verarbeitung kritischer Mineralien ist konzentriert; Exportkontrollen können Lieferketten treffen."},
      {name:"Amy Webb",source:"webb",view:"Trends werden erst in Kombination mit Szenarien zum strategischen Entscheidungswerkzeug."},
      {name:"Statistik Austria",source:"statAT",view:"Demografische Veränderungen beeinflussen die längerfristige Verfügbarkeit von Erfahrung und Arbeitskraft."}
    ],decision:"Welche Maßnahme hilft sowohl bei längerer Knappheit als auch bei fallender Nachfrage?"}
  ];
  const journeys=[
    {
      id:"ai",label:"KI verantwortbar einführen",
      question:"Die KI spart Minuten. Erhöht sie den Wert deiner Arbeit?",
      course:"critical-ai",case:"ai-approval",perspectives:["perspective-12","perspective-5","perspective-10"],template:"ai-audit",
      output:"Ein begrenzter KI-Pilot mit Baseline, Qualitätsgrenze und menschlicher Freigabe.",
      mirrorCase:"ai"
    },
    {
      id:"skills",label:"Skills statt Stellen",
      question:"Die Stelle bleibt offen. Welche Arbeit muss trotzdem getan werden?",
      course:"tasks",case:"hidden-skill",perspectives:["perspective-2","perspective-10","perspective-3"],template:"task-map",
      output:"Eine Task- und Skill-Map mit interner Erprobung und prüfbarem Nachweis.",
      mirrorCase:"skills"
    },
    {
      id:"hybrid",label:"Hybrid fair führen",
      question:"Drei Bürotage – aber für welche Aufgaben und für wen?",
      course:"hybrid",case:"remote-career",perspectives:["perspective-8","perspective-5","perspective-11"],template:"hybrid-agreement",
      output:"Ein Team Agreement mit gleichen Entwicklungschancen und 30-Tage-Prüfung.",
      mirrorCase:"hybrid"
    },
    {
      id:"pay",label:"New Pay fair entscheiden",
      question:"Welche Fähigkeiten honorieren wir, und welche Arbeit bleibt unsichtbar?",
      course:"pay",case:"pay-gap",perspectives:["perspective-9","perspective-10","perspective-2"],template:"pay-criteria",
      output:"Ein Vergütungskriterienblatt mit Beteiligung, Rechtsprüfung und Stop-/Go-Regel.",
      mirrorCase:"pay"
    }
  ];
  return {sources,domains,courses,cases,perspectives,skills,templates,councils,sboStages,journeys};
});
