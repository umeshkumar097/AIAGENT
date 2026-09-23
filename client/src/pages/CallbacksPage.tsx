/**
 * Scheduled callbacks — times the agent (or the user) booked for the platform to call a contact back.
 */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarClock, Loader2, Plus, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  CALLBACK_STATUSES, callbacksQueryKey, cancelCallback, createCallback, invalidateCallbacks,
  type CallbacksListResponse, type ScheduledCallback,
} from "@/lib/callbacks";

interface AgentOption { id: string; name: string; telephonyProvider: string | null }
const BUILDER_ENGINES = ['plivo', 'sarvam-plivo'];

function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation();
  const cls: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    calling: "bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20",
    completed: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    failed: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
    cancelled: "bg-slate-500/10 text-slate-700 dark:text-slate-400 border-slate-500/20",
  };
  const label: Record<string, string> = {
    pending: t('callbacks.status.pending', 'Pending'), calling: t('callbacks.status.calling', 'Calling'),
    completed: t('callbacks.status.completed', 'Called'), failed: t('callbacks.status.failed', 'Failed'),
    cancelled: t('callbacks.status.cancelled', 'Cancelled'),
  };
  return cls[status] ? <Badge className={cls[status]}>{label[status]}</Badge> : <Badge variant="outline">{status}</Badge>;
}

