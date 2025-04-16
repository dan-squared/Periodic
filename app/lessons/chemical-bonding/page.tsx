import { Atom, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ChemicalBondingLesson from "@/components/lessons/chemical-bonding-lesson"

export const metadata = {
  title: "Bonding | Interactive Chemistry",
  description: "Learn about different types of bonds and how they form.",
}

export default function ChemicalBondingPage() {
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
        <div className="p-2 rounded-full bg-muted/30 text-foreground">
          <Atom size={24} />
        </div>
        <h1 className="text-3xl font-bold">Chemical Bonding</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Learn about how atoms bond, form compounds, and how different bond types affect material properties.
      </p>

      <ChemicalBondingLesson />
    </div>
  )
}

