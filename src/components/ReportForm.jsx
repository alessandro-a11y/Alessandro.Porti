import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Send, MapPin, Camera, Tag, FileText, Award, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    problemType: '',
    description: '',
    location: '',
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const problemCategories = [
    { value: "buraco_asfalto", label: "Buraco no Asfalto" },
    { value: "poste_apagado", label: "Poste Apagado" },
    { value: "vazamento_agua", label: "Vazamento de Água" },
    { value: "falta_acessibilidade", label: "Falta de Acessibilidade" },
    { value: "acumulo_lixo", label: "Acúmulo de Lixo" },
    { value: "sinalizacao_rua", label: "Sinalização de Rua Danificada" },
    { value: "arvore_risco", label: "Árvore em Risco" },
    { value: "terreno_baldio", label: "Terreno Baldio Abandonado" },
    { value: "outro", label: "Outro" },
  ];

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const simulatedGPS = `${(Math.random() * -90).toFixed(6)}, ${(Math.random() * -180).toFixed(6)}`;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const reports = JSON.parse(localStorage.getItem('sinalizaReports') || '[]');
    const newReport = {
      id: Date.now(),
      ...formData,
      location: formData.location || `GPS: ${simulatedGPS}`,
      photo: photoPreview ? 'simulated_photo_url.jpg' : null, 
      timestamp: new Date().toISOString(),
      status: 'Recebido',
      category: formData.problemType,
      userFeedback: null,
      serviceRating: null
    };
    
    reports.unshift(newReport); // Add to the beginning of the array
    localStorage.setItem('sinalizaReports', JSON.stringify(reports));
    
    setIsSubmitting(false);
    setFormData({ problemType: '', description: '', location: '', photo: null });
    setPhotoPreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
    
    toast({
      title: "✅ Problema sinalizado com sucesso!",
      description: "Sua sinalização foi enviada. Obrigado por sua contribuição!",
      variant: "default",
    });
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (delay) => ({ opacity: 1, x: 0, transition: { delay: delay * 0.1, duration: 0.4, ease: "easeOut" }})
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-2xl mx-auto"
      aria-labelledby="report-form-title"
    >
      <Card className="glass-effect shadow-medium overflow-hidden">
        <CardHeader className="text-center bg-card/50 p-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg"
          >
            <AlertTriangle className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <CardTitle id="report-form-title" className="text-3xl md:text-4xl font-bold text-foreground">
            Sinalizar um Problema
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Ajude a construir uma cidade melhor. É rápido e fácil!
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={formItemVariants} custom={1} initial="hidden" animate="visible">
              <label htmlFor="problemType" className="block text-sm font-medium mb-2 flex items-center text-foreground"><Tag className="w-5 h-5 mr-2 text-primary"/>Tipo do Problema</label>
              <Select value={formData.problemType} onValueChange={(value) => setFormData({...formData, problemType: value})} required>
                <SelectTrigger id="problemType" className="w-full h-11 text-base glass-effect focus:ring-primary focus:border-primary">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {problemCategories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value} className="text-base">{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={formItemVariants} custom={2} initial="hidden" animate="visible">
              <label htmlFor="description" className="block text-sm font-medium mb-2 flex items-center text-foreground"><FileText className="w-5 h-5 mr-2 text-primary"/>Descrição Detalhada</label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Ex: Buraco grande na Rua das Palmeiras, próximo ao nº 123, perigoso para veículos."
                rows={4}
                required
                className="text-base glass-effect focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
              />
            </motion.div>
            
            <motion.div variants={formItemVariants} custom={3} initial="hidden" animate="visible">
              <label htmlFor="location" className="block text-sm font-medium mb-2 flex items-center text-foreground"><MapPin className="w-5 h-5 mr-2 text-primary"/>Localização (Endereço ou Referência)</label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Ex: Rua das Palmeiras, 123, Bairro Sol Nascente"
                className="text-base h-11 glass-effect focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground mt-1.5">O GPS será capturado automaticamente se o endereço não for fornecido.</p>
            </motion.div>

            <motion.div variants={formItemVariants} custom={4} initial="hidden" animate="visible">
              <label htmlFor="photo" className="block text-sm font-medium mb-2 flex items-center text-foreground"><Camera className="w-5 h-5 mr-2 text-primary"/>Foto do Problema (Opcional)</label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                ref={fileInputRef}
                className="text-base glass-effect file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer"
              />
              {photoPreview && (
                <motion.div className="mt-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <img-replace src={photoPreview} alt="Pré-visualização da foto" className="rounded-lg max-h-52 object-contain mx-auto border-2 border-border shadow-sm" />
                </motion.div>
              )}
            </motion.div>

            <motion.div
              variants={formItemVariants} custom={5} initial="hidden" animate="visible"
              className="bg-primary/5 border-l-4 border-primary rounded-r-md p-4"
            >
              <div className="flex items-start gap-3">
                <Award className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-semibold text-primary mb-1">Seja um Agente da Cidadania!</p>
                  <p className="text-muted-foreground">
                    Sinalizações detalhadas e precisas ajudam a resolver os problemas mais rápido e contribuem para uma cidade melhor para todos.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={formItemVariants} custom={6} initial="hidden" animate="visible">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-offset-0"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Sinalização
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default ReportForm;