"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  ChevronLeft,
  FlaskRoundIcon as Flask,
  Atom,
  Zap,
  Beaker,
  Check,
  X,
  HelpCircle,
  RefreshCw,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function InorganicChemistryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState({})

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "coordination", title: "Coordination Compounds" },
    { id: "transition", title: "Transition Metals" },
    { id: "main-group", title: "Main Group Elements" },
    { id: "crystal-field", title: "Crystal Field Theory" },
    { id: "practice", title: "Practice" },
  ]

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer,
    })
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  const toggleExplanation = (questionId) => {
    setShowExplanation({
      ...showExplanation,
      [questionId]: !showExplanation[questionId],
    })
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
    setShowExplanation({})
  }

  const quizQuestions = [
    {
      id: 1,
      question: "Which of the following is NOT a transition metal?",
      options: ["Iron (Fe)", "Copper (Cu)", "Calcium (Ca)", "Zinc (Zn)"],
      correctAnswer: "Calcium (Ca)",
      explanation:
        "Calcium is a Group 2 element (alkaline earth metal) in the s-block, not a transition metal. Transition metals are d-block elements.",
    },
    {
      id: 2,
      question: "What is the coordination number of the central metal ion in [Fe(CN)₆]³⁻?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "6",
      explanation:
        "The coordination number is the number of donor atoms bonded to the central metal ion. In [Fe(CN)₆]³⁻, there are 6 CN⁻ ligands coordinated to the iron ion.",
    },
    {
      id: 3,
      question: "Which of the following is a bidentate ligand?",
      options: ["Cl⁻", "NH₃", "H₂O", "Ethylenediamine (en)"],
      correctAnswer: "Ethylenediamine (en)",
      explanation:
        "Ethylenediamine (en) is a bidentate ligand because it can form two coordinate bonds with a metal ion through its two nitrogen atoms.",
    },
    {
      id: 4,
      question:
        "According to Crystal Field Theory, which d-orbitals experience greater repulsion in an octahedral complex?",
      options: ["dxy, dyz, dxz", "dx²-y², dz²", "All d-orbitals equally", "None of the d-orbitals"],
      correctAnswer: "dx²-y², dz²",
      explanation:
        "In an octahedral complex, the dx²-y² and dz² orbitals (eg set) point directly toward the ligands and experience greater repulsion than the dxy, dyz, and dxz orbitals (t2g set).",
    },
    {
      id: 5,
      question: "Which of the following is a characteristic property of transition metals?",
      options: [
        "Low melting points",
        "Inability to form complexes",
        "Variable oxidation states",
        "Colorless compounds",
      ],
      correctAnswer: "Variable oxidation states",
      explanation:
        "Transition metals typically exhibit variable oxidation states due to the availability of d electrons for bonding.",
    },
    {
      id: 6,
      question: "What causes the color in transition metal complexes?",
      options: [
        "Nuclear transitions",
        "d-d electron transitions",
        "s-p electron transitions",
        "Vibrational energy changes",
      ],
      correctAnswer: "d-d electron transitions",
      explanation:
        "The color in transition metal complexes is typically due to d-d electron transitions, where electrons move between split d-orbitals, absorbing specific wavelengths of light.",
    },
  ]

  const calculateScore = () => {
    let correctCount = 0
    quizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        correctCount++
      }
    })
    return correctCount
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Flask className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">Inorganic Chemistry</span>
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
                key={section.id}
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

      <div className="min-h-[60vh]">
        {/* Introduction */}
        {activeSection === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="aspect-video relative overflow-hidden rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-amber-300 absolute left-0 top-0 animate-pulse"></div>
                  <div
                    className="w-20 h-20 rounded-full bg-orange-300 absolute right-0 top-0 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-20 h-20 rounded-full bg-yellow-300 absolute bottom-0 left-1/2 -translate-x-1/2 animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                    <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="2" />
                    <circle cx="100" cy="100" r="10" fill="white" />
                    <circle cx="160" cy="100" r="5" fill="white" />
                    <circle cx="70" cy="50" r="5" fill="white" />
                    <circle cx="70" cy="150" r="5" fill="white" />
                    <circle cx="130" cy="150" r="5" fill="white" />
                    <circle cx="130" cy="50" r="5" fill="white" />
                  </svg>
                </div>
              </div>
              <div className="relative z-10 text-white text-center p-6">
                <h2 className="text-2xl font-bold mb-2">Inorganic Chemistry</h2>
                <p className="max-w-md mx-auto">
                  Explore the fascinating world of inorganic compounds, coordination complexes, and the chemistry of the
                  elements
                </p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h2>What is Inorganic Chemistry?</h2>
              <p>
                Inorganic chemistry is the study of the synthesis, reactions, structures, and properties of compounds of
                all the elements except carbon (primarily studied in organic chemistry). This field encompasses the
                chemistry of non-organic compounds, including metals, minerals, and organometallic compounds.
              </p>

              <p>
                While organic chemistry focuses on carbon-based compounds (particularly hydrocarbons and their
                derivatives), inorganic chemistry covers the remaining elements in the periodic table and their
                compounds. However, the distinction is not always clear-cut, as organometallic compounds bridge both
                fields.
              </p>

              <h3>Key Areas of Inorganic Chemistry</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Atom className="h-5 w-5 text-blue-500" />
                      Coordination Chemistry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Study of compounds containing a central metal atom bonded to surrounding ligands, forming
                      coordination complexes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-amber-500" />
                      Main Group Chemistry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Chemistry of s-block and p-block elements, including metals, metalloids, and non-metals.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Beaker className="h-5 w-5 text-purple-500" />
                      Transition Metal Chemistry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Study of d-block elements, characterized by partially filled d-orbitals and variable oxidation
                      states.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3>Importance of Inorganic Chemistry</h3>
              <p>Inorganic chemistry plays a crucial role in numerous fields and applications:</p>

              <ul>
                <li>
                  <strong>Materials Science:</strong> Development of ceramics, superconductors, and nanomaterials
                </li>
                <li>
                  <strong>Catalysis:</strong> Design of catalysts for industrial processes and environmental remediation
                </li>
                <li>
                  <strong>Medicine:</strong> Creation of diagnostic agents, metal-based drugs, and contrast agents
                </li>
                <li>
                  <strong>Energy:</strong> Development of batteries, fuel cells, and solar energy conversion materials
                </li>
                <li>
                  <strong>Environmental Science:</strong> Understanding geochemical cycles and pollution remediation
                </li>
                <li>
                  <strong>Electronics:</strong> Production of semiconductors and electronic materials
                </li>
              </ul>

              <h3>Historical Context</h3>
              <p>
                Historically, inorganic chemistry is one of the oldest branches of chemistry. Ancient civilizations
                worked with metals, minerals, and pigments long before the formal development of chemistry as a science.
                The alchemists of the Middle Ages, while searching for the philosopher's stone and elixir of life,
                developed many techniques still used in inorganic chemistry today.
              </p>

              <p>
                Modern inorganic chemistry emerged in the 19th and 20th centuries with the development of coordination
                chemistry by Alfred Werner, the understanding of the periodic table, and advances in structural
                determination techniques like X-ray crystallography.
              </p>
            </div>
          </motion.div>
        )}

        {/* Coordination Compounds */}
        {activeSection === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Coordination Compounds</h2>
              <p>
                Coordination compounds (also known as coordination complexes) consist of a central metal atom or ion
                surrounded by bound molecules or ions, called ligands. These compounds are essential in understanding
                the chemistry of transition metals and have numerous applications in catalysis, materials science, and
                biology.
              </p>

              <h3>Structure of Coordination Compounds</h3>
              <p>A coordination compound typically consists of:</p>
              <ul>
                <li>
                  <strong>Central Metal Atom/Ion:</strong> Usually a transition metal with empty valence orbitals
                </li>
                <li>
                  <strong>Ligands:</strong> Molecules or ions that donate electron pairs to the metal
                </li>
                <li>
                  <strong>Coordination Sphere:</strong> The central metal and its directly attached ligands
                </li>
              </ul>
            </div>

            <div className="bg-muted/20 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Key Terminology</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Coordination Number</h4>
                  <p className="text-sm text-muted-foreground">
                    The number of donor atoms bonded to the central metal atom. Common coordination numbers include 2,
                    4, 6, and 8.
                  </p>
                  <div className="mt-2 text-xs">
                    <strong>Examples:</strong>
                    <ul className="list-disc pl-4 mt-1">
                      <li>[Ag(NH₃)₂]⁺ - Coordination number 2</li>
                      <li>[Ni(CN)₄]²⁻ - Coordination number 4</li>
                      <li>[Fe(CN)₆]³⁻ - Coordination number 6</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Ligands</h4>
                  <p className="text-sm text-muted-foreground">
                    Ions or molecules that donate electron pairs to the central metal atom. They can be classified by
                    the number of donor atoms they contain.
                  </p>
                  <div className="mt-2 text-xs">
                    <strong>Types:</strong>
                    <ul className="list-disc pl-4 mt-1">
                      <li>
                        <strong>Monodentate:</strong> One donor atom (e.g., Cl⁻, NH₃, H₂O)
                      </li>
                      <li>
                        <strong>Bidentate:</strong> Two donor atoms (e.g., ethylenediamine)
                      </li>
                      <li>
                        <strong>Polydentate:</strong> Multiple donor atoms (e.g., EDTA)
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Geometries</h4>
                  <p className="text-sm text-muted-foreground">
                    The spatial arrangement of ligands around the central metal atom, determined by coordination number
                    and electronic factors.
                  </p>
                  <div className="mt-2 text-xs">
                    <strong>Common geometries:</strong>
                    <ul className="list-disc pl-4 mt-1">
                      <li>
                        <strong>Linear:</strong> Coordination number 2
                      </li>
                      <li>
                        <strong>Tetrahedral or Square Planar:</strong> Coordination number 4
                      </li>
                      <li>
                        <strong>Octahedral:</strong> Coordination number 6
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg shadow-sm">
                  <h4 className="font-medium mb-2">Chelation</h4>
                  <p className="text-sm text-muted-foreground">
                    The formation of multiple bonds between a polydentate ligand and a central metal atom, creating a
                    ring structure.
                  </p>
                  <div className="mt-2 text-xs">
                    <strong>Significance:</strong>
                    <ul className="list-disc pl-4 mt-1">
                      <li>Increased stability (chelate effect)</li>
                      <li>Important in biological systems (e.g., hemoglobin)</li>
                      <li>Used in metal sequestration and therapy</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-80 border rounded-lg overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
              <div className="absolute inset-0 flex items-center justify-center">
                <CoordinationCompoundAnimation />
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Nomenclature of Coordination Compounds</h3>
              <p>Naming coordination compounds follows specific rules established by IUPAC:</p>

              <ol>
                <li>The cation is named before the anion</li>
                <li>Within the coordination entity, ligands are named before the metal</li>
                <li>Ligands are listed in alphabetical order, regardless of charge</li>
                <li>The oxidation state of the metal is indicated by Roman numerals in parentheses</li>
              </ol>

              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg my-4">
                <h4 className="font-medium">Example: K₃[Fe(CN)₆]</h4>
                <p className="text-sm">
                  <strong>Name:</strong> Potassium hexacyanoferrate(III)
                </p>
                <ul className="text-sm">
                  <li>Potassium (K⁺) is the cation</li>
                  <li>[Fe(CN)₆]³⁻ is the coordination anion</li>
                  <li>CN⁻ (cyano) ligands are listed before the metal (iron)</li>
                  <li>Prefix "hexa" indicates six cyano ligands</li>
                  <li>Iron has a +3 oxidation state, indicated by (III)</li>
                </ul>
              </div>

              <h3>Applications of Coordination Compounds</h3>
              <ul>
                <li>
                  <strong>Catalysis:</strong> Many industrial processes use coordination complexes as catalysts
                </li>
                <li>
                  <strong>Medicine:</strong> Platinum complexes (e.g., cisplatin) are used in cancer treatment
                </li>
                <li>
                  <strong>Analytical Chemistry:</strong> Metal complexes are used in qualitative and quantitative
                  analysis
                </li>
                <li>
                  <strong>Pigments and Dyes:</strong> Many colored compounds are coordination complexes
                </li>
                <li>
                  <strong>Metallurgy:</strong> Extraction and purification of metals often involve coordination
                  chemistry
                </li>
                <li>
                  <strong>Biological Systems:</strong> Essential in proteins like hemoglobin and enzymes
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Transition Metals */}
        {activeSection === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Transition Metals</h2>
              <p>
                Transition metals are elements in the d-block of the periodic table (groups 3-12). They are
                characterized by partially filled d-orbitals in their elemental or ionic states, which gives them unique
                properties and reactivity patterns.
              </p>

              <h3>Properties of Transition Metals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Variable Oxidation States</h4>
                  <p className="text-sm">
                    Transition metals can exhibit multiple oxidation states due to the availability of d electrons for
                    bonding.
                    <br />
                    <br />
                    <strong>Example:</strong> Manganese can exist in oxidation states from +2 to +7.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Formation of Colored Compounds</h4>
                  <p className="text-sm">
                    Many transition metal compounds are colored due to d-d electron transitions.
                    <br />
                    <br />
                    <strong>Example:</strong> Copper(II) compounds are typically blue or green.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Catalytic Activity</h4>
                  <p className="text-sm">
                    Transition metals and their compounds often serve as effective catalysts due to their ability to
                    change oxidation states.
                    <br />
                    <br />
                    <strong>Example:</strong> Iron in the Haber process, Platinum in catalytic converters.
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Complex Formation</h4>
                  <p className="text-sm">
                    Transition metals readily form coordination complexes with various ligands.
                    <br />
                    <br />
                    <strong>Example:</strong> [Fe(CN)₆]³⁻, [Cu(NH₃)₄]²⁺
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">The d-Block Elements</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-white/50 dark:bg-black/20">
                      <th className="border p-2">Period</th>
                      <th className="border p-2">Elements</th>
                      <th className="border p-2">d-Electron Configuration</th>
                      <th className="border p-2">Notable Characteristics</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 font-medium">Period 4</td>
                      <td className="border p-2">Sc, Ti, V, Cr, Mn, Fe, Co, Ni, Cu, Zn</td>
                      <td className="border p-2">3d¹-¹⁰</td>
                      <td className="border p-2">First row transition metals; widely used in industry</td>
                    </tr>
                    <tr className="bg-white/50 dark:bg-black/20">
                      <td className="border p-2 font-medium">Period 5</td>
                      <td className="border p-2">Y, Zr, Nb, Mo, Tc, Ru, Rh, Pd, Ag, Cd</td>
                      <td className="border p-2">4d¹-¹⁰</td>
                      <td className="border p-2">Second row; includes precious metals like silver and palladium</td>
                    </tr>
                    <tr>
                      <td className="border p-2 font-medium">Period 6</td>
                      <td className="border p-2">La, Hf, Ta, W, Re, Os, Ir, Pt, Au, Hg</td>
                      <td className="border p-2">5d¹-¹⁰</td>
                      <td className="border p-2">Third row; includes gold, platinum, and tungsten</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
              <div className="absolute inset-0 flex items-center justify-center">
                <TransitionMetalAnimation />
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Important Transition Metals and Their Applications</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Iron (Fe)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Most widely used metal in construction and manufacturing</li>
                      <li>Essential in hemoglobin for oxygen transport</li>
                      <li>Catalyst in the Haber process for ammonia production</li>
                      <li>Common oxidation states: +2, +3</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Copper (Cu)</CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Titanium (Ti)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 text-sm">
                      <li>Lightweight but strong metal used in aerospace</li>
                      <li>Excellent corrosion resistance</li>
                      <li>Used in medical implants due to biocompatibility</li>
                      <li>Common oxidation states: +2, +3, +4</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h3>Transition Metal Compounds</h3>
              <p>Transition metals form a wide variety of compounds with interesting properties:</p>

              <ul>
                <li>
                  <strong>Oxides:</strong> Many transition metal oxides are used as catalysts, pigments, and in ceramics
                </li>
                <li>
                  <strong>Halides:</strong> Used in organic synthesis and as Lewis acid catalysts
                </li>
                <li>
                  <strong>Organometallic Compounds:</strong> Contain metal-carbon bonds, important in catalysis
                </li>
                <li>
                  <strong>Coordination Complexes:</strong> Diverse structures with applications in catalysis, medicine,
                  and materials science
                </li>
              </ul>

              <h3>Biological Importance</h3>
              <p>Several transition metals are essential for biological processes:</p>
              <ul>
                <li>
                  <strong>Iron:</strong> Oxygen transport in hemoglobin, electron transport in cytochromes
                </li>
                <li>
                  <strong>Copper:</strong> Electron transfer in enzymes, oxygen transport in some invertebrates
                </li>
                <li>
                  <strong>Zinc:</strong> Structural role in proteins, component of many enzymes
                </li>
                <li>
                  <strong>Manganese:</strong> Essential for photosynthesis and as an enzyme cofactor
                </li>
                <li>
                  <strong>Cobalt:</strong> Component of vitamin B12, essential for red blood cell formation
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Main Group Elements */}
        {activeSection === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Main Group Elements</h2>
              <p>
                Main group elements (also called representative elements) include the s-block and p-block elements of
                the periodic table. These elements show more predictable chemical behavior compared to transition
                metals, with their properties largely determined by their valence electron configuration.
              </p>

              <h3>Classification of Main Group Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">s-Block Elements</h4>
                  <p className="text-sm">
                    Groups 1 (alkali metals) and 2 (alkaline earth metals)
                    <br />
                    <br />
                    <strong>Characteristics:</strong> Highly reactive metals, form ionic compounds, have low ionization
                    energies
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">p-Block Elements</h4>
                  <p className="text-sm">
                    Groups 13-18 (boron family through noble gases)
                    <br />
                    <br />
                    <strong>Characteristics:</strong> Include metals, metalloids, and non-metals; show a wide range of
                    chemical behaviors
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-900/30 dark:to-teal-900/30 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Key Groups in the Main Block</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/70 dark:bg-black/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Group 1: Alkali Metals</h4>
                  <p className="text-sm mb-2">Li, Na, K, Rb, Cs, Fr</p>
                  <ul className="list-disc pl-4 text-sm">
                    <li>Soft, reactive metals with one valence electron</li>
                    <li>React vigorously with water to form hydroxides</li>
                    <li>Form +1 ions in compounds</li>
                    <li>Increasing reactivity down the group</li>
                  </ul>
                </div>

                <div className="bg-white/70 dark:bg-black/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Group 2: Alkaline Earth Metals</h4>
                  <p className="text-sm mb-2">Be, Mg, Ca, Sr, Ba, Ra</p>
                  <ul className="list-disc pl-4 text-sm">
                    <li>Harder and less reactive than alkali metals</li>
                    <li>Two valence electrons, form +2 ions</li>
                    <li>React with water (less vigorously than Group 1)</li>
                    <li>Important in biological systems (Ca, Mg)</li>
                  </ul>
                </div>

                <div className="bg-white/70 dark:bg-black/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Group 17: Halogens</h4>
                  <p className="text-sm mb-2">F, Cl, Br, I, At</p>
                  <ul className="list-disc pl-4 text-sm">
                    <li>Highly reactive non-metals</li>
                    <li>Seven valence electrons, form -1 ions</li>
                    <li>Exist as diatomic molecules (X₂)</li>
                    <li>Strong oxidizing agents</li>
                    <li>Decreasing reactivity down the group</li>
                  </ul>
                </div>

                <div className="bg-white/70 dark:bg-black/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Group 18: Noble Gases</h4>
                  <p className="text-sm mb-2">He, Ne, Ar, Kr, Xe, Rn</p>
                  <ul className="list-disc pl-4 text-sm">
                    <li>Extremely stable, mostly unreactive</li>
                    <li>Full valence shell (except He)</li>
                    <li>Exist as monatomic gases</li>
                    <li>Heavier noble gases can form compounds (Kr, Xe)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <div className="absolute inset-0 flex items-center justify-center">
                <MainGroupAnimation />
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Trends in Main Group Chemistry</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Across a Period</h4>
                  <ul className="list-disc pl-4 text-sm">
                    <li>
                      <strong>Atomic Radius:</strong> Decreases
                    </li>
                    <li>
                      <strong>Ionization Energy:</strong> Increases
                    </li>
                    <li>
                      <strong>Electronegativity:</strong> Increases
                    </li>
                    <li>
                      <strong>Metallic Character:</strong> Decreases
                    </li>
                    <li>
                      <strong>Oxide Character:</strong> Basic → Amphoteric → Acidic
                    </li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Down a Group</h4>
                  <ul className="list-disc pl-4 text-sm">
                    <li>
                      <strong>Atomic Radius:</strong> Increases
                    </li>
                    <li>
                      <strong>Ionization Energy:</strong> Decreases
                    </li>
                    <li>
                      <strong>Electronegativity:</strong> Decreases (generally)
                    </li>
                    <li>
                      <strong>Metallic Character:</strong> Increases
                    </li>
                    <li>
                      <strong>Reactivity:</strong> Varies (increases for metals, decreases for non-metals)
                    </li>
                  </ul>
                </div>
              </div>

              <h3>Important Applications of Main Group Elements</h3>

              <ul>
                <li>
                  <strong>Sodium and Potassium:</strong> Essential for nerve function, used in various industrial
                  processes
                </li>
                <li>
                  <strong>Magnesium and Calcium:</strong> Structural components in living organisms, used in alloys and
                  construction
                </li>
                <li>
                  <strong>Aluminum:</strong> Lightweight metal used in transportation, packaging, and construction
                </li>
                <li>
                  <strong>Silicon:</strong> Basis of semiconductor technology, glass, and ceramics
                </li>
                <li>
                  <strong>Phosphorus:</strong> Essential in DNA, ATP, and fertilizers
                </li>
                <li>
                  <strong>Sulfur:</strong> Used in vulcanization of rubber, production of sulfuric acid
                </li>
                <li>
                  <strong>Halogens:</strong> Water purification, pharmaceuticals, and as oxidizing agents
                </li>
                <li>
                  <strong>Noble Gases:</strong> Lighting, welding atmospheres, and medical applications
                </li>
              </ul>

              <h3>Diagonal Relationships</h3>
              <p>
                Certain pairs of elements that are diagonally related in the periodic table show similar properties due
                to similar charge/radius ratios:
              </p>
              <ul>
                <li>Lithium (Li) and Magnesium (Mg)</li>
                <li>Beryllium (Be) and Aluminum (Al)</li>
                <li>Boron (B) and Silicon (Si)</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Crystal Field Theory */}
        {activeSection === 4 && (
          <motion.section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Crystal Field Theory</h2>
            <p className="mb-4">
              Crystal Field Theory explains the properties of transition metal complexes by considering how the
              d-orbitals are affected by the electric field of surrounding ligands.
            </p>

            <div className="w-full p-6 border rounded-lg bg-card bg-opacity-50 mb-6">
              <h3 className="text-xl font-medium mb-4">Crystal Field Splitting</h3>

              <div className="w-full h-[400px] relative flex items-center justify-center mb-4">
                <div className="absolute w-full flex flex-col items-center">
                  {/* Free ion d-orbitals */}
                  <div className="flex items-center mb-12">
                    <div className="w-32 text-right pr-4">
                      <span className="font-medium">Free ion</span>
                    </div>
                    <div className="w-64 h-1 bg-primary"></div>
                    <div className="w-32 pl-4">
                      <span className="text-sm">5 degenerate d-orbitals</span>
                    </div>
                  </div>

                  {/* Octahedral field splitting */}
                  <div className="flex items-center mb-12">
                    <div className="w-32 text-right pr-4">
                      <span className="font-medium">Octahedral field</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-64 h-1 bg-primary mb-8"></div>
                      <div className="w-64 h-1 bg-primary"></div>
                      <div className="absolute">
                        <div className="h-8 flex items-center justify-center">
                          <span className="px-2 py-1 bg-background border rounded text-sm">Δₒ</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-32 pl-4">
                      <div className="text-sm mb-8">
                        e<sub>g</sub> (d<sub>x²-y²</sub>, d<sub>z²</sub>)
                      </div>
                      <div className="text-sm">
                        t<sub>2g</sub> (d<sub>xy</sub>, d<sub>xz</sub>, d<sub>yz</sub>)
                      </div>
                    </div>
                  </div>

                  {/* Tetrahedral field splitting */}
                  <div className="flex items-center">
                    <div className="w-32 text-right pr-4">
                      <span className="font-medium">Tetrahedral field</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-64 h-1 bg-primary mb-6"></div>
                      <div className="w-64 h-1 bg-primary"></div>
                      <div className="absolute">
                        <div className="h-6 flex items-center justify-center">
                          <span className="px-2 py-1 bg-background border rounded text-sm">Δₜ</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-32 pl-4">
                      <div className="text-sm mb-6">
                        t<sub>2</sub> (d<sub>xy</sub>, d<sub>xz</sub>, d<sub>yz</sub>)
                      </div>
                      <div className="text-sm">
                        e (d<sub>x²-y²</sub>, d<sub>z²</sub>)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-sm">
                <p className="mb-2">
                  <strong>Key points:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    In octahedral complexes, the d-orbitals split into two sets: higher energy e<sub>g</sub> and lower
                    energy t<sub>2g</sub>.
                  </li>
                  <li>
                    In tetrahedral complexes, the splitting pattern is reversed, but the energy gap (Δₜ) is smaller.
                  </li>
                  <li>The magnitude of splitting determines whether a complex is high-spin or low-spin.</li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Practice */}
        {activeSection === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Practice Quiz: Inorganic Chemistry</h2>
              <p>
                Test your understanding of inorganic chemistry concepts with this quiz. Select the best answer for each
                question.
              </p>
            </div>

            <div className="space-y-8">
              {quizQuestions.map((question) => (
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
                            {quizSubmitted && option === question.correctAnswer && (
                              <Check className="h-4 w-4 shrink-0" />
                            )}
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
                disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
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
                      <p className="text-4xl font-bold mb-2">
                        {calculateScore()} / {quizQuestions.length}
                      </p>
                      <p className="text-muted-foreground">
                        {calculateScore() === quizQuestions.length
                          ? "Perfect score! Excellent work!"
                          : calculateScore() >= quizQuestions.length / 2
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
          </motion.div>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={handlePrevious} disabled={activeSection === 0} className="gap-1">
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <Button
          variant="default"
          onClick={handleNext}
          disabled={activeSection === sections.length - 1}
          className="gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// Animation components
function CoordinationCompoundAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Central metal ion */}
        <motion.div
          className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          M
        </motion.div>

        {/* Ligands */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={`ligand-${i}`}
            className="absolute w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold"
            style={{
              left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 60}px)`,
              top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 60}px)`,
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * 5, 0],
              y: [0, Math.sin((angle * Math.PI) / 180) * 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 0.3,
            }}
          >
            L
          </motion.div>
        ))}

        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="font-medium">Octahedral Complex</div>
          <div className="text-sm text-muted-foreground">[ML₆]</div>
        </div>
      </div>
    </div>
  )
}

function TransitionMetalAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-amber-600 dark:text-amber-400">Fe²⁺</div>
          <div className="relative w-24 h-24 border-2 border-amber-400 rounded-full flex items-center justify-center">
            <div className="text-xl font-bold">Fe</div>
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400 animate-spin"
              style={{ animationDuration: "10s" }}
            ></div>

            {/* d-electrons */}
            {[0, 60, 120, 180, 240, 300].map(
              (angle, i) =>
                i < 6 && (
                  <motion.div
                    key={`electron-${i}`}
                    className="absolute w-3 h-3 rounded-full bg-amber-500"
                    style={{
                      left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 30}px)`,
                      top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 30}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                ),
            )}
          </div>
          <div className="mt-2 text-xs text-center">
            <div>d⁶ configuration</div>
            <div>Variable oxidation states</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Cu²⁺</div>
          <div className="relative w-24 h-24 border-2 border-blue-400 rounded-full flex items-center justify-center">
            <div className="text-xl font-bold">Cu</div>
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400 animate-spin"
              style={{ animationDuration: "12s" }}
            ></div>

            {/* d-electrons */}
            {[0, 40, 80, 120, 160, 200, 240, 280, 320].map(
              (angle, i) =>
                i < 9 && (
                  <motion.div
                    key={`electron-${i}`}
                    className="absolute w-3 h-3 rounded-full bg-blue-500"
                    style={{
                      left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 30}px)`,
                      top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 30}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: i * 0.1,
                    }}
                  />
                ),
            )}
          </div>
          <div className="mt-2 text-xs text-center">
            <div>d⁹ configuration</div>
            <div>Colored compounds</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Cr³⁺</div>
          <div className="relative w-24 h-24 border-2 border-green-400 rounded-full flex items-center justify-center">
            <div className="text-xl font-bold">Cr</div>
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-green-400 animate-spin"
              style={{ animationDuration: "8s" }}
            ></div>

            {/* d-electrons */}
            {[0, 72, 144, 216, 288].map(
              (angle, i) =>
                i < 3 && (
                  <motion.div
                    key={`electron-${i}`}
                    className="absolute w-3 h-3 rounded-full bg-green-500"
                    style={{
                      left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 30}px)`,
                      top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 30}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                ),
            )}
          </div>
          <div className="mt-2 text-xs text-center">
            <div>d³ configuration</div>
            <div>Forms complex ions</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MainGroupAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-blue-600 dark:text-blue-400">Alkali Metals</div>
          <div className="relative w-28 h-28 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="text-3xl font-bold text-white">Na</div>

            {/* Single valence electron */}
            <motion.div
              className="absolute w-4 h-4 rounded-full bg-white"
              style={{
                left: "70%",
                top: "30%",
              }}
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Single valence electron</div>
            <div>Highly reactive metals</div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-2 text-green-600 dark:text-green-400">Halogens</div>
          <div className="relative w-28 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            <div className="text-3xl font-bold text-white">Cl</div>

            {/* Seven valence electrons */}
            {[0, 51.4, 102.8, 154.2, 205.7, 257.1, 308.5].map((angle, i) => (
              <motion.div
                key={`electron-${i}`}
                className="absolute w-4 h-4 rounded-full bg-white"
                style={{
                  left: `calc(50% + ${Math.cos((angle * Math.PI) / 180) * 35}px)`,
                  top: `calc(50% + ${Math.sin((angle * Math.PI) / 180) * 35}px)`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          <div className="mt-2 text-xs text-center">
            <div>Seven valence electrons</div>
            <div>Form -1 ions</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CrystalFieldAnimation() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="text-center w-full">
        <div className="text-lg font-medium mb-4">Crystal Field Splitting</div>

        <div className="relative w-full h-40 mx-auto">
          {/* Energy levels */}
          <motion.div
            className="absolute left-0 right-0 h-1 bg-purple-500"
            style={{ top: "20%" }}
            animate={{
              y: [-5, 5, -5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="absolute right-4 top-0 transform -translate-y-1/2 text-xs">eg (dx²-y², dz²)</div>
          </motion.div>

          <div className="absolute left-0 right-0 h-0.5 bg-gray-400 dark:bg-gray-600" style={{ top: "50%" }}>
            <div className="absolute right-4 top-0 transform -translate-y-1/2 text-xs">Free ion d-orbitals</div>
          </div>

          <motion.div
            className="absolute left-0 right-0 h-1 bg-blue-500"
            style={{ top: "80%" }}
            animate={{
              y: [5, -5, 5],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="absolute right-4 top-0 transform -translate-y-1/2 text-xs">t2g (dxy, dyz, dxz)</div>
          </motion.div>

          {/* Arrows and labels */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-0.5 bg-gray-400 dark:bg-gray-600"></div>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm">Δo</div>

          {/* Electrons */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={`electron-${i}`}
              className="absolute w-3 h-3 rounded-full bg-yellow-400"
              style={{
                left: `${20 + i * 10}%`,
                top: i <= 3 ? "80%" : "20%",
              }}
              animate={{
                y: [0, i % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="mt-4 text-sm">
          <div>Octahedral complex with d⁶ configuration</div>
          <div className="text-muted-foreground">Low-spin arrangement (strong field)</div>
        </div>
      </div>
    </div>
  )
}

