import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Trash2 } from "lucide-react";
import ApiToolDialog from "./ApiToolDialog";
import { MAX_API_TOOLS, type AgentApiTool } from "./actions";

interface Props {
  tools: AgentApiTool[];
  onChange: (tools: AgentApiTool[]) => void;
}

/** List of the agent's custom API lookups with add / edit / remove. */
export default function ApiToolsEditor({ tools, onChange }: Props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<AgentApiTool | null>(null);

  const startAdd = () => { setEditing(null); setOpen(true); };
  const startEdit = (tool: AgentApiTool) => { setEditing(tool); setOpen(true); };
  const remove = (id: string) => onChange(tools.filter(x => x.id !== id));
  const save = (tool: AgentApiTool) => {
    const exists = tools.some(x => x.id === tool.id);
    onChange(exists ? tools.map(x => (x.id === tool.id ? tool : x)) : [...tools, tool]);
  };

  return (
    <div className="pb-3 space-y-2" data-testid="api-tools-editor">
      {tools.length > 0 && (
        <div className="space-y-1.5">
          {tools.map(tool => (
            <div key={tool.id} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm" data-testid={`api-tool-${tool.name}`}>
              <Badge variant="outline" className="font-mono text-[10px] px-1.5 py-0 shrink-0">{tool.method}</Badge>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-mono text-xs truncate">api_{tool.name}</span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                    {t('agentBuilder.actions.apiTools.inputCount', '{{count}} inputs', { count: tool.params.length })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{tool.description || tool.url}</p>
              </div>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => startEdit(tool)}
                aria-label={t('agentBuilder.actions.edit', 'Edit')} data-testid={`api-tool-edit-${tool.name}`}>
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-destructive" onClick={() => remove(tool.id)}
                aria-label={t('agentBuilder.actions.remove', 'Remove')} data-testid={`api-tool-remove-${tool.name}`}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Button type="button" variant="outline" size="sm" onClick={startAdd} disabled={tools.length >= MAX_API_TOOLS} data-testid="button-add-api-tool">
        <Plus className="h-3.5 w-3.5 mr-1" />
        {t('agentBuilder.actions.apiTools.addButton', 'Add an API lookup')}
        <span className="ml-1 text-muted-foreground">({tools.length}/{MAX_API_TOOLS})</span>
      </Button>

      <ApiToolDialog
        open={open}
        onOpenChange={setOpen}
        initial={editing}
        existingNames={tools.filter(x => x.id !== editing?.id).map(x => x.name)}
        onSave={save}
      />
    </div>
  );
}
