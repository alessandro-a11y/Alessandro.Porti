
import React from 'react';
import { motion } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll'; 
import { Home, User, Code, Award, Briefcase, Mail, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navItems = [
  { id: 'hero', label: 'Início', icon: Home },
  { id: 'about', label: 'Sobre Mim', icon: User },
  { id: 'skills', label: 'Habilidades', icon: Code },
  { id: 'certifications', label: 'Certificações', icon: Award },
  { id: 'projects', label: 'Projetos', icon: Briefcase },
  { id: 'contact', label: 'Contato', icon: Mail },
];

const PortfolioLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <ScrollLink to="hero" smooth={true} duration={500} spy={true} className="text-2xl font-bold text-primary cursor-pointer hover:text-primary/80 transition-colors">
              A.F.R.
            </ScrollLink>
            
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80} 
                  activeClass="text-primary border-primary"
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 border-b-2 border-transparent transition-all cursor-pointer flex items-center gap-2"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </ScrollLink>
              ))}
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-sm pb-3"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <ScrollLink
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={500}
                  spy={true}
                  offset={-80}
                  activeClass="bg-primary/20 text-primary"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all cursor-pointer flex items-center gap-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </ScrollLink>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main className="pt-20">
        {children}
      </main>
    </div>
  );
};

export default PortfolioLayout;
