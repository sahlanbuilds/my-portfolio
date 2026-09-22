import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const stages = [
  { id: "01", title: "Software Development", status: "Current Foundation", x: 20, y: 10, align: 'left' },
  { id: "02", title: "Full-Stack Development", status: "Expanding Skills", x: 80, y: 30, align: 'right' },
  { id: "03", title: "Cloud Computing", status: "Learning Path", x: 20, y: 50, align: 'left' },
  { id: "04", title: "DevOps", status: "Exploration", x: 80, y: 70, align: 'right' },
  { id: "05", title: "Cloud Engineering", status: "Long-Term Goal", x: 20, y: 90, align: 'left' }
];

export default function WhatsNext() {
  const container = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal Intro
    gsap.fromTo('.wn-intro', 
      { y: prefersReducedMotion ? 0 : 30, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.wn-header',
          start: 'top 80%',
        }
      }
    );

    if (prefersReducedMotion) {
      gsap.set(pathRef.current, { strokeDashoffset: 0 });
      gsap.set('.wn-stage-wrapper', { opacity: 1, y: 0 });
      gsap.set('.wn-num', { scale: 1 });
      gsap.set('.wn-dot', { backgroundColor: '#3b82f6', boxShadow: '0 0 20px rgba(59,130,246,0.5)' });
      return;
    }

    // Set up SVG path length
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      // Initialize path to be hidden (offset equals length)
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      // Create a master timeline linked to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.wn-path-container',
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1, // Smoothly animate on scroll up and down
        }
      });

      // 1. Animate path drawing continuously over duration 1
      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, 0);

      // 2. Animate each milestone exactly when the path reaches it
      stages.forEach((_, i) => {
        // The path has 4 identical segments, so milestones are hit at 0%, 25%, 50%, 75%, 100%
        const progressTime = i * 0.25;

        // Fade and slide the milestone wrapper
        tl.fromTo(`.wn-stage-${i}`,
          { opacity: 0.1, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' },
          progressTime
        );

        // Pop the large background number
        tl.fromTo(`.wn-stage-${i} .wn-num`,
          { scale: 0.8, color: 'rgba(255,255,255,0.03)' },
          { scale: 1, color: 'rgba(255,255,255,0.1)', duration: 0.1, ease: 'back.out(2)' },
          progressTime
        );

        // Ignite the connecting dot
        tl.fromTo(`.wn-stage-${i} .wn-dot`,
          { backgroundColor: 'transparent', boxShadow: '0 0 0px rgba(59,130,246,0)' },
          { backgroundColor: '#0ea5e9', boxShadow: '0 0 25px rgba(14,165,233,0.8)', duration: 0.05 },
          progressTime
        );
      });
    }

  }, { scope: container });

  return (
    <section id="whats-next" ref={container} className="relative py-32 bg-[#030303] overflow-hidden border-t border-white/5">
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[200px] -z-10 pointer-events-none mix-blend-screen" />

      <div className="max-w-7xl mx-auto w-full relative z-10 px-6 lg:px-20">
        
        {/* Header */}
        <div className="wn-header mb-12 lg:mb-20 max-w-3xl">
          <h2 className="wn-intro text-primary font-bold tracking-[0.3em] text-xs uppercase flex items-center space-x-4 mb-8">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span>What's Next</span>
          </h2>
          <p className="wn-intro text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-relaxed">
            Currently expanding my software development foundation into <span className="font-semibold text-white">full-stack development</span>, <span className="font-semibold text-white">cloud computing</span>, and <span className="font-semibold text-white">DevOps</span>, with a long-term goal of becoming a <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">Cloud Engineer</span>.
          </p>
        </div>

        {/* Vertical Flowing Pathway Canvas */}
        <div className="wn-path-container relative w-full h-[1200px] lg:h-[1800px] mt-24">
          
          {/* Base SVG */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-0">
            {/* Faint Background Path */}
            <path 
              d="M 20 10 C 20 20, 80 20, 80 30 C 80 40, 20 40, 20 50 C 20 60, 80 60, 80 70 C 80 80, 20 80, 20 90" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            {/* Animated Active Luminous Path */}
            <path 
              ref={pathRef}
              d="M 20 10 C 20 20, 80 20, 80 30 C 80 40, 20 40, 20 50 C 20 60, 80 60, 80 70 C 80 80, 20 80, 20 90" 
              fill="none" 
              stroke="url(#cyan-glow)" 
              strokeWidth="3" 
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-[0_0_12px_rgba(14,165,233,0.6)]"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="cyan-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Milestone HTML Overlays */}
          {stages.map((stage, i) => (
            <div 
              key={stage.id} 
              className={`wn-stage-${i} wn-stage-wrapper absolute flex items-center gap-6 lg:gap-10 opacity-10 z-10 w-[75vw] md:w-[45vw]`}
              style={{
                top: `${stage.y}%`,
                left: stage.align === 'left' ? `${stage.x}%` : 'auto',
                right: stage.align === 'right' ? `${100 - stage.x}%` : 'auto',
                transform: stage.align === 'left' ? 'translate(-24px, -50%)' : 'translate(24px, -50%)',
                flexDirection: stage.align === 'left' ? 'row' : 'row-reverse'
              }}
            >
               {/* Precise Anchor Dot */}
               <div className="w-12 h-12 flex items-center justify-center shrink-0 relative">
                 <div className="wn-dot w-4 h-4 rounded-full border-2 border-[#030303] bg-transparent transition-colors z-20" />
                 {/* Dark core to punch out the line behind it */}
                 <div className="absolute inset-0 bg-[#030303] rounded-full scale-[0.6] -z-10" />
               </div>
               
               {/* Text Content */}
               <div className={`flex flex-col flex-1 ${stage.align === 'left' ? 'items-start text-left' : 'items-end text-right'}`}>
                  <p className="wn-num text-7xl md:text-8xl lg:text-9xl font-black text-white/5 select-none -mb-5 md:-mb-8 tracking-tighter">
                    {stage.id}
                  </p>
                  <p className="text-[10px] md:text-xs font-bold tracking-widest text-primary uppercase mb-2">
                    {stage.status}
                  </p>
                  <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
                    {stage.title}
                  </h3>
               </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
