const stats = [
  {
    value: "+200",
    label: "Agencias auditadas",
    description: "En España, LATAM y EE.UU.",
  },
  {
    value: "$2.5M",
    label: "Presupuesto recuperado",
    description: "En los últimos 12 meses",
  },
  {
    value: "87%",
    label: "Mejora promedio en ROI",
    description: "A los 90 días de la auditoría",
  },
  {
    value: "4.9★",
    label: "Valoración media",
    description: "Basado en 180+ reseñas",
  },
];

const testimonials = [
  {
    quote:
      "Descubrieron que estábamos pagando 3x el CPC de nuestra competencia por exactamente el mismo público. En 2 meses recuperamos €40.000.",
    author: "Carlos M.",
    role: "Director de Marketing · E-commerce de moda",
    initials: "CM",
    accent: "#6366F1",
  },
  {
    quote:
      "El informe fue tan claro que lo presentamos directamente al board. La dirección quedó impresionada y aprobó el presupuesto extra para optimizaciones.",
    author: "Laura T.",
    role: "CMO · Startup SaaS B2B",
    initials: "LT",
    accent: "#06B6D4",
  },
  {
    quote:
      "Llevábamos 18 meses quemando presupuesto en TikTok sin entender por qué no convertía. La auditoría lo identificó en 48 horas.",
    author: "Roberto A.",
    role: "CEO · Marca de consumo",
    initials: "RA",
    accent: "#8B5CF6",
  },
];

export default function Stats() {
  return (
    <section id="resultados" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-20"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          {stats.map(({ value, label, description }) => (
            <div
              key={label}
              className="p-8 text-center"
              style={{ backgroundColor: "rgba(15, 21, 32, 0.9)" }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {value}
              </div>
              <div className="text-white font-medium mb-1">{label}</div>
              <div className="text-slate-500 text-sm">{description}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Lo que dicen nuestros{" "}
            <span className="gradient-text">clientes</span>
          </h2>
          <p className="text-slate-400">
            Resultados reales de agencias y marcas que ya auditamos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, author, role, initials, accent }) => (
            <div
              key={author}
              className="card-hover rounded-2xl p-8 border flex flex-col gap-6"
              style={{
                backgroundColor: "rgba(15, 21, 32, 0.8)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              {/* Quote mark */}
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                style={{ color: accent, opacity: 0.6 }}
              >
                <path
                  d="M12 0H0V12C0 18.627 5.373 24 12 24V20C7.582 20 4 16.418 4 12V4H12V0ZM32 0H20V12C20 18.627 25.373 24 32 24V20C27.582 20 24 16.418 24 12V4H32V0Z"
                  fill="currentColor"
                />
              </svg>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                {quote}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: accent }}
                >
                  {initials}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{author}</div>
                  <div className="text-slate-500 text-xs">{role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
