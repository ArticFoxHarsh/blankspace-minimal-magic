import { create } from 'zustand';

export interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'dm';
  unread?: number;
  section?: string;
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
    { id: 'new-channel', name: 'new-channel', type: 'channel', section: 'Channels' },
    { id: 'all-new-workspace', name: 'all-new-workspace', type: 'channel', section: 'Channels' },
    { id: 'social', name: 'social', type: 'channel', section: 'Channels' },
    { id: 'avi-dm', name: 'Avi', type: 'dm', section: 'Direct messages' },
  ],
  messages: [
    {
      id: '1',
      userId: 'avi',
      userName: 'Avi',
      userAvatar: '👤',
      content: 'joined #new-channel.',
      timestamp: new Date('2024-01-01T19:23:00'),
      channelId: 'new-channel',
    },
  ],
  setActiveChannel: (channelId) => set({ activeChannel: channelId }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
}));
