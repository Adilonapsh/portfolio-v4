"use client"

import { motion, useInView, Variants } from "framer-motion"
import { useRef, ReactNode } from "react"

interface ScrollRevealProps {
    children: ReactNode
    width?: "fit-content" | "100%"
    direction?: "up" | "down" | "left" | "right" | "none"
    delay?: number
    duration?: number
    distance?: number
    once?: boolean
    staggerChildren?: number
}

export const ScrollReveal = ({
    children,
    width = "100%",
    direction = "up",
    delay = 0,
    duration = 0.6,
    distance = 40,
    once = true,
    staggerChildren = 0
}: ScrollRevealProps) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once })

    const directionOffset = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {}
    }

    const variants: Variants = {
        hidden: {
            opacity: 0,
            ...directionOffset[direction],
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1], // Elegant cubic-bezier
                staggerChildren,
            },
        },
    }

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                {children}
            </motion.div>
        </div>
    )
}
