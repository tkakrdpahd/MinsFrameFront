/**
 * Particle model
 */
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