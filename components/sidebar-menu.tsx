"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Atom, BookOpen, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [showElementNames, setShowElementNames] = useState(true)
  const [showList, setShowList] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const pathname = usePathname()

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false)
      }
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const togglePin = () => {
    setIsPinned(!isPinned)
    setIsOpen(!isOpen)
  }

  const menuItems = [
    {
      title: "Periodic Table",
      href: "/",
      icon: <Atom className="h-5 w-5" />,
    },
    {
      title: "Chemistry Lessons",
      href: "/lessons",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ]

  const elementGroups = [
    { name: "Alkali Metals", value: "alkali-metal" },
    { name: "Alkaline Earth Metals", value: "alkaline-earth-metal" },
    { name: "Transition Metals", value: "transition-metal" },
    { name: "Post-Transition Metals", value: "post-transition-metal" },
    { name: "Metalloids", value: "metalloid" },
    { name: "Nonmetals", value: "nonmetal" },
    { name: "Halogens", value: "halogen" },
    { name: "Noble Gases", value: "noble-gas" },
    { name: "Lanthanides", value: "lanthanide" },
    { name: "Actinides", value: "actinide" },
  ]

  // Function to handle group selection
  const handleGroupSelect = (group) => {
    if (group === selectedGroup) {
      setSelectedGroup(null)
    } else {
      setSelectedGroup(group)
    }

    // Dispatch a custom event that the periodic table component can listen for
    const event = new CustomEvent("groupSelect", { detail: { group: group === selectedGroup ? null : group } })
    window.dispatchEvent(event)
  }

  // Function to toggle element names
  const toggleElementNames = () => {
    setShowElementNames(!showElementNames)

    // Dispatch a custom event
    const event = new CustomEvent("toggleElementNames", { detail: { showNames: !showElementNames } })
    window.dispatchEvent(event)
  }

  // Function to toggle list view
  const toggleListView = () => {
    setShowList(!showList)

    // Dispatch a custom event
    const event = new CustomEvent("toggleListView", { detail: { showList: !showList } })
    window.dispatchEvent(event)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar toggle button for desktop */}
      <Button
        variant="outline"
        size="icon"
        className="hidden md:flex fixed top-4 left-4 z-50 rounded-full shadow-sm"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {isOpen && !isPinned && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || isPinned) && (
          <motion.div
            className="fixed top-0 left-0 z-40 h-full bg-card border-r border-border shadow-lg md:shadow-none overflow-y-auto"
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: 300,
              opacity: 1,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            exit={{
              width: 0,
              opacity: 0,
              transition: { duration: 0.3, ease: "easeIn" },
            }}
          >
            <div className="flex flex-col h-full">
              <div className="p-6 pt-16 relative">
                {/* Theme toggle in top right corner of sidebar */}
                <div className="absolute top-4 right-4 z-50">
                  <ThemeToggle />
                </div>
                <h2 className="text-lg font-semibold mb-6">Navigation</h2>
                <nav className="space-y-2 mb-6">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => !isPinned && setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-all",
                        pathname === item.href || pathname.startsWith(`${item.href}/`)
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={cn(
                          "p-1.5 rounded-md",
                          pathname === item.href || pathname.startsWith(`${item.href}/`) ? "bg-primary/20" : "bg-muted",
                        )}
                      >
                        {item.icon}
                      </motion.div>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </nav>

                {/* Only show these controls on the periodic table page */}
                {pathname === "/" && (
                  <>
                    <Separator className="my-4" />

                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-3">Display Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id="show-names" checked={showElementNames} onCheckedChange={toggleElementNames} />
                            <Label htmlFor="show-names">Show Element Names</Label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch id="list-view" checked={showList} onCheckedChange={toggleListView} />
                            <Label htmlFor="list-view">List View</Label>
                          </div>
                        </div>

                        {/* Theme toggle moved to top right corner */}
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h3 className="text-sm font-medium mb-3">Element Groups</h3>
                      <div className="space-y-1.5">
                        {elementGroups.map((group) => (
                          <Button
                            key={group.value}
                            variant={selectedGroup === group.value ? "default" : "outline"}
                            size="sm"
                            className="w-full justify-start text-xs"
                            onClick={() => handleGroupSelect(group.value)}
                          >
                            {group.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

