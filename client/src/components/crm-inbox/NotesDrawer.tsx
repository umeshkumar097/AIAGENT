/** Side sheet with a lead's notes and a composer. Adding a note restarts the lead's SLA clock. */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { addNote, fetchNotes, invalidateInbox, notesKey, type InboxLead } from "@/lib/crm-inbox";

interface Props { lead: InboxLead | null; onClose: () => void }

export function NotesDrawer({ lead, onClose }: Props) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const leadId = lead?.id ?? "";

  const { data: notes = [], isLoading } = useQuery({
    queryKey: notesKey(leadId),
    queryFn: () => fetchNotes(leadId),
    enabled: !!leadId,
  });

  const add = useMutation({
    mutationFn: () => addNote(leadId, text.trim()),
    onSuccess: () => {
      setText("");
      invalidateInbox(leadId);
      toast({ title: t("crmInbox.noteAdded", "Note added — SLA clock restarted") });
    },
    onError: (e: Error) => toast({ title: t("crmInbox.noteFailed", "Could not add the note"), description: e.message, variant: "destructive" }),
  });

  return (
    <Sheet open={!!lead} onOpenChange={(o) => { if (!o) onClose(); }}>
      <SheetContent className="w-full sm:max-w-md flex flex-col" data-testid="notes-drawer">
        <SheetHeader>
          <SheetTitle>{lead?.name}</SheetTitle>
          <SheetDescription>
            {lead?.phone}{lead?.email ? ` · ${lead.email}` : ""}
            {lead?.aiNextAction && <span className="block mt-1 text-foreground/80">{t("crmInbox.nextAction", "Next: {{action}}", { action: lead.aiNextAction })}</span>}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto space-y-3 py-4" data-testid="notes-list">
          {isLoading && <><Skeleton className="h-14 w-full" /><Skeleton className="h-14 w-full" /></>}
          {!isLoading && notes.length === 0 && (
            <p className="text-sm text-muted-foreground">{t("crmInbox.noNotes", "No notes yet.")}</p>
          )}
          {notes.map(n => (
            <div key={n.id} className="rounded-md border bg-muted/30 p-3" data-testid={`note-${n.id}`}>
              <p className="text-sm whitespace-pre-wrap break-words">{n.content}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{format(new Date(n.createdAt), "dd MMM yyyy, HH:mm")}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-3 space-y-2">
          <Textarea
            value={text}
            maxLength={4000}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("crmInbox.notePlaceholder", "What happened on the follow-up?")}
            className="min-h-[80px]"
            data-testid="note-input"
            onKeyDown={(e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && text.trim()) add.mutate(); }}
          />
          <div className="flex justify-end">
            <Button size="sm" disabled={!text.trim() || add.isPending} onClick={() => add.mutate()} data-testid="note-submit">
              {add.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-1.5" />{t("crmInbox.addNote", "Add note")}</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
