import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { get as getProjects } from "@/app/server/project"
import Image from "next/image"
import Link from "next/link"
import { ScrollReveal } from "./scroll-reveal"

export default async function Projects() {
    const allProjects = await getProjects()
    const projects = allProjects.slice(0, 3)

    return (
        <section id="projects" className="py-24">
            <div className="container px-4 md:px-6">
                <ScrollReveal direction="up" distance={20}>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase">PROJEK TERPILIH</h2>
                            <p className="text-muted-foreground max-w-[600px] text-lg">
                                Berikut adalah beberapa proyek terbaru saya yang menunjukkan keahlian saya dalam pengembangan web.
                            </p>
                        </div>
                        <Link href="/projects">
                            <Button variant="ghost" className="rounded-full gap-2 font-bold uppercase tracking-widest text-[#a3ff12] group">
                                Lihat Semua Projek <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </ScrollReveal>

                <ScrollReveal direction="up" staggerChildren={0.2}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div key={index}>
                                <Card className="group overflow-hidden border-muted-foreground/10 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 flex flex-col h-full">
                                    <Link href={`/projects/${project.slug}`} className="relative aspect-video overflow-hidden block">
                                        <Image
                                            src={project.thumbnail}
                                            alt={project.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-background/90 text-foreground px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                Lihat Detail
                                            </span>
                                        </div>
                                    </Link>
                                    <CardHeader className="flex-grow">
                                        <Link href={`/projects/${project.slug}`}>
                                            <CardTitle className="group-hover:text-primary transition-colors uppercase font-black tracking-tight text-2xl">
                                                {project.name}
                                            </CardTitle>
                                        </Link>
                                        <CardDescription className="line-clamp-2">{project.short_desc}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {(project.techstack || []).map((t) => (
                                                <Badge key={t} variant="secondary" className="text-[10px] uppercase font-bold tracking-wider bg-[#0a0c10]/80 dark:bg-[#0a0c10]/80 text-[#ffffff] dark:text-[#a3ff12] border-none hover:bg-[#a3ff12] hover:text-[#0a0c10]">
                                                    {t}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="gap-4 pt-4 border-t border-muted/50">
                                        <Link href={project.url || "#"} target="_blank" className="w-full">
                                            <Button size="sm" className="w-full rounded-xl gap-2 bg-[#0a0c10] hover:bg-[#5b4dcf] text-[#ffffff] dark:text-[#a3ff12] hover:text-[#0a0c10] hover:bg-[#a3ff12] dark:hover:text-[#0a0c10] dark:hover:bg-[#ffffff]">
                                                <ExternalLink className="h-4 w-4" /> Live Demo
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="outline" className="rounded-xl border-muted-foreground/20 hover:bg-muted/50" disabled>
                                            <Github className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>
        </section>
    )
}
