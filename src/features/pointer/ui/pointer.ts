/**
 * Pointer function
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";
import { getMousePosition } from "./particle";
import type { PointerParticle } from "../model/pointer";
import { 
    POINTER_LIFE, 
    POINTER_LIFE_DECREMENT, 
    POINTER_RADIUS, 
    POINTERS_PER_FRAME, 
    SMOOTHING, 
    FLAME_INTENSITY, 
    VELOCITY_DAMPING,
    VELOCITY_ACCELERATION,
    NOISE_VELOCITY_MULTIPLIER,
    POINTER_SPAWN_OFFSET_MIN,
    POINTER_SPAWN_OFFSET_MAX,
    POINTER_ALPHA,
    POINTER_DARK_MODE_COLOR,
    POINTER_LIGHT_MODE_COLOR,
} from "../model/pointer";

const pointerParticles: PointerParticle[] = [];

let displayX = 0;
let displayY = 0;
let velocityX = 0;
let velocityY = 0;

export function resetPointerState() {
    pointerParticles.length = 0;
    displayX = 0;
    displayY = 0;
    velocityX = 0;
    velocityY = 0;
}

export function pointer(p: p5, container: HTMLDivElement | null) {
    if (!container) return;

    const darkMode = isDarkMode();
    const { x: targetX, y: targetY } = getMousePosition();

    const deltaX = targetX - displayX;
    const deltaY = targetY - displayY;
    
    velocityX += deltaX * VELOCITY_ACCELERATION;
    velocityY += deltaY * VELOCITY_ACCELERATION;
    
    velocityX *= VELOCITY_DAMPING;
    velocityY *= VELOCITY_DAMPING;
    
    const noiseX = p.random(-FLAME_INTENSITY, FLAME_INTENSITY) * Math.abs(velocityX) * NOISE_VELOCITY_MULTIPLIER;
    const noiseY = p.random(-FLAME_INTENSITY, FLAME_INTENSITY) * Math.abs(velocityY) * NOISE_VELOCITY_MULTIPLIER;
    
    displayX = p.lerp(displayX, targetX + noiseX, SMOOTHING);
    displayY = p.lerp(displayY, targetY + noiseY, SMOOTHING);

    for (let i = 0; i < POINTERS_PER_FRAME; i++) {
        pointerParticles.push({
            x: displayX + p.random(POINTER_SPAWN_OFFSET_MIN, POINTER_SPAWN_OFFSET_MAX),
            y: displayY + p.random(POINTER_SPAWN_OFFSET_MIN, POINTER_SPAWN_OFFSET_MAX),
            radius: POINTER_RADIUS,
            life: POINTER_LIFE,
            maxLife: POINTER_LIFE,
        });
    }

    p.noStroke();

    for (let i = pointerParticles.length - 1; i >= 0; i--) {
        const particle = pointerParticles[i];
        
        particle.life -= POINTER_LIFE_DECREMENT;
        
        if (particle.life <= 0) {
            pointerParticles.splice(i, 1);
            continue;
        }
        
        const lifeRatio = particle.life / particle.maxLife;
        const alpha = lifeRatio * POINTER_ALPHA;
        const currentRadius = particle.radius * lifeRatio;
        
        const color = darkMode ? POINTER_DARK_MODE_COLOR : POINTER_LIGHT_MODE_COLOR;
        p.fill(color.r, color.g, color.b, alpha);

        p.circle(particle.x, particle.y, currentRadius);
    }
}