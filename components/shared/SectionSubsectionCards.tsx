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

interface SectionSubsectionCardsProps {
  sections: Section[];
  onSubsectionChange: (sectionIndex: number, subsectionIndex: number, newContent: string) => void;
}

export function SectionSubsectionCards({ sections, onSubsectionChange }: SectionSubsectionCardsProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, sectionIndex) => (
        <Card key={sectionIndex}>
          <CardHeader>
            <CardTitle>{section.section}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {section.subsections.map((subsection, subsectionIndex) => (
                <Card key={subsectionIndex}>
                  <CardHeader>
                    <CardTitle className="text-lg">{subsection.title}</CardTitle>
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
          </CardContent>
        </Card>
      ))}
    </div>
  )
}