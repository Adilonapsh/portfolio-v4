"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, Sun, Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useTheme } from "next-themes"
import { usePathname } from "next/navigation"
import { useLoading } from "@/app/components/loading-context"

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
]

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const { isLoaded } = useLoading()
    const pathname = usePathname()
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => {
                isFirstLoad.current = false
            }, 2500)
            return () => clearTimeout(timer)
        }
    }, [isLoaded])

    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Main transition for syncing layout and visual effects
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
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Handle body scroll locking
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isMobileMenuOpen])

    if (!mounted) return null

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={isLoaded ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4"
            >
                <div
                    className={cn(
                        "container transition-all duration-300 ease-in-out px-6 relative overflow-hidden",
                        scrolled || isMobileMenuOpen
                            ? "rounded-full shadow-lg max-w-4xl mt-2 backdrop-blur-md bg-background/80 border border-border"
                            : "bg-transparent border-b border-transparent",
                    )}
                >
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo Section */}
                        <div className="flex-1 flex justify-start">
                            <Link href="/" className="flex items-center gap-2 group">
                                <motion.div
                                    layout
                                    transition={transition}
                                    className="flex items-center text-2xl font-bold tracking-tight uppercase text-foreground"
                                >
                                    <motion.span layout transition={transition}>T</motion.span>
                                    <AnimatePresence>
                                        {(!scrolled || isMobileMenuOpen) && isLoaded && (
                                            <motion.span
                                                key="rue"
                                                initial={{ opacity: 0, width: 0, filter: 'blur(8px)' }}
                                                animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, width: 0, filter: 'blur(8px)' }}
                                                transition={{ ...transition, delay: isFirstLoad.current ? 1.2 : 0 }}
                                                className="inline-block overflow-hidden whitespace-nowrap lowercase font-bold"
                                            >
                                                rue
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    <motion.span layout transition={{ ...transition, delay: isFirstLoad.current ? 1.2 : 0 }} className="inline-block">N</motion.span>
                                    <AnimatePresence>
                                        {(!scrolled || isMobileMenuOpen) && isLoaded && (
                                            <motion.span
                                                key="apsh"
                                                initial={{ opacity: 0, width: 0, filter: 'blur(8px)' }}
                                                animate={{ opacity: 1, width: 'auto', filter: 'blur(0px)' }}
                                                exit={{ opacity: 0, width: 0, filter: 'blur(8px)' }}
                                                transition={{ ...transition, delay: isFirstLoad.current ? 1.2 : 0 }}
                                                className="inline-block overflow-hidden whitespace-nowrap lowercase font-bold"
                                            >
                                                apsh
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
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

                        {/* Actions Section */}
                        <div className="flex-1 flex items-center justify-end space-x-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                aria-label="Toggle theme"
                                className="rounded-full hidden sm:flex"
                            >
                                {theme === "light" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>

                            <Button className="rounded-full px-6 font-semibold hidden md:flex">
                                Let's Talk
                            </Button>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full md:hidden relative z-[60]"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="h-6 w-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="h-6 w-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </div>

                    {/* Scroll Progress Bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary/30 origin-left"
                        style={{ scaleX }}
                    />
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center"
                    >
                        <nav className="flex flex-col items-center gap-8 px-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={cn(
                                            "text-4xl font-extrabold uppercase tracking-tighter transition-all hover:text-primary active:scale-95",
                                            pathname === link.href ? "text-primary" : "text-muted-foreground"
                                        )}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Mobile Theme Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
                            className="mt-16 flex items-center gap-6"
                        >
                            <Button
                                variant="outline"
                                className="rounded-full px-8 gap-2 font-bold uppercase tracking-widest text-[10px]"
                                onClick={() => {
                                    setTheme(theme === "dark" ? "light" : "dark")
                                    setIsMobileMenuOpen(false)
                                }}
                            >
                                {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                Theme / {theme === "dark" ? "Light" : "Dark"}
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
