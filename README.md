# Skill-Based Lab · GitHub-Pages-Paket

Dieses Verzeichnis enthält die **öffentliche, statische Demo**. `index.html` ist die Startseite; CSS, JavaScript und Schriften liegen daneben. Es ist kein Build-Schritt nötig.

## Auf GitHub Pages veröffentlichen

1. Ein neues Repository anlegen oder ein bestehendes Repository auswählen.
2. **Den Inhalt dieses Verzeichnisses** in das Stammverzeichnis des Repositorys hochladen. `index.html`, die neun Dateien `decision-studio-*`, `.nojekyll` und der Ordner `fonts` müssen auf derselben Ebene bleiben. Die ZIP-Datei selbst nicht als einzige Datei hochladen.
3. Im Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch** wählen. Den Branch (beispielsweise `main`) und den Ordner **`/(root)`** auswählen und speichern.
4. Die von GitHub angezeigte Pages-Adresse öffnen. Bei einem Projekt-Repository ist sie gewöhnlich `https://BENUTZERNAME.github.io/REPOSITORY/`.

Die Schritte entsprechen der [GitHub-Pages-Anleitung](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). GitHub Pages ist öffentlich erreichbar, auch wenn das zugrunde liegende Repository unter bestimmten Tarifen privat ist.

## Was die Demo kann

- Elf Bereiche, darunter Decision Mirror, Skill-Based Organization, Lernwege, Tools, Downloads, Profil und Workshop.
- Die erste Ansicht zeigt ausschließlich die kurze Erklärung mit „Was es ist / was es nicht ist“, einem Beispiel und „Starten“. Nach dem Klick erscheinen Entscheidungsdemo, belegte Signale, weitere Themen und sofort die Seitenleiste. Die Navigation ist nur in der ersten Ansicht verborgen.
- Zwanzig digitale Arbeitsblätter mit Checklisten, Text-/JSON-Export, JSON-Import und Druck über den Browser.
- Optionale Spracheingabe, wenn der Browser sie anbietet. Vor dem ersten Diktat erscheint eine Erklärung zur möglichen externen Audioverarbeitung.
- Workshop-Anfragen öffnen das E-Mail-Programm und sind an `aida.dulic@hotmail.com` adressiert.

## Grenzen

Die Demo hat **keine Nutzerkonten, keine Datenbank, keinen offenen KI-Coach und keinen eigenen E-Mail-Versand**. Persönliche Eingaben bleiben bis zum Schließen oder Neuladen im Browserfenster, sofern sie nicht als Datei heruntergeladen werden. Bitte keine vertraulichen Personal-, Gesundheits- oder Unternehmensdaten in die öffentliche Demo eintragen oder diktieren. Die genannten Expertinnen und Experten sind Wissensquellen, keine bestätigten Partner.

Für die Schriften und ihre Lizenztexte siehe [THIRD_PARTY.md](THIRD_PARTY.md). Für Quellennachweise und die fachlichen Freigabegrenzen gilt die separate Projektmappe; sie ist bewusst nicht Teil des öffentlichen Upload-Pakets.

Die lokale Strukturprüfung läuft mit `node check-welcome-gate.cjs`. Diese Prüfdatei kann im Repository bleiben; sie wird von der Website nicht geladen.
