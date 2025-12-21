/**
 * Pointer component
 */

import type p5 from "p5";
import { useEffect, useState, useRef } from "react";
import { setup, pointer, particle, setMousePosition, resetParticleState } from "./ui";

export function Pointer() {
    const [p5Loaded, setP5Loaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<p5>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef.current) return;

        resetParticleState();

        const updatePosition = (clientX: number, clientY: number) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            setMousePosition(x, y);
        };

        const handleMouseMove = (e: MouseEvent) => {
            updatePosition(e.clientX, e.clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });

        import("p5").then((p5Module) => {
            const p5 = p5Module.default;
            const sketch = new p5((p: typeof p5Module.default.prototype) => {
                p.setup = () => {
                    setup(p, containerRef.current);
                };
                p.draw = () => {
                    p.clear();

                    particle(p, containerRef.current);
                    pointer(p, containerRef.current);
                };
            }, containerRef.current as HTMLElement);

            setP5Loaded(true);

            sketchRef.current = sketch;

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchstart', handleTouchStart);
                if (sketchRef.current) {
                    sketchRef.current.remove();
                }
            };
        });
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full">
            {!p5Loaded && <></>}
        </div>
    );
}