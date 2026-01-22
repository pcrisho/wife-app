'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div className="relative w-full max-w-xs mx-auto pt-20 pb-10 px-4 flex justify-center perspective-1000">
            <div
                className="relative w-full aspect-[4/3] cursor-pointer"
                onClick={handleOpen}
                style={{ perspective: '1000px' }}
            >
                {/* 1. Envelope Back (Inside color) */}
                <div
                    className="absolute inset-0 rounded-b-lg overflow-hidden shadow-xl"
                    style={{ backgroundColor: 'var(--sage-green)' }}
                >
                    {/* Darker inside to give depth */}
                    <div className="absolute inset-x-2 top-2 bottom-2 bg-black/10 rounded-sm" />
                </div>

                {/* 2. Invitation Card - Slides Up */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 w-[90%] bg-white rounded-lg shadow-md flex flex-col items-center justify-center p-4 text-center border border-stone-100"
                    style={{
                        top: '10%',
                        height: '85%',
                        zIndex: 10, // Between back and front pocket
                    }}
                    initial={{ y: 0 }}
                    animate={{
                        y: isOpen ? -180 : 0,
                        zIndex: isOpen ? 30 : 10 // Bring to front when fully out? keeping it 10 looks more realistic as "inside", but for readability maybe 30 after delay. Let's keep smooth movement first.
                    }}
                    transition={{
                        delay: 0.4, // Wait for flap to open
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                >
                    {/* Card Content */}
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-2 border border-stone-200 rounded p-2">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400">
                            Fuiste invitado/a
                        </p>
                        <h3 className="text-xl font-serif font-semibold text-stone-800 break-words w-full px-1">
                            {guestName}
                        </h3>
                        <div className="w-8 h-px bg-yellow-600/30 my-1" />
                        <p className="text-sm text-stone-600 font-medium">
                            {numberOfGuests} {numberOfGuests === 1 ? 'persona' : 'personas'}
                        </p>
                        {isOpen && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="text-[10px] text-stone-400 mt-2 absolute bottom-2"
                            >
                                Desliza para ver más detalles
                            </motion.p>
                        )}
                    </div>
                </motion.div>

                {/* 3. Envelope Front Pocket (The V shape) */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ zIndex: 20 }}
                >
                    <div
                        className="absolute bottom-0 left-0 w-full h-3/4 rounded-b-lg shadow-sm"
                        style={{
                            backgroundColor: 'var(--sage-green)',
                            clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' // Standard envelope pocket shape
                        }}
                    />
                    {/* Side flaps overlap fix visually if needed, but simple polygon is cleaner */}
                    <svg
                        className="absolute bottom-0 left-0 w-full h-[60%]"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,0 L50,55 L100,0 L100,100 L0,100 Z" fill="var(--sage-green)" />
                        <path d="M0,0 L50,55 L100,0" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
                    </svg>
                </div>

                {/* 4. Envelope Flap (Top Triangle) - Rotates Open */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-1/2 origin-top"
                    style={{
                        zIndex: 25,
                        transformStyle: 'preserve-3d',
                    }}
                    animate={{ rotateX: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {/* Front of flap (Closed state color) */}
                    <div
                        className="absolute inset-0 backface-hidden"
                        style={{
                            backgroundColor: 'var(--sage-green)', // Slightly lighter or same? Same usually looks coherent.
                            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                            filter: 'brightness(1.05)' // Subtle diff
                        }}
                    />

                    {/* Seal */}
                    {!isOpen && (
                        <div className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center shadow-md text-white font-serif text-xs z-30">
                            C&C
                        </div>
                    )}

                    {/* Back of flap (Open state color) - Visible when rotated */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundColor: 'var(--sage-green)',
                            clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                            transform: 'rotateY(180deg)', // Wait, for rotateX 180, we need to handle the "other side" visualization properly?
                            // Actually if we rotateX(180), the div flips. The "back" of the div is visible.
                            // Standard CSS "backface-visibility: hidden" on front means we see through?
                            // Let's just use a single div that flips.
                        }}
                    />
                </motion.div>

                {/* Tap hint */}
                {!isOpen && (
                    <div className="absolute -bottom-12 left-0 right-0 text-center">
                        <p className="text-stone-500 text-sm animate-bounce">
                            Toca el sobre para abrir
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
