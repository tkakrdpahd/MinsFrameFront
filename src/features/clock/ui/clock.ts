/**
 * Draw functions
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";
import {
    LAYER_COUNT,
    BASE_RADIUS,
    LAYER_RADIUS_SPACING,
    BASE_FREQ1,
    FREQ1_INCREMENT,
    BASE_FREQ2,
    FREQ2_INCREMENT,
    BASE_FREQ3,
    FREQ3_INCREMENT,
    TIME_SPEED1,
    TIME_SPEED2,
    TIME_SPEED3,
    BASE_AMPLITUDE1,
    AMPLITUDE1_INCREMENT,
    BASE_AMPLITUDE2,
    AMPLITUDE2_INCREMENT,
    BASE_AMPLITUDE3,
    AMPLITUDE3_INCREMENT,
    HOUR_HAND_LENGTH,
    MINUTE_HAND_LENGTH,
    SECOND_HAND_LENGTH,
    HOUR_HAND_WEIGHT,
    MINUTE_HAND_WEIGHT,
    SECOND_HAND_WEIGHT,
    DARK_MODE_STROKE_COLOR,
    DARK_MODE_FILL_COLOR,
    LIGHT_MODE_STROKE_COLOR,
    LIGHT_MODE_FILL_COLOR,
    HAND_COLOR,
    SECOND_HAND_COLOR,
    CENTER_DOT_COLOR_DARK,
    CENTER_DOT_COLOR_LIGHT,
    ANGLE_RESOLUTION,
    CENTER_DOT_SIZE,
    HOURS_IN_CLOCK,
    MINUTES_IN_HOUR,
    SECONDS_IN_MINUTE,
} from "../model";

export function setup(p: p5, container: HTMLDivElement | null) {
    if (container) {
        p.createCanvas(container.offsetWidth, container.offsetHeight);
    } else {
        p.createCanvas(window.innerWidth, window.innerHeight);
    }
    p.background(0, 0, 0, 0);
    // Limit frame rate for better performance
    p.frameRate(30);
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
        p.stroke(DARK_MODE_STROKE_COLOR.r, DARK_MODE_STROKE_COLOR.g, DARK_MODE_STROKE_COLOR.b, DARK_MODE_STROKE_COLOR.a);
        p.fill(DARK_MODE_FILL_COLOR.r, DARK_MODE_FILL_COLOR.g, DARK_MODE_FILL_COLOR.b, DARK_MODE_FILL_COLOR.a);
    } else {
        p.stroke(LIGHT_MODE_STROKE_COLOR.r, LIGHT_MODE_STROKE_COLOR.g, LIGHT_MODE_STROKE_COLOR.b, LIGHT_MODE_STROKE_COLOR.a);
        p.fill(LIGHT_MODE_FILL_COLOR.r, LIGHT_MODE_FILL_COLOR.g, LIGHT_MODE_FILL_COLOR.b, LIGHT_MODE_FILL_COLOR.a);
    }
    
    for (let layer = 0; layer < LAYER_COUNT; layer++) {
        const radius = BASE_RADIUS + layer * LAYER_RADIUS_SPACING;

        p.beginShape();
        for (let angle = 0; angle <= p.TWO_PI; angle += ANGLE_RESOLUTION) {
            const freq1 = BASE_FREQ1 + layer * FREQ1_INCREMENT;
            const freq2 = BASE_FREQ2 + layer * FREQ2_INCREMENT;
            const freq3 = BASE_FREQ3 + layer * FREQ3_INCREMENT;
            
            const waveX = 
                Math.sin(angle * freq1 + time * TIME_SPEED1) * (BASE_AMPLITUDE1 + layer * AMPLITUDE1_INCREMENT) +
                Math.cos(angle * freq2 + time * TIME_SPEED2) * (BASE_AMPLITUDE2 + layer * AMPLITUDE2_INCREMENT) -
                Math.sin(angle * freq3 + time * TIME_SPEED3) * (BASE_AMPLITUDE3 + layer * AMPLITUDE3_INCREMENT);
            
            const waveY = 
                Math.cos(angle * freq1 + time * TIME_SPEED1) * (BASE_AMPLITUDE1 + layer * AMPLITUDE1_INCREMENT) -
                Math.sin(angle * freq2 + time * TIME_SPEED2) * (BASE_AMPLITUDE2 + layer * AMPLITUDE2_INCREMENT) +
                Math.cos(angle * freq3 + time * TIME_SPEED3) * (BASE_AMPLITUDE3 + layer * AMPLITUDE3_INCREMENT);
            
            const x = centerX + radius * p.cos(angle) + waveX;
            const y = centerY + radius * p.sin(angle) + waveY;
            p.vertex(x, y);
        }
        p.endShape(p.CLOSE);
    }
    
    const hourAngle = p.map(hours + minutes / MINUTES_IN_HOUR, 0, HOURS_IN_CLOCK, 0, p.TWO_PI) - p.PI / 2;
    const minuteAngle = p.map(minutes + seconds / SECONDS_IN_MINUTE, 0, MINUTES_IN_HOUR, 0, p.TWO_PI) - p.PI / 2;
    const totalSeconds = seconds + milliseconds / 1000;
    const secondAngle = p.map(totalSeconds, 0, SECONDS_IN_MINUTE, 0, p.TWO_PI) - p.PI / 2;
    
    const hourEndX = centerX + HOUR_HAND_LENGTH * p.cos(hourAngle);
    const hourEndY = centerY + HOUR_HAND_LENGTH * p.sin(hourAngle);
    
    p.stroke(HAND_COLOR.r, HAND_COLOR.g, HAND_COLOR.b, HAND_COLOR.a);
    p.strokeWeight(HOUR_HAND_WEIGHT);
    p.line(centerX, centerY, hourEndX, hourEndY);
    
    const minuteEndX = centerX + MINUTE_HAND_LENGTH * p.cos(minuteAngle);
    const minuteEndY = centerY + MINUTE_HAND_LENGTH * p.sin(minuteAngle);
    
    p.stroke(HAND_COLOR.r, HAND_COLOR.g, HAND_COLOR.b, HAND_COLOR.a);
    p.strokeWeight(MINUTE_HAND_WEIGHT);
    p.line(centerX, centerY, minuteEndX, minuteEndY);
    
    const secondEndX = centerX + SECOND_HAND_LENGTH * p.cos(secondAngle);
    const secondEndY = centerY + SECOND_HAND_LENGTH * p.sin(secondAngle);
    
    p.stroke(SECOND_HAND_COLOR.r, SECOND_HAND_COLOR.g, SECOND_HAND_COLOR.b, SECOND_HAND_COLOR.a);
    p.strokeWeight(SECOND_HAND_WEIGHT);
    p.line(centerX, centerY, secondEndX, secondEndY);
    
    p.noStroke();
    const centerDotColor = darkMode ? CENTER_DOT_COLOR_DARK : CENTER_DOT_COLOR_LIGHT;
    p.fill(centerDotColor.r, centerDotColor.g, centerDotColor.b, centerDotColor.a);
    p.circle(centerX, centerY, CENTER_DOT_SIZE);
}