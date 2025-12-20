/**
 * Clock component
 */
import type p5 from "p5";
import { useEffect, useState, useRef } from "react";
import { setup, draw } from "./ui/draw";

export function Clock() {
    const [p5Loaded, setP5Loaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<p5>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!containerRef.current) return;

        import("p5").then((p5Module) => {
            const p5 = p5Module.default;
            const sketch = new p5((p: typeof p5Module.default.prototype) => {
                p.setup = () => {
                    setup(p, containerRef.current);
                };
                p.draw = () => {
                    draw(p, containerRef.current);
                };
            }, containerRef.current as HTMLElement);
            
            setP5Loaded(true);
            
            sketchRef.current = sketch;

            return () => {
                if (sketchRef.current) {
                    sketchRef.current.remove();
                }
            };
        });
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full">
            {!p5Loaded && <div>Loading...</div>}
        </div>
    );
}