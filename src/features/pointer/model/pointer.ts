/**
 * Pointer model
 */
export const POINTER_LIFE = 25;
export const POINTER_LIFE_DECREMENT = 1;
export const POINTER_RADIUS = 50;
export const POINTERS_PER_FRAME = 1;
export const SMOOTHING = 0.5;
export const FLAME_INTENSITY = 5;
export const VELOCITY_DAMPING = 0.5;

export const VELOCITY_ACCELERATION = 0.1;
export const NOISE_VELOCITY_MULTIPLIER = 0.1;

export const POINTER_SPAWN_OFFSET_MIN = -2;
export const POINTER_SPAWN_OFFSET_MAX = 2;

export const POINTER_ALPHA = 128;

export const MIN_RADIUS_RATIO = 0.5;
export const RADIUS_PEAK_LIFE = 0.5;

export interface PointerParticle {
    x: number;
    y: number;
    radius: number;
    life: number;
    maxLife: number;
}