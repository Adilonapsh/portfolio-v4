"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import Image from "next/image"
import { ScrollReveal } from "./scroll-reveal"
import { useLoading } from "@/app/components/loading-context"
import { useRef } from "react"

const frontendSkills = [
    "TypeScript", "React", "Next.js", "Tailwind CSS",
    "Framer Motion", "UI Design", "Responsive Layouts"
]

const backendSkills = [
    "Laravel", "PHP", "Node.js", "PostgreSQL", "Prisma", "API Development"
]

export default function About() {
    const { isLoaded } = useLoading();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const photoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
    const rawHoverProgress = useTransform(scrollYProgress, [0.35, 0.4], [0, 1]);
    const hoverValue = useMotionValue(0);
    const combinedProgress = useTransform(
        [rawHoverProgress, hoverValue],
        ([s, h]) => Math.max(s, h)
    );
    const springHoverProgress = useSpring(combinedProgress, { stiffness: 100, damping: 25 });

    const gradientOpacity = useTransform(
        [springHoverProgress],
        ([h]) => h
    );
    const overlayOpacity = useTransform(
        [springHoverProgress],
        ([h]) => h * 0.8
    );
    const lightPhotoOpacity = useTransform(
        [springHoverProgress],
        ([h]) => h
    );

    return (
        <section id="about" ref={containerRef} className="py-32 relative overflow-hidden bg-background font-sans">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-0 coord-grid opacity-50 pointer-events-none" />

            {/* Background Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-outline text-[30vw] font-black uppercase whitespace-nowrap"
                >
                    ABOUT
                </motion.h2>
            </div>

            <div className="container px-6 md:px-12 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <ScrollReveal direction="right">
                        <motion.div 
                            style={{ opacity: photoOpacity }}
                            className="relative group"
                            onMouseEnter={() => hoverValue.set(1)}
                            onMouseLeave={() => hoverValue.set(0)}>

                            <div className="absolute -inset-4 border border-primary/10 rounded-[2.5rem] pointer-events-none" />
                            <motion.div 
                                style={{ opacity: gradientOpacity }}
                                className="absolute -inset-1 bg-gradient-to-tr from-primary/20 to-transparent rounded-[2rem] blur-xl" 
                            />

                            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border/50 bg-card/50 backdrop-blur-sm">

                                <div className="absolute inset-0 z-0 dark:hidden">
                                    <Image
                                        src="/images/landing/background.png"
                                        alt="Background"
                                        fill
                                        className="object-cover brightness-50"
                                    />
                                </div>

                                {/* Orbital Rings */}
                                <div className="absolute inset-0 z-[5] flex items-center justify-center pointer-events-none overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                                        style={{ willChange: 'transform' }}
                                        className="absolute w-[120%] h-[120%] border border-background/5 rounded-full"
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                                        style={{ willChange: 'transform' }}
                                        className="absolute w-[80%] h-[80%] border border-background/10 rounded-full"
                                    />
                                </div>

                                <motion.div 
                                    style={{ opacity: overlayOpacity }}
                                    className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent z-[10]" 
                                />

                                <div className="absolute inset-0 z-[20]">
                                    <Image
                                        src="/images/landing/me_dark.png"
                                        alt="Adil Ivansyah - Dark"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>

                                <motion.div
                                    style={{ opacity: lightPhotoOpacity }}
                                    className="absolute inset-0 z-[30]"
                                    transition={{ duration: 0.5 }}
                                >
                                    <Image
                                        src="/images/landing/me_light.png"
                                        alt="Adil Ivansyah - Light"
                                        fill
                                        priority
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="absolute -bottom-6 -right-6 glass-card px-6 py-4 rounded-2xl border border-primary/20 shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none">Ready for Projects</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </ScrollReveal>

                    <div className="space-y-12">
                        <div className="space-y-6">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="h-px w-12 bg-primary/30" />
                                    <span className="section-label">Ringkasan</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-none uppercase">
                                    About
                                </h2>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2}>
                                <div className="space-y-4">
                                    <p className="text-muted-foreground text-xl leading-relaxed text-justify lg:text-left font-medium opacity-100 brightness-110">
                                        Saya adalah <span className="text-foreground font-bold">Fullstack Developer & UI/UX Specialist</span> dengan keahlian mendalam dalam membangun infrastruktur web yang scalable dan antarmuka yang high-end. Berfokus pada ekosistem <span className="text-primary font-bold">Next.js</span> dan <span className="text-primary font-bold">Laravel</span>.
                                    </p>
                                    <p className="text-muted-foreground text-lg leading-relaxed text-justify lg:text-left opacity-80 brightness-110">
                                        Misi saya sederhana: mengonversi ide kompleks menjadi produk digital yang efisien, performant, dan memiliki standar estetika industri tertinggi. Saya percaya bahwa kode yang bersih dan dokumentasi yang baik adalah fondasi dari setiap proyek yang sukses.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <ScrollReveal direction="up" delay={0.4}>
                                <div className="glass-card p-8 rounded-3xl space-y-3">
                                    <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Education</div>
                                    <h3 className="font-black text-xl tracking-tight uppercase">Teknik Komputer</h3>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Diploma Degree (D3)</p>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.5}>
                                <div className="glass-card p-8 rounded-3xl space-y-3">
                                    <div className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Base_Ops</div>
                                    <h3 className="font-black text-xl tracking-tight uppercase">Bogor, ID</h3>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Available for Global Remote</p>
                                </div>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal direction="up" delay={0.6}>
                            <div className="grid sm:grid-cols-2 gap-12">
                                {/* Frontend Stack */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="section-label">Frontend Stack</span>
                                        <div className="h-px flex-1 bg-primary/10" />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {frontendSkills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                className="px-5 py-2 rounded-full glass-card text-[11px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary hover:border-primary/30 transition-all cursor-default"
                                            >
                                                {skill}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Backend Stack */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <span className="section-label">Backend Stack</span>
                                        <div className="h-px flex-1 bg-primary/10" />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {backendSkills.map((skill, i) => (
                                            <motion.div
                                                key={skill}
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                className="px-5 py-2 rounded-full glass-card text-[11px] font-black uppercase tracking-widest text-foreground/70 hover:text-primary hover:border-primary/30 transition-all cursor-default"
                                            >
                                                {skill}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section >
    )
}
