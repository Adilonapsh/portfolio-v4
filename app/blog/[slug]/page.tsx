
import Image from "next/image";
import { notFound } from "next/navigation";
import { detail } from "@/app/server/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogContent } from "@/components/blog/BlogContent";
import { BlogSidebar } from "@/components/blog/BlogSidebar";

interface BlogDetailProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogDetail({ params }: BlogDetailProps) {
    const { slug } = await params;

    // Assuming backend handles slug lookup or we might need to find by slug if endpoint only takes ID.
    // However, the function signature in blog.ts is `detail(id: String)`.
    // If slugs are supported by backend on same endpoint using ID param, we can pass slug.
    // If not, we might need to filter from lists or backend needs update. 
    // Based on `detail` signature taking `id`, I will try passing slug, if it fails I'll notify user.
    // But typically public blog relies on slug.

    let blog;
    try {
        blog = await detail(slug);
    } catch (e) {
        console.error("Failed to fetch blog detail", e);
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
                <div className="mb-16 relative aspect-[21/9] w-full overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                        src={"https://admin-porto.truenapsh.my.id/storage/19/f634d124-3a7d-4e36-a314-4b961dfdf268.jpg"}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

                    <div className="lg:col-span-8">
                        <BlogContent blog={blog} />
                    </div>

                    <div className="hidden lg:block lg:col-span-4">
                        <BlogSidebar blog={blog} />
                    </div>

                    <div className="block lg:hidden">
                        <BlogSidebar blog={blog} />
                    </div>

                </div>

            </div>
        </div>
    );
}
