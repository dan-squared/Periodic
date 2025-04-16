"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

export default function OrganicChemistryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [selectedFunctionalGroup, setSelectedFunctionalGroup] = useState<string | null>(null)

  const sections = [
    {
      title: "Introduction to Organic Chemistry",
      content: (
        <div className="space-y-4">
          <p>
            Organic chemistry is the study of carbon-containing compounds and their properties. Carbon's ability to form
            strong bonds with other carbon atoms and various elements leads to millions of different organic compounds.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Key Concepts:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Carbon:</strong> Forms 4 bonds, can create chains, rings, and 3D structures
              </li>
              <li>
                <strong>Hydrocarbons:</strong> Compounds containing only carbon and hydrogen
              </li>
              <li>
                <strong>Functional Groups:</strong> Specific arrangements of atoms that give molecules characteristic
                properties
              </li>
              <li>
                <strong>Isomers:</strong> Compounds with the same molecular formula but different structures
              </li>
              <li>
                <strong>Homologous Series:</strong> Series of compounds with the same functional group but different
                carbon chain lengths
              </li>
            </ul>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 shadow-md">
            <div className="absolute inset-0 flex items-center justify-center">
              <CarbonBondingAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Importance of Organic Chemistry</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Pharmaceuticals:</strong> Most drugs are organic compounds
                </li>
                <li>
                  <strong>Materials:</strong> Plastics, fibers, dyes, and coatings
                </li>
                <li>
                  <strong>Energy:</strong> Fossil fuels, biofuels
                </li>
                <li>
                  <strong>Agriculture:</strong> Pesticides, fertilizers
                </li>
                <li>
                  <strong>Biochemistry:</strong> Understanding life processes
                </li>
                <li>
                  <strong>Food:</strong> Flavors, preservatives, nutrients
                </li>
              </ul>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Types of Organic Compounds</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Alkanes:</strong> Single bonds (C-C), saturated
                </li>
                <li>
                  <strong>Alkenes:</strong> Double bonds (C=C), unsaturated
                </li>
                <li>
                  <strong>Alkynes:</strong> Triple bonds (C≡C), unsaturated
                </li>
                <li>
                  <strong>Aromatics:</strong> Rings with delocalized electrons
                </li>
                <li>
                  <strong>Alcohols:</strong> Contain -OH group
                </li>
                <li>
                  <strong>Carboxylic Acids:</strong> Contain -COOH group
                </li>
                <li>
                  <strong>Amines:</strong> Contain nitrogen
                </li>
                <li>
                  <strong>Esters:</strong> Derived from acids and alcohols
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Functional Groups",
      content: (
        <div className="space-y-4">
          <p>
            Functional groups are specific arrangements of atoms within organic molecules that give the molecule
            characteristic chemical properties. They are the reactive centers of organic molecules.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">Common Functional Groups:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {[
                { name: "Alkyl", formula: "R-H", example: "Methane (CH₄)" },
                { name: "Alkene", formula: "R-CH=CH-R", example: "Ethene (C₂H₄)" },
                { name: "Alkyne", formula: "R-C≡C-R", example: "Ethyne (C₂H₂)" },
                { name: "Alcohol", formula: "R-OH", example: "Ethanol (C₂H₅OH)" },
                { name: "Aldehyde", formula: "R-CHO", example: "Acetaldehyde (CH₃CHO)" },
                { name: "Ketone", formula: "R-CO-R", example: "Acetone (CH₃COCH₃)" },
                { name: "Carboxylic Acid", formula: "R-COOH", example: "Acetic acid (CH₃COOH)" },
                { name: "Ester", formula: "R-COO-R", example: "Ethyl acetate (CH₃COOC₂H₅)" },
                { name: "Ether", formula: "R-O-R", example: "Diethyl ether (C₂H₅OC₂H₅)" },
                { name: "Amine", formula: "R-NH₂", example: "Methylamine (CH₃NH₂)" },
                { name: "Amide", formula: "R-CONH₂", example: "Acetamide (CH₃CONH₂)" },
                { name: "Halide", formula: "R-X", example: "Chloromethane (CH₃Cl)" },
              ].map((group, index) => (
                <button
                  key={index}
                  className={`p-2 border rounded-lg text-center text-xs transition-colors ${
                    selectedFunctionalGroup === group.name
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-white/50 dark:bg-black/20 hover:bg-muted"
                  }`}
                  onClick={() => setSelectedFunctionalGroup(group.name)}
                >
                  <div className="font-medium">{group.name}</div>
                  <div>{group.formula}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 shadow-md mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <FunctionalGroupAnimation selectedGroup={selectedFunctionalGroup} />
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Properties of Functional Groups</h3>
            <div className="space-y-2">
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Polarity</div>
                <div className="text-sm">
                  Functional groups create polar regions in molecules, affecting solubility, boiling points, and
                  reactivity.
                </div>
              </div>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Hydrogen Bonding</div>
                <div className="text-sm">
                  Groups like -OH and -NH can form hydrogen bonds, increasing boiling points and affecting solubility.
                </div>
              </div>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Acidity/Basicity</div>
                <div className="text-sm">
                  Carboxylic acids are acidic; amines are basic. These properties affect reactivity.
                </div>
              </div>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Reactivity</div>
                <div className="text-sm">Functional groups determine how molecules react with other substances.</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "IUPAC Nomenclature",
      content: (
        <div className="space-y-4">
          <p>
            IUPAC (International Union of Pure and Applied Chemistry) nomenclature provides a systematic way to name
            organic compounds. This system allows chemists to communicate molecular structures precisely.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Basic Rules for Naming:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Identify the longest continuous carbon chain (parent chain)</li>
              <li>Number the carbon atoms in the parent chain to give substituents the lowest possible numbers</li>
              <li>Identify and name all substituents</li>
              <li>Arrange substituents in alphabetical order with appropriate numbers</li>
              <li>Add prefixes (di-, tri-, tetra-) for multiple identical substituents</li>
              <li>Add suffixes for functional groups (-ol for alcohols, -al for aldehydes, etc.)</li>
            </ol>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 shadow-md mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <NomenclatureAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Prefixes for Carbon Chain Length</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Meth-</div>
                  <div className="text-sm">1 carbon</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Eth-</div>
                  <div className="text-sm">2 carbons</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Prop-</div>
                  <div className="text-sm">3 carbons</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">But-</div>
                  <div className="text-sm">4 carbons</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Pent-</div>
                  <div className="text-sm">5 carbons</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Hex-</div>
                  <div className="text-sm">6 carbons</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Hept-</div>
                  <div className="text-sm">7 carbons</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                  <div className="font-medium">Oct-</div>
                  <div className="text-sm">8 carbons</div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Suffixes for Functional Groups</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-ane</div>
                  <div className="text-sm">Alkane (single bonds)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-ene</div>
                  <div className="text-sm">Alkene (double bond)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-yne</div>
                  <div className="text-sm">Alkyne (triple bond)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-ol</div>
                  <div className="text-sm">Alcohol (-OH)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-al</div>
                  <div className="text-sm">Aldehyde (-CHO)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-one</div>
                  <div className="text-sm">Ketone (-CO-)</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">-oic acid</div>
                  <div className="text-sm">Carboxylic acid (-COOH)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Example: 2-Methylpropan-1-ol</h3>
            <div className="space-y-2">
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Breaking down the name:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>
                    <strong>propan-</strong>: 3-carbon chain
                  </li>
                  <li>
                    <strong>-1-ol</strong>: alcohol group (-OH) on carbon 1
                  </li>
                  <li>
                    <strong>2-Methyl-</strong>: methyl group (-CH₃) on carbon 2
                  </li>
                </ul>
              </div>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 text-center">
                <div className="font-medium">Structure:</div>
                <div className="text-sm mt-1">CH₃-CH(CH₃)-CH₂-OH</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Isomerism",
      content: (
        <div className="space-y-4">
          <p>
            Isomers are compounds with the same molecular formula but different structures. The arrangement of atoms
            affects the physical and chemical properties of the compounds.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Types of Isomerism:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Structural Isomerism:</strong> Different arrangement of atoms
              </li>
              <li>
                <strong>Stereoisomerism:</strong> Same connectivity but different spatial arrangement
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Structural Isomerism</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Chain Isomerism:</div>
                  <div className="text-sm">Different arrangements of the carbon skeleton</div>
                  <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 mt-1 text-center">
                    <div className="text-sm">Butane vs. 2-Methylpropane (C₄H₁₀)</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Position Isomerism:</div>
                  <div className="text-sm">Same carbon skeleton but functional group in different positions</div>
                  <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 mt-1 text-center">
                    <div className="text-sm">Propan-1-ol vs. Propan-2-ol (C₃H₈O)</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Functional Group Isomerism:</div>
                  <div className="text-sm">Different functional groups</div>
                  <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 mt-1 text-center">
                    <div className="text-sm">Ethanol vs. Dimethyl ether (C₂H₆O)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Stereoisomerism</h3>
              <div className="space-y-3">
                <div>
                  <div className="font-medium">Geometric Isomerism (cis-trans):</div>
                  <div className="text-sm">Different arrangement of groups around a double bond or ring</div>
                  <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 mt-1 text-center">
                    <div className="text-sm">cis-2-butene vs. trans-2-butene</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Optical Isomerism:</div>
                  <div className="text-sm">Mirror images that cannot be superimposed (chiral molecules)</div>
                  <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 mt-1 text-center">
                    <div className="text-sm">L-alanine vs. D-alanine</div>
                  </div>
                </div>

                <div>
                  <div className="font-medium">Conformational Isomerism:</div>
                  <div className="text-sm">Different arrangements due to rotation around single bonds</div>
                  <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20 mt-1 text-center">
                    <div className="text-sm">Staggered vs. eclipsed conformations of ethane</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 shadow-md mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <IsomerismAnimation />
            </div>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Importance of Isomerism</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Pharmaceuticals:</strong> Different isomers can have different biological activities (e.g.,
                thalidomide)
              </li>
              <li>
                <strong>Flavors and Fragrances:</strong> Different isomers can have different smells and tastes
              </li>
              <li>
                <strong>Material Properties:</strong> Isomers can have different physical properties (e.g.,
                polyethylene)
              </li>
              <li>
                <strong>Biochemistry:</strong> Many biological molecules are specific isomers (e.g., amino acids,
                sugars)
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "Organic Reactions",
      content: (
        <div className="space-y-4">
          <p>
            Organic reactions involve the transformation of organic compounds through the breaking and forming of bonds.
            Understanding these reactions is essential for synthesizing new compounds and understanding biological
            processes.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Common Types of Organic Reactions:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Substitution:</strong> One atom or group replaces another
              </li>
              <li>
                <strong>Addition:</strong> Atoms or groups add across a multiple bond
              </li>
              <li>
                <strong>Elimination:</strong> Removal of atoms or groups to form a multiple bond
              </li>
              <li>
                <strong>Rearrangement:</strong> Atoms within a molecule reorganize
              </li>
              <li>
                <strong>Oxidation-Reduction:</strong> Change in oxidation state
              </li>
            </ul>
          </div>

          <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 shadow-md mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <OrganicReactionAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Substitution Reactions</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">SN1 (Unimolecular Nucleophilic Substitution):</div>
                  <div className="text-sm">Two-step process: leaving group departs, then nucleophile attacks</div>
                  <div className="text-sm mt-1">Example: (CH₃)₃C-Br + OH⁻ → (CH₃)₃C-OH + Br⁻</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">SN2 (Bimolecular Nucleophilic Substitution):</div>
                  <div className="text-sm">One-step process: nucleophile attacks as leaving group departs</div>
                  <div className="text-sm mt-1">Example: CH₃-Br + OH⁻ → CH₃-OH + Br⁻</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Electrophilic Aromatic Substitution:</div>
                  <div className="text-sm">Substitution on aromatic rings</div>
                  <div className="text-sm mt-1">Example: Nitration of benzene</div>
                </div>
              </div>
            </div>

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-medium mb-2">Addition Reactions</h3>
              <div className="space-y-2">
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Electrophilic Addition:</div>
                  <div className="text-sm">Addition to alkenes and alkynes</div>
                  <div className="text-sm mt-1">Example: H-Br + CH₂=CH₂ → CH₃-CH₂-Br</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Nucleophilic Addition:</div>
                  <div className="text-sm">Addition to carbonyl groups</div>
                  <div className="text-sm mt-1">Example: NaBH₄ + CH₃CHO → CH₃CH₂OH</div>
                </div>
                <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                  <div className="font-medium">Cycloaddition:</div>
                  <div className="text-sm">Formation of rings</div>
                  <div className="text-sm mt-1">Example: Diels-Alder reaction</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Reaction Mechanisms</h3>
            <p className="mb-3">
              Reaction mechanisms describe the step-by-step process of how a reaction occurs, including the movement of
              electrons and the formation/breaking of bonds.
            </p>
            <div className="space-y-2">
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Key Components:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>Electron movement (curved arrows)</li>
                  <li>Intermediates and transition states</li>
                  <li>Rate-determining step</li>
                  <li>Stereochemistry</li>
                </ul>
              </div>
              <div className="p-2 border rounded-lg bg-white/50 dark:bg-black/20">
                <div className="font-medium">Factors Affecting Reactions:</div>
                <ul className="list-disc pl-5 text-sm">
                  <li>Steric effects (bulky groups)</li>
                  <li>Electronic effects (electron-donating or withdrawing groups)</li>
                  <li>Solvent effects</li>
                  <li>Temperature and pressure</li>
                  <li>Catalysts</li>
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

// Animation components
function CarbonBondingAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Carbon Bonding</div>
        <div className="text-sm text-muted-foreground">Tetrahedral structure with 4 bonds</div>
      </div>

      <div className="relative w-60 h-60">
        {/* Central carbon atom */}
        <motion.div
          className="absolute w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-200 flex items-center justify-center text-white dark:text-gray-800 font-bold"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          C
        </motion.div>

        {/* Hydrogen atoms */}
        <motion.div
          className="absolute w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          style={{ left: "25%", top: "25%" }}
          animate={{
            x: [0, 5, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          H
        </motion.div>

        <motion.div
          className="absolute w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          style={{ right: "25%", top: "25%" }}
          animate={{
            x: [0, -5, 0],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          H
        </motion.div>

        <motion.div
          className="absolute w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          style={{ left: "25%", bottom: "25%" }}
          animate={{
            x: [0, 5, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          H
        </motion.div>

        <motion.div
          className="absolute w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          style={{ right: "25%", bottom: "25%" }}
          animate={{
            x: [0, -5, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          H
        </motion.div>

        {/* Bonds */}
        <div
          className="absolute w-[2px] h-24 bg-gray-500 dark:bg-gray-300"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -100%) rotate(-45deg)",
            transformOrigin: "bottom",
          }}
        ></div>
        <div
          className="absolute w-[2px] h-24 bg-gray-500 dark:bg-gray-300"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -100%) rotate(45deg)",
            transformOrigin: "bottom",
          }}
        ></div>
        <div
          className="absolute w-[2px] h-24 bg-gray-500 dark:bg-gray-300"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, 0%) rotate(-45deg)", transformOrigin: "top" }}
        ></div>
        <div
          className="absolute w-[2px] h-24 bg-gray-500 dark:bg-gray-300"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, 0%) rotate(45deg)", transformOrigin: "top" }}
        ></div>
      </div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Methane (CH₄)</div>
        <div className="text-muted-foreground">Simplest organic compound</div>
      </div>
    </div>
  )
}

function FunctionalGroupAnimation({ selectedGroup }: { selectedGroup: string | null }) {
  // If no group is selected, show a prompt
  if (!selectedGroup) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-lg font-medium mb-2">Select a Functional Group</div>
          <div className="text-sm text-muted-foreground">Click on a group above to see its structure</div>
        </div>
      </div>
    )
  }

  // Render different functional group visualizations based on selection
  const renderGroup = () => {
    // Common styles for atoms and bonds
    const atomStyle = "w-14 h-14 rounded-full flex items-center justify-center text-white font-bold shadow-md"
    const bondStyle = "h-1.5 bg-gray-500 dark:bg-gray-300"
    
    switch (selectedGroup) {
      case "Alkyl":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-blue-500`}>H</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Alkyl (R-H)</div>
              <div className="text-sm text-muted-foreground">Simplest hydrocarbon group</div>
            </div>
          </div>
        )
      case "Alkene":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              {/* Double bond */}
              <div className="relative mx-3 w-8">
                <div className={`${bondStyle} absolute top-1`}></div>
                <div className={`${bondStyle} absolute bottom-1`}></div>
              </div>
              <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Alkene (C=C)</div>
              <div className="text-sm text-muted-foreground">Contains carbon-carbon double bond</div>
            </div>
          </div>
        )
      case "Alkyne":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              {/* Triple bond */}
              <div className="relative mx-3 w-8">
                <div className={`${bondStyle} absolute top-2`}></div>
                <div className={`${bondStyle} absolute top-1/2 -translate-y-1/2`}></div>
                <div className={`${bondStyle} absolute bottom-2`}></div>
              </div>
              <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Alkyne (C≡C)</div>
              <div className="text-sm text-muted-foreground">Contains carbon-carbon triple bond</div>
            </div>
          </div>
        )
      case "Alcohol":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-700`}>R</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-red-500`}>O</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-blue-500`}>H</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Alcohol (-OH)</div>
              <div className="text-sm text-muted-foreground">Polar, can form hydrogen bonds</div>
            </div>
          </div>
        )
      case "Aldehyde":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8 h-40 w-48 flex items-center justify-center">
              {/* Top part - C=O */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center">
                <div className={`${atomStyle} bg-gray-700`}>R</div>
                <div className={`${bondStyle} w-8 mx-1`}></div>
                <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              </div>
              
              {/* Double bond to oxygen (vertical) */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 h-12 w-1.5 flex items-center justify-center">
                <div className="relative h-full w-8">
                  <div className={`${bondStyle} absolute left-0 h-full w-1.5`}></div>
                  <div className={`${bondStyle} absolute right-0 h-full w-1.5`}></div>
                </div>
              </div>
              
              {/* Oxygen atom */}
              <div className="absolute bottom-0 left-[40%] -translate-x-1/2">
                <div className={`${atomStyle} bg-red-500`}>O</div>
              </div>
              
              {/* Bond to hydrogen */}
              <div className="absolute top-14 right-4 h-12 w-1.5 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* Hydrogen atom */}
              <div className="absolute bottom-0 right-0">
                <div className={`${atomStyle} bg-blue-500`}>H</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Aldehyde (-CHO)</div>
              <div className="text-sm text-muted-foreground">Reactive carbonyl group</div>
            </div>
          </div>
        )
      case "Ketone":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-700`}>R</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              {/* Double bond */}
              <div className="relative mx-3 w-8">
                <div className={`${bondStyle} absolute top-1`}></div>
                <div className={`${bondStyle} absolute bottom-1`}></div>
              </div>
              <div className={`${atomStyle} bg-red-500`}>O</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Ketone (R-CO-R')</div>
              <div className="text-sm text-muted-foreground">Carbonyl between carbon atoms</div>
            </div>
          </div>
        )
      case "Carboxylic Acid":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8 h-44 w-48 flex items-center justify-center">
              {/* Top part - R-C */}
              <div className="absolute top-0 left-1/4 -translate-x-1/2 flex items-center">
                <div className={`${atomStyle} bg-gray-700`}>R</div>
                <div className={`${bondStyle} w-8 mx-1`}></div>
                <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              </div>
              
              {/* Double bond to first oxygen (diagonal) */}
              <div className="absolute top-12 left-1/3 w-16 transform -rotate-45">
                <div className="relative h-1.5 w-full">
                  <div className={`${bondStyle} absolute top-0 w-full`}></div>
                  <div className={`${bondStyle} absolute bottom-0 w-full`}></div>
                </div>
              </div>
              
              {/* First oxygen atom */}
              <div className="absolute top-24 left-1/2">
                <div className={`${atomStyle} bg-red-500`}>O</div>
              </div>
              
              {/* Single bond to second oxygen (horizontal) */}
              <div className="absolute top-8 right-1/3 w-16 transform rotate-45">
                <div className={`${bondStyle} w-full`}></div>
              </div>
              
              {/* Second oxygen atom */}
              <div className="absolute top-0 right-1/4 translate-x-1/2">
                <div className={`${atomStyle} bg-red-500`}>O</div>
              </div>
              
              {/* Bond to hydrogen */}
              <div className="absolute top-0 right-0 w-8 h-1.5 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* Hydrogen atom */}
              <div className="absolute top-0 right-0 translate-x-full">
                <div className={`${atomStyle} bg-blue-500`}>H</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Carboxylic Acid (-COOH)</div>
              <div className="text-sm text-muted-foreground">Acidic, can donate H⁺</div>
            </div>
          </div>
        )
      case "Ester":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8 h-44 w-48 flex items-center justify-center">
              {/* Top part - R-C */}
              <div className="absolute top-0 left-1/4 -translate-x-1/2 flex items-center">
                <div className={`${atomStyle} bg-gray-700`}>R</div>
                <div className={`${bondStyle} w-8 mx-1`}></div>
                <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              </div>
              
              {/* Double bond to first oxygen (diagonal) */}
              <div className="absolute top-12 left-1/3 w-16 transform -rotate-45">
                <div className="relative h-1.5 w-full">
                  <div className={`${bondStyle} absolute top-0 w-full`}></div>
                  <div className={`${bondStyle} absolute bottom-0 w-full`}></div>
                </div>
              </div>
              
              {/* First oxygen atom */}
              <div className="absolute top-24 left-1/2">
                <div className={`${atomStyle} bg-red-500`}>O</div>
              </div>
              
              {/* Single bond to second oxygen (horizontal) */}
              <div className="absolute top-8 right-1/3 w-16 transform rotate-45">
                <div className={`${bondStyle} w-full`}></div>
              </div>
              
              {/* Second oxygen atom */}
              <div className="absolute top-0 right-1/4 translate-x-1/2">
                <div className={`${atomStyle} bg-red-500`}>O</div>
              </div>
              
              {/* Bond to R' group */}
              <div className="absolute top-0 right-0 w-8 h-1.5 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* R' group */}
              <div className="absolute top-0 right-0 translate-x-full">
                <div className={`${atomStyle} bg-gray-700`}>R'</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Ester (-COO-R')</div>
              <div className="text-sm text-muted-foreground">Fruity odor, used in flavors</div>
            </div>
          </div>
        )
      case "Ether":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-700`}>R</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-red-500`}>O</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-gray-700`}>R'</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Ether (R-O-R')</div>
              <div className="text-sm text-muted-foreground">Oxygen connecting two carbon groups</div>
            </div>
          </div>
        )
      case "Amine":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8 h-40 w-48 flex items-center justify-center">
              {/* Carbon atom */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div className={`${atomStyle} bg-gray-700`}>R</div>
              </div>
              
              {/* Bond to nitrogen */}
              <div className="absolute top-14 left-1/2 -translate-x-1/2 h-12 w-1.5 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* Nitrogen atom */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className={`${atomStyle} bg-purple-500`}>N</div>
              </div>
              
              {/* Bond to first hydrogen */}
              <div className="absolute bottom-14 left-1/3 h-12 w-1.5 transform -rotate-30 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* First hydrogen atom */}
              <div className="absolute bottom-0 left-1/4">
                <div className={`${atomStyle} bg-blue-500`}>H</div>
              </div>
              
              {/* Bond to second hydrogen */}
              <div className="absolute bottom-14 right-1/3 h-12 w-1.5 transform rotate-30 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* Second hydrogen atom */}
              <div className="absolute bottom-0 right-1/4">
                <div className={`${atomStyle} bg-blue-500`}>H</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Amine (-NH₂)</div>
              <div className="text-sm text-muted-foreground">Basic, contains nitrogen</div>
            </div>
          </div>
        )
      case "Amide":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="relative mb-8 h-44 w-48 flex items-center justify-center">
              {/* Top part - R-C */}
              <div className="absolute top-0 left-1/4 -translate-x-1/2 flex items-center">
                <div className={`${atomStyle} bg-gray-700`}>R</div>
                <div className={`${bondStyle} w-8 mx-1`}></div>
                <div className={`${atomStyle} bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800`}>C</div>
              </div>
              
              {/* Double bond to oxygen (diagonal) */}
              <div className="absolute top-12 left-1/3 w-16 transform -rotate-45">
                <div className="relative h-1.5 w-full">
                  <div className={`${bondStyle} absolute top-0 w-full`}></div>
                  <div className={`${bondStyle} absolute bottom-0 w-full`}></div>
                </div>
              </div>
              
              {/* Oxygen atom */}
              <div className="absolute top-24 left-1/2">
                <div className={`${atomStyle} bg-red-500`}>O</div>
              </div>
              
              {/* Single bond to nitrogen (horizontal) */}
              <div className="absolute top-8 right-1/3 w-16 transform rotate-45">
                <div className={`${bondStyle} w-full`}></div>
              </div>
              
              {/* Nitrogen atom */}
              <div className="absolute top-0 right-1/4 translate-x-1/2">
                <div className={`${atomStyle} bg-purple-500`}>N</div>
              </div>
              
              {/* Bonds to hydrogens */}
              <div className="absolute top-0 right-4 h-8 w-1.5 transform rotate-30 bg-gray-500 dark:bg-gray-300"></div>
              <div className="absolute top-0 right-0 h-8 w-1.5 transform rotate-60 bg-gray-500 dark:bg-gray-300"></div>
              
              {/* Hydrogen atoms */}
              <div className="absolute top-8 right-6">
                <div className={`${atomStyle} bg-blue-500`}>H</div>
              </div>
              <div className="absolute top-8 right-0">
                <div className={`${atomStyle} bg-blue-500`}>H</div>
              </div>
            </div>
            <div className="text-center">
              <div className="font-medium">Amide (-CONH₂)</div>
              <div className="text-sm text-muted-foreground">Found in proteins, forms peptide bonds</div>
            </div>
          </div>
        )
      case "Halide":
        return (
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center mb-6">
              <div className={`${atomStyle} bg-gray-700`}>R</div>
              <div className={`${bondStyle} w-8 mx-1`}></div>
              <div className={`${atomStyle} bg-green-500`}>X</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Halide (R-X)</div>
              <div className="text-sm text-muted-foreground">X = F, Cl, Br, or I</div>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center">
            <div className="text-lg font-medium mb-2">{selectedGroup}</div>
            <div className="text-sm text-muted-foreground">Functional group visualization</div>
          </div>
        )
    }
  }

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-4"
      >
        {renderGroup()}
      </motion.div>
    </div>
  )
}

function NomenclatureAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">IUPAC Nomenclature</div>
        <div className="text-sm text-muted-foreground">2-methylbutan-1-ol</div>
      </div>

      <div className="relative">
        <svg width="300" height="160" viewBox="0 0 300 160">
          {/* Carbon chain */}
          <line x1="50" y1="80" x2="250" y2="80" stroke="currentColor" strokeWidth="2" />

          {/* Carbon atoms */}
          <circle cx="50" cy="80" r="15" fill="#374151" className="dark:fill-gray-300" />
          <text x="50" y="85" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
            C
          </text>
          <text x="50" y="110" textAnchor="middle" className="text-xs">
            1
          </text>

          <circle cx="100" cy="80" r="15" fill="#374151" className="dark:fill-gray-300" />
          <text x="100" y="85" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
            C
          </text>
          <text x="100" y="110" textAnchor="middle" className="text-xs">
            2
          </text>

          <circle cx="150" cy="80" r="15" fill="#374151" className="dark:fill-gray-300" />
          <text x="150" y="85" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
            C
          </text>
          <text x="150" y="110" textAnchor="middle" className="text-xs">
            3
          </text>

          <circle cx="200" cy="80" r="15" fill="#374151" className="dark:fill-gray-300" />
          <text x="200" y="85" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
            C
          </text>
          <text x="200" y="110" textAnchor="middle" className="text-xs">
            4
          </text>

          {/* Methyl group */}
          <line x1="100" y1="80" x2="100" y2="40" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="40" r="15" fill="#374151" className="dark:fill-gray-300" />
          <text x="100" y="45" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
            C
          </text>
          <text x="100" y="20" textAnchor="middle" className="text-xs text-blue-500 font-medium">
            methyl
          </text>

          {/* Alcohol group */}
          <line x1="50" y1="80" x2="20" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="20" cy="50" r="15" fill="#ef4444" />
          <text x="20" y="55" textAnchor="middle" fill="white" className="text-sm font-bold">
            O
          </text>
          <text x="0" y="30" textAnchor="middle" className="text-xs text-red-500 font-medium">
            -ol
          </text>

          <line x1="20" y1="50" x2="0" y2="70" stroke="currentColor" strokeWidth="2" />
          <circle cx="0" cy="70" r="10" fill="#3b82f6" />
          <text x="0" y="75" textAnchor="middle" fill="white" className="text-sm font-bold">
            H
          </text>

          {/* Hydrogens (simplified) */}
          <text x="250" y="80" className="text-sm">
            + H atoms
          </text>
        </svg>

        <div className="mt-4 text-center">
          <div className="text-sm">
            <span className="text-blue-500 font-medium">but</span>: 4-carbon chain
            <span className="mx-2">+</span>
            <span className="text-green-500 font-medium">2-methyl</span>: methyl at position 2
            <span className="mx-2">+</span>
            <span className="text-red-500 font-medium">1-ol</span>: -OH at position 1
          </div>
        </div>
      </div>
    </div>
  )
}

function IsomerismAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2">Structural Isomers</div>
          <div className="relative w-40 h-40 border-2 border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 flex items-center justify-center">
            <svg width="120" height="100" viewBox="0 0 120 100">
              {/* Butane */}
              <line x1="20" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
              <circle cx="20" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="40" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="60" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="80" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="100" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <text x="60" y="80" textAnchor="middle" className="text-xs">
                Butane
              </text>
            </svg>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>C₄H₁₀</div>
            <div>Straight chain</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2">Same Formula</div>
          <div className="relative w-40 h-40 border-2 border-blue-400 rounded-lg bg-blue-100/50 dark:bg-blue-900/30 flex items-center justify-center">
            <svg width="120" height="100" viewBox="0 0 120 100">
              {/* 2-Methylpropane */}
              <line x1="40" y1="50" x2="80" y2="50" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="50" x2="60" y2="30" stroke="currentColor" strokeWidth="2" />
              <circle cx="40" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="60" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="80" cy="50" r="10" fill="#374151" className="dark:fill-gray-300" />
              <circle cx="60" cy="30" r="10" fill="#374151" className="dark:fill-gray-300" />
              <text x="60" y="80" textAnchor="middle" className="text-xs">
                2-Methylpropane
              </text>
            </svg>
          </div>
          <div className="mt-2 text-xs text-center">
            <div>C₄H₁₀</div>
            <div>Branched chain</div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-4 text-center text-sm font-medium"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        Same molecular formula, different structures
      </motion.div>
    </div>
  )
}

function OrganicReactionAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-lg font-medium">Addition Reaction</div>
        <div className="text-sm text-muted-foreground">Alkene + HBr → Alkyl Bromide</div>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="relative">
          <svg width="120" height="100" viewBox="0 0 120 100">
            {/* Ethene */}
            <circle cx="40" cy="50" r="15" fill="#374151" className="dark:fill-gray-300" />
            <text x="40" y="55" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
              C
            </text>

            <circle cx="80" cy="50" r="15" fill="#374151" className="dark:fill-gray-300" />
            <text x="80" y="55" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
              C
            </text>

            {/* Double bond */}
            <line x1="45" y1="45" x2="75" y2="45" stroke="currentColor" strokeWidth="2" />
            <line x1="45" y1="55" x2="75" y2="55" stroke="currentColor" strokeWidth="2" />

            <text x="60" y="80" textAnchor="middle" className="text-xs">
              Ethene
            </text>
          </svg>
        </div>

        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            H
          </div>
          <div className="w-1 h-1 bg-gray-500 dark:bg-gray-300 mx-1"></div>
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
            Br
          </div>
        </div>

        <motion.div
          className="text-2xl font-bold"
          animate={{
            x: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          →
        </motion.div>

        <div className="relative">
          <svg width="140" height="100" viewBox="0 0 140 100">
            {/* Bromoethane */}
            <circle cx="40" cy="50" r="15" fill="#374151" className="dark:fill-gray-300" />
            <text x="40" y="55" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
              C
            </text>

            <circle cx="80" cy="50" r="15" fill="#374151" className="dark:fill-gray-300" />
            <text x="80" y="55" textAnchor="middle" fill="white" className="dark:fill-gray-800 text-sm font-bold">
              C
            </text>

            {/* Single bond */}
            <line x1="45" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="2" />

            {/* H and Br */}
            <line x1="80" y1="50" x2="110" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="110" cy="30" r="15" fill="#ef4444" />
            <text x="110" y="35" textAnchor="middle" fill="white" className="text-sm font-bold">
              Br
            </text>

            <line x1="40" y1="50" x2="20" y2="30" stroke="currentColor" strokeWidth="2" />
            <circle cx="20" cy="30" r="10" fill="#3b82f6" />
            <text x="20" y="35" textAnchor="middle" fill="white" className="text-sm font-bold">
              H
            </text>

            <text x="70" y="80" textAnchor="middle" className="text-xs">
              Bromoethane
            </text>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-4 text-center text-sm">
        <div className="font-medium">Addition Reaction</div>
        <div className="text-muted-foreground">Double bond is converted to single bond</div>
      </div>
    </div>
  )
}

