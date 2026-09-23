import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { BellRing, Minus, Plus } from "lucide-react";
import { MAX_WHATSAPP_VARIABLES } from "./types";
import { OWNER_ALERT_FIELDS, OWNER_ALERT_TRIGGERS, type OwnerAlertTrigger, type OwnerAlertsForm } from "./actions";

interface WakiSettings { isActive?: boolean }
interface WakiTemplate { name: string; status?: string; language?: string }
interface ApiList<T> { success: boolean; data: T[] | null }
interface ApiOne<T> { success: boolean; data: T | null }
interface Me { email?: string | null }

interface Props {
  value: OwnerAlertsForm;
  onChange: (patch: Partial<OwnerAlertsForm>) => void;
}

const FIXED = '__fixed__';
const TEXT_PREFIX = 'text:';

function variableCount(vars: Record<string, string>): number {
  return Object.keys(vars).reduce((max, k) => Math.max(max, Number(k) || 0), 0);
}

/**
 * Step 5 · "Notify me after calls" — email and/or WhatsApp to the account owner when a call
 * ends with one of the chosen outcomes. Stored in agents.config.actions.ownerAlerts.
 */
export default function OwnerAlertsSection({ value, onChange }: Props) {
  const { t } = useTranslation();
  const meQ = useQuery<Me>({ queryKey: ["/api/auth/me"], staleTime: 300000 });
  const wantsWhatsapp = value.enabled && value.whatsappPhone.trim().length > 0;
  const wakiSettingsQ = useQuery<ApiOne<WakiSettings>>({ queryKey: ["/api/messaging/whatsway/settings"], staleTime: 60000, enabled: wantsWhatsapp });
  const wakiConnected = !!wakiSettingsQ.data?.data?.isActive;
  const wakiTemplatesQ = useQuery<ApiList<WakiTemplate>>({
    queryKey: ["/api/messaging/whatsway/templates"], staleTime: 60000, enabled: wantsWhatsapp && wakiConnected,
  });
  const templates = wakiTemplatesQ.data?.data || [];

  const triggerLabels: Record<OwnerAlertTrigger, string> = {
    interested: t('agentBuilder.ownerAlerts.trigger.interested', 'Interested lead'),
    appointment_booked: t('agentBuilder.ownerAlerts.trigger.appointment_booked', 'Appointment booked'),
    callback_requested: t('agentBuilder.ownerAlerts.trigger.callback_requested', 'Callback requested'),
    transferred: t('agentBuilder.ownerAlerts.trigger.transferred', 'Call transferred'),
    do_not_call: t('agentBuilder.ownerAlerts.trigger.do_not_call', 'Asked not to be called'),
    all: t('agentBuilder.ownerAlerts.trigger.all', 'Every completed call'),
  };
  const fieldLabels: Record<string, string> = {
    caller_name: t('agentBuilder.ownerAlerts.field.caller_name', 'Caller name'),
    caller_phone: t('agentBuilder.ownerAlerts.field.caller_phone', 'Caller phone'),
    outcome: t('agentBuilder.ownerAlerts.field.outcome', 'Outcome'),
    summary: t('agentBuilder.ownerAlerts.field.summary', 'Call summary'),
    appointment: t('agentBuilder.ownerAlerts.field.appointment', 'Appointment (date & time)'),
    callback: t('agentBuilder.ownerAlerts.field.callback', 'Callback time'),
    agent_name: t('agentBuilder.ownerAlerts.field.agent_name', 'Agent name'),
    call_time: t('agentBuilder.ownerAlerts.field.call_time', 'Call time'),
    duration: t('agentBuilder.ownerAlerts.field.duration', 'Duration'),
    call_link: t('agentBuilder.ownerAlerts.field.call_link', 'Link to the call'),
  };

  const toggleTrigger = (trig: OwnerAlertTrigger, on: boolean) => {
    let next = on ? [...value.triggers, trig] : value.triggers.filter(x => x !== trig);
    if (trig === 'all' && on) next = ['all'];
    else if (on) next = next.filter(x => x !== 'all');
    onChange({ triggers: Array.from(new Set(next)) });
  };

  const count = variableCount(value.whatsappVariables);
  const setCount = (n: number) => {
    const size = Math.max(0, Math.min(MAX_WHATSAPP_VARIABLES, n));
    const out: Record<string, string> = {};
    for (let i = 1; i <= size; i++) out[String(i)] = value.whatsappVariables[String(i)] ?? OWNER_ALERT_FIELDS[Math.min(i - 1, OWNER_ALERT_FIELDS.length - 1)];
    onChange({ whatsappVariables: out });
  };
  const setVariable = (key: string, v: string) => onChange({ whatsappVariables: { ...value.whatsappVariables, [key]: v } });

  return (
    <div className="pt-2" data-testid="owner-alerts-section">
      <div className="flex items-start justify-between gap-4 py-2">
        <div className="space-y-0.5">
          <Label htmlFor="owner-alerts" className="cursor-pointer flex items-center gap-2">
            <BellRing className="h-4 w-4" />{t('agentBuilder.ownerAlerts.toggle', 'Notify me after calls')}
          </Label>
          <p className="text-xs text-muted-foreground">
            {t('agentBuilder.ownerAlerts.hint', 'Get an email or WhatsApp with the outcome, summary and next step as soon as the call ends.')}
          </p>
        </div>
        <Switch
          id="owner-alerts" checked={value.enabled}
          onCheckedChange={(v) => onChange({ enabled: v, email: value.email || (v ? meQ.data?.email || '' : '') })}
          data-testid="switch-owner-alerts"
        />
      </div>

      {value.enabled && (
        <div className="pb-3 space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">{t('agentBuilder.ownerAlerts.when', 'Send when the call ends with')}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {OWNER_ALERT_TRIGGERS.map(trig => (
                <label key={trig} className="flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm cursor-pointer hover:bg-muted/40">
                  <Checkbox
                    checked={value.triggers.includes(trig)}
                    onCheckedChange={(v) => toggleTrigger(trig, v === true)}
                    data-testid={`owner-alert-trigger-${trig}`}
                  />
                  <span>{triggerLabels[trig]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="owner-alert-email" className="text-xs">{t('agentBuilder.ownerAlerts.email', 'Email (comma-separated, up to 3)')}</Label>
              <Input
                id="owner-alert-email" type="text" value={value.email}
                onChange={(e) => onChange({ email: e.target.value })}
                placeholder={meQ.data?.email || 'owner@example.com'}
                data-testid="input-owner-alert-email"
              />
              {!value.email && meQ.data?.email && (
                <button type="button" className="text-[11px] underline text-muted-foreground" onClick={() => onChange({ email: meQ.data?.email || '' })}>
                  {t('agentBuilder.ownerAlerts.useAccountEmail', 'Use my account email')}
                </button>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="owner-alert-phone" className="text-xs">{t('agentBuilder.ownerAlerts.whatsappPhone', 'WhatsApp number')}</Label>
              <Input
                id="owner-alert-phone" type="tel" value={value.whatsappPhone}
                onChange={(e) => onChange({ whatsappPhone: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-owner-alert-phone"
              />
            </div>
          </div>

          {wantsWhatsapp && (
            <div className="space-y-2 rounded-md border bg-muted/30 p-3">
              {wakiSettingsQ.isLoading || wakiTemplatesQ.isLoading ? (
                <Skeleton className="h-9 w-full" />
              ) : !wakiConnected ? (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  {t('agentBuilder.ownerAlerts.wakiNotConnected', 'Connect your Waki account in Settings → Messaging to send WhatsApp alerts; email still works.')}
                </p>
              ) : (
                <>
                  <div className="space-y-1">
                    <Label className="text-xs">{t('agentBuilder.ownerAlerts.template', 'WhatsApp template')}</Label>
                    <Select value={value.whatsappTemplate || undefined} onValueChange={(v) => onChange({ whatsappTemplate: v })}>
                      <SelectTrigger className="h-9" data-testid="select-owner-alert-template">
                        <SelectValue placeholder={t('agentBuilder.ownerAlerts.pickTemplate', 'Pick an approved template')} />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(tpl => (
                          <SelectItem key={`${tpl.name}-${tpl.language || ''}`} value={tpl.name}>
                            <span className="font-mono text-xs">{tpl.name}</span>{tpl.language ? ` · ${tpl.language}` : ''}
                          </SelectItem>
                        ))}
                        {templates.length === 0 && <SelectItem value="__none" disabled>{t('agentBuilder.messaging.noWakiTemplates', 'No approved templates in your Waki account yet.')}</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>

                  {value.whatsappTemplate && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <Label className="text-xs font-medium">{t('agentBuilder.messaging.bodyVariables', 'Body variables')}</Label>
                          <p className="text-[11px] text-muted-foreground">{t('agentBuilder.ownerAlerts.variablesHint', 'What goes into each numbered placeholder of the template.')}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => setCount(count - 1)} disabled={count <= 0} data-testid="owner-alert-vars-minus">
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-6 text-center text-sm tabular-nums">{count}</span>
                          <Button type="button" variant="outline" size="icon" className="h-7 w-7" onClick={() => setCount(count + 1)} disabled={count >= MAX_WHATSAPP_VARIABLES} data-testid="owner-alert-vars-plus">
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      {Array.from({ length: count }, (_, i) => String(i + 1)).map(key => {
                        const raw = value.whatsappVariables[key] || '';
                        const isFixed = raw.startsWith(TEXT_PREFIX);
                        return (
                          <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <span className="font-mono text-xs text-muted-foreground w-10 shrink-0">{`{{${key}}}`}</span>
                            <Select value={isFixed ? FIXED : (raw || undefined)} onValueChange={(v) => setVariable(key, v === FIXED ? TEXT_PREFIX : v)}>
                              <SelectTrigger className="h-8 text-sm sm:w-56" data-testid={`owner-alert-var-${key}`}>
                                <SelectValue placeholder={t('agentBuilder.ownerAlerts.pickField', 'Pick a field')} />
                              </SelectTrigger>
                              <SelectContent>
                                {OWNER_ALERT_FIELDS.map(f => <SelectItem key={f} value={f}>{fieldLabels[f]}</SelectItem>)}
                                <SelectItem value={FIXED}>{t('agentBuilder.messaging.modeFixed', 'Fixed')}</SelectItem>
                              </SelectContent>
                            </Select>
                            {isFixed && (
                              <Input
                                value={raw.slice(TEXT_PREFIX.length)}
                                onChange={(e) => setVariable(key, TEXT_PREFIX + e.target.value)}
                                className="h-8 text-sm"
                                placeholder={t('agentBuilder.messaging.fixedPlaceholder', 'Value to send, e.g. your company name')}
                                data-testid={`owner-alert-var-text-${key}`}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
