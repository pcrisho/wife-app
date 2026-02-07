import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { WEDDING_INFO } from '@/types';

// Components
import HeroSection from '@/components/invitation/HeroSection';
import AnimatedEnvelope from '@/components/invitation/AnimatedEnvelope';
import CountdownTimer from '@/components/invitation/CountdownTimer';
import ParentsSection from '@/components/invitation/ParentsSection';
import PhotoGallery from '@/components/invitation/PhotoGallery';
import EventDetails from '@/components/invitation/EventDetails';
import DressCode from '@/components/invitation/DressCode';
import RSVPForm from '@/components/invitation/RSVPForm';
import MusicPlayer from '@/components/invitation/MusicPlayer';

interface InvitationPageProps {
    params: Promise<{ code: string }>;
}

async function getGuest(code: string) {
    try {
        const guest = await prisma.guest.findUnique({
            where: { code },
        });
        return guest;
    } catch (error) {
        console.error('Error fetching guest:', error);
        return null;
    }
}

export async function generateMetadata({ params }: InvitationPageProps) {
    const { code } = await params;
    const guest = await getGuest(code);

    if (!guest) {
        return {
            title: 'Invitación no encontrada',
        };
    }

    return {
        title: `${guest.name} - Boda Christy & Cristian`,
        description: `${guest.name}, te invitamos a celebrar nuestra boda el 7 de Marzo de 2026`,
    };
}

export default async function InvitationPage({ params }: InvitationPageProps) {
    const { code } = await params;
    const guest = await getGuest(code);

    if (!guest) {
        redirect('/');
    }

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <HeroSection />

            {/* Animated Envelope Section */}
            <section
                className="section"
                style={{ backgroundColor: 'var(--cream)' }}
            >
                <div className="max-w-lg mx-auto text-center mb-16 relative z-50">
                    <p
                        className="text-sm uppercase tracking-[0.2em] mb-2"
                        style={{ color: 'var(--soft-gray)' }}
                    >
                        El día más importante de nuestras vidas ha llegado
                    </p>
                    <h2
                        className="heading-script text-2xl"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        ¡Nos casamos!
                    </h2>
                </div>

                <AnimatedEnvelope
                    guestName={guest.name}
                    numberOfGuests={guest.numberOfGuests}
                />
            </section>

            {/* Countdown */}
            <CountdownTimer targetDate={WEDDING_INFO.date} />

            {/* Parents Section */}
            <ParentsSection />

            {/* Photo Gallery */}
            <PhotoGallery />

            {/* Event Details */}
            <EventDetails />

            {/* Dress Code */}
            <DressCode />

            {/* RSVP */}
            <RSVPForm
                guestCode={guest.code}
                guestName={guest.name}
                initialConfirmed={guest.confirmed}
                initialWillAttend={guest.willAttend}
            />

            {/* Footer */}
            <footer
                className="py-8 text-center"
                style={{ backgroundColor: 'var(--sage-green)' }}
            >
                <p
                    className="heading-script text-2xl text-white mb-2"
                >
                    Christy & Cristian
                </p>
                <p className="text-white/80 text-sm">
                    7 de Marzo de 2026
                </p>
            </footer>

            {/* Music Player */}
            <MusicPlayer />
        </main>
    );
}
