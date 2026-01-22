import { cookies } from 'next/headers';

const ADMIN_COOKIE_NAME = 'wedding_admin_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function verifyPassword(password: string): Promise<boolean> {
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
        console.error('ADMIN_PASSWORD not set in environment variables');
        return false;
    }
    return password === adminPassword;
}

export async function setAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
    });
}

export async function removeAuthCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    return authCookie?.value === 'authenticated';
}
