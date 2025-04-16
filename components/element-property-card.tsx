"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { getCategoryColor } from "@/lib/utils"
import type { Element } from "@/lib/element-data"
import {
  Atom,
  Beaker,
  Droplet,
  Flame,
  FlaskRoundIcon as Flask,
  Info,
  Layers,
  Radio,
  Skull,
  Thermometer,
  Wind,
  Zap,
  AlertTriangle,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AtomicStructureVisualization from "@/components/atomic-structure-visualization"

interface ElementPropertyCardProps {
  element: Element
  onClose?: () => void
}

// Helper functions for additional data
const getElectronShellConfiguration = (atomicNumber: number) => {
  // Simplified shell configuration based on Bohr model
  const shells = [2, 8, 18, 32, 50]
  const config: number[] = []

  let remainingElectrons = atomicNumber

  for (const shellCapacity of shells) {
    if (remainingElectrons <= 0) break

    const electronsInShell = Math.min(remainingElectrons, shellCapacity)
    config.push(electronsInShell)
    remainingElectrons -= electronsInShell
  }

  // If there are still electrons left, add them to the last shell
  if (remainingElectrons > 0) {
    config.push(remainingElectrons)
  }

  return config.join(",")
}

const estimateElectronAffinity = (category: string, electronegativity: number | null) => {
  if (electronegativity === null) return "N/A"
  // Rough estimation based on electronegativity
  return Math.round(electronegativity * 50).toString()
}

const estimateIonizationEnergy = (atomicNumber: number, category: string) => {
  // Rough estimation based on atomic number and category
  let base = 500

  if (category === "noble-gas") base = 1500
  else if (category === "halogen") base = 1200
  else if (category === "nonmetal") base = 1000
  else if (category === "metalloid") base = 800
  else if (category === "post-transition-metal") base = 700
  else if (category === "transition-metal") base = 650
  else if (category === "alkaline-earth-metal") base = 550
  else if (category === "alkali-metal") base = 450

  // Adjust for periodic trends
  const period = Math.ceil(atomicNumber / 18)
  return (base - (period - 1) * 50).toString()
}

const getStateAtRoomTemperature = (meltingPoint: number | null, boilingPoint: number | null) => {
  const roomTemp = 298 // K (25°C)

  if (meltingPoint === null || boilingPoint === null) return "Unknown"

  if (meltingPoint > roomTemp) return "Solid"
  if (boilingPoint < roomTemp) return "Gas"
  return "Liquid"
}

const getAtomicRadius = (atomicNumber: number, category: string) => {
  // Simplified estimation based on periodic trends
  let base = 150 // pm

  const period = Math.ceil(atomicNumber / 18)
  const group = atomicNumber % 18 || 18

  // Increase with period, decrease with group (simplified)
  base += (period - 1) * 20
  base -= Math.min(group, 10) * 5

  // Adjust for category
  if (category === "alkali-metal") base += 30
  else if (category === "noble-gas") base -= 30

  return `${Math.max(50, base)} pm`
}

const getIonicRadius = (atomicNumber: number, category: string, oxidationStates: string | null) => {
  if (!oxidationStates) return "N/A"

  // Get the most common oxidation state
  const states = oxidationStates.split(", ")
  const commonState = states[states.length - 1]

  // Base atomic radius
  const atomicBase = Number.parseInt(getAtomicRadius(atomicNumber, category).split(" ")[0])

  // Adjust based on charge
  const charge = Number.parseInt(commonState)
  if (isNaN(charge)) return "N/A"

  if (charge > 0) {
    // Cations are smaller
    return `${Math.max(30, atomicBase - charge * 15)} pm`
  } else if (charge < 0) {
    // Anions are larger
    return `${atomicBase - charge * 20} pm`
  }

  return "N/A"
}

const getCommonCompounds = (element: Element) => {
  // Simplified common compounds for some elements
  const compounds: Record<string, string[]> = {
    H: ["H₂O (Water)", "H₂ (Hydrogen gas)", "CH₄ (Methane)"],
    O: ["H₂O (Water)", "O₂ (Oxygen gas)", "CO₂ (Carbon dioxide)"],
    C: ["CO₂ (Carbon dioxide)", "CH₄ (Methane)", "C₆H₁₂O₆ (Glucose)"],
    N: ["NH₃ (Ammonia)", "N₂ (Nitrogen gas)", "HNO₃ (Nitric acid)"],
    Na: ["NaCl (Table salt)", "NaOH (Sodium hydroxide)", "Na₂CO₃ (Sodium carbonate)"],
    Cl: ["NaCl (Table salt)", "HCl (Hydrochloric acid)", "Cl₂ (Chlorine gas)"],
    Fe: ["Fe₂O₃ (Iron(III) oxide)", "FeCl₃ (Iron(III) chloride)", "FeS₂ (Iron pyrite)"],
    Cu: ["CuSO₄ (Copper(II) sulfate)", "Cu₂O (Copper(I) oxide)", "CuCl₂ (Copper(II) chloride)"],
    Au: ["Au(CN)₂⁻ (Dicyanoaurate)", "AuCl₃ (Gold(III) chloride)", "Au₂S (Gold(I) sulfide)"],
    Hg: ["HgCl₂ (Mercury(II) chloride)", "Hg₂Cl₂ (Mercury(I) chloride)", "HgS (Cinnabar)"],
    U: ["UO₂ (Uranium dioxide)", "UF₆ (Uranium hexafluoride)", "U₃O₈ (Triuranium octoxide)"],
  }

  return compounds[element.symbol] || ["Data not available"]
}

const getIsotopes = (element: Element) => {
  // Simplified isotope data for some elements
  const isotopes: Record<string, string[]> = {
    H: ["¹H (99.98%)", "²H (Deuterium, 0.02%)", "³H (Tritium, trace)"],
    C: ["¹²C (98.93%)", "¹³C (1.07%)", "¹⁴C (trace, radioactive)"],
    O: ["¹⁶O (99.76%)", "¹⁷O (0.04%)", "¹⁸O (0.2%)"],
    U: ["²³⁵U (0.72%, fissile)", "²³⁸U (99.27%, fertile)"],
    Pu: ["²³⁹Pu (fissile, t₁/₂ = 24,110 years)"],
  }

  return isotopes[element.symbol] || ["Data not available"]
}

const getUses = (element: Element) => {
  // Simplified uses for some elements
  const uses: Record<string, string[]> = {
    H: ["Fuel", "Chemical production", "Coolant in nuclear reactors"],
    He: ["Balloons", "Cryogenics", "Pressurizing rocket fuel"],
    Li: ["Batteries", "Aerospace alloys", "Psychiatric medications"],
    C: ["Steel production", "Diamond tools", "Graphite lubricants"],
    O: ["Life support", "Combustion", "Steel production"],
    Al: ["Aircraft construction", "Packaging", "Power lines"],
    Si: ["Semiconductors", "Solar cells", "Glass production"],
    Fe: ["Construction", "Machinery", "Tools"],
    Cu: ["Electrical wiring", "Plumbing", "Electronics"],
    Ag: ["Photography", "Jewelry", "Electronics"],
    Au: ["Jewelry", "Electronics", "Monetary exchange"],
    Hg: ["Thermometers", "Fluorescent lamps", "Dental amalgams"],
    Pb: ["Batteries", "Radiation shielding", "Soldering"],
    U: ["Nuclear fuel", "Military applications", "Counterweights"],
  }

  return uses[element.symbol] || ["Data not available"]
}

const isRadioactive = (atomicNumber: number) => {
  // Elements with atomic number >= 84 are all radioactive
  // Plus some specific elements
  const radioactiveElements = [
    43, 61, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
    109, 110, 111, 112, 113, 114, 115, 116, 117, 118,
  ]
  return radioactiveElements.includes(atomicNumber)
}

const isFlammable = (symbol: string) => {
  // Elements that are highly flammable or react vigorously with air
  const flammableElements = ["H", "Li", "Na", "K", "Rb", "Cs", "Mg", "Ca", "Ba", "P", "S"]
  return flammableElements.includes(symbol)
}

const isExplosive = (symbol: string) => {
  // Elements that can form explosive compounds or react explosively
  const explosiveElements = ["H", "N", "K", "Rb", "Cs", "Sr", "Ba", "Cl", "Br", "I", "At"]
  return explosiveElements.includes(symbol)
}

const isPoisonous = (symbol: string) => {
  // Elements that are toxic or dangerous to life
  const poisonousElements = ["F", "Cl", "Br", "As", "Se", "Cd", "Hg", "Tl", "Pb", "Po", "Ra", "U", "Pu"]
  return poisonousElements.includes(symbol)
}

const isReactive = (symbol: string, category: string) => {
  // Elements that are highly reactive
  if (category === "alkali-metal" || category === "halogen") return true
  const reactiveElements = ["F", "O", "Cl", "Br", "I", "P", "S"]
  return reactiveElements.includes(symbol)
}

// Mock implementations for the missing components
const InteractiveIsotopes = ({ isotopes }: { isotopes: string[] }) => (
  <div className="grid grid-cols-1 gap-2">
    {isotopes.map((isotope, index) => (
      <div key={index} className="flex items-center bg-muted/20 p-2 rounded-md hover:bg-muted/40 transition-colors">
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
        <p>{isotope}</p>
      </div>
    ))}
  </div>
)

const InteractiveClassification = ({ element }: { element: Element }) => {
  const categoryColor = getCategoryColor(element.category)
  const formattedCategory = element.category.replace(/-/g, " ")

  return (
    <div
      className="p-3 rounded-lg flex flex-col items-center justify-center text-center"
      style={{ backgroundColor: `${categoryColor}20`, borderLeft: `4px solid ${categoryColor}` }}
    >
      <h3 className="text-lg font-semibold mb-1" style={{ color: categoryColor }}>
        {formattedCategory.charAt(0).toUpperCase() + formattedCategory.slice(1)}
      </h3>
      <p className="text-sm text-muted-foreground">
        {element.category === "alkali-metal" && "Highly reactive metals that form +1 cations"}
        {element.category === "alkaline-earth-metal" && "Reactive metals that form +2 cations"}
        {element.category === "transition-metal" && "Metals with partially filled d subshells"}
        {element.category === "post-transition-metal" && "Metals with filled d subshells"}
        {element.category === "metalloid" && "Elements with properties of both metals and nonmetals"}
        {element.category === "nonmetal" && "Non-metallic elements with various properties"}
        {element.category === "halogen" && "Highly reactive nonmetals that form -1 anions"}
        {element.category === "noble-gas" && "Extremely stable elements with filled valence shells"}
        {element.category === "lanthanide" && "Part of f-block, involving 4f electrons"}
        {element.category === "actinide" && "Part of f-block, involving 5f electrons"}
      </p>
    </div>
  )
}

// Quick Fact Card Component
function QuickFactCard({
  icon,
  title,
  value,
  color,
}: { icon: React.ReactNode; title: string; value: string; color: string }) {
  return (
    <motion.div
      className="p-3 rounded-lg border bg-card shadow-sm flex flex-col items-center text-center"
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="mb-1" style={{ color }}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground">{title}</p>
      <p className="font-semibold">{value}</p>
    </motion.div>
  )
}

// Physical Property Card Component
function PhysicalPropertyCard({
  icon,
  title,
  value,
  color,
}: { icon: React.ReactNode; title: string; value: string; color: string }) {
  return (
    <motion.div
      className="p-4 rounded-lg border bg-card shadow-sm"
      whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </motion.div>
  )
}

// Change the ChemicalPropertyCard to use solid colors instead of gradients
function ChemicalPropertyCard({
  icon,
  title,
  value,
  color,
  max,
  current,
}: {
  icon: React.ReactNode
  title: string
  value: string
  color: string
  max: number
  current: number
}) {
  const percentage = (current / max) * 100

  return (
    <motion.div
      className="p-4 rounded-lg border bg-card shadow-sm"
      whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20`, color }}>
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="mb-2 h-2 bg-muted/30 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </motion.div>
  )
}

// Replace the SimplifiedTemperatureGraph function with this new version that removes room temperature
function SimplifiedTemperatureGraph({
  meltingPoint,
  boilingPoint,
}: {
  meltingPoint: number | null
  boilingPoint: number | null
}) {
  // Format temperature for display
  const formatTemp = (temp: number | null): string => {
    if (temp === null) return "Unknown"
    return `${temp} K (${(temp - 273.15).toFixed(1)}°C)`
  }

  return (
    <div className="space-y-4">
      {/* Temperature key points */}
      <div className="grid grid-cols-1 gap-2">
        <div className="flex justify-between items-center p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
            <span className="font-medium">Melting Point</span>
          </div>
          <span>{formatTemp(meltingPoint)}</span>
        </div>

        <div className="flex justify-between items-center p-2 rounded-md bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
            <span className="font-medium">Boiling Point</span>
          </div>
          <span>{formatTemp(boilingPoint)}</span>
        </div>
      </div>

      {/* State information */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center p-2 rounded-md bg-blue-100 dark:bg-blue-900/30">
          <div className="w-4 h-4 rounded-full bg-blue-500 mb-1"></div>
          <span className="text-xs font-medium">Solid</span>
          <span className="text-[10px] text-muted-foreground">Below {formatTemp(meltingPoint)}</span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-md bg-orange-100 dark:bg-orange-900/30">
          <div className="w-4 h-4 rounded-full bg-orange-500 mb-1"></div>
          <span className="text-xs font-medium">Liquid</span>
          <span className="text-[10px] text-muted-foreground">
            {meltingPoint && boilingPoint ? `${meltingPoint}K to ${boilingPoint}K` : "N/A"}
          </span>
        </div>

        <div className="flex flex-col items-center p-2 rounded-md bg-red-100 dark:bg-red-900/30">
          <div className="w-4 h-4 rounded-full bg-red-500 mb-1"></div>
          <span className="text-xs font-medium">Gas</span>
          <span className="text-[10px] text-muted-foreground">Above {formatTemp(boilingPoint)}</span>
        </div>
      </div>
    </div>
  )
}

// Replace the EnhancedPeriodicTrends function with this more interactive version
function EnhancedPeriodicTrends({ element }: { element: Element }) {
  const [activeTrend, setActiveTrend] = useState<string | null>("electronegativity")

  // Color mapping for trend visualization
  const trendColors = {
    atomicRadius: "#4299e1", // blue
    electronegativity: "#48bb78", // green
    ionizationEnergy: "#9f7aea", // purple
    electronAffinity: "#ed8936", // orange
  }

  // Data for periodic trends explanations
  const trendsInfo = {
    atomicRadius: {
      title: "Atomic Radius",
      description: "The distance from the nucleus to the outermost electron shell.",
      periodTrend: "Decreases from left to right",
      groupTrend: "Increases from top to bottom",
      periodReason: "Increasing nuclear charge pulls electrons closer",
      groupReason: "New electron shells increase distance from nucleus",
      color: trendColors.atomicRadius,
      unit: "pm",
    },
    electronegativity: {
      title: "Electronegativity",
      description: "The tendency of an atom to attract electrons in a chemical bond.",
      periodTrend: "Increases from left to right",
      groupTrend: "Decreases from top to bottom",
      periodReason: "Increasing nuclear charge attracts electrons more strongly",
      groupReason: "Valence electrons are farther from nucleus and more shielded",
      color: trendColors.electronegativity,
      unit: "",
    },
    ionizationEnergy: {
      title: "Ionization Energy",
      description: "Energy required to remove an electron from a neutral atom.",
      periodTrend: "Increases from left to right",
      groupTrend: "Decreases from top to bottom",
      periodReason: "Electrons are held more tightly by increasing nuclear charge",
      groupReason: "Valence electrons are less tightly bound in larger atoms",
      color: trendColors.ionizationEnergy,
      unit: "kJ/mol",
    },
    electronAffinity: {
      title: "Electron Affinity",
      description: "Energy change when a neutral atom gains an electron.",
      periodTrend: "Generally increases from left to right",
      groupTrend: "Generally decreases from top to bottom",
      periodReason: "Atoms closer to filling their valence shell accept electrons more readily",
      groupReason: "Electron-electron repulsion increases in larger atoms",
      color: trendColors.electronAffinity,
      unit: "kJ/mol",
    },
  }

  const handleTrendClick = (trend: string) => {
    setActiveTrend(trend)
  }

  // Get element value for the active trend
  const getElementValue = (trend: string): string => {
    switch (trend) {
      case "atomicRadius":
        return `~${getAtomicRadius(element.atomicNumber, element.category)}`
      case "electronegativity":
        return element.electronegativity !== null ? element.electronegativity.toString() : "N/A"
      case "ionizationEnergy":
        return `~${estimateIonizationEnergy(element.atomicNumber, element.category)} kJ/mol`
      case "electronAffinity":
        return `~${estimateElectronAffinity(element.category, element.electronegativity)} kJ/mol`
      default:
        return "N/A"
    }
  }

  return (
    <div className="space-y-4">
      {/* Trend selector tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(trendsInfo).map((trend) => (
          <button
            key={trend}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              activeTrend === trend ? "text-white" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
            style={{
              backgroundColor: activeTrend === trend ? trendsInfo[trend as keyof typeof trendsInfo].color : undefined,
            }}
            onClick={() => handleTrendClick(trend)}
          >
            {trendsInfo[trend as keyof typeof trendsInfo].title}
          </button>
        ))}
      </div>

      {/* Active trend information */}
      {activeTrend && (
        <div className="space-y-4">
          {/* Trend description */}
          <div className="p-3 rounded-lg bg-muted/20 border">
            <h4 className="font-medium mb-1">{trendsInfo[activeTrend as keyof typeof trendsInfo].title}</h4>
            <p className="text-sm">{trendsInfo[activeTrend as keyof typeof trendsInfo].description}</p>
            <div
              className="mt-2 text-sm font-medium"
              style={{ color: trendsInfo[activeTrend as keyof typeof trendsInfo].color }}
            >
              {element.name}: {getElementValue(activeTrend)}
            </div>
          </div>

          {/* Interactive mini periodic table visualization */}
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium mb-3">Periodic Trends Visualization</h4>

            {/* Mini periodic table with trend visualization */}
            <div className="grid grid-cols-2 gap-4">
              {/* Period trend (horizontal) */}
              <div className="border rounded p-3 relative">
                <h5 className="text-xs font-medium mb-2">Period Trend</h5>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs">Group 1</div>
                  <div className="text-xs">Group 18</div>
                </div>

                {/* Gradient bar */}
                <div className="h-6 w-full rounded-md relative overflow-hidden mb-2">
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{
                      background:
                        activeTrend === "atomicRadius"
                          ? `linear-gradient(to right, ${trendsInfo[activeTrend as keyof typeof trendsInfo].color}, #e5e5e5)`
                          : `linear-gradient(to right, #e5e5e5, ${trendsInfo[activeTrend as keyof typeof trendsInfo].color})`,
                    }}
                  ></div>

                  {/* Element marker */}
                  {element.group && (
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white border border-black dark:border-white"
                      style={{
                        left: `${((element.group - 1) / 17) * 100}%`,
                        transform: "translateX(-50%)",
                      }}
                    ></div>
                  )}
                </div>

                {/* Trend direction */}
                <div className="flex justify-between items-center text-xs">
                  <div>{activeTrend === "atomicRadius" ? "Larger" : "Smaller"}</div>
                  <div className="flex items-center">
                    <span className="mr-1">{activeTrend === "atomicRadius" ? "Smaller" : "Larger"}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12H19M19 12L12 5M19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Explanation */}
                <p className="text-xs mt-3 text-muted-foreground">
                  <strong>Trend:</strong> {trendsInfo[activeTrend as keyof typeof trendsInfo].periodTrend} across a
                  period.
                </p>
                <p className="text-xs mt-1 text-muted-foreground">
                  <strong>Why:</strong> {trendsInfo[activeTrend as keyof typeof trendsInfo].periodReason}.
                </p>
              </div>

              {/* Group trend (vertical) */}
              <div className="border rounded p-3 relative">
                <h5 className="text-xs font-medium mb-2">Group Trend</h5>
                <div className="flex justify-center mb-1">
                  <div className="text-xs">Period 1</div>
                </div>

                {/* Gradient bar (vertical) */}
                <div className="w-6 h-32 mx-auto rounded-md relative overflow-hidden mb-2">
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{
                      background:
                        activeTrend === "atomicRadius"
                          ? `linear-gradient(to bottom, #e5e5e5, ${trendsInfo[activeTrend as keyof typeof trendsInfo].color})`
                          : `linear-gradient(to bottom, ${trendsInfo[activeTrend as keyof typeof trendsInfo].color}, #e5e5e5)`,
                    }}
                  ></div>

                  {/* Element marker */}
                  {element.period && (
                    <div
                      className="absolute left-0 right-0 h-1 bg-white border border-black dark:border-white"
                      style={{
                        top: `${((element.period - 1) / 6) * 100}%`,
                        transform: "translateY(-50%)",
                      }}
                    ></div>
                  )}
                </div>

                <div className="flex justify-center mb-1">
                  <div className="text-xs">Period 7</div>
                </div>

                {/* Trend direction */}
                <div className="flex justify-center items-center text-xs mt-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform rotate-90"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-1">{activeTrend === "atomicRadius" ? "Larger" : "Smaller"}</span>
                </div>

                {/* Explanation */}
                <p className="text-xs mt-3 text-muted-foreground">
                  <strong>Trend:</strong> {trendsInfo[activeTrend as keyof typeof trendsInfo].groupTrend} down a group.
                </p>
                <p className="text-xs mt-1 text-muted-foreground">
                  <strong>Why:</strong> {trendsInfo[activeTrend as keyof typeof trendsInfo].groupReason}.
                </p>
              </div>
            </div>

            {/* Element position in the periodic table */}
            <div className="mt-4 p-3 bg-muted/10 rounded-lg">
              <p className="text-sm">
                <strong>{element.name}</strong> is in period {element.period}
                {element.group ? ` and group ${element.group}` : ""}. As a {element.category.replace(/-/g, " ")}, it{" "}
                {activeTrend === "atomicRadius"
                  ? element.group && element.group > 10
                    ? "has a smaller atomic radius"
                    : "has a larger atomic radius"
                  : element.group && element.group > 10
                    ? "has a higher value"
                    : "has a lower value"}{" "}
                compared to other elements in its period.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Fix the export function at the bottom of the file which was incomplete
