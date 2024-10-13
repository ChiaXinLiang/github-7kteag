import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StepNavigation } from "./StepNavigation"
import { PromptActions } from "./PromptActions"

interface StepCardProps {
  title: string
  description: string
  children: React.ReactNode
  currentStep: number
  totalSteps: number
  onBack: () => void
  onNext: () => void
  onConfirm: () => void
  onDownload: () => void
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  isNextDisabled?: boolean
  isDownloadDisabled: boolean
}

export function StepCard({
  title,
  description,
  children,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  onConfirm,
  onDownload,
  onUpload,
  isNextDisabled = false,
  isDownloadDisabled
}: StepCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{description}</p>
        {children}
        <div className="mt-4 flex justify-between items-center">
          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onBack={onBack}
            onNext={onNext}
            onConfirm={onConfirm}
            isNextDisabled={isNextDisabled}
          />
          <PromptActions
            onDownload={onDownload}
            onUpload={onUpload}
            isDownloadDisabled={isDownloadDisabled}
          />
        </div>
      </CardContent>
    </Card>
  )
}