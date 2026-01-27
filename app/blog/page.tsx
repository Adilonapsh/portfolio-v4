import { lists } from "@/app/server/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { ScrollReveal } from "@/app/components/scroll-reveal";

export default async function BlogPage() {
    const blogs = await lists();

    return (
        <div className="container mx-auto px-6 pt-32 pb-12">
            <ScrollReveal direction="right" delay={0.2}>
                <div className="max-w-4xl mb-16">
                    <h1 className='text-5xl lg:text-7xl font-black text-foreground uppercase tracking-tight mb-6'>Latest Insights</h1>
                    <p className='text-lg opacity-70 leading-relaxed text-justify lg:text-left'>
                        Explore our latest articles on technology, design, and innovation.
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    );
}
