# Wone MOVE

## What This Is

A mobile-first web app that guides young Germans (18–26) through their first move-out — step by step. Not a comparison portal, not a blog, not a generic to-do app. A structured, personalized companion that turns the overwhelming chaos of a first Auszug into a clear, executable process.

The core promise: you start confused, you finish done.

## Prototype Goal (Current Build)

We are building a **clickable showcase prototype** — not a functional app. Every screen is built with realistic mock data so the team can:
1. Visualize the full navigation and feature set
2. Evaluate what makes sense and what doesn't
3. Concretize the product concept for the startup module
4. Produce a cost estimation for real development

**All features are included in the prototype** — even ones that might be cut in v1 — so the team can see them in context before deciding. Screens use hardcoded mock data; no real business logic is needed.

**Final deliverable alongside the prototype:** A cost estimation document for building the real app.

## Who It's For

Young adults 18–26 in Germany: students, Azubis, Berufseinsteiger. Moving out for the first time, usually alone (Einzelhaushalt). Around 300,000–400,000 per year in Germany.

They're overwhelmed. They don't know what they don't know. They're not looking for information — they're looking for a guide.

## The Problem It Solves

The first move-out involves 30+ tasks across 8+ domains: contracts, registrations, insurance, furniture, logistics, finances, address changes, apartment inspection. Right now this knowledge is scattered across Reddit threads, parent phone calls, and forgotten WhatsApp messages.

Wone MOVE bundles it into one personalized flow.

## Context

- University startup module project (Praxisprojekt Gründung II)
- Team has developed business concept and feature spec (see data/Anfangsfragebogen.pdf)
- Color palette defined (see Brand System below)
- Building a clickable showcase prototype in 1–2 weeks for module presentation
- Germany-only, German language, Einzelhaushalt focus for v1

## Business Model

**Primary: Provision via White-Label-Integration**
Anbieter (Strom, Internet, Versicherungen) werden direkt in der App über eine White-Label- oder API-Partnership eingebunden (z.B. Verivox Partner-API, Check24 Connect). Nutzer schließt Vertrag ab, ohne die App zu verlassen. Provision pro Abschluss: €20–€100 je nach Produktkategorie.

**Sekundär:** Premium-Platzierungen (Anbieter zahlen für "Empfohlen"-Badge), Premium-Abo (no ads, KI Chatbot unlimited, Dokumentenspeicher).

## Constraints

- **Timeline:** 1–2 weeks to working prototype
- **Platform:** Web app (Next.js), mobile-first design (375px target, iPhone form factor)
- **Language:** German (DE), informal "du", casual and encouraging — never corporate
- **Scope:** All screens / all features as mockup — real logic not required
- **No real backend:** Mock data only — the prototype is a visual tool, not a product

## Tone of Voice

- Immer "du", niemals "Sie"
- Kurz, motivierend, direkt — kein Behörden-Deutsch
- Beispiele: "Dein Umzugsplan wartet!" statt "Ihre persönliche Checkliste wurde erstellt"
- Ermutigend beim Fortschritt: "Super, du hast 5 Aufgaben erledigt!"
- Leicht und freundlich, nicht stressend

## Navigation Structure

**Bottom Navigation (5 Tabs):**

```
🏠 Home  |  ✅ Aufgaben  |  📋 Verträge  |  💡 Entdecken  |  👤 Ich
```

| Tab | Inhalt |
|-----|--------|
| **Home** | Dashboard: Fortschrittsbalken, "Was steht als nächstes an?", "Wusstest du schon?"-Card, Quick-Actions, Umzugs-Countdown |
| **Aufgaben** | Toggle oben: Checkliste-Ansicht ↔ Zeitplan-Ansicht. Gleiche Daten, zwei Perspektiven. |
| **Verträge** | Anbieter-Vergleich (White-Label-Style): Strom, Internet, Telefon, Versicherungen. Abschluss direkt in der App. |
| **Entdecken** | Anleitungen + Good to Know + FAQ + Spartipps + Notfallkontakte — alles Wissen an einem Ort |
| **Ich** | Profil, Einstellungen, Dokumentenspeicher, KI Chatbot, Premium Upgrade |

