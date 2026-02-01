import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Linkedin, Github, Code2 } from 'lucide-react';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: typeof Linkedin;
  color: string;
  description: string;
}

const socialLinks: SocialLink[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/r-sakshi-kumari",
    icon: Linkedin,
    color: "secondary",
    description: "Professional Network",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/sakshi-kumari28",
    icon: Github,
    color: "foreground",
    description: "Code Repository",
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    url: "https://www.hackerrank.com/",
    icon: Code2,
    color: "success",
    description: "Coding Challenges",
  },
];

const PortalCard = ({ link, index }: { link: SocialLink; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.a
      ref={ref}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="glass-panel p-8 text-center relative overflow-hidden">
        {/* Portal ring effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className={`w-32 h-32 rounded-full border border-${link.color === 'foreground' ? 'primary' : link.color}/30`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className={`absolute w-40 h-40 rounded-full border border-${link.color === 'foreground' ? 'primary' : link.color}/20`}
            animate={{
              scale: [1.1, 1.3, 1.1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
          />
        </div>

        {/* Icon with ripple */}
        <motion.div
          className="relative inline-block mb-4 z-10"
          whileHover={{
            rotate: [0, -10, 10, 0],
          }}
          transition={{ duration: 0.5 }}
        >
          <div className={`p-5 rounded-xl bg-gradient-to-br from-${link.color === 'foreground' ? 'primary' : link.color}/20 to-transparent border border-${link.color === 'foreground' ? 'primary' : link.color}/30`}>
            <link.icon className={`w-10 h-10 ${link.color === 'foreground' ? 'text-foreground' : `text-${link.color}`}`} />
          </div>

          {/* Ripple on hover */}
          <motion.div
            className={`absolute inset-0 rounded-xl border-2 border-${link.color === 'foreground' ? 'primary' : link.color} opacity-0 group-hover:opacity-100`}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </motion.div>

        {/* Name */}
        <h4 className={`font-orbitron font-bold text-xl mb-2 ${link.color === 'foreground' ? 'text-foreground' : `text-${link.color}`} group-hover:text-glow-cyan transition-all`}>
          {link.name}
        </h4>

        {/* Description */}
        <p className="text-sm font-mono text-muted-foreground">
          {link.description}
        </p>

        {/* Warp effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
        />

        {/* Enter portal text */}
        <motion.span
          className="absolute bottom-4 left-0 right-0 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          [ ENTER PORTAL ]
        </motion.span>
      </div>
    </motion.a>
  );
};

const SocialPortals = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-orbitron font-bold text-foreground mb-2">
            CYBER PORTALS
          </h3>
          <p className="text-muted-foreground font-rajdhani">
            Connect through the digital realm
          </p>
        </motion.div>

        {/* Social cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((link, index) => (
            <PortalCard key={link.id} link={link} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialPortals;
