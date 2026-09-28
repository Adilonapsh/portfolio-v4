import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Metadata } from "next";

import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import CodeBlock from "@/app/components/code-block";
import Image from "next/image";
import ProjectSwiper from "@/app/components/project-swiper";
import StickyWrapper from "@/app/components/sticky-wrapper";


interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
    const slugs = await getAllProjectSlugs();
    return slugs.map((item) => item.params);
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        }
    }

    return {
        title: `${project.title} | Portfolio`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.logo ? [project.logo] : [],
        },
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen font-sans">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-24">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-16 lg:mt-0 mb-16 md:mb-24">
                    <div className="max-w-3xl space-y-6">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-foreground transition-colors uppercase tracking-widest group"
                        >
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to project
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase">
                            {project.title}
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-medium">
                            {project.description}
                        </p>
                    </div>

                    <div className="relative h-32 w-32 shrink-0 bg-[#6d5dfc]/20 rounded-2xl flex items-center justify-center overflow-hidden">
                        {project.logo ? (
                            <Image
                                src={project.logo}
                                alt={`${project.title} logo`}
                                fill
                                className="object-contain p-2 bg-background"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <div className="absolute inset-0 bg-[#6d5dfc] opacity-20 blur-xl" />
                                <span className="relative text-4xl font-black italic text-[#6d5dfc]">
                                    {project.title.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] gap-16 md:gap-24">
                    <StickyWrapper stickyClassName="space-y-5 lg:sticky" stuckOffset="lg:top-34" defaultOffset="lg:top-0">
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Client</p>
                            <p className="text-xl md:text-2xl font-black uppercase">{project.client}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Services</p>
                            <p className="text-xl md:text-2xl font-black uppercase">{project.services}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Main Technologies</p>
                            <p className="text-xl md:text-2xl font-black uppercase">{project.mainTech}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Website</p>
                            <a
                                href={project.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xl md:text-2xl font-black uppercase flex items-center gap-2 hover:text-[#6d5dfc] transition-colors group"
                            >
                                Preview <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </StickyWrapper>

                    <article className="w-full max-w-4xl mx-auto lg:mx-0 overflow-hidden wrap-break-word
                        prose prose-invert prose-sm sm:prose-base md:prose-lg
                        prose-headings:uppercase prose-headings:font-black prose-headings:tracking-tight
                        prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-6 sm:prose-h1:mb-8
                        prose-p:text-gray-400 prose-p:leading-relaxed prose-p:font-medium
                        prose-li:text-gray-400 prose-li:font-medium
                    ">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkBreaks]}
                            components={{
                                h1: ({ node, ...props }) => <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-12 mt-16 first:mt-0" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-8 mt-12 first:mt-0" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-6 mt-10 first:mt-0" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-4 mt-8" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-6 sm:mb-8 last:mb-0 leading-relaxed text-lg" {...props} />,
                                pre: ({ node, ...props }) => <pre className="mb-6 sm:mb-8 last:mb-0 overflow-x-auto rounded-xl" {...props} />,
                                ul: ({ node, ...props }) => <ul className="list-disc ml-6 mb-6 sm:mb-8 space-y-2 marker:text-[#6d5dfc]" {...props} />,
                                ol: ({ node, ...props }) => <ol className="list-decimal ml-6 mb-6 sm:mb-8 space-y-2 marker:text-[#6d5dfc]" {...props} />,
                                li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                                table: ({ node, ...props }) => (
                                    <div className="my-10 overflow-x-auto border border-gray-200 dark:border-white/10 rounded-2xl bg-gray-50 dark:bg-white/[0.02]">
                                        <table className="w-full border-collapse text-left" {...props} />
                                    </div>
                                ),
                                thead: ({ node, ...props }) => <thead className="bg-gray-100 dark:bg-white/5 border-b border-gray-200 dark:border-white/10" {...props} />,
                                th: ({ node, ...props }) => <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400" {...props} />,
                                td: ({ node, ...props }) => <td className="px-6 py-4 text-sm border-t border-gray-200 dark:border-white/5 align-top" {...props} />,
                                tr: ({ node, ...props }) => <tr className="hover:bg-gray-100 dark:hover:bg-white/[0.02] transition-colors" {...props} />,
                                code({ node, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "")
                                    return match ? (
                                        <div className="my-8 rounded-xl overflow-hidden border border-white/10">
                                            <CodeBlock
                                                language={match[1]}
                                                value={String(children).replace(/\n$/, "")}
                                                className={className}
                                                {...props}
                                            />
                                        </div>
                                    ) : (
                                        <code className={"px-2 py-0.5 bg-gray-200 dark:bg-gray-800 rounded font-mono text-xs sm:text-sm text-[#6d5dfc]"} {...props}>
                                            {children}
                                        </code>
                                    )
                                },
                                image({ node, ...props }) {
                                    const imgProps = props as { src?: string; alt?: string; width?: number; height?: number }
                                    return (
                                        <div className="my-12 sm:my-16 group relative">
                                            <Image
                                                src={imgProps.src || ""}
                                                alt={imgProps.alt || ""}
                                                width={imgProps.width || 1920}
                                                height={imgProps.height || 1080}
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                                                className="w-full h-auto rounded-3xl border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                            {imgProps.alt && (
                                                <p className="mt-4 text-center text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                                                    {imgProps.alt}
                                                </p>
                                            )}
                                        </div>
                                    )
                                },
                            }}
                        >
                            {project.content}
                        </ReactMarkdown>
                        <ProjectSwiper images={project.images || []} title={project.title} />
                    </article>
                </div>
            </div>
        </div>
    );
}
