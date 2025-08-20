import { AgentType } from '@/types/chat';

interface AgentBadgeProps {
  agentType: AgentType;
}

const AgentBadge = ({ agentType }: AgentBadgeProps) => {
  const getBadgeColor = (type: AgentType) => {
    switch (type) {
      case 'General Support':
        return 'bg-badge-general text-white';
      case 'Product Specialist':
        return 'bg-badge-product text-white';
      case 'Technical Support':
        return 'bg-badge-technical text-white';
      default:
        return 'bg-badge-general text-white';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${getBadgeColor(agentType).replace('text-white', '').trim()}`}></div>
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase ${getBadgeColor(agentType)} shadow-sm`}>
        {agentType}
      </span>
    </div>
  );
};

export default AgentBadge;