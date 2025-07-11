import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, CheckCircle2, AlertCircle, Clock4, Filter, Search, ListChecks
} from 'lucide-react';
import ReportList from '@/components/dashboard/ReportList';
import ReportDetailModal from '@/components/dashboard/ReportDetailModal';
import FeedbackModal from '@/components/dashboard/FeedbackModal';
import { toast } from '@/components/ui/use-toast';

const StatCard = ({ title, value, icon: Icon, colorClass, textColorClass }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.3, ease: "easeOut" }}
    whileHover={{ y: -5, boxShadow: "0 10px 20px hsla(var(--shadow-color), 0.1)" }}
  >
    <Card className="glass-effect shadow-subtle hover:shadow-medium transition-all duration-300 overflow-hidden">
      <CardContent className="p-5 md:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className={`text-3xl font-bold ${textColorClass}`}>{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClass}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const problemCategories = useMemo(() => [
    { value: "all", label: "Todas Categorias" },
    { value: "buraco_asfalto", label: "Buraco no Asfalto" },
    { value: "poste_apagado", label: "Poste Apagado" },
    { value: "vazamento_agua", label: "Vazamento de Água" },
    { value: "falta_acessibilidade", label: "Falta de Acessibilidade" },
    { value: "acumulo_lixo", label: "Acúmulo de Lixo" },
    { value: "sinalizacao_rua", label: "Sinalização de Rua" },
    { value: "arvore_risco", label: "Árvore em Risco" },
    { value: "terreno_baldio", label: "Terreno Baldio" },
    { value: "outro", label: "Outro" },
  ], []);

  const statusOptions = useMemo(() => [
    { value: "all", label: "Todos Status" },
    { value: "Recebido", label: "Recebido", icon: AlertCircle, color: "bg-blue-500 hover:bg-blue-600", textColor: "text-blue-500 dark:text-blue-400" },
    { value: "Em andamento", label: "Em Andamento", icon: Clock4, color: "bg-yellow-500 hover:bg-yellow-600", textColor: "text-yellow-500 dark:text-yellow-400" },
    { value: "Resolvido", label: "Resolvido", icon: CheckCircle2, color: "bg-green-600 hover:bg-green-700", textColor: "text-green-600 dark:text-green-400" },
  ], []);

  useEffect(() => {
    const loadReports = () => {
      const savedReports = JSON.parse(localStorage.getItem('sinalizaReports') || '[]');
      setReports(savedReports); 
    };
    loadReports();
  }, []);

  const handleStatusChange = (reportId, newStatus) => {
    const updatedReports = reports.map(report =>
      report.id === reportId ? { ...report, status: newStatus } : report
    );
    setReports(updatedReports);
    localStorage.setItem('sinalizaReports', JSON.stringify(updatedReports));
    toast({
      title: `✅ Status atualizado para "${newStatus}"!`,
      description: `O problema #${reportId} foi modificado.`,
    });
  };
  
  const handleOpenFeedbackModal = (report) => {
    setSelectedReport(report);
    setFeedbackText(report.userFeedback || '');
    setRating(report.serviceRating || 0);
    setIsFeedbackModalOpen(true);
    setIsDetailModalOpen(false); 
  };

  const handleOpenDetailModal = (report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
    setIsFeedbackModalOpen(false);
  };

  const handleSubmitFeedback = () => {
    if (!selectedReport) return;
    const updatedReports = reports.map(report =>
      report.id === selectedReport.id ? { ...report, userFeedback: feedbackText, serviceRating: rating } : report
    );
    setReports(updatedReports);
    localStorage.setItem('sinalizaReports', JSON.stringify(updatedReports));
    setIsFeedbackModalOpen(false);
    setFeedbackText('');
    setRating(0);
    toast({
      title: "👍 Feedback enviado!",
      description: "Obrigado por avaliar o serviço prestado.",
    });
  };

  const filteredReports = useMemo(() => reports.filter(report => {
    const categoryMatch = filterCategory === 'all' || report.category === filterCategory;
    const statusMatch = filterStatus === 'all' || report.status === filterStatus;
    const searchMatch = searchTerm === '' || 
                        report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (report.location && report.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
                        report.id.toString().includes(searchTerm) ||
                        (problemCategories.find(pc => pc.value === report.category)?.label.toLowerCase().includes(searchTerm.toLowerCase()));
    return categoryMatch && statusMatch && searchMatch;
  }), [reports, filterCategory, filterStatus, searchTerm, problemCategories]);

  const stats = useMemo(() => ({
    total: reports.length,
    recebido: reports.filter(r => r.status === 'Recebido').length,
    emAndamento: reports.filter(r => r.status === 'Em andamento').length,
    resolvido: reports.filter(r => r.status === 'Resolvido').length
  }), [reports]);

  return (
    <section className="space-y-8 md:space-y-10" aria-labelledby="dashboard-title">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
        <h1 id="dashboard-title" className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Painel de Problemas
        </h1>
        <p className="text-muted-foreground text-lg">
          Acompanhe e gerencie as sinalizações da sua cidade.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Sinalizado" value={stats.total} icon={ListChecks} colorClass="bg-purple-500" textColorClass="text-purple-500 dark:text-purple-400" />
        <StatCard title="Recebidos" value={stats.recebido} icon={AlertCircle} colorClass={statusOptions.find(s=>s.value==='Recebido').color} textColorClass={statusOptions.find(s=>s.value==='Recebido').textColor} />
        <StatCard title="Em Andamento" value={stats.emAndamento} icon={Clock4} colorClass={statusOptions.find(s=>s.value==='Em andamento').color} textColorClass={statusOptions.find(s=>s.value==='Em andamento').textColor} />
        <StatCard title="Resolvidos" value={stats.resolvido} icon={CheckCircle2} colorClass={statusOptions.find(s=>s.value==='Resolvido').color} textColorClass={statusOptions.find(s=>s.value==='Resolvido').textColor} />
      </div>
      
      <Card className="glass-effect shadow-medium overflow-hidden">
        <CardHeader className="p-5 md:p-6 border-b border-border/70">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="text-2xl text-foreground">Lista de Sinalizações</CardTitle>
              <CardDescription className="text-muted-foreground">Filtre e visualize os problemas reportados.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
               <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  aria-label="Buscar sinalizações"
                  placeholder="Buscar..."
                  className="pl-10 w-full sm:w-[200px] md:w-[250px] h-11 text-base glass-effect focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger aria-label="Filtrar por categoria" className="w-full sm:w-[180px] h-11 text-base glass-effect focus:ring-primary focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {problemCategories.map(cat => <SelectItem key={cat.value} value={cat.value} className="text-base">{cat.label}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger aria-label="Filtrar por status" className="w-full sm:w-[180px] h-11 text-base glass-effect focus:ring-primary focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(opt => <SelectItem key={opt.value} value={opt.value} className="text-base">{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredReports.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 px-6">
              <Filter className="w-16 h-16 text-muted-foreground/50 mx-auto mb-6" />
              <p className="text-xl font-medium text-muted-foreground mb-2">Nenhuma sinalização encontrada.</p>
              <p className="text-muted-foreground">Tente ajustar seus filtros ou limpar a busca.</p>
            </motion.div>
          ) : (
            <ReportList
              reports={filteredReports}
              problemCategories={problemCategories}
              statusOptions={statusOptions}
              onStatusChange={handleStatusChange}
              onOpenDetailModal={handleOpenDetailModal}
              onOpenFeedbackModal={handleOpenFeedbackModal}
            />
          )}
        </CardContent>
      </Card>

      <ReportDetailModal
        isOpen={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        report={selectedReport}
        problemCategories={problemCategories}
        statusOptions={statusOptions}
        onOpenFeedbackModal={handleOpenFeedbackModal}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onOpenChange={setIsFeedbackModalOpen}
        report={selectedReport}
        problemCategories={problemCategories}
        feedbackText={feedbackText}
        setFeedbackText={setFeedbackText}
        rating={rating}
        setRating={setRating}
        onSubmit={handleSubmitFeedback}
      />
    </section>
  );
};

export default Dashboard;