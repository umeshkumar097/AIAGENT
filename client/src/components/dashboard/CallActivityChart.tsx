import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export function CallActivityChart({ weeklyChartData, t }: any) {
  const [chartView, setChartView] = useState<'all' | 'incoming' | 'outgoing'>('all');

  return (
    <Card className="lg:col-span-2 shadow-sm border-border">
      <CardHeader className="pb-2 bg-surface/50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">{t('dashboard.callActivity')}</CardTitle>
          <div className="flex items-center border-b border-border/50">
            <button
              onClick={() => setChartView('all')}
              className={`px-3 py-1.5 text-sm font-medium border-b-2 transition-colors ${
                chartView === 'all' 
                  ? 'border-primary text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('dashboard.allCalls')}
            </button>
            <button
              onClick={() => setChartView('incoming')}
              className={`px-3 py-1.5 text-sm font-medium border-b-2 transition-colors ${
                chartView === 'incoming' 
                  ? 'border-emerald-500 text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('dashboard.incoming')}
            </button>
            <button
              onClick={() => setChartView('outgoing')}
              className={`px-3 py-1.5 text-sm font-medium border-b-2 transition-colors ${
                chartView === 'outgoing' 
                  ? 'border-blue-500 text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('dashboard.outgoing')}
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {weeklyChartData && weeklyChartData.length > 0 && weeklyChartData.some((d: any) => d.Total > 0) ? (
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                  tickLine={false} 
                  axisLine={false}
                  width={35}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                {(chartView === 'all' || chartView === 'incoming') && (
                  <Area 
                    type="monotone" 
                    dataKey="Incoming" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorIncoming)" 
                  />
                )}
                {(chartView === 'all' || chartView === 'outgoing') && (
                  <Area 
                    type="monotone" 
                    dataKey="Outgoing" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorOutgoing)" 
                  />
                )}
                {chartView === 'all' && (
                  <Legend 
                    wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                    iconType="circle"
                    iconSize={8}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[280px] flex items-center justify-center bg-surface/30 rounded-lg border border-dashed border-border/60">
            <div className="text-center max-w-sm px-4">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary/60" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">No Call Activity Yet</h4>
              <p className="text-xs text-muted-foreground">{t('dashboard.noCallData') || "Start a campaign or make your first call to see activity trends here."}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
