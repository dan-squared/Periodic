"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Beaker, Droplet, FlaskRoundIcon as Flask, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AcidsBasesLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [phValue, setPhValue] = useState(7)
  const [concentration, setConcentration] = useState(0.1)
  const [pKa, setPKa] = useState(4.7)
  const [showAnimation, setShowAnimation] = useState(true)

  // pH calculator
  const [acidConcentration, setAcidConcentration] = useState("0.1")
  const [calculatedPh, setCalculatedPh] = useState<number | null>(null)

  const calculatePh = () => {
    const concentration = Number.parseFloat(acidConcentration)
    if (isNaN(concentration) || concentration <= 0) {
      setCalculatedPh(null)
      return
    }

    // Simplified pH calculation for a strong acid
    const pH = -Math.log10(concentration)
    setCalculatedPh(Number.parseFloat(pH.toFixed(2)))
  }

  // Reset calculated pH when input changes
  useEffect(() => {
    setCalculatedPh(null)
  }, [acidConcentration])

  const getPhColor = (ph: number) => {
    if (ph <= 3) return "bg-red-500"
    if (ph <= 6) return "bg-orange-500"
    if (ph <= 8) return "bg-green-500"
    if (ph <= 11) return "bg-blue-500"
    return "bg-purple-500"
  }

  const sections = [
    {
      title: "Properties of Acids and Bases",
      content: (
        <div className="space-y-4">
          <p>
            Acids and bases are important classes of chemical compounds with distinct properties that affect their
            behavior in solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Beaker className="mr-2 text-red-500" size={20} />
                Acids
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Taste sour (like lemon juice or vinegar)</li>
                <li>Turn blue litmus paper red</li>
                <li>pH less than 7</li>
                <li>Donate protons (H⁺) or accept electron pairs</li>
                <li>React with metals to produce hydrogen gas</li>
                <li>React with bases to form water and a salt</li>
                <li>Conduct electricity in aqueous solution</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> HCl (hydrochloric acid), H₂SO₄ (sulfuric acid), CH₃COOH (acetic acid)
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Beaker className="mr-2 text-blue-500" size={20} />
                Bases
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Taste bitter (like soap or baking soda)</li>
                <li>Turn red litmus paper blue</li>
                <li>pH greater than 7</li>
                <li>Accept protons (H⁺) or donate electron pairs</li>
                <li>Feel slippery or soapy</li>
                <li>React with acids to form water and a salt</li>
                <li>Conduct electricity in aqueous solution</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> NaOH (sodium hydroxide), NH₃ (ammonia), Mg(OH)₂ (milk of magnesia)
              </div>
            </div>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Acid-Base Theories:</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Arrhenius Theory:</div>
                <ul className="list-disc pl-5">
                  <li>Acids produce H⁺ ions in water</li>
                  <li>Bases produce OH⁻ ions in water</li>
                </ul>
              </div>

              <div>
                <div className="font-medium">Brønsted-Lowry Theory:</div>
                <ul className="list-disc pl-5">
                  <li>Acids are proton (H⁺) donors</li>
                  <li>Bases are proton (H⁺) acceptors</li>
                </ul>
              </div>

              <div>
                <div className="font-medium">Lewis Theory:</div>
                <ul className="list-disc pl-5">
                  <li>Acids are electron pair acceptors</li>
                  <li>Bases are electron pair donors</li>
                </ul>
              </div>
            </div>
          </div>

          {showAnimation && (
            <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-red-50 to-blue-50 dark:from-red-950 dark:to-blue-950">
              <div className="absolute inset-0 flex items-center justify-center">
                <AcidBaseAnimation />
              </div>
              <div className="absolute bottom-2 right-2">
                <Button variant="outline" size="sm" onClick={() => setShowAnimation(false)} className="text-xs">
                  Hide Animation
                </Button>
              </div>
            </div>
          )}

          {!showAnimation && (
            <div className="flex justify-center">
              <Button variant="outline" onClick={() => setShowAnimation(true)}>
                Show Animation
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: "The pH Scale",
      content: (
        <div className="space-y-4">
          <p>
            The pH scale measures how acidic or basic a solution is. It ranges from 0 to 14, with 7 being neutral. The
            pH value represents the negative logarithm of the hydrogen ion concentration: pH = -log[H⁺].
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">pH Scale Ranges:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>pH &lt; 7: Acidic solutions</li>
              <li>pH = 7: Neutral solutions</li>
              <li>pH &gt; 7: Basic solutions</li>
              <li>Each pH unit represents a 10-fold change in H⁺ concentration</li>
            </ul>
          </div>

          <div className="relative border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Interactive pH Scale</h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Acidic</span>
                <span>Neutral</span>
                <span>Basic</span>
              </div>
              <div className="h-8 rounded-lg overflow-hidden flex">
                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 flex-1"></div>
                <div className="h-full bg-green-500 w-8"></div>
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 flex-1"></div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
                <span>9</span>
                <span>10</span>
                <span>11</span>
                <span>12</span>
                <span>13</span>
                <span>14</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Select pH value: {phValue.toFixed(1)}</label>
                <span
                  className={`text-sm font-medium ${
                    phValue < 7 ? "text-red-500" : phValue > 7 ? "text-blue-500" : "text-green-500"
                  }`}
                >
                  {phValue < 7 ? "Acidic" : phValue > 7 ? "Basic" : "Neutral"}
                </span>
              </div>
              <Slider value={[phValue]} min={0} max={14} step={0.1} onValueChange={(value) => setPhValue(value[0])} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {[
                { name: "Battery Acid", ph: 1.0 },
                { name: "Lemon Juice", ph: 2.0 },
                { name: "Vinegar", ph: 3.0 },
                { name: "Orange Juice", ph: 3.5 },
                { name: "Tomato", ph: 4.5 },
                { name: "Black Coffee", ph: 5.0 },
                { name: "Urine", ph: 6.0 },
                { name: "Pure Water", ph: 7.0 },
                { name: "Sea Water", ph: 8.0 },
                { name: "Baking Soda", ph: 9.0 },
                { name: "Milk of Magnesia", ph: 10.5 },
                { name: "Household Ammonia", ph: 11.0 },
                { name: "Bleach", ph: 12.5 },
                { name: "Drain Cleaner", ph: 14.0 },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`p-2 rounded-lg text-xs text-center cursor-pointer transition-colors ${
                    Math.abs(phValue - item.ph) < 0.5 ? "border-2 border-primary" : "border border-muted-foreground/20"
                  } ${getPhColor(item.ph)}`}
                  onClick={() => setPhValue(item.ph)}
                >
                  <div className="font-medium text-white">{item.name}</div>
                  <div className="text-white/80">pH {item.ph}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">pH Calculator</h3>
            <p className="mb-4">Calculate the pH of a strong acid solution:</p>

            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Acid Concentration (mol/L)</label>
                <Input
                  type="number"
                  placeholder="Enter concentration"
                  value={acidConcentration}
                  onChange={(e) => setAcidConcentration(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={calculatePh}>Calculate</Button>
              </div>
            </div>

            {calculatedPh !== null && (
              <div className={`p-3 rounded-lg text-center ${getPhColor(calculatedPh)} text-white`}>
                pH = {calculatedPh}
              </div>
            )}

            <div className="mt-2 text-sm text-muted-foreground">
              <p>For a strong acid: pH = -log[H⁺]</p>
              <p>For a strong base: pH = 14 - (-log[OH⁻])</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Acid-Base Indicators",
      content: <IndicatorsSection />,
    },
    {
      title: "Acid-Base Reactions",
      content: (
        <div className="space-y-4">
          <p>
            Acid-base reactions, also known as neutralization reactions, occur when an acid and a base react to form
            water and a salt. These reactions are important in many biological and industrial processes.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">General Neutralization Reaction:</h3>
            <div className="text-center text-lg font-medium my-3">Acid + Base → Salt + Water</div>
            <div className="text-center text-lg font-medium my-3">HX + MOH → MX + H₂O</div>
            <p className="text-sm">Where HX is an acid, MOH is a base, MX is a salt, and H₂O is water.</p>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <NeutralizationAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Example: HCl + NaOH</h3>
              <div className="text-center my-3">HCl + NaOH → NaCl + H₂O</div>
              <p className="text-sm">
                Hydrochloric acid reacts with sodium hydroxide to form sodium chloride (table salt) and water. This is a
                complete neutralization reaction where the pH of the resulting solution is 7.
              </p>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Example: H₂SO₄ + 2KOH</h3>
              <div className="text-center my-3">H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O</div>
              <p className="text-sm">
                Sulfuric acid reacts with potassium hydroxide to form potassium sulfate and water. Note that two moles
                of KOH are needed to neutralize one mole of H₂SO₄ because H₂SO₄ has two acidic hydrogens.
              </p>
            </div>
          </div>

          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Titration</h3>
            <p className="mb-3">
              Titration is a laboratory technique used to determine the concentration of an acid or base by reacting it
              with a standard solution of known concentration.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Key Components:</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>Analyte: The solution of unknown concentration</li>
                  <li>Titrant: The solution of known concentration</li>
                  <li>Indicator: A substance that changes color at the equivalence point</li>
                  <li>Burette: Used to add titrant in precise amounts</li>
                  <li>Equivalence point: When the reaction is complete</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Common Indicators:</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>Phenolphthalein: Colorless in acid, pink in base (pH 8.2-10)</li>
                  <li>Methyl orange: Red in acid, yellow in base (pH 3.1-4.4)</li>
                  <li>Litmus: Red in acid, blue in base (pH 4.5-8.3)</li>
                  <li>Bromothymol blue: Yellow in acid, blue in base (pH 6.0-7.6)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Buffer Solutions",
      content: (
        <div className="space-y-4">
          <p>
            Buffer solutions resist changes in pH when small amounts of acid or base are added. They are crucial in
            biological systems and many chemical processes where maintaining a stable pH is important.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Characteristics:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Consist of a weak acid and its conjugate base (or a weak base and its conjugate acid)</li>
              <li>Maintain a relatively constant pH when small amounts of acid or base are added</li>
              <li>Have a limited capacity (buffer capacity) to neutralize added acid or base</li>
              <li>Most effective when the concentrations of the acid and conjugate base are approximately equal</li>
              <li>Most effective when pH ≈ pKa of the weak acid</li>
            </ul>
          </div>

          <div className="relative border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Interactive Buffer Simulation</h3>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Acid/Base Ratio: {concentration.toFixed(2)}</label>
                <span className="text-sm font-medium">pH = {(pKa + Math.log10(concentration)).toFixed(2)}</span>
              </div>
              <Slider
                value={[concentration]}
                min={0.01}
                max={10}
                step={0.01}
                onValueChange={(value) => setConcentration(value[0])}
              />
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">pKa value: {pKa.toFixed(1)}</label>
              </div>
              <Slider value={[pKa]} min={2} max={10} step={0.1} onValueChange={(value) => setPKa(value[0])} />
            </div>

            <div className="h-40 border rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 flex">
                <div
                  className="h-full bg-red-400 transition-all duration-300"
                  style={{ width: `${(1 / (1 + concentration)) * 100}%` }}
                >
                  <div className="h-full flex items-center justify-center text-white font-medium">Acid (HA)</div>
                </div>
                <div
                  className="h-full bg-blue-400 transition-all duration-300"
                  style={{ width: `${(concentration / (1 + concentration)) * 100}%` }}
                >
                  <div className="h-full flex items-center justify-center text-white font-medium">Base (A⁻)</div>
                </div>
              </div>

              <div className="absolute bottom-2 left-0 right-0 text-center text-sm">
                <div className="bg-white/80 dark:bg-black/80 mx-auto max-w-xs p-1 rounded">
                  pH = pKa + log([A⁻]/[HA]) = {(pKa + Math.log10(concentration)).toFixed(2)}
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>Henderson-Hasselbalch Equation: pH = pKa + log([A⁻]/[HA])</p>
              <p>When [A⁻] = [HA], pH = pKa</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Common Buffer Systems</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Acetic acid/Acetate:</strong> CH₃COOH/CH₃COO⁻ (pKa ≈ 4.7)
                </li>
                <li>
                  <strong>Carbonic acid/Bicarbonate:</strong> H₂CO₃/HCO₃⁻ (pKa ≈ 6.4)
                </li>
                <li>
                  <strong>Phosphate:</strong> H₂PO₄⁻/HPO₄²⁻ (pKa ≈ 7.2)
                </li>
                <li>
                  <strong>Ammonia/Ammonium:</strong> NH₃/NH₄⁺ (pKa ≈ 9.2)
                </li>
                <li>
                  <strong>TRIS:</strong> (HOCH₂)₃CNH₂/(HOCH₂)₃CNH₃⁺ (pKa ≈ 8.1)
                </li>
              </ul>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Biological Importance</h3>
              <p className="mb-2">Buffer systems are essential in biological systems to maintain pH homeostasis:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Blood:</strong> Bicarbonate buffer (pH ≈ 7.4)
                </li>
                <li>
                  <strong>Intracellular fluid:</strong> Phosphate buffer (pH ≈ 7.0)
                </li>
                <li>
                  <strong>Proteins:</strong> Amino acid side chains act as buffers
                </li>
                <li>
                  <strong>Oceans:</strong> Carbonate buffer system (pH ≈ 8.1)
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1)
    }
  }

  const handlePrev = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
        ></div>
      </div>

      {/* Section tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
              activeSection === index ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
            }`}
            onClick={() => setActiveSection(index)}
          >
            {section.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="border rounded-lg p-6 bg-card">
        <h2 className="text-2xl font-bold mb-4">{sections[activeSection].title}</h2>
        {sections[activeSection].content}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={activeSection === 0} className="gap-2">
          <ChevronLeft size={16} />
          Previous
        </Button>

        <Button onClick={handleNext} disabled={activeSection === sections.length - 1} className="gap-2">
          Next
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}

function IndicatorsSection() {
  const [selectedIndicator, setSelectedIndicator] = useState("phenolphthalein")
  const [currentPh, setCurrentPh] = useState(7)
  const [dropMode, setDropMode] = useState<"acid" | "base">("acid")
  const [dropCount, setDropCount] = useState(0)
  const [solutionPh, setSolutionPh] = useState(7)
  const [showAnimation, setShowAnimation] = useState(false)
  const [testTubeView, setTestTubeView] = useState(false)

  const indicators = [
    {
      name: "Phenolphthalein",
      id: "phenolphthalein",
      range: [8.2, 10.0],
      acidColor: "transparent",
      baseColor: "rgb(255, 105, 180)",
      description:
        "Colorless in acidic solutions, turns pink/fuchsia in basic solutions. Used in acid-base titrations where the endpoint is in the basic range.",
    },
    {
      name: "Methyl Orange",
      id: "methyl-orange",
      range: [3.1, 4.4],
      acidColor: "rgb(255, 50, 50)",
      baseColor: "rgb(255, 200, 0)",
      description:
        "Red in acidic solutions, turns yellow in basic solutions. Useful for titrations where the endpoint is in the acidic range.",
    },
    {
      name: "Bromothymol Blue",
      id: "bromothymol-blue",
      range: [6.0, 7.6],
      acidColor: "rgb(255, 200, 0)",
      baseColor: "rgb(0, 100, 255)",
      description:
        "Yellow in acidic solutions, turns blue in basic solutions. Excellent for determining if a solution is near neutral pH.",
    },
    {
      name: "Litmus",
      id: "litmus",
      range: [4.5, 8.3],
      acidColor: "rgb(255, 50, 50)",
      baseColor: "rgb(50, 50, 255)",
      description:
        "Red in acidic solutions, turns blue in basic solutions. One of the oldest and most commonly used indicators.",
    },
    {
      name: "Universal Indicator",
      id: "universal",
      range: [0, 14],
      acidColor: "rgb(255, 0, 0)",
      baseColor: "rgb(128, 0, 128)",
      description:
        "Changes through a spectrum of colors across the entire pH range, allowing for approximate pH determination.",
    },
  ]

  const selectedIndicatorData = indicators.find((i) => i.id === selectedIndicator)!

  const getIndicatorColor = (ph: number, indicator: typeof selectedIndicatorData) => {
    if (ph < indicator.range[0]) {
      return indicator.acidColor
    } else if (ph > indicator.range[1]) {
      return indicator.baseColor
    } else {
      // Calculate transition color in the range
      const rangeSize = indicator.range[1] - indicator.range[0]
      const position = (ph - indicator.range[0]) / rangeSize

      // For transparent colors, handle differently
      if (indicator.acidColor === "transparent" || indicator.baseColor === "transparent") {
        if (indicator.acidColor === "transparent") {
          // Transition from transparent to base color
          const baseRgb = parseRgb(indicator.baseColor)
          return `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${position.toFixed(2)})`
        } else {
          // Transition from acid color to transparent
          const acidRgb = parseRgb(indicator.acidColor)
          return `rgba(${acidRgb[0]}, ${acidRgb[1]}, ${acidRgb[2]}, ${(1 - position).toFixed(2)})`
        }
      } else {
        // Normal color transition
        const acidRgb = parseRgb(indicator.acidColor)
        const baseRgb = parseRgb(indicator.baseColor)

        const r = Math.round(acidRgb[0] + (baseRgb[0] - acidRgb[0]) * position)
        const g = Math.round(acidRgb[1] + (baseRgb[1] - acidRgb[1]) * position)
        const b = Math.round(acidRgb[2] + (baseRgb[2] - acidRgb[2]) * position)

        return `rgb(${r}, ${g}, ${b})`
      }
    }
  }

  const parseRgb = (color: string) => {
    // Extract RGB values from string like "rgb(255, 50, 50)"
    const match =
      color.match(/rgb$$(\d+),\s*(\d+),\s*(\d+)$$/) || color.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*[\d.]+$$/)
    if (match) {
      return [Number.parseInt(match[1]), Number.parseInt(match[2]), Number.parseInt(match[3])]
    }
    return [0, 0, 0] // Default fallback
  }

  const handleAddDrop = () => {
    setDropCount(dropCount + 1)

    // Simulate pH change based on drops
    if (dropMode === "acid") {
      // Adding acid decreases pH
      const newPh = Math.max(0, solutionPh - 0.5 / (dropCount + 1))
      setSolutionPh(newPh)
    } else {
      // Adding base increases pH
      const newPh = Math.min(14, solutionPh + 0.5 / (dropCount + 1))
      setSolutionPh(newPh)
    }

    setShowAnimation(true)
    setTimeout(() => setShowAnimation(false), 1000)
  }

  const resetExperiment = () => {
    setDropCount(0)
    setSolutionPh(7)
    setShowAnimation(false)
  }

  return (
    <div className="space-y-6">
      <p>
        Acid-base indicators are substances that change color at specific pH ranges. They are crucial in laboratory
        experiments, particularly in titrations, to visually signal when a solution reaches a particular pH.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/20 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">How Indicators Work</h3>
          <p className="mb-3">
            Indicators are typically weak acids or bases themselves. The color change occurs because the protonated form
            (HIn) and deprotonated form (In⁻) of the indicator have different colors.
          </p>
          <div className="text-center p-3 bg-muted/10 rounded-lg mb-3">
            <p className="font-mono">HIn ⇌ H⁺ + In⁻</p>
            <p className="text-sm mt-1">(acid form, color 1) ⇌ (base form, color 2)</p>
          </div>
          <p className="text-sm">
            The equilibrium shifts depending on the pH of the solution, causing one form to predominate and determine
            the observed color.
          </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Applications</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Titrations:</strong> Determine the endpoint when an acid and base have reacted completely
            </li>
            <li>
              <strong>pH Testing:</strong> Quick visual assessment of approximate pH
            </li>
            <li>
              <strong>Swimming Pools:</strong> Monitor water pH for safety and equipment maintenance
            </li>
            <li>
              <strong>Soil Testing:</strong> Determine soil pH for agricultural purposes
            </li>
            <li>
              <strong>Aquariums:</strong> Maintain proper pH for aquatic life
            </li>
            <li>
              <strong>Food Industry:</strong> Quality control in food processing
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">Common Acid-Base Indicators</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="border p-2 text-left">Indicator</th>
                <th className="border p-2 text-left">pH Range</th>
                <th className="border p-2 text-left">Acidic Color</th>
                <th className="border p-2 text-left">Basic Color</th>
                <th className="border p-2 text-left">Common Uses</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-background">
                <td className="border p-2">Phenolphthalein</td>
                <td className="border p-2">8.2 - 10.0</td>
                <td className="border p-2">Colorless</td>
                <td className="border p-2 text-pink-500">Pink</td>
                <td className="border p-2">Strong acid/weak base titrations</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border p-2">Methyl Orange</td>
                <td className="border p-2">3.1 - 4.4</td>
                <td className="border p-2 text-red-500">Red</td>
                <td className="border p-2 text-yellow-500">Yellow</td>
                <td className="border p-2">Weak acid/strong base titrations</td>
              </tr>
              <tr className="bg-background">
                <td className="border p-2">Bromothymol Blue</td>
                <td className="border p-2">6.0 - 7.6</td>
                <td className="border p-2 text-yellow-500">Yellow</td>
                <td className="border p-2 text-blue-500">Blue</td>
                <td className="border p-2">Neutral pH determination</td>
              </tr>
              <tr className="bg-muted/20">
                <td className="border p-2">Litmus</td>
                <td className="border p-2">4.5 - 8.3</td>
                <td className="border p-2 text-red-500">Red</td>
                <td className="border p-2 text-blue-500">Blue</td>
                <td className="border p-2">General acid/base testing</td>
              </tr>
              <tr className="bg-background">
                <td className="border p-2">Universal Indicator</td>
                <td className="border p-2">1 - 14</td>
                <td className="border p-2">Red → Orange → Yellow</td>
                <td className="border p-2">Green → Blue → Violet</td>
                <td className="border p-2">Full range pH determination</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">Interactive Indicator Experiment</h3>

        <Tabs defaultValue="color-chart" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="color-chart">Color Chart</TabsTrigger>
            <TabsTrigger value="virtual-lab">Virtual Lab</TabsTrigger>
          </TabsList>

          <TabsContent value="color-chart" className="mt-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Select Indicator:</label>
                    <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an indicator" />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators.map((indicator) => (
                          <SelectItem key={indicator.id} value={indicator.id}>
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">pH Value: {currentPh.toFixed(1)}</label>
                    <Slider
                      value={[currentPh]}
                      min={0}
                      max={14}
                      step={0.1}
                      onValueChange={(value) => setCurrentPh(value[0])}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm mb-2">
                    <strong>pH Range:</strong> {selectedIndicatorData.range[0]} - {selectedIndicatorData.range[1]}
                  </div>
                  <div className="text-sm mb-4">{selectedIndicatorData.description}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div
                      className="h-40 rounded-lg overflow-hidden flex items-center justify-center"
                      style={{
                        backgroundColor: getIndicatorColor(currentPh, selectedIndicatorData),
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="text-center p-3 bg-white/80 dark:bg-black/80 rounded-lg">
                        <div className="font-medium">pH {currentPh.toFixed(1)}</div>
                        <div className="text-sm">
                          {currentPh < selectedIndicatorData.range[0]
                            ? "Acidic Form"
                            : currentPh > selectedIndicatorData.range[1]
                              ? "Basic Form"
                              : "Transition Range"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="h-40 rounded-lg overflow-hidden relative">
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-full flex-1"
                            style={{
                              backgroundColor: getIndicatorColor(i + 0.5, selectedIndicatorData),
                              borderRight: i < 13 ? "1px solid rgba(0,0,0,0.1)" : "none",
                            }}
                          />
                        ))}
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs px-1">
                        <span>0</span>
                        <span>7</span>
                        <span>14</span>
                      </div>
                      <div
                        className="absolute top-0 bottom-0 w-0.5 bg-black dark:bg-white transition-all duration-300"
                        style={{ left: `${(currentPh / 14) * 100}%` }}
                      />
                    </div>
                    <div className="text-center text-sm mt-2">pH Scale Color Range</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="virtual-lab" className="mt-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="p-4 border rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Select Indicator:</label>
                    <Select value={selectedIndicator} onValueChange={setSelectedIndicator}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an indicator" />
                      </SelectTrigger>
                      <SelectContent>
                        {indicators.map((indicator) => (
                          <SelectItem key={indicator.id} value={indicator.id}>
                            {indicator.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">Add Drops Of:</label>
                    <div className="flex gap-2">
                      <Button
                        variant={dropMode === "acid" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setDropMode("acid")}
                      >
                        <Beaker className="mr-2 h-4 w-4" />
                        Acid
                      </Button>
                      <Button
                        variant={dropMode === "base" ? "default" : "outline"}
                        className="flex-1"
                        onClick={() => setDropMode("base")}
                      >
                        <Flask className="mr-2 h-4 w-4" />
                        Base
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 text-center">
                      <div className="font-medium">Solution pH: {solutionPh.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">Drops added: {dropCount}</div>
                    </div>

                    <div className="relative">
                      <Button
                        variant="outline"
                        className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10"
                        onClick={() => setTestTubeView(!testTubeView)}
                      >
                        {testTubeView ? "Show Beaker" : "Show Test Tube"}
                      </Button>

                      {testTubeView ? (
                        <div className="relative h-64 w-24 mx-auto">
                          <div className="absolute bottom-0 left-0 right-0 mx-auto w-16 h-56 rounded-b-full overflow-hidden border-2 border-t-0 border-gray-300 dark:border-gray-600">
                            <div
                              className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                              style={{
                                height: "100%",
                                backgroundColor: getIndicatorColor(solutionPh, selectedIndicatorData),
                              }}
                            />
                          </div>
                          <div className="absolute top-0 left-0 right-0 mx-auto w-24 h-8 rounded-t-full border-2 border-b-0 border-gray-300 dark:border-gray-600 bg-background" />

                          {showAnimation && (
                            <motion.div
                              initial={{ y: -50, opacity: 1 }}
                              animate={{ y: 100, opacity: 0 }}
                              transition={{ duration: 1 }}
                              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-6 rounded-full"
                              style={{
                                backgroundColor: dropMode === "acid" ? "rgba(255, 0, 0, 0.7)" : "rgba(0, 0, 255, 0.7)",
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="relative h-64 w-48">
                          <div className="absolute bottom-0 left-0 right-0 h-40 w-48 rounded-b-xl overflow-hidden border-2 border-t-0 border-gray-300 dark:border-gray-600">
                            <div
                              className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                              style={{
                                height: "100%",
                                backgroundColor: getIndicatorColor(solutionPh, selectedIndicatorData),
                              }}
                            />
                          </div>
                          <div className="absolute top-0 left-0 right-0 h-8 w-48 border-2 border-b-0 border-gray-300 dark:border-gray-600 bg-background" />
                          <div className="absolute top-8 left-0 right-0 h-16 w-48 border-l-2 border-r-2 border-gray-300 dark:border-gray-600 bg-background" />

                          {showAnimation && (
                            <motion.div
                              initial={{ y: -50, opacity: 1 }}
                              animate={{ y: 50, opacity: 0 }}
                              transition={{ duration: 1 }}
                              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-8 rounded-full"
                              style={{
                                backgroundColor: dropMode === "acid" ? "rgba(255, 0, 0, 0.7)" : "rgba(0, 0, 255, 0.7)",
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex gap-2">
                      <Button onClick={handleAddDrop} className="gap-2">
                        <Droplet className="h-4 w-4" />
                        Add Drop
                      </Button>
                      <Button variant="outline" onClick={resetExperiment}>
                        Reset
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Experiment Notes</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Indicator:</strong> {selectedIndicatorData.name}
                        </p>
                        <p>
                          <strong>pH Range:</strong> {selectedIndicatorData.range[0]} - {selectedIndicatorData.range[1]}
                        </p>
                        <p>
                          <strong>Current pH:</strong> {solutionPh.toFixed(2)}
                        </p>
                        <p>
                          <strong>Current Color:</strong>{" "}
                          {solutionPh < selectedIndicatorData.range[0]
                            ? "Acidic form"
                            : solutionPh > selectedIndicatorData.range[1]
                              ? "Basic form"
                              : "Transition range"}
                        </p>
                        <p>
                          <strong>Drops Added:</strong> {dropCount} {dropMode === "acid" ? "acid" : "base"} drops
                        </p>

                        {dropCount > 0 && (
                          <div className="pt-2 border-t">
                            <p className="font-medium">Observations:</p>
                            <ul className="list-disc pl-5 mt-1">
                              {dropCount >= 5 && solutionPh > selectedIndicatorData.range[1] && dropMode === "base" && (
                                <li>The solution has turned completely to the basic color of the indicator.</li>
                              )}
                              {dropCount >= 5 && solutionPh < selectedIndicatorData.range[0] && dropMode === "acid" && (
                                <li>The solution has turned completely to the acidic color of the indicator.</li>
                              )}
                              {solutionPh >= selectedIndicatorData.range[0] &&
                                solutionPh <= selectedIndicatorData.range[1] && (
                                  <li>
                                    The solution is in the transition range, showing a color between the acidic and
                                    basic forms.
                                  </li>
                                )}
                              {dropCount > 10 && (
                                <li>
                                  The solution is becoming saturated with {dropMode}. Additional drops have less effect
                                  on pH.
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    </Card>

                    <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Zap className="mr-2 h-4 w-4 text-amber-500" />
                        Indicator Chemistry
                      </h4>
                      <p className="text-sm">
                        {selectedIndicatorData.name} changes color because its molecular structure changes when it gains
                        or loses protons (H⁺). In {selectedIndicatorData.name.toLowerCase()}, the protonated form
                        appears
                        {selectedIndicatorData.acidColor === "transparent" ? " colorless" : " colored"} in acid, while
                        the deprotonated form appears{" "}
                        {selectedIndicatorData.baseColor === "transparent" ? " colorless" : " colored"} in base.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Animation components
function AcidBaseAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold"
        animate={{
          x: [-50, -30, -50],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        H⁺
      </motion.div>

      <motion.div
        className="absolute w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold"
        animate={{
          x: [50, 30, 50],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        OH⁻
      </motion.div>

      <motion.div
        className="absolute w-20 h-20 rounded-full border-2 border-dashed border-purple-500 opacity-0"
        animate={{
          scale: [0, 1.5],
          opacity: [0, 0.8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
          repeatDelay: 0.5,
        }}
      />

      <div className="absolute bottom-4 text-center text-sm text-muted-foreground">
        Acid (H⁺) + Base (OH⁻) → Water (H₂O)
      </div>
    </div>
  )
}

function NeutralizationAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute top-4 left-1/4 transform -translate-x-1/2">
        <motion.div
          className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-lg font-bold"
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatDelay: 1,
          }}
        >
          HCl
        </motion.div>
      </div>

      <div className="absolute top-4 right-1/4 transform translate-x-1/2">
        <motion.div
          className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold"
          animate={{
            y: [0, 40, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            repeatDelay: 1,
            delay: 0.5,
          }}
        >
          NaOH
        </motion.div>
      </div>

      <motion.div
        className="absolute w-24 h-24 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 1],
          opacity: [0, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
          repeatType: "reverse",
        }}
      >
        <div className="text-center text-purple-800 dark:text-purple-200 font-medium">
          <div>NaCl</div>
          <div>+</div>
          <div>H₂O</div>
        </div>
      </motion.div>

      <div className="absolute bottom-4 text-center text-sm font-medium">HCl + NaOH → NaCl + H₂O</div>
    </div>
  )
}

