/**
 * "Call quality" card for CallDetail: score ring, sub-scores, strengths / improvements, flags and
 * a Re-score button. Reads GET /api/calls/:id/qa, posts /api/calls/:id/qa/rescore.
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { ClipboardCheck, Loader2, RefreshCw, ThumbsUp, TrendingUp, AlertTriangle } from "lucide-react";

type SubScoreKey = "greeting" | "understanding" | "objectionHandling" | "compliance" | "closing";

interface QaScore {
  status: "scored" | "failed";
  attempts: number;
  error: string | null;
  overall: number | null;
  subScores: Record<SubScoreKey, number | null>;
  strengths: string[];
  improvements: string[];
  flags: string[];
  verdict: string | null;
  model: string | null;
  scoredAt: string | null;
}

interface QaResponse {
  status: "scored" | "failed" | "none";
  score: QaScore | null;
  enabled?: boolean;
}

const SUB_KEYS: SubScoreKey[] = ["greeting", "understanding", "objectionHandling", "compliance", "closing"];

function tone(score: number | null): { text: string; stroke: string; bar: string } {
  if (score === null) return { text: "text-muted-foreground", stroke: "stroke-slate-400", bar: "bg-slate-400" };
  if (score >= 8) return { text: "text-emerald-600 dark:text-emerald-400", stroke: "stroke-emerald-500", bar: "bg-emerald-500" };
  if (score >= 6) return { text: "text-amber-600 dark:text-amber-400", stroke: "stroke-amber-500", bar: "bg-amber-500" };
  return { text: "text-red-600 dark:text-red-400", stroke: "stroke-red-500", bar: "bg-red-500" };
}

function ScoreRing({ score }: { score: number | null }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const fraction = score === null ? 0 : score / 10;
  const t = tone(score);
  return (
    <div className="relative h-24 w-24 shrink-0" data-testid="qa-score-ring">
      <svg viewBox="0 0 84 84" className="h-24 w-24 -rotate-90">
        <circle cx="42" cy="42" r={radius} className="stroke-slate-200 dark:stroke-slate-800" strokeWidth="8" fill="none" />
        <circle cx="42" cy="42" r={radius} className={`${t.stroke} transition-all duration-700`} strokeWidth="8" fill="none"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - fraction)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${t.text}`}>{score ?? "–"}</span>
        <span className="text-[10px] uppercase tracking-wide text-muted-foreground">/ 10</span>
      </div>
    </div>
  );
}

export function CallQaCard({ callId }: { callId: string }) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryKey = [`/api/calls/${callId}/qa`];
  const { data, isLoading } = useQuery<QaResponse>({ queryKey });

  const rescore = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/calls/${callId}/qa/rescore`);
      return (await res.json()) as QaResponse;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(queryKey, result);
      toast({ title: t("callQa.rescored", "Call re-scored") });
    },
    onError: (error: Error) => {
      void queryClient.invalidateQueries({ queryKey });
      toast({ title: t("callQa.rescoreFailed", "Re-score failed"), description: error.message, variant: "destructive" });
    },
  });

  const subLabels: Record<SubScoreKey, string> = {
    greeting: t("callQa.sub.greeting", "Greeting"),
    understanding: t("callQa.sub.understanding", "Understanding"),
    objectionHandling: t("callQa.sub.objectionHandling", "Objection handling"),
    compliance: t("callQa.sub.compliance", "Prompt compliance"),
    closing: t("callQa.sub.closing", "Closing"),
  };
  const flagLabels: Record<string, string> = {
    rude: t("callQa.flag.rude", "Rude"),
    wrong_info: t("callQa.flag.wrongInfo", "Wrong information"),
    talked_over_caller: t("callQa.flag.talkedOver", "Talked over caller"),
    unresolved: t("callQa.flag.unresolved", "Unresolved"),
  };

  const score = data?.score ?? null;
  const scored = data?.status === "scored" && score;

  return (
    <Card className="p-6" data-testid="call-qa-card">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center">
            <ClipboardCheck className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("callQa.title", "Call quality")}</h3>
            {score?.scoredAt && (
              <p className="text-xs text-muted-foreground">
                {t("callQa.scoredAt", "Scored {{when}}", { when: new Date(score.scoredAt).toLocaleString() })}
                {score.model ? ` · ${score.model}` : ""}
              </p>
            )}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => rescore.mutate()} disabled={rescore.isPending || isLoading} data-testid="button-rescore">
          {rescore.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          {t("callQa.rescore", "Re-score")}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" />{t("common.loading", "Loading...")}</div>
      ) : !scored ? (
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            {data?.status === "failed"
              ? t("callQa.failed", "Automatic scoring failed for this call. You can try again with Re-score.")
              : data?.enabled === false
                ? t("callQa.disabled", "Automatic call scoring is turned off on this platform.")
                : t("callQa.pending", "Not scored yet. Completed calls with a transcript are scored automatically within a few minutes.")}
          </p>
          {data?.status === "failed" && score?.error && <p className="text-xs">{score.error}</p>}
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-5">
            <ScoreRing score={score.overall} />
            <div className="flex-1 space-y-2">
              {SUB_KEYS.map((key) => {
                const value = score.subScores[key];
                const tn = tone(value);
                return (
                  <div key={key} className="flex items-center gap-3 text-sm" data-testid={`qa-sub-${key}`}>
                    <span className="w-36 shrink-0 text-muted-foreground">{subLabels[key]}</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full rounded-full ${tn.bar}`} style={{ width: `${((value ?? 0) / 10) * 100}%` }} />
                    </div>
                    <span className={`w-6 text-right font-medium ${tn.text}`}>{value ?? "–"}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {score.verdict && <p className="text-sm text-foreground/90 italic">{score.verdict}</p>}

          {score.flags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2" data-testid="qa-flags">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              {score.flags.map((flag) => (
                <Badge key={flag} variant="destructive">{flagLabels[flag] || flag}</Badge>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                <ThumbsUp className="h-4 w-4" />{t("callQa.strengths", "Strengths")}
              </div>
              <ul className="space-y-1 text-sm text-foreground/90 list-disc pl-5">
                {score.strengths.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-amber-200/60 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-4">
              <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-amber-700 dark:text-amber-300">
                <TrendingUp className="h-4 w-4" />{t("callQa.improvements", "Improvements")}
              </div>
              <ul className="space-y-1 text-sm text-foreground/90 list-disc pl-5">
                {score.improvements.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
