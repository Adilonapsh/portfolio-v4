
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/app/server/blog";
import { formatDate } from "@/lib/utils"; // Assuming utils exists, if not I'll create inline or use a helper

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
        <Link href={`/blog/${blog.slug}`} className="group block h-full">
            <div className="flex flex-col h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                <div className="relative aspect-video w-full overflow-hidden">
                    {blog.image}
                    <Image
                        src={"https://admin-porto.truenapsh.my.id/storage/19/f634d124-3a7d-4e36-a314-4b961dfdf268.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-foreground">
                            {formatDateHelper(blog.created_at)}
                        </span>
                        <span>{blog.views} views</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-card-foreground decoration-primary decoration-2 underline-offset-4 transition-colors group-hover:text-primary group-hover:underline">
                        {blog.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 text-sm text-muted-foreground flex-1">
                        {blog.desc}
                    </p>
                    <div className="mt-auto flex items-center gap-2">
                        {blog.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">#{tag}</span>
                        ))}
                        {/* {JSON.parse(blog.tags).slice(0, 2).map(tag => (
                            <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-primary/80">#{tag}</span>
                        ))} */}
                    </div>
                </div>
            </div>
        </Link>
    );
};
