import { Thermometer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ThermochemistryLesson from "@/components/lessons/thermochemistry-lesson"

export default function ThermochemistryPage() {
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
        <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
          <Thermometer size={24} />
        </div>
        <h1 className="text-3xl font-bold">Thermochemistry</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Learn about energy changes in chemical reactions, heat transfer, enthalpy, and how to use thermochemical
        principles to understand and predict chemical processes.
      </p>

      <ThermochemistryLesson />
    </div>
  )
}

