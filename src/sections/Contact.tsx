import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mail, MapPin, Phone, Globe, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const container = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  useGSAP(() => {
    gsap.fromTo('.contact-reveal', 
      { y: 40, opacity: 0 },
      { 
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    
    try {
      const response = await fetch("https://formspree.io/f/mbglozwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      if (status !== 'idle') setStatus('idle');
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" ref={container} className="relative py-32 overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-full max-w-2xl h-full bg-gradient-to-b from-primary/5 to-transparent blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Info */}
          <div className="space-y-12">
            
            <div className="space-y-6">
              <h2 className="contact-reveal text-primary font-bold tracking-[0.3em] text-xs uppercase flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-primary"></span>
                <span>Contact</span>
              </h2>
              <h3 className="contact-reveal text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                LET'S BUILD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">SOMETHING</span>
              </h3>
              <p className="contact-reveal text-lg text-white/60 leading-relaxed font-light max-w-md">
                Interested in working together or have an opportunity you'd like to discuss?
              </p>
            </div>

            <div className="space-y-8">
              <div className="contact-reveal flex items-center space-x-5 group">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-1">Email</p>
                  <a href="mailto:sahlanmuhammad798@gmail.com" className="text-white hover:text-primary transition-colors font-medium">
                    sahlanmuhammad798@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact-reveal flex items-center space-x-5 group">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-1">Phone</p>
                  <a href="tel:+94765688877" className="text-white hover:text-primary transition-colors font-medium">
                    076 568 8877
                  </a>
                </div>
              </div>

              <div className="contact-reveal flex items-center space-x-5 group">
                <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-1">Location</p>
                  <p className="text-white font-medium">
                    Nikaweratiya, Kurunegala, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-reveal lg:pl-10">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              
              {/* Form Glass Reflection */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-white/60 pl-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 pl-1">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-white/60 pl-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 pl-1">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-white/60 pl-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-4 text-white placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1 pl-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-4 rounded-xl flex items-center justify-center space-x-2 font-semibold transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : status === 'error'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] disabled:opacity-70 disabled:cursor-not-allowed'
                  }`}
                >
                  {status === 'idle' && (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                  {status === 'loading' && (
                    <>
                      <span>Sending...</span>
                      <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                    </>
                  )}
                  {status === 'success' && (
                    <>
                      <span>Message Sent</span>
                      <CheckCircle2 className="w-5 h-5 ml-2" />
                    </>
                  )}
                  {status === 'error' && (
                    <>
                      <span>Failed to Send</span>
                      <AlertCircle className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
