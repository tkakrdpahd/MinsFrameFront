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

        // 페이지 이동 시 상태 초기화
        resetParticleState();

        // 네이티브 마우스 이벤트 리스너
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition(x, y);
        };

        window.addEventListener('mousemove', handleMouseMove);

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