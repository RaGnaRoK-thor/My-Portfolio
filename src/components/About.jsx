// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import {
    FiCode,
    FiDatabase,
    FiCpu,
    FiServer,
    FiGitBranch,
    FiTerminal,
} from "react-icons/fi";
import {
    SiPython,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiFastapi,
    SiNextdotjs,
} from "react-icons/si";

const skills = [
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    { name: "Java", icon: FiCode, color: "#ED8B00" },
    { name: "SQL", icon: FiDatabase, color: "#336791" },
    { name: "HTML/CSS", icon: FiTerminal, color: "#E34F26" },
    { name: "WebSockets", icon: FiServer, color: "#22d3ee" },
    { name: "Pandas", icon: FiCpu, color: "#150458" },
    { name: "Git", icon: FiGitBranch, color: "#F05032" },
    { name: "SQLite", icon: FiDatabase, color: "#003B57" },
];

const experiences = [
    {
        role: "Junior Full Stack Engineer Intern",
        company: "NeuralArt Solutions",
        period: "Aug 2025 – Present",
        description:
            "Developing AI-powered fraud detection system, building RESTful APIs with FastAPI, and implementing React dashboards.",
        gradient: "from-accent to-purple-600",
    },
    {
        role: "Freelance Salesforce Developer",
        company: "Self-Employed",
        period: "Sep 2025 – Dec 2025",
        description:
            "Engineered automation workflows with Einstein Bots and Agentforce for client projects.",
        gradient: "from-cyan-400 to-blue-500",
    },
    {
        role: "Freelance Data Annotation Specialist",
        company: "DataAnnotation.tech",
        period: "Sep 2025 – Oct 2025",
        description:
            "Evaluated AI model responses to improve LLM accuracy and output quality.",
        gradient: "from-emerald-400 to-teal-500",
    },
];

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

function SkillTag({ skill }) {
    const Icon = skill.icon;
    return (
        <motion.div
            variants={fadeUp}
            whileHover={{
                scale: 1.1,
                y: -5,
                rotateZ: Math.random() > 0.5 ? 2 : -2,
                boxShadow: `0 8px 30px ${skill.color}30`,
            }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl glass glass-hover cursor-default perspective-container"
        >
            <Icon style={{ color: skill.color }} className="text-lg flex-shrink-0" />
            <span className="text-sm font-medium text-white/75">{skill.name}</span>
        </motion.div>
    );
}

function TimelineCard({ exp, index, isLast }) {
    return (
        <motion.div
            variants={fadeUp}
            className="relative pl-7 pb-5 group"
        >
            {/* Timeline line */}
            {!isLast && (
                <div className="absolute left-[9px] top-5 bottom-0 w-px bg-gradient-to-b from-white/15 to-transparent" />
            )}

            {/* Dot */}
            <motion.div
                className={`absolute left-0 top-1 w-[19px] h-[19px] rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center`}
                whileHover={{ scale: 1.4 }}
                transition={{ type: "spring", stiffness: 400 }}
            >
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </motion.div>

            {/* Card */}
            <motion.div
                whileHover={{ x: 4, borderColor: "rgba(255,255,255,0.15)" }}
                className="glass rounded-xl p-4 ml-1 transition-colors"
            >
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="text-sm font-bold text-white">{exp.role}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent-light font-medium">
                        {exp.period}
                    </span>
                </div>
                <p className="text-[11px] text-cyan-400/70 font-medium mb-1.5">
                    @ {exp.company}
                </p>
                <p className="text-[11px] text-white/40 leading-relaxed">
                    {exp.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default function About() {
    return (
        <div className="w-full h-full flex items-center justify-center relative px-6 overflow-hidden">
            <motion.div
                className="relative z-10 max-w-6xl w-full mx-auto"
                variants={stagger}
                initial="hidden"
                animate="visible"
            >
                {/* Section title */}
                <motion.div variants={fadeUp} className="text-center mb-10">
                    <span className="inline-block text-[10px] font-mono text-accent-light/50 tracking-[0.2em] uppercase mb-2">
                        {"// who am I"}
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
                        About <span className="gradient-text text-glow-sm">Me</span>
                    </h2>
                    <p className="text-white/30 max-w-xl mx-auto text-sm leading-relaxed">
                        A passionate fresher with hands-on freelance experience,
                        specializing in full-stack development and AI-powered solutions.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left: Skills */}
                    <motion.div variants={stagger}>
                        <motion.h3
                            variants={fadeUp}
                            className="text-base font-bold text-white mb-4 flex items-center gap-2"
                        >
                            <FiCode className="text-accent-light" />
                            Tech Stack
                        </motion.h3>
                        <motion.div className="flex flex-wrap gap-2.5" variants={stagger}>
                            {skills.map((skill) => (
                                <SkillTag key={skill.name} skill={skill} />
                            ))}
                        </motion.div>

                        {/* Stats */}
                        <motion.div variants={stagger} className="grid grid-cols-3 gap-3 mt-6">
                            {[
                                { value: "4+", label: "Projects" },
                                { value: "3+", label: "Roles" },
                                { value: "13+", label: "Technologies" },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    variants={fadeUp}
                                    whileHover={{ y: -3, scale: 1.03 }}
                                    className="glass rounded-xl p-3 text-center"
                                >
                                    <div className="text-xl font-black gradient-text">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] text-white/35 mt-0.5 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Experience */}
                    <motion.div variants={stagger}>
                        <motion.h3
                            variants={fadeUp}
                            className="text-base font-bold text-white mb-4 flex items-center gap-2"
                        >
                            <FiTerminal className="text-cyan-400" />
                            Experience
                        </motion.h3>
                        <div>
                            {experiences.map((exp, i) => (
                                <TimelineCard
                                    key={exp.role}
                                    exp={exp}
                                    index={i}
                                    isLast={i === experiences.length - 1}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
