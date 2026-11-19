# Änderungen · 18. November 2026

## Korrigierter Ferrari-Einstieg · 19. November 2026

- Nach Nutzerfeedback wurde der bisherige lange Auftakt durch einen kurzen, provokanten ersten Bildschirm ersetzt. Ein neu generiertes Ferrari-Motiv ist auf Desktop und Mobil sichtbar; die mobile Fassung ist eigens komponiert.
- Vier sofort sichtbare Bremsklötze zeigen nach Klick eine prägnante Gegenfrage. Der gewählte fiktive Fall bleibt beim Übergang ins Lab erhalten. Der Euro-Check liegt in einem optionalen Dialog, statt den ersten Bildschirm zu überladen.
- Die globalen WEF-/ILO-Signale stehen kompakt unter dem Hero mit Quellen und Grenzen. Alle Beispiel- und Euro-Werte bleiben als Demo/fiktiv markiert.
- Die Anforderungen haben sich geändert: `check-welcome-gate.cjs` Zeilen 10 und 12, `check-auftakt.cjs` Zeilen 7–19 sowie `check-storyline.cjs` Zeilen 7–13 prüfen jetzt den kurzen Hero und die direkte Interaktion. Der neue Test `check-hero-provocation.cjs` lief vor der Umsetzung rot. Kein Test wurde geändert, um einen Produktfehler zu verdecken.

## Neuer Auftakt · 19. November 2026

- Die Storyline ist nun verzweigt: Vier fiktive Engpässe öffnen jeweils einen eigenen Prüfpfad mit Beobachtung, Annahme, Gegenargument und Geschäftsleitungsfrage. Die Wahl setzt den passenden Demo-Fall und übernimmt die editierbare Beispielfrage nach „Starten“.
- `check-storyline.cjs` lief vor der Umsetzung rot und prüft jetzt alle vier Pfade und die Übergabe. Der Browser-Klicktest hat jede Wahl, den Übergang und mobile Breiten geprüft. Die bestehenden Tests blieben grün.
- Die erste Ansicht ist jetzt eine eigene, scrollbare Einstiegsseite mit Tempo-30-Metapher, zwei KI-generierten Fotovisualisierungen und ruhiger Bewegung. Bei reduzierter Bewegung bleiben die Bilder still.
- Zwei direkt verlinkte Primärquellen beschreiben erwartete Skill-Veränderung und GenAI-Exposition. Eine OECD-Quelle führt zur Skill-Based-Organization-Perspektive. Diese Zahlen werden nicht als lokale Wirkung ausgegeben.
- Ein interaktiver Euro-Check rechnet ausschließlich mit sichtbaren Demo-Annahmen: Personen × gebundene Wochenstunden × Stundenwert × 46 angenommene Arbeitswochen. Er ist ausdrücklich kein ROI und keine Verlustprognose.
- Die bestehende Entscheidungsfrage und ihr druckbares Ergebnis wurden hinter „Starten“ verschoben. Der anschließende sechs Stufen umfassende Weg und die Seitenleiste bleiben erhalten.
- Der neue Test `check-auftakt.cjs` wurde zuerst rot und danach grün ausgeführt. Der bestehende H1-Test in `check-welcome-gate.cjs`, Zeile 10, wurde wegen des freigegebenen neuen Auftakts geändert. Die übrigen Prüfungen blieben unverändert.

## Schritt 2 · 19. November 2026

- In „Fall wählen“ steht ein Vorab-Fragebogen für genau einen echten Firmenfall. Die vier Demo-Fälle bleiben als fiktive Aufwärmübung erhalten.
- Fall, Ziel, zwei Messgrößen, Name und Funktion der verantwortlichen Person sowie Pilotbereich sind Pflicht. Dritte Messgröße, Ausgangswerte und Prüfschwellen sind freiwillig.
- JSON und lesbare Textfassung werden getrennt heruntergeladen. Der JSON-Import prüft Art, Version und Pflichtfelder. Vorhandene Eingaben werden nur nach ausdrücklicher Bestätigung ersetzt.
- Die vorhandene Datei-Download-Funktion wird auch vom Fragebogen genutzt. Es gibt keinen Server, kein Konto, keinen automatischen E-Mail-Versand und keine dauerhafte Speicherung im Browser.
- Ein neuer Test prüft Daten, Exporte, Importgrenzen und die Einbindung. Ein Browser-Klick-Test hat Pflichtfelder, Downloads, Import, Abbruch und die Ansichten bei 360, 390, 768 und 1280 px geprüft.

