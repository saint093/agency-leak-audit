export const BENCHMARKS = {
  meta: {
    ctr: { average: 0.9, good: 1.5 },
    cpc: { average: 0.97 },
  },
  google: {
    ctr: { average: 3.17, good: 5.0 },
    cpc: { average: 2.69 },
  },
  tiktok: {
    ctr: { average: 1.0, good: 2.0 },
    cpc: { average: 0.80 },
  },
} as const;

export const HEALTHY_ROAS = 3;
