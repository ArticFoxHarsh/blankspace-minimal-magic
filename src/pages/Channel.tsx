import { useParams, Navigate } from 'react-router-dom';
import { MessageArea } from '@/components/MessageArea';
import { useChannels } from '@/hooks/useChannels';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { useEffect } from 'react';

const Channel = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const { channels, loading } = useChannels();
  const { setActiveChannel } = useWorkspaceStore();

  useEffect(() => {
    if (channelId) {
      setActiveChannel(channelId);
    }
  }, [channelId, setActiveChannel]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Check if channel exists
  const channelExists = channels.some((c) => c.id === channelId);
  
  if (!channelExists && channelId) {
    // Redirect to home if channel doesn't exist
    return <Navigate to="/" replace />;
  }

  return <MessageArea />;
};

export default Channel;
