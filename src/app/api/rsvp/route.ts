import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/rsvp - Confirm attendance
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { code, willAttend, message } = body;

        if (!code) {
            return NextResponse.json(
                { error: 'Código de invitado requerido' },
                { status: 400 }
            );
        }

        if (typeof willAttend !== 'boolean') {
            return NextResponse.json(
                { error: 'Debe indicar si asistirá o no' },
                { status: 400 }
            );
        }

        // Find guest by code
        const guest = await prisma.guest.findUnique({
            where: { code },
        });

        if (!guest) {
            return NextResponse.json(
                { error: 'Invitado no encontrado' },
                { status: 404 }
            );
        }

        // Update guest confirmation
        const updatedGuest = await prisma.guest.update({
            where: { code },
            data: {
                confirmed: true,
                willAttend,
                confirmedAt: new Date(),
                message: message || null,
            },
        });

        return NextResponse.json({
            success: true,
            guest: {
                name: updatedGuest.name,
                willAttend: updatedGuest.willAttend,
                confirmedAt: updatedGuest.confirmedAt,
            },
        });
    } catch (error) {
        console.error('RSVP Error:', error);
        return NextResponse.json(
            { error: 'Error al procesar la confirmación' },
            { status: 500 }
        );
    }
}
