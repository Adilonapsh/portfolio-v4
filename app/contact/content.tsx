"use client";

import { useLoading } from "@/app/components/loading-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Download, Loader2, Mail, Radio, SendHorizontal } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "@/app/components/scroll-reveal";

export default function ContactContent() {
    const { isLoaded } = useLoading();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [focusedField, setFocusedField] = useState<string | null>(null);

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
        <>
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-6 overflow-hidden">
                <div className="absolute inset-0 coord-grid opacity-30 pointer-events-none z-0" />
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isLoaded ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="text-outline text-[30vw] font-black uppercase whitespace-nowrap"
                    >
                        CONTACT
                    </motion.h2>
                </div>

                <div className="container mx-auto relative z-10">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-12">
                            <ScrollReveal direction="right">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="h-px w-12 bg-primary/30" />
                                        <span className="section-label italic">Jalin_Koneksi</span>
                                    </div>
                                    <h1 className="text-7xl md:text-[10vw] font-black leading-[0.75] tracking-tighter uppercase">
                                        MARI <br />
                                        <span className="text-primary italic">BERDISKUSI</span>
                                    </h1>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-32 relative overflow-hidden bg-background font-sans">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute inset-0 coord-grid opacity-30 pointer-events-none" />

                <div className="container px-6 md:px-12 mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <ScrollReveal direction="right">
                            <div className="space-y-12">
                                <p className="text-muted-foreground text-xl leading-relaxed max-w-md font-medium opacity-80">
                                    Mari diskusikan proyek impian Anda. Kirim pesan melalui formulir di samping dan saya akan segera menghubungi Anda.
                                </p>

                                <div className="space-y-8">
                                    <motion.div 
                                        className="flex items-center gap-6 group"
                                        whileHover={{ x: 8 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <motion.div 
                                            className="h-16 w-16 rounded-[1.5rem] glass-card flex items-center justify-center text-primary"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Mail className="h-6 w-6" />
                                        </motion.div>
                                        <div className="space-y-1 text-foreground">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Email_Saya</p>
                                            <a href="mailto:hire@truenapsh.my.id" className="text-xl font-bold tracking-tight hover:text-primary transition-colors relative group/link">
                                                hire@truenapsh.my.id
                                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover/link:w-full transition-all duration-300" />
                                            </a>
                                        </div>
                                    </motion.div>

                                    <motion.div 
                                        className="flex items-center gap-6 group"
                                        whileHover={{ x: 8 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <motion.div 
                                            className="h-16 w-16 rounded-[1.5rem] glass-card flex items-center justify-center text-primary"
                                            whileHover={{ scale: 1.1, rotate: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Radio className="h-6 w-6" />
                                        </motion.div>
                                        <div className="space-y-1 text-foreground">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Sosial_Media</p>
                                            <p className="text-xl font-bold tracking-tight">@adilonapsh</p>
                                        </div>
                                    </motion.div>

                                    <motion.a
                                        href="/CV%20ADIL%20IVANSYAH%20LUBIS.pdf"
                                        download
                                        className="flex items-center gap-6 group"
                                        whileHover={{ x: 8 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    >
                                        <motion.div 
                                            className="h-16 w-16 rounded-[1.5rem] glass-card flex items-center justify-center text-primary"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Download className="h-6 w-6" />
                                        </motion.div>
                                        <div className="space-y-1 text-foreground">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">Download_CV</p>
                                            <p className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">Unduh CV Saya</p>
                                        </div>
                                    </motion.a>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal direction="left" delay={0.2}>
                            <motion.form 
                                onSubmit={handleSubmit} 
                                className="glass-card p-2 rounded-[3.5rem] border-primary/10 shadow-3xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(var(--primary-rgb), 0.25)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="bg-card/50 backdrop-blur-xl rounded-[3rem] p-10 space-y-8">
                                    <div className="grid sm:grid-cols-2 gap-8 text-foreground">
                                        <div className="space-y-3 relative">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Nama_Lengkap</label>
                                            <motion.div
                                                animate={{ scale: focusedField === "name" ? 1.02 : 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                            >
                                                <Input
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    onFocus={() => setFocusedField("name")}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="SIAPA NAMA ANDA?"
                                                    required
                                                    className="h-16 bg-white/5 border-none rounded-2xl px-6 font-bold placeholder:text-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300"
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                                                initial={{ width: "0%" }}
                                                animate={{ width: focusedField === "name" ? "100%" : "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                        <div className="space-y-3 relative">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Alamat_Email</label>
                                            <motion.div
                                                animate={{ scale: focusedField === "email" ? 1.02 : 1 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                            >
                                                <Input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    onFocus={() => setFocusedField("email")}
                                                    onBlur={() => setFocusedField(null)}
                                                    placeholder="EMAIL@GMAIL.COM"
                                                    required
                                                    className="h-16 bg-white/5 border-none rounded-2xl px-6 font-bold placeholder:text-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300"
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                                                initial={{ width: "0%" }}
                                                animate={{ width: focusedField === "email" ? "100%" : "0%" }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3 text-foreground relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">Pesan_Anda</label>
                                        <motion.div
                                            animate={{ scale: focusedField === "message" ? 1.01 : 1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            <Textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                onFocus={() => setFocusedField("message")}
                                                onBlur={() => setFocusedField(null)}
                                                placeholder="TULIS PESAN ANDA DI SINI..."
                                                required
                                                className="min-h-[160px] bg-white/5 border-none rounded-3xl p-6 font-bold placeholder:text-muted-foreground/30 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-300 resize-none"
                                            />
                                        </motion.div>
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-0.5 bg-primary rounded-full"
                                            initial={{ width: "0%" }}
                                            animate={{ width: focusedField === "message" ? "100%" : "0%" }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative group rounded-[1rem] overflow-hidden"
                                    >
                                        <Button
                                            disabled={status === "loading" || status === "success"}
                                            className={`relative w-full h-16 rounded-[1rem] bg-foreground/5 backdrop-blur-xl border border-foreground/10 group-hover:border-primary/30 text-sm font-bold uppercase tracking-[0.2em] gap-3 transition-all duration-500 ${status === "success" ? "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" :
                                                status === "error" ? "text-red-500 border-red-500/30 bg-red-500/10" : "text-foreground"
                                                } overflow-hidden hover:bg-foreground/[0.08] shadow-none`}
                                        >
                                            <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-primary/20 to-transparent pointer-events-none" />

                                            <div className="flex items-center justify-center gap-3 z-10">
                                                {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> :
                                                    status === "success" ? <CheckCircle2 className="h-4 w-4" /> :
                                                        status === "error" ? <AlertCircle className="h-4 w-4" /> :
                                                            <motion.div
                                                                animate={{ x: [0, 4, 0], y: [0, -4, 0] }}
                                                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                                            >
                                                                <SendHorizontal className="h-4 w-4" />
                                                            </motion.div>
                                                }

                                                <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {status === "loading" ? "Mengirim..." :
                                                        status === "success" ? "Berhasil Terkirim" :
                                                            status === "error" ? "Gagal Mengirim" : "Kirim Pesan"}
                                                </span>
                                            </div>
                                        </Button>
                                    </motion.div>
                                </div>
                            </motion.form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </>
    );
}