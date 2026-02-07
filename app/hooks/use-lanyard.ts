"use client";

import { useEffect, useState, useRef } from "react";

export interface SpotifyData {
    song: string;
    artist: string;
    album_art_url: string;
    timestamps?: {
        start: number;
        end: number;
    };
}

export interface StreamingData {
    id: string;
    assets: {
        large_image: string;
        large_text?: string;
        small_image?: string;
        small_text?: string;
    };
    type: number;
    name: string;
    details?: string;
    url?: string;
    created_at: number,
}

export interface LanyardData {
    spotify: SpotifyData | null;
    streaming: StreamingData | null;
    discord_status: string;
    activities: any[];
    listening_to_spotify: boolean;
}

export function useLanyard() {
    const [lanyard, setLanyard] = useState<LanyardData | null>(null);
    const [progress, setProgress] = useState(0);
    const userId = process.env.NEXT_PUBLIC_DISCORD_ID;
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!userId) return;

        const connect = () => {
            const socket = new WebSocket("wss://api.lanyard.rest/socket");
            socketRef.current = socket;

            socket.onopen = () => {
                socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
            };

            socket.onmessage = (msg) => {
                const data = JSON.parse(msg.data);

                if (data.op === 1) {
                    const interval = setInterval(() => {
                        if (socket.readyState === WebSocket.OPEN) {
                            socket.send(JSON.stringify({ op: 3 }));
                        } else {
                            clearInterval(interval);
                        }
                    }, data.d.heartbeat_interval);
                }

                if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
                    const streaming = (data.d.activities || []).filter((activity: any) => activity.type === 1);
                    setLanyard({
                        spotify: data.d.spotify || null,
                        streaming: streaming[0] || null,
                        discord_status: data.d.discord_status,
                        activities: data.d.activities || [],
                        listening_to_spotify: data.d.listening_to_spotify,
                    });
                }
            };

            socket.onclose = () => {
                setTimeout(connect, 5000);
            };
        };

        connect();
        return () => socketRef.current?.close();
    }, [userId]);

    useEffect(() => {
        if (!lanyard?.spotify?.timestamps) return;

        const update = () => {
            if (!lanyard?.spotify?.timestamps) return;
            const { start, end } = lanyard.spotify.timestamps;
            const total = end - start;
            const current = Date.now() - start;
            const p = Math.min((current / total) * 100, 100);
            setProgress(p);

            if (p < 100) requestAnimationFrame(update);
        };

        update();
    }, [lanyard?.spotify]);

    const isStreaming = lanyard?.activities?.some(
        (activity: any) => activity.type === 1 // type 1 is Streaming
    ) || false;

    return {
        spotify: lanyard?.spotify || null,
        streaming: lanyard?.streaming || null,
        progress,
        isStreaming,
        status: lanyard?.discord_status || 'offline',
        activities: lanyard?.activities || []
    };
}
