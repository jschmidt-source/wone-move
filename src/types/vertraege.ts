export type VertragKategorie = 'strom' | 'internet' | 'telefon' | 'haftpflicht' | 'hausrat';

export interface Anbieter {
  id: string;
  kategorie: VertragKategorie;
  name: string;
  preisProMonat: string;       // German format string e.g. "8,90"
  laufzeit: string;             // e.g. "12 Monate" or "Keine Laufzeit"
  rating: number;               // 1-5 integer
  highlights: string[];         // max 3 strings
  empfohlen?: boolean;
  partnerangebot?: boolean;
}

export interface FaqItem {
  id: string;
  frage: string;
  antwort: string;
}

export interface Spartipp {
  id: string;
  text: string;
}

export interface SpartippKategorie {
  id: string;
  emoji: string;       // e.g. "🛋️"
  label: string;       // e.g. "Einrichtung günstig"
  tipps: Spartipp[];
}

export interface Notfallkontakt {
  id: string;
  name: string;
  nummer: string;        // e.g. "110"
  iconName: string;      // Lucide icon name e.g. "Shield"
  iconColor: string;     // hex e.g. "#20314b"
}

export interface Adresspartei {
  id: string;
  label: string;
}
