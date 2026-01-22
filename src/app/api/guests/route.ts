import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateGuestCode } from '@/lib/utils';
import { isAuthenticated } from '@/lib/auth';

// GET /api/guests - List all guests
export async function GET() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const guests = await prisma.guest.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ guests });
    } catch (error) {
        console.error('Error fetching guests:', error);
        return NextResponse.json(
            { error: 'Error al obtener invitados' },
            { status: 500 }
        );
    }
}

// POST /api/guests - Create a new guest
export async function POST(request: Request) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, numberOfGuests, phone } = body;

        if (!name || typeof name !== 'string') {
            return NextResponse.json(
                { error: 'Nombre es requerido' },
                { status: 400 }
            );
        }

        // Generate unique code
        let code = generateGuestCode();
        let attempts = 0;
        while (attempts < 10) {
            const existing = await prisma.guest.findUnique({ where: { code } });
            if (!existing) break;
            code = generateGuestCode();
            attempts++;
        }

        const guest = await prisma.guest.create({
            data: {
                name: name.trim(),
                code,
                numberOfGuests: numberOfGuests || 1,
                phone: phone || null,
            },
        });

        return NextResponse.json({ guest }, { status: 201 });
    } catch (error) {
        console.error('Error creating guest:', error);
        return NextResponse.json(
            { error: 'Error al crear invitado' },
            { status: 500 }
        );
    }
}

// PUT /api/guests - Update a guest
export async function PUT(request: Request) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, name, numberOfGuests, phone } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'ID es requerido' },
                { status: 400 }
            );
        }

        const guest = await prisma.guest.update({
            where: { id },
            data: {
                ...(name && { name: name.trim() }),
                ...(typeof numberOfGuests === 'number' && { numberOfGuests }),
                ...(phone !== undefined && { phone: phone || null }),
            },
        });

        return NextResponse.json({ guest });
    } catch (error) {
        console.error('Error updating guest:', error);
        return NextResponse.json(
            { error: 'Error al actualizar invitado' },
            { status: 500 }
        );
    }
}

// DELETE /api/guests - Delete a guest
export async function DELETE(request: Request) {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID es requerido' },
                { status: 400 }
            );
        }

        await prisma.guest.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting guest:', error);
        return NextResponse.json(
            { error: 'Error al eliminar invitado' },
            { status: 500 }
        );
    }
}
