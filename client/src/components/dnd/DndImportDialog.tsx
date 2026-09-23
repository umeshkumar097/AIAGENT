import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DND_IMPORT_MAX, importDnd, invalidateDnd, parsePhones } from "@/lib/dnd";

interface Props { open: boolean; onOpenChange: (open: boolean) => void }

/** Paste numbers or pick a CSV; parsed in the browser, sent as `{ phones }`. */
export default function DndImportDialog({ open, onOpenChange }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const parsed = useMemo(() => parsePhones(text), [text]);
  const overLimit = parsed.phones.length > DND_IMPORT_MAX;

  const importM = useMutation({
    mutationFn: () => importDnd(parsed.phones),
    onSuccess: (r) => {
      invalidateDnd();
      toast({
        title: t('dnd.importDone', 'Do-not-call list updated'),
        description: t('dnd.importSummary', '{{added}} added, {{skipped}} already listed or invalid', { added: r.added, skipped: r.skipped }),
      });
      setText(""); setFileName(null);
      onOpenChange(false);
    },
    onError: (e: Error) => toast({ title: t('dnd.importFailed', 'Import failed'), description: e.message, variant: "destructive" }),
  });

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: t('dnd.fileTooLarge', 'File is too large (max 5 MB)'), variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => { setText(String(reader.result || "")); setFileName(file.name); };
    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-dnd-import">
        <DialogHeader>
          <DialogTitle>{t('dnd.import', 'Import list')}</DialogTitle>
          <DialogDescription>
            {t('dnd.importDesc', 'Paste numbers (one per line) or pick a CSV whose first column is the phone number. 10-digit numbers are treated as Indian (+91).')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="dnd-import-text" className="text-xs">{t('dnd.pasteLabel', 'Numbers')}</Label>
            <Textarea
              id="dnd-import-text" value={text} onChange={(e) => { setText(e.target.value); setFileName(null); }}
              rows={8} className="font-mono text-xs" placeholder={"+919876543210\n9123456789\n..."}
              data-testid="textarea-dnd-import"
            />
          </div>
          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <label className="inline-flex items-center gap-1.5 cursor-pointer underline">
              <Upload className="h-3.5 w-3.5" />
              {fileName || t('dnd.pickCsv', 'Choose a CSV / text file')}
              <input type="file" accept=".csv,.txt,text/csv,text/plain" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} data-testid="input-dnd-file" />
            </label>
            <span data-testid="text-dnd-parsed">
              {t('dnd.parsed', '{{count}} numbers found', { count: parsed.phones.length })}
              {parsed.invalid > 0 && ` · ${t('dnd.invalidLines', '{{count}} lines skipped', { count: parsed.invalid })}`}
            </span>
          </div>
          {overLimit && (
            <p className="text-xs text-destructive">{t('dnd.tooMany', 'At most {{max}} numbers per import — only the first {{max}} will be sent.', { max: DND_IMPORT_MAX })}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-dnd-import-cancel">{t('common.cancel', 'Cancel')}</Button>
          <Button onClick={() => importM.mutate()} disabled={parsed.phones.length === 0 || importM.isPending} data-testid="button-dnd-import-confirm">
            {importM.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {t('dnd.importConfirm', 'Add {{count}} numbers', { count: Math.min(parsed.phones.length, DND_IMPORT_MAX) })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
