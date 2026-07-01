"use client";

import ContactContent from "./content"

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <div className="fixed inset-0 coord-grid opacity-30 pointer-events-none z-0" />
            <ContactContent />
        </div>
    );
}