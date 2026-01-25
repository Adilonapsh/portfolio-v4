"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { SnakeGame } from "@/components/SnakeGame"

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
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background py-20">
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
                className="relative z-10 text-center px-4 max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="text-left order-2 md:order-1">
                    <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-bold tracking-widest uppercase">
                        <AlertCircle size={14} />
                        Status: 500 // Fatal_Error
                    </div>

                    <h2 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl text-foreground">
                        Something went <span className="text-primary italic">wrong!</span>
                    </h2>

                    <p className="mb-8 text-lg text-muted-foreground max-w-md">
                        The connection was lost due to an internal server crash. While we attempt to re-initialize service, you can assist with system recovery below.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button
                            size="lg"
                            onClick={reset}
                            variant="outline"
                            className="rounded-full px-8 font-semibold transition-all border-primary/20 hover:border-primary/50"
                        >
                            Try Again
                        </Button>
                        <Link href="/">
                            <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-primary/25 transition-all">
                                Back to Home
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="order-1 md:order-2 flex justify-center">
                    <SnakeGame />
                </div>
            </motion.div>
        </div >
    )
}

