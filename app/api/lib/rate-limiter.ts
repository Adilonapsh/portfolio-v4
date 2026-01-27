interface RateLimitStore {
    [key: string]: {
        count: number;
        resetTime: number;
    };
}

const store: RateLimitStore = {};

interface RateLimitConfig {
    limit: number;
    windowMs: number;
}

export function isRateLimited(ip: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const record = store[ip];

    if (!record || now > record.resetTime) {
        store[ip] = {
            count: 1,
            resetTime: now + config.windowMs,
        };
        return false;
    }

    if (record.count >= config.limit) {
        return true;
    }

    record.count += 1;
    return false;
}