export default function ElementPropertyCard({ element, onClose }: ElementPropertyCardProps) {
  const borderColor = getCategoryColor(element.category)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    general: true,
    atomic: true,
    physical: true,
    chemical: true,
    periodic: true,
  })

  // Calculate neutrons (atomic mass - atomic number)
  const neutrons = Math.round(element.atomicMass) - element.atomicNumber

  // Get electron shell configuration
  const electronShellConfig = getElectronShellConfiguration(element.atomicNumber)

  // Get state at room temperature
  const stateAtRoomTemp = getStateAtRoomTemperature(element.meltingPoint, element.boilingPoint)

  // Get estimated electron affinity
  const electronAffinity = estimateElectronAffinity(element.category, element.electronegativity)

  // Get estimated ionization energy
  const ionizationEnergy = estimateIonizationEnergy(element.atomicNumber, element.category)

  // Get atomic radius
  const atomicRadius = getAtomicRadius(element.atomicNumber, element.category)

  // Get ionic radius
  const ionicRadius = getIonicRadius(element.atomicNumber, element.category, element.oxidationStates)

  // Get common compounds
  const commonCompounds = getCommonCompounds(element)

  // Get isotopes
  const isotopes = getIsotopes(element)

  // Get uses
  const uses = getUses(element)

  // Check for special properties
  const radioactive = isRadioactive(element.atomicNumber)
  const flammable = isFlammable(element.symbol)
  const explosive = isExplosive(element.symbol)
  const poisonous = isPoisonous(element.symbol)
  const reactive = isReactive(element.symbol, element.category)

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  return (
    <div className="bg-background rounded-lg shadow-lg p-4 sm:p-6 max-w-4xl w-full mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-lg text-3xl sm:text-4xl font-bold shadow-md"
            style={{ backgroundColor: `${borderColor}20`, color: borderColor, borderLeft: `4px solid ${borderColor}` }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {element.symbol}
          </motion.div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {element.name}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground capitalize">
              {element.category.replace(/-/g, " ")}
            </p>
            <p className="text-sm mt-1">
              Atomic Number: <span className="font-bold">{element.atomicNumber}</span>
            </p>

            {/* Element properties indicators */}
            <div className="flex flex-wrap gap-1 mt-2">
              {radioactive && (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Radio size={12} className="mr-1" /> Radioactive
                </div>
              )}
              {flammable && (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  <Flame size={12} className="mr-1" /> Flammable
                </div>
              )}
              {explosive && (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  <AlertTriangle size={12} className="mr-1" /> Explosive
                </div>
              )}
              {poisonous && (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  <Skull size={12} className="mr-1" /> Poisonous
                </div>
              )}
              {reactive && (
                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Wind size={12} className="mr-1" /> Reactive
                </div>
              )}
            </div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted transition-colors">
            ✕
          </button>
        )}
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Info size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="atomic" className="flex items-center gap-1">
            <Atom size={16} />
            <span className="hidden sm:inline">Atomic</span>
          </TabsTrigger>
          <TabsTrigger value="physical" className="flex items-center gap-1">
            <Thermometer size={16} />
            <span className="hidden sm:inline">Physical</span>
          </TabsTrigger>
          <TabsTrigger value="chemical" className="flex items-center gap-1">
            <Beaker size={16} />
            <span className="hidden sm:inline">Chemical</span>
          </TabsTrigger>
          <TabsTrigger value="periodic" className="flex items-center gap-1">
            <Layers size={16} />
            <span className="hidden sm:inline">Periodic</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Element Description Card */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{element.description}</p>
          </motion.div>

          {/* Quick Facts */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <QuickFactCard
              icon={<Atom size={20} />}
              title="Atomic Mass"
              value={`${element.atomicMass.toFixed(2)} u`}
              color={borderColor}
            />
            <QuickFactCard
              icon={<Droplet size={20} />}
              title="Density"
              value={element.density !== null ? `${element.density} g/cm³` : "Unknown"}
              color={borderColor}
            />
            <QuickFactCard
              icon={<Layers size={20} />}
              title="Group/Period"
              value={`${element.group || "N/A"} / ${element.period}`}
              color={borderColor}
            />
          </motion.div>

          {/* Discovery Information */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-2">Discovery</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Year Discovered</p>
                <p className="font-medium">{element.yearDiscovered || "Ancient"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Discovered By</p>
                <p className="font-medium">{element.discoverer || "Unknown"}</p>
              </div>
            </div>
          </motion.div>

          {/* Uses section moved from More tab */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2">Uses & Applications</h3>
            <div className="grid grid-cols-1 gap-2">
              {uses.map((use, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <p>{use}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="atomic" className="space-y-4">
          {/* Interactive Atomic Structure */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4">Atomic Structure</h3>
            <div className="flex justify-center mb-6 bg-muted/30 p-4 rounded-lg">
              <AtomicStructureVisualization
                protons={element.atomicNumber}
                neutrons={neutrons}
                electrons={element.atomicNumber}
                color={borderColor}
              />
            </div>

            {/* Enhanced atomic particle cards */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30">
                <p className="text-sm text-muted-foreground">Protons</p>
                <p className="text-xl font-bold">{element.atomicNumber}</p>
                <p className="text-xs mt-1">Positive charge</p>
              </div>

              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <p className="text-sm text-muted-foreground">Neutrons</p>
                <p className="text-xl font-bold">{neutrons}</p>
                <p className="text-xs mt-1">No charge</p>
              </div>

              <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                <p className="text-sm text-muted-foreground">Electrons</p>
                <p className="text-xl font-bold">{element.atomicNumber}</p>
                <p className="text-xs mt-1">Negative charge</p>
              </div>
            </div>
          </motion.div>

          {/* Electron Configuration */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-2">Electron Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Notation</p>
                <p className="font-medium">{element.electronConfiguration}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shell Structure</p>
                <p className="font-medium">{electronShellConfig}</p>
              </div>
            </div>
          </motion.div>

          {/* Isotopes */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-3">Isotopes</h3>
            <InteractiveIsotopes isotopes={isotopes} />
          </motion.div>
        </TabsContent>

        <TabsContent value="physical" className="space-y-4">
          {/* Physical Properties */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <PhysicalPropertyCard
              title="Density"
              value={element.density !== null ? `${element.density} g/cm³` : "Unknown"}
              icon={<Droplet size={20} />}
              color={borderColor}
            />
            <PhysicalPropertyCard
              title="State at 25°C"
              value={stateAtRoomTemp}
              icon={<Flask size={20} />}
              color={borderColor}
            />
          </motion.div>

          {/* Temperature Properties */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4">Temperature Properties</h3>
            {/* Simplified temperature visualization */}
            {/* Simplified temperature visualization */}
            {/* Replace the SimplifiedTemperatureGraph function with this new version that removes room temperature */}
            <SimplifiedTemperatureGraph meltingPoint={element.meltingPoint} boilingPoint={element.boilingPoint} />
          </motion.div>

          {/* Atomic & Ionic Radius */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-2">Atomic Dimensions</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Atomic Radius</p>
                <p className="font-medium">{atomicRadius}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ionic Radius</p>
                <p className="font-medium">{ionicRadius}</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="chemical" className="space-y-4">
          {/* Chemical Properties */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ChemicalPropertyCard
              title="Electronegativity"
              value={element.electronegativity !== null ? element.electronegativity.toString() : "Unknown"}
              icon={<Zap size={20} />}
              color={borderColor}
              max={4}
              current={element.electronegativity || 0}
            />
            <ChemicalPropertyCard
              title="Ionization Energy"
              value={`${ionizationEnergy} kJ/mol`}
              icon={<Flame size={20} />}
              color={borderColor}
              max={1500}
              current={Number.parseFloat(ionizationEnergy)}
            />
          </motion.div>

          {/* Oxidation States */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-2">Oxidation States</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {element.oxidationStates?.split(", ").map((state, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${borderColor}20`,
                    color: borderColor,
                    border: `1px solid ${borderColor}40`,
                  }}
                >
                  {state}
                </div>
              )) || <p>Unknown</p>}
            </div>
          </motion.div>

          {/* Common Compounds */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-2">Common Compounds</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {commonCompounds.map((compound, index) => (
                <div key={index} className="flex items-center bg-muted/20 p-2 rounded-md">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: borderColor }}></div>
                  <p className="ml-2 text-sm">{compound}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="periodic" className="space-y-4">
          {/* Periodic Table Location */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-2">Periodic Table Location</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Group</p>
                <p className="font-medium">{element.group || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Period</p>
                <p className="font-medium">{element.period}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Block</p>
                <p className="font-medium">{element.block}</p>
              </div>
            </div>
          </motion.div>

          {/* Classification */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-3">Classification</h3>
            <InteractiveClassification element={element} />
          </motion.div>

          {/* Periodic Trends */}
          <motion.div
            className="p-4 rounded-lg border bg-card shadow-sm"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-2">Periodic Trends</h3>
            <EnhancedPeriodicTrends element={element} />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

