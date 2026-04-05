import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ElementGroup } from "./element-data"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryColor(category: ElementGroup): string {
  switch (category) {
    case "alkali-metal":
      return "#ff6b6b"
    case "alkaline-earth-metal":
      return "#ffa06b"
    case "transition-metal":
      return "#ffd56b"
    case "post-transition-metal":
      return "#c5ff6b"
    case "metalloid":
      return "#6bff9e"
    case "diatomic-nonmetal":
      return "#6beeff"
    case "polyatomic-nonmetal":
      return "#6bffdd"
    case "noble-gas":
      return "#c56bff"
    case "lanthanide":
      return "#ff6bdb"
    case "actinide":
      return "#ff6b9e"
    default:
      return "#cccccc"
  }
}

export function getBlockColor(block: string): string {
  switch (block) {
    case "s":
      return "#C52828"
    case "p":
      return "#2888C5"
    case "d":
      return "#F2A01D"
    case "f":
      return "#88C528"
    default:
      return "#e5e7eb"
  }
}

