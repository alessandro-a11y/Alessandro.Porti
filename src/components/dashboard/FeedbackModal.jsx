import React from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

const FeedbackModal = ({ 
  isOpen, 
  onOpenChange, 
  report, 
  problemCategories, 
  feedbackText, 
  setFeedbackText, 
  rating, 
  setRating, 
  onSubmit 
}) => {
  if (!report) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-effect shadow-strong">
        <DialogHeader>
          <DialogTitle className="text-2xl text-foreground">Feedback sobre a Solução</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Problema #{report.id} - {problemCategories.find(pc => pc.value === report.category)?.label}.
            Compartilhe sua opinião sobre o serviço.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-5 py-4">
          <div>
            <label htmlFor="feedback-text" className="block text-sm font-medium mb-1.5 text-foreground">Seu comentário:</label>
            <Textarea
              id="feedback-text"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="O problema foi resolvido satisfatoriamente? Como foi o atendimento?"
              className="text-base glass-effect focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 text-foreground">Sua avaliação (de 1 a 5 estrelas):</label>
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <motion.button
                  key={i}
                  type="button"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(i + 1)}
                  className="focus:outline-none"
                  aria-label={`Avaliar com ${i + 1} estrela${i > 0 ? 's' : ''}`}
                >
                  <Star
                    className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/40 hover:text-yellow-300'}`}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="mt-2">
          <DialogClose asChild><Button variant="outline" className="text-foreground hover:bg-accent/50 hover:text-accent-foreground">Cancelar</Button></DialogClose>
          <Button onClick={onSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90">Enviar Feedback</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackModal;