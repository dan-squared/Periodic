"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"

export default function SolutionChemistryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [concentration, setConcentration] = useState(1.0)

  // Concentration calculator
  const [solute, setSolute] = useState("58.5")
  const [volume, setVolume] = useState("1.0")
  const [molarMass, setMolarMass] = useState("58.5")
  const [calculatedMolarity, setCalculatedMolarity] = useState<number | null>(null)

  const calculateMolarity = () => {
    const mass = Number.parseFloat(solute)
    const vol = Number.parseFloat(volume)
    const mm = Number.parseFloat(molarMass)

    if (isNaN(mass) || isNaN(vol) || isNaN(mm) || mm === 0 || vol === 0) {
      setCalculatedMolarity(null)
      return
    }

    // Molarity = moles / volume (L) = mass (g) / (molar mass (g/mol) * volume (L))
    const molarity = mass / (mm * vol)
    setCalculatedMolarity(molarity)
  }

  const sections = [
    {
      title: "Solutions and Solubility",
      content: (
        <div className="space-y-4">
          <p>
            A solution is a homogeneous mixture of two or more substances. The substance that dissolves is called the
            solute, and the substance in which the solute dissolves is called the solvent.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Solution:</strong> Homogeneous mixture of solute and solvent
              </li>
              <li>
                <strong>Solute:</strong> Substance being dissolved (usually present in smaller amount)
              </li>
              <li>
                <strong>Solvent:</strong> Substance doing the dissolving (usually present in larger amount)
              </li>
              <li>
                <strong>Solubility:</strong> Maximum amount of solute that can dissolve in a given amount of solvent
              </li>
              <li>
                <strong>Saturated Solution:</strong> Contains maximum amount of dissolved solute
              </li>
              <li>
                <strong>Unsaturated Solution:</strong> Can dissolve more solute
              </li>
              <li>
                <strong>Supersaturated Solution:</strong> Contains more dissolved solute than a saturated solution
                (unstable)
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <SolutionAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Types of Solutions</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Gas in Gas</div>
                  <div className="text-sm">Example: Air (oxygen in nitrogen)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Gas in Liquid</div>
                  <div className="text-sm">Example: Carbonated drinks (CO₂ in water)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Liquid in Liquid</div>
                  <div className="text-sm">Example: Alcohol in water</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Solid in Liquid</div>
                  <div className="text-sm">Example: Salt in water, sugar in water</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Solid in Solid</div>
                  <div className="text-sm">Example: Alloys like brass (zinc in copper)</div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Factors Affecting Solubility</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Temperature:</strong> Most solid solutes become more soluble as temperature increases; gases
                  become less soluble
                </li>
                <li>
                  <strong>Pressure:</strong> Affects solubility of gases (higher pressure increases gas solubility)
                </li>
                <li>
                  <strong>Nature of Solute and Solvent:</strong> "Like dissolves like" - polar substances dissolve in
                  polar solvents; nonpolar substances dissolve in nonpolar solvents
                </li>
                <li>
                  <strong>Surface Area:</strong> Increasing surface area increases rate of dissolution
                </li>
                <li>
                  <strong>Stirring:</strong> Increases rate of dissolution by bringing fresh solvent in contact with
                  solute
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Concentration Units",
      content: (
        <div className="space-y-4">
          <p>
            The concentration of a solution is a measure of the amount of solute dissolved in a given amount of solution
            or solvent. There are several ways to express concentration.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Common Concentration Units:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Molarity (M):</strong> Moles of solute per liter of solution (mol/L)
              </li>
              <li>
                <strong>Molality (m):</strong> Moles of solute per kilogram of solvent (mol/kg)
              </li>
              <li>
                <strong>Mass Percent (% m/m):</strong> (Mass of solute / Mass of solution) × 100%
              </li>
              <li>
                <strong>Volume Percent (% v/v):</strong> (Volume of solute / Volume of solution) × 100%
              </li>
              <li>
                <strong>Parts Per Million (ppm):</strong> (Mass of solute / Mass of solution) × 10⁶
              </li>
              <li>
                <strong>Mole Fraction (X):</strong> Moles of component / Total moles of all components
              </li>
              <li>
                <strong>Normality (N):</strong> Gram equivalents of solute per liter of solution
              </li>
            </ul>
          </div>

          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Molarity Calculator</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Mass of Solute (g)</label>
                <Input type="number" value={solute} onChange={(e) => setSolute(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Volume of Solution (L)</label>
                <Input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Molar Mass (g/mol)</label>
                <Input type="number" value={molarMass} onChange={(e) => setMolarMass(e.target.value)} />
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Button onClick={calculateMolarity}>Calculate Molarity</Button>
            </div>

            {calculatedMolarity !== null && (
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
                <div className="text-sm mb-1">Molarity (M)</div>
                <div className="text-2xl font-bold">{calculatedMolarity.toFixed(3)} mol/L</div>
                <div className="text-xs text-muted-foreground mt-1">
                  M = moles / volume = mass / (molar mass × volume)
                </div>
              </div>
            )}

            <div className="mt-4 text-sm">
              <p>Common Molar Masses:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">NaCl</div>
                  <div>58.5 g/mol</div>
                </div>
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">CaCl₂</div>
                  <div>111.0 g/mol</div>
                </div>
                <div className="p-2 border rounded-lg text-center">
                  <div className="font-medium">C₁₂H₂₂O₁₁</div>
                  <div>342.3 g/mol</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <ConcentrationAnimation concentration={concentration} />
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Concentration: {concentration.toFixed(1)} M</label>
              </div>
              <Slider
                value={[concentration]}
                min={0.1}
                max={5.0}
                step={0.1}
                onValueChange={(value) => setConcentration(value[0])}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Concentration Conversions</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Molarity to Molality:</div>
                  <div className="text-sm">m = M / (ρ - M × MW / 1000)</div>
                  <div className="text-xs text-muted-foreground">
                    Where ρ is density (g/mL) and MW is molar mass (g/mol)
                  </div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Molarity to Mass Percent:</div>
                  <div className="text-sm">% m/m = (M × MW / ρ) × 100%</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Mass Percent to Molarity:</div>
                  <div className="text-sm">M = (% m/m × ρ) / (MW × 100%)</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Dilution Calculations</h3>
              <p className="mb-2">When diluting a solution, the amount of solute remains constant:</p>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                <div className="text-lg font-medium">M₁V₁ = M₂V₂</div>
                <div className="text-sm mt-1">
                  M₁ = initial concentration, V₁ = initial volume
                  <br />
                  M₂ = final concentration, V₂ = final volume
                </div>
              </div>
              <div className="mt-3 text-sm">
                <strong>Example:</strong> To dilute 25.0 mL of 6.0 M HCl to 2.0 M, you need:
                <div className="mt-1 pl-4">V₂ = (M₁V₁) / M₂ = (6.0 M × 25.0 mL) / 2.0 M = 75.0 mL</div>
                <div className="mt-1">So add 25.0 mL of 6.0 M HCl to enough water to make 75.0 mL of solution.</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Colligative Properties",
      content: (
        <div className="space-y-4">
          <p>
            Colligative properties are properties of solutions that depend on the number of solute particles, not on the
            identity of the solute. These properties are important in understanding how solutions behave differently
            from pure solvents.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Main Colligative Properties:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Vapor Pressure Lowering:</strong> Dissolved solute lowers the vapor pressure of the solvent
              </li>
              <li>
                <strong>Boiling Point Elevation:</strong> Solutions have higher boiling points than pure solvents
              </li>
              <li>
                <strong>Freezing Point Depression:</strong> Solutions have lower freezing points than pure solvents
              </li>
              <li>
                <strong>Osmotic Pressure:</strong> Pressure required to prevent osmosis across a semipermeable membrane
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <ColligativePropertiesAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Freezing Point Depression</h3>
              <p className="mb-2">
                The freezing point of a solution is lower than that of the pure solvent. The change is proportional to
                the molal concentration.
              </p>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                <div className="text-lg font-medium">ΔTf = Kf × m × i</div>
                <div className="text-sm mt-1">
                  ΔTf = freezing point depression
                  <br />
                  Kf = freezing point depression constant
                  <br />m = molality
                  <br />i = van't Hoff factor (number of particles per formula unit)
                </div>
              </div>
              <div className="mt-3 text-sm">
                <strong>Example:</strong> Antifreeze in car radiators lowers the freezing point of water to prevent
                freezing in winter.
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Osmotic Pressure</h3>
              <p className="mb-2">
                Osmotic pressure is the pressure required to prevent osmosis (flow of solvent) across a semipermeable
                membrane.
              </p>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                <div className="text-lg font-medium">π = MRT</div>
                <div className="text-sm mt-1">
                  π = osmotic pressure
                  <br />M = molarity
                  <br />R = gas constant
                  <br />T = absolute temperature
                </div>
              </div>
              <div className="mt-3 text-sm">
                <strong>Applications:</strong> Osmosis is important in biological systems, water purification (reverse
                osmosis), and food preservation.
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Electrolytes vs. Nonelectrolytes</h3>
            <p className="mb-3">
              The effect of a solute on colligative properties depends on whether it is an electrolyte or
              nonelectrolyte.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Nonelectrolytes:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>Do not dissociate in solution</li>
                  <li>Examples: sugar, alcohol, glycerol</li>
                  <li>van't Hoff factor (i) ≈ 1</li>
                </ul>
              </div>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Electrolytes:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>Dissociate into ions in solution</li>
                  <li>Examples: NaCl, CaCl₂, H₂SO₄</li>
                  <li>van't Hoff factor (i) &gt; 1</li>
                  <li>Strong electrolytes: completely dissociate</li>
                  <li>Weak electrolytes: partially dissociate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Acid-Base Solutions",
      content: (
        <div className="space-y-4">
          <p>
            Acid-base solutions are important in chemistry and biology. Understanding their properties and behavior is
            crucial for many applications, from industrial processes to biological systems.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>pH Scale:</strong> Measures acidity or basicity of a solution (pH = -log[H⁺])
              </li>
              <li>
                <strong>Strong Acids:</strong> Completely dissociate in water (e.g., HCl, HNO₃, H₂SO₄)
              </li>
              <li>
                <strong>Weak Acids:</strong> Partially dissociate in water (e.g., CH₃COOH, H₂CO₃)
              </li>
              <li>
                <strong>Strong Bases:</strong> Completely dissociate in water (e.g., NaOH, KOH)
              </li>
              <li>
                <strong>Weak Bases:</strong> Partially dissociate in water (e.g., NH₃, amines)
              </li>
              <li>
                <strong>Buffer Solutions:</strong> Resist changes in pH when small amounts of acid or base are added
              </li>
            </ul>
          </div>

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-red-50 to-blue-50 dark:from-red-950 dark:to-blue-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <AcidBaseSolutionAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Acid Dissociation Constant (Ka)</h3>
              <p className="mb-2">
                For a weak acid HA that dissociates as HA ⇌ H⁺ + A⁻, the acid dissociation constant is:
              </p>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                <div className="text-lg font-medium">Ka = [H⁺][A⁻] / [HA]</div>
                <div className="text-sm mt-1">pKa = -log(Ka)</div>
              </div>
              <div className="mt-3 text-sm">
                <strong>Stronger acids</strong> have larger Ka values (smaller pKa values).
                <br />
                <strong>Weaker acids</strong> have smaller Ka values (larger pKa values).
              </div>
            </div>

            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Base Dissociation Constant (Kb)</h3>
              <p className="mb-2">
                For a weak base B that reacts with water as B + H₂O ⇌ BH⁺ + OH⁻, the base dissociation constant is:
              </p>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                <div className="text-lg font-medium">Kb = [BH⁺][OH⁻] / [B]</div>
                <div className="text-sm mt-1">pKb = -log(Kb)</div>
              </div>
              <div className="mt-3 text-sm">
                <strong>Stronger bases</strong> have larger Kb values (smaller pKb values).
                <br />
                <strong>Weaker bases</strong> have smaller Kb values (larger pKb values).
              </div>
            </div>
          </div>

          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Buffer Solutions</h3>
            <p className="mb-3">
              Buffer solutions resist changes in pH when small amounts of acid or base are added. They consist of a weak
              acid and its conjugate base (or a weak base and its conjugate acid).
            </p>
            <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
              <div className="font-medium">Henderson-Hasselbalch Equation:</div>
              <div className="text-center my-2 text-lg">pH = pKa + log([A⁻] / [HA])</div>
              <div className="text-sm">
                <strong>Buffer Capacity:</strong> Maximum amount of acid or base that can be added before significant pH
                change occurs.
                <br />
                <strong>Optimal Buffering:</strong> When pH ≈ pKa (or when [A⁻] ≈ [HA])
              </div>
            </div>
            <div className="mt-3 text-sm">
              <strong>Common Buffer Systems:</strong>
              <ul className="list-disc pl-5 mt-1">
                <li>Acetic acid/Acetate (pKa ≈ 4.7)</li>
                <li>Carbonic acid/Bicarbonate (pKa ≈ 6.4)</li>
                <li>Phosphate (H₂PO₄⁻/HPO₄²⁻) (pKa ≈ 7.2)</li>
                <li>TRIS buffer (pKa ≈ 8.1)</li>
                <li>Ammonia/Ammonium (pKa ≈ 9.2)</li>
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
function SolutionAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* Beaker */}
        <div className="absolute inset-0 border-2 border-gray-400 rounded-b-lg">
          {/* Water */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-blue-300/50 dark:bg-blue-600/50 rounded-b-lg">
            {/* Salt particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-3 h-3 rounded-full bg-white"
                initial={{
                  x: Math.random() * 100 + 20,
                  y: -10,
                  opacity: 1,
                }}
                animate={{
                  y: [0, 100, 100],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 5,
                }}
              />
            ))}

            {/* Dissolved ions */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`ion-${i}`}
                className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-blue-500" : "bg-green-500"}`}
                initial={{
                  x: Math.random() * 120 + 10,
                  y: Math.random() * 100 + 20,
                  opacity: 0,
                }}
                animate={{
                  x: [Math.random() * 120 + 10, Math.random() * 120 + 10, Math.random() * 120 + 10],
                  y: [Math.random() * 100 + 20, Math.random() * 100 + 20, Math.random() * 100 + 20],
                  opacity: [0, 0.8, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Labels */}
        <div className="absolute -top-8 left-0 right-0 text-center">
          <div className="text-sm font-medium">Solution</div>
          <div className="text-xs text-muted-foreground">Solute + Solvent</div>
        </div>

        <div className="absolute -bottom-16 left-0 right-0 text-center">
          <div className="text-xs">
            <span className="inline-block w-3 h-3 rounded-full bg-white mr-1"></span>
            Solute (e.g., salt)
          </div>
          <div className="text-xs">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-300 dark:bg-blue-600 mr-1"></span>
            Solvent (e.g., water)
          </div>
        </div>
      </div>
    </div>
  )
}

function ConcentrationAnimation({ concentration }: { concentration: number }) {
  // Calculate number of particles based on concentration
  const particleCount = Math.floor(concentration * 10)

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-40 h-40">
        {/* Beaker */}
        <div className="absolute inset-0 border-2 border-gray-400 rounded-b-lg">
          {/* Water */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-blue-300/50 dark:bg-blue-600/50 rounded-b-lg">
            {/* Dissolved ions */}
            {[...Array(particleCount)].map((_, i) => (
              <motion.div
                key={`ion-${i}`}
                className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? "bg-purple-500" : "bg-green-500"}`}
                initial={{
                  x: Math.random() * 120 + 10,
                  y: Math.random() * 100 + 20,
                }}
                animate={{
                  x: [Math.random() * 120 + 10, Math.random() * 120 + 10, Math.random() * 120 + 10],
                  y: [Math.random() * 100 + 20, Math.random() * 100 + 20, Math.random() * 100 + 20],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Labels */}
        <div className="absolute -top-8 left-0 right-0 text-center">
          <div className="text-sm font-medium">Concentration</div>
          <div className="text-xs text-muted-foreground">Particles per volume</div>
        </div>
      </div>
    </div>
  )
}

function ColligativePropertiesAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Pure Solvent</div>
          <div className="relative w-32 h-32 border-2 border-gray-400 rounded-b-lg">
            {/* Water */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-300/50 dark:bg-blue-600/50 rounded-b-lg">
              {/* Water molecules */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`water-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-blue-500"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Vapor molecules */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`vapor-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-blue-300"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: -20,
                  }}
                  animate={{
                    y: [-10, -30],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Ice crystals */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0 bg-blue-200/50 dark:bg-blue-400/50"
              animate={{
                height: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Freezing Point: 0°C</div>
            <div>Boiling Point: 100°C</div>
            <div>Higher Vapor Pressure</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Solution</div>
          <div className="relative w-32 h-32 border-2 border-gray-400 rounded-b-lg">
            {/* Solution */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-green-300/50 dark:bg-green-600/50 rounded-b-lg">
              {/* Water molecules */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={`sol-water-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-blue-500"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Solute particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`solute-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-yellow-500"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Vapor molecules (fewer) */}
              {[...Array(2)].map((_, i) => (
                <motion.div
                  key={`sol-vapor-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-green-300"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: -20,
                  }}
                  animate={{
                    y: [-10, -30],
                    opacity: [1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Ice crystals (less) */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0 bg-blue-200/50 dark:bg-blue-400/50"
              animate={{
                height: [0, 5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Freezing Point: &lt; 0°C</div>
            <div>Boiling Point: &gt; 100°C</div>
            <div>Lower Vapor Pressure</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm font-medium">
        Colligative properties depend on number of solute particles
      </div>
    </div>
  )
}

function AcidBaseSolutionAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-red-600 dark:text-red-400">Acid Solution</div>
          <div className="relative w-32 h-32 border-2 border-gray-400 rounded-b-lg">
            {/* Acid solution */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-red-300/50 dark:bg-red-600/50 rounded-b-lg">
              {/* H+ ions */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-red-500 flex items-center justify-center"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                >
                  <span className="text-[6px] text-white font-bold">H⁺</span>
                </motion.div>
              ))}

              {/* Anions */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`a-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-yellow-500 flex items-center justify-center"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                >
                  <span className="text-[6px] text-white font-bold">A⁻</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>pH &lt; 7</div>
            <div>High [H⁺]</div>
            <div>Example: HCl</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Base Solution</div>
          <div className="relative w-32 h-32 border-2 border-gray-400 rounded-b-lg">
            {/* Base solution */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-blue-300/50 dark:bg-blue-600/50 rounded-b-lg">
              {/* OH- ions */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`oh-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-blue-500 flex items-center justify-center"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                >
                  <span className="text-[6px] text-white font-bold">OH⁻</span>
                </motion.div>
              ))}

              {/* Cations */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`c-${i}`}
                  className="absolute w-3 h-3 rounded-full bg-purple-500 flex items-center justify-center"
                  initial={{
                    x: Math.random() * 100 + 10,
                    y: Math.random() * 80 + 10,
                  }}
                  animate={{
                    x: [Math.random() * 100 + 10, Math.random() * 100 + 10, Math.random() * 100 + 10],
                    y: [Math.random() * 80 + 10, Math.random() * 80 + 10, Math.random() * 80 + 10],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                >
                  <span className="text-[6px] text-white font-bold">M⁺</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>pH &gt; 7</div>
            <div>High [OH⁻]</div>
            <div>Example: NaOH</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm font-medium">
        pH = -log[H⁺] and pOH = -log[OH⁻], where pH + pOH = 14
      </div>
    </div>
  )
}

