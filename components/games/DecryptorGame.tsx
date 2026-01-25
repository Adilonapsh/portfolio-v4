"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DecryptorGame() {
    const [targetCode, setTargetCode] = useState<number[]>([])
    const [currentGuess, setCurrentGuess] = useState<string[]>(["", "", "", ""])
    const [activeSlot, setActiveSlot] = useState(0)
    const [logs, setLogs] = useState<any[]>([])
    const [gameState, setGameState] = useState<"ready" | "playing" | "win" | "fail">("ready")

    const MAX_ATTEMPTS = 10

    const initGame = () => {
        setTargetCode(Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)))
        setCurrentGuess(["", "", "", ""])
        setActiveSlot(0)
        setLogs([])
        setGameState("playing")
    }

    const pressKey = (num: number) => {
        if (activeSlot < 4) {
            const newGuess = [...currentGuess]
            newGuess[activeSlot] = num.toString()
            setCurrentGuess(newGuess)
            if (activeSlot < 3) setActiveSlot(activeSlot + 1)
        }
    }

    const submitGuess = () => {
        if (currentGuess.includes("")) return
        const guessNums = currentGuess.map(Number)

        let correct = 0, present = 0
        let tempTarget = [...targetCode], tempGuess = [...guessNums]
        let usedT = [false, false, false, false], usedG = [false, false, false, false]

        for (let i = 0; i < 4; i++) {
            if (tempGuess[i] === tempTarget[i]) { correct++; usedT[i] = true; usedG[i] = true; }
        }
        for (let i = 0; i < 4; i++) {
            if (usedG[i]) continue
            for (let j = 0; j < 4; j++) {
                if (!usedT[j] && tempGuess[i] === tempTarget[j]) { present++; usedT[j] = true; break; }
            }
        }

        const newLog = { guess: currentGuess.join(""), correct, present }
        setLogs([newLog, ...logs])
        setCurrentGuess(["", "", "", ""])
        setActiveSlot(0)

        if (correct === 4) setGameState("win")
        else if (logs.length + 1 >= MAX_ATTEMPTS) setGameState("fail")
    }

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 max-w-sm mx-auto">
            <div className="w-full h-48 overflow-y-auto mb-6 bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-[10px] space-y-2">
                {logs.map((log, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-1">
                        <span>[{logs.length - i}] {log.guess}</span>
                        <div className="flex gap-1">
                            {Array(log.correct).fill(0).map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />)}
                            {Array(log.present).fill(0).map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]" />)}
                        </div>
                    </div>
                ))}
                {logs.length === 0 && <div className="text-primary/50">&gt; Waiting for decryption key...</div>}
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
                {currentGuess.map((digit, i) => (
                    <div key={i} className={`h-14 w-12 flex items-center justify-center bg-white/5 border-2 rounded-lg text-xl font-bold transition-all ${activeSlot === i ? "border-primary bg-primary/10" : "border-white/10"}`}>
                        {digit || "-"}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-5 gap-2 w-full mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => (
                    <button key={n} onClick={() => pressKey(n)} className="h-10 bg-white/5 border border-white/10 rounded font-bold hover:bg-white/10 active:scale-90 transition-all">{n}</button>
                ))}
            </div>

            <button onClick={submitGuess} className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">
                Execute Decryption
            </button>

            <AnimatePresence>
                {gameState !== "playing" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-3xl">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{gameState === "ready" ? "Decryptor" : (gameState === "win" ? "Access Granted" : "Lockout Initialized")}</h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            {gameState === "win" ? "The key sequence was successfully cracked" : "Crack the 4-digit access code sequence"}
                        </p>
                        <button onClick={initGame} className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                            {gameState === "ready" ? "Initialize" : "Reboot System"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
