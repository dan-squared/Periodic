"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, ArrowLeft, FlaskRoundIcon as Flask, Check, X, HelpCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

// Carbon Bonding Animation component
const CarbonBondingAnimation = () => {
  return (
    <div className="relative w-full h-full">
      {/* Carbon atom in center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-white font-bold">
        C
      </div>

      {/* Four bonds radiating outward */}
      {[0, 90, 180, 270].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 h-1 bg-gray-400"
          style={{
            width: "40%",
            transformOrigin: "left center",
            transform: `rotate(${angle}deg) translateX(20px)`,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Atoms at the end of each bond */}
      {[
        { angle: 0, label: "H", color: "bg-blue-500" },
        { angle: 90, label: "H", color: "bg-blue-500" },
        { angle: 180, label: "H", color: "bg-blue-500" },
        { angle: 270, label: "OH", color: "bg-red-500" },
      ].map((atom, i) => (
        <motion.div
          key={i}
          className={`absolute w-10 h-10 rounded-full ${atom.color} flex items-center justify-center text-white font-bold`}
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(0deg) translate(${Math.cos((atom.angle * Math.PI) / 180) * 80}px, ${Math.sin((atom.angle * Math.PI) / 180) * 80}px)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.5,
          }}
        >
          {atom.label}
        </motion.div>
      ))}
    </div>
  )
}

// Functional Group Visualization
const FunctionalGroupViz = ({ group }: { group: string }) => {
  const groups: Record<string, { formula: string; structure: React.ReactNode }> = {
    alcohol: {
      formula: "R-OH",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/4 w-24 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-1 bg-gray-400"
            style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
        </div>
      ),
    },
    aldehyde: {
      formula: "R-CHO",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/4 w-24 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div
            className="absolute top-1/4 left-1/2 w-24 h-1 bg-gray-400"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center bottom" }}
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-1 bg-gray-400"
            style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
        </div>
      ),
    },
    ketone: {
      formula: "R-CO-R",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/4 w-24 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div
            className="absolute top-1/4 left-1/2 w-24 h-1 bg-gray-400"
            style={{ transform: "rotate(-90deg)", transformOrigin: "center bottom" }}
          />
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-24 h-1 bg-gray-400"
            style={{ transform: "rotate(0deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-3/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
        </div>
      ),
    },
    carboxylic: {
      formula: "R-COOH",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/5 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/5 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div
            className="absolute top-1/3 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(-45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(0deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
        </div>
      ),
    },
    amine: {
      formula: "R-NH₂",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/4 w-24 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
            N
          </div>
          <div
            className="absolute top-1/3 left-1/2 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(-45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
        </div>
      ),
    },
    ester: {
      formula: "R-COO-R'",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/6 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div
            className="absolute top-1/3 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(-45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(0deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(0deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R'
          </div>
        </div>
      ),
    },
    amide: {
      formula: "R-CONH₂",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/6 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div
            className="absolute top-1/3 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(-45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white">
            O
          </div>
          <div
            className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(0deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
            N
          </div>
          <div
            className="absolute top-1/3 left-1/2 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(-45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/4 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
          <div
            className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-400"
            style={{ transform: "rotate(45deg)", transformOrigin: "left center" }}
          />
          <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
            H
          </div>
        </div>
      ),
    },
    alkene: {
      formula: "R-CH=CH-R",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/6 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div
            className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "translate(0, 3px)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
        </div>
      ),
    },
    alkyne: {
      formula: "R-C≡C-R",
      structure: (
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/6 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
          <div className="absolute top-1/2 left-1/6 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div
            className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "translate(0, 3px)", transformOrigin: "left center" }}
          />
          <div
            className="absolute top-1/2 left-1/3 w-16 h-1 bg-gray-400"
            style={{ transform: "translate(0, -3px)", transformOrigin: "left center" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-white">
            C
          </div>
          <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-gray-400" style={{ transformOrigin: "left center" }} />
          <div className="absolute top-1/2 left-2/3 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
            R
          </div>
        </div>
      ),
    },
  }

  return (
    <div className="space-y-4">
      <div className="text-xl font-bold text-center">{group.charAt(0).toUpperCase() + group.slice(1)}</div>
      <div className="text-lg text-center">{groups[group]?.formula || "R-X"}</div>
      <div className="h-64 border rounded-lg p-4">
        {groups[group]?.structure || (
          <div className="h-full flex items-center justify-center">Select a functional group</div>
        )}
      </div>
    </div>
  )
}

