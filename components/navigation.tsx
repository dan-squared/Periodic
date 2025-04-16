"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Home,
  BookOpen,
  AtomIcon,
  Beaker,
  FlaskConical,
  Thermometer,
  Atom,
  Waves,
  BarChart3,
  Droplets,
  Zap,
  Lightbulb,
  Menu,
  X,
} from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

export default function Navigation() {
  const pathname = usePathname()
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 text-white" />,
    },
    {
      name: "Lessons",
      href: "/lessons",
      icon: <BookOpen className="h-5 w-5 text-white" />,
    },
    {
      name: "Periodic Table",
      href: "/periodic-table",
      icon: <AtomIcon className="h-5 w-5 text-white" />,
    },
    {
      name: "Chemical Bonding",
      href: "/chemical-bonding",
      icon: <Atom className="h-5 w-5 text-white" />,
      subItems: [
        {
          name: "Covalent Bonds",
          href: "/chemical-bonding/covalent",
        },
        {
          name: "Metallic Bonds",
          href: "/chemical-bonding/metallic",
        },
        {
          name: "Hydrogen Bonds",
          href: "/chemical-bonding/hydrogen",
        },
      ],
    },
    {
      name: "States of Matter",
      href: "/states-of-matter",
      icon: <Waves className="h-5 w-5 text-white" />,
    },
    {
      name: "Stoichiometry",
      href: "/stoichiometry",
      icon: <BarChart3 className="h-5 w-5 text-white" />,
    },
    {
      name: "Thermochemistry",
      href: "/thermochemistry",
      icon: <Thermometer className="h-5 w-5 text-white" />,
    },
    {
      name: "Chemical Reactions",
      href: "/chemical-reactions",
      icon: <FlaskConical className="h-5 w-5 text-white" />,
    },
    {
      name: "Redox Reactions",
      href: "/redox-reactions",
      icon: <Zap className="h-5 w-5 text-white" />,
    },
    {
      name: "Colligative Properties",
      href: "/colligative-properties",
      icon: <Droplets className="h-5 w-5 text-white" />,
    },
    {
      name: "Equilibrium",
      href: "/equilibrium",
      icon: <Beaker className="h-5 w-5 text-white" />,
    },
    {
      name: "Organic Chemistry",
      href: "/organic-chemistry",
      icon: <Lightbulb className="h-5 w-5 text-white" />,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const renderNavItems = () => {
    return navItems.map((item) => (
      <div key={item.name} className="mb-1">
        <Link href={item.href} passHref>
          <Button
            variant={isActive(item.href) ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-2 font-normal",
              isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
            onClick={() => setIsOpen(false)}
          >
            {item.icon}
            <span>{item.name}</span>
          </Button>
        </Link>

        {item.subItems && isActive(item.href) && (
          <div className="ml-6 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <Link key={subItem.name} href={subItem.href} passHref>
                <Button
                  variant={pathname === subItem.href ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start font-normal"
                  onClick={() => setIsOpen(false)}
                >
                  {subItem.name}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    ))
  }

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed left-4 top-4 z-50 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Navigation sidebar */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-lg",
          isMobile ? "transform transition-transform duration-300 ease-in-out" : "relative w-full",
        )}
        initial={isMobile ? { x: "-100%" } : false}
        animate={isMobile ? { x: isOpen ? 0 : "-100%" } : {}}
      >
        <div className="flex h-full flex-col overflow-y-auto p-4">
          <div className="mb-6 flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <AtomIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ChemLearn</span>
            </Link>
          </div>

          <div className="flex-1 space-y-1">{renderNavItems()}</div>

          <div className="mt-auto pt-4">
            <div className="rounded-lg bg-muted p-3 text-center text-sm">
              <p>ChemLearn v1.0</p>
              <p className="text-muted-foreground">Interactive Chemistry Learning</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 z-30 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

