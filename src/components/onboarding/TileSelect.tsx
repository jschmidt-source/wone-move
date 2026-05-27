'use client';

interface TileOption {
  value: string;
  label: string;
  emoji?: string;
}

interface TileSelectProps {
  options: TileOption[];
  value: string | null | string[];
  onChange: (value: string | string[]) => void;
  multiSelect?: boolean;
  hint?: string;
}

export function TileSelect({ options, value, onChange, multiSelect = false, hint }: TileSelectProps) {
  const isSelected = (optValue: string) => {
    if (multiSelect) return Array.isArray(value) && value.includes(optValue);
    return value === optValue;
  };

  const handleClick = (optValue: string) => {
    if (multiSelect) {
      const arr = Array.isArray(value) ? value : [];
      onChange(arr.includes(optValue) ? arr.filter((v) => v !== optValue) : [...arr, optValue]);
    } else {
      onChange(optValue);
    }
  };

  return (
    <div>
      {hint && (
        <p className="mb-3 text-[14px] font-normal text-muted-foreground">{hint}</p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => {
          const selected = isSelected(option.value);
          return (
            <button
              key={option.value}
              onClick={() => handleClick(option.value)}
              className="flex h-[88px] flex-col items-center justify-center rounded-[14px] transition-all duration-150"
              style={{
                backgroundColor: selected ? '#d2d5fc' : '#ffffff',
                border: selected ? '2px solid #6c75f4' : '1.5px solid #d2d5fc',
              }}
            >
              {option.emoji && (
                <span className="mb-1 text-2xl leading-none">{option.emoji}</span>
              )}
              <span className="text-[14px] font-bold text-foreground">{option.label}</span>
              {multiSelect && selected && (
                <span className="mt-0.5 text-[11px] font-bold text-primary">✓ gewählt</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
