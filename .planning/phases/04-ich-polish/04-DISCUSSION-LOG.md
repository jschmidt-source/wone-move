# Phase 4: Ich + Polish + Kosteneinschätzung - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-08
**Phase:** 04-ich-polish
**Areas discussed:** Ich-Tab Struktur, KI Chatbot Modell, Premium Paywall Route, Einstellungen Edge Cases

---

## Ich-Tab Struktur

### Q1: Was zeigt der Ich-Tab beim Öffnen?

| Option | Description | Selected |
|--------|-------------|----------|
| Profil-Screen direkt | Tab landet auf Profil/Mein Umzug. Settings, Chatbot und Dokumente über Icons/Links im Header oder Sektionen erreichbar. | ✓ |
| Hub-Screen mit Kacheln | Eigener "Mein Bereich" Hub mit 4 Kacheln. Extra Screen, mehr Navigation-Tiefe. | |
| Profil + scrollable Sections | Profil oben, darunter scrollbare Sektionen für alle Features. Ein langer Screen. | |

**User's choice:** Profil-Screen direkt

---

### Q2: Wie kommt der User zu Chatbot, Dokumente und Einstellungen?

| Option | Description | Selected |
|--------|-------------|----------|
| Header-Icons | 2 Header-Icons: 💬 (Chatbot) + ⚙️ (Einstellungen). Dokumentenspeicher als Card-Link auf Profil-Screen. | ✓ |
| Profil-Screen Action List | Liste mit Zeilen unterhalb Profil-Infos: KI Chatbot >, Dokumente >, Einstellungen >. | |
| You decide | Claude wählt das sinnvollste Layout. | |

**User's choice:** Header-Icons

---

### Q3: Push Benachrichtigungen — wie wird das geöffnet?

| Option | Description | Selected |
|--------|-------------|----------|
| Toggle öffnet Modal/Sheet | Toggle-Switch in Einstellungen. Aktivieren öffnet Bottom Sheet mit iOS-Dialog Mock + Reminder-Vorschau. | ✓ |
| Eigener Sub-Screen /ich/push | Toggle navigiert zu separatem Push-Screen. | |

**User's choice:** Toggle öffnet Modal/Sheet

---

## KI Chatbot Modell

### Q1: Wie sieht der Chat beim Öffnen aus?

| Option | Description | Selected |
|--------|-------------|----------|
| Pre-filled History | Chat öffnet mit 3 fertigen Exchanges sichtbar. Input-Feld aktiv. 4. Absenden → Paywall. | ✓ |
| Interactive Simulation | Chat startet leer. User tippt, Antworten erscheinen animiert. Aufwendiger. | |

**User's choice:** Pre-filled History

---

### Q2: 4. Chat-Versuch — wie sieht der Paywall-Trigger aus?

| Option | Description | Selected |
|--------|-------------|----------|
| Inline Paywall-Banner im Chat | Paywall-Card direkt im Chat-Feed nach 3. Exchange. Kein Overlay. | ✓ |
| Bottom Sheet über Chat | Bottom Sheet mit Paywall-Nachricht über dem Chat. | |
| Navigiert zu Paywall-Screen | Upgrade-Button navigiert zu /ich/premium. Chat-Kontext verlassen. | |

**User's choice:** Inline Paywall-Banner im Chat

---

### Q3: Wird das Chat-Limit persistiert?

| Option | Description | Selected |
|--------|-------------|----------|
| Resettet bei App-Start | Rein lokaler UI-State, kein Store. Jedes Mal 3 frische Exchanges. | |
| Persistiert via localStorage | Zähler im Store gespeichert. Limit bleibt nach Reload. | ✓ |

**User's choice:** Persistiert via localStorage

---

### Q4: Was sieht der User im Input nach den 3 Exchanges?

| Option | Description | Selected |
|--------|-------------|----------|
| Input aktiv + Placeholder | Input-Feld bleibt aktiv, Placeholder "Stell eine Frage...". 4. Absenden → Paywall-Banner. | ✓ |
| Input disabled mit Paywall-Hinweis | Input disabled ab Anfang mit "3/3 Fragen verwendet". | |

**User's choice:** Input aktiv + Placeholder

---

## Premium Paywall Route

### Q1: Kanonische Paywall-Route?

| Option | Description | Selected |
|--------|-------------|----------|
| Full-Screen /ich/premium | Eigener Screen. Alle Entry Points navigieren dorthin. | ✓ |
| Nur Bottom Sheet, keine Route | Paywall nur als Bottom Sheet. Kein eigener Screen. | |
| Beides: Full-Screen + Sheet | Full-Screen als kanonisch + Sheet für In-Context-Trigger. | |

**User's choice:** Full-Screen /ich/premium

---

### Q2: Übergabeprotokoll-Export → Paywall

| Option | Description | Selected |
|--------|-------------|----------|
| router.push('/ich/premium') | Direkte Navigation zu Paywall. Back-Button zurück. | ✓ |
| Premium-Lock Modal lokal | Lokales Modal ohne Tab-Wechsel. | |
| You decide | Claude wählt basierend auf Konsistenz. | |

**User's choice:** router.push('/ich/premium')

---

### Q3: Dokumentenspeicher Premium-Lock

| Option | Description | Selected |
|--------|-------------|----------|
| Inline Premium-Lock-Card | Statt 3. Upload-Slot: gesperrte Card mit Schloss-Icon + Upgrade-Link. Direkt sichtbar. | ✓ |
| Upload-Slot mit Lock-Modal | 3. Slot sieht gleich aus, Tipp öffnet Modal. | |

**User's choice:** Inline Premium-Lock-Card

---

## Einstellungen Edge Cases

### Q1: Account löschen / Logout Verhalten

| Option | Description | Selected |
|--------|-------------|----------|
| Account löschen = localStorage löschen | Löscht alle Keys, redirectet zu Onboarding. Logout zeigt Toast. | |
| Beides deaktiviert mit Erklärung | Beide Buttons disabled, Tap zeigt "Nur in der Vollversion verfügbar." | ✓ |
| Logout löscht auch | Beide Aktionen löschen localStorage + Redirect. | |

**User's choice:** Beides deaktiviert mit Erklärung

---

### Q2: Datenschutz & Impressum Links

| Option | Description | Selected |
|--------|-------------|----------|
| Interne Placeholder-Screens | /ich/datenschutz und /ich/impressum mit Mock-Text. In-App. | ✓ |
| Externe Links (neues Tab) | Browser öffnet externe URL. | |
| You decide | Claude wählt sauberste Prototyp-Lösung. | |

**User's choice:** Interne Placeholder-Screens

---

## Claude's Discretion

- Exakter Inhalt der 3 KI-Chatbot-Exchanges
- Realistische Zahlen und Empfehlung in COST-ESTIMATE.md
- Design-Details für Avatar-Placeholder und Edit-Form
- Werbebanner-Textinhalt und genaue Platzierung
- Empty State Animation-Details
- Länge und Layout der Datenschutz/Impressum-Placeholder-Texte

## Deferred Ideas

None — Diskussion blieb vollständig im Phase-4-Scope.
