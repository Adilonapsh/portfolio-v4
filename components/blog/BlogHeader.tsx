
import { Blog } from "@/app/server/blog";
import { formatDate } from "@/lib/utils";

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
            <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm font-medium text-secondary-foreground backdrop-blur-sm">
                Created By {blog.user.name}
            </div>

            <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                {blog.title}
            </h1>

            <div className="text-muted-foreground">
                {formatDateHelper(blog.created_at)}
            </div>
        </div>
    );
};
