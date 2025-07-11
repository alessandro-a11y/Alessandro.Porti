
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, MessageSquare, Users, Shield, Phone, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const MentalHealthPage = () => {
  const resources = [
    { name: "CVV (Centro de Valorização da Vida)", description: "Apoio emocional e prevenção do suicídio, gratuito e sigiloso.", phone: "188", link: "https://www.cvv.org.br/" },
    { name: "CAPS (Centros de Atenção Psicossocial)", description: "Serviços de saúde mental do SUS para tratamento e reinserção social.", phone: "Procure o mais próximo", link: "https://www.gov.br/saude/pt-br/acesso-a-informacao/acoes-e-programas/caps" },
    { name: "Unidades Básicas de Saúde (UBS)", description: "Primeiro contato para avaliação e encaminhamento em saúde mental.", phone: "Consulte sua UBS", link: "#" }
  ];

  const handleNotImplemented = (featureName) => {
    toast({
      title: `🚧 ${featureName} em Desenvolvimento`,
      description: "Esta funcionalidade estará disponível em breve. Obrigado pela compreensão!",
    });
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <Brain className="w-10 h-10 mr-3 text-secondary animate-pulse-neon" />
          Saúde Mental
        </h1>
        <p className="text-muted-foreground text-lg">Recursos, informações e ferramentas para o bem-estar psicológico.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><MessageSquare className="w-6 h-6 mr-2 text-primary"/>Avaliação de Bem-Estar (Simulada)</CardTitle>
            <CardDescription>Responda algumas perguntas para uma autoavaliação rápida.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Como você tem se sentido ultimamente em relação ao seu humor?</p>
            <div className="flex flex-wrap gap-2">
              {["Muito Bem", "Bem", "Normal", "Um Pouco Mal", "Muito Mal"].map(opt => (
                <Button key={opt} variant="outline" onClick={() => handleNotImplemented('Avaliação de Humor')}>
                  {opt}
                </Button>
              ))}
            </div>
             <p className="text-sm text-muted-foreground pt-2">Como está sua qualidade de sono?</p>
            <div className="flex flex-wrap gap-2">
              {["Ótima", "Boa", "Regular", "Ruim", "Péssima"].map(opt => (
                <Button key={opt} variant="outline" onClick={() => handleNotImplemented('Avaliação de Sono')}>
                  {opt}
                </Button>
              ))}
            </div>
            <Button className="w-full mt-4 gap-2" onClick={() => handleNotImplemented('Resultado da Avaliação')}>Ver Resultado Simulado</Button>
             <p className="text-xs text-muted-foreground/70 pt-2">Lembre-se: esta é uma simulação e não substitui a avaliação de um profissional de saúde.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Shield className="w-6 h-6 mr-2 text-accent"/>Estratégias de Autocuidado</CardTitle>
            <CardDescription>Pequenas ações que podem fazer uma grande diferença.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="list-disc list-inside text-muted-foreground/90 space-y-1.5">
              <li>Pratique atividade física regularmente.</li>
              <li>Mantenha uma rotina de sono saudável.</li>
              <li>Alimente-se de forma equilibrada.</li>
              <li>Reserve tempo para hobbies e lazer.</li>
              <li>Conecte-se com amigos e familiares.</li>
              <li>Estabeleça limites saudáveis.</li>
              <li>Pratique técnicas de relaxamento (meditação, respiração).</li>
              <li>Busque ajuda profissional quando necessário.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center"><Users className="w-6 h-6 mr-2 text-primary"/>Recursos e Apoio</CardTitle>
            <CardDescription>Encontre ajuda profissional e informações confiáveis.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {resources.map((resource, index) => (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="p-4 rounded-lg bg-card/70 border border-border/50 shadow-md"
                 >
                    <h4 className="font-semibold text-primary text-lg">{resource.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {resource.phone && resource.phone !== "Procure o mais próximo" && resource.phone !== "Consulte sua UBS" && (
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                   <Button variant="secondary" size="sm" className="gap-1.5"><Phone className="w-4 h-4"/> {resource.phone}</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="glass-effect-dark">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Ligar para {resource.name}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Você está prestes a ser redirecionado para ligar para o número {resource.phone}.
                                      Esta ação pode incorrer em custos de ligação dependendo do seu plano.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                      <a href={`tel:${resource.phone}`} target="_blank" rel="noopener noreferrer">Ligar Agora</a>
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                        )}
                         { (resource.phone === "Procure o mais próximo" || resource.phone === "Consulte sua UBS") &&
                             <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={() => handleNotImplemented('Busca de Unidades')}>
                                <Info className="w-4 h-4"/> {resource.phone}
                             </Button>
                         }
                        {resource.link && resource.link !== "#" && (
                            <Button asChild variant="outline" size="sm" className="gap-1.5 border-primary/50 text-primary hover:border-primary hover:bg-primary/10">
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">Visitar Site <Info className="w-4 h-4"/></a>
                            </Button>
                        )}
                    </div>
                 </motion.div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MentalHealthPage;
