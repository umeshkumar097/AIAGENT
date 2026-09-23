import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export interface KnowledgeItem {
  id: string;
  title: string;
  type: string;
  /** From /api/rag-knowledge — only 'completed' items can be used on calls */
  ragStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  chunkCount?: number;
}

interface Props {
  knowledgeBase: KnowledgeItem[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

/** Checklist of the user's RAG documents the agent may consult on calls. */
export default function KnowledgeBasePicker({ knowledgeBase, selectedIds, onChange }: Props) {
  const { t } = useTranslation();
  const toggle = (id: string, on: boolean) => onChange(on ? [...selectedIds, id] : selectedIds.filter(x => x !== id));

  return (
    <div className="pt-3 space-y-2">
      <Label>{t('agentBuilder.knowledge', 'Knowledge base')}</Label>
      {knowledgeBase.length === 0 ? (
        <p className="text-xs text-muted-foreground">{t('agentBuilder.noKnowledge', 'No documents yet. Add them under Knowledge Base and they will show up here.')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {knowledgeBase.map(kb => {
            const ready = kb.ragStatus === 'completed' || (kb.chunkCount ?? 0) > 0;
            const statusLabel = ready
              ? null
              : kb.ragStatus === 'failed'
                ? t('agentBuilder.kbFailed', 'indexing failed')
                : t('agentBuilder.kbProcessing', 'indexing…');
            return (
              <label key={kb.id} className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-muted/40">
                <Checkbox
                  checked={selectedIds.includes(kb.id)}
                  onCheckedChange={(v) => toggle(kb.id, v === true)}
                  data-testid={`kb-${kb.id}`}
                />
                <span className="truncate">{kb.title}</span>
                {statusLabel && <span className="text-[10px] text-amber-600 dark:text-amber-400 whitespace-nowrap">{statusLabel}</span>}
                <span className="ml-auto text-[10px] uppercase text-muted-foreground">{kb.type}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
