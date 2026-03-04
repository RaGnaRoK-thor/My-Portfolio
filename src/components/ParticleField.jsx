// src/components/ParticleField.jsx
import React, { useRef, useEffect, useCallback } from "react";

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 100;
const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const MOUSE_RADIUS = 180;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;

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
                vx: (Math.random() - 0.5) * 0.35,
                vy: (Math.random() - 0.5) * 0.35,
                radius: Math.random() * 1.8 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                depth: Math.random(),
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (particlesRef.current.length === 0) {
                particlesRef.current = initParticles(window.innerWidth, window.innerHeight);
            }
        };

        // Throttle mouse events
        let lastMouseUpdate = 0;
        const handleMouse = (e) => {
            const now = performance.now();
            if (now - lastMouseUpdate < 16) return; // ~60fps cap on mouse updates
            lastMouseUpdate = now;
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        resize();
        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouse, { passive: true });
        window.addEventListener("mouseleave", handleMouseLeave);

        // Pre-create the glow gradient once and reuse
        let frameCount = 0;

        const animate = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Mouse parallax push — use squared distance to avoid sqrt
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < MOUSE_RADIUS_SQ && distSq > 0) {
                    const dist = Math.sqrt(distSq);
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

            // Draw connections — only every other frame for performance
            frameCount++;
            if (frameCount % 2 === 0) {
                ctx.lineWidth = 0.5;
                for (let i = 0; i < particles.length; i++) {
                    const a = particles[i];
                    for (let j = i + 1; j < particles.length; j++) {
                        const b = particles[j];
                        const dx = a.x - b.x;
                        // Quick reject on single axis before computing full distance
                        if (dx > CONNECTION_DISTANCE || dx < -CONNECTION_DISTANCE) continue;
                        const dy = a.y - b.y;
                        if (dy > CONNECTION_DISTANCE || dy < -CONNECTION_DISTANCE) continue;
                        const distSq = dx * dx + dy * dy;

                        if (distSq < CONNECTION_DIST_SQ) {
                            const opacity = (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * 0.12;
                            ctx.beginPath();
                            ctx.moveTo(a.x, a.y);
                            ctx.lineTo(b.x, b.y);
                            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
                            ctx.stroke();
                        }
                    }
                }
            }

            // Mouse glow — only every 3 frames
            if (frameCount % 3 === 0 && mouse.x > 0 && mouse.y > 0) {
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
