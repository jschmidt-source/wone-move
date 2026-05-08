import { Guide } from '@/types/checklist';

export const GUIDES: Record<string, Guide> = {
  ummeldung: {
    slug: 'ummeldung',
    title: 'Ummeldung beim Bürgeramt',
    category: 'organisatorisches',
    estimatedMinutes: 15,
    difficulty: 'Mittel',
    isFullyAuthored: true,
    documents: [
      'Personalausweis',
      'Wohnungsgeberbestätigung (Mieterbescheinigung)',
      'ggf. Reisepass',
    ],
    steps: [
      { number: 1, title: 'Termin beim Bürgeramt buchen', body: 'Online unter [Stadt]Bürgeramt buchen oder spontan vor Ort (abhängig von Stadt).' },
      { number: 2, title: 'Wohnungsgeberbestätigung vom Vermieter holen', body: 'Dein Vermieter ist gesetzlich verpflichtet, dir diese innerhalb von 2 Wochen auszustellen.' },
      { number: 3, title: 'Zum Termin erscheinen mit Ausweis + Bestätigung', body: 'Bearbeitungszeit ca. 10–15 Minuten.' },
      { number: 4, title: 'Meldebestätigung erhalten', body: 'Du bekommst eine offizielle Bestätigung, die du für weitere Behördengänge benötigst.' },
    ],
    warning: {
      title: 'Frist: 14 Tage nach Einzug!',
      body: 'Verpasst du die Frist, droht ein Bußgeld bis zu 1.000 €.',
    },
    // cityLink is filled at render time using targetPlz; placeholder href '#'
    cityLink: { label: 'Zum Bürgeramt deiner Stadt →', href: '#' },
  },
  rundfunkbeitrag: {
    slug: 'rundfunkbeitrag',
    title: 'Rundfunkbeitrag anmelden',
    category: 'organisatorisches',
    estimatedMinutes: 10,
    difficulty: 'Leicht',
    isFullyAuthored: true,
    documents: ['Persönliche Daten', 'Neue Adresse', 'IBAN für Lastschrift'],
    steps: [
      { number: 1, title: 'Online-Formular öffnen', body: 'Gehe auf rundfunkbeitrag.de und wähle „Anmelden".' },
      { number: 2, title: 'Daten eingeben', body: 'Name, neue Adresse, Einzugsdatum und IBAN angeben.' },
      { number: 3, title: 'Bestätigung erhalten', body: 'Du bekommst eine Beitragsnummer per Post — sicher aufbewahren.' },
    ],
    warning: { title: 'Pflicht für jeden Haushalt', body: '18,36 € pro Monat — egal ob du Fernsehen schaust oder nicht.' },
  },
  nachsendeauftrag: {
    slug: 'nachsendeauftrag',
    title: 'Nachsendeauftrag einrichten',
    category: 'organisatorisches',
    estimatedMinutes: 10,
    difficulty: 'Leicht',
    isFullyAuthored: true,
    documents: ['Personalausweis', 'Alte und neue Adresse'],
    steps: [
      { number: 1, title: 'Auf deutschepost.de buchen', body: 'Online-Formular ausfüllen oder in der Filiale beauftragen.' },
      { number: 2, title: 'Laufzeit wählen', body: '6 oder 12 Monate — empfohlen: 12 Monate (ab 28,90 €).' },
      { number: 3, title: 'Bestätigung erhalten', body: 'Post wird ab dem gewählten Startdatum automatisch weitergeleitet.' },
    ],
  },
  hausrat: {
    slug: 'hausrat',
    title: 'Hausratversicherung abschließen',
    category: 'versicherungen',
    estimatedMinutes: 15,
    difficulty: 'Leicht',
    isFullyAuthored: false,
  },
  'strom-wechseln': {
    slug: 'strom-wechseln',
    title: 'Stromanbieter wechseln',
    category: 'vertraege',
    estimatedMinutes: 20,
    difficulty: 'Leicht',
    isFullyAuthored: false,
  },
  'konto-ummelden': {
    slug: 'konto-ummelden',
    title: 'Konto ummelden',
    category: 'finanzen',
    estimatedMinutes: 10,
    difficulty: 'Leicht',
    isFullyAuthored: false,
  },
};

/**
 * Returns the Bürgeramt city label based on PLZ first 2 digits.
 * Used by the Ummeldung guide cityLink.
 */
export function cityFromPlz(plz: string): string {
  const prefix = plz.slice(0, 2);
  if (prefix === '80' || prefix === '81') return 'München';
  if (prefix === '20' || prefix === '21' || prefix === '22') return 'Hamburg';
  if (prefix === '10' || prefix === '12' || prefix === '13' || prefix === '14') return 'Berlin';
  if (prefix === '90' || prefix === '91') return 'Nürnberg';
  return 'deiner Stadt';
}
