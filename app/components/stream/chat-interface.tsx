"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Terminal, Wifi, Shield, User } from "lucide-react";

interface Message {
    id: string;
    user: string;
    text: string;
    timestamp: string;
    isSystem?: boolean;
}

export default function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Fetch messages
    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/chat");
            if (res.ok) {
                const data = await res.json();
                setMessages(data);
            }
        } catch (error) {
            console.error("Failed to fetch messages:", error);
        }
    };

    useEffect(() => {
        fetchMessages();
        const interval = setInterval(fetchMessages, 2000); // Poll every 2 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim()) return;

        const text = input;
        setInput(""); // Clear input immediately for better UX

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text, user: "GUEST_USER" }),
            });

            if (res.ok) {
                fetchMessages(); // Refresh messages immediately after sending
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    };


    return (
        <div className="flex flex-col h-full border border-primary/20 bg-background/40 backdrop-blur-sm rounded-lg overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/20 bg-background/5">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Chat</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-bold uppercase text-primary/60">Online</span>
                    </div>
                    <Wifi className="w-3 h-3 text-primary/40" />
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex flex-col ${msg.isSystem ? "text-primary/50 text-xs italic border-l-2 border-background/20 pl-2" : ""}`}
                        >
                            {!msg.isSystem && (
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className={`text-xs font-bold ${msg.user === 'GUEST_USER' ? 'text-emerald-400' : 'text-primary'}`}>
                                        {msg.user}
                                    </span>
                                    <span className="text-[10px] text-primary/30">{msg.timestamp}</span>
                                </div>
                            )}
                            <span className={msg.isSystem ? "" : "text-primary/90"}>{msg.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 border-t border-primary/20 bg-background/20">
                <div className="relative flex items-center group">
                    <div className="absolute left-3 text-primary/40 group-focus-within:text-primary transition-colors">
                        <span className="text-xs font-mono">{">"}</span>
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter command or message..."
                        className="w-full bg-primary/5 border border-primary/10 rounded px-8 py-2.5 text-sm font-mono text-primary placeholder:text-primary/30 focus:outline-none focus:border-primary/40 focus:bg-primary/10 transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-2 p-1.5 text-primary/40 hover:text-primary hover:bg-primary/10 rounded transition-all"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </button>
                </div>
                <div className="flex justify-between items-center mt-2 px-1">
                    <div className="flex gap-2">
                        <span className="text-[9px] uppercase tracking-wider text-primary/30 flex items-center gap-1">
                            <Shield className="w-2 h-2" /> Encrypted
                        </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-primary/30">
                        v1.0.4
                    </span>
                </div>
            </form>
        </div>
    );
}
