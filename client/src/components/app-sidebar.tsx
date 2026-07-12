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
import {
  Users, BookOpen, Mic, Link as LinkIcon, Phone, Settings, ChevronsUpDown,
  Plus, BarChart3, Home, Target, LogOut, Coins, Shield, CreditCard,
  TrendingUp, UserCheck, Workflow, Webhook, ClipboardList, Calendar,
  Layout, FileText, Wrench, Globe, Bot, ContactRound, MessageSquare,
  ChevronRight,
} from "lucide-react";
import { usePluginStatus } from "@/hooks/use-plugin-status";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from 'react-i18next';
import { useBranding } from "@/components/BrandingProvider";
import { AuthStorage } from "@/lib/auth-storage";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  credits?: number;
  planType?: string;
}

export function AppSidebar() {
  const [location, setLocation] = useLocation();
  const { t } = useTranslation();
  const { branding, currentLogo, showLogo, showFavicon } = useBranding();
  const { setOpenMobile, isMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  const buildItems = [
    { title: t('nav.campaigns'), url: "/app/campaigns", icon: Target, hasPlus: true },
    { title: t('nav.agents'), url: "/app/agents", icon: Bot, hasPlus: true },
    { title: t('nav.knowledgeBase'), url: "/app/knowledge-base", icon: BookOpen },
    { title: t('nav.flowBuilder'), url: "/app/flows", icon: Workflow },
    { title: t('nav.tools', 'Tools'), url: "/app/tools", icon: Wrench },
  ];

  const telephonyItems = [
    { title: t('nav.allContacts'), url: "/app/contacts", icon: UserCheck },
    { title: t('nav.phoneNumbers'), url: "/app/phone-numbers", icon: Phone },
  ];

  const { isEnabled: isMessagingEnabled } = usePluginStatus('messaging') as { isEnabled: boolean };

  const monitorItems = [
    ...(isMessagingEnabled ? [{ title: t('nav.conversations', 'Conversations'), url: "/app/conversations", icon: MessageSquare }] : []),
    { title: t('nav.calls'), url: "/app/calls", icon: Phone },
    { title: t('nav.analytics'), url: "/app/analytics", icon: BarChart3 },
  ];

  const { data: user, isLoading: userLoading } = useQuery<User>({
    queryKey: ["/api/auth/me"],
  });

  if (userLoading || !user) return null;

  const userName = user.name || "User";
  const userEmail = user.email || "";
  const userInitial = userName.charAt(0).toUpperCase() || "U";
  const isPaidPlan = user.planType && user.planType !== "free";
  const planDisplayName = user.planType
    ? user.planType.charAt(0).toUpperCase() + user.planType.slice(1)
    : "Free";
  const remainingCredits = user.credits || 0;

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {});
    AuthStorage.clearAuth();
    window.location.href = "/";
  };

  const isActive = (url: string) => {
    if (url === "/app") return location === "/app";
    return location === url || location.startsWith(url + "/");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="border-r-0"
    >
      {/* ── HEADER ── */}
      <SidebarHeader className="px-4 py-4">
        {/* Expanded: Logo + toggle */}
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:hidden">
          {showLogo && (
            <img
              src={currentLogo!}
              alt={branding.app_name}
              className="h-7 w-auto max-w-[130px] object-contain"
            />
          )}
          <SidebarTrigger
            className="h-6 w-6 shrink-0 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded"
            data-testid="button-sidebar-toggle"
          />
        </div>
        {/* Collapsed: Favicon + toggle */}
        <div className="hidden group-data-[collapsible=icon]:flex flex-col items-center gap-2">
          {showFavicon && (
            <img src={branding.favicon_url!} alt={branding.app_name} className="h-6 w-6 object-contain" />
          )}
          <SidebarTrigger
            className="h-5 w-5 shrink-0 text-zinc-400 hover:text-zinc-200"
            data-testid="button-sidebar-toggle-collapsed"
          />
        </div>
      </SidebarHeader>

      {/* ── NAV CONTENT ── */}
      <SidebarContent className="px-2 py-2 space-y-1">
        {/* Home */}
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/app")}
                  tooltip={t('nav.home')}
                  data-testid="link-home"
                  className={`
                    h-8 rounded-md text-[13px] font-medium transition-all duration-150
                    ${isActive("/app")
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                    }
                  `}
                >
                  <Link href="/app" onClick={handleNavClick}>
                    <Home className="h-[15px] w-[15px] shrink-0" />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* BUILD */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-600 group-data-[collapsible=icon]:hidden">
            Build
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {buildItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`
                      h-8 rounded-md text-[13px] font-medium transition-all duration-150
                      ${isActive(item.url)
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                      }
                    `}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="h-[15px] w-[15px] shrink-0" />
                      <span>{item.title}</span>
                      {item.hasPlus && (
                        <Plus className="ml-auto h-3 w-3 text-zinc-600 group-data-[collapsible=icon]:hidden" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* TELEPHONY */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-600 group-data-[collapsible=icon]:hidden">
            Telephony
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {telephonyItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`
                      h-8 rounded-md text-[13px] font-medium transition-all duration-150
                      ${isActive(item.url)
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                      }
                    `}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="h-[15px] w-[15px] shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* MONITOR */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-600 group-data-[collapsible=icon]:hidden">
            Monitor
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {monitorItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`
                      h-8 rounded-md text-[13px] font-medium transition-all duration-150
                      ${isActive(item.url)
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                      }
                    `}
                  >
                    <Link href={item.url} onClick={handleNavClick}>
                      <item.icon className="h-[15px] w-[15px] shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* MANAGE */}
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-600 group-data-[collapsible=icon]:hidden">
            Manage
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/app/billing")}
                  tooltip="Billing"
                  data-testid="link-billing-credits"
                  className={`
                    h-8 rounded-md text-[13px] font-medium transition-all duration-150
                    ${isActive("/app/billing")
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                    }
                  `}
                >
                  <Link href="/app/billing" onClick={handleNavClick}>
                    <CreditCard className="h-[15px] w-[15px] shrink-0" />
                    <span>Billing & Credits</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/app/settings")}
                  tooltip="Settings"
                  data-testid="link-settings"
                  className={`
                    h-8 rounded-md text-[13px] font-medium transition-all duration-150
                    ${isActive("/app/settings")
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                    }
                  `}
                >
                  <Link href="/app/settings" onClick={handleNavClick}>
                    <Settings className="h-[15px] w-[15px] shrink-0" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {user.role === 'admin' && (
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive("/admin")}
                    tooltip="Admin"
                    data-testid="link-admin-dashboard"
                    className={`
                      h-8 rounded-md text-[13px] font-medium transition-all duration-150
                      ${isActive("/admin")
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/70"
                      }
                    `}
                  >
                    <Link href="/admin" onClick={handleNavClick}>
                      <Shield className="h-[15px] w-[15px] shrink-0" />
                      <span>Admin Panel</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Minutes / Plan — VAPI-style bottom info */}
        <div className="mx-1 mt-2 group-data-[collapsible=icon]:hidden">
          <div
            className="rounded-lg border border-border p-3 cursor-pointer hover:bg-accent/50 transition-colors bg-accent/30"
            onClick={() => setLocation("/app/billing?tab=plans")}
            data-testid="sidebar-credits-box"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Minutes</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
                isPaidPlan
                  ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground"
              }`}>
                {planDisplayName}
              </span>
            </div>
            <div className="text-lg font-bold text-foreground">
              {remainingCredits.toLocaleString()}
              <span className="text-xs font-normal text-muted-foreground ml-1">min</span>
            </div>
            {!isPaidPlan && (
              <div className="mt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Upgrade plan →
              </div>
            )}
          </div>
        </div>
      </SidebarContent>

      {/* ── FOOTER ── */}
      <SidebarFooter className="px-2 py-3 border-t border-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="flex items-center gap-2.5 px-2 py-2 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors group"
              data-testid="button-user-menu"
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="text-[11px] font-semibold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-[12px] font-medium text-zinc-200 truncate leading-tight">{userName}</span>
                <span className="text-[11px] text-zinc-500 truncate leading-tight">{userEmail}</span>
              </div>
              <ChevronsUpDown className="h-3.5 w-3.5 text-zinc-600 shrink-0 group-data-[collapsible=icon]:hidden" />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 p-2 border border-border rounded-xl shadow-2xl bg-background"
          >
            {/* User info */}
            <div className="px-2 py-2 mb-1">
              <p className="text-[13px] font-semibold text-zinc-100 truncate">{userName}</p>
              <p className="text-[11px] text-zinc-500 truncate">{userEmail}</p>
            </div>

            {/* Credits box */}
            <div className="mx-0 mb-2 rounded-lg border border-border p-3 bg-accent/30">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium">Minutes</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase ${
                  isPaidPlan ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                }`}>{planDisplayName}</span>
              </div>
              <div className="text-xl font-bold text-foreground">
                {remainingCredits.toLocaleString()}
                <span className="text-xs font-normal text-muted-foreground ml-1">min</span>
              </div>
              {!isPaidPlan && (
                <Button
                  size="sm"
                  className="w-full mt-2 h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white border-0"
                  onClick={() => setLocation("/app/billing?tab=plans")}
                  data-testid="button-upgrade-dropdown"
                >
                  Upgrade Plan
                </Button>
              )}
            </div>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={() => setLocation("/app/settings")}
              className="cursor-pointer rounded-md text-[13px]"
              data-testid="link-account-settings"
            >
              <Settings className="mr-2 h-3.5 w-3.5" />
              Account Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md text-[13px]"
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
