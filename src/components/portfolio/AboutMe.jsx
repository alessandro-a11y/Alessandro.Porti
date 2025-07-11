import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';

const AboutMe = ({ content }) => {
  return (
    <section id="about" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <h2 className="section-title flex items-center justify-center">
          <UserCircle className="w-10 h-10 mr-3 text-primary" /> Sobre Mim
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
            {content}
          </p>
        </div>
        <div className="mt-12 flex justify-center">
            <img-replace 
                src="/placeholder-coding-illustration.svg" 
                alt="Ilustração de um desenvolvedor codificando" 
                className="w-full max-w-md h-auto object-contain"
            />
        </div>
      </motion.div>
    </section>
  );
};

export default AboutMe;