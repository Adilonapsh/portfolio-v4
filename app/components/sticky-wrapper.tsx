"use client";

import { useEffect, useRef, useState } from "react";

interface StickyWrapperProps {
    children: React.ReactNode;
    className?: string; // Container classes
    stickyClassName?: string; // e.g. "lg:sticky", "md:sticky"
    stuckOffset?: string; // e.g. "lg:top-20", "md:top-20"
    defaultOffset?: string; // e.g. "lg:top-0", "md:top-0"
}

export default function StickyWrapper({
    children,
    className = "",
    stickyClassName = "sticky",
    stuckOffset = "top-20",
    defaultOffset = "top-0"
}: StickyWrapperProps) {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
            },
            {
                threshold: [0, 1],
                rootMargin: "-1px 0px 0px 0px"
            }
        );

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className={`relative ${className}`}>
            <div
                ref={sentinelRef}
                className="absolute top-0 h-[1px] w-full"
                style={{ transform: 'translateY(-1px)' }}
                aria-hidden="true"
            />
            <div className={`${stickyClassName} transition-[top] duration-300 ${isStuck ? stuckOffset : defaultOffset}`}>
                {children}
            </div>
        </div>
    );
}
