"use client"

import { Badge } from "@/components/ui/badge"
import { Project } from "@/app/server/project"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Code2 } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useLoading } from "@/app/components/loading-context"

export default function ProjectsClient({ projects }: { projects: Project[] }) {
    const { isLoaded } = useLoading();
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
    }

    return (
        <section className="relative py-32 overflow-hidden bg-background">
            <div className="absolute inset-0 coord-grid opacity-30 pointer-events-none" />

            {/* Background Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-outline text-[30vw] font-black uppercase whitespace-nowrap"
                >
                    WORKS
                </motion.h2>
            </div>

            <div className="container px-6 md:px-12 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="h-px w-8 bg-primary/30" />
                        <span className="section-label">Pilihan_Karya</span>
                        <div className="h-px w-8 bg-primary/30" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="max-w-4xl text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-foreground"
                    >
                        CURATED <br /> <span className="text-primary italic">DIGITAL ARTIFACTS</span>
                    </motion.h2>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid md:grid-cols-2 gap-10 lg:gap-12"
                >
                    {projects.slice(0, 4).map((project, index) => (
                        <motion.div key={index} variants={item}>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group relative block rounded-3xl overflow-hidden bg-[#202020] aspect-[4/3] cursor-pointer ring-1 ring-white/10 hover:ring-primary/50 transition-all"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-lg text-[10px] font-bold text-white uppercase tracking-widest leading-none">
                                            {project.services || "Project"}
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-black mb-1 text-white uppercase tracking-tighter leading-none">{project.name}</h3>
                                    <p className="text-gray-400 text-sm font-medium line-clamp-2 max-w-sm">
                                        {project.short_desc}
                                    </p>
                                </div>

                                {/* Hover Arrow */}
                                <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>

                                {/* Background Image */}
                                <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                                    {project.thumbnail ? (
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                            <Code2 className="w-16 h-16 text-white/10" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
