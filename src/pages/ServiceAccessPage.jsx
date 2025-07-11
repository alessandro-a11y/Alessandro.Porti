import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import BarChart from '@/components/charts/BarChart';
import { Clock, Hotel as Hospital, Users, MapPin, LineChart as LineChartIcon, PlusCircle, BarChart2, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const ServiceAccessPage = () => {
  const [unitName, setUnitName] = useState('');
  const [waitTime, setWaitTime] = useState('');
  const [serviceUnits, setServiceUnits] = useState([
    { name: 'UPA Centro', time: 45 },
    { name: 'UBS Bairro Alegre', time: 20 },
    { name: 'Hospital Municipal', time: 90 },
  ]);
  const [chartData, setChartData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const processChartData = () => {
    const labels = serviceUnits.map(u => u.name);
    const times = serviceUnits.map(u => u.time);
    const backgroundColors = times.map(t => t > 60 ? 'hsl(var(--destructive)/0.7)' : t > 30 ? 'hsl(var(--secondary)/0.7)' : 'hsl(var(--primary)/0.7)');
    const borderColors = times.map(t => t > 60 ? 'hsl(var(--destructive))' : t > 30 ? 'hsl(var(--secondary))' : 'hsl(var(--primary))');

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Tempo Médio de Espera (minutos)',
          data: times,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 2,
          borderRadius: 5,
        },
      ],
    });
  };

  useEffect(() => {
    processChartData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceUnits]);

  const handleAddUnit = () => {
    if (!unitName || waitTime === '' || parseFloat(waitTime) < 0) {
       toast({ title: "⚠️ Dados Inválidos", description: "Nome da unidade e tempo de espera válido são obrigatórios.", variant: "destructive"});
      return;
    }
    const newUnit = { name: unitName, time: parseFloat(waitTime) };
    setServiceUnits([...serviceUnits, newUnit]);
    setUnitName('');
    setWaitTime('');
    setShowForm(false);
    toast({ title: "🏥 Nova Unidade Adicionada!", description: `${unitName} com tempo de espera de ${waitTime} min.`});
  };
  
  const chartOptions = {
    scales: {
      y: {
        title: { display: true, text: 'Tempo de Espera (minutos)', color: 'hsl(var(--muted-foreground))' },
        grid: { color: 'hsl(var(--border)/0.15)' },
        ticks: { color: 'hsl(var(--muted-foreground))' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'hsl(var(--muted-foreground))', maxRotation: 45, minRotation: 0 }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Espera: ${context.parsed.y} min`;
          }
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <Clock className="w-10 h-10 mr-3 text-primary animate-pulse-neon" />
          Acesso aos Serviços de Saúde
        </h1>
        <p className="text-muted-foreground text-lg">Monitoramento do tempo de espera e disponibilidade.</p>
      </motion.div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center"><BarChart2 className="w-6 h-6 mr-2 text-primary"/>Adicionar Tempo de Espera de Unidade</CardTitle>
            <CardDescription>Insira o nome da unidade e o tempo médio de espera em minutos.</CardDescription>
          </div>
           <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "destructive" : "default"} size="sm" className="gap-1.5">
            {showForm ? "Cancelar" : <PlusCircle className="w-4 h-4"/>} {showForm ? "Fechar Formulário" : "Adicionar Unidade"}
          </Button>
        </CardHeader>
        {showForm && (
          <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: "auto"}} exit={{opacity:0, height:0}}>
            <CardContent className="grid md:grid-cols-3 gap-6 pt-4 border-t border-border/50">
              <div>
                <Label htmlFor="unitName">Nome da Unidade de Saúde</Label>
                <Input id="unitName" placeholder="Ex: UPA Zona Leste" value={unitName} onChange={(e) => setUnitName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="waitTime">Tempo Médio de Espera (minutos)</Label>
                <Input id="waitTime" type="number" placeholder="Ex: 35" value={waitTime} onChange={(e) => setWaitTime(e.target.value)} />
              </div>
              <div className="md:col-start-3 flex items-end">
                <Button onClick={handleAddUnit} className="w-full gap-2"><Hospital className="w-5 h-5"/>Adicionar ao Gráfico</Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </Card>

      {chartData && (
        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio de Espera por Unidade</CardTitle>
            <CardDescription>Linha tracejada indica o limite de espera recomendado (60 minutos).</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={chartData} options={chartOptions} chartTitle="Comparativo de Tempo de Espera" />
          </CardContent>
        </Card>
      )}

       <div className="grid md:grid-cols-2 gap-6">
         <Card customIndex={1}>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><MapPin className="w-5 h-5 mr-2 text-secondary"/>Unidades Próximas (Simulado)</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Simulação de busca por unidades de saúde em um raio de 5km.</p>
                 <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>UBS Vila Esperança - 1.2km <span className="text-green-400">(Espera: 15min)</span></li>
                    <li>Clínica Popular Saúde Já - 2.5km <span className="text-yellow-400">(Espera: 40min)</span></li>
                    <li>Pronto Atendimento Central - 4.8km <span className="text-red-500">(Espera: 75min)</span></li>
                 </ul>
                <Button variant="secondary" size="sm" className="mt-3" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Geolocalização e busca real em breve!'})}>Ativar Localização</Button>
            </CardContent>
        </Card>
         <Card customIndex={2}>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><TrendingUp className="w-5 h-5 mr-2 text-accent"/>Otimização de Fluxo (Simulado)</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-3">Análise de gargalos e sugestões para reduzir o tempo de espera.</p>
                <ul className="space-y-1 text-sm text-muted-foreground/80">
                    <li>UPA Centro: <span className="text-orange-400">Pico entre 18h-20h.</span> Sugestão: Reforçar equipe.</li>
                    <li>Hospital Municipal: <span className="text-red-500">Alta demanda na triagem.</span> Sugestão: Implementar pré-triagem digital.</li>
                 </ul>
                <Button variant="accent" size="sm" className="mt-3" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Análise de fluxo detalhada em breve!'})}>Ver Análise Completa</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceAccessPage;