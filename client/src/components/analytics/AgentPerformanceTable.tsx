import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_LABELS, downloadTextFile, formatSeconds, toCsv, type AgentPerformance } from "./insights-shared";
import { InsightsEmpty } from "./InsightsEmpty";

/** Per-agent table (calls, answered %, avg talk time, interested %, appointments, callbacks) with CSV export. */
export function AgentPerformanceTable({ agents, days }: { agents: AgentPerformance[]; days: number }) {
  const { t } = useTranslation();
  const columns = [
    t("analytics.insights.agents.agent", "Agent"),
    t("analytics.insights.agents.language", "Language"),
    t("analytics.insights.calls", "Calls"),
    t("analytics.insights.agents.answered", "Answered %"),
    t("analytics.insights.agents.avgDuration", "Avg talk time"),
    t("analytics.insights.agents.interested", "Interested %"),
    t("analytics.insights.agents.appointments", "Appointments"),
    t("analytics.insights.agents.callbacks", "Callbacks"),
    t("analytics.insights.agents.minutes", "Minutes"),
  ];
  const langLabel = (l: string | null) => (l ? t(`analytics.insights.language.${l}`, LANGUAGE_LABELS[l] || l) : "-");

  const exportCsv = () => {
    const rows = agents.map((a) => [
      a.name, a.language ?? "", a.calls, a.answerRate, formatSeconds(a.avgDuration), a.interestedRate, a.appointments, a.callbacks, a.minutes,
    ]);
    downloadTextFile(`agent-performance-${days}d-${new Date().toISOString().slice(0, 10)}.csv`, toCsv(columns, rows));
  };

  return (
    <Card data-testid="card-agent-performance">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">{t("analytics.insights.agents.title", "Agent performance")}</CardTitle>
            <p className="text-sm text-muted-foreground">{t("analytics.insights.agents.subtitle", "Answered % is of dialed calls; Interested % is of answered calls.")}</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={agents.length === 0} data-testid="button-export-agents-csv">
            <Download className="mr-2 h-4 w-4" />
            {t("analytics.insights.agents.exportCsv", "Export CSV")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {agents.length === 0 ? (
          <InsightsEmpty />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((c, i) => (
                    <TableHead key={c} className={i >= 2 ? "text-right" : undefined}>{c}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((a) => (
                  <TableRow key={a.agentId ?? "unassigned"} data-testid={`row-agent-${a.agentId ?? "unassigned"}`}>
                    <TableCell className="font-medium">{a.name}</TableCell>
                    <TableCell className="text-muted-foreground">{langLabel(a.language)}</TableCell>
                    <TableCell className="text-right tabular-nums">{a.calls.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{a.answerRate}%</TableCell>
                    <TableCell className="text-right tabular-nums">{formatSeconds(a.avgDuration)}</TableCell>
                    <TableCell className="text-right tabular-nums">{a.interestedRate}%</TableCell>
                    <TableCell className="text-right tabular-nums">{a.appointments}</TableCell>
                    <TableCell className="text-right tabular-nums">{a.callbacks}</TableCell>
                    <TableCell className="text-right tabular-nums">{a.minutes.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
