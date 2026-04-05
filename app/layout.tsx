import type React from "react"
import type { Metadata, Viewport } from "next/types"
import "./globals.css"
import { Outfit, Roboto_Slab } from "next/font/google"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
})

export const metadata: Metadata = {
  title: "Interactive Periodic Table",
  description: "Explore the elements with this interactive periodic table",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

// Update the RootLayout to use light theme by default
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${robotoSlab.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  )
}