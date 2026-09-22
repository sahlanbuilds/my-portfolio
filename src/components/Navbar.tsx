import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll effects and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple intersection tracking for active state
      const sections = navItems.map(item => item.href.substring(1));
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
            break;
          }
        }
      }
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-black/50 backdrop-blur-xl border-white/10 py-4 shadow-2xl" : "bg-transparent py-6"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="text-xl font-black tracking-widest text-white hover:text-white/80 transition-colors">
          SAHLAN.
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  className={cn(
                    "relative transition-colors hover:text-white",
                    activeSection === item.href.substring(1) ? "text-white" : "text-white/50"
                  )}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-primary rounded-full" />
                  )}
                </a>
              </li>
            ))}
          </ul>
          
          <a 
            href="#contact"
            className="px-5 py-2 rounded-full text-sm font-medium bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 active:scale-95"
          >
            Let's Connect
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-[72px] bg-black/95 backdrop-blur-xl border-t border-white/10 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex flex-col p-6 space-y-6">
          <ul className="flex flex-col space-y-4 text-lg font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block py-2 transition-colors",
                    activeSection === item.href.substring(1) ? "text-white pl-2 border-l-2 border-primary" : "text-white/60"
                  )}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
          <a 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-xl font-medium bg-white text-black hover:bg-primary hover:text-white transition-all"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </header>
  );
}
