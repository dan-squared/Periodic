"use client"

import { motion } from "framer-motion"
import type { Element } from "@/lib/element-data"
import { getCategoryColor, cn } from "@/lib/utils"

interface ElementCellProps {
  element: Element
  onClick: (element: Element) => void
  isFiltered: boolean
}

export default function ElementCell({ element, onClick, isFiltered }: ElementCellProps) {
  const categoryColor = getCategoryColor(element.category)

  return (
    <motion.div
      className={cn(
        "w-full aspect-[10/11] cursor-pointer relative transition-transform bg-white border-[2px] border-black rounded-[4px] flex flex-col items-center justify-center overflow-hidden",
        isFiltered 
          ? "opacity-20 grayscale" 
          : "hover:z-50"
      )}
      style={{
        boxShadow: isFiltered ? "none" : "-3px 3px 0 0 #000",
      }}
      whileHover={isFiltered ? undefined : { scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onClick(element)}
      layout
    >
      <div className="absolute top-0.5 left-1 text-[10px] font-bold leading-none text-black font-roboto-slab">
        {element.atomicNumber}
      </div>

      <div
        className={cn(
          "absolute top-0 right-0 w-[24%] h-[24%] border-l-[2px] border-b-[2px] border-black rounded-bl-[4px] rounded-tr-[2px]"
        )}
        style={{ backgroundColor: categoryColor }}
      />

      <div className="text-xl sm:text-2xl font-bold leading-none mt-2 text-black font-roboto-slab truncate w-full flex justify-center px-1 shrink-0">
        {element.symbol}
      </div>

      <div className="text-[7px] font-bold tracking-tight uppercase mt-1 leading-none px-0.5 text-center text-black truncate w-full shrink-0">
        {element.name}
      </div>

      <div className="text-[6px] font-medium mt-0.5 leading-none text-black/70 truncate w-full text-center shrink-0">
        {element.atomicMass.toFixed(3)}
      </div>
    </motion.div>
  )
}
