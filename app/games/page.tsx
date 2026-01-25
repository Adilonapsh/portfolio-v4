"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Gamepad2, Timer, Trophy, ChevronRight } from "lucide-react"
import { useLoading } from "@/app/components/loading-context"

const games = [
    {
        id: "space-invaders",
        title: "Space Invaders",
        description: "Defend against the 404 invaders in this retro arcade shooter.",
        icon: <Gamepad2 className="w-6 h-6 text-primary" />,
        color: "from-blue-500/20 to-cyan-500/20",
        path: "/games/SPACE_INVADERS.HTML"
    },
    {
        id: "snake",
        title: "Snake Crawler",
        description: "The classic snake game, reimagined with a digital hacker aesthetic.",
        icon: <Timer className="w-6 h-6 text-emerald-500" />,
        color: "from-emerald-500/20 to-teal-500/20",
        path: "/games/SNAKE.HTML"
    },
    {
        id: "pingpong",
        title: "Cyber Pong",
        description: "Battle against a relentless AI in a high-speed neon match.",
        icon: <Trophy className="w-6 h-6 text-blue-500" />,
        color: "from-blue-600/20 to-indigo-600/20",
        path: "/games/PINGPONG.HTML"
    },
    {
        id: "flappy",
        title: "Gravity Defier",
        description: "Navigate through system errors while fighting heavy gravity.",
        icon: <Gamepad2 className="w-6 h-6 text-pink-500" />,
        color: "from-pink-500/20 to-purple-500/20",
        path: "/games/FLAPPYBIRD.HTML"
    },
    {
        id: "memory",
        title: "Memory Matrix",
        description: "Test your focus by matching digital fragments in the system.",
        icon: <Timer className="w-6 h-6 text-yellow-500" />,
        color: "from-yellow-500/20 to-orange-500/20",
        path: "/games/GET2.HTML"
    },
    {
        id: "decryptor",
        title: "Decryptor",
        description: "Can you crack the code? Hack your way into the restricted area.",
        icon: <Gamepad2 className="w-6 h-6 text-red-500" />,
        color: "from-red-500/20 to-orange-500/20",
        path: "/games/DECRIPTOR GAME.HTML"
    },
    {
        id: "dino",
        title: "Dino Runner",
        description: "Avoid glitches and errors in a never-ending survival sprint.",
        icon: <Trophy className="w-6 h-6 text-slate-400" />,
        color: "from-slate-500/20 to-slate-700/20",
        path: "/games/DINO.html"
    }
]

export default function GamesPage() {
    const { isLoaded } = useLoading()

    return (
        <main className="min-h-screen pt-32 pb-24 px-6 md:px-12">
            <div className="container mx-auto max-w-7xl">
                <div className="max-w-3xl mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 }}
                        className="text-primary font-bold tracking-[0.4em] text-[10px] uppercase mb-4"
                    >
                        Terminal / Playground
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6"
                    >
                        Games <br /> <span className="text-muted-foreground/30">Archives</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.8 }}
                        className="text-lg opacity-60 leading-relaxed"
                    >
                        Explore a collection of mini-games and experiments built with pure code.
                        A digital playground designed for focus, challenge, and retro-futuristic vibes.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game, i) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.9 + i * 0.1 }}
                        >
                            <Link href={`/games/${game.id}`} className="group relative block h-full">
                                <div className={`h-full p-8 rounded-[2.5rem] bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 relative overflow-hidden flex flex-col`}>
                                    {/* Background glow */}
                                    <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[80px] bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                    <div className="mb-6 rounded-2xl bg-muted/5 p-4 w-fit group-hover:scale-110 transition-transform duration-500">
                                        {game.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                                        {game.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
                                        {game.description}
                                    </p>

                                    <div className="mt-8 flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-30 group-hover:opacity-100 group-hover:text-primary transition-all">
                                            Execute_Session
                                        </span>
                                        <div className="p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    )
}
