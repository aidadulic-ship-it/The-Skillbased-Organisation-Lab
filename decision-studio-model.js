(function (root) {
  "use strict";

  const cases = [
    {
      id: "ai",
      index: "01",
      category: "KI & Produktivität",
      title: "Die KI spart Zeit. Wer gewinnt sie?",
      dilemma: "Ein fiktives Serviceteam soll mit generativer KI schneller werden. Der Anbieter verspricht 30 Prozent Zeitgewinn, doch Fehler, Nacharbeit und zusätzliche Arbeitslast sind im eigenen Betrieb noch nicht gemessen.",
      question: "Welche Investition kannst du verantworten, bevor Qualität und tatsächlich nutzbare Zeit bekannt sind?",
      evidence: "Die ILO misst Exposition von Aufgaben gegenüber GenAI. Daraus folgt weder ein lokaler Produktivitätsgewinn noch ein Stellenabbau.",
      sourceLabel: "ILO · Generative AI and jobs, 2025",
      sourceUrl: "https://www.ilo.org/publications/generative-ai-and-jobs-2025-update",
      marker: "Produktivität ≠ Wirkung",
      flow: [
        {label:"Arbeitsaufgabe",value:"Kundenanfragen zuverlässig beantworten"},
        {label:"Kritischer Skill",value:"KI-Ausgaben auf Fehler und Qualität prüfen"},
        {label:"Euro-Frage",value:"Wie viel Zeit bleibt nach Nacharbeit wirklich nutzbar?"}
      ],
      facts: [["Anbieterbehauptung", "30 % Zeit"], ["Qualitätsbaseline", "offen"], ["Realer Euro-Nutzen", "offen"]]
    },
    {
      id: "skills",
      index: "02",
      category: "Skills & Mobilität",
      title: "Die Stelle ist offen. Die Arbeit wartet.",
      dilemma: "In einem fiktiven österreichischen Zulieferbetrieb können nur zwei Menschen eine kritische Fehlerdiagnose durchführen. Eine Person geht in neun Monaten; eine identische Nachbesetzung ist seit Monaten nicht gelungen.",
      question: "Suchst du weiter nach einem Titel, oder zerlegst du zuerst die Aufgabe in nachweisbare Fähigkeiten und Alternativen?",
      evidence: "Die OECD beschreibt Skills-first als Veränderung von Auswahl, Lernen, Karriere und Leistungsbeurteilung – nicht nur von Stellenanzeigen.",
      sourceLabel: "OECD · A Skills-First Labour Market, 2026",
      sourceUrl: "https://www.oecd.org/en/publications/a-skills-first-labour-market_2e1b85f0-en/full-report/promoting-skills-first-hiring-and-talent-management_81392a48.html",
      marker: "Rolle ≠ Fähigkeit",
      flow: [
        {label:"Arbeitsaufgabe",value:"Kritische Fehlerdiagnosen absichern"},
        {label:"Kritischer Skill",value:"Diagnose unter realen Bedingungen nachweisen"},
        {label:"Euro-Frage",value:"Was kosten Ausfall, Lernzeit und externe Suche?"}
      ],
      facts: [["Kritische Expertise", "2 Personen"], ["Zeit bis Übergabe", "9 Monate"], ["Vertretungsnachweis", "offen"]]
    },
    {
      id: "hybrid",
      index: "03",
      category: "Hybrid & Vertrauen",
      title: "Drei Bürotage. Zwei Realitäten.",
      dilemma: "Ein fiktives Unternehmen verlangt drei gemeinsame Bürotage. Wissensarbeit kann teilweise mobil erledigt werden, Kundendienst und Produktion kaum. Die Teams melden unklare Erreichbarkeit und ungleiche Entwicklungschancen.",
      question: "Welche Regeln verbessern Zusammenarbeit und Fairness, ohne Leistung oder psychische Gesundheit zu unterstellen?",
      evidence: "Ein randomisierter Hybridversuch fand in einem konkreten Technologieunternehmen weniger Fluktuation. Die Wirkung ist nicht auf jede Tätigkeit übertragbar.",
      sourceLabel: "Bloom, Han & Liang · Nature, 2024",
      sourceUrl: "https://www.nature.com/articles/s41586-024-07500-2",
      marker: "Ort ≠ Leistung",
      flow: [
        {label:"Arbeitsaufgabe",value:"Zusammenarbeit und Kundenübergaben sichern"},
        {label:"Kritischer Skill",value:"Asynchron koordinieren und fair führen"},
        {label:"Euro-Frage",value:"Welche Kosten entstehen durch Reibung und Fluktuation?"}
      ],
      facts: [["Büroregel", "3 Tage"], ["Tätigkeiten", "unterschiedlich"], ["Leistungsbaseline", "offen"]]
    },
    {
      id: "pay",
      index: "04",
      category: "New Pay & Fairness",
      title: "Neue Skills. Faire Vergütung?",
      dilemma: "Demo/fiktiv: Ein Unternehmen plant Zuschläge für sichtbare KI-Projekte. Andere notwendige Beiträge werden bisher nicht nach vergleichbaren Kriterien bewertet.",
      question: "Welche Vergütungsregel ist nachvollziehbar, fair und vor Einführung rechtlich geprüft?",
      evidence: "Die EU-Entgelttransparenzrichtlinie setzt einen Rechtsrahmen. Sie belegt keinen wirtschaftlichen Nutzen eines bestimmten New-Pay-Modells.",
      sourceLabel: "EUR-Lex · Richtlinie (EU) 2023/970",
      sourceUrl: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32023L0970",
      marker: "Skill-Prämie ≠ Fairness",
      flow: [
        {label:"Arbeitsaufgabe",value:"Vergütungskriterien für vergleichbare Arbeit prüfen"},
        {label:"Kritischer Skill",value:"Beitrag und Verantwortung nachvollziehbar bewerten"},
        {label:"Euro-Frage",value:"Welche Zusatzkosten und welche Wirkungen sind nur angenommen?"}
      ],
      facts: [["Neue Zuschläge", "geplant"], ["Vergleichsgruppen", "offen"], ["Rechtsprüfung", "offen"]]
    }
  ];

  const paths = {
    ai: [
      { title: "KI sofort breit ausrollen", description: "Schnelle Skalierung verspricht Tempo. Fehler, Datenschutz und tatsächlicher Wert bleiben ungeprüft.", challenge: "Der erste Kunde erhält eine falsche Lieferzusage aus einem KI-Entwurf. Die Finanzleitung fragt: Welche Qualitätsgrenze hättest du vorher festgelegt, und wie rechtfertigst du die Kosten ohne lokale Baseline?" },
      { title: "Begrenzten KI-Pilot starten", description: "Eine Aufgabe, Vergleichsfälle, Qualitätsprüfung und Stop-Regel vor jeder Skalierung.", challenge: "Im Pilot wird die Antwortzeit kürzer, aber die Nacharbeit steigt. Die Serviceleitung fragt: Welche Messung entscheidet jetzt über Stop, Änderung oder Ausbau – und wer trägt die zusätzliche Arbeit?" },
      { title: "Zuerst den Prozess neu gestalten", description: "Fehlerquellen und Zuständigkeiten ändern, bevor ein neues Werkzeug eingeführt wird.", challenge: "Der Großkunde fordert kurzfristig schnellere Antworten. Die Geschäftsführung fragt: Wie sicherst du die Leistung jetzt, und welches Signal würde dich später doch zu einem KI-Test bewegen?" }
    ],
    skills: [
      { title: "Extern weiter rekrutieren", description: "Spezialisierte Erfahrung einkaufen; Suchdauer und Abhängigkeit von Einzelpersonen bleiben offen.", challenge: "Nach weiteren drei Monaten ist die Stelle noch unbesetzt. Die Produktionsleitung fragt: Welche kritische Aufgabe bleibt liegen, und wie schützt du Lieferfähigkeit bis zur Besetzung?" },
      { title: "Interne Vertretung aufbauen", description: "Diagnoseaufgaben, Übungszeit und beobachtbare Nachweise für zwei weitere Personen festlegen.", challenge: "Die Fachkraft kann wegen hoher Auslastung kaum anleiten. HR fragt: Welche Arbeit nimmst du ihr ab, damit Lernen real stattfinden kann, und wann ist Vertretung nachgewiesen?" },
      { title: "Den Engpass im Prozess verringern", description: "Produkt, Dokumentation und Eskalation so ändern, dass weniger Fälle Spezialwissen verlangen.", challenge: "Eine seltene, sicherheitskritische Störung bleibt trotzdem bestehen. Die Geschäftsführung fragt: Wer übernimmt diese Verantwortung, und woran erkennst du, dass Vereinfachung kein Risiko verdeckt?" }
    ],
    hybrid: [
      { title: "Drei Bürotage für alle festlegen", description: "Eine einheitliche Regel erleichtert Planung; Tätigkeiten und Fairness unterscheiden sich.", challenge: "Produktion und Kundendienst sehen weiterhin ungleiche Chancen, während Wissensarbeit Präsenz ohne Nutzen meldet. HR fragt: Welche Aufgabe braucht gemeinsamen Ort, und wie begründest du die Regel für alle Gruppen?" },
      { title: "Teamregeln nach Aufgaben vereinbaren", description: "Koordination, Erreichbarkeit, Lernzeit und Präsenz werden je Tätigkeit geklärt und überprüft.", challenge: "Ein Projektteam hält seine Vereinbarung ein, doch neue Kolleginnen verlieren informelles Lernen. Die Führungskraft fragt: Welche Lernkontakte planst du bewusst, ohne alle Tage zentral vorzuschreiben?" },
      { title: "Maximale Ortsfreiheit einführen", description: "Menschen wählen den Ort weitgehend selbst; Übergaben und Zugang zu Entwicklung müssen gesichert werden.", challenge: "Kundenübergaben verzögern sich und ortsgebundene Kolleginnen empfinden die Regel als unfair. Die Geschäftsführung fragt: Welche gemeinsame Verfügbarkeit ist notwendig, und wie prüfst du Leistung unabhängig vom Arbeitsort?" }
    ],
    pay: [
      { title: "Skill-Zuschläge sofort einführen", description: "Schnelles Signal für knappe Fähigkeiten; Vergleichbarkeit und Benachteiligung bleiben offen.", challenge: "Eine Beschäftigtengruppe fragt nach den Kriterien. Welche vergleichbare Arbeit wurde übersehen, und wer prüft den Rechtsrahmen?" },
      { title: "Kriterien gemeinsam prüfen", description: "Aufgaben, Verantwortung und Fairness werden vor einer Änderung transparent bewertet.", challenge: "Ein Schlüsselteam fordert sofort eine Zusage. Welche befristete Regel kannst du erklären, ohne die Gleichbehandlung zu umgehen?" },
      { title: "Vergütungsänderung vertagen", description: "Bestehende Regeln bleiben vorerst; mögliche Schieflagen und Bindungsrisiken bleiben bestehen.", challenge: "Zwei Personen kündigen einen Wechsel an. Welchen überprüfbaren Zeitplan und welche Zwischenlösung bietest du an?" }
    ]
  };

  function getCase(id) {
    return cases.find(function (item) { return item.id === id; }) || null;
  }

  function getOptions(id) {
    return paths[id] || [];
  }

  function getChallenge(id, optionIndex) {
    const option = getOptions(id)[optionIndex];
    return option ? option.challenge : null;
  }

  const api = { cases: cases, getCase: getCase, getOptions: getOptions, getChallenge: getChallenge };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.DecisionStudioModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this);
