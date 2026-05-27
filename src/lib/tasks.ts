import { Task, CategoryMeta, BucketMeta } from '@/types/checklist';
import { OnboardingData } from '@/types/onboarding';

export const CATEGORIES: CategoryMeta[] = [
  { id: 'organisatorisches', label: 'Organisatorisches', colorHex: '#646efb' },
  { id: 'vertraege',         label: 'Verträge',          colorHex: '#06b6d4' },
  { id: 'versicherungen',    label: 'Versicherungen',    colorHex: '#8b5cf6' },
  { id: 'einrichtung',       label: 'Einrichtung',       colorHex: '#f59e0b' },
  { id: 'finanzen',          label: 'Finanzen',          colorHex: '#22c55e' },
];

export const BUCKETS: BucketMeta[] = [
  { id: 'far',         label: '4+ Wochen vorher' },
  { id: 'medium',      label: '2–4 Wochen vorher' },
  { id: 'soon',        label: '1 Woche vorher' },
  { id: 'moving-day',  label: 'Am Umzugstag' },
  { id: 'after',       label: 'Danach erledigen' },
];

export const TASKS: Task[] = [
  // ORGANISATORISCHES (8)
  { id: 'ummeldung-buergeramt', title: 'Ummeldung beim Bürgeramt', category: 'organisatorisches', timelineBucket: 'after', isMustDo: true, estimatedMinutes: 15, difficulty: 'Mittel', guideSlug: 'ummeldung', filterRules: [{ kind: 'preCheckIfAlreadyDone', key: 'ummeldungPrepared' }] },
  { id: 'rundfunkbeitrag-anmelden', title: 'Rundfunkbeitrag anmelden', category: 'organisatorisches', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht', guideSlug: 'rundfunkbeitrag' },
  { id: 'nachsendeauftrag', title: 'Nachsendeauftrag einrichten', category: 'organisatorisches', timelineBucket: 'soon', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht', guideSlug: 'nachsendeauftrag' },
  { id: 'kfz-ummeldung', title: 'KFZ-Ummeldung', category: 'organisatorisches', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 20, difficulty: 'Mittel', filterRules: [{ kind: 'hideIfMovingOrgFirma' }] },
  { id: 'adresse-behoerden', title: 'Neue Adresse bei Behörden melden', category: 'organisatorisches', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 15, difficulty: 'Leicht' },
  { id: 'personalausweis-aktualisieren', title: 'Personalausweis aktualisieren', category: 'organisatorisches', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 30, difficulty: 'Mittel' },
  { id: 'fahrzeugzulassung-ummelden', title: 'Fahrzeugzulassung ummelden', category: 'organisatorisches', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 45, difficulty: 'Schwer', filterRules: [{ kind: 'hideIfMovingOrgFirma' }] },
  { id: 'steuerid-pruefen', title: 'Steueridentifikationsnummer prüfen', category: 'organisatorisches', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 5, difficulty: 'Leicht' },
  // VERTRAEGE (6)
  { id: 'stromanbieter-waehlen', title: 'Stromanbieter wählen', category: 'vertraege', timelineBucket: 'far', isMustDo: true, estimatedMinutes: 20, difficulty: 'Leicht', guideSlug: 'strom-wechseln', filterRules: [{ kind: 'preCheckIfAlreadyDone', key: 'electricityInternet' }] },
  { id: 'internet-abschliessen', title: 'Internetvertrag abschließen', category: 'vertraege', timelineBucket: 'far', isMustDo: false, estimatedMinutes: 15, difficulty: 'Leicht', filterRules: [{ kind: 'preCheckIfAlreadyDone', key: 'electricityInternet' }] },
  { id: 'mobilfunk-pruefen', title: 'Telefon/Mobilfunk-Vertrag prüfen', category: 'vertraege', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'alten-strom-kuendigen', title: 'Alten Strom kündigen', category: 'vertraege', timelineBucket: 'far', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'altes-internet-kuendigen', title: 'Altes Internet kündigen', category: 'vertraege', timelineBucket: 'far', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'transporter-mieten', title: 'Transporter mieten', category: 'vertraege', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 20, difficulty: 'Leicht', filterRules: [{ kind: 'preCheckIfAlreadyDone', key: 'transport' }, { kind: 'hideIfMovingOrgFirma' }] },
  // VERSICHERUNGEN (5)
  { id: 'haftpflicht-abschliessen', title: 'Haftpflichtversicherung abschließen', category: 'versicherungen', timelineBucket: 'medium', isMustDo: true, estimatedMinutes: 10, difficulty: 'Leicht', guideSlug: 'haftpflicht' },
  { id: 'hausrat-pruefen', title: 'Hausratversicherung prüfen', category: 'versicherungen', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 15, difficulty: 'Leicht', guideSlug: 'hausrat' },
  { id: 'krankenversicherung-umschreiben', title: 'Krankenversicherung umschreiben', category: 'versicherungen', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 20, difficulty: 'Mittel' },
  { id: 'bu-pruefen', title: 'Berufsunfähigkeitsversicherung prüfen', category: 'versicherungen', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'rechtsschutz-pruefen', title: 'Rechtsschutzversicherung prüfen', category: 'versicherungen', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  // EINRICHTUNG (7)
  { id: 'uebergabeprotokoll-erstellen', title: 'Übergabeprotokoll erstellen', category: 'einrichtung', timelineBucket: 'moving-day', isMustDo: false, estimatedMinutes: 30, difficulty: 'Mittel', guideSlug: 'uebergabeprotokoll' },
  { id: 'moebel-bestellen', title: 'Möbel bestellen/planen', category: 'einrichtung', timelineBucket: 'far', isMustDo: false, estimatedMinutes: 60, difficulty: 'Mittel' },
  { id: 'ikea-lieferung', title: 'IKEA-Lieferung buchen', category: 'einrichtung', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 20, difficulty: 'Leicht' },
  { id: 'haushaltsgeraete-pruefen', title: 'Haushaltsgeräte prüfen (Kühlschrank, Waschmaschine)', category: 'einrichtung', timelineBucket: 'far', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'vorhaenge-jalousien', title: 'Vorhänge/Jalousien', category: 'einrichtung', timelineBucket: 'soon', isMustDo: false, estimatedMinutes: 30, difficulty: 'Leicht' },
  { id: 'reinigungsmittel-haushalt', title: 'Reinigungsmittel & Haushaltsbedarf', category: 'einrichtung', timelineBucket: 'soon', isMustDo: false, estimatedMinutes: 20, difficulty: 'Leicht' },
  { id: 'router-einrichten', title: 'Internet-Router einrichten', category: 'einrichtung', timelineBucket: 'moving-day', isMustDo: false, estimatedMinutes: 20, difficulty: 'Leicht' },
  // FINANZEN (6)
  { id: 'girokonto-ummelden', title: 'Girokonto auf neue Adresse ummelden', category: 'finanzen', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht', guideSlug: 'konto-ummelden' },
  { id: 'dauerauftraege-aktualisieren', title: 'Daueraufträge aktualisieren', category: 'finanzen', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 15, difficulty: 'Mittel' },
  { id: 'arbeitgeber-informieren', title: 'Arbeitgeber informieren', category: 'finanzen', timelineBucket: 'medium', isMustDo: false, estimatedMinutes: 5, difficulty: 'Leicht' },
  { id: 'bafoeg-amt', title: 'BAföG-Amt benachrichtigen', category: 'finanzen', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'finanzamt-informieren', title: 'Finanzamt informieren', category: 'finanzen', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 10, difficulty: 'Leicht' },
  { id: 'krankenversicherung-informieren', title: 'Krankenversicherung informieren', category: 'finanzen', timelineBucket: 'after', isMustDo: false, estimatedMinutes: 5, difficulty: 'Leicht' },
];

/**
 * Filters and pre-checks tasks based on the user's onboarding data (D-04, D-05).
 * Returns visible tasks and a list of ids to start pre-checked.
 */
export function filterTasks(
  tasks: Task[],
  data: OnboardingData
): { tasks: Task[]; preChecked: string[] } {
  const preChecked: string[] = [];
  const visible = tasks.filter((t) => {
    if (!t.filterRules) return true;
    for (const rule of t.filterRules) {
      const isFirma = Array.isArray(data.movingOrg) ? data.movingOrg.includes('firma') : data.movingOrg === 'firma';
      if (rule.kind === 'hideIfMovingOrgFirma' && isFirma) {
        return false;
      }
      if (rule.kind === 'preCheckIfAlreadyDone' && data.alreadyDone[rule.key]) {
        preChecked.push(t.id);
      }
    }
    return true;
  });
  return { tasks: visible, preChecked };
}
