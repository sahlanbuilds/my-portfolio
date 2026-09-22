import { motion } from 'framer-motion';
import { User, Code2, Cloud } from 'lucide-react';



export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-bold tracking-[0.2em] text-sm uppercase flex items-center space-x-4 mb-4"
          >
            <span className="w-12 h-[2px] bg-primary"></span>
            <span>About Me</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg max-w-2xl"
          >
            Passionate about building reliable, user-friendly software applications and continuously improving my skills in Software Engineering.
          </motion.p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Who I am</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              I'm Sahlan, an IT undergraduate at SLIATE specializing in Software Engineering, with a strong foundation in frontend, backend, and database technologies.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">What I do</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              I design and develop functional digital solutions, turning real-world problems into intuitive and user-friendly applications using technologies such as React, Node.js, PHP, MySQL, and Firebase.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-primary/10 border border-primary/20 rounded-2xl p-8 hover:bg-primary/20 transition-colors relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2" />
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-6 relative z-10">
              <Cloud className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 relative z-10">Career Focus</h3>
            <p className="text-white/80 text-sm leading-relaxed relative z-10">
              My goal is to grow as a Software Engineer by building reliable and user-friendly software solutions, solving real-world problems, and continuously expanding my technical knowledge and industry experience.
            </p>
          </motion.div>
        </div>

        {/* Secondary Portrait */}
        <div className="flex justify-center mt-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-square max-w-md"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[80px] -z-10" />
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 bg-white/5 p-2">
              <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#070711] via-transparent to-transparent z-10" />
                <img 
                  src="/Profile.jpg" 
                  alt="Sahlan - Secondary Portrait" 
                  className="w-full h-full object-cover object-top filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
