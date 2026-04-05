"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { Element } from "@/lib/element-data"
import dynamic from "next/dynamic"

const ElementPropertyCard = dynamic(() => import("./element-property-card"), { ssr: false })

interface ElementDetailsProps {
  element: Element
  onClose: () => void
}

export default function ElementDetails({ element, onClose }: ElementDetailsProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-5xl w-full max-h-[92vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ElementPropertyCard element={element} onClose={onClose} />
      </motion.div>
    </motion.div>
  )
}
