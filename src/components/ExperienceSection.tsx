import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Code, Smartphone, Rocket } from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  description: string;
  icon: typeof Briefcase;
  color: string;
}

const experiences: Experience[] = [
  {
    id: "codsoft",
    role: "Mobile Application Developer Intern",
    company: "CodSoft",
    type: "Internship",
    description: "Developed mobile applications for Android platform, focusing on user experience and performance optimization.",
    icon: Smartphone,
    color: "accent",
  },
  {
    id: "cognifyz",
    role: "Full Stack Developer Intern",
    company: "Cognifyz Technologies",
    type: "Internship",
    description: "Built full-stack web applications using modern technologies, implementing both frontend interfaces and backend services.",
    icon: Rocket,
    color: "secondary",
  },
  {
    id: "skillcraft",
    role: "Software Development Intern",
    company: "SkillCraft Technology",
    type: "Internship",
    description: "Developed software solutions and gained hands-on experience in modern development practices and methodologies.",
    icon: Code,
    color: "primary",
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Compute node positions and the largest gap to place the animated energy flow between nodes (avoids overlap)
  const nodePositions = experiences.map((_, i) => ((i + 1) / (experiences.length + 1)) * 100);
  const gaps = [] as { start: number; end: number; size: number }[];
  let prev = 0;
  for (const pos of nodePositions) { gaps.push({ start: prev, end: pos, size: pos - prev }); prev = pos; }
  gaps.push({ start: prev, end: 100, size: 100 - prev });
  const largestGap = gaps.reduce((a, b) => (a.size > b.size ? a : b), gaps[0]);
  // Increase margin and reduce height for a subtle, non-overlapping flow
  const marginPercent = Math.min(8, largestGap.size * 0.2);
  let flowStart = largestGap.start + marginPercent;
  let flowEnd = largestGap.end - marginPercent;
  let flowHeight = Math.min(8, (flowEnd - flowStart) * 0.35);
  if (flowEnd <= flowStart) {
    // Fallback when gaps are too small
    flowStart = 12;
    flowEnd = 88;
    flowHeight = 8;
  }
  const flowTopStart = flowStart;
  const flowTopEnd = Math.max(flowStart, flowEnd - flowHeight);
  const flowClass = 'w-[1px] opacity-40 blur-sm';
  const flowDuration = 6; // slower animation

  return (
    <section id="experience" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-6">
            <Briefcase className="w-4 h-4 text-secondary" />
            <span className="text-sm font-mono text-secondary">CAREER_ROADMAP</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            EXPERIENCE TIMELINE
          </h2>
          <p className="text-muted-foreground font-rajdhani text-lg max-w-2xl mx-auto">
            Professional journey through internships and hands-on development
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central energy line (vertical, small screens) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent block lg:hidden" />
          
          {/* Animated energy flow */}
          <motion.div
            className={`absolute left-1/2 ${flowClass} bg-gradient-to-b from-primary/20 to-transparent block lg:hidden`}
            style={{ top: `${flowTopStart}%`, height: `${flowHeight}%` }}
            animate={{ top: [`${flowTopStart}%`, `${flowTopEnd}%`] }}
            transition={{ duration: flowDuration, repeat: Infinity, ease: "linear" }}
          />

          {/* Horizontal connector for large screens (connect nodes left-to-right) */}
          <div className="hidden lg:block absolute" style={{ top: '13%', left: `${nodePositions[0]}%`, width: `${nodePositions[nodePositions.length - 1] - nodePositions[0]}%` }}>
            <div className="h-px w-full rounded bg-gradient-to-r from-primary/40 via-secondary/30 to-accent/40 opacity-60" />
          </div>

          {/* Experience nodes */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => {
              const topPercent = ((index + 1) / (experiences.length + 1)) * 100;
              const leftPercent = ((index + 1) / (experiences.length + 1)) * 100; // used for horizontal placement on lg
              return (
                <motion.div
                  key={exp.id}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-12 ${
                    index % 2 === 0 ? '' : 'lg:direction-rtl'
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                {/* Timeline node (horizontal on lg) */}
                <div className="hidden lg:flex absolute -translate-x-1/2 items-center justify-center z-10" style={{ left: `${leftPercent}%`, top: '12%' }}>
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-${exp.color}/20 border-2 border-${exp.color} flex items-center justify-center glow-${exp.color === 'primary' ? 'cyan' : exp.color === 'secondary' ? 'blue' : 'violet'} cursor-pointer`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={expanded === exp.id}
                    aria-controls={`exp-${exp.id}`}
                    onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setExpanded(expanded === exp.id ? null : exp.id); } }}
                    whileHover={{ scale: 1.2 }}
                    animate={{ 
                      boxShadow: expanded === exp.id ? [
                        `0 0 30px hsl(var(--${exp.color}) / 0.6)`,
                        `0 0 60px hsl(var(--${exp.color}) / 0.8)`,
                        `0 0 30px hsl(var(--${exp.color}) / 0.6)`,
                      ] : [
                        `0 0 20px hsl(var(--${exp.color}) / 0.3)`,
                        `0 0 40px hsl(var(--${exp.color}) / 0.5)`,
                        `0 0 20px hsl(var(--${exp.color}) / 0.3)`,
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <exp.icon className={`w-6 h-6 text-${exp.color}`} />
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={`${index % 2 === 0 ? 'lg:pr-20' : 'lg:col-start-2 lg:pl-20'} ${expanded === exp.id ? '' : 'lg:hidden'}`}>
                  <motion.div
                    id={`exp-${exp.id}`}
                    className="glass-panel p-6 md:p-8 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Close control for desktop when expanded */}
                    {expanded === exp.id && (
                      <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-muted/30 hover:bg-muted/40 text-sm"
                        onClick={() => setExpanded(null)}
                        aria-label="Close details"
                      >
                        ✕
                      </button>
                    )}

                    {/* Mobile icon */}
                    <div className={`lg:hidden inline-flex p-3 rounded-lg bg-${exp.color}/10 border border-${exp.color}/30 mb-4`}>
                      <exp.icon className={`w-6 h-6 text-${exp.color}`} />
                    </div>

                    {/* Type badge */}
                    <span className={`inline-block px-3 py-1 text-xs font-mono text-${exp.color} bg-${exp.color}/10 border border-${exp.color}/30 rounded-full mb-4`}>
                      {exp.type}
                    </span>

                    {/* Role */}
                    <h3 className="text-xl md:text-2xl font-orbitron font-bold text-foreground mb-2">
                      {exp.role}
                    </h3>

                    {/* Company */}
                    <p className={`text-lg font-rajdhani text-${exp.color} font-medium mb-4`}>
                      @ {exp.company}
                    </p>

                    {/* Description */}
                    <p className="text-muted-foreground font-rajdhani leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Connection line (mobile) */}
                    <div className={`lg:hidden absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-${exp.color}/50 to-transparent ${index === experiences.length - 1 ? 'hidden' : ''}`} />

                    {/* Hover effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br from-${exp.color}/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
                    />
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 ? <div className="hidden lg:block" /> : null}
              </motion.div>
              );
            })}
          </div>
        </div>

        {/* Volunteering section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="glass-panel p-8 relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="inline-flex p-4 rounded-xl bg-success/10 border border-success/30 flex-shrink-0">
                <Rocket className="w-8 h-8 text-success" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-mono text-success bg-success/10 border border-success/30 rounded-full mb-2">
                  Leadership
                </span>
                <h3 className="text-xl font-orbitron font-bold text-foreground mb-1">
                  President & Student Lead – Innovation Club (Techie-Hub CSE)
                </h3>
                <p className="text-muted-foreground font-rajdhani">
                  Led technical initiatives, organized workshops and coding sessions, mentored junior students, 
                  and supported hackathons focused on cybersecurity and software development.
                </p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
