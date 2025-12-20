/**
 * Particle function
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";
import type { Particle } from "../model";
import { 
    INITIAL_LIFE, LIFE_DECREMENT, 
    GRAVITY, 
    PARTICLES_PER_FRAME, PARTICLE_SPAWN_OFFSET_MIN, PARTICLE_SPAWN_OFFSET_MAX, PARTICLE_RADIUS_MIN, PARTICLE_RADIUS_MAX, 
    INITIAL_VELOCITY_X_MIN, INITIAL_VELOCITY_X_MAX, INITIAL_VELOCITY_Y_MIN, INITIAL_VELOCITY_Y_MAX, 
    MOUSE_MOVE_THRESHOLD, 
    DARK_MODE_COLOR, LIGHT_MODE_COLOR 
} from "../model";

const particles: Particle[] = [];

let lastMouseX = 0;
let lastMouseY = 0;
let isFirstFrame = true;

export function particle(p: p5, container: HTMLDivElement | null) {
    if (!container) return;

    const darkMode = isDarkMode();
    
    p.noStroke();

    let mouseMoved = false;
    if (!isFirstFrame) {
        const deltaX = Math.abs(p.mouseX - lastMouseX);
        const deltaY = Math.abs(p.mouseY - lastMouseY);
        mouseMoved = deltaX > MOUSE_MOVE_THRESHOLD || deltaY > MOUSE_MOVE_THRESHOLD;
    } else {
        isFirstFrame = false;
    }

    if (mouseMoved) {
        const particleColor = darkMode ? DARK_MODE_COLOR : LIGHT_MODE_COLOR;
        
        for (let i = 0; i < PARTICLES_PER_FRAME; i++) {
            particles.push({
                x: p.mouseX + p.random(PARTICLE_SPAWN_OFFSET_MIN, PARTICLE_SPAWN_OFFSET_MAX),
                y: p.mouseY + p.random(PARTICLE_SPAWN_OFFSET_MIN, PARTICLE_SPAWN_OFFSET_MAX),
                radius: p.random(PARTICLE_RADIUS_MIN, PARTICLE_RADIUS_MAX),
                color: particleColor,
                life: INITIAL_LIFE,
                vx: p.random(INITIAL_VELOCITY_X_MIN, INITIAL_VELOCITY_X_MAX),
                vy: p.random(INITIAL_VELOCITY_Y_MIN, INITIAL_VELOCITY_Y_MAX),
            });
        }
    }

    lastMouseX = p.mouseX;
    lastMouseY = p.mouseY;

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
        
        const alpha = (particle.life / INITIAL_LIFE) * particle.color.a;
        
        p.fill(particle.color.r, particle.color.g, particle.color.b, alpha);
        p.circle(particle.x, particle.y, particle.radius);
    }
}