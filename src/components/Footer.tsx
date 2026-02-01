import { motion } from 'framer-motion';
import { Shield, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-primary/10">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Shield className="w-6 h-6 text-primary" />
            <span className="font-orbitron font-bold text-foreground">
              SAKSHI<span className="text-primary">.DEV</span>
            </span>
          </motion.div>

          {/* Status */}
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <div className="w-2 h-2 bg-success rounded-full animate-glow-pulse" />
            <span>System Status: Online</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm font-rajdhani text-muted-foreground">
            <span>© {currentYear} Crafted with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>by Sakshi Kumari</span>
          </div>
        </div>

        {/* Decorative bottom line */}
        <motion.div
          className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
      </div>
    </footer>
  );
};

export default Footer;
