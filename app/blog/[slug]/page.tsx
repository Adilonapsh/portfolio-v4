import Image from "next/image";
import { notFound } from "next/navigation";
import { Blog, detail, lists } from "@/app/server/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { BlogFeaturedImage } from "@/components/blog/BlogFeaturedImage";
import { BlogCard } from "@/components/blog/BlogCard";

interface BlogDetailProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
    const { slug } = await params;

    let blog: Blog | null = null;
    let relatedBlogs: Blog[] = [];
    try {
        blog = await detail(slug);
        const allBlogs = await lists();
        // Filter out current blog and take first 3
        relatedBlogs = allBlogs.filter(b => b.id !== blog?.id).slice(0, 3);
    } catch (e) {
        console.error("Failed to fetch blog detail or related lists", e);
    }

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section */}
                <BlogHeader blog={blog} />

                {/* Featured Image */}
                <BlogFeaturedImage blog={blog} />

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20">

                    <div className="lg:col-span-9">
                        <BlogContent blog={blog} />
                    </div>

                    <div className="hidden lg:block lg:col-span-3">
                        <BlogSidebar blog={blog} />
                    </div>

                    <div className="block lg:hidden">
                        <BlogSidebar blog={blog} />
                    </div>

                </div>

                {/* Related Blogs Section */}
                {relatedBlogs.length > 0 && (
                    <div className="border-t border-border pt-16">
                        <h2 className="text-3xl font-bold mb-10 text-center uppercase tracking-tight">Related Articles</h2>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {relatedBlogs.map((relatedBlog) => (
                                <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
