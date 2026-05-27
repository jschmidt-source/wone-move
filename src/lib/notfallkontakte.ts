import { Notfallkontakt } from '@/types/vertraege';

export const NOTFALLKONTAKTE: Notfallkontakt[] = [
  { id: 'polizei',  name: 'Polizei',                   nummer: '110',            iconName: 'Shield',      iconColor: '#20314b' },
  { id: 'feuerwehr', name: 'Feuerwehr / Rettung',      nummer: '112',            iconName: 'Flame',       iconColor: '#ef4444' },
  { id: 'gift',     name: 'Giftnotruf',                 nummer: '030 19240',      iconName: 'AlertCircle', iconColor: '#f97316' },
  { id: 'energie',  name: 'Energieversorger Notfall',   nummer: '0800 100 100 2', iconName: 'Zap',         iconColor: '#f59e0b' },
  { id: 'wasser',   name: 'Wasserrohrbruch Notdienst',  nummer: '0800 200 200 0', iconName: 'Droplets',    iconColor: '#06b6d4' },
  { id: 'tier',     name: 'Tiernotruf',                 nummer: '0800 700 42 67', iconName: 'PawPrint',    iconColor: '#22c55e' },
];
