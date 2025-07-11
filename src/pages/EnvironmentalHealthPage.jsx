
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Wind, AlertTriangle, CheckCircle2, Droplets, Recycle, TreePine } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const EnvironmentalHealthPage = () => {
  const [pm25Level, setPm25Level] = useState('');
  const [airQualityResult, setAirQualityResult] = useState(null);

  const checkAirQuality = () => {
    const level = parseFloat(pm25Level);
    if (isNaN(level) || level < 0) {
      setAirQualityResult(null);
      toast({ title: "⚠️ Valor Inválido", description: "Insira um nível de PM2.5 válido.", variant: "destructive" });
      return;
    }

    let quality = '';
    let advice = '';
    let icon = CheckCircle2;
    let color = "text-green-400";

    if (level <= 10) { // OMS Guia 2021: média anual <= 5 µg/m³, 24h <= 15 µg/m³. Adaptado para simplicidade.
      quality = 'Boa';
      advice = 'A qualidade do ar está boa. Ideal para atividades ao ar livre.';
    } else if (level <= 25) {
      quality = 'Moderada';
      advice = 'Qualidade do ar aceitável. Pessoas sensíveis podem sentir algum desconforto.';
      icon = AlertTriangle;
      color = "text-yellow-400";
    } else if (level <= 50) {
      quality = 'Ruim';
      advice = 'Qualidade do ar ruim. Evite atividades ao ar livre prolongadas, especialmente grupos sensíveis.';
      icon = AlertTriangle;
      color = "text-orange-500";
    } else {
      quality = 'Muito Ruim / Perigosa';
      advice = 'Qualidade do ar muito ruim ou perigosa. Risco à saúde. Evite exposição ao ar livre.';
      icon = AlertTriangle;
      color = "text-red-500";
    }
    
    setAirQualityResult({ level, quality, advice, icon, color });
    toast({ title: `🌬️ Qualidade do Ar: ${quality}`, description: advice });
  };

  const handleNotImplemented = (feature) => {
    toast({ title: "🚧 Em Desenvolvimento", description: `Informações sobre ${feature} em breve!` });
  };


  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <Wind className="w-10 h-10 mr-3 text-accent animate-pulse-neon" style={{"--primary": "150 90% 50%"}} />
          Saúde Ambiental
        </h1>
        <p className="text-muted-foreground text-lg">Impactos do ambiente na saúde e monitoramento da qualidade.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><Wind className="w-6 h-6 mr-2 text-primary"/>Monitor de Qualidade do Ar (PM2.5)</CardTitle>
          <CardDescription>Verifique a qualidade do ar com base no nível de material particulado PM2.5.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="pm25Level">Nível de PM2.5 (µg/m³)</Label>
            <Input id="pm25Level" type="number" placeholder="Ex: 12" value={pm25Level} onChange={(e) => setPm25Level(e.target.value)} />
          </div>
          <Button onClick={checkAirQuality} className="w-full gap-2">Verificar Qualidade do Ar</Button>
          {airQualityResult && (
            <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className={`mt-4 p-4 bg-card/80 rounded-lg shadow-inner-neon border-l-4 ${airQualityResult.quality === 'Boa' ? 'border-green-400' : airQualityResult.quality === 'Moderada' ? 'border-yellow-400' : airQualityResult.quality === 'Ruim' ? 'border-orange-500' : 'border-red-500'}`}>
              <div className="flex items-center">
                <airQualityResult.icon className={`w-6 h-6 mr-2 ${airQualityResult.color}`}/>
                <p className={`text-lg font-semibold ${airQualityResult.color}`}>Qualidade do Ar: {airQualityResult.quality}</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Nível de PM2.5: {airQualityResult.level} µg/m³</p>
              <p className="text-md text-muted-foreground mt-1">{airQualityResult.advice}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card customIndex={1}>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><Droplets className="w-5 h-5 mr-2 text-blue-400"/>Qualidade da Água</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Monitoramento da potabilidade e balneabilidade.</p>
                <Button variant="outline" size="sm" className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10" onClick={() => handleNotImplemented("Qualidade da Água")}>Ver Relatórios</Button>
            </CardContent>
        </Card>
        <Card customIndex={2}>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><Recycle className="w-5 h-5 mr-2 text-green-400"/>Saneamento Básico</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Acesso a esgoto tratado e coleta de lixo.</p>
                <Button variant="outline" size="sm" className="border-green-400/50 text-green-400 hover:bg-green-400/10" onClick={() => handleNotImplemented("Saneamento Básico")}>Índices Locais</Button>
            </CardContent>
        </Card>
         <Card customIndex={3}>
            <CardHeader>
                <CardTitle className="flex items-center text-lg"><TreePine className="w-5 h-5 mr-2 text-teal-400"/>Áreas Verdes e Poluição Sonora</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground mb-2">Impacto na saúde física e mental.</p>
                <Button variant="outline" size="sm" className="border-teal-400/50 text-teal-400 hover:bg-teal-400/10" onClick={() => handleNotImplemented("Áreas Verdes e Poluição Sonora")}>Mapas e Dados</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnvironmentalHealthPage;
