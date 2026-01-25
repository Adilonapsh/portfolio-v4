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
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16 md:mb-24">
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

                    {/* Project Logo Placeholder */}
                    <div className="relative h-24 w-24 shrink-0 bg-[#6d5dfc]/20 rounded-2xl flex items-center justify-center overflow-hidden">
                        {project.logo ? (
                            <Image
                                src={project.logo}
                                alt={`${project.title} logo`}
                                fill
                                sizes="96px"
                                className="object-contain p-4 bg-background"
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

                {/* Content Grid */}
                <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,4fr)] gap-16 md:gap-24">
                    {/* Sidebar */}
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

                    {/* Main Content */}
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
                                h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase mb-6 sm:mb-8" {...props} />,
                                h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4 sm:mb-6" {...props} />,
                                h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase mb-3 sm:mb-4" {...props} />,
                                h4: ({ node, ...props }) => <h4 className="text-lg sm:text-xl md:text-2xl font-black uppercase mb-2" {...props} />,
                                h5: ({ node, ...props }) => <h5 className="text-base sm:text-lg md:text-xl font-black uppercase mb-2" {...props} />,
                                h6: ({ node, ...props }) => <h6 className="text-sm sm:text-base md:text-lg font-black uppercase mb-2" {...props} />,
                                p: ({ node, ...props }) => <p className="mb-4 sm:mb-6 last:mb-0" {...props} />,
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
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                                            className="w-full h-auto rounded-xl sm:rounded-2xl border border-white/10 my-8 sm:my-12"
                                        />
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
