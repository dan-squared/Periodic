"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Atom, Zap, Magnet, Check, X, HelpCircle, RefreshCw, Droplets, Waves } from "lucide-react"
import { cn } from "@/lib/utils"

// Add CSS animation for electron flow
// Add this at the beginning of the file, right after the imports
const electronFlowAnimation = `
@keyframes electronFlow {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}
`

export default function ChemicalBondingLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [progress, setProgress] = useState(0)
  const [electronDistance, setElectronDistance] = useState(50)
  const [showElectronTransfer, setShowElectronTransfer] = useState(false)
  const [showElectronSharing, setShowElectronSharing] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({})
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const londonForcesCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const dipoleCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const hydrogenBondCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const [electronSharing, setElectronSharing] = useState(50)
  const [metallicProperty, setMetallicProperty] = useState("electrical")
  const [metallicDeformation, setMetallicDeformation] = useState(0)
  const [interactiveForce, setInteractiveForce] = useState("hydrogen")
  const [temperature, setTemperature] = useState(200)
  const [molecularDistance, setMolecularDistance] = useState(4)

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "ionic", title: "Ionic Bonds" },
    { id: "covalent", title: "Covalent Bonds" },
    { id: "metallic", title: "Metallic Bonds" },
    { id: "intermolecular", title: "Intermolecular Forces" },
    { id: "practice", title: "Practice" },
  ]

  useEffect(() => {
    setProgress(((activeSection + 1) / sections.length) * 100)
  }, [activeSection, sections.length])

  useEffect(() => {
    if (canvasRef.current && activeSection === 2) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      
      let angle = 0

      const drawCovalentBond = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw atoms
        ctx.fillStyle = "#3b82f6"
        ctx.beginPath()
        ctx.arc(canvas.width / 2 - 60, canvas.height / 2, 40, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = "#10b981"
        ctx.beginPath()
        ctx.arc(canvas.width / 2 + 60, canvas.height / 2, 40, 0, Math.PI * 2)
        ctx.fill()

        // Draw electron cloud
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)"
        ctx.lineWidth = 2

        // Shared electrons
        const sharedElectronOffset = Math.sin(angle) * 10

        // First shared electron
        ctx.beginPath()
        ctx.arc(canvas.width / 2 - sharedElectronOffset, canvas.height / 2 - 15, 5, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()

        // Second shared electron
        ctx.beginPath()
        ctx.arc(canvas.width / 2 + sharedElectronOffset, canvas.height / 2 + 15, 5, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()

        // Draw atom labels
        ctx.font = "16px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Cl", canvas.width / 2 - 60, canvas.height / 2 + 5)
        ctx.fillText("Cl", canvas.width / 2 + 60, canvas.height / 2 + 5)

        angle += 0.05
        animationRef.current = requestAnimationFrame(drawCovalentBond)
      }

      drawCovalentBond()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }

    // London Dispersion Forces Animation
    if (londonForcesCanvasRef.current && activeSection === 4) {
      const canvas = londonForcesCanvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      
      let time = 0

      const drawLondonForces = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw two atoms
        const atom1X = canvas.width / 3
        const atom2X = (canvas.width / 3) * 2
        const atomY = canvas.height / 2
        const atomRadius = 40

        // Draw atoms
        ctx.fillStyle = "#6366f1" // indigo
        ctx.beginPath()
        ctx.arc(atom1X, atomY, atomRadius, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "#8b5cf6" // violet
        ctx.beginPath()
        ctx.arc(atom2X, atomY, atomRadius, 0, Math.PI * 2)
        ctx.fill()

        // Draw electrons with temporary dipole
        const electronCount = 6
        const electronRadius = 4

        // First atom electrons
        for (let i = 0; i < electronCount; i++) {
          const angle = (i / electronCount) * Math.PI * 2 + time

          // Add temporary dipole effect
          let radiusOffset = 0
          if (i < electronCount / 2) {
            radiusOffset = Math.sin(time) * 10
          }

          const x = atom1X + (atomRadius + 5 + radiusOffset) * Math.cos(angle)
          const y = atomY + (atomRadius + 5) * Math.sin(angle)

          ctx.beginPath()
          ctx.arc(x, y, electronRadius, 0, Math.PI * 2)
          ctx.fillStyle = "white"
          ctx.fill()
        }

        // Second atom electrons - responding to first atom's dipole
        for (let i = 0; i < electronCount; i++) {
          const angle = (i / electronCount) * Math.PI * 2 + time + Math.PI

          // Add responding dipole effect (delayed response)
          let radiusOffset = 0
          if (i < electronCount / 2) {
            radiusOffset = Math.sin(time - 0.5) * 10
          }

          const x = atom2X + (atomRadius + 5 + radiusOffset) * Math.cos(angle)
          const y = atomY + (atomRadius + 5) * Math.sin(angle)

          ctx.beginPath()
          ctx.arc(x, y, electronRadius, 0, Math.PI * 2)
          ctx.fillStyle = "white"
          ctx.fill()
        }

        // Draw atom labels
        ctx.font = "16px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Ar", atom1X, atomY + 5)
        ctx.fillText("Ar", atom2X, atomY + 5)

        // Draw temporary dipole indicators
        if (Math.sin(time) > 0.7) {
          ctx.font = "14px Arial"
          ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
          ctx.fillText("δ-", atom1X - atomRadius - 15, atomY - 15)
          ctx.fillText("δ+", atom1X + atomRadius + 15, atomY - 15)

          // Delayed response
          if (Math.sin(time - 0.5) > 0.5) {
            ctx.fillText("δ+", atom2X - atomRadius - 15, atomY - 15)
            ctx.fillText("δ-", atom2X + atomRadius + 15, atomY - 15)
          }
        }

        time += 0.02
        animationRef.current = requestAnimationFrame(drawLondonForces)
      }

      drawLondonForces()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }

    // Dipole-Dipole Interactions Animation
    if (dipoleCanvasRef.current && activeSection === 4) {
      const canvas = dipoleCanvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      
      let time = 0

      const drawDipoleInteractions = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw two polar molecules
        const molecule1X = canvas.width / 3
        const molecule2X = (canvas.width / 3) * 2
        const moleculeY = canvas.height / 2

        // Calculate oscillation for attraction/repulsion
        const oscillation = Math.sin(time) * 15

        // Draw first molecule (HCl)
        ctx.fillStyle = "#ef4444" // red for Cl
        ctx.beginPath()
        ctx.arc(molecule1X + 20, moleculeY, 30, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "#94a3b8" // gray for H
        ctx.beginPath()
        ctx.arc(molecule1X - 20, moleculeY, 15, 0, Math.PI * 2)
        ctx.fill()

        // Draw second molecule (HCl) - oscillating position based on attraction
        ctx.fillStyle = "#ef4444" // red for Cl
        ctx.beginPath()
        ctx.arc(molecule2X - 20 - oscillation, moleculeY, 30, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "#94a3b8" // gray for H
        ctx.beginPath()
        ctx.arc(molecule2X + 20 - oscillation, moleculeY, 15, 0, Math.PI * 2)
        ctx.fill()

        // Draw molecule labels
        ctx.font = "16px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"

        // First molecule labels
        ctx.fillText("Cl", molecule1X + 20, moleculeY + 5)
        ctx.fillText("H", molecule1X - 20, moleculeY + 5)

        // Second molecule labels
        ctx.fillText("Cl", molecule2X - 20 - oscillation, moleculeY + 5)
        ctx.fillText("H", molecule2X + 20 - oscillation, moleculeY + 5)

        // Draw dipole indicators
        ctx.font = "14px Arial"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"

        // First molecule dipole
        ctx.fillText("δ-", molecule1X + 20, moleculeY - 35)
        ctx.fillText("δ+", molecule1X - 20, moleculeY - 20)

        // Second molecule dipole
        ctx.fillText("δ-", molecule2X - 20 - oscillation, moleculeY - 35)
        ctx.fillText("δ+", molecule2X + 20 - oscillation, moleculeY - 20)

        // Draw attraction lines when molecules are aligned properly
        if (oscillation < -5) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
          ctx.setLineDash([5, 3])
          ctx.beginPath()
          ctx.moveTo(molecule1X + 20, moleculeY - 30)
          ctx.lineTo(molecule2X + 20 - oscillation, moleculeY - 15)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(molecule1X - 20, moleculeY - 15)
          ctx.lineTo(molecule2X - 20 - oscillation, moleculeY - 30)
          ctx.stroke()
          ctx.setLineDash([])
        }

        time += 0.03
        animationRef.current = requestAnimationFrame(drawDipoleInteractions)
      }

      drawDipoleInteractions()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }

    // Hydrogen Bonding Animation
    if (hydrogenBondCanvasRef.current && activeSection === 4) {
      const canvas = hydrogenBondCanvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      
      let time = 0

      const drawHydrogenBonding = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw water molecules
        const molecule1X = canvas.width / 3
        const molecule2X = (canvas.width / 3) * 2
        const moleculeY = canvas.height / 2

        // Calculate pulsing effect for hydrogen bond
        const pulseEffect = Math.abs(Math.sin(time)) * 0.5 + 0.5

        // Draw first water molecule
        // Oxygen
        ctx.fillStyle = "#0ea5e9" // sky blue for O
        ctx.beginPath()
        ctx.arc(molecule1X, moleculeY, 25, 0, Math.PI * 2)
        ctx.fill()

        // Hydrogens
        ctx.fillStyle = "#94a3b8" // gray for H
        ctx.beginPath()
        ctx.arc(molecule1X - 20, moleculeY - 15, 12, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(molecule1X - 20, moleculeY + 15, 12, 0, Math.PI * 2)
        ctx.fill()

        // Draw second water molecule
        // Oxygen
        ctx.fillStyle = "#0ea5e9" // sky blue for O
        ctx.beginPath()
        ctx.arc(molecule2X, moleculeY, 25, 0, Math.PI * 2)
        ctx.fill()

        // Hydrogens
        ctx.fillStyle = "#94a3b8" // gray for H
        ctx.beginPath()
        ctx.arc(molecule2X + 20, moleculeY - 15, 12, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(molecule2X + 20, moleculeY + 15, 12, 0, Math.PI * 2)
        ctx.fill()

        // Draw molecule labels
        ctx.font = "16px Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"

        // First molecule labels
        ctx.fillText("O", molecule1X, moleculeY + 5)
        ctx.fillText("H", molecule1X - 20, moleculeY - 15 + 3)
        ctx.fillText("H", molecule1X - 20, moleculeY + 15 + 3)

        // Second molecule labels
        ctx.fillText("O", molecule2X, moleculeY + 5)
        ctx.fillText("H", molecule2X + 20, moleculeY - 15 + 3)
        ctx.fillText("H", molecule2X + 20, moleculeY + 15 + 3)

        // Draw dipole indicators
        ctx.font = "14px Arial"
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"

        // First molecule dipole
        ctx.fillText("δ-", molecule1X, moleculeY - 30)
        ctx.fillText("δ+", molecule1X - 25, moleculeY - 15 - 15)
        ctx.fillText("δ+", molecule1X - 25, moleculeY + 15 + 15)

        // Second molecule dipole
        ctx.fillText("δ-", molecule2X, moleculeY - 30)
        ctx.fillText("δ+", molecule2X + 25, moleculeY - 15 - 15)
        ctx.fillText("δ+", molecule2X + 25, moleculeY + 15 + 15)

        // Draw hydrogen bond
        ctx.strokeStyle = `rgba(255, 255, 255, ${pulseEffect})`
        ctx.lineWidth = 2 * pulseEffect + 1
        ctx.setLineDash([5, 3])
        ctx.beginPath()
        ctx.moveTo(molecule1X - 20, moleculeY - 15)
        ctx.lineTo(molecule2X, moleculeY)
        ctx.stroke()
        ctx.setLineDash([])

        // Label hydrogen bond
        if (pulseEffect > 0.7) {
          ctx.font = "14px Arial"
          ctx.fillStyle = `rgba(255, 255, 255, ${pulseEffect})`
          ctx.fillText("Hydrogen Bond", (molecule1X + molecule2X) / 2, moleculeY - 30)
        }

        time += 0.03
        animationRef.current = requestAnimationFrame(drawHydrogenBonding)
      }

      drawHydrogenBonding()

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
  }, [activeSection])

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

  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer,
    })
  }

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true)
  }

  const toggleExplanation = (questionId: number) => {
    setShowExplanation({
      ...showExplanation,
      [questionId]: !showExplanation[questionId] || false,
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
      question: "Which type of bond involves the complete transfer of electrons?",
      options: ["Ionic bond", "Covalent bond", "Metallic bond", "Hydrogen bond"],
      correctAnswer: "Ionic bond",
      explanation:
        "Ionic bonds involve the complete transfer of electrons from a metal to a non-metal, resulting in positively and negatively charged ions that attract each other.",
    },
    {
      id: 2,
      question: "In a covalent bond, electrons are:",
      options: [
        "Transferred from one atom to another",
        "Shared between atoms",
        "Free to move throughout the structure",
        "Repelled by both atoms",
      ],
      correctAnswer: "Shared between atoms",
      explanation:
        "Covalent bonds form when atoms share electrons to achieve a stable electron configuration, typically forming between non-metal atoms.",
    },
    {
      id: 3,
      question: "Which of the following is NOT an intermolecular force?",
      options: ["Hydrogen bonding", "Van der Waals forces", "Dipole-dipole interactions", "Covalent bonding"],
      correctAnswer: "Covalent bonding",
      explanation:
        "Covalent bonding is an intramolecular force (within molecules), while the others are intermolecular forces (between molecules).",
    },
    {
      id: 4,
      question: "The 'sea of electrons' model is used to describe:",
      options: ["Ionic bonds", "Covalent bonds", "Metallic bonds", "Hydrogen bonds"],
      correctAnswer: "Metallic bonds",
      explanation:
        "The metallic bond is described as a lattice of positive ions surrounded by a 'sea' of delocalized electrons that are free to move throughout the structure.",
    },
    {
      id: 5,
      question: "Which intermolecular force is the weakest?",
      options: [
        "Hydrogen bonding",
        "Dipole-dipole interactions",
        "Ion-dipole interactions",
        "London dispersion forces",
      ],
      correctAnswer: "London dispersion forces",
      explanation:
        "London dispersion forces are the weakest intermolecular forces, arising from temporary dipoles created by random electron movement. They exist between all molecules but are particularly important in non-polar molecules.",
    },
    {
      id: 6,
      question: "Hydrogen bonding occurs between hydrogen and which of the following elements?",
      options: [
        "Carbon, Nitrogen, Oxygen",
        "Nitrogen, Oxygen, Fluorine",
        "Fluorine, Chlorine, Bromine",
        "Oxygen, Sulfur, Selenium",
      ],
      correctAnswer: "Nitrogen, Oxygen, Fluorine",
      explanation:
        "Hydrogen bonding occurs when hydrogen is bonded to highly electronegative elements with lone pairs of electrons, specifically nitrogen, oxygen, or fluorine (N, O, F).",
    },
    {
      id: 7,
      question: "Which property is NOT typically associated with metallic bonding?",
      options: ["High electrical conductivity", "Malleability", "High melting point", "Poor thermal conductivity"],
      correctAnswer: "Poor thermal conductivity",
      explanation:
        "Metals typically have good thermal conductivity due to their delocalized electrons. Poor thermal conductivity is not a characteristic of metallic bonding.",
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

  const calculateBondEnergy = (forceType: 'london' | 'dipole' | 'hydrogen', temp: number, distance: number) => {
    // Base energy values in kJ/mol
    const baseEnergies = {
      london: 5,
      dipole: 15,
      hydrogen: 25,
    }

    // Distance factor (inverse square relationship)
    const distanceFactor = 1 / (distance * distance)

    // Temperature factor (linear decrease with temperature)
    const tempFactor = 1 - temp / 500

    // Calculate energy
    let energy = baseEnergies[forceType] * distanceFactor * tempFactor

    // Ensure energy is positive and within reasonable bounds
    energy = Math.max(0, Math.min(energy, 30))

    return energy
  }

  // Add the electron flow animation via useEffect
  useEffect(() => {
    // Add the style tag to inject the animation
    const styleTag = document.createElement("style")
    if (!document.getElementById("electron-flow-animation")) {
      styleTag.id = "electron-flow-animation"
      styleTag.innerHTML = electronFlowAnimation
      document.head.appendChild(styleTag)
    }

    // Clean up function
    return () => {
      const existingTag = document.getElementById("electron-flow-animation")
      if (existingTag) {
        existingTag.remove()
      }
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Update the sticky navigation section at the top */}
      <div className="sticky top-0 z-10 bg-background pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Atom className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">Bonding</span>
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
            <div className="prose dark:prose-invert max-w-none">
              <h2>What is Chemical Bonding?</h2>
              <p>
                Chemical bonding is the process by which atoms join together to form molecules and compounds. These
                bonds are formed when atoms interact with each other to achieve a more stable electron configuration,
                typically by filling their outermost electron shell.
              </p>

              <p>
                The type of bond that forms between atoms depends on the properties of the atoms involved, particularly
                their electronegativity (the ability to attract electrons) and their electron configuration.
              </p>

              <h3>Why Do Atoms Form Bonds?</h3>
              <p>
                Atoms form bonds to achieve a more stable electron configuration, typically by filling their outermost
                electron shell (valence shell). This is often achieved by having eight electrons in the valence shell,
                known as the "octet rule." However, there are exceptions to this rule, particularly for elements in the
                first and second periods of the periodic table.
              </p>

              <h3>Main Types of Chemical Bonds</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-500" />
                      Ionic Bonds
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Form when electrons are transferred from one atom to another, creating oppositely charged ions
                      that attract each other.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Atom className="h-5 w-5 text-green-500" />
                      Covalent Bonds
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Form when atoms share electrons to achieve a stable electron configuration.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Magnet className="h-5 w-5 text-red-500" />
                      Metallic Bonds
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Form between metal atoms, where valence electrons are delocalized and shared among a lattice of
                      positive ions.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <h3>Intermolecular Forces</h3>
              <p>
                In addition to these primary bond types, there are also weaker intermolecular forces that hold molecules
                together:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Waves className="h-5 w-5 text-purple-500" />
                      London Dispersion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Weak attractions between all molecules due to temporary dipoles caused by electron movement.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Magnet className="h-5 w-5 text-indigo-500" />
                      Dipole-Dipole
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Attractions between polar molecules, where the positive end of one molecule is attracted to the
                      negative end of another.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-sky-500" />
                      Hydrogen Bonding
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      A special type of dipole-dipole interaction that occurs when hydrogen is bonded to N, O, or F.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}
        {/* Ionic Bonds */}
        {activeSection === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Ionic Bonds</h2>
              <p>
                Ionic bonds form when electrons are completely transferred from one atom to another. This typically
                occurs between a metal (which tends to lose electrons) and a non-metal (which tends to gain electrons).
              </p>

              <h3>Characteristics of Ionic Bonds</h3>
              <ul>
                <li>Complete transfer of electrons from one atom to another</li>
                <li>Formation of positively charged cations and negatively charged anions</li>
                <li>Strong electrostatic attraction between oppositely charged ions</li>
                <li>Typically form between metals and non-metals</li>
                <li>Result in crystalline solids with high melting and boiling points</li>
                <li>Conduct electricity when dissolved in water or melted</li>
              </ul>

              <h3>Example: Sodium Chloride (NaCl)</h3>
              <p>
                A classic example of an ionic bond is the formation of sodium chloride (table salt). Sodium (Na), a
                metal, has one electron in its outermost shell, which it can easily lose to achieve a stable electron
                configuration. Chlorine (Cl), a non-metal, has seven electrons in its outermost shell and needs one more
                to achieve a stable configuration.
              </p>
            </div>

            <div className="bg-muted rounded-lg p-6 relative overflow-hidden">
              <h3 className="text-lg font-medium mb-4">Interactive Ionic Bond Formation</h3>

              <div className="flex flex-col items-center">
                <div className="relative h-60 w-full max-w-md mb-4">
                  {/* Sodium atom */}
                  <div
                    className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      transform: `translate(-50%, -50%) ${showElectronTransfer ? "translateX(-20px)" : "translateX(0)"}`,
                    }}
                  >
                    <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl relative">
                      Na
                      {!showElectronTransfer && (
                        <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-xs font-bold animate-pulse">
                          e-
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Chlorine atom */}
                  <div
                    className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      transform: `translate(50%, -50%) ${showElectronTransfer ? "translateX(20px)" : "translateX(0)"}`,
                    }}
                  >
                    <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl relative">
                      Cl
                      {showElectronTransfer && (
                        <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-white border-2 border-green-500 flex items-center justify-center text-xs font-bold animate-pulse">
                          e-
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Electron animation */}
                  {electronDistance > 0 && electronDistance < 100 && !showElectronTransfer && (
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-xs font-bold transition-all duration-300"
                      style={{
                        left: `calc(25% + ${electronDistance * 0.5}%)`,
                      }}
                    >
                      e-
                    </div>
                  )}

                  {/* Ions after transfer */}
                  {showElectronTransfer && (
                    <>
                      <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-blue-600 -translate-x-[20px]">
                        Na<sup>+</sup>
                      </div>
                      <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-lg font-bold text-green-600 translate-x-[20px]">
                        Cl<sup>-</sup>
                      </div>

                      {/* Attraction line */}
                      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 transform -translate-y-1/2 opacity-70"></div>

                      {/* Force labels */}
                      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-sm text-center text-muted-foreground">
                        Electrostatic Attraction
                        <div className="mt-1 flex justify-center">
                          <svg width="100" height="20" viewBox="0 0 100 20">
                            <path
                              d="M10,10 L90,10"
                              stroke="currentColor"
                              strokeWidth="1"
                              strokeDasharray="5,5"
                              fill="none"
                            />
                            <path
                              d="M10,10 L30,5 L50,15 L70,5 L90,10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full max-w-md mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Na</span>
                    <span className="text-sm text-muted-foreground">Cl</span>
                  </div>
                  <Slider
                    value={[electronDistance]}
                    onValueChange={(values) => setElectronDistance(values[0])}
                    min={0}
                    max={100}
                    step={1}
                    disabled={showElectronTransfer}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Electron near Na</span>
                    <span>Electron near Cl</span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    if (showElectronTransfer) {
                      setShowElectronTransfer(false)
                      setElectronDistance(0)
                    } else {
                      setShowElectronTransfer(true)
                    }
                  }}
                  variant={showElectronTransfer ? "outline" : "default"}
                  className="mb-2"
                >
                  {showElectronTransfer ? "Reset Transfer" : "Complete Transfer"}
                </Button>

                <p className="text-sm text-muted-foreground text-center mt-2">
                  {showElectronTransfer
                    ? "Electron transferred! Na+ and Cl- ions are formed, creating an ionic bond through electrostatic attraction."
                    : "Move the slider to adjust electron position, then click to complete the electron transfer."}
                </p>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Properties of Ionic Compounds</h3>
              <p>
                The strong electrostatic forces between ions in ionic compounds result in several characteristic
                properties:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Physical State</h4>
                  <p className="text-sm">
                    Typically crystalline solids at room temperature with rigid, ordered structures
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Melting/Boiling Points</h4>
                  <p className="text-sm">High melting and boiling points due to strong electrostatic forces</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Electrical Conductivity</h4>
                  <p className="text-sm">Poor conductors as solids, but good conductors when molten or in solution</p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Solubility</h4>
                  <p className="text-sm">Often soluble in water and other polar solvents</p>
                </div>
              </div>

              <h3>Examples of Ionic Compounds</h3>
              <ul>
                <li>Sodium Chloride (NaCl) - table salt</li>
                <li>Calcium Carbonate (CaCO₃) - limestone, chalk</li>
                <li>Magnesium Oxide (MgO) - used in refractory materials</li>
                <li>Potassium Hydroxide (KOH) - used in soap making</li>
                <li>Ammonium Nitrate (NH₄NO₃) - used in fertilizers</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Covalent Bonds */}
        {activeSection === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Covalent Bonds</h2>
              <p>
                Covalent bonds form when atoms share electrons rather than transferring them completely. This type of
                bonding typically occurs between non-metal atoms with similar electronegativities.
              </p>

              <h3>Characteristics of Covalent Bonds</h3>
              <ul>
                <li>Sharing of electron pairs between atoms</li>
                <li>Typically form between non-metal atoms</li>
                <li>Can be polar or nonpolar depending on the electronegativity difference</li>
                <li>Result in discrete molecules rather than extended lattices</li>
                <li>Generally have lower melting and boiling points than ionic compounds</li>
                <li>Poor conductors of electricity</li>
              </ul>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Interactive Covalent Bond</h3>
              <div className="flex flex-col items-center">
                <div className="relative h-60 w-full max-w-md mb-4 bg-black/20 rounded-lg border border-border overflow-hidden">
                  <canvas ref={canvasRef} width="400" height="200" className="w-full h-full"></canvas>

                  {/* Controls overlay */}
                  <div className="absolute bottom-2 left-2 right-2 bg-background/80 backdrop-blur-sm rounded-md p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs">Electron Sharing</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs px-2"
                        onClick={() => setShowElectronSharing(!showElectronSharing)}
                      >
                        {showElectronSharing ? "Hide" : "Show"} Orbital Overlap
                      </Button>
                    </div>
                    <Slider
                      value={[electronSharing]}
                      onValueChange={(values) => setElectronSharing(values[0])}
                      min={0}
                      max={100}
                      step={1}
                      className="mb-1"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Weak Sharing</span>
                      <span>Strong Sharing</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-black/10 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Bond Type</h4>
                    <p className="text-xs text-muted-foreground">
                      {electronSharing < 33
                        ? "Weak Covalent Bond"
                        : electronSharing < 66
                          ? "Single Covalent Bond"
                          : "Strong Covalent Bond"}
                    </p>
                  </div>

                  <div className="bg-black/10 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Bond Energy</h4>
                    <p className="text-xs text-muted-foreground">
                      {electronSharing < 33
                        ? "Low (< 200 kJ/mol)"
                        : electronSharing < 66
                          ? "Medium (200-400 kJ/mol)"
                          : "High (> 400 kJ/mol)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Types of Covalent Bonds</h3>

              <h4>Single Bonds</h4>
              <p>
                A single bond consists of one shared pair of electrons. It is represented by a single line between atoms
                in a molecular formula (e.g., H-H in H₂).
              </p>

              <h4>Double Bonds</h4>
              <p>
                A double bond consists of two shared pairs of electrons. It is represented by a double line between
                atoms (e.g., O=O in O₂).
              </p>

              <h4>Triple Bonds</h4>
              <p>
                A triple bond consists of three shared pairs of electrons. It is represented by a triple line between
                atoms (e.g., N≡N in N₂).
              </p>

              <h3>Polar and Nonpolar Covalent Bonds</h3>
              <p>
                Covalent bonds can be classified as polar or nonpolar based on the electronegativity difference between
                the bonded atoms:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Nonpolar Covalent Bonds</h4>
                  <p className="text-sm">
                    Form between atoms with identical or very similar electronegativities. The electron pair is shared
                    equally between atoms.
                    <br />
                    <br />
                    Examples: H₂, O₂, N₂, CH₄
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="text-base font-medium mb-2">Polar Covalent Bonds</h4>
                  <p className="text-sm">
                    Form between atoms with different electronegativities. The electron pair is shared unequally,
                    creating partial positive and negative charges.
                    <br />
                    <br />
                    Examples: H₂O, NH₃, HCl
                  </p>
                </div>
              </div>

              <h3>Properties of Covalent Compounds</h3>
              <ul>
                <li>Exist as gases, liquids, or soft solids at room temperature</li>
                <li>Generally have lower melting and boiling points than ionic compounds</li>
                <li>Poor conductors of electricity</li>
                <li>Often insoluble in water but soluble in nonpolar solvents</li>
                <li>Many are flammable</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Metallic Bonds */}
        {activeSection === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Metallic Bonds</h2>
              <p>
                Metallic bonds form between metal atoms. In this type of bonding, the valence electrons are delocalized
                and shared among a lattice of positive metal ions.
              </p>

              <h3>The "Sea of Electrons" Model</h3>
              <p>
                Metallic bonding is often described using the "sea of electrons" model. In this model, the metal atoms
                form a lattice of positive ions (cations) surrounded by a "sea" of delocalized electrons that are free
                to move throughout the structure.
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                  {Array(64)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border border-white/10 flex items-center justify-center">
                        {Math.random() > 0.7 && (
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{
                              animationDuration: `${1 + Math.random() * 2}s`,
                              animationDelay: `${Math.random() * 2}s`,
                            }}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <h3 className="text-lg font-medium mb-4 relative z-10">Metallic Bonding Visualization</h3>

              <div className="relative z-10 flex justify-center mb-4">
                <div className="grid grid-cols-4 grid-rows-4 gap-4 max-w-md">
                  {Array(16)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 font-bold"
                      >
                        M+
                      </div>
                    ))}
                </div>
              </div>

              <div className="relative z-10 text-center">
                <p className="text-sm mb-4">
                  The metallic bond consists of positively charged metal ions (M+) in a "sea" of delocalized electrons.
                  The electrons (blue dots) are free to move throughout the structure.
                </p>

                <div className="flex justify-center gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Metal Ions</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-gray-800 text-xs font-bold">
                        M+
                      </div>
                      <span className="text-xs">Positive metal cations</span>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-3 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Electrons</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-xs">Delocalized electrons</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Properties of Metals Due to Metallic Bonding</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Electrical Conductivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      The delocalized electrons can move freely throughout the metal, allowing metals to conduct
                      electricity.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Thermal Conductivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      The mobile electrons can transfer kinetic energy quickly through the metal, making metals good
                      thermal conductors.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Malleability & Ductility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      Layers of metal ions can slide past each other without breaking bonds, allowing metals to be
                      hammered into sheets or drawn into wires.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Luster</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      The sea of electrons can absorb and re-emit photons of light, giving metals their characteristic
                      shiny appearance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h3>Examples of Metals with Metallic Bonding</h3>
              <ul>
                <li>Copper (Cu) - used in electrical wiring</li>
                <li>Aluminum (Al) - used in aircraft construction and food packaging</li>
                <li>Iron (Fe) - used in construction and manufacturing</li>
                <li>Gold (Au) - used in jewelry and electronics</li>
                <li>Silver (Ag) - used in jewelry, photography, and electronics</li>
              </ul>

              <h3>Alloys</h3>
              <p>
                Alloys are mixtures of a metal with other elements (usually other metals). The presence of
                different-sized atoms in the metallic lattice can enhance certain properties of the metal.
              </p>

              <p>Examples of common alloys include:</p>
              <ul>
                <li>Steel (iron + carbon)</li>
                <li>Brass (copper + zinc)</li>
                <li>Bronze (copper + tin)</li>
                <li>Sterling silver (silver + copper)</li>
                <li>14K gold (gold + silver, copper, and other metals)</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Intermolecular Forces */}
        {activeSection === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="prose dark:prose-invert max-w-none">
              <h2>Intermolecular Forces</h2>
              <p>
                Intermolecular forces are attractions that occur between molecules, rather than within them. These
                forces are generally weaker than the covalent, ionic, or metallic bonds that hold atoms together within
                molecules or compounds.
              </p>

              <p>
                While chemical bonds (intramolecular forces) determine the structure and properties of individual
                molecules, intermolecular forces determine the physical properties of substances, such as melting and
                boiling points, surface tension, and viscosity.
              </p>
            </div>

            {/* London Dispersion Forces */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5 text-indigo-500" />
                  London Dispersion Forces
                </CardTitle>
                <CardDescription>The weakest but most universal intermolecular force</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">What are London Dispersion Forces?</h3>
                    <p className="text-muted-foreground mb-4">
                      London dispersion forces are weak, temporary attractive forces that occur between all atoms and
                      molecules due to the random movement of electrons. These forces are caused by temporary dipoles
                      that form when electrons in neighboring atoms or molecules are momentarily concentrated in one
                      area, creating a temporary negative charge in that region and a temporary positive charge
                      elsewhere.
                    </p>

                    <h4 className="font-medium mb-2">Key Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                      <li>Present between all molecules, but particularly important in non-polar molecules</li>
                      <li>Strength increases with molecular size and surface area</li>
                      <li>Weakest of all intermolecular forces (0.05-40 kJ/mol)</li>
                      <li>Responsible for the condensation of noble gases and non-polar molecules</li>
                      <li>Temporary and fluctuating in nature</li>
                    </ul>

                    <h4 className="font-medium mb-2">Examples:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Noble gases (He, Ne, Ar)</li>
                      <li>Halogens (F₂, Cl₂, Br₂, I₂)</li>
                      <li>Non-polar molecules (CH₄, CCl₄)</li>
                      <li>Hydrocarbons (hexane, octane)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">London Forces Animation</h3>
                    <div className="bg-black/20 rounded-lg overflow-hidden border border-border">
                      <canvas ref={londonForcesCanvasRef} width="400" height="250" className="w-full"></canvas>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Animation showing temporary dipoles forming between two argon atoms. The electron distribution
                      fluctuates, creating temporary positive (δ+) and negative (δ-) regions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dipole-Dipole Interactions */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
                <CardTitle className="flex items-center gap-2">
                  <Magnet className="h-5 w-5 text-blue-500" />
                  Dipole-Dipole Interactions
                </CardTitle>
                <CardDescription>Attractions between polar molecules</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">What are Dipole-Dipole Interactions?</h3>
                    <p className="text-muted-foreground mb-4">
                      Dipole-dipole interactions occur between polar molecules, which have permanent dipoles due to
                      differences in electronegativity between atoms. The positive end of one polar molecule is
                      attracted to the negative end of another polar molecule.
                    </p>

                    <h4 className="font-medium mb-2">Key Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                      <li>Occur only between polar molecules</li>
                      <li>Stronger than London dispersion forces (5-25 kJ/mol)</li>
                      <li>Strength depends on the magnitude of the dipole moments</li>
                      <li>Directional in nature - molecules must be properly oriented</li>
                      <li>Contribute significantly to physical properties like boiling points</li>
                    </ul>

                    <h4 className="font-medium mb-2">Examples:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Hydrogen chloride (HCl)</li>
                      <li>Acetone (C₃H₆O)</li>
                      <li>Sulfur dioxide (SO₂)</li>
                      <li>Carbonyl compounds (aldehydes and ketones)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Dipole-Dipole Animation</h3>
                    <div className="bg-black/20 rounded-lg overflow-hidden border border-border">
                      <canvas ref={dipoleCanvasRef} width="400" height="250" className="w-full"></canvas>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Animation showing dipole-dipole interactions between HCl molecules. The partially positive
                      hydrogen end of one molecule is attracted to the partially negative chlorine end of another.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hydrogen Bonding */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-sky-500/10 to-cyan-500/10">
                <CardTitle className="flex items-center gap-2">
                  <Droplets className="h-5 w-5 text-sky-500" />
                  Hydrogen Bonding
                </CardTitle>
                <CardDescription>A special type of dipole-dipole interaction</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">What is Hydrogen Bonding?</h3>
                    <p className="text-muted-foreground mb-4">
                      Hydrogen bonding is a special type of dipole-dipole interaction that occurs when hydrogen is
                      bonded to highly electronegative elements (nitrogen, oxygen, or fluorine). The hydrogen atom,
                      having a partial positive charge, is attracted to the lone pair of electrons on the
                      electronegative atom of another molecule.
                    </p>

                    <h4 className="font-medium mb-2">Key Characteristics:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-4">
                      <li>Occurs only when H is bonded to N, O, or F</li>
                      <li>Strongest intermolecular force (5-30 kJ/mol)</li>
                      <li>Responsible for water's unique properties (high boiling point, surface tension)</li>
                      <li>Critical in biological systems (DNA, protein structure)</li>
                      <li>Highly directional in nature</li>
                    </ul>

                    <h4 className="font-medium mb-2">Examples:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Water (H₂O)</li>
                      <li>Ammonia (NH₃)</li>
                      <li>Hydrogen fluoride (HF)</li>
                      <li>Alcohols (R-OH)</li>
                      <li>DNA base pairs</li>
                      <li>Proteins</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">Hydrogen Bonding Animation</h3>
                    <div className="bg-black/20 rounded-lg overflow-hidden border border-border">
                      <canvas ref={hydrogenBondCanvasRef} width="400" height="250" className="w-full"></canvas>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Animation showing hydrogen bonding between water molecules. The partially positive hydrogen of one
                      water molecule is attracted to the lone pair of electrons on the oxygen of another water molecule.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="prose dark:prose-invert max-w-none">
              <h3>Impact of Intermolecular Forces on Physical Properties</h3>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-border p-2">Property</th>
                      <th className="border border-border p-2">Impact of Intermolecular Forces</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border p-2">Melting/Boiling Points</td>
                      <td className="border border-border p-2">
                        Stronger intermolecular forces lead to higher melting and boiling points, as more energy is
                        required to overcome these attractions.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Viscosity</td>
                      <td className="border border-border p-2">
                        Stronger intermolecular forces increase viscosity, as molecules have stronger attractions to
                        each other and resist flow.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Surface Tension</td>
                      <td className="border border-border p-2">
                        Stronger intermolecular forces increase surface tension, as molecules at the surface are pulled
                        inward by attractions to other molecules.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Vapor Pressure</td>
                      <td className="border border-border p-2">
                        Stronger intermolecular forces decrease vapor pressure, as fewer molecules have enough energy to
                        escape the liquid phase.
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-border p-2">Solubility</td>
                      <td className="border border-border p-2">
                        "Like dissolves like" - substances with similar intermolecular forces tend to be soluble in each
                        other.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>Relative Strengths of Chemical Bonds and Intermolecular Forces</h3>
              <p>
                Understanding the relative strengths of different types of bonds and forces is important for predicting
                the behavior of substances.
              </p>

              <p>From strongest to weakest:</p>
              <ol>
                <li>Covalent, Ionic, and Metallic Bonds (100-1000 kJ/mol)</li>
                <li>Ion-Dipole Interactions (10-50 kJ/mol)</li>
                <li>Hydrogen Bonding (5-30 kJ/mol)</li>
                <li>Dipole-Dipole Interactions (5-25 kJ/mol)</li>
                <li>London Dispersion Forces (0.05-40 kJ/mol)</li>
              </ol>
            </div>
          </motion.div>
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
              <h2>Practice Quiz: Chemical Bonding</h2>
              <p>
                Test your understanding of chemical bonding concepts with this quiz. Select the best answer for each
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
        <Button variant="outline" onClick={handlePrevious} disabled={activeSection === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={activeSection === sections.length - 1}>
          {activeSection === sections.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  )
}

