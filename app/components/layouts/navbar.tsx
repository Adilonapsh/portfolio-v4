"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Transisi utama untuk sinkronisasi layout dan efek visual
    const transition = {
        type: "tween",
        ease: [0.4, 0, 0.2, 1],
        duration: 0.6
    } as const;

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    if (!mounted) return null

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4">
            <div
                className={cn(
                    "container transition-all duration-300 ease-in-out px-6 relative overflow-hidden",
                    scrolled
                        ? "rounded-full shadow-lg max-w-4xl mt-2 backdrop-blur-md bg-background/80 border border-border"
                        : "bg-transparent border-b border-transparent",
                )}
            >
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.div
                                layout
                                transition={transition}
                                className="flex items-center text-2xl font-bold tracking-tight uppercase text-foreground"
                            >
                                <motion.span layout transition={transition}>
                                    T
                                </motion.span>
                                <AnimatePresence>
                                    {!scrolled && (
                                        <motion.span
                                            key="rue"
                                            initial={{ opacity: 0, width: 0, filter: 'blur(8px)' }}
                                            animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                                            exit={{
                                                opacity: 0,
                                                width: 0,
                                                filter: 'blur(8px)',
                                                transition: { ...transition, duration: 0.4 }
                                            }}
                                            transition={transition}
                                            className="inline-block overflow-hidden whitespace-nowrap lowercase font-bold"
                                        >
                                            rue
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <motion.span
                                    layout
                                    transition={transition}
                                    className="inline-block"
                                >
                                    N
                                </motion.span>
                                <AnimatePresence>
                                    {!scrolled && (
                                        <motion.span
                                            key="apsh"
                                            initial={{ opacity: 0, width: 0, filter: 'blur(8px)' }}
                                            animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                                            exit={{
                                                opacity: 0,
                                                width: 0,
                                                filter: 'blur(8px)',
                                                transition: { ...transition, duration: 0.4 }
                                            }}
                                            transition={transition}
                                            className="inline-block overflow-hidden whitespace-nowrap lowercase font-bold"
                                        >
                                            apsh
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        {[
                            { name: "Home", href: "/" },
                            { name: "About", href: "/about" },
                            { name: "Projects", href: "/projects" },
                            { name: "Blog", href: "/blog" },
                            { name: "Contact", href: "#contact" },
                        ].map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary",
                                    pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))
                                        ? "text-primary opacity-100 font-bold"
                                        : "opacity-70 hover:opacity-100"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex-1 flex items-center justify-end space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            aria-label="Toggle theme"
                            className="rounded-full"
                        >
                            {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </Button>

                        <Button className="rounded-full px-6 font-semibold hidden sm:flex">
                            Let's Talk
                        </Button>
                    </div>
                </div>
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/30 origin-left"
                    style={{ scaleX }}
                />
            </div>
        </header>
    )
}
