import { Adresspartei } from '@/types/vertraege';

export const ADRESSAENDERUNGEN: Adresspartei[] = [
  { id: 'arbeitgeber',    label: 'Arbeitgeber' },
  { id: 'finanzamt',      label: 'Finanzamt' },
  { id: 'krankenkasse',   label: 'Krankenkasse' },
  { id: 'bank',           label: 'Bank / Kreditinstitut' },
  { id: 'uni',            label: 'Uni / BAföG-Amt' },
  { id: 'amazon',         label: 'Amazon' },
  { id: 'paypal',         label: 'PayPal' },
  { id: 'netflix',        label: 'Netflix' },
  { id: 'spotify',        label: 'Spotify' },
  { id: 'appstores',      label: 'App Stores (Apple / Google)' },
  { id: 'kfz',            label: 'Kfz-Versicherung' },
  { id: 'kv',             label: 'Krankenversicherung' },
  { id: 'sonstige-vers',  label: 'Sonstige Versicherungen' },
  { id: 'family',         label: 'Freunde & Familie' },
  { id: 'abos',           label: 'Abonnements (Zeitungen, Magazine)' },
];
