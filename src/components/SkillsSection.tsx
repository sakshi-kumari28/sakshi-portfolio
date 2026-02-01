import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Shield, Brain, Cloud, Wrench } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Development",
    icon: Code,
    color: "primary",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "Python", level: 85 },
      { name: "HTML/CSS", level: 90 },
      { name: "Full Stack Development", level: 80 },
      { name: "REST APIs", level: 85 },
      { name: "Android Development", level: 75 },
    ]
  },
  {
    title: "Cybersecurity & Networking",
    icon: Shield,
    color: "secondary",
    skills: [
      { name: "Network Security", level: 85 },
      { name: "Malware Analysis", level: 90 },
      { name: "Threat Detection", level: 85 },
      { name: "Incident Response", level: 80 },
      { name: "Vulnerability Assessment", level: 85 },
      { name: "Cybersecurity Fundamentals", level: 90 },
    ]
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    color: "accent",
    skills: [
      { name: "Deep Learning", level: 85 },
      { name: "Machine Learning", level: 85 },
      { name: "CNN Networks", level: 80 },
      { name: "LSTM", level: 80 },
      { name: "Feature Engineering", level: 85 },
      { name: "Data Preprocessing", level: 85 },
    ]
  },
  {
    title: "Cloud & Systems",
    icon: Cloud,
    color: "success",
    skills: [
      { name: "Oracle Cloud Infrastructure", level: 80 },
      { name: "Google Cloud Platform", level: 80 },
      { name: "Cloud Computing", level: 85 },
      { name: "Linux Systems", level: 80 },
      { name: "Windows Systems", level: 85 },
    ]
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    color: "primary",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Firebase", level: 80 },
      { name: "Apache Server", level: 75 },
    ]
  },
];

const ProgressRing = ({ progress, color, size = 80 }: { progress: number; color: string; size?: number }) => {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="progress-ring">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className="stroke-muted"
      />
      {/* Progress circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`stroke-${color}`}
        style={{ filter: `drop-shadow(0 0 6px hsl(var(--${color})))` }}
      />
    </svg>
  );
};

const SkillCard = ({ category, index }: { category: SkillCategory; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="glass-panel p-6 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 bg-${category.color}/5 opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 relative">
        <div className={`p-2 rounded-lg bg-${category.color}/10 border border-${category.color}/30`}>
          <category.icon className={`w-6 h-6 text-${category.color}`} />
        </div>
        <h3 className="font-orbitron font-semibold text-foreground">
          {category.title}
        </h3>
      </div>

      {/* Skills */}
      <div className="space-y-4 relative">
        {category.skills.map((skill, skillIndex) => (
          <motion.div
            key={skill.name}
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 + skillIndex * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-rajdhani text-muted-foreground">
                {skill.name}
              </span>
              <span className={`text-xs font-mono text-${category.color}`}>
                {skill.level}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-${category.color} rounded-full`}
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: 0.5 + skillIndex * 0.05 }}
                style={{
                  boxShadow: `0 0 10px hsl(var(--${category.color}))`,
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Neural connection decorations */}
      <div className="absolute top-4 right-4 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {[...Array(5)].map((_, i) => (
            <circle
              key={i}
              cx={20 + Math.random() * 60}
              cy={20 + Math.random() * 60}
              r="3"
              className={`fill-${category.color}`}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            CYBER CONTROL PANEL
          </h2>
          <p className="text-muted-foreground font-rajdhani text-lg max-w-2xl mx-auto">
            Technical arsenal and operational capabilities for cyber defense and development
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Central visualization */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="relative">
            {/* Central node */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/50 flex items-center justify-center glow-cyan">
              <span className="font-orbitron font-bold text-primary text-lg">CORE</span>
            </div>
            
            {/* Orbiting skill indicators */}
            <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '30s' }}>
              {skillCategories.slice(0, 4).map((cat, i) => (
                <div
                  key={cat.title}
                  className={`absolute w-4 h-4 rounded-full bg-${cat.color} glow-${cat.color === 'primary' ? 'cyan' : cat.color === 'secondary' ? 'blue' : cat.color === 'accent' ? 'violet' : 'green'}`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 90}deg) translateX(80px) translateY(-50%)`,
                  }}
                />
              ))}
            </div>

            {/* Pulse rings */}
            <div className="absolute inset-0 -z-10">
              {[1, 2, 3].map((ring) => (
                <div
                  key={ring}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 animate-glow-pulse"
                  style={{
                    width: `${96 + ring * 60}px`,
                    height: `${96 + ring * 60}px`,
                    animationDelay: `${ring * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
