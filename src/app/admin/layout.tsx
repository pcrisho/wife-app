import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if this is the login page
    // The layout wraps all admin pages, but login should be accessible
    return <>{children}</>;
}
