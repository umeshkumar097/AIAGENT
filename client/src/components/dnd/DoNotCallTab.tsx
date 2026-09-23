import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ban, Loader2, Plus, Search, Trash2, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addDnd, dndQueryKey, fetchDnd, invalidateDnd, normalizePhoneLoose, removeDnd, type DndNumber } from "@/lib/dnd";
import DndImportDialog from "./DndImportDialog";

const PAGE_SIZE = 25;

/**
 * "Do not call" tab on the All Contacts page: numbers that campaigns, retries and
 * callbacks must never dial. Inbound calls are never blocked.
 */
export default function DoNotCallTab() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [importOpen, setImportOpen] = useState(false);

  const key = dndQueryKey(search, PAGE_SIZE, page * PAGE_SIZE);
  const listQ = useQuery({ queryKey: key, queryFn: () => fetchDnd(search, PAGE_SIZE, page * PAGE_SIZE) });
  const numbers = listQ.data?.numbers ?? [];
  const total = listQ.data?.total ?? 0;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const addM = useMutation({
    mutationFn: () => addDnd(normalizePhoneLoose(phone) || phone.trim(), note),
    onSuccess: () => {
      setPhone(""); setNote("");
      invalidateDnd();
      toast({ title: t('dnd.added', 'Number added to the do-not-call list') });
    },
    onError: (e: Error) => toast({ title: t('dnd.addFailed', 'Could not add number'), description: e.message, variant: "destructive" }),
  });

  const removeM = useMutation({
    mutationFn: (id: string) => removeDnd(id),
    onSuccess: () => { invalidateDnd(); toast({ title: t('dnd.removed', 'Number removed — it can be called again') }); },
    onError: (e: Error) => toast({ title: t('dnd.removeFailed', 'Could not remove number'), description: e.message, variant: "destructive" }),
  });

  const reasonLabel: Record<string, string> = {
    caller_request: t('dnd.reason.caller_request', 'Caller asked'),
    manual: t('dnd.reason.manual', 'Added by you'),
    import: t('dnd.reason.import', 'Imported'),
    complaint: t('dnd.reason.complaint', 'Complaint'),
  };
  const sourceLabel: Record<string, string> = {
    agent: t('dnd.source.agent', 'On a call'),
    manual: t('dnd.source.manual', 'Manual'),
    upload: t('dnd.source.upload', 'Upload'),
    api: t('dnd.source.api', 'API'),
  };

  const canAdd = !!normalizePhoneLoose(phone) && !addM.isPending;

  return (
    <div className="space-y-4" data-testid="dnd-tab">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t('dnd.searchPlaceholder', 'Search numbers…')}
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            data-testid="input-search-dnd"
          />
        </div>
        <Button variant="outline" onClick={() => setImportOpen(true)} data-testid="button-dnd-import">
          <Upload className="h-4 w-4 mr-2" />{t('dnd.import', 'Import list')}
        </Button>
      </div>

      <form
        className="flex flex-col sm:flex-row gap-2"
        onSubmit={(e) => { e.preventDefault(); if (canAdd) addM.mutate(); }}
        data-testid="form-dnd-add"
      >
        <Input
          type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
          placeholder="+91 98765 43210" className="sm:w-56" data-testid="input-dnd-phone"
        />
        <Input
          value={note} onChange={(e) => setNote(e.target.value)} maxLength={200}
          placeholder={t('dnd.notePlaceholder', 'Note (optional)')} className="flex-1" data-testid="input-dnd-note"
        />
        <Button type="submit" disabled={!canAdd} data-testid="button-dnd-add">
          {addM.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
          {t('dnd.add', 'Add number')}
        </Button>
      </form>

      <p className="text-xs text-muted-foreground">
        {t('dnd.explainer', 'Campaign uploads skip these numbers, and scheduled retries and callbacks never dial them. People who call you are never blocked.')}
      </p>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('contacts.fields.phone', 'Phone')}</TableHead>
                <TableHead>{t('dnd.fields.reason', 'Reason')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('dnd.fields.source', 'Source')}</TableHead>
                <TableHead className="hidden lg:table-cell">{t('dnd.fields.note', 'Note')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('dnd.fields.added', 'Added')}</TableHead>
                <TableHead className="w-[80px]">{t('contacts.fields.actions', 'Actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listQ.isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground">{t('common.loading', 'Loading…')}</TableCell></TableRow>
              ) : listQ.isError ? (
                <TableRow><TableCell colSpan={6} className="text-center text-destructive">{t('dnd.loadFailed', 'Could not load the do-not-call list.')}</TableCell></TableRow>
              ) : numbers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    <Ban className="h-5 w-5 mx-auto mb-1 opacity-50" />
                    {search ? t('dnd.noMatch', 'No numbers match your search') : t('dnd.empty', 'No blocked numbers yet')}
                  </TableCell>
                </TableRow>
              ) : numbers.map((n: DndNumber) => (
                <TableRow key={n.id} data-testid={`row-dnd-${n.id}`}>
                  <TableCell className="font-mono text-sm">{n.phone}</TableCell>
                  <TableCell><Badge variant="outline">{reasonLabel[n.reason] || n.reason}</Badge></TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">{sourceLabel[n.source] || n.source}</TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground max-w-[240px] truncate">{n.note || "-"}</TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{n.createdAt ? new Date(n.createdAt).toLocaleDateString() : "-"}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost" size="icon" onClick={() => removeM.mutate(n.id)} disabled={removeM.isPending}
                      title={t('dnd.remove', 'Remove from list')} data-testid={`button-dnd-remove-${n.id}`}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {pages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{t('dnd.count', '{{count}} numbers', { count: total })}</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)} data-testid="button-dnd-prev">{t('common.previous', 'Previous')}</Button>
            <span>{page + 1} / {pages}</span>
            <Button variant="outline" size="sm" disabled={page + 1 >= pages} onClick={() => setPage(p => p + 1)} data-testid="button-dnd-next">{t('common.next', 'Next')}</Button>
          </div>
        </div>
      )}

      <DndImportDialog open={importOpen} onOpenChange={setImportOpen} />
    </div>
  );
}
