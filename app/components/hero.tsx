"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/app/components/loading-context";

const Hero: React.FC = () => {
    const { isLoaded } = useLoading();
    const [statuses, setStatuses] = useState([
        { id: 0, text: "System Booting //" }
    ]);

    useEffect(() => {
        if (!isLoaded) return;

        const messages = [
            "Syncing Data...",
            "Checking Integrity",
            "LATENCY_CHECK",
            "Buffer_Linked",
            "Data_Stream_Active",
            "Security_Verified"
        ];
        let counter = 1;
        const cachedLatency = { current: null as number | null };

        const getRealLatency = async () => {
            if (cachedLatency.current !== null) return cachedLatency.current;

            const start = performance.now();
            try {
                await fetch(window.location.origin + "/favicon.ico", {
                    method: 'HEAD',
                    cache: 'no-store',
                    mode: 'no-cors'
                });
                cachedLatency.current = Math.round(performance.now() - start);
            } catch {
                cachedLatency.current = Math.round(performance.now() - start);
            }
            return cachedLatency.current;
        };

        const interval = setInterval(async () => {
            let nextMsg = messages[Math.floor(Math.random() * messages.length)];

            if (nextMsg === "LATENCY_CHECK") {
                const lat = await getRealLatency();
                nextMsg = `Latency: ${lat}ms`;
            }

            setStatuses(prev => {
                const newStatus = { id: counter++, text: nextMsg };
                return [newStatus, ...prev].slice(0, 3);
            });
        }, 5000);

        const handleInteraction = (type: string, target: string) => {
            const cleanTarget = target.trim().slice(0, 20) || "Unknown";
            setStatuses(prev => {
                const newStatus = { id: counter++, text: `${type}_Event: ${cleanTarget}` };
                return [newStatus, ...prev].slice(0, 3);
            });
        };

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            handleInteraction("Click", target.innerText || target.tagName);
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
                const text = target.innerText || target.getAttribute('aria-label') || "Interactive_Element";
                handleInteraction("Hover", text);
            }
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('mouseover', handleHover);

        return () => {
            clearInterval(interval);
            window.removeEventListener('click', handleClick);
            window.removeEventListener('mouseover', handleHover);
        };
    }, [isLoaded]);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden relative bg-background">
            <div className="absolute inset-0 coord-grid pointer-events-none z-0" />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isLoaded ? { opacity: 0.07, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-outline text-[25vw] font-black uppercase whitespace-nowrap"
                >
                    PORTFOLIO
                </motion.h2>
            </div>

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] border border-primary/10 rounded-full pointer-events-none opacity-40"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full blur-sm" />
            </motion.div>

            <div className="relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-[8vw] font-extrabold tracking-tighter leading-[0.85] text-foreground uppercase"
                >
                    DIGITAL <br /> <span className="text-primary italic">ALCHEMIST</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 flex flex-col md:flex-row items-center justify-center gap-12"
                >
                    <div className="text-center md:text-left group">
                        <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-1 group-hover:opacity-60 transition-opacity">Email</div>
                        <a href="mailto:hire@truenapsh.my.id" className="font-mono text-sm hover:text-primary transition-colors">
                            hire@truenapsh.my.id
                        </a>
                    </div>

                    <div className="w-px h-10 bg-foreground/10 hidden md:block" />

                    <div className="text-center md:text-right group">
                        <div className="text-[10px] font-bold opacity-30 uppercase tracking-widest mb-1 group-hover:opacity-60 transition-opacity">Dibuat Oleh</div>
                        <div className="font-bold text-sm tracking-tighter uppercase">Adil Ivansyah</div>
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-10 right-10 hidden md:block text-right"
            >
                <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest mb-1">Lokasi</div>
                <div className="text-xs font-medium tracking-tight">BOGOR, INDONESIA</div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute bottom-10 left-10 flex items-start gap-4 text-left w-64 h-16 pointer-events-none select-none z-50"
            >
                <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-2.5 h-2.5 bg-emerald-500 mt-[1px] shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
                <div className="flex flex-col relative w-full h-full overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {isLoaded && statuses.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20, clipPath: 'inset(0 100% 0 0)' }}
                                animate={{
                                    opacity: 1 - index * 0.4,
                                    x: 0,
                                    y: index * 16,
                                    clipPath: 'inset(0 0% 0 0)',
                                    transition: {
                                        layout: { duration: 0.5, ease: "easeOut" }
                                    }
                                }}
                                exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                                className="text-[10px] font-bold uppercase tracking-widest text-foreground absolute top-0 left-0 whitespace-nowrap"
                            >
                                {item.text}
                                {index === 0 && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="ml-1 text-emerald-500 font-black">_</motion.span>}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
