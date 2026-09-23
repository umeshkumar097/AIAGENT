import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, FlaskConical, Loader2, XCircle } from "lucide-react";
import { testApiTool, type AgentApiTool, type ApiToolTestResult } from "./actions";

interface Props {
  tool: AgentApiTool;
  /** True when the draft cannot be sent yet (invalid URL/name); the button is disabled with a hint. */
  disabled?: boolean;
}

/**
 * "Test with sample values": runs the tool once through POST /api/agents/tools/test
 * and shows exactly what the model would receive.
 */
export default function ApiToolTestPanel({ tool, disabled }: Props) {
  const { t } = useTranslation();
  const [values, setValues] = useState<Record<string, string>>({});
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<ApiToolTestResult | null>(null);
  const params = tool.params.filter(p => p.name);

  const run = async () => {
    setRunning(true);
    setResult(null);
    try {
      const typed: Record<string, string | number> = {};
      for (const p of params) {
        const raw = values[p.name] ?? '';
        if (raw === '') continue;
        typed[p.name] = p.type === 'number' ? Number(raw) : raw;
      }
      setResult(await testApiTool(tool, typed));
    } catch (e) {
      setResult({ ok: false, message: '', error: e instanceof Error ? e.message : String(e) });
    } finally {
      setRunning(false);
    }
  };

  const missing = params.some(p => p.required && !(values[p.name] ?? '').trim());

  return (
    <div className="rounded-md border bg-muted/30 p-3 space-y-2" data-testid="api-tool-test">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs font-medium">{t('agentBuilder.actions.apiTools.testTitle', 'Test with sample values')}</Label>
        <Button type="button" size="sm" variant="secondary" onClick={run} disabled={disabled || running || missing} data-testid="button-test-api-tool">
          {running ? <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> : <FlaskConical className="h-3.5 w-3.5 mr-1" />}
          {t('agentBuilder.actions.apiTools.runTest', 'Run test')}
        </Button>
      </div>
      {params.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {params.map(p => (
            <div key={p.name} className="space-y-0.5">
              <Label className="text-[11px] font-mono text-muted-foreground">{p.name}{p.required ? ' *' : ''}</Label>
              <Input
                className="h-8 text-sm" type={p.type === 'number' ? 'number' : 'text'}
                value={values[p.name] ?? ''} onChange={(e) => setValues(v => ({ ...v, [p.name]: e.target.value }))}
                placeholder={p.description || p.name} data-testid={`api-test-value-${p.name}`}
              />
            </div>
          ))}
        </div>
      )}
      {disabled && (
        <p className="text-[11px] text-muted-foreground">{t('agentBuilder.actions.apiTools.testDisabled', 'Fill in a valid name and https URL first.')}</p>
      )}
      {result && (
        <div className={`rounded-md border p-2 text-xs space-y-1 ${result.ok ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-destructive/40 bg-destructive/5'}`} data-testid="api-test-result">
          <div className="flex items-center gap-1.5 font-medium">
            {result.ok ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
            {result.ok
              ? t('agentBuilder.actions.apiTools.testOk', 'The agent would receive:')
              : t('agentBuilder.actions.apiTools.testFailed', 'Request failed')}
            {typeof result.status === 'number' && <span className="ml-auto font-mono text-muted-foreground">HTTP {result.status}</span>}
          </div>
          <pre className="whitespace-pre-wrap break-all font-mono max-h-40 overflow-auto">{result.ok ? result.message : (result.error || result.message)}</pre>
        </div>
      )}
    </div>
  );
}
