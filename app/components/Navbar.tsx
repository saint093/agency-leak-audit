import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-md"
      style={{ backgroundColor: "rgba(6, 8, 15, 0.85)" }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
              <circle cx="9" cy="9" r="2.5" fill="white"/>
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">
            Agency<span className="gradient-text">Audit</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#servicios", label: "Servicios" },
            { href: "#proceso", label: "Proceso" },
            { href: "#resultados", label: "Resultados" },
            { href: "#contacto", label: "Contacto" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/health-check"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:scale-105"
            style={{
              borderColor: "rgba(99, 102, 241, 0.35)",
              color: "#A5B4FC",
            }}
          >
            Probar herramienta gratis
          </Link>
          <Link
            href="#contacto"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)" }}
          >
            Auditoría Gratuita
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
