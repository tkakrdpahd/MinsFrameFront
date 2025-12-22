/**
 * Pointer function
 */

import type p5 from "p5";
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
    MIN_RADIUS_RATIO,
    RADIUS_PEAK_LIFE,
    MAX_POINTER_PARTICLES,
} from "../model/pointer";
import { MOUSE_MOVE_THRESHOLD } from "../model/particle";
import { START_COLOR, END_COLOR, lerpColor } from "../model";

const pointerParticles: PointerParticle[] = [];

let displayX = 0;
let displayY = 0;
let velocityX = 0;
let velocityY = 0;
let lastDisplayX = 0;
let lastDisplayY = 0;
let isFirstFrame = true;

export function resetPointerState() {
    pointerParticles.length = 0;
    displayX = 0;
    displayY = 0;
    velocityX = 0;
    velocityY = 0;
    lastDisplayX = 0;
    lastDisplayY = 0;
    isFirstFrame = true;
}

export function pointer(p: p5, container: HTMLDivElement | null) {
    if (!container) return;

    const { x: targetX, y: targetY } = getMousePosition();

    if (targetX === 0 && targetY === 0) {
        p.noStroke();
        
        for (let i = pointerParticles.length - 1; i >= 0; i--) {
            const particle = pointerParticles[i];
            
            particle.life -= POINTER_LIFE_DECREMENT;
            
            if (particle.life <= 0) {
                pointerParticles.splice(i, 1);
                continue;
            }
            
            const lifeRatio = particle.life / particle.maxLife;
            const colorRatio = 1 - lifeRatio;
            const currentColor = lerpColor(START_COLOR, END_COLOR, colorRatio);
            const alpha = lifeRatio * POINTER_ALPHA;
            
            let radiusRatio: number;
            if (lifeRatio > RADIUS_PEAK_LIFE) {
                const t = (1 - lifeRatio) / (1 - RADIUS_PEAK_LIFE);
                radiusRatio = p.lerp(1.0, MIN_RADIUS_RATIO, t);
            } else {
                const t = (RADIUS_PEAK_LIFE - lifeRatio) / RADIUS_PEAK_LIFE;
                radiusRatio = p.lerp(MIN_RADIUS_RATIO, 0, t);
            }
            const currentRadius = particle.radius * radiusRatio;
            
            p.fill(currentColor.r, currentColor.g, currentColor.b, alpha);
            p.circle(particle.x, particle.y, currentRadius);
        }
        return;
    }

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

    let mouseMoved = false;
    if (!isFirstFrame) {
        const deltaX = Math.abs(displayX - lastDisplayX);
        const deltaY = Math.abs(displayY - lastDisplayY);
        mouseMoved = deltaX > MOUSE_MOVE_THRESHOLD || deltaY > MOUSE_MOVE_THRESHOLD;
    } else {
        isFirstFrame = false;
    }

    if (mouseMoved) {
        // Limit particle count for performance
        if (pointerParticles.length >= MAX_POINTER_PARTICLES) {
            pointerParticles.splice(0, POINTERS_PER_FRAME);
        }
        
        for (let i = 0; i < POINTERS_PER_FRAME; i++) {
            pointerParticles.push({
                x: displayX + p.random(POINTER_SPAWN_OFFSET_MIN, POINTER_SPAWN_OFFSET_MAX),
                y: displayY + p.random(POINTER_SPAWN_OFFSET_MIN, POINTER_SPAWN_OFFSET_MAX),
                radius: POINTER_RADIUS,
                life: POINTER_LIFE,
                maxLife: POINTER_LIFE,
            });
        }
    }

    lastDisplayX = displayX;
    lastDisplayY = displayY;

    p.noStroke();

    for (let i = pointerParticles.length - 1; i >= 0; i--) {
        const particle = pointerParticles[i];
        
        particle.life -= POINTER_LIFE_DECREMENT;
        
        if (particle.life <= 0) {
            pointerParticles.splice(i, 1);
            continue;
        }
        
        const lifeRatio = particle.life / particle.maxLife;
        const colorRatio = 1 - lifeRatio;
        const currentColor = lerpColor(START_COLOR, END_COLOR, colorRatio);
        const alpha = lifeRatio * POINTER_ALPHA;
        
        let radiusRatio: number;
        if (lifeRatio > RADIUS_PEAK_LIFE) {
            const t = (1 - lifeRatio) / (1 - RADIUS_PEAK_LIFE);
            radiusRatio = p.lerp(1.0, MIN_RADIUS_RATIO, t);
        } else {
            const t = (RADIUS_PEAK_LIFE - lifeRatio) / RADIUS_PEAK_LIFE;
            radiusRatio = p.lerp(MIN_RADIUS_RATIO, 0, t);
        }
        const currentRadius = particle.radius * radiusRatio;
        
        p.fill(currentColor.r, currentColor.g, currentColor.b, alpha);
        p.circle(particle.x, particle.y, currentRadius);
    }

    if (!mouseMoved) {
        const currentColor = lerpColor(START_COLOR, END_COLOR, 0);
        p.fill(currentColor.r, currentColor.g, currentColor.b, POINTER_ALPHA);
        p.circle(displayX, displayY, POINTER_RADIUS);
    }
}