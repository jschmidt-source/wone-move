'use client';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export function StepIndicator({ currentStep, totalSteps = 5 }: StepIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-2 pt-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          return (
            <div
              key={step}
              className="rounded-full transition-all duration-150"
              style={{
                width: isActive ? '12px' : '8px',
                height: isActive ? '12px' : '8px',
                backgroundColor: isActive || isCompleted ? '#646efb' : '#d2d5fc',
              }}
            />
          );
        })}
      </div>
      <p className="text-[14px] font-bold leading-[1.4] text-muted-foreground">
        Schritt {currentStep} von {totalSteps}
      </p>
    </div>
  );
}
