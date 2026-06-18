'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  calculateCPA,
  calculateHealthScore,
  detectLeaks,
  type Platform,
  type CalculatorInputs,
} from '@/lib/calculator';
import { BENCHMARKS } from '@/lib/benchmarks';

interface FormValues {
  platforms: Platform[];
  ctr: string;
  cpc: string;
  roas: string;
  presupuesto: string;
  conversiones: string;
  ingresos: string;
}

interface Results {
  healthScore: number;
  roi: number | null; // null when ingresos not provided
  cpa: number;
  leaks: string[];
}

type NumericField = 'ctr' | 'cpc' | 'roas' | 'presupuesto' | 'conversiones' | 'ingresos';

interface FieldDef {
  name: NumericField;
  label: string;
  unit: string;
  unitPos: 'left' | 'right' | 'none';
  step: string;
  placeholder: string;
  hint?: string;
}

const PLATFORMS: Array<{ id: Platform; label: string; sub: string }> = [
  { id: 'meta', label: 'Meta', sub: 'Facebook / Instagram' },
  { id: 'google', label: 'Google Ads', sub: 'Search / Display' },
  { id: 'tiktok', label: 'TikTok Ads', sub: 'In-feed / TopView' },
];

const PERFORMANCE_FIELDS: FieldDef[] = [
  { name: 'ctr', label: 'CTR', unit: '%', unitPos: 'right', step: '0.01', placeholder: '1.2' },
  { name: 'cpc', label: 'CPC', unit: '$', unitPos: 'left', step: '0.01', placeholder: '1.50', hint: 'Benchmark: $0.80–$2.69' },
  { name: 'roas', label: 'ROAS', unit: 'x', unitPos: 'right', step: '0.1', placeholder: '3.0', hint: 'Saludable: 3x o más' },
];

const BUSINESS_FIELDS: FieldDef[] = [
  { name: 'presupuesto', label: 'Presupuesto mensual', unit: '$', unitPos: 'left', step: '100', placeholder: '5000' },
  { name: 'conversiones', label: 'Conversiones', unit: '', unitPos: 'none', step: '1', placeholder: '150', hint: 'Opcional — para calcular CPA' },
  { name: 'ingresos', label: 'Ingresos generados', unit: '$', unitPos: 'left', step: '100', placeholder: '15000', hint: 'Opcional — para calcular ROI' },
];

const EMPTY_FORM: FormValues = {
  platforms: [],
  ctr: '', cpc: '', roas: '',
  presupuesto: '', conversiones: '', ingresos: '',
};

// Shared style tokens
const CARD_STYLE = {
  backgroundColor: 'rgba(15, 21, 32, 0.8)',
  borderColor: 'rgba(255,255,255,0.06)',
};

const INPUT_STYLE = {
  backgroundColor: 'rgba(255,255,255,0.04)',
  borderColor: 'rgba(255,255,255,0.08)',
  color: '#F1F5F9',
};

