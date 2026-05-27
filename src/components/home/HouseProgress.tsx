'use client';

function getStage(pct: number): 0 | 1 | 2 | 3 | 4 {
  if (pct < 20) return 0;
  if (pct < 40) return 1;
  if (pct < 60) return 2;
  if (pct < 80) return 3;
  return 4;
}

function Bruchbude() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="28" y="52" width="84" height="48" rx="1" fill="#c4a882" stroke="#9b7d5a" strokeWidth="1.5" transform="rotate(-2 70 76)"/>
      <path d="M14 52 L35 22 L70 14 L105 26 L126 50 L105 52 L70 44 L35 50 Z" fill="#9b6b4a" stroke="#7a5234" strokeWidth="1.5"/>
      <line x1="55" y1="28" x2="58" y2="14" stroke="#7a5234" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M60 62 L63 72 L58 82 L62 92" stroke="#9b7d5a" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="36" y="60" width="22" height="18" rx="1" fill="#c8d8e8" stroke="#9b7d5a" strokeWidth="1"/>
      <line x1="36" y1="69" x2="58" y2="69" stroke="#9b7d5a" strokeWidth="0.8"/>
      <line x1="47" y1="60" x2="47" y2="78" stroke="#9b7d5a" strokeWidth="0.8"/>
      <line x1="36" y1="60" x2="50" y2="73" stroke="#9b7d5a" strokeWidth="0.8" opacity="0.5"/>
      <rect x="76" y="68" width="20" height="30" rx="1" fill="#8b6340" stroke="#7a5234" strokeWidth="1" transform="rotate(1 86 83)"/>
      <line x1="10" y1="100" x2="130" y2="100" stroke="#c4a882" strokeWidth="2"/>
    </svg>
  );
}

function KleineHuette() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="22" y="52" width="96" height="48" rx="2" fill="#e8dcc8" stroke="#c4a882" strokeWidth="1.5"/>
      <path d="M12 54 L70 16 L128 54 Z" fill="#c4846e" stroke="#a06650" strokeWidth="1.5"/>
      <rect x="30" y="62" width="24" height="20" rx="1" fill="#b8d0e8" stroke="#8aabcc" strokeWidth="1"/>
      <line x1="30" y1="72" x2="54" y2="72" stroke="#8aabcc" strokeWidth="0.8"/>
      <line x1="42" y1="62" x2="42" y2="82" stroke="#8aabcc" strokeWidth="0.8"/>
      <rect x="86" y="62" width="24" height="20" rx="1" fill="#b8d0e8" stroke="#8aabcc" strokeWidth="1"/>
      <line x1="86" y1="72" x2="110" y2="72" stroke="#8aabcc" strokeWidth="0.8"/>
      <line x1="98" y1="62" x2="98" y2="82" stroke="#8aabcc" strokeWidth="0.8"/>
      <rect x="56" y="74" width="28" height="26" rx="3" fill="#9c7a5a" stroke="#7a5c3e" strokeWidth="1"/>
      <circle cx="81" cy="88" r="2" fill="#c4a882"/>
      <line x1="10" y1="100" x2="130" y2="100" stroke="#c4a882" strokeWidth="2"/>
    </svg>
  );
}

