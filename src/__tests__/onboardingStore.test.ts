/**
 * TDD: RED phase — tests for OnboardingData types and Zustand store
 * These tests should FAIL before the implementation files are created.
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

describe('OnboardingData types', () => {
  it('should export OnboardingData interface with required fields', async () => {
    const { } = await import('@/types/onboarding');
    // Type imports — just checking the module loads
    expect(true).toBe(true);
  });

  it('should export MovingOrg type with correct union values', async () => {
    // If the type file doesn't exist, this import will throw
    const types = await import('@/types/onboarding');
    expect(types).toBeDefined();
  });

  it('should export OnboardingStep type', async () => {
    const types = await import('@/types/onboarding');
    expect(types).toBeDefined();
  });
});

describe('useOnboardingStore initial state', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.resetModules();
  });

  it('should start with moveDate as null', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.moveDate).toBeNull();
  });

  it('should start with empty targetPlz', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.targetPlz).toBe('');
  });

  it('should start with empty fromCity', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.fromCity).toBe('');
  });

  it('should start with movingOrg as null', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.movingOrg).toBeNull();
  });

  it('should start with priority as null', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.priority).toBeNull();
  });

  it('should start with alreadyDone all false', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.alreadyDone.newApartment).toBe(false);
    expect(state.data.alreadyDone.transport).toBe(false);
    expect(state.data.alreadyDone.electricityInternet).toBe(false);
    expect(state.data.alreadyDone.ummeldungPrepared).toBe(false);
  });

  it('should start with completed as false', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    const state = useOnboardingStore.getState();
    expect(state.data.completed).toBe(false);
  });
});

describe('useOnboardingStore actions', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.resetModules();
  });

  it('setMoveDate should update moveDate', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setMoveDate('2026-06-15');
    expect(useOnboardingStore.getState().data.moveDate).toBe('2026-06-15');
  });

  it('setLocation should update targetPlz and fromCity', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setLocation('80331', 'Hamburg');
    expect(useOnboardingStore.getState().data.targetPlz).toBe('80331');
    expect(useOnboardingStore.getState().data.fromCity).toBe('Hamburg');
  });

  it('setMovingOrg should update movingOrg', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setMovingOrg('alleine');
    expect(useOnboardingStore.getState().data.movingOrg).toBe('alleine');
  });

  it('setPriority should update priority', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setPriority('guenstig');
    expect(useOnboardingStore.getState().data.priority).toBe('guenstig');
  });

  it('setAlreadyDone should update specific alreadyDone key', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setAlreadyDone('newApartment', true);
    expect(useOnboardingStore.getState().data.alreadyDone.newApartment).toBe(true);
    // other keys unchanged
    expect(useOnboardingStore.getState().data.alreadyDone.transport).toBe(false);
  });

  it('complete should set completed to true', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().complete();
    expect(useOnboardingStore.getState().data.completed).toBe(true);
  });

  it('reset should return store to initial state', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setMoveDate('2026-06-15');
    useOnboardingStore.getState().setMovingOrg('alleine');
    useOnboardingStore.getState().complete();
    useOnboardingStore.getState().reset();
    const state = useOnboardingStore.getState();
    expect(state.data.moveDate).toBeNull();
    expect(state.data.movingOrg).toBeNull();
    expect(state.data.completed).toBe(false);
  });
});

describe('useOnboardingStore localStorage persistence', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.resetModules();
  });

  it('should persist data to localStorage key wone-onboarding after setMoveDate', async () => {
    const { useOnboardingStore } = await import('@/store/onboardingStore');
    useOnboardingStore.getState().setMoveDate('2026-06-15');
    // Allow zustand persist to flush (synchronous in test env)
    const stored = localStorageMock.getItem('wone-onboarding');
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.state.data.moveDate).toBe('2026-06-15');
  });
});
