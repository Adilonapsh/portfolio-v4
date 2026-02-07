"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StreamingData, useLanyard } from "@/app/hooks/use-lanyard";
import { Radio, Youtube } from "lucide-react";

interface StreamingCardProps {
    externalStreaming?: StreamingData | null;
    children?: React.ReactNode;
    className?: string;
}

const StreamingCard: React.FC<StreamingCardProps> = ({ externalStreaming, children, className }) => {
    const internal = useLanyard();

    const streaming = externalStreaming !== undefined ? externalStreaming : internal.streaming;

    const getArtUrl = (activity: StreamingData) => {
        return `https://i3.ytimg.com/vi/${activity.assets?.large_image.split(":")[1]}/mqdefault.jpg`;
    };

    const artUrl = streaming ? getArtUrl(streaming) : null;
    const title = streaming?.details || streaming?.name || "Streaming";
    const subtitle = streaming?.name || streaming?.assets?.large_text || "Live";

    return (
        <AnimatePresence mode="wait">
            {streaming ? (
                <motion.div
                    key="streaming-card-content"
                    initial={{ opacity: 0, x: 20, y: 0, scale: 0.95 }}
                    animate={{ opacity: 1, x: 100, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, y: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className={`glass-card p-4 w-72 flex items-center gap-4 relative overflow-hidden group border-primary/10 ${className || ""}`}
                >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#1DB954] opacity-[0.05] blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />

                    <div className="relative w-16 h-16 flex-shrink-0">
                        <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-white/5 shadow-xl bg-black/20">
                            {artUrl ? (
                                <img src={artUrl} alt="Stream Art" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                                    <span className="text-xs text-muted-foreground">No Art</span>
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#f5122a] p-1 rounded-full z-20 shadow-lg">
                            <Youtube className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center overflow-hidden flex-grow space-y-1">
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="relative flex items-center justify-center"
                            >
                                <Radio className="w-4 h-4 text-[#f5122a]" />
                            </motion.div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live_Streaming</span>
                        </div>

                        <h3 className="text-foreground font-black text-sm truncate leading-tight uppercase tracking-tighter">{title}</h3>
                        <p className="text-muted-foreground text-[10px] font-bold truncate uppercase opacity-60">{subtitle}</p>

                    </div>
                </motion.div>
            ) : (
                children && (
                    <motion.div
                        key="fallback-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className={className}
                    >
                        {children}
                    </motion.div>
                )
            )}
        </AnimatePresence>
    );
};

export default StreamingCard;
