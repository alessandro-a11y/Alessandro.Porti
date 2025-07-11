import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Building, Lightbulb, ThumbsUp, Zap, ShieldCheck, BarChartHorizontalBig, Award, Share2, ArrowRight, Megaphone, Target, Users2, HeartHandshake as Handshake, PlusSquare, LayoutDashboard } from 'lucide-react';

const About = ({ setActiveTab }) => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay, duration: 0.6, ease: "easeOut" } 
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (delay = 0) => ({
      opacity: 1,
      scale: 1,
      transition: { delay, duration: 0.4, ease: "easeOut" }
    })
  };

  const features = [
    {
      icon: Megaphone,
      title: "Cidadão Protagonista",
      description: "Sinalize problemas urbanos com facilidade: fotos, localização e categorias claras. Sua voz transforma a cidade!"
    },
    {
      icon: Target,
      title: "Gestão Pública Ágil",
      description: "Prefeituras acessam um painel inteligente para visualizar, priorizar e gerenciar denúncias de forma eficiente."
    },
    {
      icon: Handshake,
      title: "Parceria Local Forte",
      description: "Empresas da região se conectam para oferecer serviços, impulsionando a economia e agilizando soluções."
    }
  ];

  const benefits = [
    { icon: Users2, text: "Comunidade Engajada e Ativa" },
    { icon: ShieldCheck, text: "Transparência Total nas Ações" },
    { icon: Zap, text: "Soluções Rápidas e Eficazes" },
    { icon: Award, text: "Reconhecimento pela Participação" },
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="text-center pt-8 md:pt-12"
        aria-labelledby="hero-title"
      >
        <motion.div 
          className="inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-8 shadow-lg floating-animation"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <MapPin className="w-16 h-16 md:w-20 md:h-20 text-primary-foreground" />
        </motion.div>
        <h1 id="hero-title" className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground mb-6 leading-tight">
          Sinaliza Brasil: <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Sua Voz, Nossa Cidade!</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          Conectamos cidadãos, governo e empresas para construir cidades mais inteligentes, ágeis e colaborativas. Juntos, resolvemos os microproblemas que impactam o seu dia a dia.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => setActiveTab('report')}
            aria-label="Comece a sinalizar um problema agora"
          >
            Sinalizar um Problema Agora <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="py-12 md:py-16"
        aria-labelledby="how-it-works-title"
      >
        <h2 id="how-it-works-title" className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">Como o <span className="text-primary">Sinaliza Brasil</span> Funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                custom={index * 0.15}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
              >
                <Card className="glass-effect shadow-medium hover:shadow-strong transition-all duration-300 h-full overflow-hidden group">
                  <CardHeader className="items-center text-center p-6">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 10 }}
                    >
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-8">
                    <CardDescription className="text-base leading-relaxed text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-primary/5 dark:bg-primary/10 py-16 md:py-20 rounded-xl shadow-inner"
        aria-labelledby="benefits-title"
      >
        <div className="container mx-auto px-4">
          <h2 id="benefits-title" className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-foreground">Benefícios para <span className="text-primary">Todos</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  custom={index * 0.1}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className="flex items-center p-5 bg-card rounded-lg shadow-subtle hover:shadow-medium transition-shadow duration-300"
                >
                  <div className="p-3 bg-primary/15 rounded-lg mr-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-md font-medium text-foreground/90">{benefit.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
      
      {/* Call to Action Section */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center py-12 md:py-16"
        aria-labelledby="cta-title"
      >
        <Lightbulb className="w-16 h-16 text-secondary mx-auto mb-6 opacity-80" />
        <h2 id="cta-title" className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Pronto para Fazer a Diferença?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Sua participação é fundamental. Comece a sinalizar problemas, acompanhe as soluções e ajude a construir um ambiente urbano melhor para todos.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
              onClick={() => setActiveTab('report')}
              aria-label="Sinalizar um problema"
            >
              <PlusSquare className="w-5 h-5 mr-2.5" /> Sinalizar Problema
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6 text-primary border-primary hover:bg-primary/10 shadow-sm hover:shadow-md transition-all"
              onClick={() => setActiveTab('dashboard')}
              aria-label="Ver o painel de problemas"
            >
              <LayoutDashboard className="w-5 h-5 mr-2.5" /> Ver Painel
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;