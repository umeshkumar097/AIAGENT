import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  Phone, 
  Target, 
  CheckCircle2, 
  Calendar, 
  FileText, 
  BookOpen, 
  Webhook,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useLocation } from "wouter";

// Utility component for trend badge
export const TrendBadge = ({ trend }: { trend: number }) => {
  if (trend === 0) return <span className="text-muted-foreground/60 text-xs ml-1">--</span>;
  const isPositive = trend > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-medium ml-2 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
      {isPositive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
      {Math.abs(trend)}%
    </span>
  );
};

export const formatDuration = (seconds: number | null) => {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function StatCards({ 
  dashboard, 
  contactsCount, 
  campaignContactsCount, 
  callContactsCount, 
  t 
}: any) {
  const [, setLocation] = useLocation();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Calls - Tinted cyan/blue */}
        <Card className="bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30 border-cyan-100 dark:border-cyan-900/50" data-testid="card-total-calls">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('dashboard.totalCalls')}</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">{dashboard?.totalCalls || 0}</span>
              <TrendBadge trend={dashboard?.weeklyTrend || 0} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{t('dashboard.allTime')}</p>
          </CardContent>
        </Card>

        {/* Incoming Calls - Tinted green */}
        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-100 dark:border-emerald-900/50" data-testid="card-incoming-calls">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('dashboard.incomingCalls')}</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">{dashboard?.callTypeStats?.incoming?.count || 0}</span>
              <TrendBadge trend={dashboard?.callTypeStats?.incoming?.trend || 0} />
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{dashboard?.callTypeStats?.incoming?.successRate || 0}% {t('dashboard.success')}</span>
              <span>{t('dashboard.avg')} {formatDuration(dashboard?.callTypeStats?.incoming?.avgDuration || 0)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Outgoing Calls - Blue/indigo tint */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900/50" data-testid="card-outgoing-calls">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('dashboard.outgoingCalls')}</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">{dashboard?.callTypeStats?.outgoing?.count || 0}</span>
              <TrendBadge trend={dashboard?.callTypeStats?.outgoing?.trend || 0} />
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
              <span>{dashboard?.callTypeStats?.outgoing?.successRate || 0}% {t('dashboard.success')}</span>
              <span>{t('dashboard.avg')} {formatDuration(dashboard?.callTypeStats?.outgoing?.avgDuration || 0)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Card - Teal tint */}
        <Card 
          className="bg-gradient-to-br from-brand/5 to-brand/5 dark:from-brand/10 dark:to-brand/10 border-brand/20 dark:border-brand/20 cursor-pointer hover-elevate" 
          data-testid="card-contacts"
          onClick={() => setLocation('/app/contacts')}
        >
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('dashboard.contacts')}</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">{contactsCount}</span>
              <span className="text-xs text-muted-foreground ml-2">{t('common.total')}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                <Users className="h-3 w-3" />
                {campaignContactsCount} {t('dashboard.campaigns')}
              </span>
              <span className="flex items-center gap-1 text-violet-600 dark:text-violet-500">
                <Phone className="h-3 w-3" />
                {callContactsCount} {t('calls.title').toLowerCase()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Card - Purple/violet tint */}
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-100 dark:border-violet-900/50" data-testid="card-campaigns">
          <CardContent className="pt-5 pb-4">
            <p className="text-sm font-medium text-muted-foreground mb-1">{t('dashboard.campaignsCard')}</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold tracking-tight">{dashboard?.callTypeStats?.campaign?.count || 0}</span>
              <span className="text-xs text-muted-foreground ml-2">{t('common.total')}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 text-amber-600 dark:text-amber-500">
                <Target className="h-3 w-3" />
                {dashboard?.callTypeStats?.campaign?.active || 0} {t('common.active').toLowerCase()}
              </span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500">
                <CheckCircle2 className="h-3 w-3" />
                {dashboard?.callTypeStats?.campaign?.successRate || 0}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats Row - Appointments, Forms, Knowledge Base, Webhooks, Templates */}
      <div className="flex flex-wrap gap-4">
        {/* Appointments Booked Card */}
        <Card 
          className="flex-1 min-w-[200px] bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border-pink-100 dark:border-pink-900/50 cursor-pointer hover-elevate" 
          data-testid="card-appointments"
          onClick={() => setLocation('/app/flows/appointments')}
        >
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground leading-tight mb-1">{t('dashboard.appointmentsBooked')}</p>
                <span className="text-2xl font-bold tracking-tight">{dashboard?.appointmentsBooked || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forms Submitted Card */}
        <Card 
          className="flex-1 min-w-[200px] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-indigo-100 dark:border-indigo-900/50 cursor-pointer hover-elevate" 
          data-testid="card-forms-submitted"
          onClick={() => setLocation('/app/flows/forms')}
        >
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground leading-tight mb-1">{t('dashboard.formsSubmitted')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">{dashboard?.formsSubmitted || 0}</span>
                  <span className="text-xs text-muted-foreground">
                    ({dashboard?.formsCount || 0} {t('forms.totalForms').toLowerCase()})
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Base Card */}
        <Card 
          className="flex-1 min-w-[200px] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-100 dark:border-amber-900/50 cursor-pointer hover-elevate" 
          data-testid="card-knowledge-base"
          onClick={() => setLocation('/app/knowledge-base')}
        >
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground leading-tight mb-1">{t('dashboard.knowledgeBase')}</p>
                <span className="text-2xl font-bold tracking-tight">{dashboard?.knowledgeBaseCount || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Webhooks Card */}
        <Card 
          className="flex-1 min-w-[200px] bg-gradient-to-br from-brand/5 to-brand/5 dark:from-brand/10 dark:to-brand/10 border-brand/10 cursor-pointer hover-elevate" 
          data-testid="card-webhooks"
          onClick={() => setLocation('/app/flows/webhooks')}
        >
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-brand to-brand/90 flex items-center justify-center">
                <Webhook className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground leading-tight mb-1">{t('dashboard.webhooks')}</p>
                <span className="text-2xl font-bold tracking-tight">{dashboard?.webhooksCount || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Card */}
        <Card 
          className="flex-1 min-w-[200px] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-100 dark:border-green-900/50 cursor-pointer hover-elevate" 
          data-testid="card-templates"
          onClick={() => setLocation('/app/flows/templates')}
        >
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground leading-tight mb-1">{t('dashboard.templates')}</p>
                <span className="text-2xl font-bold tracking-tight">{dashboard?.templatesCount || 0}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
