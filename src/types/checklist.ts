export type ChecklistCategoryId =
  | 'organisatorisches'
  | 'vertraege'
  | 'versicherungen'
  | 'einrichtung'
  | 'finanzen';

export type TimelineBucketId = 'far' | 'medium' | 'soon' | 'moving-day' | 'after';

export type Difficulty = 'Leicht' | 'Mittel' | 'Schwer';

/**
 * Filter rule applied by filterTasks(). Uses OnboardingData fields.
 * - 'preCheck': start the task pre-checked when condition met (D-04, D-05)
 * - 'hide': remove task entirely when condition met
 */
export type FilterRule =
  | { kind: 'preCheckIfAlreadyDone'; key: 'newApartment' | 'transport' | 'electricityInternet' | 'ummeldungPrepared' }
  | { kind: 'hideIfMovingOrgFirma' };

export interface Task {
  id: string;
  title: string;
  category: ChecklistCategoryId;
  timelineBucket: TimelineBucketId;
  isMustDo: boolean;
  estimatedMinutes: number;       // for "~X Min" badge
  difficulty: Difficulty;
  guideSlug?: string;             // links to /anleitungen/[slug] when present
  filterRules?: FilterRule[];
}

export interface CategoryMeta {
  id: ChecklistCategoryId;
  label: string;
  /** Hex color for the 8px category dot — verbatim from UI-SPEC */
  colorHex: string;
}

export interface BucketMeta {
  id: TimelineBucketId;
  label: string;
}

/** Custom items added by the user via the FAB (CHK-04). */
export interface CustomItem {
  id: string;             // crypto.randomUUID()
  title: string;
  category: ChecklistCategoryId;
  createdAt: number;      // Date.now()
}

/** Step shape for /anleitungen/[slug] — consumed by GuideStepList. */
export interface GuideStep {
  number: number;
  title: string;
  body: string;
}

export interface Guide {
  slug: string;
  title: string;
  category: ChecklistCategoryId;
  estimatedMinutes: number;
  difficulty: Difficulty;
  /** Required when guide is fully authored (Phase 2: ummeldung + 2 others) */
  documents?: string[];
  steps?: GuideStep[];
  warning?: { title: string; body: string };
  cityLink?: { label: string; href: string };
  /** True for fully authored guides; false → preview-only card on /anleitungen */
  isFullyAuthored: boolean;
}
