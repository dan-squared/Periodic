"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Thermometer, Flame } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ThermochemistryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [reactionType, setReactionType] = useState<"exothermic" | "endothermic">("exothermic")

  // Energy calculator
  const [mass, setMass] = useState("100")
  const [specificHeat, setSpecificHeat] = useState("4.18")
  const [tempChange, setTempChange] = useState("10")
  const [calculatedEnergy, setCalculatedEnergy] = useState<number | null>(null)

  const calculateEnergy = () => {
    const m = Number.parseFloat(mass)
    const c = Number.parseFloat(specificHeat)
    const deltaT = Number.parseFloat(tempChange)

    if (isNaN(m) || isNaN(c) || isNaN(deltaT)) {
      setCalculatedEnergy(null)
      return
    }

    // q = m × c × ΔT
    const energy = m * c * deltaT
    setCalculatedEnergy(energy)
  }

  const sections = [
    {
      title: "Energy and Heat",
      content: (
        <div className="space-y-4">
          <p>
            Thermochemistry is the study of heat energy in chemical reactions. It examines the energy changes that occur
            during chemical processes and the relationship between heat and other forms of energy.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Energy:</strong> The capacity to do work or transfer heat
              </li>
              <li>
                <strong>Heat:</strong> Energy transferred due to temperature difference
              </li>
              <li>
                <strong>System:</strong> The part of the universe being studied
              </li>
              <li>
                <strong>Surroundings:</strong> Everything outside the system
              </li>
              <li>
                <strong>Exothermic reaction:</strong> Releases heat to surroundings (negative ΔH)
              </li>
              <li>
                <strong>Endothermic reaction:</strong> Absorbs heat from surroundings (positive ΔH)
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Flame className="mr-2 text-red-500" size={20} />
                Exothermic Reactions
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Release energy to surroundings</li>
                <li>ΔH is negative</li>
                <li>Products have less energy than reactants</li>
                <li>Temperature of surroundings increases</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> Combustion, neutralization, respiration
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Thermometer className="mr-2 text-blue-500" size={20} />
                Endothermic Reactions
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Absorb energy from surroundings</li>
                <li>ΔH is positive</li>
                <li>Products have more energy than reactants</li>
                <li>Temperature of surroundings decreases</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> Photosynthesis, melting ice, cooking
              </div>
            </div>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="mb-4 flex gap-4">
                  <Button
                    variant={reactionType === "exothermic" ? "default" : "outline"}
                    onClick={() => setReactionType("exothermic")}
                    className="gap-2"
                  >
                    <Flame size={16} />
                    Exothermic
                  </Button>
                  <Button
                    variant={reactionType === "endothermic" ? "default" : "outline"}
                    onClick={() => setReactionType("endothermic")}
                    className="gap-2"
                  >
                    <Thermometer size={16} />
                    Endothermic
                  </Button>
                </div>

                <div className="relative w-64 h-32">
                  {reactionType === "exothermic" ? <ExothermicAnimation /> : <EndothermicAnimation />}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Units of Energy</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-1">Common Energy Units:</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    <strong>Joule (J):</strong> SI unit of energy
                  </li>
                  <li>
                    <strong>Calorie (cal):</strong> Energy to raise 1g of water by 1°C
                  </li>
                  <li>
                    <strong>Kilocalorie (kcal):</strong> 1000 calories (food energy)
                  </li>
                  <li>
                    <strong>Kilojoule (kJ):</strong> 1000 joules
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">Conversions:</h4>
                <ul className="list-disc pl-5 text-sm">
                  <li>1 cal = 4.184 J</li>
                  <li>1 kcal = 4.184 kJ</li>
                  <li>1 kJ = 0.239 kcal</li>
                  <li>1 kJ/mol = 0.239 kcal/mol</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Heat Capacity and Calorimetry",
      content: (
        <div className="space-y-4">
          <p>
            Heat capacity is the amount of heat required to raise the temperature of a substance by a certain amount.
            Calorimetry is the measurement of heat transfer during physical and chemical processes.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Specific Heat Capacity (c):</strong> Heat required to raise 1g of a substance by 1°C (J/g·°C)
              </li>
              <li>
                <strong>Molar Heat Capacity:</strong> Heat required to raise 1 mol of a substance by 1°C (J/mol·°C)
              </li>
              <li>
                <strong>Heat Transfer Equation:</strong> q = m × c × ΔT
              </li>
              <li>
                <strong>Calorimeter:</strong> Device used to measure heat changes in reactions
              </li>
            </ul>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Heat Energy Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mass (g)</label>
                <Input type="number" value={mass} onChange={(e) => setMass(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specific Heat (J/g·°C)</label>
                <Input type="number" value={specificHeat} onChange={(e) => setSpecificHeat(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Temperature Change (°C)</label>
                <Input type="number" value={tempChange} onChange={(e) => setTempChange(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Button onClick={calculateEnergy}>Calculate Energy</Button>
            </div>

            {calculatedEnergy !== null && (
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
                <div className="text-sm mb-1">Heat Energy (q)</div>
                <div className="text-2xl font-bold">{calculatedEnergy.toFixed(2)} J</div>
                <div className="text-xs text-muted-foreground mt-1">q = m × c × ΔT</div>
              </div>
            )}

            <div className="mt-4 text-sm">
              <p>Common Specific Heat Capacities:</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">Water</div>
                  <div>4.18 J/g·°C</div>
                </div>
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">Aluminum</div>
                  <div>0.90 J/g·°C</div>
                </div>
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">Iron</div>
                  <div>0.45 J/g·°C</div>
                </div>
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">Copper</div>
                  <div>0.39 J/g·°C</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <CalorimetryAnimation />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Enthalpy and Thermochemical Equations",
      content: (
        <div className="space-y-4">
          <p>
            Enthalpy (H) is a measure of the total heat content of a system. The change in enthalpy (ΔH) during a
            reaction tells us whether heat is absorbed or released.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Enthalpy Change (ΔH):</strong> Heat transferred at constant pressure
              </li>
              <li>
                <strong>Standard Enthalpy of Reaction (ΔH°):</strong> Enthalpy change under standard conditions (1 atm,
                25°C)
              </li>
              <li>
                <strong>Thermochemical Equation:</strong> Chemical equation that includes enthalpy change
              </li>
              <li>
                <strong>Enthalpy Diagram:</strong> Visual representation of energy changes during a reaction
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <EnthalpyDiagramAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Standard Enthalpies</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Standard Enthalpy of Formation (ΔH°f):</strong> Enthalpy change when 1 mol of a compound forms
                  from its elements in their standard states
                </li>
                <li>
                  <strong>Standard Enthalpy of Combustion (ΔH°c):</strong> Enthalpy change when 1 mol of a substance
                  completely burns in oxygen
                </li>
                <li>
                  <strong>Standard Enthalpy of Fusion (ΔH°fus):</strong> Enthalpy change when 1 mol of a solid melts
                </li>
                <li>
                  <strong>Standard Enthalpy of Vaporization (ΔH°vap):</strong> Enthalpy change when 1 mol of a liquid
                  vaporizes
                </li>
              </ul>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Thermochemical Equations</h3>
              <div className="space-y-3">
                <div className="p-2 border rounded-lg">
                  <div className="font-medium">Combustion of methane:</div>
                  <div className="text-center my-2">CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) ΔH° = -890 kJ</div>
                  <div className="text-sm">Exothermic reaction (negative ΔH)</div>
                </div>

                <div className="p-2 border rounded-lg">
                  <div className="font-medium">Decomposition of calcium carbonate:</div>
                  <div className="text-center my-2">CaCO₃(s) → CaO(s) + CO₂(g) ΔH° = +178 kJ</div>
                  <div className="text-sm">Endothermic reaction (positive ΔH)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Hess's Law and Bond Energies",
      content: (
        <div className="space-y-4">
          <p>
            Hess's Law states that the enthalpy change of a reaction is independent of the pathway between the initial
            and final states. This allows us to calculate enthalpy changes for reactions that are difficult to measure
            directly.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Hess's Law Applications:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Calculate enthalpy changes for reactions that cannot be measured directly</li>
              <li>Determine enthalpy changes from a series of reactions</li>
              <li>Find standard enthalpies of formation</li>
              <li>Verify proposed reaction mechanisms</li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <HessLawAnimation />
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Example: Hess's Law Calculation</h3>
            <p className="mb-4">Calculate the enthalpy change for the reaction: C(s) + 2H₂(g) → CH₄(g)</p>

            <div className="space-y-2 mb-4">
              <div className="font-medium">Given reactions:</div>
              <div className="pl-4">C(s) + O₂(g) → CO₂(g) ΔH° = -393.5 kJ</div>
              <div className="pl-4">H₂(g) + ½O₂(g) → H₂O(l) ΔH° = -285.8 kJ</div>
              <div className="pl-4">CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l) ΔH° = -890.3 kJ</div>

              <div className="font-medium mt-4">Solution:</div>
              <div className="pl-4">
                1. Reverse the third equation and multiply the enthalpy by -1:
                <div className="my-2 pl-4">CO₂(g) + 2H₂O(l) → CH₄(g) + 2O₂(g) ΔH° = +890.3 kJ</div>
              </div>
              <div className="pl-4">
                2. Keep the first equation as is:
                <div className="my-2 pl-4">C(s) + O₂(g) → CO₂(g) ΔH° = -393.5 kJ</div>
              </div>
              <div className="pl-4">
                3. Multiply the second equation by 2:
                <div className="my-2 pl-4">2H₂(g) + O₂(g) → 2H₂O(l) ΔH° = 2 × (-285.8 kJ) = -571.6 kJ</div>
              </div>
              <div className="pl-4">
                4. Add all three equations:
                <div className="my-2 pl-4">
                  C(s) + O₂(g) + 2H₂(g) + O₂(g) + CO₂(g) + 2H₂O(l) → CO₂(g) + 2H₂O(l) + CH₄(g) + 2O₂(g)
                </div>
                <div className="my-2 pl-4">Simplifying: C(s) + 2H₂(g) → CH₄(g)</div>
                <div className="my-2 pl-4">ΔH° = -393.5 kJ + (-571.6 kJ) + 890.3 kJ = -74.8 kJ</div>
              </div>
            </div>

            <div className="p-3 bg-green-200 dark:bg-green-800 rounded-lg text-green-800 dark:text-green-200 text-center">
              Answer: ΔH° = -74.8 kJ (exothermic reaction)
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Bond Energies</h3>
            <p className="mb-3">
              Bond energy is the energy required to break a chemical bond. We can use bond energies to estimate enthalpy
              changes for reactions.
            </p>
            <div className="text-center my-3">ΔH° = Σ(bonds broken) - Σ(bonds formed)</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              <div className="p-2 border rounded-lg text-center text-sm">
                <div className="font-medium">C-H</div>
                <div>413 kJ/mol</div>
              </div>
              <div className="p-2 border rounded-lg text-center text-sm">
                <div className="font-medium">C-C</div>
                <div>348 kJ/mol</div>
              </div>
              <div className="p-2 border rounded-lg text-center text-sm">
                <div className="font-medium">C=C</div>
                <div>614 kJ/mol</div>
              </div>
              <div className="p-2 border rounded-lg text-center text-sm">
                <div className="font-medium">O-H</div>
                <div>463 kJ/mol</div>
              </div>
              <div className="p-2 border rounded-lg text-center text-sm">
                <div className="font-medium">C-O</div>
                <div>358 kJ/mol</div>
              </div>
              <div className="p-2 border rounded-lg text-center text-sm">
                <div className="font-medium">C=O</div>
                <div>799 kJ/mol</div>
              </div>
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

// Animation components
function ExothermicAnimation() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="text-center">
          <div className="font-medium">Reactants</div>
          <div className="text-sm text-muted-foreground">Higher Energy</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="text-center">
          <div className="font-medium">Products</div>
          <div className="text-sm text-muted-foreground">Lower Energy</div>
        </div>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 200 100">
        {/* Energy diagram */}
        <rect x="40" y="20" width="40" height="20" fill="#ef4444" rx="4" />
        <rect x="120" y="60" width="40" height="20" fill="#3b82f6" rx="4" />

        {/* Arrow */}
        <path d="M80,30 L120,70" stroke="#000" strokeWidth="2" fill="none" />
        <polygon points="120,70 110,65 115,60" fill="#000" />

        {/* Heat release arrow */}
        <motion.path
          d="M100,40 L130,40"
          stroke="#ef4444"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.polygon
          points="130,40 125,35 125,45"
          fill="#ef4444"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Label */}
        <motion.text
          x="140"
          y="40"
          className="text-xs font-medium"
          fill="#ef4444"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Heat
        </motion.text>

        {/* ΔH label */}
        <text x="90" y="50" textAnchor="middle" className="text-xs font-medium" fill="#000">
          ΔH &lt; 0
        </text>
      </svg>
    </div>
  )
}

function EndothermicAnimation() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="text-center">
          <div className="font-medium">Products</div>
          <div className="text-sm text-muted-foreground">Higher Energy</div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="text-center">
          <div className="font-medium">Reactants</div>
          <div className="text-sm text-muted-foreground">Lower Energy</div>
        </div>
      </div>

      <svg width="100%" height="100%" viewBox="0 0 200 100">
        {/* Energy diagram */}
        <rect x="40" y="60" width="40" height="20" fill="#3b82f6" rx="4" />
        <rect x="120" y="20" width="40" height="20" fill="#ef4444" rx="4" />

        {/* Arrow */}
        <path d="M80,70 L120,30" stroke="#000" strokeWidth="2" fill="none" />
        <polygon points="120,30 110,35 115,40" fill="#000" />

        {/* Heat absorption arrow */}
        <motion.path
          d="M100,60 L70,60"
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.polygon
          points="70,60 75,55 75,65"
          fill="#3b82f6"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />

        {/* Label */}
        <motion.text
          x="60"
          y="60"
          textAnchor="end"
          className="text-xs font-medium"
          fill="#3b82f6"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Heat
        </motion.text>

        {/* ΔH label */}
        <text x="90" y="50" textAnchor="middle" className="text-xs font-medium" fill="#000">
          ΔH &gt; 0
        </text>
      </svg>
    </div>
  )
}

function CalorimetryAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Calorimeter */}
        <div className="w-40 h-40 rounded-lg border-2 border-gray-400 bg-white dark:bg-gray-800 relative">
          {/* Water */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-blue-400 dark:bg-blue-600"
            style={{ height: "70%" }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {/* Thermometer */}
            <div className="absolute top-2 right-4 w-2 h-16 bg-red-500 rounded-full">
              <motion.div
                className="absolute bottom-0 w-full bg-red-600 rounded-full"
                style={{ height: "50%" }}
                animate={{ height: ["50%", "70%", "50%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>

            {/* Reaction */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-yellow-300 opacity-70"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-yellow-500 opacity-50"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>

          {/* Lid */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-gray-300 dark:bg-gray-600 rounded-t-lg" />
        </div>

        <div className="mt-4 text-center text-sm">
          <div>Calorimeter measures heat</div>
          <div>transfer during reactions</div>
        </div>
      </div>
    </div>
  )
}

function EnthalpyDiagramAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Axes */}
        <line x1="50" y1="150" x2="250" y2="150" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="50" x2="50" y2="150" stroke="currentColor" strokeWidth="2" />

        {/* Axis labels */}
        <text x="150" y="180" textAnchor="middle" className="text-xs">
          Reaction Progress
        </text>
        <text x="20" y="100" textAnchor="middle" transform="rotate(-90, 20, 100)" className="text-xs">
          Enthalpy
        </text>

        {/* Energy levels */}
        <rect x="70" y="80" width="40" height="20" fill="#ef4444" rx="4" />
        <text x="90" y="70" textAnchor="middle" className="text-xs">
          Reactants
        </text>

        <rect x="190" y="120" width="40" height="20" fill="#3b82f6" rx="4" />
        <text x="210" y="155" textAnchor="middle" className="text-xs">
          Products
        </text>

        {/* Reaction pathway */}
        <path d="M110,90 C130,50 170,50 190,120" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="5,5" />

        {/* Activation energy */}
        <line x1="130" y1="90" x2="130" y2="50" stroke="#10b981" strokeWidth="2" strokeDasharray="3,3" />
        <text x="130" y="40" textAnchor="middle" className="text-xs fill-green-600">
          Ea
        </text>

        {/* Enthalpy change */}
        <line x1="210" y1="130" x2="210" y2="90" stroke="#d946ef" strokeWidth="2" strokeDasharray="3,3" />
        <text x="220" y="110" textAnchor="start" className="text-xs fill-purple-600">
          ΔH
        </text>

        {/* Moving particle */}
        <motion.circle
          cx="110"
          cy="90"
          r="5"
          fill="#f59e0b"
          animate={{
            cx: [110, 130, 150, 170, 190],
            cy: [90, 50, 50, 80, 120],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

function HessLawAnimation() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg width="300" height="200" viewBox="0 0 300 200">
        {/* Direct path */}
        <rect x="50" y="50" width="60" height="30" rx="4" fill="#ef4444" />
        <text x="80" y="70" textAnchor="middle" className="text-xs text-white">
          A
        </text>

        <rect x="190" y="120" width="60" height="30" rx="4" fill="#3b82f6" />
        <text x="220" y="140" textAnchor="middle" className="text-xs text-white">
          C
        </text>

        <path d="M110,65 L190,135" stroke="#000" strokeWidth="2" fill="none" />
        <polygon points="190,135 180,125 175,135" fill="#000" />
        <text x="150" y="90" textAnchor="middle" className="text-xs">
          ΔH₁
        </text>

        {/* Indirect path */}
        <rect x="120" y="150" width="60" height="30" rx="4" fill="#10b981" />
        <text x="150" y="170" textAnchor="middle" className="text-xs text-white">
          B
        </text>

        <path d="M110,80 L140,150" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        <polygon points="140,150 130,140 125,150" fill="#000" />
        <text x="115" y="120" textAnchor="middle" className="text-xs">
          ΔH₂
        </text>

        <path d="M180,150 L190,135" stroke="#000" strokeWidth="2" fill="none" strokeDasharray="5,5" />
        <polygon points="190,135 180,140 185,130" fill="#000" />
        <text x="195" y="150" textAnchor="middle" className="text-xs">
          ΔH₃
        </text>

        {/* Equation */}
        <text x="150" y="30" textAnchor="middle" className="text-sm font-medium">
          Hess's Law: ΔH₁ = ΔH₂ + ΔH₃
        </text>

        {/* Moving particle */}
        <motion.circle
          cx="80"
          cy="65"
          r="4"
          fill="#f59e0b"
          animate={{
            cx: [80, 125, 150, 175, 220],
            cy: [65, 100, 150, 135, 135],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  )
}

