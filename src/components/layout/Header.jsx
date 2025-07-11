import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, Sun, Moon, Bell, UserCircle, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 
import { toast } from '@/components/ui/use-toast';

const Header = ({ activeModuleName, isSidebarOpen, setIsSidebarOpen }) => {
  const [theme, setTheme] = React.useState(
    localStorage.getItem('painelSaudeTheme') || 'dark' 
  );

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('painelSaudeTheme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
     toast({
      title: `🎨 Tema Alterado!`,
      description: `Interface agora no modo ${newTheme}.`,
    });
  };
  
  const handleNotImplemented = () => {
    toast({
      title: "🚧 Funcionalidade em Desenvolvimento!",
      description: "Esta área ainda não foi implementada. Volte em breve! 🚀",
      variant: "default", 
    });
  };


  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-card/70 backdrop-blur-lg border-b border-border/60 h-20 flex items-center px-4 sm:px-6 print:hidden"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="md:hidden mr-2 text-muted-foreground hover:text-foreground"
            aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground whitespace-nowrap overflow-hidden text-ellipsis max-w-xs sm:max-w-md">
            {activeModuleName}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground" aria-label="Alternar tema">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon" onClick={handleNotImplemented} className="text-muted-foreground hover:text-foreground" aria-label="Notificações">
            <Bell className="w-5 h-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground" aria-label="Menu do usuário">
                <UserCircle className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer focus:bg-primary/20">
                <UserCircle className="w-4 h-4 mr-2"/> Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer focus:bg-primary/20">
                <Settings className="w-4 h-4 mr-2"/> Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleNotImplemented} className="cursor-pointer focus:bg-destructive/20 focus:text-destructive-foreground">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;