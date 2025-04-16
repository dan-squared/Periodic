"use client"

import { motion } from "framer-motion"
import type { Element } from "@/lib/element-data"
import { getCategoryColor } from "@/lib/utils"

interface ElementCellProps {
  element: Element
  onClick: (element: Element) => void
  isFiltered: boolean
  showElementNames?: boolean
}

export default function ElementCell({ element, onClick, isFiltered, showElementNames = false }: ElementCellProps) {
  const borderColor = getCategoryColor(element.category)

  return (
    <motion.div
      className={`w-full h-16 md:h-20 p-1 border rounded cursor-pointer relative transition-all duration-300 ${
        isFiltered ? "opacity-20 scale-95" : "opacity-100"
      }`}
      style={{
        borderColor: borderColor,
        borderTopWidth: "3px",
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(element)}
      layout
    >
      <div className="text-[8px] sm:text-[10px] md:text-xs font-semibold absolute top-1 left-1">
        {element.atomicNumber}
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold">{element.symbol}</div>
        {showElementNames && (
          <div className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] truncate max-w-full">{element.name}</div>
        )}
        <div className="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs mt-0.5 text-muted-foreground">
          {element.atomicMass.toFixed(1)}
        </div>
      </div>
    </motion.div>
  )
}

