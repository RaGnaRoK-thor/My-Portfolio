// src/components/ParticleField.jsx
import React, { useRef, useEffect, useCallback } from "react";

const PARTICLE_COUNT = 120;
const CONNECTION_DISTANCE = 120;
const MOUSE_RADIUS = 200;

export default function ParticleField() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef([]);
    const animFrameRef = useRef(null);

    const initParticles = useCallback((w, h) => {
        const particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.8 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                // Depth layer for parallax: 0 = far, 1 = close
                depth: Math.random(),
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(canvas.width, canvas.height);
            }
        };

        const handleMouse = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouse);
        window.addEventListener("mouseleave", handleMouseLeave);

        const animate = () => {
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse parallax push
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MOUSE_RADIUS) {
                    const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.015 * (1 + p.depth);
                    p.vx -= dx * force;
                    p.vy -= dy * force;
                }

                // Dampen velocity
                p.vx *= 0.99;
                p.vy *= 0.99;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < -10) p.x = w + 10;
                if (p.x > w + 10) p.x = -10;
                if (p.y < -10) p.y = h + 10;
                if (p.y > h + 10) p.y = -10;

                // Draw particle
                const brightness = 140 + p.depth * 115;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius * (0.6 + p.depth * 0.6), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${brightness}, ${brightness + 30}, 255, ${p.opacity})`;
                ctx.fill();
            }

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < CONNECTION_DISTANCE) {
                        const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.12;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Mouse glow
            if (mouse.x > 0 && mouse.y > 0) {
                const grd = ctx.createRadialGradient(
                    mouse.x, mouse.y, 0,
                    mouse.x, mouse.y, MOUSE_RADIUS
                );
                grd.addColorStop(0, "rgba(139, 92, 246, 0.06)");
                grd.addColorStop(0.5, "rgba(34, 211, 238, 0.03)");
                grd.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, w, h);
            }

            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [initParticles]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ background: "transparent" }}
        />
    );
}
