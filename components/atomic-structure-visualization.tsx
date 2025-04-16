"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface AtomicStructureVisualizationProps {
  protons: number
  neutrons: number
  electrons: number
  color: string
}

export default function AtomicStructureVisualization({
  protons,
  neutrons,
  electrons,
  color,
}: AtomicStructureVisualizationProps) {
  const [isSpinning, setIsSpinning] = useState(true)
  const [speed, setSpeed] = useState(1)
  const [showLabels, setShowLabels] = useState(true)
  const [activeShell, setActiveShell] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 300, height: 300 })

  // Calculate electron configuration per shell
  const electronConfig = calculateElectronConfig(electrons)

  // Update container size on mount and resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Toggle spinning animation
  const toggleSpin = () => {
    setIsSpinning(!isSpinning)
  }

  // Change animation speed
  const changeSpeed = () => {
    setSpeed((prevSpeed) => (prevSpeed === 3 ? 0.5 : prevSpeed + 0.5))
  }

  // Toggle electron labels
  const toggleLabels = () => {
    setShowLabels(!showLabels)
  }

  // Calculate the center point
  const centerX = containerSize.width / 2
  const centerY = containerSize.height / 2

  // Calculate the maximum radius based on container size with better spacing
  const maxRadius = Math.min(centerX, centerY) * 0.85

  return (
    <div className="flex flex-col items-center">
      <div ref={containerRef} className="relative w-full h-[300px] mb-4 cursor-pointer" onClick={toggleSpin}>
        {/* Electron shells - static circles */}
        {electronConfig.map((shellElectrons, shellIndex) => {
          // Adjust shell spacing to prevent overlap with nucleus
          const shellRadius = ((shellIndex + 1) / (electronConfig.length + 0.5)) * maxRadius
          const isActive = activeShell === shellIndex

          return (
            <div key={`shell-${shellIndex}`} className="absolute top-0 left-0 w-full h-full">
              {/* Shell orbit - static circle */}
              <div
                className={`absolute rounded-full border ${isActive ? "border-primary border-2" : "border-muted-foreground border-dashed"}`}
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
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  transformOrigin: "center center",
                }}
                animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isSpinning
                    ? {
                        duration: 4 / speed,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }
                    : { duration: 0 }
                }
              >
                {/* Electrons in this shell */}
                {Array.from({ length: shellElectrons }).map((_, electronIndex) => {
                  // Calculate the position angle for each electron
                  // Distribute electrons evenly around the orbit
                  const angleOffset = (2 * Math.PI) / shellElectrons
                  const angle = electronIndex * angleOffset

                  // Calculate x and y position on the circle
                  const x = Math.cos(angle) * shellRadius
                  const y = Math.sin(angle) * shellRadius

                  return (
                    <div
                      key={`electron-${shellIndex}-${electronIndex}`}
                      className="absolute rounded-full bg-primary shadow-md z-20"
                      style={{
                        top: "50%",
                        left: "50%",
                        width: 8,
                        height: 8,
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        boxShadow: `0 0 5px ${color}`,
                      }}
                    >
                      {showLabels && isActive && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-[10px] mt-1 whitespace-nowrap bg-background/80 px-1 rounded">
                          e<sup>-</sup> {shellIndex + 1},{electronIndex + 1}
                        </div>
                      )}
                    </div>
                  )
                })}
              </motion.div>
            </div>
          )
        })}

        {/* Nucleus - centered precisely with adjusted size */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-30 pointer-events-none">
          <motion.div
            className="rounded-full bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center shadow-md pointer-events-auto"
            style={{
              // Cap the nucleus size to prevent overlap with electron shells
              width: Math.min(Math.max(40, (protons + neutrons) / 4 + 20), maxRadius * 0.4),
              height: Math.min(Math.max(40, (protons + neutrons) / 4 + 20), maxRadius * 0.4),
              boxShadow: `0 0 15px ${color}60`,
            }}
            animate={{
              scale: isSpinning ? [1, 1.05, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: isSpinning ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-xs font-semibold text-white text-center px-1">
              <div>{protons}p</div>
              <div>{neutrons}n</div>
            </div>
          </motion.div>
        </div>

        {/* Shell labels */}
        {showLabels &&
          electronConfig.map((_, shellIndex) => {
            const shellRadius = ((shellIndex + 1) / (electronConfig.length + 0.5)) * maxRadius
            const angle = Math.PI / 4 // Position at 45 degrees
            const x = Math.cos(angle) * shellRadius
            const y = Math.sin(angle) * shellRadius

            return (
              <div
                key={`shell-label-${shellIndex}`}
                className="absolute text-xs font-medium px-1 rounded bg-background/80 z-40"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
              >
                n={shellIndex + 1}
              </div>
            )
          })}
      </div>

      {/* Controls */}
      <div className="flex gap-2 mt-2">
        <button
          onClick={toggleSpin}
          className="px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {isSpinning ? "Pause" : "Animate"}
        </button>
        <button
          onClick={changeSpeed}
          className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          Speed: {speed}x
        </button>
        <button
          onClick={toggleLabels}
          className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-muted/80 transition-colors"
        >
          {showLabels ? "Hide Labels" : "Show Labels"}
        </button>
      </div>

      {/* Shell information */}
      <div className="grid grid-cols-3 gap-2 w-full mt-4">
        {electronConfig.map((shellElectrons, shellIndex) => (
          <div
            key={`shell-info-${shellIndex}`}
            className={`p-2 rounded-lg text-center text-xs ${
              activeShell === shellIndex ? "bg-primary/10 border border-primary" : "bg-muted/30"
            }`}
            onMouseEnter={() => setActiveShell(shellIndex)}
            onMouseLeave={() => setActiveShell(null)}
          >
            <div className="font-medium">Shell {shellIndex + 1}</div>
            <div>
              {shellElectrons} e<sup>-</sup>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Calculate electron configuration based on the Bohr model (simplified)
function calculateElectronConfig(electrons: number): number[] {
  const shells = [2, 8, 18, 32, 50]
  const config: number[] = []

  let remainingElectrons = electrons

  for (const shellCapacity of shells) {
    if (remainingElectrons <= 0) break

    const electronsInShell = Math.min(remainingElectrons, shellCapacity)
    config.push(electronsInShell)
    remainingElectrons -= electronsInShell
  }

  // If there are still electrons left, add them to the last shell
  if (remainingElectrons > 0) {
    config.push(remainingElectrons)
  }

  return config
}