**Innerhalb der Tabs erreichbar:**
- Schritt-für-Schritt Anleitung → aus Aufgaben (Klick auf Item) oder aus Entdecken
- Übergabeprotokoll → aus Aufgaben (Einrichtung-Kategorie) als eigener Screen
- Anbieter-Vergleich → aus Verträge-Tab ODER direkt aus relevantem Aufgaben-Item (z.B. "Stromanbieter wählen")
- Premium Paywall → aus "Ich"-Tab oder bei gesperrtem Feature
- Kostenrechner → aus Home als Quick-Action Card

## Screens to Build (Complete List)

### Onboarding Flow (5 Pflicht-Schritte)
- Splash / Loading screen (Logo + Ladeanimation)
- Welcome screen ("Dein erster Auszug. Wir begleiten dich." + CTA)
- Onboarding Schritt 1: Umzugsdatum (Date Picker)
- Onboarding Schritt 2: PLZ neue Wohnung + Von wo? (Stadt)
- Onboarding Schritt 3: Wie organisierst du deinen Umzug? (selbst / Freunde / Umzugsfirma / gemischt)
- Onboarding Schritt 4: Was liegt dir am meisten am Herzen? (günstig / schnell / stressfrei / nachhaltig)
- Onboarding Schritt 5: Was hast du schon? (Wohnung ✓ / Transport ✓ / Strom+Internet ✓ / Ummeldung ✓)
- Celebration / Übergangs-Screen ("Dein Umzugsplan ist fertig 🎉" mit Animation + kurze Zusammenfassung)

### Tab: Home
- Home / Dashboard screen
  - Persönliche Begrüßung (mock: "Hey Lea 👋")
  - Umzugs-Countdown ("Noch 23 Tage bis zum Umzug")
  - Gesamt-Fortschrittsbalken mit Prozent
  - Nächste Aufgabe Card ("Als nächstes: Ummeldung — ~15 Min")
  - "Wusstest du schon?" rotating tip card
  - Quick-Action Shortcuts (Verträge abschließen, Zeitplan, Kostenrechner)
- Kostenrechner screen
  - Entfernung (km Slider)
  - Helfer vorhanden? (Ja / Nein / Umzugsfirma)
  - Wohnungsgröße (qm)
  - Geschätzte Kosten Ausgabe (Umzugskartons, Transporter, Helfer-Verpflegung)

### Tab: Aufgaben
- Checkliste-Ansicht (default):
  - Toggle "Checkliste / Zeitplan" oben
  - "Must-Do" Sektion oben gepinnt (3–5 kritische Items mit rotem Badge)
  - Kategorien (kollabierbar, mit Fortschrittscount):
    - Organisatorisches (Ummeldung, Rundfunkbeitrag, KFZ-Ummeldung, Schule/Uni ummelden...)
    - Verträge (Strom, Internet, Telefon — mit direktem Link zu Verträge-Tab)
    - Versicherungen (Haftpflicht, Hausrat, Krankenversicherung aktualisieren...)
    - Einrichtung (Möbel bestellen, Übergabeprotokoll, Schlüssel, Renovierung...)
    - Finanzen (Konto, Daueraufträge, Adressänderungen bei Bank/Arbeitgeber...)
  - Jedes Item: Titel + Zeitschätzung ("~15 Min") + Kategorie-Farbe
  - Item checkbar (Mock-State, Mini-Celebration bei Check ✓)
  - "Eigenen Punkt hinzufügen" Button
- Zeitplan-Ansicht (Toggle):
  - Gleiche Items, sortiert in 5 Zeitbuckets:
    - "4+ Wochen vorher" (Wohnung übergeben, Umzugskartons, Strom/Internet)
    - "2–4 Wochen vorher" (Ummeldung vorbereiten, Möbel bestellen, Verträge)
    - "1 Woche vorher" (Abmeldung alter Wohnung, Nachsendeauftrag, Reinigung)
    - "Am Umzugstag" (Übergabeprotokoll, Schlüssel, Strom ablesen)
    - "Danach" (Ummeldung, Rundfunkbeitrag, Krankenversicherung, Bank)
  - Color-coded by urgency (rot = überfällig, orange = diese Woche, grün = erledigt)
