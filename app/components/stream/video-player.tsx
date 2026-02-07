"use client";

import React, { useState } from "react";
import { AlertCircle, Globe, Globe2, Loader2, Podcast, Radio, SignalLow } from "lucide-react";

export default function VideoPlayer() {
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    return (
        <div className="relative w-full h-full bg-foreground rounded-lg overflow-hidden group">

            {/* Loading State */}
            {loading && !error && (
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            )}

            {/* Offline/Error State - Styled as System Offline */}
            {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-background/90 backdrop-blur-md gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-background/10 blur-xl rounded-full" />
                        <Podcast className="w-20 h-20 text-red-700/20 relative z-10" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-foreground/60">Offline</h3>
                        <p className="text-xs font-mono text-foreground/60">Waiting for incoming transmission...</p>
                    </div>
                </div>
            )}

            {/* Native HTML5 Video Player for MP4 */}
            <video
                className="w-full h-full object-contain"
                controls
                autoPlay
                muted
                playsInline
                src="/api/stream"
                onCanPlay={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
            />

            {/* Overlay Grid (Visuals) */}
            {!error && (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-white/80 tracking-widest uppercase shadow-black drop-shadow-md">Live_Source</span>
                    </div>
                </>
            )}
        </div>
    );
}
