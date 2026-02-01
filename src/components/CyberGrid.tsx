const CyberGrid = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated grid */}
      <div 
        className="absolute inset-0 animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(180 100% 50% / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(180 100% 50% / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Perspective grid floor */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[40vh]"
        style={{
          background: `
            linear-gradient(to top, hsl(180 100% 50% / 0.1) 0%, transparent 100%)
          `,
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'bottom',
        }}
      >
        <div 
          className="absolute inset-0 animate-grid-move"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(180 100% 50% / 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(180 100% 50% / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Central glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full animate-glow-pulse"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(180 100% 50% / 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Corner glows */}
      <div 
        className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(270 80% 60% / 0.1) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(210 100% 60% / 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default CyberGrid;