function NettesZuhause() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="18" y="48" width="104" height="52" rx="2" fill="#f0e6d2" stroke="#d4b896" strokeWidth="1.5"/>
      <path d="M8 50 L70 12 L132 50 Z" fill="#6c75f4" stroke="#5563d8" strokeWidth="1.5"/>
      <rect x="87" y="22" width="12" height="26" rx="1" fill="#d4b896" stroke="#c4a882" strokeWidth="1"/>
      <ellipse cx="93" cy="18" rx="5" ry="4" fill="#e0e0e0" opacity="0.7"/>
      <ellipse cx="95" cy="12" rx="3.5" ry="3" fill="#e0e0e0" opacity="0.5"/>
      <rect x="24" y="58" width="26" height="20" rx="2" fill="#c8def5" stroke="#6c75f4" strokeWidth="1.2"/>
      <line x1="24" y1="68" x2="50" y2="68" stroke="#6c75f4" strokeWidth="0.8"/>
      <line x1="37" y1="58" x2="37" y2="78" stroke="#6c75f4" strokeWidth="0.8"/>
      <rect x="90" y="58" width="26" height="20" rx="2" fill="#c8def5" stroke="#6c75f4" strokeWidth="1.2"/>
      <line x1="90" y1="68" x2="116" y2="68" stroke="#6c75f4" strokeWidth="0.8"/>
      <line x1="103" y1="58" x2="103" y2="78" stroke="#6c75f4" strokeWidth="0.8"/>
      <rect x="55" y="70" width="30" height="30" rx="4" fill="#20314b" stroke="#0f1628" strokeWidth="1"/>
      <rect x="60" y="74" width="20" height="10" rx="2" fill="#c8def5" opacity="0.5"/>
      <circle cx="82" cy="86" r="2" fill="#d4a855"/>
      <path d="M56 100 L60 88 L80 88 L84 100" fill="#e8dcc8" stroke="#d4b896" strokeWidth="0.8"/>
      <circle cx="14" cy="97" r="7" fill="#6bbf6a"/>
      <circle cx="126" cy="97" r="7" fill="#6bbf6a"/>
      <line x1="6" y1="100" x2="134" y2="100" stroke="#aad4a0" strokeWidth="2.5"/>
    </svg>
  );
}

function SchoenesZuhause() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="16" y="44" width="108" height="56" rx="2" fill="#fcf6ec" stroke="#d4b896" strokeWidth="1.5"/>
      <path d="M6 46 L70 8 L134 46 Z" fill="#20314b" stroke="#0f1628" strokeWidth="1.5"/>
      <rect x="10" y="44" width="120" height="3" fill="#6c75f4"/>
      <rect x="84" y="18" width="12" height="26" rx="1" fill="#e8dcc8" stroke="#d4b896" strokeWidth="1"/>
      <ellipse cx="90" cy="14" rx="5" ry="4" fill="#ddd" opacity="0.6"/>
      <rect x="22" y="54" width="28" height="22" rx="2" fill="#c8def5" stroke="#6c75f4" strokeWidth="1.5"/>
      <line x1="22" y1="65" x2="50" y2="65" stroke="#6c75f4" strokeWidth="1"/>
      <line x1="36" y1="54" x2="36" y2="76" stroke="#6c75f4" strokeWidth="1"/>
      <rect x="90" y="54" width="28" height="22" rx="2" fill="#c8def5" stroke="#6c75f4" strokeWidth="1.5"/>
      <line x1="90" y1="65" x2="118" y2="65" stroke="#6c75f4" strokeWidth="1"/>
      <line x1="104" y1="54" x2="104" y2="76" stroke="#6c75f4" strokeWidth="1"/>
      <rect x="54" y="68" width="32" height="32" rx="4" fill="#20314b" stroke="#0f1628" strokeWidth="1.2"/>
      <path d="M54 72 Q70 63 86 72" fill="#20314b" stroke="#0f1628" strokeWidth="1"/>
      <rect x="59" y="72" width="22" height="10" rx="2" fill="#c8def5" opacity="0.5"/>
      <circle cx="83" cy="85" r="2.5" fill="#d4a855"/>
      <path d="M56 100 L59 88 L81 88 L84 100" fill="#e8dcc8" stroke="#d4b896" strokeWidth="1"/>
      <circle cx="10" cy="96" r="6" fill="#6bbf6a"/>
      <circle cx="18" cy="93" r="5" fill="#6bbf6a"/>
      <circle cx="10" cy="94" r="3" fill="#ff8fa3"/>
      <circle cx="122" cy="96" r="6" fill="#6bbf6a"/>
      <circle cx="130" cy="93" r="5" fill="#6bbf6a"/>
      <circle cx="130" cy="94" r="3" fill="#ffb347"/>
      <line x1="4" y1="100" x2="136" y2="100" stroke="#6bbf6a" strokeWidth="2.5"/>
    </svg>
  );
}

