/**
 * Admin — credit (minute) packages. INR pricing only (Cashfree).
 */
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Plus, Edit2, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { useTranslation } from "react-i18next";
import { formatInr } from "@/lib/cashfree";

interface CreditPackage {
  id: string;
  name: string;
  description?: string | null;
  credits: number;
  price: number | string; // INR
  isActive: boolean;
}

interface PackageForm {
  name: string;
  description: string;
  credits: number;
  price: number;
}

const emptyForm: PackageForm = { name: "", description: "", credits: 100, price: 500 };

const toNumber = (value: number | string) => (typeof value === "string" ? parseFloat(value) || 0 : value);

export default function CreditPackages() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState<CreditPackage | null>(null);
  const [formData, setFormData] = useState<PackageForm>(emptyForm);

  const { data: packages, isLoading } = useQuery<CreditPackage[]>({ queryKey: ["/api/admin/credit-packages"] });

  const createPackage = useMutation({
    mutationFn: async (data: PackageForm) => apiRequest("POST", "/api/admin/credit-packages", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/credit-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/credit-packages"] });
      toast({ title: t("admin.creditPackages.packageCreated") });
      setShowCreateDialog(false);
      setFormData(emptyForm);
    },
    onError: (error: Error) => {
      toast({ title: t("admin.creditPackages.createFailed"), description: error.message, variant: "destructive" });
    },
  });

  const updatePackage = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PackageForm> & { isActive?: boolean } }) =>
      apiRequest("PATCH", `/api/admin/credit-packages/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/credit-packages"] });
      queryClient.invalidateQueries({ queryKey: ["/api/credit-packages"] });
      toast({ title: t("admin.creditPackages.packageUpdated") });
      setEditingPackage(null);
      setFormData(emptyForm);
    },
    onError: (error: Error) => {
      toast({ title: t("admin.creditPackages.updateFailed"), description: error.message, variant: "destructive" });
    },
  });

  const handleEdit = (pkg: CreditPackage) => {
    setEditingPackage(pkg);
    setFormData({ name: pkg.name, description: pkg.description || "", credits: pkg.credits, price: toNumber(pkg.price) });
  };

  const handleSave = () => {
    if (editingPackage) updatePackage.mutate({ id: editingPackage.id, data: formData });
    else createPackage.mutate(formData);
  };

  const closeDialog = () => {
    setShowCreateDialog(false);
    setEditingPackage(null);
    setFormData(emptyForm);
  };

  const isSaving = createPackage.isPending || updatePackage.isPending;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t("admin.creditPackages.title")}</h2>
          <p className="text-muted-foreground">{t("admin.creditPackages.description")}</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} data-testid="button-create-package">
          <Plus className="mr-2 h-4 w-4" />
          {t("admin.creditPackages.createPackage")}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages?.map((pkg) => {
            const price = toNumber(pkg.price);
            return (
              <Card key={pkg.id} className={!pkg.isActive ? "opacity-60" : ""}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{pkg.name}</CardTitle>
                      {pkg.description && <CardDescription className="mt-1">{pkg.description}</CardDescription>}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(pkg)} data-testid={`button-edit-package-${pkg.id}`}>
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{pkg.credits} {t("admin.creditPackages.credits")}</div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="text-muted-foreground">{t("admin.payments.cashfree.priceInr", "Price (INR)")}:</span>
                      <span className="font-semibold">{formatInr(price)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground border-t pt-2 mt-2">
                      {formatInr(price / Math.max(pkg.credits, 1))} {t("admin.creditPackages.perCredit")}
                    </div>
                    <Button
                      variant={pkg.isActive ? "outline" : "default"}
                      size="sm"
                      className="w-full"
                      onClick={() => updatePackage.mutate({ id: pkg.id, data: { isActive: !pkg.isActive } })}
                      data-testid={`button-toggle-package-${pkg.id}`}
                    >
                      {pkg.isActive ? t("admin.creditPackages.deactivate") : t("admin.creditPackages.activate")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={showCreateDialog || !!editingPackage} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPackage ? t("admin.creditPackages.editPackage") : t("admin.creditPackages.createTitle")}</DialogTitle>
            <DialogDescription>{editingPackage ? t("admin.creditPackages.editDescription") : t("admin.creditPackages.createDescription")}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <div className="flex items-center">
                <Label>{t("admin.creditPackages.packageName")}</Label>
                <InfoTooltip content={t("admin.creditPackages.packageNameTooltip")} />
              </div>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("admin.creditPackages.packageNamePlaceholder")} data-testid="input-package-name" />
            </div>
            <div>
              <div className="flex items-center">
                <Label>{t("admin.creditPackages.packageDescLabel")}</Label>
                <InfoTooltip content={t("admin.creditPackages.packageDescTooltip")} />
              </div>
              <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={t("admin.creditPackages.packageDescPlaceholder")} data-testid="input-package-description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.creditPackages.creditsLabel")}</Label>
                  <InfoTooltip content={t("admin.creditPackages.creditsTooltip")} />
                </div>
                <Input type="number" min={1} value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value, 10) || 0 })} data-testid="input-package-credits" />
              </div>
              <div>
                <div className="flex items-center">
                  <Label>{t("admin.payments.cashfree.priceInr", "Price (INR)")}</Label>
                  <InfoTooltip content={t("admin.payments.cashfree.priceInrHint", "Amount charged via Cashfree, inclusive of GST as configured in Invoice & GST settings.")} />
                </div>
                <Input type="number" step="0.01" min={0} value={formData.price} onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })} data-testid="input-package-price-inr" />
              </div>
            </div>
            {formData.credits > 0 && (
              <div className="text-sm text-muted-foreground">
                {t("admin.creditPackages.pricePerCredit", { price: (formData.price / formData.credits).toFixed(3) })}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog}>{t("common.cancel")}</Button>
            <Button onClick={handleSave} disabled={isSaving || !formData.name || formData.credits <= 0 || formData.price <= 0} data-testid="button-save-package">
              {isSaving ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{t("common.saving")}</>
              ) : (
                editingPackage ? t("admin.creditPackages.updatePackage") : t("admin.creditPackages.createPackage")
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
