/**
 * Draw functions
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";

export function setup(p: p5, container: HTMLDivElement | null) {
    if (container) {
        p.createCanvas(container.offsetWidth, container.offsetHeight);
    } else {
        p.createCanvas(window.innerWidth, window.innerHeight);
    }
    p.background(0, 0, 0, 0);
}

export function clock(p: p5, container: HTMLDivElement | null) {
    if (!container) return;
    
    const darkMode = isDarkMode();
    
    p.clear();
    
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;
    const radius = 256;
    
    p.noStroke();
    
    if (darkMode) {
        p.fill(255, 255, 255, 128);
    } else {
        p.fill(0, 0, 0, 128);
    }
    
    p.beginShape();
    for (let angle = 0; angle <= p.TWO_PI; angle += 0.01) {
        const x = centerX + radius * p.cos(angle);
        const y = centerY + radius * p.sin(angle);
        p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
    
    const handLength = 200;
    const handAngle = -p.PI / 2;
    
    const handEndX = centerX + handLength * p.cos(handAngle);
    const handEndY = centerY + handLength * p.sin(handAngle);
    
    p.stroke(255, 255, 255, 128);
    p.strokeWeight(1);
    p.line(centerX, centerY, handEndX, handEndY);
}