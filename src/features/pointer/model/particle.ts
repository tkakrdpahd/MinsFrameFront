/**
 * Particle model
 */

export const INITIAL_LIFE = 50;
export const LIFE_DECREMENT = 1;

export const GRAVITY = 0.1;

export const PARTICLES_PER_FRAME = 50;
export const PARTICLE_SPAWN_OFFSET_MIN = -1;
export const PARTICLE_SPAWN_OFFSET_MAX = 1;
export const PARTICLE_RADIUS_MIN = 1;
export const PARTICLE_RADIUS_MAX = 5;

export const INITIAL_VELOCITY_X_MIN = -0.5;
export const INITIAL_VELOCITY_X_MAX = 0.5;
export const INITIAL_VELOCITY_Y_MIN = -0.5;
export const INITIAL_VELOCITY_Y_MAX = 0.5;

export const MOUSE_MOVE_THRESHOLD = 0.1;

export const DARK_MODE_COLOR: ParticleColor = {
    r: 250,
    g: 250,
    b: 51,
    a: 128,
};

export const LIGHT_MODE_COLOR: ParticleColor = {
    r: 255,
    g: 244,
    b: 79,
    a: 128,
};

interface ParticleColor {
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