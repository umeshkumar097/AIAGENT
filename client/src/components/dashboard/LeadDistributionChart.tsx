import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export function LeadDistributionChart({ leadData, totalLeads, t }: any) {
  return (
    <Card className="shadow-sm border-border">
      <CardHeader className="pb-2 bg-surface/50">
        <CardTitle className="text-base font-semibold text-foreground">{t('dashboard.leadDistribution')}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {leadData && leadData.length > 0 && totalLeads > 0 ? (
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={leadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {leadData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} (${((value / totalLeads) * 100).toFixed(0)}%)`, '']}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {leadData.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground">{item.name}</span>
                  <span className="text-xs font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[280px] flex items-center justify-center bg-surface/30 rounded-lg border border-dashed border-border/60">
            <div className="text-center max-w-sm px-4">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-primary/60" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">No Leads Yet</h4>
              <p className="text-xs text-muted-foreground">{t('dashboard.noLeadData') || "Lead distribution will appear here once campaigns start generating leads."}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
