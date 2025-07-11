
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Activity, ShieldAlert, HeartPulse, Baby, Siren, Wind, Clock, Users, CloudDrizzle, Biohazard, Brain, ShieldPlus, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ modules, activeModule, setActiveModule, isOpen, setIsOpen }) => {
  
  const sidebarVariants = {
    open: { width: "16rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { width: "5rem", transition: { type: "spring", stiffness: 300, damping: 30 } },
  };

  const navItemVariants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
    closed: { opacity: 0, x: -10, transition: { duration: 0.1 } },
  };

  const iconVariants = {
    open: { rotate: 0 },
    closed: { rotate: 0 },
  };
  
  const logoTextVariants = {
    open: { opacity: 1, x: 0,  transition: { delay: 0.1, duration: 0.3} },
    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } },
  }

  return (
    <motion.aside
      variants={sidebarVariants}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className={cn(
        "fixed top-0 left-0 h-full bg-card/80 backdrop-blur-lg border-r border-border/60 z-50 flex flex-col shadow-xl print:hidden",
        "overflow-y-auto overflow-x-hidden" 
      )}
    >
      <div className="flex items-center justify-between p-4 h-20 border-b border-border/60">
        <motion.div 
          className="flex items-center gap-2"
          initial={false}
          animate={isOpen ? "open" : "closed"}
        >
          <BarChart3 className="w-8 h-8 text-primary flex-shrink-0" />
          <motion.h1 
            variants={logoTextVariants}
            className="text-xl font-bold whitespace-nowrap"
          >
            Saúde Pública
          </motion.h1>
        </motion.div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsOpen(!isOpen)} 
          className="hidden md:flex text-muted-foreground hover:text-foreground"
          aria-label={isOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>

      <nav className="flex-1 p-3 space-y-1.5 mt-2">
        {modules.map(module => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          return (
            <motion.div
              key={module.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-12 text-base",
                  isActive && "neon-glow-primary text-primary-foreground shadow-neon-sm",
                  !isActive && "text-foreground/70 hover:text-foreground hover:bg-primary/10",
                  !isOpen && "px-0 justify-center" 
                )}
                onClick={() => setActiveModule(module.id)}
                title={isOpen ? "" : module.name}
              >
                <motion.div variants={iconVariants}>
                  <Icon className={cn("w-6 h-6 flex-shrink-0", isOpen ? "mr-3" : "mx-auto")} />
                </motion.div>
                <motion.span 
                  variants={navItemVariants}
                  className={cn("whitespace-nowrap", !isOpen && "sr-only")}
                >
                  {module.name}
                </motion.span>
              </Button>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-border/60">
        <motion.p 
          variants={navItemVariants}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={cn("text-xs text-muted-foreground text-center", !isOpen && "sr-only")}
        >
          Versão 1.0.0 <br/>© {new Date().getFullYear()} TechCare Solutions
        </motion.p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
