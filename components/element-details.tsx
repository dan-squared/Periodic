"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import type { Element } from "@/lib/element-data"
import ElementPropertyCard from "./element-property-card"
import { Button } from "@/components/ui/button"

interface ElementDetailsProps {
  element: Element
  onClose: () => void
}

export default function ElementDetails({ element, onClose }: ElementDetailsProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-background rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-start mb-2 sm:mb-4">
            <div></div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="rounded-full hover:bg-muted transition-colors"
            >
              <X size={24} />
            </Button>
          </div>

          <ElementPropertyCard element={element} />
        </div>
      </motion.div>
    </motion.div>
  )
}

