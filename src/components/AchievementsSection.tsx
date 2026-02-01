import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Award, Trophy, Medal, Star, ExternalLink, Shield, Cloud, Cpu } from 'lucide-react';

interface Certification {
  id: string;
  title: string;
  issuer: string;
  description: string;
  link: string;
  icon: typeof Shield;
  color: string;
  level: number;
}

interface Achievement {
  id: string;
  title: string;
  event: string;
  icon: typeof Trophy;
  color: string;
}

const certifications: Certification[] = [
  {
    id: "cisco",
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco Networking Academy",
    description: "Comprehensive training in cybersecurity fundamentals, network security, SOC operations, threat detection, and incident response.",
    link: "https://www.credly.com/badges/33197904-7f9f-44db-a735-c8862b5b7fe0",
    icon: Shield,
    color: "primary",
    level: 95,
  },
  {
    id: "oracle",
    title: "Oracle Cloud Infrastructure 2025 AI Foundations Associate",
    issuer: "Oracle",
    description: "Certified in AI, machine learning, and cloud computing concepts on Oracle Cloud Infrastructure.",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=0EBE215966D8C825EFEDD8832B59CE70719DEA7EABD48376469E2E983ABB91E9",
    icon: Cloud,
    color: "secondary",
    level: 90,
  },
  {
    id: "google",
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud Skills Boost",
    description: "Hands-on training in cloud computing, virtual machines, networking, and deployment on GCP.",
    link: "https://www.skills.google/public_profiles/d9a2ac89-55fe-4c63-8683-6bd602a635f5",
    icon: Cpu,
    color: "accent",
    level: 85,
  },
];

const achievements: Achievement[] = [
  {
    id: "paper",
    title: "1st Prize – Paper Presentation",
    event: "NeuroSplash 2k23",
    icon: Trophy,
    color: "primary",
  },
  {
    id: "hackathon",
    title: "3rd Place – Microsoft Hackathon",
    event: "Hack-N-Win",
    icon: Medal,
    color: "secondary",
  },
];

const CertificationCard = ({ cert, index }: { cert: Certification; index: number }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      onAnimationComplete={() => setIsUnlocked(true)}
    >
      <motion.div
        className="glass-panel p-6 relative overflow-hidden group h-full"
        whileHover={{ scale: 1.02, y: -5 }}
      >
        {/* Level-up glow effect */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              className={`absolute inset-0 bg-${cert.color}/20 rounded-lg`}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>

        {/* Badge icon with unlock animation */}
        <motion.div
          className="relative mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.2, type: "spring" }}
        >
          <div className={`inline-flex p-4 rounded-xl bg-${cert.color}/10 border border-${cert.color}/30 relative`}>
            <cert.icon className={`w-8 h-8 text-${cert.color}`} />
            
            {/* Sparkle effects */}
            <motion.div
              className={`absolute -top-1 -right-1 w-3 h-3 bg-${cert.color} rounded-full`}
              animate={isUnlocked ? {
                scale: [1, 1.5, 0],
                opacity: [1, 1, 0],
              } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            />
          </div>

          {/* Level indicator */}
          <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-background border border-primary/50 rounded-full">
            <span className="text-xs font-mono text-primary">LVL {cert.level}</span>
          </div>
        </motion.div>

        {/* Issuer badge */}
        <span className={`inline-block px-3 py-1 text-xs font-mono text-${cert.color} bg-${cert.color}/10 border border-${cert.color}/30 rounded-full mb-3`}>
          {cert.issuer}
        </span>

        {/* Title */}
        <h3 className="text-lg font-orbitron font-bold text-foreground mb-3 leading-tight">
          {cert.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground font-rajdhani mb-4 leading-relaxed">
          {cert.description}
        </p>

        {/* XP Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-mono text-muted-foreground">MASTERY</span>
            <span className={`text-xs font-mono text-${cert.color}`}>{cert.level}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r from-${cert.color} to-${cert.color === 'primary' ? 'secondary' : cert.color === 'secondary' ? 'accent' : 'primary'} rounded-full`}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${cert.level}%` } : {}}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.2, ease: "easeOut" }}
              style={{ boxShadow: `0 0 10px hsl(var(--${cert.color}))` }}
            />
          </div>
        </div>

        {/* Verify link */}
        <motion.a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-sm font-mono text-${cert.color} hover:underline`}
          whileHover={{ x: 5 }}
        >
          <ExternalLink className="w-4 h-4" />
          Verify Credential
        </motion.a>

        {/* Corner shine effect */}
        <motion.div
          className={`absolute -top-20 -right-20 w-40 h-40 bg-${cert.color}/10 rounded-full blur-3xl`}
          animate={isUnlocked ? { opacity: [0, 0.5, 0] } : {}}
          transition={{ duration: 1, delay: index * 0.2 }}
        />
      </motion.div>
    </motion.div>
  );
};

const AchievementBadge = ({ achievement, index }: { achievement: Achievement; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="glass-panel p-6 text-center relative overflow-hidden group"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05 }}
    >
      {/* Trophy/Medal with glow */}
      <motion.div
        className="relative inline-block mb-4"
        animate={isInView ? {
          rotateY: [0, 360],
        } : {}}
        transition={{ duration: 1, delay: 0.3 + index * 0.15 }}
      >
        <div className={`p-4 rounded-full bg-${achievement.color}/10 border-2 border-${achievement.color}/50 relative`}>
          <achievement.icon className={`w-10 h-10 text-${achievement.color}`} />
        </div>
        
        {/* Glow ring */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-${achievement.color}`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Stars */}
      <div className="flex justify-center gap-1 mb-3">
        {[...Array(index === 0 ? 3 : 2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.1 }}
          >
            <Star className={`w-4 h-4 text-${achievement.color} fill-${achievement.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Title */}
      <h4 className="font-orbitron font-bold text-foreground mb-2">
        {achievement.title}
      </h4>

      {/* Event */}
      <p className={`text-sm font-mono text-${achievement.color}`}>
        {achievement.event}
      </p>

      {/* Confetti effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${achievement.color} rounded-full`}
            style={{
              left: `${20 + i * 10}%`,
              top: '50%',
            }}
            animate={isInView ? {
              y: [-50, 100],
              x: [0, (i % 2 === 0 ? 1 : -1) * 20],
              opacity: [0, 1, 0],
            } : {}}
            transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
          />
        ))}
      </div>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="achievements" className="relative py-24 md:py-32" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-mono text-accent">LEVEL_UP_ZONE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            CERTIFICATIONS & ACHIEVEMENTS
          </h2>
          <p className="text-muted-foreground font-rajdhani text-lg max-w-2xl mx-auto">
            Professional credentials and competition victories unlocked
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        {/* Certifications */}
        <div className="mb-16">
          <motion.h3
            className="text-xl font-orbitron font-semibold text-foreground mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
          >
            <span className="text-primary">//</span> PROFESSIONAL CERTIFICATIONS
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.id} cert={cert} index={index} />
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <motion.h3
            className="text-xl font-orbitron font-semibold text-foreground mb-8 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <span className="text-secondary">//</span> COMPETITION VICTORIES
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {achievements.map((achievement, index) => (
              <AchievementBadge key={achievement.id} achievement={achievement} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
