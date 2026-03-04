// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";

// Typed role text using a state-based approach (no motion.span per char)
function TypedRole() {
    const fullText = "Full Stack Developer & AI Enthusiast";
    const [displayText, setDisplayText] = useState("");
    const [started, setStarted] = useState(false);

    // Wait for the parent fade-in animation to complete before typing
    useEffect(() => {
        const startDelay = setTimeout(() => setStarted(true), 1800);
        return () => clearTimeout(startDelay);
    }, []);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const timer = setInterval(() => {
            if (i < fullText.length) {
                setDisplayText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 35);
        return () => clearInterval(timer);
    }, [started]);

    // Render with & highlighted
    const parts = displayText.split("&");
    return (
        <span>
            {parts[0]}
            {parts.length > 1 && <span className="text-cyan-400">&amp;</span>}
            {parts.length > 1 && parts[1]}
            <span
                className="inline-block w-[2px] h-5 bg-accent-light ml-1"
                style={{ animation: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
            />
        </span>
    );
}

// Name reveal — uses CSS animation classes, not per-char motion.span
function CinematicName({ text }) {
    return (
        <span className="inline-block overflow-hidden">
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="inline-block animate-[slideUp_0.7s_ease-out_both]"
                    style={{ animationDelay: `${0.6 + i * 0.06}s` }}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

const fadeIn = (delay) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero({ navigateTo }) {
    return (
        <div className="w-full min-h-full flex items-center justify-center relative px-4 sm:px-6 py-20 sm:py-6">
            {/* Radial spotlight behind name */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-[600px] h-[600px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(34,211,238,0.05) 40%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl">
                {/* Greeting badge */}
                <motion.div {...fadeIn(0.2)} className="mb-4 sm:mb-8">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass text-xs sm:text-sm font-medium text-white/60">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Available for opportunities
                    </span>
                </motion.div>

                {/* Name */}
                <motion.div {...fadeIn(0.3)} className="mb-3 sm:mb-6">
                    <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight font-display">
                        <span className="text-white">Hi, I'm </span>
                        <span className="gradient-text">Ushnish</span>
                    </div>
                </motion.div>

                {/* Role typed out */}
                <motion.div
                    {...fadeIn(1.6)}
                    className="text-sm sm:text-xl md:text-2xl font-light text-white/40 mb-4 sm:mb-8 font-mono"
                >
                    <TypedRole />
                </motion.div>

                {/* Tagline */}
                <motion.p
                    {...fadeIn(2.2)}
                    className="text-sm sm:text-lg text-white/30 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed"
                >
                    Fresher with freelance experience building{" "}
                    <span className="text-accent-light/70">AI-powered platforms</span>,{" "}
                    <span className="text-cyan-400/70">full-stack applications</span>, and{" "}
                    <span className="text-accent-light/70">intelligent automation</span>.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    {...fadeIn(2.5)}
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-12"
                >
                    <motion.button
                        onClick={() => navigateTo?.(2)}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.35)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-semibold text-white text-sm sm:text-base
                            bg-gradient-to-r from-accent to-cyan-500
                            shadow-lg shadow-accent/25 transition-all duration-300"
                    >
                        View My Work
                    </motion.button>
                    <motion.a
                        href="mailto:ushnishchowdhury62@gmail.com"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-semibold text-white/70 text-sm sm:text-base
                            glass glass-hover"
                    >
                        Say Hello
                    </motion.a>
                </motion.div>

                {/* Social links */}
                <motion.div
                    {...fadeIn(2.8)}
                    className="flex items-center justify-center gap-4"
                >
                    {[
                        { icon: FiGithub, href: "https://github.com/RaGnaRoK-thor", label: "GitHub" },
                        { icon: FiLinkedin, href: "https://linkedin.com/in/ushnishchowdhury", label: "LinkedIn" },
                        { icon: FiMail, href: "mailto:ushnishchowdhury62@gmail.com", label: "Email" },
                    ].map(({ icon: Icon, href, label }) => (
                        <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.2, y: -3 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-xl glass glass-hover text-white/40 hover:text-accent-light text-xl"
                            aria-label={label}
                        >
                            <Icon />
                        </motion.a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll-down hint */}
            <motion.div
                className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2 }}
                onClick={() => navigateTo?.(1)}
            >
                <span className="text-[10px] font-mono text-white/15 tracking-widest uppercase">
                    Scroll
                </span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <FiArrowDown className="text-lg text-white/15" />
                </motion.div>
            </motion.div>
        </div>
    );
}
