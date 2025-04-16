"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingAnimation() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (min 2 seconds to show animation)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-64 h-64">
            {/* Nucleus */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-black dark:bg-white"
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* First electron shell */}
            <div
              className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full border border-black dark:border-white"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-black dark:bg-white"
                style={{
                  top: "50%",
                  left: "0%",
                  marginTop: "-6px",
                  marginLeft: "-6px",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                initial={false}
              />
            </div>

            {/* Second electron shell */}
            <div
              className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full border border-black dark:border-white"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-black dark:bg-white"
                style={{
                  top: "50%",
                  left: "0%",
                  marginTop: "-6px",
                  marginLeft: "-6px",
                }}
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                initial={false}
              />
            </div>

            {/* Third electron shell */}
            <div
              className="absolute top-1/2 left-1/2 w-56 h-56 rounded-full border border-black dark:border-white"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-black dark:bg-white"
                style={{
                  top: "50%",
                  left: "0%",
                  marginTop: "-6px",
                  marginLeft: "-6px",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                initial={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

