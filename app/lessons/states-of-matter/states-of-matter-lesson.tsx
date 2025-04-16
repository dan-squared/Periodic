"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Wind, Droplet, CuboidIcon as Cube } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StatesOfMatterLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [temperature, setTemperature] = useState(300) // K
  const [pressure, setPressure] = useState(1) // atm
  const [volume, setVolume] = useState(22.4) // L
  const [moles, setMoles] = useState(1) // mol

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

  const sections = [
    {
      title: "States of Matter",
      content: (
        <div className="space-y-4">
          <p>
            Matter exists in three common states: solid, liquid, and gas. The state of a substance depends on the
            balance between the kinetic energy of its particles and the intermolecular forces between them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Cube className="mr-2 text-blue-500" size={20} />
                Solids
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Definite shape and volume</li>
                <li>Particles are tightly packed</li>
                <li>Strong intermolecular forces</li>
                <li>Particles vibrate in fixed positions</li>
                <li>Low kinetic energy</li>
                <li>Cannot be compressed easily</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> Ice, iron, diamond, salt
              </div>
            </div>

            <div className="bg-teal-100 dark:bg-teal-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Droplet className="mr-2 text-teal-500" size={20} />
                Liquids
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Definite volume but no definite shape</li>
                <li>Particles are close but can move</li>
                <li>Moderate intermolecular forces</li>
                <li>Particles flow and slide past each other</li>
                <li>Moderate kinetic energy</li>
                <li>Slightly compressible</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> Water, oil, mercury, alcohol
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Wind className="mr-2 text-purple-500" size={20} />
                Gases
              </h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>No definite shape or volume</li>
                <li>Particles are far apart</li>
                <li>Weak intermolecular forces</li>
                <li>Particles move freely and rapidly</li>
                <li>High kinetic energy</li>
                <li>Highly compressible</li>
              </ul>
              <div className="mt-3 text-sm">
                <strong>Examples:</strong> Oxygen, nitrogen, carbon dioxide, helium
              </div>
            </div>
          </div>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Other States of Matter:</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Plasma:</div>
                <p className="text-sm">
                  A gas-like state where atoms are ionized (electrons are separated from nuclei). Found in stars,
                  lightning, and neon signs.
                </p>
              </div>

              <div>
                <div className="font-medium">Bose-Einstein Condensate:</div>
                <p className="text-sm">
                  A state formed at extremely low temperatures where atoms behave as a single quantum entity.
                </p>
              </div>
            </div>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <StatesOfMatterAnimation />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Phase Changes",
      content: (
        <div className="space-y-4">
          <p>
            Phase changes occur when matter transitions from one state to another. These changes involve energy transfer
            in the form of heat and are characterized by changes in the arrangement and energy of particles.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Types of Phase Changes:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Melting:</strong> Solid → Liquid (endothermic)
              </li>
              <li>
                <strong>Freezing:</strong> Liquid → Solid (exothermic)
              </li>
              <li>
                <strong>Vaporization:</strong> Liquid → Gas (endothermic)
              </li>
              <li>
                <strong>Condensation:</strong> Gas → Liquid (exothermic)
              </li>
              <li>
                <strong>Sublimation:</strong> Solid → Gas (endothermic)
              </li>
              <li>
                <strong>Deposition:</strong> Gas → Solid (exothermic)
              </li>
            </ul>
          </div>

          <div className="relative border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Phase Diagram</h3>
            <div className="h-60 relative">
              <PhaseDiagram />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                A phase diagram shows the conditions of temperature and pressure under which a substance exists in
                solid, liquid, and gas phases.
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>
                  <strong>Triple point:</strong> The unique combination of temperature and pressure where all three
                  phases coexist in equilibrium.
                </li>
                <li>
                  <strong>Critical point:</strong> The point above which the distinction between liquid and gas phases
                  disappears.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Heating Curve</h3>
            <p className="mb-4">
              A heating curve shows the temperature changes as heat is added to a substance, including the phase
              changes.
            </p>
            <div className="h-60 relative">
              <HeatingCurve />
            </div>
            <div className="mt-4 text-sm">
              <p>
                During phase changes, the temperature remains constant as the added heat is used to overcome
                intermolecular forces rather than increase kinetic energy.
              </p>
            </div>
          </div>
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

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Interactive Gas Law Calculator</h3>
            <Tabs defaultValue="volume">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="volume">Calculate Volume</TabsTrigger>
                <TabsTrigger value="pressure">Calculate Pressure</TabsTrigger>
              </TabsList>

              <TabsContent value="volume" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Pressure (atm)</label>
                    <Input
                      type="number"
                      value={pressure}
                      onChange={(e) => setPressure(Number.parseFloat(e.target.value) || 1)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Temperature (K)</label>
                    <Input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(Number.parseFloat(e.target.value) || 273)}
                      min="1"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Moles (mol)</label>
                    <Input
                      type="number"
                      value={moles}
                      onChange={(e) => setMoles(Number.parseFloat(e.target.value) || 1)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border text-center">
                  <div className="text-sm mb-1">Volume (L)</div>
                  <div className="text-2xl font-bold">{calculateVolume()}</div>
                  <div className="text-xs text-muted-foreground mt-1">V = nRT/P</div>
                </div>
              </TabsContent>

              <TabsContent value="pressure" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Volume (L)</label>
                    <Input
                      type="number"
                      value={volume}
                      onChange={(e) => setVolume(Number.parseFloat(e.target.value) || 22.4)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Temperature (K)</label>
                    <Input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(Number.parseFloat(e.target.value) || 273)}
                      min="1"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Moles (mol)</label>
                    <Input
                      type="number"
                      value={moles}
                      onChange={(e) => setMoles(Number.parseFloat(e.target.value) || 1)}
                      min="0.1"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border text-center">
                  <div className="text-sm mb-1">Pressure (atm)</div>
                  <div className="text-2xl font-bold">{calculatePressure()}</div>
                  <div className="text-xs text-muted-foreground mt-1">P = nRT/V</div>
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
function StatesOfMatterAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-4 text-blue-600 dark:text-blue-400">Solid</div>
          <div className="relative w-32 h-32 border border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
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
          <div className="relative w-32 h-32 border border-teal-400 rounded-lg bg-teal-100/50 dark:bg-teal-900/30">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`liquid-${i}`}
                className="absolute w-4 h-4 rounded-full bg-teal-500"
                animate={{
                  x: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                  y: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  times: [0, 0.5, 1],
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">Particles flow and slide past each other</div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-4 text-purple-600 dark:text-purple-400">Gas</div>
          <div className="relative w-32 h-32 border border-purple-400 rounded-lg bg-purple-100/50 dark:bg-purple-900/30">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={`gas-${i}`}
                className="absolute w-3 h-3 rounded-full bg-purple-500"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                }}
                animate={{
                  x: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
                  y: [Math.random() * 100, Math.random() * 100, Math.random() * 100, Math.random() * 100],
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

        <line x />
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

