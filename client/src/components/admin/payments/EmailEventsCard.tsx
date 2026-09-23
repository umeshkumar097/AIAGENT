/**
 * Admin — transactional email events: per-event toggles, "send test", and the delivery log.
 * GET /api/admin/notifications/events, PUT /events/:key, POST /test/:key, GET /log
 */
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { Bell, ChevronLeft, ChevronRight, Loader2, Mail, RefreshCw, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface NotificationEvent {
  key: string;
  label: string;
  category: string;
  emailEnabled: boolean;
  alwaysOn: boolean;
  inApp: boolean;
  hasTemplate: boolean;
  templateId: string | null;
  variables: string[];
  lastSentAt: string | null;
  sent24h: number;
  failed24h: number;
}

interface LogItem {
  id: string;
  userId: string | null;
  userEmail: string | null;
  userName: string | null;
  eventKey: string;
  channel: "email" | "in_app" | string;
  status: "sent" | "failed" | "skipped" | string;
  recipient: string | null;
  subject: string | null;
  error: string | null;
  createdAt: string;
}

interface LogResponse {
  items: LogItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const EVENTS_KEY = ["/api/admin/notifications/events"];
const LOG_LIMIT = 25;

const STATUS_CLASS: Record<string, string> = {
  sent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  failed: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  skipped: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export function EmailEventsCard() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [testingKey, setTestingKey] = useState<string | null>(null);
  const [logPage, setLogPage] = useState(1);
  const [logEvent, setLogEvent] = useState("all");
  const [logStatus, setLogStatus] = useState("all");
  const [logChannel, setLogChannel] = useState("all");
  const [logSearch, setLogSearch] = useState("");
  const [logSearchInput, setLogSearchInput] = useState("");

  const { data: eventsData, isLoading: eventsLoading } = useQuery<{ events: NotificationEvent[] }>({ queryKey: EVENTS_KEY });
  const events = eventsData?.events || [];

  const logParams = new URLSearchParams({ page: String(logPage), limit: String(LOG_LIMIT) });
  if (logEvent !== "all") logParams.set("eventKey", logEvent);
  if (logStatus !== "all") logParams.set("status", logStatus);
  if (logChannel !== "all") logParams.set("channel", logChannel);
  if (logSearch) logParams.set("search", logSearch);
  const logQueryKey = ["/api/admin/notifications/log", `?${logParams.toString()}`];
  const { data: log, isLoading: logLoading, refetch: refetchLog, isFetching: logFetching } = useQuery<LogResponse>({ queryKey: logQueryKey });

  const toggleMutation = useMutation({
    mutationFn: async ({ key, enabled }: { key: string; enabled: boolean }) => {
      const res = await apiRequest("PUT", `/api/admin/notifications/events/${encodeURIComponent(key)}`, { enabled });
      return res.json();
    },
    onMutate: async ({ key, enabled }) => {
      await queryClient.cancelQueries({ queryKey: EVENTS_KEY });
      const previous = queryClient.getQueryData<{ events: NotificationEvent[] }>(EVENTS_KEY);
      if (previous) {
        queryClient.setQueryData(EVENTS_KEY, { events: previous.events.map((e) => (e.key === key ? { ...e, emailEnabled: enabled } : e)) });
      }
      return { previous };
    },
    onError: (error: Error, _vars, context) => {
      if (context?.previous) queryClient.setQueryData(EVENTS_KEY, context.previous);
      toast({ title: t("admin.notifications.toggleFailed", "Could not update event"), description: error.message, variant: "destructive" });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: EVENTS_KEY }),
  });

  const testMutation = useMutation({
    mutationFn: async (key: string) => {
      setTestingKey(key);
      const res = await apiRequest("POST", `/api/admin/notifications/test/${encodeURIComponent(key)}`);
      return (await res.json()) as { success: boolean; recipient: string; result: { email: string; inApp: string } };
    },
    onSuccess: (data) => {
      toast({
        title: data.success ? t("admin.notifications.testSent", "Test email sent") : t("admin.notifications.testFailed", "Test email failed"),
        description: t("admin.notifications.testResult", "Sent to {{recipient}} — email: {{email}}, in-app: {{inApp}}", { recipient: data.recipient, email: data.result?.email, inApp: data.result?.inApp }),
        variant: data.success ? "default" : "destructive",
      });
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/notifications/log"] });
    },
    onError: (error: Error) => {
      toast({ title: t("admin.notifications.testFailed", "Test email failed"), description: error.message, variant: "destructive" });
    },
    onSettled: () => setTestingKey(null),
  });

  const categories = Array.from(new Set(events.map((e) => e.category)));

  return (
    <Card data-testid="card-email-events">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
            <Mail className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </div>
          <div>
            <CardTitle>{t("admin.notifications.eventsTitle", "Email events")}</CardTitle>
            <CardDescription>{t("admin.notifications.eventsDescription", "Choose which transactional emails are sent. Templates are edited under Communications → Email templates.")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {eventsLoading ? (
          <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="space-y-6">
            {categories.map((category) => (
              <div key={category} className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t(`admin.notifications.category.${category}`, category)}</h4>
                <div className="rounded-lg border divide-y">
                  {events.filter((e) => e.category === category).map((event) => (
                    <div key={event.key} className="flex items-center justify-between gap-4 px-4 py-3" data-testid={`row-event-${event.key}`}>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{event.label}</span>
                          <code className="text-[10px] text-muted-foreground">{event.key}</code>
                          {event.alwaysOn && <Badge variant="outline" className="text-[10px]">{t("admin.notifications.alwaysOn", "Always on")}</Badge>}
                          {event.inApp && <Badge variant="outline" className="text-[10px]"><Bell className="h-3 w-3 mr-1" />{t("admin.notifications.inApp", "In-app")}</Badge>}
                          {!event.hasTemplate && <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300">{t("admin.notifications.noTemplate", "No template")}</Badge>}
                        </div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {t("admin.notifications.stats24h", "Last 24h: {{sent}} sent, {{failed}} failed", { sent: event.sent24h, failed: event.failed24h })}
                          {event.lastSentAt ? ` · ${t("admin.notifications.lastSent", "last sent")} ${format(new Date(event.lastSentAt), "MMM d, HH:mm")}` : ""}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => testMutation.mutate(event.key)} disabled={testingKey !== null} title={t("admin.notifications.sendTestHint", "Send a sample to your own email")} data-testid={`button-test-event-${event.key}`}>
                          {testingKey === event.key ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                          <span className="ml-1 hidden sm:inline">{t("admin.notifications.sendTest", "Send test")}</span>
                        </Button>
                        <Switch
                          checked={event.emailEnabled}
                          disabled={event.alwaysOn || toggleMutation.isPending}
                          onCheckedChange={(checked) => toggleMutation.mutate({ key: event.key, enabled: checked })}
                          data-testid={`switch-event-${event.key}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h4 className="font-semibold flex items-center gap-2">{t("admin.notifications.logTitle", "Delivery log")}</h4>
            <Button variant="ghost" size="sm" onClick={() => refetchLog()} disabled={logFetching} data-testid="button-refresh-log">
              <RefreshCw className={`h-4 w-4 mr-1 ${logFetching ? "animate-spin" : ""}`} />
              {t("common.refresh", "Refresh")}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Input
              value={logSearchInput}
              onChange={(e) => setLogSearchInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { setLogSearch(logSearchInput.trim()); setLogPage(1); } }}
              placeholder={t("admin.notifications.searchLog", "Search recipient or subject…")}
              className="w-60"
              data-testid="input-log-search"
            />
            <Select value={logEvent} onValueChange={(v) => { setLogEvent(v); setLogPage(1); }}>
              <SelectTrigger className="w-52" data-testid="select-log-event"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.notifications.allEvents", "All events")}</SelectItem>
                {events.map((e) => <SelectItem key={e.key} value={e.key}>{e.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={logStatus} onValueChange={(v) => { setLogStatus(v); setLogPage(1); }}>
              <SelectTrigger className="w-36" data-testid="select-log-status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.notifications.allStatuses", "All statuses")}</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="skipped">Skipped</SelectItem>
              </SelectContent>
            </Select>
            <Select value={logChannel} onValueChange={(v) => { setLogChannel(v); setLogPage(1); }}>
              <SelectTrigger className="w-36" data-testid="select-log-channel"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("admin.notifications.allChannels", "All channels")}</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="in_app">In-app</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {logLoading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : !log || log.items.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">{t("admin.notifications.logEmpty", "No notifications logged yet.")}</p>
          ) : (
            <>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("admin.notifications.colTime", "Time")}</TableHead>
                      <TableHead>{t("admin.notifications.colEvent", "Event")}</TableHead>
                      <TableHead>{t("admin.notifications.colChannel", "Channel")}</TableHead>
                      <TableHead>{t("admin.notifications.colRecipient", "Recipient")}</TableHead>
                      <TableHead>{t("admin.notifications.colSubject", "Subject")}</TableHead>
                      <TableHead>{t("admin.notifications.colStatus", "Status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {log.items.map((item) => (
                      <TableRow key={item.id} data-testid={`row-log-${item.id}`}>
                        <TableCell className="whitespace-nowrap text-xs">{format(new Date(item.createdAt), "MMM d, HH:mm:ss")}</TableCell>
                        <TableCell><code className="text-xs">{item.eventKey}</code></TableCell>
                        <TableCell className="text-xs">{item.channel === "in_app" ? "In-app" : "Email"}</TableCell>
                        <TableCell className="text-xs">
                          <div>{item.recipient || item.userEmail || "-"}</div>
                          {item.userName && <div className="text-muted-foreground">{item.userName}</div>}
                        </TableCell>
                        <TableCell className="text-xs max-w-[240px] truncate" title={item.subject || undefined}>{item.subject || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={STATUS_CLASS[item.status] || ""}>{item.status}</Badge>
                          {item.error && <div className="text-[10px] text-red-600 max-w-[200px] truncate" title={item.error}>{item.error}</div>}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {log.totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{log.total} {t("admin.notifications.entries", "entries")}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setLogPage((p) => Math.max(1, p - 1))} disabled={logPage <= 1}><ChevronLeft className="h-4 w-4" /></Button>
                    <span className="text-xs text-muted-foreground">{logPage} / {log.totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setLogPage((p) => Math.min(log.totalPages, p + 1))} disabled={logPage >= log.totalPages}><ChevronRight className="h-4 w-4" /></Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
