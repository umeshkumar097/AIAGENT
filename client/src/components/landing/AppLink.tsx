/**
 * Link from the marketing site to a product path (register, login, dashboard).
 *
 * On zonvo.tech the product lives on app.zonvo.tech, so `appUrl()` returns an absolute URL and
 * we must render a plain anchor (wouter's client-side navigation cannot cross origins). On any
 * other host it stays a normal in-app <Link>.
 */
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "wouter";
import { appUrl } from "@/lib/domains";
import { AuthStorage } from "@/lib/auth-storage";

interface AppLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** Product path, e.g. "/register" */
  to: string;
  children: ReactNode;
}

export function AppLink({ to, children, ...rest }: AppLinkProps) {
  const href = appUrl(to);
  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

/** Where a "Get started" button should go: the dashboard when signed in, else registration. */
export function getStartedPath(): string {
  if (!AuthStorage.isAuthenticated()) return "/register";
  return AuthStorage.isAdmin() ? "/admin" : "/app";
}

/** Absolute (or in-app) URL for a "Get started" button — for onClick handlers that navigate. */
export function getStartedUrl(): string {
  return appUrl(getStartedPath());
}

/**
 * Navigate a marketing-page button to a product path: full navigation when the product lives on
 * another host, client-side routing otherwise.
 */
export function navigateToApp(path: string, setLocation: (to: string) => void): void {
  const href = appUrl(path);
  if (/^https?:\/\//i.test(href)) window.location.assign(href);
  else setLocation(href);
}
