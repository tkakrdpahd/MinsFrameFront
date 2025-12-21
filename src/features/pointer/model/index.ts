export * from "./particle";
export * from "./pointer";

export const START_COLOR = {
    r: 225,
    g: 5,
    b: 49,
};

export const END_COLOR = {
    r: 242,
    g: 231,
    b: 80,
};

export interface Color {
    r: number;
    g: number;
    b: number;
}

export function lerpColor(start: Color, end: Color, t: number): Color {
    return {
        r: Math.round(start.r + (end.r - start.r) * t),
        g: Math.round(start.g + (end.g - start.g) * t),
        b: Math.round(start.b + (end.b - start.b) * t),
    };
}