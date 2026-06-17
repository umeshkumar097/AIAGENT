import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, RefreshCw, Plug, Webhook, Link as LinkIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IntegrationCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  isConnected: boolean;
  onConnect: () => void;
  isConnecting?: boolean;
}

export function IntegrationCard({
  title,
  category,
  description,
  icon,
  iconBg,
  isConnected,
  onConnect,
  isConnecting
}: IntegrationCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden hover-elevate transition-all border-muted/60">
      <CardHeader className="pb-4 border-b bg-muted/20">
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
              {icon}
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              <CardDescription className="text-xs mt-0.5">{category}</CardDescription>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "outline"} className={cn("text-xs font-medium", !isConnected && "text-muted-foreground")}>
            {isConnected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          {description}
        </p>
      </CardHeader>
      <CardContent className="py-4 space-y-3 flex-1 bg-background">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span>Status</span>
          </div>
          <span className={isConnected ? "text-foreground font-medium" : "text-muted-foreground"}>
            {isConnected ? "Connected" : "Not Connected"}
          </span >
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>Last Sync</span>
          </div>
          <span className="text-foreground">{isConnected ? "Just now" : "-"}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plug className="w-4 h-4" />
            <span>Connected Account</span>
          </div>
          <span className="text-foreground">{isConnected ? "Active" : "-"}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Webhook className="w-4 h-4" />
            <span>Webhooks</span>
          </div>
          <span className="text-foreground">{isConnected ? "Configured" : "-"}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 bg-background border-t mt-auto">
        <Button 
          variant={isConnected ? "outline" : "secondary"} 
          className="w-full text-sm font-medium" 
          onClick={onConnect}
          disabled={isConnecting}
        >
          {isConnecting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <LinkIcon className="w-4 h-4 mr-2" />
          )}
          {isConnected ? "Manage Connection" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
}
