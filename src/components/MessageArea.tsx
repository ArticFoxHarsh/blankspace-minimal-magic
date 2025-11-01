import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Star, Users, Search, Info, Smile, AtSign, Send, Bold, Italic, Link2, ListOrdered, Code } from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export const MessageArea = () => {
  const { activeChannel, channels, messages } = useWorkspaceStore();
  const [messageInput, setMessageInput] = useState('');

  const channel = channels.find((c) => c.id === activeChannel);
  const channelMessages = messages.filter((m) => m.channelId === activeChannel);

  if (!channel) return null;

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Channel Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-14 border-b border-border flex items-center justify-between px-4 bg-card"
      >
        <div className="flex items-center gap-2">
          {channel.type === 'channel' ? (
            <Hash className="h-5 w-5 text-muted-foreground" />
          ) : (
            <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-sm">👤</div>
          )}
          <h2 className="font-bold text-[15px]">{channel.name}</h2>
          <Star className="h-4 w-4 text-muted-foreground ml-2" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 gap-1">
            <Users className="h-4 w-4" />
            <span className="text-xs">2</span>
          </Button>
          <div className="w-px h-5 bg-border" />
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Welcome Message */}
          {channelMessages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-4">
                <Hash className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Welcome to #{channel.name}!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                This is the very beginning of the <span className="font-semibold">#{channel.name}</span> channel.
              </p>
            </motion.div>
          )}

          {/* Message List */}
          {channelMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3 hover:bg-muted/50 -mx-2 px-2 py-1 rounded group"
            >
              <div className="w-9 h-9 rounded bg-muted flex items-center justify-center text-lg flex-shrink-0">
                {message.userAvatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-sm">{message.userName}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                </div>
                <p className="text-sm mt-0.5">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-1 px-3 py-2 border-b border-border">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Bold className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Italic className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Link2 className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ListOrdered className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Code className="h-3.5 w-3.5" />
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Smile className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <AtSign className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${channel.name}`}
              className="w-full px-3 py-3 bg-transparent border-none outline-none text-sm"
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          <kbd className="px-1.5 py-0.5 rounded bg-muted">⏎</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-muted">Shift ⏎</kbd> to add a new line
        </p>
      </div>
    </div>
  );
};
