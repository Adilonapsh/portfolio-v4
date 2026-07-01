"use client";

import React from "react"
import Image from 'next/image'
import { motion } from "framer-motion"
import { Mail, Briefcase, Calendar, MapPin, Sparkles, Orbit } from 'lucide-react'
import { ScrollReveal } from "@/app/components/scroll-reveal"
import { useLoading } from "@/app/components/loading-context"

export default function AboutContent() {
    const { isLoaded } = useLoading();

    return (
        <>
            {/* Intro Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                    <motion.div
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={isLoaded ? { opacity: 1, rotate: 360 } : { opacity: 0 }}
                        transition={{
                            opacity: { duration: 1 },
                            rotate: { duration: 40, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] border border-primary/5 rounded-full"
                    />
                    <motion.div
                        initial={{ opacity: 0, rotate: 0 }}
                        animate={isLoaded ? { opacity: 1, rotate: -360 } : { opacity: 0 }}
                        transition={{
                            opacity: { duration: 1 },
                            rotate: { duration: 30, repeat: Infinity, ease: "linear" }
                        }}
                        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-primary/10 rounded-full"
                    />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 100 }}
                        animate={isLoaded ? { opacity: 0.1, y: 0 } : { opacity: 0, y: 100 }}
                        transition={{ duration: 2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
                        className="text-outline text-[40vw] font-black uppercase tracking-tighter leading-none"
                    >
                        ADIL IVANSYAH
                    </motion.h2>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-12 order-2 lg:order-1">
                            <ScrollReveal direction="right" delay={0.4}>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-[1px] bg-primary/40" />
                                        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-primary/60">IDENTITY // ADIL IVANSYAH</span>
                                    </div>
                                    <h1 className="text-7xl md:text-[10vw] font-black leading-[0.75] tracking-tighter uppercase">
                                        ADIL IVANSYAH
                                    </h1>

                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                <ScrollReveal direction="up" delay={0.6}>
                                    <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-tight opacity-90 border-l-2 border-primary/20 pl-6">
                                        Ubah <span className="text-foreground italic">ide menjadi kenyataan.</span>
                                    </p>
                                </ScrollReveal>
                                <ScrollReveal direction="up" delay={0.7}>
                                    <p className="text-sm text-muted-foreground font-medium max-w-xs leading-relaxed opacity-70">
                                        Dari desain antarmuka hingga kode yang berjalan di belakang layar. Selalu berusaha memberikan yang terbaik.
                                    </p>
                                </ScrollReveal>
                            </div>

                            <ScrollReveal direction="up" delay={0.8}>
                                <div className="flex flex-wrap gap-4 pt-6">
                                    <div className="flex items-center gap-3 glass-card px-6 py-3 rounded-2xl border-primary/10">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">BOGOR, ID</span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
                            <ScrollReveal direction="left" delay={0.6}>
                                <div className="relative group">
                                    <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-40 transition-opacity duration-1000" />

                                    <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-[4rem] overflow-hidden glass-card border-primary/20 shadow-3xl p-8 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-background/50 z-0" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Narrative Section (Bio) */}
            <section className="relative py-48 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center z-0">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isLoaded ? { opacity: 0.05, y: 0 } : { opacity: 0, y: 20 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: 0.3 }}
                        className="text-outline text-[20vw] font-black uppercase whitespace-nowrap"
                    >
                        ADIL IVANSYAH
                    </motion.h2>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 relative">
                            <ScrollReveal direction="right">
                                <div className="relative z-10 space-y-12">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-px w-12 bg-primary/30" />
                                            <span className="section-label italic">Visi_Misi</span>
                                        </div>
                                        <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9] uppercase">
                                            The <br /> <span className="text-primary not-italic">Manifesto</span>
                                        </h2>
                                    </div>

                                    <div className="glass-card p-8 rounded-[2.5rem] border-primary/10 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 space-y-6">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                    <Sparkles className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Core_Engine</p>
                                                    <h4 className="text-xl font-black uppercase tracking-tight">Kreativitas & Skalabilitas</h4>
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                                                Setiap proyek adalah eksperimen dalam mengubah kode mentah menjadi emas digital yang fungsional.
                                            </p>
                                            <div className="pt-4 flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full border border-primary/20 flex items-center justify-center">
                                                    <Mail className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-xs font-black font-mono tracking-tight opacity-60">hire@truenapsh.my.id</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-[100px] z-0" />
                        </div>

                        <div className="lg:col-span-7">
                            <ScrollReveal direction="up" delay={0.3}>
                                <div className="space-y-12 lg:pl-16">
                                    <div className="relative">
                                        <span className="absolute -left-12 top-0 text-[120px] font-black text-primary/5 select-none leading-none">"</span>
                                        <h3 className="text-3xl md:text-5xl font-black leading-[1.2] tracking-tight uppercase">
                                            Membangun aplikasi yang sukses <br /> adalah <span className="text-primary italic underline decoration-primary/20 underline-offset-8">sebuah tantangan</span> yang saya nikmati setiap harinya.
                                        </h3>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="h-px w-full bg-primary/10" />
                                            <p className="text-xl text-muted-foreground font-medium leading-[1.6] italic opacity-90 text-justify">
                                                Saya adalah seorang Fullstack Developer dan UI/UX Designer yang berfokus pada pembuatan antarmuka web yang modern, responsif, dan mudah digunakan.
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="h-px w-full bg-primary/10" />
                                            <p className="text-lg text-muted-foreground font-medium leading-[1.6] opacity-70 text-justify">
                                                Berpengalaman menggunakan Next.js, React, TypeScript, Laravel, PHP serta integrasi dengan teknologi backend seperti Lumen, Prisma, dan NextAuth. Kombinasi ini membantu saya menciptakan produk digital yang tidak hanya berfungsi baik, tetapi juga memiliki pengalaman pengguna yang menarik.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="glass-card p-6 rounded-3xl border-primary/5 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-10 bg-primary/40 rounded-full group-hover:h-12 transition-all duration-500" />
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-primary/50">Status_Update</p>
                                                <p className="text-sm font-bold uppercase transition-colors group-hover:text-primary">Berpikir kritis & Solusi Efisien</p>
                                            </div>
                                        </div>
                                        <Orbit className="w-6 h-6 text-primary/30 group-hover:rotate-180 transition-transform duration-1000" />
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
