const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Análisis de Presupuesto",
    description:
      "Rastreamos cada euro invertido en tus campañas y detectamos exactamente dónde se pierde tu presupuesto sin generar retorno.",
    accent: "#6366F1",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Optimización de Campañas",
    description:
      "Identificamos los canales y creatividades de mayor rendimiento y redirigimos el presupuesto para maximizar el impacto.",
    accent: "#06B6D4",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 12L10 15L17 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Transparencia Total",
    description:
      "Reportes claros, sin jerga innecesaria. Sabrás exactamente qué funciona, qué no, y por qué. Sin letra pequeña.",
    accent: "#8B5CF6",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 8L22 2M22 2H17M22 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "ROI Garantizado",
    description:
      "Nuestras auditorías generan un retorno mínimo de 3x sobre la inversión en los primeros 90 días. Resultados medibles.",
    accent: "#10B981",
  },
];

export default function Features() {
  return (
    <section id="servicios" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
            style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#A5B4FC" }}
          >
            Por qué elegirnos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Todo lo que necesitas para{" "}
            <span className="gradient-text">recuperar tu inversión</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Una auditoría completa que cubre todos los aspectos de tu estrategia de
            marketing digital con recomendaciones accionables.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon, title, description, accent }) => (
            <div
              key={title}
              className="card-hover rounded-2xl p-8 border"
              style={{
                backgroundColor: "rgba(15, 21, 32, 0.8)",
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${accent}1A`, color: accent }}
              >
                {icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
              <p className="text-slate-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
