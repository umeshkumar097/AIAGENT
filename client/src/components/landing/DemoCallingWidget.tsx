import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, MicOff, PhoneOff, Play, Globe, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function DemoCallingWidget() {
  const [isCalling, setIsCalling] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Timer logic for when the call is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleToggleCall = async () => {
    if (isCalling || isConnecting) {
      setIsCalling(false);
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      return;
    }

    setIsConnecting(true);
    try {
      const res = await fetch("/api/public/demo-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: "Hello! Welcome to Zonvo AI. I am your intelligent voice assistant. I can handle your inbound customer support and outbound sales calls automatically 24/7. Let's grow your business together!"
        })
      });
      
      if (!res.ok) throw new Error("Failed to connect");
      
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      
      if (!audioRef.current) {
        audioRef.current = new Audio();
      }
      audioRef.current.src = url;
      audioRef.current.onended = () => setIsCalling(false);
      
      await audioRef.current.play();
      setIsCalling(true);
    } catch (err) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to the AI voice server. Please configure ElevenLabs API keys in the admin panel.",
        variant: "destructive"
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Background glow when calling */}
      {isCalling && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -inset-4 bg-brand/20 blur-3xl rounded-full z-0"
        />
      )}
      
      <div className="relative z-10 bg-[#111118]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-8 flex flex-col items-center">
        
        {/* Header Tags */}
        <div className="flex justify-between w-full mb-8">
          <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-zinc-400 uppercase flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Demo
          </span>
          <span className="text-[10px] sm:text-xs font-medium bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700">
            3/3 free calls
          </span>
        </div>

        {/* Central Orb / Avatar */}
        <div className="relative w-40 h-40 mb-8 cursor-pointer group" onClick={!isCalling ? handleToggleCall : undefined}>
          <div className={`absolute inset-0 rounded-full flex items-center justify-center transition-all duration-500 ${isCalling ? 'bg-gradient-to-br from-brand to-purple-600 scale-100 shadow-[0_0_40px_rgba(139,92,246,0.5)]' : 'bg-zinc-800 scale-95 shadow-inner'}`}>
            {isCalling ? (
              <div className="flex gap-1.5 items-end h-12">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isMuted ? "4px" : ["10%", "50%", "100%", "30%", "10%"],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: i * 0.1,
                    }}
                    className="w-1.5 bg-white rounded-full"
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                whileHover={!isConnecting ? { scale: 1.1 } : undefined}
                whileTap={!isConnecting ? { scale: 0.95 } : undefined}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-brand/20 to-purple-500/20 flex items-center justify-center border border-brand/30"
              >
                {isConnecting ? (
                  <Loader2 className="w-10 h-10 text-brand animate-spin" />
                ) : (
                  <Mic className="w-10 h-10 text-brand" />
                )}
              </motion.div>
            )}
          </div>
          
          {/* Pulsing rings when ringing/calling */}
          {isCalling && (
            <>
              <motion.div animate={{ scale: [1, 1.2, 1.4], opacity: [0.5, 0.2, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} className="absolute inset-0 rounded-full border-2 border-brand" />
              <motion.div animate={{ scale: [1, 1.3, 1.6], opacity: [0.3, 0.1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }} className="absolute inset-0 rounded-full border border-brand/50" />
            </>
          )}
        </div>

        {/* Status / Call to Action */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-white mb-2">
            {isConnecting ? "Connecting to AI..." : isCalling ? formatTime(timeElapsed) : "Tap to talk"}
          </h3>
          <p className="text-sm text-zinc-400">
            {isCalling 
              ? (isMuted ? "Microphone muted" : "Agent is speaking...") 
              : isConnecting 
              ? "Establishing secure WebRTC connection" 
              : "Try Zonvo AI live — no signup"}
          </p>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center justify-between border-t border-white/10 pt-6">
          {!isCalling ? (
            <div className="w-full text-center text-xs text-zinc-400">
              <span className="font-medium text-zinc-300">Hindi • Hinglish +28 more</span>
              <br />
              &lt;300ms • emotion-aware
            </div>
          ) : (
            <div className="flex w-full justify-center gap-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${isMuted ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-500' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button 
                onClick={handleToggleCall}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg shadow-red-500/20"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