- Aufgabe-Detail / Schritt-für-Schritt Anleitung screen (Ummeldung — vollständig ausgearbeitet):
  - Header: Aufgaben-Titel, Kategorie-Tag, Zeitschätzung, Schwierigkeitsgrad
  - "Benötigte Dokumente" Liste (Ausweis, Wohnungsgeberbestätigung...)
  - Nummerierte Schritt-für-Schritt Erklärung
  - City-specific Link (mock: "Zum Bürgeramt München →")
  - "Als erledigt markieren" CTA + "Zurück" Link
- Übergabeprotokoll screen (eigener Screen, aus Einrichtung erreichbar):
  - Zimmer-für-Zimmer Aufbau (Wohnzimmer / Küche / Bad / Schlafzimmer / Flur)
  - Pro Zimmer: Zustandsfelder (Wände, Boden, Fenster, Türen) mit Gut/Mangel-Toggle
  - Foto-Upload Platzhalter ("Foto hinzufügen" Mock-Slots)
  - Unterschriften-Feld (Mieter + Vermieter, Mock)
  - "Protokoll exportieren" (Premium-Feature Badge)
- Empty State screen (alle Aufgaben erledigt):
  - Große Celebration Animation
  - "Du hast es geschafft! Willkommen in deinem neuen Zuhause 🎉"
  - CTA: "Teile deinen Erfolg" + "Feedback geben"

### Tab: Verträge
- Verträge Hub screen:
  - Erklärung: "Schließ alles direkt hier ab — wir verdienen eine kleine Provision, für dich entstehen keine Mehrkosten"
  - Fortschritt ("2 von 4 Verträgen abgeschlossen")
  - Produkt-Kacheln: Strom, Internet, Telefon, Versicherungen
- Anbieter-Vergleich screen (je Produkt, White-Label-Style):
  - Header: Produkt-Typ + "Für deine PLZ: 80331"
  - Sortierung: Empfohlen / Günstigste / Beliebteste
  - Anbieter-Karten:
    - Logo + Name + Sterne-Rating
    - Preis/Monat + Laufzeit + Highlights (z.B. "Ökostrom ♻", "Keine Mindestlaufzeit")
    - "Empfohlen" / "Partnerangebot" Badge auf ausgewählten Karten
    - "Jetzt abschließen" CTA Button
  - Abschluss-Modal (direkt in App):
    - Zusammenfassung des gewählten Tarifs
    - Eingabefelder (Name, IBAN — Mock, nicht ausfüllbar)
    - "Weiter zum Abschluss" Button → Erfolgs-Screen
  - Erfolgs-Screen: "Antrag eingegangen! E STROM bestätigt deinen Vertrag per E-Mail."

### Tab: Entdecken
- Entdecken Hub screen:
  - Suchleiste oben (mit mock Autocomplete-Suggestions)
  - Sektionen: Anleitungen, FAQ, Spartipps, Notfallkontakte, Adressänderungen
- Anleitungen-Browser screen:
  - Sortiert nach Kategorie
  - Guide-Cards: Titel, Zeitschätzung, Kategorie-Tag, Schwierigkeit
  - Tapping → öffnet Anleitung-Detail
- Good to Know / FAQ screen:
  - Accordion mit ~10 echten Fragen (Ummeldungsfrist, Rundfunkbeitrag, Kaution, Wohnungsübergabe...)
  - "Wusstest du schon?" Cards (scrollbar horizontal)
- Notfallkontakte screen:
  - Notruf 110 / 112
  - Giftnotruf
  - Energieversorger Notfall (mock PLZ-basiert)
  - Tiernotruf
  - Tap-to-call UI (Mock)
