import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, X, FileText } from "lucide-react";

interface Citation {
  text: string;
  source: string;
  link: string;
}

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  citation: Citation | null;
}

export function PDFModal({ isOpen, onClose, citation }: PDFModalProps) {
  const handleOpenInNewTab = () => {
    if (citation?.link) {
      window.open(citation.link, '_blank');
    }
  };

  if (!citation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  {citation.source}
                </DialogTitle>
                <DialogDescription>
                  Legal Document Citation
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleOpenInNewTab}
                className="gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onClose}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6 pt-4">
          <div className="bg-citation-bg border border-citation-border rounded-lg p-4 mb-4">
            <h4 className="text-sm font-semibold text-primary mb-2">Referenced Text:</h4>
            <blockquote className="text-sm italic border-l-2 border-primary/30 pl-3">
              "{citation.text}"
            </blockquote>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 h-full min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">PDF Viewer</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  In a production environment, this would display the PDF document 
                  with the relevant paragraph highlighted and scrolled into view.
                </p>
                <Button 
                  variant="professional"
                  onClick={handleOpenInNewTab}
                  className="gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Document
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}