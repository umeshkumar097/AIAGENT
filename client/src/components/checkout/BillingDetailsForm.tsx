/**
 * Checkout — billing details printed on the GST invoice (saved to the user before the order).
 * A GSTIN locks the state select to the state encoded in its first two digits.
 */
import { useTranslation } from "react-i18next";
import { Building2, Lock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INDIAN_STATES } from "@/lib/indian-states";
import type { BillingForm, BillingFormErrors } from "./checkout-form";

interface Props {
  form: BillingForm;
  errors: BillingFormErrors;
  stateLocked: boolean;
  disabled?: boolean;
  onChange: (field: keyof BillingForm, value: string) => void;
}

interface FieldProps {
  id: keyof BillingForm;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label htmlFor={`checkout-${id}`}>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-red-600" data-testid={`error-${id}`}>{error}</p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function BillingDetailsForm({ form, errors, stateLocked, disabled, onChange }: Props) {
  const { t } = useTranslation();

  const input = (field: keyof BillingForm, extra?: Partial<React.ComponentProps<typeof Input>>) => (
    <Input
      id={`checkout-${field}`}
      value={form[field]}
      disabled={disabled}
      onChange={(e) => onChange(field, e.target.value)}
      className={errors[field] ? "border-red-400 focus-visible:ring-red-400" : undefined}
      data-testid={`input-checkout-${field}`}
      {...extra}
    />
  );

  return (
    <Card data-testid="card-checkout-billing">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-base">{t("settings.billingDetails.title", "Billing details")}</CardTitle>
            <CardDescription>{t("billing.checkout.billingDescription", "Printed on your GST tax invoice. Saved to your account for next time.")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field id="billingName" label={t("settings.billingDetails.billingName", "Billing name")} required error={errors.billingName}>
            {input("billingName", { autoComplete: "name" })}
          </Field>
          <Field id="company" label={t("settings.billingDetails.company", "Company (optional)")}>
            {input("company", { autoComplete: "organization" })}
          </Field>
          <Field
            id="gstin"
            label={t("settings.billingDetails.gstin", "GSTIN (optional)")}
            error={errors.gstin}
            hint={t("billing.checkout.gstinHint", "Add your GSTIN for a B2B invoice with input tax credit. The state is taken from it.")}
            className="md:col-span-2"
          >
            {input("gstin", { placeholder: "09ABCDE1234F1Z5", maxLength: 15, className: `font-mono uppercase ${errors.gstin ? "border-red-400" : ""}`, onChange: (e) => onChange("gstin", e.target.value.toUpperCase()) })}
          </Field>
          <Field id="billingAddressLine1" label={t("settings.billingDetails.addressLine1", "Address line 1")} required error={errors.billingAddressLine1} className="md:col-span-2">
            {input("billingAddressLine1", { autoComplete: "address-line1" })}
          </Field>
          <Field id="billingAddressLine2" label={t("settings.billingDetails.addressLine2", "Address line 2 (optional)")} className="md:col-span-2">
            {input("billingAddressLine2", { autoComplete: "address-line2" })}
          </Field>
          <Field id="billingCity" label={t("settings.billingDetails.city", "City")} required error={errors.billingCity}>
            {input("billingCity", { autoComplete: "address-level2" })}
          </Field>
          <Field
            id="billingStateCode"
            label={t("settings.billingDetails.state", "State")}
            required
            error={errors.billingStateCode}
            hint={stateLocked ? t("billing.checkout.stateLocked", "Set from your GSTIN.") : t("settings.billingDetails.stateHint", "The GST state code decides CGST+SGST vs IGST on your invoice.")}
          >
            <Select value={form.billingStateCode} onValueChange={(v) => onChange("billingStateCode", v)} disabled={disabled || stateLocked}>
              <SelectTrigger id="checkout-billingStateCode" className={errors.billingStateCode ? "border-red-400" : undefined} data-testid="select-checkout-state">
                <div className="flex items-center gap-2 truncate">
                  {stateLocked && <Lock className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />}
                  <SelectValue placeholder={t("settings.billingDetails.selectState", "Select state")} />
                </div>
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state.code} value={state.code}>{state.code} · {state.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field id="billingPostalCode" label={t("settings.billingDetails.postalCode", "PIN code")} required error={errors.billingPostalCode}>
            {input("billingPostalCode", { inputMode: "numeric", maxLength: 6, autoComplete: "postal-code" })}
          </Field>
          <Field
            id="billingPhone"
            label={t("billing.checkout.phone", "Mobile number")}
            required
            error={errors.billingPhone}
            hint={t("billing.checkout.phoneHint", "Required by Cashfree for payment confirmation.")}
          >
            {input("billingPhone", { placeholder: "9876543210", inputMode: "tel", autoComplete: "tel" })}
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}

export default BillingDetailsForm;
