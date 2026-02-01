import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Shield, Fingerprint, Brain, Lock, Cloud, Cpu } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  technologies: string[];
  features: string[];
  icon: typeof Shield;
  color: string;
  github: string;
}

const projects: Project[] = [
  {
    id: "malware-detection",
    title: "Robust Intelligent Malware Detection Using Deep Learning",
    period: "Mar 2025 – Jun 2025",
    description: "AI-based malware detection system using deep learning and machine learning techniques for real-time threat identification and classification.",
    technologies: ["Python", "TensorFlow", "CNN", "LSTM", "SVM", "Random Forest", "KNN", "Tkinter"],
    features: [
      "Deep learning models (CNN, LSTM) for malware classification",
      "Classical ML classifiers (SVM, Random Forest, KNN)",
      "Static, dynamic, and image-based analysis",
      "Real-time prediction interface",
      "Hybrid model optimization",
    ],
    icon: Brain,
    color: "primary",
    github: "https://github.com/sakshi-kumari28/robust-malware-detection.git"
  },
  {
    id: "crypto-biometric",
    title: "Secure Crypto-Biometric System for Cloud Computing",
    period: "Aug 2024 – Nov 2024",
    description: "Privacy-preserving crypto-biometric authentication framework for secure cloud data storage with encrypted biometric verification.",
    technologies: ["Cryptography", "Biometrics", "Cloud Security", "Access Control", "Encryption"],
    features: [
      "Encrypted biometric verification",
      "Privacy-preserving authentication",
      "Secure cloud data storage",
      "Access control mechanisms",
      "Data breach prevention",
    ],
    icon: Fingerprint,
    color: "secondary",
    github: "https://github.com/sakshi-kumari28/cloud-crypto-bio-auth.git"
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-panel p-8 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/50">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br from-${project.color}/10 to-transparent`} />
          
          {/* Circuit pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
            <defs>
              <pattern id={`circuit-${project.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 H10 V0" stroke="currentColor" strokeWidth="0.5" fill="none" className={`text-${project.color}`} />
                <circle cx="10" cy="10" r="1" className={`fill-${project.color}`} />
              </pattern>
            </defs>
            <rect width="100" height="100" fill={`url(#circuit-${project.id})`} />
          </svg>
        </div>

        {/* Project icon */}
        <motion.div
          className="relative mb-6"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`inline-flex p-4 rounded-xl bg-${project.color}/10 border border-${project.color}/30`}>
            <project.icon className={`w-10 h-10 text-${project.color}`} />
          </div>
          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 bg-${project.color}/20 rounded-xl blur-xl`}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Period badge */}
        <span className={`inline-block px-3 py-1 text-xs font-mono text-${project.color} bg-${project.color}/10 border border-${project.color}/30 rounded-full mb-4`}>
          {project.period}
        </span>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-orbitron font-bold text-foreground mb-4 group-hover:text-glow-cyan transition-all">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground font-rajdhani text-lg mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-sm font-mono text-primary mb-3">[KEY_FEATURES]</h4>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <motion.li
                key={feature}
                className="flex items-start gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <span className={`w-1.5 h-1.5 rounded-full bg-${project.color} mt-2 flex-shrink-0`} />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-mono text-secondary mb-3">[TECH_STACK]</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono text-foreground/80 bg-muted border border-border rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 font-mono text-sm text-${project.color} border border-${project.color}/50 rounded-lg hover:bg-${project.color}/10 transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github className="w-4 h-4" />
            View Code
          </motion.a>
        </div>

        {/* Corner decorations */}
        <div className={`absolute top-0 right-0 w-20 h-20 border-t border-r border-${project.color}/20`} />
        <div className={`absolute bottom-0 left-0 w-20 h-20 border-b border-l border-${project.color}/20`} />

        {/* Scan effect on hover */}
        <motion.div
          className={`absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-${project.color} to-transparent`}
          initial={{ top: 0, opacity: 0 }}
          animate={isHovered ? { top: '100%', opacity: [0, 1, 1, 0] } : { top: 0, opacity: 0 }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 md:py-32" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Lock className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">SECURITY_LAB</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            PROJECT MODULES
          </h2>
          <p className="text-muted-foreground font-rajdhani text-lg max-w-2xl mx-auto">
            Advanced security systems and intelligent threat detection platforms
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Projects grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Visual element - floating security icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[Shield, Lock, Cloud, Cpu].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute text-primary/10"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-12 h-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
