import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryPortal from '@/components/EntryPortal';
import Navigation from '@/components/Navigation';
import ParticleField from '@/components/ParticleField';
import CyberGrid from '@/components/CyberGrid';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import AchievementsSection from '@/components/AchievementsSection';
import SocialPortals from '@/components/SocialPortals';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Entry Portal */}
      <EntryPortal onEnter={handleEnter} />

      {/* Main Content */}
      <AnimatePresence>
        {hasEntered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Background effects */}
            <ParticleField />
            <CyberGrid />

            {/* Navigation */}
            <Navigation />

            {/* Hero area (minimal since we have portal) */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-20">
              <div className="text-center px-4 relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <div className="flex items-center justify-center gap-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-4">
                      <span className="text-primary text-glow-cyan">SAKSHI</span>
                      <span className="text-foreground"> KUMARI</span>
                    </h1>
                    <div className="hidden sm:block">
                      <img src="/profile.jpg" alt="Sakshi Kumari" className="w-20 h-20 rounded-full border-2 border-primary/30 shadow-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'}} />
                    </div>
                  </div>
                  <p className="text-lg md:text-xl font-rajdhani text-muted-foreground max-w-2xl mx-auto mb-8">
                    Cybersecurity Engineer | Full Stack Developer
                  </p>
                  
                  {/* Scroll indicator */}
                  <motion.div
                    className="flex flex-col items-center gap-2 mt-12"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xs font-mono text-muted-foreground">SCROLL TO EXPLORE</span>
                    <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Decorative hexagon background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <svg viewBox="0 0 400 400" className="w-[600px] h-[600px]">
                  <polygon
                    points="200,40 340,120 340,280 200,360 60,280 60,120"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.5"
                  />
                  <polygon
                    points="200,80 300,140 300,260 200,320 100,260 100,140"
                    fill="none"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            </section>

            {/* Main sections */}
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <SocialPortals />
            <ContactSection />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
