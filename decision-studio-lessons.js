(function(root,factory){
  const library=typeof module==="object"&&module.exports?require("./decision-studio-library.js"):root.DecisionStudioLibrary;
  const lessons=factory(library.sources);
  if(typeof module==="object"&&module.exports)module.exports=lessons;
  root.DecisionStudioLessons=lessons;
})(typeof globalThis!=="undefined"?globalThis:this,function(sources){
  const lessons=[
    {
      id: "judgement",
      title: "Urteilskraft unter Unsicherheit",
      compress: [
        "Ein Trend ist ein Signal, noch keine Prognose für dein Unternehmen.",
        "Trenne belegte Beobachtung, Annahme und Werturteil, bevor du eine Maßnahme beschließt.",
        "Suche eine plausible Gegenperspektive und definiere, was deine Meinung ändern würde."
      ],
      compile: "Ein Wettbewerber nennt 40 % KI-Effizienzgewinn. Was gehört zuerst in deine Entscheidungsvorlage?",
      options: ["Den Wert als Ziel für alle Teams übernehmen", "Die Zahl als fremde Behauptung markieren und einen eigenen Vergleichstest planen", "Die Entscheidung vertagen, bis jede Unsicherheit verschwindet"],
      answer: 1,
      feedback: "Richtig ist der eigene Vergleichstest. Ein fremder Wert beschreibt weder deine Aufgaben noch Qualität, Kosten und Folgen im eigenen Betrieb.",
      consolidate: ["Woran erkennst du eine Annahme?", "Welcher Befund würde deinen Plan ändern?", "Wer trägt eine Folge, die im Business Case fehlt?"],
      recallAnswers: ["Eine Annahme braucht einen eigenen Test und ist noch kein beobachteter Fakt.", "Lege vorab einen Messpunkt und eine Schwelle fest, bei der du den Plan revidierst.", "Prüfe Beschäftigte, Kundschaft, Lieferanten und Teams außerhalb des unmittelbaren Budgets."],
      transfer: "Schreibe für eine anstehende Entscheidung je einen Satz zu Fakt, Annahme und Widerlegung.",
      sourceKey: "oecdForesight"
    },
    {
      id: "health",
      title: "Gesunde Arbeit gestalten",
      compress: [
        "Psychische Belastung entsteht auch durch Arbeitsmenge, Kontrolle, Unterstützung und Fairness.",
        "Psychologische Sicherheit erleichtert das Ansprechen von Fehlern; sie ersetzt keine klare Verantwortung.",
        "Stärken und Sinn können helfen. Chronische Überlastung braucht Änderungen an Aufgaben und Prioritäten."
      ],
      compile: "Ein Team meldet dauerhafte Überlastung. Welche erste Maßnahme prüft die Arbeitsursache?",
      options: ["Alle zu einem Resilienztraining verpflichten", "Prioritäten und Arbeitsmenge gemeinsam prüfen und einen Engpass verändern", "Die Meldung als individuelle Schwäche behandeln"],
      answer: 1,
      feedback: "Die Arbeitsbedingungen gehören in die Prüfung. Individuelle Unterstützung kann ergänzen, aber eine zu hohe Last nicht allein beheben.",
      consolidate: ["Welche Belastung erzeugt das System?", "Wie kann eine Führungskraft Widerspruch sicher aufnehmen?", "Welche Maßnahme prüfst du nach 30 Tagen?"],
      recallAnswers: ["Prüfe Arbeitsmenge, Planbarkeit, Kontrolle, Unterstützung und Fairness.", "Dank für den Hinweis, sachliche Klärung und verlässliche Rückmeldung.", "Eine konkrete Änderung an Priorität oder Prozess plus Belastungs- und Qualitätsmaß."],
      transfer: "Wähle eine wiederkehrende Überlastungsquelle und formuliere eine organisatorische Änderung mit Verantwortlichen.",
      sourceKey: "who"
    },
    {
      id: "leadership",
      title: "Führung als Entscheidungsdesign",
      compress: [
        "Führung gibt Richtung, Entscheidungsspielraum und eine verlässliche Eskalation.",
        "In hybriden Teams müssen Information, Rückmeldung und Chancen für alle zugänglich sein.",
        "Eine gute Gegenfrage prüft die Sache, nicht den Wert der Person."
      ],
      compile: "Eine Kollegin meldet einen Fehler, der eine Lieferzusage gefährdet. Was ist die stärkste erste Reaktion?",
      options: ["Sofort die schuldige Person benennen", "Hinweis würdigen, Fakten und Unsicherheit trennen, nächste Prüfung und Rückmeldung zusagen", "Das Problem ignorieren, bis es gesichert ist"],
      answer: 1,
      feedback: "Die Meldung wird ernst genommen, ohne voreilig zu urteilen. Der nächste Prüfschritt und eine Rückmeldung verbinden Sicherheit mit Verantwortung.",
      consolidate: ["Wer darf welche Entscheidung treffen?", "Was ist der Eskalationsweg?", "Wie erfährt das Team, was aus einem Einwand wurde?"],
      recallAnswers: ["Entscheidungsrechte müssen zur Aufgabe und zum Risiko passen.", "Ein benannter Kanal mit Reaktionszeit und verantwortlicher Person.", "Durch sichtbare Rückmeldung zu Fakten, Maßnahme und offenem Punkt."],
      transfer: "Formuliere für dein Team eine 60-Sekunden-Antwort auf eine kritische Fehlermeldung.",
      sourceKey: "edmondson"
    },
    {
      id: "learning",
      title: "Skills sichtbar lernen",
      compress: [
        "Ein Kurstitel zeigt Teilnahme. Eine Arbeitsprobe zeigt beobachtbares Können.",
        "Kurze Abrufübungen, Feedback und spätere Anwendung unterstützen den Transfer.",
        "Skill-Profile brauchen Kontext und Belege; ein einzelner Gesamtwert verdeckt beides."
      ],
      compile: "Eine Person hat ein KI-Seminar besucht. Welcher Beleg zeigt die Anwendung besser?",
      options: ["Die Teilnahmebestätigung allein", "Eine geprüfte Task-Map mit Qualitätskriterien und dokumentiertem Praxistest", "Die Anzahl konsumierter Videominuten"],
      answer: 1,
      feedback: "Die Arbeitsprobe macht Aufgabe, Qualitätsmaß und tatsächliche Anwendung sichtbar. Teilnahme und Lernzeit allein beweisen diese Fähigkeit nicht.",
      consolidate: ["Welches Können ist beobachtbar?", "Wie wird es geübt?", "Woran lässt sich Anwendung nachweisen?"],
      recallAnswers: ["Beschreibe eine Handlung in einem bestimmten Arbeitskontext.", "Mit einer Aufgabe, Feedback und erneuter Anwendung.", "Durch eine datierte Arbeitsprobe mit Qualitätskriterien."],
      transfer: "Beschreibe einen Skill als Handlung, Kontext und prüfbaren Beleg.",
      sourceKey: "oecdSkills"
    },
    {
      id: "systems",
      title: "Arbeitsregeln neu entwerfen",
      compress: [
        "Zerlege Stellen zuerst in Aufgaben, Qualitätsanforderungen und benötigte Skills.",
        "Arbeitszeit, Arbeitsort und Vergütung müssen zur Aufgabe und zu fairen Chancen passen.",
        "Performance Reviews brauchen beobachtbares Verhalten und Wirkung statt bloßer Präsenz."
      ],
      compile: "Ein Unternehmen führt Shared Desk für alle ein. Was muss vor dem Beschluss geprüft werden?",
      options: ["Nur die Zahl freier Schreibtische", "Aufgaben, Koordination, Barrierefreiheit, Vertraulichkeit und Chancen ortsgebundener Teams", "Ob Führungskräfte das Modell persönlich mögen"],
      answer: 1,
      feedback: "Ein Arbeitsort ist Teil des Arbeitssystems. Eine Flächenersparnis allein zeigt weder Produktivität noch Fairness oder Gesundheit.",
      consolidate: ["Welche Aufgaben brauchen welchen Ort?", "Was gilt als Leistung?", "Welche Gruppe könnte übersehen werden?"],
      recallAnswers: ["Prüfe Konzentration, Zusammenarbeit, Material, Kundenkontakt und Vertraulichkeit.", "Vereinbarte Qualität und Wirkung, nicht reine Sichtbarkeit.", "Etwa ortsgebundene Beschäftigte oder Personen mit Barrierefreiheitsbedarf."],
      transfer: "Nimm eine Rolle und notiere drei Aufgaben, ein Qualitätsmaß und die dafür nötige Arbeitsumgebung.",
      sourceKey: "bloom"
    },
    {
      id: "futures",
      title: "Zukunftsschocks in Entscheidungen übersetzen",
      compress: [
        "Chips, Energie, Rohstoffe und Konflikte beeinflussen Lieferfähigkeit und verfügbare Skills.",
        "Ein Szenario ist ein Prüfrahmen, keine Vorhersage.",
        "Robuste Schritte funktionieren unter mehreren plausiblen Zukünften."
      ],
      compile: "Ein kritischer Chip wird knapp. Welche Antwort ist für ein KMU am robustesten?",
      options: ["Eine einzige Lieferprognose als sicher behandeln", "Abhängigkeiten, Alternativen und interne Fähigkeiten für zwei Szenarien prüfen", "Nur den Einkaufspreis betrachten"],
      answer: 1,
      feedback: "Der Szenariovergleich macht Abhängigkeiten und Handlungsoptionen sichtbar. Lieferzeit, Qualifikation und Kundenwirkung gehören gemeinsam in die Entscheidung.",
      consolidate: ["Welche externe Abhängigkeit ist kritisch?", "Welche Fähigkeit mindert die Folgen?", "Welcher Schritt hilft in mehr als einem Szenario?"],
      recallAnswers: ["Die Abhängigkeit mit großem Einfluss und wenigen Ersatzwegen.", "Etwa Umplanung, alternative Beschaffung oder technisches Umstellen.", "Ein Schritt, der auch bei anderer Nachfrage oder längerer Lieferzeit nützt."],
      transfer: "Skizziere zwei plausible Störungen und eine Maßnahme, die in beiden nützlich ist.",
      sourceKey: "iea"
    }
  ];
  lessons.forEach(lesson=>{
    lesson.sourceLabel=sources[lesson.sourceKey].label;
    lesson.sourceUrl=sources[lesson.sourceKey].url;
  });
  return {lessons, getLesson(id){return lessons.find(lesson=>lesson.id===id)||null;}};
});
