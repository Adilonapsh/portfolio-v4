"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PingPong() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [playerScore, setPlayerScore] = useState(0)
    const [cpuScore, setCpuScore] = useState(0)
    const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready")

    const PADDLE_WIDTH = 10
    const PADDLE_HEIGHT = 80
    const BALL_SIZE = 10

    useEffect(() => {
        if (gameState !== "playing") return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number
        let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2
        let cpu = { x: canvas.width - 30, y: canvas.height / 2 - PADDLE_HEIGHT / 2, speed: 4.5 }
        let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 5, dy: 5, speed: 5 }

        const resetBall = () => {
            ball.x = canvas.width / 2
            ball.y = canvas.height / 2
            ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed
            ball.dy = (Math.random() - 0.5) * 8
        }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            playerY = e.clientY - rect.top - PADDLE_HEIGHT / 2
        }

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault()
            const rect = canvas.getBoundingClientRect()
            playerY = e.touches[0].clientY - rect.top - PADDLE_HEIGHT / 2
        }

        canvas.addEventListener("mousemove", handleMouseMove)
        canvas.addEventListener("touchmove", handleTouchMove, { passive: false })

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Center Line
            ctx.setLineDash([10, 15])
            ctx.beginPath()
            ctx.moveTo(canvas.width / 2, 0)
            ctx.lineTo(canvas.width / 2, canvas.height)
            ctx.strokeStyle = "rgba(255,255,255,0.05)"
            ctx.stroke()
            ctx.setLineDash([])

            // Players
            ctx.fillStyle = "#fff"
            ctx.fillRect(20, playerY, PADDLE_WIDTH, PADDLE_HEIGHT)

            ctx.shadowBlur = 15
            ctx.shadowColor = "#3b82f6"
            ctx.fillStyle = "#3b82f6"
            ctx.fillRect(cpu.x, cpu.y, PADDLE_WIDTH, PADDLE_HEIGHT)

            // Ball
            ctx.shadowBlur = 15
            ctx.shadowColor = "#fff"
            ctx.fillStyle = "#fff"
            ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE)
            ctx.shadowBlur = 0

            // Ball Logic
            ball.x += ball.dx
            ball.y += ball.dy

            if (ball.y <= 0 || ball.y + BALL_SIZE >= canvas.height) ball.dy *= -1

            // AI Logic
            const cpuCenter = cpu.y + PADDLE_HEIGHT / 2
            if (cpuCenter < ball.y - 10) cpu.y += cpu.speed
            else if (cpuCenter > ball.y + 10) cpu.y -= cpu.speed

            // Collision Player
            if (ball.x <= 20 + PADDLE_WIDTH && ball.y + BALL_SIZE >= playerY && ball.y <= playerY + PADDLE_HEIGHT) {
                ball.dx = Math.abs(ball.dx) * 1.05
                ball.dy += (ball.y - (playerY + PADDLE_HEIGHT / 2)) * 0.2
                ball.x = 20 + PADDLE_WIDTH
            }

            // Collision CPU
            if (ball.x + BALL_SIZE >= cpu.x && ball.y + BALL_SIZE >= cpu.y && ball.y <= cpu.y + PADDLE_HEIGHT) {
                ball.dx = -Math.abs(ball.dx) * 1.05
                ball.dy += (ball.y - (cpu.y + PADDLE_HEIGHT / 2)) * 0.2
                ball.x = cpu.x - BALL_SIZE
            }

            // Scoring
            if (ball.x < 0) {
                setCpuScore(s => s + 1)
                resetBall()
            } else if (ball.x > canvas.width) {
                setPlayerScore(s => s + 1)
                resetBall()
            }

            if (playerScore >= 5 || cpuScore >= 5) setGameState("gameover")

            animationId = requestAnimationFrame(update)
        }

        update()

        return () => {
            cancelAnimationFrame(animationId)
            canvas.removeEventListener("mousemove", handleMouseMove)
            canvas.removeEventListener("touchmove", handleTouchMove)
        }
    }, [gameState, playerScore, cpuScore])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div id="score-display" className="absolute top-4 w-full flex justify-between px-12 font-black text-[10px] tracking-[0.3em] text-primary">
                <span>YOU: {playerScore}</span>
                <span>CPU: {cpuScore}</span>
            </div>

            <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-full max-h-[400px] bg-white/5 rounded-3xl border border-white/10 cursor-none"
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
                            {gameState === "ready" ? "Cyber Pong" : (playerScore >= 5 ? "System Connected" : "Access Denied")}
                        </h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            {gameState === "ready"
                                ? "Defeat the AI to prove you are not lost"
                                : (playerScore >= 5 ? "You have overcome the deadlock" : "The AI is too strong for the system")}
                        </p>
                        <button
                            onClick={() => {
                                setPlayerScore(0)
                                setCpuScore(0)
                                setGameState("playing")
                            }}
                            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                        >
                            {gameState === "ready" ? "Initialize" : "New Match"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
