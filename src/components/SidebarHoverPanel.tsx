import { motion } from 'framer-motion';
import { X, MessageSquare, Hash, Users, FileText, Plus, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarHoverPanelProps {
  type: 'dms' | 'activity' | 'files' | 'more';
  onClose: () => void;
}

export const SidebarHoverPanel = ({ type, onClose }: SidebarHoverPanelProps) => {
  // Mock data - can be replaced with real data later
  const mockUsers = [
    { id: '1', name: 'John Doe', status: 'online', initials: 'JD' },
    { id: '2', name: 'Jane Smith', status: 'offline', initials: 'JS' },
    { id: '3', name: 'Mike Johnson', status: 'online', initials: 'MJ' },
  ];

  const mockFiles = [
    { id: '1', name: 'Project_Overview.pdf', label: 'Template', updated: '2 hours ago' },
    { id: '2', name: 'Design_Mockups.fig', label: '', updated: '1 day ago' },
  ];

  const renderContent = () => {
    switch (type) {
      case 'dms':
        return (
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-[#424242] flex items-center justify-between">
              <h3 className="font-bold text-sm">Direct messages</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Unread messages</span>
                <Switch className="h-4 w-6 data-[state=checked]:bg-primary" />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 bg-transparent border-[#424242] hover:bg-[#2C2D30] text-foreground"
                >
                  <Plus className="h-4 w-4" />
                  Add colleagues
                </Button>
                
                <div className="mt-4 space-y-1">
                  {mockUsers.map((user) => (
                    <button
                      key={user.id}
                      className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2C2D30] transition-colors text-left"
                    >
                      <div className="relative">
                        <Avatar className="h-7 w-7 bg-[#2C2D30]">
                          <AvatarFallback className="text-xs bg-[#2C2D30] text-foreground">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        {user.status === 'online' && (
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1A1D21]" />
                        )}
                      </div>
                      <span className="text-sm text-foreground">{user.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        );

      case 'activity':
        return (
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-[#424242] flex items-center justify-between">
              <h3 className="font-bold text-sm">Activity</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Unread messages</span>
                <Switch className="h-4 w-6 data-[state=checked]:bg-primary" />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-3 space-y-1">
                <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2C2D30] transition-colors text-left">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Threads</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2C2D30] transition-colors text-left">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Huddles</span>
                </button>
                
                <button className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2C2D30] transition-colors text-left">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Directories</span>
                </button>

                <div className="mt-6 p-3 rounded bg-[#2C2D30]/50 flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium">You've caught up with everything</p>
                    <p className="text-xs text-muted-foreground mt-0.5">No unread messages in your channels or threads</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        );

      case 'files':
        return (
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-[#424242]">
              <h3 className="font-bold text-sm">Files</h3>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-3">
                <div className="flex gap-2 mb-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-transparent border-[#424242] hover:bg-[#2C2D30] text-foreground"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    New canvas
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-transparent border-[#424242] hover:bg-[#2C2D30] text-foreground"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    New list
                  </Button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs font-semibold">Starred</span>
                  </div>
                  <div className="p-3 rounded bg-[#2C2D30]/50 border border-dashed border-[#424242]">
                    <p className="text-xs text-muted-foreground text-center">
                      Drag and drop important stuff here
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {mockFiles.map((file) => (
                    <button
                      key={file.id}
                      className="w-full flex items-start gap-3 p-2 rounded hover:bg-[#2C2D30] transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium truncate">{file.name}</p>
                          {file.label && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-primary/20 text-primary">
                              {file.label}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{file.updated}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </div>
        );

      case 'more':
        return (
          <div className="flex flex-col h-full">
            <div className="p-3 border-b border-[#424242]">
              <h3 className="font-bold text-sm">More</h3>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-3">
                <div className="mb-4">
                  <button className="w-full text-left p-2 rounded hover:bg-[#2C2D30] transition-colors">
                    <h4 className="text-sm font-semibold mb-1">Tools</h4>
                    <p className="text-xs text-muted-foreground">
                      Create and find workflows and apps
                    </p>
                  </button>
                </div>

                <button className="w-full text-left p-2 text-sm text-primary hover:bg-[#2C2D30] rounded transition-colors">
                  Customize navigation bar
                </button>

                <div className="mt-6 pt-3 border-t border-[#424242]">
                  <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">PEOPLE</p>
                  <div className="space-y-1">
                    {mockUsers.map((user) => (
                      <button
                        key={user.id}
                        className="w-full flex items-center gap-3 p-2 rounded hover:bg-[#2C2D30] transition-colors text-left"
                      >
                        <div className="relative">
                          <Avatar className="h-7 w-7 bg-[#2C2D30]">
                            <AvatarFallback className="text-xs bg-[#2C2D30] text-foreground">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          {user.status === 'online' && (
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#1A1D21]" />
                          )}
                        </div>
                        <span className="text-sm text-foreground">{user.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.15 }}
      className="absolute left-full top-0 ml-2 z-50"
      onMouseLeave={onClose}
    >
      <div className="w-[280px] h-[400px] bg-[#1A1D21] border border-[#424242] rounded-lg shadow-xl overflow-hidden">
        {renderContent()}
      </div>
    </motion.div>
  );
};
