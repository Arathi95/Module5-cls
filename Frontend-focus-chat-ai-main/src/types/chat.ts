export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  agentType?: AgentType;
}

export type AgentType = 'General Support' | 'Product Specialist' | 'Technical Support';

export interface ChatResponse {
  message: string;
  agent_type: string;
}