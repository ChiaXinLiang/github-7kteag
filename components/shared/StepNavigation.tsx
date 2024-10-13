import { Button } from "@/components/ui/button"

interface StepNavigationProps {
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  onConfirm: () => void
  isNextDisabled?: boolean
}

export function StepNavigation({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onConfirm,
  isNextDisabled = false
}: StepNavigationProps) {
  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={currentStep === 0}
      >
        Back
      </Button>
      {currentStep < totalSteps - 1 ? (
        <Button onClick={onNext} disabled={isNextDisabled}>
          Next
        </Button>
      ) : (
        <Button onClick={onConfirm}>Confirm</Button>
      )}
    </div>
  )
}