"use client";

import React from "react";
import { motion } from "framer-motion";
import ChatInterface from "./chat-interface";
import VideoPlayer from "./video-player";
import { Radio, Signal, Users, Eye } from "lucide-react";

export default function StreamLayout() {
    const [viewerCount, setViewerCount] = React.useState(0);

    React.useEffect(() => {
        // Generate a random client ID for this session
        const clientId = Math.random().toString(36).substring(7);

        const updateViewers = async () => {
            try {
                const res = await fetch('/api/viewers', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ clientId })
                });
                if (res.ok) {
                    const data = await res.json();
                    setViewerCount(data.count);
                }
            } catch (err) {
                console.error("Failed to update viewers", err);
            }
        };

        // Initial call
        updateViewers();

        // Poll every 5 seconds
        const interval = setInterval(updateViewers, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="h-screen w-full pt-20 pb-4 px-4 relative overflow-hidden flex flex-col">
            {/* Background Grids/Decorations (similar to Hero) */}
            {/* <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/5 to-transparent" />
                <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-96 h-96 border border-background/5 rounded-full"
                />
            </div> */}

            <div className="w-full h-full flex flex-col lg:flex-row gap-4 relative z-10">
                {/* Left Column: Stream/Video Area */}
                <div className="flex-grow flex flex-col gap-4 overflow-hidden">
                    {/* Stream Header */}
                    <div className="flex items-center justify-between px-2">
                        <div className="flex flex-col">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl font-black uppercase tracking-tighter text-foreground flex items-center gap-3"
                            >
                                <span>Live Feed</span>
                                <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            </motion.h1>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase text-primary/40 tracking-widest">Viewers</span>
                                <div className="flex items-center gap-2 text-primary">
                                    <Eye className="w-4 h-4" />
                                    <span className="font-mono font-bold">{viewerCount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative flex-1 bg-foreground rounded-lg overflow-hidden w-full h-full min-h-0">
                        <VideoPlayer />
                    </div>
                </div>

                {/* Right Column: Chat */}
                <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-[400px] xl:w-[450px] shrink-0 h-[400px] lg:h-full pb-0"
                >
                    <ChatInterface />
                </motion.div>
            </div>
        </section>
    );
}
