'use client';

import { useState } from 'react';
import {
  calculateCPA,
  calculateHealthScore,
  detectLeaks,
  type Platform,
  type CalculatorInputs,
} from '@/lib/calculator';

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
  roi: number;
  cpa: number;
  leaks: string[];
}

const PLATFORM_LABELS: Record<Platform, string> = {
  meta: 'Meta (Facebook / Instagram)',
  google: 'Google Ads',
  tiktok: 'TikTok Ads',
};

export default function AuditCalculator() {
  const [form, setForm] = useState<FormValues>({
    platforms: [],
    ctr: '',
    cpc: '',
    roas: '',
    presupuesto: '',
    conversiones: '',
    ingresos: '',
  });
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState<string | null>(null);

  function togglePlatform(platform: Platform) {
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    const conversiones = parseFloat(form.conversiones);
    const ingresos = parseFloat(form.ingresos);

    if ([ctr, cpc, roas, presupuesto, conversiones, ingresos].some(isNaN)) {
      setError('Completá todos los campos con valores numéricos válidos.');
      return;
    }

    if (presupuesto <= 0) {
      setError('El presupuesto mensual debe ser mayor a 0.');
      return;
    }

    setError(null);

    const inputs: CalculatorInputs = {
      platforms: form.platforms,
      ctr,
      cpc,
      roas,
      presupuesto,
      conversiones,
      ingresos,
    };

    setResults({
      healthScore: calculateHealthScore(inputs),
      roi: ((ingresos - presupuesto) / presupuesto) * 100,
      cpa: calculateCPA(presupuesto, conversiones),
      leaks: detectLeaks(inputs),
    });
  }

  return (
    <section id="calculadora">
      <h2>Calculadora de Salud de Campaña</h2>

      <div>
        <p>Plataformas activas:</p>
        {(['meta', 'google', 'tiktok'] as Platform[]).map((p) => (
          <label key={p}>
            <input
              type="checkbox"
              checked={form.platforms.includes(p)}
              onChange={() => togglePlatform(p)}
            />
            {' '}{PLATFORM_LABELS[p]}
          </label>
        ))}
      </div>

      <div>
        <label>
          CTR actual (%):
          <input
            type="number"
            name="ctr"
            value={form.ctr}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </label>

        <label>
          CPC actual (USD):
          <input
            type="number"
            name="cpc"
            value={form.cpc}
            onChange={handleChange}
            step="0.01"
            min="0"
          />
        </label>

        <label>
          ROAS actual:
          <input
            type="number"
            name="roas"
            value={form.roas}
            onChange={handleChange}
            step="0.1"
            min="0"
          />
        </label>

        <label>
          Presupuesto mensual (USD):
          <input
            type="number"
            name="presupuesto"
            value={form.presupuesto}
            onChange={handleChange}
            step="1"
            min="0"
          />
        </label>

        <label>
          Conversiones mensuales:
          <input
            type="number"
            name="conversiones"
            value={form.conversiones}
            onChange={handleChange}
            step="1"
            min="0"
          />
        </label>

        <label>
          Ingresos generados (USD):
          <input
            type="number"
            name="ingresos"
            value={form.ingresos}
            onChange={handleChange}
            step="1"
            min="0"
          />
        </label>
      </div>

      {error && <p>{error}</p>}

      <button onClick={handleCalculate}>Calcular</button>

      {results && (
        <div>
          <h3>Resultados</h3>
          <p>Health Score: {results.healthScore}/100</p>
          <p>ROI calculado: {results.roi.toFixed(1)}%</p>
          <p>CPA: {results.cpa > 0 ? `$${results.cpa.toFixed(2)}` : '—'}</p>
          <h4>Fugas detectadas:</h4>
          {results.leaks.length === 0 ? (
            <p>No se detectaron fugas. Tus campañas están en buena salud.</p>
          ) : (
            <ul>
              {results.leaks.map((leak, i) => (
                <li key={i}>{leak}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
