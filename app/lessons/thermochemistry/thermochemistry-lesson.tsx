"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Thermometer, Flame, Beaker, Zap, Droplets, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ThermochemistryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [reactionType, setReactionType] = useState<"exothermic" | "endothermic">("exothermic")
  const [temperature, setTemperature] = useState(25)
  const [showAnswer, setShowAnswer] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Energy calculator
  const [mass, setMass] = useState("100")
  const [specificHeat, setSpecificHeat] = useState("4.18")
  const [tempChange, setTempChange] = useState("10")
  const [calculatedEnergy, setCalculatedEnergy] = useState<number | null>(null)

  // Enthalpy calculator
  const [reaction, setReaction] = useState("combustion")
  const [substance, setSubstance] = useState("methane")
  const [moles, setMoles] = useState("1")
  const [enthalpyResult, setEnthalpyResult] = useState<number | null>(null)

  // Molecular simulation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let particles: {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string
      energy: number
    }[] = []

    const createParticles = () => {
      particles = []
      const particleCount = 30
      const colors =
        reactionType === "exothermic" ? ["#ef4444", "#f97316", "#f59e0b"] : ["#3b82f6", "#60a5fa", "#93c5fd"]

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 3 + 2
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (reactionType === "exothermic" ? 3 : 1.5),
          vy: (Math.random() - 0.5) * (reactionType === "exothermic" ? 3 : 1.5),
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          energy: reactionType === "exothermic" ? 5 : 2,
        })
      }
    }

    createParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (reactionType === "exothermic") {
        gradient.addColorStop(0, "rgba(254, 242, 242, 0.2)")
        gradient.addColorStop(1, "rgba(254, 226, 226, 0.2)")
      } else {
        gradient.addColorStop(0, "rgba(239, 246, 255, 0.2)")
        gradient.addColorStop(1, "rgba(219, 234, 254, 0.2)")
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off walls
        if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
          particle.vx *= -1
        }
        if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
          particle.vy *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw energy lines
        if (reactionType === "exothermic") {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(
            particle.x + (Math.random() - 0.5) * particle.energy * 5,
            particle.y + (Math.random() - 0.5) * particle.energy * 5,
          )
          ctx.strokeStyle = "rgba(239, 68, 68, 0.3)"
          ctx.stroke()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [reactionType])

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

  const calculateEnthalpy = () => {
    const molesValue = Number.parseFloat(moles)

    if (isNaN(molesValue)) {
      setEnthalpyResult(null)
      return
    }

    // Standard enthalpies of reaction in kJ/mol
    const enthalpies: { [key: string]: { [key: string]: number } } = {
      combustion: {
        methane: -890,
        ethanol: -1367,
        glucose: -2803,
        propane: -2220,
      },
      formation: {
        methane: -74.8,
        ethanol: -277.7,
        glucose: -1273,
        propane: -104.7,
      },
      neutralization: {
        methane: 0, // Not applicable
        ethanol: 0, // Not applicable
        glucose: 0, // Not applicable
        propane: 0, // Not applicable
      },
    }

    const result = enthalpies[reaction][substance] * molesValue
    setEnthalpyResult(result)
  }

  const handleQuizSubmit = () => {
    const correctAnswers = {
      q1: "b",
      q2: "a",
      q3: "c",
      q4: "b",
      q5: "a",
    }

    let score = 0
    Object.keys(correctAnswers).forEach((question) => {
      if (quizAnswers[question] === correctAnswers[question as keyof typeof correctAnswers]) {
        score++
      }
    })

    setQuizScore(score)
    setQuizSubmitted(true)
  }

  const sections = [
    {
      title: "Introduction to Thermochemistry",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
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
                  <canvas ref={canvasRef} width={300} height={150} className="border rounded-lg" />
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
      title: "Heat Capacity & Calorimetry",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Beaker className="mr-2 text-blue-500" size={20} />
                Calorimetry
              </h3>
              <p className="mb-2">
                Calorimetry is the science of measuring heat flow during chemical reactions or physical changes.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Coffee-cup calorimeter:</strong> Measures heat at constant pressure
                </li>
                <li>
                  <strong>Bomb calorimeter:</strong> Measures heat at constant volume
                </li>
                <li>
                  <strong>Heat capacity of calorimeter:</strong> Amount of heat needed to raise the temperature of the
                  calorimeter by 1°C
                </li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Equation:</strong> q<sub>reaction</sub> = -q<sub>calorimeter</sub> = -C<sub>calorimeter</sub> ×
                ΔT
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Calculator className="mr-2 text-purple-500" size={20} />
                Heat Capacity Calculations
              </h3>
              <p className="mb-2">The specific heat capacity varies for different substances:</p>
              <div className="grid grid-cols-2 gap-2">
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

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Interactive Heat Energy Calculator</h3>
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
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Example Problem</h3>
            <p className="mb-2">
              A 50.0 g piece of copper (specific heat = 0.39 J/g·°C) at 80.0°C is placed in 100.0 g of water (specific
              heat = 4.18 J/g·°C) at 20.0°C. What is the final temperature of the mixture?
            </p>

            <div className="mb-4">
              <Button variant="outline" onClick={() => setShowAnswer(!showAnswer)} className="w-full">
                {showAnswer ? "Hide Solution" : "Show Solution"}
              </Button>
            </div>

            {showAnswer && (
              <div className="p-4 border rounded-lg bg-white dark:bg-gray-800">
                <h4 className="font-medium mb-2">Solution:</h4>
                <p className="mb-2">We know that heat lost by copper = heat gained by water</p>
                <p className="mb-2">
                  q<sub>copper</sub> + q<sub>water</sub> = 0
                </p>
                <p className="mb-2">
                  m<sub>Cu</sub> × c<sub>Cu</sub> × (T<sub>f</sub> - T<sub>Cu</sub>) + m<sub>water</sub> × c
                  <sub>water</sub> × (T<sub>f</sub> - T<sub>water</sub>) = 0
                </p>
                <p className="mb-2">
                  50.0 g × 0.39 J/g·°C × (T<sub>f</sub> - 80.0°C) + 100.0 g × 4.18 J/g·°C × (T<sub>f</sub> - 20.0°C) = 0
                </p>
                <p className="mb-2">
                  19.5 J/°C × (T<sub>f</sub> - 80.0°C) + 418 J/°C × (T<sub>f</sub> - 20.0°C) = 0
                </p>
                <p className="mb-2">
                  19.5T<sub>f</sub> - 1560 J + 418T<sub>f</sub> - 8360 J = 0
                </p>
                <p className="mb-2">
                  437.5T<sub>f</sub> = 9920 J
                </p>
                <p className="mb-2">
                  T<sub>f</sub> = 22.7°C
                </p>
                <p className="font-medium text-green-600 dark:text-green-400">
                  The final temperature of the mixture is 22.7°C.
                </p>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Enthalpy & Thermochemical Equations",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">Interactive Enthalpy Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Reaction Type</label>
                <Select value={reaction} onValueChange={setReaction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="combustion">Combustion</SelectItem>
                    <SelectItem value="formation">Formation</SelectItem>
                    <SelectItem value="neutralization">Neutralization</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Substance</label>
                <Select value={substance} onValueChange={setSubstance}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select substance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="methane">Methane (CH₄)</SelectItem>
                    <SelectItem value="ethanol">Ethanol (C₂H₅OH)</SelectItem>
                    <SelectItem value="glucose">Glucose (C₆H₁₂O₆)</SelectItem>
                    <SelectItem value="propane">Propane (C₃H₈)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Moles</label>
                <Input type="number" value={moles} onChange={(e) => setMoles(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Button onClick={calculateEnthalpy}>Calculate Enthalpy Change</Button>
            </div>

            {enthalpyResult !== null && (
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
                <div className="text-sm mb-1">Enthalpy Change (ΔH)</div>
                <div className="text-2xl font-bold">{enthalpyResult.toFixed(1)} kJ</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {enthalpyResult < 0 ? "Exothermic Reaction" : "Endothermic Reaction"}
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Temperature Effect on Enthalpy</h3>
            <p className="mb-4">
              The enthalpy of a reaction changes with temperature. Drag the slider to see how temperature affects the
              enthalpy of a reaction.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Temperature (°C): {temperature}</label>
              <Slider
                value={[temperature]}
                min={0}
                max={100}
                step={1}
                onValueChange={(value) => setTemperature(value[0])}
                className="mb-6"
              />

              <div className="relative h-40 border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="300" height="150" viewBox="0 0 300 150">
                    {/* Axes */}
                    <line x1="50" y1="120" x2="250" y2="120" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="30" x2="50" y2="120" stroke="currentColor" strokeWidth="2" />

                    {/* Axis labels */}
                    <text x="150" y="140" textAnchor="middle" className="text-xs">
                      Reaction Progress
                    </text>
                    <text x="30" y="75" textAnchor="middle" transform="rotate(-90, 30, 75)" className="text-xs">
                      Enthalpy
                    </text>

                    {/* Energy levels */}
                    <rect x="70" y="80" width="40" height="20" fill="#ef4444" rx="4" />
                    <text x="90" y="70" textAnchor="middle" className="text-xs">
                      Reactants
                    </text>

                    <rect x="190" y="120 - (temperature * 0.4)" width="40" height="20" fill="#3b82f6" rx="4" />
                    <text x="210" y="130 - (temperature * 0.4)" textAnchor="middle" className="text-xs">
                      Products
                    </text>

                    {/* Reaction pathway */}
                    <path
                      d={`M110,90 C130,50 170,50 190,${120 - temperature * 0.4}`}
                      stroke="#000"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />

                    {/* Enthalpy change */}
                    <line
                      x1="210"
                      y1={120 - temperature * 0.4 + 10}
                      x2="210"
                      y2="90"
                      stroke="#d946ef"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                    />
                    <text x="220" y="100" textAnchor="start" className="text-xs fill-purple-600">
                      ΔH = {(90 - (120 - temperature * 0.4 + 10)).toFixed(1)} kJ
                    </text>
                  </svg>
                </div>
              </div>

              <div className="text-center mt-4 text-sm">
                <p>
                  As temperature increases, the enthalpy change of the reaction{" "}
                  {temperature > 50 ? "decreases" : "increases"}.
                </p>
                <p className="text-muted-foreground">
                  This is due to the temperature dependence of enthalpy (ΔH = ΔH° + ΔCp × ΔT)
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Hess's Law & Bond Energies",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Zap className="mr-2 text-blue-500" size={20} />
                Hess's Law Principle
              </h3>
              <p className="mb-2">
                If a reaction can be carried out in multiple steps, the enthalpy change for the overall reaction is
                equal to the sum of the enthalpy changes for each step.
              </p>
              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 text-center">
                <p className="font-medium">
                  ΔH<sub>overall</sub> = ΔH<sub>step 1</sub> + ΔH<sub>step 2</sub> + ... + ΔH<sub>step n</sub>
                </p>
              </div>
              <div className="mt-3">
                <p className="font-medium">Rules for manipulating reactions:</p>
                <ul className="list-disc pl-5 text-sm mt-1">
                  <li>If you reverse a reaction, change the sign of ΔH</li>
                  <li>If you multiply a reaction by a factor, multiply ΔH by the same factor</li>
                  <li>If you add reactions, add their ΔH values</li>
                </ul>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Droplets className="mr-2 text-purple-500" size={20} />
                Bond Energies
              </h3>
              <p className="mb-2">
                Bond energy is the energy required to break a chemical bond. We can use bond energies to estimate
                enthalpy changes.
              </p>
              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800 text-center mb-3">
                <p className="font-medium">ΔH° = Σ(bonds broken) - Σ(bonds formed)</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
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
              </div>
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
            <h3 className="text-lg font-medium mb-2">Bond Energy Example</h3>
            <p className="mb-3">Calculate the enthalpy change for the reaction: CH₄(g) + Cl₂(g) → CH₃Cl(g) + HCl(g)</p>

            <Tabs defaultValue="problem" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="problem">Problem</TabsTrigger>
                <TabsTrigger value="solution">Solution</TabsTrigger>
              </TabsList>
              <TabsContent value="problem" className="p-4 border rounded-lg mt-2">
                <p className="mb-2">Given bond energies:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>C-H: 413 kJ/mol</li>
                  <li>Cl-Cl: 242 kJ/mol</li>
                  <li>C-Cl: 328 kJ/mol</li>
                  <li>H-Cl: 431 kJ/mol</li>
                </ul>
                <p>Calculate the enthalpy change for the reaction using bond energies.</p>
              </TabsContent>
              <TabsContent value="solution" className="p-4 border rounded-lg mt-2">
                <h4 className="font-medium mb-2">Step 1: Identify bonds broken and formed</h4>
                <p className="mb-2">Bonds broken (reactants):</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li>1 C-H bond in CH₄: 1 × 413 kJ/mol = 413 kJ/mol</li>
                  <li>1 Cl-Cl bond: 1 × 242 kJ/mol = 242 kJ/mol</li>
                  <li>Total energy for bonds broken: 413 + 242 = 655 kJ/mol</li>
                </ul>

                <p className="mb-2">Bonds formed (products):</p>
                <ul className="list-disc pl-5 space-y-1 mb-2">
                  <li>1 C-Cl bond in CH₃Cl: 1 × 328 kJ/mol = 328 kJ/mol</li>
                  <li>1 H-Cl bond: 1 × 431 kJ/mol = 431 kJ/mol</li>
                  <li>Total energy for bonds formed: 328 + 431 = 759 kJ/mol</li>
                </ul>

                <h4 className="font-medium mb-2">Step 2: Calculate ΔH</h4>
                <p className="mb-2">ΔH = Σ(bonds broken) - Σ(bonds formed)</p>
                <p className="mb-2">ΔH = 655 kJ/mol - 759 kJ/mol = -104 kJ/mol</p>

                <div className="p-3 bg-green-200 dark:bg-green-800 rounded-lg text-green-800 dark:text-green-200 text-center mt-4">
                  The reaction is exothermic with ΔH = -104 kJ/mol
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ),
    },
    {
      title: "Applications & Practice",
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Thermochemistry has numerous real-world applications and is essential for understanding energy changes in
            chemical processes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Real-World Applications</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Fuel Development:</strong> Designing fuels with optimal energy output
                </li>
                <li>
                  <strong>Food Science:</strong> Calculating caloric content of foods
                </li>
                <li>
                  <strong>Chemical Manufacturing:</strong> Optimizing reaction conditions for energy efficiency
                </li>
                <li>
                  <strong>Environmental Science:</strong> Understanding heat transfer in ecosystems
                </li>
                <li>
                  <strong>Materials Science:</strong> Developing materials with specific thermal properties
                </li>
              </ul>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Key Thermochemical Processes</h3>
              <div className="space-y-3">
                <div className="p-2 border rounded-lg">
                  <div className="font-medium">Combustion</div>
                  <div className="text-sm">Rapid oxidation of fuel releasing energy as heat and light</div>
                  <div className="text-xs text-muted-foreground mt-1">Example: Burning natural gas for heating</div>
                </div>
                <div className="p-2 border rounded-lg">
                  <div className="font-medium">Phase Changes</div>
                  <div className="text-sm">Energy changes during transitions between solid, liquid, and gas</div>
                  <div className="text-xs text-muted-foreground mt-1">Example: Refrigeration and air conditioning</div>
                </div>
                <div className="p-2 border rounded-lg">
                  <div className="font-medium">Chemical Reactions in Living Systems</div>
                  <div className="text-sm">Metabolic processes that sustain life</div>
                  <div className="text-xs text-muted-foreground mt-1">Example: ATP hydrolysis in cells</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">Thermochemistry Quiz</h3>
            <p className="mb-4">Test your understanding of thermochemistry concepts:</p>

            <div className="space-y-4">
              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium mb-2">1. Which of the following is an exothermic process?</p>
                <RadioGroup
                  value={quizAnswers.q1 || ""}
                  onValueChange={(value) => setQuizAnswers({ ...quizAnswers, q1: value })}
                  disabled={quizSubmitted}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="q1-a" />
                    <Label htmlFor="q1-a">Melting of ice</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="q1-b" />
                    <Label htmlFor="q1-b">Combustion of methane</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="c" id="q1-c" />
                    <Label htmlFor="q1-c">Evaporation of water</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="d" id="q1-d" />
                    <Label htmlFor="q1-d">Photosynthesis</Label>
                  </div>
                </RadioGroup>
                {quizSubmitted && quizAnswers.q1 === "b" && (
                  <div className="mt-2 text-green-600 dark:text-green-400 text-sm">
                    Correct! Combustion reactions release energy.
                  </div>
                )}
                {quizSubmitted && quizAnswers.q1 !== "b" && (
                  <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                    Incorrect. The correct answer is: Combustion of methane.
                  </div>
                )}
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium mb-2">
                  2. The specific heat capacity of water is 4.18 J/g·°C. How much energy is required to heat 50 g of
                  water from 20°C to 30°C?
                </p>
                <RadioGroup
                  value={quizAnswers.q2 || ""}
                  onValueChange={(value) => setQuizAnswers({ ...quizAnswers, q2: value })}
                  disabled={quizSubmitted}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="q2-a" />
                    <Label htmlFor="q2-a">2090 J</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="q2-b" />
                    <Label htmlFor="q2-b">209 J</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="c" id="q2-c" />
                    <Label htmlFor="q2-c">4180 J</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="d" id="q2-d" />
                    <Label htmlFor="q2-d">418 J</Label>
                  </div>
                </RadioGroup>
                {quizSubmitted && quizAnswers.q2 === "a" && (
                  <div className="mt-2 text-green-600 dark:text-green-400 text-sm">
                    Correct! q = m × c × ΔT = 50 g × 4.18 J/g·°C × 10°C = 2090 J
                  </div>
                )}
                {quizSubmitted && quizAnswers.q2 !== "a" && (
                  <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                    Incorrect. The correct answer is: 2090 J
                  </div>
                )}
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium mb-2">
                  3. Which law states that the enthalpy change of a reaction is independent of the pathway between the
                  initial and final states?
                </p>
                <RadioGroup
                  value={quizAnswers.q3 || ""}
                  onValueChange={(value) => setQuizAnswers({ ...quizAnswers, q3: value })}
                  disabled={quizSubmitted}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="q3-a" />
                    <Label htmlFor="q3-a">First Law of Thermodynamics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="q3-b" />
                    <Label htmlFor="q3-b">Boyle's Law</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="c" id="q3-c" />
                    <Label htmlFor="q3-c">Hess's Law</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="d" id="q3-d" />
                    <Label htmlFor="q3-d">Charles's Law</Label>
                  </div>
                </RadioGroup>
                {quizSubmitted && quizAnswers.q3 === "c" && (
                  <div className="mt-2 text-green-600 dark:text-green-400 text-sm">
                    Correct! Hess's Law states that enthalpy change is independent of the pathway.
                  </div>
                )}
                {quizSubmitted && quizAnswers.q3 !== "c" && (
                  <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                    Incorrect. The correct answer is: Hess's Law
                  </div>
                )}
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium mb-2">4. In an endothermic reaction:</p>
                <RadioGroup
                  value={quizAnswers.q4 || ""}
                  onValueChange={(value) => setQuizAnswers({ ...quizAnswers, q4: value })}
                  disabled={quizSubmitted}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="q4-a" />
                    <Label htmlFor="q4-a">Heat is released to the surroundings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="q4-b" />
                    <Label htmlFor="q4-b">Heat is absorbed from the surroundings</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="c" id="q4-c" />
                    <Label htmlFor="q4-c">No heat is transferred</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="d" id="q4-d" />
                    <Label htmlFor="q4-d">The enthalpy change (ΔH) is negative</Label>
                  </div>
                </RadioGroup>
                {quizSubmitted && quizAnswers.q4 === "b" && (
                  <div className="mt-2 text-green-600 dark:text-green-400 text-sm">
                    Correct! Endothermic reactions absorb heat from the surroundings.
                  </div>
                )}
                {quizSubmitted && quizAnswers.q4 !== "b" && (
                  <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                    Incorrect. The correct answer is: Heat is absorbed from the surroundings
                  </div>
                )}
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <p className="font-medium mb-2">5. Which of the following is NOT a standard enthalpy?</p>
                <RadioGroup
                  value={quizAnswers.q5 || ""}
                  onValueChange={(value) => setQuizAnswers({ ...quizAnswers, q5: value })}
                  disabled={quizSubmitted}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="a" id="q5-a" />
                    <Label htmlFor="q5-a">Standard enthalpy of activation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="b" id="q5-b" />
                    <Label htmlFor="q5-b">Standard enthalpy of formation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="c" id="q5-c" />
                    <Label htmlFor="q5-c">Standard enthalpy of combustion</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="d" id="q5-d" />
                    <Label htmlFor="q5-d">Standard enthalpy of fusion</Label>
                  </div>
                </RadioGroup>
                {quizSubmitted && quizAnswers.q5 === "a" && (
                  <div className="mt-2 text-green-600 dark:text-green-400 text-sm">
                    Correct! "Standard enthalpy of activation" is not a standard term; activation energy is a different
                    concept.
                  </div>
                )}
                {quizSubmitted && quizAnswers.q5 !== "a" && (
                  <div className="mt-2 text-red-600 dark:text-red-400 text-sm">
                    Incorrect. The correct answer is: Standard enthalpy of activation
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              {!quizSubmitted ? (
                <Button onClick={handleQuizSubmit}>Submit Quiz</Button>
              ) : (
                <div className="text-center">
                  <div className="text-xl font-bold mb-2">Your Score: {quizScore}/5</div>
                  <div className="text-sm text-muted-foreground">
                    {quizScore === 5
                      ? "Perfect! You've mastered thermochemistry concepts."
                      : quizScore >= 3
                        ? "Good job! Review the incorrect answers to improve your understanding."
                        : "Keep studying! Review the key concepts and try again."}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Summary of Key Concepts</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <div className="font-medium">Energy and Heat</div>
                <ul className="list-disc pl-5 text-sm mt-1">
                  <li>Energy is the capacity to do work or transfer heat</li>
                  <li>Heat is energy transferred due to temperature difference</li>
                  <li>Exothermic reactions release heat (negative ΔH)</li>
                  <li>Endothermic reactions absorb heat (positive ΔH)</li>
                </ul>
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <div className="font-medium">Heat Capacity and Calorimetry</div>
                <ul className="list-disc pl-5 text-sm mt-1">
                  <li>Specific heat capacity is the heat required to raise 1g of a substance by 1°C</li>
                  <li>Heat transfer equation: q = m × c × ΔT</li>
                  <li>Calorimetry measures heat changes in reactions</li>
                </ul>
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <div className="font-medium">Enthalpy and Thermochemical Equations</div>
                <ul className="list-disc pl-5 text-sm mt-1">
                  <li>Enthalpy (H) is the heat content of a system</li>
                  <li>Standard conditions: 1 atm pressure and 25°C</li>
                  <li>Thermochemical equations include enthalpy changes</li>
                </ul>
              </div>

              <div className="p-3 border rounded-lg bg-white dark:bg-gray-800">
                <div className="font-medium">Hess's Law and Bond Energies</div>
                <ul className="list-disc pl-5 text-sm mt-1">
                  <li>Enthalpy change is independent of the reaction pathway</li>
                  <li>Bond breaking requires energy; bond formation releases energy</li>
                  <li>ΔH = Σ(bonds broken) - Σ(bonds formed)</li>
                </ul>
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

