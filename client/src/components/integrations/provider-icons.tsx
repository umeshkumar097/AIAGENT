import type { JSX } from "react";
import { Calendar as CalendarIcon, Database, Cable } from "lucide-react";
import { SiZapier, SiZoho } from "react-icons/si";
import type { IntegrationProviderKey } from "@/lib/integrations";

// SiSalesforce removed from react-icons v5 — using inline SVG
export const SiSalesforce = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.815 18.235c-.32.169-.684.265-1.07.265-1.29 0-2.337-1.048-2.337-2.337 0-.483.147-.932.4-1.305a3.984 3.984 0 01-1.4.255C3.762 15.113 2.5 13.851 2.5 12.3a2.815 2.815 0 012.315-2.773 2.516 2.516 0 01-.19-.965c0-1.394 1.131-2.525 2.525-2.525.304 0 .594.054.864.152A2.975 2.975 0 0110.8 4.5a2.977 2.977 0 012.894 2.27 2.526 2.526 0 011.281-.348c1.394 0 2.525 1.131 2.525 2.525 0 .13-.01.257-.028.382.066-.003.133-.005.2-.005A2.83 2.83 0 0120.5 12.15a2.83 2.83 0 01-2.828 2.828 2.81 2.81 0 01-.823-.123 2.097 2.097 0 01-1.879 1.168 2.09 2.09 0 01-.907-.206 2.386 2.386 0 01-2.312 1.8 2.382 2.382 0 01-1.936-.99z"/>
  </svg>
);

export const PROVIDER_ICONS: Record<IntegrationProviderKey, { icon: JSX.Element; iconBg: string }> = {
  gohighlevel: { icon: <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />, iconBg: "bg-blue-500/10 dark:bg-blue-500/20" },
  salesforce: { icon: <SiSalesforce className="w-6 h-6 text-sky-500 dark:text-sky-400" />, iconBg: "bg-sky-500/10 dark:bg-sky-500/20" },
  calcom: { icon: <CalendarIcon className="w-6 h-6 text-zinc-800 dark:text-zinc-200" />, iconBg: "bg-zinc-500/10 dark:bg-zinc-500/20" },
  zapier: { icon: <SiZapier className="w-6 h-6 text-orange-500 dark:text-orange-400" />, iconBg: "bg-orange-500/10 dark:bg-orange-500/20" },
  pabbly: { icon: <Cable className="w-6 h-6 text-emerald-500 dark:text-emerald-400" />, iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20" },
  zoho: { icon: <SiZoho className="w-6 h-6 text-red-500 dark:text-red-400" />, iconBg: "bg-red-500/10 dark:bg-red-500/20" },
};
