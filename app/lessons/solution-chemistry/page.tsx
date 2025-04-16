import { Droplet, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import SolutionChemistryLesson from "@/components/lessons/solution-chemistry-lesson"

export default function SolutionChemistryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/lessons">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft size={16} />
            <span>Back to Lessons</span>
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
          <Droplet size={24} />
        </div>
        <h1 className="text-3xl font-bold">Solution Chemistry</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Discover the properties of solutions, learn about concentration units, understand colligative properties, and
        explore acid-base solutions and their applications.
      </p>

      <SolutionChemistryLesson />
    </div>
  )
}

