import { SpartippKategorie } from '@/types/vertraege';

export const SPARTIPPS: SpartippKategorie[] = [
  {
    id: 'einrichtung',
    emoji: '🛋️',
    label: 'Einrichtung günstig',
    tipps: [
      {
        id: 'tipp-einrichtung-1',
        text: 'Nutze Kleinanzeigen (eBay Kleinanzeigen, Facebook Marketplace) für gebrauchte Möbel — oft 50–80% günstiger als Neuware.',
      },
      {
        id: 'tipp-einrichtung-2',
        text: 'IKEA-Leihtransporter für ca. €29/Tag inklusive 200 Freikilometer — perfekt für Möbelabholungen.',
      },
      {
        id: 'tipp-einrichtung-3',
        text: 'IKEA Family-Karte gibt 5% Rabatt auf ausgewählte Artikel und kostenlosen Kaffee.',
      },
      {
        id: 'tipp-einrichtung-4',
        text: 'Secondhand-Möbel bei Studierendenwerk-Abverkäufen und Wohnungsauflösungen kaufen — oft hochwertige Stücke.',
      },
    ],
  },
  {
    id: 'strom',
    emoji: '⚡',
    label: 'Strom sparen',
    tipps: [
      {
        id: 'tipp-strom-1',
        text: 'Wechsel den Stromanbieter direkt nach dem Einzug — Neukunden-Boni von €50–€150 sind üblich.',
      },
      {
        id: 'tipp-strom-2',
        text: 'LED-Leuchtmittel sparen bis zu 80% Energie gegenüber Glühbirnen und halten 15–25 Jahre.',
      },
      {
        id: 'tipp-strom-3',
        text: 'Geräte vollständig ausschalten statt Standby lassen — Standby kostet bis zu €50 pro Jahr.',
      },
    ],
  },
  {
    id: 'lebensmittel',
    emoji: '🛒',
    label: 'Lebensmittel',
    tipps: [
      {
        id: 'tipp-lebensmittel-1',
        text: "Kaufe Markenprodukte im Sonderangebot und vergleiche Preise mit der App 'Smhaggle' oder 'Pepper'.",
      },
      {
        id: 'tipp-lebensmittel-2',
        text: 'Discounter (Aldi, Lidl) für Grundnahrungsmittel, Spezialitäten beim türkischen Supermarkt kaufen — bis zu 40% günstiger.',
      },
      {
        id: 'tipp-lebensmittel-3',
        text: 'Meal-Prep spart Geld und Zeit — einmal pro Woche kochen, 5 Tage essen.',
      },
    ],
  },
  {
    id: 'umzug',
    emoji: '🚛',
    label: 'Umzug günstig',
    tipps: [
      {
        id: 'tipp-umzug-1',
        text: 'Freunde mit Auto fragen + Getränke und Pizza organisieren — oft günstiger als jede Umzugsfirma.',
      },
      {
        id: 'tipp-umzug-2',
        text: 'Transporter mieten statt Umzugsfirma beauftragen: SIXT, Enterprise oder Stadtmobil ab €50/Tag.',
      },
      {
        id: 'tipp-umzug-3',
        text: 'Umzugskartons kostenlos bei Supermärkten, Drogerien oder auf eBay Kleinanzeigen abholen.',
      },
      {
        id: 'tipp-umzug-4',
        text: 'Umzug unter der Woche buchen — deutlich günstiger als am Wochenende.',
      },
    ],
  },
];
