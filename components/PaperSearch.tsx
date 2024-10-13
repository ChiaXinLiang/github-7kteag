"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Search, Filter } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export default function PaperSearch() {
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [category, setCategory] = useState("")
  const [author, setAuthor] = useState("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [matchCount, setMatchCount] = useState(10)
  const [matchThreshold, setMatchThreshold] = useState(0.5)
  const [useSemanticSearch, setUseSemanticSearch] = useState(false)

  const handleSearch = async () => {
    // TODO: Implement actual paper search API call
    console.log("Search with:", { query, category, author, startDate, endDate, matchCount, matchThreshold, useSemanticSearch })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Search arXiv Papers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter your search query here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <div className="flex items-center space-x-2">
              <Switch
                id="semantic-search"
                checked={useSemanticSearch}
                onCheckedChange={setUseSemanticSearch}
              />
              <Label htmlFor="semantic-search">Use Semantic Search</Label>
            </div>
          </div>

          {showFilters && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Categories</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs.AI">Computer Science - Artificial Intelligence</SelectItem>
                      <SelectItem value="cs.CL">Computer Science - Computation and Language</SelectItem>
                      <SelectItem value="cs.LG">Computer Science - Machine Learning</SelectItem>
                      <SelectItem value="stat.ML">Statistics - Machine Learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Date Range</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !startDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : <span>Start Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !endDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : <span>End Date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Label>Authors</Label>
                  <Input
                    placeholder="Enter author names"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label>Match Count: {matchCount}</Label>
                <Slider
                  value={[matchCount]}
                  onValueChange={(value) => setMatchCount(value[0])}
                  max={100}
                  step={1}
                />
              </div>
              <div>
                <Label>Match Threshold: {matchThreshold.toFixed(2)}</Label>
                <Slider
                  value={[matchThreshold]}
                  onValueChange={(value) => setMatchThreshold(value[0])}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}