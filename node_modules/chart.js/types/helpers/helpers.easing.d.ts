import { EasingFunction } from 'chart.js';

export type EasingFunctionSignature = (t: number) => number;

export const easingEffects: Record<EasingFunction, EasingFunctionSignature>;
