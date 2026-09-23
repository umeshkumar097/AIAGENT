import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones, Loader2, Mic, MicOff, PhoneOff, Volume2 } from "lucide-react";
import { TEST_CALL_MAX_SECONDS, TestCallClient, type TestCallStatus, type TranscriptLine } from "@/lib/test-call";

interface Props {
  agentId: string;
  agentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function mmss(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * "Test in browser" — talk to a saved Sarvam agent through the microphone.
 * Audio is μ-law 8 kHz over a WebSocket (see lib/test-call.ts); tools run for real.
 */
export default function BrowserTestCall({ agentId, agentName, open, onOpenChange }: Props) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<TestCallStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [maxSeconds, setMaxSeconds] = useState(TEST_CALL_MAX_SECONDS);
  const clientRef = useRef<TestCallClient | null>(null);
  const lineId = useRef(0);
  const listRef = useRef<HTMLDivElement | null>(null);
  const live = status === 'listening' || status === 'speaking';

  // Elapsed clock + hard limit (startedAt is fixed when the call goes live)
  const startedAt = useRef(0);
  useEffect(() => {
    if (!live) return;
    if (!startedAt.current) startedAt.current = Date.now();
    const id = window.setInterval(() => {
      const secs = Math.floor((Date.now() - startedAt.current) / 1000);
      setElapsed(secs);
      if (secs >= maxSeconds) clientRef.current?.stop();
    }, 500);
    return () => window.clearInterval(id);
  }, [live, maxSeconds]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [lines]);

  // Tear down on close/unmount
  useEffect(() => {
    if (open) return;
    clientRef.current?.stop();
    clientRef.current = null;
    setStatus('idle'); setError(null); setLines([]); setElapsed(0);
  }, [open]);
  useEffect(() => () => { clientRef.current?.stop(); }, []);

  const start = async () => {
    setError(null); setLines([]); setElapsed(0); startedAt.current = 0;
    const client = new TestCallClient(agentId, {
      onStatus: (s, detail) => {
        setStatus(s);
        if (s === 'ended' && detail) setLines(prev => [...prev, { id: ++lineId.current, role: 'system', text: detail }]);
      },
      onTranscript: (line) => setLines(prev => [...prev.slice(-199), { id: ++lineId.current, ...line }]),
    });
    clientRef.current = client;
    try {
      const session = await client.start();
      setMaxSeconds(session.maxSeconds || TEST_CALL_MAX_SECONDS);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg === 'cancelled') return;
      client.stop();
      setStatus('error');
      setError(/NotAllowed|Permission|denied/i.test(msg)
        ? t('testCall.micDenied', 'Microphone access was blocked. Allow the microphone for this site and try again.')
        : msg);
    }
  };

  const end = () => clientRef.current?.stop();

  const statusPill = (() => {
    switch (status) {
      case 'mic': return <Badge variant="outline" className="gap-1"><Mic className="h-3 w-3" />{t('testCall.status.mic', 'Waiting for microphone…')}</Badge>;
      case 'connecting': return <Badge variant="outline" className="gap-1"><Loader2 className="h-3 w-3 animate-spin" />{t('testCall.status.connecting', 'Connecting')}</Badge>;
      case 'listening': return <Badge className="gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20"><Mic className="h-3 w-3" />{t('testCall.status.listening', 'Listening')}</Badge>;
      case 'speaking': return <Badge className="gap-1 bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20"><Volume2 className="h-3 w-3" />{t('testCall.status.speaking', 'Agent speaking')}</Badge>;
      case 'ended': return <Badge variant="secondary" className="gap-1"><PhoneOff className="h-3 w-3" />{t('testCall.status.ended', 'Call ended')}</Badge>;
      case 'error': return <Badge variant="destructive" className="gap-1"><MicOff className="h-3 w-3" />{t('testCall.status.error', 'Could not start')}</Badge>;
      default: return null;
    }
  })();

  const roleLabel: Record<TranscriptLine['role'], string> = {
    user: t('testCall.you', 'You'),
    agent: agentName || t('testCall.agent', 'Agent'),
    system: t('testCall.system', 'System'),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" data-testid="dialog-test-call">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><Headphones className="h-5 w-5" />{t('testCall.title', 'Test in browser')}</DialogTitle>
          <DialogDescription>
            {t('testCall.desc', 'Talk to "{{name}}" through your microphone. No phone number or credits are used; appointments, leads and messages the agent creates are real.', { name: agentName })}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between gap-3">
          <div className="min-h-[24px]">{statusPill}</div>
          <span className={`font-mono text-sm tabular-nums ${maxSeconds - elapsed <= 30 && live ? 'text-destructive' : 'text-muted-foreground'}`} data-testid="text-test-call-timer">
            {mmss(elapsed)} / {mmss(maxSeconds)}
          </span>
        </div>

        {error && <p className="text-sm text-destructive" data-testid="text-test-call-error">{error}</p>}

        <div ref={listRef} className="h-64 overflow-y-auto rounded-md border bg-muted/30 p-3 space-y-2 text-sm" data-testid="list-test-call-transcript">
          {lines.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              {status === 'idle'
                ? t('testCall.hintIdle', 'Press "Start call". Your browser will ask for the microphone.')
                : live ? t('testCall.hintLive', 'Say hello — the transcript appears here as you talk.') : ''}
            </p>
          ) : lines.map(line => (
            <div key={line.id} className={line.role === 'user' ? 'text-right' : ''}>
              <span className={`inline-block max-w-[85%] rounded-lg px-2.5 py-1.5 text-left ${
                line.role === 'user' ? 'bg-primary text-primary-foreground'
                  : line.role === 'system' ? 'text-xs italic text-muted-foreground' : 'bg-background border'}`}>
                {line.role !== 'system' && <span className="block text-[10px] uppercase opacity-70">{roleLabel[line.role]}</span>}
                {line.text}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          {live || status === 'mic' || status === 'connecting' ? (
            <Button variant="destructive" onClick={end} data-testid="button-test-call-end">
              <PhoneOff className="h-4 w-4 mr-2" />{t('testCall.end', 'End call')}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)} data-testid="button-test-call-close">{t('common.close', 'Close')}</Button>
              <Button onClick={start} data-testid="button-test-call-start">
                <Mic className="h-4 w-4 mr-2" />{status === 'idle' ? t('testCall.start', 'Start call') : t('testCall.again', 'Call again')}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
