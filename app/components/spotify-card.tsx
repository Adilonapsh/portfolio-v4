"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music } from "lucide-react";
import { useSpotify, SpotifyData } from "@/app/hooks/use-spotify";

interface SpotifyCardProps {
    externalSpotify?: SpotifyData | null;
    externalProgress?: number;
}

const SpotifyCard: React.FC<SpotifyCardProps> = ({ externalSpotify, externalProgress }) => {
    const internal = useSpotify();

    const spotify = externalSpotify !== undefined ? externalSpotify : internal.spotify;
    const progress = externalProgress !== undefined ? externalProgress : internal.progress;

    return (
        <AnimatePresence mode="wait">
            {spotify && (
                <motion.div
                    key="spotify-card-content"
                    initial={{ opacity: 0, x: 20, y: 0, scale: 0.95 }}
                    animate={{ opacity: 1, x: 100, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, y: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    className="glass-card p-4 w-72 flex items-center gap-4 relative overflow-hidden group border-primary/10 self-end mt-2"
                >
                    {/* Spotify Glow Effect */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#1DB954] opacity-[0.05] blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity duration-700" />

                    {/* Album Art & Vinyl */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-700 pointer-events-none"
                            style={{
                                background: "conic-gradient(from 0deg, #111, #222, #111)",
                                maskImage: "radial-gradient(circle, transparent 20%, black 21%)",
                                WebkitMaskImage: "radial-gradient(circle, transparent 20%, black 21%)"
                            }}
                        />
                        <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-white/5 shadow-xl">
                            <img src={spotify.album_art_url} alt="Album Art" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-[#1DB954] p-1 rounded-full z-20 shadow-lg">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="black">
                                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.508 17.302c-.216.354-.672.468-1.026.252-2.856-1.746-6.45-2.142-10.686-1.176-.408.096-.816-.162-.912-.57-.096-.408.162-.816.57-.912 4.638-1.062 8.61-.612 11.796 1.338.354.216.468.672.258 1.02h-.0001zm1.47-3.258c-.276.45-.858.594-1.308.318-3.264-2.004-8.244-2.586-12.102-1.416-.51.156-1.05-.138-1.206-.648-.156-.51.138-1.05.648-1.206 4.41-1.338 9.906-.684 13.65 1.62.45.27.594.858.318 1.308v.0001zm.126-3.39c-3.918-2.328-10.374-2.544-14.136-1.404-.6.18-1.248-.162-1.428-.762-.18-.6.162-1.248.762-1.428 4.308-1.308 11.454-1.05 15.918 1.602.54.318.72 1.014.396 1.554-.312.546-1.014.72-1.554.402l.042.036z" />
                            </svg>
                        </div>
                    </div>

                    {/* Meta Data */}
                    <div className="flex flex-col justify-center overflow-hidden flex-grow space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5 h-3 items-end">
                                {[1, 2, 3, 4].map(i => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: [4, 12, 4] }}
                                        transition={{
                                            duration: 0.5 + Math.random() * 0.5,
                                            repeat: Infinity,
                                            delay: Math.random() * 0.5
                                        }}
                                        className="w-[2px] bg-[#1DB954] rounded-full"
                                    />
                                ))}
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Live_on_Spotify</span>
                        </div>

                        <h3 className="text-foreground font-black text-sm truncate leading-tight uppercase tracking-tighter">{spotify.song}</h3>
                        <p className="text-muted-foreground text-[10px] font-bold truncate uppercase opacity-60">{spotify.artist}</p>

                        <div className="relative w-full h-[2px] bg-primary/10 rounded-full overflow-hidden mt-2">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-[#1DB954] rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SpotifyCard;
