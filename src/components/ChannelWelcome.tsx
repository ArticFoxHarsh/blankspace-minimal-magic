import { motion } from 'framer-motion';
import { Hash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ChannelWelcomeProps {
  channelName: string;
}

export const ChannelWelcome = ({ channelName }: ChannelWelcomeProps) => {
  const templates = [
    {
      title: 'Run a project',
      subtitle: 'Project starter kit template',
      color: 'from-teal-500/20 to-teal-600/20 border-teal-500/30',
    },
    {
      title: 'Chat with your team',
      subtitle: 'Team support template',
      color: 'from-green-500/20 to-green-600/20 border-green-500/30',
    },
    {
      title: 'Collaborate with external partners',
      subtitle: 'External partner template',
      color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30',
    },
    {
      title: 'Invite teammates',
      subtitle: 'Add your whole team',
      color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6 border-2 border-primary/20">
          <Hash className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-black mb-3 flex items-center justify-center gap-2">
          <span className="text-yellow-400">👋</span> Welcome to your first channel!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Channels keep work focused around a specific topic. Pick a template to get started, or{' '}
          <a href="#" className="text-primary hover:underline">
            see all
          </a>
          .
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {templates.map((template, index) => (
          <motion.div
            key={template.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 cursor-pointer hover:scale-[1.02] transition-all border-2 bg-gradient-to-br ${template.color}`}>
              <h3 className="font-bold text-base mb-1">{template.title}</h3>
              <p className="text-sm text-muted-foreground">{template.subtitle}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
