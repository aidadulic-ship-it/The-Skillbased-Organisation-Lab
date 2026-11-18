# Skill-Based Lab · GitHub-Pages-Paket

Dieses Verzeichnis enthält die **öffentliche, statische Demo**. `index.html` ist die Startseite; CSS, JavaScript und Schriften liegen daneben. Es ist kein Build-Schritt nötig.

## Auf GitHub Pages veröffentlichen

1. Ein neues Repository anlegen oder ein bestehendes Repository auswählen.
2. **Den Inhalt dieses Verzeichnisses** in das Stammverzeichnis des Repositorys hochladen. `index.html`, `decision-studio.css`, die sechs JavaScript-Dateien, `.nojekyll` und der Ordner `fonts` müssen auf derselben Ebene bleiben. Die ZIP-Datei selbst nicht als einzige Datei hochladen.
3. Im Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch** wählen. Den Branch (beispielsweise `main`) und den Ordner **`/(root)`** auswählen und speichern.
4. Die von GitHub angezeigte Pages-Adresse öffnen. Bei einem Projekt-Repository ist sie gewöhnlich `https://BENUTZERNAME.github.io/REPOSITORY/`.

Die Schritte entsprechen der [GitHub-Pages-Anleitung](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). GitHub Pages ist öffentlich erreichbar, auch wenn das zugrunde liegende Repository unter bestimmten Tarifen privat ist.

## Was die Demo kann

- Elf Bereiche, darunter Decision Mirror, Skill-Based Organization, Lernwege, Tools, Downloads, Profil und Workshop.
- Die erste Ansicht macht mit „The Skill-Based Organization“ und drei Fragen zu Arbeit, Führung und Organisation neugierig. Nach „Starten“ folgen die ausführliche Erklärung, Entscheidungsdemo, belegte Signale, weitere Themen und sofort die Seitenleiste. Die Navigation ist nur in der ersten Ansicht verborgen.
- Zwanzig digitale Arbeitsblätter mit Checklisten, Text-/JSON-Export, JSON-Import und Druck über den Browser.
- Optionale Spracheingabe, wenn der Browser sie anbietet. Vor dem ersten Diktat erscheint eine Erklärung zur möglichen externen Audioverarbeitung.
- Vier vertiefte, fiktive Entscheidungsfälle mit Optionen, Annahmen, drei Euro-Szenarien und Stop-/Go-Regeln.
- Zwölf kuratierte Kurse und zwölf Skill-Prompts mit konkreten Aufgaben und Qualitätsgrenzen.
- Workshop-Anfragen öffnen nach Konfiguration das E-Mail-Programm. Dazu in `decision-studio-redesign.js` die Konstante `CONTACT_EMAIL` mit einer echten Adresse befüllen. Solange sie leer konfiguriert ist, zeigt die Seite einen Hinweis.

## Grenzen

Die Demo hat **keine Nutzerkonten, keine Datenbank, keinen offenen KI-Coach und keinen eigenen E-Mail-Versand**. Persönliche Eingaben bleiben bis zum Schließen oder Neuladen im Browserfenster, sofern sie nicht als Datei heruntergeladen werden. Bitte keine vertraulichen Personal-, Gesundheits- oder Unternehmensdaten in die öffentliche Demo eintragen oder diktieren. Die genannten Expertinnen und Experten sind Wissensquellen, keine bestätigten Partner.

Für die Schriften und ihre Lizenztexte siehe [THIRD_PARTY.md](THIRD_PARTY.md). Die Quellenprüfung und fachlichen Freigabegrenzen stehen in [QUELLEN_PRUEFEN.md](QUELLEN_PRUEFEN.md).

Die lokalen Prüfungen laufen mit `node check-welcome-gate.cjs` und `node check-executive-quality.cjs`. Diese Prüfdateien werden von der Website nicht geladen.