- Spartipps screen:
  - Kategorisierte Tipps: Einrichtung günstig, Strom sparen, Lebensmittel, Möbel Second-Hand
- Adressänderungen-Checkliste screen:
  - ~15 Parteien: Arbeitgeber, Bank, Krankenkasse, Finanzamt, Uni/Schule, Amazon, Netflix, Spotify, Versicherungen, Abonnements, Freunde+Familie...
  - Abhakbar (Mock)

### Tab: Ich
- Profil / Mein Umzug screen:
  - Avatar-Platzhalter + Name (mock: "Lea Müller")
  - Umzugsdaten: Von → Nach, Datum, Wohnungsgröße
  - Umzugsfortschritt Summary (X von Y Aufgaben erledigt)
  - "Bearbeiten" Button
  - "Teile deinen Fortschritt" Share-Button
- KI Chatbot screen:
  - Chat-UI (Blasen, Eingabefeld)
  - 3 hardcoded Beispiel-Exchanges (z.B. "Was brauche ich für die Ummeldung?")
  - Free-Tier Limit: "Du hast 3/3 Fragen genutzt. Upgrade auf Premium für unbegrenzte Antworten."
  - Premium Badge bei weiterem Tippen → öffnet Paywall
- Dokumentenspeicher screen:
  - Upload-Area (Drag & Drop Mock)
  - Mock-Dokumente: Mietvertrag.pdf, Übergabeprotokoll.pdf, Personalausweis.jpg
  - Datei-Liste mit Name, Datum, Typ-Icon
  - "Premium-Feature" Lock-Indicator für mehr als 2 Dokumente
- Premium Upgrade / Paywall screen:
  - Headline: "Alles drin. Kein Stress."
  - Free vs. Premium Vergleichstabelle
  - Locked Features: Chatbot unlimited, Dokumente unlimited, kein Werbung, Protokoll-Export, Liste sharen
  - Pricing: €2,99/Monat oder €19,99/Jahr ("Spare 44%")
  - CTA "Jetzt upgraden" (Primary Button)
- Einstellungen screen:
  - Benachrichtigungen (Toggle + Push Opt-in)
  - Sprache (DE)
  - Datenschutz / Impressum
  - "Account löschen" (destructive, grau)
  - Logout
- Push Benachrichtigungen opt-in screen:
  - System-Permission-Dialog Mock
  - Beispiel-Reminder-Liste ("In 3 Tagen: Ummeldung nicht vergessen!")

### Premium UI Indicators (überall in App)
- Werbebanner (Free-Version): Dezenter Banner am unteren Rand der Checkliste
- Lock-Icons bei Premium-Features
- "PRO" Badge auf gesperrten Inhalten

## Brand System

### Farben

| Token | Hex | Verwendung |
|-------|-----|------------|
| Primary | `#646efb` | CTA-Buttons, aktiver Nav-Tab, Progress-Balken, Checkboxen, Links |
| Primary Light | `#d2d5fc` | Tag-Hintergründe, abgehakte Item-Hintergründe, Chips, sanfte Highlights |
| Primary Soft | `#8b92fa` | Hover-States, sekundäre Buttons, Badges |
| Dark | `#1c2642` | Headlines, Haupttext, dunkle Bereiche |
| Background | `#f6f7f7` | Seiten-Hintergrund |
| White | `#ffffff` | Card-Hintergründe auf Background |
| Muted | `#5b6377` | Subtext, inaktive Nav-Icons, sekundäre Labels |
| Border | `#c7c9d2` | Karten-Rahmen, Trennlinien, Input-Borders |
| Placeholder | `#8e92a1` | Disabled States, Platzhalter-Text |
| Success | `#22c55e` | Abgehakte Items, Erfolgs-Meldungen, "Erledigt"-States |
| Warning | `#f59e0b` | Zeitlich knappe Aufgaben im Zeitplan, Fristen-Hinweise |
| Danger | `#ef4444` | Überfällige Aufgaben, Fehler-States, "Must-Do"-Badge |

