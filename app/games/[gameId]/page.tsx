"use client"

import React, { Suspense, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, RotateCcw } from "lucide-react"
import { useLoading } from "@/app/components/loading-context"
import { useParams } from "next/navigation"

import SpaceInvaders from "@/components/games/SpaceInvaders"
import SnakeGame from "@/components/games/SnakeGame"
import PingPong from "@/components/games/PingPong"
import FlappyBird from "@/components/games/FlappyBird"
import MemoryMatrix from "@/components/games/MemoryMatrix"
import DecryptorGame from "@/components/games/DecryptorGame"
import DinoRunner from "@/components/games/DinoRunner"
import GameController from "@/components/games/GameController"

const gamesData: Record<string, { title: string, component: React.ReactNode }> = {
    "space-invaders": { title: "Space Invaders", component: <SpaceInvaders /> },
    "snake": { title: "Snake Crawler", component: <SnakeGame /> },
    "pingpong": { title: "Cyber Pong", component: <PingPong /> },
    "flappy": { title: "Gravity Defier", component: <FlappyBird /> },
    "memory": { title: "Memory Matrix", component: <MemoryMatrix /> },
    "decryptor": { title: "Decryptor", component: <DecryptorGame /> },
    "dino": { title: "Dino Runner", component: <DinoRunner /> },
}

export default function GamePlayerPage() {
    const { isLoaded } = useLoading()
    const { gameId } = useParams()
    const game = useMemo(() => gamesData[gameId as string], [gameId])
    const [gameKey, setGameKey] = React.useState(0)

    if (!game) return null

    const resetGame = () => setGameKey(prev => prev + 1)

    const handleControl = (type: string) => {
        window.dispatchEvent(new CustomEvent("game-control", { detail: { type } }))
    }

    return (
        <main className="min-h-screen bg-background relative flex flex-col overflow-hidden">
            {/* Header / Nav */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 md:p-12 flex items-center justify-between pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                    className="pointer-events-auto"
                >
                    <Link href="/games" className="group flex items-center gap-4 bg-card/50 backdrop-blur-xl border border-border/50 p-2 pr-6 rounded-full hover:border-primary transition-all">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-90 transition-transform">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Quit Session</span>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                    className="hidden lg:flex flex-col items-center gap-1"
                >
                    <span className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase opacity-50">Subject</span>
                    <h1 className="text-xl font-black uppercase tracking-tighter">{game.title}</h1>
                </motion.div>

                <div className="flex gap-2 pointer-events-auto">
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                        onClick={resetGame}
                        className="w-14 h-14 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center text-foreground hover:text-primary hover:border-primary transition-all"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </motion.button>
                </div>
            </header>

            {/* Game Area */}
            <div className="flex-1 flex items-center justify-center pt-28 pb-6 px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-7xl aspect-video rounded-[3rem] bg-card border border-border/50 overflow-hidden shadow-2xl relative flex items-center justify-center p-4 md:p-8"
                >
                    <Suspense fallback={<div className="text-primary animate-pulse">Initializing System...</div>}>
                        {React.cloneElement(game.component as React.ReactElement, { key: gameKey })}
                    </Suspense>
                </motion.div>
            </div>

            <GameController onControl={handleControl} />

            {/* Ambient Background Glow */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[150px] rounded-full animate-pulse" />
            </div>
        </main>
    )
}
