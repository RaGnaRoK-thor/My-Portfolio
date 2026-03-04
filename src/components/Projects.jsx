// src/components/Projects.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiChevronRight } from "react-icons/fi";

const projects = [
    {
        title: "Kiln AI",
        subtitle: "AI-Powered Cement Plant Optimization",
        description:
            "Full-stack industrial optimization platform processing 7000+ data points with real-time data streaming via WebSockets. Predictive analytics dashboards and AI-driven process optimization.",
        tech: ["Python", "FastAPI", "React", "TypeScript", "WebSockets"],
        live: "https://kiln-ai-final.vercel.app",
        github: "https://github.com/RaGnaRoK-thor/Kiln-AI",
        gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
        accent: "#8b5cf6",
    },
    {
        title: "Canoply Replica",
        subtitle: "Next.js 14 Migration & SSR",
        description:
            "Migrated a static HTML site to Next.js 14 with Server-Side Rendering and App Router. Achieved significant performance gains through modern React patterns.",
        tech: ["Next.js 14", "React", "SSR", "App Router"],
        live: "https://canoply-replica.vercel.app",
        github: "https://github.com/RaGnaRoK-thor/Canoply-Replica",
        gradient: "from-cyan-500 via-blue-500 to-indigo-500",
        accent: "#06b6d4",
    },
    {
        title: "J.A.R.V.I.S.",
        subtitle: "AI Desktop Assistant",
        description:
            "Voice-controlled AI assistant executing 15+ automation tasks using custom NLP classifiers and the Groq API. Intelligent task routing and natural language understanding.",
        tech: ["Python", "Groq API", "NLP", "Speech Recognition"],
        live: "https://github.com/RaGnaRoK-thor/JARVIS",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        accent: "#f59e0b",
    },
    {
        title: "InvSys",
        subtitle: "Full-Stack Inventory System",
        description:
            "SPA for inventory management with 15 RESTful API endpoints, real-time search, and a responsive dashboard for tracking stock levels and transactions.",
        tech: ["Python", "Flask", "SQLite", "JavaScript"],
        live: "https://github.com/RaGnaRoK-thor/InvSys",
        gradient: "from-emerald-500 via-green-500 to-teal-500",
        accent: "#10b981",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

function ProjectCard({ project }) {
    const [hoverPos, setHoverPos] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setHoverPos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    // 3D tilt values based on mouse position
    const rotateX = isHovered ? (hoverPos.y - 0.5) * -12 : 0;
    const rotateY = isHovered ? (hoverPos.x - 0.5) * 12 : 0;

    return (
        <motion.div
            variants={cardVariants}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="perspective-container"
        >
            <motion.div
                animate={{
                    rotateX,
                    rotateY,
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative group"
            >
                {/* Background glow that follows mouse */}
                <div
                    className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                    style={{
                        background: `radial-gradient(400px circle at ${hoverPos.x * 100}% ${hoverPos.y * 100}%, ${project.accent}20, transparent 60%)`,
                    }}
                />

                {/* Card */}
                <div className="relative glass rounded-2xl overflow-hidden border border-white/[0.06] group-hover:border-white/[0.12] transition-all duration-500">
                    {/* Top gradient strip */}
                    <div className={`h-[3px] w-full bg-gradient-to-r ${project.gradient}`} />

                    <div className="p-5">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-0.5">
                                    {project.title}
                                </h3>
                                <p className="text-[11px] font-mono text-white/35">
                                    {project.subtitle}
                                </p>
                            </div>
                            {project.live && (
                                <motion.a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, rotate: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 rounded-lg glass text-white/40 hover:text-white transition-colors"
                                    aria-label={`${project.title} live site`}
                                >
                                    <FiExternalLink className="text-sm" />
                                </motion.a>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-xs text-white/35 leading-relaxed mb-4">
                            {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                                    style={{
                                        backgroundColor: `${project.accent}12`,
                                        color: project.accent,
                                        border: `1px solid ${project.accent}20`,
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Hover indicator */}
                        {project.live && (
                            <motion.a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 flex items-center gap-1 text-[11px] font-medium cursor-pointer"
                                style={{ color: project.accent }}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    x: isHovered ? 0 : -8,
                                }}
                                transition={{ duration: 0.25 }}
                            >
                                Visit Project
                                <FiChevronRight className="text-xs" />
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <div className="w-full min-h-full flex items-center justify-center relative px-4 sm:px-6 py-20 sm:py-6">
            <motion.div
                className="relative z-10 max-w-6xl w-full mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Section title */}
                <motion.div variants={cardVariants} className="text-center mb-6 sm:mb-10">
                    <span className="inline-block text-[10px] font-mono text-accent-light/50 tracking-[0.2em] uppercase mb-2">
                        {"// featured work"}
                    </span>
                    <h2 className="text-3xl sm:text-5xl font-black text-white mb-2 sm:mb-3">
                        My <span className="gradient-text text-glow-sm">Projects</span>
                    </h2>
                    <p className="text-white/30 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
                        A selection of projects showcasing my passion for building
                        impactful applications with modern technologies.
                    </p>
                </motion.div>

                {/* Project grid */}
                <motion.div
                    className="grid md:grid-cols-2 gap-4 sm:gap-5"
                    variants={containerVariants}
                >
                    {projects.map((project) => (
                        <ProjectCard key={project.title} project={project} />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}
