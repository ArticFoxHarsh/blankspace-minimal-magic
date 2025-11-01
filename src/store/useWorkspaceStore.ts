import { create } from 'zustand';

export interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  unread?: number;
  section?: string;
  description?: string;
}

export interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  channelId: string;
  reactions?: { emoji: string; count: number; users: string[] }[];
  threadCount?: number;
}

interface WorkspaceStore {
  activeChannel: string;
  sidebarCollapsed: boolean;
  channels: Channel[];
  messages: Message[];
  setActiveChannel: (channelId: string) => void;
  toggleSidebar: () => void;
  addMessage: (message: Message) => void;
}

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeChannel: 'new-channel',
  sidebarCollapsed: false,
  channels: [
    { 
      id: 'new-channel', 
      name: 'new-channel', 
      type: 'channel', 
      section: 'Channels',
      description: 'This channel is for everything #new-channel. Hold meetings, share docs and make decisions together with your team.'
    },
    { 
      id: 'all-new-workspace', 
      name: 'all-new-workspace', 
      type: 'channel', 
      section: 'Channels',
      description: 'Share announcements and updates about company news, upcoming events or teammates who deserve some kudos.'
    },
    { 
      id: 'social', 
      name: 'social', 
      type: 'channel', 
      section: 'Channels',
      description: 'Other channels are for work. This one\'s just for fun. Get to know your teammates and show your lighter side.'
    },
    { id: 'avi-dm', name: 'Avi', type: 'dm', section: 'Direct messages' },
  ],
  messages: [
    {
      id: '1',
      userId: 'avi',
      userName: 'Avi',
      userAvatar: '👤',
      content: 'joined #new-channel.',
      timestamp: new Date(Date.now() - 3600000),
      channelId: 'new-channel',
    },
    {
      id: '2',
      userId: 'avi',
      userName: 'Avi',
      userAvatar: '👤',
      content: 'Hey everyone! Welcome to the new channel. Let\'s collaborate on this project together! 🚀',
      timestamp: new Date(Date.now() - 3000000),
      channelId: 'new-channel',
      reactions: [
        { emoji: '👍', count: 3, users: ['user1', 'user2', 'user3'] },
        { emoji: '🎉', count: 2, users: ['user1', 'user2'] },
      ],
    },
    {
      id: '3',
      userId: 'avi',
      userName: 'Avi',
      userAvatar: '👤',
      content: 'Just pushed some updates to the docs. Take a look when you get a chance!',
      timestamp: new Date(Date.now() - 1800000),
      channelId: 'new-channel',
      threadCount: 3,
    },
    {
      id: '4',
      userId: 'system',
      userName: 'Avi',
      userAvatar: '👤',
      content: 'joined #social.',
      timestamp: new Date(Date.now() - 7200000),
      channelId: 'social',
    },
  ],
  setActiveChannel: (channelId) => set({ activeChannel: channelId }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
