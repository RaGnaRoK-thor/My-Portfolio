// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const navLinks = [
    { label: "Home", index: 0 },
    { label: "About", index: 1 },
    { label: "Projects", index: 2 },
    { label: "Contact", index: 3 },
];

// Custom SVG "UC" logo component
function UCLogo() {
    return (
        <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <svg
                width="44"
                height="44"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-lg"
            >
                <circle
                    cx="24"
                    cy="24"
                    r="22"
                    stroke="url(#logoGradient)"
                    strokeWidth="2"
                    fill="none"
                    className="group-hover:opacity-100 opacity-70 transition-opacity duration-300"
                />
                <circle cx="24" cy="24" r="20" fill="url(#logoBg)" opacity="0.1" />
                <text
                    x="12"
                    y="30"
                    fontFamily="Inter, sans-serif"
                    fontWeight="800"
                    fontSize="16"
                    fill="url(#logoGradient)"
                >
                    U
                </text>
                <text
                    x="26"
                    y="30"
                    fontFamily="Inter, sans-serif"
                    fontWeight="800"
                    fontSize="16"
                    fill="url(#logoGradient)"
                >
                    C
                </text>
                <circle cx="24" cy="38" r="1.5" fill="#22d3ee" />
                <defs>
                    <linearGradient id="logoGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="50%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <radialGradient id="logoBg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </radialGradient>
                </defs>
            </svg>
        </motion.div>
    );
}

export default function Navbar({ activeSection, scrollToSection }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-navy-900/40 backdrop-blur-xl border-b border-white/[0.05]"
        >
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div onClick={() => scrollToSection(0)} className="cursor-pointer">
                    <UCLogo />
                </div>

                {/* Desktop nav links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <button
                            key={link.label}
                            onClick={() => scrollToSection(link.index)}
                            className="relative px-4 py-2 text-sm font-medium group"
                        >
                            <span
                                className={`relative z-10 transition-colors duration-300 ${activeSection === link.index
                                        ? "text-accent-light"
                                        : "text-white/50 group-hover:text-white"
                                    }`}
                            >
                                {link.label}
                            </span>
                            {activeSection === link.index && (
                                <motion.div
                                    layoutId="navUnderline"
                                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-accent-light to-cyan-400 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <motion.a
                    href="mailto:ushnishchowdhury62@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                        bg-gradient-to-r from-accent to-cyan-500 text-white
                        shadow-lg shadow-accent/20 hover:shadow-accent/35 transition-shadow duration-300"
                >
                    Get in Touch
                </motion.a>

                {/* Mobile menu button */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-white/70 hover:text-white text-2xl p-2"
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                </button>
            </div>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-navy-900/90 backdrop-blur-2xl border-t border-white/[0.05] overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.label}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.08, duration: 0.3 }}
                                    onClick={() => {
                                        scrollToSection(link.index);
                                        setMobileOpen(false);
                                    }}
                                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === link.index
                                            ? "bg-accent/15 text-accent-light"
                                            : "text-white/50 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                            <motion.a
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.32, duration: 0.3 }}
                                href="mailto:ushnishchowdhury62@gmail.com"
                                className="mt-2 px-4 py-3 rounded-full text-center text-sm font-semibold
                                    bg-gradient-to-r from-accent to-cyan-500 text-white shadow-lg shadow-accent/20"
                            >
                                Get in Touch
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
