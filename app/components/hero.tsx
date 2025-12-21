"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
    return (
        <section className="relative min-h-dvh flex items-center justify-center overflow-hidden pt-20">
            {/* Background decorative elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse delay-700" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter">
                            CREATIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">DEVELOPER</span>
                            <br />
                            & DESIGNER
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl font-medium">
                            I build exceptional digital experiences that live on the internet.
                            Specializing in crafting clean, functional, and user-centric websites.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button size="lg" className="rounded-full px-8 text-lg font-semibold">
                            Lihat Projek
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-semibold">
                            Hubungi Saya
                        </Button>
                    </div>

                    <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
                        {/* Placeholder for tech stack icons or stats */}
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">5+</span>
                            <span className="text-xs uppercase tracking-widest">Tahun Pengalaman</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">50+</span>
                            <span className="text-xs uppercase tracking-widest">Projek Selesai</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">20+</span>
                            <span className="text-xs uppercase tracking-widest">Klien Puas</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-bold">100%</span>
                            <span className="text-xs uppercase tracking-widest">Komitmen</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
