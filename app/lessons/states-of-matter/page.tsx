import { Layers, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import StatesOfMatterLesson from "@/components/lessons/states-of-matter-lesson"

export default function StatesOfMatterPage() {
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
        <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
          <Layers size={24} />
        </div>
        <h1 className="text-3xl font-bold">States of Matter</h1>
      </div>

      <p className="text-lg mb-8 text-muted-foreground">
        Learn about the different states of matter, phase changes, gas laws, and the kinetic molecular theory that
        explains the behavior of matter at the molecular level.
      </p>

      <StatesOfMatterLesson />
    </div>
  )
}

