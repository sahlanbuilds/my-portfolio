import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, ExternalLink, MonitorPlay, Layout } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function ProjectModal({ project, onClose }: { project: any, onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    gsap.fromTo(overlayRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    
    gsap.fromTo(modalRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
    );

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: 'power2.in' });
    gsap.to(modalRef.current, { 
      y: 30, opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', 
      onComplete: onClose 
    });
  };

  if (!project) return null;

  const hasLiveLink = project.links.live && project.links.live !== "" && project.links.live !== "#";
  const hasGithubLink = project.links.github && project.links.github !== "" && project.links.github !== "#";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" style={{ perspective: '1000px' }}>
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={handleClose}
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10"
      >
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto overflow-x-hidden p-8 sm:p-12">
          
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 pr-12">{project.title}</h2>
            
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-tr from-blue-900/20 via-primary/10 to-black border border-white/5 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay pointer-events-none" />
              {project.id === "01" ? (
                <MonitorPlay className="w-20 h-20 text-white/10" />
              ) : (
                <Layout className="w-20 h-20 text-white/10" />
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="md:col-span-2 space-y-10">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Overview</h3>
                <p className="text-white/70 leading-relaxed font-light">{project.overview}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Key Features</h3>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-3 text-white/70 font-light">
                      <span className="text-primary mt-1 text-lg leading-none">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase">My Contribution</h3>
                <p className="text-white/70 leading-relaxed font-light">{project.contribution}</p>
              </div>

            </div>

            <div className="space-y-10">
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech: string) => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-medium text-white/80 bg-white/5 border border-white/10 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/10">
                {hasLiveLink ? (
                  <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors shadow-lg">
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ) : (
                  <button disabled className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-white/10 text-white/30 font-semibold cursor-not-allowed border border-white/5">
                    <span>Live Demo (Not Available)</span>
                  </button>
                )}
                
                {hasGithubLink ? (
                  <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors">
                    <GithubIcon className="w-4 h-4" />
                    <span>View Source</span>
                  </a>
                ) : (
                  <button disabled className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-black text-white/30 font-medium border border-white/5 cursor-not-allowed">
                    <GithubIcon className="w-4 h-4 opacity-50" />
                    <span>Source Private</span>
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
