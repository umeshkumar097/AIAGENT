import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { APPOINTMENT_DURATIONS, TIME_ZONES, type AppointmentsForm } from "./actions";

interface Props {
  value: AppointmentsForm;
  onChange: (patch: Partial<AppointmentsForm>) => void;
  /** Channels the agent may confirm on — from the messaging step. */
  whatsappAvailable: boolean;
  emailAvailable: boolean;
}

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
const DAY_FALLBACK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function toggleIn(list: string[], item: string, on: boolean): string[] {
  return on ? (list.includes(item) ? list : [...list, item]) : list.filter(x => x !== item);
}

/** Inline settings for the "Book appointments" action: slot length, hours, days, timezone, confirmations. */
export default function AppointmentSettings({ value, onChange, whatsappAvailable, emailAvailable }: Props) {
  const { t } = useTranslation();
  const zones: string[] = TIME_ZONES.includes(value.timeZone as typeof TIME_ZONES[number]) ? [...TIME_ZONES] : [value.timeZone, ...TIME_ZONES];
  const hoursInvalid = value.workingStart >= value.workingEnd;

  const toggleDay = (d: number) => onChange({
    workingDays: value.workingDays.includes(d) ? value.workingDays.filter(x => x !== d) : [...value.workingDays, d].sort((a, b) => a - b),
  });

  return (
    <div className="pb-3 space-y-3" data-testid="appointment-settings">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">{t('agentBuilder.actions.appointments.duration', 'Slot length')}</Label>
          <Select value={String(value.durationMinutes)} onValueChange={(v) => onChange({ durationMinutes: Number(v) })}>
            <SelectTrigger className="h-9" data-testid="select-appointment-duration"><SelectValue /></SelectTrigger>
            <SelectContent>
              {APPOINTMENT_DURATIONS.map(d => (
                <SelectItem key={d} value={String(d)}>{t('agentBuilder.actions.appointments.minutes', '{{count}} min', { count: d })}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">{t('agentBuilder.actions.appointments.timeZone', 'Time zone')}</Label>
          <Select value={value.timeZone} onValueChange={(v) => onChange({ timeZone: v })}>
            <SelectTrigger className="h-9" data-testid="select-appointment-timezone"><SelectValue /></SelectTrigger>
            <SelectContent>
              {zones.map(z => <SelectItem key={z} value={z}>{z.replace(/_/g, ' ')}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs">{t('agentBuilder.actions.appointments.workingHours', 'Working hours')}</Label>
        <div className="flex items-center gap-2">
          <Input type="time" className="h-9 w-32" value={value.workingStart} onChange={(e) => onChange({ workingStart: e.target.value })} data-testid="input-working-start" />
          <span className="text-xs text-muted-foreground">{t('agentBuilder.actions.appointments.to', 'to')}</span>
          <Input type="time" className="h-9 w-32" value={value.workingEnd} onChange={(e) => onChange({ workingEnd: e.target.value })} data-testid="input-working-end" />
        </div>
        {hoursInvalid && (
          <p className="text-xs text-destructive">{t('agentBuilder.actions.appointments.hoursInvalid', 'End time must be after the start time.')}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label className="text-xs">{t('agentBuilder.actions.appointments.workingDays', 'Working days')}</Label>
        <div className="flex flex-wrap gap-1.5">
          {DAY_KEYS.map((key, d) => {
            const on = value.workingDays.includes(d);
            return (
              <button
                key={key} type="button" onClick={() => toggleDay(d)} aria-pressed={on}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${on ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}
                data-testid={`day-chip-${key}`}
              >
                {t(`agentBuilder.actions.appointments.days.${key}`, DAY_FALLBACK[d])}
              </button>
            );
          })}
        </div>
        {value.workingDays.length === 0 && (
          <p className="text-xs text-destructive">{t('agentBuilder.actions.appointments.daysRequired', 'Pick at least one day.')}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="appointment-service" className="text-xs">{t('agentBuilder.actions.appointments.serviceName', 'Service name (optional)')}</Label>
        <Input
          id="appointment-service" className="h-9" value={value.serviceName} maxLength={80}
          onChange={(e) => onChange({ serviceName: e.target.value })}
          placeholder={t('agentBuilder.actions.appointments.servicePlaceholder', 'e.g. Consultation, Demo, Site visit')}
          data-testid="input-appointment-service"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs">{t('agentBuilder.actions.appointments.confirmVia', 'Send a confirmation after booking')}</Label>
        {!whatsappAvailable && !emailAvailable ? (
          <p className="text-xs text-muted-foreground">
            {t('agentBuilder.actions.appointments.confirmUnavailable', 'Enable WhatsApp or Email in the messaging step to send booking confirmations.')}
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {whatsappAvailable && (
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={value.confirmVia.includes('whatsapp')}
                  onCheckedChange={(v) => onChange({ confirmVia: toggleIn(value.confirmVia, 'whatsapp', v === true) })}
                  data-testid="confirm-via-whatsapp"
                />
                WhatsApp
              </label>
            )}
            {emailAvailable && (
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={value.confirmVia.includes('email')}
                  onCheckedChange={(v) => onChange({ confirmVia: toggleIn(value.confirmVia, 'email', v === true) })}
                  data-testid="confirm-via-email"
                />
                Email
              </label>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
