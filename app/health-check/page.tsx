import Link from 'next/link';
import AuditCalculator from '@/app/components/AuditCalculator';

export const metadata = {
  title: 'Agency Health Check — Agency Leak Audit',
  description: 'Calculá el health score de tus campañas y detectá fugas de presupuesto en segundos.',
};

export default function HealthCheckPage() {
  return (
    <>
      <header
        className="sticky top-0 z-50 border-b backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(6, 8, 15, 0.9)',
          borderColor: 'rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm transition-colors hover:text-white"
            style={{ color: '#94A3B8' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volver
          </Link>
          <span className="text-sm font-semibold text-white">Agency Health Check</span>
          <div className="w-14" />
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <AuditCalculator />
      </main>
    </>
  );
}
