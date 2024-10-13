import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaperSearch from "@/components/PaperSearch"
import OutlineGenerator from "@/components/OutlineGenerator"
import ArticleGenerator from "@/components/ArticleGenerator"
import { ModeToggle } from "@/components/ModeToggle"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">AI Article Generator</h1>
        <ModeToggle />
      </div>
      <Tabs defaultValue="paper-search" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="paper-search">Paper Search</TabsTrigger>
          <TabsTrigger value="outline-generator">Outline Generator</TabsTrigger>
          <TabsTrigger value="article-generator">Article Generator</TabsTrigger>
        </TabsList>
        <TabsContent value="paper-search">
          <PaperSearch />
        </TabsContent>
        <TabsContent value="outline-generator">
          <OutlineGenerator />
        </TabsContent>
        <TabsContent value="article-generator">
          <ArticleGenerator />
        </TabsContent>
      </Tabs>
    </div>
  )
}