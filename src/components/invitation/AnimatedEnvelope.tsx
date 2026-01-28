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
        <div className="relative w-full max-w-[300px] mx-auto py-6">
            {/* Container for the whole envelope system */}
            <div className="relative" style={{ perspective: '1200px' }}>

                {/* ====== CARDS THAT EMERGE (Only visible when open) ====== */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Decorative floral accent - Left */}
                            <motion.div
                                className="absolute -left-4 top-0 w-12 h-24 pointer-events-none"
                                initial={{ opacity: 0, y: 40, rotate: -15 }}
                                animate={{ opacity: 0.5, y: -100, rotate: -8 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                                style={{ zIndex: 5 }}
                            >
                                <svg viewBox="0 0 40 80" className="w-full h-full text-[#9AAE8A]">
                                    <path d="M20 80 Q 8 55 12 30 Q 16 10 20 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    <ellipse cx="10" cy="40" rx="6" ry="3.5" fill="currentColor" opacity="0.5" transform="rotate(-15 10 40)" />
                                    <ellipse cx="16" cy="22" rx="5" ry="3" fill="currentColor" opacity="0.4" transform="rotate(-10 16 22)" />
                                </svg>
                            </motion.div>

                            {/* Decorative floral accent - Right */}
                            <motion.div
                                className="absolute -right-4 top-0 w-12 h-24 pointer-events-none"
                                initial={{ opacity: 0, y: 40, rotate: 15 }}
                                animate={{ opacity: 0.5, y: -100, rotate: 8 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.6, duration: 0.9, ease: "easeOut" }}
                                style={{ zIndex: 5 }}
                            >
                                <svg viewBox="0 0 40 80" className="w-full h-full text-[#9AAE8A]">
                                    <path d="M20 80 Q 32 55 28 30 Q 24 10 20 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
                                    <ellipse cx="30" cy="40" rx="6" ry="3.5" fill="currentColor" opacity="0.5" transform="rotate(15 30 40)" />
                                    <ellipse cx="24" cy="22" rx="5" ry="3" fill="currentColor" opacity="0.4" transform="rotate(10 24 22)" />
                                </svg>
                            </motion.div>

                            {/* Photo Card (Behind - Polaroid style) */}
                            <motion.div
                                className="absolute left-1/2 w-[65%] bg-white shadow-xl"
                                style={{
                                    zIndex: 8,
                                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                                }}
                                initial={{ x: '-50%', y: 0, opacity: 0, rotate: -6 }}
                                animate={{ x: '-55%', y: -190, opacity: 1, rotate: -8 }}
                                exit={{ y: 0, opacity: 0 }}
                                transition={{ delay: 0.35, duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
                            >
                                <div className="p-2">
                                    <div className="w-full aspect-[4/3] bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200 flex items-center justify-center rounded-sm overflow-hidden">
                                        <span className="text-stone-300 text-xs font-light">📷</span>
                                    </div>
                                    <p className="mt-1.5 text-center text-[9px] text-stone-400 font-serif italic">
                                        Nuestro día especial
                                    </p>
                                </div>
                            </motion.div>

                            {/* Main Invitation Card (Arched top) */}
                            <motion.div
                                className="absolute left-1/2 w-[80%] bg-[#FEFCF9] overflow-hidden"
                                style={{
                                    zIndex: 12,
                                    borderRadius: '70px 70px 6px 6px',
                                    boxShadow: '0 10px 35px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
                                    border: '1px solid rgba(200, 190, 175, 0.4)',
                                }}
                                initial={{ x: '-50%', y: 0, opacity: 0 }}
                                animate={{ x: '-50%', y: -155, opacity: 1 }}
                                exit={{ y: 0, opacity: 0 }}
                                transition={{ delay: 0.45, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
                            >
                                <div className="px-5 py-6 pt-7 text-center space-y-2.5">
                                    <p className="text-[8px] uppercase tracking-[0.3em] text-[#8BA078] font-medium">
                                        Pase reservado para
                                    </p>
                                    <h3 className="text-lg font-serif font-semibold text-stone-800 leading-snug">
                                        {guestName}
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 py-1">
                                        <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
                                        <span className="text-[#C9A962] text-[10px]">✦</span>
                                        <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#C9A962] to-transparent" />
                                    </div>
                                    <p className="text-xs text-stone-500 font-medium">
                                        {numberOfGuests} {numberOfGuests === 1 ? 'persona' : 'personas'}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Small Front Tag */}
                            <motion.div
                                className="absolute left-1/2 bg-white/95 backdrop-blur-sm rounded-md px-3 py-1.5"
                                style={{
                                    zIndex: 18,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                }}
                                initial={{ x: '-50%', y: 0, opacity: 0, scale: 0.9 }}
                                animate={{ x: '-50%', y: -60, opacity: 1, scale: 1 }}
                                exit={{ y: 0, opacity: 0 }}
                                transition={{ delay: 0.65, duration: 0.5, ease: "backOut" }}
                            >
                                <p className="text-[9px] text-stone-500 text-center whitespace-nowrap">
                                    ↓ Desliza para ver detalles
                                </p>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* ====== THE ENVELOPE ====== */}
                <motion.div
                    className="relative w-full aspect-[4/3] cursor-pointer"
                    onClick={handleOpen}
                    whileHover={{ scale: isOpen ? 1 : 1.02 }}
                    whileTap={{ scale: isOpen ? 1 : 0.98 }}
                >
                    {/* Envelope Back */}
                    <div
                        className="absolute inset-0 rounded-lg overflow-hidden"
                        style={{
                            backgroundColor: 'var(--sage-green, #8BA078)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div className="absolute inset-1.5 rounded bg-black/[0.04]" />
                    </div>

                    {/* Envelope Pocket (V Shape) */}
                    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
                        <svg className="absolute bottom-0 left-0 w-full h-[65%]" viewBox="0 0 100 65" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="pocketGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="var(--sage-green, #8BA078)" />
                                    <stop offset="100%" stopColor="var(--sage-green, #8BA078)" stopOpacity="0.95" />
                                </linearGradient>
                            </defs>
                            <path d="M0,0 L50,45 L100,0 L100,65 L0,65 Z" fill="url(#pocketGradient)" />
                            <path d="M0,0 L50,45 L100,0" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="0.4" />
                        </svg>
                    </div>

                    {/* Envelope Flap */}
                    <motion.div
                        className="absolute top-0 left-0 w-full h-[52%] origin-top"
                        style={{ zIndex: 35, transformStyle: 'preserve-3d' }}
                        animate={{ rotateX: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {/* Front of flap */}
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                                backgroundColor: 'var(--sage-green, #8BA078)',
                                filter: 'brightness(1.04)',
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            {/* Wax Seal */}
                            <AnimatePresence>
                                {!isOpen && (
                                    <motion.div
                                        className="absolute top-[72%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        initial={{ scale: 1, rotate: 0 }}
                                        exit={{ scale: 0, rotate: 15, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center"
                                            style={{
                                                background: 'radial-gradient(circle at 30% 30%, #E4C374 0%, #C9A962 40%, #A8863A 100%)',
                                                boxShadow: '0 3px 10px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.25), inset 0 -1px 2px rgba(0,0,0,0.15)',
                                            }}
                                        >
                                            <span
                                                className="font-serif text-white font-bold text-xs"
                                                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                                            >
                                                C&C
                                            </span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        {/* Back of flap */}
                        <div
                            className="absolute inset-0"
                            style={{
                                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                                backgroundColor: 'var(--sage-green, #8BA078)',
                                filter: 'brightness(0.9)',
                                transform: 'rotateY(180deg)',
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Tap Hint */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.p
                            className="text-center mt-5 text-stone-400 text-[11px] tracking-wide"
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="font-serif italic">Toca para abrir</span>
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
