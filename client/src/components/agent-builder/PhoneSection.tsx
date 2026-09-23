import { useTranslation } from "react-i18next";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PhoneIncoming } from "lucide-react";
import type { AgentBuilderForm } from "./types";

export interface AvailableNumber {
  id: string; phoneNumber: string; friendlyName: string | null; country: string;
  isConflicted: boolean; conflictReason: string | null;
}
export interface CurrentConnection { phoneNumberId: string; phoneNumber: string; friendlyName: string | null }

interface Props {
  form: AgentBuilderForm;
  onChange: (patch: Partial<AgentBuilderForm>) => void;
  numbers: AvailableNumber[];
  current: CurrentConnection | null;
  isLoading: boolean;
}

export default function PhoneSection({ form, onChange, numbers, current, isLoading }: Props) {
  const { t } = useTranslation();
  const options: AvailableNumber[] = [
    ...(current ? [{ id: current.phoneNumberId, phoneNumber: current.phoneNumber, friendlyName: current.friendlyName, country: '', isConflicted: false, conflictReason: null }] : []),
    ...numbers.filter(n => n.id !== current?.phoneNumberId),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">5 · {t('agentBuilder.phone.title', 'Incoming calls')}</CardTitle>
        <CardDescription>
          {t('agentBuilder.phone.desc', 'Attach a Plivo number so people can call this agent. Skip it if the agent will only run campaigns.')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <div className="space-y-2"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /></div>
        ) : (
          <RadioGroup value={form.phoneNumberId || 'none'} onValueChange={(v) => onChange({ phoneNumberId: v === 'none' ? '' : v })}>
            <label className="flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer hover:bg-muted/40">
              <RadioGroupItem value="none" id="num-none" data-testid="number-none" />
              <Label htmlFor="num-none" className="cursor-pointer font-normal">
                {t('agentBuilder.phone.none', 'No number for now (campaigns only)')}
              </Label>
            </label>
            {options.map(n => (
              <label
                key={n.id}
                className={`flex items-center gap-3 rounded-md border px-3 py-2 ${n.isConflicted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:bg-muted/40'}`}
              >
                <RadioGroupItem value={n.id} id={`num-${n.id}`} disabled={n.isConflicted} data-testid={`number-${n.id}`} />
                <Label htmlFor={`num-${n.id}`} className="cursor-pointer font-normal flex-1 min-w-0">
                  <span className="font-mono whitespace-nowrap">{n.phoneNumber}</span>
                  {n.friendlyName && <span className="text-muted-foreground"> · {n.friendlyName}</span>}
                  {n.isConflicted && <span className="block text-xs text-muted-foreground">{n.conflictReason}</span>}
                </Label>
                {n.id === current?.phoneNumberId && <Badge variant="secondary">{t('agentBuilder.phone.current', 'Current')}</Badge>}
              </label>
            ))}
          </RadioGroup>
        )}
        {!isLoading && options.length === 0 && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <PhoneIncoming className="h-4 w-4" />
            {t('agentBuilder.phone.empty', 'No free Plivo numbers.')}{' '}
            <Link href="/app/phone-numbers" className="underline">{t('agentBuilder.phone.buy', 'Get a number')}</Link>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
