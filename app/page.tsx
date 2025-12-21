import About from "./components/about";
import Contact from "./components/contact";
import CTASection from "./components/cta-section";
import FAQ from "./components/faq";
import Hero from "./components/hero";
import Projects from "./components/projects";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="w-fullmx-auto">
                <Hero />
                <div className="container mx-auto">
                    <About />
                    <Projects />
                </div>
                <FAQ />
                <Contact />
                <CTASection />
            </main>
        </div>
    );
}
