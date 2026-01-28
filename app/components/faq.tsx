"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal } from "./scroll-reveal"
import { motion } from "framer-motion"
import { useLoading } from "@/app/components/loading-context"

const faqData = [
    {
        question: "Kenapa saya harus merekrut Anda dibanding kandidat lain?",
        answer: "Saya tidak hanya menulis kode, tapi membangun solusi yang scalable dan berorientasi pada hasil bisnis. Dengan kombinasi skill Fullstack (Next.js/Laravel) dan mata untuk UI/UX premium, saya memastikan produk memiliki performa teknis yang solid sekaligus user experience yang memanjakan pengguna."
    },
    {
        question: "Bagaimana workflow kerja Anda dalam sebuah tim?",
        answer: "Saya terbiasa dengan metodologi Agile/Scrum. Komunikasi transparan, dokumentasi kode yang bersih, serta penggunaan Git (Github/Gitlab) untuk kolaborasi adalah standar minimal saya. Saya percaya bahwa kesuksesan proyek berawal dari sinkronisasi visi tim yang kuat."
    },
    {
        question: "Sejauh mana penguasaan Tech-Stack Anda?",
        answer: "Saya sangat kuat di ekosistem JavaScript/TypeScript (React, Next.js, Node.js) dan PHP (Laravel). Saya juga memahami manajemen database (PostgreSQL/MySQL) serta optimasi performa frontend menggunakan Framer Motion untuk animasi yang fluid namun tetap ringan."
    },
    {
        question: "Bagaimana Anda menangani deadline ketat atau bug kritis?",
        answer: "Prioritas adalah kunci. Saya menggunakan teknik triase untuk menangani bug paling kritikal terlebih dahulu tanpa mengorbankan kualitas jangka panjang. Untuk deadline, saya berfokus pada MVP (Minimum Viable Product) yang fungsional sebelum melakukan iterasi pada fitur secondary."
    },
    {
        question: "Apakah Anda tersedia untuk Full-time atau Remote?",
        answer: "Ya, saya terbuka untuk kesempatan kerja Full-time, baik secara Remote maupun Hybrid. Saya memiliki setup kerja profesional yang memastikan produktivitas maksimal meskipun bekerja dari jarak jauh."
    },
    {
        question: "Apa kontribusi nyata Anda dalam proyek sebelumnya?",
        answer: "Di setiap proyek, saya selalu fokus pada peningkatan efisiensi. Baik itu melalui optimalisasi query database, peningkatan kecepatan load page (LCP/FID), atau sekadar merancang UI yang mengurangi friction pengguna saat melakukan transaksi/konversi."
    }
]

export default function FAQ() {
    const { isLoaded } = useLoading();
    return (
        <section id="faq" className="py-32 relative overflow-hidden bg-background">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            <div className="absolute inset-0 coord-grid opacity-30 pointer-events-none" />

            {/* Background Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.9 }}
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

                            {/* <div className="relative p-10 rounded-[2.5rem] glass-card border-primary/5 overflow-hidden group/support">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover/support:opacity-100 transition-opacity duration-700" />

                                    <div className="relative flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                                                <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                                                <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-pulse" />
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-background rounded-full flex items-center justify-center border border-primary/10">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Ready_To_Assist</p>
                                            <h3 className="text-xl font-bold tracking-tight text-foreground uppercase italic underline decoration-primary/30 underline-offset-4 decoration-2">Selalu Siap Membantu</h3>
                                            <p className="text-xs text-muted-foreground font-medium">Respon dalam hitungan jam, bukan hari.</p>
                                        </div>
                                    </div>
                                </div> */}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.2}>
                        <div className="glass-card p-4 md:p-8 rounded-[2.5rem] border-primary/5 shadow-2xl overflow-hidden">
                            <Accordion type="single" collapsible className="w-full">
                                {faqData.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-primary/5 last:border-none">
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
                    </ScrollReveal>
                </div>
            </div>
        </section >
    )
}