// Isomer Visualization
const IsomerViz = () => {
  const [activeIsomer, setActiveIsomer] = useState<"structural" | "geometric" | "optical">("structural")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="structural" onValueChange={(v) => setActiveIsomer(v as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="structural">Structural</TabsTrigger>
          <TabsTrigger value="geometric">Geometric</TabsTrigger>
          <TabsTrigger value="optical">Optical</TabsTrigger>
        </TabsList>
        <TabsContent value="structural" className="p-4 border rounded-lg min-h-[200px]">
          <h3 className="font-medium mb-2">Structural Isomers</h3>
          <p className="mb-4 text-sm">Same molecular formula, different connectivity</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 border rounded text-center">
              <div className="font-mono">CH₃-CH₂-CH₂-CH₃</div>
              <div className="text-sm mt-1">Butane</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-mono">CH₃-CH(CH₃)-CH₃</div>
              <div className="text-sm mt-1">Isobutane</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="geometric" className="p-4 border rounded-lg min-h-[200px]">
          <h3 className="font-medium mb-2">Geometric Isomers</h3>
          <p className="mb-4 text-sm">Same connectivity, different spatial arrangement around a double bond</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 border rounded text-center">
              <div className="font-mono">H─C═C─H</div>
              <div className="font-mono">│ │</div>
              <div className="font-mono">H H</div>
              <div className="text-sm mt-1">cis-isomer</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-mono">H───C═C───H</div>
              <div className="font-mono"> │ │</div>
              <div className="font-mono"> H H</div>
              <div className="text-sm mt-1">trans-isomer</div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="optical" className="p-4 border rounded-lg min-h-[200px]">
          <h3 className="font-medium mb-2">Optical Isomers</h3>
          <p className="mb-4 text-sm">Mirror images that cannot be superimposed (chiral molecules)</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-2 border rounded text-center">
              <div className="font-mono"> H</div>
              <div className="font-mono"> │</div>
              <div className="font-mono">H─C─OH</div>
              <div className="font-mono"> │</div>
              <div className="font-mono"> CH₃</div>
              <div className="text-sm mt-1">(R)-lactic acid</div>
            </div>
            <div className="p-2 border rounded text-center">
              <div className="font-mono"> H</div>
              <div className="font-mono"> │</div>
              <div className="font-mono">HO─C─H</div>
              <div className="font-mono"> │</div>
              <div className="font-mono"> CH₃</div>
              <div className="text-sm mt-1">(S)-lactic acid</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function OrganicChemistryLesson() {
  const [activeSection, setActiveSection] = useState(0)
  const [selectedFunctionalGroup, setSelectedFunctionalGroup] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({})

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

          <div className="relative h-60 border rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <CarbonBondingAnimation />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
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

            <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Types of Organic Compounds</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Alkanes:</strong> Single bonds (C-C), saturated
                </li>
                <li>
                  <strong>Alkenes:</strong> Contains carbon-carbon double bonds
                </li>
                <li>
                  <strong>Alkynes:</strong> Contains carbon-carbon triple bonds
                </li>
                <li>
                  <strong>Alcohols:</strong> Contains -OH group
                </li>
                <li>
                  <strong>Aldehydes/Ketones:</strong> Contains carbonyl group (C=O)
                </li>
                <li>
                  <strong>Carboxylic Acids:</strong> Contains -COOH group
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
            Functional groups are specific arrangements of atoms within molecules that give the molecule characteristic
            chemical reactions. They are the reactive parts of organic molecules.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Common Functional Groups</h3>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {["alcohol", "aldehyde", "ketone", "carboxylic", "amine", "ester", "amide", "alkene", "alkyne"].map(
                  (group) => (
                    <Button
                      key={group}
                      variant={selectedFunctionalGroup === group ? "default" : "outline"}
                      onClick={() => setSelectedFunctionalGroup(group)}
                      className="text-sm"
                    >
                      {group.charAt(0).toUpperCase() + group.slice(1)}
                    </Button>
                  ),
                )}
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Properties & Reactions</h4>
                {selectedFunctionalGroup === "alcohol" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-OH
                    </p>
                    <p>
                      <strong>Properties:</strong> Hydrogen bonding, polar
                    </p>
                    <p>
                      <strong>Reactions:</strong> Oxidation, dehydration, esterification
                    </p>
                    <p>
                      <strong>Examples:</strong> Ethanol, methanol, isopropanol
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "aldehyde" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-CHO
                    </p>
                    <p>
                      <strong>Properties:</strong> Polar carbonyl group, reactive
                    </p>
                    <p>
                      <strong>Reactions:</strong> Oxidation, reduction, nucleophilic addition
                    </p>
                    <p>
                      <strong>Examples:</strong> Formaldehyde, acetaldehyde, benzaldehyde
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "ketone" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-CO-R
                    </p>
                    <p>
                      <strong>Properties:</strong> Polar carbonyl group, less reactive than aldehydes
                    </p>
                    <p>
                      <strong>Reactions:</strong> Reduction, nucleophilic addition
                    </p>
                    <p>
                      <strong>Examples:</strong> Acetone, benzophenone
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "carboxylic" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-COOH
                    </p>
                    <p>
                      <strong>Properties:</strong> Acidic, polar, hydrogen bonding
                    </p>
                    <p>
                      <strong>Reactions:</strong> Esterification, decarboxylation
                    </p>
                    <p>
                      <strong>Examples:</strong> Acetic acid, benzoic acid, formic acid
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "amine" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-NH₂
                    </p>
                    <p>
                      <strong>Properties:</strong> Basic, hydrogen bonding
                    </p>
                    <p>
                      <strong>Reactions:</strong> Alkylation, acylation
                    </p>
                    <p>
                      <strong>Examples:</strong> Methylamine, aniline
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "ester" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-COO-R'
                    </p>
                    <p>
                      <strong>Properties:</strong> Polar, pleasant odors
                    </p>
                    <p>
                      <strong>Reactions:</strong> Hydrolysis, saponification
                    </p>
                    <p>
                      <strong>Examples:</strong> Ethyl acetate, methyl benzoate
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "amide" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-CONH₂
                    </p>
                    <p>
                      <strong>Properties:</strong> Polar, hydrogen bonding
                    </p>
                    <p>
                      <strong>Reactions:</strong> Hydrolysis
                    </p>
                    <p>
                      <strong>Examples:</strong> Acetamide, benzamide
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "alkene" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-CH=CH-R
                    </p>
                    <p>
                      <strong>Properties:</strong> Unsaturated, reactive double bond
                    </p>
                    <p>
                      <strong>Reactions:</strong> Addition, polymerization
                    </p>
                    <p>
                      <strong>Examples:</strong> Ethene (ethylene), propene (propylene)
                    </p>
                  </div>
                )}
                {selectedFunctionalGroup === "alkyne" && (
                  <div className="space-y-2">
                    <p>
                      <strong>Formula:</strong> R-C≡C-R
                    </p>
                    <p>
                      <strong>Properties:</strong> Unsaturated, reactive triple bond
                    </p>
                    <p>
                      <strong>Reactions:</strong> Addition, polymerization
                    </p>
                    <p>
                      <strong>Examples:</strong> Ethyne (acetylene), propyne
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <FunctionalGroupViz group={selectedFunctionalGroup || ""} />
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
            IUPAC nomenclature provides a systematic way to name organic compounds. It allows chemists worldwide to
            communicate molecular structures unambiguously.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium mb-2">Naming Rules:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Identify the longest continuous carbon chain (parent chain)</li>
              <li>Number the carbons in the chain to give substituents the lowest possible numbers</li>
              <li>Identify and name all substituents (with position numbers)</li>
              <li>Arrange substituents alphabetically (ignoring prefixes like di-, tri-)</li>
              <li>Name the parent chain with appropriate suffix for functional group</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Example: Alcohols</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="font-mono text-center p-2 border rounded">CH₃-CH₂-CH₂-OH</div>
                  <div>
                    <p>
                      <strong>1.</strong> Three carbon chain = propane
                    </p>
                    <p>
                      <strong>2.</strong> OH group on C1 = propan-1-ol
                    </p>
                    <p>
                      <strong>3.</strong> Final name: propan-1-ol
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Example: Branched Alkanes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="font-mono text-center p-2 border rounded">
                    <div>CH₃</div>
                    <div>│</div>
                    <div>CH₃-CH-CH₂-CH₃</div>
                  </div>
                  <div>
                    <p>
                      <strong>1.</strong> Four carbon chain = butane
                    </p>
                    <p>
                      <strong>2.</strong> Methyl group on C2
                    </p>
                    <p>
                      <strong>3.</strong> Final name: 2-methylbutane
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg mt-6">
            <h3 className="text-lg font-medium mb-2">Common Suffixes for Functional Groups</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Alkane</div>
                <div className="text-sm">-ane</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Alkene</div>
                <div className="text-sm">-ene</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Alkyne</div>
                <div className="text-sm">-yne</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Alcohol</div>
                <div className="text-sm">-ol</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Aldehyde</div>
                <div className="text-sm">-al</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Ketone</div>
                <div className="text-sm">-one</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Carboxylic Acid</div>
                <div className="text-sm">-oic acid</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Ester</div>
                <div className="text-sm">-oate</div>
              </div>
              <div className="p-2 border rounded-md text-center">
                <div className="font-medium">Amine</div>
                <div className="text-sm">-amine</div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Interactive Nomenclature Builder</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg bg-white/80 dark:bg-black/20">
                <h4 className="font-medium mb-2">Prefixes (Number of C atoms)</h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="p-1 border rounded">meth- (1)</div>
                  <div className="p-1 border rounded">eth- (2)</div>
                  <div className="p-1 border rounded">prop- (3)</div>
                  <div className="p-1 border rounded">but- (4)</div>
                  <div className="p-1 border rounded">pent- (5)</div>
                  <div className="p-1 border rounded">hex- (6)</div>
                  <div className="p-1 border rounded">hept- (7)</div>
                  <div className="p-1 border rounded">oct- (8)</div>
                </div>
              </div>
              <div className="p-3 border rounded-lg bg-white/80 dark:bg-black/20">
                <h4 className="font-medium mb-2">Suffixes (Functional Groups)</h4>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <div className="p-1 border rounded">-ane (alkane)</div>
                  <div className="p-1 border rounded">-ene (alkene)</div>
                  <div className="p-1 border rounded">-yne (alkyne)</div>
                  <div className="p-1 border rounded">-ol (alcohol)</div>
                  <div className="p-1 border rounded">-al (aldehyde)</div>
                  <div className="p-1 border rounded">-one (ketone)</div>
                  <div className="p-1 border rounded">-oic acid (carboxylic acid)</div>
                  <div className="p-1 border rounded">-amine (amine)</div>
                </div>
              </div>
              <div className="p-3 border rounded-lg bg-white/80 dark:bg-black/20">
                <h4 className="font-medium mb-2">Position Indicators</h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <div className="p-1 border rounded">1-</div>
                  <div className="p-1 border rounded">2-</div>
                  <div className="p-1 border rounded">3-</div>
                  <div className="p-1 border rounded">4-</div>
                  <div className="p-1 border rounded">iso-</div>
                  <div className="p-1 border rounded">sec-</div>
                  <div className="p-1 border rounded">tert-</div>
                  <div className="p-1 border rounded">neo-</div>
                </div>
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
            Isomers are compounds with the same molecular formula but different structural arrangements. This difference
            in arrangement leads to different physical and chemical properties.
          </p>

          <div className="bg-muted/20 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-medium mb-2">Types of Isomerism:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Structural Isomerism:</strong> Different connectivity of atoms
                <ul className="list-disc pl-5 mt-1">
                  <li>Chain isomers: Different carbon skeleton</li>
                  <li>Position isomers: Same functional group at different positions</li>
                  <li>Functional group isomers: Different functional groups</li>
                </ul>
              </li>
              <li>
                <strong>Stereoisomerism:</strong> Same connectivity but different spatial arrangement
                <ul className="list-disc pl-5 mt-1">
                  <li>Geometric (cis-trans) isomers: Different arrangement around a double bond</li>
                  <li>Optical isomers: Mirror images that cannot be superimposed (chiral molecules)</li>
                </ul>
              </li>
            </ul>
          </div>

          <IsomerViz />

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Importance of Isomerism</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <h4 className="font-medium mb-2">Biological Activity</h4>
                <p className="text-sm">
                  Different isomers can have dramatically different biological effects. For example, one enantiomer of a
                  drug may be therapeutic while its mirror image is toxic or inactive.
                </p>
              </div>
              <div className="p-4 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <h4 className="font-medium mb-2">Physical Properties</h4>
                <p className="text-sm">
                  Isomers often have different melting points, boiling points, solubilities, and other physical
                  properties due to differences in their molecular shape and ability to interact with other molecules.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Organic Reactions",
      content: (
        <div className="space-y-4">
          <p>
            Organic reactions involve the transformation of organic compounds. Understanding reaction mechanisms helps
            predict outcomes and design new synthetic pathways.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-muted/20 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Common Reaction Types:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Addition:</strong> Atoms add to a double or triple bond
                  </li>
                  <li>
                    <strong>Elimination:</strong> Removal of atoms to form a double bond
                  </li>
                  <li>
                    <strong>Substitution:</strong> Replacement of an atom or group
                  </li>
                  <li>
                    <strong>Rearrangement:</strong> Atoms reorganize within molecule
                  </li>
                  <li>
                    <strong>Oxidation-Reduction:</strong> Change in oxidation state
                  </li>
                </ul>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Reaction Mechanisms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">
                    Reaction mechanisms describe the step-by-step process of how reactants transform into products,
                    including the movement of electrons and formation/breaking of bonds.
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 border rounded">
                      <div className="font-medium">SN1</div>
                      <div>Unimolecular nucleophilic substitution</div>
                    </div>
                    <div className="p-2 border rounded">
                      <div className="font-medium">SN2</div>
                      <div>Bimolecular nucleophilic substitution</div>
                    </div>
                    <div className="p-2 border rounded">
                      <div className="font-medium">E1</div>
                      <div>Unimolecular elimination</div>
                    </div>
                    <div className="p-2 border rounded">
                      <div className="font-medium">E2</div>
                      <div>Bimolecular elimination</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Example: Nucleophilic Substitution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-center p-3 border rounded">OH⁻ + CH₃-Br → CH₃-OH + Br⁻</div>
                  <div className="mt-3 text-sm">
                    <p>
                      <strong>Mechanism:</strong> The hydroxide ion (nucleophile) attacks the carbon bearing the bromine
                      (leaving group).
                    </p>
                    <p>
                      <strong>Classification:</strong> SN2 - concerted process where bond formation and bond breaking
                      happen simultaneously.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Example: Elimination</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-center p-3 border rounded">CH₃-CH₂-Br + OH⁻ → CH₂=CH₂ + Br⁻ + H₂O</div>
                  <div className="mt-3 text-sm">
                    <p>
                      <strong>Mechanism:</strong> Base removes a proton adjacent to leaving group, causing elimination
                      and formation of a double bond.
                    </p>
                    <p>
                      <strong>Classification:</strong> E2 - concerted process requiring antiperiplanar arrangement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-4 p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <h3 className="text-lg font-medium mb-3">Factors Affecting Organic Reactions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <h4 className="font-medium mb-1">Electronic Effects</h4>
                <p className="text-sm">Electron-donating or withdrawing groups affect reactivity</p>
              </div>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <h4 className="font-medium mb-1">Steric Hindrance</h4>
                <p className="text-sm">Bulky groups obstruct reactions by physical blocking</p>
              </div>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <h4 className="font-medium mb-1">Solvent Effects</h4>
                <p className="text-sm">Solvent polarity affects stabilization of intermediates</p>
              </div>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <h4 className="font-medium mb-1">Temperature</h4>
                <p className="text-sm">Higher temperatures generally increase reaction rates</p>
              </div>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <h4 className="font-medium mb-1">Catalysts</h4>
                <p className="text-sm">Lower activation energy and allow new reaction pathways</p>
              </div>
              <div className="p-3 border rounded-lg bg-white/50 dark:bg-black/20">
                <h4 className="font-medium mb-1">Leaving Group</h4>
                <p className="text-sm">Better leaving groups increase substitution/elimination rates</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Quiz",
      content: (
        <div className="space-y-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Practice Quiz: Organic Chemistry</h2>
            <p>
              Test your understanding of organic chemistry concepts with this quiz. Select the best answer for each
              question.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                id: 1,
                question:
                  "Which functional group is characterized by the presence of a carbonyl group (C=O) between two carbon atoms?",
                options: ["Alcohol", "Aldehyde", "Ketone", "Carboxylic acid"],
                correctAnswer: "Ketone",
                explanation:
                  "Ketones contain a carbonyl group (C=O) bonded to two carbon atoms. Aldehydes have the carbonyl bonded to at least one hydrogen, while carboxylic acids have an -OH group attached to the carbonyl.",
              },
              {
                id: 2,
                question: "What type of isomers are butane and 2-methylpropane?",
                options: ["Geometric isomers", "Optical isomers", "Conformational isomers", "Structural isomers"],
                correctAnswer: "Structural isomers",
                explanation:
                  "Butane (CH₃CH₂CH₂CH₃) and 2-methylpropane (CH₃CH(CH₃)CH₃) have the same molecular formula (C₄H₁₀) but different connectivity of atoms, making them structural isomers.",
              },
              {
                id: 3,
                question: "Which reaction mechanism involves a carbocation intermediate?",
                options: ["SN2", "E2", "SN1", "None of the above"],
                correctAnswer: "SN1",
                explanation:
                  "The SN1 (unimolecular nucleophilic substitution) mechanism proceeds through a carbocation intermediate formed by the departure of the leaving group, followed by attack of the nucleophile.",
              },
              {
                id: 4,
                question: "What is the IUPAC name for the following compound: CH₃CH₂CH(OH)CH₃?",
                options: ["1-butanol", "2-butanol", "2-methyl-1-propanol", "Butane-2-ol"],
                correctAnswer: "Butane-2-ol",
                explanation:
                  "The compound has a 4-carbon chain (butane) with an -OH group on the second carbon, making it butane-2-ol. The modern IUPAC name uses the '-ol' suffix with a locator number for the hydroxyl group.",
              },
              {
                id: 5,
                question: "Which of the following compounds can exhibit optical isomerism?",
                options: ["CH₃CH₂CH₃", "CH₃CH₂OH", "CH₃CH(OH)CH₃", "CH₃CHClCH₃"],
                correctAnswer: "CH₃CHClCH₃",
                explanation:
                  "2-chloropropane (CH₃CHClCH₃) has a chiral carbon (bonded to four different groups: -H, -Cl, -CH₃, and -CH₂CH₃), allowing it to exist as optical isomers. The other compounds lack chiral centers.",
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
                        onClick={() => !quizSubmitted && setQuizAnswers({ ...quizAnswers, [question.id]: option })}
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
                        onClick={() =>
                          setShowExplanation({ ...showExplanation, [question.id]: !showExplanation[question.id] })
                        }
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
              onClick={() => setQuizSubmitted(true)}
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
                    <p className="text-4xl font-bold mb-2">
                      {
                        Object.entries(quizAnswers).filter(
                          ([id, answer]) =>
                            answer ===
                            ["Ketone", "Structural isomers", "SN1", "Butane-2-ol", "CH₃CHClCH₃"][Number(id) - 1],
                        ).length
                      }{" "}
                      / 5
                    </p>
                    <p className="text-muted-foreground">
                      {Object.entries(quizAnswers).filter(
                        ([id, answer]) =>
                          answer ===
                          ["Ketone", "Structural isomers", "SN1", "Butane-2-ol", "CH₃CHClCH₃"][Number(id) - 1],
                      ).length === 5
                        ? "Perfect score! Excellent work!"
                        : Object.entries(quizAnswers).filter(
                              ([id, answer]) =>
                                answer ===
                                ["Ketone", "Structural isomers", "SN1", "Butane-2-ol", "CH₃CHClCH₃"][Number(id) - 1],
                            ).length >= 3
                          ? "Good job! Review the questions you missed."
                          : "Keep studying and try again!"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => {
                  setQuizSubmitted(false)
                  setQuizAnswers({})
                  setShowExplanation({})
                }}
              >
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
              <Flask className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium">Organic Chemistry</span>
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
          <ArrowLeft size={16} />
          Previous
        </Button>

        <Button onClick={handleNext} disabled={activeSection === sections.length - 1} className="gap-2">
          Next
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  )
}

