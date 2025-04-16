import { ArrowLeft, FlaskRoundIcon as Flask } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import InorganicChemistryLesson from "@/components/lessons/inorganic-chemistry-lesson"

export default function InorganicChemistryPage() {
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
        <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
          <Flask size={24} />
        </div>
        <h1 className="text-3xl font-bold">Inorganic Chemistry</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Explore the chemistry of coordination compounds, transition metals, and main group elements, and learn about
        their properties and applications.
      </p>

      <InorganicChemistryLesson />
    </div>
  )
}

