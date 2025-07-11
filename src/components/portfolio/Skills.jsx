import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2 } from 'lucide-react';

const SkillItem = ({ name, icon }) => {
  return (
    <motion.div
      className="glass-card p-6 flex flex-col items-center justify-center text-center"
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <span className="text-4xl mb-3 text-primary">{icon}</span>
      <h4 className="text-lg font-semibold text-foreground/90">{name}</h4>
    </motion.div>
  );
};

const Skills = ({ skills }) => {
  return (
    <section id="skills" className="bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="section-title flex items-center justify-center">
            <Code2 className="w-10 h-10 mr-3 text-primary" /> Tecnologias e Ferramentas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl">
            {skills.map((skill, index) => (
              <SkillItem key={index} name={skill.name} icon={skill.icon} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;