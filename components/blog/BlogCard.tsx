
"use client"
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/server/blog";
import { motion } from "framer-motion";

// Helper if utility doesn't exist yet, I'll put it here for safety then move if needed:
const formatDateHelper = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const BlogCard = ({ blog }: { blog: Blog }) => {
    return (
        <Link
            href={`/blog/${blog.slug}`}
            className='relative min-h-[400px] lg:min-h-[450px] group/blog rounded-2xl p-8 overflow-hidden border border-border bg-card animate-card hover:shadow-2xl hover:border-primary/50 transition-all duration-500 block'
        >
            <div className='flex justify-between items-start mb-8 relative z-20'>
                <span className="flex items-center gap-1 rounded-full bg-accent/80 backdrop-blur-sm px-3 py-1 text-xs font-bold text-accent-foreground border border-border">
                    {formatDateHelper(blog.created_at)}
                </span>

                <div className="hidden lg:flex gap-2 justify-end items-center">
                    {blog.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className='relative z-10 space-y-4'>
                <motion.h2
                    layoutId={`title-${blog.id}`}
                    className='text-xl lg:text-2xl font-black uppercase tracking-tight mb-3 group-hover/blog:text-primary transition-colors line-clamp-3'
                >
                    {blog.title}
                </motion.h2>
                <motion.p
                    layoutId={`desc-${blog.id}`}
                    className='opacity-70 text-sm leading-relaxed line-clamp-3 max-w-lg'
                >
                    {blog.desc}
                </motion.p>
            </div>

            <div className='mt-6 lg:hidden flex flex-wrap gap-2 relative z-10'>
                {blog.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Background / Hover Decoration */}
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center pointer-events-none'>
                <Image
                    src={blog.image != "" ? blog.image : "https://admin-porto.truenapsh.my.id/storage/19/f634d124-3a7d-4e36-a314-4b961dfdf268.jpg"}
                    className='w-full h-full object-cover opacity-0 blur-xl transition-all duration-1000 group-hover/blog:opacity-30 scale-110'
                    fill
                    alt=""
                />
            </div>

            {/* Visual Preview */}
            <div className="absolute inset-x-0 bottom-0 px-6 translate-y-24 group-hover/blog:translate-y-0 transition-transform duration-700 ease-out z-20">
                <motion.div
                    layoutId={`image-${blog.id}`}
                    className="relative aspect-video w-full overflow-hidden rounded-t-xl border-x border-t border-border"
                >
                    <Image
                        src={blog.image != "" ? blog.image : "https://admin-porto.truenapsh.my.id/storage/19/f634d124-3a7d-4e36-a314-4b961dfdf268.jpg"}
                        fill
                        className='object-cover'
                        alt={blog.title}
                    />
                </motion.div>
            </div>

            {/* Description Overlay on Hover */}
            {/* <div className='absolute bottom-0 left-0 w-full p-8 bg-background/95 backdrop-blur-md border-t border-border translate-y-full group-hover/blog:translate-y-0 transition-transform duration-500 z-30'>
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Summary</span>
                        <span className="text-xs text-muted-foreground">{blog.views} Views</span>
                    </div>
                    <p className='text-sm leading-relaxed opacity-90 line-clamp-2'>{blog.desc}</p>
                </div>
            </div> */}
        </Link>
    );
};
