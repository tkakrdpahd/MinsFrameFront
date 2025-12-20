/**
 * Draw functions
 */

import type p5 from "p5";

function isDarkMode(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function setup(p: p5, container: HTMLDivElement | null) {
    if (container) {
        p.createCanvas(container.offsetWidth, container.offsetHeight);
    } else {
        p.createCanvas(window.innerWidth, window.innerHeight);
    }
    p.background(0, 0, 0, 0);
}

export function draw(p: p5, container: HTMLDivElement | null) {
    if (!container) return;
    
    const darkMode = isDarkMode();
    
    p.clear();
    p.noStroke();
    
    if (darkMode) {
        p.fill(255, 255, 255, 128);
    } else {
        p.fill(0, 0, 0, 128);
    }
    
    p.circle(container.offsetWidth / 2, container.offsetHeight / 2, 512);
    
    if (darkMode) {
        p.fill(250, 250, 51, 128);
    } else {
        p.fill(255, 244, 79, 128);
    }

    p.circle(p.mouseX, p.mouseY, 50);
}