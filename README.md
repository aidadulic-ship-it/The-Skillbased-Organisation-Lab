# Skill-Based Lab · GitHub-Pages-Paket

Dieses Verzeichnis enthält die **öffentliche, statische Demo**. `index.html` ist die Startseite; CSS, JavaScript und Schriften liegen daneben. Es ist kein Build-Schritt nötig.

## Auf GitHub Pages veröffentlichen

1. Ein neues Repository anlegen oder ein bestehendes Repository auswählen.
2. **Den Inhalt dieses Verzeichnisses** in das Stammverzeichnis des Repositorys hochladen. `index.html`, `decision-studio.css`, alle JavaScript-Dateien, `.nojekyll` sowie die Ordner `fonts` und `assets` müssen erhalten bleiben. Die ZIP-Datei selbst nicht als einzige Datei hochladen.
3. Im Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch** wählen. Den Branch (beispielsweise `main`) und den Ordner **`/(root)`** auswählen und speichern.
4. Die von GitHub angezeigte Pages-Adresse öffnen. Bei einem Projekt-Repository ist sie gewöhnlich `https://BENUTZERNAME.github.io/REPOSITORY/`.

Die Schritte entsprechen der [GitHub-Pages-Anleitung](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). GitHub Pages ist öffentlich erreichbar, auch wenn das zugrunde liegende Repository unter bestimmten Tarifen privat ist.

## Was die Demo kann

- Ein Weg in sechs Stufen: Start, Fall wählen, Entscheiden, Widerstand üben, Mitnehmen und Workshop anfragen. Die Bibliotheksbereiche bleiben unter „Nach dem Workshop“ erreichbar.
- Der erste Bildschirm zeigt einen klar sichtbaren, KI-generierten Ferrari neben Tempo 30. Eine eigene Bildfassung hält das Auto auch auf Mobilgeräten sichtbar. Der Text ist auf eine provokante Frage und einen 30-Sekunden-Check reduziert.
- Vier fiktive Bremsklötze reagieren sofort mit einer kurzen Gegenfrage. Beim Wechsel ins Lab wird die Beispielfrage übernommen und der passende Demo-Fall vorausgewählt. Die Person kann die Frage ersetzen. Es erfolgt kein Datenversand.
- „Was kostet Tempo 30?“ öffnet einen lokalen Euro-Check im Dialog. WEF- und ILO-Zahlen sind kompakt und direkt verlinkt. Sie beschreiben Arbeitgebererwartung beziehungsweise GenAI-Exposition. Alle Euro-Werte sind Demo/fiktiv, kein ROI und keine Verlustprognose.
- Nach „Starten“ erscheinen die Seitenleiste und der sechsstufige Lernweg. Die freie Entscheidungsfrage steht jetzt dort; ihr regelbasierter Check und die druckbare Vorlage funktionieren weiter.
- Zwanzig digitale Arbeitsblätter mit Checklisten, Text-/JSON-Export, JSON-Import und Druck über den Browser.
- Optionale Spracheingabe, wenn der Browser sie anbietet. Vor dem ersten Diktat erscheint eine Erklärung zur möglichen externen Audioverarbeitung.
- Vier vertiefte, fiktive Entscheidungsfälle mit Optionen, Annahmen, drei Euro-Szenarien und Stop-/Go-Regeln.
- In „Fall wählen“ einen Vorab-Fragebogen für den echten Firmenfall. Pflicht sind Fall, Ziel, zwei Messgrößen, Name und Funktion der verantwortlichen Person sowie Pilotbereich. Ausgangswerte und Prüfschwellen dürfen offenbleiben. JSON und lesbare Textfassung werden getrennt heruntergeladen; JSON kann wieder eingelesen werden. Vor dem Ersetzen vorhandener Angaben wird ausdrücklich gefragt.
- Eine freie Einstiegsfrage mit regelbasiertem Fakten-, Annahmen- und Wertecheck. Drei Beispielchips und ein durchgespielter Fall zeigen den Weg. Die Eingabe wird nur im Browserfenster verarbeitet; es gibt keinen KI-Aufruf.
- Einen veränderbaren Euro-Check mit drei Szenarien und sichtbarer Formel. Er ist ausdrücklich kein ROI-Nachweis.
- Eine druckbare A4-Entscheidungsvorlage und ein fiktives Drei-Runden-Planspiel „Der Vorstand widerspricht“.
- Zwölf kuratierte Kurse und zwölf Skill-Prompts mit konkreten Aufgaben und Qualitätsgrenzen.
- Workshop-Anfragen öffnen nach Konfiguration das E-Mail-Programm. Solange keine echte Adresse hinterlegt ist, zeigt die Seite einen Hinweis.

## E-Mail eintragen

In `decision-studio-redesign.js` die eine Konstante `CONTACT_EMAIL` mit der Workshop-Adresse befüllen. Danach die Workshop-Anfrage lokal testen. Die Seite verschickt selbst keine E-Mail und speichert die Eingaben nicht auf einem Server.

Im Block „Warum es das Lab gibt“ bleiben `[TEXT AIDA]` und `[VIDEO-LINK]` bis zur Lieferung der Originalinhalte als erklärte Platzhalter stehen. Sie werden in `decision-studio-executive.js` ersetzt. Ohne Videolink erscheint kein leerer Link.

## Grenzen

Die Demo hat **keine Nutzerkonten, keine Datenbank, keinen offenen KI-Coach und keinen eigenen E-Mail-Versand**. Persönliche Eingaben bleiben bis zum Schließen oder Neuladen im Browserfenster, sofern sie nicht als Datei heruntergeladen werden. Bitte keine vertraulichen Personal-, Gesundheits- oder Unternehmensdaten in die öffentliche Demo eintragen oder diktieren. Die genannten Expertinnen und Experten sind Wissensquellen, keine bestätigten Partner.

Der Vorab-Fragebogen versendet keine Datei selbst. Die Firma hängt die heruntergeladene JSON- oder Textdatei eigenständig an ihre E-Mail an. Für den späteren Import die JSON-Datei in „Fall wählen“ auswählen. Andere oder beschädigte JSON-Dateien werden abgewiesen.

Für die Schriften und ihre Lizenztexte siehe [THIRD_PARTY.md](THIRD_PARTY.md). Die Quellenprüfung und fachlichen Freigabegrenzen stehen in [QUELLEN_PRUEFEN.md](QUELLEN_PRUEFEN.md).

Die lokalen Prüfungen laufen mit `node check-welcome-gate.cjs`, `node check-executive-quality.cjs`, `node check-weg.cjs`, `node check-vorab-fragebogen.cjs`, `node check-auftakt.cjs`, `node check-storyline.cjs` und `node check-hero-provocation.cjs`. Diese Prüfdateien werden von der Website nicht geladen.
