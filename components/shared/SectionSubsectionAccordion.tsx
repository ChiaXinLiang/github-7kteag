import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface Subsection {
  title: string;
  content: string;
  references: string[];
}

interface Section {
  section: string;
  subsections: Subsection[];
}

interface SectionSubsectionAccordionProps {
  sections: Section[];
  onSubsectionChange: (sectionIndex: number, subsectionIndex: number, newContent: string) => void;
}

export function SectionSubsectionAccordion({ sections, onSubsectionChange }: SectionSubsectionAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {sections.map((section, sectionIndex) => (
        <AccordionItem value={`section-${sectionIndex}`} key={sectionIndex}>
          <AccordionTrigger>{section.section}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {section.subsections.map((subsection, subsectionIndex) => (
                <Card key={subsectionIndex}>
                  <CardHeader>
                    <CardTitle>{subsection.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={subsection.content}
                      onChange={(e) => onSubsectionChange(sectionIndex, subsectionIndex, e.target.value)}
                      rows={5}
                      className="w-full mb-2"
                    />
                    <h4 className="font-semibold mb-1">References:</h4>
                    <ul className="list-disc pl-5">
                      {subsection.references.map((ref, refIndex) => (
                        <li key={refIndex}>{ref}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}