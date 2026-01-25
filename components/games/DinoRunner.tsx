"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function DinoRunner() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready")

    const DINO_W = 40; const DINO_H = 40; const GRAVITY = 0.6; const JUMP_FORCE = -12; const GROUND_Y = 350

    const dinoYRef = useRef(GROUND_Y - DINO_H)
    const dinoVelocityRef = useRef(0)
    const obstaclesRef = useRef<any[]>([])
    const gameSpeedRef = useRef(5)
    const obstacleTimerRef = useRef(0)

    const resetGame = useCallback(() => {
        setScore(0)
        dinoYRef.current = GROUND_Y - DINO_H
        dinoVelocityRef.current = 0
        obstaclesRef.current = []
        gameSpeedRef.current = 5
        obstacleTimerRef.current = 0
        setGameState("playing")
    }, [])

    const jump = useCallback(() => {
        if (gameState === "playing" && dinoYRef.current >= GROUND_Y - DINO_H) {
            dinoVelocityRef.current = JUMP_FORCE
        }
    }, [gameState])

    useEffect(() => {
        const handleEvent = (e: any) => { if (e.detail.type === "action" || e.detail.type === "up") jump() }
        window.addEventListener("game-control", handleEvent)
        return () => window.removeEventListener("game-control", handleEvent)
    }, [jump])

    useEffect(() => {
        if (gameState !== "playing") return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number

        const handleKey = (e: KeyboardEvent) => { if (e.key === " " || e.key === "ArrowUp") jump() }
        canvas.addEventListener("pointerdown", (e) => { e.preventDefault(); jump() })
        window.addEventListener("keydown", handleKey)

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.strokeStyle = "rgba(255,255,255,0.1)"; ctx.beginPath(); ctx.moveTo(0, GROUND_Y); ctx.lineTo(canvas.width, GROUND_Y); ctx.stroke()

            dinoVelocityRef.current += GRAVITY
            dinoYRef.current += dinoVelocityRef.current
            if (dinoYRef.current > GROUND_Y - DINO_H) { dinoYRef.current = GROUND_Y - DINO_H; dinoVelocityRef.current = 0 }

            ctx.fillStyle = "#fff"; ctx.shadowBlur = 10; ctx.shadowColor = "#3b82f6"; ctx.fillRect(50, dinoYRef.current, DINO_W, DINO_H)
            ctx.fillStyle = "#3b82f6"; ctx.fillRect(50 + DINO_W - 10, dinoYRef.current + 5, 5, 5); ctx.shadowBlur = 0

            obstacleTimerRef.current++
            if (obstacleTimerRef.current > 100 + Math.random() * 50) {
                obstaclesRef.current.push({ x: canvas.width, w: 20 + Math.random() * 30, h: 30 + Math.random() * 40 })
                obstacleTimerRef.current = 0; gameSpeedRef.current += 0.1
            }

            obstaclesRef.current.forEach((obs, i) => {
                obs.x -= gameSpeedRef.current
                ctx.fillStyle = "#ff0055"; ctx.shadowBlur = 10; ctx.shadowColor = "#ff0055"; ctx.fillRect(obs.x, GROUND_Y - obs.h, obs.w, obs.h); ctx.shadowBlur = 0

                if (obs.x < 50 + DINO_W && obs.x + obs.w > 50 && dinoYRef.current + DINO_H > GROUND_Y - obs.h) setGameState("gameover")
                if (obs.x + obs.w < 0) { obstaclesRef.current.splice(i, 1); setScore(s => s + 1) }
            })

            animationId = requestAnimationFrame(update)
        }

        update()
        return () => { cancelAnimationFrame(animationId); window.removeEventListener("keydown", handleKey) }
    }, [gameState, jump])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-6 flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">Runtime_Survival</span>
                <span className="text-2xl font-black">{score}</span>
            </div>
            <canvas ref={canvasRef} width={800} height={400} className="w-full h-full max-h-[400px] bg-white/5 rounded-3xl border border-white/10 touch-none" />
            <AnimatePresence>
                {gameState !== "playing" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-3xl">
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">{gameState === "ready" ? "Dino Runner" : "System Halt"}</h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            {gameState === "ready" ? "Avoid glitches and errors in a never-ending survival sprint." : "A critical error has occurred during runtime"}
                        </p>
                        <button onClick={resetGame} className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20">
                            {gameState === "ready" ? "Initialize" : "Restart Process"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
