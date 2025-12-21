"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"

const skills = [
    "TypeScript", "React", "Next.js", "Tailwind CSS",
    "Node.js", "PostgreSQL", "Prisma", "Framer Motion",
    "UI Design", "Responsive Layouts", "API Development"
]

export default function About() {
    return (
        <section id="about" className="py-24 bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <ScrollReveal direction="right">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative aspect-square overflow-hidden rounded-2xl border bg-background flex items-center justify-center">
                                {/* In a real project, use an Image component here */}
                                <div className="text-8xl font-black text-muted/30 select-none">PICTURE</div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-8">
                        <ScrollReveal direction="left" delay={0.2}>
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tight">SIAPA SAYA?</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed text-justify lg:text-left">
                                    Saya adalah seorang pengembang perangkat lunak yang bersemangat dengan fokus pada menciptakan pengalaman pengguna yang berkesan. Dengan latar belakang dalam desain dan pengembangan, saya menjembatani kesenjangan antara estetika dan fungsionalitas.
                                </p>
                            </div>
                        </ScrollReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ScrollReveal direction="up" delay={0.4}>
                                <Card className="bg-background/50 backdrop-blur-sm border-none shadow-none">
                                    <CardContent className="p-4 space-y-2">
                                        <h3 className="font-bold text-lg">Pendidikan</h3>
                                        <p className="text-sm text-muted-foreground font-medium">Teknik Komputer (D3)</p>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.5}>
                                <Card className="bg-background/50 backdrop-blur-sm border-none shadow-none">
                                    <CardContent className="p-4 space-y-2">
                                        <h3 className="font-bold text-lg">Lokasi</h3>
                                        <p className="text-sm text-muted-foreground font-medium">Bogor, Indonesia<br />Tersedia untuk remote</p>
                                    </CardContent>
                                </Card>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal direction="up" delay={0.6} staggerChildren={0.05}>
                            <div className="space-y-4">
                                <h3 className="font-bold text-xl uppercase tracking-wider">Teknologi & Produk</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <motion.div
                                            key={skill}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.8 },
                                                visible: { opacity: 1, scale: 1 }
                                            }}
                                        >
                                            <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                                                {skill}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
