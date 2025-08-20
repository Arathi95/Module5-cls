import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message, ChatResponse, AgentType } from '@/types/chat';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<ChatResponse>('http://127.0.0.1:8000/chat', {
  query: content
});
    
  
      

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.message,
        sender: 'ai',
        timestamp: new Date(),
        agentType: response.data.agent_type as AgentType
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to connect to AI support. Please check your connection and try again.');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const retryLastMessage = () => {
    const lastUserMessage = messages.filter(m => m.sender === 'user').pop();
    if (lastUserMessage) {
      sendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Professional Header */}
      <header className="border-b border-border bg-chat-header-bg px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">AI Customer Support</h1>
              <p className="text-sm text-muted-foreground">General Support • Product Information • Technical Help</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="flex items-center space-x-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Clear Chat</span>
            </Button>
          )}
        </div>
      </header>

      {/* Professional Chat Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 && (
            <div className="text-center py-16">
              <div className="p-4 bg-primary/10 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">Welcome to AI Customer Support</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Get instant help with your questions. Our AI agents specialize in different areas to provide you with the best support.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-badge-general/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <div className="w-4 h-4 bg-badge-general rounded-full"></div>
                  </div>
                  <h3 className="font-medium text-sm text-foreground mb-1">General Support</h3>
                  <p className="text-xs text-muted-foreground">Account questions and general inquiries</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-badge-product/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <div className="w-4 h-4 bg-badge-product rounded-full"></div>
                  </div>
                  <h3 className="font-medium text-sm text-foreground mb-1">Product Specialist</h3>
                  <p className="text-xs text-muted-foreground">Product information and specifications</p>
                </div>
                <div className="p-4 bg-card border border-border rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-badge-technical/10 rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <div className="w-4 h-4 bg-badge-technical rounded-full"></div>
                  </div>
                  <h3 className="font-medium text-sm text-foreground mb-1">Technical Support</h3>
                  <p className="text-xs text-muted-foreground">Troubleshooting and technical help</p>
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className="message-enter">
              <MessageBubble message={message} />
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] md:max-w-[70%]">
                <TypingIndicator />
              </div>
            </div>
          )}

          {error && (
            <div className="message-enter">
              <ErrorMessage message={error} onRetry={retryLastMessage} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Professional Message Input */}
      <footer className="border-t border-border bg-chat-header-bg">
        <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
};

export default ChatInterface;