'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface AnimatedEnvelopeProps {
    guestName: string;
    numberOfGuests: number;
    onOpen?: () => void;
}

export default function AnimatedEnvelope({
    guestName,
    numberOfGuests,
    onOpen,
}: AnimatedEnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen?.();
        }
    };

    const scrollToDetails = () => {
        const detailsSection = document.getElementById('event-details');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full max-w-sm mx-auto py-8" style={{ perspective: '1000px' }}>
            {/* Decorative Flowers - Left (Eucalipto) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute -left-4 md:-left-8 top-0 w-20 md:w-28 z-30 pointer-events-none"
                        initial={{ opacity: 0, x: 30, rotate: 15 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                    >
                        <Image
                            src="/images/flowers/Gemini_Generated_Image_vgflc5vgflc5vgfl (1).png"
                            alt="Eucalipto decorativo"
                            width={120}
                            height={200}
                            className="object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Flowers - Right (Lavanda) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute -right-4 md:-right-8 top-0 w-16 md:w-24 z-30 pointer-events-none"
                        initial={{ opacity: 0, x: -30, rotate: -15 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    >
                        <Image
                            src="/images/flowers/Gemini_Generated_Image_j6ofjhj6ofjhj6of (1).png"
                            alt="Lavanda decorativa"
                            width={100}
                            height={200}
                            className="object-contain"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Photo Polaroid - emerges from envelope */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute right-2 md:right-4 -top-4 z-40"
                        initial={{ opacity: 0, y: 80, rotate: 0, scale: 0.5 }}
                        animate={{ opacity: 1, y: -20, rotate: 8, scale: 1 }}
                        exit={{ opacity: 0, y: 80, scale: 0.5 }}
                        transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
                    >
                        <div
                            className="bg-white p-2 shadow-xl"
                            style={{
                                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            }}
                        >
                            <div className="w-24 h-20 md:w-28 md:h-24 relative overflow-hidden">
                                <Image
                                    src="/images/WhatsApp Image 2026-01-27 at 11.27.40 PM (2).jpeg"
                                    alt="Christy & Cristian"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <p
                                className="text-center text-xs mt-1 font-serif"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                C & C
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Envelope Container */}
            <motion.div
                className="relative cursor-pointer overflow-visible"
                onClick={handleOpen}
                whileHover={{ scale: isOpen ? 1 : 1.02 }}
                whileTap={{ scale: isOpen ? 1 : 0.98 }}
            >
                {/* Envelope Body */}
                <div className="relative">
                    {/* Back of envelope */}
                    <div
                        className="w-full aspect-[4/3] rounded-lg shadow-xl"
                        style={{ backgroundColor: 'var(--sage-green)' }}
                    />

                    {/* Envelope Flap (Top Triangle) */}
                    <motion.div
                        className="absolute top-0 left-0 w-full origin-top"
                        style={{
                            transformStyle: 'preserve-3d',
                            zIndex: isOpen ? -1 : 10,
                        }}
                        animate={{
                            rotateX: isOpen ? -180 : 0,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        {/* Front of flap */}
                        <div
                            className="w-full aspect-[4/2] clip-triangle-down"
                            style={{
                                backgroundColor: 'var(--sage-green)',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                backfaceVisibility: 'hidden',
                            }}
                        />
                        {/* Back of flap (lighter color) */}
                        <div
                            className="absolute top-0 left-0 w-full aspect-[4/2]"
                            style={{
                                backgroundColor: 'var(--sage-light)',
                                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                transform: 'rotateX(180deg)',
                                backfaceVisibility: 'hidden',
                            }}
                        />
                    </motion.div>

                    {/* Gold Seal */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                initial={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                                    style={{
                                        backgroundColor: 'var(--gold)',
                                        boxShadow: '0 4px 15px rgba(201, 169, 98, 0.4)'
                                    }}
                                >
                                    <span className="text-white text-xl font-serif">C&C</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Front pocket of envelope */}
                    <div
                        className="absolute bottom-0 left-0 w-full aspect-[4/2] rounded-b-lg"
                        style={{
                            backgroundColor: 'var(--sage-green)',
                            clipPath: 'polygon(0 100%, 50% 30%, 100% 100%)',
                        }}
                    />

                    {/* Side flaps */}
                    <div
                        className="absolute bottom-0 left-0 w-1/2 aspect-[2/3]"
                        style={{
                            backgroundColor: '#8BA078',
                            clipPath: 'polygon(0 100%, 0 20%, 100% 100%)',
                        }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-1/2 aspect-[2/3]"
                        style={{
                            backgroundColor: '#8BA078',
                            clipPath: 'polygon(100% 100%, 100% 20%, 0 100%)',
                        }}
                    />
                </div>

                {/* Main Invitation Card (appears when open) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-lg shadow-2xl p-5 z-20"
                            style={{ bottom: '30%' }}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{
                                delay: 0.5,
                                duration: 0.6,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            <div className="text-center space-y-2">
                                <p
                                    className="text-xs uppercase tracking-[0.15em]"
                                    style={{ color: 'var(--soft-gray)' }}
                                >
                                    Pase reservado para
                                </p>
                                <h3
                                    className="text-xl font-serif font-semibold"
                                    style={{ color: 'var(--charcoal)' }}
                                >
                                    {guestName}
                                </h3>
                                <div
                                    className="text-sm"
                                    style={{ color: 'var(--sage-dark)' }}
                                >
                                    {numberOfGuests} {numberOfGuests === 1 ? 'persona' : 'personas'}
                                </div>

                                {/* Decorative divider */}
                                <div className="flex items-center justify-center gap-2 py-1">
                                    <div className="w-8 h-px" style={{ backgroundColor: 'var(--sage-light)' }} />
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: 'var(--gold)' }}
                                    />
                                    <div className="w-8 h-px" style={{ backgroundColor: 'var(--sage-light)' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Secondary Card - "Ver más detalles" with scroll */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.button
                            className="absolute left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-2 z-20 cursor-pointer hover:shadow-xl transition-shadow"
                            style={{ bottom: '-20px' }}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            transition={{
                                delay: 0.9,
                                duration: 0.5,
                                ease: 'easeOut',
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                scrollToDetails();
                            }}
                        >
                            <p
                                className="text-xs"
                                style={{ color: 'var(--soft-gray)' }}
                            >
                                Clic aquí para ver
                            </p>
                            <p
                                className="text-sm font-medium"
                                style={{ color: 'var(--sage-dark)' }}
                            >
                                más detalles
                            </p>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Tap hint */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.p
                        className="text-center mt-6 text-sm animate-pulse-soft"
                        style={{ color: 'var(--soft-gray)' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        Toca para abrir
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Couple Names below envelope */}
            <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <h2
                    className="heading-script text-3xl"
                    style={{ color: 'var(--charcoal)' }}
                >
                    Christy{' '}
                    <span style={{ color: 'var(--gold)' }}>&</span>{' '}
                    Cristian
                </h2>
            </motion.div>
        </div>
    );
}
