import { get as getProjects, detail as getProjectDetail } from '@/app/server/project'

export interface ProjectData {
    slug: string
    title: string
    description: string
    client: string
    services: string
    mainTech: string
    website: string
    logo?: string
    images?: string[]
    content: string
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
    try {
        const project = await getProjectDetail(slug);
        if (!project) return null

        return {
            slug: project.slug,
            content: project.body,
            title: project.name,
            description: project.short_desc,
            client: project.clients.join(', '),
            services: project.services,
            mainTech: project.mainstack,
            website: project.url,
            logo: project.logo,
            images: project.images,
        }
    } catch (e) {
        console.error('Error fetching project by slug:', e)
        return null
    }
}

export async function getAllProjectSlugs() {
    try {
        const projects = await getProjects()
        return projects.map((project) => {
            return {
                params: {
                    slug: project.slug,
                },
            }
        })
    } catch (e) {
        console.error('Error fetching project slugs:', e)
        return []
    }
}
