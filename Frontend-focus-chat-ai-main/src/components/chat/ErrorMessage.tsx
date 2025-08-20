import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-destructive/5 border border-destructive/20 rounded-xl mx-4 my-4 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="p-1 bg-destructive/10 rounded-full">
          <AlertCircle className="h-4 w-4 text-destructive" />
        </div>
        <span className="text-sm text-destructive font-medium">{message}</span>
      </div>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive"
        >
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;