"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agency: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error();
      setState("success");
      setFormData({ name: "", email: "", agency: "", budget: "", message: "" });
    } catch {
      setState("error");
    }
  };

  const inputStyles = {
    backgroundColor: "rgba(15, 21, 32, 0.8)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#F1F5F9",
  };

  const labelClass = "block text-sm font-medium text-slate-400 mb-2";
  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all focus:ring-2 placeholder-slate-600";

  return (
    <section id="contacto" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left column */}
          <div className="flex flex-col gap-8">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{ backgroundColor: "rgba(99,102,241,0.1)", color: "#A5B4FC" }}
              >
                Empieza hoy
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Solicita tu{" "}
                <span className="gradient-text">auditoría gratuita</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Cuéntanos sobre tu situación actual y te enviaremos un análisis
                preliminar sin coste. Sin ventas agresivas, sin compromisos.
              </p>
            </div>

            {/* What you get */}
            <div className="flex flex-col gap-4">
              {[
                "Análisis de tus campañas activas en 48 horas",
                "Identificación de las 3 principales fugas de presupuesto",
                "Estimación del potencial de mejora en ROI",
                "Videollamada de 30 min para revisar resultados",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4.5 7.5L8 3"
                        stroke="#10B981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div
              className="flex items-center gap-3 p-4 rounded-xl border"
              style={{
                backgroundColor: "rgba(99,102,241,0.06)",
                borderColor: "rgba(99,102,241,0.15)",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{ color: "#818CF8", flexShrink: 0 }}
              >
                <path
                  d="M3 4H17C17.55 4 18 4.45 18 5V15C18 15.55 17.55 16 17 16H3C2.45 16 2 15.55 2 15V5C2 4.45 2.45 4 3 4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 6L10 11L18 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <div>
                <div className="text-slate-400 text-xs">Email directo</div>
                <div className="text-white text-sm font-medium">
                  Santiago@nexagency.ai
                </div>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div
            className="rounded-2xl p-8 border"
            style={{
              backgroundColor: "rgba(15, 21, 32, 0.8)",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "rgba(16, 185, 129, 0.15)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M6 14L11.5 19.5L22 9"
                      stroke="#10B981"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">
                  ¡Solicitud recibida!
                </h3>
                <p className="text-slate-400 text-sm max-w-xs">
                  Te contactaremos en menos de 24 horas con el análisis preliminar
                  de tu cuenta.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="mt-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Nombre *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className={inputClass}
                      style={{
                        ...inputStyles,
                        ["--tw-ring-color" as string]: "rgba(99,102,241,0.5)",
                      }}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@empresa.com"
                      className={inputClass}
                      style={inputStyles}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Agencia / Empresa *</label>
                  <input
                    type="text"
                    name="agency"
                    required
                    value={formData.agency}
                    onChange={handleChange}
                    placeholder="Nombre de tu agencia o empresa"
                    className={inputClass}
                    style={inputStyles}
                  />
                </div>

                <div>
                  <label className={labelClass}>Presupuesto mensual en ads</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={inputClass}
                    style={{ ...inputStyles, cursor: "pointer" }}
                  >
                    <option value="" style={{ backgroundColor: "#0F1520" }}>
                      Selecciona un rango
                    </option>
                    {[
                      "Menos de €5.000/mes",
                      "€5.000 – €20.000/mes",
                      "€20.000 – €50.000/mes",
                      "€50.000 – €100.000/mes",
                      "Más de €100.000/mes",
                    ].map((opt) => (
                      <option key={opt} value={opt} style={{ backgroundColor: "#0F1520" }}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>¿Cuál es tu principal problema? *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe brevemente tu situación actual: plataformas que usas, métricas actuales, qué no está funcionando..."
                    rows={4}
                    className={inputClass}
                    style={{ ...inputStyles, resize: "none" }}
                  />
                </div>

                {state === "error" && (
                  <div
                    className="text-sm px-4 py-3 rounded-lg"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#FCA5A5",
                      border: "1px solid rgba(239,68,68,0.2)",
                    }}
                  >
                    Hubo un error al enviar. Por favor intenta de nuevo o escríbenos
                    directamente.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #6366F1, #06B6D4)",
                    boxShadow: "0 0 30px rgba(99,102,241,0.25)",
                  }}
                >
                  {state === "loading" ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M9 1.5V4.5M9 13.5V16.5M3.697 3.697L5.818 5.818M12.182 12.182L14.303 14.303M1.5 9H4.5M13.5 9H16.5M3.697 14.303L5.818 12.182M12.182 5.818L14.303 3.697"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Solicitar Auditoría Gratuita
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8H13M13 8L9 4M13 8L9 12"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-600">
                  Sin compromisos. Sin spam. Solo resultados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
