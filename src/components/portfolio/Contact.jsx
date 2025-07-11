import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, MessageSquare as MessageSquareQuote } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const Contact = ({ contact, quote }) => {

  const handleContactClick = (method, value) => {
    let message = "";
    if (method === "email") {
      window.location.href = `mailto:${value}`;
      message = `Abrindo seu cliente de email para: ${value}`;
    } else if (method === "phone") {
      window.location.href = `tel:${value.replace(/\D/g, '')}`;
      message = `Ligando para: ${value}`;
    } else if (method === "linkedin" || method === "github") {
      window.open(value, '_blank', 'noopener,noreferrer');
      message = `Redirecionando para: ${value.split('/')[2]}`;
    }
    toast({
      title: "🚀 Conectando...",
      description: message,
    });
  };


  return (
    <section id="contact" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <h2 className="section-title flex items-center justify-center">
          <Mail className="w-10 h-10 mr-3 text-primary" /> Contato
        </h2>
        <div className="max-w-2xl mx-auto text-center w-full">
          <p className="text-lg text-foreground/80 mb-8">
            Adoraria ouvir sobre novas oportunidades e colaborações. Sinta-se à vontade para entrar em contato!
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <Button size="lg" className="w-full justify-start bg-card hover:bg-card/80 text-foreground border border-border group" onClick={() => handleContactClick('email', contact.email)}>
              <Mail className="mr-3 h-5 w-5 text-primary group-hover:text-accent transition-colors" />
              <span className="truncate">{contact.email}</span>
            </Button>
            <Button size="lg" className="w-full justify-start bg-card hover:bg-card/80 text-foreground border border-border group" onClick={() => handleContactClick('phone', contact.phone)}>
              <Phone className="mr-3 h-5 w-5 text-primary group-hover:text-accent transition-colors" />
              <span className="truncate">{contact.phone}</span>
            </Button>
            <Button size="lg" className="w-full justify-start bg-card hover:bg-card/80 text-foreground border border-border group" onClick={() => handleContactClick('linkedin', contact.linkedin)}>
              <Linkedin className="mr-3 h-5 w-5 text-primary group-hover:text-accent transition-colors" />
              LinkedIn
            </Button>
            {contact.github && (
              <Button size="lg" className="w-full justify-start bg-card hover:bg-card/80 text-foreground border border-border group" onClick={() => handleContactClick('github', contact.github)}>
                <Github className="mr-3 h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                GitHub
              </Button>
            )}
          </div>

          {quote && (
            <motion.div 
              className="mt-12 p-6 glass-card w-full"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <MessageSquareQuote className="w-10 h-10 text-secondary mx-auto mb-4" />
              <p className="text-xl italic text-foreground/90">
                "{quote}"
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;