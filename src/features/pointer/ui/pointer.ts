/**
 * Pointer function
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";

let wasMousePressed = false;

export function setup(p: p5, container: HTMLDivElement | null) {
    if (container) {
        p.createCanvas(container.offsetWidth, container.offsetHeight);
    } else {
        p.createCanvas(window.innerWidth, window.innerHeight);
    }
    p.background(0, 0, 0, 0);
    wasMousePressed = false;
}

export function pointer(p: p5, container: HTMLDivElement | null) {
    if (!container) return;

    const darkMode = isDarkMode();

    if (wasMousePressed && !p.mouseIsPressed) {
        p.clear();
    }
    
    wasMousePressed = p.mouseIsPressed;

    if (p.keyIsDown("f")) {
        p.clear();
    }

    p.noStroke();

    if (darkMode) {
        p.fill(250, 250, 51, 128);
    } else {
        p.fill(255, 244, 79, 128);
    }

    if (p.keyIsDown("d") || p.mouseIsPressed) {
        p.circle(p.mouseX, p.mouseY, 50);
    }
}