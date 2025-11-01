import { motion } from 'framer-motion';
import { Hash, MessageSquare, Star, ChevronDown, Plus, Settings, Edit2, Bell } from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const WorkspaceSidebar = () => {
  const { channels, activeChannel, setActiveChannel, sidebarCollapsed } = useWorkspaceStore();

  if (sidebarCollapsed) {
    return (
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: 70 }}
        className="h-screen bg-[hsl(var(--slack-purple))] border-r border-[hsl(var(--slack-purple-active))] flex flex-col"
      >
        <div className="p-3">
          <div className="w-9 h-9 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center text-foreground font-bold text-sm">
            NW
          </div>
        </div>
      </motion.aside>
    );
  }

  const channelsBySection = channels.reduce((acc, channel) => {
    const section = channel.section || 'Other';
    if (!acc[section]) acc[section] = [];
    acc[section].push(channel);
    return acc;
  }, {} as Record<string, typeof channels>);

  return (
    <motion.aside
      initial={{ width: 70 }}
      animate={{ width: 280 }}
      className="h-screen bg-[hsl(var(--slack-purple))] border-r border-[hsl(var(--slack-purple-active))] flex flex-col"
    >
      {/* Workspace Header */}
      <div className="px-4 py-3 border-b border-[hsl(var(--slack-purple-active))]">
        <Button
          variant="ghost"
          className="w-full justify-between px-2 h-auto py-1.5 text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center font-bold text-sm">
              NW
            </div>
            <span className="font-bold text-[15px]">New Workspace</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="space-y-0.5">
          <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[hsl(var(--slack-text-secondary))] text-sm">
            <MessageSquare className="h-4 w-4" />
            <span>Threads</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[hsl(var(--slack-text-secondary))] text-sm">
            <Bell className="h-4 w-4" />
            <span>Activity</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[hsl(var(--slack-text-secondary))] text-sm">
            <Star className="h-4 w-4" />
            <span>Starred</span>
          </button>
        </div>

        {/* Sections */}
        {Object.entries(channelsBySection).map(([section, sectionChannels]) => (
          <div key={section} className="mt-4">
            <button className="w-full flex items-center justify-between px-3 py-1 text-[hsl(var(--slack-text-secondary))] hover:text-foreground text-xs font-semibold">
              <div className="flex items-center gap-1">
                <ChevronDown className="h-3 w-3" />
                <span>{section}</span>
              </div>
              <Plus className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
            </button>
            <div className="space-y-0.5 mt-1">
              {sectionChannels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-1 rounded text-sm group',
                    activeChannel === channel.id
                      ? 'bg-[hsl(var(--slack-cyan))] text-foreground font-semibold'
                      : 'text-[hsl(var(--slack-text-secondary))] hover:bg-[hsl(var(--slack-purple-hover))]'
                  )}
                >
                  {channel.type === 'channel' ? (
                    <Hash className="h-4 w-4" />
                  ) : (
                    <div className="w-5 h-5 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center text-xs">
                      👤
                    </div>
                  )}
                  <span className="flex-1 text-left truncate">{channel.name}</span>
                  {channel.unread && (
                    <span className="px-1.5 py-0.5 rounded-full bg-destructive text-[10px] font-bold">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* User Profile */}
      <div className="p-3 border-t border-[hsl(var(--slack-purple-active))]">
        <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-sm">
          <div className="w-8 h-8 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center">
            👤
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-foreground">Avi</div>
            <div className="text-xs text-[hsl(var(--slack-text-muted))] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Active
            </div>
          </div>
          <Settings className="h-4 w-4 text-[hsl(var(--slack-text-muted))]" />
        </button>
      </div>
    </motion.aside>
  );
};
