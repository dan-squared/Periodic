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
    case "nonmetal":
      return "#6bffff"
    case "halogen":
      return "#6b9eff"
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

