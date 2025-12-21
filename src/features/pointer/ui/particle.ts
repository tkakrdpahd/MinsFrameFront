/**
 * Particle function
 */

import type p5 from "p5";
import type { Particle } from "../model";
import { 
    INITIAL_LIFE, LIFE_DECREMENT, 
    GRAVITY, 
    PARTICLES_PER_FRAME, PARTICLE_SPAWN_OFFSET_MIN, PARTICLE_SPAWN_OFFSET_MAX, PARTICLE_RADIUS_MIN, PARTICLE_RADIUS_MAX, 
    INITIAL_VELOCITY_X_MIN, INITIAL_VELOCITY_X_MAX, INITIAL_VELOCITY_Y_MIN, INITIAL_VELOCITY_Y_MAX, 
    MOUSE_MOVE_THRESHOLD,
    PARTICLE_ALPHA,
} from "../model";
import { START_COLOR, END_COLOR, lerpColor } from "../model";

const particles: Particle[] = [];

let currentMouseX = 0;
let currentMouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let isFirstFrame = true;

export function setMousePosition(x: number, y: number) {
    currentMouseX = x;
    currentMouseY = y;
}

export function getMousePosition() {
    return { x: currentMouseX, y: currentMouseY };
}

export function resetParticleState() {
    particles.length = 0;
    currentMouseX = 0;
    currentMouseY = 0;
    lastMouseX = 0;
    lastMouseY = 0;
    isFirstFrame = true;
}

export function particle(p: p5, container: HTMLDivElement | null) {
    if (!container) return;
    
    p.noStroke();

    let mouseMoved = false;
    if (!isFirstFrame) {
        const deltaX = Math.abs(currentMouseX - lastMouseX);
        const deltaY = Math.abs(currentMouseY - lastMouseY);
        mouseMoved = deltaX > MOUSE_MOVE_THRESHOLD || deltaY > MOUSE_MOVE_THRESHOLD;
    } else {
        isFirstFrame = false;
    }

    if (mouseMoved) {
        for (let i = 0; i < PARTICLES_PER_FRAME; i++) {
            particles.push({
                x: currentMouseX + p.random(PARTICLE_SPAWN_OFFSET_MIN, PARTICLE_SPAWN_OFFSET_MAX),
                y: currentMouseY + p.random(PARTICLE_SPAWN_OFFSET_MIN, PARTICLE_SPAWN_OFFSET_MAX),
                radius: p.random(PARTICLE_RADIUS_MIN, PARTICLE_RADIUS_MAX),
                color: {
                    r: START_COLOR.r,
                    g: START_COLOR.g,
                    b: START_COLOR.b,
                    a: PARTICLE_ALPHA,
                },
                life: INITIAL_LIFE,
                vx: p.random(INITIAL_VELOCITY_X_MIN, INITIAL_VELOCITY_X_MAX),
                vy: p.random(INITIAL_VELOCITY_Y_MIN, INITIAL_VELOCITY_Y_MAX),
            });
        }
    }

    lastMouseX = currentMouseX;
    lastMouseY = currentMouseY;

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.life -= LIFE_DECREMENT;
        
        if (particle.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        
        particle.vy += GRAVITY;
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        const lifeRatio = particle.life / INITIAL_LIFE;
        const colorRatio = 1 - lifeRatio;
        const currentColor = lerpColor(START_COLOR, END_COLOR, colorRatio);
        const alpha = lifeRatio * PARTICLE_ALPHA;
        
        p.fill(currentColor.r, currentColor.g, currentColor.b, alpha);
        p.circle(particle.x, particle.y, particle.radius);
    }
}