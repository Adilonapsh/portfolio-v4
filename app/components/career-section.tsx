"use client";

import { ScrollReveal } from "./scroll-reveal";
import { fetchCareers } from "@/lib/api";
import { Career as CareerType } from "@/lib/types";
import { useState, useEffect } from "react";

export default function CareerSection() {
    const [careers, setCareers] = useState<CareerType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fallbackCareers: CareerType[] = [
        {
            id: "1",
            position: "Fullstack Developer",
            company: "Perusahaan Contoh",
            location: "Jakarta, ID",
            start_date: "2023-01-01",
            end_date: null,
            is_current: true,
            description: "Membangun aplikasi web dengan Next.js dan Laravel.",
            skills: ["Next.js", "Laravel", "PostgreSQL"],
            order: 0
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

    const displayCareers = careers.length > 0 ? careers : fallbackCareers;

    if (isLoading) {
        return (
            <section className="py-20 relative bg-background">
                <div className="container px-6 md:px-12 mx-auto">
                    <ScrollReveal direction="up">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px w-12 bg-primary/30" />
                            <span className="section-label">Jejak_Karir</span>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-6">
                        {[1].map((i) => (
                            <div key={i} className="glass-card p-6 md:p-8 rounded-2xl border border-primary/10">
                                <div className="space-y-6 animate-pulse">
                                    <div className="h-8 bg-primary/10 rounded w-3/4" />
                                    <div className="h-4 bg-primary/10 rounded w-1/2" />
                                    <div className="h-4 bg-primary/10 rounded w-full" />
                                    <div className="h-4 bg-primary/10 rounded w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 relative bg-background">
            <div className="container px-6 md:px-12 mx-auto">
                <ScrollReveal direction="up">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px w-12 bg-primary/30" />
                        <span className="section-label">Jejak_Karir</span>
                    </div>
                </ScrollReveal>

                <div className="space-y-6">
                    {displayCareers.map((career, index) => (
                        <ScrollReveal key={career.id || index} direction="up" delay={index * 0.1}>
                            <div className="glass-card p-6 md:p-8 rounded-2xl border border-primary/10">
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">
                                            {career.position}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground font-medium">
                                            <span>{career.company}</span>
                                            {career.location && <span>• {career.location}</span>}
                                            <span>• {new Date(career.start_date).getFullYear()}</span>
                                            {career.is_current ? (
                                                <span className="text-emerald-500 font-bold">• Saat Ini</span>
                                            ) : career.end_date ? (
                                                <span>• {new Date(career.end_date).getFullYear()}</span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                {career.description && (
                                    <p className="mt-4 text-muted-foreground text-base leading-relaxed">
                                        {career.description}
                                    </p>
                                )}

                                {career.skills && career.skills.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {career.skills.map((skill, i) => (
                                            <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
