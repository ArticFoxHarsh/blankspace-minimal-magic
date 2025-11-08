import { ChevronLeft, ChevronRight, RotateCcw, Search, HelpCircle, Gift, MoreVertical, X, Bell, Clock, Smile, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export const TopBar = () => {
  const navigate = useNavigate();
  const [helpOpen, setHelpOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleForward = () => {
    navigate(1);
  };

  return (
    <header className="h-[44px] bg-[hsl(var(--slack-purple))] border-b border-[hsl(var(--slack-purple-active))] flex items-center justify-between px-3 gap-3">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleForward}
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.location.reload()}
          className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--slack-text-muted))]" />
          <Input
            type="text"
            placeholder="Search Debugging Demons"
            className="w-full pl-10 bg-[hsl(var(--slack-purple-active))] border-[hsl(var(--slack-purple-active))] text-foreground placeholder:text-[hsl(var(--slack-text-muted))] focus-visible:ring-1 focus-visible:ring-[hsl(var(--slack-cyan))] h-8"
          />
        </div>
      </div>

      {/* Help & More Buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setHelpOpen(true)}
          className="h-7 px-3 text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
        >
          Help
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-[hsl(var(--slack-text-muted))] hover:text-foreground hover:bg-[hsl(var(--slack-purple-hover))]"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-popover z-50">
            <DropdownMenuItem>Open channel details</DropdownMenuItem>
            <DropdownMenuItem>Summarise channel</DropdownMenuItem>
            <DropdownMenuItem>Edit notifications</DropdownMenuItem>
            <DropdownMenuItem>Star channel</DropdownMenuItem>
            <DropdownMenuItem>Move channel</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Add template to channel</DropdownMenuItem>
            <DropdownMenuItem>Add a workflow</DropdownMenuItem>
            <DropdownMenuItem>Edit settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>Search in channel</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Leave channel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Help Sidebar */}
      <Sheet open={helpOpen} onOpenChange={setHelpOpen}>
        <SheetContent side="right" className="w-[380px] p-0 bg-[#1A1D21] border-l border-[#424242]">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#424242]">
              <SheetTitle className="text-lg font-bold text-foreground">Help</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setHelpOpen(false)}
                className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-[#2C2D30]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Search Section */}
            <div className="p-4 border-b border-[#424242]">
              <div className="text-xs text-muted-foreground mb-2">Find answers quickly</div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full pl-10 bg-[hsl(var(--slack-purple-active))] border-[hsl(var(--slack-cyan))] text-foreground focus-visible:ring-1 focus-visible:ring-[hsl(var(--slack-cyan))]"
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4">
                {/* Discover More Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground">✨ Discover more</span>
                    <span className="text-xs text-muted-foreground">1/3</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 mb-6">
                    <button className="p-3 bg-[#2C2D30] rounded-lg text-left hover:bg-[#353638] transition-colors">
                      <div className="flex gap-3">
                        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg w-16 h-16 flex-shrink-0 flex items-center justify-center">
                          <div className="text-white text-[10px] font-bold bg-green-500 px-1.5 py-0.5 rounded">NEW</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold mb-0.5 text-foreground">Quick start guide</p>
                          <p className="text-xs text-muted-foreground">Learn the basics and get to work in Slack</p>
                        </div>
                      </div>
                    </button>

                    <button className="p-3 bg-[#2C2D30] rounded-lg text-left hover:bg-[#353638] transition-colors">
                      <div className="flex gap-3">
                        <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg w-16 h-16 flex-shrink-0 flex items-center justify-center">
                          <div className="text-white text-[10px] font-bold bg-green-500 px-1.5 py-0.5 rounded">NEW</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold mb-0.5 text-foreground">New layout for channels and DMs</p>
                          <p className="text-xs text-muted-foreground">Add files, workflows and more to tabs</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Explore Help Topics */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-muted-foreground">👁️ Explore help topics</span>
                  </div>
                  
                  <div className="space-y-0.5">
                    <button className="w-full flex items-center gap-3 p-2.5 rounded hover:bg-[#2C2D30] transition-colors text-left">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-red-500" />
                      </div>
                      <span className="text-sm text-foreground">Configure your Slack notifications</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-2.5 rounded hover:bg-[#2C2D30] transition-colors text-left">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="text-sm text-foreground">Set your Slack status and availability</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-2.5 rounded hover:bg-[#2C2D30] transition-colors text-left">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <Bell className="h-4 w-4 text-blue-500" />
                      </div>
                      <span className="text-sm text-foreground">Set a reminder</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-2.5 rounded hover:bg-[#2C2D30] transition-colors text-left">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <Smile className="h-4 w-4 text-yellow-500" />
                      </div>
                      <span className="text-sm text-foreground">Use emoji reactions</span>
                    </button>
                    <button className="w-full flex items-center gap-3 p-2.5 rounded hover:bg-[#2C2D30] transition-colors text-left">
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        <Video className="h-4 w-4 text-purple-500" />
                      </div>
                      <span className="text-sm text-foreground">Slack video tutorials</span>
                    </button>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="mt-6 pt-4 border-t border-[#424242]">
                  <button className="text-sm text-[hsl(var(--slack-cyan))] hover:underline mb-4">
                    Help requests →
                  </button>
                  
                  <div className="flex justify-center">
                    <Button className="bg-background text-foreground hover:bg-background/90 border border-border">
                      Contact us
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};
