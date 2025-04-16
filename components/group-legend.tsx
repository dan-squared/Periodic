"use client"

import { motion } from "framer-motion"
import { type ElementGroup, elementGroups } from "@/lib/element-data"
import { getCategoryColor } from "@/lib/utils"
import { List, Grid2X2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GroupLegendProps {
  onGroupSelect: (group: ElementGroup | null) => void
  selectedGroup: ElementGroup | null
  onViewToggle: () => void
  showList: boolean
  onToggleElementNames: () => void
  showElementNames: boolean
}

export default function GroupLegend({
  onGroupSelect,
  selectedGroup,
  onViewToggle,
  showList,
  onToggleElementNames,
  showElementNames,
}: GroupLegendProps) {
  // First row with 7 elements
  const firstRowGroups = elementGroups.slice(0, 7)
  // Second row with remaining elements
  const secondRowGroups = elementGroups.slice(7)

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2 mb-2 sm:mb-4">
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 w-full">
        <motion.button
          className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full border transition-colors ${
            selectedGroup === null ? "bg-primary text-primary-foreground" : "bg-background"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onGroupSelect(null)}
        >
          All Elements
        </motion.button>

        {firstRowGroups.map((group) => (
          <motion.button
            key={group}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full border transition-colors flex items-center ${
              selectedGroup === group ? "bg-primary text-primary-foreground" : "bg-background"
            }`}
            style={{ borderColor: getCategoryColor(group) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGroupSelect(group)}
          >
            <span
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-1.5"
              style={{ backgroundColor: getCategoryColor(group) }}
            />
            <span className="hidden xs:inline">
              {group.charAt(0).toUpperCase() + group.slice(1).replace(/-/g, " ")}
            </span>
            <span className="xs:hidden">{group.split("-")[0].charAt(0).toUpperCase()}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 w-full">
        {secondRowGroups.map((group) => (
          <motion.button
            key={group}
            className={`px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full border transition-colors flex items-center ${
              selectedGroup === group ? "bg-primary text-primary-foreground" : "bg-background"
            }`}
            style={{ borderColor: getCategoryColor(group) }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onGroupSelect(group)}
          >
            <span
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-1 sm:mr-1.5"
              style={{ backgroundColor: getCategoryColor(group) }}
            />
            <span className="hidden xs:inline">
              {group.charAt(0).toUpperCase() + group.slice(1).replace(/-/g, " ")}
            </span>
            <span className="xs:hidden">{group.split("-")[0].charAt(0).toUpperCase()}</span>
          </motion.button>
        ))}

        {/* Element names toggle button */}
        {onToggleElementNames && (
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleElementNames}
            className={`flex items-center gap-1.5 ${showElementNames ? "bg-primary/10" : ""}`}
          >
            {showElementNames ? <EyeOff size={14} /> : <Eye size={14} />}
            {showElementNames ? "Hide Names" : "Show Names"}
          </Button>
        )}

        {/* List/Table view toggle button */}
        {onViewToggle && (
          <Button variant="outline" size="sm" onClick={onViewToggle} className="flex items-center gap-1.5">
            {showList ? <Grid2X2 size={14} /> : <List size={14} />}
            {showList ? "Grid View" : "List View"}
          </Button>
        )}
      </div>
    </div>
  )
}

