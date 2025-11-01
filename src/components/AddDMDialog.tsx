import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AddDMDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
}

export const AddDMDialog = ({ open, onOpenChange }: AddDMDialogProps) => {
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchProfiles();
    }
  }, [open]);

  const fetchProfiles = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('id, username, display_name, avatar_url')
      .neq('id', user?.id || '');
    
    if (data) {
      setProfiles(data);
    }
  };

  const handleCreateDM = async (profileId: string, username: string) => {
    if (!user) return;

    // Check if DM already exists
    const { data: existingChannels } = await supabase
      .from('channels')
      .select('id')
      .eq('type', 'dm')
      .contains('dm_users', [user.id, profileId]);

    if (existingChannels && existingChannels.length > 0) {
      toast({
        title: 'DM already exists',
        description: `You already have a conversation with ${username}`,
      });
      onOpenChange(false);
      return;
    }

    const { error } = await supabase.from('channels').insert({
      name: username,
      type: 'dm',
      section: 'Direct messages',
      created_by: user.id,
      dm_users: [user.id, profileId],
    });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to create direct message',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'DM created',
        description: `Started conversation with ${username}`,
      });
      onOpenChange(false);
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.username.toLowerCase().includes(search.toLowerCase()) ||
    p.display_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Direct messages</DialogTitle>
          <DialogDescription>
            Start a conversation with someone
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            placeholder="Search people..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {filteredProfiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => handleCreateDM(profile.id, profile.display_name || profile.username)}
                  className="w-full flex items-center gap-3 p-3 rounded hover:bg-muted transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-lg border border-primary/20 overflow-hidden">
                    {profile.avatar_url ? (
                      <img src={profile.avatar_url} alt={profile.username} className="w-full h-full object-cover" />
                    ) : (
                      '👤'
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold">{profile.display_name || profile.username}</div>
                    {profile.display_name && (
                      <div className="text-sm text-muted-foreground">@{profile.username}</div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
