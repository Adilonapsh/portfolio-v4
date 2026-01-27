"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/app/components/loading-context";
import { Sparkles, Activity, Cpu } from "lucide-react";
import SpotifyCard from "./spotify-card";
import { useSpotify } from "@/app/hooks/use-spotify";

const Hero: React.FC = () => {
    const { isLoaded } = useLoading();
    const { spotify, progress } = useSpotify();
    const [statuses, setStatuses] = useState([
        { id: 0, text: "System Booting //" }
    ]);
    const [responseTime, setResponseTime] = useState<number>(0);

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

        // Initial latency check
        getRealLatency().then(lat => setResponseTime(lat));

        const interval = setInterval(async () => {
            let nextMsg = messages[Math.floor(Math.random() * messages.length)];

            if (nextMsg === "LATENCY_CHECK") {
                const lat = await getRealLatency();
                setResponseTime(lat);
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
        <section className="min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden relative bg-background select-none">
            {/* Background Architecture - Refined with Orbital Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] border border-primary/10 rounded-full shadow-[inset_0_0_50px_rgba(var(--primary-rgb),0.05)]"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-primary/20 rounded-full shadow-[0_0_30px_rgba(var(--primary-rgb),0.02)]"
                />
            </div>

            {/* Giant Background Text: ALCHEMIST - Enhanced with Stroke */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full flex justify-center z-0">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isLoaded ? { opacity: 0.1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-outline text-[30vw] font-black uppercase whitespace-nowrap tracking-tighter"
                >
                    ALCHEMIST
                </motion.h2>
            </div>

            {/* Content Container */}
            <div className="container mx-auto relative z-10 flex flex-col items-center">
                {/* Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center items-center gap-3 text-primary mb-12"
                >
                    {/* <Sparkles className="w-4 h-4" /> */}
                    <span className="section-label group-hover:text-primary transition-colors">THE_NEXT_GEN_EXPERIENCE</span>
                    {/* <Sparkles className="w-4 h-4" /> */}
                </motion.div>

                <div className="relative w-full flex items-center justify-center">
                    {/* Floating Left Panel - Brought closer to center */}
                    <motion.div
                        initial={{ opacity: 0, x: -20, y: -20 }}
                        animate={isLoaded ? { opacity: 1, x: 20, y: -20 } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="absolute left-0 hidden 2xl:flex flex-col gap-2"
                    >
                        <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Response_Time</span>
                        </div>
                        <div className="text-3xl font-black italic">{responseTime}ms</div>
                    </motion.div>

                    {/* Main Title */}
                    <div className="text-center group">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                            className="text-7xl md:text-[12vw] font-black leading-[0.75] tracking-[-0.05em] uppercase flex flex-col"
                        >
                            <span className="italic">True</span>
                            <span className="text-foreground">Napsh</span>
                        </motion.h1>
                    </div>

                    {/* Floating Right Panel - Reverted to stable y, internal slide instead */}
                    <motion.div
                        layout
                        initial={{ opacity: 0, x: -20, y: 20 }}
                        animate={isLoaded ? {
                            opacity: 1,
                            x: -20,
                            y: 20
                        } : {}}
                        transition={{
                            duration: 0.8,
                            delay: isLoaded ? 0 : 0.7,
                            layout: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
                        }}
                        className="absolute right-0 hidden 2xl:flex flex-col items-end gap-2"
                    >
                        <motion.div
                            animate={{ y: spotify ? -20 : 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="flex flex-col items-end gap-2"
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Processing</span>
                                <Cpu className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-1 h-3 items-end">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={spotify ? { height: ["100%", "40%", "100%"] } : { height: "100%" }}
                                            transition={spotify ? { duration: 0.6, repeat: Infinity, delay: i * 0.1 } : {}}
                                            className="w-1 bg-primary/40 rounded-full"
                                        />
                                    ))}
                                </div>
                                <div className="text-xl font-black italic">V3_STABLE</div>
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            <SpotifyCard externalSpotify={spotify} externalProgress={progress} />
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Bottom Credits */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="mt-20 flex flex-wrap items-center justify-center gap-16 md:gap-32"
                >
                    <div className="text-center md:text-left space-y-1">
                        <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">Digital_Address</div>
                        <a href="mailto:hire@truenapsh.my.id" className="font-mono text-xs font-bold hover:text-primary transition-colors">
                            hire@truenapsh.my.id
                        </a>
                    </div>
                    <div className="text-center md:text-right space-y-1">
                        <div className="text-[10px] font-black opacity-30 uppercase tracking-[0.3em]">Core_Developer</div>
                        <div className="font-black text-xs uppercase italic tracking-tighter">ADIL IVANSYAH LUBIS</div>
                    </div>
                </motion.div>
            </div>

            {/* Preserved Status Stream - Absolute Bottom Left */}
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


            {/* Scroll Indicator Decoration */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-primary/30 to-transparent" />
        </section>
    );
};

export default Hero;
