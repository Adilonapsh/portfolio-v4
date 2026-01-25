"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie, X, ChevronRight, Settings, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type CookiePreferences = {
    analytics: boolean
    marketing: boolean
}

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [preferences, setPreferences] = useState<CookiePreferences>({
        analytics: true,
        marketing: false,
    })

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAcceptAll = () => {
        const allAccepted = { analytics: true, marketing: true }
        localStorage.setItem("cookie-consent", JSON.stringify(allAccepted))
        setIsVisible(false)
    }

    const handleSavePreferences = () => {
        localStorage.setItem("cookie-consent", JSON.stringify(preferences))
        setIsVisible(false)
    }

    const togglePreference = (key: keyof CookiePreferences) => {
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-lg"
                >
                    <div className="relative overflow-hidden rounded-[2rem] bg-card/85 p-1 shadow-2xl backdrop-blur-2xl border border-border/50">
                        {/* Ambient Background Blur */}
                        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {!showSettings ? (
                                    <motion.div
                                        key="main"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <Cookie className="h-6 w-6" />
                                            </div>
                                            <div className="space-y-1">
                                                <h3 className="text-xl font-bold tracking-tight">Cookie Consent</h3>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    We use cookies to personalize content, provide social media features, and analyze our traffic.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                                            <button
                                                onClick={() => setShowSettings(true)}
                                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Settings className="h-4 w-4" /> Customize Settings
                                            </button>

                                            <div className="flex gap-2 ml-auto">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-xl h-11 px-6 font-bold uppercase text-[10px] tracking-widest"
                                                    onClick={() => {
                                                        localStorage.setItem("cookie-consent", "declined")
                                                        setIsVisible(false)
                                                    }}
                                                >
                                                    Decline
                                                </Button>
                                                <Button
                                                    variant="default"
                                                    size="sm"
                                                    className="rounded-xl h-11 px-8 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
                                                    onClick={handleAcceptAll}
                                                >
                                                    Accept All
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="settings"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 20, opacity: 0 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <button
                                                onClick={() => setShowSettings(false)}
                                                className="text-xs font-bold text-primary flex items-center gap-1 hover:-translate-x-1 transition-transform bg-primary/5 px-3 py-1.5 rounded-full"
                                            >
                                                <ChevronRight className="h-4 w-4 rotate-180" /> Back
                                            </button>

                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="h-5 w-5 text-primary" />
                                                <h3 className="text-lg font-bold">Preferences</h3>
                                            </div>

                                            {/* Spacer to keep title centered if needed, or just let it be right-aligned */}
                                            <div className="w-16" />
                                        </div>

                                        <div className="space-y-4">
                                            <PreferenceToggle
                                                title="Strictly Necessary"
                                                description="Required for basic site functionality. Always active."
                                                enabled={true}
                                                disabled={true}
                                            />
                                            <PreferenceToggle
                                                title="Analytics"
                                                description="Help us understand how visitors interact with the site."
                                                enabled={preferences.analytics}
                                                onChange={() => togglePreference("analytics")}
                                            />
                                            <PreferenceToggle
                                                title="Marketing"
                                                description="Used to deliver more relevant advertisements to you."
                                                enabled={preferences.marketing}
                                                onChange={() => togglePreference("marketing")}
                                            />
                                        </div>

                                        <Button
                                            variant="default"
                                            className="w-full rounded-2xl h-12 font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20"
                                            onClick={handleSavePreferences}
                                        >
                                            Save Configuration
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute right-4 top-4 opacity-30 hover:opacity-100 transition-opacity p-2"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function PreferenceToggle({ title, description, enabled, onChange, disabled = false }: {
    title: string
    description: string
    enabled: boolean
    onChange?: () => void
    disabled?: boolean
}) {
    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-muted/5 border border-border/10">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold">{title}</span>
                <p className="text-[11px] text-muted-foreground leading-tight max-w-[200px]">{description}</p>
            </div>
            <button
                disabled={disabled}
                onClick={onChange}
                className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none",
                    enabled ? "bg-primary" : "bg-muted",
                    disabled && "opacity-50 cursor-not-allowed"
                )}
            >
                <motion.span
                    animate={{ x: enabled ? 22 : 4 }}
                    className="inline-block h-4 w-4 rounded-full bg-white shadow-sm"
                />
            </button>
        </div>
    )
}
