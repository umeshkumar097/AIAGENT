import { useQuery } from "@tanstack/react-query";

interface CapabilitiesResponse {
  success: boolean;
  data: {
    capabilities: Record<string, boolean>;
    pluginBundles?: Record<string, string>;
    sipEngine: boolean;
    sipPluginInstalled: boolean;
    sipEnginesAllowed: string[];
    maxConcurrentSipCalls: number;
    restApi: boolean;
    teamManagement: boolean;
    voiceProvider: 'openai' | 'elevenlabs' | 'both';
  };
}

export function usePluginStatus(pluginName?: string) {
  const { data, isLoading, error } = useQuery<CapabilitiesResponse>({
    queryKey: ["/api/plugins/capabilities"],
    staleTime: 60000,
    retry: 1,
  });

  const capabilities = data?.data?.capabilities || {};
  
  const isPluginEnabled = (name: string): boolean => {
    return capabilities[name] ?? false;
  };

  // SIP access is true only if plugin is enabled AND user's plan allows it
  const isSipPluginEnabled = data?.data?.sipEngine ?? false;
  const sipPluginInstalled = data?.data?.sipPluginInstalled ?? false;
  const sipEnginesAllowed = data?.data?.sipEnginesAllowed ?? [];
  const maxConcurrentSipCalls = data?.data?.maxConcurrentSipCalls ?? 0;
  const isRestApiPluginEnabled = data?.data?.restApi ?? false;
  const isTeamManagementPluginEnabled = data?.data?.teamManagement ?? false;
  const pluginBundles = data?.data?.pluginBundles ?? {};
  
  // Voice provider controls which AI/telephony engines are shown in agent creation
  // 'openai' = Normal plan (OpenAI + Twilio), 'elevenlabs' = Indian Voice (ElevenLabs + Plivo), 'both' = all engines
  const voiceProvider: 'openai' | 'elevenlabs' | 'both' = data?.data?.voiceProvider ?? 'both';

  if (pluginName) {
    return {
      isEnabled: isPluginEnabled(pluginName),
      isLoading,
      error,
      hasError: !!error,
    };
  }

  return {
    isSipPluginEnabled,
    sipPluginInstalled,
    sipEnginesAllowed,
    maxConcurrentSipCalls,
    isRestApiPluginEnabled,
    isTeamManagementPluginEnabled,
    pluginBundles,
    isPluginEnabled,
    voiceProvider,
    isLoading,
    error,
    hasError: !!error,
  };
}
