import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, Clock4, CheckCircle2, MessageSquare, Tag, MapPin
} from 'lucide-react';

const ReportList = ({ reports, problemCategories, statusOptions, onStatusChange, onOpenDetailModal, onOpenFeedbackModal }) => {
  
  const getStatusDetails = (statusValue) => {
    return statusOptions.find(opt => opt.value === statusValue) || { color: 'bg-gray-500', textColor: 'text-gray-500', icon: Tag };
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <div className="divide-y divide-border/70">
      <AnimatePresence>
        {reports.map((report, index) => {
          const statusDetail = getStatusDetails(report.status);
          return (
            <motion.div
              key={report.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
              className="hover:bg-card/70 transition-colors duration-200"
            >
              <div className="p-5 md:p-6">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-2">
                      <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors cursor-pointer" onClick={() => onOpenDetailModal(report)}>
                        #{report.id} - {problemCategories.find(pc => pc.value === report.category)?.label || report.category}
                      </h3>
                      <Badge variant="outline" className={`border-transparent ${statusDetail.color} text-white text-xs font-medium`}>
                        <statusDetail.icon className="w-3.5 h-3.5 mr-1.5" />
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-1.5">{report.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{report.location || 'Localização GPS'}</span>
                    </div>
                    <div className="text-xs text-muted-foreground/80 mt-1">
                      <span>Sinalizado em: {new Date(report.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                  {report.photo && (
                    <div className="w-full sm:w-auto sm:ml-4 flex justify-center sm:justify-end">
                      <img-replace src={report.photo} alt="Foto do problema" className="rounded-md max-h-24 sm:max-h-28 object-contain border border-border shadow-sm" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => onOpenDetailModal(report)} className="text-foreground hover:bg-accent/50 hover:text-accent-foreground">
                    <Eye className="w-4 h-4 mr-1.5" /> Ver Detalhes
                  </Button>
                  {report.status === 'Recebido' && (
                    <Button size="sm" onClick={() => onStatusChange(report.id, 'Em andamento')} className={`${statusOptions.find(s=>s.value==='Em andamento').color} text-white`}>
                      <Clock4 className="w-4 h-4 mr-1.5" /> Marcar "Em Andamento"
                    </Button>
                  )}
                  {report.status === 'Em andamento' && (
                    <Button size="sm" onClick={() => onStatusChange(report.id, 'Resolvido')} className={`${statusOptions.find(s=>s.value==='Resolvido').color} text-white`}>
                      <CheckCircle2 className="w-4 h-4 mr-1.5" /> Marcar "Resolvido"
                    </Button>
                  )}
                  {report.status === 'Resolvido' && (
                    <Button size="sm" variant="secondary" onClick={() => onOpenFeedbackModal(report)}>
                      <MessageSquare className="w-4 h-4 mr-1.5" /> {report.userFeedback ? 'Editar Feedback' : 'Dar Feedback'}
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ReportList;