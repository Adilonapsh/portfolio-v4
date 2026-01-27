import { NextResponse } from 'next/server';
import { isRateLimited } from '../lib/rate-limiter';

export async function POST(request: Request) {
    try {
        const ip = request.headers.get('x-forwarded-for') || 'anonymous';

        // Rate limit: 3 requests per 10 minutes
        const isLimited = isRateLimited(ip, { limit: 3, windowMs: 10 * 60 * 1000 });

        if (isLimited) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await request.json();
        const webhookUrl = process.env.NEXT_N8N_URL;

        if (!webhookUrl) {
            console.error('NEXT_N8N_URL is not defined');
            return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Webhook responded with status: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error forwarding to webhook:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
