'use client';

import { Camera } from 'lucide-react';

export function PhotoSlot() {
  return (
    <div
      className="flex aspect-square w-full flex-col items-center justify-center rounded-[8px] bg-background"
      style={{ border: '1.5px dashed #d2d5fc' }}
    >
      <Camera size={20} color="#5b6377" />
      <span className="mt-1 text-[14px] font-normal text-muted-foreground">Foto</span>
    </div>
  );
}
