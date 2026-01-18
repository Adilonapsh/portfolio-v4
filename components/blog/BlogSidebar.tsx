
import { Blog } from "@/app/server/blog";
import { Calendar, Clock, Tag, Share2, Linkedin, Twitter, Copy } from "lucide-react";

export const BlogSidebar = ({ blog }: { blog: Blog }) => {
    const readingTime = "7 Minutes"; // Should calculate this dynamically eventually

    return (
        <div className="sticky top-34 space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm">

            {/* Created At */}
            <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-sm font-medium text-muted-foreground">Created At</span>
                <span className="text-sm font-semibold text-foreground">
                    {new Date(blog.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
            </div>

            {/* Tags */}
            <div className="space-y-3 border-b border-border pb-4">
                <span className="text-sm font-medium text-muted-foreground block">Tags</span>
                <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground hover:bg-secondary/80 cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Reading Time */}
            <div className="flex items-center justify-between border-b border-border pb-4">
                <span className="text-sm font-medium text-muted-foreground">Reading Time</span>
                <span className="text-sm font-semibold text-foreground">{readingTime}</span>
            </div>

            {/* Share */}
            <div className="space-y-3">
                <span className="text-sm font-medium text-muted-foreground block">Share This Post</span>
                <div className="flex gap-4">
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Linkedin className="h-5 w-5" />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <Copy className="h-5 w-5" />
                    </button>
                </div>
            </div>

        </div>
    );
};
