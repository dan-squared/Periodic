import type { ReactNode } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import ThemeToggle from "@/components/theme-toggle"

export default function LessonsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen font-mono">
      <SidebarMenu />

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 py-8 pt-16">{children}</div>
    </div>
  )
}

