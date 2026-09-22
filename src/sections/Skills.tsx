import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface TechNode {
  id: string;
  name: string;
  category: string;
  angle: number;
  primary: boolean;
  icon?: string;
}

interface OrbitalRing {
  radius: number;
  duration: number;
  reverse: boolean;
  nodes: TechNode[];
}

const skillsData = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js"]
  },
  {
    category: "Backend & DB",
    skills: ["Node.js", "PHP", "Java", "MySQL", "Firebase", "SQLite"]
  },
  {
    category: "Dev Tools",
    skills: ["Git", "GitHub", "Android Studio", "Java Swing"]
  },
  {
    category: "Design & UI/UX",
    skills: ["UI Development", "Responsive Web Design", "User Interface Design"]
  },
  {
    category: "Soft Skills",
    skills: ["Problem-Solving", "Teamwork", "Communication", "Adaptability", "Time Management"]
  }
];

const rings: OrbitalRing[] = [
  {
    radius: 160,
    duration: 35,
    reverse: false,
    nodes: [
      { id: 'react', name: 'React.js', angle: 0, category: 'Frontend', primary: true, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { id: 'javascript', name: 'JavaScript', angle: 90, category: 'Frontend', primary: true, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { id: 'nodejs', name: 'Node.js', angle: 180, category: 'Backend', primary: true, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { id: 'java', name: 'Java', angle: 270, category: 'Backend', primary: true, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    ]
  },
  {
    radius: 280,
    duration: 50,
    reverse: true,
    nodes: [
      { id: 'html5', name: 'HTML5', angle: 0, category: 'Frontend', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { id: 'css3', name: 'CSS3', angle: 60, category: 'Frontend', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { id: 'php', name: 'PHP', angle: 120, category: 'Backend', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { id: 'mysql', name: 'MySQL', angle: 180, category: 'Database', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { id: 'firebase', name: 'Firebase', angle: 240, category: 'Database', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },
      { id: 'sqlite', name: 'SQLite', angle: 300, category: 'Database', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
    ]
  },
  {
    radius: 420,
    duration: 70,
    reverse: false,
    nodes: [
      { id: 'git', name: 'Git', angle: 45, category: 'Dev Tools', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { id: 'github', name: 'GitHub', angle: 135, category: 'Dev Tools', primary: false, icon: 'https://cdn.simpleicons.org/github/white' },
      { id: 'androidstudio', name: 'Android Studio', angle: 225, category: 'Dev Tools', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg' },
      { id: 'javaswing', name: 'Java Swing', angle: 315, category: 'Dev Tools', primary: false, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    ]
  }
];

// Combine all nodes for mobile view grouping
const allNodes = rings.flatMap(r => r.nodes);
const categories = {
  Frontend: allNodes.filter(n => ['html5', 'css3', 'javascript', 'react'].includes(n.id)),
  Backend: allNodes.filter(n => ['nodejs', 'php', 'java'].includes(n.id)),
  Database: allNodes.filter(n => ['mysql', 'firebase', 'sqlite'].includes(n.id)),
  Tools: allNodes.filter(n => ['git', 'github', 'androidstudio', 'javaswing'].includes(n.id)),
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });

    // 1. Fade in Background Atmosphere
    tl.to('.ambient-particles', { opacity: 1, duration: 1 });

    // 2. Core scales in
    tl.from(coreRef.current, {
      scale: 0,
      opacity: 0,
      rotation: -45,
      duration: 1,
      ease: "back.out(1.5)"
    }, "-=0.5");

    // 3. Orbital rings draw out
    tl.from('.orbital-track', {
      attr: { r: 0 },
      opacity: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: "power2.out"
    }, "-=0.5");

    // 4. Connection lines draw
    tl.from('.core-connection', {
      strokeDasharray: "0 1000",
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=1.0");

    // 5. Nodes emerge
    tl.from('.tech-orb', {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: { amount: 1, from: "center" },
      ease: "back.out(1.2)"
    }, "-=1.0");

    // Ambient floating particles
    gsap.to('.ambient-particle', {
      y: 'random(-50, 50)',
      x: 'random(-50, 50)',
      opacity: 'random(0.1, 0.5)',
      duration: 'random(3, 8)',
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1
    });

    // Random Pulse on primary nodes
    const primaryNodes = gsap.utils.toArray('.tech-orb-primary');
    if (primaryNodes.length > 0) {
      gsap.to(primaryNodes, {
        scale: 1.1,
        boxShadow: "0 0 40px rgba(59,130,246,0.8)",
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 2,
          from: "random"
        },
        ease: "sine.inOut"
      });
    }

    // Magnetic Hover Interaction
    const orbs = gsap.utils.toArray('.tech-orb-magnet');
    orbs.forEach((orb: any) => {
      orb.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = orb.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        gsap.to(orb.querySelector('.tech-orb-inner'), {
          x, y, duration: 0.3, ease: "power2.out"
        });
      });
      orb.addEventListener('mouseleave', () => {
        gsap.to(orb.querySelector('.tech-orb-inner'), {
          x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)"
        });
      });
    });

  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} 
      className="relative min-h-screen flex flex-col pt-32 pb-20 overflow-hidden"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 opacity-0 ambient-particles pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] mix-blend-screen" />
        {Array.from({ length: 30 }).map((_, i) => (
          <div 
            key={i}
            className="ambient-particle absolute rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-50 w-full mb-16 lg:mb-0 flex-shrink-0">
        <h2 className="text-primary font-bold tracking-[0.3em] text-xs uppercase flex items-center space-x-4 mb-6">
          <span className="w-8 h-[1px] bg-primary"></span>
          <span>Technology Stack</span>
        </h2>
        <p className="text-sm font-semibold text-white/50 tracking-widest uppercase mb-2">The tools behind my work</p>
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white max-w-2xl leading-[1.1]">
          Built with technologies that <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">scale.</span>
        </p>

        {/* Skills Cards Grid */}
        <div className="mt-16 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {skillsData.map((group, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#0c0c16] border border-white/5 rounded-2xl p-6 lg:p-8 hover:bg-[#11111f] hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,45,122,0.15)] transition-all duration-300 shadow-xl cursor-pointer"
            >
              <h3 className="text-lg font-bold text-white mb-6 group-hover:text-primary transition-colors">{group.category}</h3>
              <ul className="space-y-4">
                {group.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="text-white/60 text-sm font-medium hover:text-primary transition-colors">{skill}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DESKTOP: Orbital Ecosystem */}
      <div className="hidden lg:flex relative flex-grow w-full items-center justify-center min-h-[900px]">
        
        {/* SVG Tracks and Connections */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] pointer-events-none z-0 overflow-visible">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
              <stop offset="100%" stopColor="rgba(59,130,246,0)" />
            </radialGradient>
          </defs>
          <circle cx="500" cy="500" r="150" fill="url(#coreGlow)" />
          
          {rings.map((ring, i) => (
            <circle 
              key={`track-${i}`}
              cx="500" cy="500" r={ring.radius} 
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
              className="orbital-track"
            />
          ))}

          {/* Core Connections to Inner Ring */}
          {rings[0].nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const x2 = 500 + Math.cos(rad) * rings[0].radius;
            const y2 = 500 + Math.sin(rad) * rings[0].radius;
            return (
              <line 
                key={`conn-${i}`}
                x1="500" y1="500" x2={x2} y2={y2}
                stroke="rgba(59,130,246,0.4)" strokeWidth="1.5"
                strokeDasharray="5 5"
                className="core-connection"
                style={{ animation: 'pulse-glow 2s linear infinite' }}
              />
            );
          })}
        </svg>

        {/* Central Core */}
        <div ref={coreRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 tech-orb">
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full border border-primary/30 bg-black/50 backdrop-blur-md shadow-[0_0_50px_rgba(59,130,246,0.4)]">
            <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
            <div className="text-center">
              <span className="block text-white font-black tracking-widest text-lg leading-tight">SOFTWARE</span>
              <span className="block text-primary text-[10px] tracking-[0.2em] mt-1 uppercase">Engineer</span>
            </div>
          </div>
        </div>

        {/* Orbiting Rings */}
        {rings.map((ring, ringIdx) => {
          const orbitAnim = ring.reverse ? 'spin-orbit-reverse' : 'spin-orbit';
          const counterAnim = ring.reverse ? 'spin-orbit' : 'spin-orbit-reverse';

          return (
            <div 
              key={`ring-${ringIdx}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              style={{ width: ring.radius * 2, height: ring.radius * 2, animation: `${orbitAnim} ${ring.duration}s linear infinite` }}
            >
              {ring.nodes.map(node => (
                <div 
                  key={node.id}
                  className="absolute top-1/2 left-1/2 tech-orb tech-orb-magnet pointer-events-auto"
                  style={{ transform: `rotate(${node.angle}deg) translateX(${ring.radius}px)` }}
                >
                  <div 
                    style={{ animation: `${counterAnim} ${ring.duration}s linear infinite` }}
                  >
                    <div style={{ transform: `rotate(-${node.angle}deg)` }} className="relative group/tooltip">
                      <div className={`tech-orb-inner flex flex-col items-center justify-center glass rounded-xl border border-white/10 backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:bg-white/10 cursor-pointer ${node.primary ? 'px-6 py-4 shadow-[0_0_20px_rgba(59,130,246,0.15)] tech-orb-primary' : 'px-4 py-3 opacity-80 hover:opacity-100'}`}>
                        {node.icon && (
                          <img src={node.icon} alt={node.name} className={`mb-2 object-contain ${node.primary ? 'w-8 h-8' : 'w-6 h-6'}`} />
                        )}
                        <span className={`font-bold text-white tracking-wider ${node.primary ? 'text-sm' : 'text-xs'}`}>
                          {node.name}
                        </span>
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                        <div className="bg-black/90 border border-white/10 text-white/70 text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-md">
                          {node.category}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* MOBILE: Vertical Ecosystem Tree */}
      <div className="lg:hidden relative w-full px-6 mt-16 z-20">
        <div className="absolute top-0 bottom-0 left-[27px] w-[1px] bg-gradient-to-b from-primary via-white/10 to-transparent" />
        
        <div className="relative mb-12 ml-12">
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-black shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <h3 className="text-white font-black tracking-widest text-xl mb-1">SOFTWARE</h3>
          <p className="text-primary text-xs tracking-widest uppercase">Ecosystem Core</p>
        </div>

        {Object.entries(categories).map(([catName, nodes]) => (
          <div key={catName} className="relative ml-12 mb-10">
            <div className="absolute -left-[48px] top-4 w-6 h-[1px] bg-white/20" />
            <h4 className="text-white/60 text-xs font-bold tracking-[0.2em] uppercase mb-4">{catName}</h4>
            <div className="flex flex-wrap gap-3">
              {nodes.map(node => (
                <div key={node.id} className="glass px-4 py-2 rounded-lg border border-white/5 backdrop-blur-md text-sm font-semibold text-white/90">
                  {node.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
