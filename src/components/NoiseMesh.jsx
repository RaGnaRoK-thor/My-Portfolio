// src/components/NoiseMesh.jsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

// Color palettes for each section
const palettes = {
    0: { // Hero – purple/violet
        blob1: "rgba(139, 92, 246, 0.18)",
        blob2: "rgba(88, 28, 235, 0.12)",
        blob3: "rgba(34, 211, 238, 0.10)",
    },
    1: { // About – cyan/teal
        blob1: "rgba(34, 211, 238, 0.16)",
        blob2: "rgba(139, 92, 246, 0.10)",
        blob3: "rgba(16, 185, 129, 0.12)",
    },
    2: { // Projects – pink/magenta
        blob1: "rgba(168, 85, 247, 0.15)",
        blob2: "rgba(236, 72, 153, 0.12)",
        blob3: "rgba(34, 211, 238, 0.08)",
    },
    3: { // Contact – warm violet
        blob1: "rgba(139, 92, 246, 0.14)",
        blob2: "rgba(99, 102, 241, 0.12)",
        blob3: "rgba(34, 211, 238, 0.10)",
    },
};

export default function NoiseMesh({ activeSection = 0 }) {
    const colors = palettes[activeSection] || palettes[0];

    return (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
            {/* Large morphing blobs */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`mesh-${activeSection}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Blob 1 - Top right */}
                    <motion.div
                        className="absolute rounded-full blur-[120px]"
                        style={{
                            width: "50vw",
                            height: "50vw",
                            maxWidth: "700px",
                            maxHeight: "700px",
                            right: "-10%",
                            top: "-15%",
                            background: colors.blob1,
                        }}
                        animate={{
                            x: [0, 30, -20, 0],
                            y: [0, -25, 15, 0],
                            scale: [1, 1.15, 0.95, 1],
                        }}
                        transition={{
                            duration: 16,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    {/* Blob 2 - Bottom left */}
                    <motion.div
                        className="absolute rounded-full blur-[100px]"
                        style={{
                            width: "40vw",
                            height: "40vw",
                            maxWidth: "550px",
                            maxHeight: "550px",
                            left: "-8%",
                            bottom: "-10%",
                            background: colors.blob2,
                        }}
                        animate={{
                            x: [0, -20, 25, 0],
                            y: [0, 20, -15, 0],
                            scale: [1, 1.1, 0.9, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2,
                        }}
                    />

                    {/* Blob 3 - Center */}
                    <motion.div
                        className="absolute rounded-full blur-[140px]"
                        style={{
                            width: "35vw",
                            height: "35vw",
                            maxWidth: "500px",
                            maxHeight: "500px",
                            left: "35%",
                            top: "30%",
                            background: colors.blob3,
                        }}
                        animate={{
                            x: [0, 40, -30, 0],
                            y: [0, -30, 20, 0],
                            scale: [0.9, 1.05, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 24,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 4,
                        }}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }}
            />
        </div>
    );
}
