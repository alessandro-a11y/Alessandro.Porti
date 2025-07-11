import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, LayoutDashboard, Info, PlusSquare, Flag } from 'lucide-react';

const BrazilFlagIcon = () => (
  <svg width="28" height="20" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 rounded-sm shadow-sm">
    <rect width="70" height="50" fill="#009C3B"/>
    <path d="M35 5L3 25L35 47L67 25L35 3Z" fill="#FFDF00"/>
    <circle cx="35" cy="25" r="10" fill="#002776"/>
  </svg>
);


const Header = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'about', label: 'Início', icon: Info },
    { id: 'report', label: 'Sinalizar', icon: PlusSquare },
    { id: 'dashboard', label: 'Painel', icon: LayoutDashboard }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, ease: "easeOut" }
    })
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className="glass-effect border-b border-border/60 sticky top-0 z-50 shadow-subtle"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActiveTab('about')}
            role="button"
            tabIndex={0}
            aria-label="Ir para a página inicial Sinaliza Brasil"
            onKeyPress={(e) => e.key === 'Enter' && setActiveTab('about')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md hover:shadow-medium transition-shadow">
              <Flag className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex items-center">
              <BrazilFlagIcon />
              <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
                Sinaliza Brasil
              </h1>
            </div>
          </motion.div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 transition-all duration-200 ease-out px-3 py-2 rounded-lg text-sm font-medium
                      ${ activeTab === item.id 
                        ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 scale-105' 
                        : 'text-foreground/80 hover:bg-accent/50 hover:text-accent-foreground'
                      }`}
                    aria-current={activeTab === item.id ? "page" : undefined}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;