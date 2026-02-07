import { NextRequest, NextResponse } from 'next/server';

// In-memory store for active sessions: Map<clientId, lastActiveTimestamp>
// Note: This resets on server restart and is per-instance (fine for dev/single VPS)
const activeViewers = new Map<string, number>();

const TIMEOUT_MS = 15000; // 15 seconds timeout

export async function POST(req: NextRequest) {
    try {
        const { clientId } = await req.json();

        if (!clientId) {
            return NextResponse.json({ count: activeViewers.size }, { status: 400 });
        }

        const now = Date.now();
        activeViewers.set(clientId, now);

        // Cleanup inactive viewers
        for (const [id, lastActive] of activeViewers.entries()) {
            if (now - lastActive > TIMEOUT_MS) {
                activeViewers.delete(id);
            }
        }

        // Add a base number to make it look active for demo purposes (optional, can be removed)
        // For now, let's keep it real.
        const count = activeViewers.size;

        return NextResponse.json({ count });
    } catch (error) {
        return NextResponse.json({ count: 0 }, { status: 500 });
    }
}
