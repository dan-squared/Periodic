"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Beaker, Flame } from "lucide-react"

export default function ChemicalReactionsLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [reactionType, setReactionType] = useState<"synthesis" | "decomposition" | "single" | "double">("synthesis")

  const sections = [
    {
      title: "Types of Chemical Reactions",
      content: (
        <div className="space-y-4">
          <p>
            Chemical reactions involve the transformation of reactants into products through the breaking and forming of
            chemical bonds. There are several main types of chemical reactions that help us classify and understand
            these transformations.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Main Types of Chemical Reactions:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Synthesis (Combination):</strong> A + B → AB
              </li>
              <li>
                <strong>Decomposition:</strong> AB → A + B
              </li>
              <li>
                <strong>Single Replacement:</strong> A + BC → AC + B
              </li>
              <li>
                <strong>Double Replacement:</strong> AB + CD → AD + CB
              </li>
              <li>
                <strong>Combustion:</strong> Fuel + O₂ → CO₂ + H₂O + Energy
              </li>
              <li>
                <strong>Acid-Base (Neutralization):</strong> Acid + Base → Salt + Water
              </li>
              <li>
                <strong>Redox (Oxidation-Reduction):</strong> Involves electron transfer
              </li>
            </ul>
          </div>

          <div className="relative border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Interactive Reaction Types</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={reactionType === "synthesis" ? "default" : "outline"}
                onClick={() => setReactionType("synthesis")}
                className="text-sm"
              >
                Synthesis
              </Button>
              <Button
                variant={reactionType === "decomposition" ? "default" : "outline"}
                onClick={() => setReactionType("decomposition")}
                className="text-sm"
              >
                Decomposition
              </Button>
              <Button
                variant={reactionType === "single" ? "default" : "outline"}
                onClick={() => setReactionType("single")}
                className="text-sm"
              >
                Single Replacement
              </Button>
              <Button
                variant={reactionType === "double" ? "default" : "outline"}
                onClick={() => setReactionType("double")}
                className="text-sm"
              >
                Double Replacement
              </Button>
            </div>

            <div className="h-60 relative border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              {reactionType === "synthesis" && <SynthesisAnimation />}
              {reactionType === "decomposition" && <DecompositionAnimation />}
              {reactionType === "single" && <SingleReplacementAnimation />}
              {reactionType === "double" && <DoubleReplacementAnimation />}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Flame className="mr-2 text-amber-500" size={20} />
                Combustion Reactions
              </h3>
              <p className="mb-2">
                Combustion reactions occur when a substance reacts with oxygen, releasing energy in the form of heat and
                light.
              </p>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Example:</div>
                <div className="text-center my-2">CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Energy</div>
                <div className="text-sm">Methane combustion (natural gas burning)</div>
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <Beaker className="mr-2 text-blue-500" size={20} />
                Acid-Base Reactions
              </h3>
              <p className="mb-2">
                Acid-base reactions (neutralization) occur when an acid reacts with a base to form a salt and water.
              </p>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Example:</div>
                <div className="text-center my-2">HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)</div>
                <div className="text-sm">Hydrochloric acid + Sodium hydroxide</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Balancing Chemical Equations",
      content: (
        <div className="space-y-4">
          <p>
            Balancing chemical equations is essential to satisfy the law of conservation of mass. A balanced equation
            has the same number of atoms of each element on both sides of the equation.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Steps to Balance an Equation:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Write the unbalanced equation with correct formulas</li>
              <li>Count the atoms of each element on both sides</li>
              <li>Add coefficients to make the number of atoms equal</li>
              <li>Start with the most complex molecule or the element that appears in the fewest compounds</li>
              <li>Check that all atoms are balanced</li>
              <li>Reduce to lowest whole-number ratio if needed</li>
            </ol>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Example: Balancing a Combustion Reaction</h3>
            <div className="space-y-3">
              <div>
                <div className="font-medium">Step 1: Write the unbalanced equation</div>
                <div className="text-center my-2">C₃H₈ + O₂ → CO₂ + H₂O</div>
              </div>

              <div>
                <div className="font-medium">Step 2: Count atoms on each side</div>
                <div className="grid grid-cols-2 gap-4 my-2">
                  <div>
                    <div className="font-medium">Reactants:</div>
                    <ul className="list-disc pl-5">
                      <li>C: 3 atoms</li>
                      <li>H: 8 atoms</li>
                      <li>O: 2 atoms</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">Products:</div>
                    <ul className="list-disc pl-5">
                      <li>C: 1 atom</li>
                      <li>H: 2 atoms</li>
                      <li>O: 3 atoms</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="font-medium">Step 3: Balance carbon atoms</div>
                <div className="text-center my-2">C₃H₈ + O₂ → 3CO₂ + H₂O</div>
              </div>

              <div>
                <div className="font-medium">Step 4: Balance hydrogen atoms</div>
                <div className="text-center my-2">C₃H₈ + O₂ → 3CO₂ + 4H₂O</div>
              </div>

              <div>
                <div className="font-medium">Step 5: Balance oxygen atoms</div>
                <div className="text-center my-2">C₃H₈ + 5O₂ → 3CO₂ + 4H₂O</div>
              </div>

              <div>
                <div className="font-medium">Step 6: Final check</div>
                <div className="grid grid-cols-2 gap-4 my-2">
                  <div>
                    <div className="font-medium">Reactants:</div>
                    <ul className="list-disc pl-5">
                      <li>C: 3 atoms ✓</li>
                      <li>H: 8 atoms ✓</li>
                      <li>O: 10 atoms ✓</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium">Products:</div>
                    <ul className="list-disc pl-5">
                      <li>C: 3 atoms ✓</li>
                      <li>H: 8 atoms ✓</li>
                      <li>O: 10 atoms ✓</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-green-200 dark:bg-green-800 rounded-lg text-green-800 dark:text-green-200 text-center mt-4">
              Balanced equation: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O
            </div>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <BalancingAnimation />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Reaction Rates",
      content: (
        <div className="space-y-4">
          <p>
            Reaction rate refers to the speed at which reactants are converted into products. Understanding and
            controlling reaction rates is crucial in chemical processes and industrial applications.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Factors Affecting Reaction Rates:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Concentration:</strong> Higher concentration of reactants generally increases reaction rate
              </li>
              <li>
                <strong>Temperature:</strong> Higher temperature increases reaction rate
              </li>
              <li>
                <strong>Surface Area:</strong> Greater surface area of solid reactants increases reaction rate
              </li>
              <li>
                <strong>Catalysts:</strong> Catalysts increase reaction rate without being consumed
              </li>
              <li>
                <strong>Nature of Reactants:</strong> Some substances naturally react faster than others
              </li>
              <li>
                <strong>Pressure:</strong> For gas reactions, higher pressure can increase reaction rate
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <ReactionRateAnimation />
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Collision Theory</h3>
            <p className="mb-3">
              Collision theory explains how chemical reactions occur and why reaction rates vary. According to this
              theory:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Reactant particles must collide with each other for a reaction to occur</li>
              <li>Collisions must have sufficient energy (activation energy) to break bonds</li>
              <li>Collisions must have proper orientation for bonds to form</li>
            </ul>
            <div className="mt-3 text-sm">
              <strong>Reaction Rate Equation:</strong> Rate = k[A]ᵐ[B]ⁿ
              <br />
              where k is the rate constant, [A] and [B] are concentrations, and m and n are reaction orders.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Activation Energy</h3>
              <p className="mb-2">
                Activation energy (Eₐ) is the minimum energy required for a reaction to occur. Catalysts work by
                lowering the activation energy.
              </p>
              <div className="text-center">
                <svg width="100%" height="120" viewBox="0 0 200 120">
                  {/* Energy diagram */}
                  <path
                    d="M20,100 L50,100 Q70,40 100,40 Q130,40 150,100 L180,100"
                    stroke="#000"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M20,100 L50,100 Q70,70 100,70 Q130,70 150,100 L180,100"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                  />

                  {/* Labels */}
                  <text x="30" y="110" className="text-xs">
                    Reactants
                  </text>
                  <text x="160" y="110" className="text-xs">
                    Products
                  </text>
                  <text x="100" y="30" textAnchor="middle" className="text-xs">
                    Eₐ (without catalyst)
                  </text>
                  <text x="100" y="60" textAnchor="middle" className="text-xs fill-green-600">
                    Eₐ (with catalyst)
                  </text>
                </svg>
              </div>
            </div>

            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Reaction Mechanisms</h3>
              <p className="mb-2">
                Many reactions occur in a series of steps called elementary reactions. The complete sequence is the
                reaction mechanism.
              </p>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Example: Ozone Depletion</div>
                <div className="text-sm mt-2">
                  <div>Step 1: Cl + O₃ → ClO + O₂</div>
                  <div>Step 2: ClO + O → Cl + O₂</div>
                  <div className="mt-1 font-medium">Overall: O₃ + O → 2O₂</div>
                </div>
                <div className="text-xs mt-1">Note: Cl acts as a catalyst</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Redox Reactions",
      content: (
        <div className="space-y-4">
          <p>
            Redox (reduction-oxidation) reactions involve the transfer of electrons between species. They are
            fundamental in many biological and industrial processes, including batteries, corrosion, and metabolism.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Oxidation:</strong> Loss of electrons (increase in oxidation number)
              </li>
              <li>
                <strong>Reduction:</strong> Gain of electrons (decrease in oxidation number)
              </li>
              <li>
                <strong>Oxidizing Agent:</strong> Species that causes oxidation (gets reduced)
              </li>
              <li>
                <strong>Reducing Agent:</strong> Species that causes reduction (gets oxidized)
              </li>
              <li>
                <strong>Oxidation Number:</strong> Charge an atom would have if all bonds were ionic
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <RedoxAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Identifying Redox Reactions</h3>
              <p className="mb-2">
                To identify a redox reaction, track the oxidation numbers of atoms before and after the reaction.
              </p>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Example: Fe + CuSO₄ → FeSO₄ + Cu</div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <div className="font-medium">Before:</div>
                    <div className="text-sm">Fe: 0</div>
                    <div className="text-sm">Cu: +2</div>
                  </div>
                  <div>
                    <div className="font-medium">After:</div>
                    <div className="text-sm">Fe: +2 (oxidized)</div>
                    <div className="text-sm">Cu: 0 (reduced)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Half-Reactions</h3>
              <p className="mb-2">Redox reactions can be split into two half-reactions: oxidation and reduction.</p>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Example: Zn + Cu²⁺ → Zn²⁺ + Cu</div>
                <div className="mt-2">
                  <div className="text-sm">Oxidation: Zn → Zn²⁺ + 2e⁻</div>
                  <div className="text-sm">Reduction: Cu²⁺ + 2e⁻ → Cu</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Applications of Redox Reactions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-2 border rounded-lg text-center">
                <div className="font-medium">Batteries</div>
                <div className="text-sm">Convert chemical energy to electrical energy</div>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <div className="font-medium">Corrosion</div>
                <div className="text-sm">Oxidation of metals in the environment</div>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <div className="font-medium">Combustion</div>
                <div className="text-sm">Rapid oxidation with release of energy</div>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <div className="font-medium">Photosynthesis</div>
                <div className="text-sm">Reduction of CO₂ to form glucose</div>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <div className="font-medium">Respiration</div>
                <div className="text-sm">Oxidation of glucose to release energy</div>
              </div>
              <div className="p-2 border rounded-lg text-center">
                <div className="font-medium">Electroplating</div>
                <div className="text-sm">Coating objects with metal layers</div>
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
function SynthesisAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Synthesis Reaction</div>
        <div className="text-sm text-muted-foreground">A + B → AB</div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <motion.div
          className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold"
          animate={{
            x: [0, 40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          A
        </motion.div>

        <motion.div
          className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold"
          animate={{
            x: [0, -40, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          B
        </motion.div>
      </div>

      <motion.div
        className="absolute w-20 h-20 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold opacity-0"
        animate={{
          opacity: [0, 0, 1, 1, 0],
          scale: [0.5, 0.5, 1, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          times: [0, 0.4, 0.5, 0.9, 1],
        }}
      >
        AB
      </motion.div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Example: 2Na + Cl₂ → 2NaCl</div>
        <div className="text-muted-foreground">Sodium metal + Chlorine gas → Sodium chloride</div>
      </div>
    </div>
  )
}

function DecompositionAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Decomposition Reaction</div>
        <div className="text-sm text-muted-foreground">AB → A + B</div>
      </div>

      <motion.div
        className="w-20 h-20 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold"
        animate={{
          opacity: [1, 1, 0, 0, 1],
          scale: [1, 1, 0.5, 0.5, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          times: [0, 0.4, 0.5, 0.9, 1],
        }}
      >
        AB
      </motion.div>

      <div className="flex items-center justify-center gap-8">
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold opacity-0"
          animate={{
            x: [0, -40, -40],
            opacity: [0, 0, 1],
            scale: [0.8, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          A
        </motion.div>

        <motion.div
          className="absolute w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold opacity-0"
          animate={{
            x: [0, 40, 40],
            opacity: [0, 0, 1],
            scale: [0.8, 0.8, 1],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          B
        </motion.div>
      </div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Example: 2H₂O → 2H₂ + O₂</div>
        <div className="text-muted-foreground">Water → Hydrogen gas + Oxygen gas</div>
      </div>
    </div>
  )
}

function SingleReplacementAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Single Replacement Reaction</div>
        <div className="text-sm text-muted-foreground">A + BC → AC + B</div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <motion.div
          className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold"
          animate={{
            x: [0, 60, 60, 0],
            y: [0, 0, 0, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            times: [0, 0.25, 0.75, 1],
          }}
        >
          A
        </motion.div>

        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              x: [0, 0, -60, -60],
              y: [0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            B
          </motion.div>

          <motion.div
            className="absolute top-0 left-0 w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              x: [0, 0, 0, 60],
              y: [0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            C
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Example: Zn + CuSO₄ → ZnSO₄ + Cu</div>
        <div className="text-muted-foreground">Zinc metal replaces copper in copper sulfate</div>
      </div>
    </div>
  )
}

function DoubleReplacementAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Double Replacement Reaction</div>
        <div className="text-sm text-muted-foreground">AB + CD → AD + CB</div>
      </div>

      <div className="flex items-center justify-center gap-12">
        <div className="relative">
          <motion.div
            className="w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              x: [0, 0, 80, 80],
              y: [0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            A
          </motion.div>

          <motion.div
            className="absolute top-0 left-0 w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              x: [0, 0, 0, -80],
              y: [0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            B
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="w-14 h-14 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              x: [0, 0, -80, -80],
              y: [0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            C
          </motion.div>

          <motion.div
            className="absolute top-0 left-0 w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              x: [0, 0, 0, 80],
              y: [0, 0, 0, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              times: [0, 0.25, 0.75, 1],
            }}
          >
            D
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Example: AgNO₃ + NaCl → AgCl + NaNO₃</div>
        <div className="text-muted-foreground">Silver nitrate + Sodium chloride → Silver chloride + Sodium nitrate</div>
      </div>
    </div>
  )
}

function BalancingAnimation() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Balancing Chemical Equations</div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center min-w-[280px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-lg">Fe + O₂ → Fe₂O₃</div>
          <div className="text-sm text-red-500">Unbalanced</div>
        </motion.div>

        <motion.div
          className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center min-w-[280px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="text-lg">2Fe + O₂ → Fe₂O₃</div>
          <div className="text-sm text-orange-500">Partially balanced</div>
        </motion.div>

        <motion.div
          className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center min-w-[280px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <div className="text-lg">4Fe + 3O₂ → 2Fe₂O₃</div>
          <div className="text-sm text-green-500">Balanced</div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 text-center text-sm p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 3 }}
      >
        <div className="font-medium">Check: Both sides have 4 Fe atoms and 6 O atoms</div>
      </motion.div>
    </div>
  )
}

function ReactionRateAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Low Temperature</div>
          <div className="relative w-32 h-32 border border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`cold-${i}`}
                className="absolute w-4 h-4 rounded-full bg-blue-500"
                initial={{
                  x: Math.random() * 100,
                  y: Math.random() * 100,
                }}
                animate={{
                  x: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                  y: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">
            Slow particle movement
            <br />
            Fewer effective collisions
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">High Temperature</div>
          <div className="relative w-32 h-32 border border-red-400 rounded-lg bg-red-100/50 dark:bg-red-900/30">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`hot-${i}`}
                className="absolute w-4 h-4 rounded-full bg-red-500"
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
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">
            Fast particle movement
            <br />
            More effective collisions
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm font-medium">
        Higher temperature increases reaction rate
      </div>
    </div>
  )
}

function RedoxAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Redox Reaction</div>
        <div className="text-sm text-muted-foreground">Electron Transfer</div>
      </div>

      <div className="flex items-center justify-center gap-16">
        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            Zn
          </motion.div>
          <motion.div
            className="absolute top-0 right-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold"
            animate={{
              x: [0, 60, 60],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            e⁻
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold"
            animate={{
              x: [0, 60, 60],
              opacity: [1, 1, 0],
              delay: 0.5,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            e⁻
          </motion.div>
          <div className="absolute -bottom-8 text-center text-xs">
            <div>Oxidation</div>
            <div>Zn → Zn²⁺ + 2e⁻</div>
          </div>
        </div>

        <div className="relative">
          <motion.div
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-bold"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            Cu²⁺
          </motion.div>
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold opacity-0"
            animate={{
              x: [0, 0, -60],
              opacity: [0, 1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            e⁻
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold opacity-0"
            animate={{
              x: [0, 0, -60],
              opacity: [0, 1, 1],
              delay: 0.5,
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: 0.5,
            }}
          >
            e⁻
          </motion.div>
          <div className="absolute -bottom-8 text-center text-xs">
            <div>Reduction</div>
            <div>Cu²⁺ + 2e⁻ → Cu</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Overall: Zn + Cu²⁺ → Zn²⁺ + Cu</div>
        <div className="text-muted-foreground">
          Zinc is oxidized (loses electrons) and Copper is reduced (gains electrons)
        </div>
      </div>
    </div>
  )
}

