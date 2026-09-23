import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, ExternalLink, Mail, MessageSquare, X } from "lucide-react";
import WhatsappVariablesEditor from "./WhatsappVariablesEditor";
import type { AgentBuilderForm, WhatsappTemplateVariables } from "./types";

export const MESSAGING_SETTINGS_URL = '/app/settings?tab=messaging';

interface EmailTemplate { id: string; name: string; subject?: string; variables?: string[]; isActive?: boolean }
interface WakiSettings { isActive?: boolean }
interface WakiTemplate { name: string; status?: string; language?: string }
interface ApiList<T> { success: boolean; data: T[] | null }
interface ApiOne<T> { success: boolean; data: T | null }

interface Props {
  form: AgentBuilderForm;
  onChange: (patch: Partial<AgentBuilderForm>) => void;
}

function ToggleRow({ id, icon, label, hint, checked, onCheckedChange }: {
  id: string; icon: React.ReactNode; label: string; hint: string; checked: boolean; onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="cursor-pointer flex items-center gap-2">{icon}{label}</Label>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} data-testid={`switch-${id}`} />
    </div>
  );
}

function SettingsLink({ label }: { label: string }) {
  return (
    <Link href={MESSAGING_SETTINGS_URL} className="inline-flex items-center gap-1 underline text-xs">
      {label}<ExternalLink className="h-3 w-3" />
    </Link>
  );
}

function toggle(list: string[], name: string, on: boolean): string[] {
  return on ? (list.includes(name) ? list : [...list, name]) : list.filter(x => x !== name);
}

/** Selected names that no longer exist upstream — shown so the user can drop them. */
function MissingTemplates({ names, onRemove }: { names: string[]; onRemove: (name: string) => void }) {
  const { t } = useTranslation();
  if (names.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
      <span>{t('agentBuilder.messaging.missingTemplates', 'No longer available:')}</span>
      {names.map(n => (
        <button
          key={n} type="button" onClick={() => onRemove(n)}
          className="inline-flex items-center gap-1 rounded border border-current/40 px-1.5 py-0.5 font-mono hover:bg-muted"
          title={t('agentBuilder.messaging.removeTemplate', 'Remove')}
          data-testid={`missing-template-${n}`}
        >
          {n}<X className="h-3 w-3" />
        </button>
      ))}
    </div>
  );
}

