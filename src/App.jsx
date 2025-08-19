import React from 'react';
import PortfolioLayout from '@/components/portfolio/PortfolioLayout';
import Hero from '@/components/portfolio/Hero';
import AboutMe from '@/components/portfolio/AboutMe';
import Skills from '@/components/portfolio/Skills';
import Certifications from '@/components/portfolio/Certifications';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';
import Footer from '@/components/portfolio/Footer';
import { Toaster } from '@/components/ui/toaster';
//import { title } from 'process';

const portfolioData = {
  name: "Alessandro Figueiredo Rodrigues",
  title: "Estudante de Engenharia de Software",
  bioIntro: "Apaixonado por tecnologia, dados e aprendizado contínuo.",
  aboutMe: "Estudante de Engenharia de Software (2° período), com sólida base em desenvolvimento Full Stack. Tenho conhecimentos em Python, JavaScript, React e PostgreSQL, além de experiência autodidata com projetos reais. Possuo interesse crescente por Inteligência Artificial e Machine Learning, com foco em especialização futura na área.",
  skills: [
    { name: "Python", icon: "🐍" },
    { name: "C", icon: "🇨" },
    { name: "Azure Machine Learning", icon: "☁️" },
    { name: "Scikit-learn", icon: "🤖" },
    { name: "Git & GitHub", icon: "🐙" },
    { name: "VS Code", icon: "💻" },
  ],
  certifications: [
    "Microsoft DP-100: Designing and Implementing a Data Science Solution on Azure",
    "Microsoft Certification Challenge #3 DP-100",
    "Otimizando Modelos de Linguagem para Aplicações Generativas de IA",
    "Azure Machine Learning – DIO/Microsoft",
    "Introdução à Ciência de Dados – DIO",
    "Implantar e Consumir Modelos com o Azure Machine Learning",
    "Realização de Ajuste de Hiperparâmetros com o Azure Machine Learning",
    "Identificação do Melhor Modelo de Classificação com Machine Learning Automatizado",
    "Explorar e Configurar o Workspace do Azure Machine Learning",
    "Git e GitHub – DIO",
    "Contribuindo em um Projeto Open Source – DIO",
  ],
  projects: [
    {
      title: "Achadinhos Online",
      description: "Desenvolvi o projeto Achadinhos Online, uma plataforma de promoções criada com HTML, CSS, JavaScript e React, com integração com banco de dados.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      link: "https://achadinhos-online-20252.vercel.app/?fbclid=PAZXh0bgNhZW0CMTEAAadIiw7MJNuAkBqcDbzboPoQ2J1nJYeE3U76JNIuHM7jSN5EQwqKAhjonQ_Jlw_aem_bsP5ho7EbPzFkdkTmu6tKQ"
    },
    {
      title: "Guia Prático da Kiwify",
      description: "Plataforma web completa que ensina como iniciar do zero e realizar vendas todos os dias através da Kiwify, mesmo sem seguidores ou experiência prévia. Interface moderna e responsiva com sistema de navegação intuitivo para maximizar o aprendizado do usuário.",
      technologies: ["React", "HTML", "CSS", "JavaScript"],
      link: "https://kiwify-vendas-infinitas.vercel.app/"
    },
    {
      title: "Classificador de Dados com Azure ML",
      description: "Projeto simples de machine learning com automação no Azure ML Studio.",
      technologies: ["Azure ML", "Python"],
      link: "https://github.com/alessandro-a11y/Classificador-de-Dados-com-Azure-ML" 
    },
    { 
      title: "Organizador de Arquivos", 
      description: "Script em Python que organiza arquivos automaticamente por extensão.", 
      technologies: ["Python"],
      link: "https://github.com/alessandro-a11y/Organizador-de-Arquivos" 
    },
  ],
  contact: {
    email: "figueiredoalessandro73@gmail.com",
    phone: "(87) 98111-3699",
    linkedin: "https://www.linkedin.com/in/alessandro-figueiredo-989706357/?trk=opento_sprofile_topcard",
    github: "https://github.com/alessandro-a11y" 
  },
  quote: "Seja o tipo de desenvolvedor que você gostaria de ter na sua equipe."
};

function App() {
  return (
    <PortfolioLayout>
      <Hero name={portfolioData.name} title={portfolioData.title} bioIntro={portfolioData.bioIntro} contact={portfolioData.contact} />
      <AboutMe content={portfolioData.aboutMe} />
      <Skills skills={portfolioData.skills} />
      <Certifications certifications={portfolioData.certifications} />
      <Projects projects={portfolioData.projects} />
      <Contact contact={portfolioData.contact} quote={portfolioData.quote} />
      <Footer name={portfolioData.name} />
      <Toaster />
    </PortfolioLayout>
  );
}

export default App;
