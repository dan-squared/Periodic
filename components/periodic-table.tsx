"use client"

import React, { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import ElementCell from "./element-cell"
import ElementDetails from "./element-details"
import ElementList from "./element-list"
import SymbolKey from "./symbol-key"
import { elements, type Element, type ElementGroup, elementGroups } from "@/lib/element-data"
import { getBlockColor, getCategoryColor, cn } from "@/lib/utils"
import { Smartphone } from "lucide-react"

type BlockFilter = "s" | "p" | "d" | "f" | null

const blockFilters: { label: string; value: NonNullable<BlockFilter> }[] = [
  { label: "s-block", value: "s" },
  { label: "p-block", value: "p" },
  { label: "d-block", value: "d" },
  { label: "f-block", value: "f" }
]

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null)
  const [selectedGroup, setSelectedGroup] = useState<ElementGroup | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<BlockFilter>(null)
  const [showList, setShowList] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)
  const [showOrientationMessage, setShowOrientationMessage] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const checkOrientation = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
      const isPortrait = window.innerHeight > window.innerWidth
      setIsPortrait(isPortrait && isMobile)
      setShowOrientationMessage(isPortrait && isMobile && !showList)
    }

    checkOrientation()
    window.addEventListener("resize", checkOrientation)

    return () => window.removeEventListener("resize", checkOrientation)
  }, [showList])

  const handleElementClick = (element: Element) => {
    setSelectedElement(element)
  }

  const handleCloseDetails = () => {
    setSelectedElement(null)
  }

  const handleGroupFilter = (group: ElementGroup) => {
    setSelectedGroup(group === selectedGroup ? null : group)
    // Clear block filter when a chemical series is selected
    if (group !== selectedGroup) setSelectedBlock(null)
  }

  const handleBlockFilter = (block: BlockFilter) => {
    setSelectedBlock(block === selectedBlock ? null : block)
    // Clear group filter when a block is selected
    if (block !== selectedBlock) setSelectedGroup(null)
  }

  const isElementFiltered = (element: Element): boolean => {
    if (selectedGroup && element.category !== selectedGroup) return true
    if (selectedBlock && element.block !== selectedBlock) return true
    return false
  }

  const categoryFilters = elementGroups
    .filter(g => g !== "unknown")
    .map(group => ({
      label: group.replace(/-/g, " "),
      value: group
    }))

  const renderGridElements = () => {
    return elements.map((element) => {
      let gridStyle: React.CSSProperties = {}

      if (element.period <= 7 && element.group && element.atomicNumber !== 57 && element.atomicNumber !== 89) {
        gridStyle = {
          gridColumn: element.group,
          gridRow: element.period,
        }
      } else if (element.category === "lanthanide") {
        gridStyle = {
          gridColumn: element.atomicNumber - 57 + 4,
          gridRow: 9,
        }
      } else if (element.category === "actinide") {
        gridStyle = {
          gridColumn: element.atomicNumber - 89 + 4,
          gridRow: 10,
        }
      }

      return (
        <div key={element.atomicNumber} style={gridStyle} className="min-w-0 min-h-0">
          <ElementCell
            element={element}
            onClick={handleElementClick}
            isFiltered={isElementFiltered(element)}
          />
        </div>
      )
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col relative">

      {/* Header Space */}
      <div className="pt-4 pb-2 px-4 text-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-neutral-800">
          The Periodic Table of Elements
        </h1>
      </div>

      {/* Orientation message */}
      {showOrientationMessage && (
        <div className="bg-amber-50 border border-amber-300 rounded-md p-3 mx-auto mb-4 flex items-center justify-between w-[90%] max-w-lg shadow-sm">
          <div className="flex items-center">
            <Smartphone className="mr-3 text-amber-600" size={20} />
            <span className="text-sm font-semibold text-amber-800 uppercase tracking-tight">Rotate device to landscape</span>
          </div>
          <button onClick={() => setShowOrientationMessage(false)} className="text-amber-600 font-bold">✕</button>
        </div>
      )}

      <div className="flex-1 px-4 pb-8 overflow-x-auto">
        <div className="min-w-[900px] max-w-[1240px] mx-auto">
          {!showList ? (
            <div className="grid grid-cols-[repeat(18,minmax(0,1fr))] grid-rows-[repeat(10,auto)] gap-1 items-start justify-center">
              {renderGridElements()}

              {/* Spacer for row 8 to separate Lanthanides and Actinides */}
              <div className="col-span-full row-start-8 h-2 md:h-4" />

              {/* Placeholders for E57-71 and E89-103 */}
              <div className="col-start-3 row-start-6 w-full aspect-[10/11] flex items-center justify-center text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-neutral-900 font-roboto-slab">
                E57-71
              </div>
              <div className="col-start-3 row-start-7 w-full aspect-[10/11] flex items-center justify-center text-[10px] sm:text-[11px] lg:text-[12px] font-bold text-neutral-900 font-roboto-slab">
                E89-103
              </div>

              {/* Legends Section */}
              <div className="col-start-4 col-end-13 row-start-1 row-end-4 flex flex-col xl:flex-row items-start xl:items-center justify-start pl-2 md:pl-12 gap-6 xl:gap-8 py-2">
                <SymbolKey />
              </div>
            </div>
          ) : (
            <ElementList onElementClick={handleElementClick} />
          )}
          
          {/* Category Key / Filters */}
          {!showList && (
            <div className="mt-6 pt-6 border-t border-black/10 flex flex-col items-center justify-center gap-4 max-w-[800px] mx-auto pb-4">
              <div className="flex flex-col items-center gap-y-4 w-full">
                <div className="text-center text-[11px] font-extrabold text-neutral-400 uppercase tracking-widest">
                  Chemical Series
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                  {categoryFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => handleGroupFilter(filter.value)}
                      className={cn(
                        "flex items-center gap-2 transition-opacity",
                        selectedGroup && selectedGroup !== filter.value ? "opacity-30 hover:opacity-100" : "opacity-100",
                        selectedBlock && "opacity-30 hover:opacity-100"
                      )}
                    >
                      <div
                        className={cn("w-4 h-4 border-[2px] border-black rounded-[2px] transition-transform",
                          selectedGroup === filter.value && "ring-2 ring-black ring-offset-2 scale-110")}
                        style={{ backgroundColor: getCategoryColor(filter.value) }}
                      />
                      <span className="text-[10px] font-bold uppercase text-neutral-800">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center gap-y-3 w-full border-t border-black/5 pt-4">
                <div className="text-center text-[11px] font-extrabold text-neutral-400 uppercase tracking-widest">
                  Block
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                  {blockFilters.map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => handleBlockFilter(filter.value)}
                      className={cn(
                        "flex items-center transition-all border-2 border-black rounded-[4px] px-4 py-1.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none",
                        selectedBlock === filter.value 
                          ? "bg-neutral-900 text-white shadow-none translate-x-[2px] translate-y-[2px]" 
                          : "bg-white text-black shadow-[2px_2px_0_0_#000] hover:bg-neutral-100",
                        selectedBlock && selectedBlock !== filter.value ? "opacity-40 hover:opacity-100" : "opacity-100",
                        selectedGroup && "opacity-40 hover:opacity-100"
                      )}
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wider font-roboto-slab">{filter.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedElement && <ElementDetails element={selectedElement} onClose={handleCloseDetails} />}
      </AnimatePresence>
    </div>
  )
}
