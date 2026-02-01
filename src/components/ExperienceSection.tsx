import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code, Smartphone, Rocket } from "lucide-react";

interface Experience {
  id: string;
  role: string;
  company: string;
  type: string;
  description: string;
  icon: any;
  color: string;
}

const experiences: Experience[] = [
  {
    id: "codsoft",
    role: "Mobile Application Developer Intern",
    company: "CodSoft",
    type: "Internship",
    description:
      "Developed mobile applications for Android platform, focusing on user experience and performance optimization.",
    icon: Smartphone,
    color: "accent",
  },
  {
    id: "cognifyz",
    role: "Full Stack Developer Intern",
    company: "Cognifyz Technologies",
    type: "Internship",
    description:
      "Built full-stack web applications using modern technologies, implementing both frontend interfaces and backend services.",
    icon: Rocket,
    color: "secondary",
  },
  {
    id: "skillcraft",
    role: "Software Development Intern",
    company: "SkillCraft Technology",
    type: "Internship",
    description:
      "Developed software solutions and gained hands-on experience in modern development practices and methodologies.",
    icon: Code,
    color: "primary",
  },
];

const ExperienceSection = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [pinnedId, setPinnedId] = useState<string | null>(null);

  const pinnedExp = experiences.find((e) => e.id === pinnedId);

  return (
    <section
      id="experience"
      ref={ref}
      className="relative isolate py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-6">
            <Briefcase className="w-4 h-4 text-secondary" />
            <span className="text-sm font-mono text-secondary">
              CAREER_ROADMAP
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            EXPERIENCE TIMELINE
          </h2>

          <p className="text-muted-foreground font-rajdhani text-lg max-w-2xl mx-auto">
            Professional journey through internships and hands-on development
          </p>
        </motion.div>

        {/* Desktop Timeline Icons */}
        <div className="hidden lg:flex justify-between items-center relative mb-16">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-primary/40 via-secondary/40 to-accent/40" />

          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() =>
                setPinnedId(pinnedId === exp.id ? null : exp.id)
              }
              className="relative z-10 flex flex-col items-center w-32"
            >
              <div
                className={`w-16 h-16 rounded-full border-2 border-${exp.color} bg-${exp.color}/20 flex items-center justify-center`}
              >
                <exp.icon className={`w-6 h-6 text-${exp.color}`} />
              </div>
              <span className="mt-3 text-xs text-muted-foreground text-center">
                {exp.role.split(" ").slice(0, 2).join(" ")}
              </span>
            </button>
          ))}
        </div>

        {/* Inline pinned card (DESKTOP ONLY, SAFE) */}
        {pinnedExp && (
          <motion.div
            key={pinnedExp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block mb-24"
          >
            <div className="glass-panel p-8 max-w-3xl mx-auto relative">
              <button
                onClick={() => setPinnedId(null)}
                className="absolute top-4 right-4 text-sm opacity-70 hover:opacity-100"
              >
                ✕
              </button>

              <div
                className={`inline-flex p-3 rounded-lg bg-${pinnedExp.color}/10 border border-${pinnedExp.color}/30 mb-4`}
              >
                <pinnedExp.icon
                  className={`w-6 h-6 text-${pinnedExp.color}`}
                />
              </div>

              <span
                className={`inline-block px-3 py-1 text-xs font-mono text-${pinnedExp.color} bg-${pinnedExp.color}/10 border border-${pinnedExp.color}/30 rounded-full mb-4`}
              >
                {pinnedExp.type}
              </span>

              <h3 className="text-2xl font-orbitron font-bold mb-2">
                {pinnedExp.role}
              </h3>

              <p
                className={`text-lg font-rajdhani text-${pinnedExp.color} mb-4`}
              >
                @ {pinnedExp.company}
              </p>

              <p className="text-muted-foreground font-rajdhani">
                {pinnedExp.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Mobile cards (no pin, no overlap) */}
        <div className="lg:hidden space-y-10">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6"
            >
              <div
                className={`inline-flex p-3 rounded-lg bg-${exp.color}/10 border border-${exp.color}/30 mb-4`}
              >
                <exp.icon className={`w-6 h-6 text-${exp.color}`} />
              </div>

              <span
                className={`inline-block px-3 py-1 text-xs font-mono text-${exp.color} bg-${exp.color}/10 border border-${exp.color}/30 rounded-full mb-4`}
              >
                {exp.type}
              </span>

              <h3 className="text-xl font-orbitron font-bold mb-1">
                {exp.role}
              </h3>

              <p
                className={`text-lg font-rajdhani text-${exp.color} mb-3`}
              >
                @ {exp.company}
              </p>

              <p className="text-muted-foreground font-rajdhani">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Leadership Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="glass-panel p-8">
            <div className="flex gap-6 items-start">
              <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                <Rocket className="w-8 h-8 text-success" />
              </div>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-mono text-success bg-success/10 border border-success/30 rounded-full mb-2">
                  Leadership
                </span>
                <h3 className="text-xl font-orbitron font-bold mb-1">
                  President & Student Lead – Innovation Club (Techie-Hub CSE)
                </h3>
                <p className="text-muted-foreground font-rajdhani">
                  Led technical initiatives, organized workshops and coding
                  sessions, mentored junior students, and supported hackathons
                  focused on cybersecurity and software development.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
