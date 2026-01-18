
"use client"
import { Blog } from "@/app/server/blog";
import { motion } from "framer-motion";
import Link from "next/link";

// Using a local helper if import fails, but assuming standardization later
const formatDateHelper = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const BlogHeader = ({ blog }: { blog: Blog }) => {
    return (
        <div className="w-full text-center space-y-6 py-24 md:py-30">
            <div className="flex justify-center">
                <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6" /></svg>
                    Back to Blog
                </Link>
            </div>

            <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-secondary-foreground backdrop-blur-sm">
                Created By {blog.user.name}
            </div>

            <motion.h1
                layoutId={`title-${blog.id}`}
                className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-tight flex flex-wrap justify-center gap-x-3 gap-y-1"
            >
                {blog.title.split(" ").map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            duration: 0.4,
                            ease: [0.2, 0.65, 0.3, 0.9],
                            delay: i * 0.05
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h1>

            <motion.div
                layoutId={`desc-${blog.id}`}
                className="mx-auto max-w-2xl text-lg text-muted-foreground flex flex-wrap justify-center gap-x-1.5"
            >
                {blog.desc.split(" ").map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            duration: 0.4,
                            ease: [0.2, 0.65, 0.3, 0.9],
                            delay: i * 0.05
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        </div>
    );
};
