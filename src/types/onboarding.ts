export type MovingOrg = 'alleine' | 'freunde' | 'firma' | 'gemischt';
export type Priority = 'guenstig' | 'schnell' | 'stressfrei' | 'nachhaltig';

export interface AlreadyDone {
  newApartment: boolean;
  transport: boolean;
  electricityInternet: boolean;
  ummeldungPrepared: boolean;
}

export interface OnboardingData {
  moveDate: string | null;       // ISO date string "YYYY-MM-DD" or null
  targetPlz: string;             // e.g. "80331"
  fromCity: string;              // e.g. "Hamburg"
  movingOrg: MovingOrg | null;
  priority: Priority | null;
  alreadyDone: AlreadyDone;
  completed: boolean;
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;
