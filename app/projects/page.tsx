import { get } from '@/app/server/project'
import Image from 'next/image'
import Link from 'next/link'
import { FaCode, FaCodeBranch, FaDatabase, FaLaptop, FaLaravel, FaReact } from 'react-icons/fa'
import { FiFigma } from 'react-icons/fi'
import { IoFileTrayFull } from 'react-icons/io5'
import { RiNextjsFill, RiNodejsFill } from 'react-icons/ri'
import { SiPostgresql } from 'react-icons/si'

const TechIcons = ({ techstack, className = "flex gap-2" }: { techstack: string[], className?: string }) => {
    return (
        <div className={className}>
            {techstack.map((tech, index) => (
                <div key={index} className='flex items-center gap-2' title={tech}>
                    {tech === 'Laravel' && <FaLaravel className='text-2xl text-[#FF2D20]' />}
                    {tech === 'React' && <FaReact className='text-2xl text-[#61DAFB]' />}
                    {tech === 'Postgres' && <SiPostgresql className='text-2xl text-[#336791]' />}
                    {tech === 'Next Js' && <RiNextjsFill className='text-2xl text-[#000000] dark:text-white' />}
                    {tech === 'Figma' && <FiFigma className='text-2xl text-[#F24E1E]' />}
                    {tech === 'Node Js' && <RiNodejsFill className='text-2xl text-[#339933]' />}
                    {tech === 'Code' && <FaCode className='text-2xl text-[#007ACC]' />}
                    {tech === 'Git' && <FaCodeBranch className='text-2xl text-[#F05032]' />}
                    {tech === 'Database' && <FaDatabase className='text-2xl text-[#4479A1]' />}
                    {tech === 'Web' && <FaLaptop className='text-2xl text-[#62B0D3]' />}
                    {tech === 'Project' && <IoFileTrayFull className='text-2xl text-[#FFA500]' />}
                </div>
            ))}
        </div>
    )
}

const ProjectsPage = async () => {
    const projects = await get();

    return (
        <div className="container mx-auto px-6 pt-32 pb-12">
            <div className="max-w-4xl mb-16">
                <h1 className='text-5xl lg:text-7xl font-black text-foreground uppercase tracking-tight mb-6'>Projects</h1>
                <p className='text-lg opacity-70 leading-relaxed text-justify lg:text-left'>
                    Here are some of my recent projects, showcasing my skills and creativity.
                </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {projects.map((project, index) => (
                    <Link
                        key={index}
                        href={`/projects/${project.slug}`}
                        className='relative min-h-[500px] lg:min-h-[600px] group/project rounded-lg p-10 overflow-hidden border border-border animate-card hover:drop-shadow transition-all duration-500 block'
                    >
                        <div className='flex justify-between items-start mb-8'>
                            <Image
                                src={project.logo}
                                className='w-12 h-12 rounded-lg object-contain'
                                width={100}
                                height={100}
                                alt={`${project.name} Logo`}
                            />
                            <TechIcons techstack={project.techstack} className="hidden lg:flex gap-3 justify-end items-center" />
                        </div>

                        <div className='relative z-10'>
                            <h2 className='text-3xl lg:text-5xl font-bold mb-3 group-hover/project:text-primary transition-colors'>
                                {project.name}
                            </h2>
                            <p className='opacity-70 text-base max-w-lg'>{project.short_desc}</p>
                        </div>

                        <div className='mt-6 lg:hidden'>
                            <TechIcons techstack={project.techstack} />
                        </div>

                        {/* Background / Hover Decoration */}
                        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center pointer-events-none'>
                            <Image
                                src={project.logo}
                                className='w-2/3 h-2/3 opacity-0 blur-3xl transition-all duration-1000 group-hover/project:opacity-20'
                                width={500}
                                height={500}
                                alt=""
                            />
                        </div>

                        {/* Visual Preview */}
                        <div className="absolute inset-x-0 bottom-0 px-6 translate-y-20 group-hover/project:translate-y-0 transition-transform duration-700 ease-out z-20">
                            <Image
                                src={project?.thumbnail}
                                width={1000}
                                height={600}
                                className='w-full h-auto rounded-t-lg shadow-2xl border-x border-t border-muted'
                                alt={project.name}
                            />
                        </div>

                        {/* Description Overlay on Hover */}
                        <div className='absolute bottom-0 left-0 w-full p-8 bg-background/95 backdrop-blur-sm border-t border-border translate-y-full group-hover/project:translate-y-0 transition-transform duration-500 z-30'>
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">Description</span>
                                <p className='text-sm leading-relaxed opacity-90'>{project.desc}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProjectsPage;
