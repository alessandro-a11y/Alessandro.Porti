
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider"
import LineChart from '@/components/charts/LineChart';
import { Biohazard, Users, Repeat, CalendarDays, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const TransmissibleDiseasesPage = () => {
  const [initialCases, setInitialCases] = useState(10);
  const [contagionRate, setContagionRate] = useState(1.5);
  const [simulationDays, setSimulationDays] = useState(30);
  const [simulationData, setSimulationData] = useState(null);

  const handleSimulate = () => {
    if (initialCases <= 0 || contagionRate < 0 || simulationDays <= 0) {
      toast({
        title: "⚠️ Dados Inválidos",
        description: "Por favor, insira valores válidos para a simulação.",
        variant: "destructive",
      });
      return;
    }

    let currentCases = initialCases;
    const dailyCases = [initialCases];
    const labels = ['Dia 0'];

    for (let i = 1; i <= simulationDays; i++) {
      currentCases = Math.round(currentCases * contagionRate);
      // Limitar o número de casos para evitar números astronômicos e problemas de performance
      if (currentCases > 10000000) { // Limite de 10 milhões
          currentCases = 10000000;
          dailyCases.push(currentCases);
          labels.push(`Dia ${i} (limite atingido)`);
          toast({
            title: "📈 Limite da Simulação Atingido",
            description: `O número de casos ultrapassou 10 milhões no dia ${i}. A simulação continuará com este limite.`,
            variant: "default",
          });
          for (let j = i + 1; j <= simulationDays; j++) {
            dailyCases.push(currentCases);
            labels.push(`Dia ${j} (limite)`);
          }
          break; 
      } else {
        dailyCases.push(currentCases);
        labels.push(`Dia ${i}`);
      }
    }
    
    setSimulationData({
      labels: labels,
      datasets: [
        {
          label: 'Casos Projetados',
          data: dailyCases,
          borderColor: 'hsl(var(--destructive))',
          backgroundColor: 'hsl(var(--destructive)/0.3)',
          fill: true,
          pointBackgroundColor: 'hsl(var(--destructive))',
          pointBorderColor: 'hsl(var(--background))',
          pointHoverBackgroundColor: 'hsl(var(--background))',
          pointHoverBorderColor: 'hsl(var(--destructive))',
        },
      ],
    });

    toast({
      title: "🔬 Simulação Concluída!",
      description: `Projeção de ${simulationDays} dias gerada com sucesso.`,
    });
  };
  
  useEffect(() => {
    handleSimulate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <Biohazard className="w-10 h-10 mr-3 text-destructive animate-pulse-neon" />
          Doenças Transmissíveis
        </h1>
        <p className="text-muted-foreground text-lg">Modelagem e simulação de propagação de doenças.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><TrendingUp className="w-6 h-6 mr-2 text-primary"/>Simulador de Contágio</CardTitle>
          <CardDescription>Insira os parâmetros para visualizar a projeção de casos.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label htmlFor="initialCases" className="flex items-center"><Users className="w-4 h-4 mr-2 text-primary/80"/>Casos Iniciais: <span className="ml-2 font-bold text-primary">{initialCases}</span></Label>
            <Slider
              id="initialCases"
              min={1}
              max={1000}
              step={1}
              value={[initialCases]}
              onValueChange={(value) => setInitialCases(value[0])}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="contagionRate" className="flex items-center"><Repeat className="w-4 h-4 mr-2 text-primary/80"/>Taxa de Contágio (R0): <span className="ml-2 font-bold text-primary">{contagionRate.toFixed(1)}</span></Label>
             <Slider
              id="contagionRate"
              min={0.1}
              max={5}
              step={0.1}
              value={[contagionRate]}
              onValueChange={(value) => setContagionRate(value[0])}
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="simulationDays" className="flex items-center"><CalendarDays className="w-4 h-4 mr-2 text-primary/80"/>Dias de Simulação: <span className="ml-2 font-bold text-primary">{simulationDays}</span></Label>
             <Slider
              id="simulationDays"
              min={7}
              max={90}
              step={1}
              value={[simulationDays]}
              onValueChange={(value) => setSimulationDays(value[0])}
            />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button onClick={handleSimulate} size="lg" className="gap-2 shadow-neon-md hover:shadow-neon-lg">
              <TrendingUp className="w-5 h-5"/> Simular Projeção
            </Button>
          </div>
        </CardContent>
      </Card>

      {simulationData && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado da Simulação</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={simulationData} chartTitle="Projeção de Casos ao Longo do Tempo" />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><AlertTriangle className="w-6 h-6 mr-2 text-yellow-400"/>Doenças em Alerta</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card/50 border border-yellow-500/30 shadow-md">
            <h4 className="font-semibold text-yellow-400 text-lg">Dengue</h4>
            <p className="text-sm text-muted-foreground">Casos: 452 (últimos 30 dias)</p>
            <p className="text-sm text-muted-foreground">Aumento de 15% em relação ao período anterior.</p>
            <Button variant="outline" size="sm" className="mt-2 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Detalhes sobre Dengue ainda não disponíveis.'})}>Ver Detalhes</Button>
          </div>
          <div className="p-4 rounded-lg bg-card/50 border border-orange-500/30 shadow-md">
            <h4 className="font-semibold text-orange-500 text-lg">Chikungunya</h4>
            <p className="text-sm text-muted-foreground">Casos: 102 (últimos 30 dias)</p>
            <p className="text-sm text-muted-foreground">Estável, mas com focos na Região Norte.</p>
            <Button variant="outline" size="sm" className="mt-2 border-orange-500/50 text-orange-500 hover:bg-orange-500/10" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Detalhes sobre Chikungunya ainda não disponíveis.'})}>Ver Detalhes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransmissibleDiseasesPage;
