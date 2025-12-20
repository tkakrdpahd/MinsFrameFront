/**
 * Draw functions
 */

import type p5 from "p5";

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
    p.clear();
    p.noStroke();
    p.fill(255, 255, 255, 128);
    p.circle(container.offsetWidth / 2, container.offsetHeight / 2, 255);
    p.circle(p.mouseX, p.mouseY, 50);
}