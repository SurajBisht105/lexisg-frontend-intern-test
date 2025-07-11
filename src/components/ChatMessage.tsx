import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, FileText, User, Scale } from "lucide-react";

interface Citation {
  text: string;
  source: string;
  link: string;
}

interface ChatMessageProps {
  type: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  onCitationClick?: (citation: Citation) => void;
  isLoading?: boolean;
}

export function ChatMessage({ 
  type, 
  content, 
  citations, 
  onCitationClick,
  isLoading 
}: ChatMessageProps) {
  return (
    <div className={`flex gap-4 max-w-4xl mx-auto p-6 animate-slide-up ${
      type === 'user' ? 'justify-end' : 'justify-start'
    }`}>
      {type === 'assistant' && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Scale className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}
      
      <div className={`flex-1 ${type === 'user' ? 'max-w-lg' : 'max-w-3xl'}`}>
        <Card className={`p-4 ${
          type === 'user' 
            ? 'bg-chat-user text-chat-user-foreground ml-auto' 
            : 'bg-chat-assistant text-chat-assistant-foreground shadow-card'
        }`}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
              <span className="text-muted-foreground">Analyzing legal query...</span>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
            </div>
          )}
        </Card>

        {citations && citations.length > 0 && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Legal Citations
            </h4>
            {citations.map((citation, index) => (
              <Card 
                key={index} 
                className="p-3 bg-citation-bg border-citation-border hover:bg-citation-hover transition-all duration-200 cursor-pointer group"
                onClick={() => onCitationClick?.(citation)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <blockquote className="text-sm italic text-foreground/90 mb-2 border-l-2 border-primary/30 pl-3">
                      "{citation.text}"
                    </blockquote>
                    <Button 
                      variant="citation" 
                      size="sm"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCitationClick?.(citation);
                      }}
                    >
                      <FileText className="w-3 h-3" />
                      {citation.source}
                      <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {type === 'user' && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
}