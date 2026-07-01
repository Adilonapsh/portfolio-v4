"use client";

import { ScrollReveal } from "@/app/components/scroll-reveal";
import { motion } from "framer-motion";
import ExperienceList from "./experience-list";

export default function ExperienceSection() {
    return (
        <section className="relative py-48 px-6 overflow-hidden bg-background/50 backdrop-blur-sm">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center z-0">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 0.1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="text-outline text-[30vw] font-black uppercase whitespace-nowrap"
                >
                    HISTORY
                </motion.h2>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                    <div className="lg:w-1/3 lg:sticky lg:top-32">
                        <ScrollReveal direction="right">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-primary/30" />
                                    <span className="section-label">LINI_MASA</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
                                    JEJAK <br /> <span className="text-primary italic">KARIER</span>
                                </h2>
                                <p className="text-xl text-muted-foreground font-medium opacity-80 leading-relaxed max-w-sm">
                                    Evolusi profesional saya dalam industri teknologi digital selama 5 tahun terakhir.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <div className="lg:w-2/3">
                        <ExperienceList />
                    </div>
                </div>
            </div>
        </section>
    );
}
