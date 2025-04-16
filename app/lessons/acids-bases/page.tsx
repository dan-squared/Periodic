import { Beaker, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AcidsBasesLesson from "@/components/lessons/acids-bases-lesson"

export default function AcidsBasesPage() {
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
          <Beaker size={24} />
        </div>
        <h1 className="text-3xl font-bold">Acids and Bases</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Explore the properties of acids and bases, the pH scale, neutralization reactions, and buffer solutions that are
        fundamental to chemistry and biology.
      </p>

      <AcidsBasesLesson />
    </div>
  )
}

