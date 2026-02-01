import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryPortalProps {
  onEnter: () => void;
}

const EntryPortal = ({ onEnter }: EntryPortalProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isWarping, setIsWarping] = useState(false);

  const handleEnter = () => {
    setIsWarping(true);
    setTimeout(() => {
      setIsVisible(false);
      onEnter();
    }, 1000);
  };

  const title = "SAKSHI KUMARI";
  const subtitle = "COMPUTER SCIENCE & CYBERSECURITY ENTHUSIAST";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'radial-gradient(ellipse at center, hsl(255, 27%, 6%) 0%, hsl(220 20% 4%) 100%)',
          }}
        >
          {/* Warp tunnel effect */}
          <AnimatePresence>
            {isWarping && (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeIn" }}
              >
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 border rounded-full"
                    style={{
                      width: `${100 + i * 150}px`,
                      height: `${100 + i * 150}px`,
                      marginLeft: `-${50 + i * 75}px`,
                      marginTop: `-${50 + i * 75}px`,
                      borderColor: `hsl(180 100% 50% / ${0.3 - i * 0.03})`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 2, 4],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{ 
                      duration: 1,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hexagonal frame */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.svg
              viewBox="0 0 400 400"
              className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Outer hexagon */}
              <motion.polygon
                points="200,20 350,110 350,290 200,380 50,290 50,110"
                fill="none"
                stroke="hsl(180, 100%, 50%)"
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              {/* Inner hexagon */}
              <motion.polygon
                points="200,60 310,130 310,270 200,340 90,270 90,130"
                fill="none"
                stroke="hsl(210, 100%, 60%)"
                strokeWidth="1"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.8 }}
              />
              {/* Core hexagon */}
              <motion.polygon
                points="200,100 270,150 270,250 200,300 130,250 130,150"
                fill="hsl(180, 100%, 50%)"
                fillOpacity="0.03"
                stroke="hsl(270, 80%, 60%)"
                strokeWidth="1"
                opacity="0.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.1 }}
              />
              {/* Decorative lines */}
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={200 + 180 * Math.cos((angle * Math.PI) / 180)}
                  y2={200 + 180 * Math.sin((angle * Math.PI) / 180)}
                  stroke="hsl(180, 100%, 50%)"
                  strokeWidth="0.5"
                  opacity="0.2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 1.5 + i * 0.1 }}
                />
              ))}
            </motion.svg>
          </div>

          {/* Rotating ring */}
          <motion.div
            className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-primary/20 animate-spin-slow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full glow-cyan"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateX(${250}px) translateY(-50%)`,
                }}
              />
            ))}
          </motion.div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            {/* Glitch name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-primary text-glow-cyan glitch mb-4"
                data-text={title}
              >
                {title.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                    className="inline-block"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Subtitle with typing effect */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl font-rajdhani text-secondary text-glow-blue font-medium tracking-wide">
                {subtitle}
              </p>
            </motion.div>

            {/* Scan line decoration */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse glow-cyan" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
            </motion.div>

            {/* Enter button */}
            <motion.button
              onClick={handleEnter}
              className="group mt-12 relative px-8 py-4 font-orbitron font-semibold text-lg tracking-widest overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button background */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg border border-primary/50 group-hover:border-primary transition-colors duration-300" />
              
              {/* Hover glow */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur-xl" />
              
              {/* Button text */}
              <span className="relative text-primary group-hover:text-glow-cyan transition-all duration-300">
                ENTER INTO MY DIGITAL UNIVERSE
              </span>

              {/* Corner decorations */}
              <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary" />
            </motion.button>
          </div>

          {/* Floating particles in portal */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  background: ['hsl(180, 100%, 50%)', 'hsl(210, 100%, 60%)', 'hsl(270, 80%, 60%)'][i % 3],
                }}
                initial={{ 
                  y: '100vh',
                  opacity: 0,
                }}
                animate={{ 
                  y: '-100vh',
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntryPortal;
