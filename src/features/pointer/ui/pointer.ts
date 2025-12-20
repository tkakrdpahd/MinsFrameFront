/**
 * Pointer function
 */

import type p5 from "p5";
import { isDarkMode } from "~/shared/mode/mode";

export function pointer(p: p5, container: HTMLDivElement | null) {
    if (!container) return;

    const darkMode = isDarkMode();

    p.noStroke();

    if (darkMode) {
        p.fill(250, 250, 51, 128);
    } else {
        p.fill(255, 244, 79, 128);
    }

    p.circle(p.mouseX, p.mouseY, 10);
}