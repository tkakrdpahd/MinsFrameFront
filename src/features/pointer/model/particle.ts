/**
 * Particle model
 */

export const INITIAL_LIFE = 50;
export const LIFE_DECREMENT = 1;

export const GRAVITY = 0.1;

export const PARTICLES_PER_FRAME = 8;
export const PARTICLE_SPAWN_OFFSET_MIN = -0.25;
export const PARTICLE_SPAWN_OFFSET_MAX = 0.25;
export const PARTICLE_RADIUS_MIN = 3;
export const PARTICLE_RADIUS_MAX = 5;

export const INITIAL_VELOCITY_X_MIN = -0.5;
export const INITIAL_VELOCITY_X_MAX = 0.5;
export const INITIAL_VELOCITY_Y_MIN = -0.5;
export const INITIAL_VELOCITY_Y_MAX = 0.5;

export const MOUSE_MOVE_THRESHOLD = 0.1;

export const PARTICLE_ALPHA = 128;

// Performance optimization
export const MAX_PARTICLES = 200;

export interface ParticleColor {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Particle {
    x: number;
    y: number;
    radius: number;
    color: ParticleColor;
    life: number;
    vx: number;
    vy: number;
}