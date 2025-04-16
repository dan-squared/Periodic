"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, ArrowLeft, ChevronLeft, ChevronRight, Check, X, HelpCircle, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function EquilibriumLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [equilibriumPosition, setEquilibriumPosition] = useState(0.5) // 0 = all reactants, 1 = all products
  const [stressType, setStressType] = useState<"none" | "concentration" | "temperature" | "pressure">("none")

  // K calculator
  const [reactantA, setReactantA] = useState("0.5")
  const [reactantB, setReactantB] = useState("0.5")
  const [productC, setProductC] = useState("0.25")
  const [productD, setProductD] = useState("0.25")
  const [calculatedK, setCalculatedK] = useState<number | null>(null)

  const calculateK = () => {
    const A = Number.parseFloat(reactantA)
    const B = Number.parseFloat(reactantB)
    const C = Number.parseFloat(productC)
    const D = Number.parseFloat(productD)

    if (isNaN(A) || isNaN(B) || isNaN(C) || isNaN(D) || A === 0 || B === 0) {
      setCalculatedK(null)
      return
    }

    // K = [C][D] / ([A][B])
    const K = (C * D) / (A * B)
    setCalculatedK(K)
  }

  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState<{ [key: number]: boolean }>({})

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer })
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  const toggleExplanation = (questionId: number) => {
    setShowExplanation({ ...showExplanation, [questionId]: !showExplanation[questionId] })
  }

  const calculateScore = () => {
    let score = 0
    sections[4].content.props.children.props.children[1].props.children.forEach((question: any) => {
      if (quizAnswers[question.props.question.id] === question.props.question.correctAnswer) {
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

  const sections = [
    {
      title: "Chemical Equilibrium",
      content: (
        <div className="space-y-4">
          <p>
            Chemical equilibrium is a state in which the rates of the forward and reverse reactions are equal, resulting
            in constant concentrations of reactants and products. It is a dynamic state, with reactions still occurring,
            but with no net change in concentrations.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Dynamic Equilibrium:</strong> Forward and reverse reactions occur at equal rates
              </li>
              <li>
                <strong>Reversible Reactions:</strong> Indicated by double arrows (⇌)
              </li>
              <li>
                <strong>Equilibrium Constant (K):</strong> Ratio of product concentrations to reactant concentrations at
                equilibrium
              </li>
              <li>
                <strong>Le Chatelier's Principle:</strong> When a system at equilibrium is disturbed, it shifts to
                counteract the disturbance
              </li>
              <li>
                <strong>Reaction Quotient (Q):</strong> Ratio of product concentrations to reactant concentrations at
                any point
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <EquilibriumAnimation equilibriumPosition={equilibriumPosition} />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Equilibrium Position</label>
                <span className="text-sm font-medium">
                  {equilibriumPosition < 0.4
                    ? "Favors Reactants"
                    : equilibriumPosition > 0.6
                      ? "Favors Products"
                      : "Balanced"}
                </span>
              </div>
              <Slider
                value={[equilibriumPosition]}
                min={0.1}
                max={0.9}
                step={0.1}
                onValueChange={(value) => setEquilibriumPosition(value[0])}
              />
            </div>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Equilibrium Constant (K)</h3>
            <p className="mb-3">For a general reaction: aA + bB ⇌ cC + dD, the equilibrium constant is:</p>
            <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
              <div className="text-lg font-medium">K = [C]ᶜ[D]ᵈ / ([A]ᵃ[B]ᵇ)</div>
              <div className="text-sm mt-1">where [A], [B], [C], and [D] are equilibrium concentrations</div>
            </div>
            <div className="mt-3 text-sm">
              <ul className="list-disc pl-5">
                <li>K &gt; 1: Equilibrium favors products</li>
                <li>K &lt; 1: Equilibrium favors reactants</li>
                <li>K ≈ 1: Roughly equal amounts of reactants and products</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Types of Equilibrium Constants</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Kc:</strong> Based on molar concentrations
                </li>
                <li>
                  <strong>Kp:</strong> Based on partial pressures (for gas-phase reactions)
                </li>
                <li>
                  <strong>Ksp:</strong> Solubility product constant (for slightly soluble salts)
                </li>
                <li>
                  <strong>Ka:</strong> Acid dissociation constant
                </li>
                <li>
                  <strong>Kb:</strong> Base dissociation constant
                </li>
                <li>
                  <strong>Kw:</strong> Water autoionization constant (1.0 × 10⁻¹⁴ at 25°C)
                </li>
              </ul>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Reaction Quotient (Q)</h3>
              <p className="mb-2">
                The reaction quotient has the same form as K but uses concentrations at any point in the reaction.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Q &lt; K: Reaction will proceed toward products</li>
                <li>Q &gt; K: Reaction will proceed toward reactants</li>
                <li>Q = K: System is at equilibrium</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Le Chatelier's Principle",
      content: (
        <div className="space-y-4">
          <p>
            Le Chatelier's Principle states that if a system at equilibrium is subjected to a change in concentration,
            temperature, volume, or pressure, the system will shift its equilibrium position to counteract the effect of
            the change.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Factors Affecting Equilibrium:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Concentration:</strong> Adding a reactant shifts equilibrium toward products; adding a product
                shifts equilibrium toward reactants
              </li>
              <li>
                <strong>Pressure/Volume:</strong> Increasing pressure (decreasing volume) shifts equilibrium toward the
                side with fewer gas molecules
              </li>
              <li>
                <strong>Temperature:</strong> Increasing temperature favors the endothermic direction; decreasing
                temperature favors the exothermic direction
              </li>
              <li>
                <strong>Catalyst:</strong> Speeds up both forward and reverse reactions equally; does not change the
                equilibrium position but helps reach equilibrium faster
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <LeChatelier stressType={stressType} />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-center gap-2 mb-2">
                <Button
                  variant={stressType === "none" ? "default" : "outline"}
                  onClick={() => setStressType("none")}
                  className="text-xs"
                  size="sm"
                >
                  No Stress
                </Button>
                <Button
                  variant={stressType === "concentration" ? "default" : "outline"}
                  onClick={() => setStressType("concentration")}
                  className="text-xs"
                  size="sm"
                >
                  Add Reactant
                </Button>
                <Button
                  variant={stressType === "temperature" ? "default" : "outline"}
                  onClick={() => setStressType("temperature")}
                  className="text-xs"
                  size="sm"
                >
                  Increase Temp
                </Button>
                <Button
                  variant={stressType === "pressure" ? "default" : "outline"}
                  onClick={() => setStressType("pressure")}
                  className="text-xs"
                  size="sm"
                >
                  Increase Pressure
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Example: N₂O₄ ⇌ 2NO₂</h3>
              <p className="mb-2">Colorless gas ⇌ Brown gas</p>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Concentration:</div>
                  <div className="text-sm">Adding NO₂ shifts equilibrium left (colorless)</div>
                  <div className="text-sm">Removing NO₂ shifts equilibrium right (brown)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Pressure:</div>
                  <div className="text-sm">Increasing pressure shifts equilibrium left (fewer gas molecules)</div>
                  <div className="text-sm">Decreasing pressure shifts equilibrium right (more gas molecules)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Temperature:</div>
                  <div className="text-sm">N₂O₄ → 2NO₂ is endothermic</div>
                  <div className="text-sm">Increasing temperature shifts equilibrium right (brown)</div>
                  <div className="text-sm">Decreasing temperature shifts equilibrium left (colorless)</div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Example: Haber Process</h3>
              <p className="mb-2">N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat</p>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Concentration:</div>
                  <div className="text-sm">Adding N₂ or H₂ shifts equilibrium right (more NH₃)</div>
                  <div className="text-sm">Removing NH₃ shifts equilibrium right (more NH₃)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Pressure:</div>
                  <div className="text-sm">Increasing pressure shifts equilibrium right (fewer gas molecules)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Temperature:</div>
                  <div className="text-sm">Reaction is exothermic (releases heat)</div>
                  <div className="text-sm">Decreasing temperature shifts equilibrium right (more NH₃)</div>
                  <div className="text-sm">But lower temperature means slower reaction rate</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Catalyst:</div>
                  <div className="text-sm">Iron catalyst speeds up reaction without changing equilibrium position</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Equilibrium Calculations",
      content: (
        <div className="space-y-4">
          <p>
            Equilibrium calculations involve determining equilibrium concentrations, equilibrium constants, or initial
            concentrations using mathematical relationships.
          </p>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Equilibrium Constant Calculator</h3>
            <p className="mb-3">For the reaction: A + B ⇌ C + D</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">[A] (mol/L)</label>
                <Input type="number" value={reactantA} onChange={(e) => setReactantA(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">[B] (mol/L)</label>
                <Input type="number" value={reactantB} onChange={(e) => setReactantB(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">[C] (mol/L)</label>
                <Input type="number" value={productC} onChange={(e) => setProductC(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">[D] (mol/L)</label>
                <Input type="number" value={productD} onChange={(e) => setProductD(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Button onClick={calculateK}>Calculate K</Button>
            </div>

            {calculatedK !== null && (
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
                <div className="text-sm mb-1">Equilibrium Constant (K)</div>
                <div className="text-2xl font-bold">{calculatedK.toFixed(4)}</div>
                <div className="text-xs text-muted-foreground mt-1">K = [C][D] / ([A][B])</div>
                <div className="mt-2 text-sm">
                  {calculatedK > 1
                    ? "Products are favored at equilibrium"
                    : calculatedK < 1
                      ? "Reactants are favored at equilibrium"
                      : "Roughly equal amounts of reactants and products"}
                </div>
              </div>
            )}
          </div>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Common Equilibrium Calculation Types:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                <strong>Finding K from equilibrium concentrations</strong>
              </li>
              <li>
                <strong>Finding equilibrium concentrations from K and initial concentrations</strong>
              </li>
              <li>
                <strong>Finding initial concentrations from K and equilibrium concentrations</strong>
              </li>
              <li>
                <strong>Using ICE tables (Initial, Change, Equilibrium)</strong>
              </li>
            </ol>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">ICE Table Example</h3>
            <p className="mb-3">For the reaction: N₂O₄(g) ⇌ 2NO₂(g) with K = 4.63 × 10⁻³ at 25°C</p>
            <p className="mb-3">
              If the initial concentration of N₂O₄ is 0.100 M and [NO₂] = 0, find the equilibrium concentrations.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2"></th>
                    <th className="border p-2">[N₂O₄]</th>
                    <th className="border p-2">[NO₂]</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">Initial</td>
                    <td className="border p-2">0.100</td>
                    <td className="border p-2">0</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Change</td>
                    <td className="border p-2">-x</td>
                    <td className="border p-2">+2x</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Equilibrium</td>
                    <td className="border p-2">0.100 - x</td>
                    <td className="border p-2">2x</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 space-y-2">
              <div className="font-medium">Step 1: Write the equilibrium expression</div>
              <div className="pl-4">K = [NO₂]² / [N₂O₄] = 4.63 × 10⁻³</div>

              <div className="font-medium">Step 2: Substitute the equilibrium values</div>
              <div className="pl-4">4.63 × 10⁻³ = (2x)² / (0.100 - x) = 4x² / (0.100 - x)</div>

              <div className="font-medium">Step 3: Solve for x</div>
              <div className="pl-4">
                4.63 × 10⁻³ × (0.100 - x) = 4x²
                <br />
                4.63 × 10⁻⁴ - 4.63 × 10⁻³x = 4x²
                <br />
                4x² + 4.63 × 10⁻³x - 4.63 × 10⁻⁴ = 0
              </div>
              <div className="pl-4">Using the quadratic formula: x = 0.0101 M</div>

              <div className="font-medium">Step 4: Calculate equilibrium concentrations</div>
              <div className="pl-4">
                [N₂O₄] = 0.100 - 0.0101 = 0.0899 M<br />
                [NO₂] = 2 × 0.0101 = 0.0202 M
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Equilibrium in Everyday Life",
      content: (
        <div className="space-y-4">
          <p>
            Chemical equilibrium principles are important in many natural processes, industrial applications, and
            biological systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Natural Systems</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <div className="font-medium">Ocean Acidification</div>
                  <div className="text-sm">CO₂(g) + H₂O(l) ⇌ H₂CO₃(aq) ⇌ H⁺(aq) + HCO₃⁻(aq)</div>
                  <div className="text-sm">
                    Increased atmospheric CO₂ shifts equilibrium right, increasing ocean acidity
                  </div>
                </li>
                <li>
                  <div className="font-medium">Oxygen Transport in Blood</div>
                  <div className="text-sm">Hb + O₂ ⇌ HbO₂</div>
                  <div className="text-sm">
                    In lungs (high O₂), equilibrium shifts right; in tissues (low O₂), equilibrium shifts left
                  </div>
                </li>
                <li>
                  <div className="font-medium">Carbonate Buffer System</div>
                  <div className="text-sm">CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</div>
                  <div className="text-sm">Helps maintain pH balance in blood and oceans</div>
                </li>
              </ul>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Industrial Applications</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <div className="font-medium">Haber Process (Ammonia Production)</div>
                  <div className="text-sm">N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + heat</div>
                  <div className="text-sm">
                    Optimized conditions: high pressure, moderate temperature, iron catalyst
                  </div>
                </li>
                <li>
                  <div className="font-medium">Contact Process (Sulfuric Acid Production)</div>
                  <div className="text-sm">2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + heat</div>
                  <div className="text-sm">Optimized conditions: moderate pressure, low temperature, V₂O₅ catalyst</div>
                </li>
                <li>
                  <div className="font-medium">Methanol Synthesis</div>
                  <div className="text-sm">CO(g) + 2H₂(g) ⇌ CH₃OH(g) + heat</div>
                  <div className="text-sm">
                    Optimized conditions: high pressure, moderate temperature, copper-zinc oxide catalyst
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <RealWorldEquilibriumAnimation />
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Common Ion Effect</h3>
            <p className="mb-3">
              The common ion effect occurs when a solution containing a weak electrolyte is combined with a strong
              electrolyte that has an ion in common with the weak electrolyte. This shifts the equilibrium of the weak
              electrolyte.
            </p>
            <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
              <div className="font-medium">Example: Acetic Acid and Sodium Acetate</div>
              <div className="text-sm mt-2">CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)</div>
              <div className="text-sm mt-1">
                Adding sodium acetate (NaCH₃COO) increases [CH₃COO⁻], shifting equilibrium left and decreasing [H⁺]
              </div>
            </div>
            <div className="mt-3 text-sm">
              <strong>Applications:</strong> Buffer solutions, controlling solubility of precipitates, controlling pH in
              biological systems
            </div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Solubility Equilibria</h3>
            <p className="mb-3">Solubility equilibria involve slightly soluble ionic compounds in solution.</p>
            <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
              <div className="font-medium">Solubility Product Constant (Ksp)</div>
              <div className="text-sm mt-2">
                For a salt A<sub>x</sub>B<sub>y</sub> that dissociates as A<sub>x</sub>B<sub>y</sub>(s) ⇌ xA
                <sup>y+</sup>(aq) + yB<sup>x-</sup>(aq)
              </div>
              <div className="text-sm mt-1">
                Ksp = [A<sup>y+</sup>]<sup>x</sup> × [B<sup>x-</sup>]<sup>y</sup>
              </div>
            </div>
            <div className="mt-3 text-sm">
              <strong>Applications:</strong> Predicting precipitation reactions, selective precipitation, qualitative
              analysis
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
            <h2>Practice Quiz: Equilibrium</h2>
            <p>
              Test your understanding of equilibrium concepts with this quiz. Select the best answer for each question.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                id: 1,
                question:
                  "What happens to the position of equilibrium when pressure is increased in the reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g)?",
                options: [
                  "Shifts toward reactants",
                  "Shifts toward products",
                  "Remains unchanged",
                  "Cannot be determined without more information",
                ],
                correctAnswer: "Shifts toward products",
                explanation:
                  "According to Le Chatelier's principle, when pressure is increased, the equilibrium shifts toward the side with fewer gas molecules. In this reaction, there are 4 gas molecules on the reactant side (1 N₂ + 3 H₂) and 2 gas molecules on the product side (2 NH₃), so the equilibrium shifts toward products.",
              },
              {
                id: 2,
                question:
                  "For the reaction: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g) + heat, which change would increase the yield of SO₃?",
                options: [
                  "Increasing the temperature",
                  "Decreasing the pressure",
                  "Adding a catalyst",
                  "Removing SO₃ as it forms",
                ],
                correctAnswer: "Removing SO₃ as it forms",
                explanation:
                  "According to Le Chatelier's principle, removing a product (SO₃) will shift the equilibrium toward the products to counteract this change. A catalyst would speed up the reaction but not affect the equilibrium position. Increasing temperature would shift the equilibrium toward the reactants since the reaction is exothermic. Decreasing pressure would shift the equilibrium toward the side with more gas molecules (the reactants).",
              },
              {
                id: 3,
                question: "What is the equilibrium constant expression for the reaction: 2NO(g) + O₂(g) ⇌ 2NO₂(g)?",
                options: [
                  "K = [NO₂]²/([NO]²[O₂])",
                  "K = [NO]²[O₂]/[NO₂]²",
                  "K = [NO₂]/([NO][O₂])",
                  "K = [NO₂]²/[NO][O₂]",
                ],
                correctAnswer: "K = [NO₂]²/([NO]²[O₂])",
                explanation:
                  "The equilibrium constant expression is written as the concentration of products raised to their stoichiometric coefficients divided by the concentration of reactants raised to their stoichiometric coefficients. For this reaction, K = [NO₂]²/([NO]²[O₂]).",
              },
              {
                id: 4,
                question:
                  "If the value of the equilibrium constant (K) is very large, what does this indicate about the reaction?",
                options: [
                  "The reaction is very fast",
                  "The reaction favors the products",
                  "The reaction favors the reactants",
                  "The reaction requires a catalyst",
                ],
                correctAnswer: "The reaction favors the products",
                explanation:
                  "A large equilibrium constant (K >> 1) indicates that at equilibrium, the concentration of products is much greater than the concentration of reactants, meaning the reaction strongly favors the products. The value of K does not provide information about reaction rate, only about the position of equilibrium.",
              },
              {
                id: 5,
                question:
                  "In which direction will the equilibrium shift for the reaction PCl₃(g) + Cl₂(g) ⇌ PCl₅(g) + heat when the temperature is increased?",
                options: [
                  "Toward PCl₅",
                  "Toward PCl₃ and Cl₂",
                  "No shift will occur",
                  "First toward PCl₅, then back to PCl₃ and Cl₂",
                ],
                correctAnswer: "Toward PCl₃ and Cl₂",
                explanation:
                  "According to Le Chatelier's principle, when temperature is increased in an exothermic reaction (one that releases heat), the equilibrium shifts in the endothermic direction to counteract the temperature increase. Since this reaction is exothermic (produces heat), increasing temperature will shift the equilibrium toward the reactants (PCl₃ and Cl₂).",
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
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">Chemical Equilibrium</span>
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

// Animation components
function EquilibriumAnimation({ equilibriumPosition }: { equilibriumPosition: number }) {
  // Calculate particle counts based on equilibrium position
  const reactantCount = Math.floor((1 - equilibriumPosition) * 20)
  const productCount = Math.floor(equilibriumPosition * 20)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Dynamic Equilibrium</div>
        <div className="text-sm text-muted-foreground">A + B ⇌ C + D</div>
      </div>

      <div className="flex items-center justify-center gap-16">
        <div className="relative w-32 h-32 border-2 border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
          <div className="absolute top-0 left-0 right-0 text-center text-sm font-medium py-1 bg-blue-200 dark:bg-blue-800 rounded-t-md">
            Reactants
          </div>

          {/* Reactant particles */}
          {[...Array(reactantCount)].map((_, i) => (
            <motion.div
              key={`reactant-${i}`}
              className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-blue-500" : "bg-green-500"}`}
              initial={{
                x: Math.random() * 100 + 10,
                y: Math.random() * 100 + 20,
              }}
              animate={{
                x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                y: [Math.random() * 100 + 20, Math.random() * 100 + 20, Math.random() * 100 + 20],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Forward reaction arrow */}
          <motion.div
            className="absolute -right-12 top-1/2 transform -translate-y-1/2"
            animate={{
              x: [0, 5, 0],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ArrowRight size={16} className="text-blue-500" />
          </motion.div>
        </div>

        <div className="relative w-32 h-32 border-2 border-purple-400 rounded-lg bg-purple-100/50 dark:bg-purple-900/30">
          <div className="absolute top-0 left-0 right-0 text-center text-sm font-medium py-1 bg-purple-200 dark:bg-purple-800 rounded-t-md">
            Products
          </div>

          {/* Product particles */}
          {[...Array(productCount)].map((_, i) => (
            <motion.div
              key={`product-${i}`}
              className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-purple-500" : "bg-red-500"}`}
              initial={{
                x: Math.random() * 100 + 10,
                y: Math.random() * 100 + 20,
              }}
              animate={{
                x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                y: [Math.random() * 100 + 20, Math.random() * 100 + 20, Math.random() * 100 + 20],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Reverse reaction arrow */}
          <motion.div
            className="absolute -left-12 top-1/2 transform -translate-y-1/2"
            animate={{
              x: [0, -5, 0],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ArrowLeft size={16} className="text-purple-500" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-16 text-center text-sm">
        <div className="font-medium">
          {equilibriumPosition < 0.4
            ? "K < 1 (Reactants Favored)"
            : equilibriumPosition > 0.6
              ? "K > 1 (Products Favored)"
              : "K ≈ 1 (Neither Favored)"}
        </div>
      </div>
    </div>
  )
}

function LeChatelier({ stressType }: { stressType: "none" | "concentration" | "temperature" | "pressure" }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Le Chatelier's Principle</div>
        <div className="text-sm text-muted-foreground">
          {stressType === "none"
            ? "System at Equilibrium"
            : stressType === "concentration"
              ? "Adding Reactant"
              : stressType === "temperature"
                ? "Increasing Temperature (Endothermic Reaction)"
                : "Increasing Pressure (Fewer Gas Molecules on Right)"}
        </div>
      </div>

      <div className="flex items-center justify-center gap-16">
        <div className="relative w-32 h-32 border-2 border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
          <div className="absolute top-0 left-0 right-0 text-center text-sm font-medium py-1 bg-blue-200 dark:bg-blue-800 rounded-t-md">
            Reactants
          </div>

          {/* Reactant particles */}
          {[...Array(stressType === "concentration" ? 15 : 10)].map((_, i) => (
            <motion.div
              key={`reactant-${i}`}
              className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-blue-500" : "bg-green-500"}`}
              initial={{
                x: Math.random() * 100 + 10,
                y: Math.random() * 100 + 20,
              }}
              animate={{
                x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                y: [Math.random() * 100 + 20, Math.random() * 100 + 20, Math.random() * 100 + 20],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Forward reaction arrow */}
          <motion.div
            className="absolute -right-12 top-1/2 transform -translate-y-1/2"
            animate={{
              x: [0, 5, 0],
              opacity: [1, 0.7, 1],
              scale: stressType !== "none" ? [1, 1.3, 1] : 1,
            }}
            transition={{
              duration: stressType !== "none" ? 1 : 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ArrowRight size={16} className={stressType !== "none" ? "text-red-500" : "text-blue-500"} />
          </motion.div>
        </div>

        <div className="relative w-32 h-32 border-2 border-purple-400 rounded-lg bg-purple-100/50 dark:bg-purple-900/30">
          <div className="absolute top-0 left-0 right-0 text-center text-sm font-medium py-1 bg-purple-200 dark:bg-purple-800 rounded-t-md">
            Products
          </div>

          {/* Product particles */}
          {[...Array(stressType === "pressure" ? 5 : 10)].map((_, i) => (
            <motion.div
              key={`product-${i}`}
              className={`absolute w-3 h-3 rounded-full ${i % 2 === 0 ? "bg-purple-500" : "bg-red-500"}`}
              initial={{
                x: Math.random() * 100 + 10,
                y: Math.random() * 100 + 20,
              }}
              animate={{
                x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                y: [Math.random() * 100 + 20, Math.random() * 100 + 20, Math.random() * 100 + 20],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Reverse reaction arrow */}
          <motion.div
            className="absolute -left-12 top-1/2 transform -translate-y-1/2"
            animate={{
              x: [0, -5, 0],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ArrowLeft size={16} className="text-purple-500" />
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-16 text-center text-sm">
        {stressType !== "none" && (
          <div className="font-medium text-red-500">
            {stressType === "concentration"
              ? "Equilibrium shifts right to consume added reactant"
              : stressType === "temperature"
                ? "Equilibrium shifts right to absorb added heat"
                : "Equilibrium shifts left to reduce pressure"}
          </div>
        )}
      </div>
    </div>
  )
}

function RealWorldEquilibriumAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Haber Process</div>
          <div className="relative w-32 h-32 border-2 border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30">
            {/* Nitrogen and Hydrogen */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`n-${i}`}
                className="absolute w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
                initial={{
                  x: Math.random() * 100 + 10,
                  y: Math.random() * 100 + 10,
                }}
                animate={{
                  x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                  y: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              >
                <span className="text-[8px] text-white font-bold">N₂</span>
              </motion.div>
            ))}

            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute w-3 h-3 rounded-full bg-green-500 flex items-center justify-center"
                initial={{
                  x: Math.random() * 100 + 10,
                  y: Math.random() * 100 + 10,
                }}
                animate={{
                  x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                  y: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              >
                <span className="text-[8px] text-white font-bold">H₂</span>
              </motion.div>
            ))}

            {/* Catalyst */}
            <div className="absolute bottom-2 left-2 right-2 h-4 bg-gray-400 rounded-sm flex items-center justify-center">
              <span className="text-[8px] text-white">Fe catalyst</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>N₂ + 3H₂ ⇌ 2NH₃ + heat</div>
            <div>High pressure, moderate temperature</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Hemoglobin-Oxygen</div>
          <div className="relative w-32 h-32 border-2 border-red-400 rounded-lg bg-red-100/50 dark:bg-red-900/30">
            {/* Hemoglobin */}
            <motion.div
              className="absolute w-16 h-16 rounded-full bg-red-500 flex items-center justify-center"
              style={{ left: "25%", top: "25%" }}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <span className="text-xs text-white font-bold">Hb</span>
            </motion.div>

            {/* Oxygen molecules */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`o-${i}`}
                className="absolute w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center"
                initial={{
                  x: Math.random() * 100 + 10,
                  y: Math.random() * 100 + 10,
                }}
                animate={{
                  x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                  y: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              >
                <span className="text-[8px] text-white font-bold">O₂</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Hb + O₂ ⇌ HbO₂</div>
            <div>Shifts based on oxygen concentration</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm font-medium">
        Equilibrium principles in real-world applications
      </div>
    </div>
  )
}

