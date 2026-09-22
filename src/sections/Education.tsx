import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { education } from '../data';
import { GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Education() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      }
    });

    gsap.set('.edu-reveal', { y: 30, opacity: 0 });
    gsap.set('.timeline-line', { scaleY: 0, transformOrigin: 'top' });
    gsap.set('.timeline-dot', { scale: 0, opacity: 0 });

    tl.to('.edu-reveal', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    })
    .to('.timeline-line', {
      scaleY: 1,
      duration: 1.5,
      ease: 'power3.inOut'
    }, '-=0.5')
    .to('.timeline-dot', {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: 'back.out(2)'
    }, '-=1.2');

  }, { scope: container });

  return (
    <section id="education" ref={container} className="relative py-32 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        <div className="mb-24 space-y-4 text-center flex flex-col items-center">
          <div className="edu-reveal w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
             <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <h2 className="edu-reveal text-primary font-bold tracking-[0.3em] text-xs uppercase">
            Education
          </h2>
          <p className="edu-reveal text-3xl sm:text-4xl font-light text-white">
            Academic Background
          </p>
        </div>

        <div className="relative pl-8 sm:pl-0">
          {/* Vertical Timeline Line */}
          <div className="timeline-line absolute left-[15px] sm:left-1/2 sm:-ml-[1px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

          <div className="space-y-16 sm:space-y-24">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`relative flex flex-col sm:flex-row items-start sm:items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="timeline-dot absolute left-[-21px] sm:left-1/2 sm:-ml-[6px] top-1 sm:top-1/2 sm:-mt-[6px] w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(59,130,246,0.6)] z-10 ring-4 ring-background" />

                  <div className={`w-full sm:w-1/2 ${isEven ? 'sm:pl-16' : 'sm:pr-16 text-left sm:text-right'}`}>
                    <div className="edu-reveal space-y-3">
                      <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-primary/80 uppercase bg-primary/10 rounded-full border border-primary/20 mb-2">
                        {item.period}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                        {item.degree}
                      </h3>
                      <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light">
                        {item.institution}
                      </p>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
