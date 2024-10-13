"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { StepCard } from "./shared/StepCard"
import { AccordionSection } from "./shared/AccordionSection"
import { OutlineDisplay } from "./shared/OutlineDisplay"
import { SectionSubsectionCards } from "./shared/SectionSubsectionCards"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_SECTIONS_AND_SUBSECTIONS } from "@/lib/constants"

interface ParsedOutline {
  section: string;
  subsections: string[];
}

interface Subsection {
  title: string;
  content: string;
  references: string[];
}

interface Section {
  section: string;
  subsections: Subsection[];
}

const steps = [
  { name: "Paste Outline", description: "Paste your article outline" },
  { name: "Review Outline", description: "Review and edit the parsed outline" },
  { name: "Generate Content", description: "Generate content for each subsection" },
  { name: "Review Article", description: "Review and edit the generated article" },
  { name: "LaTeX Format", description: "View the article in LaTeX format" },
  { name: "Final Article", description: "Make final edits to the LaTeX article" }
]

export default function ArticleGenerator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [outline, setOutline] = useState("")
  const [parsedOutlines, setParsedOutlines] = useState<ParsedOutline[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [latexArticle, setLatexArticle] = useState("")
  const [finalArticle, setFinalArticle] = useState("")

  const handleNext = async () => {
    if (currentStep === 0) {
      // Parse the outline
      const parsed = parseOutline(outline)
      setParsedOutlines(parsed)
    } else if (currentStep === 1) {
      // Generate content for subsections
      const generatedSections = await generateSections(parsedOutlines)
      setSections(generatedSections)
    } else if (currentStep === 2) {
      // Generate LaTeX format
      const latex = generateLatex(sections)
      setLatexArticle(latex)
    } else if (currentStep === 3) {
      // Set final article
      setFinalArticle(latexArticle)
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleConfirm = () => {
    console.log("Final article confirmed:", finalArticle)
    // Here you can implement logic to save or further process the final article
  }

  const parseOutline = (text: string): ParsedOutline[] => {
    const lines = text.split('\n')
    const parsed: ParsedOutline[] = []
    let currentSection: ParsedOutline | null = null

    lines.forEach(line => {
      if (line.startsWith('- ')) {
        if (currentSection) parsed.push(currentSection)
        currentSection = { section: line.slice(2), subsections: [] }
      } else if (line.startsWith('-- ') && currentSection) {
        currentSection.subsections.push(line.slice(3))
      }
    })

    if (currentSection) parsed.push(currentSection)
    return parsed
  }

  const generateSections = async (outlines: ParsedOutline[]): Promise<Section[]> => {
    // Using mock data instead of API call
    return MOCK_SECTIONS_AND_SUBSECTIONS.map(mockSection => ({
      section: mockSection.section,
      subsections: mockSection.subsections.map(mockSubsection => ({
        title: mockSubsection.title,
        content: mockSubsection.content,
        references: ["Reference 1", "Reference 2"]  // Mock references
      }))
    }))
  }

  const generateLatex = (sections: Section[]): string => {
    // Implement actual LaTeX generation logic here
    return sections.map(section => `
\\section{${section.section}}
${section.subsections.map(sub => `
\\subsection{${sub.title}}
${sub.content}

\\begin{thebibliography}{99}
${sub.references.map((ref, index) => `\\bibitem{ref${index + 1}} ${ref}`).join('\n')}
\\end{thebibliography}
`).join('\n')}
    `).join('\n\n')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Textarea
            placeholder="Paste your article outline here"
            value={outline}
            onChange={(e) => setOutline(e.target.value)}
            rows={10}
          />
        )
      case 1:
        return <OutlineDisplay outlines={parsedOutlines} />
      case 2:
        return (
          <SectionSubsectionCards
            sections={sections}
            onSubsectionChange={(sectionIndex, subsectionIndex, newContent) => {
              const updatedSections = [...sections]
              updatedSections[sectionIndex].subsections[subsectionIndex].content = newContent
              setSections(updatedSections)
            }}
          />
        )
      case 3:
        return (
          <AccordionSection
            items={sections.map((section) => ({
              title: section.section,
              content: section.subsections.map(sub => 
                `${sub.title}\n\n${sub.content}\n\nReferences:\n${sub.references.join('\n')}`
              ).join('\n\n'),
              readOnly: true
            }))}
          />
        )
      case 4:
        return (
          <Textarea
            value={latexArticle}
            readOnly
            rows={20}
            className="w-full font-mono text-sm"
          />
        )
      case 5:
        return (
          <Textarea
            value={finalArticle}
            onChange={(e) => setFinalArticle(e.target.value)}
            rows={20}
            className="w-full font-mono text-sm"
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
        onDownload={() => {}}
        onUpload={() => {}}
        isNextDisabled={currentStep === 0 && !outline}
        isDownloadDisabled={true}
      >
        {renderStepContent()}
      </StepCard>
    </div>
  )
}