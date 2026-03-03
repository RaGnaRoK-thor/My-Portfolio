// src/App.jsx
import React, { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ParticleField from "./components/ParticleField";
import NoiseMesh from "./components/NoiseMesh";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

const sectionIds = ["hero", "about", "projects", "contact"];
const sections = [Hero, About, Projects, Contact];

// Cinematic page-transition variants
const pageVariants = {
    initial: (direction) => ({
        opacity: 0,
        y: direction > 0 ? 80 : -80,
        scale: 0.96,
        filter: "blur(6px)",
    }),
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: (direction) => ({
        opacity: 0,
        y: direction > 0 ? -60 : 60,
        scale: 0.97,
        filter: "blur(4px)",
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function App() {
    const [activeSection, setActiveSection] = useState(0);
    const [direction, setDirection] = useState(1);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const navigateTo = useCallback(
        (index) => {
            if (index === activeSection || isTransitioning) return;
            if (index < 0 || index >= sections.length) return;
            setIsTransitioning(true);
            setDirection(index > activeSection ? 1 : -1);
            setActiveSection(index);
            setTimeout(() => setIsTransitioning(false), 800);
        },
        [activeSection, isTransitioning]
    );

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                navigateTo(activeSection + 1);
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                navigateTo(activeSection - 1);
            } else if (e.key === "Home") {
                e.preventDefault();
                navigateTo(0);
            } else if (e.key === "End") {
                e.preventDefault();
                navigateTo(sections.length - 1);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeSection, navigateTo]);

    // Mouse wheel navigation
    useEffect(() => {
        let wheelTimeout = null;
        const handleWheel = (e) => {
            e.preventDefault();
            if (wheelTimeout) return;
            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 1000);
            if (e.deltaY > 30) {
                navigateTo(activeSection + 1);
            } else if (e.deltaY < -30) {
                navigateTo(activeSection - 1);
            }
        };
        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [activeSection, navigateTo]);

    // Touch swipe navigation
    useEffect(() => {
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e) => {
            const delta = touchStartY - e.changedTouches[0].clientY;
            if (Math.abs(delta) > 60) {
                if (delta > 0) navigateTo(activeSection + 1);
                else navigateTo(activeSection - 1);
            }
        };
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });
        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [activeSection, navigateTo]);

    const ActiveComponent = sections[activeSection];

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-navy-900">
            {/* Cinematic background layers */}
            <ParticleField />
            <NoiseMesh activeSection={activeSection} />

            {/* Navbar */}
            <Navbar
                activeSection={activeSection}
                scrollToSection={navigateTo}
                sectionIds={sectionIds}
            />

            {/* Section content with cinematic transitions */}
            <div className="relative z-10 h-screen w-screen">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={activeSection}
                        custom={direction}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <ActiveComponent navigateTo={navigateTo} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Side dot navigation */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                {sectionIds.map((id, i) => (
                    <button
                        key={id}
                        onClick={() => navigateTo(i)}
                        className="group relative flex items-center justify-end"
                        aria-label={`Go to ${id} section`}
                    >
                        {/* Label tooltip */}
                        <span className="absolute right-6 px-2 py-1 rounded text-xs font-medium text-white/70 bg-navy-800/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none capitalize">
                            {id}
                        </span>
                        <motion.div
                            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${activeSection === i
                                    ? "bg-accent border-accent shadow-lg shadow-accent/50"
                                    : "bg-transparent border-white/20 hover:border-accent/60"
                                }`}
                            animate={
                                activeSection === i
                                    ? { scale: [1, 1.3, 1] }
                                    : { scale: 1 }
                            }
                            transition={
                                activeSection === i
                                    ? {
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }
                                    : {}
                            }
                        />
                    </button>
                ))}
            </div>

            {/* Bottom section counter */}
            <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3">
                <span className="text-xs font-mono text-white/20">
                    {String(activeSection + 1).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
                </span>
                <div className="w-16 h-px bg-white/10 relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent to-cyan-400"
                        animate={{
                            width: `${((activeSection + 1) / sections.length) * 100}%`,
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </div>
        </div>
    );
}
