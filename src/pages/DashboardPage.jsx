
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Activity, Users, ShieldAlert, HeartPulse, Baby, Siren, Wind, Clock, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';

const StatCard = ({ title, value, icon: Icon, color, customIndex }) => (
  <Card customIndex={customIndex} className="overflow-hidden">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color || 'text-primary'}`} />
    </CardHeader>
    <CardContent>
      <div className={`text-3xl font-bold ${color || 'text-primary'}`}>{value}</div>
      <p className="text-xs text-muted-foreground/70 mt-1">Atualizado recentemente</p>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const pageTitle = "Visão Geral da Saúde Pública";
  
  const summaryStats = [
    { title: "Alertas Ativos", value: "12", icon: ShieldAlert, color: "text-destructive" },
    { title: "População Monitorada", value: "1.2M", icon: Users, color: "text-secondary" },
    { title: "Casos de Dengue (Semana)", value: "157", icon: Zap, color: "text-yellow-400" },
    { title: "Satisfação (Serviços)", value: "82%", icon: Activity, color: "text-accent" },
  ];

  const trendData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [
      {
        label: 'Casos de Gripe',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'hsl(var(--primary))',
        backgroundColor: 'hsl(var(--primary)/0.5)', 
        fill: true,
      },
      {
        label: 'Consultas Agendadas',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: 'hsl(var(--secondary))',
        backgroundColor: 'hsl(var(--secondary)/0.5)',
        fill: true,
      },
    ],
  };

  const accessData = {
    labels: ['UPA Centro', 'UBS Bairro Novo', 'Hospital Regional', 'Clínica da Família'],
    datasets: [
      {
        label: 'Tempo Médio de Espera (min)',
        data: [45, 25, 70, 30],
        backgroundColor: 'hsl(var(--accent)/0.7)',
        borderColor: 'hsl(var(--accent))',
        borderWidth: 2,
      }
    ]
  };
  const accessOptions = {
    indexAxis: 'y',
    scales: {
      x: {
        title: { display: true, text: 'Minutos', color: 'hsl(var(--muted-foreground))' }
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2">{pageTitle}</h1>
        <p className="text-muted-foreground text-lg">Acompanhe os indicadores chave e tendências em tempo real.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {summaryStats.map((stat, index) => (
          <StatCard key={stat.title} {...stat} customIndex={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LineChart data={trendData} chartTitle="Tendências de Saúde (Últimos 6 Meses)" />
        <BarChart data={accessData} options={accessOptions} chartTitle="Tempo de Espera nos Serviços" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
         <Card customIndex={2} enableHoverAnimation={false}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShieldAlert className="w-6 h-6 mr-2 text-destructive"/>
              Alertas Críticos
            </CardTitle>
            <CardDescription>Monitoramento de situações de alto risco.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-destructive/10 border-l-4 border-destructive rounded-md">
              <p className="font-semibold text-destructive-foreground/90">Surto de Sarampo</p>
              <p className="text-sm text-destructive-foreground/70">3 novos casos confirmados na Zona Leste. Ações de bloqueio em andamento.</p>
            </div>
            <div className="p-3 bg-yellow-400/10 border-l-4 border-yellow-400 rounded-md">
              <p className="font-semibold text-yellow-300/90">Qualidade da Água</p>
              <p className="text-sm text-yellow-300/70">Níveis de cloro abaixo do recomendado em reservatório X. Equipe acionada.</p>
            </div>
          </CardContent>
        </Card>

        <Card customIndex={3} enableHoverAnimation={false}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="w-6 h-6 mr-2 text-secondary"/>
              Ações Rápidas
            </CardTitle>
            <CardDescription>Resumo de iniciativas e campanhas recentes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
             <div className="p-3 bg-secondary/10 border-l-4 border-secondary rounded-md">
              <p className="font-semibold text-secondary-foreground/90">Campanha Vacinação Gripe</p>
              <p className="text-sm text-secondary-foreground/70">Meta de 80% atingida. Próxima fase: idosos.</p>
            </div>
            <div className="p-3 bg-accent/10 border-l-4 border-accent rounded-md">
              <p className="font-semibold text-accent-foreground/90">Prevenção Dengue</p>
              <p className="text-sm text-accent-foreground/70">Visitas domiciliares intensificadas em áreas de risco.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
