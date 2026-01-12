"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [scrolled, setScrolled] = useState(false)

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
                    "container transition-all duration-300 ease-in-out px-6",
                    scrolled
                        ? "rounded-full shadow-lg max-w-4xl mt-2 backdrop-blur-md bg-background/80 border border-border"
                        : "bg-transparent border-b border-transparent",
                )}
            >
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="h-8 w-8 bg-[#6d5dfc] rounded-lg flex items-center justify-center text-white font-black group-hover:rotate-12 transition-transform italic">
                            TN
                        </div>
                        <span className="font-bold text-xl tracking-tight uppercase">Truenapsh</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary opacity-70 hover:opacity-100">
                            Home
                        </Link>
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary opacity-70 hover:opacity-100">
                            About
                        </Link>
                        <Link href="/projects" className="text-sm font-medium transition-colors hover:text-primary opacity-70 hover:opacity-100">
                            Projects
                        </Link>
                        <Link href="/blog" className="text-sm font-medium transition-colors hover:text-primary opacity-70 hover:opacity-100">
                            Blog
                        </Link>
                        <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary opacity-70 hover:opacity-100">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-2">
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
            </div>
        </header>
    )
}
