import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, Star, Users, Search, Info, Smile, AtSign, Send, Bold, Italic, Link2, ListOrdered, Code, Plus, Paperclip } from 'lucide-react';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChannelWelcome } from './ChannelWelcome';
import { MessageItem } from './MessageItem';

export const MessageArea = () => {
  const { activeChannel, channels, messages } = useWorkspaceStore();
  const [messageInput, setMessageInput] = useState('');

  const channel = channels.find((c) => c.id === activeChannel);
  const channelMessages = messages.filter((m) => m.channelId === activeChannel);

  if (!channel) return null;

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Channel Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[49px] border-b border-border flex items-center justify-between px-4 bg-card flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          {channel.type === 'channel' ? (
            <Hash className="h-[18px] w-[18px] text-muted-foreground" />
          ) : (
            <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-sm">👤</div>
          )}
          <h2 className="font-black text-[15px]">{channel.name}</h2>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Star className="h-[15px] w-[15px] text-muted-foreground hover:text-yellow-500 transition-colors" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs font-semibold">
            <Users className="h-3.5 w-3.5" />
            <span>2</span>
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
        {channelMessages.length <= 1 ? (
          <ChannelWelcome channelName={channel.name} />
        ) : (
          <div className="p-5 space-y-2 max-w-6xl">
            {/* Channel Topic */}
            {channel.description && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="pb-4 mb-4 border-b border-border"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-primary/20">
                    <Hash className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-black text-[15px] mb-1">#{channel.name}</h3>
                    <p className="text-[15px] text-muted-foreground leading-relaxed">{channel.description}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Messages */}
            {channelMessages.map((message, index) => {
              const prevMessage = channelMessages[index - 1];
              const showAvatar = !prevMessage || 
                prevMessage.userId !== message.userId ||
                new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() > 300000;

              return (
                <MessageItem
                  key={message.id}
                  message={message}
                  showAvatar={showAvatar}
                />
              );
            })}
          </div>
        )}
      </ScrollArea>

      {/* Message Input */}
      <div className="p-5 border-t border-border flex-shrink-0">
        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Formatting Toolbar */}
          <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border">
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <Bold className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <Italic className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <Link2 className="h-3.5 w-3.5" />
            </Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <ListOrdered className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <Code className="h-3.5 w-3.5" />
            </Button>
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <Smile className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <AtSign className="h-3.5 w-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-muted">
              <Paperclip className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${channel.name}`}
              className="w-full px-3 py-3 bg-transparent border-none outline-none text-[15px] placeholder:text-muted-foreground"
            />
            {messageInput && (
              <Button
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90 rounded"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
