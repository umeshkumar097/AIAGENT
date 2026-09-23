import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Voicemail } from "lucide-react";
import { VOICEMAIL_MESSAGE_MAX, type VoicemailAction, type VoicemailForm } from "./actions";

interface Props {
  value: VoicemailForm;
  onChange: (patch: Partial<VoicemailForm>) => void;
}

/**
 * Step 4 · "When voicemail answers" — outbound calls only (Plivo answering-machine
 * detection). Either hang up straight away or speak a short message after the beep.
 */
export default function VoicemailSettings({ value, onChange }: Props) {
  const { t } = useTranslation();
  const leave = value.action === 'leave_message';
  const remaining = VOICEMAIL_MESSAGE_MAX - value.message.length;

  return (
    <div className="py-2 space-y-2" data-testid="voicemail-settings">
      <div className="space-y-0.5">
        <Label htmlFor="voicemail-action" className="flex items-center gap-2">
          <Voicemail className="h-4 w-4" />
          {t('agentBuilder.voicemail.title', 'When voicemail answers')}
        </Label>
        <p className="text-xs text-muted-foreground">
          {t('agentBuilder.voicemail.hint', 'Outbound calls only. Detected automatically when an answering machine picks up.')}
        </p>
      </div>
      <Select value={value.action} onValueChange={(v) => onChange({ action: v as VoicemailAction })}>
        <SelectTrigger id="voicemail-action" className="h-9 sm:w-72" data-testid="select-voicemail-action">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hangup">{t('agentBuilder.voicemail.hangup', 'Hang up (no minutes used)')}</SelectItem>
          <SelectItem value="leave_message">{t('agentBuilder.voicemail.leaveMessage', 'Leave this message')}</SelectItem>
        </SelectContent>
      </Select>
      {leave && (
        <div className="space-y-1 pb-1">
          <Textarea
            value={value.message}
            onChange={(e) => onChange({ message: e.target.value.slice(0, VOICEMAIL_MESSAGE_MAX) })}
            rows={3}
            placeholder={t('agentBuilder.voicemail.placeholder', 'Hello, we tried to reach you about your enquiry. Please call us back at your convenience. Thank you.')}
            data-testid="textarea-voicemail-message"
          />
          <p className={`text-[11px] ${remaining < 0 ? 'text-destructive' : 'text-muted-foreground'}`}>
            {t('agentBuilder.voicemail.spokenAfterBeep', 'Spoken in the agent\'s voice after the beep, then the call ends.')}{' '}
            {remaining}/{VOICEMAIL_MESSAGE_MAX}
          </p>
        </div>
      )}
    </div>
  );
}
