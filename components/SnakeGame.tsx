"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { AlertCircle, RotateCcw, Play, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const GRID_SIZE = 20
const INITIAL_SNAKE = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
]
const INITIAL_DIRECTION = { x: 0, y: -1 }

type Point = { x: number; y: number }

export function SnakeGame() {
    const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE)
    const [food, setFood] = useState<Point>({ x: 5, y: 5 })
    const [direction, setDirection] = useState(INITIAL_DIRECTION)
    const [gameState, setGameState] = useState("START") // START, PLAYING, GAMEOVER
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null)
    const gameLoopRef = useRef<NodeJS.Timeout | null>(null)

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem("snake-high-score")
        if (saved) setHighScore(parseInt(saved))
    }, [])

    // Generate food
    const generateFood = useCallback(() => {
        let newFood
        do {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE),
            }
        } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
        setFood(newFood)
    }, [snake])

    const startGame = () => {
        setSnake(INITIAL_SNAKE)
        setDirection(INITIAL_DIRECTION)
        setScore(0)
        setGameState("PLAYING")
        generateFood()
    }

    const gameOver = useCallback(() => {
        setGameState("GAMEOVER")
        if (score > highScore) {
            setHighScore(score)
            localStorage.setItem("snake-high-score", score.toString())
        }
    }, [score, highScore])

    const moveSnake = useCallback(() => {
        setSnake(prevSnake => {
            const head = { ...prevSnake[0] }
            head.x += direction.x
            head.y += direction.y

            // Collision walls
            if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
                gameOver()
                return prevSnake
            }

            // Collision self
            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                gameOver()
                return prevSnake
            }

            const newSnake = [head, ...prevSnake]

            // Check eating
            if (head.x === food.x && head.y === food.y) {
                setScore(s => s + 10)
                generateFood()
            } else {
                newSnake.pop()
            }

            return newSnake
        })
    }, [direction, food, gameOver, generateFood])

    useEffect(() => {
        if (gameState === "PLAYING") {
            const interval = Math.max(150 - Math.floor(score / 50) * 5, 80)
            gameLoopRef.current = setInterval(moveSnake, interval)
        } else {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current)
        }
        return () => {
            if (gameLoopRef.current) clearInterval(gameLoopRef.current)
        }
    }, [gameState, moveSnake, score])

    // Key controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    if (direction.y === 0) setDirection({ x: 0, y: -1 })
                    break
                case "ArrowDown":
                case "s":
                    if (direction.y === 0) setDirection({ x: 0, y: 1 })
                    break
                case "ArrowLeft":
                case "a":
                    if (direction.x === 0) setDirection({ x: -1, y: 0 })
                    break
                case "ArrowRight":
                case "d":
                    if (direction.x === 0) setDirection({ x: 1, y: 0 })
                    break
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [direction])

    // Swipe logic
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (!touchStart) return
        const touchEnd = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY }
        const dx = touchEnd.x - touchStart.x
        const dy = touchEnd.y - touchStart.y

        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > 30) {
                if (dx > 0 && direction.x === 0) setDirection({ x: 1, y: 0 })
                else if (dx < 0 && direction.x === 0) setDirection({ x: -1, y: 0 })
            }
        } else {
            if (Math.abs(dy) > 30) {
                if (dy > 0 && direction.y === 0) setDirection({ x: 0, y: 1 })
                else if (dy < 0 && direction.y === 0) setDirection({ x: 0, y: -1 })
            }
        }
        setTouchStart(null)
    }

    return (
        <div className="flex flex-col items-center justify-center font-mono selection:bg-primary selection:text-primary-foreground py-8">
            {/* Grid Game */}
            <div
                className="relative border-4 border-foreground/20 p-1 bg-background shadow-2xl rounded-lg overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className="grid gap-[1px] bg-muted/20"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        width: "min(85vw, 400px)",
                        height: "min(85vw, 400px)",
                    }}
                >
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                        const x = i % GRID_SIZE
                        const y = Math.floor(i / GRID_SIZE)
                        const isSnake = snake.some(s => s.x === x && s.y === y)
                        const isHead = snake[0].x === x && snake[0].y === y
                        const isFood = food.x === x && food.y === y

                        return (
                            <div
                                key={i}
                                className={cn(
                                    "w-full h-full rounded-sm transition-colors duration-150",
                                    isHead ? "bg-primary scale-110 z-10 shadow-[0_0_10px_rgba(var(--primary),0.5)]" :
                                        isSnake ? "bg-primary/60" :
                                            isFood ? "bg-destructive animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.6)]" : "bg-transparent"
                                )}
                            />
                        )
                    })}
                </div>

                {/* Start Overlay */}
                <AnimatePresence>
                    {gameState === "START" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center z-20"
                        >
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            >
                                <Play className="mb-6 text-primary" size={64} fill="currentColor" />
                            </motion.div>
                            <Button onClick={startGame} size="lg" className="font-bold uppercase tracking-widest px-10 rounded-none border-2">
                                Initialize Fix
                            </Button>
                            <p className="mt-6 text-[10px] opacity-60 uppercase tracking-tighter text-center max-w-[200px]">
                                Swipe or Use Arrows to Recover System Integrity
                            </p>
                        </motion.div>
                    )}

                    {/* Game Over Overlay */}
                    {gameState === "GAMEOVER" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 bg-destructive flex flex-col items-center justify-center z-20 text-destructive-foreground p-6 text-center"
                        >
                            <AlertCircle className="mb-4" size={64} />
                            <h2 className="text-3xl font-black mb-1 uppercase italic tracking-tighter">System_Fatal</h2>
                            <p className="mb-6 font-bold opacity-90 tracking-tight text-sm uppercase">CONNECTION TERMINATED // SCORE: {score}</p>
                            <Button
                                onClick={startGame}
                                variant="secondary"
                                className="flex items-center gap-2 font-bold uppercase tracking-widest rounded-none border-2"
                            >
                                <RotateCcw size={16} /> Reboot System
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 gap-8 text-sm tracking-widest border-t border-foreground/10 pt-4 w-full max-w-[400px]">
                <div className="flex flex-col">
                    <span className="opacity-40 text-[9px] font-bold uppercase tracking-tighter">Current_Payload</span>
                    <span className="text-2xl font-black text-primary">{score.toString().padStart(3, "0")}</span>
                </div>
                <div className="flex flex-col items-end text-right">
                    <span className="opacity-40 text-[9px] font-bold uppercase tracking-tighter">System_Record</span>
                    <div className="flex items-center gap-2 text-primary/80">
                        <Trophy size={16} />
                        <span className="text-2xl font-black">{highScore.toString().padStart(3, "0")}</span>
                    </div>
                </div>
            </div>

            {/* D-Pad controls for mobile */}
            <div className="mt-8 grid grid-cols-3 gap-3 md:hidden">
                <div />
                <Button
                    variant="outline" size="icon" className="w-16 h-16 rounded-xl border-2 active:scale-95 transition-transform"
                    onPointerDown={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}
                >
                    <ArrowUp className="w-8 h-8" />
                </Button>
                <div />
                <Button
                    variant="outline" size="icon" className="w-16 h-16 rounded-xl border-2 active:scale-95 transition-transform"
                    onPointerDown={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}
                >
                    <ArrowLeft className="w-8 h-8" />
                </Button>
                <Button
                    variant="outline" size="icon" className="w-16 h-16 rounded-xl border-2 active:scale-95 transition-transform"
                    onPointerDown={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}
                >
                    <ArrowDown className="w-8 h-8" />
                </Button>
                <Button
                    variant="outline" size="icon" className="w-16 h-16 rounded-xl border-2 active:scale-95 transition-transform"
                    onPointerDown={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}
                >
                    <ArrowRight className="w-8 h-8" />
                </Button>
            </div>

            <div className="mt-6 text-[10px] opacity-20 uppercase font-bold tracking-[0.3em] md:block hidden">
                Hardware Controller Enabled // [WASD] [Arrows]
            </div>
        </div>
    )
}
