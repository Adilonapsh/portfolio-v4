"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, Send, Radio, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import { useLoading } from "@/app/components/loading-context"
import { useState } from "react"

export default function Contact() {
    const { isLoaded } = useLoading();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus("loading");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else if (response.status === 429) {
                setStatus("error");
                // Optional: You could add a specific message state here if you wanted to be more descriptive
                console.warn("Rate limit exceeded");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="py-32 relative overflow-hidden bg-background font-sans">
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
                    CONTACT
                </motion.h2>
            </div>

            <div className="container px-6 md:px-12 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-20">
                    <ScrollReveal direction="right">
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="h-px w-12 bg-primary/30" />
                                    <span className="section-label">Jalin_Koneksi</span>
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter uppercase text-foreground">
                                    MARI <br /> <span className="text-primary italic">BERDISKUSI</span>
                                </h2>
                                <p className="text-muted-foreground text-xl leading-relaxed max-w-md font-medium opacity-80">
                                    Mari diskusikan proyek impian Anda. Kirim pesan melalui formulir di samping dan saya akan segera menghubungi Anda.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="h-16 w-16 rounded-[1.5rem] glass-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1 text-foreground">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Email_Saya</p>
                                        <a href="mailto:hire@truenapsh.my.id" className="text-xl font-bold tracking-tight hover:text-primary transition-colors">hire@truenapsh.my.id</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="h-16 w-16 rounded-[1.5rem] glass-card flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                        <Radio className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1 text-foreground">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Sosial_Media</p>
                                        <p className="text-xl font-bold tracking-tight">@adilonapsh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" delay={0.2}>
                        <form onSubmit={handleSubmit} className="glass-card p-2 rounded-[3.5rem] border-primary/10 shadow-3xl">
                            <div className="bg-card/50 backdrop-blur-xl rounded-[3rem] p-10 space-y-8">
                                <div className="grid sm:grid-cols-2 gap-8 text-foreground">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Nama_Lengkap</label>
                                        <Input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="SIAPA NAMA ANDA?"
                                            required
                                            className="h-16 bg-white/5 border-none rounded-2xl px-6 font-bold placeholder:text-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-primary/30"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Alamat_Email</label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="EMAIL@SYSTEM.COM"
                                            required
                                            className="h-16 bg-white/5 border-none rounded-2xl px-6 font-bold placeholder:text-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-primary/30"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3 text-foreground">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Pesan_Anda</label>
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="TULIS PESAN ANDA DI SINI..."
                                        required
                                        className="min-h-[160px] bg-white/5 border-none rounded-3xl p-6 font-bold placeholder:text-muted-foreground/30 focus-visible:ring-1 focus-visible:ring-primary/30 resize-none"
                                    />
                                </div>
                                <Button
                                    disabled={status === "loading" || status === "success"}
                                    className={`w-full h-20 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.4em] gap-4 transition-all shadow-2xl ${status === "success" ? "bg-emerald-500 hover:bg-emerald-600" :
                                        status === "error" ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:scale-[1.02]"
                                        } text-primary-foreground shadow-primary/20`}
                                >
                                    {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> :
                                        status === "success" ? <CheckCircle2 className="h-5 w-5" /> :
                                            status === "error" ? <AlertCircle className="h-5 w-5" /> :
                                                <Send className="h-5 w-5" />}

                                    {status === "loading" ? "Mengirim..." :
                                        status === "success" ? "Berhasil_Terkirim" :
                                            status === "error" ? "Gagal_Mengirim" : "Kirim_Pesan"}
                                </Button>
                            </div>
                        </form>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
