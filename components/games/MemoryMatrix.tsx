"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SYMBOLS = ["4", "0", "4", "{ }", "< >", "[ ]", "!", "?"]

export default function MemoryMatrix() {
    const [cards, setCards] = useState<any[]>([])
    const [flipped, setFlipped] = useState<number[]>([])
    const [matched, setMatched] = useState<number[]>([])
    const [moves, setMoves] = useState(0)
    const [gameState, setGameState] = useState<"ready" | "playing" | "win">("ready")

    useEffect(() => {
        if (gameState === "playing") initGame()
    }, [gameState])

    const initGame = () => {
        const deck = [...SYMBOLS, ...SYMBOLS]
            .sort(() => Math.random() - 0.5)
            .map((symbol, id) => ({ id, symbol }))
        setCards(deck)
        setMatched([])
        setFlipped([])
        setMoves(0)
    }

    const handleFlip = (index: number) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return

        const newFlipped = [...flipped, index]
        setFlipped(newFlipped)

        if (newFlipped.length === 2) {
            setMoves(m => m + 1)
            if (cards[newFlipped[0]].symbol === cards[newFlipped[1]].symbol) {
                setMatched([...matched, ...newFlipped])
                setFlipped([])
                if (matched.length + 2 === cards.length) setGameState("win")
            } else {
                setTimeout(() => setFlipped([]), 1000)
            }
        }
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
            <div className="absolute top-4 w-full flex justify-between px-12 font-black text-[10px] tracking-[0.3em] text-primary">
                <span>MOVES: {moves}</span>
                <span>MATCHED: {matched.length / 2}/8</span>
            </div>

            <div className="grid grid-cols-4 gap-3 w-full max-w-[360px]">
                {cards.map((card, i) => (
                    <div
                        key={i}
                        onClick={() => handleFlip(i)}
                        className={`aspect-square rounded-xl border flex items-center justify-center text-xl font-bold cursor-pointer transition-all duration-500
              ${flipped.includes(i) || matched.includes(i) ? "bg-primary/20 border-primary rotate-y-180" : "bg-white/5 border-white/10"}`}
                    >
                        {(flipped.includes(i) || matched.includes(i)) && <span className="text-primary">{card.symbol}</span>}
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {gameState !== "playing" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-3xl">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{gameState === "ready" ? "Memory Matrix" : "Memory Restored"}</h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            Restore the lost data fragments from the system memory
                        </p>
                        <button onClick={() => setGameState("playing")} className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                            Initialize Matrix
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
