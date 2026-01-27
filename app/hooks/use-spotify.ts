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

export function useSpotify() {
    const [spotify, setSpotify] = useState<SpotifyData | null>(null);
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
                    setSpotify(data.d.spotify || null);
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
        if (!spotify?.timestamps) return;

        const update = () => {
            const { start, end } = spotify.timestamps!;
            const total = end - start;
            const current = Date.now() - start;
            const p = Math.min((current / total) * 100, 100);
            setProgress(p);

            if (p < 100) requestAnimationFrame(update);
        };

        update();
    }, [spotify]);

    return { spotify, progress };
}
