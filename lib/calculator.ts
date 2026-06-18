import { BENCHMARKS, HEALTHY_ROAS } from './benchmarks';

export type Platform = 'meta' | 'google' | 'tiktok';

export interface CalculatorInputs {
  platforms: Platform[];
  ctr: number;
  cpc: number;
  roas: number;
  presupuesto: number;
  conversiones: number;
  ingresos: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function avgCTRBenchmark(platforms: Platform[]) {
  const sum = platforms.reduce(
    (acc, p) => ({
      average: acc.average + BENCHMARKS[p].ctr.average,
      good: acc.good + BENCHMARKS[p].ctr.good,
    }),
    { average: 0, good: 0 }
  );
  return { average: sum.average / platforms.length, good: sum.good / platforms.length };
}

function avgCPCBenchmark(platforms: Platform[]): number {
  const sum = platforms.reduce((acc, p) => acc + BENCHMARKS[p].cpc.average, 0);
  return sum / platforms.length;
}

export function calculateCPA(presupuesto: number, conversiones: number): number {
  if (conversiones === 0) return 0;
  return presupuesto / conversiones;
}

export function calculateHealthScore(inputs: CalculatorInputs): number {
  const { platforms, ctr, cpc, roas } = inputs;

  const ctrRef = avgCTRBenchmark(platforms);
  const ctrScore = clamp((ctr / ctrRef.good) * 100, 0, 100);

  const cpcRef = avgCPCBenchmark(platforms);
  const cpcScore = clamp((cpcRef / cpc) * 100, 0, 100);

  const roasScore = clamp((roas / HEALTHY_ROAS) * 100, 0, 100);

  const numPlatforms = platforms.length;
  const divScore = numPlatforms >= 3 ? 100 : numPlatforms === 2 ? 60 : 25;

  return Math.round(
    ctrScore * 0.25 + cpcScore * 0.25 + roasScore * 0.30 + divScore * 0.20
  );
}

export function detectLeaks(inputs: CalculatorInputs): string[] {
  const { platforms, ctr, cpc, roas, presupuesto, conversiones, ingresos } = inputs;
  const leaks: string[] = [];

  const ctrRef = avgCTRBenchmark(platforms);
  if (ctr < ctrRef.average) {
    leaks.push(
      `CTR bajo: ${ctr}% — por debajo del promedio de la industria (${ctrRef.average.toFixed(2)}%). Revisá creatividades y segmentación.`
    );
  }

  const cpcRef = avgCPCBenchmark(platforms);
  if (cpc > cpcRef * 1.3) {
    leaks.push(
      `CPC elevado: $${cpc.toFixed(2)} — más de un 30% sobre el benchmark ($${cpcRef.toFixed(2)}). Posible falta de relevancia o presión competitiva en pujas.`
    );
  }

  if (roas < 1) {
    leaks.push(
      `ROAS crítico: ${roas}x — generás menos ingresos de lo que gastás. La campaña opera en pérdida.`
    );
  } else if (roas < HEALTHY_ROAS) {
    leaks.push(
      `ROAS por debajo del umbral saludable: ${roas}x vs ${HEALTHY_ROAS}x recomendado. Los márgenes están comprometidos.`
    );
  }

  if (platforms.length === 1) {
    const name = platforms[0].charAt(0).toUpperCase() + platforms[0].slice(1);
    leaks.push(
      `Sin diversificación: dependencia total de ${name}. Un cambio de algoritmo puede afectar todo tu presupuesto de un día para el otro.`
    );
  }

  if (conversiones > 0 && ingresos > 0) {
    const cpa = calculateCPA(presupuesto, conversiones);
    const revenuePerConversion = ingresos / conversiones;
    if (cpa > revenuePerConversion * 0.5) {
      leaks.push(
        `CPA alto: $${cpa.toFixed(2)} — representa más del 50% del ingreso por conversión ($${revenuePerConversion.toFixed(2)}). Margen muy ajustado para ser sostenible.`
      );
    }
  }

  return leaks;
}
