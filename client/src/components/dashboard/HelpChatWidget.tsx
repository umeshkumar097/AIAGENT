import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, MinusCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { useBranding } from "@/components/BrandingProvider";
import ReactMarkdown from 'react-markdown';

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

export function HelpChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm the Zonvo AI Help Agent. How can I assist you with your dashboard today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { branding } = useBranding();

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    
    // Add user message to state
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/help-agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to help agent");
      }

      if (!response.body) throw new Error("No response body");

      // Add empty assistant message to stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.slice(6);
              if (dataStr === "[DONE]") {
                break;
              }
              try {
                const data = JSON.parse(dataStr);
                if (data.text) {
                  setMessages((prev) => {
                    const updated = [...prev];
                    const lastMsg = updated[updated.length - 1];
                    if (lastMsg.role === "assistant") {
                      lastMsg.content += data.text;
                    }
                    return updated;
                  });
                } else if (data.error) {
                  setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${data.error}` }]);
                }
              } catch (e) {
                // Ignore parse errors for partial chunks
              }
            }
          }
        }
      }
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I encountered an error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <Card className="w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col shadow-2xl mb-4 border-primary/20 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold text-sm">{branding.app_name} Help</h3>
                <p className="text-[10px] opacity-80 leading-none">AI Support Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/20" onClick={() => setIsOpen(false)}>
                <MinusCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Area */}
          <ScrollArea className="flex-1 p-4 bg-muted/30" viewportRef={scrollRef}>
            <div className="flex flex-col gap-3">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col max-w-[85%] ${msg.role === "user" ? "self-end items-end" : "self-start items-start"}`}
                >
                  <div 
                    className={`px-3 py-2 rounded-lg text-sm ${
                      msg.role === "user" 
                        ? "bg-primary text-primary-foreground rounded-br-none" 
                        : "bg-background border shadow-sm rounded-bl-none text-foreground"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <span className="whitespace-pre-wrap">{msg.content}</span>
                    ) : (
                      <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-muted prose-pre:text-muted-foreground">
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="self-start flex items-center gap-2 text-muted-foreground text-xs px-1">
                  <Loader2 className="h-3 w-3 animate-spin" /> typing...
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-3 border-t bg-background">
            <div className="relative flex items-center">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                className="pr-10 rounded-full border-muted-foreground/30 focus-visible:ring-primary/50"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSend} 
                disabled={!inputValue.trim() || isLoading}
                size="icon" 
                className="absolute right-1 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[9px] text-muted-foreground font-medium">Powered by Azure OpenAI</p>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
