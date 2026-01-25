"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLoading } from "@/app/components/loading-context"

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true)
    const { finishLoading } = useLoading()

    useEffect(() => {
        // Timer to start exit animation
        const timer = setTimeout(() => {
            setIsVisible(false)
            finishLoading()
        }, 2800)

        // Ensure scroll is restored even if component unmounts unexpectedly
        return () => {
            document.body.style.overflow = "unset"
            clearTimeout(timer)
        }
    }, [finishLoading])

    // Lock scroll when visible
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isVisible])

    const name = "TRUENAPSH"

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
                >
                    {/* Progress Bar Top */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 right-0 h-1 bg-primary origin-left"
                    />

                    <div className="relative flex flex-col items-center">
                        {/* Split Text Animation */}
                        <div className="flex overflow-hidden text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter">
                            {name.split("").map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: "100%" }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: i * 0.08,
                                        ease: [0.6, 0.01, -0.05, 0.95]
                                    }}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </div>

                        {/* Subtext reveal */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="mt-4 flex items-center gap-4"
                        >
                            <span className="h-[1px] w-12 bg-primary/30" />
                            <span className="text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground">
                                Digital Portfolio / .04
                            </span>
                            <span className="h-[1px] w-12 bg-primary/30" />
                        </motion.div>
                    </div>

                    {/* Background Ambient Blur */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute h-[50vw] w-[50vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}
