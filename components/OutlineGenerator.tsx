"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StepCard } from "./shared/StepCard"
import { AccordionSection } from "./shared/AccordionSection"
import { AccordionSubsection } from "./shared/AccordionSubsection"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_SECTIONS_AND_SUBSECTIONS } from "@/lib/constants"

const steps = [
  { name: "Topic", description: "Enter the main topic for your article" },
  { name: "Sections", description: "Generate and review main sections" },
  { name: "Subsections", description: "Generate and review subsections" },
  { name: "Final Outline", description: "Review and confirm the final outline" }
]

export default function OutlineGenerator() {
  const [topic, setTopic] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [sections, setSections] = useState<string[]>([])
  const [subsections, setSubsections] = useState<{ [key: string]: string[] }>({})
  const [finalOutline, setFinalOutline] = useState("")
  const [prompts, setPrompts] = useState(Array(steps.length).fill(""))
  const [selectedSection, setSelectedSection] = useState("")

  const generateSections = async (topic: string) => {
    // TODO: Replace with actual API call to LLM server
    const prompt = `Generate main sections for the topic: ${topic}`
    setPrompts(prev => {
      const newPrompts = [...prev]
      newPrompts[1] = prompt
      return newPrompts
    })
    return [`Introduction to ${topic}`, `Main aspects of ${topic}`, `Applications of ${topic}`, `Conclusion`]
  }

  const generateSubsections = async (sections: string[]) => {
    // TODO: Replace with actual API call to LLM server
    const prompt = `Generate subsections for the following sections:\n${sections.join('\n')}`
    setPrompts(prev => {
      const newPrompts = [...prev]
      newPrompts[2] = prompt
      return newPrompts
    })
    return sections.reduce((acc, section) => {
      acc[section] = [`${section} - Subsection 1`, `${section} - Subsection 2`, `${section} - Subsection 3`]
      return acc
    }, {} as { [key: string]: string[] })
  }

  const handleNext = async () => {
    if (currentStep === 0 && topic) {
      const generatedSections = await generateSections(topic)
      setSections(generatedSections)
    } else if (currentStep === 1) {
      const generatedSubsections = await generateSubsections(sections)
      setSubsections(generatedSubsections)
    } else if (currentStep === 2) {
      const outline = sections.map(section => {
        return `${section}\n${subsections[section].map(sub => `  - ${sub}`).join('\n')}`
      }).join('\n\n')
      setFinalOutline(outline)
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleConfirm = () => {
    console.log("Final outline confirmed:", finalOutline)
  }

  const handleDownload = () => {
    // TODO: Implement prompt download logic
    console.log("Downloading prompt:", prompts[currentStep])
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement result upload logic
    console.log("Uploading result:", event.target.files?.[0])
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Input
            type="text"
            placeholder="Enter your article topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-4"
          />
        )
      case 1:
        return (
          <AccordionSection
            items={sections.map((section, index) => ({
              title: `Section ${index + 1}`,
              content: section,
              onChange: (value) => {
                const newSections = [...sections]
                newSections[index] = value
                setSections(newSections)
              }
            }))}
          />
        )
      case 2:
        return (
          <div className="space-y-4">
            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select a section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section, index) => (
                  <SelectItem key={index} value={section}>
                    {section}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedSection && (
              <AccordionSubsection
                section={selectedSection}
                subsections={subsections[selectedSection] || []}
                onChange={(newSubsections) => {
                  setSubsections(prev => ({
                    ...prev,
                    [selectedSection]: newSubsections
                  }))
                }}
              />
            )}
          </div>
        )
      case 3:
        return (
          <Textarea
            value={finalOutline}
            onChange={(e) => setFinalOutline(e.target.value)}
            rows={15}
            className="w-full"
          />
        )
    }
  }

  return (
    <div className="space-y-4">
      <StepCard
        title={steps[currentStep].name}
        description={steps[currentStep].description}
        currentStep={currentStep}
        totalSteps={steps.length}
        onBack={handleBack}
        onNext={handleNext}
        onConfirm={handleConfirm}
        onDownload={handleDownload}
        onUpload={handleUpload}
        isNextDisabled={currentStep === 0 && !topic}
        isDownloadDisabled={!prompts[currentStep]}
      >
        {renderStepContent()}
      </StepCard>
      {currentStep === steps.length - 1 && (
        <div className="flex justify-end">
          <Button onClick={() => {
            setCurrentStep(0)
            setTopic("")
            setSections([])
            setSubsections({})
            setFinalOutline("")
          }}>Start New Outline</Button>
        </div>
      )}
    </div>
  )
}