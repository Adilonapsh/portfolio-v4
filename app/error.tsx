"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-20" />

            {/* Visual Circle Decorations */}
            <motion.div
                className="absolute top-1/4 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                animate={{
                    x: [0, 50, -50, 0],
                    y: [0, -50, 50, 0],
                    scale: [1, 1.6, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
                animate={{
                    x: [0, -70, 70, 0],
                    y: [0, 70, -70, 0],
                    scale: [1, 1.5, 1]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="relative z-10 text-center px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Large 500 Number Layered Behind */}
                <div className="select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center gap-2 sm:gap-4 md:gap-6 z-0">
                    {"500".split("").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 100, filter: "blur(10px)" }}
                            animate={{ opacity: 0.04, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 2,
                                ease: [0.2, 0.65, 0.3, 0.9],
                                delay: i * 0.2
                            }}
                            className="inline-block text-[10rem] sm:text-[15rem] md:text-[20rem] font-black leading-none shadow-5xl"
                        >
                            {word}
                        </motion.span>
                    ))}
                </div>

                <h2 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-8xl text-foreground">
                    Something went wrong!
                </h2>

                <p className="mx-auto mb-8 max-w-lg text-lg text-muted-foreground">
                    We apologize for the inconvenience. An unexpected error has occurred on our servers.
                </p>

                <div className="flex gap-4 justify-center">
                    <Button
                        size="lg"
                        onClick={reset}
                        variant="outline"
                        className="rounded-full px-8 font-semibold transition-all"
                    >
                        Try Again
                    </Button>
                    <Link href="/">
                        <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-primary/25 transition-all">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div >
    )
}
