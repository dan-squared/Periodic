import { FlaskRoundIcon as Flask, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OrganicChemistryLesson from "@/components/lessons/organic-chemistry-lesson"

export default function OrganicChemistryPage() {
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
        <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <Flask size={24} />
        </div>
        <h1 className="text-3xl font-bold">Organic Chemistry</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Explore the chemistry of carbon compounds, learn about functional groups, IUPAC nomenclature, isomerism, and
        organic reactions that form the basis of life and modern materials.
      </p>

      <OrganicChemistryLesson />
    </div>
  )
}

