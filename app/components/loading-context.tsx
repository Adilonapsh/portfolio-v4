"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type LoadingContextType = {
    isLoaded: boolean
    finishLoading: () => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(process.env.NEXT_PUBLIC_ENABLE_SPLASH_SCREEN === "false")

    const finishLoading = useCallback(() => {
        setIsLoaded(true)
    }, [])

    return (
        <LoadingContext.Provider value={{ isLoaded, finishLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

export function useLoading() {
    const context = useContext(LoadingContext)
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider")
    }
    return context
}
