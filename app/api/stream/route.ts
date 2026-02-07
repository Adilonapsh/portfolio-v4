import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const STREAM_URL = "https://singapore-51.restream.io/preview-stream-2/re_8579507_99073d3036862d57d870_selectfb1d2548-14fa-46d9-a824-dac338fb619a.mp4?";

    try {
        const response = await fetch(STREAM_URL, {
            headers: {
                'accept': '*/*',
                'referer': 'https://app.restream.io/',
            }
        });

        if (!response.ok) {
            console.error("Stream Proxy Error:", response.status, response.statusText);
            return new NextResponse("Stream Unreachable", { status: response.status });
        }

        return new NextResponse(response.body, {
            headers: {
                'Content-Type': 'video/mp4',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
            },
        });

    } catch (error) {
        console.error("Stream Proxy Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
