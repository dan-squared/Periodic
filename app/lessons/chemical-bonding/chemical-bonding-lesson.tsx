"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Atom, Zap, Magnet, Sparkles, ArrowRight, Check, Info } from "lucide-react"

export default function ChemicalBondingLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const sections = [
    { id: "intro", title: "Introduction" },
    { id: "ionic", title: "Ionic Bonds" },
    { id: "covalent", title: "Covalent Bonds" },
    { id: "metallic", title: "Metallic Bonds" },
    { id: "intermolecular", title: "Intermolecular Forces" },
    { id: "quiz", title: "Quiz" },
  ]

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1)
    }
  }

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1)
    }
  }

  return (
    <div className="space-y-8">
      <Tabs
        value={sections[activeSection].id}
        onValueChange={(value) => setActiveSection(sections.findIndex((s) => s.id === value))}
      >
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
          {sections.map((section, index) => (
            <TabsTrigger key={section.id} value={section.id} className="relative">
              {index < activeSection && <Check className="absolute -top-1 -right-1 h-4 w-4 text-green-500" />}
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="intro" className="mt-6">
          <IntroductionSection onNext={nextSection} />
        </TabsContent>

        <TabsContent value="ionic" className="mt-6">
          <IonicBondsSection onNext={nextSection} onPrev={prevSection} />
        </TabsContent>

        <TabsContent value="covalent" className="mt-6">
          <CovalentBondsSection onNext={nextSection} onPrev={prevSection} />
        </TabsContent>

        <TabsContent value="metallic" className="mt-6">
          <MetallicBondsSection onNext={nextSection} onPrev={prevSection} />
        </TabsContent>

        <TabsContent value="intermolecular" className="mt-6">
          <IntermolecularForcesSection onNext={nextSection} onPrev={prevSection} />
        </TabsContent>

        <TabsContent value="quiz" className="mt-6">
          <QuizSection onPrev={prevSection} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function IntroductionSection({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Atom className="h-6 w-6 text-primary" />
            <span>Chemical Bonding: The Foundation of Molecules</span>
          </CardTitle>
          <CardDescription>Understanding how atoms connect to form compounds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Chemical bonding is the process by which atoms join together to form molecules and compounds. These bonds
            are formed when atoms share, transfer, or pool their electrons to achieve a more stable electron
            configuration.
          </p>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="border border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Why Atoms Bond</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Atoms bond to achieve a more stable electron configuration, typically by filling their outermost
                  electron shell (valence shell). This often means achieving an octet (8 electrons) in the valence
                  shell, similar to noble gases which are very stable.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Types of Chemical Bonds</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Ionic bonds (electron transfer)</li>
                  <li>Covalent bonds (electron sharing)</li>
                  <li>Metallic bonds (electron pooling)</li>
                  <li>Intermolecular forces (between molecules)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Key Concept</h4>
                <p className="text-sm text-muted-foreground">
                  The type of bond formed between atoms depends on the difference in electronegativity between the
                  atoms. Electronegativity is a measure of an atom's ability to attract electrons to itself.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onNext} className="gap-2">
          <span>Next: Ionic Bonds</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function IonicBondsSection({ onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-blue-500" />
            <span>Ionic Bonds</span>
          </CardTitle>
          <CardDescription>Complete transfer of electrons between atoms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Ionic bonds form when electrons are completely transferred from one atom to another, creating positively
            charged cations and negatively charged anions. These oppositely charged ions are then attracted to each
            other by electrostatic forces.
          </p>

          <div className="relative h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-lg overflow-hidden my-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg border-4 border-blue-600"
                  animate={{
                    x: [-80, -40, -40, -40],
                    scale: [1, 1, 0.95, 0.95],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  Na
                  <motion.div
                    className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[10px] text-white"
                    animate={{
                      x: [0, 120, 120, 120],
                      opacity: [1, 1, 0, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    e-
                  </motion.div>
                </motion.div>

                <motion.div
                  className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-lg border-4 border-green-600 absolute top-0"
                  animate={{
                    x: [80, 40, 40, 40],
                    scale: [1, 1, 1.05, 1.05],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  Cl
                </motion.div>

                <motion.div
                  className="absolute top-20 text-center w-full font-medium"
                  animate={{
                    opacity: [0, 0, 1, 1, 0],
                    y: [0, 0, 0, 0, 10],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                >
                  NaCl
                </motion.div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Animation: Formation of sodium chloride (NaCl)
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>High melting and boiling points</li>
                  <li>Conduct electricity when dissolved or molten</li>
                  <li>Form crystalline structures</li>
                  <li>Usually soluble in water</li>
                  <li>Hard but brittle solids</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-blue-200 dark:border-blue-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sodium chloride (NaCl) - table salt</li>
                  <li>Calcium chloride (CaCl₂) - road salt</li>
                  <li>Magnesium oxide (MgO) - antacid</li>
                  <li>Potassium iodide (KI) - salt supplement</li>
                  <li>Lithium fluoride (LiF) - optical components</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Key Concept</h4>
                <p className="text-sm text-muted-foreground">
                  Ionic bonds typically form between metals (which tend to lose electrons) and non-metals (which tend to
                  gain electrons). The greater the electronegativity difference between the atoms, the more ionic the
                  bond.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Previous: Introduction</span>
        </Button>
        <Button onClick={onNext} className="gap-2">
          <span>Next: Covalent Bonds</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function CovalentBondsSection({ onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Magnet className="h-6 w-6 text-green-500" />
            <span>Covalent Bonds</span>
          </CardTitle>
          <CardDescription>Sharing of electrons between atoms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Covalent bonds form when atoms share electrons to achieve a stable electron configuration. Unlike ionic
            bonds, the electrons are not completely transferred but instead orbit around both atoms, creating a shared
            electron pair.
          </p>

          <div className="relative h-64 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-lg overflow-hidden my-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <motion.div
                  className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg border-4 border-teal-600"
                  animate={{ x: [-30, -30] }}
                >
                  H
                </motion.div>

                <motion.div
                  className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg border-4 border-teal-600 absolute top-0"
                  animate={{ x: [30, 30] }}
                >
                  H
                </motion.div>

                <motion.div
                  className="absolute"
                  style={{ top: "20px", left: "calc(50% - 10px)" }}
                  animate={{
                    x: [-10, 10, -10],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] text-white">
                    e-
                  </div>
                </motion.div>

                <motion.div className="absolute top-20 text-center w-full font-medium">H₂</motion.div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Animation: Hydrogen molecule (H₂) with shared electrons
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-green-200 dark:border-green-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Types of Covalent Bonds</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Single bond:</strong> One shared pair of electrons
                  </li>
                  <li>
                    <strong>Double bond:</strong> Two shared pairs of electrons
                  </li>
                  <li>
                    <strong>Triple bond:</strong> Three shared pairs of electrons
                  </li>
                  <li>
                    <strong>Polar covalent:</strong> Unequal sharing of electrons
                  </li>
                  <li>
                    <strong>Nonpolar covalent:</strong> Equal sharing of electrons
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-green-200 dark:border-green-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Hydrogen gas (H₂) - single bond</li>
                  <li>Oxygen gas (O₂) - double bond</li>
                  <li>Nitrogen gas (N₂) - triple bond</li>
                  <li>Water (H₂O) - polar covalent</li>
                  <li>Methane (CH₄) - tetrahedral structure</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Key Concept</h4>
                <p className="text-sm text-muted-foreground">
                  The shape of a molecule is determined by the arrangement of electron pairs around the central atom, as
                  described by Valence Shell Electron Pair Repulsion (VSEPR) theory. Electron pairs repel each other and
                  arrange themselves to minimize repulsion.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Previous: Ionic Bonds</span>
        </Button>
        <Button onClick={onNext} className="gap-2">
          <span>Next: Metallic Bonds</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function MetallicBondsSection({ onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-amber-500" />
            <span>Metallic Bonds</span>
          </CardTitle>
          <CardDescription>Electrons freely moving among positive metal ions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Metallic bonds occur in metals where the valence electrons are delocalized and shared among a lattice of
            positive metal ions. This creates a "sea" of electrons that can move freely throughout the metal, explaining
            many of the unique properties of metals.
          </p>

          <div className="relative h-64 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg overflow-hidden my-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-4 grid-rows-4 gap-2">
                {Array(16)
                  .fill(0)
                  .map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm border-2 border-amber-600"
                      animate={{
                        y: [Math.random() * 2 - 1, Math.random() * 2 - 1],
                        x: [Math.random() * 2 - 1, Math.random() * 2 - 1],
                      }}
                      transition={{
                        duration: 1 + Math.random(),
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      M<sup>+</sup>
                    </motion.div>
                  ))}

                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-blue-400 opacity-70"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                        y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      e-
                    </motion.div>
                  ))}
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Animation: "Sea" of electrons in a metal lattice
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border border-amber-200 dark:border-amber-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Properties of Metals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>High electrical conductivity</li>
                  <li>High thermal conductivity</li>
                  <li>Malleability (can be hammered into sheets)</li>
                  <li>Ductility (can be drawn into wires)</li>
                  <li>Metallic luster (shiny appearance)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-amber-200 dark:border-amber-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Copper (Cu) - electrical wiring</li>
                  <li>Aluminum (Al) - lightweight structures</li>
                  <li>Iron (Fe) - structural components</li>
                  <li>Gold (Au) - jewelry and electronics</li>
                  <li>Silver (Ag) - conductive applications</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Key Concept</h4>
                <p className="text-sm text-muted-foreground">
                  The strength of metallic bonds varies with the number of valence electrons and atomic size. Transition
                  metals, which have partially filled d-orbitals, often form particularly strong metallic bonds, giving
                  them high melting points and mechanical strength.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Previous: Covalent Bonds</span>
        </Button>
        <Button onClick={onNext} className="gap-2">
          <span>Next: Intermolecular Forces</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function IntermolecularForcesSection({ onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Magnet className="h-6 w-6 text-purple-500" />
            <span>Intermolecular Forces</span>
          </CardTitle>
          <CardDescription>Attractions between molecules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Intermolecular forces are attractions that occur between molecules, rather than within them. These forces
            are generally weaker than chemical bonds but play a crucial role in determining the physical properties of
            substances, such as boiling points, melting points, and solubility.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border border-purple-200 dark:border-purple-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Hydrogen Bonding</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm">
                  A special type of dipole-dipole attraction between a hydrogen atom bonded to a highly electronegative
                  atom (N, O, F) and another electronegative atom.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Examples:</strong> Water (H₂O), Ammonia (NH₃), DNA base pairs
                </div>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 dark:border-purple-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dipole-Dipole Forces</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm">
                  Attractions between polar molecules, where the positive end of one molecule is attracted to the
                  negative end of another molecule.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Examples:</strong> Acetone (C₃H₆O), Hydrogen chloride (HCl)
                </div>
              </CardContent>
            </Card>

            <Card className="border border-purple-200 dark:border-purple-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">London Dispersion Forces</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2 text-sm">
                  Weak attractions that occur between all molecules due to temporary dipoles caused by the random
                  movement of electrons.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Examples:</strong> Noble gases, Hydrocarbons like methane (CH₄)
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="relative h-64 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg overflow-hidden my-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="flex items-center">
                  <motion.div
                    className="flex flex-col items-center"
                    animate={{
                      x: [-5, 5, -5],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      O
                    </div>
                    <div className="flex mt-1">
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold -mr-1">
                        H
                      </div>
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold -ml-1">
                        H
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="w-16 h-1 bg-blue-300 mx-2 rounded-full"
                    animate={{
                      width: [60, 50, 60],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />

                  <motion.div
                    className="flex flex-col items-center"
                    animate={{
                      x: [5, -5, 5],
                      rotate: [2, -2, 2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  >
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">
                      O
                    </div>
                    <div className="flex mt-1">
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold -mr-1">
                        H
                      </div>
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold -ml-1">
                        H
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Animation: Hydrogen bonding between water molecules
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg mt-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-purple-500 mt-0.5" />
              <div>
                <h4 className="font-medium">Key Concept</h4>
                <p className="text-sm text-muted-foreground">
                  The strength of intermolecular forces affects physical properties like boiling point, melting point,
                  and viscosity. Generally, the stronger the intermolecular forces, the higher the boiling and melting
                  points, as more energy is required to overcome these attractions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Previous: Metallic Bonds</span>
        </Button>
        <Button onClick={onNext} className="gap-2">
          <span>Next: Quiz</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function QuizSection({ onPrev }) {
  const [answers, setAnswers] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const questions = [
    {
      id: "q1",
      question: "Which type of bond involves the complete transfer of electrons?",
      options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
      answer: "Ionic bond",
    },
    {
      id: "q2",
      question: "Which of the following compounds would have the strongest hydrogen bonding?",
      options: ["CH₄ (methane)", "H₂O (water)", "CO₂ (carbon dioxide)", "CCl₄ (carbon tetrachloride)"],
      answer: "H₂O (water)",
    },
    {
      id: "q3",
      question: "What type of bond is responsible for the high electrical conductivity of metals?",
      options: ["Ionic bond", "Covalent bond", "Metallic bond", "Dipole-dipole forces"],
      answer: "Metallic bond",
    },
    {
      id: "q4",
      question: "Which of the following is NOT a characteristic of ionic compounds?",
      options: [
        "High melting points",
        "Conduct electricity when molten",
        "Conduct electricity in solid state",
        "Form crystalline structures",
      ],
      answer: "Conduct electricity in solid state",
    },
    {
      id: "q5",
      question: "In a water molecule (H₂O), the bonds between oxygen and hydrogen are:",
      options: ["Ionic bonds", "Nonpolar covalent bonds", "Polar covalent bonds", "Metallic bonds"],
      answer: "Polar covalent bonds",
    },
  ]

  const handleSubmit = () => {
    let newScore = 0
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        newScore++
      }
    })
    setScore(newScore)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span>Test Your Knowledge</span>
          </CardTitle>
          <CardDescription>Answer the following questions about chemical bonding</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="space-y-3">
              <h3 className="font-medium">
                {index + 1}. {q.question}
              </h3>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={`${q.id}-${option}`}
                      name={q.id}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => setAnswers({ ...answers, [q.id]: option })}
                      disabled={submitted}
                      className="mr-2 h-4 w-4 text-primary"
                    />
                    <label
                      htmlFor={`${q.id}-${option}`}
                      className={`${
                        submitted && option === q.answer
                          ? "font-medium text-green-600 dark:text-green-400"
                          : submitted && answers[q.id] === option && option !== q.answer
                            ? "font-medium text-red-600 dark:text-red-400"
                            : ""
                      }`}
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
              {submitted && answers[q.id] !== q.answer && (
                <p className="text-sm text-red-600 dark:text-red-400">Correct answer: {q.answer}</p>
              )}
            </div>
          ))}

          {submitted && (
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h3 className="font-medium text-lg mb-2">
                Your Score: {score}/{questions.length}
              </h3>
              <p className="text-muted-foreground">
                {score === questions.length
                  ? "Perfect! You've mastered chemical bonding concepts."
                  : score >= 3
                    ? "Good job! You understand most of the key concepts."
                    : "Keep studying! Review the sections to improve your understanding."}
              </p>
            </div>
          )}

          {!submitted && (
            <Button onClick={handleSubmit} className="w-full mt-4">
              Submit Answers
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="gap-2">
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Previous: Intermolecular Forces</span>
        </Button>
        <Button variant="outline" onClick={() => (window.location.href = "/lessons")} className="gap-2">
          <span>Back to Lessons</span>
        </Button>
      </div>
    </motion.div>
  )
}

