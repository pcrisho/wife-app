import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { isAuthenticated } from '@/lib/auth';

// GET /api/export - Export guests to CSV
export async function GET() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    try {
        const guests = await prisma.guest.findMany({
            orderBy: { name: 'asc' },
        });

        // Create CSV content
        const headers = [
            'Nombre',
            'Código',
            'Personas',
            'Teléfono',
            'Confirmado',
            'Asistirá',
            'Fecha Confirmación',
            'Mensaje',
        ];

        const rows = guests.map((guest) => [
            guest.name,
            guest.code,
            guest.numberOfGuests.toString(),
            guest.phone || '',
            guest.confirmed ? 'Sí' : 'No',
            guest.willAttend === null ? 'Pendiente' : guest.willAttend ? 'Sí' : 'No',
            guest.confirmedAt ? new Date(guest.confirmedAt).toLocaleDateString('es-PE') : '',
            guest.message || '',
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) =>
                row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(',')
            ),
        ].join('\n');

        // Add BOM for Excel compatibility
        const bom = '\uFEFF';
        const csvWithBom = bom + csvContent;

        return new NextResponse(csvWithBom, {
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="invitados-boda.csv"',
            },
        });
    } catch (error) {
        console.error('Export Error:', error);
        return NextResponse.json(
            { error: 'Error al exportar' },
            { status: 500 }
        );
    }
}
