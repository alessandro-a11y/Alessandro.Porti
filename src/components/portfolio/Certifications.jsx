import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Award, CheckCircle } from 'lucide-react';

const Certifications = ({ certifications }) => {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <section id="certifications" className="container mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <h2 className="section-title flex items-center justify-center">
          <Award className="w-10 h-10 mr-3 text-primary" /> Certificações
        </h2>
        <Card className="glass-card p-6 md:p-8 w-full max-w-4xl">
          <CardContent className="p-0">
            <motion.ul 
              className="space-y-4"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {certifications.map((cert, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start text-foreground/90"
                  variants={itemVariants}
                >
                  <CheckCircle className="w-5 h-5 mr-3 mt-1 text-accent flex-shrink-0" />
                  <span>{cert}</span>
                </motion.li>
              ))}
            </motion.ul>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Certifications;