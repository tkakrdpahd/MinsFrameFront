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
    
    const hours = new Date().getHours() % 12;
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const milliseconds = new Date().getMilliseconds();
    
    const time = (hours * 3600 + minutes * 60 + seconds + milliseconds / 1000);
    
    p.noStroke();
    
    if (darkMode) {
        p.stroke(242, 231, 80, 255);
        p.fill(242, 231, 80, 32);
    } else {
        p.stroke(0, 0, 0, 32);
        p.fill(0, 0, 0, 255);
    }
    
    for (let layer = 0; layer < 5; layer++) {

        const radius = 256 + layer * 100;

        p.beginShape();
        for (let angle = 0; angle <= p.TWO_PI; angle += 0.01) {
            const freq1 = 3 + layer * 2;
            const freq2 = 7 + layer * 3;
            const freq3 = 12 + layer * 5;
            
            const waveX = 
                Math.sin(angle * freq1 + time * 0.5) * (5 + layer * 3) +
                Math.cos(angle * freq2 + time * 0.30) * (3 + layer * 2) -
                Math.sin(angle * freq3 + time * 0.4) * (2 + layer * 1);
            
            const waveY = 
                Math.cos(angle * freq1 + time * 0.5) * (5 + layer * 3) -
                Math.sin(angle * freq2 + time * 0.30) * (3 + layer * 2) +
                Math.cos(angle * freq3 + time * 0.4) * (2 + layer * 1);
            
            const x = centerX + radius * p.cos(angle) + waveX;
            const y = centerY + radius * p.sin(angle) + waveY;
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
    }
    
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