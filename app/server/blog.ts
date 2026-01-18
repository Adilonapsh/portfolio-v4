'use server'

export type Blog = {
    id: string
    user_id: string
    title: string
    slug: string
    desc: string
    content: string
    image: string
    video: string | null
    status: 'draft' | 'published'
    type: 'post' | 'page'
    visibility: 'public' | 'private'
    views: number
    created_at: string
    updated_at: string
    tags: string[]
    user: User
}

type User = {
    id: string
    name: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
}

const baseURL = process.env.NEXT_URL_API;

export const lists = async (): Promise<Blog[]> => {
    const data = await fetch(`${baseURL}/feed`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await data.json();
    return json.data;
}

export const detail = async (id: String): Promise<Blog> => {
    const data = await fetch(`${baseURL}/feed/${id}`, {
        method: 'GET',
    });
    const json = await data.json();
    return json.data;
}