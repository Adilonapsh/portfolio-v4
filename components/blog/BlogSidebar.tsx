"use client"
import { Blog } from "@/app/server/blog";
import { Copy, Linkedin, Twitter, Check } from "lucide-react";
import { useState } from "react";

export const BlogSidebar = ({ blog }: { blog: Blog }) => {
    const readingTime = "7 Minutes"; // Should calculate this dynamically eventually
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleTwitterShare = () => {
        if (!shareUrl) return;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const handleLinkedinShare = () => {
        if (!shareUrl) return;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    const handleCopyLink = async () => {
        if (!shareUrl) return;
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="sticky top-34 space-y-2 p-2">

            {/* Created At */}
            <div className="space-y-2 border-b border-border pb-8">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Published On</span>
                <span className="text-3xl font-black text-foreground block uppercase tracking-tighter">
                    {new Date(blog.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
            </div>

            {/* Reading Time */}
            <div className="space-y-2 border-b border-border pb-8">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Reading Time</span>
                <span className="text-3xl font-black text-foreground block uppercase tracking-tighter">{readingTime}</span>
            </div>

            {/* Tags */}
            <div className="space-y-4 border-b border-border pb-8">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">Topics</span>
                <div className="flex flex-col gap-2">
                    {blog.tags.map(tag => (
                        <span key={tag} className="text-xl font-bold uppercase tracking-tight hover:text-primary transition-colors cursor-pointer">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Share */}
            <div className="space-y-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest block">Share</span>
                <div className="flex gap-6">
                    <button
                        onClick={handleTwitterShare}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Share on Twitter"
                    >
                        <Twitter className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleLinkedinShare}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleCopyLink}
                        className="text-muted-foreground hover:text-foreground transition-colors relative"
                        aria-label="Copy Link"
                    >
                        {copied ? <Check className="h-6 w-6 text-green-500" /> : <Copy className="h-6 w-6" />}
                    </button>
                </div>
            </div>

        </div>
    );
};
