const TypingIndicator = () => {
  return (
    <div className="bg-chat-ai-bg border border-chat-border rounded-2xl rounded-bl-md mr-4 px-5 py-4 shadow-md">
      <div className="flex items-center space-x-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-primary rounded-full typing-dot"></div>
        </div>
        <span className="text-sm text-muted-foreground font-medium">AI is typing...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;