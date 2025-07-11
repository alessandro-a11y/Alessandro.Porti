
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Siren, PlusCircle, AlertOctagon, ListChecks, PhoneCall, ShieldOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const ViolenceAccidentsPage = () => {
  const [caseType, setCaseType] = useState('');
  const [newCases, setNewCases] = useState(1);
  const [totalCases, setTotalCases] = useState({}); 
  const [showForm, setShowForm] = useState(false);

  const caseTypes = [
    { value: "violencia_domestica", label: "Violência Doméstica" },
    { value: "acidente_transito", label: "Acidente de Trânsito" },
    { value: "agressao_fisica", label: "Agressão Física" },
    { value: "violencia_infantil", label: "Violência Infantil" },
    { value: "outro", label: "Outro Tipo de Violência/Acidente" }
  ];

  useEffect(() => {
    const storedCases = localStorage.getItem('violenceAccidentCases');
    if (storedCases) {
      setTotalCases(JSON.parse(storedCases));
    }
  }, []);

  const handleAddCase = () => {
    if (!caseType || newCases <= 0) {
      toast({ title: "⚠️ Dados Inválidos", description: "Selecione o tipo de caso e informe um número válido.", variant: "destructive" });
      return;
    }
    const currentTotal = totalCases[caseType] || 0;
    const updatedTotal = currentTotal + parseInt(newCases);
    
    const newTotals = { ...totalCases, [caseType]: updatedTotal };
    setTotalCases(newTotals);
    localStorage.setItem('violenceAccidentCases', JSON.stringify(newTotals));
    
    toast({ title: "✅ Caso Registrado!", description: `${newCases} caso(s) de "${caseTypes.find(ct => ct.value === caseType)?.label}" adicionado(s).` });
    setNewCases(1);
    setCaseType('');
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <Siren className="w-10 h-10 mr-3 text-destructive animate-pulse" />
          Violência e Acidentes
        </h1>
        <p className="text-muted-foreground text-lg">Monitoramento e registro de ocorrências.</p>
      </motion.div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center"><ListChecks className="w-6 h-6 mr-2 text-primary"/>Registro de Casos</CardTitle>
            <CardDescription>Adicione novas ocorrências para manter os dados atualizados.</CardDescription>
          </div>
          <Button onClick={() => setShowForm(!showForm)} variant={showForm ? "destructive" : "default"} size="sm" className="gap-1.5">
            {showForm ? "Cancelar" : <PlusCircle className="w-4 h-4"/>} {showForm ? "Fechar Formulário" : "Adicionar Caso"}
          </Button>
        </CardHeader>
        {showForm && (
          <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height: "auto"}} exit={{opacity:0, height:0}}>
            <CardContent className="space-y-4 pt-4 border-t border-border/50">
              <div>
                <Label htmlFor="caseType">Tipo de Ocorrência</Label>
                <Select value={caseType} onValueChange={setCaseType}>
                  <SelectTrigger id="caseType" className="w-full">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseTypes.map(ct => <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="newCases">Número de Novos Casos</Label>
                <Input id="newCases" type="number" min="1" value={newCases} onChange={(e) => setNewCases(Math.max(1, parseInt(e.target.value) || 1))} />
              </div>
              <Button onClick={handleAddCase} className="w-full gap-2">
                <PlusCircle className="w-5 h-5"/> Registrar Ocorrência(s)
              </Button>
            </CardContent>
          </motion.div>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><AlertOctagon className="w-6 h-6 mr-2 text-yellow-400"/>Totais de Ocorrências Registradas</CardTitle>
          <CardDescription>Resumo dos casos por tipo. Os dados são salvos localmente no seu navegador.</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(totalCases).length === 0 ? (
            <p className="text-muted-foreground">Nenhuma ocorrência registrada ainda.</p>
          ) : (
            <ul className="space-y-3">
              {caseTypes.map(ct => {
                if (totalCases[ct.value]) {
                  return (
                    <motion.li 
                      key={ct.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: Object.keys(totalCases).indexOf(ct.value) * 0.05 }}
                      className="flex justify-between items-center p-3 bg-card/70 rounded-md shadow-sm border border-border/40"
                    >
                      <span className="font-medium text-foreground/90">{ct.label}:</span>
                      <span className="font-bold text-lg text-destructive">{totalCases[ct.value]}</span>
                    </motion.li>
                  );
                }
                return null;
              })}
            </ul>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><ShieldOff className="w-6 h-6 mr-2 text-secondary"/>Canais de Denúncia e Apoio</CardTitle>
          <CardDescription>Recursos importantes para vítimas de violência.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-secondary/10 rounded-md">
            <h4 className="font-semibold text-secondary">Disque 100 - Direitos Humanos</h4>
            <p className="text-sm text-muted-foreground">Denúncias de violações de direitos humanos.</p>
            <Button variant="secondary" size="sm" className="mt-1 gap-1.5" onClick={() => window.open("tel:100", "_self")}>
              <PhoneCall className="w-4 h-4"/> Ligar para 100
            </Button>
          </div>
          <div className="p-3 bg-pink-500/10 rounded-md">
            <h4 className="font-semibold text-pink-400">Ligue 180 - Central de Atendimento à Mulher</h4>
            <p className="text-sm text-muted-foreground">Apoio e denúncias de violência contra a mulher.</p>
            <Button style={{"--primary": "320 80% 60%", "--primary-foreground": "320 10% 95%"}} size="sm" className="mt-1 gap-1.5" onClick={() => window.open("tel:180", "_self")}>
              <PhoneCall className="w-4 h-4"/> Ligar para 180
            </Button>
          </div>
           <div className="p-3 bg-blue-500/10 rounded-md">
            <h4 className="font-semibold text-blue-400">Disque 190 - Polícia Militar</h4>
            <p className="text-sm text-muted-foreground">Para emergências e situações de risco imediato.</p>
            <Button style={{"--primary": "210 80% 60%", "--primary-foreground": "210 10% 95%"}} size="sm" className="mt-1 gap-1.5" onClick={() => window.open("tel:190", "_self")}>
              <PhoneCall className="w-4 h-4"/> Ligar para 190
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViolenceAccidentsPage;
