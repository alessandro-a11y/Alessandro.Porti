import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProjectCard = ({ title, description, technologies, link, githubLink }) => {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0px 15px 25px hsla(var(--primary), 0.25)" }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="h-full"
    >
      <Card className="glass-card flex flex-col h-full overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl text-primary flex items-center">
            <Briefcase className="w-6 h-6 mr-2" /> {title}
          </CardTitle>
          <CardDescription className="text-foreground/70">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground/80 mb-2">Tecnologias:</h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <Badge key={index} variant="secondary" className="bg-secondary/20 text-secondary-foreground border-secondary/50">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border/50 pt-4 flex justify-end space-x-3">
          {githubLink && (
             <Button variant="outline" size="sm" asChild className="border-primary text-primary hover:bg-primary/10">
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
          )}
          {link && link !== "#" && (
            <Button variant="default" size="sm" asChild className="bg-primary hover:bg-primary/90">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" /> Ver Projeto
              </a>
            </Button>
          )}
           {link === "#" && (
             <Button variant="default" size="sm" disabled>
                <ExternalLink className="mr-2 h-4 w-4" /> Em Breve
            </Button>
           )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Projects = ({ projects }) => {
  return (
    <section id="projects" className="bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h2 className="section-title flex items-center justify-center">
            <Briefcase className="w-10 h-10 mr-3 text-primary" /> Projetos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {projects.map((project, index) => (
              <ProjectCard 
                key={index} 
                title={project.title} 
                description={project.description}
                technologies={project.technologies}
                link={project.link}
                githubLink={project.githubLink} 
              />
            ))}
             <motion.div
                whileHover={{ y: -8, boxShadow: "0px 15px 25px hsla(var(--accent), 0.25)" }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="h-full"
              >
              <Card className="glass-card flex flex-col h-full items-center justify-center text-center p-6 border-2 border-dashed border-accent/50 hover:border-accent transition-colors">
                <Briefcase className="w-16 h-16 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-accent mb-2">Mais projetos em breve!</h3>
                <p className="text-foreground/70">Estou sempre trabalhando em novas ideias e aprimorando minhas habilidades.</p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;