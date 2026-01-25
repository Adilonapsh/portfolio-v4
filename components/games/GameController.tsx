"use client"

import React from "react"
import { motion } from "framer-motion"
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Zap } from "lucide-react"

type ControlType = "up" | "down" | "left" | "right" | "action"

interface GameControllerProps {
    onControl: (type: ControlType) => void
}

export default function GameController({ onControl }: GameControllerProps) {
    const Button = ({ type, icon: Icon, className }: { type: ControlType, icon: any, className?: string }) => (
        <motion.button
            whileTap={{ scale: 0.9, backgroundColor: "rgba(59, 130, 246, 0.3)" }}
            onPointerDown={(e) => {
                e.preventDefault()
                onControl(type)
            }}
            className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:border-primary transition-colors ${className}`}
        >
            <Icon className="w-8 h-8" />
        </motion.button>
    )

    return (
        <div className="fixed bottom-10 left-0 right-0 z-[60] flex items-center justify-between px-8 md:hidden pointer-events-none">
            {/* DPAD */}
            <div className="grid grid-cols-3 gap-2 pointer-events-auto">
                <div />
                <Button type="up" icon={ChevronUp} />
                <div />
                <Button type="left" icon={ChevronLeft} />
                <Button type="down" icon={ChevronDown} />
                <Button type="right" icon={ChevronRight} />
            </div>

            {/* Action Button */}
            <div className="pointer-events-auto">
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onPointerDown={(e) => {
                        e.preventDefault()
                        onControl("action")
                    }}
                    className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                >
                    <Zap className="w-10 h-10 fill-current" />
                </motion.button>
            </div>
        </div>
    )
}
