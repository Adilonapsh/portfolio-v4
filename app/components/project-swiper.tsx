'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

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
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Handle keyboard navigation and ESC to close
    useEffect(() => {
        if (!isFullscreen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsFullscreen(false)
            } else if (e.key === 'ArrowLeft') {
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
            } else if (e.key === 'ArrowRight') {
                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isFullscreen, images.length])

    // Prevent body scroll when fullscreen is open
    useEffect(() => {
        if (isFullscreen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isFullscreen])

    const openFullscreen = (index: number) => {
        setCurrentIndex(index)
        setIsFullscreen(true)
    }

    const closeFullscreen = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsFullscreen(false)
            setIsClosing(false)
        }, 300) // Match animation duration
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }

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
                        <div
                            className="relative w-full h-full cursor-pointer group"
                            onClick={() => openFullscreen(index)}
                        >
                            <Image
                                src={image}
                                alt={`${title} screenshot ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
                                className="object-contain transition-transform duration-300 group-hover:scale-105"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white/0 group-hover:text-white/80 text-sm font-medium transition-all duration-300">
                                    Click to view fullscreen
                                </span>
                            </div>
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

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div
                    className={`fixed inset-0 z-50 bg-black/95 flex items-center justify-center transition-opacity duration-300 ${isClosing ? 'animate-out fade-out' : 'animate-in fade-in'
                        }`}
                    onClick={closeFullscreen}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeFullscreen}
                        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors animate-in fade-in slide-in-from-top-2 duration-300 delay-100"
                        aria-label="Close fullscreen"
                    >
                        <X className="w-6 h-6 text-white" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 z-50 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 delay-100">
                        {currentIndex + 1} / {images.length}
                    </div>

                    {/* Previous Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            goToPrevious()
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 animate-in fade-in slide-in-from-left-2 duration-300 delay-150"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-8 h-8 text-white" />
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            goToNext()
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all hover:scale-110 animate-in fade-in slide-in-from-right-2 duration-300 delay-150"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-8 h-8 text-white" />
                    </button>

                    {/* Image Container */}
                    <div
                        className={`relative w-[90vw] h-[90vh] flex items-center justify-center duration-300 ${isClosing ? 'animate-out zoom-out-95 fade-out' : 'animate-in zoom-in-95 fade-in'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} screenshot ${currentIndex + 1}`}
                            fill
                            sizes="90vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}

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
