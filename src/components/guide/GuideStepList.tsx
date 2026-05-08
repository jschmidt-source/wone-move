import { GuideStep } from '@/types/checklist';

interface Props {
  steps: GuideStep[];
}

export function GuideStepList({ steps }: Props) {
  return (
    <ol className="flex flex-col gap-4">
      {steps.map((step, idx) => (
        <li key={step.number} className="relative flex gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[14px] font-bold text-white">
              {step.number}
            </div>
            {idx < steps.length - 1 && (
              <div
                aria-hidden
                className="mt-1 w-px flex-1"
                style={{
                  borderLeft: '1px dashed #d2d5fc',
                  minHeight: 24,
                }}
              />
            )}
          </div>
          <div className="flex-1 pb-1">
            <p className="text-[16px] font-bold text-foreground">{step.title}</p>
            <p className="mt-1 text-[14px] font-normal leading-[1.5] text-muted-foreground">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
