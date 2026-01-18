
import { Blog } from "@/app/server/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Image from "next/image";
import CodeBlock from "@/app/components/code-block";

export const BlogContent = ({ blog }: { blog: Blog }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 sm:mb-8" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4 sm:mb-6" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-3 sm:mb-4" {...props} />,
                h4: ({ node, ...props }) => <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase mb-2" {...props} />,
                h5: ({ node, ...props }) => <h5 className="text-base sm:text-lg md:text-xl font-black uppercase mb-2" {...props} />,
                h6: ({ node, ...props }) => <h6 className="text-sm sm:text-base md:text-lg font-black uppercase mb-2" {...props} />,
                p: ({ node, ...props }) => <p className="mb-6 indent-8 leading-8 text-[1.1rem] font-normal" {...props} />,
                pre: ({ node, ...props }) => <pre className="mb-4 sm:mb-6 last:mb-0 overflow-x-auto" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal ml-5 sm:ml-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2" {...props} />,
                li: ({ node, ...props }) => <li className="pl-1 sm:pl-2" {...props} />,
                table: ({ node, ...props }) => (
                    <div className="my-6 sm:my-8 overflow-x-auto border border-white/10 rounded-xl">
                        <table {...props} />
                    </div>
                ),
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return match ? (
                        <CodeBlock
                            language={match[1]}
                            value={String(children).replace(/\n$/, "")}
                            className={className}
                            {...props}
                        />
                    ) : (
                        <code className={"px-1 py-0.5 bg-gray-200 dark:bg-gray-800 rounded text-xs sm:text-sm"} {...props}>
                            {children}
                        </code>
                    )
                },
                image({ node, ...props }) {
                    const imgProps = props as { src?: string; alt?: string; width?: number; height?: number }
                    return (
                        <Image
                            src={imgProps.src || ""}
                            alt={imgProps.alt || ""}
                            width={imgProps.width || 1920}
                            height={imgProps.height || 1080}
                            className="max-w-full w-full h-auto rounded-xl sm:rounded-2xl border border-white/10 my-8 sm:my-12"
                        />
                    )
                },
            }}
        >
            {blog.content}
        </ReactMarkdown>
    );
};
