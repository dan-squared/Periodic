"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Scale, Check, HelpCircle, RefreshCw, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {} from "lucide-react"

export default function StoichiometryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [moleInput, setMoleInput] = useState("")
  const [massInput, setMassInput] = useState("")
  const [selectedElement, setSelectedElement] = useState("H")
  const [balancedEquation, setBalancedEquation] = useState({
    reactant1: 2,
    reactant2: 1,
    product1: 2,
    product2: 0,
  })

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({})

  // Mole calculator
  const calculateMass = () => {
    const moles = Number.parseFloat(moleInput)
    if (isNaN(moles)) return ""

    const atomicMasses = {
      H: 1.008,
      O: 16.0,
      C: 12.01,
      N: 14.01,
      Na: 22.99,
      Cl: 35.45,
      Ca: 40.08,
      Fe: 55.85,
    }

    return (moles * atomicMasses[selectedElement as keyof typeof atomicMasses]).toFixed(2)
  }

  const calculateMoles = () => {
    const mass = Number.parseFloat(massInput)
    if (isNaN(mass)) return ""

    const atomicMasses = {
      H: 1.008,
      O: 16.0,
      C: 12.01,
      N: 14.01,
      Na: 22.99,
      Cl: 35.45,
      Ca: 40.08,
      Fe: 55.85,
    }

    return (mass / atomicMasses[selectedElement as keyof typeof atomicMasses]).toFixed(4)
  }

  // Balancing equations
  const handleIncrement = (reactant: keyof typeof balancedEquation) => {
    setBalancedEquation({
      ...balancedEquation,
      [reactant]: balancedEquation[reactant] + 1,
    })
  }

  const handleDecrement = (reactant: keyof typeof balancedEquation) => {
    if (balancedEquation[reactant] > 0) {
      setBalancedEquation({
        ...balancedEquation,
        [reactant]: balancedEquation[reactant] - 1,
      })
    }
  }

  const isEquationBalanced = () => {
    // For H2 + O2 → H2O
    const hydrogenLeft = balancedEquation.reactant1 * 2
    const oxygenLeft = balancedEquation.reactant2 * 2

    const hydrogenRight = balancedEquation.product1 * 2
    const oxygenRight = balancedEquation.product1

    return hydrogenLeft === hydrogenRight && oxygenLeft === oxygenRight
  }

  // Quiz functions
  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer })
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  const calculateScore = () => {
    let score = 0
    sections[4].content.props.children[1].props.children.forEach((question: any) => {
      if (quizAnswers[question.props.children.id] === question.props.children.correctAnswer) {
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

  const toggleExplanation = (questionId: number) => {
    setShowExplanation({ ...showExplanation, [questionId]: !showExplanation[questionId] })
  }

  const sections = [
    {
      title: "The Mole Concept",
      content: (
        <div className="space-y-4">
          <p>
            The mole is a fundamental unit in chemistry that allows scientists to count atoms and molecules by weighing
            them. One mole contains exactly 6.022 × 10²³ particles (Avogadro's number).
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>1 mole = 6.022 × 10²³ particles (atoms, molecules, ions, etc.)</li>
              <li>The mass of 1 mole of a substance in grams equals its atomic/molecular mass in amu</li>
              <li>Molar mass is the mass of one mole of a substance in g/mol</li>
              <li>Molar volume is 22.4 L at STP (standard temperature and pressure)</li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">6.022 × 10²³</div>
              <div className="text-xl">Avogadro's Number</div>
              <div className="mt-4 text-sm text-muted-foreground">
                The number of particles in one mole of a substance
              </div>
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Interactive Mole Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Select Element</label>
                <select
                  className="w-full p-2 border rounded bg-background"
                  value={selectedElement}
                  onChange={(e) => setSelectedElement(e.target.value)}
                >
                  <option value="H">Hydrogen (H)</option>
                  <option value="O">Oxygen (O)</option>
                  <option value="C">Carbon (C)</option>
                  <option value="N">Nitrogen (N)</option>
                  <option value="Na">Sodium (Na)</option>
                  <option value="Cl">Chlorine (Cl)</option>
                  <option value="Ca">Calcium (Ca)</option>
                  <option value="Fe">Iron (Fe)</option>
                </select>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Moles</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter moles"
                      value={moleInput}
                      onChange={(e) => setMoleInput(e.target.value)}
                    />
                    <div className="p-2 border rounded bg-muted/20 min-w-[80px] text-center">{calculateMass()} g</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Mass (g)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Enter mass in grams"
                      value={massInput}
                      onChange={(e) => setMassInput(e.target.value)}
                    />
                    <div className="p-2 border rounded bg-muted/20 min-w-[80px] text-center">
                      {calculateMoles()} mol
                    </div>
                  </div>
                </div>
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
            Chemical equations must be balanced to satisfy the law of conservation of mass. A balanced equation has the
            same number of atoms of each element on both sides of the equation.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Steps to Balance an Equation:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Count the atoms of each element on both sides</li>
              <li>Add coefficients to make the number of atoms equal on both sides</li>
              <li>Start with the most complex molecule or the element that appears in the fewest compounds</li>
              <li>Check that all atoms are balanced</li>
              <li>Reduce to lowest whole-number ratio if needed</li>
            </ol>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Interactive Equation Balancer</h3>
            <p className="mb-4">Balance the equation for hydrogen combustion: H₂ + O₂ → H₂O</p>

            <div className="flex items-center justify-center text-2xl font-medium mb-6">
              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-1"
                  onClick={() => handleDecrement("reactant1")}
                >
                  -
                </button>
                <span className={balancedEquation.reactant1 === 0 ? "text-muted-foreground" : ""}>
                  {balancedEquation.reactant1 > 1 ? balancedEquation.reactant1 : ""}
                </span>
                <span className="mx-1">H₂</span>
                <button
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center ml-1"
                  onClick={() => handleIncrement("reactant1")}
                >
                  +
                </button>
              </div>

              <span className="mx-4">+</span>

              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-1"
                  onClick={() => handleDecrement("reactant2")}
                >
                  -
                </button>
                <span className={balancedEquation.reactant2 === 0 ? "text-muted-foreground" : ""}>
                  {balancedEquation.reactant2 > 1 ? balancedEquation.reactant2 : ""}
                </span>
                <span className="mx-1">O₂</span>
                <button
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center ml-1"
                  onClick={() => handleIncrement("reactant2")}
                >
                  +
                </button>
              </div>

              <span className="mx-4">→</span>

              <div className="flex items-center">
                <button
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-1"
                  onClick={() => handleDecrement("product1")}
                >
                  -
                </button>
                <span className={balancedEquation.product1 === 0 ? "text-muted-foreground" : ""}>
                  {balancedEquation.product1 > 1 ? balancedEquation.product1 : ""}
                </span>
                <span className="mx-1">H₂O</span>
                <button
                  className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center ml-1"
                  onClick={() => handleIncrement("product1")}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-center">
              {isEquationBalanced() ? (
                <div className="p-3 bg-green-200 dark:bg-green-800 rounded-lg text-green-800 dark:text-green-200">
                  Correct! The equation is balanced.
                </div>
              ) : (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-800 dark:text-red-200">
                  Not balanced yet. Keep trying!
                </div>
              )}
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>Hint: You need to balance both hydrogen and oxygen atoms.</p>
              <p>
                Left side: {balancedEquation.reactant1 * 2} H atoms, {balancedEquation.reactant2 * 2} O atoms
              </p>
              <p>
                Right side: {balancedEquation.product1 * 2} H atoms, {balancedEquation.product1} O atoms
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Mole-Mass Conversions",
      content: (
        <div className="space-y-4">
          <p>
            Converting between moles, mass, and number of particles is essential in stoichiometry calculations. These
            conversions allow chemists to determine the quantities of reactants and products in chemical reactions.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Conversion Relationships:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mass (g) = Moles × Molar Mass (g/mol)</li>
              <li>Moles = Mass (g) ÷ Molar Mass (g/mol)</li>
              <li>Number of Particles = Moles × Avogadro's Number (6.022 × 10²³)</li>
              <li>Moles = Number of Particles ÷ Avogadro's Number</li>
            </ul>
          </div>

          <div className="relative border rounded-lg overflow-hidden p-6">
            <h3 className="text-lg font-medium mb-4">Conversion Diagram</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="p-4 border rounded-lg bg-blue-100 dark:bg-blue-900/30 text-center min-w-[120px]">
                <div className="font-bold mb-1">Mass</div>
                <div className="text-sm">(grams)</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-sm text-muted-foreground">÷ Molar Mass</div>
                <div className="w-16 h-0.5 bg-muted-foreground my-1"></div>
                <div className="text-sm text-muted-foreground">× Molar Mass</div>
              </div>

              <div className="p-4 border rounded-lg bg-green-100 dark:bg-green-900/30 text-center min-w-[120px]">
                <div className="font-bold mb-1">Moles</div>
                <div className="text-sm">(mol)</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-sm text-muted-foreground">× Avogadro's Number</div>
                <div className="w-16 h-0.5 bg-muted-foreground my-1"></div>
                <div className="text-sm text-muted-foreground">÷ Avogadro's Number</div>
              </div>

              <div className="p-4 border rounded-lg bg-purple-100 dark:bg-purple-900/30 text-center min-w-[120px]">
                <div className="font-bold mb-1">Particles</div>
                <div className="text-sm">(atoms/molecules)</div>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Example Problem</h3>
            <p className="mb-4">How many water molecules are in 18 grams of water (H₂O)?</p>

            <div className="space-y-2 mb-4">
              <div className="font-medium">Step 1: Calculate the molar mass of water</div>
              <div className="pl-4">H₂O = (2 × 1.008 g/mol) + (1 × 16.00 g/mol) = 18.016 g/mol</div>

              <div className="font-medium">Step 2: Convert mass to moles</div>
              <div className="pl-4">Moles = Mass ÷ Molar Mass = 18 g ÷ 18.016 g/mol = 0.999 mol</div>

              <div className="font-medium">Step 3: Convert moles to molecules</div>
              <div className="pl-4">
                Molecules = Moles × Avogadro's Number = 0.999 mol × 6.022 × 10²³ molecules/mol = 6.02 × 10²³ molecules
              </div>
            </div>

            <div className="p-3 bg-green-200 dark:bg-green-800 rounded-lg text-green-800 dark:text-green-200 text-center">
              Answer: 6.02 × 10²³ water molecules
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Limiting Reagents",
      content: (
        <div className="space-y-4">
          <p>
            In chemical reactions, the limiting reagent is the reactant that is completely consumed first and limits the
            amount of product that can be formed. The excess reagent is the reactant that remains after the reaction is
            complete.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>The limiting reagent determines the maximum amount of product</li>
              <li>Excess reagent remains after the reaction is complete</li>
              <li>Theoretical yield is the amount of product calculated from the limiting reagent</li>
              <li>Percent yield = (Actual yield ÷ Theoretical yield) × 100%</li>
            </ul>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <LimitingReagentAnimation />
            </div>
          </div>

          <div className="bg-indigo-100 dark:bg-indigo-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Example Problem</h3>
            <p className="mb-4">
              Consider the reaction: 2H₂ + O₂ → 2H₂O
              <br />
              If you have 10 moles of H₂ and 6 moles of O₂, which is the limiting reagent?
            </p>

            <div className="space-y-2 mb-4">
              <div className="font-medium">Step 1: Calculate how much product each reactant can make</div>
              <div className="pl-4">From H₂: 10 mol H₂ × (2 mol H₂O ÷ 2 mol H₂) = 10 mol H₂O</div>
              <div className="pl-4">From O₂: 6 mol O₂ × (2 mol H₂O ÷ 1 mol O₂) = 12 mol H₂O</div>

              <div className="font-medium">Step 2: Identify the limiting reagent</div>
              <div className="pl-4">
                H₂ can make 10 mol H₂O
                <br />
                O₂ can make 12 mol H₂O
                <br />
                Since H₂ produces less product, it is the limiting reagent.
              </div>

              <div className="font-medium">Step 3: Calculate the amount of excess reagent remaining</div>
              <div className="pl-4">
                O₂ required for 10 mol H₂O = 10 mol H₂O × (1 mol O₂ ÷ 2 mol H₂O) = 5 mol O₂
                <br />
                O₂ remaining = 6 mol O₂ - 5 mol O₂ = 1 mol O₂
              </div>
            </div>

            <div className="p-3 bg-green-200 dark:bg-green-800 rounded-lg text-green-800 dark:text-green-200 text-center">
              Answer: H₂ is the limiting reagent, 1 mol of O₂ remains unused, and 10 mol of H₂O is produced.
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
            <h2>Practice Quiz: Stoichiometry</h2>
            <p>
              Test your understanding of stoichiometry concepts with this quiz. Select the best answer for each
              question.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                id: 1,
                question:
                  "How many moles of oxygen gas (O₂) are needed to completely react with 0.5 moles of methane (CH₄) according to the equation: CH₄ + 2O₂ → CO₂ + 2H₂O?",
                options: ["0.5 moles", "1.0 moles", "1.5 moles", "2.0 moles"],
                correctAnswer: "1.0 moles",
                explanation:
                  "According to the balanced equation, 1 mole of CH₄ reacts with 2 moles of O₂. Therefore, 0.5 moles of CH₄ will react with 0.5 × 2 = 1.0 moles of O₂.",
              },
              {
                id: 2,
                question: "What is the molar mass of calcium carbonate (CaCO₃)?",
                options: ["40.08 g/mol", "60.01 g/mol", "100.09 g/mol", "140.09 g/mol"],
                correctAnswer: "100.09 g/mol",
                explanation:
                  "The molar mass of CaCO₃ is calculated by adding the atomic masses of its constituent elements: Ca (40.08 g/mol) + C (12.01 g/mol) + 3 × O (3 × 16.00 g/mol) = 40.08 + 12.01 + 48.00 = 100.09 g/mol.",
              },
              {
                id: 3,
                question:
                  "In the reaction 2Al + 3Cl₂ → 2AlCl₃, how many grams of AlCl₃ can be produced from 5.4 g of Al?",
                options: ["13.35 g", "26.7 g", "40.05 g", "53.4 g"],
                correctAnswer: "26.7 g",
                explanation:
                  "First, convert 5.4 g of Al to moles: 5.4 g ÷ 26.98 g/mol = 0.2 mol Al. According to the balanced equation, 2 mol Al produces 2 mol AlCl₃, so 0.2 mol Al produces 0.2 mol AlCl₃. The molar mass of AlCl₃ is 133.5 g/mol, so 0.2 mol × 133.5 g/mol = 26.7 g AlCl₃.",
              },
              {
                id: 4,
                question:
                  "If 25.0 g of CaCO₃ decomposes according to the equation CaCO₃ → CaO + CO₂, what mass of CO₂ is produced?",
                options: ["5.5 g", "11.0 g", "14.0 g", "22.0 g"],
                correctAnswer: "11.0 g",
                explanation:
                  "First, convert 25.0 g of CaCO₃ to moles: 25.0 g ÷ 100.09 g/mol = 0.25 mol CaCO₃. According to the balanced equation, 1 mol CaCO₃ produces 1 mol CO₂, so 0.25 mol CaCO₃ produces 0.25 mol CO₂. The molar mass of CO₂ is 44.01 g/mol, so 0.25 mol × 44.01 g/mol = 11.0 g CO₂.",
              },
              {
                id: 5,
                question:
                  "In the reaction Zn + 2HCl → ZnCl₂ + H₂, if 3.0 moles of HCl react with excess Zn, what is the limiting reagent?",
                options: ["Zn", "HCl", "ZnCl₂", "H₂"],
                correctAnswer: "HCl",
                explanation:
                  "Since Zn is in excess, HCl is the limiting reagent. The limiting reagent is the reactant that is completely consumed first and limits the amount of product that can be formed.",
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
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Scale className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">Stoichiometry</span>
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

// Animation component for limiting reagent
function LimitingReagentAnimation() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Limiting Reagent Visualization</h3>
        <p className="text-sm text-muted-foreground">2H₂ + O₂ → 2H₂O</p>
      </div>

      <div className="flex justify-center gap-8 mb-6">
        <div className="text-center">
          <div className="text-lg font-bold mb-1">Hydrogen (H₂)</div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`h2-${i}`}
                className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                H₂
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="text-lg font-bold mb-1">Oxygen (O₂)</div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`o2-${i}`}
                className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                O₂
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-lg font-bold">Reaction</div>
        <div className="flex items-center justify-center gap-2">
          <div>2H₂ + O₂ →</div>
          <div>2H₂O</div>
        </div>
      </motion.div>

      <div className="flex justify-center gap-8">
        <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
          <div className="text-lg font-bold mb-1">Water Produced</div>
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`h2o-${i}`}
                className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 2.2 }}
              >
                H₂O
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          <div className="text-lg font-bold mb-1">Excess O₂</div>
          <div className="flex gap-1">
            <motion.div
              className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 3 }}
            >
              O₂
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-4 text-center text-sm font-medium bg-amber-200 dark:bg-amber-800 p-2 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5 }}
      >
        H₂ is the limiting reagent (completely consumed)
      </motion.div>
    </div>
  )
}

