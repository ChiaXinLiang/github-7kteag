import { Textarea } from "@/components/ui/textarea"

interface ArticleSectionProps {
  section: {
    title: string;
    content: string;
    references: string[];
  };
  onChange: (content: string) => void;
}

export function ArticleSection({ section, onChange }: ArticleSectionProps) {
  return (
    <div>
      <Textarea
        value={section.content}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        className="w-full mb-2"
      />
      <h4 className="font-semibold mb-1">References:</h4>
      <ul className="list-disc pl-5">
        {section.references.map((ref, refIndex) => (
          <li key={refIndex}>{ref}</li>
        ))}
      </ul>
    </div>
  )
}