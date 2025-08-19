import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = ({ name }) => {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="py-8 text-center border-t border-border/50 bg-card/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground mb-1">
          &copy; {new Date().getFullYear()} {name}. Todos os direitos reservados.
        </p>
        <p className="text-xs text-muted-foreground/80 flex items-center justify-center">
          Feito com <Heart className="w-4 h-4 mx-1.5 text-primary animate-pulse" />
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;