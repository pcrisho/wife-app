import { redirect } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import prisma from '@/lib/prisma';
import type { DashboardStats } from '@/types';
import LogoutButton from './LogoutButton';

async function getDashboardStats(): Promise<DashboardStats> {
    const guests = await prisma.guest.findMany();

    const confirmedGuests = guests.filter(g => g.confirmed && g.willAttend === true);
    const declinedGuests = guests.filter(g => g.confirmed && g.willAttend === false);
    const pendingGuests = guests.filter(g => !g.confirmed);

    return {
        totalGuests: guests.length,
        confirmedGuests: confirmedGuests.length,
        pendingGuests: pendingGuests.length,
        declinedGuests: declinedGuests.length,
        totalPeople: guests.reduce((acc, g) => acc + g.numberOfGuests, 0),
        confirmedPeople: confirmedGuests.reduce((acc, g) => acc + g.numberOfGuests, 0),
    };
}

export default async function AdminDashboard() {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        redirect('/admin/login');
    }

    const stats = await getDashboardStats();

    return (
        <main
            className="min-h-screen p-6"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1
                            className="heading-script text-3xl mb-1"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            Panel de Administración
                        </h1>
                        <p
                            className="text-sm"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            Gestiona los invitados de la boda
                        </p>
                    </div>
                    <LogoutButton />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="card text-center">
                        <p
                            className="text-3xl font-serif font-light mb-1"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            {stats.totalGuests}
                        </p>
                        <p
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            Invitaciones
                        </p>
                    </div>

                    <div className="card text-center">
                        <p
                            className="text-3xl font-serif font-light mb-1"
                            style={{ color: 'var(--sage-green)' }}
                        >
                            {stats.confirmedGuests}
                        </p>
                        <p
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            Confirmados
                        </p>
                    </div>

                    <div className="card text-center">
                        <p
                            className="text-3xl font-serif font-light mb-1"
                            style={{ color: 'var(--gold)' }}
                        >
                            {stats.pendingGuests}
                        </p>
                        <p
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            Pendientes
                        </p>
                    </div>

                    <div className="card text-center">
                        <p
                            className="text-3xl font-serif font-light mb-1"
                            style={{ color: 'var(--sage-dark)' }}
                        >
                            {stats.confirmedPeople}
                        </p>
                        <p
                            className="text-xs uppercase tracking-wider"
                            style={{ color: 'var(--soft-gray)' }}
                        >
                            Personas
                        </p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <Link
                        href="/admin/invitados"
                        className="card flex items-center gap-4 transition-all hover:shadow-lg group"
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                            style={{ backgroundColor: 'var(--sage-light)' }}
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ color: 'var(--sage-dark)' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3
                                className="font-serif text-lg group-hover:text-sage-dark transition-colors"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                Gestionar Invitados
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: 'var(--soft-gray)' }}
                            >
                                Agregar, editar y eliminar invitados
                            </p>
                        </div>
                    </Link>

                    <a
                        href="/api/export"
                        download
                        className="card flex items-center gap-4 transition-all hover:shadow-lg group"
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--warm-beige)' }}
                        >
                            <svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                style={{ color: 'var(--gold)' }}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3
                                className="font-serif text-lg"
                                style={{ color: 'var(--charcoal)' }}
                            >
                                Exportar Lista
                            </h3>
                            <p
                                className="text-sm"
                                style={{ color: 'var(--soft-gray)' }}
                            >
                                Descargar CSV con todos los invitados
                            </p>
                        </div>
                    </a>
                </div>

                {/* Summary */}
                <div className="card">
                    <h3
                        className="font-serif text-lg mb-4"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Resumen de Asistencia
                    </h3>

                    <div className="space-y-4">
                        {/* Confirmed Progress */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span style={{ color: 'var(--text-light)' }}>Confirmados</span>
                                <span style={{ color: 'var(--sage-green)' }}>
                                    {stats.confirmedGuests} de {stats.totalGuests}
                                </span>
                            </div>
                            <div
                                className="w-full h-2 rounded-full overflow-hidden"
                                style={{ backgroundColor: 'var(--warm-beige)' }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        backgroundColor: 'var(--sage-green)',
                                        width: stats.totalGuests > 0
                                            ? `${(stats.confirmedGuests / stats.totalGuests) * 100}%`
                                            : '0%'
                                    }}
                                />
                            </div>
                        </div>

                        {/* People Progress */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span style={{ color: 'var(--text-light)' }}>Personas confirmadas</span>
                                <span style={{ color: 'var(--gold)' }}>
                                    {stats.confirmedPeople} de {stats.totalPeople}
                                </span>
                            </div>
                            <div
                                className="w-full h-2 rounded-full overflow-hidden"
                                style={{ backgroundColor: 'var(--warm-beige)' }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        backgroundColor: 'var(--gold)',
                                        width: stats.totalPeople > 0
                                            ? `${(stats.confirmedPeople / stats.totalPeople) * 100}%`
                                            : '0%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
