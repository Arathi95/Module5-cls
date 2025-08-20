import { Copy, Check } from 'lucide-react';
import { Message } from '@/types/chat';
import AgentBadge from './AgentBadge';
import { useState } from 'react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.sender === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-[85%] md:max-w-[75%] ${isUser ? 'order-2' : 'order-1'}`}>
        {!isUser && message.agentType && (
          <div className="mb-2">
            <AgentBadge agentType={message.agentType} />
          </div>
        )}
        <div
          className={`relative rounded-2xl px-5 py-4 shadow-md transition-all duration-200 hover:shadow-lg ${
            isUser
              ? 'bg-chat-user-bg text-chat-user-text rounded-br-md ml-4'
              : 'bg-chat-ai-bg text-chat-ai-text border border-chat-border rounded-bl-md mr-4'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          
          <div className={`flex items-center justify-between mt-3 pt-2 border-t ${
            isUser 
              ? 'border-chat-user-text/10' 
              : 'border-chat-border'
          }`}>
            <span className={`text-xs font-medium ${
              isUser ? 'text-chat-user-text/80' : 'text-muted-foreground'
            }`}>
              {formatTime(message.timestamp)}
            </span>
            
            {!isUser && (
              <button
                onClick={handleCopy}
                className="ml-3 p-1.5 rounded-lg hover:bg-muted/60 transition-all duration-200 group"
                title="Copy message"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-badge-product" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;