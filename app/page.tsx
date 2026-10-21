import About from "./components/about";
import Contact from "./components/contact";
import CTASection from "./components/cta-section";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import Projects from "./components/projects";

// Landing page sebelumnya ikut ISR 60 detik karena fetch project di
// app/server/project.ts. 24 jam = 1 ISR write/hari (bukan 1.440/hari).
// Harus sama dengan PROJECT_CACHE_TTL_SECONDS di lib/cache.ts.
export const revalidate = 86_400;

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="w-full">
                <Hero />
                <About />
                <Projects />
                <FAQ />
                <Contact />
                <CTASection />
            </main>
        </div>
    );
}
