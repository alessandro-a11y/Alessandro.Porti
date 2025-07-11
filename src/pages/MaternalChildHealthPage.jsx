
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Baby, CalendarCheck2, AlertTriangle, CheckCircle2, HeartHandshake, Syringe } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from "@/components/ui/use-toast";

const MaternalChildHealthPage = () => {
  const [gestationalWeeks, setGestationalWeeks] = useState('');
  const [consultations, setConsultations] = useState('');
  const [prenatalResult, setPrenatalResult] = useState(null);

  const verifyPrenatal = () => {
    const weeks = parseInt(gestationalWeeks);
    const numConsult = parseInt(consultations);

    if (isNaN(weeks) || isNaN(numConsult) || weeks <= 0 || numConsult < 0) {
      setPrenatalResult(null);
      toast({ title: "⚠️ Dados Inválidos", description: "Insira valores válidos para semanas e número de consultas.", variant: "destructive" });
      return;
    }

    let expectedConsultations;
    if (weeks <= 12) expectedConsultations = 1; // Até 12ª semana (1º trimestre)
    else if (weeks <= 26) expectedConsultations = 2; // Até 26ª semana (2º trimestre) - min 1 no 1T, 1 no 2T
    else if (weeks <= 36) expectedConsultations = 4; // Até 36ª semana (3º trimestre) - min 1 no 1T, 1 no 2T, 2 no 3T
    else expectedConsultations = 6; // Após 36ª semana - min 1 no 1T, 1 no 2T, 2 no 3T, 2 mensais até 36s, quinzenais 37-40s, semanais >40s. Mínimo de 6.

    // Simplificação para o mínimo recomendado pelo MS (6 consultas)
    // Fonte: https://aps.saude.gov.br/ape/natal/diagnostico (MS recomenda no mínimo 6)
    // Outra referência: FEBRASGO indica um número ideal maior.

    let status = '';
    let message = '';
    let icon = AlertTriangle;
    let color = "text-yellow-400";

    if (numConsult >= 6 && numConsult >= expectedConsultations) {
      status = 'Adequado';
      message = 'O número de consultas de pré-natal parece adequado para a idade gestacional. Continue o acompanhamento!';
      icon = CheckCircle2;
      color = "text-green-400";
    } else if (numConsult < expectedConsultations && numConsult > 0) {
      status = 'Atenção';
      message = `O número de consultas (${numConsult}) está abaixo do mínimo esperado (${expectedConsultations}) para ${weeks} semanas. É importante intensificar o acompanhamento.`;
    } else if (numConsult === 0 && weeks > 4){
      status = 'Crítico';
      message = 'Nenhuma consulta de pré-natal registrada. É crucial iniciar o acompanhamento imediatamente para a saúde da mãe e do bebê.';
      color = "text-red-500";
    }
     else {
      status = 'Insuficiente';
      message = `O número de consultas (${numConsult}) é considerado insuficiente. Recomenda-se pelo menos 6 consultas durante a gestação. Converse com seu médico.`;
    }
    
    setPrenatalResult({ weeks, numConsult, status, message, icon, color });
    toast({ title: `🤰 Pré-natal Avaliado: ${status}`, description: message.substring(0, 100) + "..."});
  };

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-heading mb-2 flex items-center">
          <Baby className="w-10 h-10 mr-3 text-pink-400 animate-pulse-neon" style={{"--primary": "200 90% 60%"}}/>
          Saúde Materno-Infantil
        </h1>
        <p className="text-muted-foreground text-lg">Cuidados e informações para gestantes, mães e crianças.</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center"><CalendarCheck2 className="w-6 h-6 mr-2 text-primary"/>Verificador de Pré-Natal</CardTitle>
          <CardDescription>Informe a idade gestacional e o número de consultas para uma avaliação.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gestationalWeeks">Semanas de Gestação</Label>
            <Input id="gestationalWeeks" type="number" placeholder="Ex: 28" value={gestationalWeeks} onChange={(e) => setGestationalWeeks(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="consultations">Número de Consultas Realizadas</Label>
            <Input id="consultations" type="number" placeholder="Ex: 4" value={consultations} onChange={(e) => setConsultations(e.target.value)} />
          </div>
          <Button onClick={verifyPrenatal} className="w-full gap-2">Verificar Pré-Natal</Button>
          {prenatalResult && (
            <motion.div initial={{ opacity: 0, y:10 }} animate={{ opacity:1, y:0 }} className={`mt-4 p-4 bg-card/80 rounded-lg shadow-inner-neon border-l-4 ${prenatalResult.status === 'Adequado' ? 'border-green-400' : prenatalResult.status === 'Atenção' ? 'border-yellow-400' : 'border-red-500'}`}>
              <div className="flex items-center">
                <prenatalResult.icon className={`w-6 h-6 mr-2 ${prenatalResult.color}`}/>
                <p className={`text-lg font-semibold ${prenatalResult.color}`}>Status: {prenatalResult.status}</p>
              </div>
              <p className="text-md text-muted-foreground">{prenatalResult.message}</p>
            </motion.div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><HeartHandshake className="w-6 h-6 mr-2 text-accent"/>Cuidados Essenciais na Gestação</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside text-muted-foreground/90 space-y-1.5">
                    <li>Alimentação saudável e rica em nutrientes.</li>
                    <li>Suplementação de ácido fólico e ferro (conforme orientação médica).</li>
                    <li>Hidratação adequada.</li>
                    <li>Atividade física leve e regular (com autorização médica).</li>
                    <li>Evitar álcool, fumo e drogas.</li>
                    <li>Realizar todos os exames solicitados.</li>
                    <li>Participar de grupos de gestantes.</li>
                </ul>
                 <Button variant="accent" className="mt-4 gap-2" size="sm" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Mais dicas sobre gestação em breve!'})}>Mais Dicas</Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><Syringe className="w-6 h-6 mr-2 text-secondary"/>Importância da Vacinação Infantil</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground/90 mb-3">A vacinação é fundamental para proteger as crianças contra doenças graves. Mantenha o calendário de vacinação do seu filho em dia!</p>
                <ul className="list-disc list-inside text-muted-foreground/90 space-y-1.5 text-sm">
                    <li>Previne doenças como sarampo, poliomielite, coqueluche, etc.</li>
                    <li>Contribui para a erradicação de doenças.</li>
                    <li>É um ato de responsabilidade individual e coletiva.</li>
                    <li>Vacinas são seguras e eficazes.</li>
                </ul>
                <Button variant="secondary" className="mt-4 gap-2" size="sm" onClick={() => toast({ title: '🚧 Em Desenvolvimento', description: 'Calendário vacinal detalhado em breve!'})}>Calendário Vacinal</Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaternalChildHealthPage;
