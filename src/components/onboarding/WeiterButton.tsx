'use client';

interface WeiterButtonProps {
  label?: string;
  onClick: () => void;
  disabled?: boolean;
}

export function WeiterButton({ label = 'Weiter', onClick, disabled = false }: WeiterButtonProps) {
  return (
    <div className="px-4 pb-4">
      <button
        onClick={onClick}
        disabled={disabled}
        className="h-[52px] w-full rounded-xl bg-primary text-[16px] font-bold text-white transition-all duration-100 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {label}
      </button>
    </div>
  );
}