function Schloss() {
  return (
    <svg viewBox="0 0 140 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="22" y="46" width="96" height="54" rx="1" fill="#fcf6ec" stroke="#d4b896" strokeWidth="1.5"/>
      <rect x="46" y="22" width="48" height="48" rx="1" fill="#f0e6d2" stroke="#d4b896" strokeWidth="1.5"/>
      <rect x="46" y="14" width="9" height="10" fill="#20314b"/>
      <rect x="60" y="14" width="9" height="10" fill="#20314b"/>
      <rect x="75" y="14" width="9" height="10" fill="#20314b"/>
      <rect x="46" y="14" width="48" height="5" fill="#20314b"/>
      <rect x="8" y="34" width="26" height="66" rx="1" fill="#e8dcc8" stroke="#d4b896" strokeWidth="1.5"/>
      <rect x="8" y="26" width="7" height="9" fill="#20314b"/>
      <rect x="19" y="26" width="7" height="9" fill="#20314b"/>
      <rect x="8" y="26" width="26" height="5" fill="#20314b"/>
      <rect x="8" y="30" width="26" height="3" fill="#6c75f4"/>
      <rect x="106" y="34" width="26" height="66" rx="1" fill="#e8dcc8" stroke="#d4b896" strokeWidth="1.5"/>
      <rect x="106" y="26" width="7" height="9" fill="#20314b"/>
      <rect x="117" y="26" width="7" height="9" fill="#20314b"/>
      <rect x="106" y="26" width="26" height="5" fill="#20314b"/>
      <rect x="106" y="30" width="26" height="3" fill="#6c75f4"/>
      <rect x="22" y="40" width="96" height="3" fill="#6c75f4"/>
      <rect x="13" y="52" width="14" height="18" rx="7" fill="#c8def5" stroke="#6c75f4" strokeWidth="1"/>
      <rect x="113" y="52" width="14" height="18" rx="7" fill="#c8def5" stroke="#6c75f4" strokeWidth="1"/>
      <rect x="57" y="28" width="26" height="22" rx="13" fill="#c8def5" stroke="#6c75f4" strokeWidth="1.2"/>
      <circle cx="70" cy="39" r="5" fill="#6c75f4" opacity="0.5"/>
      <rect x="28" y="58" width="20" height="14" rx="7" fill="#c8def5" stroke="#6c75f4" strokeWidth="1"/>
      <rect x="92" y="58" width="20" height="14" rx="7" fill="#c8def5" stroke="#6c75f4" strokeWidth="1"/>
      <rect x="56" y="72" width="28" height="28" rx="4" fill="#20314b" stroke="#0f1628" strokeWidth="1.2"/>
      <path d="M56 76 Q70 67 84 76" fill="#20314b" stroke="#0f1628" strokeWidth="1"/>
      <rect x="61" y="77" width="18" height="9" rx="2" fill="#c8def5" opacity="0.4"/>
      <circle cx="81" cy="87" r="2.5" fill="#d4a855"/>
      <circle cx="40" cy="10" r="2.5" fill="#d4a855"/>
      <circle cx="100" cy="6" r="2" fill="#d4a855"/>
      <path d="M36 8 L40 2 L44 8 L50 10 L44 12 L40 18 L36 12 L30 10 Z" fill="#d4a855" opacity="0.9"/>
      <circle cx="8" cy="97" r="5" fill="#6bbf6a"/>
      <circle cx="132" cy="97" r="5" fill="#6bbf6a"/>
      <line x1="4" y1="100" x2="136" y2="100" stroke="#6c75f4" strokeWidth="2.5"/>
    </svg>
  );
}

const STAGE_SVGS = [Bruchbude, KleineHuette, NettesZuhause, SchoenesZuhause, Schloss];

interface HouseProgressProps {
  progressPct: number;
}

export function HouseProgress({ progressPct }: HouseProgressProps) {
  const stage = getStage(progressPct);
  const StageSvg = STAGE_SVGS[stage];
  return <StageSvg />;
}
