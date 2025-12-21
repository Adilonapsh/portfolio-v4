"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqData = [
    {
        question: "Apa itu Truenapsh?",
        answer: "Truenapsh adalah studio kreatif yang berfokus pada pengembangan solusi digital berkualitas tinggi."
    },
    {
        question: "Produk apa saja yang tersedia di Truenapsh?",
        answer: "Kami menyediakan berbagai layanan mulai dari desain UI/UX, pengembangan website modern, hingga pembuatan produk digital siap pakai."
    },
    {
        question: "Apakah saya bisa memesan jasa custom?",
        answer: "Ya, kami menerima pesanan jasa custom sesuai dengan kebutuhan spesifik proyek Anda."
    },
    {
        question: "Apakah Truenapsh menerima kerja sama atau proyek kolaborasi?",
        answer: "Kami sangat terbuka untuk peluang kerja sama dan kolaborasi proyek yang menarik."
    },
    {
        question: "Bagaimana cara mengajukan kerja sama?",
        answer: "Anda dapat menghubungi kami melalui formulir kontak di bawah atau melalui email resmi kami."
    },
    {
        question: "Apakah truenapsh melayani klien dari luar kota atau luar negeri?",
        answer: "Ya, kami melayani klien secara remote dari mana saja, baik di dalam maupun di luar negeri."
    },
    {
        question: "Bagaimana sistem pembayaran di Truenapsh?",
        answer: "Sistem pembayaran kami biasanya terbagi menjadi beberapa termin (DP dan pelunasan) untuk menjamin keamanan bersama."
    },
    {
        question: "Bagaimana cara membeli produk digital truenapsh?",
        answer: "Produk digital kami dapat dibeli langsung melalui platform resmi kami dengan proses yang instan."
    }
]

export default function FAQ() {
    return (
        <section id="faq" className="py-24 bg-[#0a0c10] text-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <span className="text-[#a3ff12] font-bold tracking-widest uppercase text-sm">
                            FAQ
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase">
                            Punya Pertanyaan?<br />
                            Berikut jawabannya
                        </h2>
                        <p className="text-gray-400 max-w-md leading-relaxed">
                            Berikut beberapa pertanyaan yang sering ditanyakan pelanggan, beserta jawabannya untuk membantu Anda lebih memahami layanan.
                        </p>
                    </div>

                    <div className="w-full">
                        <Accordion type="single" collapsible className="w-full border-t border-gray-800">
                            {faqData.map((item, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-800">
                                    <AccordionTrigger className="text-left hover:no-underline hover:text-[#a3ff12] py-6 font-semibold">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-gray-400 leading-relaxed">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
