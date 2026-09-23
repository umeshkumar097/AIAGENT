/**
 * ============================================================
 * © 2025 Zonvo AI — a brand of Bisht Technologies Private Limited
 * Original Author: BTPL Engineering Team
 * Website: https://zonvo.tech
 * Contact: cs@zonvo.tech
 *
 * Distributed under the Envato / CodeCanyon License Agreement.
 * Licensed to the purchaser for use as defined by the
 * Envato Market (CodeCanyon) Regular or Extended License.
 *
 * You are NOT permitted to redistribute, resell, sublicense,
 * or share this source code, in whole or in part.
 * Respect the author's rights and Envato licensing terms.
 * ============================================================
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useState, useMemo } from "react";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "react-i18next";

interface PluginCapabilities {
  capabilities: Record<string, boolean>;
  pluginBundles: Record<string, string>;
  sipEngine: boolean;
  restApi: boolean;
  teamManagement: boolean;
}

interface Plan {
  id: string;
  name: string;
  displayName: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  maxAgents: number;
  maxCampaigns: number;
  maxContactsPerCampaign: number;
  maxWebhooks: number;
  maxKnowledgeBases: number;
  maxFlows: number;
  maxPhoneNumbers: number;
  maxWidgets: number;
  includedCredits: number;
  defaultLlmModel?: string;
  canChooseLlm: boolean;
  canPurchaseNumbers: boolean;
  useSystemPool: boolean;
  sipEnabled: boolean;
  maxConcurrentSipCalls?: number;
  restApiEnabled: boolean;
  voiceProvider?: 'openai' | 'elevenlabs' | 'both';
  isActive: boolean;
}

interface MigrationState {
  plan: Plan;
  userCount: number;
  targetPlanId: string;
}

export default function PlanManagement() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [planForms, setPlanForms] = useState<Record<string, Partial<Plan>>>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingPlan, setDeletingPlan] = useState<Plan | null>(null);
  const [migrationState, setMigrationState] = useState<MigrationState | null>(null);
  const [newPlanForm, setNewPlanForm] = useState<Partial<Plan>>({
    name: "",
    displayName: "",
    description: "",
    monthlyPrice: 0,
    yearlyPrice: 0,
    maxAgents: 1,
    maxCampaigns: 1,
    maxContactsPerCampaign: 5,
    maxWebhooks: 3,
    maxKnowledgeBases: 5,
    maxFlows: 3,
    maxPhoneNumbers: 1,
    maxWidgets: 1,
    includedCredits: 100,
    canChooseLlm: false,
    canPurchaseNumbers: false,
    useSystemPool: false,
    voiceProvider: 'openai' as const,
    sipEnabled: false,
    maxConcurrentSipCalls: 1,
    restApiEnabled: false,
    isActive: true
  });

  const { data: plans, isLoading, isError } = useQuery<Plan[]>({
    queryKey: ["/api/admin/plans"],
  });

  // Fetch plugin capabilities to conditionally show plugin-related options
  const { data: pluginCapabilities } = useQuery<{ success: boolean; data: PluginCapabilities }>({
    queryKey: ["/api/plugins/capabilities"],
  });

  // Check if SIP Engine and REST API plugins are installed
  const sipPluginInstalled = useMemo(() => {
    return pluginCapabilities?.data?.capabilities?.['sip-engine'] ?? false;
  }, [pluginCapabilities]);

  const restApiPluginInstalled = useMemo(() => {
    return pluginCapabilities?.data?.capabilities?.['rest-api'] ?? false;
  }, [pluginCapabilities]);
  
  const createPlan = useMutation({
    mutationFn: async (planData: Partial<Plan>) => {
      return apiRequest("POST", "/api/admin/plans", planData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/plans"] });
      toast({ title: t("admin.plans.planCreated") });
      setShowCreateForm(false);
      setNewPlanForm({
        name: "",
        displayName: "",
        description: "",
        monthlyPrice: 0,
        yearlyPrice: 0,
        maxAgents: 1,
        maxCampaigns: 1,
        maxContactsPerCampaign: 5,
        maxWebhooks: 3,
        maxKnowledgeBases: 5,
        maxFlows: 3,
        maxPhoneNumbers: 1,
        maxWidgets: 1,
        includedCredits: 100,
        canChooseLlm: false,
        canPurchaseNumbers: false,
        useSystemPool: false,
        sipEnabled: false,
        maxConcurrentSipCalls: 1,
        restApiEnabled: false,
        isActive: true
      });
    },
    onError: (error: any) => {
      toast({
        title: t("admin.plans.createFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updatePlan = useMutation({
    mutationFn: async ({ planId, updates }: { planId: string; updates: Partial<Plan> }) => {
      return apiRequest("PATCH", `/api/admin/plans/${planId}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/plans"] });
      toast({ title: t("admin.plans.planUpdated") });
      setEditingPlan(null);
    },
    onError: (error: any) => {
      toast({
        title: t("admin.plans.updateFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deletePlan = useMutation({
    mutationFn: async (planId: string) => {
      const response = await apiRequest("DELETE", `/api/admin/plans/${planId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw Object.assign(new Error(errorData?.message || 'Failed to delete plan'), { response: { json: () => Promise.resolve(errorData) }, ...errorData });
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/plans"] });
      toast({ title: t("admin.plans.planDeleted") });
      setDeletingPlan(null);
      setMigrationState(null);
    },
    onError: async (error: any) => {
      // Check if this is a migration required error
      if (error.error === 'USERS_NEED_MIGRATION' && deletingPlan) {
        // Show migration dialog
        setMigrationState({
          plan: deletingPlan,
          userCount: error.userCount || 0,
          targetPlanId: ''
        });
        setDeletingPlan(null);
        return;
      }
      
      toast({
        title: error?.error || t("admin.plans.deleteFailed"),
        description: error?.message || 'Failed to delete plan',
        variant: "destructive"
      });
      setDeletingPlan(null);
    }
  });

  const migrateUsers = useMutation({
    mutationFn: async ({ planId, targetPlanId }: { planId: string; targetPlanId: string }) => {
      const response = await apiRequest("POST", `/api/admin/plans/${planId}/migrate`, { targetPlanId });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Migration failed');
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({ 
        title: t("admin.plans.usersMigrated"),
        description: t("admin.plans.usersMigratedDesc", { 
          count: data.migratedCount, 
          plan: data.targetPlanName 
        })
      });
      // Now delete the plan
      if (migrationState) {
        deletePlan.mutate(migrationState.plan.id);
      }
    },
    onError: (error: any) => {
      toast({
        title: t("admin.plans.migrationFailed"),
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleEdit = (plan: Plan) => {
    setEditingPlan(plan.id);
    setPlanForms({
      ...planForms,
      [plan.id]: { ...plan }
    });
  };

  const handleSave = (planId: string) => {
    const updates = planForms[planId];
    if (!updates) return;
    
    // Normalize price fields to handle NaN and empty values
    const normalizedUpdates: Partial<Plan> = { ...updates };
    
    // Handle USD price fields (must be numbers, default to 0)
    if (normalizedUpdates.monthlyPrice !== undefined) {
      const val = normalizedUpdates.monthlyPrice;
      if (typeof val === 'number' && isNaN(val)) {
        normalizedUpdates.monthlyPrice = 0;
      }
    }
    if (normalizedUpdates.yearlyPrice !== undefined) {
      const val = normalizedUpdates.yearlyPrice;
      if (typeof val === 'number' && isNaN(val)) {
        normalizedUpdates.yearlyPrice = 0;
      }
    }

    
    updatePlan.mutate({ planId, updates: normalizedUpdates });
  };

  const handleCancel = () => {
    setEditingPlan(null);
  };

  const updateField = (planId: string, field: keyof Plan, value: any) => {
    setPlanForms({
      ...planForms,
      [planId]: {
        ...planForms[planId],
        [field]: value
      }
    });
  };

  const updateNewPlanField = (field: keyof Plan, value: any) => {
    setNewPlanForm({
      ...newPlanForm,
      [field]: value
    });
  };

  const handleCreatePlan = () => {
    createPlan.mutate(newPlanForm);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{t("admin.plans.title")}</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {t("admin.plans.description")}
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          data-testid="button-toggle-create-plan"
        >
          {showCreateForm ? t("common.cancel") : t("admin.plans.addNewPlan")}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t("admin.plans.createNewPlan")}</CardTitle>
            <CardDescription>{t("admin.plans.createDescription")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{t("admin.plans.planName")}</Label>
                <Input
                  type="text"
                  placeholder={t("admin.plans.planNamePlaceholder")}
                  value={newPlanForm.name}
                  onChange={(e) => updateNewPlanField("name", e.target.value)}
                  data-testid="input-new-plan-name"
                />
              </div>
              <div>
                <Label>{t("admin.plans.displayName")}</Label>
                <Input
                  type="text"
                  placeholder={t("admin.plans.displayNamePlaceholder")}
                  value={newPlanForm.displayName}
                  onChange={(e) => updateNewPlanField("displayName", e.target.value)}
                  data-testid="input-new-plan-display-name"
                />
              </div>
            </div>

            <div>
              <Label>{t("admin.plans.descriptionLabel")}</Label>
              <Input
                type="text"
                placeholder={t("admin.plans.descriptionPlaceholder")}
                value={newPlanForm.description}
                onChange={(e) => updateNewPlanField("description", e.target.value)}
                data-testid="input-new-plan-description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.payments.cashfree.monthlyPriceInr", "Monthly Price (INR)")}</Label>
                  <InfoTooltip content={t("admin.payments.cashfree.planPriceHint", "Charged once per period via Cashfree. Use 0 for a free plan.")} />
                </div>
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  value={newPlanForm.monthlyPrice}
                  onChange={(e) => updateNewPlanField("monthlyPrice", parseFloat(e.target.value))}
                  data-testid="input-new-plan-monthly"
                />
              </div>
              <div>
                <Label>{t("admin.payments.cashfree.yearlyPriceInr", "Yearly Price (INR)")}</Label>
                <Input
                  type="number"
                  step="0.01"
                  min={0}
                  value={newPlanForm.yearlyPrice}
                  onChange={(e) => updateNewPlanField("yearlyPrice", parseFloat(e.target.value))}
                  data-testid="input-new-plan-yearly"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxAgents")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxAgents}
                  onChange={(e) => updateNewPlanField("maxAgents", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-agents"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxCampaigns")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxCampaigns}
                  onChange={(e) => updateNewPlanField("maxCampaigns", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-campaigns"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxContacts")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxContactsPerCampaign}
                  onChange={(e) => updateNewPlanField("maxContactsPerCampaign", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-contacts"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxWebhooks", "Max Webhooks")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxWebhooks}
                  onChange={(e) => updateNewPlanField("maxWebhooks", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-webhooks"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxKnowledgeBases", "Max KBs")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxKnowledgeBases}
                  onChange={(e) => updateNewPlanField("maxKnowledgeBases", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-kbs"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxFlows", "Max Flows")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxFlows}
                  onChange={(e) => updateNewPlanField("maxFlows", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-flows"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxPhoneNumbers", "Max Phone #s")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxPhoneNumbers}
                  onChange={(e) => updateNewPlanField("maxPhoneNumbers", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-phones"
                />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.plans.maxWidgets", "Max Widgets")}</Label>
                  <InfoTooltip content="Use -1 for unlimited" />
                </div>
                <Input
                  type="number"
                  value={newPlanForm.maxWidgets}
                  onChange={(e) => updateNewPlanField("maxWidgets", parseInt(e.target.value, 10))}
                  data-testid="input-new-plan-widgets"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center">
                <Label>{t("admin.plans.includedCredits")}</Label>
                <InfoTooltip content="Credits included with plan (0 for none)" />
              </div>
              <Input
                type="number"
                value={newPlanForm.includedCredits}
                onChange={(e) => updateNewPlanField("includedCredits", parseInt(e.target.value, 10))}
                data-testid="input-new-plan-credits"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>{t("admin.plans.canChooseLlm")}</Label>
                <Switch
                  checked={newPlanForm.canChooseLlm}
                  onCheckedChange={(checked) => updateNewPlanField("canChooseLlm", checked)}
                  data-testid="switch-new-plan-llm"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{t("admin.plans.canPurchaseNumbers")}</Label>
                <Switch
                  checked={newPlanForm.canPurchaseNumbers}
                  onCheckedChange={(checked) => updateNewPlanField("canPurchaseNumbers", checked)}
                  data-testid="switch-new-plan-numbers"
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>{t("admin.plans.useSystemPool")}</Label>
                <Switch
                  checked={newPlanForm.useSystemPool}
                  onCheckedChange={(checked) => updateNewPlanField("useSystemPool", checked)}
                  data-testid="switch-new-plan-pool"
                />
              </div>

              {/* Voice Provider - Controls which AI/telephony engine users see */}
              <div className="space-y-1">
                <Label>Voice Provider</Label>
                <p className="text-xs text-muted-foreground">Controls which AI engine &amp; telephony users see when creating agents</p>
                <select
                  className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                  value={newPlanForm.voiceProvider ?? 'openai'}
                  onChange={(e) => updateNewPlanField("voiceProvider", e.target.value)}
                  data-testid="select-new-plan-voice-provider"
                >
                  <option value="openai">🔵 Normal Voice (OpenAI + Twilio — English/American/British)</option>
                  <option value="elevenlabs">🟠 Indian Voice (ElevenLabs + Plivo — Indian accent)</option>
                  <option value="both">⚪ Both Engines (Admin / Premium — all options visible)</option>
                </select>
              </div>

              {sipPluginInstalled && (
                <div className="flex items-center justify-between">
                  <Label>SIP Trunk Access</Label>
                  <Switch
                    checked={newPlanForm.sipEnabled}
                    onCheckedChange={(checked) => updateNewPlanField("sipEnabled", checked)}
                    data-testid="switch-new-plan-sip"
                  />
                </div>
              )}
              {sipPluginInstalled && newPlanForm.sipEnabled && (
                <div className="flex items-center justify-between">
                  <Label>Max Concurrent SIP Calls</Label>
                  <Input
                    type="number"
                    min={1}
                    value={newPlanForm.maxConcurrentSipCalls ?? 1}
                    onChange={(e) => updateNewPlanField("maxConcurrentSipCalls", parseInt(e.target.value, 10) || 1)}
                    className="w-24 text-right"
                    data-testid="input-new-plan-max-concurrent-sip"
                  />
                </div>
              )}
              {restApiPluginInstalled && (
                <div className="flex items-center justify-between">
                  <Label>REST API Access</Label>
                  <Switch
                    checked={newPlanForm.restApiEnabled}
                    onCheckedChange={(checked) => updateNewPlanField("restApiEnabled", checked)}
                    data-testid="switch-new-plan-restapi"
                  />
                </div>
              )}
              <div className="flex items-center justify-between">
                <Label>{t("admin.plans.activeLabel")}</Label>
                <Switch
                  checked={newPlanForm.isActive}
                  onCheckedChange={(checked) => updateNewPlanField("isActive", checked)}
                  data-testid="switch-new-plan-active"
                />
              </div>
            </div>

            <Button 
              onClick={handleCreatePlan} 
              disabled={createPlan.isPending}
              data-testid="button-create-plan"
            >
              {createPlan.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("admin.plans.creating")}
                </>
              ) : (
                t("admin.plans.createPlan")
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {plans?.map((plan) => {
          const isEditing = editingPlan === plan.id;
          const formData = planForms[plan.id] || plan;

          return (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <CardTitle className="text-xl">
                    {plan.displayName}
                  </CardTitle>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t("admin.payments.cashfree.monthlyPriceInr", "Monthly Price (INR)")}</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          value={formData.monthlyPrice}
                          onChange={(e) => updateField(plan.id, "monthlyPrice", parseFloat(e.target.value))}
                          data-testid={`input-plan-monthly-${plan.id}`}
                        />
                      </div>
                      <div>
                        <Label>{t("admin.payments.cashfree.yearlyPriceInr", "Yearly Price (INR)")}</Label>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          value={formData.yearlyPrice}
                          onChange={(e) => updateField(plan.id, "yearlyPrice", parseFloat(e.target.value))}
                          data-testid={`input-plan-yearly-${plan.id}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxAgents")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxAgents}
                          onChange={(e) => updateField(plan.id, "maxAgents", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-agents-${plan.id}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxCampaigns")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxCampaigns}
                          onChange={(e) => updateField(plan.id, "maxCampaigns", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-campaigns-${plan.id}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxContactsPerCampaign")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxContactsPerCampaign}
                          onChange={(e) => updateField(plan.id, "maxContactsPerCampaign", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-contacts-${plan.id}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.includedCredits")}</Label>
                          <InfoTooltip content="Credits included with plan (0 for none)" />
                        </div>
                        <Input
                          type="number"
                          value={formData.includedCredits}
                          onChange={(e) => updateField(plan.id, "includedCredits", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-credits-${plan.id}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxWebhooks", "Max Webhooks")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxWebhooks ?? 3}
                          onChange={(e) => updateField(plan.id, "maxWebhooks", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-webhooks-${plan.id}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxKnowledgeBases", "Max KBs")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxKnowledgeBases ?? 5}
                          onChange={(e) => updateField(plan.id, "maxKnowledgeBases", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-kbs-${plan.id}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxFlows", "Max Flows")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxFlows ?? 3}
                          onChange={(e) => updateField(plan.id, "maxFlows", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-flows-${plan.id}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxPhoneNumbers", "Max Phone #s")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxPhoneNumbers ?? 1}
                          onChange={(e) => updateField(plan.id, "maxPhoneNumbers", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-phones-${plan.id}`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Label>{t("admin.plans.maxWidgets", "Max Widgets")}</Label>
                          <InfoTooltip content="Use -1 for unlimited" />
                        </div>
                        <Input
                          type="number"
                          value={formData.maxWidgets ?? 1}
                          onChange={(e) => updateField(plan.id, "maxWidgets", parseInt(e.target.value, 10))}
                          data-testid={`input-plan-widgets-${plan.id}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{t("admin.plans.canChooseLlm")}</Label>
                        <Switch
                          checked={formData.canChooseLlm}
                          onCheckedChange={(checked) => updateField(plan.id, "canChooseLlm", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>{t("admin.plans.canPurchaseNumbers")}</Label>
                        <Switch
                          checked={formData.canPurchaseNumbers}
                          onCheckedChange={(checked) => updateField(plan.id, "canPurchaseNumbers", checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>{t("admin.plans.useSystemPool")}</Label>
                        <Switch
                          checked={formData.useSystemPool}
                          onCheckedChange={(checked) => updateField(plan.id, "useSystemPool", checked)}
                        />
                      </div>

                      {/* Voice Provider */}
                      <div className="space-y-1">
                        <Label>Voice Provider</Label>
                        <p className="text-xs text-muted-foreground">Controls AI engine &amp; telephony visible to users</p>
                        <select
                          className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                          value={(formData as any).voiceProvider ?? plan.voiceProvider ?? 'openai'}
                          onChange={(e) => updateField(plan.id, "voiceProvider", e.target.value)}
                          data-testid={`select-plan-voice-provider-${plan.id}`}
                        >
                          <option value="openai">🔵 Normal Voice (OpenAI + Twilio)</option>
                          <option value="elevenlabs">🟠 Indian Voice (ElevenLabs + Plivo)</option>
                          <option value="both">⚪ Both Engines (Admin / Premium)</option>
                        </select>
                      </div>

                      {sipPluginInstalled && (
                        <div className="flex items-center justify-between">
                          <Label>SIP Trunk Access</Label>
                          <Switch
                            checked={formData.sipEnabled}
                            onCheckedChange={(checked) => updateField(plan.id, "sipEnabled", checked)}
                          />
                        </div>
                      )}
                      {sipPluginInstalled && formData.sipEnabled && (
                        <div className="flex items-center justify-between">
                          <Label>Max Concurrent SIP Calls</Label>
                          <Input
                            type="number"
                            min={1}
                            value={formData.maxConcurrentSipCalls ?? plan.maxConcurrentSipCalls ?? 1}
                            onChange={(e) => updateField(plan.id, "maxConcurrentSipCalls", parseInt(e.target.value, 10) || 1)}
                            className="w-24 text-right"
                            data-testid={`input-plan-max-concurrent-sip-${plan.id}`}
                          />
                        </div>
                      )}
                      {restApiPluginInstalled && (
                        <div className="flex items-center justify-between">
                          <Label>REST API Access</Label>
                          <Switch
                            checked={formData.restApiEnabled}
                            onCheckedChange={(checked) => updateField(plan.id, "restApiEnabled", checked)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleSave(plan.id)} 
                        disabled={updatePlan.isPending}
                        data-testid={`button-save-plan-${plan.id}`}
                      >
                        {updatePlan.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {t("common.saving")}
                          </>
                        ) : (
                          t("common.saveChanges")
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={handleCancel}
                        disabled={updatePlan.isPending}
                      >
                        {t("common.cancel")}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.payments.cashfree.pricingInr", "Pricing (INR)")}</span>
                        <span>₹{plan.monthlyPrice}{t("admin.plans.perMonth")} {t("admin.plans.or")} ₹{plan.yearlyPrice}{t("admin.plans.perYear")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxAgents")}:</span>
                        <span>{plan.maxAgents === 999 ? t("admin.plans.unlimited") : plan.maxAgents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxCampaigns")}:</span>
                        <span>{plan.maxCampaigns === 999 ? t("admin.plans.unlimited") : plan.maxCampaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxContacts")}:</span>
                        <span>{plan.maxContactsPerCampaign === 999999 ? t("admin.plans.unlimited") : plan.maxContactsPerCampaign}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxWebhooks", "Max Webhooks")}:</span>
                        <span>{plan.maxWebhooks === 999 ? t("admin.plans.unlimited") : (plan.maxWebhooks ?? 3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxKnowledgeBases", "Max KBs")}:</span>
                        <span>{plan.maxKnowledgeBases === 999 ? t("admin.plans.unlimited") : (plan.maxKnowledgeBases ?? 5)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxFlows", "Max Flows")}:</span>
                        <span>{plan.maxFlows === 999 ? t("admin.plans.unlimited") : (plan.maxFlows ?? 3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxPhoneNumbers", "Max Phone #s")}:</span>
                        <span>{plan.maxPhoneNumbers === 999 ? t("admin.plans.unlimited") : (plan.maxPhoneNumbers ?? 1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.maxWidgets", "Max Widgets")}:</span>
                        <span>{plan.maxWidgets === 999 ? t("admin.plans.unlimited") : (plan.maxWidgets ?? 1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t("admin.plans.includedCredits")}:</span>
                        <span>{plan.includedCredits}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleEdit(plan)}
                        data-testid={`button-edit-plan-${plan.id}`}
                        variant="outline"
                        className="flex-1"
                      >
                        {t("admin.plans.editPlan")}
                      </Button>
                      <Button 
                        onClick={() => setDeletingPlan(plan)}
                        data-testid={`button-delete-plan-${plan.id}`}
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AlertDialog open={!!deletingPlan} onOpenChange={(open) => !open && setDeletingPlan(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.plans.deletePlan")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.plans.deletePlanConfirm", { name: deletingPlan?.displayName })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletePlan.isPending}>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingPlan && deletePlan.mutate(deletingPlan.id)}
              disabled={deletePlan.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletePlan.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("common.deleting")}
                </>
              ) : (
                t("admin.plans.deletePlan")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Migration Dialog - shown when trying to delete a plan with active users */}
      <AlertDialog open={!!migrationState} onOpenChange={(open) => !open && setMigrationState(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              {t("admin.plans.migrationRequired")}
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-4">
                <p>
                  {t("admin.plans.migrationRequiredDesc", { 
                    count: migrationState?.userCount || 0, 
                    plan: migrationState?.plan?.displayName 
                  })}
                </p>
                
                {/* Check if there are other plans available */}
                {plans && plans.filter(p => p.id !== migrationState?.plan?.id).length > 0 ? (
                  <div className="space-y-2">
                    <Label>{t("admin.plans.selectTargetPlan")}</Label>
                    <Select
                      value={migrationState?.targetPlanId || ''}
                      onValueChange={(value) => setMigrationState(prev => prev ? { ...prev, targetPlanId: value } : null)}
                    >
                      <SelectTrigger data-testid="select-migration-target">
                        <SelectValue placeholder={t("admin.plans.selectPlan")} />
                      </SelectTrigger>
                      <SelectContent>
                        {plans
                          .filter(p => p.id !== migrationState?.plan?.id)
                          .map(p => (
                            <SelectItem key={p.id} value={p.id} data-testid={`option-plan-${p.id}`}>
                              {p.displayName} (${Number(p.monthlyPrice).toFixed(2)}/mo)
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="p-3 rounded-md bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      {t("admin.plans.noOtherPlansAvailable")}
                    </p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={migrateUsers.isPending || deletePlan.isPending}>
              {t("common.cancel")}
            </AlertDialogCancel>
            {plans && plans.filter(p => p.id !== migrationState?.plan?.id).length > 0 && (
              <Button
                onClick={() => {
                  if (migrationState && migrationState.targetPlanId) {
                    migrateUsers.mutate({
                      planId: migrationState.plan.id,
                      targetPlanId: migrationState.targetPlanId
                    });
                  }
                }}
                disabled={!migrationState?.targetPlanId || migrateUsers.isPending || deletePlan.isPending}
                data-testid="button-migrate-and-delete"
              >
                {migrateUsers.isPending || deletePlan.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    {t("admin.plans.migratingUsers")}
                  </>
                ) : (
                  t("admin.plans.migrateAndDelete")
                )}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
