/**
 * Particle function
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";
import type { Particle } from "../model";

const initialLife = 50;
const gravity = 0.2;
const particles: Particle[] = [];

export function particle(p: p5, container: HTMLDivElement | null) {
    if (!container) return;

    const darkMode = isDarkMode();
    
    p.noStroke();

    for (let i = 0; i < 5; i++) {
        particles.push({
            x: p.mouseX + p.random(-5, 5),
            y: p.mouseY + p.random(-5, 5),
            radius: p.random(5, 10),
            color: darkMode ? { r: 250, g: 250, b: 51, a: 128 } : { r: 255, g: 244, b: 79, a: 128 },
            life: initialLife,
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
        });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        
        particle.life -= 1;
        
        if (particle.life <= 0) {
            particles.splice(i, 1);
            continue;
        }
        
        particle.vy += gravity;
        
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        const alpha = (particle.life / initialLife) * particle.color.a;
        
        p.fill(particle.color.r, particle.color.g, particle.color.b, alpha);
        p.circle(particle.x, particle.y, particle.radius);
    }
}