'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PhotoGalleryProps {
    images?: string[];
}

// Placeholder images for demo
const PLACEHOLDER_IMAGES = [
    '/images/couple-1.jpg',
    '/images/couple-2.jpg',
    '/images/couple-3.jpg',
];

export default function PhotoGallery({ images = PLACEHOLDER_IMAGES }: PhotoGalleryProps) {
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
            className="section overflow-hidden"
            style={{ backgroundColor: 'var(--warm-beige)' }}
        >
            <div className="max-w-lg mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2
                        className="heading-script text-3xl md:text-4xl mb-2"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Nuestra Historia
                    </h2>
                    <div className="floral-divider">
                        <span style={{ color: 'var(--gold)' }}>✦</span>
                    </div>
                </motion.div>

                {/* Carousel */}
                <div className="relative aspect-[3/4] max-w-sm mx-auto">
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
                                className="w-full h-full rounded-2xl overflow-hidden shadow-xl"
                                style={{ backgroundColor: 'var(--sage-light)' }}
                            >
                                {/* Placeholder for demo - replace with actual Image component */}
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center p-8">
                                        <div
                                            className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--sage-green)' }}
                                        >
                                            <span className="text-white text-3xl font-script">
                                                C&C
                                            </span>
                                        </div>
                                        <p
                                            className="font-serif text-lg"
                                            style={{ color: 'var(--charcoal)' }}
                                        >
                                            Foto {currentIndex + 1}
                                        </p>
                                        <p
                                            className="text-sm mt-2"
                                            style={{ color: 'var(--soft-gray)' }}
                                        >
                                            Agrega tus fotos en<br />/public/images/
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                        style={{ backgroundColor: 'white' }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--charcoal)' }}>
                            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                        style={{ backgroundColor: 'white' }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--charcoal)' }}>
                            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
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
