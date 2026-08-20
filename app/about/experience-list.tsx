"use client";

import { ScrollReveal } from "@/app/components/scroll-reveal";
import { Calendar } from 'lucide-react';
import { fetchCareers } from "@/lib/api";
import { Career as CareerType } from "@/lib/types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ExperienceList() {
    const [careers, setCareers] = useState<CareerType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fallbackExperiences: CareerType[] = [
        {
            id: "1",
            position: "Fullstack Developer",
            company: "PT. Real Media Lab",
            start_date: "2020-01-01",
            end_date: null,
            is_current: true,
            description: "Pengalaman yang menarik disini, saat disini saya mulai fokus dalam hal Fullstack Developer, di perusahaan ini saya juga mengerjakan webapp untuk berbagai klien.",
            skills: [],
            order: 0
        },
        {
            id: "2",
            position: "Fullstack Developer",
            company: "Truenapsh",
            start_date: "2024-01-01",
            end_date: null,
            is_current: true,
            description: "Memimpin seluruh proses pengembangan webapp.",
            skills: [],
            order: 1
        }
    ];

    useEffect(() => {
        async function loadCareers() {
            try {
                const fetchedCareers = await fetchCareers();
                setCareers(fetchedCareers);
            } catch (e) {
                console.error("Failed to fetch careers", e);
            } finally {
                setIsLoading(false);
            }
        }
        loadCareers();
    }, []);
    const displayExperiences = careers.length > 0 ? careers : fallbackExperiences;

    if (isLoading) {
        return (
            <div className="space-y-12">
                {[1, 2].map((i) => (
                    <div key={i} className="glass-card p-10 lg:p-12 rounded-[2.5rem] border-primary/5">
                        <div className="space-y-6 animate-pulse">
                            <div className="h-8 bg-primary/10 rounded w-3/4" />
                            <div className="h-4 bg-primary/10 rounded w-1/2" />
                            <div className="h-4 bg-primary/10 rounded w-full" />
                            <div className="h-4 bg-primary/10 rounded w-full" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-12">
            {displayExperiences.map((exp, index) => (
                <ScrollReveal key={exp.id || index} direction="up" delay={index * 0.2}>
                    <motion.div 
                        className="glass-card p-10 lg:p-12 rounded-[2.5rem] border-primary/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden"
                        whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(var(--primary-rgb), 0.25)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <motion.div 
                            className="absolute top-0 right-0 p-8 text-primary/10 group-hover:text-primary/20 transition-colors"
                            animate={{ rotate: [0, 5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Calendar className="w-16 h-16" />
                        </motion.div>

                        <div className="relative z-10 space-y-6">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <motion.h3 
                                        className="text-3xl font-black uppercase tracking-tight group-hover:text-primary transition-colors italic leading-none"
                                        whileHover={{ x: 4 }}
                                    >
                                        {exp.position}
                                    </motion.h3>
                                    <p className="text-xs font-black uppercase tracking-[0.3em] text-primary/50">{exp.company}</p>
                                </div>
                                <motion.div 
                                    className="px-6 py-2 bg-primary text-[10px] font-black rounded-full text-primary-foreground uppercase tracking-widest shadow-xl shadow-primary/20"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {new Date(exp.start_date).getFullYear()}
                                    {exp.is_current ? " - Sekarang" : (exp.end_date ? ` - ${new Date(exp.end_date).getFullYear()}` : "")}
                                </motion.div>
                            </div>

                            <div className="h-px w-full bg-primary/10" />

                            <p className="text-lg text-muted-foreground font-medium leading-relaxed opacity-80">
                                {exp.description}
                            </p>

                            {exp.skills && exp.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                    {exp.skills.map((skill, i) => (
                                        <motion.span 
                                            key={i} 
                                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider"
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </ScrollReveal>
            ))}
        </div>
    );
}
