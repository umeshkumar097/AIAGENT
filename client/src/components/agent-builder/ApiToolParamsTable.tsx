import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import { MAX_API_TOOL_PARAMS, PARAM_NAME_RE, type AgentApiToolParam } from "./actions";

interface Props {
  params: AgentApiToolParam[];
  onChange: (params: AgentApiToolParam[]) => void;
}

/** The inputs the model must supply when it calls this tool; each name becomes a {{placeholder}}. */
export default function ApiToolParamsTable({ params, onChange }: Props) {
  const { t } = useTranslation();
  const update = (i: number, patch: Partial<AgentApiToolParam>) =>
    onChange(params.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const remove = (i: number) => onChange(params.filter((_, idx) => idx !== i));
  const add = () => onChange([...params, { name: '', type: 'string', description: '', required: true }]);
  const names = params.map(p => p.name);

  return (
    <div className="space-y-2" data-testid="api-tool-params">
      {params.length > 0 && (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="h-8 text-xs">{t('agentBuilder.actions.apiTools.paramName', 'Name')}</TableHead>
                <TableHead className="h-8 text-xs w-28">{t('agentBuilder.actions.apiTools.paramType', 'Type')}</TableHead>
                <TableHead className="h-8 text-xs">{t('agentBuilder.actions.apiTools.paramDescription', 'What it is')}</TableHead>
                <TableHead className="h-8 text-xs w-20 text-center">{t('agentBuilder.actions.apiTools.paramRequired', 'Required')}</TableHead>
                <TableHead className="h-8 w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {params.map((p, i) => {
                const bad = !!p.name && (!PARAM_NAME_RE.test(p.name) || names.indexOf(p.name) !== i);
                return (
                  <TableRow key={i} data-testid={`api-param-${i}`}>
                    <TableCell className="p-1.5 align-top">
                      <Input
                        className={`h-8 text-sm font-mono min-w-[8rem] ${bad ? 'border-destructive' : ''}`} value={p.name} maxLength={40}
                        onChange={(e) => update(i, { name: e.target.value.replace(/\s+/g, '_') })}
                        placeholder="order_id" data-testid={`api-param-name-${i}`}
                      />
                    </TableCell>
                    <TableCell className="p-1.5 align-top">
                      <Select value={p.type} onValueChange={(v) => update(i, { type: v === 'number' ? 'number' : 'string' })}>
                        <SelectTrigger className="h-8 text-xs" data-testid={`api-param-type-${i}`}><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="string">{t('agentBuilder.actions.apiTools.typeString', 'Text')}</SelectItem>
                          <SelectItem value="number">{t('agentBuilder.actions.apiTools.typeNumber', 'Number')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="p-1.5 align-top">
                      <Input
                        className="h-8 text-sm min-w-[12rem]" value={p.description} maxLength={200}
                        onChange={(e) => update(i, { description: e.target.value })}
                        placeholder={t('agentBuilder.actions.apiTools.paramDescPlaceholder', 'e.g. the order number the caller gives')}
                        data-testid={`api-param-desc-${i}`}
                      />
                    </TableCell>
                    <TableCell className="p-1.5 align-top text-center">
                      <Checkbox className="mt-2" checked={p.required} onCheckedChange={(v) => update(i, { required: v === true })} data-testid={`api-param-required-${i}`} />
                    </TableCell>
                    <TableCell className="p-1.5 align-top">
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(i)}
                        aria-label={t('agentBuilder.actions.remove', 'Remove')} data-testid={`api-param-remove-${i}`}>
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      <Button type="button" variant="outline" size="sm" onClick={add} disabled={params.length >= MAX_API_TOOL_PARAMS} data-testid="button-add-api-param">
        <Plus className="h-3.5 w-3.5 mr-1" />
        {t('agentBuilder.actions.apiTools.addParam', 'Add input')}
        <span className="ml-1 text-muted-foreground">({params.length}/{MAX_API_TOOL_PARAMS})</span>
      </Button>
    </div>
  );
}
