import { WorkspaceSidebar } from '@/components/WorkspaceSidebar';
import { MessageArea } from '@/components/MessageArea';

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <WorkspaceSidebar />
      <MessageArea />
    </div>
  );
};

export default Index;
