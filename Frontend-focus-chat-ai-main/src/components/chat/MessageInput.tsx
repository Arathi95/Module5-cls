import { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6">
      <div className="flex space-x-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={disabled}
            className="pr-12 py-3 text-base bg-background border-input focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-xl shadow-sm transition-all"
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="lg"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MessageInput;