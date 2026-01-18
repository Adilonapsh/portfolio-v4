import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { ScrollReveal } from "./scroll-reveal"

export default function CTASection() {
    return (
        <div className="bg-[#0a0c10] py-24 px-4 text-center border-t border-gray-800 overflow-hidden">
            <ScrollReveal direction="up" distance={30}>
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Siap untuk bangun project <span className="text-[#54d912]">Anda</span> ketingkat yang berbeda?
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl font-medium">
                        Mulai kolaborasi dengan truenapsh saya hari ini dan mari diskusikan bagaimana truenapsh dapat membantu Anda mencapai tujuan Anda.
                    </p>
                    <Button asChild size="lg" className="rounded-xl px-8 h-14 bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 gap-2 text-lg">
                        <a href="mailto:hire@truenapsh.my.id">
                            Hubungi Truenapsh <ArrowUpRight className="h-5 w-5" />
                        </a>
                    </Button>
                </div>
            </ScrollReveal>
        </div>
    )
}
