import { Home, MessageSquare, Bell, Files, MoreHorizontal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { icon: Home, label: 'Home', path: '/', showLabel: true },
  { icon: MessageSquare, label: 'DMs', path: '/dms', showLabel: true },
  { icon: Files, label: 'Files', path: '/files', showLabel: true },
  { icon: MoreHorizontal, label: 'More', path: '/more', showLabel: true },
];

export const MainSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/c/');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-[68px] h-screen bg-[hsl(var(--slack-purple-dark))] flex flex-col items-center py-3 gap-2 border-r border-[hsl(var(--slack-purple-active))]">
      {/* Workspace Icon */}
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              onClick={() => navigate('/')}
              className="w-12 h-12 rounded-lg bg-[hsl(var(--slack-purple-active))] flex items-center justify-center font-black text-sm hover:bg-[hsl(var(--slack-purple-hover))] transition-colors mb-2"
            >
              NW
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>New Workspace</p>
          </TooltipContent>
        </Tooltip>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <Tooltip key={item.path}>
            <TooltipTrigger asChild>
              <div className="flex flex-col items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'w-12 h-12 rounded-lg transition-colors',
                    isActive(item.path)
                      ? 'bg-[hsl(var(--slack-cyan))] text-foreground'
                      : 'text-[hsl(var(--slack-text-muted))] hover:bg-[hsl(var(--slack-purple-hover))] hover:text-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
                {item.showLabel && (
                  <span className="text-[10px] text-[hsl(var(--slack-text-muted))] font-medium">
                    {item.label}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </aside>
  );
};
