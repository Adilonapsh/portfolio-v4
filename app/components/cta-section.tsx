"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRight, Zap } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"
import { motion } from "framer-motion"
import { useLoading } from "@/app/components/loading-context"

export default function CTASection() {
    const { isLoaded } = useLoading();
    return (
        <section className="relative py-40 overflow-hidden bg-background font-sans">
            <div className="absolute inset-0 coord-grid opacity-20 pointer-events-none" />

            {/* Background Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-outline text-[40vw] font-black uppercase whitespace-nowrap"
                >
                    LINK
                </motion.h2>
            </div>

            <div className="container px-6 mx-auto relative z-10 text-center">
                <ScrollReveal direction="up" distance={40}>
                    <div className="max-w-5xl mx-auto space-y-12">
                        <div className="flex flex-col items-center gap-4">
                            <span className="section-label">Update_Proyek</span>
                        </div>

                        <h2 className="text-5xl md:text-8xl font-black text-foreground leading-[0.85] tracking-tighter uppercase">
                            SIAP UNTUK <br /> <span className="text-primary italic">LEVEL BERIKUTNYA?</span>
                        </h2>

                        <p className="text-muted-foreground text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-80 leading-relaxed">
                            Mulai kolaborasi dengan arsitek digital Anda hari ini. Mari kita inisialisasi visi Anda menjadi realitas yang solid.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                            <Button className="h-16 px-6 rounded-full text-lg font-semibold bg-foreground text-background hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group">
                                <a href="mailto:hire@truenapsh.my.id" className="flex items-center gap-3">
                                    Hubungi Saya
                                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </a>
                            </Button>

                            <div className="flex items-center gap-3 glass-card px-6 py-4 rounded-2xl">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/50 leading-none">Status: Respon_Cepat</span>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
