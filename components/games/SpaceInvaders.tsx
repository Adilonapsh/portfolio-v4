"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SpaceInvaders() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState<"ready" | "playing" | "gameover" | "win">("ready")

    const INVADER_ROWS = 4
    const INVADER_COLS = 8
    const PADDLE_WIDTH = 40
    const PADDLE_HEIGHT = 20

    const playerXRef = useRef(0)
    const invadersRef = useRef<any[]>([])
    const bulletsRef = useRef<any[]>([])
    const lastShootTimeRef = useRef(0)
    const invaderDirectionRef = useRef(1)
    const invaderSpeedRef = useRef(0.5)

    const resetGame = useCallback(() => {
        setScore(0)
        invadersRef.current = []
        bulletsRef.current = []
        invaderDirectionRef.current = 1
        invaderSpeedRef.current = 0.5

        const textArr = ["4", "0", "4", "X"]
        for (let r = 0; r < INVADER_ROWS; r++) {
            for (let c = 0; c < INVADER_COLS; c++) {
                invadersRef.current.push({
                    x: c * 60 + 100,
                    y: r * 40 + 50,
                    char: textArr[r % textArr.length],
                    alive: true,
                })
            }
        }
        setGameState("playing")
    }, [])

    const shoot = useCallback(() => {
        const now = Date.now()
        if (now - lastShootTimeRef.current > 250) {
            bulletsRef.current.push({ x: playerXRef.current + PADDLE_WIDTH / 2, y: 410 })
            lastShootTimeRef.current = now
        }
    }, [])

    const handleControl = useCallback((type: string) => {
        if (type === "left") playerXRef.current = Math.max(0, playerXRef.current - 30)
        if (type === "right") playerXRef.current = Math.min(760, playerXRef.current + 30)
        if (type === "action" || type === "up") shoot()
    }, [shoot])

    useEffect(() => {
        const handleEvent = (e: any) => handleControl(e.detail.type)
        window.addEventListener("game-control", handleEvent)
        return () => window.removeEventListener("game-control", handleEvent)
    }, [handleControl])

    useEffect(() => {
        if (gameState !== "playing") return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        playerXRef.current = canvas.width / 2 - PADDLE_WIDTH / 2
        let animationId: number

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            playerXRef.current = e.clientX - rect.left - PADDLE_WIDTH / 2
        }

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") handleControl("left")
            if (e.key === "ArrowRight") handleControl("right")
            if (e.key === " " || e.key === "ArrowUp") handleControl("action")
        }

        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("mousedown", shoot)
        window.addEventListener("keydown", handleKey)

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Player
            ctx.fillStyle = "#fff"
            ctx.beginPath()
            ctx.moveTo(playerXRef.current + PADDLE_WIDTH / 2, canvas.height - 40)
            ctx.lineTo(playerXRef.current, canvas.height - 20)
            ctx.lineTo(playerXRef.current + PADDLE_WIDTH, canvas.height - 20)
            ctx.fill()

            ctx.shadowBlur = 10; ctx.shadowColor = "#3b82f6"; ctx.fillStyle = "#3b82f6"
            ctx.fillRect(playerXRef.current + PADDLE_WIDTH / 2 - 2, canvas.height - 35, 4, 10)
            ctx.shadowBlur = 0

            // Invaders
            let edgeReached = false
            ctx.font = "bold 16px Courier New"; ctx.textAlign = "center"

            invadersRef.current.forEach((inv) => {
                if (!inv.alive) return
                ctx.fillStyle = "#ff0055"; ctx.shadowBlur = 5; ctx.shadowColor = "#ff0055"
                ctx.fillText(inv.char, inv.x, inv.y)
                ctx.shadowBlur = 0

                inv.x += invaderDirectionRef.current * invaderSpeedRef.current
                if (inv.x + 25 > canvas.width || inv.x < 25) edgeReached = true
                if (inv.y > canvas.height - 60) setGameState("gameover")
            })

            if (edgeReached) {
                invaderDirectionRef.current *= -1
                invadersRef.current.forEach((inv) => (inv.y += 15))
                invaderSpeedRef.current += 0.05
            }

            // Bullets
            bulletsRef.current.forEach((b, index) => {
                b.y -= 6
                ctx.fillStyle = "#3b82f6"; ctx.shadowBlur = 10; ctx.shadowColor = "#3b82f6"
                ctx.fillRect(b.x, b.y, 2, 10)
                ctx.shadowBlur = 0

                invadersRef.current.forEach((inv) => {
                    if (inv.alive && b.x > inv.x - 12 && b.x < inv.x + 12 && b.y > inv.y - 18 && b.y < inv.y) {
                        inv.alive = false
                        bulletsRef.current.splice(index, 1)
                        setScore((s) => s + 10)
                    }
                })
                if (b.y < 0) bulletsRef.current.splice(index, 1)
            })

            if (invadersRef.current.every((inv) => !inv.alive)) setGameState("win")

            animationId = requestAnimationFrame(update)
        }

        update()
        return () => {
            cancelAnimationFrame(animationId)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("mousedown", shoot)
            window.removeEventListener("keydown", handleKey)
        }
    }, [gameState, handleControl, shoot])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-6 flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">SECTOR_SECURED</span>
                <span className="text-2xl font-black">{score}</span>
            </div>

            <canvas
                ref={canvasRef}
                width={800}
                height={450}
                className="w-full h-full max-h-[450px] cursor-crosshair bg-white/5 rounded-3xl border border-white/10"
            />

            <AnimatePresence>
                {gameState !== "playing" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md rounded-3xl"
                    >
                        <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
                            {gameState === "ready" ? "Space Defense" : (gameState === "gameover" ? "MISSION FAILED" : "MISSION SUCCESS")}
                        </h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            {gameState === "ready" ? "Hancurkan barisan error untuk memulihkan navigasi..." : (gameState === "gameover" ? "SISTEM TERLALU BANYAK ERROR." : "SEMUA ERROR TELAH DIHANCURKAN.")}
                        </p>
                        <button
                            onClick={resetGame}
                            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                        >
                            {gameState === "ready" ? "Initialize" : "Reboot System"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
