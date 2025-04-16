"use client"

import { useState, useMemo } from "react"
import { elements, type Element } from "@/lib/element-data"
import { getCategoryColor } from "@/lib/utils"
import { ArrowUpDown, Search } from "lucide-react"

interface ElementListProps {
  onElementClick: (element: Element) => void
}

type SortField = "atomicNumber" | "name" | "atomicMass" | "category" | "yearDiscovered"
type SortDirection = "asc" | "desc"

export default function ElementList({ onElementClick }: ElementListProps) {
  const [sortField, setSortField] = useState<SortField>("atomicNumber")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedElements = useMemo(() => {
    const filtered = elements.filter(
      (element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        element.atomicNumber.toString().includes(searchTerm),
    )

    return filtered.sort((a, b) => {
      let comparison = 0

      if (sortField === "atomicNumber") {
        comparison = a.atomicNumber - b.atomicNumber
      } else if (sortField === "atomicMass") {
        comparison = a.atomicMass - b.atomicMass
      } else if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === "category") {
        comparison = a.category.localeCompare(b.category)
      } else if (sortField === "yearDiscovered") {
        // Handle null values for yearDiscovered
        if (a.yearDiscovered === null && b.yearDiscovered === null) {
          comparison = 0
        } else if (a.yearDiscovered === null) {
          comparison = 1
        } else if (b.yearDiscovered === null) {
          comparison = -1
        } else {
          comparison = a.yearDiscovered - b.yearDiscovered
        }
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }, [sortField, sortDirection, searchTerm])

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <th
      className="px-2 sm:px-4 py-2 cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
        {label}
        <ArrowUpDown size={14} className={sortField === field ? "opacity-100" : "opacity-30"} />
      </div>
    </th>
  )

  return (
    <div className="w-full mb-8">
      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          placeholder="Search elements..."
          className="w-full p-2 pl-10 border rounded-md bg-background text-foreground"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted/30">
              <SortHeader field="atomicNumber" label="Atomic #" />
              <SortHeader field="name" label="Name" />
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm">Symbol</th>
              <SortHeader field="atomicMass" label="Mass" />
              <SortHeader field="category" label="Category" />
              <SortHeader field="yearDiscovered" label="Year" />
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">Discoverer</th>
            </tr>
          </thead>
          <tbody>
            {sortedElements.map((element) => (
              <tr
                key={element.atomicNumber}
                className="border-b hover:bg-muted/20 cursor-pointer transition-colors"
                onClick={() => onElementClick(element)}
              >
                <td className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm">{element.atomicNumber}</td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">{element.name}</td>
                <td
                  className="px-2 sm:px-4 py-2 text-center font-bold text-xs sm:text-sm"
                  style={{ color: getCategoryColor(element.category) }}
                >
                  {element.symbol}
                </td>
                <td className="px-2 sm:px-4 py-2 text-right text-xs sm:text-sm">{element.atomicMass.toFixed(2)}</td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs"
                    style={{
                      backgroundColor: `${getCategoryColor(element.category)}30`,
                      color: getCategoryColor(element.category),
                    }}
                  >
                    {element.category.split("-")[0]}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2 text-center text-xs sm:text-sm">
                  {element.yearDiscovered || "Ancient"}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">
                  {element.discoverer || "Unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

