"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ElementCell from "./element-cell"
import ElementDetails from "./element-details"
import ElementList from "./element-list"
import SidebarMenu from "./sidebar-menu"
import { elements, type Element, type ElementGroup } from "@/lib/element-data"
import { Smartphone } from "lucide-react"

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<ElementGroup | null>(null)
  const [showList, setShowList] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const [showOrientationMessage, setShowOrientationMessage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showElementNames, setShowElementNames] = useState(true)

  // Mark as loaded after initial render
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Check if device is in portrait mode and is mobile
  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isPortrait = window.innerHeight > window.innerWidth
      setIsPortrait(isPortrait && isMobile)
      setShowOrientationMessage(isPortrait && isMobile && !showList)
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)

    // Try to request landscape orientation on mobile
    if ("screen" in window && "orientation" in window.screen) {
      try {
        // This is a suggestion, not a requirement - it may not work on all devices
        (window.screen.orientation as any).lock("landscape").catch(() => {
          // Silently fail if not supported or permission denied
        })
      } catch (e) {
        // Ignore errors for unsupported browsers
      }
    }

    return () => window.removeEventListener("resize", checkOrientation)
  }, [showList])

  const handleElementClick = (element: Element) => {
    setSelectedElement(element)
  }

  const handleCloseDetails = () => {
    setSelectedElement(null)
  }

  // Updated to toggle the filter off when clicking the same group
  const handleGroupSelect = (group: ElementGroup | null) => {
    if (group === selectedGroup) {
      // If clicking the same group, toggle it off
      setSelectedGroup(null)
    } else {
      // Otherwise, select the new group
      setSelectedGroup(group)
    }
  }

  const toggleListView = () => {
    setShowList(!showList)
  }

  const toggleElementNames = () => {
    setShowElementNames(!showElementNames)
  }

  // Replace the toRoman function with these two specialized functions
  const toRomanPeriod = (num: number): string => {
    const romanNumerals = ["I", "II", "III", "IV", "V", "VI", "VII"]
    return romanNumerals[num - 1] || num.toString()
  }

  const toRomanGroup = (num: number): string => {
    if (num === 1) return "IA"
    if (num === 2) return "IIA"
    if (num === 3) return "IIIB"
    if (num === 4) return "IVB"
    if (num === 5) return "VB"
    if (num === 6) return "VIB"
    if (num === 7) return "VIIB"
    if (num >= 8 && num <= 10) return "VIIIB"
    if (num === 11) return "IB"
    if (num === 12) return "IIB"
    if (num === 13) return "IIIA"
    if (num === 14) return "IVA"
    if (num === 15) return "VA"
    if (num === 16) return "VIA"
    if (num === 17) return "VIIA"
    if (num === 18) return "VIIIA"
    return num.toString()
  }

  // Replace the entire renderPeriodicTable function with this updated version
  const renderPeriodicTable = () => {
    // Group labels using traditional notation in a single row
    const groupLabels = (
      <div className="grid grid-cols-[40px_repeat(18,minmax(40px,1fr))] md:grid-cols-[40px_repeat(18,minmax(60px,1fr))] gap-1 mb-2">
        <div key="empty-cell" className="col-span-1"></div> {/* Empty cell for period labels */}
        <div key="group-1" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IA</div>
        <div key="group-2" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IIA</div>
        <div key="group-3" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IIIB</div>
        <div key="group-4" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IVB</div>
        <div key="group-5" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">VB</div>
        <div key="group-6" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">VIB</div>
        <div key="group-7" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">VIIB</div>
        {/* VIIIB spanning 3 columns with a bracket */}
        <div key="group-8-10" className="col-span-3 h-6 relative">
          <div key="group-8-10-top" className="absolute top-0 left-0 right-0 h-1 border-t-2 border-l-2 border-r-2 border-foreground/40 rounded-t-sm"></div>
          <div key="group-8-10-bottom" className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
            <div key="group-8-10-text" className="text-[10px] md:text-xs font-semibold">VIIIB</div>
          </div>
        </div>
        <div key="group-11" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IB</div>
        <div key="group-12" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IIB</div>
        <div key="group-13" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IIIA</div>
        <div key="group-14" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">IVA</div>
        <div key="group-15" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">VA</div>
        <div key="group-16" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">VIA</div>
        <div key="group-17" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">VIIA</div>
        <div key="group-18" className="col-span-1 h-6 flex items-center justify-center text-[10px] md:text-xs font-semibold">
          VIIIA
        </div>
      </div>
    )

    const table = [groupLabels]

    // Main table (excluding lanthanides and actinides)
    for (let row = 1; row <= 7; row++) {
      // Create a grid for each row
      const rowGrid = (
        <div
          key={`row-${row}`}
          className="grid grid-cols-[40px_repeat(18,minmax(40px,1fr))] md:grid-cols-[40px_repeat(18,minmax(60px,1fr))] gap-1"
        >
          {/* Period number */}
          <div className="col-span-1 h-16 md:h-20 flex items-center justify-center text-[10px] md:text-xs font-semibold">
            {toRomanPeriod(row)}
          </div>

          {/* Elements for this row */}
          {Array.from({ length: 18 }, (_, col) => {
            const column = col + 1
            const element = elements.find((e) => e.period === row && e.group === column)

            return (
              <div key={`cell-${row}-${column}`} className="col-span-1">
                {element ? (
                  <ElementCell
                    element={element}
                    onClick={handleElementClick}
                    isFiltered={selectedGroup !== null && element.category !== selectedGroup}
                    showElementNames={showElementNames}
                  />
                ) : (
                  <div className="h-16 md:h-20"></div>
                )}
              </div>
            )
          })}
        </div>
      )

      table.push(rowGrid)
    }

    // Add spacer row
    table.push(<div key="spacer" className="h-4" />)

    // Lanthanides row label
    table.push(
      <div
        key="lanthanide-label"
        className="grid grid-cols-[40px_repeat(18,minmax(40px,1fr))] md:grid-cols-[40px_repeat(18,minmax(60px,1fr))] gap-1"
      >
        <div key="lanthanide-label-text" className="col-span-3 flex items-center">
          <div key="lanthanide-text" className="text-[10px] md:text-xs font-semibold">* Lanthanides</div>
        </div>
        <div key="lanthanide-label-spacer" className="col-span-16"></div>
      </div>,
    )

    // Lanthanides row
    const lanthanides = elements.filter((element) => element.category === "lanthanide")
    const lanthanideRow = (
      <div
        key="lanthanides"
        className="grid grid-cols-[40px_repeat(18,minmax(40px,1fr))] md:grid-cols-[40px_repeat(18,minmax(60px,1fr))] gap-1 mt-1"
      >
        <div key="lanthanide-spacer" className="col-span-3"></div> {/* Empty cells for spacing */}
        {lanthanides.map((element, index) => (
          <div key={`lanthanide-${element.atomicNumber}`} className="col-span-1">
            <ElementCell
              element={element}
              onClick={handleElementClick}
              isFiltered={selectedGroup !== null && element.category !== selectedGroup}
              showElementNames={showElementNames}
            />
          </div>
        ))}
        <div key="lanthanide-end-spacer" className="col-span-1"></div> {/* Empty cell to complete the grid */}
      </div>
    )
    table.push(lanthanideRow)

    // Actinides row label
    table.push(
      <div
        key="actinide-label"
        className="grid grid-cols-[40px_repeat(18,minmax(40px,1fr))] md:grid-cols-[40px_repeat(18,minmax(60px,1fr))] gap-1 mt-2"
      >
        <div key="actinide-label-text" className="col-span-3 flex items-center">
          <div key="actinide-text" className="text-[10px] md:text-xs font-semibold">** Actinides</div>
        </div>
        <div key="actinide-label-spacer" className="col-span-16"></div>
      </div>,
    )

    // Actinides row
    const actinides = elements.filter((element) => element.category === "actinide")
    const actinideRow = (
      <div
        key="actinides"
        className="grid grid-cols-[40px_repeat(18,minmax(40px,1fr))] md:grid-cols-[40px_repeat(18,minmax(60px,1fr))] gap-1 mt-1"
      >
        <div key="actinide-spacer" className="col-span-3"></div> {/* Empty cells for spacing */}
        {actinides.map((element, index) => (
          <div key={`actinide-${element.atomicNumber}`} className="col-span-1">
            <ElementCell
              element={element}
              onClick={handleElementClick}
              isFiltered={selectedGroup !== null && element.category !== selectedGroup}
              showElementNames={showElementNames}
            />
          </div>
        ))}
        <div key="actinide-end-spacer" className="col-span-1"></div> {/* Empty cell to complete the grid */}
      </div>
    )
    table.push(actinideRow)

    return table
  }

  // Update the periodic table to listen for custom events from the sidebar
  useEffect(() => {
    // Listen for custom events from the sidebar
    const handleGroupSelect = (event: CustomEvent) => {
      setSelectedGroup(event.detail.group)
    }

    const handleToggleElementNames = (event: CustomEvent) => {
      setShowElementNames(event.detail.showNames)
    }

    const handleToggleListView = (event: CustomEvent) => {
      setShowList(event.detail.showList)
    }

    window.addEventListener('groupSelect', handleGroupSelect as EventListener)
    window.addEventListener('toggleElementNames', handleToggleElementNames as EventListener)
    window.addEventListener('toggleListView', handleToggleListView as EventListener)

    return () => {
      window.removeEventListener('groupSelect', handleGroupSelect as EventListener)
      window.removeEventListener('toggleElementNames', handleToggleElementNames as EventListener)
      window.removeEventListener('toggleListView', handleToggleListView as EventListener)
    }
  }, [])

  // Make the periodic table more responsive for mobile
  return (
    <div className="flex flex-col h-screen w-full relative">
      {/* Add Sidebar Menu */}
      <SidebarMenu />

      {/* Theme toggle removed from here - now only in sidebar */}

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center my-3 md:my-5 text-foreground">
        Interactive Periodic Table
      </h1>

      {/* Move the legend to the sidebar, so we can remove this section */}
      {/* <div className="px-2 md:px-4 mb-4 md:mb-6">
        <GroupLegend
          onGroupSelect={handleGroupSelect}
          selectedGroup={selectedGroup}
          onViewToggle={toggleListView}
          showList={showList}
          onToggleElementNames={toggleElementNames}
          showElementNames={showElementNames}
        />
      </div> */}

      {/* Orientation message for mobile devices */}
      {showOrientationMessage && (
        <div className="bg-primary/10 border border-primary rounded-lg p-3 mx-4 mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <Smartphone className="mr-2 text-primary" size={20} />
            <span className="text-sm">Rotate your device to landscape for a better view</span>
          </div>
          <button
            onClick={() => setShowOrientationMessage(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex-1 overflow-auto px-1 md:px-2 pb-2 md:pb-4">
        {!showList ? (
          <div className="w-fit mx-auto scale-[0.75] sm:scale-90 md:scale-100 origin-top mb-16 sm:mb-8 md:mb-0">
            {renderPeriodicTable()}
          </div>
        ) : (
          <ElementList onElementClick={handleElementClick} />
        )}
      </div>

      <AnimatePresence>
        {selectedElement && <ElementDetails element={selectedElement} onClose={handleCloseDetails} />}
      </AnimatePresence>
    </div>
  )
}

