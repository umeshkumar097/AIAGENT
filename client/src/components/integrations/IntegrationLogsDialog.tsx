import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, RefreshCw } from "lucide-react";
import {
  PROVIDER_META,
  integrationErrorMessage,
  providerPath,
  type IntegrationProviderKey,
  type IntegrationSyncLog,
} from "@/lib/integrations";

interface IntegrationLogsDialogProps {
  provider: IntegrationProviderKey | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type LogsResponse = { logs: IntegrationSyncLog[] } | IntegrationSyncLog[];

function normalizeLogs(data: LogsResponse | undefined): IntegrationSyncLog[] {
  if (!data) return [];
  return Array.isArray(data) ? data : data.logs ?? [];
}

function statusVariant(status: IntegrationSyncLog["status"]): "default" | "destructive" | "outline" {
  if (status === "success") return "default";
  if (status === "failed") return "destructive";
  return "outline";
}

export function IntegrationLogsDialog({ provider, open, onOpenChange }: IntegrationLogsDialogProps) {
  const { t } = useTranslation();
  const meta = provider ? PROVIDER_META[provider] : null;

  const logsQuery = useQuery<LogsResponse>({
    queryKey: [provider ? providerPath(provider, "/logs?limit=50") : "/api/integrations/none/logs"],
    enabled: open && !!provider,
    retry: false,
    staleTime: 0,
  });
  const logs = normalizeLogs(logsQuery.data);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {t("integrations.providers.logs.title", { defaultValue: "{{provider}} sync log", provider: meta?.title ?? "" })}
          </DialogTitle>
          <DialogDescription>
            {t("integrations.providers.logs.description", "Recent events pushed to this integration and their result.")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button size="sm" variant="ghost" onClick={() => logsQuery.refetch()} disabled={logsQuery.isFetching}>
            {logsQuery.isFetching ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5 mr-1" />}
            {t("common.refresh", "Refresh")}
          </Button>
        </div>
        <ScrollArea className="max-h-[60vh] rounded-md border">
          {logsQuery.isLoading ? (
            <div className="flex items-center justify-center p-8 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : logsQuery.isError ? (
            <p className="p-6 text-sm text-destructive">
              {integrationErrorMessage(logsQuery.error, t("integrations.providers.logs.loadFailed", "Could not load the sync log."))}
            </p>
          ) : logs.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground text-center">
              {t("integrations.providers.logs.empty", "Nothing has been synced yet.")}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("integrations.providers.logs.when", "When")}</TableHead>
                  <TableHead>{t("integrations.providers.logs.event", "Event")}</TableHead>
                  <TableHead>{t("integrations.providers.logs.action", "Action")}</TableHead>
                  <TableHead>{t("integrations.providers.logs.status", "Status")}</TableHead>
                  <TableHead>{t("integrations.providers.logs.details", "Details")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={String(log.id)} data-testid={`row-integration-log-${log.id}`}>
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {log.createdAt ? formatDistanceToNow(new Date(log.createdAt), { addSuffix: true }) : "-"}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{log.event}</TableCell>
                    <TableCell className="text-xs">{log.action || "-"}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(log.status)} className="text-[10px]">
                        {log.status === "success"
                          ? t("integrations.logs.success", "Success")
                          : log.status === "failed"
                            ? t("integrations.logs.failed", "Failed")
                            : t("integrations.providers.logs.skipped", "Skipped")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-[240px]">
                      {log.error ? (
                        <span className="text-destructive break-words" title={log.error}>{log.error}</span>
                      ) : log.externalId ? (
                        <span className="font-mono text-muted-foreground truncate block" title={log.externalId}>{log.externalId}</span>
                      ) : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
