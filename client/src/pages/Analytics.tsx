/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { MetricCard } from "@/components/MetricCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyticsHeader } from "@/components/analytics/AnalyticsHeader";
import { CallTypeBreakdownCard, type TypeBreakdown } from "@/components/analytics/CallTypeBreakdownCard";
import { InsightsTab } from "@/components/analytics/InsightsTab";
import { Phone, Users, TrendingUp, Clock, Loader2, PhoneIncoming, PhoneOutgoing, Target, Lightbulb, LayoutDashboard } from "lucide-react";
import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { AuthStorage } from "@/lib/auth-storage";

interface AnalyticsData {
  totalCalls: number;
  successRate: number;
  qualifiedLeads: number;
  avgDuration: number;
  leadDistribution: Array<{ name: string; value: number }>;
  sentimentDistribution: Array<{ name: string; value: number }>;
  campaignPerformance: Array<{ name: string; value: number }>;
  dailyCalls: Array<{ date: string; count: number }>;
  typeBreakdown?: TypeBreakdown;
}

export default function Analytics() {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState("7days");
  const [callType, setCallType] = useState("all");
  const [view, setView] = useState<"overview" | "insights">("overview");
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const currentUser = AuthStorage.getUser();
  const isAdmin = currentUser?.role === 'admin';

  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics', timeRange, callType],
    queryFn: async () => {
      const headers: Record<string, string> = {};
      const authHeader = AuthStorage.getAuthHeader();
      if (authHeader) {
        headers['Authorization'] = authHeader;
      }
      const response = await fetch(`/api/analytics?timeRange=${timeRange}&callType=${callType}`, {
        credentials: 'include',
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    }
  });

  const formatDuration = (seconds: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const response = await apiRequest('POST', '/api/analytics/export-pdf', {
        timeRange,
        callType
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({
        title: t('analytics.toast.reportExported'),
        description: t('analytics.toast.reportExportedDesc')
      });
    } catch (error) {
      toast({
        title: t('analytics.toast.exportFailed'),
        description: t('analytics.toast.exportFailedDesc'),
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading && view === "overview") {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const {
    totalCalls = 0,
    successRate = 0,
    qualifiedLeads = 0,
    avgDuration = 0,
    leadDistribution = [],
    sentimentDistribution = [],
    campaignPerformance = [],
    dailyCalls = [],
    typeBreakdown = { incoming: 0, outgoing: 0, batch: 0, campaigns: 0, total: 0 }
  } = analytics || {};

  const formattedDailyCalls = dailyCalls.map(d => ({
    name: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
    value: d.count
  }));

  const getCallVolumeTitle = () => {
    if (timeRange === 'year') return t('analytics.monthlyCallVolume');
    if (timeRange === '30days' || timeRange === '90days') return t('analytics.weeklyCallVolume');
    return t('analytics.dailyCallVolume');
  };

  return (
    <div className="space-y-6" ref={reportRef}>
      <AnalyticsHeader
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExportPDF={handleExportPDF}
        isExporting={isExporting}
        showControls={view === "overview"}
      />

      <Tabs value={view} onValueChange={(v) => setView(v as "overview" | "insights")} className="w-full">
        <TabsList data-testid="tabs-analytics-view">
          <TabsTrigger value="overview" className="flex items-center gap-2" data-testid="tab-overview">
            <LayoutDashboard className="h-4 w-4" />
            {t("analytics.views.overview", "Overview")}
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2" data-testid="tab-insights">
            <Lightbulb className="h-4 w-4" />
            {t("analytics.views.insights", "Insights")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="insights" className="mt-6">
          <InsightsTab />
        </TabsContent>
        <TabsContent value="overview" className="mt-6">
          <Tabs value={callType} onValueChange={setCallType} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid" data-testid="tabs-call-type">
              <TabsTrigger value="all" className="flex items-center gap-2" data-testid="tab-all-calls">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">{t('analytics.callTypes.all')}</span>
                <span className="sm:hidden">{t('analytics.callTypes.allShort')}</span>
                {typeBreakdown.total > 0 && (
                  <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{typeBreakdown.total}</span>
                )}
              </TabsTrigger>
              <TabsTrigger value="incoming" className="flex items-center gap-2" data-testid="tab-incoming-calls">
                <PhoneIncoming className="h-4 w-4" />
                <span className="hidden sm:inline">{t('analytics.callTypes.incoming')}</span>
                <span className="sm:hidden">{t('analytics.callTypes.incomingShort')}</span>
                {typeBreakdown.incoming > 0 && (
                  <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{typeBreakdown.incoming}</span>
                )}
              </TabsTrigger>
              <TabsTrigger value="outgoing" className="flex items-center gap-2" data-testid="tab-outgoing-calls">
                <PhoneOutgoing className="h-4 w-4" />
                <span className="hidden sm:inline">{t('analytics.callTypes.outgoing')}</span>
                <span className="sm:hidden">{t('analytics.callTypes.outgoingShort')}</span>
                {typeBreakdown.outgoing > 0 && (
                  <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{typeBreakdown.outgoing}</span>
                )}
              </TabsTrigger>
              <TabsTrigger value="batch" className="flex items-center gap-2" data-testid="tab-campaign-calls">
                <Target className="h-4 w-4" />
                <span className="hidden sm:inline">{t('analytics.callTypes.campaigns')}</span>
                <span className="sm:hidden">{t('analytics.callTypes.campaignsShort')}</span>
                {typeBreakdown.batch > 0 && (
                  <span className="ml-1 text-xs bg-muted px-1.5 py-0.5 rounded-full">{typeBreakdown.batch}</span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={callType} className="mt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title={t('analytics.totalCalls')}
                  value={totalCalls.toLocaleString()}
                  icon={Phone}
                  trend={totalCalls > 0 ? { value: 0, direction: "up" as const } : undefined}
                  testId="metric-total-calls"
                  gradientClassName="bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-transparent dark:from-cyan-950/40 dark:via-sky-950/20 dark:to-slate-950/10"
                  iconClassName="text-cyan-600 dark:text-cyan-400"
                />
                <MetricCard
                  title={t('analytics.successRate')}
                  value={`${successRate}%`}
                  icon={TrendingUp}
                  trend={successRate > 0 ? { value: 0, direction: "up" as const } : undefined}
                  testId="metric-success-rate"
                  gradientClassName="bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-transparent dark:from-emerald-950/40 dark:via-green-950/20 dark:to-slate-950/10"
                  iconClassName="text-emerald-600 dark:text-emerald-400"
                />
                <MetricCard
                  title={t('analytics.qualifiedLeads')}
                  value={qualifiedLeads.toLocaleString()}
                  icon={Users}
                  trend={qualifiedLeads > 0 ? { value: 0, direction: "up" as const } : undefined}
                  testId="metric-qualified-leads"
                  gradientClassName="bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-slate-950/10"
                  iconClassName="text-blue-600 dark:text-blue-400"
                />
                <MetricCard
                  title={t('analytics.avgDurationLabel')}
                  value={formatDuration(avgDuration)}
                  icon={Clock}
                  subtitle={t('analytics.minutesPerCall')}
                  testId="metric-avg-duration"
                  gradientClassName="bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-transparent dark:from-violet-950/40 dark:via-purple-950/20 dark:to-slate-950/10"
                  iconClassName="text-violet-600 dark:text-violet-400"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart 
                  title={getCallVolumeTitle()} 
                  type="bar" 
                  data={formattedDailyCalls.length > 0 ? formattedDailyCalls : [{ name: t('analytics.noData'), value: 0 }]} 
                  testId="chart-calls-this-week"
                />
                <AnalyticsChart 
                  title={t('analytics.leadDistribution')} 
                  type="pie" 
                  data={leadDistribution.length > 0 ? leadDistribution : [{ name: t('analytics.noData'), value: 1 }]} 
                  testId="chart-lead-distribution"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AnalyticsChart 
                  title={t('analytics.campaignSuccessRate')} 
                  type="bar" 
                  data={campaignPerformance.length > 0 ? campaignPerformance : [{ name: t('analytics.noCampaigns'), value: 0 }]} 
                  xAxisKey="name"
                  dataKey="value"
                  testId="chart-campaign-success"
                />
                <AnalyticsChart 
                  title={t('analytics.sentimentAnalysis')} 
                  type="pie" 
                  data={sentimentDistribution.length > 0 ? sentimentDistribution : [{ name: t('analytics.noData'), value: 1 }]} 
                  testId="chart-sentiment-analysis"
                />
              </div>

              {callType === 'all' && typeBreakdown.total > 0 && (
                <CallTypeBreakdownCard typeBreakdown={typeBreakdown} />
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
