import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { timingSafeEqual } from 'node:crypto'
import { PROJECTS_TAG, projectTag } from '@/lib/cache'

// Endpoint ini tidak boleh di-cache.
export const dynamic = 'force-dynamic'

function isAuthorized(req: NextRequest) {
    const secret = process.env.REVALIDATE_SECRET
    if (!secret) return false

    const provided =
        req.nextUrl.searchParams.get('secret') ??
        req.headers.get('x-revalidate-secret') ??
        ''

    const providedBuffer = Buffer.from(provided)
    const secretBuffer = Buffer.from(secret)

    return (
        providedBuffer.length === secretBuffer.length &&
        timingSafeEqual(providedBuffer, secretBuffer)
    )
}

async function handle(req: NextRequest) {
    if (!isAuthorized(req)) {
        return NextResponse.json(
            { revalidated: false, message: 'Unauthorized' },
            { status: 401 },
        )
    }

    const slug = req.nextUrl.searchParams.get('slug') || undefined

    // Hapus cache data dari admin API (fetch bertag).
    revalidateTag(PROJECTS_TAG, 'max')
    if (slug) revalidateTag(projectTag(slug), 'max')

    // Hapus cache halaman yang menampilkan data tersebut.
    revalidatePath('/')
    revalidatePath('/projects')
    if (slug) revalidatePath(`/projects/${slug}`, 'page')

    return NextResponse.json({
        revalidated: true,
        slug: slug ?? null,
        now: Date.now(),
    })
}

export async function GET(req: NextRequest) {
    return handle(req)
}

export async function POST(req: NextRequest) {
    return handle(req)
}
