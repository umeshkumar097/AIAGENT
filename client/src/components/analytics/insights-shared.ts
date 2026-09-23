/** Types and small helpers shared by the Analytics "Insights" tab (mirrors server/services/analytics/insights.service.ts). */

export interface OutcomeSlice { outcome: string; count: number; share: number }
export interface TimeBucket { bucket: number; calls: number; answered: number; interested: number; answerRate: number; interestedRate: number }
export interface HourBucket extends TimeBucket { hour: number }
export interface WeekdayBucket extends TimeBucket { weekday: number }
export interface AgentPerformance {
  agentId: string | null; name: string; language: string | null; calls: number; answered: number; answerRate: number;
  avgDuration: number; interested: number; interestedRate: number; appointments: number; callbacks: number; minutes: number;
}
export interface LanguageSlice { language: string; count: number }
export interface DailyUsage { date: string; calls: number; minutes: number; credits: number }
export interface FunnelStage { stage: "dialed" | "answered" | "talked30" | "converted"; count: number; rate: number }

export interface CallInsights {
  range: { days: number; since: string; until: string; timezone: string };
  filters: { agentId: string | null; campaignId: string | null };
  summary: {
    dialed: number; answered: number; answerRate: number; interested: number; interestedRate: number;
    appointments: number; minutes: number; credits: number;
  };
  outcomes: OutcomeSlice[];
  bestHours: HourBucket[];
  weekdays: WeekdayBucket[];
  agents: AgentPerformance[];
  languages: { agent: LanguageSlice[]; detected: LanguageSlice[] };
  daily: DailyUsage[];
  funnel: FunnelStage[];
}

/** Fixed categorical order from the app theme (never cycled past 5: extra slices fold into "Other"). */
export const SERIES_COLORS = [
  "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))",
];
export const MAX_SLICES = SERIES_COLORS.length;

export const TOOLTIP_STYLE = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  color: "hsl(var(--foreground))",
} as const;
export const AXIS_TICK = { fill: "hsl(var(--muted-foreground))", fontSize: 12 } as const;
export const AXIS_LINE = { stroke: "hsl(var(--border))" } as const;

export const OUTCOME_LABELS: Record<string, string> = {
  interested: "Interested",
  not_interested: "Not interested",
  callback_requested: "Callback requested",
  wrong_number: "Wrong number",
  already_customer: "Already a customer",
  do_not_call: "Do not call",
  no_decision: "No decision",
  voicemail: "Voicemail",
  no_answer: "No answer",
  busy: "Busy",
  failed: "Failed",
  transferred: "Transferred",
  appointment_booked: "Appointment booked",
  in_progress: "In progress",
};

export const LANGUAGE_LABELS: Record<string, string> = {
  en: "English", "en-IN": "English (India)", hi: "Hindi", "hi-IN": "Hindi", bn: "Bengali", "bn-IN": "Bengali",
  ta: "Tamil", "ta-IN": "Tamil", te: "Telugu", "te-IN": "Telugu", kn: "Kannada", "kn-IN": "Kannada",
  ml: "Malayalam", "ml-IN": "Malayalam", mr: "Marathi", "mr-IN": "Marathi", gu: "Gujarati", "gu-IN": "Gujarati",
  pa: "Punjabi", "pa-IN": "Punjabi", od: "Odia", "od-IN": "Odia", unknown: "Unknown",
};

export const WEEKDAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function formatHour(hour: number): string {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}${hour < 12 ? "am" : "pm"}`;
}

export function formatSeconds(seconds: number): string {
  const s = Math.max(0, Math.round(seconds || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Keep the top N-1 slices, fold the rest into one "Other" slice so colours stay stable. */
export function foldSlices<T extends { count: number }>(rows: T[], label: (row: T) => string, max = MAX_SLICES): Array<{ name: string; value: number }> {
  const sorted = [...rows].sort((a, b) => b.count - a.count);
  if (sorted.length <= max) return sorted.map((r) => ({ name: label(r), value: r.count }));
  const head = sorted.slice(0, max - 1).map((r) => ({ name: label(r), value: r.count }));
  const rest = sorted.slice(max - 1).reduce((acc, r) => acc + r.count, 0);
  return [...head, { name: "Other", value: rest }];
}

/** RFC 4180-ish CSV: quote every cell, escape quotes, CRLF rows, BOM for Excel. */
export function toCsv(headers: string[], rows: Array<Array<string | number>>): string {
  const cell = (v: string | number) => `"${String(v ?? "").replace(/"/g, "\"\"")}"`;
  return "﻿" + [headers, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
}

export function downloadTextFile(name: string, content: string, mime = "text/csv;charset=utf-8"): void {
  const blob = new Blob([content], { type: mime });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}
