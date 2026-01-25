"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FlappyBird() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready")

    const BIRD = { w: 28, h: 28, gravity: 0.15, jump: -4.2 }
    const PIPE_WIDTH = 50
    const PIPE_GAP = 210
    const PIPE_SPEED = 1.5

    const birdYRef = useRef(200)
    const birdVelocityRef = useRef(0)
    const pipesRef = useRef<any[]>([])

    const resetGame = useCallback(() => {
        setScore(0)
        birdYRef.current = 200
        birdVelocityRef.current = 0
        pipesRef.current = [{ x: 600, top: 100, passed: false }]
        setGameState("playing")
    }, [])

    const jump = useCallback(() => {
        if (gameState === "playing") {
            birdVelocityRef.current = BIRD.jump
        }
    }, [gameState])

    // Listen for custom control events
    useEffect(() => {
        const handleControl = (e: any) => {
            if (e.detail.type === "action") jump()
        }
        window.addEventListener("game-control", handleControl)
        return () => window.removeEventListener("game-control", handleControl)
    }, [jump])

    useEffect(() => {
        if (gameState !== "playing") return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number

        const addPipe = () => {
            const minHeight = 50
            const maxHeight = canvas.height - PIPE_GAP - minHeight
            const height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight
            pipesRef.current.push({ x: canvas.width, top: height, passed: false })
        }

        const handleClick = (e: any) => {
            e.preventDefault()
            jump()
        }

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === " " || e.key === "ArrowUp") jump()
        }

        canvas.addEventListener("pointerdown", handleClick)
        window.addEventListener("keydown", handleKey)

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Physics
            birdVelocityRef.current += BIRD.gravity
            birdYRef.current += birdVelocityRef.current

            if (birdYRef.current + BIRD.h > canvas.height || birdYRef.current < -50) {
                setGameState("gameover")
            }

            // Pipes
            pipesRef.current.forEach((p, i) => {
                p.x -= PIPE_SPEED

                ctx.fillStyle = "rgba(255, 255, 255, 0.03)"
                ctx.strokeStyle = "rgba(255, 0, 85, 0.4)"
                ctx.lineWidth = 1

                // Render Top Pipe
                ctx.fillRect(p.x, 0, PIPE_WIDTH, p.top)
                ctx.strokeRect(p.x, 0, PIPE_WIDTH, p.top)

                // Render Bottom Pipe
                ctx.fillRect(p.x, p.top + PIPE_GAP, PIPE_WIDTH, canvas.height - p.top - PIPE_GAP)
                ctx.strokeRect(p.x, p.top + PIPE_GAP, PIPE_WIDTH, canvas.height - p.top - PIPE_GAP)

                // "4" Ornaments
                ctx.fillStyle = "#ff0055"
                ctx.font = "bold 18px Courier New"
                ctx.textAlign = "center"
                ctx.fillText("4", p.x + PIPE_WIDTH / 2, p.top - 15)
                ctx.fillText("4", p.x + PIPE_WIDTH / 2, p.top + PIPE_GAP + 35)

                // Hitbox
                const margin = 10
                if (
                    60 + BIRD.w - margin > p.x &&
                    60 + margin < p.x + PIPE_WIDTH &&
                    (birdYRef.current + margin < p.top || birdYRef.current + BIRD.h - margin > p.top + PIPE_GAP)
                ) {
                    setGameState("gameover")
                }

                // Score
                if (!p.passed && p.x + PIPE_WIDTH < 60) {
                    p.passed = true
                    setScore(s => s + 1)
                }
                if (p.x + PIPE_WIDTH < -50) pipesRef.current.splice(i, 1)
            })

            if (pipesRef.current.length === 0 || pipesRef.current[pipesRef.current.length - 1].x < canvas.width - 400) {
                addPipe()
            }

            // Draw Bird
            ctx.shadowBlur = 20
            ctx.shadowColor = "#3b82f6"
            ctx.strokeStyle = "#fff"
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.arc(60 + BIRD.w / 2, birdYRef.current + BIRD.h / 2, BIRD.w / 2, 0, Math.PI * 2)
            ctx.stroke()
            ctx.fillStyle = "#3b82f6"
            ctx.beginPath()
            ctx.arc(60 + BIRD.w / 2, birdYRef.current + BIRD.h / 2, BIRD.w / 4, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0

            animationId = requestAnimationFrame(update)
        }

        update()

        return () => {
            cancelAnimationFrame(animationId)
            canvas.removeEventListener("pointerdown", handleClick)
            window.removeEventListener("keydown", handleKey)
        }
    }, [gameState, jump])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div className="absolute top-4 left-6 flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">Stability_Index</span>
                <span className="text-2xl font-black">{score}</span>
            </div>

            <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="w-full h-full max-h-[400px] bg-white/5 rounded-3xl border border-white/10 touch-none cursor-pointer"
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
                            {gameState === "ready" ? "Gravity Defier" : "SISTEM TERHEMPAS"}
                        </h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            {gameState === "ready"
                                ? "Melayang pelan di ruang hampa sistem..."
                                : "KONTROL GRAVITASI GAGAL."}
                        </p>
                        <button
                            onClick={resetGame}
                            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                        >
                            {gameState === "ready" ? "Initialize" : "Inisialisasi Ulang"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
