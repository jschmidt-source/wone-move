'use client';

import { Switch } from '@/components/ui/switch';

interface ToggleItem {
  key: string;
  label: string;
}

interface ToggleListProps {
  items: ToggleItem[];
  values: Record<string, boolean>;
  onChange: (key: string, value: boolean) => void;
}

export function ToggleList({ items, values, onChange }: ToggleListProps) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.key}
          className="flex h-[56px] items-center justify-between rounded-[10px] bg-white px-4"
        >
          <span className="text-[16px] font-normal text-foreground">{item.label}</span>
          <Switch
            checked={values[item.key] ?? false}
            onCheckedChange={(checked) => onChange(item.key, checked)}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-[#d2d5fc]"
          />
        </div>
      ))}
    </div>
  );
}
