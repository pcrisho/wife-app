'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PhotoGalleryProps {
    images?: string[];
}

// Wedding photos
const WEDDING_IMAGES = [
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM.jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (1).jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (2).jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (3).jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (4).jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (5).jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (6).jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.41 PM.jpeg',
    '/images/WhatsApp Image 2026-01-27 at 11.27.41 PM (1).jpeg',
];

export default function PhotoGallery({ images = WEDDING_IMAGES }: PhotoGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    };

    return (
        <section
            className="section overflow-hidden !p-0 md:!py-20"
            style={{ backgroundColor: 'var(--warm-beige)' }}
        >
            <div className="w-full">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 px-6 pt-12 md:pt-0"
                >
                    <h2
                        className="heading-script text-3xl md:text-5xl mb-2"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Nuestra Historia
                    </h2>
                    <div className="floral-divider">
                        <span style={{ color: 'var(--gold)' }}>✦</span>
                    </div>
                </motion.div>

                {/* Carousel */}
                <div className="relative w-full aspect-square md:aspect-video md:max-w-5xl md:mx-auto md:rounded-2xl shadow-xl overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: 'spring', stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        >
                            <div
                                className="w-full h-full bg-neutral-200"
                            >
                                <Image
                                    src={images[currentIndex]}
                                    alt={`Foto ${currentIndex + 1} de Christy & Cristian`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 1200px"
                                    priority={currentIndex === 0}
                                />
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--charcoal)' }}>
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--charcoal)' }}>
                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8 pb-12 md:pb-0">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentIndex ? 1 : -1);
                                setCurrentIndex(index);
                            }}
                            className="w-2 h-2 rounded-full transition-all duration-300"
                            style={{
                                backgroundColor: index === currentIndex ? 'var(--sage-green)' : 'var(--sage-light)',
                                transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>

                {/* Swipe hint */}
                <p
                    className="text-center text-sm mt-4"
                    style={{ color: 'var(--soft-gray)' }}
                >
                    Desliza para ver más fotos
                </p>
            </div>
        </section>
    );
}