- Die vier Euro-Fälle variieren jetzt Menge, Einheitswert, Pilotkosten und Risiko-/Nacharbeitskosten je Szenario. Begründungen und ein Gegenfaktum sind sichtbar. Alle Beträge sind Demo/fiktiv; die Kennzeichnung lautet „Euro-Check, kein ROI“.
- Kurse, Decision Mirror und Fälle beziehen ihre Quellen aus derselben Bibliothek. Die offenen Nachlesestellen für Nature und den Stanford AI Index sind in `QUELLEN_PRUEFEN.md` bezeichnet.
- Die Einstiegsfrage zerlegt eine Entscheidung in Fakt/Datenlücke, Annahme, Wert und Gegenargument. Sie stellt drei Prüffragen, auch bei Themen außerhalb der vier Fälle. Ein kurzer Text erhält eine konkrete Rückfrage.
- Der Euro-Regler berechnet drei fiktive Varianten live. Die druckbare A4-Vorlage enthält Optionen, Annahmen, Formel, Gegenfaktum, Gruppen, Stop-/Go-Regeln und Quelle beziehungsweise eine sichtbare Quellenlücke.
- „Der Vorstand widerspricht“ bietet drei Entscheidungsrunden mit sichtbaren Folgen für Kosten, Qualität, Vertrauen und Risiko. Der geführte Beispiel-Fall öffnet denselben Ablauf.
- Der Gründerinnenblock beschreibt die späteren Originalinhalte, solange Text und Video fehlen. Es gibt dort keinen leeren Link.
- Die Ansichten wurden bei 360, 390 und 768 px auf Überläufe und Tippflächen geprüft. Reduzierte Bewegung und A4-Druck wurden im Browser geprüft.
- Vier fiktive Flaggschiff-Fälle zu KI-Einführung, Skills statt Stellen, hybrider Führung und New Pay. Jeder Fall enthält zwei Optionen, ein Annahmenregister, drei nachvollziehbare Euro-Szenarien, ein Gegenargument, betroffene Gruppen und Stop-/Go-Regeln für Tag 30 und 90.
- Der Kurskatalog enthält zwölf ausgewählte 3C-Kurse. Jeder hat eine eigene praktische Aufgabe. Die zwölf Skill-Prompts enthalten je eine Qualitätsgrenze, Antwortstruktur und Stop-Regel.
- Anbieter-Visionäre sind aus den Expertenperspektiven, Councils und Lernwegen entfernt. Die vier Lernwege führen zu den vier Flaggschiff-Fällen.
- Die CSS-Regeln liegen in einer Datei. Die erklärende Ansicht nach „Starten“ verwendet die UN-LEARN-IT-Farben mit gut lesbarem Kontrast. Doppelte Grundregeln für Hauptbereich und Seitenleiste sowie ungenutzte Farbvariablen wurden entfernt.
- Name und Workshop-Anfrage sind vereinheitlicht. Die Kontaktadresse wird ausschließlich in einer Konstante konfiguriert. Ohne echte Adresse zeigt die Demo einen Hinweis.
- Die lokalen Prüfungen kontrollieren Fälle, Kurse, Prompts, interne Links, IDs, leere Karten, Produktname, Navigation, Kontrast und sichtbaren Tastaturfokus.
- Die Seitenleiste folgt nun dem Lernweg: Start, Skill-Based Organization, Profil, Lernen, Tools und Downloads; danach Planspiel, Grill Me, Europa/AT, Quellen und Workshop.

## Vor Veröffentlichung entscheiden

1. Die echte Workshop-Kontaktadresse in `CONTACT_EMAIL` eintragen.
2. Die zwei eingeschränkt abrufbaren Quellen in `QUELLEN_PRUEFEN.md` manuell gegenlesen.
3. Die fachliche Freigabe der vier fiktiven Business Cases, rechtlichen Aussagen und Quelleninterpretationen organisieren.
4. Originaltext von Aida und Videolink für den Gründerinnenblock liefern.
