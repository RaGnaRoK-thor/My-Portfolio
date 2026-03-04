// src/components/Contact.jsx
import React from "react";
import { motion } from "framer-motion";
import {
    FiMail,
    FiPhone,
    FiLinkedin,
    FiGithub,
    FiSend,
    FiHeart,
    FiArrowUpRight,
} from "react-icons/fi";

const contactLinks = [
    {
        icon: FiMail,
        label: "Email",
        value: "ushnishchowdhury62@gmail.com",
        href: "mailto:ushnishchowdhury62@gmail.com",
        color: "#8b5cf6",
        gradient: "from-violet-500 to-purple-600",
    },
    {
        icon: FiPhone,
        label: "Phone",
        value: "+91-9674893804",
        href: "tel:+919674893804",
        color: "#22d3ee",
        gradient: "from-cyan-400 to-blue-500",
    },
    {
        icon: FiLinkedin,
        label: "LinkedIn",
        value: "ushnishchowdhury",
        href: "https://linkedin.com/in/ushnishchowdhury",
        color: "#0077B5",
        gradient: "from-blue-500 to-blue-700",
    },
    {
        icon: FiGithub,
        label: "GitHub",
        value: "RaGnaRoK-thor",
        href: "https://github.com/RaGnaRoK-thor",
        color: "#e2e8f0",
        gradient: "from-gray-400 to-gray-600",
    },
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

// Terminal-style text reveal for the heading
function TerminalText({ children, delay = 0 }) {
    const text = String(children);
    return (
        <span className="inline-flex flex-wrap">
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + i * 0.03, duration: 0.05 }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

function ContactCard({ link, index }) {
    const Icon = link.icon;

    return (
        <motion.a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            variants={fadeUp}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative glass rounded-2xl p-5 border border-white/[0.05] hover:border-white/[0.12] transition-all duration-500 block"
        >
            {/* Hover glow */}
            <motion.div
                className={`absolute -inset-px rounded-2xl bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-[0.08] blur-sm transition-opacity duration-500`}
            />

            <div className="relative flex items-center gap-4">
                {/* Icon */}
                <div
                    className="p-3 rounded-xl flex-shrink-0"
                    style={{ backgroundColor: `${link.color}12` }}
                >
                    <Icon className="text-xl" style={{ color: link.color }} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-white/35 font-medium mb-0.5 uppercase tracking-wider">
                        {link.label}
                    </p>
                    <p className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors truncate">
                        {link.value}
                    </p>
                </div>

                {/* Arrow */}
                <FiArrowUpRight className="text-white/15 group-hover:text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
        </motion.a>
    );
}

export default function Contact() {
    return (
        <div className="w-full min-h-full flex items-center justify-center relative px-4 sm:px-6 py-20 sm:py-6">
            <motion.div
                className="relative z-10 max-w-3xl w-full mx-auto"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {/* Section title */}
                <motion.div variants={fadeUp} className="text-center mb-6 sm:mb-10">
                    <span className="inline-block text-[10px] font-mono text-accent-light/50 tracking-[0.2em] uppercase mb-2">
                        {"// let's connect"}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 sm:mb-3">
                        Get in{" "}
                        <span className="gradient-text text-glow-sm">Touch</span>
                    </h2>
                    <p className="text-white/30 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
                        I'm always open to discussing new opportunities,
                        projects, or just a conversation about tech.
                    </p>
                </motion.div>

                {/* CTA email button */}
                <motion.div variants={fadeUp} className="text-center mb-5 sm:mb-8">
                    <motion.a
                        href="mailto:ushnishchowdhury62@gmail.com"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0 0 50px rgba(139,92,246,0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-white
                            bg-gradient-to-r from-accent via-purple-500 to-cyan-500
                            shadow-xl shadow-accent/20 hover:shadow-accent/35
                            transition-shadow duration-300 text-sm sm:text-base"
                    >
                        <FiSend className="text-lg" />
                        Send Me a Message
                    </motion.a>
                </motion.div>

                {/* Contact cards */}
                <motion.div
                    className="grid sm:grid-cols-2 gap-4"
                    variants={stagger}
                >
                    {contactLinks.map((link, i) => (
                        <ContactCard key={link.label} link={link} index={i} />
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div variants={fadeUp} className="mt-8 sm:mt-12 text-center">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-4" />
                    <p className="text-[10px] text-white/20 flex items-center justify-center gap-1.5">
                        Built with{" "}
                        <motion.span
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <FiHeart className="text-accent-light/40" />
                        </motion.span>{" "}
                        by Ushnish Chowdhury
                    </p>
                    <p className="text-[10px] text-white/10 mt-1 font-mono">
                        React • Vite • Tailwind • Framer Motion
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
