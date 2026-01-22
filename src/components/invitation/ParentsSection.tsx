'use client';

import { motion } from 'framer-motion';
import { WEDDING_INFO } from '@/types';

export default function ParentsSection() {
    const { parents } = WEDDING_INFO;

    return (
        <section
            className="section"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <div className="max-w-lg mx-auto text-center">
                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p
                        className="font-serif text-lg md:text-xl leading-relaxed italic"
                        style={{ color: 'var(--text-light)' }}
                    >
                        "Dios nos ha concedido el privilegio de conocernos y amarnos.
                        Y hoy con su bendición y la de nuestros padres queremos unir
                        nuestras vidas para siempre."
                    </p>
                </motion.div>

                {/* Decorative divider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-10"
                >
                    <svg
                        className="w-16 h-16"
                        viewBox="0 0 64 64"
                        fill="none"
                        style={{ color: 'var(--sage-light)' }}
                    >
                        <path
                            d="M32 8C20 8 16 20 16 28c0 12 16 28 16 28s16-16 16-28c0-8-4-20-16-20z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <path
                            d="M32 8c12 0 16 12 16 20 0 12-16 28-16 28"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                        />
                        <circle cx="26" cy="22" r="2" fill="var(--blush)" />
                        <circle cx="38" cy="22" r="2" fill="var(--blush)" />
                        <circle cx="32" cy="30" r="2" fill="var(--gold)" />
                    </svg>
                </motion.div>

                {/* Parents Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                    {/* Groom's Parents */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-center"
                    >
                        <h3
                            className="heading-script text-2xl mb-4"
                            style={{ color: 'var(--sage-dark)' }}
                        >
                            Padres del Novio
                        </h3>
                        <div className="space-y-1">
                            <p
                                className="font-serif text-lg"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                {parents.groom.father}
                            </p>
                            <p
                                className="font-serif text-lg"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                {parents.groom.mother}
                            </p>
                        </div>
                    </motion.div>

                    {/* Bride's Parents */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-center"
                    >
                        <h3
                            className="heading-script text-2xl mb-4"
                            style={{ color: 'var(--sage-dark)' }}
                        >
                            Padres de la Novia
                        </h3>
                        <div className="space-y-1">
                            <p
                                className="font-serif text-lg"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                {parents.bride.father}
                            </p>
                            <p
                                className="font-serif text-lg"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                {parents.bride.mother}
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Closing message */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-10 heading-script text-xl"
                    style={{ color: 'var(--sage-green)' }}
                >
                    Los invitamos a acompañarnos en este día tan especial
                </motion.p>
            </div>
        </section>
    );
}
