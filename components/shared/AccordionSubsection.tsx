import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"

interface AccordionSubsectionProps {
  section: string;
  subsections: string[];
  onChange: (newSubsections: string[]) => void;
}

export function AccordionSubsection({ section, subsections, onChange }: AccordionSubsectionProps) {
  const handleSubsectionChange = (index: number, newContent: string) => {
    const newSubsections = [...subsections];
    newSubsections[index] = newContent;
    onChange(newSubsections);
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {subsections.map((subsection, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{subsection}</AccordionTrigger>
          <AccordionContent>
            <Textarea
              value={subsection}
              onChange={(e) => handleSubsectionChange(index, e.target.value)}
              rows={5}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}