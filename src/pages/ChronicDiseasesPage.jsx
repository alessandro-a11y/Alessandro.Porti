
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HeartPulse, Scale, TrendingDown, Droplet, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const ChronicDiseasesPage = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [diastolicBP, setDiastolicBP] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bpResult, setBpResult] = useState(null);

  const calculateIMC = () => {
    const h = parseFloat(height) / 100; // cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const imc = w / (h * h);
      let category = '';
      if (imc < 18.5) category = 'Abaixo do peso';
      else if (imc < 24.9) category = 'Peso normal';
      else if (imc < 29.9) category = 'Sobrepeso';
      else if (imc < 34.9) category = 'Obesidade Grau I';
      else if (imc < 39.9) category = 'Obesidade Grau II';
      else category = 'Obesidade Grau III (Mórbida)';
      setBmiResult({ value: imc.toFixed(2), category });
      toast({ title: "✅ IMC Calculado!", description: `Seu IMC é ${imc.toFixed(2)} (${category}).` });
    } else {
      setBmiResult(null);
      toast({ title: "⚠️ Erro no Cálculo de IMC", description: "Altura e peso devem ser maiores que zero.", variant: "destructive" });
    }
  };

  const evaluatePressure = () => {
    const sys = parseInt(systolicBP);
    const dia = parseInt(diastolicBP);
    if (sys > 0 && dia > 0 && sys > dia) {
      let category = '';
      if (sys < 120 && dia < 80) category = 'Ótima';
      else if (sys < 130 && dia < 85) category = 'Normal';
      else if (sys < 140 || dia < 90) category = 'Limítrofe (Atenção)';
      else if (sys < 160 || dia < 100) category = 'Hipertensão Estágio 1 (Leve)';
      else if (sys < 180 || dia < 110) category = 'Hipertensão Estágio 2 (Moderada)';
      else category = 'Hipertensão Estágio 3 (Grave)';
      setBpResult({ systolic: sys, diastolic: dia, category });
      toast({ title: "🩺 Pressão Avaliada!", description: `Sua pressão é ${sys}x${dia}mmHg (${category}).` });
    } else {
      setBpResult(null);
      toast({ title: "⚠️ Erro na Avaliação da Pressão", description: "Valores de pressão inválidos.", variant: "destructive" });
    }
  };

  const getRiskColor = (category) => {
    if (!category) return "text-foreground";
    if (category.includes("normal") || category.includes("Ótima")) return "text-green-400";
    if (category.includes("Sobrepeso") || category.includes("Limítrofe")) return "text-yellow-400";
    if (category.includes("Obesidade") || category.includes("Hipertensão")) return "text-red-500";
    return "text-foreground";
  };


  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <HeartPulse className="w-10 h-10 mr-3 text-red-500 animate-pulse" />
          Doenças Crônicas
        </h1>
        <p className="text-muted-foreground text-lg">Avaliação de risco e informações sobre doenças crônicas não transmissíveis (DCNT).</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Scale className="w-6 h-6 mr-2 text-primary"/>Cálculo de IMC (Índice de Massa Corporal)</CardTitle>
            <CardDescription>Avalie seu peso em relação à sua altura.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="height">Altura (cm)</Label>
              <Input id="height" type="number" placeholder="Ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" type="number" placeholder="Ex: 70" value={weight} onChange={(e) => setWeight(e.target.value)} />
            </div>
            <Button onClick={calculateIMC} className="w-full gap-2"><Activity className="w-5 h-5"/>Calcular IMC</Button>
            {bmiResult && (
              <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className="mt-4 p-4 bg-card/80 rounded-lg shadow-inner-neon">
                <p className="text-lg font-semibold">Seu IMC: <span className={`font-bold ${getRiskColor(bmiResult.category)}`}>{bmiResult.value}</span></p>
                <p className="text-md">Classificação: <span className={`font-semibold ${getRiskColor(bmiResult.category)}`}>{bmiResult.category}</span></p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Droplet className="w-6 h-6 mr-2 text-secondary"/>Avaliação de Pressão Arterial</CardTitle>
            <CardDescription>Verifique a classificação da sua pressão arterial.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="systolicBP">Pressão Sistólica (mmHg)</Label>
              <Input id="systolicBP" type="number" placeholder="Ex: 120" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="diastolicBP">Pressão Diastólica (mmHg)</Label>
              <Input id="diastolicBP" type="number" placeholder="Ex: 80" value={diastolicBP} onChange={(e) => setDiastolicBP(e.target.value)} />
            </div>
            <Button onClick={evaluatePressure} variant="secondary" className="w-full gap-2">Avaliar Pressão</Button>
            {bpResult && (
              <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className="mt-4 p-4 bg-card/80 rounded-lg shadow-inner-neon">
                <p className="text-lg font-semibold">Sua Pressão: <span className={`font-bold ${getRiskColor(bpResult.category)}`}>{bpResult.systolic}x{bpResult.diastolic} mmHg</span></p>
                <p className="text-md">Classificação: <span className={`font-semibold ${getRiskColor(bpResult.category)}`}>{bpResult.category}</span></p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center"><TrendingDown className="w-6 h-6 mr-2 text-accent"/>Prevenção e Controle</CardTitle>
            <CardDescription>Dicas e informações importantes para uma vida mais saudável.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground/90">
            <p><strong>Diabetes:</strong> Mantenha uma dieta equilibrada, pratique exercícios regularmente e monitore seus níveis de glicose.</p>
            <p><strong>Hipertensão:</strong> Reduza o consumo de sal, controle o estresse, evite álcool e fumo, e siga as orientações médicas.</p>
            <p><strong>Doenças Cardiovasculares:</strong> Adote hábitos saudáveis, como não fumar, controlar o colesterol e a pressão arterial, e fazer check-ups regulares.</p>
            <p><strong>Câncer:</strong> Realize exames preventivos, mantenha um peso saudável, proteja-se do sol e evite o tabagismo.</p>
            <Button variant="accent" className="mt-2 gap-2" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Mais informações sobre prevenção em breve!'})}>
                Saiba Mais
            </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronicDiseasesPage;
