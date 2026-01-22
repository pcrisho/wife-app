import Link from 'next/link';

export default function HomePage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-md text-center">
        {/* Decorative element */}
        <div className="mb-8">
          <div
            className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--sage-light)' }}
          >
            <span
              className="heading-script text-3xl"
              style={{ color: 'var(--sage-dark)' }}
            >
              C&C
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="heading-script text-4xl md:text-5xl mb-4"
          style={{ color: 'var(--charcoal)' }}
        >
          Christy & Cristian
        </h1>

        {/* Date */}
        <p
          className="font-serif text-lg mb-8"
          style={{ color: 'var(--text-light)' }}
        >
          7 de Marzo de 2026
        </p>

        {/* Divider */}
        <div className="floral-divider mb-8">
          <span style={{ color: 'var(--gold)' }}>✦</span>
        </div>

        {/* Message */}
        <div
          className="card mb-8"
          style={{ backgroundColor: 'white' }}
        >
          <p
            className="font-serif text-lg leading-relaxed"
            style={{ color: 'var(--text-light)' }}
          >
            Esta página es una invitación digital personalizada.
            Si recibiste un enlace de invitación, por favor úsalo
            para acceder a tu invitación personal.
          </p>
        </div>

        {/* Admin Link */}
        <Link
          href="/admin/login"
          className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
          style={{ color: 'var(--soft-gray)' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Acceso Administrador
        </Link>
      </div>
    </main>
  );
}