function getScoreConfig(score: number) {
  if (score >= 70) return { color: '#10B981', label: 'Saludable', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' };
  if (score >= 40) return { color: '#F59E0B', label: 'En riesgo', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' };
  return { color: '#EF4444', label: 'Crítico', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' };
}

// Parses required fields; conversiones/ingresos default to 0 if empty.
// Returns null if any required field is invalid.
function tryParseForm(form: FormValues): { inputs: CalculatorInputs; hasIngresos: boolean } | null {
  if (form.platforms.length === 0) return null;
  const ctr = parseFloat(form.ctr);
  const cpc = parseFloat(form.cpc);
  const roas = parseFloat(form.roas);
  const presupuesto = parseFloat(form.presupuesto);
  if ([ctr, cpc, roas, presupuesto].some(isNaN) || presupuesto <= 0) return null;
  const conversiones = parseFloat(form.conversiones) || 0;
  const ingresos = parseFloat(form.ingresos) || 0;
  return {
    inputs: { platforms: form.platforms, ctr, cpc, roas, presupuesto, conversiones, ingresos },
    hasIngresos: ingresos > 0,
  };
}

function buildResults(inputs: CalculatorInputs, hasIngresos: boolean): Results {
  return {
    healthScore: calculateHealthScore(inputs),
    roi: hasIngresos
      ? ((inputs.ingresos - inputs.presupuesto) / inputs.presupuesto) * 100
      : null,
    cpa: calculateCPA(inputs.presupuesto, inputs.conversiones),
    leaks: detectLeaks(inputs),
  };
}

// SVG arc gauge — 270° sweep, animates on mount via stroke-dashoffset transition
function ScoreGauge({ score, color }: { score: number; color: string }) {
  const r = 52, cx = 64, cy = 64;
  const circ = 2 * Math.PI * r;    // ~326.73
  const arc = (270 / 360) * circ;  // ~245.04
  const [on, setOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOn(true), 80);
    return () => clearTimeout(t);
  }, []);

  // offset = arc → nothing drawn; offset = 0 → full arc
  const dashOffset = arc - (on ? (score / 100) * arc : 0);

  return (
    <svg width="128" height="128" viewBox="0 0 128 128" aria-hidden="true">
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="10"
        strokeDasharray={`${arc} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(135 ${cx} ${cy})`}
      />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={`${arc} ${circ}`}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        transform={`rotate(135 ${cx} ${cy})`}
        style={{
          transition: 'stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
          filter: `drop-shadow(0 0 6px ${color}80)`,
        }}
      />
    </svg>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400">{field.label}</label>
      <div className="relative flex items-center">
        {field.unitPos === 'left' && field.unit && (
          <span className="absolute left-3 text-sm pointer-events-none" style={{ color: '#475569' }}>
            {field.unit}
          </span>
        )}
        <input
          type="number"
          name={field.name}
          value={value}
          onChange={onChange}
          step={field.step}
          min="0"
          placeholder={field.placeholder}
          className="w-full rounded-lg border text-sm outline-none transition-colors"
          style={{
            ...INPUT_STYLE,
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: field.unitPos === 'left' && field.unit ? '28px' : '12px',
            paddingRight: field.unitPos === 'right' && field.unit ? '28px' : '12px',
          }}
        />
        {field.unitPos === 'right' && field.unit && (
          <span className="absolute right-3 text-sm pointer-events-none" style={{ color: '#475569' }}>
            {field.unit}
          </span>
        )}
      </div>
      {field.hint && (
        <p className="text-xs" style={{ color: '#475569' }}>
          {field.hint}
        </p>
      )}
    </div>
  );
}

export default function AuditCalculator() {
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [calcCount, setCalcCount] = useState(0);
  const [hasCalculated, setHasCalculated] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  function togglePlatform(p: Platform) {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(p)
        ? prev.platforms.filter(x => x !== p)
        : [...prev.platforms, p],
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleCalculate() {
    if (form.platforms.length === 0) {
      setError('Seleccioná al menos una plataforma.');
      return;
    }

    const ctr = parseFloat(form.ctr);
    const cpc = parseFloat(form.cpc);
    const roas = parseFloat(form.roas);
    const presupuesto = parseFloat(form.presupuesto);

    if ([ctr, cpc, roas, presupuesto].some(isNaN)) {
      setError('Completá CTR, CPC, ROAS y presupuesto con valores numéricos.');
      return;
    }
    if (presupuesto <= 0) {
      setError('El presupuesto mensual debe ser mayor a 0.');
      return;
    }

    const conversiones = parseFloat(form.conversiones) || 0;
    const ingresos = parseFloat(form.ingresos) || 0;

    setError(null);
    setResultsVisible(false);

    const inputs: CalculatorInputs = {
      platforms: form.platforms, ctr, cpc, roas, presupuesto, conversiones, ingresos,
    };
    const newResults = buildResults(inputs, ingresos > 0);

    setTimeout(() => {
      setResults(newResults);
      setCalcCount(c => c + 1);
      setHasCalculated(true);
      setTimeout(() => setResultsVisible(true), 30);
    }, results ? 200 : 0);
  }

  // Live recalculation after first manual calculate — debounced 300ms
  useEffect(() => {
    if (!hasCalculated) return;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const parsed = tryParseForm(form);
      if (!parsed) return;
      setResults(buildResults(parsed.inputs, parsed.hasIngresos));
      setCalcCount(c => c + 1);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [form, hasCalculated]);

  function handleReset() {
    clearTimeout(debounceRef.current);
    setForm(EMPTY_FORM);
    setResults(null);
    setError(null);
    setResultsVisible(false);
    setHasCalculated(false);
  }

  const cfg = results ? getScoreConfig(results.healthScore) : null;

  const kpis: Array<{ label: string; value: string; positive: boolean | null }> = results
    ? [
        {
          label: 'ROI',
          value: results.roi !== null
            ? `${results.roi >= 0 ? '+' : ''}${results.roi.toFixed(1)}%`
            : '—',
          positive: results.roi !== null ? results.roi >= 0 : null,
        },
        {
          label: 'CPA',
          value: results.cpa > 0 ? `$${results.cpa.toFixed(2)}` : '—',
          positive: null,
        },
        {
          label: 'Fugas',
          value: String(results.leaks.length),
          positive: results.leaks.length === 0,
        },
      ]
    : [];

  return (
    <section id="calculadora" className="flex flex-col gap-8">

      {/* ── Page header ── */}
      <div className="text-center flex flex-col items-center gap-3">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border"
          style={{
            backgroundColor: 'rgba(99,102,241,0.1)',
            borderColor: 'rgba(99,102,241,0.3)',
            color: '#A5B4FC',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Herramienta gratuita
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Calculá el{' '}
          <span className="gradient-text">Health Score</span>
          <br />de tus campañas
        </h1>
        <p className="text-slate-400 max-w-xl leading-relaxed">
          Ingresá tus métricas reales y detectamos en segundos dónde estás perdiendo presupuesto.
        </p>
      </div>

      {/* ── 01 · Platforms ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold gradient-text">01</span>
          <span className="text-sm font-semibold text-white">Plataformas activas</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {PLATFORMS.map(({ id, label, sub }) => {
            const sel = form.platforms.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => togglePlatform(id)}
                className="flex items-center gap-3 p-4 rounded-xl border text-left transition-all"
                style={{
                  backgroundColor: sel ? 'rgba(99,102,241,0.12)' : 'rgba(15,21,32,0.8)',
                  borderColor: sel ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.06)',
                  boxShadow: sel ? '0 0 20px rgba(99,102,241,0.12)' : 'none',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: sel ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                  }}
                >
                  {sel ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7L5.5 10L11.5 4" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: sel ? '#A5B4FC' : '#F1F5F9' }}>
                    {label}
                  </p>
                  <p className="text-xs text-slate-600">{sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 02 · Performance metrics ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold gradient-text">02</span>
          <span className="text-sm font-semibold text-white">Métricas de performance</span>
        </div>
        <div className="rounded-2xl border p-6" style={CARD_STYLE}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {PERFORMANCE_FIELDS.map(f => {
              let hint = f.hint;
              if (f.name === 'ctr') {
                hint = form.platforms.length > 0
                  ? `Promedio industria: ${(form.platforms.reduce((acc, p) => acc + BENCHMARKS[p].ctr.average, 0) / form.platforms.length).toFixed(2)}%`
                  : 'Promedio: 0.9% – 3.17% según plataforma';
              }
              return <FieldInput key={f.name} field={{ ...f, hint }} value={form[f.name]} onChange={handleChange} />;
            })}
          </div>
        </div>
      </div>

      {/* ── 03 · Business metrics ── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold gradient-text">03</span>
          <span className="text-sm font-semibold text-white">Métricas de negocio</span>
        </div>
        <div className="rounded-2xl border p-6" style={CARD_STYLE}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {BUSINESS_FIELDS.map(f => (
              <FieldInput key={f.name} field={f} value={form[f.name]} onChange={handleChange} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl border text-sm"
          style={{
            backgroundColor: 'rgba(239,68,68,0.08)',
            borderColor: 'rgba(239,68,68,0.25)',
            color: '#FCA5A5',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 4V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="7" cy="9.5" r="0.75" fill="currentColor" />
          </svg>
          {error}
        </div>
      )}

      {/* ── Calculate button + reset ── */}
      <div className="flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleCalculate}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-semibold text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
            boxShadow: '0 0 40px rgba(99,102,241,0.25)',
          }}
        >
          Calcular Health Score
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {hasCalculated && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm transition-colors hover:text-slate-300"
            style={{ color: '#475569' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6C1.5 3.51 3.51 1.5 6 1.5C7.45 1.5 8.74 2.18 9.58 3.24M10.5 6C10.5 8.49 8.49 10.5 6 10.5C4.55 10.5 3.26 9.82 2.42 8.76" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M9.5 1.5V3.5H7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2.5 10.5V8.5H4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Reiniciar
          </button>
        )}
      </div>

      {/* ── Results ── */}
      {results && cfg && (
        <div
          className="flex flex-col gap-6"
          style={{
            opacity: resultsVisible ? 1 : 0,
            transform: resultsVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {/* Score card */}
          <div className="rounded-2xl border p-6" style={CARD_STYLE}>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Gauge */}
              <div className="relative flex-shrink-0">
                <ScoreGauge key={calcCount} score={results.healthScore} color={cfg.color} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold leading-none" style={{ color: cfg.color }}>
                    {results.healthScore}
                  </span>
                  <span className="text-xs font-medium mt-1" style={{ color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
              </div>
              {/* KPI trio */}
              <div className="flex-1 grid grid-cols-3 gap-3 w-full">
                {kpis.map(({ label, value, positive }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1 p-4 rounded-xl border"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.03)',
                      borderColor: 'rgba(255,255,255,0.06)',
                    }}
                  >
                    <span
                      className="text-xs uppercase tracking-wide font-medium"
                      style={{ color: '#475569' }}
                    >
                      {label}
                    </span>
                    <span
                      className="text-xl font-bold"
                      style={{
                        color:
                          positive === null
                            ? '#F1F5F9'
                            : positive
                            ? '#10B981'
                            : '#F59E0B',
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaks list */}
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-white">
              {results.leaks.length === 0
                ? 'Diagnóstico'
                : `${results.leaks.length} fuga${results.leaks.length !== 1 ? 's' : ''} detectada${results.leaks.length !== 1 ? 's' : ''}`}
            </h2>
            {results.leaks.length === 0 ? (
              <div
                className="flex items-start gap-3 p-4 rounded-xl border"
                style={{
                  backgroundColor: 'rgba(16,185,129,0.08)',
                  borderColor: 'rgba(16,185,129,0.25)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="6.5" stroke="#10B981" strokeWidth="1.5" />
                  <path d="M5 8L7 10L11 6" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm" style={{ color: '#6EE7B7' }}>
                  No se detectaron fugas. Tus campañas están en buena salud.
                </p>
              </div>
            ) : (
              results.leaks.map((leak, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl border"
                  style={{
                    backgroundColor: 'rgba(245,158,11,0.06)',
                    borderColor: 'rgba(245,158,11,0.2)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-0.5">
                    <path d="M7 1.5L12.5 11.5H1.5L7 1.5Z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M7 5.5V8" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="7" cy="10" r="0.75" fill="#F59E0B" />
                  </svg>
                  <p className="text-sm leading-relaxed" style={{ color: '#CBD5E1' }}>
                    {leak}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* CTA */}
          <div
            className="rounded-2xl border p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              backgroundColor: 'rgba(99,102,241,0.06)',
              borderColor: 'rgba(99,102,241,0.25)',
            }}
          >
            <div className="flex-1">
              <p className="text-white font-semibold mb-1">
                {results.leaks.length > 0
                  ? '¿Querés recuperar ese presupuesto?'
                  : '¿Querés mantener este rendimiento?'}
              </p>
              <p className="text-sm text-slate-400">
                Auditamos en profundidad y te mostramos exactamente cuánto podés mejorar en 48 horas.
              </p>
            </div>
            <Link
              href="/#contacto"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 whitespace-nowrap flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                boxShadow: '0 0 24px rgba(99,102,241,0.3)',
              }}
            >
              Solicitar Auditoría Gratuita
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
