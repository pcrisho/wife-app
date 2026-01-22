'use client';

import { motion } from 'framer-motion';

export default function DressCode() {
    return (
        <section
            className="section"
            style={{ backgroundColor: 'var(--cream)' }}
        >
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
                        Código de Vestimenta
                    </h2>
                    <div className="floral-divider">
                        <span style={{ color: 'var(--gold)' }}>✦</span>
                    </div>
                </motion.div>

                {/* Dress Code Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="card"
                >
                    <div
                        className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--warm-beige)' }}
                    >
                        <svg
                            className="w-8 h-8"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ color: 'var(--sage-dark)' }}
                        >
                            <path
                                d="M12 2L8 6H4v4l-2 2 2 2v4h4l4 4 4-4h4v-4l2-2-2-2V6h-4l-4-4z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h3
                        className="font-serif text-2xl mb-4"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Formal / Elegante
                    </h3>

                    <p
                        className="text-sm mb-6 leading-relaxed"
                        style={{ color: 'var(--text-light)' }}
                    >
                        Te invitamos a vestir de manera formal y elegante para acompañarnos
                        en esta ocasión tan especial.
                    </p>

                    {/* Color Palette Suggestion */}
                    <div className="mb-6">
                        <p
                            className="text-xs uppercase tracking-wider mb-3"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            Paleta sugerida
                        </p>
                        <div className="flex justify-center gap-3">
                            {[
                                { color: '#9CAF88', name: 'Verde' },
                                { color: '#C9A962', name: 'Dorado' },
                                { color: '#E8D5D5', name: 'Rosa' },
                                { color: '#3D3D3D', name: 'Negro' },
                                { color: '#F5EDE4', name: 'Beige' },
                            ].map((item) => (
                                <div key={item.color} className="text-center">
                                    <div
                                        className="w-8 h-8 rounded-full mx-auto shadow-sm border border-white"
                                        style={{ backgroundColor: item.color }}
                                    />
                                    <span
                                        className="text-xs mt-1 block"
                                        style={{ color: 'var(--soft-gray)' }}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Important Note */}
                    <div
                        className="p-4 rounded-xl"
                        style={{ backgroundColor: 'var(--cream)' }}
                    >
                        <p
                            className="text-sm"
                            style={{ color: 'var(--text-light)' }}
                        >
                            <span style={{ color: 'var(--gold)' }}>💡</span>{' '}
                            Por favor evitar el color blanco, reservado para la novia.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
