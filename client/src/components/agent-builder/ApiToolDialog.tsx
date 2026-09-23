import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Plus, X } from "lucide-react";
import ApiToolParamsTable from "./ApiToolParamsTable";
import ApiToolTestPanel from "./ApiToolTestPanel";
import { API_TOOL_NAME_RE, PARAM_NAME_RE, type AgentApiTool } from "./actions";

interface HeaderRow { key: string; value: string; masked: boolean }

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** null = create a new tool */
  initial: AgentApiTool | null;
  /** Names of the other tools (uniqueness check). */
  existingNames: string[];
  onSave: (tool: AgentApiTool) => void;
}

const SECRET_HEADER = /authorization|key|token|secret|password/i;

function blankTool(): AgentApiTool {
  return { id: nanoid(), name: '', description: '', url: '', method: 'GET', params: [], timeoutMs: 8000 };
}

function rowsFromHeaders(h?: Record<string, string>): HeaderRow[] {
  return Object.entries(h || {}).map(([key, value]) => ({ key, value, masked: SECRET_HEADER.test(key) || value.length > 0 }));
}

/** Validation returns an i18n key suffix (agentBuilder.actions.apiTools.errors.*) or null. */
export function validateApiTool(tool: AgentApiTool, headers: HeaderRow[], existingNames: string[]): string | null {
  if (!API_TOOL_NAME_RE.test(tool.name)) return 'name';
  if (existingNames.includes(tool.name)) return 'nameTaken';
  if (!tool.description.trim()) return 'description';
  if (!/^https:\/\//i.test(tool.url)) return 'url';
  try { new URL(tool.url.replace(/\{\{\s*[\w.]+\s*\}\}/g, 'x')); } catch { return 'url'; }
  if (tool.params.some(p => !PARAM_NAME_RE.test(p.name))) return 'params';
  if (new Set(tool.params.map(p => p.name)).size !== tool.params.length) return 'params';
  if (headers.some(h => !h.key.trim() && h.value.trim())) return 'headers';
  if (tool.method === 'POST' && tool.bodyTemplate?.trim()) {
    try { JSON.parse(tool.bodyTemplate.replace(/"?\{\{\s*[\w.]+\s*\}\}"?/g, '0')); } catch { return 'body'; }
  }
  if (tool.timeoutMs !== undefined && (tool.timeoutMs < 1000 || tool.timeoutMs > 12000)) return 'timeout';
  return null;
}

/** Add / edit one custom API lookup the agent may call during a call. */
export default function ApiToolDialog({ open, onOpenChange, initial, existingNames, onSave }: Props) {
  const { t } = useTranslation();
  const [tool, setTool] = useState<AgentApiTool>(blankTool);
  const [headers, setHeaders] = useState<HeaderRow[]>([]);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!open) return;
    setTool(initial ? { ...initial, params: initial.params.map(p => ({ ...p })) } : blankTool());
    setHeaders(rowsFromHeaders(initial?.headers));
    setTouched(false);
  }, [open, initial]);

  const patch = (p: Partial<AgentApiTool>) => setTool(prev => ({ ...prev, ...p }));
  const setHeader = (i: number, p: Partial<HeaderRow>) => setHeaders(rows => rows.map((r, idx) => (idx === i ? { ...r, ...p } : r)));

  /** What will be saved / tested — headers folded back into the record. */
  const built: AgentApiTool = useMemo(() => {
    const h: Record<string, string> = {};
    for (const r of headers) if (r.key.trim()) h[r.key.trim()] = r.value;
    return {
      ...tool,
      name: tool.name.trim(),
      description: tool.description.trim(),
      url: tool.url.trim(),
      headers: Object.keys(h).length ? h : undefined,
      bodyTemplate: tool.method === 'POST' && tool.bodyTemplate?.trim() ? tool.bodyTemplate.trim() : undefined,
      responsePath: tool.responsePath?.trim() || undefined,
      params: tool.params.map(p => ({ ...p, name: p.name.trim(), description: p.description.trim() })),
    };
  }, [tool, headers]);

  const errorKey = validateApiTool(built, headers, existingNames);
  const errorText = errorKey && {
    name: t('agentBuilder.actions.apiTools.errors.name', 'Name: 2–30 lowercase letters, digits or underscores.'),
    nameTaken: t('agentBuilder.actions.apiTools.errors.nameTaken', 'Another lookup already uses this name.'),
    description: t('agentBuilder.actions.apiTools.errors.description', 'Describe when the agent should use it.'),
    url: t('agentBuilder.actions.apiTools.errors.url', 'Enter a valid https:// URL.'),
    params: t('agentBuilder.actions.apiTools.errors.params', 'Every input needs a unique name (letters, digits, underscores).'),
    headers: t('agentBuilder.actions.apiTools.errors.headers', 'Every header needs a name.'),
    body: t('agentBuilder.actions.apiTools.errors.body', 'The body template must be valid JSON (placeholders allowed).'),
    timeout: t('agentBuilder.actions.apiTools.errors.timeout', 'Timeout must be between 1 and 12 seconds.'),
  }[errorKey];

  const save = () => {
    setTouched(true);
    if (errorKey) return;
    onSave(built);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="api-tool-dialog">
        <DialogHeader>
          <DialogTitle>{initial ? t('agentBuilder.actions.apiTools.editTitle', 'Edit API lookup') : t('agentBuilder.actions.apiTools.addTitle', 'Add an API lookup')}</DialogTitle>
          <DialogDescription>
            {t('agentBuilder.actions.apiTools.dialogDesc', 'The agent calls this endpoint when it needs the data — e.g. an order status by order number. Use {{input}} placeholders in the URL or body.')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3">
            <div className="space-y-1">
              <Label htmlFor="api-tool-name" className="text-xs">{t('agentBuilder.actions.apiTools.name', 'Name')}</Label>
              <div className="flex items-center">
                <span className="h-9 inline-flex items-center rounded-l-md border border-r-0 bg-muted px-2 text-xs font-mono text-muted-foreground">api_</span>
                <Input id="api-tool-name" className="h-9 rounded-l-none font-mono" value={tool.name} maxLength={30}
                  onChange={(e) => patch({ name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '_') })}
                  placeholder="order_status" data-testid="input-api-tool-name" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="api-tool-desc" className="text-xs">{t('agentBuilder.actions.apiTools.description', 'When should the agent use it?')}</Label>
              <Input id="api-tool-desc" className="h-9" value={tool.description} maxLength={300}
                onChange={(e) => patch({ description: e.target.value })}
                placeholder={t('agentBuilder.actions.apiTools.descPlaceholder', 'Look up the status of an order by its order number')}
                data-testid="input-api-tool-desc" />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xs">{t('agentBuilder.actions.apiTools.endpoint', 'Endpoint')}</Label>
            <div className="flex gap-2">
              <Select value={tool.method} onValueChange={(v) => patch({ method: v === 'POST' ? 'POST' : 'GET' })}>
                <SelectTrigger className="h-9 w-24 font-mono text-xs" data-testid="select-api-tool-method"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="GET">GET</SelectItem><SelectItem value="POST">POST</SelectItem></SelectContent>
              </Select>
              <Input className="h-9 font-mono text-sm" value={tool.url} maxLength={1000} onChange={(e) => patch({ url: e.target.value })}
                placeholder="https://api.example.com/orders/{{order_id}}" data-testid="input-api-tool-url" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label className="text-xs">{t('agentBuilder.actions.apiTools.headers', 'Headers (optional)')}</Label>
              <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setHeaders(r => [...r, { key: '', value: '', masked: false }])} disabled={headers.length >= 10} data-testid="button-add-header">
                <Plus className="h-3 w-3 mr-1" />{t('agentBuilder.actions.apiTools.addHeader', 'Add header')}
              </Button>
            </div>
            {headers.map((h, i) => (
              <div key={i} className="flex items-center gap-2" data-testid={`api-header-${i}`}>
                <Input className="h-8 text-sm font-mono sm:w-48" value={h.key} maxLength={80} onChange={(e) => setHeader(i, { key: e.target.value })} placeholder="Authorization" data-testid={`api-header-key-${i}`} />
                <Input className="h-8 text-sm font-mono" type={h.masked ? 'password' : 'text'} value={h.value} maxLength={2000} onChange={(e) => setHeader(i, { value: e.target.value })} placeholder="Bearer …" autoComplete="off" data-testid={`api-header-value-${i}`} />
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setHeader(i, { masked: !h.masked })}
                  aria-label={h.masked ? t('agentBuilder.actions.apiTools.reveal', 'Show value') : t('agentBuilder.actions.apiTools.hide', 'Hide value')} data-testid={`api-header-toggle-${i}`}>
                  {h.masked ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setHeaders(r => r.filter((_, idx) => idx !== i))} aria-label={t('agentBuilder.actions.remove', 'Remove')} data-testid={`api-header-remove-${i}`}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
            {headers.length > 0 && <p className="text-[11px] text-muted-foreground">{t('agentBuilder.actions.apiTools.headersHint', 'Stored with the agent and sent as-is. Values are hidden here after saving.')}</p>}
          </div>

          <div className="space-y-1">
            <Label className="text-xs">{t('agentBuilder.actions.apiTools.inputs', 'Inputs the agent collects from the caller')}</Label>
            <ApiToolParamsTable params={tool.params} onChange={(params) => patch({ params })} />
          </div>

          {tool.method === 'POST' && (
            <div className="space-y-1">
              <Label htmlFor="api-tool-body" className="text-xs">{t('agentBuilder.actions.apiTools.body', 'JSON body template (optional)')}</Label>
              <Textarea id="api-tool-body" className="font-mono text-xs min-h-[72px]" value={tool.bodyTemplate || ''} maxLength={4000}
                onChange={(e) => patch({ bodyTemplate: e.target.value })}
                placeholder={'{ "orderId": "{{order_id}}" }'} data-testid="input-api-tool-body" />
              <p className="text-[11px] text-muted-foreground">{t('agentBuilder.actions.apiTools.bodyHint', 'Leave empty to send all inputs as a JSON object.')}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="api-tool-path" className="text-xs">{t('agentBuilder.actions.apiTools.responsePath', 'Response field to use (optional)')}</Label>
              <Input id="api-tool-path" className="h-9 font-mono text-sm" value={tool.responsePath || ''} maxLength={200} onChange={(e) => patch({ responsePath: e.target.value })} placeholder="data.order.status" data-testid="input-api-tool-path" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="api-tool-timeout" className="text-xs">{t('agentBuilder.actions.apiTools.timeout', 'Timeout (seconds)')}</Label>
              <Input id="api-tool-timeout" className="h-9" type="number" min={1} max={12} step={1} value={Math.round((tool.timeoutMs ?? 8000) / 1000)}
                onChange={(e) => patch({ timeoutMs: Math.max(1, Math.min(12, Number(e.target.value) || 8)) * 1000 })} data-testid="input-api-tool-timeout" />
            </div>
          </div>

          <ApiToolTestPanel tool={built} disabled={!!errorKey && errorKey !== 'nameTaken'} />
        </div>

        <DialogFooter className="flex-col sm:flex-row sm:items-center gap-2">
          {touched && errorText && <p className="text-xs text-destructive sm:mr-auto" data-testid="api-tool-error">{errorText}</p>}
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="button-cancel-api-tool">{t('common.cancel', 'Cancel')}</Button>
          <Button type="button" onClick={save} data-testid="button-save-api-tool">{initial ? t('agentBuilder.actions.apiTools.saveChanges', 'Save lookup') : t('agentBuilder.actions.apiTools.add', 'Add lookup')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
