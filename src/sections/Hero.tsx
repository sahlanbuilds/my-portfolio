import { useRef, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Download } from 'lucide-react';

const Hero3D = lazy(() => import('../components/Hero3D'));

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portraitWrapperRef = useRef<HTMLDivElement>(null);
  
  // Drag state
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    const tl = gsap.timeline();

    // Reset initial states
    gsap.set('.reveal-text', { yPercent: 100 });
    gsap.set('.fade-up', { y: 30, opacity: 0 });
    gsap.set('.photo-mask', { scale: 0.8, opacity: 0 });
    gsap.set('.photo-img', { scale: 1.2 });
    gsap.set('.scroll-line', { yPercent: -100 });

    // Animation sequence
    tl.to('.reveal-text', {
      yPercent: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    })
    .to('.fade-up', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.8')
    .to('.photo-mask', {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out'
    }, '-=1.2')
    .to('.photo-img', {
      scale: 1,
      duration: 1.5,
      ease: 'power3.out'
    }, '-=1.5');

    // Scroll indicator animation
    gsap.to('.scroll-line', {
      yPercent: 100,
      duration: 1.5,
      repeat: -1,
      ease: 'power2.inOut'
    });

    // Mouse parallax effect (Subtle)
    const xToPortrait = gsap.quickTo('.portrait-parallax', "x", {duration: 1, ease: "power3"});
    const yToPortrait = gsap.quickTo('.portrait-parallax', "y", {duration: 1, ease: "power3"});
    


    const handleMouseMove = (e: MouseEvent) => {
      // Don't do parallax while dragging
      if (isDragging.current) return;
      
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20; // very subtle max 10px
      const y = (e.clientY / innerHeight - 0.5) * 20;
      
      xToPortrait(-x);
      yToPortrait(-y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: container });

  // Custom Drag Handlers for Spring Physics Interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX - currentPos.current.x, y: e.clientY - currentPos.current.y };
    
    // Tap interaction: Slight scale down and tilt
    gsap.to(portraitWrapperRef.current, { scale: 0.95, rotation: -3, duration: 0.4, ease: "power2.out" });
    
    if (portraitWrapperRef.current) {
      portraitWrapperRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    
    const x = e.clientX - dragStart.current.x;
    const y = e.clientY - dragStart.current.y;
    
    // Constrain drag distance safely
    const constrainedX = Math.max(-80, Math.min(80, x));
    const constrainedY = Math.max(-80, Math.min(80, y));
    
    currentPos.current = { x: constrainedX, y: constrainedY };
    
    // Calculate rotation based on drag direction
    const rotation = constrainedX * 0.05;
    
    gsap.to(portraitWrapperRef.current, { 
      x: constrainedX, 
      y: constrainedY, 
      rotation, 
      duration: 0.2, 
      ease: "none" 
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    currentPos.current = { x: 0, y: 0 };
    
    // Elastic spring back to original position
    gsap.to(portraitWrapperRef.current, { 
      x: 0, y: 0, scale: 1, rotation: 0, 
      duration: 1.2, ease: "elastic.out(1, 0.3)" 
    });
    
    if (portraitWrapperRef.current) {
      portraitWrapperRef.current.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section ref={container} id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      
      {/* 3D Background - Lazy Loaded for Performance */}
      <Suspense fallback={null}>
        <Hero3D />
      </Suspense>

      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full grid lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* Left Content */}
        <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-center space-y-8 z-20">
          
          <div className="space-y-4">
            <div className="overflow-hidden">
              <p className="reveal-text text-primary font-semibold tracking-[0.2em] text-base md:text-lg uppercase">
                HI, I'M MUHAMMAD SAHLAN
              </p>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-[4.5rem] font-black tracking-tighter leading-[0.95] text-white">
              <div className="overflow-hidden py-1 pr-8 -mr-8">
                <div className="reveal-text text-white">INTERN</div>
              </div>
              <div className="overflow-hidden py-1 pr-8 -mr-8">
                <div className="reveal-text text-white">SOFTWARE</div>
              </div>
              <div className="overflow-hidden py-1 pr-8 -mr-8">
                <div className="reveal-text text-white">ENGINEER</div>
              </div>
            </h1>
          </div>

          <div className="space-y-6 max-w-xl">
            <p className="fade-up text-lg md:text-xl text-white/60 font-light leading-relaxed">
              Building practical digital experiences with modern technologies.
            </p>
            <p className="fade-up font-mono text-xs sm:text-sm text-primary/80 tracking-wide bg-primary/10 inline-block px-4 py-2 rounded-full border border-primary/20">
              React • Node.js • PHP • Java • MySQL • Firebase
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#projects" className="fade-up group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-black transition-transform hover:scale-105 active:scale-95">
              <span className="mr-2 relative z-10">View My Work</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-black/10" />
              </div>
            </a>
            
            <a href="/Resume.pdf" target="_blank" className="fade-up group relative inline-flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-8 font-medium text-white transition-all hover:bg-white/10 hover:border-white/30 active:scale-95">
              <span className="mr-2">Download CV</span>
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Photo Area */}
        <div className="lg:col-span-5 relative w-full h-[50vh] lg:h-[75vh] flex justify-center items-center mt-12 lg:mt-0 z-10 touch-none">
          <div ref={imageRef} className="relative w-full max-w-sm lg:max-w-full h-full aspect-[3/4] lg:aspect-auto">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[80px] -z-10 opacity-70 pointer-events-none" />

            {/* Interactive Portrait */}
            <div 
              ref={portraitWrapperRef}
              className="portrait-parallax absolute inset-0 z-20 flex justify-center items-center cursor-grab active:cursor-grabbing photo-mask"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Glowing Gradient Border Portrait */}
              <div className="relative w-full h-full lg:w-[85%] lg:h-[95%] p-[3px] rounded-[2.5rem] bg-gradient-to-br from-primary via-primary/80 to-primary/40 shadow-[0_0_40px_rgba(255,45,122,0.3)] pointer-events-none flex items-center justify-center">
                <div className="w-full h-full rounded-[2.35rem] overflow-hidden bg-[#070711]">
                  <img 
                    src="/Profile.jpg" 
                    alt="Muhammad Sahlan" 
                    className="photo-img w-full h-full object-cover object-center filter brightness-110 contrast-105 saturate-105"
                  />
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-6 lg:left-20 flex flex-col items-center space-y-4 fade-up z-20">
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/40 uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Scroll to explore
        </span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <div className="scroll-line absolute top-0 left-0 w-full h-1/2 bg-primary" />
        </div>
      </div>

    </section>
  );
}
