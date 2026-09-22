import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { projects } from '../data';
import { ExternalLink } from 'lucide-react';
import ProjectModal from '../components/ProjectModal';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Projects() {
  const container = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useGSAP(() => {
    // Reveal heading
    gsap.from('.projects-heading', {
      scrollTrigger: {
        trigger: '.projects-header',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.2
    });

    // Project 1 animations
    const p1 = gsap.timeline({
      scrollTrigger: {
        trigger: '.project-1',
        start: 'top 60%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      }
    });

    p1.from('.p1-image-container', {
      scale: 0.95,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    })
    .from('.p1-image-inner', {
      scale: 1.2,
      duration: 1.5,
      ease: 'power3.out'
    }, '<')
    .from('.p1-content > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=1');

    // Project 1 Parallax effect on scroll
    gsap.to('.p1-image-inner', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.project-1',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Project 2 animations
    const p2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.project-2',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    p2.from('.p2-image-container', {
      x: 50,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out'
    })
    .from('.p2-content > *', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.8');

    // Project 3 animations
    const p3Anim = gsap.timeline({
      scrollTrigger: {
        trigger: '.project-3',
        start: 'top 60%',
        end: 'bottom top',
        toggleActions: 'play none none reverse',
      }
    });

    p3Anim.from('.p3-image-container', {
      scale: 0.95,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out'
    })
    .from('.p3-image-inner', {
      scale: 1.2,
      duration: 1.5,
      ease: 'power3.out'
    }, '<')
    .from('.p3-content > *', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=1');

    gsap.to('.p3-image-inner', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.project-3',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: container });

  const p1 = projects[0];
  const p2 = projects[1];
  const p3 = projects[2];

  return (
    <section id="projects" ref={container} className="relative py-32 px-6 lg:px-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full relative z-10 projects-header mb-32">
        <div className="space-y-6 max-w-2xl">
          <h2 className="projects-heading text-primary font-bold tracking-[0.3em] text-xs uppercase flex items-center space-x-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span>Selected Work</span>
          </h2>
          <p className="projects-heading text-4xl lg:text-6xl font-black tracking-tighter text-white leading-tight">
            Projects I've designed and <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-white">developed.</span>
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-40">
        
        {/* Project 1 - Dominant */}
        <div className="project-1 flex flex-col xl:flex-row gap-12 xl:gap-20 items-center">
          
          <div className="w-full xl:w-[60%] relative">
            <div className="p1-image-container relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              <div className="p1-image-inner w-full h-[120%] -top-[10%] relative flex items-center justify-center bg-[#0c0c16]">
                 <img src={p1.image} alt={p1.title} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            {/* Ambient Glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          </div>

          <div className="w-full xl:w-[40%] p1-content space-y-8">
            <div className="space-y-4 relative">
              <p className="absolute -top-16 -left-6 text-9xl font-black text-white/[0.03] select-none pointer-events-none">{p1.id}</p>
              <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight relative z-10">{p1.title}</h3>
            </div>
            
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {p1.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {p1.tech.map((tech) => (
                <span key={tech} className="px-4 py-2 text-xs font-semibold text-primary/90 bg-primary/10 border border-primary/20 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-8">
              {p1.links.live && p1.links.live !== "" && p1.links.live !== "#" && (
                <a href={p1.links.live} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 rounded-full overflow-hidden flex items-center space-x-2 border border-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                   <span className="relative z-10 text-sm font-semibold text-white tracking-wide">Live Demo</span>
                   <ExternalLink className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {p1.links.github && p1.links.github !== "" && p1.links.github !== "#" && (
                <a href={p1.links.github} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 rounded-full overflow-hidden flex items-center space-x-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors">
                  <GithubIcon className="relative z-10 w-5 h-5 text-white/70 group-hover:text-white" />
                  <span className="relative z-10 text-sm font-semibold text-white/90 group-hover:text-white tracking-wide">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>


        {/* Project 2 - Secondary */}
        <div className="project-2 flex flex-col-reverse xl:flex-row gap-12 xl:gap-16 items-center">
          
          <div className="w-full xl:w-[45%] p2-content space-y-6 xl:pr-12">
            <div className="space-y-2 relative">
              <p className="absolute -top-12 -left-4 text-8xl font-black text-white/[0.03] select-none pointer-events-none">{p2.id}</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight relative z-10">{p2.title}</h3>
            </div>
            
            <p className="text-base text-white/50 leading-relaxed font-light">
              {p2.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {p2.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 text-[11px] font-medium text-white/60 bg-white/5 border border-white/10 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6">
              {p2.links.live && p2.links.live !== "" && p2.links.live !== "#" && (
                <a href={p2.links.live} target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 rounded-full overflow-hidden flex items-center space-x-2 border border-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                   <span className="relative z-10 text-sm font-semibold text-white tracking-wide">Live Demo</span>
                   <ExternalLink className="relative z-10 w-3.5 h-3.5 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {p2.links.github && p2.links.github !== "" && p2.links.github !== "#" && (
                <a href={p2.links.github} target="_blank" rel="noopener noreferrer" className="group relative px-6 py-3 rounded-full overflow-hidden flex items-center space-x-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors">
                  <GithubIcon className="relative z-10 w-4 h-4 text-white/70 group-hover:text-white" />
                  <span className="relative z-10 text-sm font-semibold text-white/90 group-hover:text-white tracking-wide">GitHub</span>
                </a>
              )}
            </div>
          </div>

          <div className="w-full xl:w-[55%] relative">
            <div className="p2-image-container relative aspect-[16/10] lg:aspect-[21/9] xl:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 glass group shadow-xl">
              <div className="absolute inset-0 bg-white/5 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              <img src={p2.image} alt={p2.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
          </div>

        </div>

        {/* Project 3 - Tertiary */}
        <div className="project-3 flex flex-col xl:flex-row gap-12 xl:gap-20 items-center">
          
          <div className="w-full xl:w-[60%] relative">
            <div className="p3-image-container relative aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden group shadow-2xl border border-white/5">
              <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
              <div className="p3-image-inner w-full h-[120%] -top-[10%] relative flex items-center justify-center bg-[#0c0c16]">
                 <img src={p3.image} alt={p3.title} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            {/* Ambient Glow */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10" />
          </div>

          <div className="w-full xl:w-[40%] p3-content space-y-8">
            <div className="space-y-4 relative">
              <p className="absolute -top-16 -left-6 text-9xl font-black text-white/[0.03] select-none pointer-events-none">{p3.id}</p>
              <h3 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight relative z-10">{p3.title}</h3>
            </div>
            
            <p className="text-lg text-white/60 leading-relaxed font-light">
              {p3.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-4">
              {p3.tech.map((tech) => (
                <span key={tech} className="px-4 py-2 text-xs font-semibold text-primary/90 bg-primary/10 border border-primary/20 rounded-full">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-8">
              {p3.links.live && p3.links.live !== "" && p3.links.live !== "#" && (
                <a href={p3.links.live} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 rounded-full overflow-hidden flex items-center space-x-2 border border-primary bg-primary/10 hover:bg-primary/20 transition-colors">
                   <span className="relative z-10 text-sm font-semibold text-white tracking-wide">Live Demo</span>
                   <ExternalLink className="relative z-10 w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              )}
              {p3.links.github && p3.links.github !== "" && p3.links.github !== "#" && (
                <a href={p3.links.github} target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 rounded-full overflow-hidden flex items-center space-x-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors">
                  <GithubIcon className="relative z-10 w-5 h-5 text-white/70 group-hover:text-white" />
                  <span className="relative z-10 text-sm font-semibold text-white/90 group-hover:text-white tracking-wide">GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
