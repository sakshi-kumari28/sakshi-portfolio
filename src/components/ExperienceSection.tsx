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
  const ref = useRef<HTMLElement | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [pinnedPos, setPinnedPos] = useState<{ left: number; top: number; containerWidth: number } | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handlePinClick = (id: string, target: HTMLElement) => {
    const container = ref.current;
    if (!container) {
      setPinned(id);
      return;
    }
    const contRect = container.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    const leftPx = rect.left + rect.width / 2 - contRect.left;
    const topPx = rect.bottom - contRect.top + 12; // 12px below icon
    const containerWidth = contRect.width;
    setPinned(id);
    setPinnedPos({ left: leftPx, top: topPx, containerWidth });

    // scroll the section into view so card is visible
    container.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

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
  // Dim the horizontal connector when a node is hovered or a card is pinned
  const connectorDim = (pinned || hoverId) ? 'opacity-30' : 'opacity-60';

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
            <div className={`h-px w-full rounded bg-gradient-to-r from-primary/40 via-secondary/30 to-accent/40 ${connectorDim}`} />
          </div>

          {/* Horizontal nodes (icons + labels) */}
          <div className="hidden lg:flex absolute top-6 left-0 right-0 px-12 justify-between items-center z-20 pointer-events-none">
            {experiences.map((exp) => {
              const label = exp.role.split(' ').slice(0,2).join(' ');
              return (
                <button
                  key={exp.id}
                  onClick={(e) => { handlePinClick(exp.id, e.currentTarget as HTMLElement); }}
                  onMouseEnter={() => setHoverId(exp.id)}
                  onMouseLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(exp.id)}
                  onBlur={() => setHoverId(null)}
                  aria-expanded={pinned === exp.id}
                  aria-controls={`exp-${exp.id}`}
                  className="flex flex-col items-center pointer-events-auto w-28"
                >
                  <div className={`w-16 h-16 rounded-full bg-${exp.color}/20 border-2 border-${exp.color} flex items-center justify-center glow-${exp.color === 'primary' ? 'cyan' : exp.color === 'secondary' ? 'blue' : 'violet'} cursor-pointer`}>
                    <exp.icon className={`w-6 h-6 text-${exp.color}`} />
                  </div>
                  <div className="text-xs mt-3 text-center text-muted-foreground truncate w-full" title={exp.role}>{label}</div>
                </button>
              );
            })}
          </div>

          {/* Hover previews (desktop) */}
          {experiences.map((exp, idx) => {
            const left = nodePositions[idx];
            const isHover = hoverId === exp.id && !pinned;
            return isHover ? (
              <div key={`preview-${exp.id}`} className="absolute hidden lg:block z-30" style={{ left: `${left}%`, top: '20%', transform: 'translateX(-50%)' }}>
                <div className="w-56 p-3 rounded bg-card border border-border text-sm text-foreground shadow-lg pointer-events-auto">
                  <div className="text-xs font-mono text-muted-foreground">{exp.type}</div>
                  <div className="font-medium mt-1">{exp.role}</div>
                  <div className="text-xs text-muted-foreground">@ {exp.company}</div>
                  <div className="mt-2 text-xs text-muted-foreground line-clamp-2">{exp.description}</div>
                  <div className="mt-2 text-right">
                    <button className="text-xs text-primary" onClick={() => setPinned(exp.id)}>Read more</button>
                  </div>
                </div>
              </div>
            ) : null;
          })}

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


                {/* Content card */}
                <div className={`${index % 2 === 0 ? 'lg:pr-20' : 'lg:col-start-2 lg:pl-20'} lg:hidden`}>
                  <motion.div
                    id={`exp-${exp.id}`}
                    className="glass-panel p-6 md:p-8 relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Close control for desktop when pinned */}
                    {pinned === exp.id && (
                      <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-muted/30 hover:bg-muted/40 text-sm"
                        onClick={() => setPinned(null)}
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

            {/* Anchored full card for pinned node (desktop) */}
            {pinned && (() => {
              const idx = experiences.findIndex(e => e.id === pinned);
              if (idx === -1) return null;
              const exp = experiences[idx];
              const leftPercentFallback = nodePositions[idx];

              // Use pixel positioning when available
              const leftStyle = pinnedPos ? Math.min(Math.max(pinnedPos.left, 20), pinnedPos.containerWidth - 20) + 'px' : `${Math.min(Math.max(leftPercentFallback, 6), 94)}%`;
              const topStyle = pinnedPos ? pinnedPos.top + 'px' : '22%';

              return (
                <div key={`pinned-${exp.id}`} className="hidden lg:block absolute z-40" style={{ left: leftStyle, top: topStyle, transform: 'translateX(-50%)' }}>
                  <div className="relative max-w-[min(680px,60vw)]">
                    {/* Pointer triangle */}
                    <div style={{ left: '50%' }} className="absolute -top-3 -translate-x-1/2">
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 10L0 0H18L9 10Z" fill="var(--card)" />
                      </svg>
                    </div>
                    <div className="glass-panel p-6 md:p-8 relative overflow-hidden group">
                      <button
                        className="absolute top-4 right-4 p-2 rounded-full bg-muted/30 hover:bg-muted/40 text-sm"
                        onClick={() => setPinned(null)}
                        aria-label="Close details"
                      >
                        ✕
                      </button>

                      <div className={`inline-flex p-3 rounded-lg bg-${exp.color}/10 border border-${exp.color}/30 mb-4`}> 
                        <exp.icon className={`w-6 h-6 text-${exp.color}`} />
                      </div>

                      <span className={`inline-block px-3 py-1 text-xs font-mono text-${exp.color} bg-${exp.color}/10 border border-${exp.color}/30 rounded-full mb-4`}>
                        {exp.type}
                      </span>

                      <h3 className="text-xl md:text-2xl font-orbitron font-bold text-foreground mb-2">
                        {exp.role}
                      </h3>

                      <p className={`text-lg font-rajdhani text-${exp.color} font-medium mb-4`}>
                        @ {exp.company}
                      </p>

                      <p className="text-muted-foreground font-rajdhani leading-relaxed">
                        {exp.description}
                      </p>

                    </div>
                  </div>
                </div>
              );
            })()}

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
