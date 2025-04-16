"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import ElementPropertyCard from "./element-property-card"
import { elements, type Element } from "@/lib/element-data"
import Link from "next/link"

interface StandaloneElementViewProps {
  elementSymbol?: string
}

export default function StandaloneElementView({ elementSymbol }: StandaloneElementViewProps) {
  const router = useRouter()
  const [element, setElement] = useState<Element | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    try {
      if (elementSymbol) {
        const foundElement = elements.find((e) => e.symbol.toLowerCase() === elementSymbol.toLowerCase())
        if (foundElement) {
          setElement(foundElement)
          setError(null)
        } else {
          setError(`Element with symbol "${elementSymbol}" not found`)
          setElement(null)
        }
      } else {
        // Default to hydrogen if no symbol provided
        setElement(elements[0])
        setError(null)
      }
    } catch (err) {
      console.error("Error loading element:", err)
      setError("Failed to load element data")
    } finally {
      setLoading(false)
    }
  }, [elementSymbol])

  const handlePrevious = () => {
    if (!element) return

    const currentIndex = elements.findIndex((e) => e.atomicNumber === element.atomicNumber)
    if (currentIndex > 0) {
      const prevElement = elements[currentIndex - 1]
      router.push(`/element/${prevElement.symbol.toLowerCase()}`)
    }
  }

  const handleNext = () => {
    if (!element) return

    const currentIndex = elements.findIndex((e) => e.atomicNumber === element.atomicNumber)
    if (currentIndex < elements.length - 1) {
      const nextElement = elements[currentIndex + 1]
      router.push(`/element/${nextElement.symbol.toLowerCase()}`)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-lg">Loading element data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="text-destructive text-lg font-medium">{error}</div>
        <Link href="/element/h">
          <Button variant="outline" className="gap-2">
            <Home size={16} />
            <span>View Hydrogen</span>
          </Button>
        </Link>
      </div>
    )
  }

  if (!element) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-lg">Element not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-1">
            <Home size={16} />
            <span>Periodic Table</span>
          </Button>
        </Link>

        <h1 className="text-2xl font-bold text-center">Element Details</h1>

        <div className="invisible">
          {/* Spacer for centering */}
          <Button variant="outline" size="sm">
            <Home size={16} />
          </Button>
        </div>
      </div>

      <ElementPropertyCard element={element} />

      <div className="flex justify-between mt-6">
        <Button onClick={handlePrevious} disabled={element.atomicNumber <= 1} className="gap-1">
          <ArrowLeft size={16} />
          <span>Previous</span>
        </Button>

        <div className="text-center px-4 py-2 rounded-md bg-muted/20">
          <span className="text-sm text-muted-foreground">Element</span>
          <div className="font-bold">
            {element.atomicNumber} of {elements.length}
          </div>
        </div>

        <Button onClick={handleNext} disabled={element.atomicNumber >= elements.length} className="gap-1">
          <span>Next</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}

