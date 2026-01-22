import { NextResponse } from 'next/server';
import { verifyPassword, setAuthCookie, removeAuthCookie } from '@/lib/auth';

// POST /api/auth - Login
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json(
                { error: 'Contraseña requerida' },
                { status: 400 }
            );
        }

        const isValid = await verifyPassword(password);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Contraseña incorrecta' },
                { status: 401 }
            );
        }

        await setAuthCookie();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Auth Error:', error);
        return NextResponse.json(
            { error: 'Error de autenticación' },
            { status: 500 }
        );
    }
}

// DELETE /api/auth - Logout
export async function DELETE() {
    try {
        await removeAuthCookie();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Logout Error:', error);
        return NextResponse.json(
            { error: 'Error al cerrar sesión' },
            { status: 500 }
        );
    }
}
