import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ShieldCheck, RefreshCw, Plug, Webhook, Link as LinkIcon, Loader2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface IntegrationCardAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: "outline" | "ghost" | "secondary" | "destructive" | "default";
  disabled?: boolean;
  loading?: boolean;
}

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
  /** "error" renders a red badge with `errorMessage` as tooltip. */
  status?: "connected" | "error" | "disconnected";
  errorMessage?: string | null;
  /** Overrides for the detail rows (defaults keep the legacy Google Sheets look). */
  accountLabel?: string;
  lastSyncLabel?: string;
  extraLabel?: string;
  extraValue?: string;
  /** Text of the primary button (defaults: Connect / Manage Connection). */
  primaryLabel?: string;
  /** Secondary actions rendered as small buttons under the primary one. */
  actions?: IntegrationCardAction[];
  labels?: {
    connected?: string;
    notConnected?: string;
    error?: string;
    status?: string;
    lastSync?: string;
    account?: string;
  };
}

export function IntegrationCard({
  id,
  title,
  category,
  description,
  icon,
  iconBg,
  isConnected,
  onConnect,
  isConnecting,
  status,
  errorMessage,
  accountLabel,
  lastSyncLabel,
  extraLabel,
  extraValue,
  primaryLabel,
  actions,
  labels,
}: IntegrationCardProps) {
  const isError = status === "error";
  const connectedText = labels?.connected ?? "Connected";
  const notConnectedText = labels?.notConnected ?? "Not Connected";
  const errorText = labels?.error ?? "Needs attention";
  const statusText = isError ? errorText : isConnected ? connectedText : notConnectedText;

  const badge = (
    <Badge
      variant={isError ? "destructive" : isConnected ? "default" : "outline"}
      className={cn("text-xs font-medium", !isConnected && !isError && "text-muted-foreground")}
      data-testid={`badge-integration-status-${id}`}
    >
      {isError && <AlertTriangle className="w-3 h-3 mr-1" />}
      {statusText}
    </Badge>
  );

  return (
    <Card className="flex flex-col overflow-hidden hover-elevate transition-all border-muted/60" data-testid={`card-integration-${id}`}>
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
          {isError && errorMessage ? (
            <Tooltip>
              <TooltipTrigger asChild>{badge}</TooltipTrigger>
              <TooltipContent className="max-w-xs break-words">{errorMessage}</TooltipContent>
            </Tooltip>
          ) : badge}
        </div>
        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          {description}
        </p>
      </CardHeader>
      <CardContent className="py-4 space-y-3 flex-1 bg-background">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShieldCheck className="w-4 h-4" />
            <span>{labels?.status ?? "Status"}</span>
          </div>
          <span className={isError ? "text-destructive font-medium" : isConnected ? "text-foreground font-medium" : "text-muted-foreground"}>
            {statusText}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <RefreshCw className="w-4 h-4" />
            <span>{labels?.lastSync ?? "Last Sync"}</span>
          </div>
          <span className="text-foreground truncate max-w-[55%] text-right">
            {lastSyncLabel ?? (isConnected ? "Just now" : "-")}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Plug className="w-4 h-4" />
            <span>{labels?.account ?? "Connected Account"}</span>
          </div>
          <span className="text-foreground truncate max-w-[55%] text-right" title={accountLabel}>
            {accountLabel ?? (isConnected ? "Active" : "-")}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Webhook className="w-4 h-4" />
            <span>{extraLabel ?? "Webhooks"}</span>
          </div>
          <span className="text-foreground truncate max-w-[55%] text-right">
            {extraValue ?? (isConnected ? "Configured" : "-")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 bg-background border-t mt-auto flex-col items-stretch gap-2">
        <Button
          variant={isConnected ? "outline" : "secondary"}
          className="w-full text-sm font-medium"
          onClick={onConnect}
          disabled={isConnecting}
          data-testid={`button-integration-primary-${id}`}
        >
          {isConnecting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <LinkIcon className="w-4 h-4 mr-2" />
          )}
          {primaryLabel ?? (isConnected ? "Manage Connection" : "Connect")}
        </Button>
        {actions && actions.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {actions.map((action) => (
              <Button
                key={action.key}
                size="sm"
                variant={action.variant ?? "ghost"}
                className="text-xs"
                onClick={action.onClick}
                disabled={action.disabled || action.loading}
                data-testid={`button-integration-${action.key}-${id}`}
              >
                {action.loading ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
