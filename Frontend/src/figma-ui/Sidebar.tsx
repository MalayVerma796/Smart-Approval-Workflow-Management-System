import {
  LayoutDashboard, PlusCircle, FileText, CheckSquare,
  BarChart3, Users, Settings, Shield, ChevronRight, Bell
} from "lucide-react";

export type Page =
  | "dashboard"
  | "create-request"
  | "my-requests"
  | "approvals"
  | "analytics"
  | "users"
  | "settings";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  dark: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: Page; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "create-request", label: "Create Request", icon: PlusCircle },
  { id: "my-requests", label: "My Requests", icon: FileText },
  { id: "approvals", label: "Approvals", icon: CheckSquare },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar({ currentPage, onNavigate, dark, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-60 flex-shrink-0 flex-col transition-transform duration-300 lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--sidebar)",
          borderRight: "1px solid var(--sidebar-border)",
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "#2563EB" }}
          >
            <Shield size={16} className="text-white" />
          </div>
          <div>
            <div style={{ color: "#F1F5F9", fontSize: "0.9rem", fontWeight: 700, lineHeight: 1.1 }}>
              ApproveFlow
            </div>
            <div style={{ color: "#475569", fontSize: "0.68rem", fontWeight: 400, lineHeight: 1 }}>
              Enterprise
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <div style={{ color: "#475569", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.08em", padding: "0 8px 8px" }}>
            NAVIGATION
          </div>

          {navItems.map(({ id, label, icon: Icon }) => {
            const active = currentPage === id;
            return (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group"
                style={{
                  background: active ? "#2563EB" : "transparent",
                  color: active ? "#FFFFFF" : "var(--sidebar-foreground)",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background = "var(--sidebar-accent)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--sidebar-accent-foreground)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--sidebar-foreground)";
                  }
                }}
              >
                <Icon size={16} />
                <span style={{ fontSize: "0.875rem", fontWeight: active ? 600 : 400 }}>{label}</span>
                {id === "approvals" && (
                  <span
                    className="ml-auto rounded-full px-2 py-0.5"
                    style={{
                      background: active ? "rgba(255,255,255,0.2)" : "#EF4444",
                      color: "#fff",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    8
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User avatar at bottom */}
        <div
          className="px-3 py-4"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg"
            style={{ background: "var(--sidebar-accent)" }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#2563EB", color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}
            >
              AM
            </div>
            <div className="min-w-0">
              <div style={{ color: "#E2E8F0", fontSize: "0.8rem", fontWeight: 600, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Alex Morrison
              </div>
              <div style={{ color: "#475569", fontSize: "0.7rem", lineHeight: 1 }}>
                Administrator
              </div>
            </div>
            <ChevronRight size={14} style={{ color: "#475569", marginLeft: "auto", flexShrink: 0 }} />
          </div>
        </div>
      </aside>
    </>
  );
}
