export interface Guest {
    id: string;
    name: string;
    code: string;
    numberOfGuests: number;
    phone: string | null;
    confirmed: boolean;
    willAttend: boolean | null;
    confirmedAt: Date | null;
    message: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface GuestFormData {
    name: string;
    numberOfGuests: number;
    phone?: string;
}

export interface RSVPFormData {
    willAttend: boolean;
    message?: string;
}

export interface WeddingInfo {
    groomName: string;
    brideName: string;
    date: Date;
    venue: {
        name: string;
        address: string;
        mapsUrl: string;
    };
    parents: {
        groom: {
            father: string;
            mother: string;
        };
        bride: {
            father: string;
            mother: string;
        };
    };
}

export const WEDDING_INFO: WeddingInfo = {
    groomName: 'Cristian',
    brideName: 'Christy',
    date: new Date('2026-03-07T16:00:00'),
    venue: {
        name: 'La Encantada',
        address: 'Sector 3, Grupo 11, Mz I, Lote 17 - Villa El Salvador, Lima',
        mapsUrl: 'https://maps.app.goo.gl/9YQGuMeXwMfHsCUt5',
    },
    parents: {
        groom: {
            father: 'Tony Palomino',
            mother: 'Silvia Nunta',
        },
        bride: {
            father: 'Roberto Crisóstomo',
            mother: 'Basilia Berrocal',
        },
    },
};

export interface DashboardStats {
    totalGuests: number;
    confirmedGuests: number;
    pendingGuests: number;
    declinedGuests: number;
    totalPeople: number;
    confirmedPeople: number;
}
