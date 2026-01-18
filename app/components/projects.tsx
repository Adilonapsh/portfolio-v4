import { get as getProjects } from "@/app/server/project"
import ProjectsClient from "./projects-client"

export default async function Projects() {
    const allProjects = await getProjects()
    const projects = allProjects.slice(0, 4)

    return <ProjectsClient projects={projects} />
}
