import { useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { PDFModal } from "./PDFModal";
import { Scale, Gavel } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Citation {
  text: string;
  source: string;
  link: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

export function LegalAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const { toast } = useToast();

  // Simulated API response for the legal query
  const simulateAPIResponse = (query: string) => {
    return new Promise<{ answer: string; citations: Citation[] }>((resolve) => {
      setTimeout(() => {
        resolve({
          answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
          citations: [
            {
              text: "as the age of the deceased at the time of accident was held to be about 54-55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
              source: "Dani_Devi_v_Pritam_Singh.pdf",
              link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz"
            }
          ]
        });
      }, 2000); // Simulate API delay
    });
  };

  const handleQuerySubmit = async (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await simulateAPIResponse(query);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.answer,
        citations: response.citations,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      toast({
        title: "Legal Analysis Complete",
        description: "Found relevant legal precedents and citations.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your legal query. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
    setIsPDFModalOpen(true);
    
    toast({
      title: "Opening Citation",
      description: `Loading ${citation.source}...`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Lexi Legal Assistant</h1>
              <p className="text-sm text-muted-foreground">AI-powered legal research with cited precedents</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center space-y-6 max-w-2xl mx-auto px-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <Gavel className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">
                  Welcome to Lexi Legal Assistant
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Ask legal questions and get AI-powered answers with citations from real legal documents. 
                  Our assistant can help with case law research, statutory interpretation, and legal precedents.
                </p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 text-left shadow-card">
                <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4" />
                  Try this example:
                </h3>
                <p className="text-sm text-muted-foreground italic">
                  "In a motor accident claim where the deceased was self-employed and aged 54–55 years at the time of death, 
                  is the claimant entitled to an addition towards future prospects in computing compensation under Section 166 
                  of the Motor Vehicles Act, 1988? If so, how much?"
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                type={message.type}
                content={message.content}
                citations={message.citations}
                onCitationClick={handleCitationClick}
              />
            ))}
            {isLoading && (
              <ChatMessage
                type="assistant"
                content=""
                isLoading={true}
              />
            )}
          </div>
        )}
      </main>

      {/* Chat Input */}
      <ChatInput
        onSubmit={handleQuerySubmit}
        isLoading={isLoading}
        placeholder="Ask a legal question... (e.g., motor vehicle accident compensation, employment law, contract disputes)"
      />

      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        citation={selectedCitation}
      />
    </div>
  );
}