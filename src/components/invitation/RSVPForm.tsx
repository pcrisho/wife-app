'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { RSVPFormData } from '@/types';

interface RSVPFormProps {
    guestCode: string;
    guestName: string;
    initialConfirmed?: boolean;
    initialWillAttend?: boolean | null;
}

export default function RSVPForm({
    guestCode,
    guestName,
    initialConfirmed = false,
    initialWillAttend = null,
}: RSVPFormProps) {
    const [willAttend, setWillAttend] = useState<boolean | null>(initialWillAttend);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(initialConfirmed);
    const [error, setError] = useState<string | null>(null);

    const fireConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#9CAF88', '#C9A962', '#E8D5D5', '#B8C9A3', '#FDF8F3'],
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    };

    const handleSubmit = async (attending: boolean) => {
        setIsSubmitting(true);
        setError(null);
        setWillAttend(attending);

        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: guestCode,
                    willAttend: attending,
                    message: message.trim() || null,
                } as RSVPFormData & { code: string }),
            });

            if (!response.ok) {
                throw new Error('Error al confirmar asistencia');
            }

            setIsSubmitted(true);

            if (attending) {
                fireConfetti();
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            className="section"
            style={{ backgroundColor: 'var(--warm-beige)' }}
        >
            <div className="max-w-md mx-auto">
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
                        Confirma tu Asistencia
                    </h2>
                    <div className="floral-divider">
                        <span style={{ color: 'var(--gold)' }}>✦</span>
                    </div>
                    <p
                        className="font-serif text-lg mt-4"
                        style={{ color: 'var(--text-light)' }}
                    >
                        {guestName}, esperamos contar con tu presencia
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        /* Success State */
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="card text-center py-8"
                        >
                            <div
                                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                style={{
                                    backgroundColor: willAttend ? 'var(--sage-light)' : 'var(--blush)',
                                }}
                            >
                                {willAttend ? (
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--sage-dark)' }}>
                                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--soft-gray)' }}>
                                        <path d="M12 8v4m0 4h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                )}
                            </div>

                            <h3
                                className="font-serif text-xl mb-2"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                {willAttend ? '¡Gracias por confirmar!' : 'Lamentamos que no puedas asistir'}
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: 'var(--soft-gray)' }}
                            >
                                {willAttend
                                    ? 'Te esperamos con mucha ilusión el 7 de Marzo'
                                    : 'Gracias por avisarnos. Te tendremos presente.'}
                            </p>
                        </motion.div>
                    ) : (
                        /* Form */
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="card"
                        >
                            {/* Message Input */}
                            <div className="mb-6">
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: 'var(--charcoal)' }}
                                >
                                    Déjanos un mensaje (opcional)
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Escribe tus felicitaciones o algún mensaje especial..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: 'var(--sage-light)',
                                        backgroundColor: 'var(--cream)',
                                    }}
                                    disabled={isSubmitting}
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 text-sm text-center mb-4"
                                >
                                    {error}
                                </motion.p>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => handleSubmit(true)}
                                    disabled={isSubmitting}
                                    className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting && willAttend === true ? (
                                        <span className="animate-spin">⏳</span>
                                    ) : (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    Confirmo Asistencia
                                </button>

                                <button
                                    onClick={() => handleSubmit(false)}
                                    disabled={isSubmitting}
                                    className="flex-1 btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting && willAttend === false ? (
                                        <span className="animate-spin">⏳</span>
                                    ) : (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    No podré asistir
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
