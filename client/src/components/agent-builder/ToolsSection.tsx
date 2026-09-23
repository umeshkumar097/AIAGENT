import { useTranslation } from "react-i18next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import AppointmentSettings from "./AppointmentSettings";
import LeadFieldsEditor from "./LeadFieldsEditor";
import ApiToolsEditor from "./ApiToolsEditor";
import VoicemailSettings from "./VoicemailSettings";
import KnowledgeBasePicker, { type KnowledgeItem } from "./KnowledgeBasePicker";
import type { AgentBuilderForm } from "./types";
import type { AgentActionsForm, AppointmentsForm } from "./actions";

export type { KnowledgeItem };

interface Props {
  form: AgentBuilderForm;
  onChange: (patch: Partial<AgentBuilderForm>) => void;
  knowledgeBase: KnowledgeItem[];
  /** Messaging plugin available — decides whether booking confirmations can be offered. */
  messagingAvailable?: boolean;
}

function ToggleRow({ id, label, hint, checked, onCheckedChange }: {
  id: string; label: string; hint: string; checked: boolean; onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="cursor-pointer">{label}</Label>
        <p className="text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} data-testid={`switch-${id}`} />
    </div>
  );
}

/**
 * Step 4: what the agent may DO during a call (transfer, appointments, save lead,
 * callbacks, API lookups, hang up, language) plus the knowledge it may consult.
 */
export default function ToolsSection({ form, onChange, knowledgeBase, messagingAvailable = false }: Props) {
  const { t } = useTranslation();
  const isSarvam = form.engine === 'sarvam-plivo';
  const actions = form.actions;
  const setActions = (patch: Partial<AgentActionsForm>) => onChange({ actions: { ...actions, ...patch } });
  const setAppointments = (patch: Partial<AppointmentsForm>) => setActions({ appointments: { ...actions.appointments, ...patch } });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">4 · {t('agentBuilder.tools.title', 'Tools & knowledge')}</CardTitle>
        <CardDescription>{t('agentBuilder.tools.desc', 'Optional. Everything here can be changed later.')}</CardDescription>
      </CardHeader>
      <CardContent className="divide-y">
        <div>
          <ToggleRow
            id="transfer"
            label={t('agentBuilder.transfer', 'Transfer to a human')}
            hint={t('agentBuilder.transferHint', 'The agent can hand the call to this number when asked.')}
            checked={form.transferEnabled}
            onCheckedChange={(v) => onChange({ transferEnabled: v })}
          />
          {form.transferEnabled && (
            <div className="pb-3">
              <Input
                type="tel"
                value={form.transferPhoneNumber}
                onChange={(e) => onChange({ transferPhoneNumber: e.target.value })}
                placeholder="+91 98765 43210"
                data-testid="input-transfer-number"
              />
            </div>
          )}
        </div>

        <div>
          <ToggleRow
            id="appointments"
            label={t('agentBuilder.actions.appointments.toggle', 'Book appointments')}
            hint={t('agentBuilder.actions.appointments.hint', 'Checks free slots (your calendar too, when connected) and books one for the caller.')}
            checked={form.appointmentBookingEnabled}
            onCheckedChange={(v) => onChange({ appointmentBookingEnabled: v })}
          />
          {form.appointmentBookingEnabled && (
            <AppointmentSettings
              value={actions.appointments}
              onChange={setAppointments}
              whatsappAvailable={messagingAvailable && form.messagingWhatsappEnabled}
              emailAvailable={messagingAvailable && form.messagingEmailEnabled}
            />
          )}
        </div>

        <div>
          <ToggleRow
            id="save-lead"
            label={t('agentBuilder.actions.saveLead.toggle', 'Save the caller as a lead')}
            hint={t('agentBuilder.actions.saveLead.hint', 'Captures name, phone, email and the fields below into Contacts and your connected CRM.')}
            checked={actions.saveLeadEnabled}
            onCheckedChange={(v) => setActions({ saveLeadEnabled: v })}
          />
          {actions.saveLeadEnabled && (
            <LeadFieldsEditor fields={actions.saveLeadFields} onChange={(saveLeadFields) => setActions({ saveLeadFields })} />
          )}
        </div>

        <div>
          <ToggleRow
            id="callback"
            label={t('agentBuilder.actions.callback.toggle', 'Schedule a callback')}
            hint={t('agentBuilder.actions.callback.hint', 'The agent agrees a time with the caller and the platform calls them back automatically.')}
            checked={actions.callbackEnabled}
            onCheckedChange={(v) => setActions({ callbackEnabled: v })}
          />
          {actions.callbackEnabled && (
            <div className="pb-3 flex items-center gap-2">
              <Label htmlFor="callback-max-days" className="text-xs whitespace-nowrap">{t('agentBuilder.actions.callback.maxDays', 'At most')}</Label>
              <Input
                id="callback-max-days" type="number" min={1} max={30} className="h-8 w-20"
                value={actions.callbackMaxDaysAhead}
                onChange={(e) => setActions({ callbackMaxDaysAhead: Math.max(1, Math.min(30, Number(e.target.value) || 1)) })}
                data-testid="input-callback-max-days"
              />
              <span className="text-xs text-muted-foreground">{t('agentBuilder.actions.callback.daysAhead', 'days ahead')}</span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <div className="space-y-0.5 pb-2">
            <Label>{t('agentBuilder.actions.apiTools.title', 'Custom API lookups')}</Label>
            <p className="text-xs text-muted-foreground">
              {t('agentBuilder.actions.apiTools.hint', 'Let the agent fetch live data from your own systems — order status, balances, bookings.')}
            </p>
          </div>
          <ApiToolsEditor tools={actions.apiTools} onChange={(apiTools) => setActions({ apiTools })} />
        </div>

        <VoicemailSettings
          value={actions.voicemail}
          onChange={(patch) => setActions({ voicemail: { ...actions.voicemail, ...patch } })}
        />

        <ToggleRow
          id="end-conversation"
          label={t('agentBuilder.endCall', 'Let the agent end the call')}
          hint={t('agentBuilder.endCallHint', 'Hangs up politely once the conversation is done. Saves minutes.')}
          checked={form.endConversationEnabled}
          onCheckedChange={(v) => onChange({ endConversationEnabled: v })}
        />

        <ToggleRow
          id="detect-language"
          label={t('agentBuilder.detectLanguage', 'Follow the caller\'s language')}
          hint={isSarvam
            ? t('agentBuilder.detectLanguageHintSarvam', 'Hears Hindi, English and 10 Indian languages and replies in whichever the caller uses — even if they switch mid-call.')
            : t('agentBuilder.detectLanguageHint', 'Reply in whatever language the caller speaks.')}
          checked={form.detectLanguageEnabled}
          onCheckedChange={(v) => onChange({ detectLanguageEnabled: v })}
        />

        <KnowledgeBasePicker
          knowledgeBase={knowledgeBase}
          selectedIds={form.knowledgeBaseIds}
          onChange={(knowledgeBaseIds) => onChange({ knowledgeBaseIds })}
        />
      </CardContent>
    </Card>
  );
}
