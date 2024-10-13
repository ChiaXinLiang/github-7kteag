import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"

interface AccordionSectionProps {
  items: Array<{
    title: string;
    content: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
  }>;
}

export function AccordionSection({ items }: AccordionSectionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <Textarea
              value={item.content}
              onChange={(e) => item.onChange && item.onChange(e.target.value)}
              readOnly={item.readOnly}
              rows={5}
              className="w-full"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}