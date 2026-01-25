"use client"

import React, { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const GRID_SIZE = 20

export default function SnakeGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [score, setScore] = useState(0)
    const [gameState, setGameState] = useState<"ready" | "playing" | "gameover">("ready")

    const snakeRef = useRef([{ x: 10, y: 10 }])
    const foodRef = useRef({ x: 5, y: 5 })
    const directionRef = useRef({ x: 0, y: 0 })
    const lastUpdateRef = useRef(0)

    const generateFood = useCallback((currentSnake: { x: number, y: number }[], tileCount: number) => {
        let newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        }
        const isOnSnake = currentSnake.some(part => part.x === newFood.x && part.y === newFood.y)
        if (isOnSnake) return generateFood(currentSnake, tileCount)
        return newFood
    }, [])

    const resetGame = useCallback(() => {
        setScore(0)
        snakeRef.current = [{ x: 10, y: 10 }]
        directionRef.current = { x: 0, y: 0 }
        setGameState("playing")
    }, [])

    const handleControl = useCallback((type: string) => {
        switch (type) {
            case "up": if (directionRef.current.y !== 1) directionRef.current = { x: 0, y: -1 }; break
            case "down": if (directionRef.current.y !== -1) directionRef.current = { x: 0, y: 1 }; break
            case "left": if (directionRef.current.x !== 1) directionRef.current = { x: -1, y: 0 }; break
            case "right": if (directionRef.current.x !== -1) directionRef.current = { x: 1, y: 0 }; break
        }
    }, [])

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

        const tileCount = canvas.width / GRID_SIZE
        let animationId: number

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp": handleControl("up"); break
                case "ArrowDown": handleControl("down"); break
                case "ArrowLeft": handleControl("left"); break
                case "ArrowRight": handleControl("right"); break
            }
        }
        window.addEventListener("keydown", handleKeyDown)

        const update = (timestamp: number) => {
            if (timestamp - lastUpdateRef.current > 100) {
                lastUpdateRef.current = timestamp

                // Movement
                if (directionRef.current.x !== 0 || directionRef.current.y !== 0) {
                    const head = {
                        x: snakeRef.current[0].x + directionRef.current.x,
                        y: snakeRef.current[0].y + directionRef.current.y
                    }

                    // Boundary
                    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
                        setGameState("gameover")
                    } else if (snakeRef.current.some(part => part.x === head.x && part.y === head.y)) {
                        setGameState("gameover")
                    } else {
                        const newSnake = [head, ...snakeRef.current]
                        if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
                            setScore(s => s + 10)
                            foodRef.current = generateFood(newSnake, tileCount)
                        } else {
                            newSnake.pop()
                        }
                        snakeRef.current = newSnake
                    }
                }

                // Draw
                ctx.clearRect(0, 0, canvas.width, canvas.height)

                ctx.strokeStyle = "rgba(255,255,255,0.02)"
                for (let i = 0; i < canvas.width; i += GRID_SIZE) {
                    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
                }

                ctx.shadowBlur = 15; ctx.shadowColor = "#ff0055"; ctx.fillStyle = "#ff0055"
                ctx.fillRect(foodRef.current.x * GRID_SIZE + 2, foodRef.current.y * GRID_SIZE + 2, GRID_SIZE - 4, GRID_SIZE - 4)

                ctx.shadowColor = "#3b82f6"
                snakeRef.current.forEach((part, index) => {
                    ctx.fillStyle = index === 0 ? "#fff" : "#3b82f6"
                    ctx.fillRect(part.x * GRID_SIZE + 1, part.y * GRID_SIZE + 1, GRID_SIZE - 2, GRID_SIZE - 2)
                })
                ctx.shadowBlur = 0
            }

            animationId = requestAnimationFrame(update)
        }

        animationId = requestAnimationFrame(update)

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [gameState, generateFood, handleControl])

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 left-6 flex flex-col">
                <span className="text-[10px] font-black tracking-widest text-primary opacity-50 uppercase">DATA_COLLECTED</span>
                <span className="text-2xl font-black">{score}</span>
            </div>

            <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="aspect-square w-full max-w-[400px] bg-white/5 rounded-3xl border border-white/10"
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
                            {gameState === "ready" ? "System Crawler" : "SYSTEM HALT"}
                        </h2>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8 text-center px-12 leading-loose">
                            {gameState === "ready"
                                ? "Kumpulkan fragmen data untuk memperbaiki koneksi..."
                                : "ULAR MENABRAK DINDING SISTEM."}
                        </p>
                        <button
                            onClick={resetGame}
                            className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20"
                        >
                            {gameState === "ready" ? "Initialize" : "Restart Crawler"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
