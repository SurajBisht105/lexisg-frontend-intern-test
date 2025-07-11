import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export function ChatInput({ 
  onSubmit, 
  isLoading = false, 
  placeholder = "Ask a legal question..." 
}: ChatInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-4 shadow-lg">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <div className="flex-1">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="min-h-[60px] resize-none border-0 focus:ring-0 focus-visible:ring-0 text-sm leading-relaxed"
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col justify-end">
              <Button
                type="submit"
                variant="professional"
                size="lg"
                disabled={!query.trim() || isLoading}
                className="h-[60px] px-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </div>
          </form>
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </Card>
      </div>
    </div>
  );
}