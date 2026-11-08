/**
 * Siisti360 Pricing Engine & Booking Rules
 * Pure calculation logic decoupled from React UI for fast deterministic testing.
 */

export type PricingModel = 'hourly' | 'fixed' | 'monthly' | 'contract' | 'oneTime';
export type ServiceType = 'standard' | 'deep' | 'move' | 'office' | 'carpet' | 'sofa';
export type ExtraOption = 'windows' | 'oven' | 'fridge' | 'sofa';

export interface EstimateInput {
  model?: PricingModel;
  service?: ServiceType;
  area: number;
  extras?: ExtraOption[];
}

export interface EstimateResult {
  model: PricingModel;
  service: ServiceType;
  area: number;
  hours: number;
  visits: number;
  unit: 'hour' | 'visit' | 'month';
  extras: ExtraOption[];
  basePrice: number;
  extrasTotal: number;
  total: number;
  currency: 'EUR';
}

export const DEMO_RATES = {
  hourly: { rate: 43, minHours: 2 },
  fixed: { base: 149, includedHours: 3, extraRate: 39 },
  monthly: { base: 189, includedHours: 4, extraRate: 39 },
  contract: { base: 549, includedHours: 12, extraRate: 35 },
  oneTime: { base: 179, includedHours: 3, extraRate: 49 },
} as const;

export const EXTRAS_PRICES: Record<ExtraOption, number> = {
  windows: 29,
  oven: 24,
  fridge: 19,
  sofa: 39,
};

export const SERVICE_MULTIPLIERS: Record<ServiceType, number> = {
  standard: 1.0,
  deep: 1.55,
  move: 1.45,
  office: 1.12,
  carpet: 1.25,
  sofa: 1.22,
};

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const model: PricingModel = input.model && input.model in DEMO_RATES ? input.model : 'hourly';
  const service: ServiceType = input.service && input.service in SERVICE_MULTIPLIERS ? input.service : 'standard';
  const area = Number(input.area);

  if (!Number.isFinite(area) || area < 10 || area > 1000) {
    throw new Error('Pinta-alan tulee olla 10 ja 1000 m² välillä.');
  }

  const validExtras = (input.extras || []).filter((e): e is ExtraOption => e in EXTRAS_PRICES);
  const uniqueExtras = Array.from(new Set(validExtras));

  // Base labor hours calculation
  const calculatedHours = Math.max(2, (0.65 + area / 35) * SERVICE_MULTIPLIERS[service]);
  const hours = Math.ceil(calculatedHours * 2) / 2; // round to nearest half-hour

  let basePrice = 0;
  let unit: 'hour' | 'visit' | 'month' = 'visit';
  let visits = 1;

  if (model === 'hourly') {
    unit = 'hour';
    const cfg = DEMO_RATES.hourly;
    basePrice = Math.max(hours, cfg.minHours) * cfg.rate;
  } else if (model === 'fixed') {
    unit = 'visit';
    const cfg = DEMO_RATES.fixed;
    const extraHours = Math.max(0, hours - cfg.includedHours);
    basePrice = cfg.base + extraHours * cfg.extraRate;
  } else if (model === 'oneTime') {
    unit = 'visit';
    const cfg = DEMO_RATES.oneTime;
    const extraHours = Math.max(0, hours - cfg.includedHours);
    basePrice = cfg.base + extraHours * cfg.extraRate;
  } else if (model === 'monthly') {
    unit = 'month';
    const cfg = DEMO_RATES.monthly;
    const extraHours = Math.max(0, hours - cfg.includedHours);
    basePrice = cfg.base + extraHours * cfg.extraRate;
  } else if (model === 'contract') {
    unit = 'month';
    visits = 4;
    const cfg = DEMO_RATES.contract;
    const totalContractHours = hours * 4;
    const extraHours = Math.max(0, totalContractHours - cfg.includedHours);
    basePrice = cfg.base + extraHours * cfg.extraRate;
  }

  const extrasPerVisit = uniqueExtras.reduce((sum, extra) => sum + EXTRAS_PRICES[extra], 0);
  const extrasTotal = extrasPerVisit * (model === 'contract' ? visits : 1);
  const total = Math.round((basePrice + extrasTotal) * 100) / 100;

  return {
    model,
    service,
    area,
    hours,
    visits,
    unit,
    extras: uniqueExtras,
    basePrice: Math.round(basePrice * 100) / 100,
    extrasTotal: Math.round(extrasTotal * 100) / 100,
    total,
    currency: 'EUR',
  };
}

export const STANDARD_BOOKING_SLOTS = ['09:00', '11:00', '13:00', '15:00'];

export function getAvailableSlots(dateString: string): string[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return [];
  const date = new Date(dateString + 'T12:00:00Z');
  if (isNaN(date.getTime()) || date.getUTCDay() === 0) {
    // Closed on Sundays
    return [];
  }

  return [...STANDARD_BOOKING_SLOTS];
}

export function formatEuro(amount: number, lang: 'fi' | 'sv' | 'en' = 'fi'): string {
  const locale = lang === 'en' ? 'en-FI' : 'fi-FI';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
}
