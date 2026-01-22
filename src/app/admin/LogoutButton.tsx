'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await fetch('/api/auth', { method: 'DELETE' });
            router.push('/admin/login');
            router.refresh();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
            style={{
                backgroundColor: 'var(--warm-beige)',
                color: 'var(--charcoal)'
            }}
        >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {isLoading ? 'Saliendo...' : 'Cerrar Sesión'}
        </button>
    );
}
