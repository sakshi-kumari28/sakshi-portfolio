import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Terminal, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const terminalLines = [
    { text: '> Initializing secure connection...', delay: 0 },
    { text: '> Encrypting transmission channel...', delay: 0.3 },
    { text: '> Connection established', delay: 0.6 },
    { text: '> Ready for message input_', delay: 0.9 },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32" ref={ref}>
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">TRANSMISSION_TERMINAL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
            DIGITAL TRANSMISSION
          </h2>
          <p className="text-muted-foreground font-rajdhani text-lg max-w-2xl mx-auto">
            Initiate secure communication channel
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary" />
            <div className="w-2 h-2 bg-primary rounded-full animate-glow-pulse" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary" />
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Terminal animation */}
            <div className="glass-panel p-6 mb-8 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-primary/20">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-cyber-orange" />
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="ml-2 text-muted-foreground">terminal@sakshi:~$</span>
              </div>
              <div className="space-y-2">
                {terminalLines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-primary"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: line.delay }}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="space-y-6">
              <motion.a
                href="mailto:sakshikumari0418@gmail.com"
                className="glass-panel p-5 flex items-center gap-4 group hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ x: 10 }}
              >
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 group-hover:glow-cyan transition-all">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-1">[EMAIL]</p>
                  <p className="text-foreground font-rajdhani">sakshikumari0418@gmail.com</p>
                </div>
              </motion.a>

              <motion.div
                className="glass-panel p-5 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/30">
                  <MapPin className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-mono text-muted-foreground mb-1">[LOCATION]</p>
                  <p className="text-foreground font-rajdhani">Hyderabad, India</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-panel p-8 relative overflow-hidden">
              {/* Scan line */}
              <div className="scan-line" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                {/* Name field */}
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    [IDENTIFIER]
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg font-rajdhani text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    [COMM_CHANNEL]
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg font-rajdhani text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    [MESSAGE_PAYLOAD]
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-lg font-rajdhani text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                    placeholder="Enter your message"
                  />
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative px-6 py-4 bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/50 rounded-lg font-orbitron font-semibold text-primary overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button glow */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        TRANSMITTING...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        INITIATE TRANSMISSION
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Success message */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    className="absolute inset-0 bg-background/95 flex items-center justify-center z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10 }}
                      >
                        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                      </motion.div>
                      <h4 className="font-orbitron font-bold text-xl text-success mb-2">
                        TRANSMISSION COMPLETE
                      </h4>
                      <p className="text-muted-foreground font-mono text-sm">
                        Message received successfully
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary/50" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
