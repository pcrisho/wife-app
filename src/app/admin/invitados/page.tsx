'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Guest } from '@/types';
import { generateInvitationUrl, generateWhatsAppLink } from '@/lib/utils';

type FilterType = 'all' | 'confirmed' | 'pending' | 'declined';

export default function GuestManagementPage() {
    const [guests, setGuests] = useState<Guest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
    const [formData, setFormData] = useState({ name: '', numberOfGuests: 1, phone: '' });
    const [isSaving, setIsSaving] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Fetch guests
    const fetchGuests = async () => {
        try {
            const response = await fetch('/api/guests');
            if (response.ok) {
                const data = await response.json();
                setGuests(data.guests);
            }
        } catch (error) {
            console.error('Error fetching guests:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    // Filter guests
    const filteredGuests = guests.filter((guest) => {
        const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());

        switch (filter) {
            case 'confirmed':
                return matchesSearch && guest.confirmed && guest.willAttend === true;
            case 'pending':
                return matchesSearch && !guest.confirmed;
            case 'declined':
                return matchesSearch && guest.confirmed && guest.willAttend === false;
            default:
                return matchesSearch;
        }
    });

    // Handle create/update
    const handleSave = async () => {
        if (!formData.name.trim()) return;

        setIsSaving(true);
        try {
            const url = '/api/guests';
            const method = editingGuest ? 'PUT' : 'POST';
            const body = editingGuest
                ? { id: editingGuest.id, ...formData }
                : formData;

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchGuests();
                closeModal();
            }
        } catch (error) {
            console.error('Error saving guest:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle delete
    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este invitado?')) return;

        try {
            const response = await fetch(`/api/guests?id=${id}`, { method: 'DELETE' });
            if (response.ok) {
                await fetchGuests();
            }
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    // Copy link
    const copyLink = async (code: string, id: string) => {
        const url = generateInvitationUrl(code);
        await navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    // Share WhatsApp
    const shareWhatsApp = (guest: Guest) => {
        const url = generateInvitationUrl(guest.code);
        const message = `¡Hola ${guest.name}! 🎉\n\nTe invitamos a celebrar nuestra boda el 7 de Marzo de 2026.\n\nAbre tu invitación personalizada aquí:\n${url}\n\nCon cariño,\nChristy & Cristian 💍`;

        window.open(generateWhatsAppLink(guest.phone || '', message), '_blank');
    };

    // Modal handlers
    const openModal = (guest?: Guest) => {
        if (guest) {
            setEditingGuest(guest);
            setFormData({
                name: guest.name,
                numberOfGuests: guest.numberOfGuests,
                phone: guest.phone || '',
            });
        } else {
            setEditingGuest(null);
            setFormData({ name: '', numberOfGuests: 1, phone: '' });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingGuest(null);
        setFormData({ name: '', numberOfGuests: 1, phone: '' });
    };

    const getStatusBadge = (guest: Guest) => {
        if (!guest.confirmed) {
            return (
                <span
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: 'var(--warm-beige)', color: 'var(--gold)' }}
                >
                    Pendiente
                </span>
            );
        }
        if (guest.willAttend) {
            return (
                <span
                    className="px-2 py-1 rounded-full text-xs"
                    style={{ backgroundColor: 'var(--sage-light)', color: 'var(--sage-dark)' }}
                >
                    Confirmado
                </span>
            );
        }
        return (
            <span
                className="px-2 py-1 rounded-full text-xs"
                style={{ backgroundColor: 'var(--blush)', color: 'var(--soft-gray)' }}
            >
                No asistirá
            </span>
        );
    };

    return (
        <main
            className="min-h-screen p-4 md:p-6"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href="/admin"
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--warm-beige)' }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--charcoal)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <div className="flex-1">
                        <h1
                            className="heading-script text-2xl md:text-3xl"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            Gestión de Invitados
                        </h1>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="btn-primary flex items-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span className="hidden sm:inline">Agregar</span>
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
                            style={{
                                borderColor: 'var(--sage-light)',
                                backgroundColor: 'white'
                            }}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {(['all', 'confirmed', 'pending', 'declined'] as FilterType[]).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
                                style={{
                                    backgroundColor: filter === f ? 'var(--sage-green)' : 'white',
                                    color: filter === f ? 'white' : 'var(--charcoal)',
                                }}
                            >
                                {f === 'all' ? 'Todos' :
                                    f === 'confirmed' ? 'Confirmados' :
                                        f === 'pending' ? 'Pendientes' : 'No asisten'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Guest List */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <p style={{ color: 'var(--soft-gray)' }}>Cargando invitados...</p>
                    </div>
                ) : filteredGuests.length === 0 ? (
                    <div className="card text-center py-12">
                        <p style={{ color: 'var(--soft-gray)' }}>
                            {guests.length === 0
                                ? 'No hay invitados registrados'
                                : 'No se encontraron resultados'}
                        </p>
                        {guests.length === 0 && (
                            <button
                                onClick={() => openModal()}
                                className="btn-primary mt-4"
                            >
                                Agregar primer invitado
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredGuests.map((guest) => (
                            <div
                                key={guest.id}
                                className="card p-4"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3
                                                className="font-serif text-lg truncate"
                                                style={{ color: 'var(--charcoal)' }}
                                            >
                                                {guest.name}
                                            </h3>
                                            {getStatusBadge(guest)}
                                        </div>
                                        <p
                                            className="text-sm"
                                            style={{ color: 'var(--soft-gray)' }}
                                        >
                                            {guest.numberOfGuests} {guest.numberOfGuests === 1 ? 'persona' : 'personas'}
                                            {guest.phone && ` • ${guest.phone}`}
                                        </p>
                                        {guest.message && (
                                            <p
                                                className="text-sm mt-2 italic"
                                                style={{ color: 'var(--text-light)' }}
                                            >
                                                "{guest.message}"
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => copyLink(guest.code, guest.id)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                            style={{ backgroundColor: copiedId === guest.id ? 'var(--sage-light)' : 'var(--warm-beige)' }}
                                            title="Copiar enlace"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--charcoal)' }}>
                                                {copiedId === guest.id ? (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                ) : (
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                )}
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => shareWhatsApp(guest)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: '#25D366' }}
                                            title="Compartir por WhatsApp"
                                        >
                                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => openModal(guest)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--warm-beige)' }}
                                            title="Editar"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: 'var(--charcoal)' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(guest.id)}
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--blush)' }}
                                            title="Eliminar"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{ color: '#dc2626' }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Summary */}
                <div
                    className="mt-6 text-center text-sm"
                    style={{ color: 'var(--soft-gray)' }}
                >
                    Mostrando {filteredGuests.length} de {guests.length} invitados
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div
                        className="w-full max-w-md rounded-2xl p-6"
                        style={{ backgroundColor: 'white' }}
                    >
                        <h2
                            className="heading-script text-2xl mb-6"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            {editingGuest ? 'Editar Invitado' : 'Nuevo Invitado'}
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: 'var(--charcoal)' }}
                                >
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Nombre del invitado"
                                    className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: 'var(--sage-light)',
                                        backgroundColor: 'var(--cream)'
                                    }}
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: 'var(--charcoal)' }}
                                >
                                    Número de personas
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={formData.numberOfGuests}
                                    onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) || 1 })}
                                    className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: 'var(--sage-light)',
                                        backgroundColor: 'var(--cream)'
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    className="block text-sm font-medium mb-1"
                                    style={{ color: 'var(--charcoal)' }}
                                >
                                    Teléfono (opcional)
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+51 999 999 999"
                                    className="w-full px-4 py-2 rounded-xl border focus:outline-none focus:ring-2"
                                    style={{
                                        borderColor: 'var(--sage-light)',
                                        backgroundColor: 'var(--cream)'
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={closeModal}
                                className="flex-1 btn-secondary"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || !formData.name.trim()}
                                className="flex-1 btn-primary disabled:opacity-50"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
