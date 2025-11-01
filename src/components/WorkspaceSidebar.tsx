import { motion } from 'framer-motion';
import { Hash, MessageSquare, Star, ChevronDown, Plus, Settings, Edit2, Bell, Search, Users, File, Workflow } from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const WorkspaceSidebar = () => {
  const { channels, activeChannel, setActiveChannel, sidebarCollapsed } = useWorkspaceStore();

  if (sidebarCollapsed) {
    return (
      <motion.aside
        initial={{ width: 260 }}
        animate={{ width: 68 }}
        className="h-screen bg-[hsl(var(--slack-purple))] border-r border-[hsl(var(--slack-purple-active))] flex flex-col"
      >
        <div className="p-3 border-b border-[hsl(var(--slack-purple-active))]">
          <div className="w-10 h-10 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center text-foreground font-black text-sm">
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
      initial={{ width: 68 }}
      animate={{ width: 260 }}
      className="h-screen bg-[hsl(var(--slack-purple))] border-r border-[hsl(var(--slack-purple-active))] flex flex-col"
    >
      {/* Workspace Header */}
      <div className="px-3 py-2 border-b border-[hsl(var(--slack-purple-active))]">
        <Button
          variant="ghost"
          className="w-full justify-between px-2 h-auto py-2 text-foreground hover:bg-[hsl(var(--slack-purple-hover))] rounded"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center font-black text-sm">
              NW
            </div>
            <span className="font-black text-[15px]">New Workspace</span>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>

        {/* Trial Banner */}
        <div className="mt-2 px-2 py-1.5 bg-[hsl(var(--slack-aubergine))] rounded flex items-center gap-2 cursor-pointer hover:bg-[hsl(var(--slack-aubergine))]/80">
          <Settings className="h-3.5 w-3.5 text-[hsl(var(--slack-text-secondary))]" />
          <span className="text-xs text-[hsl(var(--slack-text-secondary))]">30 days left in trial</span>
          <ChevronDown className="h-3 w-3 text-[hsl(var(--slack-text-secondary))] ml-auto" />
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <div className="px-2 py-2">
          {/* Quick Actions */}
          <div className="space-y-0.5 mb-3">
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[hsl(var(--slack-text-secondary))] text-[15px]">
              <MessageSquare className="h-4 w-4" />
              <span>Threads</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[hsl(var(--slack-text-secondary))] text-[15px]">
              <Bell className="h-4 w-4" />
              <span>Activity</span>
            </button>
            <button className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[hsl(var(--slack-text-secondary))] text-[15px]">
              <Star className="h-4 w-4" />
              <span>Starred</span>
            </button>
          </div>

          {/* Huddles */}
          <div className="mb-3">
            <button className="w-full flex items-center justify-between px-3 py-1 text-[hsl(var(--slack-text-secondary))] hover:text-foreground text-xs font-bold">
              <span>Huddles</span>
            </button>
          </div>

          {/* Directories */}
          <div className="mb-3">
            <button className="w-full flex items-center justify-between px-3 py-1 text-[hsl(var(--slack-text-secondary))] hover:text-foreground text-xs font-bold">
              <span>Directories</span>
            </button>
          </div>

          {/* Sections */}
          {Object.entries(channelsBySection).map(([section, sectionChannels]) => (
            <div key={section} className="mb-3">
              <button className="w-full flex items-center justify-between px-3 py-1 text-[hsl(var(--slack-text-secondary))] hover:text-foreground text-xs font-bold group">
                <div className="flex items-center gap-1">
                  <ChevronDown className="h-3 w-3" />
                  <span>{section}</span>
                </div>
                <Plus className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100" />
              </button>
              <div className="space-y-0.5 mt-0.5">
                {sectionChannels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id)}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-1 rounded text-[15px] group transition-colors',
                      activeChannel === channel.id
                        ? 'bg-[hsl(var(--slack-cyan))] text-foreground font-bold'
                        : 'text-[hsl(var(--slack-text-secondary))] hover:bg-[hsl(var(--slack-purple-hover))]'
                    )}
                  >
                    {channel.type === 'channel' ? (
                      <Hash className="h-[15px] w-[15px]" />
                    ) : (
                      <div className="w-5 h-5 rounded bg-[hsl(var(--slack-purple-active))] flex items-center justify-center text-xs">
                        👤
                      </div>
                    )}
                    <span className="flex-1 text-left truncate">{channel.name}</span>
                    {channel.unread && (
                      <span className="px-1.5 py-0.5 rounded-full bg-destructive text-[10px] font-bold min-w-[18px] text-center">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
                <button className="w-full flex items-center gap-2 px-3 py-1 rounded text-[15px] text-[hsl(var(--slack-text-muted))] hover:bg-[hsl(var(--slack-purple-hover))] hover:text-[hsl(var(--slack-text-secondary))]">
                  <Plus className="h-4 w-4" />
                  <span>Add channels</span>
                </button>
              </div>
            </div>
          ))}

          {/* Apps */}
          <div className="mb-3">
            <button className="w-full flex items-center justify-between px-3 py-1 text-[hsl(var(--slack-text-secondary))] hover:text-foreground text-xs font-bold group">
              <div className="flex items-center gap-1">
                <ChevronDown className="h-3 w-3" />
                <span>Apps</span>
              </div>
            </button>
            <div className="space-y-0.5 mt-0.5">
              <button className="w-full flex items-center gap-2 px-3 py-1 rounded text-[15px] text-[hsl(var(--slack-text-secondary))] hover:bg-[hsl(var(--slack-purple-hover))]">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                  S
                </div>
                <span>Slackbot</span>
                <span className="ml-auto w-2 h-2 rounded-full bg-pink-500"></span>
              </button>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-2 border-t border-[hsl(var(--slack-purple-active))]">
        <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded hover:bg-[hsl(var(--slack-purple-hover))] text-[15px]">
          <div className="w-9 h-9 rounded bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-lg border border-primary/30">
            👤
          </div>
          <div className="flex-1 text-left">
            <div className="font-black text-foreground text-[15px]">Avi</div>
            <div className="text-xs text-[hsl(var(--slack-text-muted))] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span>Active</span>
            </div>
          </div>
          <Settings className="h-4 w-4 text-[hsl(var(--slack-text-muted))]" />
        </button>
      </div>
    </motion.aside>
  );
};
