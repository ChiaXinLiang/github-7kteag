import { Card, CardContent } from "@/components/ui/card"

interface ParsedOutline {
  section: string;
  subsections: string[];
}

interface OutlineDisplayProps {
  outlines: ParsedOutline[];
}

export function OutlineDisplay({ outlines }: OutlineDisplayProps) {
  return (
    <div className="space-y-4">
      {outlines.map((outline, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-2">- {outline.section}</h3>
            <ul className="list-none pl-4">
              {outline.subsections.map((subsection, subIndex) => (
                <li key={subIndex} className="mb-1">-- {subsection}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}