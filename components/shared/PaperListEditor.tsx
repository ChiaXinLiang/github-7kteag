import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface PaperListEditorProps {
  paperLists: string[];
  onPaperListChange: (index: number, value: string) => void;
  onAddPaperList: () => void;
  onRemovePaperList: (index: number) => void;
}

export function PaperListEditor({
  paperLists,
  onPaperListChange,
  onAddPaperList,
  onRemovePaperList
}: PaperListEditorProps) {
  return (
    <div className="space-y-4">
      {paperLists.map((list, index) => (
        <div key={index} className="flex items-start space-x-2">
          <Textarea
            value={list}
            onChange={(e) => onPaperListChange(index, e.target.value)}
            placeholder={`Paper List ${index + 1}`}
            rows={3}
            className="flex-grow"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => onRemovePaperList(index)}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button onClick={onAddPaperList} className="w-full">
        <Plus className="h-4 w-4 mr-2" /> Add Paper List
      </Button>
    </div>
  )
}