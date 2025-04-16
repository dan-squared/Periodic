import { Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ChemicalReactionsLesson from "@/components/lessons/chemical-reactions-lesson"

export default function ChemicalReactionsPage() {
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
        <div className="p-2 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          <Zap size={24} />
        </div>
        <h1 className="text-3xl font-bold">Chemical Reactions</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Explore the different types of chemical reactions, learn how to balance chemical equations, understand reaction
        rates, and discover the principles of redox reactions.
      </p>

      <ChemicalReactionsLesson />
    </div>
  )
}

