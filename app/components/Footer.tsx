import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t py-12 px-6"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366F1, #06B6D4)" }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z"
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="9" cy="9" r="2.5" fill="white" />
                </svg>
              </div>
              <span className="font-semibold text-sm text-white">
                Agency<span className="gradient-text">Audit</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Auditamos agencias de marketing y encontramos las fugas de presupuesto
              que están destruyendo tu ROI.
            </p>
            <a
              href="mailto:Santiago@nexagency.ai"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Santiago@nexagency.ai
            </a>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10">
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Servicios</h4>
              <ul className="flex flex-col gap-3">
                {[
                  "Auditoría Google Ads",
                  "Auditoría Meta Ads",
                  "Análisis de Atribución",
                  "Optimización de Funnel",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#contacto"
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-medium mb-4">Empresa</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Proceso", href: "#proceso" },
                  { label: "Resultados", href: "#resultados" },
                  { label: "Contacto", href: "#contacto" },
                  { label: "Política de privacidad", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.04)" }}
        >
          <p className="text-slate-600 text-xs">
            © 2026 AgencyAudit. Todos los derechos reservados.
          </p>
          <p className="text-slate-600 text-xs">
            Hecho con precisión para maximizar tu ROI
          </p>
        </div>
      </div>
    </footer>
  );
}
