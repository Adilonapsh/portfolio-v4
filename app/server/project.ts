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

const baseURL = process.env.NEXT_URL_API || "https://admin-porto.truenapsh.my.id/api";

export const get = async (): Promise<Project[]> => {
    const data = await fetch(`${baseURL}/project`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: { revalidate: 60 },
    });
    if (!data.ok) {
        console.error(`Failed to fetch projects, status: ${data.status}`);
        return [];
    }
    const json = await data.json();
    return json.data ?? [];
}
export const detail = async (id: string): Promise<Project | null> => {
    const data = await fetch(`${baseURL}/project/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        next: { revalidate: 60 },
    });
    if (!data.ok) {
        console.error(`Failed to fetch project ${id}, status: ${data.status}`);
        return null;
    }
    const json = await data.json().catch(() => null);
    if (!json) return null;
    return json.data ?? null;
}
