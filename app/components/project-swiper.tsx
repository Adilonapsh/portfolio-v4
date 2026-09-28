'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

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
    const [zoom, setZoom] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const imageRef = useRef<HTMLDivElement>(null)
    const lastTouchDistance = useRef<number | null>(null)

    const resetZoom = useCallback(() => {
        setZoom(1)
        setPosition({ x: 0, y: 0 })
    }, [])

    // Handle keyboard navigation and ESC to close
    useEffect(() => {
        if (!isFullscreen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (zoom > 1) resetZoom()
                else setIsFullscreen(false)
            } else if (e.key === 'ArrowLeft') {
                resetZoom()
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
            } else if (e.key === 'ArrowRight') {
                resetZoom()
                setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
            } else if (e.key === '+' || e.key === '=') {
                setZoom((prev) => Math.min(prev + 0.5, 4))
            } else if (e.key === '-' || e.key === '_') {
                setZoom((prev) => {
                    const next = Math.max(prev - 0.5, 1)
                    if (next === 1) setPosition({ x: 0, y: 0 })
                    return next
                })
            } else if (e.key === '0') {
                resetZoom()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isFullscreen, images.length, zoom, resetZoom])

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
        resetZoom()
        setIsFullscreen(true)
    }

    const closeFullscreen = () => {
        setIsClosing(true)
        setTimeout(() => {
            setIsFullscreen(false)
            setIsClosing(false)
            resetZoom()
        }, 300) // Match animation duration
    }

    const goToPrevious = () => {
        resetZoom()
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    }

    const goToNext = () => {
        resetZoom()
        setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    }

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.2 : 0.2
        setZoom((prev) => {
            const next = Math.min(Math.max(prev + delta, 1), 4)
            if (next === 1) setPosition({ x: 0, y: 0 })
            return next
        })
    }

    const handleDoubleClick = () => {
        if (zoom === 1) {
            setZoom(2.5)
        } else {
            resetZoom()
        }
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoom === 1) return
        setIsDragging(true)
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || zoom === 1) return
        setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y })
    }

    const handleMouseUp = () => setIsDragging(false)

    const getTouchDistance = (touches: React.TouchList) => {
        const [a, b] = [touches[0], touches[1]]
        return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 2) {
            lastTouchDistance.current = getTouchDistance(e.touches)
        } else if (e.touches.length === 1 && zoom > 1) {
            setIsDragging(true)
            setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y })
        }
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 2 && lastTouchDistance.current !== null) {
            e.preventDefault()
            const dist = getTouchDistance(e.touches)
            const delta = (dist - lastTouchDistance.current) * 0.01
            setZoom((prev) => {
                const next = Math.min(Math.max(prev + delta, 1), 4)
                if (next === 1) setPosition({ x: 0, y: 0 })
                return next
            })
            lastTouchDistance.current = dist
        } else if (e.touches.length === 1 && isDragging && zoom > 1) {
            setPosition({ x: e.touches[0].clientX - dragStart.x, y: e.touches[0].clientY - dragStart.y })
        }
    }

    const handleTouchEnd = () => {
        lastTouchDistance.current = null
        setIsDragging(false)
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

                    {/* Image Container - Zoomable */}
                    <div
                        ref={imageRef}
                        className={`relative w-[90vw] h-[90vh] flex items-center justify-center overflow-hidden select-none duration-300 ${isClosing ? 'animate-out zoom-out-95 fade-out' : 'animate-in zoom-in-95 fade-in'
                            } ${zoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'}`}
                        onClick={(e) => e.stopPropagation()}
                        onWheel={handleWheel}
                        onDoubleClick={handleDoubleClick}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="relative w-full h-full"
                            style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                            }}
                        >
                            <Image
                                src={images[currentIndex]}
                                alt={`${title} screenshot ${currentIndex + 1}`}
                                fill
                                sizes="90vw"
                                className="object-contain"
                                priority
                                draggable={false}
                            />
                        </div>
                        {/* Hint */}
                        {zoom === 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white/70 text-xs font-medium pointer-events-none">
                                Double click / scroll / pinch to zoom • drag when zoomed
                            </div>
                        )}
                    </div>

                    {/* Zoom Controls */}
                    <div className="absolute bottom-4 right-4 z-50 flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setZoom((prev) => Math.max(prev - 0.5, 1))
                                if (zoom - 0.5 <= 1) setPosition({ x: 0, y: 0 })
                            }}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors disabled:opacity-30"
                            aria-label="Zoom out"
                            disabled={zoom <= 1}
                        >
                            <ZoomOut className="w-5 h-5" />
                        </button>
                        <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur text-white text-xs font-bold min-w-[56px] text-center">
                            {Math.round(zoom * 100)}%
                        </span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                setZoom((prev) => Math.min(prev + 0.5, 4))
                            }}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors disabled:opacity-30"
                            aria-label="Zoom in"
                            disabled={zoom >= 4}
                        >
                            <ZoomIn className="w-5 h-5" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                resetZoom()
                            }}
                            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors"
                            aria-label="Reset zoom"
                        >
                            <Maximize2 className="w-5 h-5" />
                        </button>
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
