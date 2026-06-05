import { Bell, Search, Sun, Moon, HelpCircle, Menu } from "lucide-react";
import { Page } from "./Sidebar";

const pageTitles: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Overview of your workflow activity" },
  "create-request": { title: "Create Request", subtitle: "Submit a new approval request" },
  "my-requests": { title: "My Requests", subtitle: "Track requests you've submitted" },
  approvals: { title: "Approvals", subtitle: "Review and action pending requests" },
  analytics: { title: "Analytics", subtitle: "Workflow performance insights" },
  users: { title: "User Management", subtitle: "Manage team members and permissions" },
  settings: { title: "Settings", subtitle: "Configure your workspace" },
};

interface TopBarProps {
  currentPage: Page;
  dark: boolean;
  onToggleDark: () => void;
  onMenuClick: () => void;
}

export function TopBar({ currentPage, dark, onToggleDark, onMenuClick }: TopBarProps) {
  const { title, subtitle } = pageTitles[currentPage];

  return (
    <header
      className="flex items-center px-6 py-3 flex-shrink-0"
      style={{
        background: "var(--card)",
        borderBottom: "1px solid var(--border)",
        height: "60px",
        gap: "16px",
      }}
    >
      <button
        type="button"
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
        style={{ color: "var(--muted-foreground)", background: "var(--muted)", border: "none", cursor: "pointer" }}
      >
        <Menu size={18} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2.5">
          <h1 style={{ fontWeight: 600, color: "var(--foreground)", lineHeight: 1.2 }}>
            {title}
          </h1>
          <span style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
            {subtitle}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg"
        style={{ background: "var(--input-background)", border: "1px solid var(--border)", minWidth: 220 }}
      >
        <Search size={14} style={{ color: "var(--muted-foreground)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search requests, users…"
          className="flex-1 outline-none bg-transparent"
          style={{ color: "var(--foreground)", fontSize: "0.8rem" }}
        />
        <kbd style={{ color: "var(--muted-foreground)", fontSize: "0.65rem", fontWeight: 600, background: "var(--border)", borderRadius: 4, padding: "2px 5px" }}>
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: "var(--muted-foreground)", background: "transparent", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <HelpCircle size={18} />
        </button>

        <button
          className="relative p-2 rounded-lg transition-colors"
          style={{ color: "var(--muted-foreground)", background: "transparent", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "#EF4444" }}
          />
        </button>

        <button
          onClick={onToggleDark}
          className="p-2 rounded-lg transition-colors"
          style={{ color: "var(--muted-foreground)", background: "transparent", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--muted)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ml-1"
          style={{ background: "#2563EB", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}
        >
          AM
        </div>
      </div>
    </header>
  );
}
