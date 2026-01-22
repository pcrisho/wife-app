'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
    imageUrl?: string;
}

export default function HeroSection({ imageUrl }: HeroSectionProps) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt="Christy & Cristian"
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    /* Placeholder gradient background */
                    <div
                        className="w-full h-full"
                        style={{
                            background: 'linear-gradient(180deg, var(--warm-beige) 0%, var(--cream) 50%, var(--blush) 100%)',
                        }}
                    />
                )}
                {/* Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, rgba(253, 248, 243, 0.3) 0%, rgba(253, 248, 243, 0.7) 100%)',
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="space-y-6"
                >
                    {/* Pre-title */}
                    <motion.p
                        className="text-sm uppercase tracking-[0.3em] font-light"
                        style={{ color: 'var(--soft-gray)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Nuestra Boda
                    </motion.p>

                    {/* Main Title - Couple Names */}
                    <motion.h1
                        className="heading-script text-5xl md:text-7xl lg:text-8xl"
                        style={{ color: 'var(--charcoal)' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                    >
                        Christy{' '}
                        <span
                            className="inline-block mx-2"
                            style={{ color: 'var(--gold)' }}
                        >
                            &
                        </span>{' '}
                        Cristian
                    </motion.h1>

                    {/* Date */}
                    <motion.p
                        className="font-serif text-lg md:text-xl tracking-wide"
                        style={{ color: 'var(--text-light)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        7 de Marzo de 2026
                    </motion.p>

                    {/* Decorative Element */}
                    <motion.div
                        className="flex items-center justify-center gap-3 pt-4"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.6 }}
                    >
                        <div
                            className="w-16 h-px"
                            style={{ backgroundColor: 'var(--sage-light)' }}
                        />
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ color: 'var(--sage-green)' }}
                        >
                            <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="currentColor"
                            />
                        </svg>
                        <div
                            className="w-16 h-px"
                            style={{ backgroundColor: 'var(--sage-light)' }}
                        />
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        opacity: { delay: 1.5, duration: 0.5 },
                        y: { delay: 1.5, duration: 1.5, repeat: Infinity }
                    }}
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        style={{ color: 'var(--soft-gray)' }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
