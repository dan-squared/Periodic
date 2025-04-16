import { ArrowLeftRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import EquilibriumLesson from "@/components/lessons/equilibrium-lesson"

export default function EquilibriumPage() {
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
        <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
          <ArrowLeftRight size={24} />
        </div>
        <h1 className="text-3xl font-bold">Equilibrium</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Learn about chemical equilibrium, Le Chatelier's principle, equilibrium constants, and how to perform
        equilibrium calculations for various chemical systems.
      </p>

      <EquilibriumLesson />
    </div>
  )
}

