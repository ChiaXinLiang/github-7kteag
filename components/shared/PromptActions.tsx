import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Upload } from "lucide-react"

interface PromptActionsProps {
  onDownload: () => void
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  isDownloadDisabled: boolean
}

export function PromptActions({ onDownload, onUpload, isDownloadDisabled }: PromptActionsProps) {
  return (
    <div className="space-x-2">
      <Button variant="outline" onClick={onDownload} disabled={isDownloadDisabled}>
        <Download className="w-4 h-4 mr-2" />
        Download Prompt
      </Button>
      <label htmlFor="file-upload" className="cursor-pointer">
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={onUpload}
          accept=".txt"
        />
        <Button variant="outline" as="span">
          <Upload className="w-4 h-4 mr-2" />
          Upload Result
        </Button>
      </label>
    </div>
  )
}