import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import gsap from 'gsap';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Respect prefers-reduced-motion for GSAP animations globally
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      gsap.globalTimeline.timeScale(1000); // Instantly finish all animations
    }
    const handler = (e: MediaQueryListEvent) => {
      gsap.globalTimeline.timeScale(e.matches ? 1000 : 1);
    };
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    // Only init Lenis if not loading, to prevent scrolling during load
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      
      {!loading && (
        <>
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
