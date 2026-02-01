import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Code, Cloud, Brain, MapPin, GraduationCap } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Shield, label: "Cybersecurity", color: "primary" },
    { icon: Code, label: "Full Stack Dev", color: "secondary" },
    { icon: Cloud, label: "Cloud Computing", color: "accent" },
    { icon: Brain, label: "AI/ML Security", color: "success" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            ABOUT ME
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Holographic Identity Card */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel p-8 relative overflow-hidden">
              {/* Scan line effect */}
              <div className="scan-line" />
              
              {/* Holographic shimmer */}
              <div className="absolute inset-0 holographic opacity-30" />

              {/* Content */}
              <div className="relative z-10">
                {/* Header with avatar placeholder */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center">
                      <span className="text-3xl font-orbitron font-bold text-primary">SK</span>
                    </div>
                    <div className="absolute -inset-1 rounded-lg bg-primary/20 blur-lg -z-10" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-foreground mb-1">
                      SAKSHI KUMARI
                    </h3>
                    <p className="text-primary font-mono text-sm">
                      [Computer Science Engineer]
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>Hyderabad, India</span>
                    </div>
                  </div>
                </div>

                {/* Education badge */}
                <div className="flex items-center gap-3 mb-6 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">B.Tech Computer Science Engineering</p>
                    <p className="text-xs text-muted-foreground">Malla Reddy College of Engineering • CGPA: 8.45/10 • 2026</p>
                  </div>
                </div>

                {/* About text */}
                <p className="text-muted-foreground leading-relaxed mb-6 font-rajdhani text-lg text-justify">
                  Computer Science Engineering undergraduate with strong hands-on experience in 
                  <span className="text-primary"> malware detection</span>, 
                  <span className="text-secondary"> network security</span>, 
                  <span className="text-accent"> cloud computing</span>, and 
                  <span className="text-success"> full-stack development</span>. 
                  Trained in security operations, threat analysis, and cyber defense through 
                  <span className="text-primary"> Cisco</span> and 
                  <span className="text-secondary"> Oracle</span> certifications.
                </p>

                <p className="text-muted-foreground leading-relaxed font-rajdhani text-lg text-justify">
                  Proven ability to design AI-driven security systems, develop scalable web applications, 
                  and implement secure authentication mechanisms. Actively seeking cybersecurity, 
                  cloud security, or software engineering opportunities in international technical environments.
                </p>

                {/* Status indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse" />
                  <span className="text-success text-sm font-mono">STATUS: AVAILABLE FOR OPPORTUNITIES</span>
                </div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
            </div>
          </motion.div>

          {/* Skill highlights */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="glass-panel p-6 text-center group hover:border-primary/50 transition-colors cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="relative inline-block mb-4">
                    <item.icon className={`w-12 h-12 text-${item.color}`} />
                    <div className={`absolute inset-0 bg-${item.color}/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <h4 className="font-orbitron font-semibold text-foreground">
                    {item.label}
                  </h4>
                </motion.div>
              ))}
            </div>

            {/* Certifications CTA */}
            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href="#certifications"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-colors"
              >
                View Certifications
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
