import React from "react";
import StreamLayout from "../components/stream/stream-layout";

export const metadata = {
    title: "Stream // TRUENAPSH",
    description: "Live broadcast feed and secure communications channel.",
};

export default function StreamPage() {
    return (
        <main className="min-h-screen bg-background selection:bg-primary/30 scroll-smooth">
            <StreamLayout />
        </main>
    );
}
