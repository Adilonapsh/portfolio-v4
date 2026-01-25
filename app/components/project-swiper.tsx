'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface ProjectSwiperProps {
    images: string[]
    title: string
}

export default function ProjectSwiper({ images, title }: ProjectSwiperProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

    if (!images || images.length === 0) return null

    return (
        <div className="space-y-4 my-12 max-w-4xl mx-auto">
            <Swiper
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                className="w-full aspect-video rounded-2xl border border-white/10 overflow-hidden bg-zinc-950 shadow-2xl"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={image}
                                alt={`${title} screenshot ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                                className="object-contain"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails Swiper */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                autoplay={{ delay: 3000 }}
                loop={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="thumbnail-swiper"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="cursor-pointer">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border-2 border-transparent transition-all in-[.swiper-slide-thumb-active]:border-[#6d5dfc]">
                            <Image
                                src={image}
                                alt={`${title} thumbnail ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 25vw, 224px"
                                className="object-contain bg-zinc-900/50 opacity-60 transition-opacity hover:opacity-100 in-[.swiper-slide-thumb-active]:opacity-100"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <style jsx global>{`
                .swiper-button-next, .swiper-button-prev {
                    color: rgba(255, 255, 255, 0.5);
                    transition: all 0.3s ease;
                    width: 32px;
                    height: 32px;
                    background: transparent;
                }
                .swiper-button-next:hover, .swiper-button-prev:hover {
                    color: #fff;
                    transform: scale(1.1);
                }
                .swiper-button-next:after, .swiper-button-prev:after {
                    font-size: 16px;
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}
