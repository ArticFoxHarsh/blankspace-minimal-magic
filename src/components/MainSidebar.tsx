import { Home, MessageSquare, Bell, Files, MoreHorizontal } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SidebarHoverPanel } from './SidebarHoverPanel';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navItems = [
  { icon: Home, label: 'Home', path: '/', showLabel: true, hasPanel: false },
  { icon: MessageSquare, label: 'DMs', path: '/dms', showLabel: true, hasPanel: true, panelType: 'dms' as const },
  { icon: Files, label: 'Files', path: '/files', showLabel: true, hasPanel: true, panelType: 'files' as const },
  { icon: MoreHorizontal, label: 'More', path: '/more', showLabel: true, hasPanel: true, panelType: 'more' as const },
];

export const MainSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openPanel, setOpenPanel] = useState<'dms' | 'activity' | 'files' | 'more' | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/c/');
    }
    return location.pathname.startsWith(path);
  };

  const handleMouseEnter = (label: string, panelType?: 'dms' | 'activity' | 'files' | 'more') => {
    setHoveredItem(label);
    
    if (panelType) {
      // Clear any existing timeout
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      
      // Set new timeout to show panel after delay
      const timeout = setTimeout(() => {
        setOpenPanel(panelType);
      }, 200);
      
      setHoverTimeout(timeout);
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
    
    // Clear timeout if mouse leaves before panel opens
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handlePanelClose = () => {
    setOpenPanel(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const getSimpleTooltip = (label: string) => {
    switch (label) {
      case 'Home':
        return 'Home - View all channels';
      case 'DMs':
        return 'Direct Messages';
      case 'Files':
        return 'Files';
      case 'More':
        return 'More';
      default:
        return label;
    }
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
              DD
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-popover border-border p-3">
            <div className="font-bold text-sm">Debugging Demons</div>
          </TooltipContent>
        </Tooltip>

        {/* Navigation Items */}
        {navItems.map((item) => (
          <div key={item.path} className="relative">
            <Tooltip>
              <TooltipTrigger asChild>
                <div 
                  className="flex flex-col items-center gap-1"
                  onMouseEnter={() => handleMouseEnter(item.label, item.hasPanel ? item.panelType : undefined)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      navigate(item.path);
                      if (item.hasPanel && item.panelType) {
                        setOpenPanel(openPanel === item.panelType ? null : item.panelType);
                      }
                    }}
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
                    <span className="text-xs text-[hsl(var(--slack-text-muted))] font-bold">
                      {item.label}
                    </span>
                  )}
                </div>
              </TooltipTrigger>
              {!item.hasPanel && (
                <TooltipContent side="right" className="bg-popover border-border">
                  {getSimpleTooltip(item.label)}
                </TooltipContent>
              )}
            </Tooltip>

            {/* Hover Panel */}
            <AnimatePresence>
              {item.hasPanel && openPanel === item.panelType && (
                <SidebarHoverPanel
                  type={item.panelType}
                  onClose={handlePanelClose}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </TooltipProvider>
    </aside>
  );
};
