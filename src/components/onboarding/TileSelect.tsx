'use client';

interface TileOption {
  value: string;
  label: string;
  emoji?: string;
}

interface TileSelectProps {
  options: TileOption[];
  value: string | null;
  onChange: (value: string) => void;
}

export function TileSelect({ options, value, onChange }: TileSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className="flex h-[88px] flex-col items-center justify-center rounded-[14px] transition-all duration-150"
            style={{
              backgroundColor: isSelected ? '#d2d5fc' : '#ffffff',
              border: isSelected ? '2px solid #646efb' : '1.5px solid #d2d5fc',
            }}
          >
            {option.emoji && (
              <span className="mb-1 text-2xl leading-none">{option.emoji}</span>
            )}
            <span className="text-[14px] font-bold text-foreground">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