export default function MessagingSection({ form, onChange }: Props) {
  const { t } = useTranslation();

  const emailQ = useQuery<ApiList<EmailTemplate>>({
    queryKey: ["/api/messaging/email-templates"], staleTime: 60000, enabled: form.messagingEmailEnabled,
  });
  const wakiSettingsQ = useQuery<ApiOne<WakiSettings>>({
    queryKey: ["/api/messaging/whatsway/settings"], staleTime: 60000, enabled: form.messagingWhatsappEnabled,
  });
  const wakiConnected = !!wakiSettingsQ.data?.data?.isActive;
  const wakiTemplatesQ = useQuery<ApiList<WakiTemplate>>({
    queryKey: ["/api/messaging/whatsway/templates"], staleTime: 60000, enabled: form.messagingWhatsappEnabled && wakiConnected,
  });

  const emailTemplates = (emailQ.data?.data || []).filter(tpl => tpl.isActive !== false);
  const wakiTemplates = wakiTemplatesQ.data?.data || [];
  const missingEmail = form.messagingEmailTemplates.filter(n => emailQ.isSuccess && !emailTemplates.some(tpl => tpl.name === n));
  const missingWa = form.messagingWhatsappTemplates.filter(n => wakiTemplatesQ.isSuccess && !wakiTemplates.some(tpl => tpl.name === n));

  const setTemplateVars = (name: string, vars: WhatsappTemplateVariables) =>
    onChange({ messagingWhatsappVariables: { ...form.messagingWhatsappVariables, [name]: vars } });

  const anyTemplateNote = t('agentBuilder.messaging.anyTemplate', 'Nothing selected = the agent may use any template.');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">5 · {t('agentBuilder.messaging.title', 'WhatsApp & Email')}</CardTitle>
        <CardDescription>
          {t('agentBuilder.messaging.desc', 'Optional. During the call the agent picks the right template itself and fills in the details it collected.')}
        </CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        {/* ── Email ─────────────────────────────────────────────────────── */}
        <div>
          <ToggleRow
            id="messaging-email"
            icon={<Mail className="h-4 w-4" />}
            label={t('agentBuilder.messaging.emailToggle', 'Let the agent send emails')}
            hint={t('agentBuilder.messaging.emailHint', "Sent from the platform's email system; replies go to your account email.")}
            checked={form.messagingEmailEnabled}
            onCheckedChange={(v) => onChange({ messagingEmailEnabled: v })}
          />
          {form.messagingEmailEnabled && (
            <div className="pb-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <Label className="text-xs text-muted-foreground">{t('agentBuilder.messaging.emailTemplates', 'Templates the agent may send')}</Label>
                <SettingsLink label={t('agentBuilder.messaging.manageTemplates', 'Manage templates')} />
              </div>
              {emailQ.isLoading ? (
                <div className="space-y-2"><Skeleton className="h-9 w-full" /><Skeleton className="h-9 w-full" /></div>
              ) : emailQ.isError ? (
                <p className="text-xs text-destructive">{t('agentBuilder.messaging.loadFailed', 'Could not load templates right now.')}</p>
              ) : emailTemplates.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  {t('agentBuilder.messaging.noEmailTemplates', 'No active email templates yet.')}{' '}
                  <SettingsLink label={t('agentBuilder.messaging.createTemplate', 'Create one')} />
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {emailTemplates.map(tpl => (
                      <label key={tpl.id} className="flex items-start gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-muted/40">
                        <Checkbox
                          className="mt-0.5"
                          checked={form.messagingEmailTemplates.includes(tpl.name)}
                          onCheckedChange={(v) => onChange({ messagingEmailTemplates: toggle(form.messagingEmailTemplates, tpl.name, v === true) })}
                          data-testid={`email-template-${tpl.id}`}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate">{tpl.name}</span>
                          {tpl.subject && <span className="block truncate text-xs text-muted-foreground">{tpl.subject}</span>}
                          {(tpl.variables || []).length > 0 && (
                            <span className="mt-1 flex flex-wrap gap-1">
                              {(tpl.variables || []).map(v => <Badge key={v} variant="secondary" className="text-[10px] font-mono px-1.5 py-0">{`{{${v}}}`}</Badge>)}
                            </span>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{anyTemplateNote}</p>
                </>
              )}
              <MissingTemplates
                names={missingEmail}
                onRemove={(n) => onChange({ messagingEmailTemplates: toggle(form.messagingEmailTemplates, n, false) })}
              />
            </div>
          )}
        </div>

        {/* ── WhatsApp (Waki) ───────────────────────────────────────────── */}
        <div>
          <ToggleRow
            id="messaging-whatsapp"
            icon={<MessageSquare className="h-4 w-4" />}
            label={t('agentBuilder.messaging.whatsappToggle', 'Let the agent send WhatsApp templates')}
            hint={t('agentBuilder.messaging.whatsappHint', 'Approved templates from your Waki account, sent to the caller\'s number.')}
            checked={form.messagingWhatsappEnabled}
            onCheckedChange={(v) => onChange({ messagingWhatsappEnabled: v })}
          />
          {form.messagingWhatsappEnabled && (
            <div className="pb-3 space-y-2">
              {wakiSettingsQ.isLoading ? (
                <Skeleton className="h-9 w-full" />
              ) : wakiSettingsQ.isError ? (
                <p className="text-xs text-destructive">{t('agentBuilder.messaging.loadFailed', 'Could not load templates right now.')}</p>
              ) : !wakiConnected ? (
                <Alert data-testid="waki-not-connected">
                  <AlertDescription className="text-sm">
                    {t('agentBuilder.messaging.wakiNotConnected', 'Your Waki account is not connected yet.')}{' '}
                    <Link href={MESSAGING_SETTINGS_URL} className="underline">{t('agentBuilder.messaging.connectWaki', 'Connect your Waki account')}</Link>
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400" data-testid="waki-connected">
                      <CheckCircle2 className="h-3.5 w-3.5" />{t('agentBuilder.messaging.wakiConnected', 'Waki connected')}
                    </span>
                    <SettingsLink label={t('agentBuilder.messaging.manageWaki', 'Manage Waki')} />
                  </div>
                  {wakiTemplatesQ.isLoading ? (
                    <div className="space-y-2"><Skeleton className="h-9 w-full" /><Skeleton className="h-9 w-full" /></div>
                  ) : wakiTemplatesQ.isError ? (
                    <p className="text-xs text-destructive">{t('agentBuilder.messaging.loadFailed', 'Could not load templates right now.')}</p>
                  ) : wakiTemplates.length === 0 ? (
                    <p className="text-xs text-muted-foreground">
                      {t('agentBuilder.messaging.noWakiTemplates', 'No approved templates in your Waki account yet. Create and get them approved at app.waki.in.')}
                    </p>
                  ) : (
                    <>
                      <div className="space-y-2">
                        {wakiTemplates.map(tpl => {
                          const selected = form.messagingWhatsappTemplates.includes(tpl.name);
                          return (
                            <div key={`${tpl.name}-${tpl.language || ''}`} className="rounded-md border px-3 py-2 text-sm">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                  checked={selected}
                                  onCheckedChange={(v) => onChange({ messagingWhatsappTemplates: toggle(form.messagingWhatsappTemplates, tpl.name, v === true) })}
                                  data-testid={`wa-template-${tpl.name}`}
                                />
                                <span className="truncate font-mono text-xs sm:text-sm">{tpl.name}</span>
                                {tpl.language && <span className="ml-auto text-[10px] uppercase text-muted-foreground">{tpl.language}</span>}
                              </label>
                              {selected && (
                                <WhatsappVariablesEditor
                                  templateName={tpl.name}
                                  variables={form.messagingWhatsappVariables[tpl.name] || {}}
                                  onChange={(vars) => setTemplateVars(tpl.name, vars)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-xs text-muted-foreground">{anyTemplateNote}</p>
                    </>
                  )}
                  <MissingTemplates
                    names={missingWa}
                    onRemove={(n) => onChange({ messagingWhatsappTemplates: toggle(form.messagingWhatsappTemplates, n, false) })}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
