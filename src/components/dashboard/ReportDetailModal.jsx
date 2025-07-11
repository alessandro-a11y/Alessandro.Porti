import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Edit3, MessageSquare, Tag } from 'lucide-react';

const ReportDetailModal = ({ isOpen, onOpenChange, report, problemCategories, statusOptions, onOpenFeedbackModal }) => {
  if (!report) return null;

  const getStatusDetails = (statusValue) => {
    return statusOptions.find(opt => opt.value === statusValue) || { color: 'bg-gray-500', textColor: 'text-gray-500', icon: Tag };
  };
  const statusDetail = getStatusDetails(report.status);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl glass-effect shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl text-foreground">Detalhes da Sinalização #{report.id}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {problemCategories.find(pc => pc.value === report.category)?.label || report.category} - {new Date(report.timestamp).toLocaleString('pt-BR')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-3 text-foreground/90">
          <div className="flex items-center gap-3">
            <span className="font-medium w-24 text-right">Status:</span>
            <Badge variant="outline" className={`border-transparent ${statusDetail.color} text-white text-sm`}>
              <statusDetail.icon className="w-4 h-4 mr-1.5" />
              {report.status}
            </Badge>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-medium w-24 text-right mt-0.5">Local:</span>
            <p className="text-sm flex-1">{report.location}</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-medium w-24 text-right mt-0.5">Descrição:</span>
            <p className="text-sm flex-1 bg-background/30 dark:bg-background/70 p-3 rounded-md shadow-inner">{report.description}</p>
          </div>
          {report.photo && (
            <div className="flex items-start gap-3">
              <span className="font-medium w-24 text-right mt-0.5">Foto:</span>
              <div className="flex-1">
                <img-replace src={report.photo} alt="Foto do problema" className="rounded-lg max-h-80 w-auto object-contain border-2 border-border shadow-sm" />
              </div>
            </div>
          )}

          {report.status === 'Resolvido' && (
            <>
              <hr className="border-border/50 my-4" />
              <h4 className="font-semibold text-lg mb-2 text-foreground">Feedback do Cidadão:</h4>
              {report.userFeedback || report.serviceRating > 0 ? (
                <div className="space-y-3">
                  {report.serviceRating > 0 && (
                    <div className="flex items-center gap-3">
                      <span className="font-medium w-24 text-right">Avaliação:</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < report.serviceRating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
                        ))}
                      </div>
                    </div>
                  )}
                  {report.userFeedback && (
                     <div className="flex items-start gap-3">
                      <span className="font-medium w-24 text-right mt-0.5">Comentário:</span>
                      <p className="text-sm flex-1 bg-background/30 dark:bg-background/70 p-3 rounded-md shadow-inner">{report.userFeedback}</p>
                    </div>
                  )}
                   <Button variant="outline" size="sm" onClick={() => onOpenFeedbackModal(report)} className="mt-2 text-foreground hover:bg-accent/50 hover:text-accent-foreground">
                     <Edit3 className="w-3.5 h-3.5 mr-1.5"/> Editar Feedback
                   </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                   <span className="font-medium w-24 text-right"></span>
                   <div className="flex-1">
                    <p className="text-muted-foreground text-sm">Nenhum feedback fornecido ainda.</p>
                    <Button variant="secondary" size="sm" onClick={() => onOpenFeedbackModal(report)} className="mt-2">
                      <MessageSquare className="w-3.5 h-3.5 mr-1.5"/> Deixar Feedback
                    </Button>
                   </div>
                </div>
              )}
            </>
          )}
        </div>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant="outline" className="text-foreground hover:bg-accent/50 hover:text-accent-foreground">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDetailModal;