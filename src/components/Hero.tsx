"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  const [currentState, setCurrentState] = useState("grid")
  const [highlightedPair, setHighlightedPair] = useState<number[]>([])
  const [animationComplete, setAnimationComplete] = useState(false)
  const [showWelcomeText, setShowWelcomeText] = useState(false)

  // Define the sequence of image pairs to highlight
  const highlightSequence = [
    [0, 5],
    [3, 5],
    [1, 3],
    [2, 4],
    [0, 2],
    [1, 4],
  ]

  useEffect(() => {
    let currentPairIndex = 0
    let timeout: NodeJS.Timeout

    // Start the animation sequence after initial render
    const startSequence = () => {
      timeout = setTimeout(() => {
        if (currentPairIndex < highlightSequence.length) {
          // Highlight the current pair
          setHighlightedPair(highlightSequence[currentPairIndex])

          // After 375ms, dim the pair
          setTimeout(() => {
            setHighlightedPair([])

            // Move to the next pair after another 375ms
            setTimeout(() => {
              currentPairIndex++
              
              // Show welcome text after the first 3 animations
              if (currentPairIndex === 3) {
                setShowWelcomeText(true)
              }
              
              if (currentPairIndex < highlightSequence.length) {
                startSequence()
              } else {
                // All pairs have been highlighted, transition to final state
                setCurrentState("final")
            
                // Set animation complete at the end
                setTimeout(() => {
                  setAnimationComplete(true)
                }, 1500)
              }
            }, 375)
          }, 375)
        }
      }, 375)
    }

    startSequence()

    return () => clearTimeout(timeout)
  }, [])

  // Image sources
  const images = [
    "/hero/0.jpeg",
    "/hero/1.jpeg",
    "/hero/2.jpeg",
    "/hero/3.jpeg",
    "/hero/4.jpeg",
    "/hero/5.jpeg",
  ]

  return (
    <main className="relative h-screen w-screen overflow-hidden">
      {currentState === "grid" && (
        <div className="grid h-screen w-screen grid-cols-3 grid-rows-2 gap-12 p-20">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative h-full w-full overflow-hidden rounded-lg"
              initial={{ opacity: 0.28 }}
              animate={{
                opacity: highlightedPair.includes(index) ? 1 : 0.28,
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={`Image ${index}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 33vw"
                priority
              />
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {currentState === "final" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="absolute inset-0 z-0"
              initial={{
                scale: 3,
                x: "-100%", 
                y: "-100%", 
                opacity: 0.28,
              }}
              animate={{
                scale: 1,
                x: 0,
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            >
              <Image src="/hero/0.jpeg" alt="Featured Image" fill className="object-cover" sizes="100vw" priority />
            </motion.div>

            <motion.div
              className="relative z-10 flex flex-col items-center justify-center text-center text-[#FFF9E5]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showWelcomeText ? 1 : 0, y: showWelcomeText ? 0 : 50 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="welcome-text mb-4 text-[262px] font-normal leading-none"
                style={{ fontFamily: "'bits indian calligra', serif" }}
              >
                WELCOME TO
              </motion.h2>
              <motion.h1
                className="regalia-text text-[262px] font-normal leading-none"
                style={{ fontFamily: "'Antolia Buchery', serif" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                REGALIA 2025
              </motion.h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}