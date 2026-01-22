'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Error de autenticación');
            }

            router.push('/admin');
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main
            className="min-h-screen flex items-center justify-center p-6"
            style={{ backgroundColor: 'var(--cream)' }}
        >
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div
                        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: 'var(--sage-light)' }}
                    >
                        <svg
                            className="w-10 h-10"
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{ color: 'var(--sage-dark)' }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                    <h1
                        className="heading-script text-3xl mb-2"
                        style={{ color: 'var(--charcoal)' }}
                    >
                        Panel de Administración
                    </h1>
                    <p
                        className="text-sm"
                        style={{ color: 'var(--soft-gray)' }}
                    >
                        Christy & Cristian
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="card">
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium mb-2"
                            style={{ color: 'var(--charcoal)' }}
                        >
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa la contraseña"
                            className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none focus:ring-2"
                            style={{
                                borderColor: error ? '#ef4444' : 'var(--sage-light)',
                                backgroundColor: 'var(--cream)',
                            }}
                            required
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="animate-spin">⏳</span>
                                Verificando...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Ingresar
                            </>
                        )}
                    </button>
                </form>

                {/* Back link */}
                <p className="text-center mt-6">
                    <a
                        href="/"
                        className="text-sm transition-colors hover:opacity-80"
                        style={{ color: 'var(--soft-gray)' }}
                    >
                        ← Volver al inicio
                    </a>
                </p>
            </div>
        </main>
    );
}
