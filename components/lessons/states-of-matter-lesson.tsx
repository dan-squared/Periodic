"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Droplet, Check, X, HelpCircle, RefreshCw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function StatesOfMatterLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [temperature, setTemperature] = useState(300) // K
  const [pressure, setPressure] = useState(1) // atm
  const [volume, setVolume] = useState(22.4) // L
  const [moles, setMoles] = useState(1) // mol
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState({})

  // Additional state for gas law simulations
  const [boylesVolume, setBoylesVolume] = useState(22.4)
  const [charlesTemp, setCharlesTemp] = useState(300)
  const [avogadroMoles, setAvogadroMoles] = useState(1)

  // Gas law calculations
  const calculateVolume = () => {
    // PV = nRT, so V = nRT/P
    const R = 0.082057 // L·atm/(mol·K)
    return ((moles * R * temperature) / pressure).toFixed(2)
  }

  const calculatePressure = () => {
    // PV = nRT, so P = nRT/V
    const R = 0.082057 // L·atm/(mol·K)
    return ((moles * R * temperature) / volume).toFixed(2)
  }

  // Gas law calculations
  const calculateBoylesPressure = () => {
    // P₁V₁ = P₂V₂, so P₂ = P₁V₁/V₂
    // Using P₁ = 1 atm, V₁ = 22.4 L as reference
    return (1 * 22.4) / boylesVolume
  }

  const calculateCharlesVolume = () => {
    // V₁/T₁ = V₂/T₂, so V₂ = V₁T₂/T₁
    // Using V₁ = 22.4 L, T₁ = 273 K as reference
    return (22.4 * charlesTemp) / 273
  }

  const calculateAvogadroVolume = () => {
    // V₁/n₁ = V₂/n₂, so V₂ = V₁n₂/n₁
    // Using V₁ = 22.4 L, n₁ = 1 mol as reference
    return 22.4 * avogadroMoles
  }

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer })
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  const calculateScore = () => {
    let score = 0
    ;[
      {
        id: 1,
        question: "Which state of matter has the highest kinetic energy?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        correctAnswer: "Plasma",
        explanation:
          "Plasma has the highest kinetic energy of the four states of matter. It consists of a highly ionized gas with free electrons and positive ions, requiring very high temperatures to maintain.",
      },
      {
        id: 2,
        question: "What phase change occurs when a substance changes directly from a solid to a gas?",
        options: ["Melting", "Freezing", "Sublimation", "Condensation"],
        correctAnswer: "Sublimation",
        explanation:
          "Sublimation is the phase change where a substance transitions directly from the solid phase to the gas phase without passing through the liquid phase. Examples include dry ice (solid CO₂) and iodine crystals.",
      },
      {
        id: 3,
        question:
          "According to Charles's Law, what happens to the volume of a gas when its temperature increases at constant pressure?",
        options: ["Volume decreases", "Volume increases", "Volume remains constant", "Volume becomes zero"],
        correctAnswer: "Volume increases",
        explanation:
          "Charles's Law states that at constant pressure, the volume of a gas is directly proportional to its absolute temperature. Therefore, when temperature increases, the volume also increases.",
      },
      {
        id: 4,
        question: "At the triple point of a substance:",
        options: [
          "Only one phase can exist",
          "Two phases can coexist",
          "Three phases can coexist",
          "No phase can exist",
        ],
        correctAnswer: "Three phases can coexist",
        explanation:
          "The triple point is the unique combination of temperature and pressure at which the solid, liquid, and gas phases of a substance can coexist in thermodynamic equilibrium.",
      },
      {
        id: 5,
        question: "Which of the following is NOT a postulate of the Kinetic Molecular Theory?",
        options: [
          "Gas particles are in constant, random motion",
          "Collisions between gas particles are perfectly elastic",
          "Gas particles have strong attractive forces between them",
          "The volume of gas particles is negligible compared to the container",
        ],
        correctAnswer: "Gas particles have strong attractive forces between them",
        explanation:
          "The Kinetic Molecular Theory assumes that there are negligible attractive forces between gas particles, not strong ones. This is why gases can expand to fill their containers and have relatively low densities.",
      },
    ].forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setShowExplanation({})
  }

  const toggleExplanation = (questionId) => {
    setShowExplanation({
      ...showExplanation,
      [questionId]: !showExplanation[questionId],
    })
  }

  const sections = [
    {
      title: "States of Matter",
      content: (
        <div className="space-y-4">
          <section className="mb-12">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 p-4 rounded-md mb-6">
              <p className="text-sm">
                <strong>Note:</strong> Matter exists in primarily four states: solid, liquid, gas, and plasma. Each
                state has unique properties based on the arrangement, energy, and movement of particles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Solid state */}
              <div className="border rounded-lg p-4 bg-card bg-opacity-50">
                <h3 className="text-xl font-medium mb-3">Solid</h3>
                <div className="h-48 border rounded bg-background bg-opacity-50 mb-3 relative overflow-hidden">
                  <div className="absolute inset-4 grid grid-cols-5 grid-rows-5 gap-1">
                    {Array(25)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-primary animate-pulse"
                          style={{
                            animationDuration: "3s",
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                  </div>
                </div>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Definite shape and volume</li>
                  <li>Particles tightly packed in fixed positions</li>
                  <li>Minimal particle movement (only vibration)</li>
                  <li>High density, incompressible</li>
                </ul>
              </div>

              {/* Liquid state */}
              <div className="border rounded-lg p-4 bg-card bg-opacity-50">
                <h3 className="text-xl font-medium mb-3">Liquid</h3>
                <div className="h-48 border rounded bg-background bg-opacity-50 mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    {Array(20)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full w-4 h-4 bg-primary"
                          style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            animation: `float ${2 + Math.random() * 3}s infinite linear`,
                            animationDelay: `${i * 0.2}s`,
                          }}
                        ></div>
                      ))}
                  </div>
                </div>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>Definite volume, takes shape of container</li>
                  <li>Particles close together but can move past each other</li>
                  <li>Moderate particle movement</li>
                  <li>Moderate density, mostly incompressible</li>
                </ul>
              </div>

              {/* Gas state */}
              <div className="border rounded-lg p-4 bg-card bg-opacity-50">
                <h3 className="text-xl font-medium mb-3">Gas</h3>
                <div className="h-48 border rounded bg-background bg-opacity-50 mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 p-2">
                    {Array(15)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full w-3 h-3 bg-primary"
                          style={{
                            left: `${Math.random() * 90 + 5}%`,
                            top: `${Math.random() * 90 + 5}%`,
                            animation: `bounce ${1 + Math.random() * 2}s infinite linear`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        ></div>
                      ))}
                  </div>
                </div>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li>No definite shape or volume</li>
                  <li>Particles far apart with no regular arrangement</li>
                  <li>Rapid, random particle movement</li>
                  <li>Low density, highly compressible</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      title: "Phase Changes",
      content: (
        <div className="space-y-4">
          <section className="mb-12">
            <p className="mb-4">
              Phase changes occur when matter transitions between states due to changes in temperature or pressure.
            </p>

            <div className="w-full p-6 border rounded-lg bg-card bg-opacity-50 mb-6">
              <h3 className="text-xl font-medium mb-4">Interactive Phase Change Diagram</h3>
              <div className="w-full h-[400px] relative">
                <div className="absolute inset-0">
                  <div className="w-full h-full flex flex-col">
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Temperature (K): {temperature}</label>
                      <input
                        type="range"
                        min="100"
                        max="500"
                        step="5"
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-1">Pressure (atm): {pressure.toFixed(1)}</label>
                      <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={pressure}
                        onChange={(e) => setPressure(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1 border rounded-lg bg-white dark:bg-gray-800 relative overflow-hidden">
                      <svg viewBox="0 0 500 400" className="w-full h-full">
                        {/* Axes */}
                        <line x1="50" y1="350" x2="450" y1="350" x2="450" stroke="currentColor" strokeWidth="2" />
                        <line x1="50" y1="50" x2="50" y1="350" x2="350" stroke="currentColor" strokeWidth="2" />

                        {/* Axis labels */}
                        <text x="250" y="390" textAnchor="middle" className="text-sm">
                          Temperature (K)
                        </text>
                        <text x="20" y="200" textAnchor="middle" transform="rotate(-90, 20, 200)" className="text-sm">
                          Pressure (atm)
                        </text>

                        {/* Temperature scale markers */}
                        <line x1="150" y1="350" x2="150" y1="355" stroke="currentColor" strokeWidth="1" />
                        <text x="150" y="370" textAnchor="middle" className="text-xs">
                          273
                        </text>

                        <line x1="250" y1="350" x2="250" y1="355" stroke="currentColor" strokeWidth="1" />
                        <text x="250" y="370" textAnchor="middle" className="text-xs">
                          373
                        </text>

                        <line x1="350" y1="350" x2="350" y1="355" stroke="currentColor" strokeWidth="1" />
                        <text x="350" y="370" textAnchor="middle" className="text-xs">
                          473
                        </text>

                        {/* Pressure scale markers */}
                        <line x1="45" y1="250" x2="50" y1="250" stroke="currentColor" strokeWidth="1" />
                        <text x="35" y="255" textAnchor="end" className="text-xs">
                          1
                        </text>

                        <line x1="45" y1="150" x2="50" y1="150" stroke="currentColor" strokeWidth="1" />
                        <text x="35" y="155" textAnchor="end" className="text-xs">
                          3
                        </text>

                        <line x1="45" y1="50" x2="50" y1="50" stroke="currentColor" strokeWidth="1" />
                        <text x="35" y="55" textAnchor="end" className="text-xs">
                          5
                        </text>

                        {/* Phase regions with better coloring */}
                        <path
                          d="M50,350 L150,250 L450,350 Z"
                          fill="#90caf9"
                          fillOpacity="0.6"
                          stroke="#2196f3"
                          strokeWidth="2"
                        />
                        <path
                          d="M50,50 L150,250 L50,350 Z"
                          fill="#4db6ac"
                          fillOpacity="0.6"
                          stroke="#009688"
                          strokeWidth="2"
                        />
                        <path
                          d="M150,250 L450,50 L450,350 Z"
                          fill="#ffcc80"
                          fillOpacity="0.6"
                          stroke="#ff9800"
                          strokeWidth="2"
                        />

                        {/* Phase boundaries */}
                        <line
                          x1="50"
                          y1="350"
                          x2="150"
                          y1="250"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeDasharray="5,5"
                        />
                        <line
                          x1="150"
                          y1="250"
                          x2="450"
                          y1="350"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeDasharray="5,5"
                        />
                        <line
                          x1="150"
                          y1="250"
                          x2="450"
                          y1="50"
                          stroke="#000"
                          strokeWidth="2.5"
                          strokeDasharray="5,5"
                        />

                        {/* Triple point */}
                        <circle cx="150" cy="250" r="6" fill="#e91e63" />
                        <text x="160" y="240" className="text-xs font-bold">
                          Triple Point
                        </text>

                        {/* Critical point */}
                        <circle cx="350" cy="150" r="6" fill="#9c27b0" />
                        <text x="360" y="140" className="text-xs font-bold">
                          Critical Point
                        </text>

                        {/* Current state indicator */}
                        <circle
                          cx={50 + ((temperature - 100) / 400) * 400}
                          cy={350 - ((pressure - 0.1) / 4.9) * 300}
                          r="8"
                          fill="#f44336"
                          stroke="#000"
                          strokeWidth="2"
                        />

                        {/* Phase labels */}
                        <text x="100" y="320" textAnchor="middle" className="text-sm font-medium">
                          Solid
                        </text>
                        <text x="300" y="320" textAnchor="middle" className="text-sm font-medium">
                          Gas
                        </text>
                        <text x="100" y="200" textAnchor="middle" className="text-sm font-medium">
                          Liquid
                        </text>
                      </svg>

                      {/* Current state indicator */}
                      <div className="absolute top-2 right-2 px-3 py-1 bg-white dark:bg-gray-700 border rounded-md shadow-sm text-sm">
                        <div className="font-bold">Current State:</div>
                        <div
                          className={`mt-1 px-2 py-1 rounded-md ${
                            temperature < 273 && pressure < 3
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                              : temperature > 373 && pressure < 3
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                                : "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200"
                          }`}
                        >
                          {temperature < 273 && pressure < 3
                            ? "Solid"
                            : temperature > 373 && pressure < 3
                              ? "Gas"
                              : "Liquid"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ),
    },
    {
      title: "Gas Laws",
      content: (
        <div className="space-y-4">
          <p>
            Gas laws describe the relationships between pressure, volume, temperature, and amount of gas. These laws are
            based on the kinetic molecular theory and apply to ideal gases.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Gas Laws:</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Boyle's Law (P ∝ 1/V):</div>
                <p className="text-sm">
                  At constant temperature, the pressure of a gas is inversely proportional to its volume.
                  <br />
                  <strong>P₁V₁ = P₂V₂</strong>
                </p>
              </div>

              <div>
                <div className="font-medium">Charles's Law (V ∝ T):</div>
                <p className="text-sm">
                  At constant pressure, the volume of a gas is directly proportional to its absolute temperature.
                  <br />
                  <strong>V₁/T₁ = V₂/T₂</strong>
                </p>
              </div>

              <div>
                <div className="font-medium">Gay-Lussac's Law (P ∝ T):</div>
                <p className="text-sm">
                  At constant volume, the pressure of a gas is directly proportional to its absolute temperature.
                  <br />
                  <strong>P₁/T₁ = P₂/T₂</strong>
                </p>
              </div>

              <div>
                <div className="font-medium">Avogadro's Law (V ∝ n):</div>
                <p className="text-sm">
                  At constant temperature and pressure, the volume of a gas is directly proportional to the number of
                  moles.
                  <br />
                  <strong>V₁/n₁ = V₂/n₂</strong>
                </p>
              </div>

              <div>
                <div className="font-medium">Ideal Gas Law:</div>
                <p className="text-sm">
                  Combines all the above laws into a single equation.
                  <br />
                  <strong>PV = nRT</strong>
                  <br />
                  where R is the gas constant (0.082057 L·atm/(mol·K))
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-2">Interactive Gas Law Visualizations</h3>

            <Tabs defaultValue="ideal">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="ideal">Ideal Gas Law</TabsTrigger>
                <TabsTrigger value="boyle">Boyle's Law</TabsTrigger>
                <TabsTrigger value="charles">Charles' Law</TabsTrigger>
                <TabsTrigger value="avogadro">Avogadro's Law</TabsTrigger>
              </TabsList>

              <TabsContent value="ideal" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                  <h4 className="font-medium mb-2">PV = nRT</h4>
                  <p className="text-sm mb-4">
                    The ideal gas law combines all gas laws into a single equation. Adjust the sliders to see how
                    changing one variable affects the others.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Pressure (atm): {pressure.toFixed(2)}</label>
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={pressure}
                          onChange={(e) => setPressure(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Volume (L): {volume.toFixed(2)}</label>
                        <input
                          type="range"
                          min="1"
                          max="50"
                          step="1"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Temperature (K): {temperature.toFixed(0)}
                        </label>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="10"
                          value={temperature}
                          onChange={(e) => setTemperature(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Moles (mol): {moles.toFixed(2)}</label>
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={moles}
                          onChange={(e) => setMoles(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="relative h-64 border rounded-lg overflow-hidden">
                      <IdealGasSimulation pressure={pressure} volume={volume} temperature={temperature} moles={moles} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="boyle" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                  <h4 className="font-medium mb-2">Boyle's Law: P₁V₁ = P₂V₂</h4>
                  <p className="text-sm mb-4">
                    At constant temperature, the pressure of a gas is inversely proportional to its volume. As you
                    decrease the volume, watch the pressure increase.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Volume (L): {boylesVolume.toFixed(2)}</label>
                        <input
                          type="range"
                          min="1"
                          max="50"
                          step="1"
                          value={boylesVolume}
                          onChange={(e) => setBoylesVolume(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm mb-1">Pressure (atm)</div>
                        <div className="text-2xl font-bold">{calculateBoylesPressure().toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground mt-1">P = k/V (where k is constant)</div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Temperature: 300 K (constant)</p>
                        <p>Moles: 1 mol (constant)</p>
                      </div>
                    </div>

                    <div className="relative h-64 border rounded-lg overflow-hidden">
                      <BoylesLawSimulation volume={boylesVolume} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="charles" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                  <h4 className="font-medium mb-2">Charles' Law: V₁/T₁ = V₂/T₂</h4>
                  <p className="text-sm mb-4">
                    At constant pressure, the volume of a gas is directly proportional to its absolute temperature. As
                    you increase the temperature, watch the volume increase.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Temperature (K): {charlesTemp.toFixed(0)}
                        </label>
                        <input
                          type="range"
                          min="100"
                          max="1000"
                          step="10"
                          value={charlesTemp}
                          onChange={(e) => setCharlesTemp(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm mb-1">Volume (L)</div>
                        <div className="text-2xl font-bold">{calculateCharlesVolume().toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground mt-1">V = kT (where k is constant)</div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Pressure: 1 atm (constant)</p>
                        <p>Moles: 1 mol (constant)</p>
                      </div>
                    </div>

                    <div className="relative h-64 border rounded-lg overflow-hidden">
                      <CharlesLawSimulation temperature={charlesTemp} />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="avogadro" className="space-y-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg border p-4">
                  <h4 className="font-medium mb-2">Avogadro's Law: V₁/n₁ = V₂/n₂</h4>
                  <p className="text-sm mb-4">
                    At constant temperature and pressure, the volume of a gas is directly proportional to the number of
                    moles. As you increase the number of moles, watch the volume increase.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Moles (mol): {avogadroMoles.toFixed(2)}
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="5"
                          step="0.1"
                          value={avogadroMoles}
                          onChange={(e) => setAvogadroMoles(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>

                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-sm mb-1">Volume (L)</div>
                        <div className="text-2xl font-bold">{calculateAvogadroVolume().toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground mt-1">V = kn (where k is constant)</div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Temperature: 300 K (constant)</p>
                        <p>Pressure: 1 atm (constant)</p>
                      </div>
                    </div>

                    <div className="relative h-64 border rounded-lg overflow-hidden">
                      <AvogadroLawSimulation moles={avogadroMoles} />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      ),
    },
    {
      title: "Kinetic Molecular Theory",
      content: (
        <div className="space-y-4">
          <p>
            The Kinetic Molecular Theory (KMT) explains the behavior of gases at the molecular level. It provides a
            microscopic explanation for the macroscopic properties of gases.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Assumptions of KMT:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Gases consist of particles (atoms or molecules) in constant, random motion.</li>
              <li>The volume of the particles is negligible compared to the volume of the container.</li>
              <li>There are no attractive or repulsive forces between gas particles.</li>
              <li>Collisions between particles and with the container walls are perfectly elastic.</li>
              <li>The average kinetic energy of gas particles is directly proportional to the absolute temperature.</li>
            </ol>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <KineticMolecularTheoryAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Explaining Gas Properties</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Pressure:</strong> Results from collisions of gas particles with container walls
                </li>
                <li>
                  <strong>Temperature:</strong> Measure of average kinetic energy of gas particles
                </li>
                <li>
                  <strong>Diffusion:</strong> Movement of gas from high to low concentration due to random motion
                </li>
                <li>
                  <strong>Effusion:</strong> Escape of gas through a tiny hole, rate inversely proportional to square
                  root of molar mass
                </li>
              </ul>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Real vs. Ideal Gases</h3>
              <p className="mb-2">Real gases deviate from ideal behavior due to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Non-zero volume of gas particles</li>
                <li>Attractive forces between particles</li>
                <li>Inelastic collisions</li>
              </ul>
              <p className="mt-2 text-sm">Deviations are most significant at high pressures and low temperatures.</p>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Molecular Speed Distribution</h3>
            <p className="mb-4">
              Gas molecules move at different speeds, following the Maxwell-Boltzmann distribution.
            </p>
            <div className="h-40 relative">
              <MaxwellBoltzmannDistribution />
            </div>
            <div className="mt-4 text-sm">
              <p>Key speeds in the distribution:</p>
              <ul className="list-disc pl-5 mt-1">
                <li>
                  <strong>Most probable speed:</strong> The speed at the peak of the distribution
                </li>
                <li>
                  <strong>Average speed:</strong> The arithmetic mean of all molecular speeds
                </li>
                <li>
                  <strong>Root-mean-square speed:</strong> √(3RT/M), where M is molar mass
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Practice",
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Practice Quiz: States of Matter</h2>
            <p>
              Test your understanding of states of matter and phase changes with this quiz. Select the best answer for
              each question.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                id: 1,
                question: "Which state of matter has the highest kinetic energy?",
                options: ["Solid", "Liquid", "Gas", "Plasma"],
                correctAnswer: "Plasma",
                explanation:
                  "Plasma has the highest kinetic energy of the four states of matter. It consists of a highly ionized gas with free electrons and positive ions, requiring very high temperatures to maintain.",
              },
              {
                id: 2,
                question: "What phase change occurs when a substance changes directly from a solid to a gas?",
                options: ["Melting", "Freezing", "Sublimation", "Condensation"],
                correctAnswer: "Sublimation",
                explanation:
                  "Sublimation is the phase change where a substance transitions directly from the solid phase to the gas phase without passing through the liquid phase. Examples include dry ice (solid CO₂) and iodine crystals.",
              },
              {
                id: 3,
                question:
                  "According to Charles's Law, what happens to the volume of a gas when its temperature increases at constant pressure?",
                options: ["Volume decreases", "Volume increases", "Volume remains constant", "Volume becomes zero"],
                correctAnswer: "Volume increases",
                explanation:
                  "Charles's Law states that at constant pressure, the volume of a gas is directly proportional to its absolute temperature. Therefore, when temperature increases, the volume also increases.",
              },
              {
                id: 4,
                question: "At the triple point of a substance:",
                options: [
                  "Only one phase can exist",
                  "Two phases can coexist",
                  "Three phases can coexist",
                  "No phase can exist",
                ],
                correctAnswer: "Three phases can coexist",
                explanation:
                  "The triple point is the unique combination of temperature and pressure at which the solid, liquid, and gas phases of a substance can coexist in thermodynamic equilibrium.",
              },
              {
                id: 5,
                question: "Which of the following is NOT a postulate of the Kinetic Molecular Theory?",
                options: [
                  "Gas particles are in constant, random motion",
                  "Collisions between gas particles are perfectly elastic",
                  "Gas particles have strong attractive forces between them",
                  "The volume of gas particles is negligible compared to the container",
                ],
                correctAnswer: "Gas particles have strong attractive forces between them",
                explanation:
                  "The Kinetic Molecular Theory assumes that there are negligible attractive forces between gas particles, not strong ones. This is why gases can expand to fill their containers and have relatively low densities.",
              },
            ].map((question) => (
              <Card
                key={question.id}
                className={cn(
                  "transition-all",
                  quizSubmitted && quizAnswers[question.id] === question.correctAnswer && "border-green-500",
                  quizSubmitted && quizAnswers[question.id] !== question.correctAnswer && "border-red-500",
                )}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-start gap-2">
                    <span>{question.id}.</span>
                    <span>{question.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    {question.options.map((option) => (
                      <Button
                        key={option}
                        variant={quizAnswers[question.id] === option ? "default" : "outline"}
                        className={cn(
                          "justify-start h-auto py-3 px-4",
                          quizSubmitted &&
                            option === question.correctAnswer &&
                            "bg-green-500 hover:bg-green-500 text-white",
                          quizSubmitted &&
                            quizAnswers[question.id] === option &&
                            option !== question.correctAnswer &&
                            "bg-red-500 hover:bg-red-500 text-white",
                        )}
                        onClick={() => !quizSubmitted && handleQuizAnswer(question.id, option)}
                        disabled={quizSubmitted}
                      >
                        <div className="flex items-center gap-2">
                          {quizSubmitted && option === question.correctAnswer && <Check className="h-4 w-4 shrink-0" />}
                          {quizSubmitted &&
                            quizAnswers[question.id] === option &&
                            option !== question.correctAnswer && <X className="h-4 w-4 shrink-0" />}
                          <span>{option}</span>
                        </div>
                      </Button>
                    ))}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleExplanation(question.id)}
                        className="gap-1"
                      >
                        <HelpCircle className="h-4 w-4" />
                        {showExplanation[question.id] ? "Hide Explanation" : "Show Explanation"}
                      </Button>

                      {showExplanation[question.id] && (
                        <div className="mt-2 p-3 bg-muted rounded-lg text-sm">
                          <p>{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {!quizSubmitted ? (
            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(quizAnswers).length < 5}
            >
              Submit Answers
            </Button>
          ) : (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quiz Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-4xl font-bold mb-2">{calculateScore()} / 5</p>
                    <p className="text-muted-foreground">
                      {calculateScore() === 5
                        ? "Perfect score! Excellent work!"
                        : calculateScore() >= 3
                          ? "Good job! Review the questions you missed."
                          : "Keep studying and try again!"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full" variant="outline" size="lg" onClick={resetQuiz}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          )}
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
      <style jsx>{`
  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-10px) translateX(5px); }
    50% { transform: translateY(0) translateX(10px); }
    75% { transform: translateY(10px) translateX(5px); }
  }
  
  @keyframes bounce {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(10px, 10px); }
    50% { transform: translate(-10px, 10px); }
    75% { transform: translate(10px, -10px); }
  }
`}</style>
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Droplet className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">States of Matter</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {activeSection + 1} of {sections.length}
          </div>
        </div>
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}
          ></div>
        </div>

        <div className="mt-4 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {sections.map((section, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  activeSection === index ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setActiveSection(index)}
                disabled={index > activeSection + 1}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
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

function StatesOfMatterAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-4 text-blue-600 dark:text-blue-400">Solid</div>
          <div className="relative w-32 h-32 border border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`solid-${i}`}
                className="absolute w-4 h-4 rounded-full bg-blue-500"
                style={{
                  left: `${(i % 4) * 25 + 12.5}%`,
                  top: `${Math.floor(i / 4) * 25 + 12.5}%`,
                }}
                animate={{
                  x: [0, Math.random() * 2 - 1, 0],
                  y: [0, Math.random() * 2 - 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">Particles vibrate in fixed positions</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-4 text-teal-600 dark:text-teal-400">Liquid</div>
          <div className="relative w-32 h-32 border border-teal-400 rounded-lg bg-teal-100/50 dark:bg-teal-900/30 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`liquid-${i}`}
                className="absolute w-4 h-4 rounded-full bg-teal-500"
                style={{
                  left: `${8 + Math.random() * 84}%`,
                  top: `${8 + Math.random() * 84}%`,
                }}
                animate={{
                  x: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
                  y: [0, Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  times: [0, 0.3, 0.7, 1],
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">Particles flow and slide past each other</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-4 text-purple-600 dark:text-purple-400">Gas</div>
          <div className="relative w-32 h-32 border border-purple-400 rounded-lg bg-purple-100/50 dark:bg-purple-900/30 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`gas-${i}`}
                className="absolute w-3 h-3 rounded-full bg-purple-500"
                initial={{
                  x: Math.random() * 26,
                  y: Math.random() * 26,
                }}
                animate={{
                  x: [Math.random() * 26, Math.random() * 26, Math.random() * 26, Math.random() * 26],
                  y: [Math.random() * 26, Math.random() * 26, Math.random() * 26, Math.random() * 26],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  times: [0, 0.33, 0.66, 1],
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">Particles move freely and rapidly</div>
        </div>
      </div>
    </div>
  )
}

function PhaseDiagram() {
  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 400 300" className="overflow-visible">
        {/* Axes */}
        <line x1="50" y1="250" x2="350" y2="250" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />

        {/* Axis labels */}
        <text x="200" y="280" textAnchor="middle" className="text-xs">
          Temperature
        </text>
        <text x="20" y="150" textAnchor="middle" transform="rotate(-90, 20, 150)" className="text-xs">
          Pressure
        </text>

        {/* Phase regions */}
        <path d="M50,250 L150,150 L250,50 L350,50" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <path d="M50,250 L150,150 L150,250" fill="none" stroke="#10b981" strokeWidth="2" />

        {/* Region labels */}
        <text x="100" y="200" textAnchor="middle" className="text-xs font-medium">
          Solid
        </text>
        <text x="200" y="200" textAnchor="middle" className="text-xs font-medium">
          Liquid
        </text>
        <text x="300" y="150" textAnchor="middle" className="text-xs font-medium">
          Gas
        </text>

        {/* Points */}
        <circle cx="150" cy="150" r="5" fill="#d946ef" />
        <text x="160" y="140" className="text-xs">
          Triple Point
        </text>

        <circle cx="250" cy="50" r="5" fill="#f97316" />
        <text x="260" y="40" className="text-xs">
          Critical Point
        </text>
      </svg>
    </div>
  )
}

function HeatingCurve() {
  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 400 300" className="overflow-visible">
        {/* Axes */}
        <line x1="50" y1="250" x2="350" y2="250" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />

        {/* Axis labels */}
        <text x="200" y="280" textAnchor="middle" className="text-xs">
          Heat Added
        </text>
        <text x="20" y="150" textAnchor="middle" transform="rotate(-90, 20, 150)" className="text-xs">
          Temperature
        </text>

        {/* Heating curve */}
        <path d="M50,200 L100,200 L100,150 L200,150 L200,100 L300,100" fill="none" stroke="#f97316" strokeWidth="3" />

        {/* Phase labels */}
        <text x="75" y="220" textAnchor="middle" className="text-xs font-medium">
          Solid
        </text>
        <text x="150" y="170" textAnchor="middle" className="text-xs font-medium">
          Melting
        </text>
        <text x="200" y="170" textAnchor="middle" className="text-xs font-medium">
          Liquid
        </text>
        <text x="250" y="120" textAnchor="middle" className="text-xs font-medium">
          Boiling
        </text>
        <text x="325" y="120" textAnchor="middle" className="text-xs font-medium">
          Gas
        </text>

        {/* Temperature markers */}
        <line x1="45" y1="200" x2="55" y2="200" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="200" textAnchor="end" className="text-xs">
          T₁
        </text>

        <line x1="45" y1="150" x2="55" y2="150" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="150" textAnchor="end" className="text-xs">
          T₂
        </text>

        <line x1="45" y1="100" x2="55" y2="100" stroke="currentColor" strokeWidth="2" />
        <text x="40" y="100" textAnchor="end" className="text-xs">
          T₃
        </text>
      </svg>
    </div>
  )
}

function KineticMolecularTheoryAnimation() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-lg">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-4 h-4 rounded-full bg-indigo-500"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
            }}
            animate={{
              x: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
              y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium">
        Gas particles in constant, random motion
      </div>
    </div>
  )
}

function MaxwellBoltzmannDistribution() {
  return (
    <div className="w-full h-full">
      <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
        {/* Axes */}
        <line x1="50" y1="150" x2="350" y2="150" stroke="currentColor" strokeWidth="2" />
        <line x1="50" y1="150" x2="50" y2="50" stroke="currentColor" strokeWidth="2" />

        {/* Axis labels */}
        <text x="200" y="180" textAnchor="middle" className="text-xs">
          Molecular Speed
        </text>
        <text x="20" y="100" textAnchor="middle" transform="rotate(-90, 20, 100)" className="text-xs">
          Number of Molecules
        </text>

        {/* Distribution curves for different temperatures */}
        <path d="M50,150 C100,50 150,30 200,50 C250,70 300,120 350,150" fill="none" stroke="#ef4444" strokeWidth="2" />
        <path d="M50,150 C80,80 120,50 180,60 C240,80 300,130 350,150" fill="none" stroke="#3b82f6" strokeWidth="2" />

        {/* Temperature labels */}
        <text x="320" y="100" className="text-xs font-medium fill-red-500">
          Higher T
        </text>
        <text x="320" y="120" className="text-xs font-medium fill-blue-500">
          Lower T
        </text>

        {/* Speed markers */}
        <line x1="180" y1="145" x2="180" y2="155" stroke="#3b82f6" strokeWidth="2" />
        <text x="180" y="165" textAnchor="middle" className="text-xs fill-blue-500">
          v₁
        </text>

        <line x1="200" y1="145" x2="200" y2="155" stroke="#ef4444" strokeWidth="2" />
        <text x="200" y="165" textAnchor="middle" className="text-xs fill-red-500">
          v₂
        </text>
      </svg>
    </div>
  )
}

function IdealGasSimulation({ pressure, volume, temperature, moles }) {
  // Calculate number of particles to show based on moles
  const particleCount = Math.round(moles * 10)

  // Calculate particle speed based on temperature
  const particleSpeed = Math.sqrt(temperature) / 10

  // Calculate container size based on volume
  const containerSize = Math.sqrt(volume) * 5

  // Calculate particle size based on pressure (inverse relationship)
  const particleSize = 4 + 1 / pressure

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 relative">
      <div
        className="absolute border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg"
        style={{
          width: `${containerSize}%`,
          height: `${containerSize}%`,
          top: `${(100 - containerSize) / 2}%`,
          left: `${(100 - containerSize) / 2}%`,
        }}
      >
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`gas-particle-${i}`}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: `${particleSize}px`,
              height: `${particleSize}px`,
            }}
            initial={{
              x: Math.random() * containerSize,
              y: Math.random() * containerSize,
            }}
            animate={{
              x: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
              y: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
            }}
            transition={{
              duration: 4 / particleSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
        <div>P: {pressure.toFixed(2)} atm</div>
        <div>V: {volume.toFixed(2)} L</div>
        <div>n: {moles.toFixed(2)} mol</div>
        <div>T: {temperature.toFixed(0)} K</div>
      </div>
    </div>
  )
}

function BoylesLawSimulation({ volume }) {
  // Calculate pressure based on Boyle's Law
  const pressure = (1 * 22.4) / volume

  // Calculate container size based on volume
  const containerSize = Math.sqrt(volume) * 5

  // Calculate particle count (constant)
  const particleCount = 10

  // Calculate particle speed (constant temperature)
  const particleSpeed = 1.7

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 relative">
      <div
        className="absolute border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg"
        style={{
          width: `${containerSize}%`,
          height: `${containerSize}%`,
          top: `${(100 - containerSize) / 2}%`,
          left: `${(100 - containerSize) / 2}%`,
        }}
      >
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`boyle-particle-${i}`}
            className="absolute w-4 h-4 rounded-full bg-green-500"
            initial={{
              x: Math.random() * containerSize,
              y: Math.random() * containerSize,
            }}
            animate={{
              x: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
              y: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
            }}
            transition={{
              duration: 4 / particleSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
        <div>P: {pressure.toFixed(2)} atm</div>
        <div>V: {volume.toFixed(2)} L</div>
        <div>T: 300 K (constant)</div>
        <div>n: 1 mol (constant)</div>
      </div>

      <div className="absolute top-2 right-2 text-sm font-medium">As volume ↓, pressure ↑</div>
    </div>
  )
}

function CharlesLawSimulation({ temperature }) {
  // Calculate volume based on Charles' Law
  const volume = (22.4 * temperature) / 273

  // Calculate container size based on volume
  const containerSize = Math.sqrt(volume) * 5

  // Calculate particle count (constant)
  const particleCount = 10

  // Calculate particle speed based on temperature
  const particleSpeed = Math.sqrt(temperature) / 10

  return (
    <div className="w-full h-full bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 relative">
      <div
        className="absolute border-2 border-dashed border-red-300 dark:border-red-700 rounded-lg"
        style={{
          width: `${containerSize}%`,
          height: `${containerSize}%`,
          top: `${(100 - containerSize) / 2}%`,
          left: `${(100 - containerSize) / 2}%`,
        }}
      >
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`charles-particle-${i}`}
            className="absolute w-4 h-4 rounded-full bg-red-500"
            initial={{
              x: Math.random() * containerSize,
              y: Math.random() * containerSize,
            }}
            animate={{
              x: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
              y: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
            }}
            transition={{
              duration: 4 / particleSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
        <div>V: {volume.toFixed(2)} L</div>
        <div>T: {temperature.toFixed(0)} K</div>
        <div>P: 1 atm (constant)</div>
        <div>n: 1 mol (constant)</div>
      </div>

      <div className="absolute top-2 right-2 text-sm font-medium">As temperature ↑, volume ↑</div>
    </div>
  )
}

function AvogadroLawSimulation({ moles }) {
  // Calculate volume based on Avogadro's Law
  const volume = 22.4 * moles

  // Calculate container size based on volume
  const containerSize = Math.sqrt(volume) * 5

  // Calculate particle count based on moles
  const particleCount = Math.round(moles * 10)

  // Calculate particle speed (constant temperature)
  const particleSpeed = 1.7

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 relative">
      <div
        className="absolute border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-lg"
        style={{
          width: `${containerSize}%`,
          height: `${containerSize}%`,
          top: `${(100 - containerSize) / 2}%`,
          left: `${(100 - containerSize) / 2}%`,
        }}
      >
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`avogadro-particle-${i}`}
            className="absolute w-4 h-4 rounded-full bg-purple-500"
            initial={{
              x: Math.random() * containerSize,
              y: Math.random() * containerSize,
            }}
            animate={{
              x: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
              y: [
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
                Math.random() * containerSize,
              ],
            }}
            transition={{
              duration: 4 / particleSpeed,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              times: [0, 0.33, 0.66, 1],
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">
        <div>V: {volume.toFixed(2)} L</div>
        <div>n: {moles.toFixed(2)} mol</div>
        <div>P: 1 atm (constant)</div>
        <div>T: 300 K (constant)</div>
      </div>

      <div className="absolute top-2 right-2 text-sm font-medium">As moles ↑, volume ↑</div>
    </div>
  )
}

