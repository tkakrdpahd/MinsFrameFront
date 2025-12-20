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
    
    const hours = new Date().getHours() % 12;
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const milliseconds = new Date().getMilliseconds();
    
    p.noStroke();
    
    if (darkMode) {
        p.fill(255, 255, 255, 128);
    } else {
        p.fill(0, 0, 0, 32);
    }
    
    p.beginShape();
    for (let angle = 0; angle <= p.TWO_PI; angle += 0.01) {
        const x = centerX + radius * p.cos(angle);
        const y = centerY + radius * p.sin(angle);
        p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
    
    const hourAngle = p.map(hours + minutes / 60, 0, 12, 0, p.TWO_PI) - p.PI / 2;
    const minuteAngle = p.map(minutes + seconds / 60, 0, 60, 0, p.TWO_PI) - p.PI / 2;
    const totalSeconds = seconds + milliseconds / 1000;
    const secondAngle = p.map(totalSeconds, 0, 60, 0, p.TWO_PI) - p.PI / 2;
    
    const hourHandLength = 120;
    const minuteHandLength = 160;
    const secondHandLength = 180;
    
    const hourEndX = centerX + hourHandLength * p.cos(hourAngle);
    const hourEndY = centerY + hourHandLength * p.sin(hourAngle);
    
    p.stroke(255, 255, 255, 200);
    p.strokeWeight(4);
    p.line(centerX, centerY, hourEndX, hourEndY);
    
    const minuteEndX = centerX + minuteHandLength * p.cos(minuteAngle);
    const minuteEndY = centerY + minuteHandLength * p.sin(minuteAngle);
    
    p.stroke(255, 255, 255, 200);
    p.strokeWeight(3);
    p.line(centerX, centerY, minuteEndX, minuteEndY);
    
    const secondEndX = centerX + secondHandLength * p.cos(secondAngle);
    const secondEndY = centerY + secondHandLength * p.sin(secondAngle);
    
    p.stroke(255, 0, 0, 255);
    p.strokeWeight(2);
    p.line(centerX, centerY, secondEndX, secondEndY);
    
    p.noStroke();
    if (darkMode) {
        p.fill(255, 255, 255, 255);
    } else {
        p.fill(0, 0, 0, 255);
    }
    p.circle(centerX, centerY, 8);
}