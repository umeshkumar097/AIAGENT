import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import {
  INTEGRATION_PROVIDERS,
  PROVIDER_META,
  exchangeIntegrationCode,
  integrationErrorMessage,
  invalidateIntegrations,
  type IntegrationProviderKey,
} from "@/lib/integrations";

type Status = "loading" | "success" | "error";

function isProvider(value: string | undefined): value is IntegrationProviderKey {
  return !!value && (INTEGRATION_PROVIDERS as readonly string[]).includes(value);
}

/**
 * OAuth return page for the third-party integrations.
 * Route: /app/integrations/callback/:provider — the provider redirects here with
 * ?code=&state= (or ?error=); we POST { code, state } to /api/integrations/:provider/exchange
 * with the user's session and bounce back to the Tools page with a status query.
 */
export default function IntegrationCallbackPage() {
  const { t } = useTranslation();
  const [, navigate] = useLocation();
  const params = useParams<{ provider?: string }>();
  const providerParam = params.provider;
  const provider = isProvider(providerParam) ? providerParam : null;
  const title = provider ? PROVIDER_META[provider].title : (providerParam ?? "");

  const [status, setStatus] = useState<Status>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const state = query.get("state");
    const error = query.get("error");
    const errorDescription = query.get("error_description");
    const target = provider ?? providerParam ?? "unknown";

    const fail = (message: string) => {
      setStatus("error");
      setErrorMessage(message);
      setTimeout(() => navigate(`/app/tools?integration=${encodeURIComponent(target)}&error=${encodeURIComponent(message)}`), 2500);
    };

    if (!provider) {
      fail(t("integrations.providers.callback.unknownProvider", "Unknown integration provider."));
      return;
    }
    if (error || !code || !state) {
      const code_ = error || "access_denied";
      fail(code_ === "access_denied"
        ? t("integrations.providers.callback.accessDenied", { defaultValue: "Access was denied by {{provider}}.", provider: title })
        : errorDescription || t("integrations.providers.callback.providerError", { defaultValue: "{{provider}} returned an error: {{code}}", provider: title, code: code_ }));
      return;
    }

    exchangeIntegrationCode(provider, { code, state })
      .then(() => {
        invalidateIntegrations();
        setStatus("success");
        setTimeout(() => navigate(`/app/tools?integration=${encodeURIComponent(provider)}&connected=true`), 1500);
      })
      .catch((err: unknown) => {
        fail(integrationErrorMessage(err, t("integrations.providers.callback.exchangeFailed", "Token exchange failed. Please try again.")));
      });
  // The exchange must run exactly once per landing on this page.
  }, [provider]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center px-4">
      {status === "loading" && (
        <>
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-lg font-medium">
            {t("integrations.providers.callback.connecting", { defaultValue: "Connecting your {{provider}} account...", provider: title })}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("integrations.providers.callback.wait", "Please wait while we complete the connection.")}
          </p>
        </>
      )}
      {status === "success" && (
        <>
          <CheckCircle2 className="w-10 h-10 text-green-500" />
          <p className="text-lg font-medium">
            {t("integrations.providers.callback.connected", { defaultValue: "{{provider}} connected!", provider: title })}
          </p>
          <p className="text-sm text-muted-foreground">{t("integrations.providers.callback.redirecting", "Redirecting you back...")}</p>
        </>
      )}
      {status === "error" && (
        <>
          <XCircle className="w-10 h-10 text-destructive" />
          <p className="text-lg font-medium">{t("integrations.providers.callback.failed", "Connection failed")}</p>
          <p className="text-sm text-muted-foreground">{errorMessage}</p>
          <p className="text-xs text-muted-foreground">{t("integrations.providers.callback.redirecting", "Redirecting you back...")}</p>
        </>
      )}
    </div>
  );
}