### Typografie

- **Schriftart:** Plus Jakarta Sans (Google Fonts, kostenlos)
  - Warm, modern, rund — passt zu jungem Publikum
- **Größen:** H1 24px / H2 20px / H3 17px / Body 15px / Small 13px / Tiny 11px
- **Gewichte:** 400 Regular / 600 SemiBold / 700 Bold

### Design-Prinzipien

- Border-Radius: Cards 16px, Buttons 12px, Tags 8px — alles rund und freundlich
- Schatten: Subtil, nur auf Cards (box-shadow: 0 2px 8px rgba(28,38,66,0.08))
- Icons: Lucide Icons (konsistent, Open Source)
- Spacing: 4px Grid (8, 12, 16, 24, 32, 48px)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Showcase prototype, not functional MVP | Team needs to see and evaluate all features before building | All screens, mock data |
| Web app over native | Faster to build, shareable link for presentation | Next.js |
| Include ALL features in prototype | Can't evaluate what to cut without seeing it in context | Everything in |
| Germany-only v1 | Bürgeramt links, PLZ logic, language — concrete beats generic | DE only |
| Einzelhaushalt focus | WG is a different flow; starting focused avoids branching complexity | Single person |
| Cost estimation as final deliverable | Module requires concrete business analysis | Separate document |
| Verträge as dedicated nav tab | Core monetization — needs maximum visibility | Own tab |
| Aufgaben = Checkliste + Zeitplan toggle | Same data, two views — avoids duplicate nav items | Toggle pattern |
| Onboarding max 5 steps | Gen Z drops off at 5+ steps — extras move to Profil | 5 Pflicht-Schritte |
| Moodboard removed | Pinterest does this better; distracts from core value | Cut entirely |
| Celebration moments built in | Gen Z retention — checking off tasks should feel rewarding | Konfetti + Animations |
| Zeitschätzung auf jedem Item | Gen Z wants to know effort upfront before starting | "~15 Min" Badges |
| Plus Jakarta Sans | Warm and modern font — matches young, friendly tone | Defined in design system |
| Kostenrechner added | Strong Gen-Z feature — "was kostet mein Umzug?" is a top search | Quick-Action on Home |

## Evolution

This document evolves at phase transitions and milestone boundaries.

## Validated Requirements (Phase 1)

Phase 1 complete 2026-05-08. Requirements validated: ONB-01, ONB-02, ONB-03, ONB-04, UX-01, UX-03, UX-04.
- Next.js 16 + Tailwind v4 + shadcn Radix scaffolded, brand tokens live
- 5-step onboarding flow → celebration → main app shell functional
- Zustand store with localStorage persistence proven (18 tests passing)

## Validated Requirements (Phase 2)

Phase 2 complete 2026-05-08. Requirements validated: CHK-01–05, GUIDE-01–03, GUIDE-05, PROG-02, TIME-01, TIME-02.
- Dashboard, checklist, timeline, Ummeldung guide, Übergabeprotokoll, Kostenrechner built
- filterTasks + preChecked pattern for personalized checklist proven

## Validated Requirements (Phase 3)

Phase 3 complete 2026-05-08. Requirements validated: GTK-01 (partial — Verträge hub), GTK-02, GTK-03, GTK-04, GTK-05, UX-02 (partial — SearchOverlay).
- Verträge tab: hub + 4 comparison screens + AbschlussSheet full vertical slice
- Entdecken tab: hub + SearchOverlay + 4 sub-screens (FAQ, Spartipps, Notfallkontakte, Adressänderungen)
- vertraegeStore (Zustand+persist) drives hub kachel completion state
- Code review findings: CR-04 (duplicate Krankenkasse entry) is a genuine data bug to fix; CR-01/02/03 are intentional prototype decisions

**Current state:** 3 of 4 phases complete. Phase 4 (Ich + Polish + Kosteneinschätzung) is next and final.

---
*Last updated: 2026-05-08 — Phase 3 complete. Phase 4 next: Ich tab + Polish + cost estimate document.*
