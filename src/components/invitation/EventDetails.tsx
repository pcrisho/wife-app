'use client';

import { motion } from 'framer-motion';
import { WEDDING_INFO } from '@/types';

export default function EventDetails() {
    const { venue, date } = WEDDING_INFO;

    const formattedDate = new Intl.DateTimeFormat('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat('es-PE', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date);

    return (
        <section
            className="section"
            style={{ backgroundColor: 'white' }}
        >
            <div className="max-w-lg mx-auto">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10"
                >
                    <h2
                        className="heading-script text-3xl md:text-4xl mb-2"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Detalles del Evento
                    </h2>
                    <div className="floral-divider">
                        <span style={{ color: 'var(--gold)' }}>✦</span>
                    </div>
                </motion.div>

                {/* Event Cards */}
                <div className="space-y-6">
                    {/* Date & Time Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="card text-center"
                    >
                        <div
                            className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--sage-light)' }}
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ color: 'var(--sage-dark)' }}
                            >
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
                                <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h3
                            className="font-serif text-xl mb-2 capitalize"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            {formattedDate}
                        </h3>
                        <p
                            className="text-lg"
                            style={{ color: 'var(--sage-green)' }}
                        >
                            {formattedTime}
                        </p>
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="card text-center"
                    >
                        <div
                            className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--sage-light)' }}
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ color: 'var(--sage-dark)' }}
                            >
                                <path
                                    d="M12 21C12 21 5 13.5 5 9a7 7 0 1114 0c0 4.5-7 12-7 12z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                        <h3
                            className="font-serif text-xl mb-2"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            {venue.name}
                        </h3>
                        <p
                            className="text-sm mb-4"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            {venue.address}
                        </p>

                        {/* Google Maps Embed */}
                        <div className="rounded-xl overflow-hidden shadow-inner mb-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.6089!2d-76.9375!3d-12.2125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDEyJzQ1LjAiUyA3NsKwNTYnMTUuMCJX!5e0!3m2!1ses!2spe!4v1"
                                width="100%"
                                height="200"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>

                        {/* Maps Button */}
                        <a
                            href={venue.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M12 21C12 21 5 13.5 5 9a7 7 0 1114 0c0 4.5-7 12-7 12z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                            </svg>
                            Cómo llegar
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
