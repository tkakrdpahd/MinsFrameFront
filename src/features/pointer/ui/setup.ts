/**
 * Setup function
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