import { NextRequest, NextResponse } from 'next/server';

interface Message {
    id: string;
    user: string;
    text: string;
    timestamp: string;
    isSystem?: boolean;
}

// Global in-memory store for messages
// Note: This will reset on server restart
const messages: Message[] = [
    { id: "1", user: "SYSTEM", text: "Secure connection established.", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isSystem: true },
];

export async function GET() {
    return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { text, user } = body;

        if (!text) {
            return NextResponse.json({ error: "Missing text" }, { status: 400 });
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            user: user || "GUEST_USER",
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        messages.push(newMessage);

        // Keep only last 50 messages to prevent memory issues
        if (messages.length > 50) {
            messages.splice(1, messages.length - 50); // Keep the first SYSTEM message
        }

        return NextResponse.json(newMessage);
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
