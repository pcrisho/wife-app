'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element
        const audio = new Audio('/track/Somos Novios.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        setHasInteracted(true);

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.log('Autoplay prevented:', error);
            }
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={togglePlay}
                className={`music-player-btn ${isPlaying ? 'playing' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
                aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.svg
                            key="playing"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <path d="M9 4H7a1 1 0 00-1 1v14a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1zM17 4h-2a1 1 0 00-1 1v14a1 1 0 001 1h2a1 1 0 001-1V5a1 1 0 00-1-1z" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="paused"
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Initial prompt */}
            <AnimatePresence>
                {!hasInteracted && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ delay: 2.5, duration: 0.5 }}
                        className="fixed bottom-20 right-4 z-40 max-w-[180px]"
                    >
                        <div
                            className="px-4 py-2 rounded-xl shadow-lg text-sm text-center"
                            style={{
                                backgroundColor: 'white',
                                color: 'var(--charcoal)'
                            }}
                        >
                            <p>🎵 Toca para reproducir música</p>
                        </div>
                        {/* Arrow pointing to button */}
                        <div
                            className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
                            style={{ backgroundColor: 'white' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
