const steps = [
  {
    number: "01",
    title: "Conecta tus cuentas",
    description:
      "Nos das acceso de lectura a tus plataformas de ads — Google, Meta, TikTok, LinkedIn. Proceso seguro, sin acceso a pagos.",
    detail: "Google Ads · Meta Ads · TikTok Ads · LinkedIn Ads · GA4",
  },
  {
    number: "02",
    title: "Analizamos tu data",
    description:
      "Nuestro equipo revisa más de 150 puntos críticos: estructura de campañas, segmentación, pujas, creatividades, landing pages y atribución.",
    detail: "150+ puntos de análisis · Data de los últimos 6 meses",
  },
  {
    number: "03",
    title: "Recibes tu plan de acción",
    description:
      "En 48 horas tienes un informe detallado con las fugas identificadas, el impacto estimado y un roadmap priorizado para corregirlas.",
    detail: "Informe PDF + Videollamada de 60 min incluida",
  },
];

export default function HowItWorks() {
  return (
    <section id="proceso" className="py-24 px-6">
      <div
        className="max-w-7xl mx-auto rounded-3xl p-12 md:p-16 relative overflow-hidden"
        style={{
          backgroundColor: "rgba(15, 21, 32, 0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Decorative gradient */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(99,102,241,0.08)" }}
        />

        <div className="relative z-10">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#A5B4FC" }}
            >
              Proceso simple
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              De cero a resultados{" "}
              <span className="gradient-text">en 3 pasos</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Sin configuraciones complicadas. Sin meses de espera. Sin
              sorpresas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div
              className="hidden md:block absolute top-8 left-1/3 right-1/3 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
              }}
            />

            {steps.map(({ number, title, description, detail }) => (
              <div key={number} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                      color: "white",
                    }}
                  >
                    {number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">
                    {description}
                  </p>
                  <div
                    className="text-xs px-3 py-1.5 rounded-lg inline-block"
                    style={{
                      backgroundColor: "rgba(99,102,241,0.08)",
                      color: "#818CF8",
                      border: "1px solid rgba(99,102,241,0.15)",
                    }}
                  >
                    {detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
