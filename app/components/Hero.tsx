import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{ background: "rgba(99, 102, 241, 0.12)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none animate-pulse-slow"
        style={{ background: "rgba(6, 182, 212, 0.10)", animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderColor: "rgba(99, 102, 241, 0.3)",
            color: "#A5B4FC",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Auditoría Express en 48 horas — Sin compromisos
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-white">
          Tu agencia te está{" "}
          <span className="gradient-text">costando más</span>{" "}
          de lo que crees
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          Identificamos las fugas de presupuesto ocultas en tus campañas de
          marketing. Recupera tu inversión y maximiza el ROI con una auditoría
          data-driven en tiempo récord.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <Link
            href="#contacto"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #6366F1, #06B6D4)",
              boxShadow: "0 0 40px rgba(99,102,241,0.3)",
            }}
          >
            Solicitar Auditoría Gratuita
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/health-check"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium border transition-all hover:scale-105"
            style={{
              borderColor: "rgba(99, 102, 241, 0.35)",
              color: "#A5B4FC",
            }}
          >
            Probar herramienta gratis
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="#proceso"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-medium border transition-all hover:border-white/30 hover:text-white"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "#94A3B8" }}
          >
            Ver cómo funciona
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3V13M8 13L4.5 9.5M8 13L11.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Trust bar */}
        <div
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-6 pt-8 border-t w-full justify-center"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {[
            { value: "+200", label: "Agencias auditadas" },
            { value: "$2.5M", label: "Presupuesto recuperado" },
            { value: "87%", label: "Mejora promedio ROI" },
            { value: "48h", label: "Tiempo de entrega" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
