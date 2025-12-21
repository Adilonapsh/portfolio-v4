'use server'

export type Project = {
    id: string
    name: string
    slug: string
    logo: string
    short_desc: string
    desc: string
    images: string[]
    thumbnail: string
    tags: string[]
    clients: string[]
    client_logos: string[]
    services: string
    mainstack: string
    techstack: string[]
    url: string
    body: string
}

const baseURL = process.env.NEXT_URL_API;

export const get = async (): Promise<Project[]> => {
    const data = await fetch(`${baseURL}/project`, {
        method: 'GET',
    });
    const json = await data.json();
    return json.data;
}
export const detail = async (id: String): Promise<Project> => {
    const data = await fetch(`${baseURL}/project/${id}`, {
        method: 'GET',
    });
    const json = await data.json();
    return json.data;
}
