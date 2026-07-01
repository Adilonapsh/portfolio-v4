"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal } from "./scroll-reveal"
import { motion } from "framer-motion"
import { fetchFaqs } from "@/lib/api"
import { Faq as FaqType } from "@/lib/types"
import { useState, useEffect } from "react"

function FAQComponent() {
    const [faqs, setFaqs] = useState<FaqType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fallbackFaqs = [
        {
            id: "1",
            question: "Kenapa saya harus merekrut Anda dibanding kandidat lain?",
            answer: "Saya tidak hanya menulis kode, tapi membangun solusi yang scalable dan berorientasi pada hasil bisnis.",
            order: 0
        },
        {
            id: "2",
            question: "Bagaimana workflow kerja Anda dalam sebuah tim?",
            answer: "Saya terbiasa dengan metodologi Agile/Scrum dan komunikasi transparan.",
            order: 1
        }
    ];

    useEffect(() => {
        async function loadFaqs() {
            try {
                const fetchedFaqs = await fetchFaqs();
                setFaqs(fetchedFaqs);
            } catch (e) {
                console.error("Failed to fetch FAQs", e);
            } finally {
                setIsLoading(false);
            }
        }
        loadFaqs();
    }, []);

    const displayFaqs = faqs.length > 0 ? faqs : fallbackFaqs;

    if (isLoading) {
        return (
            <div className="glass-card p-4 md:p-8 rounded-[2.5rem] border-primary/5 shadow-2xl overflow-hidden">
                <div className="w-full py-8 px-4">
                    <div className="animate-pulse space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-6 bg-primary/10 rounded w-3/4"></div>
                                <div className="h-4 bg-primary/10 rounded w-full"></div>
                                <div className="h-4 bg-primary/10 rounded w-5/6"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card p-4 md:p-8 rounded-[2.5rem] border-primary/5 shadow-2xl overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
                {displayFaqs.map((item, index) => (
                    <AccordionItem key={item.id || index} value={`item-${index}`} className="border-b border-primary/5 last:border-none">
                        <AccordionTrigger className="text-left hover:no-underline hover:text-primary py-8 px-4 text-lg font-black uppercase tracking-tight transition-colors">
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed px-4 pb-8 font-medium">
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}

export default function FAQ() {
    return (
        <section id="faq" className="py-32 relative overflow-hidden bg-background">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-0 coord-grid opacity-30 pointer-events-none" />

            {/* Background Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-outline text-[30vw] font-black uppercase whitespace-nowrap"
                >
                    FAQ
                </motion.h2>
            </div>

            <div className="container px-6 md:px-12 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    <ScrollReveal direction="right">
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="h-px w-12 bg-primary/30" />
                                <span className="section-label">Informasi_Umum</span>
                            </div>

                            <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase">
                                Punya <br /> <span className="text-primary italic">Pertanyaan?</span>
                            </h2>

                            <p className="text-muted-foreground text-xl leading-relaxed max-w-md font-medium opacity-80">
                                Temukan jawaban dari pertanyaan yang sering diajukan untuk membantu Anda memahami layanan saya dengan lebih baik.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.2}>
                        <FAQComponent />
                    </ScrollReveal>
                </div>
            </div>
        </section >
    )
}
