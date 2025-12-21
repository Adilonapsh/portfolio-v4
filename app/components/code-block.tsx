'use client'
import { useState, useEffect } from "react"
import { Check, Copy } from "lucide-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface CodeBlockProps {
    language: string
    value: string
    className?: string
}

export default function CodeBlock({ language, value, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const extractedLanguage = className ? className.replace("language-", "") : language
    const isLight = mounted && resolvedTheme === "light"

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error("Failed to copy text: ", err)
        }
    }

    return (
        <div className="relative rounded-md overflow-hidden my-2 border border-zinc-200 dark:border-zinc-800 mb-5">
            <div className="flex items-center justify-between bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-medium">{extractedLanguage || "code"}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={copyToClipboard}
                >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
            </div>
            <SyntaxHighlighter
                language={extractedLanguage || "text"}
                style={isLight ? atomOneLight : atomOneDark}
                customStyle={{
                    margin: 0,
                    padding: "1rem",
                    borderRadius: 0,
                    fontSize: "0.875rem",
                    backgroundColor: isLight ? "#ffffff" : "#18181b",
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    )
}