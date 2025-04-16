"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  BookOpen,
  Atom,
  FlaskRoundIcon as Flask,
  Beaker,
  Thermometer,
  Zap,
  Droplet,
  BarChart2,
  Layers,
  GitBranch,
  Search,
  ArrowRight,
  Clock,
  TestTube,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function LessonsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const lessonCategories = [
    {
      title: "Chemical Bonding",
      icon: <Atom size={28} className="text-blue-500" />,
      path: "/lessons/chemical-bonding",
      description: "Learn about ionic, covalent, metallic bonds, and intermolecular forces.",
      color: "border-blue-500/20 hover:border-blue-500/40",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      category: "fundamentals",
      level: "Intermediate",
      duration: "45 min",
      topics: ["Ionic Bonds", "Covalent Bonds", "Metallic Bonds", "Intermolecular Forces"],
    },
    {
      title: "Stoichiometry",
      icon: <BarChart2 size={28} className="text-green-500" />,
      path: "/lessons/stoichiometry",
      description: "Master the mole concept, balancing equations, and unit conversions.",
      color: "border-green-500/20 hover:border-green-500/40",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      category: "fundamentals",
      level: "Beginner",
      duration: "30 min",
      topics: ["Mole Concept", "Balancing Equations", "Limiting Reagents"],
    },
    {
      title: "Acids and Bases",
      icon: <Beaker size={28} className="text-purple-500" />,
      path: "/lessons/acids-bases",
      description: "Explore pH, acid-base properties, buffer solutions, and indicators.",
      color: "border-purple-500/20 hover:border-purple-500/40",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      category: "reactions",
      level: "Intermediate",
      duration: "40 min",
      topics: ["pH Scale", "Neutralization", "Buffer Solutions", "Indicators"],
    },
    {
      title: "States of Matter",
      icon: <Layers size={28} className="text-amber-500" />,
      path: "/lessons/states-of-matter",
      description: "Understand solids, liquids, gases, and phase transitions.",
      color: "border-amber-500/20 hover:border-amber-500/40",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10",
      iconBg: "bg-amber-100 dark:bg-amber-900/30",
      category: "physical",
      level: "Beginner",
      duration: "25 min",
      topics: ["Solids", "Liquids", "Gases", "Phase Changes"],
    },
    {
      title: "Thermochemistry",
      icon: <Thermometer size={28} className="text-red-500" />,
      path: "/lessons/thermochemistry",
      description: "Study heat, temperature, and energy changes in reactions.",
      color: "border-red-500/20 hover:border-red-500/40",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      category: "physical",
      level: "Advanced",
      duration: "50 min",
      topics: ["Enthalpy", "Entropy", "Gibbs Free Energy", "Calorimetry"],
    },
    {
      title: "Chemical Reactions",
      icon: <Zap size={28} className="text-indigo-500" />,
      path: "/lessons/chemical-reactions",
      description: "Learn about reaction types, redox processes, and reaction rates.",
      color: "border-indigo-500/20 hover:border-indigo-500/40",
      bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/20 dark:to-indigo-900/10",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
      category: "reactions",
      level: "Intermediate",
      duration: "35 min",
      topics: ["Reaction Types", "Redox Reactions", "Reaction Rates"],
    },
    {
      title: "Solution Chemistry",
      icon: <Droplet size={28} className="text-sky-500" />,
      path: "/lessons/solution-chemistry",
      description: "Discover solubility, concentration, and colligative properties.",
      color: "border-sky-500/20 hover:border-sky-500/40",
      bgColor: "bg-gradient-to-br from-sky-50 to-sky-100/50 dark:from-sky-950/20 dark:to-sky-900/10",
      iconBg: "bg-sky-100 dark:bg-sky-900/30",
      category: "physical",
      level: "Intermediate",
      duration: "40 min",
      topics: ["Solubility", "Concentration", "Colligative Properties"],
    },
    {
      title: "Equilibrium",
      icon: <GitBranch size={28} className="text-teal-500" />,
      path: "/lessons/equilibrium",
      description: "Understand Le Chatelier's Principle and equilibrium constants.",
      color: "border-teal-500/20 hover:border-teal-500/40",
      bgColor: "bg-gradient-to-br from-teal-50 to-teal-100/50 dark:from-teal-950/20 dark:to-teal-900/10",
      iconBg: "bg-teal-100 dark:bg-teal-900/30",
      category: "physical",
      level: "Advanced",
      duration: "55 min",
      topics: ["Dynamic Equilibrium", "Le Chatelier's Principle", "Equilibrium Constants"],
    },
    {
      title: "Organic Chemistry",
      icon: <Flask size={28} className="text-fuchsia-500" />,
      path: "/lessons/organic-chemistry",
      description: "Explore functional groups, nomenclature, and organic reactions.",
      color: "border-fuchsia-500/20 hover:border-fuchsia-500/40",
      bgColor: "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100/50 dark:from-fuchsia-950/20 dark:to-fuchsia-900/10",
      iconBg: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
      category: "organic",
      level: "Advanced",
      duration: "60 min",
      topics: ["Functional Groups", "Nomenclature", "Reaction Mechanisms"],
    },
    {
      title: "Inorganic Chemistry",
      icon: <TestTube size={28} className="text-emerald-500" />,
      path: "/lessons/inorganic-chemistry",
      description: "Study the properties and reactions of inorganic compounds and elements.",
      color: "border-emerald-500/20 hover:border-emerald-500/40",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
      category: "inorganic",
      level: "Advanced",
      duration: "55 min",
      topics: ["Coordination Compounds", "Transition Metals", "Main Group Elements", "Crystal Field Theory"],
    },
  ]

  const filteredLessons = lessonCategories.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "Advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 md:mb-12"
      >
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-primary/10 mb-4">
          <BookOpen size={28} className="text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Chemistry Lessons</h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore interactive lessons on key chemistry concepts. Select any topic to begin your learning journey.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6 md:mb-8"
      >
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search lessons..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <Tabs defaultValue="all" className="mb-6 md:mb-8">
        <TabsList className="mb-6 md:mb-8 grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
          <TabsTrigger value="reactions">Reactions</TabsTrigger>
          <TabsTrigger value="physical">Physical</TabsTrigger>
          <TabsTrigger value="organic">Organic</TabsTrigger>
          <TabsTrigger value="inorganic">Inorganic</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredLessons.map((lesson) => (
              <LessonCard key={lesson.title} lesson={lesson} variants={item} levelColor={getLevelColor(lesson.level)} />
            ))}
          </motion.div>
        </TabsContent>

        {["fundamentals", "reactions", "physical", "organic", "inorganic"].map((category) => (
          <TabsContent key={category} value={category}>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredLessons
                .filter((lesson) => lesson.category === category)
                .map((lesson) => (
                  <LessonCard
                    key={lesson.title}
                    lesson={lesson}
                    variants={item}
                    levelColor={getLevelColor(lesson.level)}
                  />
                ))}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredLessons.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <p className="text-lg text-muted-foreground mb-4">No lessons found matching your search.</p>
          <Button variant="outline" onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}

function LessonCard({ lesson, variants, levelColor }) {
  return (
    <motion.div variants={variants}>
      <Link href={lesson.path} className="block h-full">
        <Card
          className={cn(
            "overflow-hidden border-2 transition-all duration-300 h-full",
            lesson.color,
            lesson.bgColor,
            "hover:shadow-md hover:-translate-y-1",
          )}
        >
          <div className="p-4 md:p-6">
            <div className="flex items-start gap-3 md:gap-5 mb-3 md:mb-4">
              <div className={cn("rounded-xl p-2 md:p-3 shadow-sm flex-shrink-0", lesson.iconBg)}>{lesson.icon}</div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1 md:mb-2">
                  <h2 className="text-base md:text-xl font-semibold">{lesson.title}</h2>
                  <Badge variant="secondary" className={levelColor}>
                    {lesson.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{lesson.description}</p>
              </div>
            </div>

            <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border">
              <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4">
                {lesson.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="bg-background/80 text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3 md:h-4 md:w-4" />
                  <span>{lesson.duration}</span>
                </div>

                <div className="flex items-center text-xs md:text-sm font-medium text-primary group">
                  <span>Start Learning</span>
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

