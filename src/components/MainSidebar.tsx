import { Home, MessageCircle, Bell, Files, MoreHorizontal, User, Settings, LogOut, Smile } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SidebarHoverPanel } from './SidebarHoverPanel';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { icon: Home, label: 'Home', path: '/', showLabel: true, hasPanel: false },
  { icon: MessageCircle, label: 'DMs', path: '/dms', showLabel: true, hasPanel: true, panelType: 'dms' as const },
  { icon: Bell, label: 'Activity', path: '/activity', showLabel: true, hasPanel: true, panelType: 'activity' as const },
  { icon: Files, label: 'Files', path: '/files', showLabel: true, hasPanel: true, panelType: 'files' as const },
  { icon: MoreHorizontal, label: 'More', path: '/more', showLabel: true, hasPanel: true, panelType: 'more' as const },
];

export const MainSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user?.id);
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
                        ? 'bg-[hsl(var(--slack-purple-active))] text-foreground hover:bg-[hsl(var(--slack-purple-hover))]'
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

        {/* Spacer to push profile to bottom */}
        <div className="flex-1" />

        {/* Profile at bottom */}
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <button className="w-12 h-12 rounded-lg hover:bg-[hsl(var(--slack-purple-hover))] transition-colors flex items-center justify-center relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url} />
                    <AvatarFallback className="bg-primary/20 text-foreground text-sm">
                      {profile?.display_name?.[0] || profile?.username?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[hsl(var(--slack-purple-dark))]" />
                </button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-popover border-border">
              <div className="font-medium text-sm">{profile?.display_name || profile?.username || 'User'}</div>
            </TooltipContent>
          </Tooltip>
          <DropdownMenuContent side="right" align="start" className="w-64 bg-[#1A1D21] border-[#424242] z-50">
            <div className="px-3 py-3 border-b border-[#424242]">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={profile?.avatar_url} />
                  <AvatarFallback className="bg-primary/20">
                    {profile?.display_name?.[0] || profile?.username?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground truncate">
                    {profile?.display_name || profile?.username || 'User'}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer">
                <Smile className="mr-2 h-4 w-4" />
                Update your status
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#424242]" />
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer">
                Set yourself as away
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <span className="mr-2">Pause notifications</span>
                <span className="ml-auto text-xs text-muted-foreground">On</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#424242]" />
            <div className="py-1">
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Preferences
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator className="bg-[#424242]" />
            <div className="py-1">
              <DropdownMenuItem 
                className="cursor-pointer text-foreground"
                onClick={async () => {
                  await signOut();
                  navigate('/');
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out of Debugging Demons
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipProvider>
    </aside>
  );
};
