
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BarChart from '@/components/charts/BarChart';
import { ShieldPlus, Users, Percent, Syringe, PlusCircle, Target, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const VaccinationCoveragePage = () => {
  const [vaccineName, setVaccineName] = useState('');
  const [targetPopulation, setTargetPopulation] = useState('');
  const [vaccinatedPopulation, setVaccinatedPopulation] = useState('');
  const [vaccineData, setVaccineData] = useState([
    { name: 'BCG', target: 100000, vaccinated: 95000 },
    { name: 'Poliomielite', target: 120000, vaccinated: 110000 },
    { name: 'Tríplice Viral', target: 110000, vaccinated: 98000 },
    { name: 'Febre Amarela', target: 80000, vaccinated: 75000 },
  ]);
  const [chartData, setChartData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const availableVaccines = [
    { value: "BCG", label: "BCG (Tuberculose)" },
    { value: "HepatiteB", label: "Hepatite B" },
    { value: "Penta", label: "Pentavalente (DTP/Hib/HepB)" },
    { value: "VIPVOP", label: "Poliomielite (VIP/VOP)" },
    { value: "Pneumo10", label: "Pneumocócica 10V" },
    { value: "Rotavirus", label: "Rotavírus Humano G1P1" },
    { value: "MeningoC", label: "Meningocócica C" },
    { value: "FebreAmarela", label: "Febre Amarela" },
    { value: "TripliceViral", label: "Tríplice Viral (Sarampo, Caxumba, Rubéola)" },
    { value: "DTP", label: "DTP (Tríplice Bacteriana)" },
    { value: "HepatiteA", label: "Hepatite A" },
    { value: "Varicela", label: "Varicela" },
    { value: "HPV", label: "HPV Quadrivalente" },
    { value: "MeningoACWY", label: "Meningocócica ACWY" },
    { value: "Influenza", label: "Influenza (Gripe)" },
    { value: "Covid19", label: "COVID-19" },
  ];

  const calculateCoverage = (target, vaccinated) => {
    if (target <= 0) return 0;
    return ((vaccinated / target) * 100).toFixed(1);
  };

  const processChartData = () => {
    const labels = vaccineData.map(v => v.name);
    const coverage = vaccineData.map(v => parseFloat(calculateCoverage(v.target, v.vaccinated)));
    
    const backgroundColors = coverage.map(c => c >= 90 ? 'hsl(var(--accent)/0.7)' : c >= 70 ? 'hsl(var(--primary)/0.7)' : 'hsl(var(--destructive)/0.7)');
    const borderColors = coverage.map(c => c >= 90 ? 'hsl(var(--accent))' : c >= 70 ? 'hsl(var(--primary))' : 'hsl(var(--destructive))');

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Cobertura Vacinal (%)',
          data: coverage,
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
  }, [vaccineData]);

  const handleAddVaccineData = () => {
    const target = parseInt(targetPopulation);
    const vaccinated = parseInt(vaccinatedPopulation);

    if (!vaccineName || isNaN(target) || target <= 0 || isNaN(vaccinated) || vaccinated < 0 || vaccinated > target) {
       toast({ title: "⚠️ Dados Inválidos", description: "Verifique os dados da vacina. População alvo deve ser > 0 e vacinados <= alvo.", variant: "destructive"});
      return;
    }
    
    const existingVaccineIndex = vaccineData.findIndex(v => v.name === vaccineName);
    let newData;

    if (existingVaccineIndex > -1) {
      newData = vaccineData.map((v, index) => 
        index === existingVaccineIndex ? { ...v, target, vaccinated } : v
      );
      toast({ title: "📊 Dados Atualizados!", description: `Cobertura de ${availableVaccines.find(v=>v.value === vaccineName)?.label || vaccineName} atualizada.`});
    } else {
      newData = [...vaccineData, { name: availableVaccines.find(v=>v.value === vaccineName)?.label || vaccineName, target, vaccinated }];
      toast({ title: "💉 Nova Vacina Adicionada!", description: `Dados de ${availableVaccines.find(v=>v.value === vaccineName)?.label || vaccineName} registrados.`});
    }
    
    setVaccineData(newData);
    setVaccineName('');
    setTargetPopulation('');
    setVaccinatedPopulation('');
    setShowForm(false);
  };
  
  const chartOptions = {
    scales: {
      y: {
        title: { display: true, text: 'Cobertura Vacinal (%)', color: 'hsl(var(--muted-foreground))' },
        min: 0,
        max: 100,
        ticks: { 
          color: 'hsl(var(--muted-foreground))',
          callback: function(value) { return value + "%" }
        }
      },
      x: {
        ticks: { color: 'hsl(var(--muted-foreground))', maxRotation: 45, minRotation: 0 }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            const dataPoint = vaccineData[context.dataIndex];
            return [
              `Cobertura: ${context.parsed.y}%`,
              `Vacinados: ${dataPoint.vaccinated.toLocaleString('pt-BR')}`,
              `Alvo: ${dataPoint.target.toLocaleString('pt-BR')}`
            ];
          }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <ShieldPlus className="w-10 h-10 mr-3 text-accent animate-pulse-neon" style={{"--primary": "150 90% 50%"}}/>
          Cobertura Vacinal
        </h1>
        <p className="text-muted-foreground text-lg">Monitoramento da taxa de vacinação da população.</p>
      </motion.div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center"><PlusCircle className="w-6 h-6 mr-2 text-primary"/>Adicionar/Atualizar Dados de Vacinação</CardTitle>
            <CardDescription>Insira os dados para uma vacina específica.</CardDescription>
          </div>
           <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "destructive" : "default"} size="sm" className="gap-1.5">
            {showForm ? "Cancelar" : <Syringe className="w-4 h-4"/>} {showForm ? "Fechar Formulário" : "Adicionar Dados"}
          </Button>
        </CardHeader>
        {showForm && (
          <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: "auto"}} exit={{opacity:0, height:0}}>
            <CardContent className="grid md:grid-cols-3 gap-6 pt-4 border-t border-border/50">
              <div>
                <Label htmlFor="vaccineName">Nome da Vacina</Label>
                <Select value={vaccineName} onValueChange={setVaccineName}>
                  <SelectTrigger id="vaccineName"><SelectValue placeholder="Selecione a vacina" /></SelectTrigger>
                  <SelectContent>
                    {availableVaccines.map(v => <SelectItem key={v.value} value={v.value}>{v.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetPopulation" className="flex items-center"><Users className="w-4 h-4 mr-1.5 text-primary/80"/>População Alvo</Label>
                <Input id="targetPopulation" type="number" placeholder="Ex: 100000" value={targetPopulation} onChange={(e) => setTargetPopulation(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="vaccinatedPopulation" className="flex items-center"><Percent className="w-4 h-4 mr-1.5 text-primary/80"/>População Vacinada</Label>
                <Input id="vaccinatedPopulation" type="number" placeholder="Ex: 95000" value={vaccinatedPopulation} onChange={(e) => setVaccinatedPopulation(e.target.value)} />
              </div>
              <div className="md:col-span-3 flex justify-end">
                <Button onClick={handleAddVaccineData} className="w-full md:w-auto gap-2">
                  <Syringe className="w-5 h-5"/> Salvar Dados da Vacina
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </Card>

      {chartData && (
        <Card>
          <CardHeader>
            <CardTitle>Gráfico de Cobertura Vacinal</CardTitle>
            <CardDescription>Percentual da população alvo vacinada para cada imunizante.</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart data={chartData} options={chartOptions} chartTitle="Cobertura Vacinal por Imunizante" />
          </CardContent>
        </Card>
      )}

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center"><Target className="w-6 h-6 mr-2 text-secondary"/>Metas e Importância</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
            <p className="text-muted-foreground/90">A Organização Mundial da Saúde (OMS) recomenda uma cobertura vacinal de <strong className="text-secondary-foreground">90-95%</strong> para a maioria das vacinas, a fim de garantir a imunidade de rebanho e prevenir surtos.</p>
            <div className="flex flex-wrap gap-3">
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/30 flex-1 min-w-[200px]">
                    <h4 className="font-semibold text-accent flex items-center"><CheckCircle2 className="w-5 h-5 mr-1.5"/>Alta Cobertura (&gt;90%)</h4>
                    <p className="text-xs text-muted-foreground">Proteção individual e coletiva eficaz. Risco de surtos muito baixo.</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 flex-1 min-w-[200px]">
                    <h4 className="font-semibold text-primary flex items-center"><Info className="w-5 h-5 mr-1.5"/>Cobertura Moderada (70-89%)</h4>
                    <p className="text-xs text-muted-foreground">Alguma proteção, mas bolsões de vulnerabilidade podem existir. Risco de surtos.</p>
                </div>
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex-1 min-w-[200px]">
                    <h4 className="font-semibold text-destructive flex items-center"><AlertTriangle className="w-5 h-5 mr-1.5"/>Baixa Cobertura (&lt;70%)</h4>
                    <p className="text-xs text-muted-foreground">Proteção insuficiente. Alto risco de surtos e propagação de doenças.</p>
                </div>
            </div>
             <Button variant="link" className="p-0 h-auto text-sm text-primary/80 hover:text-primary" onClick={() => toast({title: "Fonte: OMS", description:"Informações sobre metas de cobertura vacinal."})}>
                Saiba mais sobre metas da OMS
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VaccinationCoveragePage;
