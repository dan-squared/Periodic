"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AtomicStructureVisualizationProps {
  protons: number
  neutrons: number
  electrons: number
  electronConfig: number[]
  color: string
}

export default function AtomicStructureVisualization({
  protons,
  neutrons,
  electrons,
  electronConfig,
  color,
}: AtomicStructureVisualizationProps) {
  const [isSpinning, setIsSpinning] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [showLabels, setShowLabels] = useState(true)
  const [activeShell, setActiveShell] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Update container size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        if (width > 0 && height > 0) {
          setContainerSize({ width, height })
        }
      }
    }

    // Small delay to ensure layout has settled
    const timer = setTimeout(updateSize, 50)
    window.addEventListener("resize", updateSize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  // Toggle spinning animation
  const toggleSpin = () => {
    setIsSpinning(!isSpinning)
  }

  // Calculate the center point
  const centerX = containerSize.width / 2 || 150
  const centerY = containerSize.height / 2 || 150

  // Calculate the maximum radius based on container size with better spacing
  const maxRadius = Math.min(centerX, centerY) * 0.85

  // If size not yet determined, render a placeholder to avoid jump
  if (containerSize.width === 0) {
    return <div ref={containerRef} className="w-full h-[320px]" />
  }

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in duration-500">
      <div 
        ref={containerRef} 
        className="relative w-full h-[320px] mb-4 cursor-pointer select-none" 
        onClick={toggleSpin}
      >
        {/* Electron shells - static circles */}
        {electronConfig.map((shellElectrons, shellIndex) => {
          const shellRadius = ((shellIndex + 2) / (electronConfig.length + 2)) * maxRadius
          const isActive = activeShell === shellIndex

          return (
            <div key={`shell-${shellIndex}`} className="absolute top-0 left-0 w-full h-full">
              {/* Shell orbit - clean minimal circle */}
              <div
                className={`absolute rounded-full border transition-all duration-300 ${
                  isActive ? "border-black/40 border-solid scale-[1.01]" : "border-black/10 border-dashed"
                }`}
                style={{
                  top: "50%",
                  left: "50%",
                  width: shellRadius * 2,
                  height: shellRadius * 2,
                  transform: "translate(-50%, -50%)",
                }}
                onMouseEnter={() => setActiveShell(shellIndex)}
                onMouseLeave={() => setActiveShell(null)}
              />

              {/* Electron orbit wrapper - this rotates */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{
                  transformOrigin: "center center",
                }}
                animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isSpinning
                    ? {
                        duration: (shellIndex + 3) * 2.5 / speed,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }
                    : { duration: 0 }
                }
              >
                {/* Electrons in this shell */}
                {Array.from({ length: shellElectrons }).map((_, electronIndex) => {
                  const angleOffset = (2 * Math.PI) / shellElectrons
                  const angle = electronIndex * angleOffset

                  const x = Math.cos(angle) * shellRadius
                  const y = Math.sin(angle) * shellRadius

                  return (
                    <div
                      key={`electron-${shellIndex}-${electronIndex}`}
                      className="absolute rounded-full z-20 transition-transform duration-300"
                      style={{
                        top: "50%",
                        left: "50%",
                        width: 10,
                        height: 10,
                        backgroundColor: color,
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        boxShadow: `0 0 8px ${color}`,
                        opacity: isActive ? 1 : 0.8,
                        scale: isActive ? 1.2 : 1,
                      }}
                    >
                      {showLabels && isActive && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-[9px] font-bold mt-2 whitespace-nowrap bg-black text-white px-2 py-0.5 rounded-full shadow-lg">
                          Shell {shellIndex + 1}
                        </div>
                      )}
                    </div>
                  )
                })}
              </motion.div>
            </div>
          )
        })}

        {/* Nucleus - sleek modern design */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            className="rounded-full bg-white flex flex-col items-center justify-center shadow-xl border border-black/5 pointer-events-auto overflow-hidden"
            style={{
              width: 76,
              height: 76,
              boxShadow: `0 0 20px ${color}20, inset 0 0 10px rgba(0,0,0,0.05)`,
            }}
            animate={{
              scale: isSpinning ? [1, 1.02, 1] : 1,
            }}
            transition={{
              duration: 3,
              repeat: isSpinning ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            <div className="flex flex-col items-center leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-black text-black">{protons}</span>
                <span className="text-[9px] font-bold text-red-500/80">P</span>
              </div>
              <div className="h-[1px] w-6 bg-black/10 my-1" />
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-black text-black">{neutrons}</span>
                <span className="text-[9px] font-bold text-blue-500/80">N</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="text-[9px] font-black text-neutral-400 uppercase tracking-[0.2em] mt-2 px-5 py-1.5 bg-neutral-100/50 rounded-full border border-black/5">
        Atomic Structure • {electrons} Electrons
      </div>
    </div>
  )
}