/** Local datetime-local string one hour from now, rounded to 15 min. */
function defaultWhen(): string {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  d.setMinutes(Math.ceil(d.getMinutes() / 15) * 15, 0, 0);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function ScheduleDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [agentId, setAgentId] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [when, setWhen] = useState(defaultWhen);
  const [reason, setReason] = useState('');
  const { data: agents = [] } = useQuery<AgentOption[]>({ queryKey: ["/api/agents"], enabled: open });
  const options = agents.filter(a => BUILDER_ENGINES.includes(a.telephonyProvider || ''));

  const whenDate = new Date(when);
  const valid = !!agentId && /^\+?[0-9\s-]{8,20}$/.test(phone.trim()) && !Number.isNaN(whenDate.getTime()) && whenDate.getTime() > Date.now();

  const create = useMutation({
    mutationFn: () => createCallback({
      contactPhone: phone.trim(), contactName: name.trim() || undefined, agentId,
      scheduledAt: whenDate.toISOString(), reason: reason.trim() || undefined,
    }),
    onSuccess: () => {
      invalidateCallbacks();
      toast({ title: t('callbacks.scheduledTitle', 'Callback scheduled'), description: format(whenDate, 'dd MMM yyyy, HH:mm') });
      onOpenChange(false);
      setPhone(''); setName(''); setReason(''); setWhen(defaultWhen());
    },
    onError: (e: Error) => toast({ title: t('callbacks.scheduleFailed', 'Could not schedule the callback'), description: e.message, variant: 'destructive' }),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" data-testid="schedule-callback-dialog">
        <DialogHeader>
          <DialogTitle>{t('callbacks.scheduleTitle', 'Schedule a callback')}</DialogTitle>
          <DialogDescription>{t('callbacks.scheduleDesc', 'The chosen agent will call this number at the time you pick.')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs">{t('callbacks.agent', 'Agent')}</Label>
            <Select value={agentId} onValueChange={setAgentId}>
              <SelectTrigger data-testid="select-callback-agent"><SelectValue placeholder={t('callbacks.pickAgent', 'Pick an agent')} /></SelectTrigger>
              <SelectContent>{options.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}</SelectContent>
            </Select>
            {agents.length > 0 && options.length === 0 && (
              <p className="text-xs text-muted-foreground">{t('callbacks.noPlivoAgents', 'Only Plivo / Sarvam agents can place callbacks.')}</p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="cb-phone" className="text-xs">{t('callbacks.phone', 'Phone number')}</Label>
              <Input id="cb-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" data-testid="input-callback-phone" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="cb-name" className="text-xs">{t('callbacks.name', 'Name (optional)')}</Label>
              <Input id="cb-name" value={name} maxLength={100} onChange={(e) => setName(e.target.value)} data-testid="input-callback-name" />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="cb-when" className="text-xs">{t('callbacks.when', 'When (your local time)')}</Label>
            <Input id="cb-when" type="datetime-local" value={when} min={defaultWhen().slice(0, 16)} onChange={(e) => setWhen(e.target.value)} data-testid="input-callback-when" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="cb-reason" className="text-xs">{t('callbacks.reason', 'Reason (optional)')}</Label>
            <Textarea id="cb-reason" value={reason} maxLength={500} onChange={(e) => setReason(e.target.value)} className="min-h-[60px]" placeholder={t('callbacks.reasonPlaceholder', 'What the call is about — the agent hears this.')} data-testid="input-callback-reason" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel', 'Cancel')}</Button>
          <Button onClick={() => create.mutate()} disabled={!valid || create.isPending} data-testid="button-schedule-callback">
            {create.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}{t('callbacks.schedule', 'Schedule')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function CallbacksPage() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [status, setStatus] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, isLoading, isError } = useQuery<CallbacksListResponse>({ queryKey: callbacksQueryKey(status), staleTime: 30000 });
  const rows: ScheduledCallback[] = data?.callbacks || [];

  const cancel = useMutation({
    mutationFn: (id: string) => cancelCallback(id),
    onSuccess: () => { invalidateCallbacks(); toast({ title: t('callbacks.cancelledTitle', 'Callback cancelled') }); },
    onError: (e: Error) => toast({ title: t('callbacks.cancelFailed', 'Could not cancel'), description: e.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><CalendarClock className="h-5 w-5 text-primary" /></div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" data-testid="text-page-title">{t('callbacks.title', 'Callbacks')}</h1>
            <p className="text-muted-foreground text-sm">{t('callbacks.subtitle', 'Return calls your agents promised — placed automatically at the agreed time.')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-36" data-testid="select-callback-status"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('callbacks.allStatuses', 'All statuses')}</SelectItem>
              {CALLBACK_STATUSES.map(s => <SelectItem key={s} value={s}>{t(`callbacks.status.${s}`, s)}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={() => setDialogOpen(true)} data-testid="button-new-callback"><Plus className="h-4 w-4 mr-2" />{t('callbacks.scheduleTitle', 'Schedule a callback')}</Button>
        </div>
      </div>

      <Card>
        {isLoading ? (
          <div className="p-4 space-y-2"><Skeleton className="h-9 w-full" /><Skeleton className="h-9 w-full" /><Skeleton className="h-9 w-full" /></div>
        ) : isError ? (
          <p className="p-6 text-sm text-destructive">{t('callbacks.loadFailed', 'Could not load callbacks right now.')}</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-sm text-center text-muted-foreground">{t('callbacks.empty', 'No callbacks yet. Turn on "Schedule a callback" in an agent, or schedule one here.')}</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('callbacks.contact', 'Contact')}</TableHead>
                  <TableHead>{t('callbacks.whenCol', 'When')}</TableHead>
                  <TableHead>{t('callbacks.reason', 'Reason')}</TableHead>
                  <TableHead>{t('callbacks.agent', 'Agent')}</TableHead>
                  <TableHead>{t('callbacks.statusCol', 'Status')}</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(cb => (
                  <TableRow key={cb.id} data-testid={`callback-row-${cb.id}`}>
                    <TableCell>
                      <div className="font-medium">{cb.contactName || '—'}</div>
                      <div className="text-xs text-muted-foreground font-mono">{cb.contactPhone}</div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div>{format(new Date(cb.scheduledAt), 'dd MMM yyyy, HH:mm')}</div>
                      <div className="text-xs text-muted-foreground">{cb.timeZone}</div>
                    </TableCell>
                    <TableCell className="max-w-[16rem]">
                      <span className="line-clamp-2 text-sm">{cb.reason || '—'}</span>
                      {cb.status === 'failed' && cb.lastError && <span className="block text-xs text-destructive truncate" title={cb.lastError}>{cb.lastError}</span>}
                    </TableCell>
                    <TableCell className="text-sm">{cb.agentName || '—'}</TableCell>
                    <TableCell>
                      <StatusBadge status={cb.status} />
                      {cb.attempts > 1 && <span className="ml-1 text-xs text-muted-foreground">×{cb.attempts}</span>}
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {cb.resultCallId && (
                        <Link href={`/app/calls/${cb.resultCallId}`} className="text-xs underline mr-3" data-testid={`callback-call-${cb.id}`}>{t('callbacks.viewCall', 'View call')}</Link>
                      )}
                      {cb.status === 'pending' && (
                        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => cancel.mutate(cb.id)} disabled={cancel.isPending} data-testid={`callback-cancel-${cb.id}`}>
                          <XCircle className="h-4 w-4 mr-1" />{t('common.cancel', 'Cancel')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <ScheduleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}
