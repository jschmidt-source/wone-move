/**
 * TDD: RED phase — tests for TASKS, filterTasks, GUIDES, useChecklistStore
 * These tests FAIL before the implementation files are created.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock localStorage for Node.js test environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

vi.stubGlobal('localStorage', localStorageMock);

const baseMoveData = {
  moveDate: '2026-06-15',
  targetPlz: '80331',
  fromCity: 'Hamburg',
  movingOrg: 'alleine' as const,
  priority: 'guenstig' as const,
  alreadyDone: {
    newApartment: false,
    transport: false,
    electricityInternet: false,
    ummeldungPrepared: false,
  },
  completed: false,
};

// ─────────────────────────────────────────
// TASKS array
// ─────────────────────────────────────────
describe('TASKS array', () => {
  it('should export exactly 32 tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS).toHaveLength(32);
  });

  it('should have exactly 3 isMustDo tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS.filter((t) => t.isMustDo)).toHaveLength(3);
  });

  it('must-do task ids are ummeldung-buergeramt, stromanbieter-waehlen, haftpflicht-abschliessen', async () => {
    const { TASKS } = await import('@/lib/tasks');
    const mustDo = TASKS.filter((t) => t.isMustDo).map((t) => t.id).sort();
    expect(mustDo).toEqual([
      'haftpflicht-abschliessen',
      'stromanbieter-waehlen',
      'ummeldung-buergeramt',
    ]);
  });

  it('should have 8 organisatorisches tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS.filter((t) => t.category === 'organisatorisches')).toHaveLength(8);
  });

  it('should have 6 vertraege tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS.filter((t) => t.category === 'vertraege')).toHaveLength(6);
  });

  it('should have 5 versicherungen tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS.filter((t) => t.category === 'versicherungen')).toHaveLength(5);
  });

  it('should have 7 einrichtung tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS.filter((t) => t.category === 'einrichtung')).toHaveLength(7);
  });

  it('should have 6 finanzen tasks', async () => {
    const { TASKS } = await import('@/lib/tasks');
    expect(TASKS.filter((t) => t.category === 'finanzen')).toHaveLength(6);
  });

  it('every task has non-empty id, title, category, timelineBucket, estimatedMinutes, difficulty', async () => {
    const { TASKS } = await import('@/lib/tasks');
    for (const t of TASKS) {
      expect(t.id).toBeTruthy();
      expect(t.title).toBeTruthy();
      expect(t.category).toBeTruthy();
      expect(t.timelineBucket).toBeTruthy();
      expect(t.estimatedMinutes).toBeGreaterThan(0);
      expect(t.difficulty).toBeTruthy();
    }
  });
});

// ─────────────────────────────────────────
// CATEGORIES and BUCKETS
// ─────────────────────────────────────────
describe('CATEGORIES and BUCKETS', () => {
  it('CATEGORIES has 5 entries with correct ids', async () => {
    const { CATEGORIES } = await import('@/lib/tasks');
    expect(CATEGORIES).toHaveLength(5);
    const ids = CATEGORIES.map((c) => c.id);
    expect(ids).toContain('organisatorisches');
    expect(ids).toContain('vertraege');
    expect(ids).toContain('versicherungen');
    expect(ids).toContain('einrichtung');
    expect(ids).toContain('finanzen');
  });

  it('BUCKETS has 5 entries with correct ids', async () => {
    const { BUCKETS } = await import('@/lib/tasks');
    expect(BUCKETS).toHaveLength(5);
    const ids = BUCKETS.map((b) => b.id);
    expect(ids).toContain('far');
    expect(ids).toContain('medium');
    expect(ids).toContain('soon');
    expect(ids).toContain('moving-day');
    expect(ids).toContain('after');
  });
});

// ─────────────────────────────────────────
// filterTasks
// ─────────────────────────────────────────
describe('filterTasks', () => {
  it('returns all 32 tasks when movingOrg is alleine', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { tasks } = filterTasks(TASKS, { ...baseMoveData, movingOrg: 'alleine' });
    expect(tasks).toHaveLength(32);
  });

  it('hides kfz-ummeldung when movingOrg is firma', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { tasks } = filterTasks(TASKS, { ...baseMoveData, movingOrg: 'firma' });
    expect(tasks.find((t) => t.id === 'kfz-ummeldung')).toBeUndefined();
  });

  it('hides fahrzeugzulassung-ummelden when movingOrg is firma', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { tasks } = filterTasks(TASKS, { ...baseMoveData, movingOrg: 'firma' });
    expect(tasks.find((t) => t.id === 'fahrzeugzulassung-ummelden')).toBeUndefined();
  });

  it('hides transporter-mieten when movingOrg is firma', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { tasks } = filterTasks(TASKS, { ...baseMoveData, movingOrg: 'firma' });
    expect(tasks.find((t) => t.id === 'transporter-mieten')).toBeUndefined();
  });

  it('preChecks stromanbieter-waehlen when electricityInternet is true', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { preChecked } = filterTasks(TASKS, {
      ...baseMoveData,
      alreadyDone: { ...baseMoveData.alreadyDone, electricityInternet: true },
    });
    expect(preChecked).toContain('stromanbieter-waehlen');
  });

  it('preChecks internet-abschliessen when electricityInternet is true', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { preChecked } = filterTasks(TASKS, {
      ...baseMoveData,
      alreadyDone: { ...baseMoveData.alreadyDone, electricityInternet: true },
    });
    expect(preChecked).toContain('internet-abschliessen');
  });

  it('preChecks ummeldung-buergeramt when ummeldungPrepared is true', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { preChecked } = filterTasks(TASKS, {
      ...baseMoveData,
      alreadyDone: { ...baseMoveData.alreadyDone, ummeldungPrepared: true },
    });
    expect(preChecked).toContain('ummeldung-buergeramt');
  });

  it('returns empty preChecked when alreadyDone is all false', async () => {
    const { TASKS, filterTasks } = await import('@/lib/tasks');
    const { preChecked } = filterTasks(TASKS, baseMoveData);
    expect(preChecked).toHaveLength(0);
  });
});

// ─────────────────────────────────────────
// GUIDES
// ─────────────────────────────────────────
describe('GUIDES map', () => {
  it('exports GUIDES object with at least 6 entries', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(Object.keys(GUIDES).length).toBeGreaterThanOrEqual(6);
  });

  it('ummeldung guide is fully authored', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['ummeldung'].isFullyAuthored).toBe(true);
  });

  it('ummeldung guide has 4 steps', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['ummeldung'].steps).toHaveLength(4);
  });

  it('ummeldung guide has 3 documents', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['ummeldung'].documents).toHaveLength(3);
  });

  it('ummeldung guide has warning', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['ummeldung'].warning).toBeDefined();
    expect(GUIDES['ummeldung'].warning!.title).toContain('14 Tage');
  });

  it('ummeldung guide has cityLink', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['ummeldung'].cityLink).toBeDefined();
  });

  it('rundfunkbeitrag and nachsendeauftrag are fully authored', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['rundfunkbeitrag'].isFullyAuthored).toBe(true);
    expect(GUIDES['nachsendeauftrag'].isFullyAuthored).toBe(true);
  });

  it('hausrat, strom-wechseln, konto-ummelden are preview only', async () => {
    const { GUIDES } = await import('@/lib/guides');
    expect(GUIDES['hausrat'].isFullyAuthored).toBe(false);
    expect(GUIDES['strom-wechseln'].isFullyAuthored).toBe(false);
    expect(GUIDES['konto-ummelden'].isFullyAuthored).toBe(false);
  });

  it('cityFromPlz returns München for 80xxx', async () => {
    const { cityFromPlz } = await import('@/lib/guides');
    expect(cityFromPlz('80331')).toBe('München');
  });

  it('cityFromPlz returns Hamburg for 20xxx', async () => {
    const { cityFromPlz } = await import('@/lib/guides');
    expect(cityFromPlz('20095')).toBe('Hamburg');
  });

  it('cityFromPlz returns Berlin for 10xxx', async () => {
    const { cityFromPlz } = await import('@/lib/guides');
    expect(cityFromPlz('10115')).toBe('Berlin');
  });

  it('cityFromPlz returns fallback for unknown PLZ', async () => {
    const { cityFromPlz } = await import('@/lib/guides');
    expect(cityFromPlz('99999')).toBe('deiner Stadt');
  });
});

// ─────────────────────────────────────────
// useChecklistStore
// ─────────────────────────────────────────
describe('useChecklistStore', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.resetModules();
  });

  it('starts with empty checkedIds', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    expect(useChecklistStore.getState().checkedIds).toHaveLength(0);
  });

  it('starts with empty customItems', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    expect(useChecklistStore.getState().customItems).toHaveLength(0);
  });

  it('toggle adds id to checkedIds', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    useChecklistStore.getState().toggle('ummeldung-buergeramt');
    expect(useChecklistStore.getState().checkedIds).toContain('ummeldung-buergeramt');
  });

  it('toggle removes id when already checked', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    useChecklistStore.getState().toggle('ummeldung-buergeramt');
    useChecklistStore.getState().toggle('ummeldung-buergeramt');
    expect(useChecklistStore.getState().checkedIds).not.toContain('ummeldung-buergeramt');
  });

  it('isChecked returns true for checked id', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    useChecklistStore.getState().toggle('stromanbieter-waehlen');
    expect(useChecklistStore.getState().isChecked('stromanbieter-waehlen')).toBe(true);
  });

  it('isChecked returns false for unchecked id', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    expect(useChecklistStore.getState().isChecked('stromanbieter-waehlen')).toBe(false);
  });

  it('addCustomItem adds item to customItems', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    useChecklistStore.getState().addCustomItem('Mein Eigener Task', 'finanzen');
    const items = useChecklistStore.getState().customItems;
    expect(items).toHaveLength(1);
    expect(items[0].title).toBe('Mein Eigener Task');
    expect(items[0].category).toBe('finanzen');
  });

  it('reset clears checkedIds and customItems', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    useChecklistStore.getState().toggle('ummeldung-buergeramt');
    useChecklistStore.getState().addCustomItem('Test', 'finanzen');
    useChecklistStore.getState().reset();
    expect(useChecklistStore.getState().checkedIds).toHaveLength(0);
    expect(useChecklistStore.getState().customItems).toHaveLength(0);
  });

  it('persists under wone-checklist key', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    expect(useChecklistStore.persist.getOptions().name).toBe('wone-checklist');
  });

  it('persists toggle to localStorage', async () => {
    const { useChecklistStore } = await import('@/store/checklistStore');
    useChecklistStore.getState().toggle('ummeldung-buergeramt');
    await new Promise((resolve) => setTimeout(resolve, 50));
    const stored = localStorageMock.getItem('wone-checklist');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.state.checkedIds).toContain('ummeldung-buergeramt');
  });
});
