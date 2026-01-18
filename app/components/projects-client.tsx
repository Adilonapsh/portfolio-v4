"use client"

import { Badge } from "@/components/ui/badge"
import { Project } from "@/app/server/project"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { motion, Variants } from "framer-motion"

export default function ProjectsClient({ projects }: { projects: Project[] }) {
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <section className="w-full max-w-7xl mx-auto bg-[#0a0c10] rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden shadow-2xl my-24">
            <div className="flex flex-col items-center text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6"
                >
                    <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">Recent Work</Badge>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="max-w-3xl text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase"
                >
                    Take a look at the latest projects I&apos;ve done
                </motion.h2>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid md:grid-cols-2 gap-8"
            >
                {projects.map((project, index) => (
                    <motion.div key={index} variants={item}>
                        <Link
                            href={`/projects/${project.slug}`}
                            className="group relative block rounded-3xl overflow-hidden bg-[#202020] aspect-4/3 cursor-pointer ring-1 ring-white/10 hover:ring-primary/50 transition-all"
                        >
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                                        {project.services || "Project"}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-bold mb-1 text-white">{project.name}</h3>
                                <p className="text-gray-400 font-medium line-clamp-2">
                                    {project.short_desc}
                                </p>
                            </div>

                            {/* Hover Arrow */}
                            <div className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 shadow-lg">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>

                            {/* Background Image */}
                            <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700">
                                {project.thumbnail ? (
                                    <Image
                                        src={project.thumbnail}
                                        alt={project.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                        <span className="text-6xl text-gray-700 font-bold opacity-20">{project.name[0]}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
