"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { Blog } from "@/app/server/blog";

export const BlogFeaturedImage = ({ blog }: { blog: Blog }) => {
    return (
        <motion.div
            layoutId={`image-${blog.id}`}
            className="mb-16 relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl"
        >
            <Image
                src={blog.image != "" ? blog.image : "https://admin-porto.truenapsh.my.id/storage/19/f634d124-3a7d-4e36-a314-4b961dfdf268.jpg"}
                alt={blog.title}
                fill
                className="object-cover"
                priority
            />
        </motion.div>
    );
};
