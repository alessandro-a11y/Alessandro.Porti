import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Linkedin, Github, Mail, Phone } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';

const Hero = ({ name, title, bioIntro, contact }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-card to-background text-center relative overflow-hidden px-4">
      <div className="absolute inset-0 opacity-5">
        <img-replace src="/placeholder-abstract-bg.jpg" alt="Abstract background illustration" className="w-full h-full object-cover"/>
      </div>
      
      <motion.div 
        className="z-10 p-6 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <img-replace 
            src="/placeholder-profile.jpg" 
            alt={name} 
            className="w-40 h-40 md:w-48 md:h-48 rounded-full mx-auto border-4 border-primary shadow-lg object-cover"
          />
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3">
          {name}
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl sm:text-2xl text-primary mb-6">
          {title}
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg text-foreground/80 max-w-2xl mx-auto mb-10">
          {bioIntro}
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
          <ScrollLink to="projects" smooth={true} duration={500} offset={-80}>
            <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Ver Projetos
            </Button>
          </ScrollLink>
          <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105" onClick={() => window.open('/resume-placeholder.pdf', '_blank')}>
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center space-x-5">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-7 w-7" />
          </a>
          <a href={contact.github || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-7 w-7" />
          </a>
          <a href={`mailto:${contact.email}`} className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-7 w-7" />
          </a>
           <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
            <Phone className="h-7 w-7" />
          </a>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <ScrollLink to="about" smooth={true} duration={500} offset={-80} className="cursor-pointer">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-primary/70 hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="m6 9 6 6 6-6"/></svg>
          </motion.div>
        </ScrollLink>
      </div>
    </section>
  );
};

export default Hero;