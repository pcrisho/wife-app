'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

    return (
        <div className="relative w-full max-w-sm mx-auto" style={{ perspective: '1000px' }}>
            {/* Envelope Container */}
            <motion.div
                className="relative cursor-pointer"
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
                        style={{ transformStyle: 'preserve-3d' }}
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

                {/* Invitation Card (appears when open) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 w-[85%] bg-white rounded-lg shadow-2xl p-6 z-20"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: -80, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{
                                delay: 0.4,
                                duration: 0.6,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            <div className="text-center space-y-3">
                                <p
                                    className="text-sm uppercase tracking-[0.2em]"
                                    style={{ color: 'var(--soft-gray)' }}
                                >
                                    Fuiste invitado/a
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
                                <div className="flex items-center justify-center gap-2 py-2">
                                    <div className="w-8 h-px" style={{ backgroundColor: 'var(--sage-light)' }} />
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: 'var(--gold)' }}
                                    />
                                    <div className="w-8 h-px" style={{ backgroundColor: 'var(--sage-light)' }} />
                                </div>

                                <p
                                    className="text-xs"
                                    style={{ color: 'var(--soft-gray)' }}
                                >
                                    Desliza para ver más detalles
                                </p>
                            </div>
                        </motion.div>
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
        </div>
    );
}
