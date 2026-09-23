import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIncoming, PhoneOutgoing, Target } from "lucide-react";
import { useTranslation } from "react-i18next";

export interface TypeBreakdown {
  incoming: number;
  outgoing: number;
  batch: number;
  campaigns: number;
  total: number;
}

/** Incoming / outgoing / campaign counts for the Overview tab (shown only for "all calls"). */
export function CallTypeBreakdownCard({ typeBreakdown }: { typeBreakdown: TypeBreakdown }) {
  const { t } = useTranslation();
  return (
    <Card data-testid="card-call-breakdown">
      <CardHeader>
        <CardTitle className="text-lg">{t("analytics.callTypeBreakdown")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gradient-to-br from-emerald-500/15 via-green-500/10 to-transparent dark:from-emerald-950/30 dark:via-green-950/15 dark:to-slate-950/5 rounded-lg border border-emerald-200/20 dark:border-emerald-800/20">
            <div className="flex items-center justify-center gap-2 mb-1">
              <PhoneIncoming className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm text-muted-foreground">{t("analytics.callTypes.incoming")}</span>
            </div>
            <p className="text-2xl font-bold" data-testid="breakdown-incoming">{typeBreakdown.incoming}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-transparent dark:from-blue-950/30 dark:via-indigo-950/15 dark:to-slate-950/5 rounded-lg border border-blue-200/20 dark:border-blue-800/20">
            <div className="flex items-center justify-center gap-2 mb-1">
              <PhoneOutgoing className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-muted-foreground">{t("analytics.callTypes.outgoing")}</span>
            </div>
            <p className="text-2xl font-bold" data-testid="breakdown-outgoing">{typeBreakdown.outgoing}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-transparent dark:from-violet-950/30 dark:via-purple-950/15 dark:to-slate-950/5 rounded-lg border border-violet-200/20 dark:border-violet-800/20">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Target className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm text-muted-foreground">{t("analytics.callTypes.campaigns")}</span>
            </div>
            <p className="text-2xl font-bold" data-testid="breakdown-campaigns">{typeBreakdown.batch}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
