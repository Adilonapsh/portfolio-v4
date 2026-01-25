"use client"

import { SnakeGame } from "@/components/SnakeGame"

export default function SnakePage() {
    return (
        <div className="container mx-auto min-h-screen flex flex-col items-center justify-center">
            <SnakeGame />
        </div>
    )
}
