'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getTimeRemaining } from '@/lib/utils';

interface CountdownTimerProps {
    targetDate: Date;
}

interface TimeUnit {
    value: number;
    label: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(targetDate));
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            setTimeRemaining(getTimeRemaining(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!mounted) {
        return (
            <section className="section bg-white">
                <div className="max-w-md mx-auto text-center">
                    <p className="text-sm uppercase tracking-[0.2em]" style={{ color: 'var(--soft-gray)' }}>
                        Cargando...
                    </p>
                </div>
            </section>
        );
    }

    const timeUnits: TimeUnit[] = [
        { value: timeRemaining.days, label: 'Días' },
        { value: timeRemaining.hours, label: 'Horas' },
        { value: timeRemaining.minutes, label: 'Minutos' },
        { value: timeRemaining.seconds, label: 'Segundos' },
    ];

    return (
        <section className="section" style={{ backgroundColor: 'white' }}>
            <div className="max-w-lg mx-auto text-center">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h2
                        className="heading-script text-3xl md:text-4xl mb-2"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Faltan
                    </h2>
                    <div className="floral-divider">
                        <span
                            className="text-lg"
                            style={{ color: 'var(--gold)' }}
                        >
                            ✦
                        </span>
                    </div>
                </motion.div>

                {/* Countdown Grid */}
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                    {timeUnits.map((unit, index) => (
                        <motion.div
                            key={unit.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative"
                        >
                            {/* Number Card */}
                            <div
                                className="rounded-xl p-4 md:p-6 shadow-sm"
                                style={{
                                    backgroundColor: 'var(--cream)',
                                    border: '1px solid var(--sage-light)'
                                }}
                            >
                                <motion.span
                                    key={unit.value}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="block text-3xl md:text-5xl font-serif font-light"
                                    style={{ color: 'var(--charcoal)' }}
                                >
                                    {String(unit.value).padStart(2, '0')}
                                </motion.span>
                            </div>

                            {/* Label */}
                            <p
                                className="mt-2 text-xs md:text-sm uppercase tracking-wider"
                                style={{ color: 'var(--soft-gray)' }}
                            >
                                {unit.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Event Date */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 font-serif text-lg"
                    style={{ color: 'var(--text-light)' }}
                >
                    7 de Marzo de 2026
                </motion.p>
            </div>
        </section>
    );
}
