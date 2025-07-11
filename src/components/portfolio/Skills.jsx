import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const tecnologias = [
  { nome: "Python", imagem: "/tech-icons/python.png" },
  { nome: "C", imagem: "/tech-icons/c.png" },
  { nome: "HTML", imagem: "/tech-icons/html.png" },
  { nome: "CSS", imagem: "/tech-icons/css.png" },
  { nome: "JavaScript", imagem: "/tech-icons/javascript.png" },
  { nome: "PostgreSQL", imagem: "/tech-icons/postgresql.png" },
  { nome: "Azure", imagem: "/tech-icons/azure.png" },
  { nome: "Git", imagem: "/tech-icons/git.png" },
  { nome: "GitHub", imagem: "/tech-icons/github.png" },
];

const Skills = () => {
  return (
    <section id="skills" className="bg-card/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="section-title flex items-center justify-center mb-10">
            <Code2 className="w-10 h-10 mr-3 text-primary" /> Tecnologias e Ferramentas
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl">
            {tecnologias.map((tec, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-card/50 rounded-xl p-5 flex flex-col items-center justify-center shadow-md"
              >
                <img src={tec.imagem} alt={tec.nome} className="w-12 h-12 mb-3" />
                <span className="text-center text-white">{tec.nome}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
